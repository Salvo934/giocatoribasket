"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { AthleteProfile, SocialKitAsset, SocialKitFormat } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function formatLabel(format: SocialKitFormat) {
  return format === "story" ? "Storia" : "Post";
}

function aspectClass(format: SocialKitFormat) {
  return format === "story" ? "aspect-[9/16]" : "aspect-[4/5]";
}

function KitCard({ item }: { item: SocialKitAsset }) {
  const [copyState, setCopyState] = useState<"idle" | "ok" | "err">("idle");

  const copyCaption = useCallback(async () => {
    if (!item.caption?.trim()) return;
    try {
      await navigator.clipboard.writeText(item.caption.trim());
      setCopyState("ok");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("err");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }, [item.caption]);

  const meta = [item.matchDate, item.opponent].filter(Boolean).join(" · ");

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition hover:border-accent/30">
      <div className={`relative w-full overflow-hidden bg-black ${aspectClass(item.format)}`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {formatLabel(item.format)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-base font-semibold leading-snug text-white">{item.title}</h3>
        {meta ? <p className="mt-1 text-xs font-medium text-zinc-500">{meta}</p> : null}
        {item.caption ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{item.caption}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={item.src}
            download={item.downloadName ?? true}
            className={`inline-flex h-10 items-center justify-center rounded-full border border-accent/45 bg-accent/12 px-4 text-xs font-bold uppercase tracking-wider text-accent transition hover:bg-accent/20 ${focusRing}`}
          >
            Scarica
          </a>
          {item.caption ? (
            <button
              type="button"
              onClick={() => void copyCaption()}
              className={`inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold uppercase tracking-wider text-zinc-200 transition hover:border-white/25 hover:bg-white/8 ${focusRing}`}
            >
              {copyState === "ok" ? "Copiato" : copyState === "err" ? "Errore" : "Copia caption"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function SocialMediaKitPanel({ athlete }: Props) {
  const kit = athlete.socialMediaKit;
  const items = kit?.items ?? [];
  const title = kit?.title?.trim() || "Contenuti pronti per i social";
  const description =
    kit?.description?.trim() ||
    "Post e storie aggiornati dopo le partite: scarica e condividi sui tuoi canali Instagram (feed, storie o repost).";
  const statusLabel = kit?.statusLabel?.trim();
  const instagram = athlete.contacts.social.find((s) => s.platform.toLowerCase() === "instagram");

  return (
    <SectionShell
      id="social-kit"
      eyebrow="Social media kit"
      title={title}
      description={description}
      headerActions={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E1306C]/35 bg-[#E1306C]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ff9ec8]">
            Instagram ready
          </span>
          {statusLabel ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              {statusLabel}
            </span>
          ) : null}
          {items.length > 0 ? (
            <span className="inline-flex rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              {items.length} {items.length === 1 ? "asset" : "asset"}
            </span>
          ) : null}
        </>
      }
    >
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-zinc-950/40 px-6 py-12 text-center md:px-10 md:py-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">Kit in arrivo</p>
          <p className="mx-auto mt-4 max-w-md text-lg font-semibold text-white">
            Dopo ogni gara troverai qui grafiche pronte per post e storie.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
            Il team prepara contenuti con statistiche, risultato e branding del club — tu li scarichi e li pubblichi
            sui tuoi social.
          </p>
          {instagram ? (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex h-11 items-center justify-center rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 px-6 text-sm font-semibold text-[#ffb3d0] transition hover:bg-[#E1306C]/20 ${focusRing}`}
            >
              Vai su {instagram.handle}
            </a>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <KitCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
