"use client";

import { useState } from "react";
import type { AthleteProfile, ReturnToPlayVideoProof } from "@/lib/types/athlete";
import { isLocalVideoUrl } from "@/lib/video-url";
import { youtubeEmbedUrl, youtubeThumbnailUrl, youtubeVideoId } from "@/lib/youtube";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-1.5 text-sm font-semibold leading-relaxed text-zinc-100">{value}</p>
    </div>
  );
}

function VideoPlaceholder({
  label,
  compact = false,
  poster,
}: {
  label: string;
  compact?: boolean;
  poster?: string;
}) {
  return (
    <div className="relative h-full w-full">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover opacity-35" aria-hidden />
      ) : null}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-linear-to-b from-[#030305]/15 via-[#030305]/50 to-[#030305]/75 px-2 text-center">
        <span
          className={`flex items-center justify-center rounded-full border border-white/12 bg-white/5 text-zinc-400 ${compact ? "size-7" : "size-10"}`}
        >
          <svg className={compact ? "size-3" : "size-4"} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        </span>
        {!compact ? (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</span>
        ) : null}
      </div>
    </div>
  );
}

function VideoProofPlayer({
  clip,
  placeholderLabel,
}: {
  clip: ReturnToPlayVideoProof;
  placeholderLabel: string;
}) {
  const url = clip.url?.trim() ?? "";

  return (
    <div className="relative aspect-video max-h-70 w-full overflow-hidden bg-[#07080c]">
      {url && isLocalVideoUrl(url) ? (
        <video
          key={url}
          className="h-full w-full object-cover"
          src={url}
          poster={clip.poster}
          controls
          playsInline
          preload="metadata"
        />
      ) : url && youtubeVideoId(url) ? (
        <iframe
          key={url}
          className="absolute inset-0 h-full w-full border-0"
          src={youtubeEmbedUrl(url)}
          title={clip.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <VideoPlaceholder label={placeholderLabel} poster={clip.poster} />
      )}
    </div>
  );
}

function VideoProofThumb({
  clip,
  placeholderLabel,
  onSelect,
}: {
  clip: ReturnToPlayVideoProof;
  placeholderLabel: string;
  onSelect: () => void;
}) {
  const url = clip.url?.trim() ?? "";
  const preview =
    clip.poster ??
    (url ? youtubeThumbnailUrl(url) : null) ??
    undefined;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group overflow-hidden rounded-lg border border-white/10 text-left transition hover:border-white/20 ${focusRing}`}
      aria-label={clip.title}
    >
      <div className="relative aspect-4/3 w-full bg-[#07080c]">
        <VideoPlaceholder label={placeholderLabel} compact poster={preview} />
      </div>
      <div className="border-t border-white/8 bg-zinc-950/80 px-2 py-2">
        <p className="line-clamp-2 text-[10px] font-semibold leading-snug text-zinc-300 group-hover:text-white">
          {clip.title}
        </p>
      </div>
    </button>
  );
}

function VideoProofGallery({
  clips,
  placeholderLabel,
  activeClipLabel,
}: {
  clips: ReturnToPlayVideoProof[];
  placeholderLabel: string;
  activeClipLabel: string;
}) {
  const [activeId, setActiveId] = useState(clips[0]?.id ?? "");
  const activeClip = clips.find((clip) => clip.id === activeId) ?? clips[0];

  if (!activeClip || clips.length === 0) return null;

  const thumbClips = clips.filter((clip) => clip.id !== activeClip.id);

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_9.5rem] lg:gap-4">
      <article className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <VideoProofPlayer key={activeClip.id} clip={activeClip} placeholderLabel={placeholderLabel} />
        <div className="border-t border-white/8 px-3.5 py-3 sm:px-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300/80">{activeClipLabel}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-white">{activeClip.title}</p>
        </div>
      </article>

      {thumbClips.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-2.5">
          {thumbClips.map((clip) => (
            <VideoProofThumb
              key={clip.id}
              clip={clip}
              placeholderLabel={placeholderLabel}
              onSelect={() => setActiveId(clip.id)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ReturnToPlayPanel({ athlete }: Props) {
  const { ui, formatDate } = useProfileLocale();
  const rtp = athlete.returnToPlay;

  if (!rtp) return null;

  const updatedBadge = rtp.updatedAt
    ? `${ui.returnToPlayUi.updatedPrefix} · ${formatDate(rtp.updatedAt)}`
    : rtp.statusLabel?.trim() ?? null;
  const eyebrow = rtp.eyebrow?.trim() || "Return to play";
  const videoProofTitle = rtp.videoProofTitle?.trim() || ui.returnToPlayUi.videoProofDefault;
  const ctaLabel = rtp.ctaLabel?.trim() || ui.returnToPlayUi.ctaDefault;
  const ctaHref = rtp.ctaHref?.trim() || "#contatti";

  return (
    <SectionShell
      id="return-to-play"
      eyebrow={eyebrow}
      title={rtp.title}
      description={rtp.subtitle}
      headerActions={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-200">
            {ui.returnToPlayUi.documented}
          </span>
          {updatedBadge ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              {updatedBadge}
            </span>
          ) : null}
        </>
      }
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-950/90 via-[#0a1018]/80 to-zinc-950/90 p-1 sm:p-2">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            background:
              "radial-gradient(760px 320px at 0% 0%, rgba(56,189,248,0.08), transparent 55%), radial-gradient(640px 280px at 100% 100%, rgba(223,255,74,0.05), transparent 48%)",
          }}
          aria-hidden
        />

        <div className="relative space-y-5 p-4 sm:p-5 md:space-y-6 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6">
            <div className="max-w-2xl space-y-3">
              {rtp.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-zinc-300 md:text-[0.95rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            {rtp.focusAreas?.length ? (
              <aside className="rounded-xl border border-white/10 bg-black/35 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  {ui.returnToPlayUi.injuryContext}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {rtp.focusAreas.map((item) => (
                    <li key={item.slice(0, 40)} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-400/80" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{ui.returnToPlayUi.statusHeading}</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {rtp.status.map((item) => (
                <StatusCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{videoProofTitle}</p>
              <span className="text-[11px] font-medium text-zinc-500">{ui.returnToPlayUi.galleryMeta}</span>
            </div>
            <VideoProofGallery
              clips={rtp.videoProof}
              placeholderLabel={ui.returnToPlayUi.videoPlaceholder}
              activeClipLabel={ui.returnToPlayUi.activeClipLabel}
            />
          </div>

          <div className="flex flex-col items-start gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">{ui.returnToPlayUi.ctaSupport}</p>
            <a
              href={ctaHref}
              className={`inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 px-6 text-sm font-bold text-accent transition hover:border-accent/55 hover:bg-accent/16 ${focusRing}`}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
