import Image from "next/image";
import type { AthleteProfile } from "@/lib/types/athlete";
import { ShareProfileButton } from "./ShareActions";

type Props = { athlete: AthleteProfile };

const IT_MONTHS_SHORT = [
  "gen",
  "feb",
  "mar",
  "apr",
  "mag",
  "giu",
  "lug",
  "ago",
  "set",
  "ott",
  "nov",
  "dic",
] as const;

function formatItalianShortDate(isoDate: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!m) {
    return isoDate;
  }
  const monthNum = Number(m[2]);
  const day = Number(m[3]);
  if (monthNum < 1 || monthNum > 12) {
    return isoDate;
  }
  return `${day} ${IT_MONTHS_SHORT[monthNum - 1]} ${m[1]}`;
}

function formatStat(v: number) {
  const n = Math.round(v * 10) / 10;
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
}

const HERO_FOCUS_CLASS = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function ProfileHeader({ athlete }: Props) {
  const h = athlete.header;
  const s = athlete.stats;
  const updated = formatItalianShortDate(h.lastUpdated);
  const focus = h.heroImageFocus ?? "center";
  const objectPosition = HERO_FOCUS_CLASS[focus] ?? "object-center";
  const jersey = h.number?.replace(/\D/g, "") ?? "";

  return (
    <header className="relative overflow-hidden border-b border-white/6">
      {/* Sfondo hero: alone rispetto alle sezioni — glow, mesh, niente diagonale ripetuta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#030305]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_0%_-10%,rgba(223,255,74,0.14),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_20%,rgba(100,140,255,0.08),transparent_50%),radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(223,255,74,0.05),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/6 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <a
          href="#contenuto-profilo"
          className="absolute left-[-10000px] top-0 z-50 overflow-hidden whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black focus:left-4 focus:top-4 focus:overflow-visible focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          Salta intro
        </a>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,42%)] lg:items-end lg:gap-x-10 xl:gap-x-14">
          {/* Colonna copy: watermark maglia + tipografia da copertina */}
          <div className="relative order-2 flex min-w-0 flex-col lg:order-1 lg:pb-4 lg:pr-4">
            {jersey ? (
              <span
                className="pointer-events-none absolute -top-6 right-0 select-none text-[clamp(6rem,28vw,14rem)] font-bold leading-none tracking-tighter text-white/5.5 sm:-top-10 sm:right-4 lg:-right-8 lg:top-4 lg:text-[min(16rem,22vw)]"
                style={{ fontFamily: "var(--font-bebas)" }}
                aria-hidden
              >
                #{jersey}
              </span>
            ) : null}

            <div className="relative">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 backdrop-blur-sm"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06)" }}
              >
                <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(223,255,74,0.6)]" aria-hidden />
                <span className="text-zinc-200">{h.sport}</span>
                <span className="text-zinc-600">/</span>
                <span>{h.role}</span>
              </div>

              <h1
                className="mt-5 text-5xl leading-[0.88] tracking-tight text-white sm:mt-6 sm:text-6xl lg:text-[4.5rem] lg:leading-[0.86]"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                <span className="bg-linear-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent">{h.name}</span>
              </h1>

              {jersey ? (
                <p
                  className="mt-1 text-sm font-semibold tabular-nums tracking-[0.2em] text-accent sm:text-base"
                  style={{ fontFamily: "var(--font-dm), ui-sans-serif, system-ui" }}
                >
                  #{jersey}
                </p>
              ) : null}
            </div>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
              <span className="text-zinc-200">Giocatore</span>
              <span className="text-zinc-600"> · </span>
              classe {h.birthYear}
              <span className="text-zinc-600"> · </span>
              {h.heightCm} cm
              {(h.category || h.league) && (
                <>
                  <span className="text-zinc-600"> · </span>
                  <span className="text-zinc-300">{[h.category, h.league].filter(Boolean).join(" · ")}</span>
                </>
              )}
            </p>

            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-500">{h.marketStatusLabel}</p>

            <dl className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Squadra</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-100">{h.currentClub}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Profilo aggiornato</dt>
                <dd className="mt-1 text-sm font-semibold tabular-nums text-zinc-300">{updated}</dd>
              </div>
            </dl>

            {h.identityNote ? (
              <p className="mt-4 max-w-xl border-l-2 border-accent/45 pl-3 text-sm leading-relaxed text-zinc-400">{h.identityNote}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShareProfileButton
                path={`/${athlete.slug}`}
                publicSiteUrl={athlete.seo.publicSiteUrl}
                className={`inline-flex h-11 items-center justify-center rounded-full border border-accent/50 bg-accent/12 px-6 text-sm font-semibold text-accent shadow-[0_0_28px_-8px_var(--accent-glow)] transition hover:border-accent/65 hover:bg-accent/18 ${focusRing}`}
              />
              <a
                href="#video"
                className={`inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-black shadow-[0_0_28px_-6px_rgba(223,255,74,0.55)] transition hover:bg-[#e8ff6a] hover:shadow-[0_0_36px_-4px_rgba(223,255,74,0.65)] ${focusRing}`}
              >
                Guarda gli highlights
              </a>
              <a
                href="#contatti"
                className={`inline-flex h-11 items-center justify-center rounded-full border border-white/18 bg-white/3 px-6 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/7 hover:text-white ${focusRing}`}
              >
                Contatta procuratore
              </a>
            </div>

            {/* Stat fascia unica — non box ripetuti come i panel */}
            <div className="mt-10 border-y border-white/10 py-4 sm:mt-12">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">Media stagione</p>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:gap-x-10">
                {(
                  [
                    ["PPG", formatStat(s.pointsPerGame)],
                    ["AST", formatStat(s.assistsPerGame)],
                    ["REB", formatStat(s.reboundsPerGame)],
                    ["3PT%", `${formatStat(s.threePct)}%`],
                  ] as const
                ).map(([label, val], i) => (
                  <div key={label} className="flex items-baseline gap-2">
                    {i > 0 ? (
                      <span className="mr-1 hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
                    ) : null}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</span>
                    <span
                      className="text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Avatar: cornice conica, depth stack, badge maglia */}
          <div className="order-1 mx-auto flex w-full max-w-82 flex-col items-center lg:order-2 lg:mx-0 lg:max-w-88 lg:items-end lg:pb-2">
            <div className="relative w-full max-w-[min(20.5rem,88vw)]">
              {/* Alone doppio: accent caldo + spill blu */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_68%)] opacity-70 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 size-[55%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.18)_0%,transparent_70%)] blur-3xl"
              />
              {/* Ombra portata sotto il disco */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-2 left-[10%] right-[10%] h-8 rounded-[100%] bg-black/50 blur-xl"
              />

              <div className="relative mx-auto aspect-square max-w-[min(20.5rem,88vw)]">
                {/* Ring esterno decorativo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-full bg-[conic-gradient(from_200deg,var(--accent)_0%,rgba(223,255,74,0.12)_22%,rgba(255,255,255,0.35)_42%,rgba(147,197,253,0.28)_62%,rgba(223,255,74,0.15)_82%,var(--accent)_100%)] p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_50px_-20px_rgba(0,0,0,0.85),0_0_52px_-18px_var(--accent-glow)] sm:-inset-1.5 sm:p-[3.5px]"
                >
                  <div className="size-full rounded-full bg-zinc-950 p-[3px] sm:p-1">
                    <div className="relative size-full overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_8px_24px_rgba(0,0,0,0.55)]">
                      <Image
                        src={h.heroImage}
                        alt={`${h.name} — foto profilo`}
                        fill
                        priority
                        quality={95}
                        sizes="(max-width: 1024px) 88vw, 22rem"
                        className={`object-cover ${objectPosition} scale-[1.02]`}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_80%_70%_at_50%_38%,transparent_42%,rgba(0,0,0,0.55)_88%,rgba(0,0,0,0.82)_100%)]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/18 via-transparent to-transparent opacity-55 mask-[radial-gradient(ellipse_120%_80%_at_50%_-20%,black_42%,transparent_72%)]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-px rounded-full ring-1 ring-inset ring-white/12"
                      />
                    </div>
                  </div>
                </div>

                {jersey ? (
                  <div className="absolute -bottom-0.5 -right-0.5 z-10 flex size-[3.35rem] items-center justify-center sm:-bottom-1 sm:-right-1 sm:size-16">
                    <div className="relative flex size-full items-center justify-center rounded-full bg-zinc-950 p-[3px] shadow-[0_14px_36px_-6px_rgba(0,0,0,0.8)] ring-1 ring-white/12">
                      <div className="size-full rounded-full bg-linear-to-br from-[#f3ff96] via-accent to-[#cae92a] p-px shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] ring-2 ring-black/30">
                        <div className="flex size-full items-center justify-center rounded-full bg-linear-to-b from-[#eeff71] to-[#dfff4a] shadow-[inset_0_3px_6px_rgba(255,255,255,0.35)]">
                          <span
                            className="translate-y-px text-base font-black tabular-nums tracking-tighter text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:text-lg"
                            style={{ fontFamily: "var(--font-bebas)" }}
                          >
                            #{jersey}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <p
              className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500 lg:text-right"
              style={{ fontFamily: "var(--font-dm), ui-sans-serif, system-ui" }}
            >
              {h.role}
              <span className="text-zinc-600"> · </span>
              {h.category}
              {h.league ? (
                <>
                  <span className="text-zinc-600"> · </span>
                  <span className="text-zinc-400">{h.league}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
