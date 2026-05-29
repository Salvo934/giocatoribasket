"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { AthleteProfile, SocialKitAsset, SocialKitFormat } from "@/lib/types/athlete";
import { shareImageToInstagram } from "@/lib/share-instagram";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

type ShareState = "idle" | "loading" | "shared" | "fallback" | "err";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function formatLabel(format: SocialKitFormat) {
  return format === "story" ? "Storia" : "Post";
}

function thumbClass(format: SocialKitFormat) {
  return format === "story"
    ? "w-[4.25rem] aspect-[9/16] sm:w-[4.75rem]"
    : "w-[4.75rem] aspect-[4/5] sm:w-[5.25rem]";
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
    </svg>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path strokeLinecap="round" d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  );
}

function shareButtonLabel(state: ShareState, format: SocialKitFormat) {
  if (state === "loading") return "…";
  if (state === "shared") return "Ok";
  if (state === "fallback") return "Scaricato";
  if (state === "err") return "Riprova";
  return format === "story" ? "Storia" : "Post";
}

function shareHint(state: ShareState) {
  if (state === "shared") return "Scegli Instagram nel menu.";
  if (state === "fallback") return "Grafica scaricata · caption negli appunti.";
  return null;
}

const iconBtnClass = `inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-zinc-300 transition hover:border-white/22 hover:bg-white/8 hover:text-white ${focusRing}`;

function KitCard({ item }: { item: SocialKitAsset }) {
  const [copyState, setCopyState] = useState<"idle" | "ok" | "err">("idle");
  const [shareState, setShareState] = useState<ShareState>("idle");

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
    setShareState("loading");
    try {
      const result = await shareImageToInstagram({
        src: item.src,
        downloadName: item.downloadName,
        caption: item.caption,
      });
      setShareState(result === "shared" ? "shared" : "fallback");
    } catch {
      setShareState("err");
    } finally {
      window.setTimeout(() => setShareState("idle"), 4000);
    }
  }, [item.caption, item.downloadName, item.src]);

  const meta = [item.matchDate, item.opponent].filter(Boolean).join(" · ");
  const hint = shareHint(shareState);
  const shareLabel = shareButtonLabel(shareState, item.format);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950/55 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-[#E1306C]/25">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#E1306C]/6 via-transparent to-[#833AB4]/5 opacity-0 transition group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex gap-3 p-3 sm:gap-3.5 sm:p-3.5">
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ${thumbClass(item.format)}`}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="84px"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {formatLabel(item.format)}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
            {meta ? (
              <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-wide text-zinc-500">{meta}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => void shareToInstagram()}
              disabled={shareState === "loading"}
              title={item.format === "story" ? "Condividi storia su Instagram" : "Condividi post su Instagram"}
              className={`inline-flex h-8 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E1306C]/45 bg-linear-to-r from-[#f77737]/15 via-[#E1306C]/20 to-[#833AB4]/15 px-2.5 text-[10px] font-bold uppercase tracking-wider text-[#ffc4dc] transition hover:border-[#E1306C]/65 hover:from-[#f77737]/25 hover:via-[#E1306C]/30 hover:to-[#833AB4]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[11px] ${focusRing}`}
            >
              <IconInstagram className="size-3.5 shrink-0" />
              <span className="truncate">{shareState === "idle" ? "Instagram" : shareLabel}</span>
            </button>

            <a
              href={item.src}
              download={item.downloadName ?? true}
              title="Scarica grafica"
              aria-label="Scarica grafica"
              className={iconBtnClass}
            >
              <IconDownload className="size-3.5" />
            </a>

            {item.caption ? (
              <button
                type="button"
                onClick={() => void copyCaption()}
                title="Copia caption"
                aria-label="Copia caption"
                className={iconBtnClass}
              >
                {copyState === "ok" ? (
                  <span className="text-[9px] font-bold text-accent">OK</span>
                ) : copyState === "err" ? (
                  <span className="text-[9px] font-bold text-red-400">!</span>
                ) : (
                  <IconCopy className="size-3.5" />
                )}
              </button>
            ) : null}
          </div>

          {hint ? (
            <p className="text-[10px] leading-snug text-zinc-500" role="status">
              {hint}
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
    "Grafiche pronte dopo le gare: condividi su Instagram dal telefono o scarica.";
  const statusLabel = kit?.statusLabel?.trim();
  const instagram = athlete.contacts.social.find((s) => s.platform.toLowerCase() === "instagram");

  return (
    <SectionShell
      id="social-kit"
      density="compact"
      eyebrow="Social media kit"
      title={title}
      description={description}
      headerActions={
        <>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#E1306C]/30 bg-[#E1306C]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ff9ec8]">
            <IconInstagram className="size-3" />
            Instagram
          </span>
          {statusLabel ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              {statusLabel}
            </span>
          ) : null}
          {items.length > 0 ? (
            <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              {items.length} {items.length === 1 ? "asset" : "asset"}
            </span>
          ) : null}
        </>
      }
    >
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/12 bg-zinc-950/35 px-5 py-8 text-center md:px-8 md:py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Kit in arrivo</p>
          <p className="mx-auto mt-3 max-w-md text-base font-semibold text-white">
            Dopo ogni gara troverai qui post e storie pronti da condividere.
          </p>
          {instagram ? (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 px-5 text-xs font-semibold text-[#ffb3d0] transition hover:bg-[#E1306C]/20 ${focusRing}`}
            >
              <IconInstagram className="size-3.5" />
              {instagram.handle}
            </a>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {items.map((item) => (
            <KitCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
