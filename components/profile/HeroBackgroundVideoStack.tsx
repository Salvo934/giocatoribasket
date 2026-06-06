"use client";

import type { HeroBackgroundVideoClip } from "@/lib/types/athlete";

type Props = {
  clips: HeroBackgroundVideoClip[];
  readabilityOverlay?: boolean;
};

const ANCHOR_ORDER = { left: 0, center: 1, right: 2 } as const;

function HeroReadabilityOverlay() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(3, 3, 5, 0.97) 0%, rgba(3, 3, 5, 0.9) 22%, rgba(3, 3, 5, 0.72) 36%, rgba(3, 3, 5, 0.38) 50%, rgba(3, 3, 5, 0.14) 64%, rgba(3, 3, 5, 0.04) 78%, transparent 92%),
            linear-gradient(to bottom, rgba(3, 3, 5, 0.28) 0%, rgba(3, 3, 5, 0.04) 45%, rgba(3, 3, 5, 0.2) 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-2 h-12 bg-linear-to-b from-[#030305]/75 to-transparent sm:h-14"
      />
    </>
  );
}

function VideoSeam() {
  return (
    <div className="relative flex w-4 shrink-0 items-center justify-center self-stretch sm:w-5 lg:w-6" aria-hidden>
      <div className="h-[78%] w-px bg-linear-to-b from-transparent via-white/18 to-transparent" />
      <div className="absolute h-[52%] w-px bg-linear-to-b from-transparent via-[#dfff4a]/55 to-transparent blur-[0.5px]" />
      <div className="absolute size-1 rounded-full bg-accent/90 shadow-[0_0_14px_rgba(223,255,74,0.75)]" />
      <div className="absolute h-16 w-8 bg-[radial-gradient(ellipse_at_center,rgba(223,255,74,0.12),transparent_70%)]" />
    </div>
  );
}

function VideoFrame({ clip }: { clip: HeroBackgroundVideoClip }) {
  const fit = clip.fit ?? "contain";

  return (
    <div
      className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center"
      style={clip.width ? { flex: `0 1 ${clip.width}`, maxWidth: clip.width } : undefined}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0e]/60 ring-1 ring-white/12 shadow-[0_12px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px] lg:rounded-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-1 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
        />
        <video
          className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-1/5 bg-linear-to-t from-[#030305]/50 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/6"
        />
      </div>
    </div>
  );
}

export function HeroBackgroundVideoStack({ clips, readabilityOverlay = true }: Props) {
  const sorted = [...clips].sort((a, b) => ANCHOR_ORDER[a.anchor] - ANCHOR_ORDER[b.anchor]);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(60%,52rem)] items-center justify-end px-2 pr-4 sm:px-3 sm:pr-6 lg:pr-10"
        aria-hidden
      >
        <div className="flex h-[min(88%,40rem)] w-full max-w-full items-stretch justify-center py-6 lg:py-8">
          {sorted.map((clip, index) => (
            <div key={clip.src} className="contents">
              {index > 0 ? <VideoSeam /> : null}
              <VideoFrame clip={clip} />
            </div>
          ))}
        </div>
      </div>
      {readabilityOverlay ? <HeroReadabilityOverlay /> : null}
    </>
  );
}
