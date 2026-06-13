import type {
  SeasonStats,
  ShotChartData,
  ShotChartPoint,
  ShotChartZone,
  ShotChartZoneId,
} from "@/lib/types/athlete";

const TWO_ZONE_SPLIT: Record<"restricted" | "paint" | "midRange", number> = {
  restricted: 0.44,
  paint: 0.34,
  midRange: 0.22,
};

const THREE_ZONE_SPLIT: Record<"cornerLeft" | "cornerRight" | "aboveBreak", number> = {
  cornerLeft: 0.13,
  cornerRight: 0.13,
  aboveBreak: 0.74,
};

const ZONE_PLACEMENT: Record<
  ShotChartZoneId,
  { cx: number; cy: number; rx: number; ry: number }
> = {
  restricted: { cx: 50, cy: 18, rx: 5.5, ry: 5 },
  paint: { cx: 50, cy: 30, rx: 9, ry: 6 },
  midRange: { cx: 50, cy: 48, rx: 20, ry: 9 },
  cornerLeft: { cx: 10, cy: 76, rx: 7, ry: 8 },
  cornerRight: { cx: 90, cy: 76, rx: 7, ry: 8 },
  aboveBreak: { cx: 50, cy: 72, rx: 24, ry: 11 },
};

export const SHOT_CHART_ZONE_ORDER: ShotChartZoneId[] = [
  "restricted",
  "paint",
  "midRange",
  "cornerLeft",
  "cornerRight",
  "aboveBreak",
];

export function zoneFgPct(zone: ShotChartZone): number {
  if (zone.attempted <= 0) return 0;
  return (zone.made / zone.attempted) * 100;
}

export function splitAttempts(total: number, weights: Record<string, number>): number[] {
  const keys = Object.keys(weights);
  const raw = keys.map((k) => total * weights[k]!);
  const floored = raw.map((v) => Math.floor(v));
  let remainder = total - floored.reduce((a, b) => a + b, 0);
  const order = raw
    .map((v, i) => ({ i, frac: v - floored[i]! }))
    .sort((a, b) => b.frac - a.frac);
  for (let n = 0; n < remainder; n += 1) {
    floored[order[n % order.length]!.i]! += 1;
  }
  return floored;
}

function hashUnit(seed: number, i: number): number {
  const v = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  return v - Math.floor(v);
}

function shuffleMadeFlags(made: number, attempted: number, seed: number): boolean[] {
  const flags = Array.from({ length: attempted }, (_, i) => i < made);
  for (let i = flags.length - 1; i > 0; i -= 1) {
    const j = Math.floor(hashUnit(seed + 17, i) * (i + 1));
    [flags[i], flags[j]] = [flags[j]!, flags[i]!];
  }
  return flags;
}

/** Stima zone da medie stagionali quando non c'è tracking dedicato. */
export function synthesizeShotChart(stats: SeasonStats): ShotChartData {
  const twoAtt = Math.max(0, Math.round(stats.twoAttPerGame * stats.games));
  const threeAtt = Math.max(0, Math.round(stats.threeAttPerGame * stats.games));
  const twoMade = Math.min(twoAtt, Math.round((twoAtt * stats.twoPct) / 100));
  const threeMade = Math.min(threeAtt, Math.round((threeAtt * stats.threePct) / 100));

  const [rAtt, pAtt, mAtt] = splitAttempts(twoAtt, TWO_ZONE_SPLIT);
  const [clAtt, crAtt, abAtt] = splitAttempts(threeAtt, THREE_ZONE_SPLIT);

  const twoMadeSplit = splitAttempts(twoMade, TWO_ZONE_SPLIT);
  const threeMadeSplit = splitAttempts(threeMade, THREE_ZONE_SPLIT);

  const zones: ShotChartZone[] = [
    { id: "restricted", made: twoMadeSplit[0]!, attempted: rAtt },
    { id: "paint", made: twoMadeSplit[1]!, attempted: pAtt },
    { id: "midRange", made: twoMadeSplit[2]!, attempted: mAtt },
    { id: "cornerLeft", made: threeMadeSplit[0]!, attempted: clAtt },
    { id: "cornerRight", made: threeMadeSplit[1]!, attempted: crAtt },
    { id: "aboveBreak", made: threeMadeSplit[2]!, attempted: abAtt },
  ];

  return { zones, synthesized: true };
}

export function resolveShotChart(stats: SeasonStats): ShotChartData {
  if (stats.shotChart?.zones?.length) return stats.shotChart;
  return synthesizeShotChart(stats);
}

export function shotChartTotals(zones: ShotChartZone[]) {
  return zones.reduce(
    (acc, z) => ({
      made: acc.made + z.made,
      attempted: acc.attempted + z.attempted,
    }),
    { made: 0, attempted: 0 },
  );
}

/** Genera punti sul campo da zone (deterministico per SSR). */
export function generateShotDots(data: ShotChartData): ShotChartPoint[] {
  if (data.shots?.length) return data.shots;

  const dots: ShotChartPoint[] = [];
  for (const zone of data.zones) {
    if (zone.attempted <= 0) continue;
    const bounds = ZONE_PLACEMENT[zone.id];
    const seed = zone.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + zone.attempted * 13;
    const madeFlags = shuffleMadeFlags(zone.made, zone.attempted, seed);

    for (let i = 0; i < zone.attempted; i += 1) {
      const fx = hashUnit(seed, i);
      const fy = hashUnit(seed + 41, i);
      dots.push({
        x: bounds.cx + (fx - 0.5) * 2 * bounds.rx,
        y: bounds.cy + (fy - 0.5) * 2 * bounds.ry,
        made: madeFlags[i]!,
      });
    }
  }

  return dots;
}
