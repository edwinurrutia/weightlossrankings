// POST /api/admin/providers — create a new provider.
//
// Reads providers.json from GitHub, appends the new provider, and writes
// back. Validates input with the Zod ProviderSchema and rejects duplicate
// slugs.

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { ProviderSchema } from "@/lib/schema";
import { logAuditEvent } from "@/lib/audit-log";
import type { Provider } from "@/lib/types";

export const dynamic = "force-dynamic";

const PROVIDERS_PATH = "src/data/providers.json";

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

  let body: unknown;
  try {
    body = await request.json();
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

  const provider = parsed.data as Provider;

  try {
    const { data: existing, sha } = await readJsonFile<Provider[]>(PROVIDERS_PATH);

    if (existing.some((p) => p.slug === provider.slug)) {
      return NextResponse.json(
        { error: `A provider with slug "${provider.slug}" already exists.` },
        { status: 409 }
      );
    }

    const next = [...existing, provider];

    await writeJsonFile({
      path: PROVIDERS_PATH,
      data: next,
      sha,
      message: `chore(admin): create provider ${provider.name} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    await logAuditEvent({
      user: username,
      action: "create",
      resource_type: "provider",
      resource_id: provider.slug,
      summary: `Created provider ${provider.name}`,
      diff: { after: provider },
    });

    return NextResponse.json({ ok: true, slug: provider.slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
