import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  headerActions?: ReactNode;
  children: ReactNode;
  /** Intestazione “command center” (contatti / canali) */
  variant?: "default" | "channels";
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  headerActions,
  children,
  variant = "default",
}: Props) {
  const headingId = `${id}-heading`;

  const sectionBase =
    variant === "channels"
      ? "scroll-mt-14 border-b border-orange-500/15 bg-[radial-gradient(ellipse_85%_55%_at_100%_-15%,rgba(249,115,22,0.11),transparent_52%),radial-gradient(ellipse_70%_50%_at_0%_105%,rgba(23,64,139,0.14),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_35%)] py-14 md:py-18"
      : "scroll-mt-14 border-b border-white/6 bg-linear-to-b from-[rgba(255,255,255,0.015)] from-0% via-transparent via-12% to-transparent to-100% py-14 md:py-18";

  const headerBase =
    variant === "channels"
      ? "relative mb-9 flex gap-4 rounded-3xl border border-white/12 bg-zinc-950/55 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] backdrop-blur-md sm:gap-5 sm:p-8 md:mb-12"
      : "relative mb-9 flex gap-3 sm:gap-4 md:mb-12";

  const railClass =
    variant === "channels"
      ? "mt-1 w-1 shrink-0 self-stretch rounded-full bg-linear-to-b from-orange-400/95 via-[#17408B]/85 to-transparent min-h-[6.5rem]"
      : "mt-1 w-px shrink-0 self-stretch rounded-full bg-linear-to-b from-accent/80 via-accent/35 to-transparent min-h-[6rem]";

  const eyebrowClass =
    variant === "channels"
      ? "text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400/95"
      : "text-xs font-semibold uppercase tracking-[0.22em] text-accent";

  const titleClass =
    variant === "channels"
      ? "mt-3 text-3xl leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-[2.85rem]"
      : "mt-2.5 text-3xl leading-[0.95] tracking-tight text-white md:text-[2.65rem]";

  return (
    <section id={id} aria-labelledby={headingId} className={sectionBase}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className={headerBase}>
          <div className={railClass} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className={eyebrowClass}>{eyebrow}</p>
            <h2
              id={headingId}
              className={titleClass}
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">{description}</p>
            ) : null}
            {headerActions ? (
              <div className="mt-5 flex flex-wrap items-center gap-2 md:mt-6">{headerActions}</div>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
