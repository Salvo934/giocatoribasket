import Image from "next/image";
import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const panelFrame =
  "rounded-[1.75rem] border border-white/10 bg-black/45 p-px shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]";

const panelInner = "rounded-[1.65rem] bg-zinc-950/55 px-6 py-8 md:px-10 md:py-10 backdrop-blur-sm";

export function CareerTimeline({ athlete }: Props) {
  const steps = athlete.career;

  return (
    <SectionShell
      id="carriera"
      eyebrow="Club"
      title="Percorso"
      description="Linea temporale stagioni e contesti: utile per contesto sportivo rapido senza aprire referti completi."
    >
      <div className={panelFrame}>
        <div className={panelInner}>
          {steps.length === 0 ? (
            <p className="text-sm text-zinc-500">Nessun passaggio carriera in scheda.</p>
          ) : (
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-[13px] top-4 bottom-4 w-px bg-linear-to-b from-accent/50 via-white/12 to-white/5 md:left-[17px]"
              />
              <ol className="relative space-y-0">
              {steps.map((step, idx) => (
                  <li key={`${step.season}-${step.club}-${idx}`} className="relative pb-8 pl-10 md:pb-10 md:pl-12">
                    <div
                      className="absolute left-0 top-1.5 flex size-7 items-center justify-center md:left-1 md:top-1"
                      aria-hidden
                    >
                      <span className="absolute size-3 rounded-full bg-accent shadow-[0_0_14px_var(--accent-glow)] ring-4 ring-zinc-950" />
                    </div>
                    <article className="group rounded-2xl border border-white/8 bg-black/40 p-5 transition hover:border-accent/30 hover:bg-black/55 md:p-6">
                      <div className="flex items-start gap-5 md:gap-6">
                        {step.clubLogo ? (
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-white/6 ring-1 ring-white/10 md:size-24 lg:size-28">
                            <Image
                              src={step.clubLogo}
                              alt={`Logo ${step.club}`}
                              fill
                              sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                              className="object-contain p-2 md:p-2.5"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">{step.season}</p>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                              {step.category}
                            </span>
                          </div>
                          <h3
                            className="mt-3 text-2xl font-bold leading-tight text-white md:text-[1.85rem]"
                            style={{ fontFamily: "var(--font-bebas)" }}
                          >
                            {step.club}
                          </h3>
                          {step.notes ? (
                            <p className="mt-3 border-l-2 border-accent/35 pl-3 text-sm leading-relaxed text-zinc-400">{step.notes}</p>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </li>
              ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
