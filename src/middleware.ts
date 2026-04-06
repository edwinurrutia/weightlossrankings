import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminCredentials } from "@/lib/admin-users";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/admin") && !path.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const auth = request.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const idx = decoded.indexOf(":");
        if (idx !== -1) {
          const username = decoded.slice(0, idx);
          const password = decoded.slice(idx + 1);
          if (verifyAdminCredentials(username, password)) {
            // Forward the username downstream so server components and
            // route handlers can know who is logged in.
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-admin-user", username);
            return NextResponse.next({
              request: { headers: requestHeaders },
            });
          }
        }
      } catch {
        // fall through to 401
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="WeightLossRankings Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
