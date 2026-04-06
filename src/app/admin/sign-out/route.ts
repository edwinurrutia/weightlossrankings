import { NextResponse } from "next/server";

// Browsers don't have a clean way to clear HTTP basic-auth credentials,
// but returning a 401 from a path inside the protected scope effectively
// invalidates the cached credentials in most browsers.
export function GET() {
  return new NextResponse(
    "<!doctype html><html><body style=\"font-family:system-ui;padding:2rem\">" +
      "<h1>Signed out</h1><p>You have been signed out of the admin CMS.</p>" +
      "<p><a href=\"/admin\">Sign in again</a></p></body></html>",
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="WeightLossRankings Admin (signed out)"',
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}
