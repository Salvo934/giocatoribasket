import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { athleteSlugs, getAthlete } from "@/data/athletes";
import { buildAthleteMetadata } from "@/lib/athlete-metadata";
import { publicSiteOrigin, stripTrailingSlash } from "@/lib/public-site";

const homeSlug = athleteSlugs[0];

/** Anteprima link sulla root (es. ilariosimonetti7.katahero.com) — il crawler non segue sempre il redirect. */
export function generateMetadata(): Metadata {
  const athlete = getAthlete(homeSlug);
  if (!athlete) return {};

  const origin = publicSiteOrigin(athlete.seo.publicSiteUrl);
  return buildAthleteMetadata(athlete, {
    canonicalPath: "/",
    openGraphUrl: origin ? `${stripTrailingSlash(origin)}/` : undefined,
  });
}

export default function Home() {
  redirect(`/${homeSlug}`);
}
