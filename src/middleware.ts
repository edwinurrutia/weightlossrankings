import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_CONFIG } from "@/lib/admin-session";

// Paths under /admin or /api/admin that should be accessible without a
// valid session cookie. Note: login lives at /admin-login (top-level,
// outside the admin matcher) and /api/admin-login — those are not matched
// here at all. This list exists for any future public admin endpoints.
const PUBLIC_ADMIN_PATHS: string[] = [];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward the request pathname to server components via a header so the
  // root layout can read it via `next/headers` and set `<html lang>`
  // correctly for /es/* routes (and any other locale-aware concerns).
  // This runs on every matched request, including non-admin routes.
  const baseRequestHeaders = new Headers(request.headers);
  baseRequestHeaders.set("x-pathname", pathname);

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next({
      request: { headers: baseRequestHeaders },
    });
  }

  if (
    PUBLIC_ADMIN_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_CONFIG.cookieName);

  let session: Awaited<ReturnType<typeof verifySession>> = null;
  try {
    session = await verifySession(cookie?.value);
  } catch {
    // Missing ADMIN_SESSION_SECRET or other verification error — treat as
    // unauthenticated rather than 500-ing the entire admin surface.
    session = null;
  }

  if (!session) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin-login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Forward the username downstream so server components and route handlers
  // can know who is logged in via `getCurrentAdminUser()`. Also keep the
  // x-pathname header set above so the root layout still gets locale info
  // even on admin routes.
  baseRequestHeaders.set("x-admin-user", session.username);
  return NextResponse.next({
    request: { headers: baseRequestHeaders },
  });
}

// Match all routes EXCEPT static assets and Next.js internals so the
// x-pathname header is forwarded to every server-rendered page. The
// admin auth checks inside the middleware function still only fire for
// /admin/* and /api/admin/*.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp|.*\\.ico).*)",
  ],
};
