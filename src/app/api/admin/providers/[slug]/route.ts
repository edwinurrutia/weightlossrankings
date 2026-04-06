// /api/admin/providers/[slug] — GET / PUT / DELETE a single provider.
//
// All operations go through the GitHub CMS helpers — providers.json is
// never written directly from a route handler.

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { ProviderSchema } from "@/lib/schema";
import { logAuditEvent } from "@/lib/audit-log";
import type { Provider } from "@/lib/types";

export const dynamic = "force-dynamic";

const PROVIDERS_PATH = "src/data/providers.json";

interface RouteContext {
  params: { slug: string };
}

function requireAuth(): string | null {
  return headers().get("x-admin-user");
}

function diffProvider(before: Provider, after: Provider): Record<string, { before: unknown; after: unknown }> {
  const diff: Record<string, { before: unknown; after: unknown }> = {};
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]) as Set<keyof Provider>;
  for (const key of keys) {
    const a = JSON.stringify(before[key]);
    const b = JSON.stringify(after[key]);
    if (a !== b) {
      diff[key as string] = { before: before[key], after: after[key] };
    }
  }
  return diff;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const username = requireAuth();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCmsConfigured()) {
    return NextResponse.json(
      { error: "GitHub CMS is not configured." },
      { status: 503 }
    );
  }
  try {
    const { data } = await readJsonFile<Provider[]>(PROVIDERS_PATH);
    const provider = data.find((p) => p.slug === params.slug);
    if (!provider) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, provider });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const username = requireAuth();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCmsConfigured()) {
    return NextResponse.json(
      { error: "GitHub CMS is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ProviderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const updated = parsed.data as Provider;

  if (updated.slug !== params.slug) {
    return NextResponse.json(
      { error: "Slug in body does not match URL slug." },
      { status: 400 }
    );
  }

  try {
    const { data: existing, sha } = await readJsonFile<Provider[]>(PROVIDERS_PATH);
    const idx = existing.findIndex((p) => p.slug === params.slug);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const before = existing[idx];
    const next = [...existing];
    next[idx] = updated;

    await writeJsonFile({
      path: PROVIDERS_PATH,
      data: next,
      sha,
      message: `chore(admin): update provider ${updated.name} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    const diff = diffProvider(before, updated);
    const changedKeys = Object.keys(diff);
    await logAuditEvent({
      user: username,
      action: "update",
      resource_type: "provider",
      resource_id: updated.slug,
      summary:
        changedKeys.length === 0
          ? `Re-saved provider ${updated.name} (no field changes)`
          : `Updated provider ${updated.name}: ${changedKeys.join(", ")}`,
      diff: { before, after: updated },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const username = requireAuth();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCmsConfigured()) {
    return NextResponse.json(
      { error: "GitHub CMS is not configured." },
      { status: 503 }
    );
  }

  try {
    const { data: existing, sha } = await readJsonFile<Provider[]>(PROVIDERS_PATH);
    const target = existing.find((p) => p.slug === params.slug);
    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const next = existing.filter((p) => p.slug !== params.slug);

    await writeJsonFile({
      path: PROVIDERS_PATH,
      data: next,
      sha,
      message: `chore(admin): delete provider ${target.name} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    await logAuditEvent({
      user: username,
      action: "delete",
      resource_type: "provider",
      resource_id: target.slug,
      summary: `Deleted provider ${target.name}`,
      diff: { before: target },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
