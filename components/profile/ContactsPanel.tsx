"use client";

import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.3.5C1.6 4.3.8 5.1.5 6.2 0 8 0 12 0 12s0 4 .5 5.8c.3 1.1 1.1 1.9 2.2 2.2 1.7.5 9.3.5 9.3.5s7.6 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zm-13.8 9.4V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

function IconChevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

const phoneCardClass = `group relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-900/90 to-zinc-950 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition hover:border-sky-400/35 hover:shadow-[0_20px_50px_-28px_rgba(56,189,248,0.35)] ${focusRing}`;
const whatsappCardClass = `group relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-900/90 to-zinc-950 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition hover:border-emerald-400/35 hover:shadow-[0_20px_50px_-28px_rgba(52,211,153,0.3)] ${focusRing}`;

export function ContactsPanel({ athlete }: Props) {
  const h = athlete.header;
  const c = athlete.contacts;
  const waUrl = c.whatsapp ?? h.whatsapp;
  const tel = c.representative.phone;
  const telPublic = c.representative.phonePublicLabel;
  const email = c.representative.email;
  const emailPublic = c.representative.emailPublicLabel;

  const showPhoneCard = Boolean(tel || telPublic);
  const showWhatsappCard = Boolean(waUrl || c.whatsappPublicLabel);
  const showEmailCard = Boolean(email || emailPublic);

  return (
    <SectionShell
      id="contatti"
      eyebrow="Rubrica operativa"
      title="Canali diretti"
      description="Telefono, WhatsApp ed email sono i canali ufficiali per club e scouting."
    >
      <div className="grid gap-8">
        {/* Tre vie di contatto — card moderne */}
        <div className="grid gap-4 sm:grid-cols-3">
          {showPhoneCard ? (
            tel ? (
              <a href={`tel:${tel.replace(/\s/g, "")}`} className={phoneCardClass}>
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-sky-500/10 blur-2xl transition group-hover:bg-sky-400/15" aria-hidden />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/25">
                    <IconPhone className="size-6" />
                  </span>
                  <IconChevron className="size-5 shrink-0 text-zinc-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Telefono</p>
                <p className="relative mt-2 text-lg font-semibold tracking-tight text-white">{tel}</p>
                <p className="relative mt-3 text-xs text-zinc-500">Chiama il referente</p>
              </a>
            ) : (
              <div
                className="relative cursor-default overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-900/90 to-zinc-950 p-5 opacity-95 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
                role="note"
                aria-label="Telefono"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-sky-500/10 blur-2xl" aria-hidden />
                <div className="relative flex items-start gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/25">
                    <IconPhone className="size-6" />
                  </span>
                </div>
                <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Telefono</p>
                <p className="relative mt-2 text-lg font-semibold tracking-tight text-white">{telPublic}</p>
                <p className="relative mt-3 text-xs text-zinc-500">Contatto in arrivo</p>
              </div>
            )
          ) : null}

          {showWhatsappCard ? (
            waUrl ? (
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={whatsappCardClass}>
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:bg-emerald-400/15" aria-hidden />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/25">
                    <IconWhatsApp className="size-6" />
                  </span>
                  <IconChevron className="size-5 shrink-0 text-zinc-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">WhatsApp</p>
                <p className="relative mt-2 text-lg font-semibold tracking-tight text-white">Messaggio diretto</p>
                <p className="relative mt-3 text-xs text-zinc-500">Apre la chat sul telefono</p>
              </a>
            ) : (
              <div
                className="relative cursor-default overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-900/90 to-zinc-950 p-5 opacity-95 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
                role="note"
                aria-label="WhatsApp"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-emerald-500/10 blur-2xl" aria-hidden />
                <div className="relative flex items-start gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/25">
                    <IconWhatsApp className="size-6" />
                  </span>
                </div>
                <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">WhatsApp</p>
                <p className="relative mt-2 text-lg font-semibold tracking-tight text-white">{c.whatsappPublicLabel}</p>
                <p className="relative mt-3 text-xs text-zinc-500">Contatto in arrivo</p>
              </div>
            )
          ) : null}

          {showEmailCard ? (
            email ? (
              <a
                href={`mailto:${email}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-900/90 to-zinc-950 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition hover:border-accent/40 hover:shadow-[0_20px_50px_-28px_rgba(223,255,74,0.2)] ${focusRing}`}
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-accent/8 blur-2xl transition group-hover:bg-accent/12" aria-hidden />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/30">
                    <IconMail className="size-6" />
                  </span>
                  <IconChevron className="size-5 shrink-0 text-zinc-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Email</p>
                <p className="relative mt-2 break-all text-sm font-semibold leading-snug text-white">{email}</p>
                <p className="relative mt-3 text-xs text-zinc-500">Ideale per materiale e proposte</p>
              </a>
            ) : (
              <div
                className="relative cursor-default overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-900/90 to-zinc-950 p-5 opacity-95 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
                role="note"
                aria-label="Email"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-accent/8 blur-2xl" aria-hidden />
                <div className="relative flex items-start gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/30">
                    <IconMail className="size-6" />
                  </span>
                </div>
                <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Email</p>
                <p className="relative mt-2 text-lg font-semibold tracking-tight text-white">{emailPublic}</p>
                <p className="relative mt-3 text-xs text-zinc-500">Contatto in arrivo</p>
              </div>
            )
          ) : null}
        </div>

        {h.highlightUrl ? (
          <a
            href={h.highlightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-linear-to-r from-red-950/40 to-zinc-950/40 px-5 py-4 transition hover:border-red-500/35 ${focusRing}`}
          >
            <span className="flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400 ring-1 ring-red-500/25">
                <IconYoutube className="size-5" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-red-400/90">Video</span>
                <span className="mt-1 block text-base font-semibold text-white">Highlights YouTube</span>
              </span>
            </span>
            <IconChevron className="size-5 shrink-0 text-zinc-500" />
          </a>
        ) : null}

        {/* Referente + agenzia + social */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Referente</p>
              <p className="mt-2 text-xl font-semibold text-white">{c.representative.name}</p>
              <p className="mt-1 text-sm text-zinc-400">{c.representative.role}</p>

              {c.athleteEmail ? (
                <p className="mt-6 text-xs text-zinc-500">
                  Mailbox player:{" "}
                  <a href={`mailto:${c.athleteEmail}`} className="font-medium text-zinc-300 hover:text-accent">
                    {c.athleteEmail}
                  </a>
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Agenzia</p>
              <p className="mt-2 text-base font-semibold text-white">{c.agency.name}</p>
              {c.agency.website ? (
                <a
                  href={c.agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {c.agency.website.replace(/^https?:\/\//i, "").replace(/\/?$/, "")}
                  <span aria-hidden>↗</span>
                </a>
              ) : null}

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Social</p>
              <ul className="mt-3 space-y-2">
                {c.social.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-sm transition hover:border-white/12 hover:bg-white/5 ${focusRing}`}
                    >
                      <span className="font-medium text-zinc-400">{s.platform}</span>
                      <span className="truncate font-semibold text-white">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
