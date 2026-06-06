"use client";

import Image from "next/image";

type Props = {
  src: string;
  srcDesktop?: string;
  objectPosition?: string;
  objectPositionMobile?: string;
  readabilityOverlay?: boolean;
};

export function HeroBackgroundImage({
  src,
  srcDesktop,
  objectPosition = "center center",
  objectPositionMobile = "center 38%",
  readabilityOverlay = true,
}: Props) {
  const desktopSrc = srcDesktop ?? src;

  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.92] md:hidden"
        style={{ objectPosition: objectPositionMobile }}
        aria-hidden
      />
      <Image
        src={desktopSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover opacity-[0.9] md:block"
        style={{ objectPosition }}
        aria-hidden
      />
      {readabilityOverlay ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(3, 3, 5, 0.88) 0%, rgba(3, 3, 5, 0.62) 28%, rgba(3, 3, 5, 0.22) 52%, rgba(3, 3, 5, 0.08) 68%, transparent 82%),
                linear-gradient(to bottom, rgba(3, 3, 5, 0.35) 0%, rgba(3, 3, 5, 0.08) 42%, rgba(3, 3, 5, 0.2) 100%)
              `,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-2 h-12 bg-linear-to-b from-[#030305]/75 to-transparent sm:h-14"
          />
        </>
      ) : null}
    </>
  );
}
