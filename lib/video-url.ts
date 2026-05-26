/** Path locale in `public` (es. `/athletes/clip.mp4`). */
export function isLocalVideoUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  return /^\/[^?]+\.(mp4|webm|mov)(\?.*)?$/i.test(trimmed);
}
