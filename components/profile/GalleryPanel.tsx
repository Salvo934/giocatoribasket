"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AthleteProfile, GalleryImage } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const CAROUSEL_INTERVAL_MS = 4200;
const SWIPE_MIN_PX = 44;

function BroadcastGalleryChrome({
  athleteName,
  photoCount,
  currentFrame,
  children,
}: {
  athleteName: string;
  photoCount: number;
  /** 1-based indice slide attiva (per HUD) */
  currentFrame: number;
  children: ReactNode;
}) {
  const frameLabel = `${String(currentFrame).padStart(2, "0")} / ${String(photoCount).padStart(2, "0")}`;

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-white/12 bg-[#070708] shadow-[0_14px_44px_-18px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(223,255,74,0.06),transparent_50%)]" aria-hidden />

      {/* Angoli HUD */}
      <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-accent/40 sm:left-3 sm:top-3 sm:h-7 sm:w-7" aria-hidden />
      <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-accent/40 sm:right-3 sm:top-3 sm:h-7 sm:w-7" aria-hidden />
      <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-white/15 sm:bottom-3 sm:left-3 sm:h-7 sm:w-7" aria-hidden />
      <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-white/15 sm:bottom-3 sm:right-3 sm:h-7 sm:w-7" aria-hidden />

      {/* Top bar */}
      <div className="relative border-b border-white/10 bg-linear-to-r from-black via-zinc-950 to-black">
        <div className="h-px w-full bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 md:gap-2.5 md:px-3 md:py-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2 md:gap-2.5">
            <span className="shrink-0 rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-black sm:text-[10px]">
              Still
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-red-500/35 bg-red-500/10 px-2 py-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" aria-hidden />
                <span className="relative inline-flex size-1.5 rounded-full bg-red-500" aria-hidden />
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-red-200/95 sm:text-[10px]">Gallery</span>
            </span>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">Photo reel</p>
              <p className="truncate text-xs font-semibold text-white md:text-sm">{athleteName}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-400 sm:gap-2 sm:text-[10px]">
            <span className="rounded border border-white/12 bg-white/5 px-1.5 py-0.5 text-accent">{frameLabel}</span>
            <span className="rounded border border-white/12 bg-white/5 px-1.5 py-0.5 text-zinc-300">{photoCount} frames</span>
            <span className="rounded border border-white/12 bg-white/5 px-1.5 py-0.5 text-accent">RAW</span>
          </div>
        </div>
      </div>

      <div className="relative border-x border-white/6 bg-black/50 p-1.5 sm:p-2 md:p-2.5">{children}</div>

      {/* Lower stripe */}
      <div className="border-t border-white/10 bg-linear-to-r from-zinc-950 via-black to-zinc-950 px-2.5 py-1.5 md:px-3">
        <p className="text-center text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-600 sm:text-[10px]">
          Auto · swipe · pausa hover · tap fullscreen
        </p>
      </div>
    </div>
  );
}

