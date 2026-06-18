export function youtubeVideoId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    let id: string | null = null;

    if (host === "youtu.be") {
      id = u.pathname.replace(/^\//, "").split("/")[0] ?? null;
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      const path = u.pathname;
      if (path === "/watch" || path.startsWith("/watch/")) {
        id = u.searchParams.get("v");
      } else if (path.startsWith("/embed/")) {
        id = path.slice("/embed/".length).split("/")[0] ?? null;
      } else if (path.startsWith("/shorts/")) {
        id = path.slice("/shorts/".length).split("/")[0] ?? null;
      } else if (path.startsWith("/v/")) {
        id = path.slice("/v/".length).split("/")[0] ?? null;
      }
    }

    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function youtubeIsShort(rawUrl: string): boolean {
  try {
    const u = new URL(rawUrl.trim());
    return u.pathname.startsWith("/shorts/");
  } catch {
    return false;
  }
}

export function youtubeThumbnailUrl(rawUrl: string): string | null {
  const id = youtubeVideoId(rawUrl);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : null;
}

export function youtubeEmbedUrl(rawUrl: string): string {
  const id = youtubeVideoId(rawUrl);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
}

/** Embed muto in loop per sfondo hero (Shorts / clip verticali). */
export function youtubeBackgroundEmbedUrl(rawUrl: string): string {
  const id = youtubeVideoId(rawUrl);
  if (!id) return "";

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    enablejsapi: "0",
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
