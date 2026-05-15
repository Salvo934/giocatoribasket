"use client";

import { useCallback, useMemo, useState } from "react";

type Props = {
  path: string;
  publicSiteUrl?: string;
  className?: string;
};

export function ShareProfileButton({ path, publicSiteUrl, className }: Props) {
  const [label, setLabel] = useState("Copia link");

  const absoluteUrl = useMemo(() => {
    const trimmed = publicSiteUrl?.trim();
    if (trimmed) return trimmed;
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
        setLabel("Condiviso");
        setTimeout(() => setLabel("Copia link"), 2000);
        return;
      }
    } catch {
      /* annullato o non disponibile */
    }

    try {
      await navigator.clipboard.writeText(url);
      setLabel("Copiato");
      setTimeout(() => setLabel("Copia link"), 2200);
    } catch {
      setLabel("Errore");
      setTimeout(() => setLabel("Copia link"), 2200);
    }
  }, [absoluteUrl, path]);

  return (
    <button type="button" onClick={() => void onShare()} className={className}>
      {label}
    </button>
  );
}
