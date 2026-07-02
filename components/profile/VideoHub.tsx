"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { AthleteProfile, AthleteVideo, VideoCategoryId } from "@/lib/types/athlete";
import { YouTubeConsentGate } from "@/components/legal/YouTubeConsentGate";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { isLocalVideoUrl } from "@/lib/video-url";
import { resolveMonthlyHighlights, type ResolvedMonthlyHighlight } from "@/lib/video-months";
import type { VideoUi } from "@/lib/i18n/profile-ui";
import { BroadcastFrame } from "./BroadcastFrame";
import { FilmRoomThumbnail } from "./FilmRoomThumbnail";
import { ShareProfileButton } from "./ShareActions";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

const SWIPE_MIN_PX = 40;

function clipPoster(clip: AthleteVideo, fallback?: string) {
  return clip.poster ?? fallback;
}

function ClipRow({ index, clip }: { index: number; clip: AthleteVideo }) {
  const hasYt = Boolean(youtubeEmbedUrl(clip.url));
  return (
    <li>
      <a
        href={clip.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-lg border border-white/6 bg-linear-to-r from-white/4 to-transparent px-3 py-2.5 transition hover:border-[#C9082A]/40 hover:from-[#C9082A]/10 md:px-4 md:py-3"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black font-mono text-sm font-bold text-white tabular-nums group-hover:border-[#C9082A]/50 group-hover:text-[#ff6b6b]"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100 group-hover:text-white md:text-base">{clip.title}</p>
          {clip.note ? <p className="mt-0.5 truncate text-xs text-zinc-500">{clip.note}</p> : null}
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-[#C9082A]">
          {hasYt ? "YouTube" : "Apri"}
          <span className="text-accent transition group-hover:translate-x-0.5">↗</span>
        </span>
      </a>
    </li>
  );
}

function VideoPlayer({
  clip,
  defaultPoster,
  compact = false,
}: {
  clip: AthleteVideo;
  defaultPoster?: string;
  compact?: boolean;
}) {
  const playingPoster = isLocalVideoUrl(clip.url) ? clipPoster(clip, defaultPoster) : undefined;
  const embedSrc = youtubeEmbedUrl(clip.url);
  const localVideo = isLocalVideoUrl(clip.url);

  return (
    <div
      className={`relative w-full overflow-hidden bg-zinc-950 ${
        compact ? "aspect-video max-h-48 sm:max-h-56" : "aspect-video min-h-0"
      }`}
    >
      {localVideo ? (
        <>
          {playingPoster ? (
            <img
              src={playingPoster}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : null}
          <video
            key={clip.url}
            controls
            playsInline
            preload="metadata"
            poster={playingPoster}
            className="relative z-1 h-full w-full object-contain"
            src={clip.url}
          />
        </>
      ) : embedSrc ? (
        <YouTubeConsentGate
          title="Video YouTube"
          description="Per riprodurre clip e highlights incorporati serve il consenso ai contenuti esterni (Google/YouTube)."
        >
          <iframe
            key={clip.url}
            title={clip.title}
            src={`${embedSrc}?rel=0`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </YouTubeConsentGate>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-sm font-semibold text-zinc-400">Nessun embed valido</p>
          <p className="text-xs text-zinc-600">Serve un URL YouTube per questo clip.</p>
        </div>
      )}
    </div>
  );
}

function MonthlyHighlightsCarousel({
  months,
  defaultPoster,
  videoUi,
}: {
  months: ResolvedMonthlyHighlight[];
  defaultPoster?: string;
  videoUi: VideoUi;
}) {
  const sortedMonths = useMemo(
    () => [...months].sort((a, b) => a.key.localeCompare(b.key)),
    [months],
  );
  const total = sortedMonths.length;
  const [index, setIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + total) % total);
    },
    [total],
  );

  const onSwipePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (total <= 1) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      swipeStartX.current = e.clientX;
    },
    [total],
  );

  const onSwipePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (swipeStartX.current === null || total <= 1) return;
      const dx = e.clientX - swipeStartX.current;
      swipeStartX.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX) return;
      go(dx > 0 ? -1 : 1);
    },
    [go, total],
  );

  const onSwipePointerCancel = useCallback(() => {
    swipeStartX.current = null;
  }, []);

  const active = sortedMonths[index];
  if (!active) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div
        role="region"
        aria-roledescription="carosello"
        aria-label={videoUi.monthlyCarouselAria}
        className="overflow-hidden rounded-xl border border-white/8 bg-black/45 p-3 sm:p-4"
        style={{ boxShadow: "inset 0 0 0 1px rgba(23, 64, 139, 0.15)" }}
        onPointerDown={onSwipePointerDown}
        onPointerUp={onSwipePointerUp}
        onPointerCancel={onSwipePointerCancel}
        onPointerLeave={(e) => {
          if (e.buttons === 0) swipeStartX.current = null;
        }}
      >
        <div className="mb-3 text-center" aria-live="polite">
          <p
            className="text-base font-bold uppercase tracking-[0.16em] text-white sm:text-lg"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {active.label}
          </p>
          <p className="mt-1 text-xs text-zinc-500">{active.clip.title}</p>
        </div>

        <div className="relative touch-pan-y">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <VideoPlayer key={active.key} clip={active.clip} defaultPoster={defaultPoster} compact />
          </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                aria-label={videoUi.monthlyCarouselPrev}
                onClick={() => go(-1)}
                className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-md border border-white/12 bg-black/70 px-2 py-1.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#C9082A]/45 hover:text-accent sm:left-2"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label={videoUi.monthlyCarouselNext}
                onClick={() => go(1)}
                className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-md border border-white/12 bg-black/70 px-2 py-1.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#C9082A]/45 hover:text-accent sm:right-2"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {total > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-1.5" role="tablist" aria-label={videoUi.monthlyCarouselAria}>
            {sortedMonths.map((month, i) => (
              <button
                key={month.key}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={month.label}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#C9082A]" : "w-1.5 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MonthlyHighlightsEmpty({ videoUi, locale }: { videoUi: VideoUi; locale: "it" | "en" }) {
  const previewMonths = useMemo(() => {
    const labels: string[] = [];
    for (let i = 0; i < 6; i += 1) {
      const date = new Date(2025, 8 + i, 1);
      labels.push(
        new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
          month: "long",
        }).format(date),
      );
    }
    return labels;
  }, [locale]);

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-dashed border-white/15 bg-zinc-950/40 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap justify-center gap-1.5" aria-hidden>
        {previewMonths.map((label) => (
          <span
            key={label}
            className="rounded-md border border-white/8 bg-white/3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600"
          >
            {label}
          </span>
        ))}
        <span className="rounded-md border border-white/8 bg-white/3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700">
          …
        </span>
      </div>
      <div className="rounded-lg border border-white/8 bg-black/35 px-4 py-8 text-center sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
          {videoUi.monthlyEmptyTitle}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-zinc-300">{videoUi.monthlyComingSoon}</p>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-zinc-500">{videoUi.monthlyEmptyBody}</p>
      </div>
    </div>
  );
}

