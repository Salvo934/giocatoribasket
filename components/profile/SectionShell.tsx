import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  headerActions?: ReactNode;
  children: ReactNode;
  /** Sezione più bassa su viewport (es. gallery densa) */
  density?: "default" | "compact";
  backgroundImage?: string;
  backgroundImageObjectPosition?: string;
  backgroundImageObjectPositionMobile?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  headerActions,
  children,
  density = "default",
  backgroundImage,
  backgroundImageObjectPosition = "center center",
  backgroundImageObjectPositionMobile = "center 35%",
}: Props) {
  const headingId = `${id}-heading`;
  const compact = density === "compact";
  const hasBg = Boolean(backgroundImage);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={
        compact
          ? `scroll-mt-14 border-b border-white/6 py-10 md:py-12 ${hasBg ? "relative overflow-hidden" : "bg-linear-to-b from-[rgba(255,255,255,0.015)] from-0% via-transparent via-12% to-transparent to-100%"}`
          : `scroll-mt-14 border-b border-white/6 py-14 md:py-18 ${hasBg ? "relative overflow-hidden" : "bg-linear-to-b from-[rgba(255,255,255,0.015)] from-0% via-transparent via-12% to-transparent to-100%"}`
      }
    >
      {hasBg && backgroundImage ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80 md:hidden"
            style={{ objectPosition: backgroundImageObjectPositionMobile }}
          />
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover opacity-[0.82] md:block"
            style={{ objectPosition: backgroundImageObjectPosition }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(3, 3, 5, 0.72) 0%, rgba(3, 3, 5, 0.38) 36%, rgba(3, 3, 5, 0.48) 72%, rgba(3, 3, 5, 0.76) 100%),
                linear-gradient(to right, rgba(3, 3, 5, 0.32) 0%, transparent 38%, transparent 62%, rgba(3, 3, 5, 0.28) 100%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(223,255,74,0.05),transparent_65%)]" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header
          className={
            compact
              ? "relative mb-6 flex gap-3 sm:gap-3.5 md:mb-8"
              : "relative mb-9 flex gap-3 sm:gap-4 md:mb-12"
          }
        >
          <div
            className={
              compact
                ? "mt-0.5 w-px shrink-0 self-stretch rounded-full bg-linear-to-b from-accent/80 via-accent/35 to-transparent min-h-16"
                : "mt-1 w-px shrink-0 self-stretch rounded-full bg-linear-to-b from-accent/80 via-accent/35 to-transparent min-h-24"
            }
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
            <h2
              id={headingId}
              className={
                compact
                  ? "mt-1.5 text-[1.65rem] leading-[0.95] tracking-tight text-white md:text-[2.15rem]"
                  : "mt-2.5 text-3xl leading-[0.95] tracking-tight text-white md:text-[2.65rem]"
              }
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {title}
            </h2>
            {description ? (
              <p
                className={
                  compact
                    ? "mt-2 max-w-2xl text-xs leading-relaxed text-zinc-400 md:text-sm"
                    : "mt-3.5 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base"
                }
              >
                {description}
              </p>
            ) : null}
            {headerActions ? (
              <div className={compact ? "mt-3 flex flex-wrap items-center gap-2 md:mt-4" : "mt-5 flex flex-wrap items-center gap-2 md:mt-6"}>
                {headerActions}
              </div>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
