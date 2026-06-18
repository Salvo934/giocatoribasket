"use client";

import { useEffect, useRef } from "react";
import type { HeroBackgroundVideoClip, HeroBackgroundVideoTheme } from "@/lib/types/athlete";
import { youtubeBackgroundEmbedUrl, youtubeVideoId } from "@/lib/youtube";
import "./hero-video-stack.css";

type Props = {
  clips: HeroBackgroundVideoClip[];
  readabilityOverlay?: boolean;
  theme?: HeroBackgroundVideoTheme;
};

const ANCHOR_ORDER = { left: 0, center: 1, right: 2 } as const;

type Anchor = HeroBackgroundVideoClip["anchor"];

const LEGEND_TAGS: Record<Anchor, string> = {
  left: "Classic",
  center: "His Airness",
  right: "Iconic",
};

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
    transform: "rotateY(8deg) rotateZ(-0.8deg) translateX(4px)",
    zIndex: "z-10",
    height: "h-[92%]",
  },
  center: {
    enterDelay: "140ms",
    floatDelay: "0.55s",
    transform: "rotateY(0deg) scale(1.1) translateY(-12px)",
    zIndex: "z-30",
    height: "h-full",
  },
  right: {
    enterDelay: "280ms",
    floatDelay: "1.1s",
    transform: "rotateY(-8deg) rotateZ(0.8deg) translateX(-4px)",
    zIndex: "z-10",
    height: "h-[92%]",
  },
};