export function VideoHub({ athlete }: Props) {
  const { ui, videoPath, locale, profilePath } = useProfileLocale();
  const v = athlete.videos;
  const h = athlete.header;

  const monthlyHighlights = v.monthlyHighlights?.length
    ? resolveMonthlyHighlights(v.monthlyHighlights, locale)
    : [];
  const showMonthlySection = v.monthlyHighlights !== undefined;

  const sideClips = v.filmRoomSide ?? [];
  const [filmRoomFocus, setFilmRoomFocus] = useState<"main" | number>("main");
  const playing =
    filmRoomFocus === "main" ? v.main : (sideClips[filmRoomFocus] ?? v.main);

  const firstId = v.categories[0]?.id ?? "shooting";
  const [activeId, setActiveId] = useState<VideoCategoryId>(firstId);

  const activeCat = v.categories.find((c) => c.id === activeId) ?? v.categories[0];
  const showPlaybook = v.categories.some((cat) => cat.clips.length > 0);
  const contactsHref = `${profilePath}#contatti`;
  const shareTitle =
    locale === "en" ? `${h.name} — Video & clips` : `${h.name} — Video e clip`;
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9082A]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
  const sectionDescription = showMonthlySection
    ? locale === "en"
      ? "Main showcase plus one highlight reel per season month — updated throughout the year."
      : "Video principale e un recap per ogni mese di stagione — aggiornato mese per mese."
    : locale === "en"
      ? "Featured player footage and clips by topic — quick view for staff and coaches. Share your video room with the button below."
      : "Primo piano sul giocatore e clip divise per argomento: visione rapida per staff e allenatori. Condividi solo la tua sala video con il bottone qui sotto.";

  return (
    <SectionShell
      id="video"
      eyebrow="Sala video"
      title="Video e clip"
      description={sectionDescription}
      headerActions={
        <div className="flex items-center justify-end gap-2 sm:justify-between sm:gap-4 sm:rounded-2xl sm:border sm:border-white/10 sm:bg-linear-to-br sm:from-[#17408B]/14 sm:via-black/50 sm:to-[#C9082A]/10 sm:p-px sm:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <p className="hidden min-w-0 flex-1 text-sm leading-relaxed text-zinc-400 sm:block">
            {ui.video.shareHint}
          </p>
          <ShareProfileButton
            path={videoPath}
            publicSiteUrl={athlete.seo.publicSiteUrl}
            shareLabels={ui.video.share}
            shareTitle={shareTitle}
            compactLabel={ui.video.share.labelShort}
            showIcon
            className={`inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#C9082A]/30 bg-linear-to-r from-[#C9082A]/95 to-[#9a061f] px-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_18px_-8px_rgba(201,8,42,0.65)] transition hover:border-[#C9082A]/50 hover:brightness-110 sm:h-10 sm:gap-2 sm:rounded-[0.95rem] sm:border-[#C9082A]/35 sm:px-5 sm:text-[11px] sm:tracking-[0.14em] sm:shadow-[0_0_28px_-6px_rgba(201,8,42,0.55)] md:h-11 md:px-6 md:text-xs ${focusRing}`}
          />
        </div>
      }
    >
      <div
        className="space-y-10 rounded-2xl border border-white/7 p-1 sm:p-2"
        style={{
          background: `linear-gradient(180deg, rgba(23,64,139,0.12) 0%, transparent 38%), linear-gradient(165deg, #14100e 0%, #050505 45%, #0a0b10 100%)`,
        }}
      >
        {/* Video principale */}
        <BroadcastFrame
          title={playing.title}
          athleteName={h.name}
          number={h.number}
          role={h.role}
          videoUi={ui.video}
        >
          <div className="p-4 md:p-5">
            <div
              className={`grid gap-3 ${sideClips.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_minmax(148px,16rem)] lg:gap-4" : ""}`}
            >
              <VideoPlayer clip={playing} defaultPoster={v.poster} />

              {sideClips.length > 0 ? (
                <div className="flex flex-row gap-2 lg:flex-col lg:justify-center lg:gap-3">
                  {sideClips.map((clip, i) => (
                    <FilmRoomThumbnail
                      key={`${clip.url}-${i}`}
                      clip={clip}
                      selected={filmRoomFocus === i}
                      onSelect={() => setFilmRoomFocus(i)}
                      defaultPoster={v.poster}
                      nowPlayingLabel={ui.video.nowPlaying}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {sideClips.length > 0 && filmRoomFocus !== "main" ? (
              <div className="mt-3 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => setFilmRoomFocus("main")}
                  className="rounded-md border border-white/14 bg-white/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-200 transition hover:border-[#17408B]/45 hover:bg-[#17408B]/15 hover:text-white"
                >
                  ← {ui.video.mainVideoEyebrow}
                </button>
              </div>
            ) : null}
          </div>
        </BroadcastFrame>

        {/* Highlights mensili */}
        {showMonthlySection ? (
          <div>
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                {ui.video.monthlyHighlightsTitle}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{ui.video.monthlyHighlightsHint}</p>
            </div>

            {monthlyHighlights.length > 0 ? (
              <MonthlyHighlightsCarousel
                months={monthlyHighlights}
                defaultPoster={v.poster}
                videoUi={ui.video}
              />
            ) : (
              <MonthlyHighlightsEmpty videoUi={ui.video} locale={locale} />
            )}
          </div>
        ) : null}

        {/* Playbook clips */}
        {showPlaybook ? (
          <div>
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Playbook clips</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Scegli il reparto · ogni voce apre il video su YouTube (o link esterno).
              </p>
            </div>

            <div className="relative">
              <div
                className="mb-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin"
                style={{ scrollbarColor: "#C9082A transparent" }}
                role="tablist"
                aria-label="Categorie video"
              >
                {v.categories.map((cat) => {
                  const sel = cat.id === activeId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={sel}
                      onClick={() => setActiveId(cat.id)}
                      className={`shrink-0 rounded-md border px-3 py-2 text-left text-xs font-bold uppercase tracking-wider transition sm:px-4 ${
                        sel
                          ? "border-[#C9082A] bg-[#C9082A] text-white shadow-[0_0_24px_-4px_rgba(201,8,42,0.5)]"
                          : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/25 hover:text-zinc-200"
                      }`}
                    >
                      {cat.label}
                      <span className="ml-1.5 font-mono text-[10px] font-normal opacity-70 tabular-nums">
                        ({cat.clips.length})
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeCat ? (
                <div
                  role="tabpanel"
                  className="rounded-xl border border-white/8 bg-black/50 p-3 md:p-4"
                  style={{ boxShadow: `inset 0 0 0 1px rgba(23, 64, 139, 0.15)` }}
                >
                  <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <p className="text-sm font-bold uppercase tracking-widest text-white">{activeCat.label}</p>
                    <span className="rounded border border-[#17408B]/35 bg-[#17408B]/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#9ec5ff]">
                      {activeCat.clips.length} {activeCat.clips.length === 1 ? "voce" : "voci"}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {activeCat.clips.map((clip, i) => (
                      <ClipRow key={`${clip.title}-${i}`} index={i + 1} clip={clip} />
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Partita completa — accesso su richiesta */}
        {v.fullGame ? (
          <div className="relative overflow-hidden rounded-xl border border-dashed border-white/20 bg-linear-to-br from-[#17408B]/20 via-black/80 to-black p-5 md:p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#C9082A]/10 blur-3xl" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black font-mono text-2xl text-zinc-600">
                  ◆
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                    {ui.video.fullGameEyebrow}
                  </p>
                  <p className="mt-1 max-w-xl text-base font-semibold text-white">{v.fullGame.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{ui.video.fullGameNote}</p>
                </div>
              </div>
              {/^https?:\/\//i.test(v.fullGame.url) ? (
                <a
                  href={v.fullGame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-[#C9082A] bg-[#C9082A]/90 px-6 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#C9082A]"
                >
                  {ui.video.fullGameOpenCta}
                </a>
              ) : (
                <a
                  href={contactsHref}
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border-2 border-white bg-white px-6 text-sm font-bold uppercase tracking-wide text-black hover:bg-zinc-200"
                >
                  {ui.video.fullGameRequestCta}
                </a>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
