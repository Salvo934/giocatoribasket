import type { AthleteSocialMediaKit, SocialKitAsset, SocialKitMonth } from "@/lib/types/athlete";
import type { ProfileLocale } from "@/lib/i18n/profile-locale";

export type ResolvedSocialKitMonth = {
  key: string;
  label: string;
  items: SocialKitAsset[];
};

const UNDATED_KEY = "__undated__";

function monthKeyFromDate(matchDate?: string): string | null {
  if (!matchDate?.trim()) return null;
  const match = /^(\d{4})-(\d{2})/.exec(matchDate.trim());
  return match ? `${match[1]}-${match[2]}` : null;
}

export function formatSocialKitMonthLabel(
  monthKey: string,
  locale: ProfileLocale,
  customLabel?: string,
): string {
  if (customLabel?.trim()) return customLabel.trim();
  if (monthKey === UNDATED_KEY) {
    return locale === "en" ? "Undated" : "Senza data";
  }

  const [year, month] = monthKey.split("-").map(Number);
  if (!year || !month) return monthKey;

  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

function groupItemsByMonth(items: SocialKitAsset[], locale: ProfileLocale): ResolvedSocialKitMonth[] {
  const buckets = new Map<string, SocialKitAsset[]>();

  for (const item of items) {
    const key = monthKeyFromDate(item.matchDate) ?? UNDATED_KEY;
    const list = buckets.get(key) ?? [];
    list.push(item);
    buckets.set(key, list);
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => {
      if (a === UNDATED_KEY) return 1;
      if (b === UNDATED_KEY) return -1;
      return b.localeCompare(a);
    })
    .map(([key, bucketItems]) => ({
      key,
      label: formatSocialKitMonthLabel(key, locale),
      items: bucketItems,
    }));
}

function resolveExplicitMonths(months: SocialKitMonth[], locale: ProfileLocale): ResolvedSocialKitMonth[] {
  return [...months]
    .sort((a, b) => b.month.localeCompare(a.month))
    .map((entry) => ({
      key: entry.month,
      label: formatSocialKitMonthLabel(entry.month, locale, entry.label),
      items: entry.items,
    }));
}

export function resolveSocialKitMonths(
  kit: Pick<AthleteSocialMediaKit, "months" | "items">,
  locale: ProfileLocale,
): ResolvedSocialKitMonth[] {
  if (kit.months?.length) {
    return resolveExplicitMonths(kit.months, locale);
  }
  if (kit.items?.length) {
    return groupItemsByMonth(kit.items, locale);
  }
  return [];
}

export function totalSocialKitAssets(months: ResolvedSocialKitMonth[]): number {
  return months.reduce((sum, month) => sum + month.items.length, 0);
}
