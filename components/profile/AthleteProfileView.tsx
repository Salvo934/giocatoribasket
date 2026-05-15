import type { AthleteProfile } from "@/lib/types/athlete";
import { CareerTimeline } from "./CareerTimeline";
import { ContactsPanel } from "./ContactsPanel";
import { HonorsPanel } from "./HonorsPanel";
import { MarketPanel } from "./MarketPanel";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileNav } from "./ProfileNav";
import { ScoutPanel } from "./ScoutPanel";
import { StatsPanel } from "./StatsPanel";
import { TechnicalFitPanel } from "./TechnicalFitPanel";
import { VideoHub } from "./VideoHub";

type Props = { athlete: AthleteProfile };

export function AthleteProfileView({ athlete }: Props) {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(223,255,74,0.07),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(100,160,255,0.04),transparent_50%),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(223,255,74,0.03),transparent_45%)]">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" aria-hidden />
      <ProfileHeader athlete={athlete} />
      <div className="relative z-10 w-full min-w-0">
        <div className="mx-auto min-w-0 w-full max-w-360">
          <ProfileNav />
          <div className="min-w-0">
            <main id="contenuto-profilo" className="min-w-0 pb-24 lg:pb-0">
              <ScoutPanel athlete={athlete} />
              <MarketPanel athlete={athlete} />
              <VideoHub athlete={athlete} />
              <StatsPanel athlete={athlete} />
              <TechnicalFitPanel athlete={athlete} />
              <CareerTimeline athlete={athlete} />
              <HonorsPanel athlete={athlete} />
              <ContactsPanel athlete={athlete} />
            </main>
            <footer className="border-t border-white/6 bg-linear-to-t from-black/40 to-transparent py-12 md:py-14">
              <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-600">Player Card</p>
                <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-zinc-500">
                  Template demo — sostituire con contenuti ufficiali dell&apos;atleta e dell&apos;agenzia.
                </p>
                {athlete.seo.publicSiteUrl ? (
                  <p className="mt-4 text-xs text-zinc-500">
                    Sito ufficiale:{" "}
                    <a
                      href={athlete.seo.publicSiteUrl}
                      className="font-medium text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-accent hover:decoration-accent/50"
                    >
                      {athlete.seo.publicSiteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                ) : null}
                <p className="mt-6 text-xs text-zinc-500">
                  Servizio creato da{" "}
                  <a
                    href="https://katahero.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-accent hover:decoration-accent/50"
                  >
                    katahero.com
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
