import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveAthleteSlugForHost } from "@/data/athletes";

/** Shortcut: /privacy → /{slug}/privacy in base al dominio. */
export default async function PrivacyShortcutPage() {
  const host = (await headers()).get("host");
  redirect(`/${resolveAthleteSlugForHost(host)}/privacy`);
}
