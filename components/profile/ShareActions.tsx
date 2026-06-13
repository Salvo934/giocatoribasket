"use client";

import { useCallback, useMemo, useState } from "react";
import type { ProfileUi } from "@/lib/i18n/profile-ui";
import { useProfileLocale } from "./ProfileLocaleContext";

type ShareLabels = ProfileUi["share"];

type Props = {
  path?: string;
  publicSiteUrl?: string;
  className?: string;
  shareLabels?: ShareLabels;
  shareTitle?: string;
  showIcon?: boolean;
  compactLabel?: string;
};

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12.5 11.5l4-2-4-2v1.5H8a3 3 0 00-3 3v1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 8.5l-4 2 4 2v-1.5H12a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareProfileButton({
  path: pathProp,
  publicSiteUrl,
  className,
  shareLabels: shareLabelsProp,
  shareTitle,
  showIcon = false,
  compactLabel,
}: Props) {
  const { profilePath, ui } = useProfileLocale();
  const path = pathProp ?? profilePath;
  const share = shareLabelsProp ?? ui.share;
  const [label, setLabel] = useState(share.label);

  const absoluteUrl = useMemo(() => {
    const trimmed = publicSiteUrl?.trim();
    if (trimmed) {
      const base = trimmed.replace(/\/$/, "");
      if (path === "/") return base;
      return `${base}${path.startsWith("/") ? path : `/${path}`}`;
    }
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
  }, [path, publicSiteUrl]);

  const onShare = useCallback(async () => {
    const url =
      absoluteUrl || (typeof window !== "undefined" ? `${window.location.origin}${path}` : "");
    if (!url) return;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: shareTitle ?? document.title, url });
        setLabel(share.shared);
        setTimeout(() => setLabel(share.label), 2000);
        return;
      }
    } catch {
      /* annullato o non disponibile */
    }

    try {
      await navigator.clipboard.writeText(url);
      setLabel(share.copied);
      setTimeout(() => setLabel(share.label), 2200);
    } catch {
      setLabel(share.error);
      setTimeout(() => setLabel(share.label), 2200);
    }
  }, [absoluteUrl, path, share, shareTitle]);

  return (
    <button type="button" onClick={() => void onShare()} className={className}>
      {showIcon ? <ShareIcon className="size-3.5 shrink-0 opacity-90 sm:size-4" /> : null}
      {compactLabel && label === share.label ? (
        <>
          <span className="sm:hidden">{compactLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}
