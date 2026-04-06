import { NextResponse, type NextRequest } from "next/server";
import { SESSION_CONFIG } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin-login";
  url.search = "";
  const res = NextResponse.redirect(url);
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
