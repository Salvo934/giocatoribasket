/** Rimuove slash finali per comporre URL sicure. */
export function stripTrailingSlash(s: string): string {
  return s.trim().replace(/\/+$/, "");
}

/** Host normalizzato (minuscolo, senza porta). */
export function normalizeHost(host: string): string {
  return host.trim().toLowerCase().split(":")[0];
}

/** Estrae l'host da un publicSiteUrl (es. https://nome.katahero.com). */
export function hostFromPublicSiteUrl(publicSiteUrl: string): string | null {
  try {
    return normalizeHost(new URL(publicSiteUrl.trim()).host);
  } catch {
    return null;
  }
}

/**
 * Origine pubblica del sito atleta (sottodominio dedicato o env di deploy).
 * Ordine: dato profilo → NEXT_PUBLIC_SITE_URL.
 */
export function publicSiteOrigin(publicSiteUrl?: string | null): string | null {
  const fromProfile = publicSiteUrl?.trim();
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = stripTrailingSlash(fromProfile || fromEnv || "");
  return base || null;
}

export function absoluteProfileUrlFromOrigin(origin: string, slug: string): string {
  return `${stripTrailingSlash(origin)}/${slug}`;
}

/** URL assoluta della scheda (path tipo `/slug`) — client e server. */
export function resolveShareableProfileUrl(path: string, publicSiteUrl?: string | null): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const origin = publicSiteOrigin(publicSiteUrl);
  if (origin) return `${origin}${p}`;
  if (typeof window !== "undefined") return `${window.location.origin}${p}`;
  return p;
}
