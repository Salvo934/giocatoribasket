import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  headerActions?: ReactNode;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, title, description, headerActions, children }: Props) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-14 border-b border-white/6 bg-linear-to-b from-[rgba(255,255,255,0.015)] from-0% via-transparent via-12% to-transparent to-100% py-14 md:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="relative mb-9 md:mb-12 pl-3 sm:pl-4">
          <div
            className="absolute bottom-0 left-0 top-0 w-px rounded-full bg-linear-to-b from-accent/80 via-accent/35 to-transparent"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          <h2
            id={headingId}
            className="mt-2.5 text-3xl leading-[0.95] tracking-tight text-white md:text-[2.65rem]"
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
        </header>
        {children}
      </div>
    </section>
  );
}
