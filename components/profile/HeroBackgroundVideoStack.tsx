"use client";

import type { HeroBackgroundVideoClip } from "@/lib/types/athlete";

type Props = {
  clips: HeroBackgroundVideoClip[];
  readabilityOverlay?: boolean;
};

const ANCHOR_ORDER = { left: 0, center: 1, right: 2 } as const;

type Anchor = HeroBackgroundVideoClip["anchor"];

const FRAME_VARIANT: Record<
  Anchor,
  {
    enterDelay: string;
    floatDelay: string;
    transform: string;
    zIndex: string;
    height: string;
  }
> = {
  left: {
    enterDelay: "0ms",
    floatDelay: "0s",
    transform: "rotateY(7deg) rotateZ(-0.6deg)",
    zIndex: "z-10",
    height: "h-[86%]",
  },
  center: {
    enterDelay: "120ms",
    floatDelay: "0.6s",
    transform: "rotateY(0deg) scale(1.06) translateY(-10px)",
    zIndex: "z-30",
    height: "h-[96%]",
  },
  right: {
    enterDelay: "240ms",
    floatDelay: "1.2s",
    transform: "rotateY(-7deg) rotateZ(0.6deg)",
    zIndex: "z-10",
    height: "h-[86%]",
  },
};

function HeroReadabilityOverlay() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(3, 3, 5, 0.98) 0%, rgba(3, 3, 5, 0.94) 20%, rgba(3, 3, 5, 0.78) 34%, rgba(3, 3, 5, 0.42) 48%, rgba(3, 3, 5, 0.12) 62%, rgba(3, 3, 5, 0.02) 76%, transparent 90%),
            radial-gradient(ellipse 70% 80% at 78% 50%, rgba(223, 255, 74, 0.04), transparent 55%),
            linear-gradient(to bottom, rgba(3, 3, 5, 0.32) 0%, rgba(3, 3, 5, 0.02) 42%, rgba(3, 3, 5, 0.24) 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-2 h-14 bg-linear-to-b from-[#030305]/80 to-transparent sm:h-16"
      />
    </>
  );
}

function CornerBrackets() {
  const corner =
    "absolute size-3 border-accent/70 sm:size-3.5";
  return (
    <>
      <span aria-hidden className={`${corner} left-2 top-2 border-l-2 border-t-2`} />
      <span aria-hidden className={`${corner} right-2 top-2 border-r-2 border-t-2`} />
      <span aria-hidden className={`${corner} bottom-2 left-2 border-b-2 border-l-2`} />
      <span aria-hidden className={`${corner} bottom-2 right-2 border-b-2 border-r-2`} />
    </>
  );
}

function VideoSeam({ index }: { index: number }) {
  return (
    <div
      className="relative flex w-5 shrink-0 items-center justify-center self-stretch sm:w-7 lg:w-8"
      aria-hidden
    >
      <div className="absolute inset-y-[6%] left-1/2 w-px -translate-x-3 bg-linear-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-y-[6%] left-1/2 w-px translate-x-3 bg-linear-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-y-[10%] left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-[#dfff4a]/45 to-transparent blur-[0.5px]" />
      <div
        className="size-1.5 rotate-45 border border-accent/60 bg-[#0a0a0e]/80 sm:size-2"
        style={{ animation: "hero-seam-pulse 2.8s ease-in-out infinite", animationDelay: `${index * 0.4}s` }}
      />
      <div className="absolute h-20 w-10 bg-[radial-gradient(ellipse_at_center,rgba(223,255,74,0.16),transparent_72%)]" />
      <div className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-transparent via-accent/50 to-transparent sm:w-5" />
    </div>
  );
}

function VideoFrame({ clip, index }: { clip: HeroBackgroundVideoClip; index: number }) {
  const fit = clip.fit ?? "cover";
  const variant = FRAME_VARIANT[clip.anchor];
  const isCenter = clip.anchor === "center";

  return (
    <div
      className={`relative flex min-h-0 min-w-0 flex-1 items-center justify-center ${variant.zIndex} ${variant.height} self-center`}
      style={
        clip.width
          ? { flex: `0 1 ${clip.width}`, maxWidth: clip.width }
          : undefined
      }
    >
      <div
        className="relative h-full w-full transform-3d"
        style={{ transform: variant.transform }}
      >
        <div
          className="relative h-full w-full"
          style={{
            animation: `hero-video-enter 0.9s cubic-bezier(0.22, 1, 0.36, 1) both, hero-video-float 5.5s ease-in-out infinite`,
            animationDelay: `${variant.enterDelay}, ${variant.floatDelay}`,
          }}
        >
        {isCenter ? (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-4xl bg-[radial-gradient(ellipse_at_center,rgba(223,255,74,0.22),transparent_68%)] blur-2xl"
            style={{ animation: "hero-ambient-drift 6s ease-in-out infinite" }}
          />
        ) : null}

        <div
          className={`group relative h-full w-full overflow-hidden rounded-2xl bg-[#07070c] shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)] lg:rounded-[1.35rem] ${
            isCenter
              ? "ring-1 ring-accent/25"
              : "ring-1 ring-white/10"
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-2 flex items-center justify-between px-3 py-2"
          >
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(223,255,74,0.8)]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">Clip</span>
            </span>
            <span
              className="text-[10px] font-bold tabular-nums tracking-[0.18em] text-accent/80"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <CornerBrackets />

          <video
            className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} brightness-[1.04] contrast-[1.06] saturate-[1.08]`}
            style={{ objectPosition: clip.objectPosition ?? "center center" }}
            src={clip.src}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            tabIndex={-1}
            aria-hidden
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#030305]/70 via-transparent to-[#030305]/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-accent/[0.07] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-30"
          >
            <div
              className="h-8 w-full bg-linear-to-b from-white/25 to-transparent"
              style={{ animation: "hero-scan-sweep 7s linear infinite", animationDelay: `${index * 1.4}s` }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8"
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export function HeroBackgroundVideoStack({ clips, readabilityOverlay = true }: Props) {
  const sorted = [...clips].sort((a, b) => ANCHOR_ORDER[a.anchor] - ANCHOR_ORDER[b.anchor]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(62%,54rem)] items-center justify-end px-2 pr-4 sm:px-4 sm:pr-8 lg:pr-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-1/2 h-[min(72%,36rem)] w-[min(90%,40rem)] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,255,74,0.14),rgba(100,140,255,0.04),transparent_70%)] blur-3xl"
          style={{ animation: "hero-ambient-drift 8s ease-in-out infinite" }}
        />

        <div className="relative flex h-[min(90%,42rem)] w-full max-w-full items-stretch justify-center py-8 perspective-[1400px] lg:py-10">
          {sorted.map((clip, index) => (
            <div key={clip.src} className="contents">
              {index > 0 ? <VideoSeam index={index} /> : null}
              <VideoFrame clip={clip} index={index} />
            </div>
          ))}
        </div>
      </div>
      {readabilityOverlay ? <HeroReadabilityOverlay /> : null}
    </>
  );
}
