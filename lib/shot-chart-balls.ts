import type { SiteZoneStat } from "./shot-chart-theme";

const SVG_NS = "http://www.w3.org/2000/svg";
const BASKETBALL_ICON = "/athletes/icons8-pallacanestro-64.png";

const ZONE_CLASS_KEYS: Record<string, SiteZoneStat["bucket"]> = {
  "right-corner-three-zone": "R-C3",
  "left-corner-three-zone": "L-C3",
  "right-baseline-midrange-zone": "RB-MR",
  "left-baseline-midrange-zone": "LB-MR",
  "right-wing-midrange-zone": "RW-MR",
  "left-wing-midrange-zone": "LW-MR",
  "middle-midrange-zone": "M-MR",
  "right-three-zone": "R-ATB",
  "left-three-zone": "L-ATB",
  "middle-three-zone": "M-ATB",
  "left-floater-zone": "L-FL",
  "right-floater-zone": "R-FL",
  "middle-floater-zone": "M-FL",
  "rim-zone": "RIM",
};

function hashUnit(seed: number, i: number): number {
  const v = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  return v - Math.floor(v);
}

function ballRadius(count: number): number {
  if (count <= 4) return 0.85;
  if (count <= 10) return 0.7;
  if (count <= 18) return 0.58;
  return 0.48;
}

/** Matrice da coordinate locali dell'elemento fino all'SVG root. */
function matrixToSvg(shape: SVGGraphicsElement, svg: SVGSVGElement): DOMMatrix {
  if ("getTransformToElement" in shape && typeof shape.getTransformToElement === "function") {
    try {
      return shape.getTransformToElement(svg);
    } catch {
      // fallback sotto
    }
  }

  let matrix = shape.transform.baseVal.consolidate()?.matrix ?? new DOMMatrix();
  let node: Element | null = shape.parentElement;

  while (node && node !== svg) {
    if (node instanceof SVGGraphicsElement) {
      const parentMatrix = node.transform.baseVal.consolidate()?.matrix;
      if (parentMatrix) matrix = parentMatrix.multiply(matrix);
    }
    node = node.parentElement;
  }

  return matrix;
}

/** Bbox in coordinate viewBox dell'SVG (non pixel schermo). */
function getZoneBBoxInSvg(shape: SVGGraphicsElement, svg: SVGSVGElement): DOMRect | null {
  let bbox: DOMRect;
  try {
    bbox = shape.getBBox();
  } catch {
    return null;
  }

  if (bbox.width <= 0 || bbox.height <= 0) return null;

  const matrix = matrixToSvg(shape, svg);

  const corners = [
    { x: bbox.x, y: bbox.y },
    { x: bbox.x + bbox.width, y: bbox.y },
    { x: bbox.x, y: bbox.y + bbox.height },
    { x: bbox.x + bbox.width, y: bbox.y + bbox.height },
  ];

  const mapped = corners.map(({ x, y }) => {
    const pt = new DOMPoint(x, y).matrixTransform(matrix);
    return { x: pt.x, y: pt.y };
  });

  const xs = mapped.map((p) => p.x);
  const ys = mapped.map((p) => p.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);

  return new DOMRect(x, y, Math.max(...xs) - x, Math.max(...ys) - y);
}

function findZoneShape(svg: SVGSVGElement, classKey: string, chartId: number): SVGGraphicsElement | null {
  const token = `${classKey}${chartId}`;
  const candidates = svg.querySelectorAll<SVGGraphicsElement>(`.shotzone[class*="${token}"]`);

  let best: SVGGraphicsElement | null = null;
  let bestArea = 0;

  candidates.forEach((shape) => {
    if (shape.tagName.toLowerCase() === "text") return;

    const className = shape.getAttribute("class") ?? "";
    if (className.includes("-text")) return;

    const bbox = getZoneBBoxInSvg(shape, svg);
    if (!bbox || bbox.width <= 0 || bbox.height <= 0) return;

    const area = bbox.width * bbox.height;
    if (area > bestArea) {
      bestArea = area;
      best = shape;
    }
  });

  return best;
}

function scatterPoints(
  bbox: DOMRect,
  count: number,
  seed: number,
  inset = 0.14,
): { x: number; y: number }[] {
  const padX = bbox.width * inset;
  const padY = bbox.height * inset;
  const x0 = bbox.x + padX;
  const y0 = bbox.y + padY;
  const w = Math.max(bbox.width - padX * 2, 0.5);
  const h = Math.max(bbox.height - padY * 2, 0.5);

  return Array.from({ length: count }, (_, i) => ({
    x: x0 + hashUnit(seed, i) * w,
    y: y0 + hashUnit(seed + 41, i) * h,
  }));
}

function appendBasketball(parent: SVGGElement, x: number, y: number, r: number) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "shot-ball-marker");
  g.setAttribute("transform", `translate(${x.toFixed(3)} ${y.toFixed(3)})`);

  const size = r * 2;
  const ball = document.createElementNS(SVG_NS, "image");
  ball.setAttribute("href", BASKETBALL_ICON);
  ball.setAttributeNS("http://www.w3.org/1999/xlink", "href", BASKETBALL_ICON);
  ball.setAttribute("x", (-r).toFixed(3));
  ball.setAttribute("y", (-r).toFixed(3));
  ball.setAttribute("width", size.toFixed(3));
  ball.setAttribute("height", size.toFixed(3));
  ball.setAttribute("preserveAspectRatio", "xMidYMid meet");

  g.append(ball);
  parent.append(g);
}

/** Nasconde i numeri della libreria e disegna un pallone per ogni tiro segnato. */
export function applyShotBasketballs(root: ParentNode, chartId: number, data: SiteZoneStat[]) {
  const svg = root.querySelector("svg");
  if (!svg || !(svg instanceof SVGSVGElement)) return;

  const court = svg.querySelector(".shot-chart-court");
  if (!court) return;

  svg.querySelector("#shot-balls-layer")?.remove();
  svg.querySelectorAll("text").forEach((node) => node.setAttribute("visibility", "hidden"));

  const layer = document.createElementNS(SVG_NS, "g");
  layer.setAttribute("id", "shot-balls-layer");
  layer.setAttribute("pointer-events", "none");

  const byBucket = new Map(data.map((d) => [d.bucket, d]));
  let placed = 0;

  for (const [classKey, bucket] of Object.entries(ZONE_CLASS_KEYS)) {
    const zone = byBucket.get(bucket);
    if (!zone || zone.fgm <= 0) continue;

    const shape = findZoneShape(svg, classKey, chartId);
    if (!shape) continue;

    const bbox = getZoneBBoxInSvg(shape, svg);
    if (!bbox) continue;

    const r = ballRadius(zone.fgm);
    const seed = classKey.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + zone.fgm;
    const points = scatterPoints(bbox, zone.fgm, seed);

    points.forEach((pt) => appendBasketball(layer, pt.x, pt.y, r));
    placed += zone.fgm;
  }

  if (placed === 0) return;

  court.append(layer);
}
