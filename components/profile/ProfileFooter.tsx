"use client";

import Link from "next/link";
import type { AthleteProfile } from "@/lib/types/athlete";
import { resolveLegalContext } from "@/lib/legal";
import { LegalFooterLinks } from "@/components/legal/LegalFooterLinks";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

export function ProfileFooter({ athlete }: Props) {
  const { ui, formatDate } = useProfileLocale();
  const h = athlete.header;
  const legal = resolveLegalContext(athlete);
  const updated = formatDate(h.lastUpdated);
  const footerDateLabel =
    h.lastUpdatedKind === "created" ? ui.footer.created : ui.footer.updated;
  const jersey = h.number?.replace(/\D/g, "") ?? "";
  const siteHost = athlete.seo.publicSiteUrl?.replace(/^https?:\/\//, "");
  const heroOnly = athlete.heroOnly === true;

  return (
    <footer className="relative mt-4 overflow-hidden border-t border-white/8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-accent/6 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-[rgba(100,160,255,0.07)] blur-3xl"
      />

      <div
        className={`relative mx-auto px-4 py-14 sm:px-6 md:py-16 ${
          heroOnly ? "max-w-lg text-center" : "max-w-6xl lg:px-8"
        }`}
      >
        <div
          className={
            heroOnly
              ? "mx-auto flex max-w-md flex-col items-center gap-10"
              : "grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-8 xl:gap-12"
          }
        >
          {/* Identità scheda */}
          <div className={`relative min-w-0 ${heroOnly ? "flex w-full flex-col items-center" : ""}`}>
            {jersey && !heroOnly ? (
              <span
                className="pointer-events-none absolute -right-2 -top-6 select-none text-7xl font-bold leading-none tracking-tighter text-white/4 sm:text-8xl"
                style={{ fontFamily: "var(--font-bebas)" }}
                aria-hidden
              >
                #{jersey}
              </span>
            ) : null}
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">{ui.footer.playerCard}</p>
            <p
              className="mt-2 text-3xl leading-none tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {h.name}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {h.role}
              <span className="text-zinc-700"> · </span>
              {h.category}
              {h.league ? (
                <>
                  <span className="text-zinc-700"> · </span>
                  {h.league}
                </>
              ) : null}
            </p>
            {siteHost ? (
              <a
                href={athlete.seo.publicSiteUrl}
                className={`mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/4 px-4 py-2 text-xs font-medium text-zinc-300 backdrop-blur-sm transition hover:border-accent/35 hover:bg-accent/8 hover:text-white ${
                  heroOnly ? "mx-auto" : ""
                }`}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]" aria-hidden />
                <span className="truncate">{siteHost}</span>
                <span className="shrink-0 text-zinc-600" aria-hidden>
                  ↗
                </span>
              </a>
            ) : null}
          </div>

          {/* Legale */}
          <div
            className={`min-w-0 ${heroOnly ? "w-full" : "lg:border-x lg:border-white/6 lg:px-8 xl:px-10"}`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-600">{ui.footer.legal}</p>
            <LegalFooterLinks athlete={athlete} layout={heroOnly ? "inline" : "stack"} />
            <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
              {ui.footer.controller}: {legal.controller.name}
            </p>
          </div>

          {/* Piattaforma */}
          <div className={`min-w-0 ${heroOnly ? "w-full" : ""}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-600">{ui.footer.platform}</p>
            <div
              className={`mt-3 rounded-2xl border border-white/8 bg-linear-to-br from-white/6 via-zinc-950/80 to-black p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${
                heroOnly ? "mx-auto max-w-sm" : ""
              }`}
            >
              <p className="text-sm font-semibold text-zinc-200">Realizzato con KataHero</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{ui.footer.platformBody}</p>
              <a
                href="https://katahero.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex h-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-4 text-xs font-bold text-accent transition hover:border-accent/60 hover:bg-accent/16 ${
                  heroOnly ? "mx-auto" : ""
                }`}
              >
                katahero.com ↗
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferiore */}
        <div
          className={`mt-12 flex flex-col gap-3 border-t border-white/6 pt-6 ${
            heroOnly
              ? "items-center text-center"
              : "sm:flex-row sm:items-center sm:justify-between"
          }`}
        >
          <p className="text-[11px] text-zinc-600">
            <span className="text-zinc-500">{h.agency.name}</span>
            <span className="mx-2 text-zinc-800" aria-hidden>
              ·
            </span>
            {footerDateLabel}{" "}
            <time dateTime={h.lastUpdated} className="tabular-nums text-zinc-500">
              {updated}
            </time>
          </p>
          <div className={`flex flex-wrap items-center gap-3 ${heroOnly ? "justify-center" : ""}`}>
            <Link
              href="#contenuto-profilo"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 transition hover:text-accent"
            >
              {ui.footer.backToTop}
            </Link>
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden />
            <p className="text-[11px] text-zinc-700">© {new Date().getFullYear()} · {ui.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
