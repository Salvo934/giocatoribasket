"use client";

import { useCookieConsent } from "./CookieConsentProvider";

type Props = {
  className?: string;
};

export function CookieSettingsButton({ className }: Props) {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={
        className ??
        "text-zinc-500 underline decoration-white/15 underline-offset-4 transition hover:text-zinc-300 hover:decoration-white/30"
      }
    >
      Gestisci cookie
    </button>
  );
}
