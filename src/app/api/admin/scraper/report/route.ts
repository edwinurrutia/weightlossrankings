// GET /api/admin/scraper/report — returns the latest scraper report JSON.
//
// Used by the admin scraper page to refresh data without a full page reload.

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { readLatestScraperReport } from "@/lib/scraper-report";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = headers().get("x-admin-user");
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const latest = readLatestScraperReport();
  if (!latest) {
    return NextResponse.json(
      {
        ok: false,
        error: "No scraper reports found in /docs",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    filename: latest.filename,
    date: latest.date,
    report: latest.report,
  });
}
