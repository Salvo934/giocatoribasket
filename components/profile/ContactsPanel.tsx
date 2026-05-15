"use client";

import Image from "next/image";
import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function ContactsPanel({ athlete }: Props) {
  const h = athlete.header;
  const c = athlete.contacts;
  const roster = athlete.agencyRoster;

  return (
    <SectionShell
      id="contatti"
      eyebrow="Rubrica operativa"
      title="Canali diretti"
      description="Percorsi ufficiali per club, scouting video e giornalisti — risposta tipicamente tramite mail o messaggistica condivisa con l'agenzia."
      headerActions={
        <>
          <span className="inline-flex rounded-full border border-accent/35 bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
            SLA 24 h demo
          </span>
          <span className="inline-flex rounded-full border border-[#17408B]/35 bg-[#17408B]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#93b7ff]">
            White label
          </span>
        </>
      }
    >
      <div className="grid gap-4 lg:gap-6">
        {/* Azioni rapide */}
        <div className="grid gap-3 sm:grid-cols-4">
          {h.highlightUrl ? (
            <div className="sm:col-span-2">
              <a
                href={h.highlightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-full min-h-24 flex-col rounded-2xl border border-accent/50 bg-accent/12 p-5 text-accent shadow-[inset_0_1px_0_0_rgba(223,255,74,0.25)] backdrop-blur-sm hover:border-accent hover:bg-accent/18 ${focusRing}`}
              >
                <span className="inline-flex rounded-full bg-black/65 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-accent ring-2 ring-accent/80">
                  YouTube reel
                </span>
                <span className="mt-6 text-xl font-semibold md:text-[1.65rem]" style={{ fontFamily: "var(--font-bebas)" }}>
                  Apri scout tape pubblico →
                </span>
              </a>
            </div>
          ) : null}

          {c.whatsapp || h.whatsapp ? (
            <div className="sm:col-span-2 lg:col-span-1">
              <a
                href={c.whatsapp ?? h.whatsapp!}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-31 items-center rounded-2xl border border-emerald-500/45 bg-black/95 p-6 text-xl font-semibold text-emerald-500 shadow-inner shadow-black/85 ring-4 ring-transparent transition hover:ring-emerald-500/30 ${focusRing}`}
              >
                Chat WhatsApp
              </a>
            </div>
          ) : null}

          {(c.agency.website ?? c.contactFormUrl) ? (
            <div className="sm:col-span-4 lg:col-span-1">
              <a
                href={c.contactFormUrl ?? c.agency.website!}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-31 items-center rounded-2xl border border-white/35 bg-black/92 p-6 text-[1.125rem] font-semibold uppercase tracking-[0.2em] text-white shadow-inner shadow-black/70 transition hover:border-white hover:text-accent ${focusRing}`}
              >
                Form digitale club
              </a>
            </div>
          ) : null}
        </div>

        {/* Referente */}
        <div className="grid gap-8 rounded-3xl border border-white/14 bg-black/92 p-px shadow-[inset_0_1px_0_0_rgba(223,255,74,0.14)] lg:grid-cols-12 lg:rounded-4xl lg:p-11">
          <div className="rounded-[1.95rem] border border-accent/65 bg-accent/92 p-px shadow-[inset_0_1px_0_0_rgba(223,255,74,0.35)] lg:col-span-5 lg:aspect-square">
            <div className="relative flex aspect-square flex-col rounded-[calc(2rem-1px)] bg-zinc-950 p-8 text-zinc-200 shadow-[inset_0_-60px_80px_-30px_rgba(0,0,0,0.65)] sm:p-12 lg:aspect-auto lg:min-h-72">
              <span className="text-[11px] font-black uppercase tracking-[0.42em] text-accent">Desk</span>
              <span
                className="mt-10 text-[2.125rem] font-black uppercase leading-none text-white sm:mt-14 lg:text-[2.35rem]"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                Scouting inbox
              </span>
              <div className="mt-auto rounded-3xl bg-zinc-950/90 px-6 py-4 shadow-xl ring-1 ring-white/10 sm:px-9 sm:py-5">
                <p className="text-[13px] font-black uppercase tracking-[0.24em] text-accent">Preferito</p>
                <p className="mt-4 text-xl font-semibold text-white">{c.representative.name}</p>
                <span className="mt-6 inline-flex rounded-full bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-200">
                  {c.representative.role}
                </span>
              </div>
              <span className="pointer-events-none absolute right-[-10%] top-[-26%] text-[12rem] font-black italic leading-none text-black/85" aria-hidden>
                ⌁
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[calc(2rem-1px)] px-10 py-14 text-zinc-200 lg:col-span-7 lg:px-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Referente operativo</p>
              <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">{c.representative.name}</h3>
              {c.representative.phone ? (
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Telefono</p>
                  <div className="mt-1">
                    <a href={`tel:${c.representative.phone.replace(/\s/g, "")}`} className="font-semibold text-white hover:text-accent">
                      {c.representative.phone}
                    </a>
                  </div>
                </div>
              ) : null}
              {c.representative.email ? (
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Email</p>
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
                  <a href={`mailto:${c.athleteEmail}`} className="font-semibold text-accent">
                    {c.athleteEmail}
                  </a>
                </p>
              ) : null}
              <div className="mt-8 flex gap-5">
                {h.highlightUrl ? (
                  <a
                    href={h.highlightUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-10 items-center rounded-full bg-accent px-5 text-xs font-bold uppercase tracking-wide text-black hover:bg-[#dff95c] ${focusRing}`}
                  >
                    Reel pubblico ↗
                  </a>
                ) : null}
                {h.whatsapp ? (
                  <a
                    href={h.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-10 items-center rounded-full border border-white/20 px-5 text-xs font-bold uppercase tracking-wide text-white hover:border-emerald-400 hover:text-emerald-400 ${focusRing}`}
                  >
                    Ping WhatsApp ↗
                  </a>
                ) : null}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Struttura</p>
              <h4 className="mt-2 text-base font-bold text-white">{c.agency.name}</h4>
              {c.agency.website ? (
                <a href={c.agency.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline">
                  {c.agency.website.replace(/^https?:\/\//i, "").replace(/\/?$/, "/")}
                  <span aria-hidden> ↗</span>
                </a>
              ) : null}
              <div className="mt-12 border border-white/8 bg-black/82 p-px pb-px shadow-[inset_0_-1px_0_0_rgba(223,255,74,0.18)] lg:rounded-3xl lg:pb-px">
                <div className="rounded-[calc(1.375rem-1px)] px-12 py-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Social giocatore</p>
                  <ul className="mt-4 space-y-2">
                    {c.social.map((s) => (
                      <li key={s.platform}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex justify-between rounded-2xl border border-white/6 bg-black/94 px-4 py-4 text-[11px] font-semibold text-white transition hover:border-accent/65 hover:bg-black">
                          <span className="text-zinc-300">{s.platform}</span>
                          <span className="truncate pl-10 text-accent">{s.handle}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roster sintetico */}
        {roster.length > 0 ? (
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-zinc-500">Altri player card collegati</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {roster.slice(0, 6).map((p) => (
                <a
                  key={p.slug}
                  href={`/${p.slug}`}
                  className={`group rounded-3xl border border-white/14 bg-black/94 p-px shadow-[inset_0_-1px_0_0_rgba(223,255,74,0.15)] backdrop-blur ${focusRing}`}
                >
                  <div className="flex items-center gap-4 rounded-[inherit] px-8 py-5">
                    <div className="relative h-19.5 w-19.5 overflow-hidden rounded-2xl border border-accent/85 bg-accent/92 ring-8 ring-accent/35 shadow-[inset_0_1px_0_0_rgba(223,255,74,0.45)]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="80px"
                        className="object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-110"
                      />
                      <span className="pointer-events-none absolute inset-[10%_10%_-18%_-10%] rounded-full bg-[radial-gradient(circle_at_bottom,rgba(12,58,214,0.38),transparent_74%)]" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 text-left leading-tight">
                      <p className="text-[13px] font-black uppercase tracking-[0.18em] text-accent">{p.club}</p>
                      <p className="mt-2 truncate text-[1.0625rem] font-semibold text-white">{p.name}</p>
                      <p className="mt-1 text-[13px] text-zinc-400">
                        <span>{p.role}</span>
                        {p.category ? <span>{` • ${p.category}`}</span> : null}
                      </p>
                    </div>
                    <span className="rounded-full px-6 py-[0.4rem] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 transition duration-150 group-hover:-translate-x-1 group-hover:text-accent">
                      apri · →
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
