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
};

export function ShareProfileButton({ path: pathProp, publicSiteUrl, className, shareLabels: shareLabelsProp }: Props) {
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
        await navigator.share({ title: document.title, url });
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
  }, [absoluteUrl, path, share]);

  return (
    <button type="button" onClick={() => void onShare()} className={className}>
      {label}
    </button>
  );
}
