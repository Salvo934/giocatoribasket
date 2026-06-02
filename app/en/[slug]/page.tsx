import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athleteSlugs, athleteSupportsLocale } from "@/data/athletes";
import { AthleteProfilePage, buildAthleteMetadata } from "@/lib/athlete-profile-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athleteSlugs.filter((slug) => athleteSupportsLocale(slug, "en")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAthleteMetadata(slug, "en");
}

export default async function EnglishAthletePage({ params }: Props) {
  const { slug } = await params;
  if (!athleteSupportsLocale(slug, "en")) notFound();
  return <AthleteProfilePage slug={slug} locale="en" />;
}
