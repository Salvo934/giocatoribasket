import Link from "next/link";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import { resolveLegalContext } from "@/lib/legal";
import type { AthleteProfile } from "@/lib/types/athlete";

type Props = {
  athlete: AthleteProfile;
  layout?: "inline" | "stack";
};

const pillClass =
  "inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/4 px-4 text-xs font-semibold text-zinc-300 transition hover:border-white/22 hover:bg-white/7 hover:text-white";

export function LegalFooterLinks({ athlete, layout = "inline" }: Props) {
  const legal = resolveLegalContext(athlete);
  const isStack = layout === "stack";

  return (
    <nav
      className={
        isStack
          ? "mt-4 flex flex-col gap-2"
          : "mt-6 flex flex-wrap items-center justify-center gap-2"
      }
      aria-label="Informazioni legali"
    >
      {legal.usesExternalPrivacy && legal.externalPrivacyUrl ? (
        <a
          href={legal.externalPrivacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={pillClass}
        >
          Privacy ↗
        </a>
      ) : (
        <Link href={legal.privacyPath} className={pillClass}>
          Privacy
        </Link>
      )}
      {legal.usesExternalCookiePolicy && legal.externalCookieUrl ? (
        <a
          href={legal.externalCookieUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={pillClass}
        >
          Cookie ↗
        </a>
      ) : (
        <Link href={legal.cookiePath} className={pillClass}>
          Cookie policy
        </Link>
      )}
      <CookieSettingsButton variant="pill" className={isStack ? "w-full sm:w-auto" : undefined} />
    </nav>
  );
}
