import Image from "next/image";
import type { AthleteProfile } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";

type Props = { athlete: AthleteProfile };

export function GalleryPanel({ athlete }: Props) {
  const items = athlete.gallery?.items ?? [];
  if (items.length === 0) return null;

  const title = athlete.gallery?.title?.trim() || "Gallery";
  const description =
    athlete.gallery?.description?.trim() ||
    "Immagini da campo, allenamento e contesto club.";

  const gridClass =
    items.length === 1
      ? "mx-auto grid max-w-3xl gap-4 md:gap-5"
      : items.length === 2
        ? "grid gap-4 sm:grid-cols-2 md:gap-5"
        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5";

  return (
    <SectionShell
      id="gallery"
      eyebrow="Media"
      title={title}
      description={description}
      headerActions={
        <span className="inline-flex rounded-full border border-white/12 bg-white/4 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          {items.length} foto
        </span>
      }
    >
      <div className={`${gridClass}`}>
        {items.map((item, idx) => (
          <figure
            key={`${item.src}-${idx}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-accent/25 hover:bg-black/55"
          >
            <div
              className={`relative w-full overflow-hidden bg-zinc-950 ${
                items.length === 1 ? "aspect-4/3 md:aspect-16/10" : "aspect-4/3"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={
                  items.length === 1
                    ? "(max-width: 768px) 100vw, 42rem"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-80 md:opacity-100"
              />
            </div>
            {item.caption ? (
              <figcaption className="border-t border-white/8 px-4 py-3 text-xs leading-relaxed text-zinc-400 md:px-5 md:text-sm">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
