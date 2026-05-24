import { redirect } from "next/navigation";
import { athleteSlugs } from "@/data/athletes";

/** Shortcut per deploy mono-atleta: /cookie-policy → /{slug}/cookie-policy */
export default function CookiePolicyShortcutPage() {
  redirect(`/${athleteSlugs[0]}/cookie-policy`);
}
