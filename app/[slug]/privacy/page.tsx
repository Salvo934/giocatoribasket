import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { athleteSlugs, getAthlete } from "@/data/athletes";
import { LegalDocumentShell, PrivacyPolicyContent } from "@/components/legal/LegalDocuments";
import { resolveLegalContext } from "@/lib/legal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athleteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const athlete = getAthlete(slug);
  if (!athlete) return { title: "Privacy" };
  return {
    title: `Privacy · ${athlete.header.name}`,
    description: `Informativa privacy del sito Player Card di ${athlete.header.name}.`,
    robots: { index: true, follow: true },
  };
}

export default async function AthletePrivacyPage({ params }: Props) {
  const { slug } = await params;
  const athlete = getAthlete(slug);
  if (!athlete) notFound();

  const legal = resolveLegalContext(athlete);
  if (legal.usesExternalPrivacy && legal.externalPrivacyUrl) {
    redirect(legal.externalPrivacyUrl);
  }

  return (
    <LegalDocumentShell legal={legal} title="Informativa privacy">
      <PrivacyPolicyContent legal={legal} />
    </LegalDocumentShell>
  );
}
