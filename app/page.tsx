import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveAthleteSlugForHost } from "@/data/athletes";

export default async function Home() {
  const host = (await headers()).get("host");
  redirect(`/${resolveAthleteSlugForHost(host)}`);
}
