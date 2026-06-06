"use client";

import type { HeroBackgroundVideoClip } from "@/lib/types/athlete";

type Props = {
  clips: HeroBackgroundVideoClip[];
  readabilityOverlay?: boolean;
};

const ANCHOR_CLASS = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0",
} as const;

const DEFAULT_WIDTH = {
  left: "42%",
  center: "34%",
  right: "38%",
} as const;

function HeroReadabilityOverlay() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(3, 3, 5, 0.88) 0%, rgba(3, 3, 5, 0.55) 24%, rgba(3, 3, 5, 0.12) 48%, rgba(3, 3, 5, 0.08) 72%, transparent 88%),
            linear-gradient(to bottom, rgba(3, 3, 5, 0.2) 0%, rgba(3, 3, 5, 0.04) 50%, rgba(3, 3, 5, 0.22) 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-2 h-12 bg-linear-to-b from-[#030305]/70 to-transparent sm:h-14"
      />
    </>
  );
}

export function HeroBackgroundVideoStack({ clips, readabilityOverlay = true }: Props) {
  return (
    <>
      {clips.map((clip) => {
        const fit = clip.fit ?? "contain";
        const width = clip.width ?? DEFAULT_WIDTH[clip.anchor];
        return (
          <div
            key={clip.src}
            className={`pointer-events-none absolute inset-y-0 flex items-center justify-center ${ANCHOR_CLASS[clip.anchor]}`}
            style={{ width }}
            aria-hidden
          >
            <video
              className={`h-full w-full bg-transparent ${fit === "contain" ? "object-contain" : "object-cover"} opacity-[0.92]`}
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
          </div>
        );
      })}
      {readabilityOverlay ? <HeroReadabilityOverlay /> : null}
    </>
  );
}
