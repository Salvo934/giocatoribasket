import type { IZoneData } from "shotchart.d3.ts";
import type { ShotChartData, ShotChartZone, ShotChartZoneId } from "@/lib/types/athlete";
import { splitAttempts, zoneFgPct } from "@/lib/shot-chart";

type D3Bucket = IZoneData["bucket"];

const D3_BUCKETS: D3Bucket[] = [
  "RIM",
  "L-FL",
  "R-FL",
  "M-FL",
  "M-MR",
  "LW-MR",
  "RW-MR",
  "LB-MR",
  "RB-MR",
  "L-C3",
  "R-C3",
  "L-ATB",
  "R-ATB",
  "M-ATB",
];

const ZONE_TO_D3: Record<ShotChartZoneId, { buckets: D3Bucket[]; weights: number[] }> = {
  restricted: { buckets: ["RIM"], weights: [1] },
  paint: { buckets: ["M-FL", "L-FL", "R-FL"], weights: [0.42, 0.29, 0.29] },
  midRange: { buckets: ["M-MR", "LW-MR", "RW-MR", "LB-MR", "RB-MR"], weights: [0.26, 0.19, 0.19, 0.18, 0.18] },
  cornerLeft: { buckets: ["L-C3"], weights: [1] },
  cornerRight: { buckets: ["R-C3"], weights: [1] },
  aboveBreak: { buckets: ["M-ATB", "L-ATB", "R-ATB"], weights: [0.52, 0.24, 0.24] },
};

function distributeZone(zone: ShotChartZone): IZoneData[] {
  const map = ZONE_TO_D3[zone.id];
  const attSplit = splitAttempts(zone.attempted, Object.fromEntries(map.buckets.map((b, i) => [b, map.weights[i]!])));
  const madeSplit = splitAttempts(zone.made, Object.fromEntries(map.buckets.map((b, i) => [b, map.weights[i]!])));
  const pct = zoneFgPct(zone);

  return map.buckets.map((bucket, i) => ({
    bucket,
    fga: attSplit[i]!,
    fgm: Math.min(madeSplit[i]!, attSplit[i]!),
    percentile: attSplit[i]! > 0 ? pct : 0,
  }));
}

/** Converte le zone del profilo nel formato richiesto da shotchart.d3.ts. */
export function toZonedShotchartData(data: ShotChartData): IZoneData[] {
  const byBucket = new Map<D3Bucket, IZoneData>();

  for (const bucket of D3_BUCKETS) {
    byBucket.set(bucket, { bucket, fgm: 0, fga: 0, percentile: 0 });
  }

  for (const zone of data.zones) {
    for (const entry of distributeZone(zone)) {
      const current = byBucket.get(entry.bucket)!;
      const fga = current.fga + entry.fga;
      const fgm = current.fgm + entry.fgm;
      byBucket.set(entry.bucket, {
        bucket: entry.bucket,
        fga,
        fgm,
        percentile: fga > 0 ? (fgm / fga) * 100 : 0,
      });
    }
  }

  return D3_BUCKETS.map((bucket) => byBucket.get(bucket)!);
}
