import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athleteSlugs, getAthlete } from "@/data/athletes";
import { absoluteProfileUrlFromOrigin, publicSiteOrigin, stripTrailingSlash } from "@/lib/public-site";
import { AthleteProfileView } from "@/components/profile/AthleteProfileView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athleteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const athlete = getAthlete(slug);
  if (!athlete) return { title: "Giocatore non trovato" };

  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  const previewSrc = (athlete.seo.ogImage ?? athlete.header.heroImage).trim();
  const previewIsAbsolute = /^https?:\/\//i.test(previewSrc);

  /** Anteprima link (OG / Twitter): URL assoluto o path risolto con metadataBase / env. */
  let previewImageUrl: string | undefined;
  if (previewIsAbsolute) {
    previewImageUrl = previewSrc;
  } else if (origin) {
    previewImageUrl = previewSrc.startsWith("/") ? previewSrc : `/${previewSrc}`;
  } else {
    const envBase = stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "");
    if (envBase) {
      previewImageUrl = `${envBase}${previewSrc.startsWith("/") ? previewSrc : `/${previewSrc}`}`;
    }
  }

  const previewAlt = athlete.seo.ogImage
    ? `${athlete.header.name} — player card`
    : `${athlete.header.name} — foto profilo`;

  const previewImages =
    previewImageUrl !== undefined
      ? [{ url: previewImageUrl, alt: previewAlt }]
      : undefined;

  const meta: Metadata = {
    title: athlete.seo.title,
    description: athlete.seo.description,
    openGraph: {
      title: athlete.seo.title,
      description: athlete.seo.description,
      type: "profile",
      ...(previewImages ? { images: previewImages } : {}),
    },
    ...(previewImages
      ? {
          twitter: {
            card: "summary_large_image",
            title: athlete.seo.title,
            description: athlete.seo.description,
            images: [previewImages[0].url],
          },
        }
      : {}),
  };

  if (origin) {
    meta.metadataBase = new URL(origin.endsWith("/") ? origin : `${origin}/`);
    meta.alternates = { canonical: `/${slug}` };
    meta.openGraph = {
      ...meta.openGraph,
      url: absoluteProfileUrlFromOrigin(origin, slug),
    };
  }

  return meta;
}

export default async function AthletePage({ params }: Props) {
  const { slug } = await params;
  const athlete = getAthlete(slug);
  if (!athlete) notFound();

  return <AthleteProfileView athlete={athlete} />;
}
