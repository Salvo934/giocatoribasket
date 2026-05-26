import { alessandroFerrari } from "./alessandro-ferrari";
import { francescoSpinelli } from "./francesco-spinelli";
import { ilarioSimonetti } from "./ilario-simonetti";
import type { AthleteProfile } from "@/lib/types/athlete";
import { hostFromPublicSiteUrl, normalizeHost } from "@/lib/public-site";

const athletes: AthleteProfile[] = [ilarioSimonetti, alessandroFerrari, francescoSpinelli];

export const athletesBySlug = Object.fromEntries(athletes.map((a) => [a.slug, a])) as Record<
  string,
  AthleteProfile
>;

export const athleteSlugs = athletes.map((a) => a.slug);

export function getAthlete(slug: string): AthleteProfile | undefined {
  return athletesBySlug[slug];
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
  if (fromEnv && athletesBySlug[fromEnv]) return fromEnv;
  return athleteSlugs[0];
}
