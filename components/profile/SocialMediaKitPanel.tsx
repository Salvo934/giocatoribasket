"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { AthleteProfile, SocialKitAsset, SocialKitFormat } from "@/lib/types/athlete";
import { isMobileDevice, shareImageToInstagram } from "@/lib/share-instagram";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

const instagramBtnClass = `inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#E1306C]/50 bg-linear-to-r from-[#f77737]/20 via-[#E1306C]/25 to-[#833AB4]/20 px-4 text-xs font-bold uppercase tracking-wider text-[#ffb3d0] [-webkit-tap-highlight-color:transparent] ${focusRing}`;

function formatLabel(format: SocialKitFormat) {
  return format === "story" ? "Storia" : "Post";
}

function aspectClass(format: SocialKitFormat) {
  return format === "story" ? "aspect-[9/16]" : "aspect-[4/5]";
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M5 20h14" />
    </svg>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path strokeLinecap="round" d="M6 16V6a2 2 0 012-2h10" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const secondaryActionClass = `inline-flex h-11 min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/75 px-3 text-sm font-semibold text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-white/18 hover:bg-zinc-900 active:bg-zinc-800/90 [-webkit-tap-highlight-color:transparent] ${focusRing}`;

function KitCard({ item }: { item: SocialKitAsset }) {
  const [copyState, setCopyState] = useState<"idle" | "ok" | "err">("idle");
  const sharingRef = useRef(false);

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

  const shareToInstagram = useCallback(async () => {
    if (sharingRef.current) return;
    sharingRef.current = true;
    try {
      await shareImageToInstagram({
        src: item.src,
        downloadName: item.downloadName,
        caption: item.caption,
      });
    } catch {
      /* annullato o errore */
    } finally {
      sharingRef.current = false;
    }
  }, [item.caption, item.downloadName, item.src]);

  const meta = [item.matchDate, item.opponent].filter(Boolean).join(" · ");
  const shareLabel = item.format === "story" ? "Condividi storia" : "Condividi post";

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

        <div className="mt-4 flex flex-col gap-2">
          <button type="button" onClick={() => void shareToInstagram()} className={instagramBtnClass}>
            <IconInstagram className="size-4 shrink-0" />
            {shareLabel}
          </button>

          <div
            className={
              item.caption
                ? "grid grid-cols-2 gap-2"
                : "grid grid-cols-1"
            }
          >
            <a href={item.src} download={item.downloadName ?? true} className={secondaryActionClass}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/6 text-zinc-200 ring-1 ring-white/10">
                <IconDownload className="size-4" />
              </span>
              <span className="min-w-0 truncate">Scarica</span>
            </a>
            {item.caption ? (
              <button
                type="button"
                onClick={() => void copyCaption()}
                className={`${secondaryActionClass} ${
                  copyState === "ok"
                    ? "border-accent/35 bg-accent/10 text-accent"
                    : copyState === "err"
                      ? "border-red-500/35 bg-red-500/10 text-red-300"
                      : ""
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ring-1 ${
                    copyState === "ok"
                      ? "bg-accent/15 text-accent ring-accent/25"
                      : copyState === "err"
                        ? "bg-red-500/15 text-red-300 ring-red-500/25"
                        : "bg-white/6 text-zinc-200 ring-white/10"
                  }`}
                >
                  {copyState === "ok" ? (
                    <IconCheck className="size-4" />
                  ) : (
                    <IconCopy className="size-4" />
                  )}
                </span>
                <span className="min-w-0 truncate">
                  {copyState === "ok" ? "Copiata" : copyState === "err" ? "Errore" : "Copia caption"}
                </span>
              </button>
            ) : null}
          </div>

          {isMobileDevice() ? (
            <p className="text-xs leading-relaxed text-zinc-600">
              Tocca il pulsante e scegli Instagram: la grafica si apre pronta per il post.
            </p>
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
    "Post e storie aggiornati dopo le partite: condividi su Instagram dal telefono, oppure scarica la grafica.";
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
            Il team prepara contenuti con statistiche, risultato e branding del club — tu li condividi con un tap su
            Instagram.
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
