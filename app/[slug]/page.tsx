import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athleteSlugs, getAthlete } from "@/data/athletes";
import { absoluteProfileUrlFromOrigin, publicSiteOrigin } from "@/lib/public-site";
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
  const meta: Metadata = {
    title: athlete.seo.title,
    description: athlete.seo.description,
    openGraph: {
      title: athlete.seo.title,
      description: athlete.seo.description,
      type: "profile",
    },
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
