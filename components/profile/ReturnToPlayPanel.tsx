"use client";

import { useState } from "react";
import type { AthleteProfile, ReturnToPlayVideoProof } from "@/lib/types/athlete";
import { YouTubeConsentGate } from "@/components/legal/YouTubeConsentGate";
import { isLocalVideoUrl } from "@/lib/video-url";
import { youtubeEmbedUrl, youtubeVideoId } from "@/lib/youtube";
import { BroadcastFrame } from "./BroadcastFrame";
import { FilmRoomThumbnail } from "./FilmRoomThumbnail";
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

function VideoProofGallery({
  clips,
  athlete,
  placeholderLabel,
}: {
  clips: ReturnToPlayVideoProof[];
  athlete: AthleteProfile;
  placeholderLabel: string;
}) {
  const { ui } = useProfileLocale();
  const h = athlete.header;
  const [activeId, setActiveId] = useState(clips[0]?.id ?? "");
  const activeClip = clips.find((clip) => clip.id === activeId) ?? clips[0];

  if (!activeClip || clips.length === 0) return null;

  const thumbClips = clips.filter((clip) => clip.id !== activeClip.id);
  const url = activeClip.url?.trim() ?? "";
  const localMain = url ? isLocalVideoUrl(url) : false;
  const mainSrc = url ? youtubeEmbedUrl(url) : null;
  const playingPoster = localMain ? activeClip.poster : undefined;

  return (
    <BroadcastFrame
      title={activeClip.title}
      athleteName={h.name}
      number={h.number}
      role={h.role}
      videoUi={ui.video}
      featuredLabel={ui.returnToPlayUi.videoProofDefault}
      clipBadge={ui.video.clip}
    >
      <div className="p-4 md:p-5">
        <div
          className={`grid gap-3 ${thumbClips.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_minmax(148px,16rem)] lg:gap-4" : ""}`}
        >
          <div className="relative aspect-video min-h-0 w-full overflow-hidden bg-zinc-950">
            {localMain && url ? (
              <>
                {playingPoster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={playingPoster}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : null}
                <video
                  key={url}
                  controls
                  playsInline
                  preload="metadata"
                  poster={playingPoster}
                  className="relative z-1 h-full w-full object-contain"
                  src={url}
                />
              </>
            ) : mainSrc && youtubeVideoId(url) ? (
              <YouTubeConsentGate
                title="Video YouTube"
                description="Per riprodurre clip e highlights incorporati serve il consenso ai contenuti esterni (Google/YouTube)."
              >
                <iframe
                  key={url}
                  title={activeClip.title}
                  src={`${mainSrc}?rel=0`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </YouTubeConsentGate>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                <p className="text-sm font-semibold text-zinc-400">{placeholderLabel}</p>
                <p className="text-xs text-zinc-600">{activeClip.title}</p>
              </div>
            )}
          </div>

          {thumbClips.length > 0 ? (
            <div className="flex flex-row gap-2 lg:flex-col lg:justify-center lg:gap-3">
              {thumbClips.map((clip) => (
                <FilmRoomThumbnail
                  key={clip.id}
                  clip={clip}
                  onSelect={() => setActiveId(clip.id)}
                  emptyLabel={placeholderLabel}
                  nowPlayingLabel={ui.returnToPlayUi.nowPlaying}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </BroadcastFrame>
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
              athlete={athlete}
              placeholderLabel={ui.returnToPlayUi.videoPlaceholder}
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
