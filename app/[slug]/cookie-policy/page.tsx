import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { athleteSlugs, getAthlete } from "@/data/athletes";
import { CookiePolicyContent, LegalDocumentShell } from "@/components/legal/LegalDocuments";
import { resolveLegalContext } from "@/lib/legal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athleteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const athlete = getAthlete(slug);
  if (!athlete) return { title: "Cookie policy" };
  return {
    title: `Cookie policy · ${athlete.header.name}`,
    description: `Informativa cookie del sito Player Card di ${athlete.header.name}.`,
    robots: { index: true, follow: true },
  };
}

export default async function AthleteCookiePolicyPage({ params }: Props) {
  const { slug } = await params;
  const athlete = getAthlete(slug);
  if (!athlete) notFound();

  const legal = resolveLegalContext(athlete);
  if (legal.usesExternalCookiePolicy && legal.externalCookieUrl) {
    redirect(legal.externalCookieUrl);
  }

  return (
    <LegalDocumentShell legal={legal} title="Cookie policy">
      <CookiePolicyContent legal={legal} />
    </LegalDocumentShell>
  );
}
