"use client";

import type { AthleteProfile } from "@/lib/types/athlete";
import type { ProfileLocale } from "@/lib/i18n/profile-locale";
import { ProfileLocaleProvider } from "./ProfileLocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CareerTimeline } from "./CareerTimeline";
import { ContactsPanel } from "./ContactsPanel";
import { GalleryPanel } from "./GalleryPanel";
import { HonorsPanel } from "./HonorsPanel";
import { MarketPanel } from "./MarketPanel";
import { ReturnToPlayPanel } from "./ReturnToPlayPanel";
import { ProfileFooter } from "./ProfileFooter";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileNav } from "./ProfileNav";
import { ScoutPanel } from "./ScoutPanel";
import { SocialMediaKitPanel } from "./SocialMediaKitPanel";
import { StatsPanel } from "./StatsPanel";
import { TechnicalFitPanel } from "./TechnicalFitPanel";
import { VideoHub } from "./VideoHub";
import { WhyHeFitsPanel } from "./WhyHeFitsPanel";

type Props = { athlete: AthleteProfile; locale?: ProfileLocale; dedicatedDomain?: boolean };

export function AthleteProfileView({ athlete, locale = "it", dedicatedDomain = false }: Props) {
  return (
    <ProfileLocaleProvider locale={locale} athlete={athlete} dedicatedDomain={dedicatedDomain}>
      <LanguageSwitcher />
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(223,255,74,0.07),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(100,160,255,0.04),transparent_50%),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(223,255,74,0.03),transparent_45%)]">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" aria-hidden />
      <ProfileHeader athlete={athlete} />
      <div className="relative z-10 w-full min-w-0">
        <div className="mx-auto min-w-0 w-full max-w-360">
          <ProfileNav
            showGallery={Boolean(athlete.gallery?.items?.length)}
            showSocialKit={Boolean(athlete.socialMediaKit)}
            showReturnToPlay={Boolean(athlete.returnToPlay)}
          />
          <div className="min-w-0">
            <main id="contenuto-profilo" className="min-w-0 pb-24 lg:pb-0">
              <ScoutPanel athlete={athlete} />
              <MarketPanel athlete={athlete} />
              <ReturnToPlayPanel athlete={athlete} />
              <VideoHub athlete={athlete} />
              <StatsPanel athlete={athlete} />
              <TechnicalFitPanel athlete={athlete} />
              <WhyHeFitsPanel athlete={athlete} />
              <GalleryPanel athlete={athlete} />
              <SocialMediaKitPanel athlete={athlete} />
              <CareerTimeline athlete={athlete} />
              <HonorsPanel athlete={athlete} />
              <ContactsPanel athlete={athlete} />
            </main>
            <ProfileFooter athlete={athlete} />
          </div>
        </div>
      </div>
    </div>
    </ProfileLocaleProvider>
  );
}
