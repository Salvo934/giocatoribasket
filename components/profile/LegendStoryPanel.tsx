"use client";

import Image from "next/image";
import type { AthleteProfile, AthleteStoryChapter } from "@/lib/types/athlete";
import { YouTubeConsentGate } from "@/components/legal/YouTubeConsentGate";
import { youtubeEmbedUrl, youtubeIsShort } from "@/lib/youtube";
import { useProfileLocale } from "./ProfileLocaleContext";
import "./legend-story.css";

type Props = { athlete: AthleteProfile };

function ChapterFrame({
  chapter,
  index,
  compact = false,
}: {
  chapter: AthleteStoryChapter;
  index: number;
  compact?: boolean;
}) {
  const embedSrc = chapter.video ? youtubeEmbedUrl(chapter.video) : "";
  const isShort = chapter.video ? youtubeIsShort(chapter.video) : false;
  const shellClass = [
    "legend-story-chapter-frame__shell",
    compact ? "min-h-72" : "",
    embedSrc ? (isShort ? "legend-story-chapter-frame__shell--short" : "legend-story-chapter-frame__shell--video") : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="legend-story-chapter-frame">
      <div className={shellClass}>
        {embedSrc ? (
          <div className="legend-story-chapter-frame__media legend-story-chapter-frame__media--video">
            <YouTubeConsentGate
              title="Video YouTube"
              description="Per riprodurre clip e highlights incorporati serve il consenso ai contenuti esterni (Google/YouTube)."
            >
              <iframe
                key={chapter.video}
                title={chapter.title}
                src={`${embedSrc}?rel=0`}
                className="legend-story-chapter-frame__iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </YouTubeConsentGate>
          </div>
        ) : chapter.image ? (
          <div className="legend-story-chapter-frame__media" aria-hidden>
            <Image
              src={chapter.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 84vw, 520px"
              className="object-cover"
              style={{ objectPosition: "center 24%" }}
            />
            <div className="legend-story-chapter-frame__veil" />
          </div>
        ) : (
          <div
            aria-hidden
            className="legend-story-chapter-frame__media bg-[radial-gradient(ellipse_at_50%_120%,rgba(206,17,65,0.35),rgba(3,3,5,0.95)_68%)]"
          />
        )}

        <div className="legend-story-chapter-frame__hud" aria-hidden>
          <span className="legend-story-chapter-frame__index">{String(index + 1).padStart(2, "0")}</span>
          <span className="legend-story-chapter-frame__era">{chapter.era}</span>
        </div>

        <div className="legend-story-chapter-frame__corners" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function ChapterContent({ chapter }: { chapter: AthleteStoryChapter }) {
  return (
    <div className="legend-story-chapter-row__content-panel">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent">{chapter.era}</p>
      <h3
        className="mt-2 text-[clamp(1.55rem,4vw,2rem)] leading-[0.95] tracking-tight text-white"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        {chapter.title}
      </h3>
      <p className="legend-story-chapter-row__body mt-3 max-w-xl text-sm leading-relaxed text-zinc-300/95">
        {chapter.body}
      </p>
      {chapter.quote ? (
        <p className="legend-story-chapter-row__quote text-sm italic leading-relaxed text-zinc-400">
          {chapter.quote}
        </p>
      ) : null}
      {chapter.stat ? (
        <div className="legend-story-chapter-row__stat">
          <span className="text-[1.65rem] leading-none text-white" style={{ fontFamily: "var(--font-bebas)" }}>
            {chapter.stat.value}
          </span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            {chapter.stat.label}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function StoryChapterRow({
  chapter,
  index,
}: {
  chapter: AthleteStoryChapter;
  index: number;
}) {
  const isRight = index % 2 === 1;

  return (
    <article
      className={`legend-story-chapter-row ${isRight ? "is-right" : "is-left"}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="legend-story-chapter-row__node lg:col-start-2 lg:row-start-1" aria-hidden>
        <span className="legend-story-chapter-row__node-ring" />
        <span className="legend-story-chapter-row__node-core" />
      </div>

      <div
        className={`legend-story-chapter-row__media-col lg:row-start-1 ${isRight ? "lg:col-start-3" : "lg:col-start-1"}`}
      >
        <ChapterFrame chapter={chapter} index={index} />
      </div>

      <div
        className={`legend-story-chapter-row__content-col mt-4 lg:row-start-1 lg:mt-0 ${isRight ? "lg:col-start-1" : "lg:col-start-3"}`}
      >
        <ChapterContent chapter={chapter} />
      </div>
    </article>
  );
}

export function LegendStoryPanel({ athlete }: Props) {
  const { ui } = useProfileLocale();
  const story = athlete.story;
  if (!story?.chapters?.length) return null;

  const legend = story.theme === "legend";
  const eyebrow = story.eyebrow?.trim() || ui.story.eyebrow;
  const title = story.title?.trim() || ui.story.title;
  const lead = story.lead?.trim() || ui.story.lead;
  const chapterCount = String(story.chapters.length).padStart(2, "0");

  return (
    <section
      id="storia"
      aria-labelledby="storia-heading"
      className={`legend-story scroll-mt-14 border-b border-white/6 ${legend ? "legend-story--legend" : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(206,17,65,0.16),transparent_58%),radial-gradient(ellipse_65%_45%_at_100%_100%,rgba(223,255,74,0.06),transparent_55%)]"
      />
      <div className="legend-story__grain" aria-hidden />
      {legend ? <div className="legend-story__floor" aria-hidden /> : null}

      {legend ? (
        <>
          <span className="legend-story__watermark" aria-hidden>
            23
          </span>
          {athlete.header.currentClubLogo ? (
            <div className="legend-story__club-logo" aria-hidden>
              <Image
                src={athlete.header.currentClubLogo}
                alt=""
                width={239}
                height={241}
                className="h-auto w-full"
              />
            </div>
          ) : null}
          <div className="legend-story__beam" aria-hidden />
        </>
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="legend-story-hud mb-8 max-w-xl">
          <div className="legend-story-hud__left">
            <span className="legend-story-hud__rec" aria-hidden />
            <span className="legend-story-hud__tag legend-story-hud__tag--accent">{eyebrow}</span>
            <span className="legend-story-hud__tag">{ui.story.documentaryLabel}</span>
          </div>
          <span className="legend-story-hud__meta">{chapterCount} {ui.story.chaptersLabel}</span>
        </div>

        <div className="legend-story-intro mb-12 md:mb-16">
          <div className="legend-story-intro__title-block pl-4 sm:pl-5">
            {!legend ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
            ) : null}
            <h2
              id="storia-heading"
              className={`${legend ? "" : "mt-2 "}text-[clamp(2.75rem,9vw,5rem)] leading-[0.88] tracking-tight text-white`}
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">{lead}</p>
          </div>

          {story.pullQuote ? (
            <figure className="legend-story-quote">
              <div className="legend-story-quote__inner">
                <div className="legend-story-quote__bar legend-story-quote__bar--top" aria-hidden />
                <div className="legend-story-quote__bar legend-story-quote__bar--bottom" aria-hidden />
                <span className="legend-story-quote__mark" aria-hidden>
                  “
                </span>
                <blockquote className="relative z-10 text-base leading-relaxed text-white md:text-lg">
                  {story.pullQuote}
                </blockquote>
                {story.pullQuoteAttribution ? (
                  <figcaption className="relative z-10 mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                    <span className="h-px w-6 bg-[#ce1141]/60" aria-hidden />
                    {story.pullQuoteAttribution}
                  </figcaption>
                ) : null}
              </div>
            </figure>
          ) : null}
        </div>

        <div className="legend-story-mobile-rail lg:hidden">
          {story.chapters.map((chapter, index) => (
            <div key={`${chapter.era}-${chapter.title}-mobile`} className="legend-story-mobile-card shrink-0">
              <ChapterFrame chapter={chapter} index={index} compact />
              <div className="mt-1">
                <ChapterContent chapter={chapter} />
              </div>
            </div>
          ))}
        </div>

        <p className="legend-story-mobile-hint mt-4 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-600 lg:hidden">
          {ui.story.swipeHint}
        </p>

        <div className="legend-story-timeline hidden lg:block">
          <div className="legend-story-timeline__header">
            <span className="legend-story-timeline__label">{ui.story.chaptersLabel}</span>
            <span className="legend-story-timeline__count">{chapterCount}</span>
          </div>
          <div className="legend-story-timeline__spine" aria-hidden />
          {story.chapters.map((chapter, index) => (
            <StoryChapterRow key={`${chapter.era}-${chapter.title}`} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
