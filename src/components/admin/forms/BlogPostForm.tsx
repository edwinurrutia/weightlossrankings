"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BlogPost } from "@/lib/types";
import TextField from "./TextField";
import TextareaField from "./TextareaField";
import FormSection from "./FormSection";
import FormActions from "./FormActions";

interface BlogPostFormProps {
  initial: BlogPost;
  isNew: boolean;
}

function toDatetimeLocal(value?: string | null): string {
  if (!value) return "";
  // Accept both YYYY-MM-DD and ISO strings.
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocal(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString();
}

export default function BlogPostForm({ initial, isNew }: BlogPostFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>(initial);
  const [tagsText, setTagsText] = useState<string>(
    Array.isArray(initial.tags) ? initial.tags.join(", ") : ""
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const tags = tagsText
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      const body: BlogPost = {
        ...post,
        tags,
        updated_date: new Date().toISOString(),
      };
      if (!body._id) body._id = body.slug;

      const url = isNew
        ? "/api/admin/content/blog"
        : `/api/admin/content/blog/${encodeURIComponent(post.slug)}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Save failed (${res.status})`);
      }
      setMessage("Saved.");
      if (isNew) {
        router.push(`/admin/content/blog/${encodeURIComponent(body.slug)}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (isNew) return;
    if (
      !confirm(
        `Delete blog post "${post.title}"? This cannot be undone.`
      )
    )
      return;
    setDeleting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/admin/content/blog/${encodeURIComponent(post.slug)}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Delete failed (${res.status})`);
      }
      router.push("/admin/content/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      <FormSection title="Basics">
        <TextField
          label="Title"
          value={post.title}
          onChange={(v) => update("title", v)}
          required
        />
        <TextField
          label="Slug"
          value={post.slug}
          onChange={(v) => update("slug", v)}
          readOnly={!isNew}
          required
          description={
            isNew
              ? "Lowercase, hyphen-separated. Becomes the URL."
              : "Slug is permanent once created."
          }
        />
        <TextareaField
          label="Excerpt"
          value={post.excerpt}
          onChange={(v) => update("excerpt", v)}
          rows={3}
          maxLength={200}
          showCounter
          description="Short summary shown on listing pages."
        />
      </FormSection>

      <FormSection title="Content" description="Markdown body.">
        <TextareaField
          label="Body"
          value={typeof post.body === "string" ? post.body : ""}
          onChange={(v) => update("body", v)}
          rows={20}
        />
      </FormSection>

      <FormSection title="Metadata">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Author"
            value={post.author}
            onChange={(v) => update("author", v)}
          />
          <TextField
            label="Category"
            value={post.category}
            onChange={(v) => update("category", v)}
          />
        </div>
        <TextField
          label="Tags (comma-separated)"
          value={tagsText}
          onChange={(v) => setTagsText(v)}
          description="e.g. semaglutide, weight loss, GLP-1"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Published Date"
            type="datetime-local"
            value={toDatetimeLocal(post.published_date)}
            onChange={(v) => update("published_date", fromDatetimeLocal(v))}
          />
          <TextField
            label="Updated Date"
            type="datetime-local"
            value={toDatetimeLocal(post.updated_date)}
            readOnly
            description="Auto-set on save."
          />
        </div>
        <TextField
          label="Featured Image URL"
          value={post.featured_image ?? ""}
          onChange={(v) => update("featured_image", v || undefined)}
          type="url"
        />
      </FormSection>

      <FormActions
        onSave={handleSave}
        onCancel={() => router.push("/admin/content/blog")}
        onDelete={isNew ? undefined : handleDelete}
        saving={saving}
        deleting={deleting}
        error={error}
        message={message}
      />
    </div>
  );
}