function GalleryCarousel({
  items,
  onOpen,
  onSlideChange,
}: {
  items: GalleryImage[];
  onOpen: (index: number) => void;
  onSlideChange?: (index: number) => void;
}) {
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const reduceMotionRef = useRef(false);
  const swipeStartX = useRef<number | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    onSlideChange?.(index);
  }, [index, onSlideChange]);

  useEffect(() => {
    if (n <= 1 || pause || reduceMotionRef.current) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [n, pause]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  const onSwipePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (n <= 1) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      swipeStartX.current = e.clientX;
    },
    [n],
  );

  const onSwipePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (swipeStartX.current === null || n <= 1) return;
      const dx = e.clientX - swipeStartX.current;
      swipeStartX.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX) return;
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 320);
      go(dx > 0 ? -1 : 1);
    },
    [go, n],
  );

  const onSwipePointerCancel = useCallback(() => {
    swipeStartX.current = null;
  }, []);

  if (n === 0) return null;

  return (
    <div
      className="space-y-2 md:space-y-2.5"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div
        role="region"
        aria-roledescription="carosello"
        aria-label="Galleria foto"
        className="relative touch-pan-y overflow-hidden rounded-lg border border-white/10 bg-zinc-950 select-none"
        onPointerDown={onSwipePointerDown}
        onPointerUp={onSwipePointerUp}
        onPointerCancel={onSwipePointerCancel}
        onPointerLeave={(e) => {
          if (e.buttons === 0) swipeStartX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          aria-live="polite"
        >
          {items.map((item, i) => (
            <div key={`${item.src}-${i}`} className="min-w-0 shrink-0 grow-0 basis-full">
              <button
                type="button"
                onClick={() => {
                  if (suppressClickRef.current) return;
                  onOpen(i);
                }}
                className="group relative block w-full overflow-hidden text-left outline-none ring-accent/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <div className="relative h-[148px] w-full overflow-hidden sm:h-[164px] md:h-[176px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) min(100vw, 36rem), 576px"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    priority={i === 0}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90 transition duration-300 group-hover:via-black/35"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute left-2 top-2 h-5 w-5 scale-90 border-l border-t border-accent/0 transition duration-300 group-hover:scale-100 group-hover:border-accent/55 sm:left-2.5 sm:top-2.5"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute right-2 top-2 h-5 w-5 scale-90 border-r border-t border-accent/0 transition duration-300 group-hover:scale-100 group-hover:border-accent/55 sm:right-2.5 sm:top-2.5"
                    aria-hidden
                  />
                  <span className="pointer-events-none absolute left-2 top-2 rounded bg-black/65 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm sm:left-2.5 sm:top-2.5 sm:text-[10px]">
                    {String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
                  </span>
                  {item.caption ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 px-2 pb-1.5 pt-6 text-left sm:px-2.5 sm:pb-2">
                      <p className="line-clamp-2 text-[10px] font-semibold leading-snug text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.88)] sm:text-[11px]">
                        {item.caption}
                      </p>
                    </div>
                  ) : null}
                  <span className="pointer-events-none absolute bottom-1.5 right-2 rounded-full border border-white/15 bg-black/55 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-zinc-300 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 sm:text-[10px]">
                    Apri
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {n > 1 ? (
          <>
            <button
              type="button"
              aria-label="Foto precedente"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-md border border-white/12 bg-black/65 px-2 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:border-accent/40 hover:text-accent md:left-2 md:px-2.5 md:py-2"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Foto successiva"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-md border border-white/12 bg-black/65 px-2 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:border-accent/40 hover:text-accent md:right-2 md:px-2.5 md:py-2"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {n > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" role="tablist" aria-label="Seleziona foto">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Foto ${i + 1} di ${n}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all sm:h-2 ${
                i === index ? "w-6 bg-accent shadow-[0_0_12px_var(--accent-glow)] sm:w-8" : "w-1.5 bg-white/25 hover:bg-white/45 sm:w-2"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const total = items.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Immagine gallery a schermo intero"
    >
      <button
        type="button"
        aria-label="Chiudi"
        className="absolute inset-0 bg-black/88 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col gap-4">
        <div className="relative overflow-hidden rounded-xl border border-white/12 bg-black shadow-[0_32px_120px_-24px_rgba(0,0,0,0.95)]">
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded bg-black/70 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          <div className="relative aspect-4/3 w-full md:aspect-video lg:aspect-16/10">
            <Image src={item.src} alt={item.alt} fill priority className="object-contain bg-black" sizes="95vw" />
          </div>

          {item.caption ? (
            <div className="border-t border-white/10 bg-linear-to-r from-zinc-950 to-black px-4 py-3 md:px-5">
              <p className="text-sm leading-relaxed text-zinc-200 md:text-base">{item.caption}</p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={total <= 1}
            className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-accent/40 hover:bg-accent/15 hover:text-accent disabled:pointer-events-none disabled:opacity-25"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-accent/40 bg-accent/15 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-accent transition hover:bg-accent/25"
          >
            Chiudi
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={total <= 1}
            className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-accent/40 hover:bg-accent/15 hover:text-accent disabled:pointer-events-none disabled:opacity-25"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export function GalleryPanel({ athlete }: Props) {
  const items = athlete.gallery?.items ?? [];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const close = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(() => {
    setLightbox((i) => (i === null || items.length === 0 ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const goNext = useCallback(() => {
    setLightbox((i) => (i === null || items.length === 0 ? i : (i + 1) % items.length));
  }, [items.length]);

  const onSlideChange = useCallback((i: number) => {
    setActiveSlide(i);
  }, []);

  if (items.length === 0) return null;

  const title = athlete.gallery?.title?.trim() || "Gallery";
  const description =
    athlete.gallery?.description?.trim() ||
    "Immagini da campo, allenamento e contesto club.";

  const n = items.length;

  return (
    <SectionShell
      id="gallery"
      eyebrow="Media"
      title={title}
      description={description}
      density="compact"
      headerActions={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:gap-2 sm:px-3 sm:py-1 sm:text-[11px]">
          <span className="size-1 animate-pulse rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)] sm:size-1.5" aria-hidden />
          {n} foto
        </span>
      }
    >
      <BroadcastGalleryChrome athleteName={athlete.header.name} photoCount={n} currentFrame={activeSlide + 1}>
        <GalleryCarousel items={items} onOpen={setLightbox} onSlideChange={onSlideChange} />
      </BroadcastGalleryChrome>

      {lightbox !== null ? (
        <Lightbox items={items} index={lightbox} onClose={close} onPrev={goPrev} onNext={goNext} />
      ) : null}
    </SectionShell>
  );
}
