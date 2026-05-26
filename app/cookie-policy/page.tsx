import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveAthleteSlugForHost } from "@/data/athletes";

/** Shortcut: /cookie-policy → /{slug}/cookie-policy in base al dominio. */
export default async function CookiePolicyShortcutPage() {
  const host = (await headers()).get("host");
  redirect(`/${resolveAthleteSlugForHost(host)}/cookie-policy`);
}
