"use client";

import type { ReactNode } from "react";
import { useCookieConsent } from "./CookieConsentProvider";

type Props = {
  title: string;
  description: string;
  onAccept?: () => void;
  children?: ReactNode;
};

/** Blocco mostrato al posto di embed/thumbnail YouTube finché non c'è consenso. */
export function YouTubeConsentGate({ title, description, onAccept, children }: Props) {
  const { externalMediaAllowed, acceptAll, openSettings, ready, mounted } = useCookieConsent();
  const canRenderMedia = mounted && ready;

  if (!canRenderMedia) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">Caricamento preferenze…</p>
      </div>
    );
  }

  if (externalMediaAllowed) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full min-h-40 flex-col items-center justify-center gap-4 bg-zinc-950 p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-zinc-500">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            acceptAll();
            onAccept?.();
          }}
          className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-xs font-bold text-black transition hover:bg-[#e8ff6a]"
        >
          Accetta YouTube
        </button>
        <button
          type="button"
          onClick={openSettings}
          className="inline-flex h-9 items-center justify-center rounded-full border border-white/15 px-4 text-xs font-semibold text-zinc-300 transition hover:border-white/30 hover:text-white"
        >
          Preferenze cookie
        </button>
      </div>
    </div>
  );
}
