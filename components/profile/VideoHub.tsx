"use client";

import { useState } from "react";
import type { AthleteProfile, AthleteVideo, VideoCategoryId } from "@/lib/types/athlete";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "@/lib/youtube";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

function BroadcastFrame({
  title,
  athleteName,
  number,
  role,
  children,
}: {
  title: string;
  athleteName: string;
  number?: string;
  role: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-white/15 bg-[#0a0a0a] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)]">
      {/* angoli “broadcast” */}
      <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-white/35" aria-hidden />
      <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-white/35" aria-hidden />
      <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-white/35" aria-hidden />
      <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-white/35" aria-hidden />

      {/* barra superiore stile arena */}
      <div className="relative border-b border-white/10 bg-linear-to-r from-black via-zinc-950 to-black">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#C9082Acc] to-transparent" />
        <div className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4 md:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 rounded bg-[#C9082A] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
              Scout tape
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400">Feature reel</p>
              <p className="truncate text-sm font-bold text-white md:text-base">
                {athleteName}
                {number ? (
                  <span className="ml-2 font-mono text-zinc-500 tabular-nums">#{number}</span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:text-right">
            <span className="hidden text-[10px] font-bold uppercase tracking-widest text-zinc-500 sm:inline">
              {role}
            </span>
            <span className="rounded border border-white/10 bg-white/4 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              HD
            </span>
          </div>
        </div>
      </div>

      {/* area video */}
      <div className="relative bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,8,42,0.06)_0%,transparent_55%)]" />
        {children}
      </div>

      {/* lower third */}
      <div className="border-t border-white/10 bg-linear-to-r from-zinc-950 via-black to-zinc-950 px-3 py-2.5 sm:px-4 md:px-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 h-8 w-1 shrink-0 rounded-full bg-[#C9082A]" aria-hidden />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Now playing</p>
            <p className="text-sm font-semibold leading-snug text-white md:text-base">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilmRoomThumbnail({
  clip,
  selected,
  onSelect,
}: {
  clip: AthleteVideo;
  selected: boolean;
  onSelect: () => void;
}) {
  const thumb = youtubeThumbnailUrl(clip.url);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group relative w-full shrink-0 overflow-hidden rounded-lg border bg-black text-left outline-none ring-offset-2 ring-offset-black transition hover:border-[#C9082A]/55 focus-visible:ring-2 focus-visible:ring-[#C9082A] sm:w-[min(42vw,12rem)] lg:w-full lg:flex-1 ${
        selected
          ? "border-[#C9082A] shadow-[0_0_26px_-6px_rgba(201,8,42,0.55)]"
          : "border-white/14 hover:bg-white/3"
      }`}
    >
      <div className="relative aspect-video">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-900 text-[10px] font-bold uppercase text-zinc-500">
            Clip
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent"
        />
        {selected ? (
          <span className="pointer-events-none absolute left-1.5 top-1.5 rounded bg-[#C9082A] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-lg">
            In play
          </span>
        ) : (
          <span className="pointer-events-none absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/55 text-[10px] text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#C9082A]/60">
            ▶
          </span>
        )}
        <p className="absolute bottom-1.5 left-2 right-2 line-clamp-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          {clip.title}
        </p>
      </div>
    </button>
  );
}

function ClipRow({ index, clip }: { index: number; clip: AthleteVideo }) {
  const hasYt = Boolean(youtubeEmbedUrl(clip.url));
  return (
    <li>
      <a
        href={clip.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-lg border border-white/6 bg-linear-to-r from-white/4 to-transparent px-3 py-2.5 transition hover:border-[#C9082A]/40 hover:from-[#C9082A]/10 md:px-4 md:py-3"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black font-mono text-sm font-bold text-white tabular-nums group-hover:border-[#C9082A]/50 group-hover:text-[#ff6b6b]"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100 group-hover:text-white md:text-base">{clip.title}</p>
          {clip.note ? <p className="mt-0.5 truncate text-xs text-zinc-500">{clip.note}</p> : null}
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-[#C9082A]">
          {hasYt ? "YouTube" : "Apri"}
          <span className="text-accent transition group-hover:translate-x-0.5">↗</span>
        </span>
      </a>
    </li>
  );
}

export function VideoHub({ athlete }: Props) {
  const v = athlete.videos;
  const h = athlete.header;

  const sideClips = v.filmRoomSide ?? [];
  const [filmRoomFocus, setFilmRoomFocus] = useState<"main" | number>("main");
  const playing =
    filmRoomFocus === "main" ? v.main : (sideClips[filmRoomFocus] ?? v.main);
  const mainSrc = youtubeEmbedUrl(playing.url);

  const firstId = v.categories[0]?.id ?? "shooting";
  const [activeId, setActiveId] = useState<VideoCategoryId>(firstId);

  const activeCat = v.categories.find((c) => c.id === activeId) ?? v.categories[0];

  return (
    <SectionShell
      id="video"
      eyebrow="Film room"
      title="Video Hub"
      description="Look da broadcast: feature principale e clip per skill, organizzate come in un film room — lettura rapida per staff e video."
      headerActions={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#17408B]/40 bg-[#17408B]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#7eb3ff]">
            Skill breakdown
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Est. {v.categories.length} reparti
          </span>
        </>
      }
    >
      <div
        className="space-y-10 rounded-2xl border border-white/7 p-1 sm:p-2"
        style={{
          background: `linear-gradient(180deg, rgba(23,64,139,0.12) 0%, transparent 38%), linear-gradient(165deg, #14100e 0%, #050505 45%, #0a0b10 100%)`,
        }}
      >
        {/* Highlight principale */}
        <BroadcastFrame
          title={playing.title}
          athleteName={h.name}
          number={h.number}
          role={h.role}
        >
          <div className="p-4 md:p-5">
            <div
              className={`grid gap-3 ${sideClips.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_minmax(148px,16rem)] lg:gap-4" : ""}`}
            >
              <div className="relative aspect-video min-h-0 w-full overflow-hidden bg-zinc-950">
                {mainSrc ? (
                  <iframe
                    key={playing.url}
                    title={playing.title}
                    src={`${mainSrc}?rel=0`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <p className="text-sm font-semibold text-zinc-400">Nessun embed valido</p>
                    <p className="text-xs text-zinc-600">Serve un URL YouTube per questo clip.</p>
                  </div>
                )}
              </div>

              {sideClips.length > 0 ? (
                <div className="flex flex-row gap-2 lg:flex-col lg:justify-center lg:gap-3">
                  {sideClips.map((clip, i) => (
                    <FilmRoomThumbnail
                      key={`${clip.url}-${i}`}
                      clip={clip}
                      selected={filmRoomFocus === i}
                      onSelect={() => setFilmRoomFocus(i)}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {sideClips.length > 0 && filmRoomFocus !== "main" ? (
              <div className="mt-3 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => setFilmRoomFocus("main")}
                  className="rounded-md border border-white/14 bg-white/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-200 transition hover:border-[#17408B]/45 hover:bg-[#17408B]/15 hover:text-white"
                >
                  ← Highlights principali
                </button>
              </div>
            ) : null}
          </div>
        </BroadcastFrame>

        {/* Skill tabs + playlist */}
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Playbook clips</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Scegli il reparto · ogni voce apre il video su YouTube (o link esterno).
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              className="mb-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin"
              style={{ scrollbarColor: "#C9082A transparent" }}
              role="tablist"
              aria-label="Categorie video"
            >
              {v.categories.map((cat) => {
                const sel = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={sel}
                    onClick={() => setActiveId(cat.id)}
                    className={`shrink-0 rounded-md border px-3 py-2 text-left text-xs font-bold uppercase tracking-wider transition sm:px-4 ${
                      sel
                        ? "border-[#C9082A] bg-[#C9082A] text-white shadow-[0_0_24px_-4px_rgba(201,8,42,0.5)]"
                        : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/25 hover:text-zinc-200"
                    }`}
                  >
                    {cat.label}
                    <span className="ml-1.5 font-mono text-[10px] font-normal opacity-70 tabular-nums">
                      ({cat.clips.length})
                    </span>
                  </button>
                );
              })}
            </div>

            {activeCat ? (
              <div
                role="tabpanel"
                className="rounded-xl border border-white/8 bg-black/50 p-3 md:p-4"
                style={{ boxShadow: `inset 0 0 0 1px rgba(23, 64, 139, 0.15)` }}
              >
                <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <p className="text-sm font-bold uppercase tracking-widest text-white">{activeCat.label}</p>
                  <span className="rounded border border-[#17408B]/35 bg-[#17408B]/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#9ec5ff]">
                    {activeCat.clips.length} {activeCat.clips.length === 1 ? "voce" : "voci"}
                  </span>
                </div>
                <ul className="space-y-2">
                  {activeCat.clips.map((clip, i) => (
                    <ClipRow key={`${clip.title}-${i}`} index={i + 1} clip={clip} />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {/* Full game — stile “locked broadcast” */}
        {v.fullGame ? (
          <div className="relative overflow-hidden rounded-xl border border-dashed border-white/20 bg-linear-to-br from-[#17408B]/20 via-black/80 to-black p-5 md:p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#C9082A]/10 blur-3xl" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black font-mono text-2xl text-zinc-600">
                  ◆
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Full game film</p>
                  <p className="mt-1 max-w-xl text-base font-semibold text-white">{v.fullGame.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">Accesso controllato — tipico flusso tra club e rappresentanza.</p>
                </div>
              </div>
              {v.fullGame.url.startsWith("mailto:") ? (
                <a
                  href={v.fullGame.url}
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border-2 border-white bg-white px-6 text-sm font-bold uppercase tracking-wide text-black hover:bg-zinc-200"
                >
                  Richiedi film
                </a>
              ) : (
                <a
                  href={v.fullGame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-[#C9082A] bg-[#C9082A]/90 px-6 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#C9082A]"
                >
                  Apri partita
                </a>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
