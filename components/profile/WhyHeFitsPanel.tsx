import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

function ScenarioCard({
  index,
  scenarioTitle,
  body,
  variant = "default",
}: {
  index: number;
  scenarioTitle: string;
  body: string;
  variant?: "default" | "caution";
}) {
  const isCaution = variant === "caution";

  return (
    <li
      className={`group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border p-6 transition-[transform,box-shadow,border-color] duration-300 md:p-7 ${
        isCaution
          ? "border-amber-500/35 bg-linear-to-br from-amber-500/10 via-zinc-950/90 to-black shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08)] hover:border-amber-400/45"
          : "border-white/10 bg-linear-to-br from-white/[0.06] via-zinc-950/95 to-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] hover:border-accent/30 hover:shadow-[0_28px_64px_-40px_var(--accent-glow)]"
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-0 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 ${
          isCaution
            ? "bg-[radial-gradient(ellipse_80%_60%_at_85%_0%,rgba(251,191,36,0.12),transparent_55%)]"
            : "bg-[radial-gradient(ellipse_80%_50%_at_95%_0%,rgba(223,255,74,0.08),transparent_50%)]"
        }`}
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <span
          className={`flex h-14 w-12 shrink-0 flex-col justify-center rounded-xl border px-2 text-center ${
            isCaution
              ? "border-amber-500/35 bg-amber-500/12 text-amber-200/95"
              : "border-white/12 bg-black/55 text-accent"
          }`}
        >
          <span className="text-[9px] font-bold uppercase tracking-wider text-current/70">Scenario</span>
          <span
            className="text-2xl leading-none tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          {isCaution ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/95">Da valutare con attenzione</p>
          ) : (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Contesto ideale</p>
          )}
          <p
            className={`mt-1.5 text-base font-semibold leading-snug tracking-tight md:text-[1.05rem] ${
              isCaution ? "text-amber-50" : "text-white"
            }`}
          >
            {scenarioTitle}
          </p>
        </div>
      </div>

      <p
        className={`relative mt-5 border-l-2 pl-4 text-sm leading-relaxed md:pl-5 md:text-[0.9375rem] ${
          isCaution ? "border-amber-500/55 text-zinc-200" : "border-accent/40 text-zinc-300"
        }`}
      >
        {body}
      </p>
    </li>
  );
}

export function WhyHeFitsPanel({ athlete }: Props) {
  const block = athlete.whyHeFits;
  if (!block?.scenarios?.length) return null;

  return (
    <SectionShell
      id="why-he-fits"
      eyebrow="Roster · sistemi · contesto"
      title="Why he fits"
      description="Tradotto in pratica: in che tipo di squadra questo profilo esprime il massimo — e quando conviene fermarsi e riflettere prima di decidere."
      density="compact"
      headerActions={
        <>
          <span className="inline-flex rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
            Unicità roster
          </span>
          <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {athlete.header.name}
          </span>
        </>
      }
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-black/60 via-zinc-950/80 to-accent/[0.04] p-[1px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            background:
              "radial-gradient(760px 360px at 12% -10%, rgba(223,255,74,0.11), transparent 52%), radial-gradient(640px 320px at 100% 100%, rgba(100,140,220,0.08), transparent 48%)",
          }}
          aria-hidden
        />

        <div className="relative rounded-[calc(1.5rem-1px)] bg-zinc-950/75 p-5 sm:p-7 md:p-9">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.07] via-zinc-900/80 to-transparent p-6 md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-[22rem] rounded-full bg-accent/6 blur-3xl" aria-hidden />
            <p
              className="relative mb-5 text-[clamp(3rem,8vw,4.75rem)] leading-none text-accent/[0.12] md:mb-6"
              style={{ fontFamily: "var(--font-bebas)" }}
              aria-hidden
            >
              FIT
            </p>
            <p className="relative max-w-none text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">Messaggio chiave per club</p>
            <p className="relative mt-4 max-w-4xl text-lg leading-relaxed text-zinc-100 md:text-xl md:leading-snug">{block.intro}</p>
          </div>

          <div className="relative mt-7 md:mt-9">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5 md:mb-8 md:pb-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent/90">Mappa degli scenari</p>
                <p className="mt-2 text-xl font-semibold uppercase tracking-[0.12em] text-white md:text-2xl">
                  Dove incastra davvero
                </p>
              </div>
              <span className="rounded-lg border border-white/12 bg-black/45 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wide text-zinc-500">
                {block.scenarios.length} contesti · sintesi decisionale
              </span>
            </div>

            <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
              {block.scenarios.map(({ title: scenarioTitle, body, variant }, i) => (
                <ScenarioCard
                  key={`${scenarioTitle}-${i}`}
                  index={i}
                  scenarioTitle={scenarioTitle}
                  body={body}
                  variant={variant}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
