import { alessandroFerrari } from "./alessandro-ferrari";
import { ilarioSimonetti } from "./ilario-simonetti";
import type { AthleteProfile } from "@/lib/types/athlete";

const athletes: AthleteProfile[] = [ilarioSimonetti, alessandroFerrari];

export const athletesBySlug = Object.fromEntries(athletes.map((a) => [a.slug, a])) as Record<
  string,
  AthleteProfile
>;

export const athleteSlugs = athletes.map((a) => a.slug);

export function getAthlete(slug: string): AthleteProfile | undefined {
  return athletesBySlug[slug];
}
