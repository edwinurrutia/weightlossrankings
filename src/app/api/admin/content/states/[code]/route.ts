// GET / PUT /api/admin/content/states/[code]

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { logAuditEvent } from "@/lib/audit-log";
import type { StateContent } from "@/lib/states-content";

export const dynamic = "force-dynamic";

const STATES_PATH = "src/data/states-content.json";

interface RouteContext {
  params: { code: string };
}

function requireAuth(): string | null {
  return headers().get("x-admin-user");
}

function normalize(input: Record<string, unknown>, existing: StateContent): StateContent {
  return {
    name: existing.name,
    slug: existing.slug,
    telehealth_legal: Boolean(input.telehealth_legal),
    medicaid_glp1_coverage: String(input.medicaid_glp1_coverage ?? "").trim(),
    average_compounded_price_monthly: Number(
      input.average_compounded_price_monthly ?? 0
    ),
    top_cities: Array.isArray(input.top_cities)
      ? (input.top_cities as unknown[]).map(String).filter((s) => s.length > 0)
      : [],
    obesity_rate: Number(input.obesity_rate ?? 0),
    obesity_rank: Number(input.obesity_rank ?? 0),
    regulatory_notes: String(input.regulatory_notes ?? ""),
    key_facts: Array.isArray(input.key_facts)
      ? (input.key_facts as unknown[]).map(String).filter((s) => s.length > 0)
      : [],
  };
}

function diffState(before: StateContent, after: StateContent): string[] {
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
  const code = params.code.toUpperCase();
  try {
    const { data } = await readJsonFile<Record<string, StateContent>>(STATES_PATH);
    const state = data[code];
    if (!state) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, state });
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
  const code = params.code.toUpperCase();

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const { data: existing, sha } = await readJsonFile<Record<string, StateContent>>(
      STATES_PATH
    );
    const before = existing[code];
    if (!before) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = normalize(body, before);
    const next: Record<string, StateContent> = { ...existing, [code]: updated };

    await writeJsonFile({
      path: STATES_PATH,
      data: next,
      sha,
      message: `chore(admin): update state content ${code} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    const changed = diffState(before, updated);
    await logAuditEvent({
      user: username,
      action: "update",
      resource_type: "state_content",
      resource_id: code,
      summary:
        changed.length === 0
          ? `Re-saved state ${before.name} (no field changes)`
          : `Updated state ${before.name}: ${changed.join(", ")}`,
      diff: { before, after: updated },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
