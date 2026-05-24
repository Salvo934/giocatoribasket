"use client";

import { useState } from "react";
import type { ConsentPreferences } from "@/lib/consent";

type Props = {
  mode: "banner" | "settings";
  initialExternalMedia: boolean;
  initialAnalytics: boolean;
  onAcceptAll: () => void;
  onAcceptNecessary: () => void;
  onSave: (prefs: Pick<ConsentPreferences, "externalMedia" | "analytics">) => void;
  onClose: () => void;
};

export function CookieBanner({
  mode,
  initialExternalMedia,
  initialAnalytics,
  onAcceptAll,
  onAcceptNecessary,
  onSave,
  onClose,
}: Props) {
  const [externalMedia, setExternalMedia] = useState(initialExternalMedia);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const isSettings = mode === "settings";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/12 bg-zinc-950/95 p-5 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-6">
        <h2 id="cookie-banner-title" className="text-base font-semibold text-white">
          {isSettings ? "Preferenze cookie" : "Cookie e contenuti esterni"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Usiamo cookie tecnici necessari al funzionamento del sito. I contenuti video (YouTube) e, in
          futuro, eventuali strumenti statistici vengono attivati solo con il tuo consenso. Puoi
          modificare le scelte in qualsiasi momento.
        </p>

        {isSettings ? (
          <div className="mt-4 space-y-3">
            <label className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <span className="block text-sm font-medium text-white">Necessari</span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Sempre attivi: sicurezza, preferenze cookie, funzionamento base.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3">
              <input
                type="checkbox"
                checked={externalMedia}
                onChange={(e) => setExternalMedia(e.target.checked)}
                className="mt-1 accent-accent"
              />
              <span>
                <span className="block text-sm font-medium text-white">Contenuti esterni (YouTube)</span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Anteprime e player video incorporati da Google/YouTube.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3 opacity-70">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                disabled
                className="mt-1 accent-accent"
              />
              <span>
                <span className="block text-sm font-medium text-white">Statistiche</span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Non attive su questo sito al momento.
                </span>
              </span>
            </label>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          {isSettings ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
              >
                Chiudi
              </button>
              <button
                type="button"
                onClick={() => onSave({ externalMedia, analytics: false })}
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-accent/40 hover:text-accent"
              >
                Salva preferenze
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onAcceptNecessary}
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
              >
                Solo necessari
              </button>
              <button
                type="button"
                onClick={onAcceptAll}
                className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-black transition hover:bg-[#e8ff6a]"
              >
                Accetta tutti
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
