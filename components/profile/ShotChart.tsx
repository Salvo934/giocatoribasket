"use client";

import type { ShotChartData } from "@/lib/types/athlete";
import { shotChartTotals } from "@/lib/shot-chart";
import { HexShotCourt } from "./HexShotCourt";
import "./shotchart-d3.css";

type SeasonSnapshot = {
  fgPct: number;
  threePct: number;
  ftPct: number;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  minutesPerGame: number;
};

type Props = {
  data: ShotChartData;
  season: SeasonSnapshot;
  chartId?: number;
  labels: {
    title: string;
    fg: string;
    threePt: string;
    ft: string;
    points: string;
    assists: string;
    rebounds: string;
    minutes: string;
    madeLegend: (pct: number) => string;
    missedLegend: (pct: number) => string;
    eyebrow: string;
    synthesizedNote: string;
  };
};

function fmtPct(n: number) {
  return `${Math.round(n)}%`;
}

function fmtStat(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function StatIcon({ kind }: { kind: "points" | "assists" | "rebounds" | "minutes" }) {
  const common = "size-4 text-accent";
  if (kind === "points") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2" />
      </svg>
    );
  }
  if (kind === "assists") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M6 17l6-10 6 10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13.5h6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "rebounds") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="9.5" r="4.5" />
        <path d="M7.5 15.5c1 1.8 3 3 4.5 3s3.5-1.2 4.5-3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4.5l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PercentColumn({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "accent" | "white";
}) {
  const styles = {
    accent: {
      value: "text-accent",
      bg: "from-accent/10 via-accent/4 to-transparent",
      ring: "ring-accent/20",
    },
    white: {
      value: "text-white",
      bg: "from-white/8 via-white/3 to-transparent",
      ring: "ring-white/10",
    },
  }[tone];

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-3 py-6">
      <div
        className={`pointer-events-none absolute inset-2 rounded-xl bg-linear-to-b ${styles.bg} ring-1 ring-inset ${styles.ring}`}
        aria-hidden
      />
      <p
        className={`relative text-4xl leading-none tabular-nums md:text-[2.75rem] ${styles.value}`}
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        {value}
      </p>
      <p className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{label}</p>
    </div>
  );
}

function FooterStat({
  kind,
  value,
  label,
}: {
  kind: "points" | "assists" | "rebounds" | "minutes";
  value: string;
  label: string;
}) {
  return (
    <div className="group relative flex flex-1 flex-col items-center justify-center gap-2.5 px-2 py-5 transition-colors hover:bg-white/2">
      <div className="flex size-9 items-center justify-center rounded-full border border-accent/20 bg-accent/8 shadow-[0_0_20px_-6px_rgba(223,255,74,0.45)] transition group-hover:border-accent/35 group-hover:bg-accent/12">
        <StatIcon kind={kind} />
      </div>
      <p
        className="text-2xl leading-none tabular-nums text-white md:text-[1.75rem]"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        {value}
      </p>
      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
    </div>
  );
}

export function ShotChart({ data, season, chartId = 1, labels }: Props) {
  const totals = shotChartTotals(data.zones);
  const madePct = totals.attempted > 0 ? Math.round((totals.made / totals.attempted) * 100) : 0;
  const seasonLine =
    totals.attempted > 0 ? `${totals.made} / ${totals.attempted} (${madePct}%)` : "0 / 0 (0%)";

  return (
    <div className="profile-shotchart relative overflow-hidden rounded-3xl border border-white/10 bg-elevated shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/6" aria-hidden />
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-b from-accent/18 via-transparent to-transparent opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden
      />

      <div className="relative border-b border-white/8 bg-linear-to-b from-white/4 to-transparent">
        <div className="px-6 pt-6 pb-4 text-center md:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{labels.eyebrow}</p>
          <h3
            className="mt-2 text-3xl tracking-[0.14em] text-white md:text-4xl"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {labels.title}
          </h3>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-linear-to-r from-transparent to-accent/60" aria-hidden />
            <span className="size-1 rounded-full bg-accent/80" aria-hidden />
            <span className="h-px w-10 bg-linear-to-l from-transparent to-accent/60" aria-hidden />
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/6">
          <PercentColumn value={fmtPct(season.fgPct)} label={labels.fg} tone="accent" />
          <PercentColumn value={fmtPct(season.threePct)} label={labels.threePt} tone="white" />
          <PercentColumn value={fmtPct(season.ftPct)} label={labels.ft} tone="white" />
        </div>
      </div>

      <div className="shotchart-stage">
        <div className="shotchart-container">
          <HexShotCourt id={chartId} data={data} />
        </div>

        <div className="shotchart-meta px-5 py-5 md:px-8 md:py-6">
          <p
            className="text-center text-lg tabular-nums text-white md:text-xl"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {seasonLine}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-black px-3 py-1.5 text-xs text-zinc-300">
              <span className="size-3 rounded-sm bg-accent/30" aria-hidden />
              {labels.madeLegend(madePct)}
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-500">
              <span className="size-2.5 rounded-sm bg-accent/25" aria-hidden />
              Bassa
              <span className="text-zinc-700">→</span>
              <span className="size-2.5 rounded-sm bg-accent" aria-hidden />
              Alta densità
            </span>
          </div>

          {data.synthesized ? (
            <p className="mx-auto mt-4 max-w-lg text-center text-[10px] leading-relaxed text-zinc-600">
              {labels.synthesizedNote}
            </p>
          ) : null}
        </div>
      </div>

      <div className="relative grid grid-cols-2 divide-x divide-y divide-white/8 border-t border-white/8 bg-black/30 sm:grid-cols-4 sm:divide-y-0">
        <FooterStat kind="points" value={fmtStat(season.pointsPerGame)} label={labels.points} />
        <FooterStat kind="assists" value={fmtStat(season.assistsPerGame)} label={labels.assists} />
        <FooterStat kind="rebounds" value={fmtStat(season.reboundsPerGame)} label={labels.rebounds} />
        <FooterStat kind="minutes" value={fmtStat(season.minutesPerGame)} label={labels.minutes} />
      </div>
    </div>
  );
}
