import type { Metadata } from "next";
import type { AthleteProfile } from "@/lib/types/athlete";
import { absoluteProfileUrlFromOrigin, publicSiteOrigin, stripTrailingSlash } from "@/lib/public-site";

type BuildAthleteMetadataOptions = {
  /** Path canonico della pagina (default: `/${athlete.slug}`). */
  canonicalPath?: string;
  /** URL Open Graph (default: origine + canonicalPath). */
  openGraphUrl?: string;
};

function resolvePreviewImageUrl(athlete: AthleteProfile): string | undefined {
  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  const previewSrc = (athlete.seo.ogImage ?? athlete.header.heroImage).trim();
  const previewIsAbsolute = /^https?:\/\//i.test(previewSrc);

  if (previewIsAbsolute) return previewSrc;
  if (origin) {
    return `${stripTrailingSlash(origin)}${previewSrc.startsWith("/") ? previewSrc : `/${previewSrc}`}`;
  }

  const envBase = stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "");
  if (!envBase) return undefined;
  return `${envBase}${previewSrc.startsWith("/") ? previewSrc : `/${previewSrc}`}`;
}

/** Metadata SEO / Open Graph per scheda atleta (Instagram, iMessage, WhatsApp, ecc.). */
export function buildAthleteMetadata(
  athlete: AthleteProfile,
  options: BuildAthleteMetadataOptions = {},
): Metadata {
  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  const canonicalPath = options.canonicalPath ?? `/${athlete.slug}`;
  const previewImageUrl = resolvePreviewImageUrl(athlete);

  const previewAlt = athlete.seo.ogImage
    ? `${athlete.header.name} — player card`
    : `${athlete.header.name} — foto profilo`;

  const previewImages =
    previewImageUrl !== undefined
      ? [{ url: previewImageUrl, width: 1200, height: 675, alt: previewAlt }]
      : undefined;

  const meta: Metadata = {
    title: athlete.seo.title,
    description: athlete.seo.description,
    openGraph: {
      title: athlete.seo.title,
      description: athlete.seo.description,
      type: "website",
      siteName: "Giocatori",
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
    meta.alternates = { canonical: canonicalPath };
    meta.openGraph = {
      ...meta.openGraph,
      url: options.openGraphUrl ?? absoluteProfileUrlFromOrigin(origin, athlete.slug),
    };
  }

  return meta;
}
