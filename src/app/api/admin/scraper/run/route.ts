// POST /api/admin/scraper/run — "run scraper" endpoint.
//
// On Vercel serverless we cannot reliably spawn the long-running scraper
// child process within a request lifetime. Instead we adopt the documented
// approach: return the latest report and instruct the user to run
// `npm run scrape:fast` locally + push the updated report file.
//
// Future enhancement: integrate with Vercel Cron, Inngest, or Trigger.dev to
// kick off remote scrapes from this endpoint and write the report directly
// to GitHub.

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { readLatestScraperReport } from "@/lib/scraper-report";

export const dynamic = "force-dynamic";

export async function POST() {
  const username = headers().get("x-admin-user");
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const latest = readLatestScraperReport();

  return NextResponse.json(
    {
      ok: true,
      message:
        "Run `npm run scrape:fast` locally then commit & push the updated report file. This endpoint returns the latest available report.",
      latest: latest
        ? {
            filename: latest.filename,
            date: latest.date,
            generated_at: latest.report.generated_at,
            summary: latest.report.summary,
          }
        : null,
    },
    { status: 202 }
  );
}
