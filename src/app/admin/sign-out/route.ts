import { NextResponse, type NextRequest } from "next/server";
import { SESSION_CONFIG } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin-login";
  url.search = "";
  const res = NextResponse.redirect(url);
  const host = req.headers.get("host") || "";
  const cookieDomain = host.endsWith("weightlossrankings.org")
    ? ".weightlossrankings.org"
    : undefined;
  // Clear the cookie on both the explicit host and the shared parent domain
  // so we cover users created before/after the domain fix.
  res.cookies.set({
    name: SESSION_CONFIG.cookieName,
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });
  res.cookies.set({
    name: SESSION_CONFIG.cookieName,
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
