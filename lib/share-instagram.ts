function absolutePublicUrl(src: string): string {
  const trimmed = src.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

function fileNameFromSrc(src: string, downloadName?: string): string {
  if (downloadName?.trim()) return downloadName.trim();
  const base = src.split("/").pop() ?? "instagram-post.jpg";
  return base.includes(".") ? base : `${base}.jpg`;
}

async function fetchImageAsFile(src: string, downloadName?: string): Promise<File> {
  const url = absolutePublicUrl(src);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Impossibile caricare l'immagine.");
  const blob = await res.blob();
  const type = blob.type || "image/jpeg";
  return new File([blob], fileNameFromSrc(src, downloadName), { type });
}

function triggerDownload(file: File) {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function copyText(text: string) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export type InstagramShareResult = "shared" | "fallback";

/**
 * Condivide un asset come post Instagram.
 * Su mobile apre il foglio di sistema (Instagram incluso); su desktop scarica l'immagine.
 */
export async function shareImageToInstagram(options: {
  src: string;
  downloadName?: string;
  caption?: string;
}): Promise<InstagramShareResult> {
  const file = await fetchImageAsFile(options.src, options.downloadName);
  const caption = options.caption?.trim() ?? "";
  await copyText(caption);

  const shareData: ShareData = { files: [file], title: "Condividi su Instagram" };
  if (caption) shareData.text = caption;

  if (typeof navigator.share === "function" && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") throw err;
    }
  }

  triggerDownload(file);
  return "fallback";
}

export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
