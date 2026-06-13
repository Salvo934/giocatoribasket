"use client";

import Link from "next/link";
import type { AthleteProfile } from "@/lib/types/athlete";
import type { ProfileLocale } from "@/lib/i18n/profile-locale";
import { LegalFooterLinks } from "@/components/legal/LegalFooterLinks";
import { ProfileLocaleProvider, useProfileLocale } from "./ProfileLocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { VideoHub } from "./VideoHub";

type Props = { athlete: AthleteProfile; locale?: ProfileLocale; dedicatedDomain?: boolean };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function VideoOnlyHeader() {
  const { ui, athlete, profilePath } = useProfileLocale();
  const h = athlete.header;

  return (
    <header className="relative border-b border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-360 flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7eb3ff]">
            {ui.video.videoOnlyEyebrow}
          </p>
          <p className="mt-1 truncate text-lg font-bold text-white sm:text-xl">
            {h.name}
            {h.number ? <span className="ml-2 font-mono text-base text-zinc-500">#{h.number}</span> : null}
          </p>
          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {h.role} · {h.currentClub}
          </p>
        </div>
        <Link
          href={profilePath}
          className={`inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold uppercase tracking-wider text-zinc-200 transition hover:border-white/25 hover:bg-white/8 hover:text-white ${focusRing}`}
        >
          {ui.video.backToFullProfile} ↗
        </Link>
      </div>
    </header>
  );
}

function VideoOnlyFooter() {
  const { athlete } = useProfileLocale();

  return (
    <footer className="border-t border-white/8 px-4 py-6 sm:px-6 lg:px-8">
      <LegalFooterLinks athlete={athlete} layout="inline" />
    </footer>
  );
}

export function AthleteVideoOnlyView({ athlete, locale = "it", dedicatedDomain = false }: Props) {
  return (
    <ProfileLocaleProvider locale={locale} athlete={athlete} dedicatedDomain={dedicatedDomain} mode="video">
      <LanguageSwitcher />
      <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(223,255,74,0.07),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(100,160,255,0.04),transparent_50%)]">
        <VideoOnlyHeader />
        <div className="relative z-10 mx-auto min-w-0 w-full max-w-360 px-0 sm:px-0">
          <main id="contenuto-video" className="min-w-0 pb-12">
            <VideoHub athlete={athlete} />
          </main>
          <VideoOnlyFooter />
        </div>
      </div>
    </ProfileLocaleProvider>
  );
}
