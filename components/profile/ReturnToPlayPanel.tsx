"use client";

import type { AthleteProfile, ReturnToPlayVideoProof } from "@/lib/types/athlete";
import { isLocalVideoUrl } from "@/lib/video-url";
import { youtubeEmbedUrl, youtubeVideoId } from "@/lib/youtube";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-zinc-100">{value}</p>
    </div>
  );
}

function VideoProofCard({
  clip,
  placeholderLabel,
}: {
  clip: ReturnToPlayVideoProof;
  placeholderLabel: string;
}) {
  const hasVideo = Boolean(clip.url?.trim());

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="relative aspect-video w-full bg-[#07080c]">
        {hasVideo && clip.url ? (
          isLocalVideoUrl(clip.url) ? (
            <video
              className="h-full w-full object-cover"
              src={clip.url}
              poster={clip.poster}
              controls
              playsInline
              preload="metadata"
            />
          ) : youtubeVideoId(clip.url) ? (
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={youtubeEmbedUrl(clip.url!)}
              title={clip.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-200">
                {placeholderLabel}
              </span>
            </div>
          )
        ) : (
          <>
            {clip.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={clip.poster} alt="" className="h-full w-full object-cover opacity-35" aria-hidden />
            ) : null}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-b from-[#030305]/20 via-[#030305]/55 to-[#030305]/80 px-4 text-center">
              <span className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-zinc-400">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{placeholderLabel}</span>
            </div>
          </>
        )}
      </div>
      <div className="border-t border-white/8 px-4 py-3.5">
        <p className="text-sm font-semibold leading-snug text-white">{clip.title}</p>
      </div>
    </article>
  );
}

export function ReturnToPlayPanel({ athlete }: Props) {
  const { ui } = useProfileLocale();
  const rtp = athlete.returnToPlay;
  if (!rtp) return null;

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
          {rtp.statusLabel ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              {rtp.statusLabel}
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

        <div className="relative space-y-6 p-4 sm:p-5 md:space-y-8 md:p-6">
          <div className="max-w-3xl space-y-4">
            {rtp.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-zinc-300 md:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Status</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {rtp.status.map((item) => (
                <StatusCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{videoProofTitle}</p>
              <span className="text-[11px] font-medium text-zinc-500">
                {rtp.videoProof.length} {rtp.videoProof.length === 1 ? "clip" : "clip"}
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {rtp.videoProof.map((clip) => (
                <VideoProofCard key={clip.id} clip={clip} placeholderLabel={ui.returnToPlayUi.videoPlaceholder} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
