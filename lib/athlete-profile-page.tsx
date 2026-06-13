import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { athleteSupportsLocale, getAthlete, getAthleteSlugByHost } from "@/data/athletes";
import { AthleteProfileView } from "@/components/profile/AthleteProfileView";
import { AthleteVideoOnlyView } from "@/components/profile/AthleteVideoOnlyView";
import { absoluteProfileUrlFromOrigin, publicSiteOrigin, stripTrailingSlash } from "@/lib/public-site";
import type { ProfileLocale } from "@/lib/i18n/profile-locale";
import { profilePublicPath, videoPublicPath } from "@/lib/i18n/profile-locale";
import type { AthleteProfile } from "@/lib/types/athlete";

type OgPreview = {
  url: string;
  alt: string;
};

function resolveAthleteOgPreview(athlete: AthleteProfile, imageAlt: string): OgPreview | undefined {
  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  const previewSrc = (athlete.seo.ogImage ?? athlete.header.heroImage).trim();
  const previewIsAbsolute = /^https?:\/\//i.test(previewSrc);

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

  if (previewImageUrl === undefined) return undefined;

  return { url: previewImageUrl, alt: imageAlt };
}

function withOgPreview(
  meta: Metadata,
  preview: OgPreview | undefined,
  title: string,
  description: string,
): Metadata {
  if (!preview) return meta;

  const images = [{ url: preview.url, width: 1200, height: 675, alt: preview.alt }];

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [preview.url],
    },
  };
}

export async function buildAthleteMetadata(slug: string, locale: ProfileLocale): Promise<Metadata> {
  const athlete = getAthlete(slug, locale);
  if (!athlete) return { title: locale === "en" ? "Player not found" : "Giocatore non trovato" };

  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  const previewAlt = athlete.seo.ogImage
    ? `${athlete.header.name} — player card`
    : `${athlete.header.name} — ${locale === "en" ? "profile photo" : "foto profilo"}`;
  const preview = resolveAthleteOgPreview(athlete, previewAlt);

  const dedicatedDomain = Boolean(origin);
  const profilePath = profilePublicPath(slug, locale, dedicatedDomain);

  let meta: Metadata = {
    title: athlete.seo.title,
    description: athlete.seo.description,
    openGraph: {
      title: athlete.seo.title,
      description: athlete.seo.description,
      type: "profile",
    },
  };

  meta = withOgPreview(meta, preview, athlete.seo.title, athlete.seo.description);

  if (origin) {
    meta.metadataBase = new URL(origin.endsWith("/") ? origin : `${origin}/`);
    meta.alternates = {
      canonical: profilePath,
      languages: athlete.locales?.includes("en")
        ? {
            it: profilePublicPath(slug, "it", true),
            en: profilePublicPath(slug, "en", true),
          }
        : undefined,
    };
    meta.openGraph = {
      ...meta.openGraph,
      url: `${origin.replace(/\/$/, "")}${profilePath}`,
    };
  } else if (athlete.locales?.includes("en")) {
    meta.alternates = {
      canonical: profilePath,
      languages: {
        it: profilePublicPath(slug, "it", false),
        en: profilePublicPath(slug, "en", false),
      },
    };
  }

  return meta;
}

export async function buildAthleteVideoMetadata(slug: string, locale: ProfileLocale): Promise<Metadata> {
  const athlete = getAthlete(slug, locale);
  if (!athlete) return { title: locale === "en" ? "Videos not found" : "Video non trovati" };

  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  const dedicatedDomain = Boolean(origin);
  const videoPath = videoPublicPath(slug, locale, dedicatedDomain);
  const title =
    locale === "en"
      ? `${athlete.header.name} — Video & clips`
      : `${athlete.header.name} — Video e clip`;
  const description =
    locale === "en"
      ? `Highlights and skill clips for ${athlete.header.name} — direct video link for clubs, agents and staff.`
      : `Highlights e clip per reparto di ${athlete.header.name} — link video diretto per club, agenti e staff.`;
  const previewAlt =
    locale === "en"
      ? `${athlete.header.name} — video & clips`
      : `${athlete.header.name} — video e clip`;
  const preview = resolveAthleteOgPreview(athlete, previewAlt);

  let meta: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };

  meta = withOgPreview(meta, preview, title, description);

  if (origin) {
    meta.metadataBase = new URL(origin.endsWith("/") ? origin : `${origin}/`);
    meta.alternates = {
      canonical: videoPath,
      languages: athlete.locales?.includes("en")
        ? {
            it: videoPublicPath(slug, "it", true),
            en: videoPublicPath(slug, "en", true),
          }
        : undefined,
    };
    meta.openGraph = {
      ...meta.openGraph,
      url: `${origin.replace(/\/$/, "")}${videoPath}`,
    };
  } else if (athlete.locales?.includes("en")) {
    meta.alternates = {
      canonical: videoPath,
      languages: {
        it: videoPublicPath(slug, "it", false),
        en: videoPublicPath(slug, "en", false),
      },
    };
  }

  return meta;
}

export async function AthleteProfilePage({ slug, locale }: { slug: string; locale: ProfileLocale }) {
  if (!athleteSupportsLocale(slug, locale)) notFound();
  const athlete = getAthlete(slug, locale);
  if (!athlete) notFound();

  const host = (await headers()).get("host");
  const dedicatedDomain = Boolean(host && getAthleteSlugByHost(host) === slug);

  return <AthleteProfileView athlete={athlete} locale={locale} dedicatedDomain={dedicatedDomain} />;
}

export async function AthleteVideoPage({ slug, locale }: { slug: string; locale: ProfileLocale }) {
  if (!athleteSupportsLocale(slug, locale)) notFound();
  const athlete = getAthlete(slug, locale);
  if (!athlete) notFound();

  const host = (await headers()).get("host");
  const dedicatedDomain = Boolean(host && getAthleteSlugByHost(host) === slug);

  return <AthleteVideoOnlyView athlete={athlete} locale={locale} dedicatedDomain={dedicatedDomain} />;
}

/** @deprecated use buildAthleteMetadata — kept for imports that need origin helper */
export { absoluteProfileUrlFromOrigin };
