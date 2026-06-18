"use client";

import Image from "next/image";
import type { AthleteProfile, ShopProduct, ShopProductCategory } from "@/lib/types/athlete";
import { SectionShell } from "./SectionShell";
import { useProfileLocale } from "./ProfileLocaleContext";

type Props = { athlete: AthleteProfile };

const panelFrame =
  "rounded-[1.75rem] border border-white/10 bg-black/45 p-px shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]";

const panelInner = "rounded-[1.65rem] bg-zinc-950/55 px-5 py-7 md:px-8 md:py-9 backdrop-blur-sm";

function categoryAccent(category: ShopProductCategory) {
  switch (category) {
    case "shoes":
      return "border-[#ce1141]/45 bg-[#ce1141]/12 text-[#ff9a9a]";
    case "jersey":
      return "border-accent/45 bg-accent/10 text-accent";
    case "apparel":
      return "border-white/20 bg-white/6 text-zinc-200";
    case "accessory":
      return "border-sky-400/35 bg-sky-400/10 text-sky-200";
    default:
      return "border-white/15 bg-white/5 text-zinc-300";
  }
}

function ProductCard({
  product,
  categoryLabel,
  buyCta,
  externalHint,
}: {
  product: ShopProduct;
  categoryLabel: string;
  buyCta: string;
  externalHint: string;
}) {
  const linkLabel = `${product.title} — ${buyCta} (${externalHint})`;

  return (
    <li className="min-w-0">
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={linkLabel}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-zinc-950/95 via-black/85 to-zinc-950/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition hover:border-[#ce1141]/45 hover:shadow-[0_18px_50px_-24px_rgba(206,17,65,0.55)]"
      >
        <div className="relative aspect-4/5 overflow-hidden border-b border-white/6 bg-[#07070c]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_72%,rgba(206,17,65,0.16),transparent_58%),radial-gradient(ellipse_at_50%_18%,rgba(223,255,74,0.05),transparent_52%)]"
          />

          {product.image ? (
            <div className="absolute inset-3 sm:inset-4">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#ececee] ring-1 ring-white/10">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-contain p-2 transition duration-500 group-hover:scale-[1.04] sm:p-3"
                />
              </div>
            </div>
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(206,17,65,0.22),rgba(3,3,5,0.95)_68%)]"
            />
          )}

          <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm ${categoryAccent(product.category)}`}
            >
              {categoryLabel}
            </span>
            {product.badge ? (
              <span className="rounded-full border border-white/15 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                {product.badge}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="text-base font-bold leading-snug text-white md:text-lg">{product.title}</h3>
          {product.subtitle ? (
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{product.subtitle}</p>
          ) : null}
          <p
            aria-hidden
            className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#ff9a9a] transition group-hover:text-accent"
          >
            {buyCta}
            <span className="transition group-hover:translate-x-0.5">↗</span>
          </p>
        </div>
      </a>
    </li>
  );
}

export function ShopPanel({ athlete }: Props) {
  const { ui } = useProfileLocale();
  const shop = athlete.shop;
  if (!shop?.products?.length) return null;

  const description = shop.description?.trim() || ui.shop.description;
  const storeUrl = shop.storeUrl?.trim();
  const storeLabel = shop.storeLabel?.trim() || ui.shop.storeCta;

  return (
    <SectionShell
      id="shop"
      eyebrow={ui.shop.eyebrow}
      title={ui.shop.title}
      description={description}
      headerActions={
        storeUrl ? (
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${storeLabel} (${ui.shop.externalHint})`}
            className="inline-flex items-center gap-2 rounded-full border border-[#ce1141]/45 bg-[#ce1141]/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-accent/50 hover:bg-accent/15 hover:text-accent"
          >
            {storeLabel}
            <span aria-hidden>↗</span>
          </a>
        ) : null
      }
    >
      <div className={panelFrame}>
        <div className={panelInner}>
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
            {ui.shop.externalHint}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {shop.products.map((product) => (
              <ProductCard
                key={`${product.title}-${product.url}`}
                product={product}
                categoryLabel={ui.shop.categories[product.category]}
                buyCta={ui.shop.buyCta}
                externalHint={ui.shop.externalHint}
              />
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
