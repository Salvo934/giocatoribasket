import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { athleteSupportsLocale, resolveAthleteSlugForHost } from "@/data/athletes";

export default async function EnglishHome() {
  const host = (await headers()).get("host");
  const slug = resolveAthleteSlugForHost(host);
  if (!athleteSupportsLocale(slug, "en")) {
    redirect(`/${slug}`);
  }
  redirect(`/en/${slug}`);
}
