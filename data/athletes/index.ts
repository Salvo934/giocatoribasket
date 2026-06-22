import { alfonsoZampogna } from "./alfonso-zampogna";
import { antonioCioppa } from "./antonio-cioppa";
import { antonioSorbara } from "./antonio-sorbara";
import { francescoSpinelli } from "./francesco-spinelli";
import { ilarioSimonetti } from "./ilario-simonetti";
import { thomasAguzzoli } from "./thomas-aguzzoli";
import { ugoSimon } from "./ugo-simon";
import { ilarioSimonettiEn } from "./translations/ilario-simonetti.en";
import type { AthleteProfile } from "@/lib/types/athlete";
import {
  mergeAthleteLocale,
  type AthleteLocaleOverlay,
  type ProfileLocale,
} from "@/lib/i18n/profile-locale";
import { hostFromPublicSiteUrl, normalizeHost } from "@/lib/public-site";

const athletes: AthleteProfile[] = [
  ilarioSimonetti,
  francescoSpinelli,
  thomasAguzzoli,
  antonioCioppa,
  antonioSorbara,
  alfonsoZampogna,
  ugoSimon,
];

function isPublished(athlete: AthleteProfile): boolean {
  return athlete.published !== false;
}

const athleteLocaleOverlays: Partial<
  Record<string, Partial<Record<Exclude<ProfileLocale, "it">, AthleteLocaleOverlay>>>
> = {
  "ilario-simonetti": { en: ilarioSimonettiEn },
};

export const athletesBySlug = Object.fromEntries(athletes.map((a) => [a.slug, a])) as Record<
  string,
  AthleteProfile
>;

export const athleteSlugs = athletes.filter(isPublished).map((a) => a.slug);

export function athleteSupportsLocale(slug: string, locale: ProfileLocale): boolean {
  const athlete = athletesBySlug[slug];
  if (!athlete || !isPublished(athlete)) return false;
  if (locale === "it") return true;
  return Boolean(athleteLocaleOverlays[slug]?.[locale]);
}

export function getAthlete(slug: string, locale: ProfileLocale = "it"): AthleteProfile | undefined {
  const base = athletesBySlug[slug];
  if (!base || !isPublished(base)) return undefined;
  if (locale === "it") return base;
  const overlay = athleteLocaleOverlays[slug]?.[locale];
  if (!overlay) return undefined;
  return mergeAthleteLocale(base, overlay);
}

/** Trova lo slug atleta dal dominio dedicato (es. alessandroferrari10.katahero.com). */
export function getAthleteSlugByHost(host: string): string | undefined {
  const normalized = normalizeHost(host);
  for (const athlete of athletes) {
    const athleteHost = athlete.seo.publicSiteUrl
      ? hostFromPublicSiteUrl(athlete.seo.publicSiteUrl)
      : null;
    if (athleteHost === normalized) return athlete.slug;
  }
  return undefined;
}

/** Slug per redirect root: host → env → primo atleta in registry. */
export function resolveAthleteSlugForHost(host?: string | null): string {
  if (host) {
    const byHost = getAthleteSlugByHost(host);
    if (byHost) return byHost;
  }
  const fromEnv = process.env.NEXT_PUBLIC_ATHLETE_SLUG?.trim();
  if (fromEnv && athletesBySlug[fromEnv] && isPublished(athletesBySlug[fromEnv])) return fromEnv;
  return athleteSlugs[0];
}
