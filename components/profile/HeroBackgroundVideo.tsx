"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  loopEnd?: number;
  objectPosition?: string;
  scoreboardVeil?: boolean;
  /** Overlay più leggeri — utile se il clip risulta troppo scuro */
  lightOverlay?: boolean;
  /** Nessun velo scuro sul clip (solo video) */
  noOverlay?: boolean;
  /** Velo mirato per leggibilità testi hero — video ancora visibile */
  readabilityOverlay?: boolean;
  /** Clip già in 16:9 — cover orizzontale full-bleed */
  landscape?: boolean;
  fit?: "cover" | "contain";
};

export function HeroBackgroundVideo({
  src,
  loopEnd,
  objectPosition = "center 12%",
  scoreboardVeil = false,
  lightOverlay = false,
  noOverlay = false,
  readabilityOverlay = false,
  landscape = false,
  fit = "cover",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || loopEnd == null) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= loopEnd) {
        video.currentTime = 0;
        void video.play();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [loopEnd]);

  const opacityClass = noOverlay
    ? "opacity-100"
    : readabilityOverlay
      ? "opacity-[0.9]"
      : lightOverlay
        ? "opacity-[0.94]"
        : "opacity-[0.82]";

  const videoClass =
    fit === "contain"
      ? `absolute inset-0 h-full w-full bg-[#030305] object-contain ${opacityClass}`
      : landscape
        ? `absolute inset-0 h-full w-full bg-[#030305] object-cover ${opacityClass}`
        : `absolute left-1/2 top-0 min-h-[126%] w-full min-w-[104%] -translate-x-1/2 translate-y-[-2.5%] bg-[#030305] object-cover sm:min-h-[132%] ${opacityClass}`;

  return (
    <>
      <video
        ref={ref}
        className={videoClass}
        style={{ objectPosition: landscape || fit === "contain" ? objectPosition || "center center" : objectPosition }}
        src={src}
        muted
        playsInline
        autoPlay
        loop={loopEnd == null}
        preload="metadata"
        tabIndex={-1}
        aria-hidden
      />
      {noOverlay ? null : readabilityOverlay ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(3, 3, 5, 0.82) 0%, rgba(3, 3, 5, 0.52) 32%, rgba(3, 3, 5, 0.16) 58%, transparent 78%),
                linear-gradient(to bottom, rgba(3, 3, 5, 0) 0%, rgba(3, 3, 5, 0.1) 58%, rgba(3, 3, 5, 0.28) 100%)
              `,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-2 h-12 bg-linear-to-b from-[#030305]/70 to-transparent sm:h-14"
          />
        </>
      ) : (
        <>
          <div
            className={`absolute inset-x-0 bottom-0 h-[min(38vh,46%)] bg-linear-to-t to-transparent ${
              lightOverlay
                ? "from-[#030305]/52 via-[#030305]/22 via-48%"
                : "from-[#030305]/88 via-[#030305]/48 via-48%"
            }`}
          />
          {scoreboardVeil ? (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[5%] left-0 z-1 h-[min(26%,24vh)] w-[min(54%,22rem)]"
              style={{
                backgroundImage: lightOverlay
                  ? `linear-gradient(to top right, rgba(3, 3, 5, 0.78) 0%, rgba(3, 3, 5, 0.62) 38%, rgba(3, 3, 5, 0.28) 72%, transparent 100%)`
                  : `linear-gradient(to top right, rgba(3, 3, 5, 0.97) 0%, rgba(3, 3, 5, 0.9) 38%, rgba(3, 3, 5, 0.55) 72%, transparent 100%)`,
              }}
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: lightOverlay
                ? `
              linear-gradient(to bottom, rgba(3, 3, 5, 0) 0%, rgba(3, 3, 5, 0.06) 48%, rgba(3, 3, 5, 0.14) 82%, rgba(3, 3, 5, 0.2) 100%),
              linear-gradient(to right, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.22) 34%, rgba(0, 0, 0, 0.28) 50%, rgba(0, 0, 0, 0.22) 66%, rgba(0, 0, 0, 0.58) 100%)
            `
                : `
              linear-gradient(to bottom, rgba(3, 3, 5, 0) 0%, rgba(3, 3, 5, 0.12) 48%, rgba(3, 3, 5, 0.28) 82%, rgba(3, 3, 5, 0.38) 100%),
              linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.52) 34%, rgba(0, 0, 0, 0.58) 50%, rgba(0, 0, 0, 0.52) 66%, rgba(0, 0, 0, 0.88) 100%)
            `,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-2 h-14 bg-linear-to-b from-[#030305] from-42% to-transparent sm:h-17 md:h-20"
          />
        </>
      )}
    </>
  );
}
