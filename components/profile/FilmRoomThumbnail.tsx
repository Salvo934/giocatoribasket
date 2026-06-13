"use client";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import { isLocalVideoUrl } from "@/lib/video-url";
import { youtubeThumbnailUrl } from "@/lib/youtube";

export type FilmRoomClip = {
  title: string;
  url?: string;
  poster?: string;
};

type Props = {
  clip: FilmRoomClip;
  selected?: boolean;
  onSelect: () => void;
  defaultPoster?: string;
  /** Testo se non c’è anteprima (es. “Clip in arrivo”) */
  emptyLabel?: string;
  nowPlayingLabel?: string;
};

export function FilmRoomThumbnail({
  clip,
  selected = false,
  onSelect,
  defaultPoster,
  emptyLabel = "Clip",
  nowPlayingLabel = "In riproduzione",
}: Props) {
  const { externalMediaAllowed, ready, mounted } = useCookieConsent();
  const url = clip.url?.trim() ?? "";
  const canRenderMedia = mounted && ready;
  const thumb = canRenderMedia && externalMediaAllowed && url && !isLocalVideoUrl(url) ? youtubeThumbnailUrl(url) : null;
  const localVideo = url ? isLocalVideoUrl(url) : false;
  const poster = clip.poster ?? (localVideo ? defaultPoster : undefined);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group relative w-full shrink-0 overflow-hidden rounded-lg border bg-black text-left outline-none ring-offset-2 ring-offset-black transition hover:border-[#C9082A]/55 focus-visible:ring-2 focus-visible:ring-[#C9082A] sm:w-[min(42vw,12rem)] lg:w-full lg:flex-1 ${
        selected
          ? "border-[#C9082A] shadow-[0_0_26px_-6px_rgba(201,8,42,0.55)]"
          : "border-white/14 hover:bg-white/3"
      }`}
    >
      <div className="relative aspect-video">
        {!canRenderMedia ? (
          <div className="flex h-full items-center justify-center bg-zinc-900 px-3 text-center text-[10px] font-bold uppercase text-zinc-500">
            {emptyLabel}
          </div>
        ) : poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : !externalMediaAllowed && url && !localVideo ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-zinc-900 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-zinc-400">YouTube</p>
            <p className="line-clamp-2 text-[10px] text-zinc-500">{clip.title}</p>
          </div>
        ) : localVideo && url ? (
          <video
            src={url}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-900 text-[10px] font-bold uppercase text-zinc-500">
            {emptyLabel}
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent"
        />
        {selected ? (
          <span className="pointer-events-none absolute left-1.5 top-1.5 rounded bg-[#C9082A] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-lg">
            {nowPlayingLabel}
          </span>
        ) : (
          <span className="pointer-events-none absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/55 text-[10px] text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#C9082A]/60">
            ▶
          </span>
        )}
        <p className="absolute bottom-1.5 left-2 right-2 line-clamp-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          {clip.title}
        </p>
      </div>
    </button>
  );
}
