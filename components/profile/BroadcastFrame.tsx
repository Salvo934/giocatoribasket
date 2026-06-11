import type { ReactNode } from "react";
import type { VideoUi } from "@/lib/i18n/profile-ui";

type Props = {
  title: string;
  athleteName: string;
  number?: string;
  role: string;
  videoUi: VideoUi;
  /** Default: `videoUi.featured` */
  featuredLabel?: string;
  /** Default: `videoUi.clip` */
  clipBadge?: string;
  children: ReactNode;
};

export function BroadcastFrame({
  title,
  athleteName,
  number,
  role,
  videoUi,
  featuredLabel,
  clipBadge,
  children,
}: Props) {
  const featured = featuredLabel ?? videoUi.featured;
  const badge = clipBadge ?? videoUi.clip;

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/15 bg-[#0a0a0a] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-white/35" aria-hidden />
      <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-white/35" aria-hidden />
      <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-white/35" aria-hidden />
      <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-white/35" aria-hidden />

      <div className="relative border-b border-white/10 bg-linear-to-r from-black via-zinc-950 to-black">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#C9082Acc] to-transparent" />
        <div className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4 md:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 rounded bg-[#C9082A] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
              {badge}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400">{featured}</p>
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

      <div className="relative bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,8,42,0.06)_0%,transparent_55%)]" />
        {children}
      </div>

      <div className="border-t border-white/10 bg-linear-to-r from-zinc-950 via-black to-zinc-950 px-3 py-2.5 sm:px-4 md:px-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 h-8 w-1 shrink-0 rounded-full bg-[#C9082A]" aria-hidden />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{videoUi.nowPlaying}</p>
            <p className="text-sm font-semibold leading-snug text-white md:text-base">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
