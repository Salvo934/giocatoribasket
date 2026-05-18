"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const MOBILE_MENU_BALL_ICON = "/athletes/icons8-pallacanestro-64.png";

function navLinks(showGallery: boolean) {
  const links: { href: string; label: string }[] = [
    { href: "#scout", label: "Scout" },
    { href: "#mercato", label: "Mercato" },
    { href: "#video", label: "Video" },
    { href: "#stats", label: "Stats" },
    { href: "#fit", label: "Fit" },
  ];
  if (showGallery) links.push({ href: "#gallery", label: "Gallery" });
  links.push(
    { href: "#carriera", label: "Carriera" },
    { href: "#honors", label: "Palmares" },
    { href: "#contatti", label: "Contatti" },
  );
  return links;
}

type Props = { showGallery?: boolean };

export function ProfileNav({ showGallery = false }: Props) {
  const links = useMemo(() => navLinks(showGallery), [showGallery]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 flex size-14 items-center justify-center rounded-full border border-white/15 bg-zinc-950/95 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.85)] backdrop-blur-md transition hover:border-accent/40 hover:shadow-[0_12px_40px_-8px_var(--accent-glow)]"
        style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))", right: "max(1rem, env(safe-area-inset-right))" }}
        aria-label="Apri menu sezioni"
        aria-expanded={open}
        aria-controls="profile-nav-sheet"
      >
        <Image
          src={MOBILE_MENU_BALL_ICON}
          alt=""
          width={28}
          height={28}
          className="brightness-0 invert"
          aria-hidden
        />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            aria-label="Chiudi menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="profile-nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu sezioni profilo"
            className="relative max-h-[min(78vh,520px)] overflow-hidden rounded-t-2xl border border-white/12 border-b-0 bg-zinc-950 shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.9)]"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Vai a</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:border-white/25 hover:text-white"
              >
                Chiudi
              </button>
            </div>
            <nav aria-label="Sezioni profilo" className="overflow-y-auto px-2 py-2">
              <ul className="space-y-1">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/6 hover:text-white"
                    >
                      {label}
                      <span className="text-zinc-600">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
