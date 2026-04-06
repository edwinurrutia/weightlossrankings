// POST /api/admin/scraper/approve — resolve a scraper review item.
//
// Body: {
//   provider_slug: string,
//   action: "approve_price" | "mark_verified" | "ignore",
//   scraped_value?: number,   // required for approve_price
//   drug?: string             // optional drug hint (semaglutide / tirzepatide / brand)
// }
//
// Logic:
//   - approve_price  → update the lowest matching pricing entry to scraped_value
//   - mark_verified  → bump verification.last_verified to today, confidence = high
//   - ignore         → no provider change, audit log only
//
// Writes go through the GitHub-as-backend helpers; providers.json is never
// touched on disk.

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { logAuditEvent } from "@/lib/audit-log";
import type { Provider, Pricing } from "@/lib/types";

export const dynamic = "force-dynamic";

const PROVIDERS_PATH = "src/data/providers.json";

type Action = "approve_price" | "mark_verified" | "ignore";

interface RequestBody {
  provider_slug: string;
  action: Action;
  scraped_value?: number;
  drug?: string;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function pickPricingIndex(
  pricing: Pricing[],
  drug: string | undefined
): number {
  if (pricing.length === 0) return -1;
  const wantsBrand = drug === "brand";
  const candidates = pricing
    .map((p, i) => ({ p, i }))
    .filter(({ p }) =>
      wantsBrand ? p.form === "brand" : p.form === "compounded"
    );
  const pool = candidates.length > 0 ? candidates : pricing.map((p, i) => ({ p, i }));
  pool.sort((a, b) => a.p.monthly_cost - b.p.monthly_cost);
  return pool[0].i;
}

export async function POST(request: NextRequest) {
  const username = headers().get("x-admin-user");
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCmsConfigured()) {
    return NextResponse.json(
      { error: "GitHub CMS is not configured." },
      { status: 503 }
    );
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.provider_slug || !body.action) {
    return NextResponse.json(
      { error: "provider_slug and action are required" },
      { status: 400 }
    );
  }

  if (body.action === "approve_price" && typeof body.scraped_value !== "number") {
    return NextResponse.json(
      { error: "scraped_value is required for approve_price" },
      { status: 400 }
    );
  }

  // Ignore: audit only, no GitHub write.
  if (body.action === "ignore") {
    await logAuditEvent({
      user: username,
      action: "reject",
      resource_type: "scraper_run",
      resource_id: body.provider_slug,
      summary: `Ignored scraper mismatch for ${body.provider_slug}`,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const { data: providers, sha } = await readJsonFile<Provider[]>(
      PROVIDERS_PATH
    );

    const idx = providers.findIndex((p) => p.slug === body.provider_slug);
    if (idx === -1) {
      return NextResponse.json(
        { error: `Provider not found: ${body.provider_slug}` },
        { status: 404 }
      );
    }

    const original = providers[idx];
    const updated: Provider = JSON.parse(JSON.stringify(original)) as Provider;

    let summary = "";
    let beforeSnapshot: unknown;
    let afterSnapshot: unknown;

    if (body.action === "approve_price") {
      const targetIdx = pickPricingIndex(updated.pricing, body.drug);
      if (targetIdx === -1) {
        return NextResponse.json(
          { error: "Provider has no pricing entries to update" },
          { status: 400 }
        );
      }
      beforeSnapshot = { pricing: original.pricing[targetIdx] };
      updated.pricing[targetIdx] = {
        ...updated.pricing[targetIdx],
        monthly_cost: body.scraped_value!,
      };
      afterSnapshot = { pricing: updated.pricing[targetIdx] };
      summary = `Approved scraped price $${body.scraped_value} for ${updated.name} (${updated.pricing[targetIdx].dose} ${updated.pricing[targetIdx].form})`;
    } else if (body.action === "mark_verified") {
      const today = todayISO();
      const previousVerification = original.verification;
      beforeSnapshot = { verification: previousVerification };
      updated.verification = {
        last_verified: today,
        verified_by: "scraper",
        source_urls: previousVerification?.source_urls ?? [],
        confidence: "high",
        notes: `${
          previousVerification?.notes ? previousVerification.notes + " · " : ""
        }Verified via scraper review by ${username} on ${today}`,
      };
      afterSnapshot = { verification: updated.verification };
      summary = `Marked ${updated.name} as verified at current price`;
    }

    const nextProviders = [...providers];
    nextProviders[idx] = updated;

    const { commit_sha } = await writeJsonFile({
      path: PROVIDERS_PATH,
      data: nextProviders,
      sha,
      message: `chore(admin): scraper review ${body.action} for ${updated.slug}`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    await logAuditEvent({
      user: username,
      action: body.action === "approve_price" ? "approve" : "verify",
      resource_type: "provider",
      resource_id: updated.slug,
      summary,
      diff: { before: beforeSnapshot, after: afterSnapshot },
    });

    return NextResponse.json({ ok: true, commit_sha });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
