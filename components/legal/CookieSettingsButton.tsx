"use client";

import { useCookieConsent } from "./CookieConsentProvider";

type Props = {
  className?: string;
  variant?: "link" | "pill";
};

export function CookieSettingsButton({ className, variant = "link" }: Props) {
  const { openSettings } = useCookieConsent();

  const pillClass =
    "inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/4 px-4 text-xs font-semibold text-zinc-300 transition hover:border-accent/35 hover:bg-accent/10 hover:text-accent";
  const linkClass =
    "text-zinc-500 underline decoration-white/15 underline-offset-4 transition hover:text-zinc-300 hover:decoration-white/30";

  return (
    <button
      type="button"
      onClick={openSettings}
      className={
        variant === "pill"
          ? [pillClass, className].filter(Boolean).join(" ")
          : (className ?? linkClass)
      }
    >
      Gestisci cookie
    </button>
  );
}
