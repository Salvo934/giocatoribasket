/** Palette nero + giallo per lo shot chart. */
export const SITE_SHOT_THEME = [
  "rgba(0, 0, 0, 0.35)",
  "rgba(223, 255, 74, 0.08)",
  "rgba(223, 255, 74, 0.14)",
  "rgba(223, 255, 74, 0.22)",
  "rgba(223, 255, 74, 0.30)",
  "rgba(223, 255, 74, 0.38)",
  "rgba(223, 255, 74, 0.46)",
  "rgba(223, 255, 74, 0.54)",
  "rgba(223, 255, 74, 0.62)",
  "rgba(223, 255, 74, 0.72)",
  "rgba(223, 255, 74, 0.82)",
] as const;

export const SITE_ACCENT = "#dfff4a";

export type SiteZoneBucket =
  | "RIM"
  | "L-FL"
  | "R-FL"
  | "M-FL"
  | "M-MR"
  | "LW-MR"
  | "RW-MR"
  | "LB-MR"
  | "RB-MR"
  | "L-C3"
  | "R-C3"
  | "L-ATB"
  | "R-ATB"
  | "M-ATB";

export type SiteZoneStat = { bucket: SiteZoneBucket; fgm: number; fga: number };

const CLASS_TO_BUCKET: Record<string, SiteZoneBucket> = {
  "rim-zone": "RIM",
  "right-corner-three-zone": "R-C3",
  "left-corner-three-zone": "L-C3",
  "right-three-zone": "R-ATB",
  "left-three-zone": "L-ATB",
  "middle-three-zone": "M-ATB",
  "right-baseline-midrange-zone": "RB-MR",
  "left-baseline-midrange-zone": "LB-MR",
  "right-wing-midrange-zone": "RW-MR",
  "left-wing-midrange-zone": "LW-MR",
  "middle-midrange-zone": "M-MR",
  "left-floater-zone": "L-FL",
  "right-floater-zone": "R-FL",
  "middle-floater-zone": "M-FL",
};

export function siteZoneFill(fgm: number, fga: number): string {
  if (fga <= 0) return "rgba(0, 0, 0, 0.5)";
  const pct = (fgm / fga) * 100;
  const idx = Math.min(SITE_SHOT_THEME.length - 1, Math.max(0, Math.round(pct / 10)));
  return SITE_SHOT_THEME[idx]!;
}

function bucketFromClass(className: string, chartId: number): SiteZoneBucket | null {
  for (const [key, bucket] of Object.entries(CLASS_TO_BUCKET)) {
    if (className.includes(`${key}${chartId}`)) return bucket;
  }
  return null;
}

/** Sostituisce i colori B/O della libreria con nero + giallo. */
export function applySiteShotColors(root: ParentNode, chartId: number, data: SiteZoneStat[]) {
  const byBucket = new Map(data.map((d) => [d.bucket, d]));

  root.querySelectorAll<SVGElement>(".shotzone, [id='shotzone']").forEach((el) => {
    const className = el.getAttribute("class") ?? "";
    const bucket = bucketFromClass(className, chartId);
    if (!bucket) return;

    const zone = byBucket.get(bucket);
    const fgm = zone?.fgm ?? 0;
    const fga = zone?.fga ?? 0;
    el.style.fill = siteZoneFill(fgm, fga);
    el.style.fillOpacity = fga > 0 ? "0.85" : "1";
  });
}
