"use client";

import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function ContactsPanel({ athlete }: Props) {
  const h = athlete.header;
  const c = athlete.contacts;

  return (
    <SectionShell
      id="contatti"
      eyebrow="Rubrica operativa"
      title="Canali diretti"
      description="Per club e scouting: rispondiamo in genere entro un giorno lavorativo via mail o WhatsApp."
    >
      <div className="grid gap-8">
        {/* Azioni rapide */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {h.highlightUrl ? (
            <a
              href={h.highlightUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center rounded-full border border-accent/45 bg-accent/12 px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/18 ${focusRing}`}
            >
              Highlights YouTube
            </a>
          ) : null}
          {(c.whatsapp ?? h.whatsapp) ? (
            <a
              href={c.whatsapp ?? h.whatsapp!}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition hover:border-emerald-400/50 ${focusRing}`}
            >
              WhatsApp
            </a>
          ) : null}
          {(c.contactFormUrl ?? c.agency.website) ? (
            <a
              href={c.contactFormUrl ?? c.agency.website!}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center rounded-full border border-white/18 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/28 hover:bg-white/10 ${focusRing}`}
            >
              Modulo club
            </a>
          ) : null}
        </div>

        {/* Referente + agenzia */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/35 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Referente</p>
              <p className="mt-2 text-xl font-semibold text-white">{c.representative.name}</p>
              <p className="mt-1 text-sm text-zinc-400">{c.representative.role}</p>

              <dl className="mt-6 space-y-4">
                {c.representative.phone ? (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Telefono</dt>
                    <dd className="mt-1">
                      <a href={`tel:${c.representative.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-white hover:text-accent">
                        {c.representative.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {c.representative.email ? (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${c.representative.email}`} className="break-all text-sm font-medium text-accent hover:underline">
                        {c.representative.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              {c.athleteEmail ? (
                <p className="mt-6 text-xs text-zinc-500">
                  Player:{" "}
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
                  className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {c.agency.website.replace(/^https?:\/\//i, "").replace(/\/?$/, "")}
                  <span aria-hidden> ↗</span>
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
                      className={`flex justify-between gap-4 rounded-lg border border-white/8 px-3 py-2.5 text-sm text-zinc-300 transition hover:border-white/15 hover:bg-white/3 ${focusRing}`}
                    >
                      <span className="text-zinc-500">{s.platform}</span>
                      <span className="truncate font-medium text-white">{s.handle}</span>
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
