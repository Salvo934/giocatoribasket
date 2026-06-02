"use client";

import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300";

function SnapshotCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1 border-l border-white/8 pl-4 first:border-l-0 first:pl-0 sm:pl-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-white md:text-base">{value}</p>
    </div>
  );
}

export function ScoutPanel({ athlete }: Props) {
  const { ui } = useProfileLocale();
  const s = athlete.scoutView;
  const h = athlete.header;

  return (
    <SectionShell
      id="scout"
      eyebrow={ui.scout.eyebrow}
      title={ui.scout.title}
      description={s.sectionDescription ?? ui.scout.defaultDescription}
      headerActions={
        <>
          <span className={pill} title={ui.scout.readTime}>
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(223,255,74,0.7)]" aria-hidden />
            {ui.scout.readTime}
          </span>
          <span className={pill}>{ui.scout.focus}</span>
        </>
      }
    >
      {/* Snapshot contestuale */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-linear-to-r from-white/6 via-transparent to-accent/4 p-4 md:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{ui.scout.immediateContext}</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
          <SnapshotCell label={ui.scout.role} value={h.role} />
          <SnapshotCell label={ui.scout.category} value={h.category} />
          <SnapshotCell label={ui.scout.currentClub} value={h.currentClub} />
          <SnapshotCell label={ui.scout.marketStatus} value={h.marketStatusLabel} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {/* 01 — Profilo */}
        <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-elevated p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:p-7 lg:col-span-6 lg:row-span-2">
          <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-accent/5 blur-3xl transition group-hover:bg-accent/10" aria-hidden />
          <div className="flex items-start justify-between gap-3">
            <span
              className="text-5xl leading-none text-white/10 transition group-hover:text-accent/20"
              style={{ fontFamily: "var(--font-bebas)" }}
              aria-hidden
            >
              01
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 ring-1 ring-white/10">
              {ui.scout.executive}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent">{ui.scout.whatHeBrings}</h3>
          <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">{s.shortProfile}</p>
        </article>

        {/* 02 — Perché guardarlo */}
        <article className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/7 to-transparent p-5 md:p-6 lg:col-span-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300/90">{ui.scout.whyRoster}</h3>
            <span className="text-3xl leading-none text-emerald-500/25" style={{ fontFamily: "var(--font-bebas)" }} aria-hidden>
              02
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200 md:text-base">{s.whyWatch}</p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-emerald-400/70">{ui.scout.immediateLever}</p>
        </article>

        {/* 03 — Due diligence */}
        <article className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-linear-to-br from-amber-500/6 to-transparent p-5 md:p-6 lg:col-span-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-200/90">{ui.scout.toVerify}</h3>
            <span className="text-3xl leading-none text-amber-500/25" style={{ fontFamily: "var(--font-bebas)" }} aria-hidden>
              03
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200 md:text-base">{s.toVerify}</p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-amber-400/70">{ui.scout.checklist}</p>
        </article>

        {/* 04 — Fit sistema */}
        <article className="rounded-2xl border border-dashed border-white/20 bg-white/2 p-5 md:p-6 lg:col-span-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl leading-none text-accent/30" style={{ fontFamily: "var(--font-bebas)" }} aria-hidden>
                04
              </span>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">{ui.scout.idealFit}</h3>
                <p className="mt-1 text-xs text-zinc-500">{ui.scout.fitSubtitle}</p>
              </div>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base lg:text-right">{s.idealFit}</p>
          </div>
        </article>
      </div>

      <p className="mt-8 text-center text-xs text-zinc-600">{ui.scout.nextStep}</p>
    </SectionShell>
  );
}
