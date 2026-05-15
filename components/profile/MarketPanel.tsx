import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

function AvailabilityTile({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border px-3 py-3 transition sm:px-4 sm:py-3.5 ${
        active
          ? "border-accent/40 bg-accent/10 shadow-[0_0_24px_-8px_rgba(223,255,74,0.35)]"
          : "border-white/8 bg-white/3 opacity-70"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${
            active ? "bg-accent text-black" : "bg-zinc-800 text-zinc-600"
          }`}
          aria-hidden
        >
          {active ? "✓" : "—"}
        </span>
        <span
          className={`text-xs font-bold uppercase leading-snug tracking-wider sm:text-[11px] ${
            active ? "text-white" : "text-zinc-500 line-through decoration-white/15"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function MarketPanel({ athlete }: Props) {
  const m = athlete.market;
  const openChannels = m.availability.filter((a) => a.active).length;

  return (
    <SectionShell
      id="mercato"
      eyebrow="Disponibilità"
      title="Status mercato"
      description="Finestre temporali, modalità di ingresso valutate e aree geografiche — quadro chiaro prima di aprire un thread con il referente."
      headerActions={
        <>
          <span className="inline-flex rounded-full border border-[#C9082A]/35 bg-[#C9082A]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ff8a8a]">
            Trading desk
          </span>
          <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {openChannels}/{m.availability.length} canali aperti
          </span>
        </>
      }
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/6 via-transparent to-[#C9082A]/6 p-1 sm:p-2">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(900px 320px at 0% 0%, rgba(201,8,42,0.12), transparent 55%), radial-gradient(700px 280px at 100% 100%, rgba(223,255,74,0.06), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative space-y-5 p-3 sm:p-4 md:space-y-6 md:p-5">
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            <article className="rounded-2xl border border-white/10 bg-zinc-950/75 p-5 md:p-6 lg:col-span-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Finestra temporale</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#ff9a9a]/90">Disponibile da</p>
              <p
                className="mt-3 text-2xl leading-tight text-white md:text-3xl"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {m.availableFrom}
              </p>
              <div className="mt-5 rounded-xl border border-dashed border-white/12 bg-black/35 px-3 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Economico</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{m.economicsNote}</p>
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-elevated/90 p-5 md:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Obiettivo progetto</p>
                <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                  Fit ricercato
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-white">Tipo opportunità cercata</h3>
              <p className="mt-4 border-l-2 border-accent/45 pl-3 text-sm leading-relaxed text-zinc-300 md:pl-4 md:text-base">
                {m.opportunitySought}
              </p>
            </article>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/40 p-4 md:p-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Disponibile per</h3>
                <p className="mt-1 text-xs text-zinc-500">Seleziona cosa ha senso aprire in prima battuta.</p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {m.availability.map((a) => (
                <li key={a.id} className="list-none">
                  <AvailabilityTile label={a.label} active={a.active} />
                </li>
              ))}
            </ul>
          </div>

          <article className="rounded-2xl border border-white/8 bg-linear-to-r from-white/4 to-transparent p-4 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Zone valutate</h3>
            <p className="mt-1 text-xs text-zinc-500">Mercati geografici in cui ha senso allineare scouting e contatti.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {m.regionsEvaluated.map((r) => (
                <li key={r}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-200 ring-1 ring-white/5">
                    <span className="text-accent" aria-hidden>
                      ◉
                    </span>
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </SectionShell>
  );
}
