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
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  headerActions,
  children,
  density = "default",
}: Props) {
  const headingId = `${id}-heading`;
  const compact = density === "compact";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={
        compact
          ? "scroll-mt-14 border-b border-white/6 bg-linear-to-b from-[rgba(255,255,255,0.015)] from-0% via-transparent via-12% to-transparent to-100% py-10 md:py-12"
          : "scroll-mt-14 border-b border-white/6 bg-linear-to-b from-[rgba(255,255,255,0.015)] from-0% via-transparent via-12% to-transparent to-100% py-14 md:py-18"
      }
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
