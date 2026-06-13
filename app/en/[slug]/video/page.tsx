import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athleteSlugs, athleteSupportsLocale } from "@/data/athletes";
import { AthleteVideoPage, buildAthleteVideoMetadata } from "@/lib/athlete-profile-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athleteSlugs.filter((slug) => athleteSupportsLocale(slug, "en")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAthleteVideoMetadata(slug, "en");
}

export default async function EnglishAthleteVideoRoomPage({ params }: Props) {
  const { slug } = await params;
  if (!athleteSupportsLocale(slug, "en")) notFound();
  return <AthleteVideoPage slug={slug} locale="en" />;
}
