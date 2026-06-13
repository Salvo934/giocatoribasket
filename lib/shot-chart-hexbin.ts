/** Coordinate campo NBA — viewBox 255×255 come PerThirtySix. */
export const COURT_W = 50;
export const COURT_H = 37.375;
export const DISPLAY_SIZE = 255;

/** Nero + giallo (brand sito). */
export const HEX_FILL = "#dfff4a";
export const COURT_BG = "#000000";
export const COURT_LINE = "rgba(255, 255, 255, 0.33)";
export const COURT_HOOP = "#dfff4a";

export type CourtPoint = { x: number; y: number };
export type HexBin = { x: number; y: number; count: number; opacity: number };

const SQRT3 = Math.sqrt(3);
const DEFAULT_HEX_RADIUS = 9;

export function zoneDotToCourt(x: number, y: number): CourtPoint {
  return {
    x: (x / 100) * COURT_W,
    y: ((100 - y) / 100) * COURT_H,
  };
}

export function courtDisplayTransform() {
  const scale = Math.min(DISPLAY_SIZE / COURT_W, DISPLAY_SIZE / COURT_H);
  return {
    scale,
    offX: (DISPLAY_SIZE - COURT_W * scale) / 2,
    offY: (DISPLAY_SIZE - COURT_H * scale) / 2,
  };
}

export function courtToDisplay(point: CourtPoint): CourtPoint {
  const { scale, offX, offY } = courtDisplayTransform();
  return {
    x: offX + point.x * scale,
    y: offY + point.y * scale,
  };
}

function hexKey(x: number, y: number): string {
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}

export function hexPath(cx: number, cy: number, radius: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `M ${points.join(" L ")} Z`;
}

/** Heatmap esagonale — stile PerThirtySix, intensità via opacity. */
export function buildHexBins(points: CourtPoint[], radius = DEFAULT_HEX_RADIUS): HexBin[] {
  if (points.length === 0) return [];

  const displayPoints = points.map(courtToDisplay);
  const dx = radius * 1.5;
  const dy = radius * SQRT3;

  const bins = new Map<string, { x: number; y: number; count: number }>();

  for (const p of displayPoints) {
    const col = Math.round(p.x / dx);
    const row = Math.round((p.y - (col % 2 ? dy / 2 : 0)) / dy);
    const cx = col * dx;
    const cy = row * dy + (col % 2 ? dy / 2 : 0);
    const key = hexKey(cx, cy);
    const current = bins.get(key);
    if (current) current.count += 1;
    else bins.set(key, { x: cx, y: cy, count: 1 });
  }

  const max = Math.max(...[...bins.values()].map((b) => b.count));
  const minOpacity = 0.48;

  return [...bins.values()]
    .filter((b) => b.count > 0)
    .map((b) => ({
      ...b,
      opacity: minOpacity + (b.count / max) * (1 - minOpacity),
    }))
    .sort((a, b) => a.count - b.count);
}

export { DEFAULT_HEX_RADIUS };
