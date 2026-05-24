"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_STORAGE_KEY,
  DEFAULT_CONSENT,
  parseConsent,
  serializeConsent,
  type ConsentPreferences,
} from "@/lib/consent";
import { CookieBanner } from "./CookieBanner";

type CookieConsentContextValue = {
  consent: ConsentPreferences | null;
  ready: boolean;
  externalMediaAllowed: boolean;
  analyticsAllowed: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  savePreferences: (prefs: Pick<ConsentPreferences, "externalMedia" | "analytics">) => void;
  openSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = parseConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
    setConsent(stored);
    setReady(true);
  }, []);

  const persist = useCallback((prefs: ConsentPreferences) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(prefs));
    setConsent(prefs);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      necessary: true,
      externalMedia: true,
      analytics: false,
      updatedAt: new Date().toISOString(),
    });
  }, [persist]);

  const acceptNecessary = useCallback(() => {
    persist({
      necessary: true,
      externalMedia: false,
      analytics: false,
      updatedAt: new Date().toISOString(),
    });
  }, [persist]);

  const savePreferences = useCallback(
    (prefs: Pick<ConsentPreferences, "externalMedia" | "analytics">) => {
      persist({
        necessary: true,
        externalMedia: prefs.externalMedia,
        analytics: prefs.analytics,
        updatedAt: new Date().toISOString(),
      });
    },
    [persist],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      ready,
      externalMediaAllowed: consent?.externalMedia ?? false,
      analyticsAllowed: consent?.analytics ?? false,
      acceptAll,
      acceptNecessary,
      savePreferences,
      openSettings,
    }),
    [acceptAll, acceptNecessary, consent, openSettings, ready, savePreferences],
  );

  const showBanner = ready && !consent && !settingsOpen;

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {(showBanner || settingsOpen) && (
        <CookieBanner
          mode={settingsOpen ? "settings" : "banner"}
          initialExternalMedia={consent?.externalMedia ?? false}
          initialAnalytics={consent?.analytics ?? false}
          onAcceptAll={acceptAll}
          onAcceptNecessary={acceptNecessary}
          onSave={savePreferences}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

export { DEFAULT_CONSENT };
