import type { AthleteProfile } from "@/lib/types/athlete";

export type ProfileLocale = "it" | "en";

export const DEFAULT_PROFILE_LOCALE: ProfileLocale = "it";

/** Overlay tradotto — stessi campi del profilo, tranne slug/locales. */
export type AthleteLocaleOverlay = Omit<AthleteProfile, "slug" | "locales">;

export function mergeAthleteLocale(base: AthleteProfile, overlay: AthleteLocaleOverlay): AthleteProfile {
  return {
    ...base,
    ...overlay,
    seo: { ...base.seo, ...overlay.seo },
    legal: overlay.legal ? { ...base.legal, ...overlay.legal } : base.legal,
    header: { ...base.header, ...overlay.header },
    scoutView: { ...base.scoutView, ...overlay.scoutView },
    market: {
      ...base.market,
      ...overlay.market,
      availability: overlay.market?.availability ?? base.market.availability,
    },
    videos: overlay.videos
      ? {
          ...base.videos,
          ...overlay.videos,
          main: { ...base.videos.main, ...overlay.videos.main },
          categories: overlay.videos.categories ?? base.videos.categories,
          filmRoomSide: overlay.videos.filmRoomSide ?? base.videos.filmRoomSide,
          fullGame: overlay.videos.fullGame
            ? { ...base.videos.fullGame, ...overlay.videos.fullGame }
            : base.videos.fullGame,
        }
      : base.videos,
    stats: overlay.stats
      ? {
          ...base.stats,
          ...overlay.stats,
          lastGames: overlay.stats.lastGames ?? base.stats.lastGames,
          shotChart: overlay.stats.shotChart ?? base.stats.shotChart,
          basketballTotals: overlay.stats.basketballTotals ?? base.stats.basketballTotals,
        }
      : base.stats,
    technicalFit: { ...base.technicalFit, ...overlay.technicalFit },
    whyHeFits: overlay.whyHeFits
      ? {
          ...base.whyHeFits,
          ...overlay.whyHeFits,
          scenarios: overlay.whyHeFits.scenarios ?? base.whyHeFits?.scenarios ?? [],
        }
      : base.whyHeFits,
    gallery: overlay.gallery
      ? {
          ...base.gallery,
          ...overlay.gallery,
          items: overlay.gallery.items ?? base.gallery?.items ?? [],
        }
      : base.gallery,
    socialMediaKit: overlay.socialMediaKit
      ? {
          ...base.socialMediaKit,
          ...overlay.socialMediaKit,
          months: overlay.socialMediaKit.months ?? base.socialMediaKit?.months ?? [],
          items: overlay.socialMediaKit.items ?? base.socialMediaKit?.items ?? [],
        }
      : base.socialMediaKit,
    returnToPlay: overlay.returnToPlay
      ? {
          ...base.returnToPlay,
          ...overlay.returnToPlay,
          intro: overlay.returnToPlay.intro ?? base.returnToPlay?.intro,
          injuryContext: overlay.returnToPlay.injuryContext ?? base.returnToPlay?.injuryContext,
          focusAreas: overlay.returnToPlay.focusAreas ?? base.returnToPlay?.focusAreas,
          status: overlay.returnToPlay.status ?? base.returnToPlay?.status ?? [],
          videoProof: overlay.returnToPlay.videoProof ?? base.returnToPlay?.videoProof ?? [],
        }
      : base.returnToPlay,
    shop: overlay.shop
      ? {
          ...base.shop,
          ...overlay.shop,
          products: overlay.shop.products ?? base.shop?.products ?? [],
        }
      : base.shop,
    story: overlay.story
      ? {
          ...base.story,
          ...overlay.story,
          chapters: overlay.story.chapters ?? base.story?.chapters ?? [],
        }
      : base.story,
    career: overlay.career ?? base.career,
    careerSection: overlay.careerSection ? { ...base.careerSection, ...overlay.careerSection } : base.careerSection,
    honors: overlay.honors ?? base.honors,
    verifications: overlay.verifications ?? base.verifications,
    contacts: {
      ...base.contacts,
      ...overlay.contacts,
      agency: { ...base.contacts.agency, ...overlay.contacts?.agency },
      representative: { ...base.contacts.representative, ...overlay.contacts?.representative },
      social: overlay.contacts?.social ?? base.contacts.social,
    },
    agencyRoster: overlay.agencyRoster ?? base.agencyRoster,
    locales: base.locales,
    slug: base.slug,
  };
}

const MONTHS: Record<ProfileLocale, readonly string[]> = {
  it: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export function formatProfileShortDate(isoDate: string, locale: ProfileLocale): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!m) return isoDate;
  const monthNum = Number(m[2]);
  const day = Number(m[3]);
  if (monthNum < 1 || monthNum > 12) return isoDate;
  return `${day} ${MONTHS[locale][monthNum - 1]} ${m[1]}`;
}

/** Path pubblico del profilo (dominio dedicato = root o /en). */
export function profilePublicPath(slug: string, locale: ProfileLocale, dedicatedDomain: boolean): string {
  if (locale === "en") return dedicatedDomain ? "/en" : `/en/${slug}`;
  return dedicatedDomain ? "/" : `/${slug}`;
}

/** Path pubblico sala video (dominio dedicato = /video o /en/video). */
export function videoPublicPath(slug: string, locale: ProfileLocale, dedicatedDomain: boolean): string {
  if (locale === "en") return dedicatedDomain ? "/en/video" : `/en/${slug}/video`;
  return dedicatedDomain ? "/video" : `/${slug}/video`;
}

export function localeSwitchHref(
  slug: string,
  target: ProfileLocale,
  dedicatedDomain: boolean,
): string {
  return profilePublicPath(slug, target, dedicatedDomain);
}
