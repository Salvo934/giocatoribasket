"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { AthleteProfile, SocialKitAsset, SocialKitFormat } from "@/lib/types/athlete";
import { isValidSocialKitCode, isSocialKitUnlocked, unlockSocialKit } from "@/lib/social-kit-access";
import { resolveSocialKitMonths, totalSocialKitAssets, type ResolvedSocialKitMonth } from "@/lib/social-kit-months";
import { buildWhatsAppRequestUrl, resolveSocialKitWhatsApp } from "@/lib/whatsapp-request";
import { isMobileDevice, shareImageToInstagram } from "@/lib/share-instagram";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

const instagramBtnClass = `inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#E1306C]/50 bg-linear-to-r from-[#f77737]/20 via-[#E1306C]/25 to-[#833AB4]/20 px-4 text-xs font-bold uppercase tracking-wider text-[#ffb3d0] [-webkit-tap-highlight-color:transparent] ${focusRing}`;

function formatLabel(format: SocialKitFormat, ui: ReturnType<typeof useProfileLocale>["ui"]["socialKit"]) {
  if (format === "story") return ui.formatStory;
  if (format === "reel") return ui.formatReel;
  return ui.formatPost;
}

function aspectClass(format: SocialKitFormat) {
  return format === "post" ? "aspect-[4/5]" : "aspect-[9/16]";
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

function IconLock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path strokeLinecap="round" d="M8 11V8a4 4 0 118 0v3" />
    </svg>
  );
}

const secondaryActionClass = `inline-flex h-11 min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/75 px-3 text-sm font-semibold text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-white/18 hover:bg-zinc-900 active:bg-zinc-800/90 [-webkit-tap-highlight-color:transparent] ${focusRing}`;

