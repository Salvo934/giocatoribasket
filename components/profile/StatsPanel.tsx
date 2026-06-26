"use client";

import type { AthleteProfile } from "@/lib/types/athlete";
import { statsUiForSport } from "@/lib/i18n/football-stats-ui";
import { resolveShotChart } from "@/lib/shot-chart";
import { ShotChart } from "./ShotChart";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

function fmt(n: number, digits = 1) {
  return Number.isInteger(n) && digits === 1 ? String(n) : n.toFixed(digits);
}

function ShotBar({ label, pct }: { label: string; pct: number }) {
  const w = Math.min(100, Math.max(0, pct));
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-white">{fmt(pct, 1)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-linear-to-r from-accent/80 to-accent"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

export function StatsPanel({ athlete }: Props) {
  const { ui: profileUi } = useProfileLocale();
  const ui = { ...profileUi, stats: statsUiForSport(profileUi.stats, athlete.header.sport) };
  const isFootball = athlete.header.sport === "Calcio";
  const s = athlete.stats;
  const maxPtsLast5 = Math.max(...s.lastGames.map((g) => g.points), 1);
  const astTo = isFootball
    ? s.pointsPerGame > 0
      ? s.assistsPerGame / s.pointsPerGame
      : null
    : s.turnoversPerGame > 0
      ? s.assistsPerGame / s.turnoversPerGame
      : null;

  const primaryKpis = [
    { label: ui.stats.points, sub: isFootball ? "GPG" : "PPG", value: fmt(s.pointsPerGame, 2) },
    { label: ui.stats.assists, sub: isFootball ? "APG" : "APG", value: fmt(s.assistsPerGame, 2) },
    {
      label: isFootball ? ui.stats.minutes : ui.stats.rebounds,
      sub: isFootball ? "MPG" : "RPG",
      value: isFootball ? fmt(s.minutesPerGame) : fmt(s.reboundsPerGame),
    },
  ];

  const volumeKpis = [
    { kind: "two" as const, label: ui.stats.twoAttempts, value: fmt(s.twoAttPerGame), hint: ui.stats.perGame },
    { kind: "three" as const, label: ui.stats.threeAttempts, value: fmt(s.threeAttPerGame), hint: ui.stats.perGame },
  ];
  const totals = s.basketballTotals;
  const seasonTotalKpis = totals
    ? [
        { label: ui.stats.games, value: String(s.games) },
        { label: ui.stats.totalMinutes, value: String(totals.minutes) },
        { label: ui.stats.totalPoints, value: String(totals.points) },
        {
          label: ui.stats.freeThrowsLine,
          value: `${totals.freeThrowsMade}/${totals.freeThrowsAttempted}`,
        },
        { label: ui.stats.twoPointMade, value: String(totals.twoPointMade) },
        { label: ui.stats.threePointMade, value: String(totals.threePointMade) },
      ]
    : null;
  const secondaryKpis = seasonTotalKpis ?? [
    { label: ui.stats.games, value: String(s.games) },
    { label: ui.stats.minutes, value: `${fmt(s.minutesPerGame)} mpg` },
    { label: ui.stats.steals, value: fmt(s.stealsPerGame) },
    { label: ui.stats.turnovers, value: fmt(s.turnoversPerGame) },
  ];
  const showShotChart = !isFootball && !s.hideShotChart;
  const shotChart = showShotChart ? resolveShotChart(s) : null;
  const showShootingBreakdown = !s.hideShootingBreakdown;

  return (
    <SectionShell
      id="stats"
      eyebrow={ui.stats.eyebrow}
      title={ui.stats.title}
      description={`${s.label} ${ui.stats.descriptionSuffix}`}
    >
      {/* KPI principali */}
      <div className="grid gap-3 sm:grid-cols-3">
        {primaryKpis.map((k) => (
          <div
            key={k.sub}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/7 via-transparent to-accent/4 p-5 md:p-6"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{k.label}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent/90">{k.sub}</p>
            <p
              className="mt-3 text-5xl leading-none text-white md:text-6xl"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Contesto stagione + rapporti */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {secondaryKpis.map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-white/8 bg-elevated px-3 py-3 md:px-4 md:py-3.5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{k.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white md:text-xl">{k.value}</p>
            </div>
          ))}
        </div>
        {showShootingBreakdown ? (
        <div className="flex flex-col justify-center rounded-2xl border border-dashed border-white/15 bg-white/2 px-4 py-4 md:px-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.quickIndicators}</p>
          <dl className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-white/6 pb-2">
              <dt className="text-zinc-400">{ui.stats.astToRatio}</dt>
              <dd className="font-semibold tabular-nums text-white">
                {astTo !== null ? `${fmt(astTo, 2)} : 1` : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-400">{ui.stats.effectiveFg}</dt>
              <dd className="font-semibold tabular-nums text-accent">{fmt(s.fgPct, 1)}%</dd>
            </div>
          </dl>
        </div>
        ) : null}
      </div>

      {shotChart ? (
        <div className="mt-8 md:hidden">
          <ShotChart
            data={shotChart}
            season={{
              fgPct: s.fgPct,
              threePct: s.threePct,
              ftPct: s.ftPct,
              pointsPerGame: s.pointsPerGame,
              assistsPerGame: s.assistsPerGame,
              reboundsPerGame: s.reboundsPerGame,
              minutesPerGame: s.minutesPerGame,
            }}
            labels={{
              title: ui.stats.shotChartTitle,
              fg: ui.stats.shotChartFg,
              threePt: ui.stats.shotChartThreePt,
              ft: ui.stats.shotChartFt,
              points: ui.stats.points,
              assists: ui.stats.assists,
              rebounds: ui.stats.rebounds,
              minutes: ui.stats.minutes,
              madeLegend: ui.stats.shotChartMadeLegend,
              missedLegend: ui.stats.shotChartMissedLegend,
              eyebrow: ui.stats.shotChartEyebrow,
              synthesizedNote: ui.stats.shotChartSynthesizedNote,
            }}
          />
        </div>
      ) : null}

      {/* Tiro e volume */}
      {showShootingBreakdown ? (
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-elevated p-5 md:p-6">
          <h3 className="text-sm font-semibold text-white">{ui.stats.shootingEfficiency}</h3>
          <p className="mt-1 text-xs text-zinc-500">{ui.stats.shootingHint}</p>
          <div className="mt-6 space-y-5">
            <ShotBar label={ui.stats.fg} pct={s.fgPct} />
            <ShotBar label={ui.stats.twoPt} pct={s.twoPct} />
            <ShotBar label={ui.stats.threePt} pct={s.threePct} />
            <ShotBar label={ui.stats.ft} pct={s.ftPct} />
          </div>
        </div>
        <div className="rounded-2xl border border-white/8 bg-elevated p-5 md:p-6">
          <h3 className="text-sm font-semibold text-white">{ui.stats.volumeSelection}</h3>
          <p className="mt-1 text-xs text-zinc-500">{ui.stats.volumeHint}</p>
          <div className="mt-6 space-y-6">
            {volumeKpis.map((v) => {
              const total = s.twoAttPerGame + s.threeAttPerGame;
              const share = total > 0 ? (v.kind === "three" ? s.threeAttPerGame / total : s.twoAttPerGame / total) : 0;
              const sharePct = Math.round(share * 100);
              return (
                <div key={v.kind}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-zinc-300">{v.label}</span>
                    <span className="text-lg font-semibold tabular-nums text-white">
                      {v.value}
                      <span className="text-xs font-normal text-zinc-500"> {v.hint}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-zinc-400/80"
                      style={{ width: `${sharePct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-zinc-600">{ui.stats.volumeShare(sharePct)}</p>
                </div>
              );
            })}
            <div className="rounded-xl border border-white/6 bg-black/30 px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {ui.stats.totalAttempts}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-white" style={{ fontFamily: "var(--font-bebas)" }}>
                {fmt(s.twoAttPerGame + s.threeAttPerGame, 1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      ) : null}

      {/* Ultime partite */}
      <div className="mt-10">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">{ui.stats.lastFive}</h3>
            <p className="text-xs text-zinc-500">{ui.stats.lastFiveHint}</p>
          </div>
        </div>

        {/* Desktop / tablet: tabella */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/8 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="sticky left-0 z-10 bg-elevated px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {ui.stats.date}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {ui.stats.opponent}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.min}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.pts}</th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.trend}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.reb}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.ast}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.stl}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.to}</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {s.lastGames.map((g) => {
                  const barW = Math.round((g.points / maxPtsLast5) * 100);
                  return (
                    <tr
                      key={`${g.date}-${g.opponent}`}
                      className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/2"
                    >
                      <td className="sticky left-0 z-10 bg-elevated px-4 py-3.5 text-xs whitespace-nowrap text-white tabular-nums shadow-[4px_0_12px_-4px_rgba(0,0,0,0.8)]">
                        {g.date}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3.5 text-zinc-200">{g.opponent}</td>
                      <td className="px-4 py-3.5 tabular-nums text-zinc-400">{g.minutes}</td>
                      <td className="px-4 py-3.5 text-base font-semibold tabular-nums text-accent">{g.points}</td>
                      <td className="px-3 py-3.5">
                        <div className="flex w-16 items-center gap-1.5">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-accent/70"
                              style={{ width: `${barW}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 tabular-nums">{g.rebounds}</td>
                      <td className="px-4 py-3.5 tabular-nums">{g.assists}</td>
                      <td className="px-4 py-3.5 tabular-nums text-zinc-400">{g.steals ?? "—"}</td>
                      <td className="px-4 py-3.5 tabular-nums text-zinc-400">{g.turnovers ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: card */}
        <div className="flex flex-col gap-3 md:hidden">
          {s.lastGames.map((g) => {
            const barW = Math.round((g.points / maxPtsLast5) * 100);
            return (
              <article
                key={`${g.date}-${g.opponent}-m`}
                className="rounded-2xl border border-white/8 bg-elevated p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-zinc-500 tabular-nums">{g.date}</p>
                    <p className="mt-0.5 truncate font-medium text-white">{g.opponent}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-3xl leading-none text-accent" style={{ fontFamily: "var(--font-bebas)" }}>
                      {g.points}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{ui.stats.pointsMobile}</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-accent/60" style={{ width: `${barW}%` }} />
                </div>
                <dl className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-black/25 py-2">
                    <dt className="text-zinc-500">{ui.stats.min}</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-white">{g.minutes}</dd>
                  </div>
                  <div className="rounded-lg bg-black/25 py-2">
                    <dt className="text-zinc-500">{ui.stats.reb}</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-white">{g.rebounds}</dd>
                  </div>
                  <div className="rounded-lg bg-black/25 py-2">
                    <dt className="text-zinc-500">{ui.stats.ast}</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-white">{g.assists}</dd>
                  </div>
                  <div className="rounded-lg bg-black/25 py-2">
                    <dt className="text-zinc-500">{ui.stats.stl}/{ui.stats.to}</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-white">
                      {g.steals ?? "—"}/{g.turnovers ?? "—"}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
