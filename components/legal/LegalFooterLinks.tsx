import Link from "next/link";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import { resolveLegalContext } from "@/lib/legal";
import type { AthleteProfile } from "@/lib/types/athlete";

type Props = { athlete: AthleteProfile };

export function LegalFooterLinks({ athlete }: Props) {
  const legal = resolveLegalContext(athlete);

  return (
    <nav
      className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500"
      aria-label="Informazioni legali"
    >
      {legal.usesExternalPrivacy && legal.externalPrivacyUrl ? (
        <a
          href={legal.externalPrivacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300"
        >
          Privacy
        </a>
      ) : (
        <Link href={legal.privacyPath} className="hover:text-zinc-300">
          Privacy
        </Link>
      )}
      {legal.usesExternalCookiePolicy && legal.externalCookieUrl ? (
        <a
          href={legal.externalCookieUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300"
        >
          Cookie policy
        </a>
      ) : (
        <Link href={legal.cookiePath} className="hover:text-zinc-300">
          Cookie policy
        </Link>
      )}
      <CookieSettingsButton />
    </nav>
  );
}
