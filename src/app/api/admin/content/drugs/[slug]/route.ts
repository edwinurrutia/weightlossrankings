// GET / PUT /api/admin/content/drugs/[slug]

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { logAuditEvent } from "@/lib/audit-log";
import type { Drug } from "@/lib/types";

export const dynamic = "force-dynamic";

const DRUGS_PATH = "src/data/drugs.json";

interface RouteContext {
  params: { slug: string };
}

function requireAuth(): string | null {
  return headers().get("x-admin-user");
}

function normalize(input: Record<string, unknown>, slug: string): Drug {
  return {
    _id: typeof input._id === "string" && input._id ? input._id : slug,
    name: String(input.name ?? "").trim(),
    slug,
    generic_name: String(input.generic_name ?? "").trim(),
    brand_names: Array.isArray(input.brand_names)
      ? (input.brand_names as unknown[]).map(String).filter((s) => s.length > 0)
      : [],
    description: String(input.description ?? ""),
    how_it_works: String(input.how_it_works ?? ""),
    side_effects: String(input.side_effects ?? ""),
    fda_status: String(input.fda_status ?? ""),
    approval_date:
      typeof input.approval_date === "string" && input.approval_date
        ? input.approval_date
        : undefined,
    dosing_schedule: Array.isArray(input.dosing_schedule)
      ? (input.dosing_schedule as Record<string, unknown>[])
          .map((row) => ({
            week_range: String(row?.week_range ?? "").trim(),
            dose: String(row?.dose ?? "").trim(),
          }))
          .filter((row) => row.week_range || row.dose)
      : [],
    clinical_trial_summary:
      typeof input.clinical_trial_summary === "string" &&
      input.clinical_trial_summary
        ? input.clinical_trial_summary
        : undefined,
  };
}

function diffDrug(before: Drug, after: Drug): string[] {
  const changed: string[] = [];
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const k of keys) {
    const a = JSON.stringify((before as unknown as Record<string, unknown>)[k]);
    const b = JSON.stringify((after as unknown as Record<string, unknown>)[k]);
    if (a !== b) changed.push(k);
  }
  return changed;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const username = requireAuth();
  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "GitHub CMS is not configured." }, { status: 503 });
  }
  try {
    const { data } = await readJsonFile<Drug[]>(DRUGS_PATH);
    const drug = data.find((d) => d.slug === params.slug);
    if (!drug) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, drug });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const username = requireAuth();
  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "GitHub CMS is not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updated = normalize(body, params.slug);
  if (!updated.name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  try {
    const { data: existing, sha } = await readJsonFile<Drug[]>(DRUGS_PATH);
    const idx = existing.findIndex((d) => d.slug === params.slug);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const before = existing[idx];
    const next = [...existing];
    next[idx] = updated;

    await writeJsonFile({
      path: DRUGS_PATH,
      data: next,
      sha,
      message: `chore(admin): update drug ${updated.slug} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    const changed = diffDrug(before, updated);
    await logAuditEvent({
      user: username,
      action: "update",
      resource_type: "drug",
      resource_id: updated.slug,
      summary:
        changed.length === 0
          ? `Re-saved drug ${updated.name} (no field changes)`
          : `Updated drug ${updated.name}: ${changed.join(", ")}`,
      diff: { before, after: updated },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
