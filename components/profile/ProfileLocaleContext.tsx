"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { AthleteProfile } from "@/lib/types/athlete";
import {
  formatProfileShortDate,
  profilePublicPath,
  localeSwitchHref,
  type ProfileLocale,
} from "@/lib/i18n/profile-locale";
import { getProfileUi, type ProfileUi } from "@/lib/i18n/profile-ui";

type ProfileLocaleContextValue = {
  locale: ProfileLocale;
  ui: ProfileUi;
  athlete: AthleteProfile;
  formatDate: (iso: string) => string;
  profilePath: string;
  switchToItalianHref: string;
  switchToEnglishHref: string;
  showLanguageSwitch: boolean;
};

const ProfileLocaleContext = createContext<ProfileLocaleContextValue | null>(null);

type ProviderProps = {
  locale: ProfileLocale;
  athlete: AthleteProfile;
  dedicatedDomain: boolean;
  children: ReactNode;
};

export function ProfileLocaleProvider({ locale, athlete, dedicatedDomain, children }: ProviderProps) {
  const ui = getProfileUi(locale);
  const supportsEn = athlete.locales?.includes("en") ?? false;
  const showLanguageSwitch = supportsEn;

  const value: ProfileLocaleContextValue = {
    locale,
    ui,
    athlete,
    formatDate: (iso) => formatProfileShortDate(iso, locale),
    profilePath: profilePublicPath(athlete.slug, locale, dedicatedDomain),
    switchToItalianHref: localeSwitchHref(athlete.slug, "it", dedicatedDomain),
    switchToEnglishHref: localeSwitchHref(athlete.slug, "en", dedicatedDomain),
    showLanguageSwitch,
  };

  useEffect(() => {
    document.documentElement.lang = ui.htmlLang;
  }, [ui.htmlLang]);

  return <ProfileLocaleContext.Provider value={value}>{children}</ProfileLocaleContext.Provider>;
}

export function useProfileLocale(): ProfileLocaleContextValue {
  const ctx = useContext(ProfileLocaleContext);
  if (!ctx) {
    throw new Error("useProfileLocale must be used within ProfileLocaleProvider");
  }
  return ctx;
}
