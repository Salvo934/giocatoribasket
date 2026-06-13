import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athleteSlugs, getAthlete } from "@/data/athletes";
import { AthleteVideoPage, buildAthleteVideoMetadata } from "@/lib/athlete-profile-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athleteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAthleteVideoMetadata(slug, "it");
}

export default async function AthleteVideoRoomPage({ params }: Props) {
  const { slug } = await params;
  if (!getAthlete(slug, "it")) notFound();
  return <AthleteVideoPage slug={slug} locale="it" />;
}
