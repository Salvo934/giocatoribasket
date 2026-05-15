import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const panelFrame =
  "rounded-[1.75rem] border border-white/10 bg-black/45 p-px shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]";

const panelInner = "rounded-[1.65rem] bg-zinc-950/55 px-6 py-8 md:px-10 md:py-10 backdrop-blur-sm";

export function HonorsPanel({ athlete }: Props) {
  const items = athlete.honors;

  return (
    <SectionShell
      id="honors"
      eyebrow="Palmares"
      title="Titoli e riconoscimenti"
      description="Premi ufficiali e traguardi citati in scheda — sempre da confermare con fonti federazione / club quando serve una due diligence."
    >
      <div className={panelFrame}>
        <div className={panelInner}>
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500">Nessun elemento palmares in scheda.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              {items.map((it, idx) => (
                <li
                  key={`${it.title}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-950/90 via-black/80 to-zinc-950/70 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-accent/35 md:p-6"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] opacity-40 blur-2xl transition group-hover:opacity-55"
                  />
                  <div className="relative flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-lg shadow-[inset_0_1px_0_0_rgba(223,255,74,0.25)]">
                      ★
                    </div>
                    <div className="min-w-0 flex-1">
                      {it.year ? (
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">{it.year}</p>
                      ) : (
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Anno n/d</p>
                      )}
                      <p className="mt-2 text-lg font-bold leading-snug text-white">{it.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{it.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
