import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { athleteSlugs, athleteSupportsLocale, getAthleteSlugByHost } from "@/data/athletes";

/** Su dominio dedicato: / → profilo atleta, slug sbagliato → correzione. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const dedicatedSlug = host ? getAthleteSlugByHost(host) : undefined;
  if (!dedicatedSlug) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === "/privacy") {
    return NextResponse.rewrite(new URL(`/${dedicatedSlug}/privacy`, request.url));
  }
  if (pathname === "/cookie-policy") {
    return NextResponse.rewrite(new URL(`/${dedicatedSlug}/cookie-policy`, request.url));
  }

  if (pathname === "/video" || pathname === "/video/") {
    return NextResponse.rewrite(new URL(`/${dedicatedSlug}/video`, request.url));
  }

  if (pathname === "/en/video" || pathname === "/en/video/") {
    if (athleteSupportsLocale(dedicatedSlug, "en")) {
      return NextResponse.rewrite(new URL(`/en/${dedicatedSlug}/video`, request.url));
    }
    return NextResponse.redirect(new URL("/video", request.url), 308);
  }

  if (pathname === "/en" || pathname === "/en/") {
    if (athleteSupportsLocale(dedicatedSlug, "en")) {
      return NextResponse.rewrite(new URL(`/en/${dedicatedSlug}`, request.url));
    }
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (pathname === "/" || pathname === "") {
    return NextResponse.rewrite(new URL(`/${dedicatedSlug}`, request.url));
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first === "en" && segments[1] === dedicatedSlug && segments.length === 2) {
    return NextResponse.redirect(new URL("/en", request.url), 308);
  }

  if (first && athleteSlugs.includes(first) && first !== dedicatedSlug) {
    const rest = segments.slice(1).join("/");
    const target = rest ? `/${rest}` : "/";
    return NextResponse.redirect(new URL(target, request.url), 308);
  }

  if (first === dedicatedSlug && segments.length === 1) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (first === dedicatedSlug && segments[1] === "video" && segments.length === 2) {
    return NextResponse.redirect(new URL("/video", request.url), 308);
  }

  if (first === "en" && segments[1] === dedicatedSlug && segments[2] === "video" && segments.length === 3) {
    return NextResponse.redirect(new URL("/en/video", request.url), 308);
  }

  if (first === dedicatedSlug && segments.length > 1) {
    const rest = segments.slice(1).join("/");
    if (rest === "privacy" || rest === "cookie-policy") {
      return NextResponse.redirect(new URL(`/${rest}`, request.url), 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|athletes/|.*\\..*).*)"],
};