function HeroReadabilityOverlay({ legend }: { legend: boolean }) {
  return (
    <>
      <div
        className={`absolute inset-0 ${legend ? "hero-readability--legend" : ""}`}
        style={
          legend
            ? undefined
            : {
                backgroundImage: `
            linear-gradient(to right, rgba(3, 3, 5, 0.98) 0%, rgba(3, 3, 5, 0.94) 20%, rgba(3, 3, 5, 0.78) 34%, rgba(3, 3, 5, 0.42) 48%, rgba(3, 3, 5, 0.12) 62%, rgba(3, 3, 5, 0.02) 76%, transparent 90%),
            radial-gradient(ellipse 70% 80% at 78% 50%, rgba(223, 255, 74, 0.04), transparent 55%),
            linear-gradient(to bottom, rgba(3, 3, 5, 0.32) 0%, rgba(3, 3, 5, 0.02) 42%, rgba(3, 3, 5, 0.24) 100%)
          `,
              }
        }
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-2 h-14 bg-linear-to-b from-[#030305]/80 to-transparent sm:h-16"
      />
    </>
  );
}

function CornerBrackets({ legend }: { legend: boolean }) {
  if (legend) return null;

  const corner = "absolute size-3 border-accent/70 sm:size-3.5";
  return (
    <>
      <span aria-hidden className={`${corner} left-2 top-2 border-l-2 border-t-2`} />
      <span aria-hidden className={`${corner} right-2 top-2 border-r-2 border-t-2`} />
      <span aria-hidden className={`${corner} bottom-2 left-2 border-b-2 border-l-2`} />
      <span aria-hidden className={`${corner} bottom-2 right-2 border-b-2 border-r-2`} />
    </>
  );
}

function VideoSeam({ index, legend }: { index: number; legend: boolean }) {
  if (legend) {
    return (
      <div className="hero-seam-legend" aria-hidden>
        <div className="hero-seam-legend__beam" />
        <div
          className="hero-seam-legend__node"
          style={{ animationDelay: `${index * 0.35}s` }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex w-3 shrink-0 items-center justify-center self-stretch sm:w-4 lg:w-5"
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

function FrameHud({
  index,
  legend,
  anchor,
}: {
  index: number;
  legend: boolean;
  anchor: Anchor;
}) {
  if (legend) {
    return (
      <div className="hero-frame-legend__hud" aria-hidden>
        <div className="hero-frame-legend__hud-left">
          <span className="hero-frame-legend__rec" />
          <span className="hero-frame-legend__tag hero-frame-legend__tag--accent">Bulls</span>
          <span className="hero-frame-legend__tag">{LEGEND_TAGS[anchor]}</span>
        </div>
        <span className="hero-frame-legend__index">{String(index + 1).padStart(2, "0")}</span>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-2 flex items-center justify-between px-3 py-2"
    >
      <span className="flex items-center gap-1.5">
        <span className="size-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(223, 255, 74, 0.8)]" />
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">Clip</span>
      </span>
      <span
        className="text-[10px] font-bold tabular-nums tracking-[0.18em] text-accent/80"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function HeroClipVideo({
  clip,
  fit,
}: {
  clip: HeroBackgroundVideoClip;
  fit: "cover" | "contain";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [clip.src]);

  return (
    <video
      ref={ref}
      className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} brightness-[1.04] contrast-[1.06] saturate-[1.08]`}
      style={{ objectPosition: clip.objectPosition ?? "center center" }}
      src={clip.src}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      tabIndex={-1}
      aria-hidden
    />
  );
}

function VideoFrame({
  clip,
  index,
  legend,
}: {
  clip: HeroBackgroundVideoClip;
  index: number;
  legend: boolean;
}) {
  const fit = clip.fit ?? "cover";
  const variant = FRAME_VARIANT[clip.anchor];
  const isCenter = clip.anchor === "center";
  const youtubeId = clip.src.startsWith("http") ? youtubeVideoId(clip.src) : null;
  const youtubeEmbed = youtubeId ? youtubeBackgroundEmbedUrl(clip.src) : "";

  const media = youtubeEmbed ? (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        src={youtubeEmbed}
        title=""
        className="pointer-events-none absolute top-1/2 left-1/2 h-[185%] w-[185%] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0 saturate-[1.12] contrast-[1.08]"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
        aria-hidden
      />
    </div>
  ) : (
    <HeroClipVideo clip={clip} fit={fit} />
  );

  const overlays = (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${legend ? "bg-linear-to-t from-black/45 via-black/5 to-black/20" : "bg-linear-to-t from-[#030305]/70 via-transparent to-[#030305]/25"}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {!legend ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-accent/[0.07] to-transparent"
        />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-30"
      >
        <div
          className="h-8 w-full bg-linear-to-b from-white/25 to-transparent"
          style={{ animation: "hero-scan-sweep 7s linear infinite", animationDelay: `${index * 1.4}s` }}
        />
      </div>
    </>
  );

  const defaultShell = (
    <div
      className={`group relative h-full w-full overflow-hidden rounded-2xl bg-[#07070c] shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)] lg:rounded-[1.35rem] ${
        isCenter ? "ring-1 ring-accent/25" : "ring-1 ring-white/10"
      }`}
    >
      <FrameHud index={index} legend={false} anchor={clip.anchor} />
      <CornerBrackets legend={false} />
      {media}
      {overlays}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8"
      />
    </div>
  );

  const legendShell = (
    <div
      className={`hero-frame-legend-wrap ${isCenter ? "hero-frame-legend-wrap--center" : "hero-frame-legend-wrap--side"}`}
    >
      <div className="hero-frame-legend__shell">
        {isCenter ? (
          <span className="hero-frame-legend__watermark" aria-hidden>
            23
          </span>
        ) : null}
        <FrameHud index={index} legend anchor={clip.anchor} />
        <div className="hero-frame-legend__corners" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-cine-bar hero-cine-bar--top" aria-hidden />
        <div className="hero-cine-bar hero-cine-bar--bottom" aria-hidden />
        {media}
        <div className="hero-frame-legend__vignette" aria-hidden />
        <div className="hero-frame-legend__shine" aria-hidden />
        {overlays}
      </div>
    </div>
  );

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
              className={`pointer-events-none absolute -inset-4 rounded-4xl blur-2xl ${
                legend
                  ? "bg-[radial-gradient(ellipse_at_center,rgba(206,17,65,0.35),rgba(223,255,74,0.12),transparent_68%)]"
                  : "bg-[radial-gradient(ellipse_at_center,rgba(223,255,74,0.22),transparent_68%)]"
              }`}
              style={{ animation: "hero-ambient-drift 6s ease-in-out infinite" }}
            />
          ) : null}
          {legend ? legendShell : defaultShell}
        </div>
      </div>
    </div>
  );
}

export function HeroBackgroundVideoStack({ clips, readabilityOverlay = true, theme = "default" }: Props) {
  const legend = theme === "legend";
  const sorted = [...clips].sort((a, b) => ANCHOR_ORDER[a.anchor] - ANCHOR_ORDER[b.anchor]);

  return (
    <div className={legend ? "hero-video-stack hero-video-stack--legend" : "hero-video-stack"}>
      <div
        aria-hidden
        className="hero-video-stack__stage pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(78%,58rem)] items-center justify-end px-1 pr-2 sm:px-3 sm:pr-6 lg:w-[min(84%,72rem)] lg:pr-8 xl:w-[min(88%,80rem)] xl:pr-10"
      >
        <div
          aria-hidden
          className={`hero-video-stack__ambient pointer-events-none absolute right-[4%] top-1/2 h-[min(82%,44rem)] w-[min(95%,48rem)] -translate-y-1/2 rounded-full blur-3xl lg:h-[min(88%,52rem)] lg:w-[min(98%,56rem)] ${
            legend
              ? ""
              : "bg-[radial-gradient(ellipse_at_center,rgba(223,255,74,0.14),rgba(100,140,255,0.04),transparent_70%)]"
          }`}
          style={{ animation: "hero-ambient-drift 8s ease-in-out infinite" }}
        />

        {legend ? <div className="hero-video-stack__floor" aria-hidden /> : null}

        <div className="relative flex h-[min(94%,46rem)] w-full max-w-full items-stretch justify-center py-4 perspective-[1600px] lg:h-[min(96%,54rem)] lg:py-6 xl:h-[min(98dvh,58rem)]">
          {sorted.map((clip, index) => (
            <div key={youtubeVideoId(clip.src) ?? clip.src} className="contents">
              {index > 0 ? <VideoSeam index={index} legend={legend} /> : null}
              <VideoFrame clip={clip} index={index} legend={legend} />
            </div>
          ))}
        </div>
      </div>
      {readabilityOverlay ? <HeroReadabilityOverlay legend={legend} /> : null}
    </div>
  );
}
