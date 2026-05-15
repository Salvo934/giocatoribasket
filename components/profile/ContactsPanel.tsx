"use client";

import Image from "next/image";
import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.3.5C1.6 4.3.8 5.1.5 6.2 0 8 0 12 0 12s0 4 .5 5.8c.3 1.1 1.1 1.9 2.2 2.2 1.7.5 9.3.5 9.3.5s7.6 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zm-13.8 9.4V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconForm({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export function ContactsPanel({ athlete }: Props) {
  const h = athlete.header;
  const c = athlete.contacts;
  const roster = athlete.agencyRoster;

  return (
    <SectionShell
      variant="channels"
      id="contatti"
      eyebrow="Rubrica operativa"
      title="Canali diretti"
      description="Percorsi ufficiali per club, scouting video e giornalisti — risposta tipicamente tramite mail o messaggistica condivisa con l’agenzia."
      headerActions={
        <>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/35 bg-orange-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-orange-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <span className="size-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.65)]" aria-hidden />
            SLA 24 h demo
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#17408B]/45 bg-[#17408B]/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#b8d4ff] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <span className="size-1.5 rounded-full bg-[#60a5fa]" aria-hidden />
            White label
          </span>
        </>
      }
    >
      <div className="grid gap-6 lg:gap-8">
        {/* Azioni rapide — bento */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {h.highlightUrl ? (
            <div className="sm:col-span-2 lg:col-span-6">
              <a
                href={h.highlightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-full min-h-29 flex-col overflow-hidden rounded-2xl border border-orange-400/45 bg-linear-to-br from-orange-500/15 via-zinc-950/90 to-zinc-950 p-5 shadow-[inset_0_1px_0_0_rgba(255,237,213,0.12)] transition hover:border-orange-400/65 hover:from-orange-500/22 ${focusRing}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-orange-500/20 blur-3xl transition group-hover:bg-orange-400/25"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-orange-200 ring-1 ring-orange-400/40">
                    <IconYoutube className="size-3.5 text-orange-400" />
                    YouTube reel
                  </span>
                  <IconYoutube className="size-8 shrink-0 text-orange-400/35 transition group-hover:text-orange-400/55" />
                </div>
                <span
                  className="relative mt-auto pt-8 text-xl font-semibold tracking-tight text-white md:text-[1.65rem]"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  Apri scout tape pubblico
                  <span className="ml-2 inline-block transition group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </a>
            </div>
          ) : null}

          {c.whatsapp || h.whatsapp ? (
            <div className={h.highlightUrl ? "lg:col-span-3" : "sm:col-span-2 lg:col-span-6"}>
              <a
                href={c.whatsapp ?? h.whatsapp!}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-full min-h-29 flex-col justify-between rounded-2xl border border-emerald-500/40 bg-linear-to-br from-emerald-950/80 via-black to-black p-5 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.15)] ring-4 ring-transparent transition hover:border-emerald-400/55 hover:ring-emerald-500/15 ${focusRing}`}
              >
                <IconWhatsApp className="size-9 text-emerald-400/90" />
                <span className="text-lg font-bold tracking-tight text-emerald-100">WhatsApp diretto</span>
              </a>
            </div>
          ) : null}

          {(c.agency.website ?? c.contactFormUrl) ? (
            <div className={h.highlightUrl ? "lg:col-span-3" : "sm:col-span-2 lg:col-span-6"}>
              <a
                href={c.contactFormUrl ?? c.agency.website!}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-full min-h-29 flex-col justify-between rounded-2xl border border-[#17408B]/50 bg-linear-to-br from-[#17408B]/25 via-zinc-950 to-black p-5 shadow-[inset_0_1px_0_0_rgba(147,183,255,0.12)] transition hover:border-[#93b7ff]/45 hover:bg-[#17408B]/30 ${focusRing}`}
              >
                <IconForm className="size-9 text-[#93b7ff]" />
                <span className="text-[1.05rem] font-bold uppercase tracking-[0.14em] text-white">Form digitale club</span>
              </a>
            </div>
          ) : null}
        </div>

        {/* Referente */}
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/12 bg-linear-to-br from-orange-500/10 via-white/4 to-[#17408B]/15 p-px shadow-[0_28px_80px_-40px_rgba(0,0,0,0.9)] lg:grid-cols-12 lg:rounded-4xl">
          <div className="rounded-[calc(1.75rem-1px)] bg-black/95 lg:col-span-5 lg:rounded-l-[calc(2rem-1px)] lg:rounded-r-none">
            <div className="relative overflow-hidden rounded-[inherit] border border-orange-400/25 bg-linear-to-br from-orange-500/20 via-accent/85 to-[#cae92a]/90 p-px lg:min-h-full">
              <div className="relative flex min-h-72 flex-col rounded-[calc(1.65rem-1px)] bg-zinc-950 px-8 pb-8 pt-10 text-zinc-200 shadow-[inset_0_-70px_90px_-35px_rgba(0,0,0,0.72)] sm:px-10 sm:pt-12">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.42em] text-orange-300">Desk</span>
                  <span className="h-px flex-1 bg-linear-to-r from-orange-400/40 to-transparent" aria-hidden />
                </div>
                <span
                  className="mt-10 max-w-[12ch] text-[2.125rem] font-black uppercase leading-[0.92] text-white sm:mt-14 lg:text-[2.45rem]"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  Scouting inbox
                </span>
                <div className="mt-auto rounded-2xl border border-white/10 bg-zinc-950/95 px-6 py-5 shadow-xl backdrop-blur-sm sm:px-8 sm:py-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.26em] text-accent">Preferito</p>
                  <p className="mt-3 text-xl font-semibold text-white">{c.representative.name}</p>
                  <span className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-300">
                    {c.representative.role}
                  </span>
                </div>
                <span className="pointer-events-none absolute right-[-8%] top-[-18%] text-[11rem] font-black italic leading-none text-black/80" aria-hidden>
                  ⌁
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 rounded-[calc(1.75rem-1px)] border border-white/8 bg-zinc-950/90 px-8 py-10 text-zinc-200 lg:col-span-7 lg:rounded-l-none lg:rounded-r-[calc(2rem-1px)] lg:border-l-0 lg:px-14 lg:py-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Referente operativo</p>
              <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">{c.representative.name}</h3>
              {c.representative.phone ? (
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-400/85">Telefono</p>
                  <div className="mt-1">
                    <a href={`tel:${c.representative.phone.replace(/\s/g, "")}`} className="font-semibold text-white hover:text-orange-300">
                      {c.representative.phone}
                    </a>
                  </div>
                </div>
              ) : null}
              {c.representative.email ? (
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#93b7ff]">Email</p>
                  <div className="mt-1">
                    <a href={`mailto:${c.representative.email}`} className="break-all font-semibold text-accent hover:underline">
                      {c.representative.email}
                    </a>
                  </div>
                </div>
              ) : null}
              {c.athleteEmail ? (
                <p className="mt-6 text-[11px] text-zinc-500">
                  Mailbox player:{" "}
                  <a href={`mailto:${c.athleteEmail}`} className="font-semibold text-accent hover:underline">
                    {c.athleteEmail}
                  </a>
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                {h.highlightUrl ? (
                  <a
                    href={h.highlightUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-10 items-center rounded-full bg-orange-500 px-5 text-xs font-bold uppercase tracking-wide text-black hover:bg-orange-400 ${focusRing}`}
                  >
                    Reel pubblico ↗
                  </a>
                ) : null}
                {h.whatsapp ? (
                  <a
                    href={h.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-10 items-center rounded-full border border-white/18 bg-white/5 px-5 text-xs font-bold uppercase tracking-wide text-white hover:border-emerald-400/50 hover:text-emerald-300 ${focusRing}`}
                  >
                    Ping WhatsApp ↗
                  </a>
                ) : null}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Struttura</p>
              <h4 className="mt-2 text-base font-bold text-white">{c.agency.name}</h4>
              {c.agency.website ? (
                <a
                  href={c.agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-[#93b7ff] hover:text-orange-300 hover:underline"
                >
                  {c.agency.website.replace(/^https?:\/\//i, "").replace(/\/?$/, "/")}
                  <span aria-hidden> ↗</span>
                </a>
              ) : null}
              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#17408B]/8 to-black/90 shadow-inner">
                <div className="border-b border-white/8 px-6 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400/90">Social giocatore</p>
                </div>
                <ul className="divide-y divide-white/6 px-3 py-2">
                  {c.social.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-[11px] font-semibold text-white transition hover:bg-white/4 hover:text-orange-200 ${focusRing}`}
                      >
                        <span className="text-zinc-400">{s.platform}</span>
                        <span className="truncate text-right font-bold text-accent">{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Roster sintetico */}
        {roster.length > 0 ? (
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zinc-500">Altri player card collegati</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {roster.slice(0, 6).map((p) => (
                <a
                  key={p.slug}
                  href={`/${p.slug}`}
                  className={`group rounded-3xl border border-white/12 bg-black/90 p-px shadow-[inset_0_-1px_0_0_rgba(249,115,22,0.12)] backdrop-blur transition hover:border-orange-400/35 ${focusRing}`}
                >
                  <div className="flex items-center gap-4 rounded-[inherit] px-7 py-5">
                    <div className="relative h-19.5 w-19.5 shrink-0 overflow-hidden rounded-2xl border border-orange-400/40 bg-linear-to-br from-orange-500/20 to-[#17408B]/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="80px"
                        className="object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-left leading-tight">
                      <p className="text-[13px] font-black uppercase tracking-[0.18em] text-orange-300/95">{p.club}</p>
                      <p className="mt-2 truncate text-[1.0625rem] font-semibold text-white">{p.name}</p>
                      <p className="mt-1 text-[13px] text-zinc-400">
                        <span>{p.role}</span>
                        {p.category ? <span>{` • ${p.category}`}</span> : null}
                      </p>
                    </div>
                    <span className="hidden shrink-0 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 transition duration-150 group-hover:text-orange-300 sm:inline-block">
                      apri →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
