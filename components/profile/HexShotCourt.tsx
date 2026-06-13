"use client";

import { useEffect, useMemo, useRef } from "react";
import { Halfcourt } from "shotchart.d3.ts";
import type { ShotChartData } from "@/lib/types/athlete";
import { generateShotDots } from "@/lib/shot-chart";
import {
  COURT_HOOP,
  COURT_LINE,
  DEFAULT_HEX_RADIUS,
  DISPLAY_SIZE,
  HEX_FILL,
  buildHexBins,
  courtDisplayTransform,
  hexPath,
  zoneDotToCourt,
} from "@/lib/shot-chart-hexbin";

type Props = {
  id: number;
  data: ShotChartData;
};

export function HexShotCourt({ id, data }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const hexBins = useMemo(() => {
    const made = generateShotDots(data)
      .filter((dot) => dot.made)
      .map((dot) => zoneDotToCourt(dot.x, dot.y));
    return buildHexBins(made);
  }, [data]);

  useEffect(() => {
    let cancelled = false;

    const paintCourt = () => {
      if (cancelled || !wrapRef.current) return;

      const courtSvg = wrapRef.current.querySelector<SVGSVGElement>(`#shotchart-${id}`);
      if (!courtSvg) return;

      const { scale, offX, offY } = courtDisplayTransform();

      courtSvg.setAttribute("viewBox", `0 0 ${DISPLAY_SIZE} ${DISPLAY_SIZE}`);
      courtSvg.style.background = "transparent";

      const court = courtSvg.querySelector(".shot-chart-court");
      if (!court) return;

      court.setAttribute("transform", `translate(${offX}, ${offY}) scale(${scale})`);
      court.querySelectorAll<SVGElement>("line, path, rect").forEach((el) => {
        el.style.stroke = COURT_LINE;
        el.style.fill = "none";
        el.setAttribute("stroke-width", "0.11");
      });
      const hoop = court.querySelector(".shot-chart-court-hoop");
      if (hoop instanceof SVGElement) {
        hoop.style.stroke = COURT_HOOP;
      }
    };

    paintCourt();
    const t1 = window.setTimeout(paintCourt, 80);
    const t2 = window.setTimeout(paintCourt, 240);

    const svg = wrapRef.current?.querySelector("svg");
    const observer =
      svg &&
      new MutationObserver(() => {
        window.requestAnimationFrame(paintCourt);
      });

    if (svg && observer) {
      observer.observe(svg, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      observer?.disconnect();
    };
  }, [id, hexBins]);

  return (
    <div ref={wrapRef} className="hex-shot-court relative aspect-square w-full">
      <svg viewBox={`0 0 ${DISPLAY_SIZE} ${DISPLAY_SIZE}`} className="hex-shot-court__hex" aria-hidden>
        <g className="hex-layer">
          {hexBins.map((bin) => (
            <path
              key={`${bin.x}-${bin.y}`}
              d={hexPath(bin.x, bin.y, DEFAULT_HEX_RADIUS)}
              fill={HEX_FILL}
              fillOpacity={bin.opacity}
            />
          ))}
        </g>
      </svg>
      <div className="hex-shot-court__court pointer-events-none absolute inset-0 [&_svg]:h-full [&_svg]:w-full">
        <Halfcourt id={id} courtType="NBA" />
      </div>
    </div>
  );
}
