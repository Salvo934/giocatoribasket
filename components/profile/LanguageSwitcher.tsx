"use client";

import Link from "next/link";
import { useProfileLocale } from "./ProfileLocaleContext";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function LanguageSwitcher() {
  const { locale, showLanguageSwitch, switchToEnglishHref, switchToItalianHref, ui } = useProfileLocale();
  if (!showLanguageSwitch) return null;

  return (
    <div
      className="fixed z-40 flex items-center gap-1 rounded-full border border-white/12 bg-zinc-950/90 p-1 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.85)] backdrop-blur-md"
      style={{ top: "max(1rem, env(safe-area-inset-top))", right: "max(1rem, env(safe-area-inset-right))" }}
      aria-label={ui.languageSwitch.label}
    >
      {locale === "it" ? (
        <>
          <span className="rounded-full bg-accent/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
            IT
          </span>
          <Link
            href={switchToEnglishHref}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 transition hover:bg-white/6 hover:text-white ${focusRing}`}
          >
            EN
          </Link>
        </>
      ) : (
        <>
          <Link
            href={switchToItalianHref}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 transition hover:bg-white/6 hover:text-white ${focusRing}`}
          >
            IT
          </Link>
          <span className="rounded-full bg-accent/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
            EN
          </span>
        </>
      )}
    </div>
  );
}
