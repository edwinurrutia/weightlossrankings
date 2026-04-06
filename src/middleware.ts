import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_CONFIG } from "@/lib/admin-session";

// Paths under /admin or /api/admin that should be accessible without a
// valid session cookie. Note: login lives at /admin-login (top-level,
// outside the admin matcher) and /api/admin-login — those are not matched
// here at all. This list exists for any future public admin endpoints.
const PUBLIC_ADMIN_PATHS: string[] = [];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
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
  // can know who is logged in via `getCurrentAdminUser()`.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-user", session.username);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
