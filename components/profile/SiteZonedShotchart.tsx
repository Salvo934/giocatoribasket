"use client";

import { useEffect, useRef } from "react";
import { ZonedShotchart } from "shotchart.d3.ts";
import type { IZoneData } from "shotchart.d3.ts";
import { applySiteShotColors } from "@/lib/shot-chart-theme";
import { applyShotBasketballs } from "@/lib/shot-chart-balls";

type Props = {
  id: number;
  data: IZoneData[];
};

export function SiteZonedShotchart({ id, data }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const paint = () => {
      if (cancelled || !wrapRef.current) return;
      applySiteShotColors(wrapRef.current, id, data);
      applyShotBasketballs(wrapRef.current, id, data);
    };

    paint();
    const t1 = window.setTimeout(paint, 80);
    const t2 = window.setTimeout(paint, 240);

    const svg = wrapRef.current?.querySelector("svg");
    const observer =
      svg &&
      new MutationObserver(() => {
        window.requestAnimationFrame(paint);
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
  }, [data, id]);

  return (
    <div ref={wrapRef}>
      <ZonedShotchart id={id} courtType="NBA" theme="B/O" backgroundTheme="Dark" data={data} />
    </div>
  );
}
