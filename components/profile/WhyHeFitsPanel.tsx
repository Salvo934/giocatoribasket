import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function WhyHeFitsPanel({ athlete }: Props) {
  const block = athlete.whyHeFits;
  if (!block?.scenarios?.length) return null;

  return (
    <SectionShell
      id="why-he-fits"
      eyebrow="Roster & filosofia di gioco"
      title="Why he fits"
      description="Come piega questo profilo: che tipo di squadra e sistema di gioco lo fanno rendere al meglio — e perché è una scelta di roster concreta."
      density="compact"
      headerActions={
        <span className="inline-flex rounded-full border border-white/12 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {athlete.header.name}
        </span>
      }
    >
      <p className="mb-8 max-w-3xl text-base leading-relaxed text-zinc-200 md:text-lg">{block.intro}</p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {block.scenarios.map(({ title: scenarioTitle, body }) => (
          <li
            key={scenarioTitle}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/80 via-elevated to-black/80 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-accent/25 hover:shadow-[0_24px_50px_-32px_var(--accent-glow)] md:p-6"
          >
            <span
              className="pointer-events-none absolute -bottom-10 -right-10 size-36 rounded-full bg-accent/8 blur-3xl transition group-hover:bg-accent/12"
              aria-hidden
            />
            <p className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-accent">{scenarioTitle}</p>
            <p className="relative mt-3 text-sm leading-relaxed text-zinc-300 md:text-[0.9375rem]">{body}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
