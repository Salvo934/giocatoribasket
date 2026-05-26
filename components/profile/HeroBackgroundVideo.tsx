"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  loopEnd?: number;
  objectPosition?: string;
  scoreboardVeil?: boolean;
};

export function HeroBackgroundVideo({
  src,
  loopEnd,
  objectPosition = "center 12%",
  scoreboardVeil = false,
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

  return (
    <>
      <video
        ref={ref}
        className="absolute left-1/2 top-0 min-h-[126%] w-full min-w-[104%] -translate-x-1/2 translate-y-[-2.5%] bg-[#030305] object-cover opacity-[0.82] sm:min-h-[132%]"
        style={{ objectPosition }}
        src={src}
        muted
        playsInline
        autoPlay
        loop={loopEnd == null}
        preload="metadata"
        tabIndex={-1}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 h-[min(38vh,46%)] bg-linear-to-t from-[#030305]/88 via-[#030305]/48 via-48% to-transparent" />
      {scoreboardVeil ? (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[5%] left-0 z-1 h-[min(26%,24vh)] w-[min(54%,22rem)]"
          style={{
            backgroundImage: `
              linear-gradient(to top right, rgba(3, 3, 5, 0.97) 0%, rgba(3, 3, 5, 0.9) 38%, rgba(3, 3, 5, 0.55) 72%, transparent 100%)
            `,
          }}
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
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
  );
}