function SocialKitAccessGate({
  accessCode,
  slug,
  onUnlock,
}: {
  accessCode: string;
  slug: string;
  onUnlock: () => void;
}) {
  const { ui } = useProfileLocale();
  const sk = ui.socialKit;
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const codeValue = digits.join("");

  const tryUnlock = useCallback(
    (value: string) => {
      if (value.length !== 4) return;
      if (isValidSocialKitCode(value, accessCode)) {
        unlockSocialKit(slug);
        setError(false);
        onUnlock();
        return;
      }
      setError(true);
      setDigits(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    },
    [accessCode, onUnlock, slug],
  );

  const updateDigit = (index: number, raw: string) => {
    const nextChar = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = nextChar;
    setDigits(next);
    setError(false);

    if (nextChar && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const joined = next.join("");
    if (joined.length === 4) {
      tryUnlock(joined);
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/50 px-6 py-10 text-center md:px-10 md:py-12">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
        <IconLock className="size-6" />
      </span>
      <p className="mt-5 text-lg font-semibold text-white">{sk.gateTitle}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">{sk.gateDescription}</p>

      <form
        className="mx-auto mt-8 max-w-xs"
        onSubmit={(event) => {
          event.preventDefault();
          tryUnlock(codeValue);
        }}
      >
        <div className="flex justify-center gap-2.5 sm:gap-3" role="group" aria-label={sk.gateTitle}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputRefs.current[index] = node;
              }}
              type="password"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              aria-invalid={error}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event.key)}
              className={`size-12 rounded-xl border bg-black/60 text-center text-lg font-bold tabular-nums text-white sm:size-14 sm:text-xl ${
                error
                  ? "border-red-500/50 shadow-[0_0_0_1px_rgba(239,68,68,0.35)]"
                  : "border-white/12 focus:border-accent/45"
              } ${focusRing}`}
            />
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm font-medium text-red-300" role="alert">
            {sk.gateError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={codeValue.length !== 4}
          className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-black transition hover:bg-[#e8ff6a] disabled:cursor-not-allowed disabled:opacity-45 ${focusRing}`}
        >
          {sk.gateSubmit}
        </button>
      </form>

      <p className="mx-auto mt-5 max-w-sm text-xs leading-relaxed text-zinc-600">{sk.gateHint}</p>
    </div>
  );
}

function KitCard({
  item,
  ui,
}: {
  item: SocialKitAsset;
  ui: ReturnType<typeof useProfileLocale>["ui"]["socialKit"];
}) {
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
  const shareLabel =
    item.format === "story" ? ui.shareStory : item.format === "reel" ? ui.shareReel : ui.sharePost;

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
          {formatLabel(item.format, ui)}
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

          <div className={item.caption ? "grid grid-cols-2 gap-2" : "grid grid-cols-1"}>
            <a href={item.src} download={item.downloadName ?? true} className={secondaryActionClass}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/6 text-zinc-200 ring-1 ring-white/10">
                <IconDownload className="size-4" />
              </span>
              <span className="min-w-0 truncate">{ui.download}</span>
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
                  {copyState === "ok" ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                </span>
                <span className="min-w-0 truncate">
                  {copyState === "ok" ? ui.copied : copyState === "err" ? ui.copyError : ui.copyCaption}
                </span>
              </button>
            ) : null}
          </div>

          {isMobileDevice() ? <p className="text-xs leading-relaxed text-zinc-600">{ui.mobileHint}</p> : null}
        </div>
      </div>
    </article>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SocialKitRequestForm({
  athlete,
  whatsappTarget,
  activeMonthLabel,
}: {
  athlete: AthleteProfile;
  whatsappTarget: string | null;
  activeMonthLabel?: string;
}) {
  const { ui } = useProfileLocale();
  const sk = ui.socialKit;
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<SocialKitFormat>("post");
  const [eventDate, setEventDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [notes, setNotes] = useState("");

  const formatOptions: SocialKitFormat[] = ["post", "story", "reel"];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!whatsappTarget) return;

    const profileUrl = athlete.seo.publicSiteUrl
      ? `${athlete.seo.publicSiteUrl.replace(/\/$/, "")}/#social-kit`
      : typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#social-kit`
        : "";

    const lines = [
      sk.requestMessageIntro,
      "",
      `${sk.requestMessagePlayer}: ${athlete.header.name}`,
      `${sk.requestMessageFormat}: ${formatLabel(format, sk)}`,
    ];

    if (activeMonthLabel) {
      lines.push(`Mese: ${activeMonthLabel}`);
    }
    if (eventDate.trim()) {
      lines.push(`${sk.requestMessageDate}: ${eventDate.trim()}`);
    }
    if (eventTitle.trim()) {
      lines.push(`${sk.requestMessageEvent}: ${eventTitle.trim()}`);
    }
    if (notes.trim()) {
      lines.push(`${sk.requestMessageNotes}: ${notes.trim()}`);
    }
    if (profileUrl) {
      lines.push(`${sk.requestMessageLink}: ${profileUrl}`);
    }

    const url = buildWhatsAppRequestUrl(whatsappTarget, lines.join("\n"));
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldClass = `w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 ${focusRing}`;

  return (
    <div className="mb-8 rounded-2xl border border-emerald-400/20 bg-linear-to-br from-emerald-400/8 via-zinc-950/80 to-black/80 p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-base font-semibold text-white">{sk.requestTitle}</p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-400">{sk.requestDescription}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-5 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/50 hover:bg-emerald-400/15 ${focusRing}`}
        >
          <IconWhatsApp className="size-4" />
          {open ? sk.requestClose : sk.requestOpen}
        </button>
      </div>

      {open ? (
        <form className="mt-5 space-y-4 border-t border-white/8 pt-5" onSubmit={handleSubmit}>
          {!whatsappTarget ? (
            <p className="text-sm text-amber-300/90">{sk.requestMissingWhatsApp}</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {sk.requestFormat}
              </span>
              <select
                value={format}
                onChange={(event) => setFormat(event.target.value as SocialKitFormat)}
                className={fieldClass}
              >
                {formatOptions.map((option) => (
                  <option key={option} value={option} className="bg-zinc-950">
                    {formatLabel(option, sk)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {sk.requestEventDate}
              </span>
              <input
                type="date"
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              {sk.requestEventTitle}
            </span>
            <input
              type="text"
              value={eventTitle}
              onChange={(event) => setEventTitle(event.target.value)}
              placeholder="Es. Ristopro Fabriano · Player card post-gara"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              {sk.requestNotes}
            </span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder={sk.requestNotesPlaceholder}
              className={`${fieldClass} resize-y min-h-24`}
            />
          </label>

          <button
            type="submit"
            disabled={!whatsappTarget}
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-black transition hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto ${focusRing}`}
          >
            <IconWhatsApp className="size-4" />
            {sk.requestSubmit}
          </button>
        </form>
      ) : null}
    </div>
  );
}

function SocialKitMonthPicker({
  months,
  activeKey,
  onSelect,
}: {
  months: ResolvedSocialKitMonth[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const { ui } = useProfileLocale();
  const sk = ui.socialKit;

  if (months.length <= 1) return null;

  return (
    <div className="mb-6">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">{sk.monthPickerLabel}</p>
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
        role="tablist"
        aria-label={sk.monthPickerLabel}
      >
        {months.map((month) => {
          const selected = month.key === activeKey;
          return (
            <button
              key={month.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onSelect(month.key)}
              className={`shrink-0 rounded-full border px-4 py-2 text-left transition ${focusRing} ${
                selected
                  ? "border-accent/45 bg-accent/12 text-white shadow-[0_0_24px_-8px_var(--accent-glow)]"
                  : "border-white/10 bg-black/35 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              <span className="block text-sm font-semibold capitalize">{month.label}</span>
              <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                {month.items.length} {sk.monthContents}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SocialKitMonthSection({
  month,
  ui,
}: {
  month: ResolvedSocialKitMonth;
  ui: ReturnType<typeof useProfileLocale>["ui"]["socialKit"];
}) {
  return (
    <section aria-labelledby={`social-kit-month-${month.key}`}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-white/8 pb-4">
        <div>
          <h3
            id={`social-kit-month-${month.key}`}
            className="text-2xl font-semibold capitalize tracking-tight text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {month.label}
          </h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {month.items.length} {ui.monthContents}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {month.items.map((item) => (
          <KitCard key={item.id} item={item} ui={ui} />
        ))}
      </div>
    </section>
  );
}

export function SocialMediaKitPanel({ athlete }: Props) {
  const { ui, locale } = useProfileLocale();
  const sk = ui.socialKit;
  const kit = athlete.socialMediaKit;
  const accessCode = kit?.accessCode?.trim();
  const [unlocked, setUnlocked] = useState(!accessCode);
  const monthGroups = useMemo(
    () => (kit ? resolveSocialKitMonths(kit, locale) : []),
    [kit, locale],
  );
  const [activeMonthKey, setActiveMonthKey] = useState(monthGroups[0]?.key ?? "");

  useEffect(() => {
    if (!accessCode) {
      setUnlocked(true);
      return;
    }
    if (isSocialKitUnlocked(athlete.slug)) {
      setUnlocked(true);
    }
  }, [accessCode, athlete.slug]);

  useEffect(() => {
    if (!monthGroups.length) {
      setActiveMonthKey("");
      return;
    }
    if (!monthGroups.some((month) => month.key === activeMonthKey)) {
      setActiveMonthKey(monthGroups[0].key);
    }
  }, [activeMonthKey, monthGroups]);

  if (!kit) return null;

  const assetCount = totalSocialKitAssets(monthGroups);
  const activeMonth = monthGroups.find((month) => month.key === activeMonthKey) ?? monthGroups[0];
  const title = kit?.title?.trim() || "Contenuti pronti per i social";
  const description =
    kit?.description?.trim() ||
    "Post e storie aggiornati dopo le partite: condividi su Instagram dal telefono, oppure scarica la grafica.";
  const statusLabel = kit?.statusLabel?.trim();
  const instagram = athlete.contacts.social.find((s) => s.platform.toLowerCase() === "instagram");
  const isLocked = Boolean(accessCode) && !unlocked;
  const whatsappTarget = resolveSocialKitWhatsApp(kit.requestWhatsApp, athlete.contacts.whatsapp);

  const unlockedContent = (
    <>
      <SocialKitRequestForm
        athlete={athlete}
        whatsappTarget={whatsappTarget}
        activeMonthLabel={activeMonth?.label}
      />

      {assetCount === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-zinc-950/40 px-6 py-12 text-center md:px-10 md:py-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">{sk.comingSoonEyebrow}</p>
          <p className="mx-auto mt-4 max-w-md text-lg font-semibold text-white">{sk.comingSoonTitle}</p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">{sk.comingSoonBody}</p>
          {instagram ? (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex h-11 items-center justify-center rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 px-6 text-sm font-semibold text-[#ffb3d0] transition hover:bg-[#E1306C]/20 ${focusRing}`}
            >
              {sk.goToInstagram} {instagram.handle}
            </a>
          ) : null}
        </div>
      ) : activeMonth ? (
        <>
          <SocialKitMonthPicker
            months={monthGroups}
            activeKey={activeMonth.key}
            onSelect={setActiveMonthKey}
          />
          <SocialKitMonthSection month={activeMonth} ui={sk} />
        </>
      ) : null}
    </>
  );

  return (
    <SectionShell
      id="social-kit"
      eyebrow="Social media kit"
      title={title}
      description={description}
      headerActions={
        <>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E1306C]/35 bg-[#E1306C]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ff9ec8]">
            {sk.instagramReady}
          </span>
          {statusLabel ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              {statusLabel}
            </span>
          ) : null}
          {!isLocked && assetCount > 0 ? (
            <span className="inline-flex rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              {assetCount} {sk.assetsLabel}
            </span>
          ) : null}
        </>
      }
    >
      {isLocked ? (
        <SocialKitAccessGate accessCode={accessCode!} slug={athlete.slug} onUnlock={() => setUnlocked(true)} />
      ) : (
        unlockedContent
      )}
    </SectionShell>
  );
}
