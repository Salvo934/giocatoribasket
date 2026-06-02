import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { athleteSupportsLocale, getAthlete, getAthleteSlugByHost } from "@/data/athletes";
import { AthleteProfileView } from "@/components/profile/AthleteProfileView";
import { absoluteProfileUrlFromOrigin, publicSiteOrigin, stripTrailingSlash } from "@/lib/public-site";
import type { ProfileLocale } from "@/lib/i18n/profile-locale";
import { profilePublicPath } from "@/lib/i18n/profile-locale";

export async function buildAthleteMetadata(slug: string, locale: ProfileLocale): Promise<Metadata> {
  const athlete = getAthlete(slug, locale);
  if (!athlete) return { title: locale === "en" ? "Player not found" : "Giocatore non trovato" };

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

  const previewAlt = athlete.seo.ogImage
    ? `${athlete.header.name} — player card`
    : `${athlete.header.name} — ${locale === "en" ? "profile photo" : "foto profilo"}`;

  const previewImages =
    previewImageUrl !== undefined
      ? [{ url: previewImageUrl, width: 1200, height: 675, alt: previewAlt }]
      : undefined;

  const dedicatedDomain = Boolean(origin);
  const profilePath = profilePublicPath(slug, locale, dedicatedDomain);

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

export async function AthleteProfilePage({ slug, locale }: { slug: string; locale: ProfileLocale }) {
  if (!athleteSupportsLocale(slug, locale)) notFound();
  const athlete = getAthlete(slug, locale);
  if (!athlete) notFound();

  const host = (await headers()).get("host");
  const dedicatedDomain = Boolean(host && getAthleteSlugByHost(host) === slug);

  return <AthleteProfileView athlete={athlete} locale={locale} dedicatedDomain={dedicatedDomain} />;
}

/** @deprecated use buildAthleteMetadata — kept for imports that need origin helper */
export { absoluteProfileUrlFromOrigin };
