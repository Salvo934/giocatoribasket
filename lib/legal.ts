import type { AthleteLegalConfig, AthleteProfile } from "@/lib/types/athlete";
import { publicSiteOrigin } from "@/lib/public-site";

export type LegalController = {
  name: string;
  email: string;
  address?: string;
  website?: string;
};

export type PlatformLegalInfo = {
  name: string;
  url: string;
  privacyEmail: string;
};

export type ResolvedLegalContext = {
  athleteSlug: string;
  athleteName: string;
  siteOrigin: string | null;
  controller: LegalController;
  platform: PlatformLegalInfo;
  platformRoleNote: string;
  privacyPath: string;
  cookiePath: string;
  profilePath: string;
  policyUpdated: string;
  usesExternalPrivacy: boolean;
  usesExternalCookiePolicy: boolean;
  externalPrivacyUrl?: string;
  externalCookieUrl?: string;
};

const DEFAULT_PLATFORM: PlatformLegalInfo = {
  name: process.env.NEXT_PUBLIC_PLATFORM_NAME?.trim() || "KataHero",
  url: process.env.NEXT_PUBLIC_PLATFORM_URL?.trim() || "https://katahero.com",
  privacyEmail: process.env.NEXT_PUBLIC_PLATFORM_PRIVACY_EMAIL?.trim() || "privacy@katahero.com",
};

const DEFAULT_PLATFORM_NOTE =
  "KataHero fornisce l'infrastruttura tecnica (hosting, template Player Card) in qualità di responsabile del trattamento per conto del titolare, salvo diversa indicazione contrattuale.";

function defaultController(athlete: AthleteProfile): LegalController {
  const rep = athlete.contacts.representative;
  return {
    name: athlete.contacts.agency.name,
    email: rep.email?.trim() || DEFAULT_PLATFORM.privacyEmail,
    address: rep.role.includes("·") ? rep.role.split("·").slice(1).join("·").trim() : undefined,
    website: athlete.contacts.agency.website,
  };
}

function mergeController(athlete: AthleteProfile, legal?: AthleteLegalConfig): LegalController {
  const base = defaultController(athlete);
  const override = legal?.dataController;
  if (!override) return base;
  return {
    name: override.name || base.name,
    email: override.email || base.email,
    address: override.address ?? base.address,
    website: override.website ?? base.website,
  };
}

/** Contesto legale risolto per pagine privacy/cookie e footer. */
export function resolveLegalContext(athlete: AthleteProfile): ResolvedLegalContext {
  const legal = athlete.legal;
  const slug = athlete.slug;
  const profilePath = `/${slug}`;
  const privacyPath = `/${slug}/privacy`;
  const cookiePath = `/${slug}/cookie-policy`;

  return {
    athleteSlug: slug,
    athleteName: athlete.header.name,
    siteOrigin: publicSiteOrigin(athlete.seo.publicSiteUrl),
    controller: mergeController(athlete, legal),
    platform: DEFAULT_PLATFORM,
    platformRoleNote: legal?.platformRoleNote?.trim() || DEFAULT_PLATFORM_NOTE,
    privacyPath,
    cookiePath,
    profilePath,
    policyUpdated: legal?.policyUpdated?.trim() || athlete.header.lastUpdated,
    usesExternalPrivacy: Boolean(legal?.privacyPolicyUrl?.trim()),
    usesExternalCookiePolicy: Boolean(legal?.cookiePolicyUrl?.trim()),
    externalPrivacyUrl: legal?.privacyPolicyUrl?.trim(),
    externalCookieUrl: legal?.cookiePolicyUrl?.trim(),
  };
}
