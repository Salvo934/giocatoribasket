"use client";

import Image from "next/image";
import type { AthleteProfile } from "@/lib/types/athlete";
import { ShareProfileButton } from "./ShareActions";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

function formatStat(v: number) {
  const n = Math.round(v * 10) / 10;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff14]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { first: full, last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export function HeroOnlyHeader({ athlete }: Props) {
  const { ui, formatDate } = useProfileLocale();
  const h = athlete.header;
  const s = athlete.stats;
  const updated = formatDate(h.lastUpdated);
  const profileDateLabel =
    h.lastUpdatedKind === "created" ? ui.profileCreated : ui.profileUpdated;

  const statTiles = [
    { label: "PPG", value: formatStat(s.pointsPerGame), accent: true },
    { label: "AST", value: formatStat(s.assistsPerGame), accent: false },
    { label: "REB", value: formatStat(s.reboundsPerGame), accent: false },
  ].filter((tile) => tile.value !== "0" && tile.value !== "0.0");

  const metaParts = [
    h.role,
    h.birthYear ? String(h.birthYear) : null,
    h.heightCm ? `${h.heightCm} cm` : null,
    h.category || h.league || null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" · ");
  const tagline = metaLine || h.dashboardIntro?.trim() || "";
  const pitch = h.identityNote?.trim() || "";
  const { first, last } = splitName(h.name);
  const heroImage = h.heroImage?.trim() ?? "";
  const showAvatar = h.heroHideAvatar !== true && heroImage.length > 0;

  return (
    <header className="relative min-h-dvh overflow-hidden border-b border-white/6">
      {/* Base */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#020204]" />

      {/* Glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-18%] left-1/2 h-[55vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(57,255,120,0.22)_0%,transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-[-20%] h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(circle,rgba(57,255,120,0.08)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(57,255,120,0.04)_0%,transparent_38%,transparent_62%,rgba(57,255,120,0.03)_100%)]"
      />

      {/* Court arc decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, transparent 58%, rgba(57,255,120,0.9) 59%, transparent 60%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,120,40,0.12)_0%,transparent_70%)] blur-3xl"
      />

      {/* Fine grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(1.75rem,env(safe-area-inset-top))] sm:max-w-lg sm:px-6 sm:pb-14 sm:pt-10">
        <a
          href="#contenuto-profilo"
          className="absolute left-[-10000px] top-0 z-50 overflow-hidden whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black focus:left-4 focus:top-4 focus:overflow-visible focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          {ui.skipIntro}
        </a>

        {/* Top bar: club + status */}
        <div className="flex items-center justify-between gap-3">
          {h.currentClubLogo ? (
            <div className="flex items-center gap-2.5">
              <div className="relative size-9 overflow-hidden rounded-lg bg-white p-1 shadow-[0_0_20px_-6px_rgba(57,255,120,0.5)] ring-1 ring-white/15">
                <Image
                  src={h.currentClubLogo}
                  alt={`Logo ${h.currentClub}`}
                  fill
                  priority
                  sizes="36px"
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6ee7a0]">
                {h.currentClub}
              </span>
            </div>
          ) : (
            <span />
          )}
          <span className="rounded-full border border-[#39ff14]/20 bg-[#39ff14]/8 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9ef5b0]">
            Live
          </span>
        </div>

        {/* Avatar o logo — protagonista */}
        {showAvatar ? (
          <div className="relative mx-auto mt-7 flex flex-col items-center sm:mt-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(57,255,120,0.28)_0%,rgba(255,120,40,0.12)_45%,transparent_72%)] blur-2xl"
            />
            <div className="relative aspect-square w-[min(72vw,17.5rem)] max-w-70">
              <div
                className="absolute -inset-1 rounded-full p-[3px] shadow-[0_0_56px_-10px_rgba(57,255,120,0.55),0_0_40px_-14px_rgba(255,120,40,0.35)]"
                style={{
                  background:
                    "conic-gradient(from 200deg, #39ff14 0%, rgba(255,140,50,0.35) 28%, rgba(255,255,255,0.25) 48%, rgba(57,255,120,0.15) 72%, #39ff14 100%)",
                }}
              >
                <div className="relative size-full overflow-hidden rounded-full bg-black ring-1 ring-white/10">
                  <Image
                    src={heroImage}
                    alt={`${h.name} — ${ui.profilePhotoAlt}`}
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 640px) 72vw, 280px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : h.currentClubLogo ? (
          <div className="relative mx-auto mt-8 flex flex-col items-center sm:mt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(57,255,120,0.35)_0%,transparent_70%)] blur-2xl"
            />
            <div className="relative size-30">
              <div
                className="absolute inset-[-3px] rounded-[1.65rem] p-[2px] shadow-[0_0_48px_-12px_rgba(57,255,120,0.55)] sm:rounded-[1.85rem]"
                style={{
                  background:
                    "conic-gradient(from 210deg, #39ff14 0%, rgba(57,255,120,0.15) 25%, rgba(255,255,255,0.2) 50%, rgba(57,255,120,0.12) 75%, #39ff14 100%)",
                }}
              >
                <div className="size-full rounded-[1.55rem] bg-[#080808] p-[3px] sm:rounded-[1.75rem]">
                  <div className="relative size-full overflow-hidden rounded-[1.45rem] bg-white sm:rounded-[1.65rem]">
                    <Image
                      src={h.currentClubLogo}
                      alt={`Logo ${h.currentClub}`}
                      fill
                      priority
                      sizes="128px"
                      className="object-contain p-3.5 sm:p-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Name block */}
        <div className={`relative text-center ${showAvatar ? "mt-6 sm:mt-7" : "mt-7 sm:mt-9"}`}>
          <div
            className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400 backdrop-blur-md"
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08)" }}
          >
            <span
              className="size-1.5 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,120,0.9)]"
              aria-hidden
            />
            <span className="text-zinc-200">{h.sport}</span>
            <span className="text-zinc-600">·</span>
            <span>{h.role}</span>
          </div>

          <h1 className="relative mt-4 leading-[0.86]" style={{ fontFamily: "var(--font-bebas)" }}>
            <span className="block text-[clamp(2.5rem,11vw,3.75rem)] tracking-[0.04em] text-zinc-400">
              {first}
            </span>
            {last ? (
              <span className="mt-0.5 block bg-linear-to-br from-white via-[#f0fff4] to-[#6ee7a0] bg-clip-text text-[clamp(3.25rem,15vw,5rem)] tracking-tight text-transparent">
                {last}
              </span>
            ) : null}
          </h1>

          {tagline ? (
            <p className="mx-auto mt-4 max-w-xs text-[11px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-zinc-400 sm:text-xs sm:tracking-[0.2em]">
              {tagline}
            </p>
          ) : null}
        </div>

        {/* Stats panel — unified premium card */}
        {statTiles.length > 0 ? (
          <div
            className="relative mt-8 overflow-hidden rounded-[1.35rem] border border-white/10 bg-linear-to-b from-white/8 via-white/4 to-transparent p-px shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:mt-10 sm:rounded-2xl"
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 40px -16px rgba(57,255,120,0.25)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#39ff14]/50 to-transparent"
            />
            <div className="rounded-[1.3rem] bg-[#0a0a0c]/80 px-1 py-4 sm:rounded-[1.95rem] sm:py-5">
              <p className="text-center text-[9px] font-bold uppercase tracking-[0.32em] text-zinc-500">
                {ui.seasonAvg}
              </p>
              <div className="mt-3 grid grid-cols-3 divide-x divide-white/8">
                {statTiles.map((tile) => (
                  <div key={tile.label} className="flex flex-col items-center px-2 py-1">
                    <span
                      className={`text-[clamp(2rem,9vw,2.75rem)] font-semibold tabular-nums leading-none ${
                        tile.accent
                          ? "bg-linear-to-b from-white to-[#6ee7a0] bg-clip-text text-transparent"
                          : "text-white"
                      }`}
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {tile.value}
                    </span>
                    <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                      {tile.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Pitch card */}
        {pitch ? (
          <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-4 backdrop-blur-md sm:mt-6 sm:p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-8 top-0 h-full w-24 bg-linear-to-r from-[#39ff14]/10 to-transparent"
            />
            <p className="relative text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">{pitch}</p>
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-7 sm:mt-8">
          <ShareProfileButton
            publicSiteUrl={athlete.seo.publicSiteUrl}
            className={`flex h-13 w-full items-center justify-center gap-2.5 rounded-2xl border border-[#39ff14]/40 bg-linear-to-r from-[#39ff14] via-[#d4ff7a] to-[#39ff14] text-sm font-bold uppercase tracking-[0.16em] text-black shadow-[0_0_40px_-8px_rgba(57,255,120,0.65)] transition hover:brightness-105 hover:shadow-[0_0_52px_-6px_rgba(57,255,120,0.8)] sm:h-14 ${focusRing}`}
            showIcon
          />
        </div>

        {/* Footer meta */}
        <div className="mt-auto pt-8">
          <div className="flex flex-col items-center gap-2 border-t border-white/8 pt-5 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              {h.marketStatusLabel}
            </p>
            <p className="text-[10px] text-zinc-600">
              <time dateTime={h.lastUpdated}>
                {profileDateLabel}{" "}
                <span className="tabular-nums text-zinc-500">{updated}</span>
              </time>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
