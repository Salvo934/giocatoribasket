import type { AthleteVideo, MonthlyHighlight } from "@/lib/types/athlete";
import type { ProfileLocale } from "@/lib/i18n/profile-locale";
import { formatSocialKitMonthLabel } from "@/lib/social-kit-months";

export type ResolvedMonthlyHighlight = {
  key: string;
  label: string;
  clip: AthleteVideo;
};

export function resolveMonthlyHighlights(
  entries: MonthlyHighlight[],
  locale: ProfileLocale,
): ResolvedMonthlyHighlight[] {
  return [...entries]
    .sort((a, b) => b.month.localeCompare(a.month))
    .map((entry) => ({
      key: entry.month,
      label: formatSocialKitMonthLabel(entry.month, locale, entry.label),
      clip: entry.clip,
    }));
}
