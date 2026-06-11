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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PhaseRail({
  stopLabel,
  recoveryLabel,
  returnLabel,
}: {
  stopLabel: string;
  recoveryLabel: string;
  returnLabel: string;
}) {
  const steps = [
    { label: stopLabel, current: false },
    { label: recoveryLabel, current: false },
    { label: returnLabel, current: true },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 sm:px-5">
      <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3">
        {steps.map((step, index) => (
          <div key={step.label} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                  step.current
                    ? "border-sky-400/50 bg-sky-400/15 text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                    : "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
                }`}
              >
                {step.current ? "●" : <CheckIcon className="size-4" />}
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.16em] ${
                  step.current ? "text-sky-100" : "text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className="hidden h-px min-w-4 flex-1 bg-linear-to-r from-emerald-400/35 via-sky-400/25 to-sky-400/15 sm:block"
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3.5 sm:p-4 ${
        highlight
          ? "border-sky-400/25 bg-sky-400/8 shadow-[inset_0_1px_0_0_rgba(125,211,252,0.12)]"
          : "border-white/10 bg-zinc-950/60"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
            highlight ? "bg-sky-400/15 text-sky-200" : "bg-white/6 text-zinc-500"
          }`}
        >
          {highlight ? <CheckIcon className="size-3" /> : <span className="size-1.5 rounded-full bg-zinc-600" />}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-zinc-100">{value}</p>
        </div>
      </div>
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
        <img src={poster} alt="" className="h-full w-full object-cover opacity-40" aria-hidden />
      ) : null}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-linear-to-b from-[#030305]/10 via-[#030305]/45 to-[#030305]/80 px-2 text-center">
        <span
          className={`flex items-center justify-center rounded-full border border-white/15 bg-white/6 text-zinc-300 backdrop-blur-sm ${
            compact ? "size-8" : "size-11"
          }`}
        >
          <svg className={compact ? "size-3.5" : "size-4"} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
  nowPlayingLabel,
}: {
  clip: ReturnToPlayVideoProof;
  placeholderLabel: string;
  nowPlayingLabel: string;
}) {
  const url = clip.url?.trim() ?? "";

  return (
    <div className="relative overflow-hidden bg-[#050508]">
      <div className="pointer-events-none absolute left-2 top-2 z-10 h-5 w-5 border-l border-t border-sky-300/35" aria-hidden />
      <div className="pointer-events-none absolute right-2 top-2 z-10 h-5 w-5 border-r border-t border-sky-300/35" aria-hidden />
      <div className="pointer-events-none absolute bottom-14 left-2 z-10 h-5 w-5 border-b border-l border-sky-300/35 sm:bottom-16" aria-hidden />
      <div className="pointer-events-none absolute bottom-14 right-2 z-10 h-5 w-5 border-b border-r border-sky-300/35 sm:bottom-16" aria-hidden />

      <div className="relative aspect-video max-h-70 w-full overflow-hidden">
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

      <div className="border-t border-white/8 bg-linear-to-r from-zinc-950 via-[#0a1018] to-zinc-950 px-4 py-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 h-8 w-1 shrink-0 rounded-full bg-sky-400/70" aria-hidden />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300/75">{nowPlayingLabel}</p>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-white sm:text-base">{clip.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoProofThumb({
  clip,
  placeholderLabel,
  index,
  onSelect,
}: {
  clip: ReturnToPlayVideoProof;
  placeholderLabel: string;
  index: number;
  onSelect: () => void;
}) {
  const url = clip.url?.trim() ?? "";
  const preview = clip.poster ?? (url ? youtubeThumbnailUrl(url) : null) ?? undefined;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 text-left transition hover:border-white/20 ${focusRing}`}
      aria-label={clip.title}
    >
      <div className="relative aspect-4/3 w-full bg-[#07080c]">
        <VideoPlaceholder label={placeholderLabel} compact poster={preview} />
        <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-white/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="border-t border-white/8 px-2.5 py-2">
        <p className="line-clamp-2 text-[10px] font-semibold leading-snug text-zinc-400 group-hover:text-zinc-200">
          {clip.title}
        </p>
      </div>
    </button>
  );
}

function VideoProofGallery({
  clips,
  placeholderLabel,
  nowPlayingLabel,
}: {
  clips: ReturnToPlayVideoProof[];
  placeholderLabel: string;
  nowPlayingLabel: string;
}) {
  const [activeId, setActiveId] = useState(clips[0]?.id ?? "");
  const activeClip = clips.find((clip) => clip.id === activeId) ?? clips[0];

  if (!activeClip || clips.length === 0) return null;

  const thumbClips = clips.filter((clip) => clip.id !== activeClip.id);

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_9.5rem] lg:gap-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <VideoProofPlayer
          key={activeClip.id}
          clip={activeClip}
          placeholderLabel={placeholderLabel}
          nowPlayingLabel={nowPlayingLabel}
        />
      </div>

      {thumbClips.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-2.5">
          {thumbClips.map((clip) => (
            <VideoProofThumb
              key={clip.id}
              clip={clip}
              placeholderLabel={placeholderLabel}
              index={clips.findIndex((item) => item.id === clip.id)}
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
  const eyebrow = rtp.eyebrow?.trim() || ui.nav.returnToPlay;
  const videoProofTitle = rtp.videoProofTitle?.trim() || ui.returnToPlayUi.videoProofDefault;
  const ctaLabel = rtp.ctaLabel?.trim() || ui.returnToPlayUi.ctaDefault;
  const ctaHref = rtp.ctaHref?.trim() || "#contatti";

  const highlightLabels = new Set(
    rtp.status
      .slice(2)
      .map((item) => item.label)
      .filter(Boolean),
  );

  return (
    <SectionShell
      id="return-to-play"
      eyebrow={eyebrow}
      title={rtp.title}
      description={rtp.subtitle}
      headerActions={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" aria-hidden />
            {ui.returnToPlayUi.monitoring}
          </span>
          {updatedBadge ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              {updatedBadge}
            </span>
          ) : null}
        </>
      }
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-linear-to-br from-[#081018] via-zinc-950 to-[#06080c] p-1 sm:p-1.5">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(900px 360px at 0% 0%, rgba(56,189,248,0.1), transparent 52%), radial-gradient(700px 280px at 100% 100%, rgba(16,185,129,0.06), transparent 48%)",
          }}
          aria-hidden
        />

        <div className="relative space-y-5 p-4 sm:p-5 md:space-y-6 md:p-6">
          <PhaseRail
            stopLabel={ui.returnToPlayUi.phaseStop}
            recoveryLabel={ui.returnToPlayUi.phaseRecovery}
            returnLabel={ui.returnToPlayUi.phaseReturn}
          />

          <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="space-y-4 lg:col-span-7">
              {rtp.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-zinc-300 md:text-[0.95rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            {rtp.focusAreas?.length ? (
              <aside className="rounded-2xl border border-white/10 bg-black/40 p-4 lg:col-span-5 lg:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  {ui.returnToPlayUi.injuryContext}
                </p>
                <ul className="mt-3 space-y-3">
                  {rtp.focusAreas.map((item) => (
                    <li key={item.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
                        <CheckIcon className="size-3" />
                      </span>
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
                <StatusPill
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  highlight={highlightLabels.has(item.label)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{videoProofTitle}</p>
                <p className="mt-1 text-xs text-zinc-500">{ui.returnToPlayUi.galleryMeta}</p>
              </div>
            </div>
            <VideoProofGallery
              clips={rtp.videoProof}
              placeholderLabel={ui.returnToPlayUi.videoPlaceholder}
              nowPlayingLabel={ui.returnToPlayUi.nowPlaying}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-accent/20 bg-linear-to-r from-accent/8 via-transparent to-sky-400/6 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="max-w-xl text-sm leading-relaxed text-zinc-300">{ui.returnToPlayUi.ctaSupport}</p>
            <a
              href={ctaHref}
              className={`inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-black shadow-[0_0_28px_-6px_rgba(223,255,74,0.55)] transition hover:bg-[#e8ff6a] ${focusRing}`}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
