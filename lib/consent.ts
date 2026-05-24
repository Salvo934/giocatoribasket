export const CONSENT_STORAGE_KEY = "kh-cookie-consent-v1";

export type ConsentPreferences = {
  necessary: true;
  externalMedia: boolean;
  analytics: boolean;
  updatedAt: string;
};

export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  externalMedia: false,
  analytics: false,
  updatedAt: "",
};

export function parseConsent(raw: string | null): ConsentPreferences | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (typeof data.externalMedia !== "boolean" || typeof data.analytics !== "boolean") {
      return null;
    }
    return {
      necessary: true,
      externalMedia: data.externalMedia,
      analytics: data.analytics,
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function serializeConsent(prefs: ConsentPreferences): string {
  return JSON.stringify(prefs);
}
