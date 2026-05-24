import { redirect } from "next/navigation";
import { athleteSlugs } from "@/data/athletes";

/** Shortcut per deploy mono-atleta: /privacy → /{slug}/privacy */
export default function PrivacyShortcutPage() {
  redirect(`/${athleteSlugs[0]}/privacy`);
}
