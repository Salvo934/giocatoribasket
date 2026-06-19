/** Normalizza numero o URL wa.me in link WhatsApp con messaggio precompilato. */
export function buildWhatsAppRequestUrl(phoneOrUrl: string, message: string): string {
  const trimmed = phoneOrUrl.trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    const url = new URL(trimmed);
    url.searchParams.set("text", message);
    return url.toString();
  }

  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function resolveSocialKitWhatsApp(
  kitWhatsApp?: string,
  contactsWhatsApp?: string,
  headerWhatsApp?: string,
): string | null {
  const candidate = kitWhatsApp?.trim() || contactsWhatsApp?.trim() || headerWhatsApp?.trim();
  return candidate || null;
}
