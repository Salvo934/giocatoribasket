import type { ReactNode } from "react";
import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

function ListItem({
  children,
  variant,
  index,
}: {
  children: ReactNode;
  variant: "strength" | "growth";
  index: number;
}) {
  const isStrength = variant === "strength";
  return (
    <li className="group flex gap-3 rounded-xl border border-white/6 bg-white/3 px-3 py-2.5 transition hover:border-white/12 md:px-4 md:py-3">
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${
          isStrength
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25"
            : "bg-amber-500/12 text-amber-200/90 ring-1 ring-amber-500/20"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className={`text-sm leading-relaxed md:text-[0.9375rem] ${isStrength ? "text-zinc-200" : "text-zinc-400"}`}>
        {children}
      </span>
    </li>
  );
}

export function TechnicalFitPanel({ athlete }: Props) {
  const t = athlete.technicalFit;
  const h = athlete.header;

  return (
    <SectionShell
      id="fit"
      eyebrow="Ruolo"
      title="Fit tecnico"
      description="Inquadratura per staff tecnico: identità sul parquet, dove massimizza il valore, cosa sviluppare e in che contesto tattico è più efficace."
      headerActions={
        <>
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
            Playbook
          </span>
          <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            {h.role}
          </span>
        </>
      }
    >
      <div className="space-y-6">
        {/* Identità */}
        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/8 via-elevated to-black p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:p-7">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden />
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Identità di gioco</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-accent/90">Tipo giocatore</p>
          <p
            className="relative mt-3 max-w-4xl text-xl leading-snug text-white md:text-2xl lg:text-[1.65rem]"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t.playerType}
          </p>
        </article>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Sistema */}
          <article className="relative overflow-hidden rounded-2xl border border-[#17408B]/30 bg-linear-to-br from-[#17408B]/15 via-black/40 to-elevated p-5 md:p-6">
            <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#7eb3ff] via-[#17408B] to-transparent opacity-90" aria-hidden />
            <div className="pl-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ec5ff]/80">Defensive · offensive structure</p>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-white">Sistema ideale</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">{t.idealSystem}</p>
            </div>
          </article>

          {/* Ruolo roster */}
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-elevated p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Impiego nel roster</p>
                <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-white">Ruolo ideale</h3>
              </div>
              <span className="shrink-0 rounded-md border border-accent/35 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                Roster fit
              </span>
            </div>
            <p className="mt-4 border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-zinc-300 md:pl-4 md:text-base">
              {t.idealRole}
            </p>
          </article>
        </div>

        {/* Leve vs margini */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="rounded-2xl border border-emerald-500/20 bg-linear-to-b from-emerald-500/8 to-transparent p-4 md:p-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-300/95">Punti di forza</h4>
            <p className="mt-1 text-[11px] text-emerald-400/70">Leve tecniche — cosa sfruttare subito</p>
            <ul className="mt-4 space-y-2">
              {t.strengths.map((x, i) => (
                <ListItem key={x} variant="strength" index={i}>
                  {x}
                </ListItem>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-linear-to-b from-amber-500/7 to-transparent p-4 md:p-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-200/95">Aree da migliorare</h4>
            <p className="mt-1 text-[11px] text-amber-400/65">Margini di crescita — focus da validare nel tempo</p>
            <ul className="mt-4 space-y-2">
              {t.improvements.map((x, i) => (
                <ListItem key={x} variant="growth" index={i}>
                  {x}
                </ListItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
