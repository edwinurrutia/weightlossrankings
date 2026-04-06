// GET / PUT / DELETE /api/admin/content/blog/[slug]

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { logAuditEvent } from "@/lib/audit-log";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

const BLOG_PATH = "src/data/blog-posts.json";

interface RouteContext {
  params: { slug: string };
}

function requireAuth(): string | null {
  return headers().get("x-admin-user");
}

function normalize(input: Record<string, unknown>, fallbackSlug: string): BlogPost {
  return {
    _id: typeof input._id === "string" && input._id ? input._id : fallbackSlug,
    title: String(input.title ?? "").trim(),
    slug: String(input.slug ?? fallbackSlug).trim(),
    excerpt: String(input.excerpt ?? "").trim(),
    body: input.body ?? "",
    author: String(input.author ?? "").trim(),
    published_date: String(input.published_date ?? ""),
    updated_date: String(input.updated_date ?? new Date().toISOString()),
    category: String(input.category ?? "").trim(),
    tags: Array.isArray(input.tags) ? (input.tags as unknown[]).map(String) : [],
    featured_image:
      typeof input.featured_image === "string" && input.featured_image
        ? input.featured_image
        : undefined,
  };
}

function diffPost(
  before: BlogPost,
  after: BlogPost
): { changed: string[]; diff: Record<string, { before: unknown; after: unknown }> } {
  const diff: Record<string, { before: unknown; after: unknown }> = {};
  const keys = Array.from(new Set([...Object.keys(before), ...Object.keys(after)]));
  for (const k of keys) {
    if (k === "updated_date") continue;
    const a = JSON.stringify((before as unknown as Record<string, unknown>)[k]);
    const b = JSON.stringify((after as unknown as Record<string, unknown>)[k]);
    if (a !== b) diff[k] = { before: (before as unknown as Record<string, unknown>)[k], after: (after as unknown as Record<string, unknown>)[k] };
  }
  return { changed: Object.keys(diff), diff };
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const username = requireAuth();
  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "GitHub CMS is not configured." }, { status: 503 });
  }
  try {
    const { data } = await readJsonFile<BlogPost[]>(BLOG_PATH);
    const post = data.find((p) => p.slug === params.slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, post });
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
  if (updated.slug !== params.slug) {
    return NextResponse.json(
      { error: "Slug in body does not match URL slug." },
      { status: 400 }
    );
  }
  if (!updated.title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  try {
    const { data: existing, sha } = await readJsonFile<BlogPost[]>(BLOG_PATH);
    const idx = existing.findIndex((p) => p.slug === params.slug);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const before = existing[idx];
    const next = [...existing];
    next[idx] = updated;

    await writeJsonFile({
      path: BLOG_PATH,
      data: next,
      sha,
      message: `chore(admin): update blog post ${updated.slug} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    const { changed } = diffPost(before, updated);
    await logAuditEvent({
      user: username,
      action: "update",
      resource_type: "blog_post",
      resource_id: updated.slug,
      summary:
        changed.length === 0
          ? `Re-saved blog post "${updated.title}" (no field changes)`
          : `Updated blog post "${updated.title}": ${changed.join(", ")}`,
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
  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "GitHub CMS is not configured." }, { status: 503 });
  }

  try {
    const { data: existing, sha } = await readJsonFile<BlogPost[]>(BLOG_PATH);
    const target = existing.find((p) => p.slug === params.slug);
    if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const next = existing.filter((p) => p.slug !== params.slug);

    await writeJsonFile({
      path: BLOG_PATH,
      data: next,
      sha,
      message: `chore(admin): delete blog post ${target.slug} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    await logAuditEvent({
      user: username,
      action: "delete",
      resource_type: "blog_post",
      resource_id: target.slug,
      summary: `Deleted blog post "${target.title}"`,
      diff: { before: target },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
