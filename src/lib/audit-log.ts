// Audit log: records every admin write to Vercel KV.
//
// Storage layout:
//   audit:log               LIST  — newest entries LPUSHed onto the front
//
// Audit failures must NEVER break the underlying admin write, so all
// functions swallow errors and return safe defaults.

import { kv } from "@vercel/kv";

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "approve"
  | "reject"
  | "verify";

export type AuditResourceType =
  | "provider"
  | "blog_post"
  | "state_content"
  | "verification"
  | "scraper_run"
  | string;

export interface AuditEntry {
  id: string; // random id
  timestamp: string; // ISO
  user: string;
  action: AuditAction;
  resource_type: AuditResourceType;
  resource_id: string;
  summary: string;
  diff?: { before?: unknown; after?: unknown };
}

const LOG_KEY = "audit:log";
const MAX_ENTRIES = 5000;

function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

function randomId(): string {
  // Short random id (no ulid dep). 12 hex chars + timestamp for ordering.
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `${ts}-${rand}`;
}

/**
 * Record an audit event. Generates id + timestamp automatically.
 * Never throws — failures are logged and swallowed.
 */
export async function logAuditEvent(
  entry: Omit<AuditEntry, "id" | "timestamp">
): Promise<void> {
  if (!isKvConfigured()) return;
  try {
    const full: AuditEntry = {
      id: randomId(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    await kv.lpush(LOG_KEY, JSON.stringify(full));
    // Keep the list bounded — drop entries older than MAX_ENTRIES.
    await kv.ltrim(LOG_KEY, 0, MAX_ENTRIES - 1);
  } catch (err) {
    console.error("[audit-log] logAuditEvent error", err);
  }
}

function parseEntry(raw: unknown): AuditEntry | null {
  if (!raw) return null;
  if (typeof raw === "object") return raw as AuditEntry;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as AuditEntry;
    } catch {
      return null;
    }
  }
  return null;
}

/** Get the most recent N audit entries (newest first). */
export async function getAuditLog(limit = 100): Promise<AuditEntry[]> {
  if (!isKvConfigured()) return [];
  try {
    const raw = (await kv.lrange(LOG_KEY, 0, limit - 1)) as unknown[];
    return raw
      .map(parseEntry)
      .filter((e): e is AuditEntry => e !== null);
  } catch (err) {
    console.error("[audit-log] getAuditLog error", err);
    return [];
  }
}

/** Get audit entries filtered by resource type + id. */
export async function getAuditLogForResource(
  type: string,
  id: string,
  limit = 50
): Promise<AuditEntry[]> {
  if (!isKvConfigured()) return [];
  try {
    // Scan a window large enough to find `limit` matches.
    const window = Math.min(MAX_ENTRIES, Math.max(limit * 20, 500));
    const raw = (await kv.lrange(LOG_KEY, 0, window - 1)) as unknown[];
    const out: AuditEntry[] = [];
    for (const item of raw) {
      const entry = parseEntry(item);
      if (!entry) continue;
      if (entry.resource_type === type && entry.resource_id === id) {
        out.push(entry);
        if (out.length >= limit) break;
      }
    }
    return out;
  } catch (err) {
    console.error("[audit-log] getAuditLogForResource error", err);
    return [];
  }
}
