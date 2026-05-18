"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import type { AthleteProfile, GalleryImage } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

function BroadcastGalleryChrome({
  athleteName,
  photoCount,
  children,
}: {
  athleteName: string;
  photoCount: number;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#070708] shadow-[0_28px_90px_-28px_rgba(0,0,0,0.92)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(223,255,74,0.07),transparent_50%)]" aria-hidden />

      {/* Angoli HUD */}
      <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-accent/40 sm:left-4 sm:top-4" aria-hidden />
      <div className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-accent/40 sm:right-4 sm:top-4" aria-hidden />
      <div className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-white/15 sm:bottom-4 sm:left-4" aria-hidden />
      <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-white/15 sm:bottom-4 sm:right-4" aria-hidden />

      {/* Top bar */}
      <div className="relative border-b border-white/10 bg-linear-to-r from-black via-zinc-950 to-black">
        <div className="h-px w-full bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <span className="shrink-0 rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-black">
              Still
            </span>
            <span className="flex items-center gap-2 rounded-full border border-red-500/35 bg-red-500/10 px-2 py-0.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" aria-hidden />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" aria-hidden />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-200/95">Gallery</span>
            </span>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Photo reel</p>
              <p className="truncate text-sm font-semibold text-white md:text-base">{athleteName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            <span className="rounded border border-white/12 bg-white/5 px-2 py-0.5 text-zinc-300">{photoCount} frames</span>
            <span className="rounded border border-white/12 bg-white/5 px-2 py-0.5 text-accent">RAW</span>
          </div>
        </div>
      </div>

      <div className="relative border-x border-white/6 bg-black/50 p-3 sm:p-4 md:p-5">{children}</div>

      {/* Lower stripe */}
      <div className="border-t border-white/10 bg-linear-to-r from-zinc-950 via-black to-zinc-950 px-4 py-2.5 md:px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">
          Tap · fullscreen · arrows
        </p>
      </div>
    </div>
  );
}

function placementClass(index: number, total: number): string {
  if (total === 6) {
    const map = [
      "lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:min-h-[280px]",
      "lg:col-start-2 lg:row-start-1 lg:min-h-[140px]",
      "lg:col-start-3 lg:row-start-1 lg:min-h-[140px]",
      "lg:col-start-2 lg:row-start-2 lg:min-h-[140px]",
      "lg:col-start-3 lg:row-start-2 lg:min-h-[140px]",
      "lg:col-span-3 lg:col-start-1 lg:row-start-3 lg:min-h-[160px]",
    ];
    return map[index] ?? "";
  }
  return "";
}

function GalleryTile({
  item,
  index,
  total,
  variant,
  onOpen,
}: {
  item: GalleryImage;
  index: number;
  total: number;
  variant: "single" | "pair" | "trio" | "quad" | "many" | "bento";
  onOpen: () => void;
}) {
  const idxLabel = String(index + 1).padStart(2, "0");

  const aspect =
    variant === "single"
      ? "aspect-4/3 md:aspect-21/9"
      : variant === "bento" && total === 6 && index === 0
        ? "aspect-4/3 lg:aspect-auto lg:h-full lg:min-h-[280px]"
        : variant === "bento" && total === 6 && index === 5
          ? "aspect-[21/9] lg:aspect-auto lg:min-h-[160px]"
          : "aspect-4/3 sm:aspect-[5/4]";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 text-left outline-none ring-accent/40 transition hover:border-accent/35 hover:shadow-[0_0_40px_-12px_var(--accent-glow)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${placementClass(index, total)}`}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            variant === "single"
              ? "(max-width: 768px) 100vw, 80vw"
              : variant === "bento" && index === 0
                ? "(max-width: 1024px) 100vw, 45vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
          }
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.045]"
        />

        {/* Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent opacity-90 transition duration-300 group-hover:via-black/40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Mini-angoli hover */}
        <div className="pointer-events-none absolute left-2 top-2 h-5 w-5 scale-90 border-l border-t border-accent/0 transition duration-300 group-hover:scale-100 group-hover:border-accent/55" aria-hidden />
        <div className="pointer-events-none absolute right-2 top-2 h-5 w-5 scale-90 border-r border-t border-accent/0 transition duration-300 group-hover:scale-100 group-hover:border-accent/55" aria-hidden />

        {/* Frame counter */}
        <span className="pointer-events-none absolute left-3 top-3 rounded bg-black/65 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
          {idxLabel}/{String(total).padStart(2, "0")}
        </span>

        {item.caption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3 pt-10 text-left md:px-4 md:pb-4">
            <p className="text-xs font-semibold leading-snug text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] md:text-sm">
              {item.caption}
            </p>
          </div>
        ) : null}

        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-300 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
          Apri
        </span>
      </div>
    </button>
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
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

  const close = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(() => {
    setLightbox((i) => (i === null || items.length === 0 ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const goNext = useCallback(() => {
    setLightbox((i) => (i === null || items.length === 0 ? i : (i + 1) % items.length));
  }, [items.length]);

  if (items.length === 0) return null;

  const title = athlete.gallery?.title?.trim() || "Gallery";
  const description =
    athlete.gallery?.description?.trim() ||
    "Immagini da campo, allenamento e contesto club.";

  const n = items.length;
  let variant: "single" | "pair" | "trio" | "quad" | "many" | "bento" = "many";
  if (n === 1) variant = "single";
  else if (n === 2) variant = "pair";
  else if (n === 3) variant = "trio";
  else if (n === 4) variant = "quad";
  else if (n === 6) variant = "bento";

  const gridClass =
    variant === "single"
      ? "mx-auto max-w-5xl"
      : variant === "pair"
        ? "grid gap-3 sm:grid-cols-2 md:gap-4"
        : variant === "trio"
          ? "grid gap-3 sm:grid-cols-3 md:gap-4"
          : variant === "quad"
            ? "grid gap-3 sm:grid-cols-2 md:grid-cols-2 md:gap-4"
            : variant === "bento"
              ? "grid gap-3 md:gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto]"
              : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4";

  return (
    <SectionShell
      id="gallery"
      eyebrow="Media"
      title={title}
      description={description}
      headerActions={
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
          <span className="size-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" aria-hidden />
          {n} foto
        </span>
      }
    >
      <BroadcastGalleryChrome athleteName={athlete.header.name} photoCount={n}>
        <div className={gridClass}>
          {items.map((item, idx) => (
            <GalleryTile
              key={`${item.src}-${idx}`}
              item={item}
              index={idx}
              total={n}
              variant={variant}
              onOpen={() => setLightbox(idx)}
            />
          ))}
        </div>
      </BroadcastGalleryChrome>

      {lightbox !== null ? (
        <Lightbox items={items} index={lightbox} onClose={close} onPrev={goPrev} onNext={goNext} />
      ) : null}
    </SectionShell>
  );
}
