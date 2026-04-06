// POST /api/admin/content/blog — create a new blog post.

import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { isCmsConfigured, readJsonFile, writeJsonFile } from "@/lib/github-cms";
import { logAuditEvent } from "@/lib/audit-log";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

const BLOG_PATH = "src/data/blog-posts.json";

function isValidSlug(slug: unknown): slug is string {
  return typeof slug === "string" && /^[a-z0-9][a-z0-9-]*$/.test(slug);
}

function normalize(input: Record<string, unknown>): BlogPost {
  return {
    _id: typeof input._id === "string" && input._id ? input._id : String(input.slug ?? ""),
    title: String(input.title ?? "").trim(),
    slug: String(input.slug ?? "").trim(),
    excerpt: String(input.excerpt ?? "").trim(),
    body: input.body ?? "",
    author: String(input.author ?? "").trim(),
    published_date: String(input.published_date ?? new Date().toISOString()),
    updated_date: String(input.updated_date ?? new Date().toISOString()),
    category: String(input.category ?? "").trim(),
    tags: Array.isArray(input.tags) ? (input.tags as unknown[]).map(String) : [],
    featured_image:
      typeof input.featured_image === "string" && input.featured_image
        ? input.featured_image
        : undefined,
  };
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

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!isValidSlug(body.slug)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, digits and hyphens." },
      { status: 400 }
    );
  }

  const post = normalize(body);

  try {
    const { data: existing, sha } = await readJsonFile<BlogPost[]>(BLOG_PATH);
    if (existing.some((p) => p.slug === post.slug)) {
      return NextResponse.json(
        { error: `A blog post with slug "${post.slug}" already exists.` },
        { status: 409 }
      );
    }
    const next = [...existing, post];

    await writeJsonFile({
      path: BLOG_PATH,
      data: next,
      sha,
      message: `chore(admin): create blog post ${post.slug} via admin`,
      author: { name: username, email: "admin@weightlossrankings.org" },
    });

    await logAuditEvent({
      user: username,
      action: "create",
      resource_type: "blog_post",
      resource_id: post.slug,
      summary: `Created blog post "${post.title}"`,
      diff: { after: post },
    });

    return NextResponse.json({ ok: true, slug: post.slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
