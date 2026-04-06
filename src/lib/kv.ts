// Vercel KV wrapper with graceful fallback when KV is not configured.
// All functions return safe defaults on error so builds and pages never break.

import { createHash } from "crypto";
import { kv } from "@vercel/kv";

function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

function todayKey(): string {
  // YYYY-MM-DD (UTC)
  return new Date().toISOString().slice(0, 10);
}

function dayKey(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

/**
 * Privacy-respecting visitor identifier. Hashes IP + user agent +
 * the day-rotating salt so we can count unique visitors per day per
 * provider WITHOUT storing any PII.
 *
 * Properties:
 *   - The salt rotates every UTC day, so a visitor cannot be linked
 *     across days even by us — same person on Monday and Tuesday
 *     produces two different visitor IDs. This sidesteps the bulk
 *     of GDPR/CCPA "tracking identifier" concerns.
 *   - The hash is truncated to 16 hex chars (64 bits of entropy) —
 *     enough to avoid collisions across the active visitor set on a
 *     given day, small enough to keep KV storage cheap.
 *   - If we ever need a real per-visitor identifier (e.g. for fraud
 *     detection on affiliate clicks), this can be replaced with a
 *     first-party cookie ID — the rest of the dashboard plumbing
 *     stays the same.
 *
 * Returns an empty string if there is no IP/UA — in that case the
 * caller should skip the unique-visitor write rather than counting
 * an empty string as one anonymous visitor.
 */
function visitorIdFromRequest(
  ip: string | null | undefined,
  userAgent: string | null | undefined,
): string {
  const ipStr = (ip ?? "").toString().trim();
  const uaStr = (userAgent ?? "").toString().trim();
  if (!ipStr && !uaStr) return "";
  // Daily-rotating salt — no need to be cryptographically secret,
  // it just has to change every day so visitor IDs don't link across
  // days. We mix in a static project-level secret if available so
  // hashes can't be precomputed by an outside observer.
  const day = todayKey();
  const projectSalt = process.env.CLICK_VISITOR_SALT ?? "wlr-visitor-v1";
  const seed = `${day}|${projectSalt}|${ipStr}|${uaStr}`;
  return createHash("sha256").update(seed).digest("hex").slice(0, 16);
}

export interface ClickContext {
  /** Client IP from x-forwarded-for / x-real-ip — server-side only. */
  ip?: string | null;
  /** User-Agent header — server-side only. */
  userAgent?: string | null;
}

/**
 * Increment click counters for a provider click.
 *
 * Raw click counters (incremented on every click):
 *   - clicks:provider:{provider}                      → total per provider
 *   - clicks:source:{provider}:{source}               → per source within a provider
 *   - clicks:by_day:{YYYY-MM-DD}                      → hash of provider → count
 *   - clicks:position:{source}:{position}             → per (source, position)
 *   - clicks:position:{provider}:{source}:{position}  → per (provider, source, position)
 *
 * Unique-visitor sets (only written when ClickContext.ip / userAgent
 * is supplied — i.e. only from the server-side /go/[slug] handler;
 * the client-side /api/track-click beacon does NOT have visitor
 * context and skips the unique-visitor writes):
 *   - clicks:unique:{day}                          → set of all visitors that day
 *   - clicks:unique:provider:{provider}:{day}      → set of visitors per provider per day
 *   - clicks:unique:source:{source}:{day}          → set of visitors per source per day
 *
 * The visitor ID is a daily-rotating salted hash of (IP + user agent)
 * that cannot be linked across days. See visitorIdFromRequest above
 * for the privacy rationale.
 *
 * `position` is the 1-indexed slot the link occupied in its list/section
 * (e.g. position 1 = first card in "Top Rated", position 3 = third row
 * of the comparison table). Pass `null` for one-off CTAs that aren't
 * part of an ordered list.
 */
export async function incrementClick(
  provider: string,
  source: string,
  position?: number | null,
  context?: ClickContext
): Promise<void> {
  if (!isKvConfigured()) return;
  try {
    const day = todayKey();
    const ops: Promise<unknown>[] = [
      kv.incr(`clicks:provider:${provider}`),
      kv.incr(`clicks:source:${provider}:${source}`),
      kv.hincrby(`clicks:by_day:${day}`, provider, 1),
      // Track set of known providers + sources for admin listing
      kv.sadd("clicks:providers", provider),
      kv.sadd(`clicks:sources:${provider}`, source),
      kv.sadd("clicks:all_sources", source),
    ];

    if (typeof position === "number" && position > 0 && position <= 100) {
      const pos = Math.floor(position);
      ops.push(
        kv.hincrby(`clicks:positions:${source}`, String(pos), 1),
        kv.hincrby(`clicks:positions:${provider}:${source}`, String(pos), 1),
        kv.sadd("clicks:position_sources", source)
      );
    }

    // Unique-visitor tracking — only when we have request context.
    // The client beacon doesn't pass IP/UA, so it falls through.
    // The server-side /go/[slug] handler does pass them.
    if (context && (context.ip || context.userAgent)) {
      const visitorId = visitorIdFromRequest(context.ip, context.userAgent);
      if (visitorId) {
        ops.push(
          kv.sadd(`clicks:unique:${day}`, visitorId),
          kv.sadd(`clicks:unique:provider:${provider}:${day}`, visitorId),
          kv.sadd(`clicks:unique:source:${source}:${day}`, visitorId),
          // Auto-expire each daily set after 90 days so KV doesn't
          // grow forever. Vercel KV uses Redis under the hood — EXPIRE
          // takes seconds. 90 days = 7,776,000s.
          kv.expire(`clicks:unique:${day}`, 7_776_000),
          kv.expire(
            `clicks:unique:provider:${provider}:${day}`,
            7_776_000,
          ),
          kv.expire(`clicks:unique:source:${source}:${day}`, 7_776_000),
        );
      }
    }

    await Promise.all(ops);
  } catch (err) {
    // Swallow errors — tracking must never break UX
    console.error("[kv] incrementClick error", err);
  }
}

/**
 * Returns total unique visitors today across all providers.
 */
export async function getUniqueVisitorsToday(): Promise<number> {
  if (!isKvConfigured()) return 0;
  try {
    const count = await kv.scard(`clicks:unique:${todayKey()}`);
    return Number(count ?? 0);
  } catch (err) {
    console.error("[kv] getUniqueVisitorsToday error", err);
    return 0;
  }
}

/**
 * Returns unique visitors per provider for the last N days, summed.
 * Note: this counts a visitor that appeared on multiple days as
 * multiple "unique" visits — by design, the daily salt rotation
 * makes cross-day linking impossible. If you want a true unique
 * count over a window, the right answer is to compute it on a
 * single-day basis and surface "Today" / "Yesterday" / "Last 7
 * days" as separate columns rather than try to dedupe across them.
 */
export async function getUniqueVisitorsByProvider(
  days: number = 7,
): Promise<Record<string, number>> {
  if (!isKvConfigured()) return {};
  try {
    const providers = (await kv.smembers("clicks:providers")) as string[];
    if (!providers || providers.length === 0) return {};
    const totals: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const date = dayKey(i);
      for (const p of providers) {
        const count = await kv.scard(
          `clicks:unique:provider:${p}:${date}`,
        );
        const n = Number(count ?? 0);
        if (n > 0) totals[p] = (totals[p] ?? 0) + n;
      }
    }
    return totals;
  } catch (err) {
    console.error("[kv] getUniqueVisitorsByProvider error", err);
    return {};
  }
}

/**
 * Returns unique visitors per source for the last N days, summed.
 * Same caveat as getUniqueVisitorsByProvider — daily salt rotation
 * means a visitor on day 1 and day 2 counts twice.
 */
export async function getUniqueVisitorsBySource(
  days: number = 7,
): Promise<Record<string, number>> {
  if (!isKvConfigured()) return {};
  try {
    const sources = (await kv.smembers("clicks:all_sources")) as string[];
    if (!sources || sources.length === 0) return {};
    const totals: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const date = dayKey(i);
      for (const s of sources) {
        const count = await kv.scard(
          `clicks:unique:source:${s}:${date}`,
        );
        const n = Number(count ?? 0);
        if (n > 0) totals[s] = (totals[s] ?? 0) + n;
      }
    }
    return totals;
  } catch (err) {
    console.error("[kv] getUniqueVisitorsBySource error", err);
    return {};
  }
}

/**
 * Returns position breakdown for a given source — `{ "1": 23, "2": 11, ... }`
 * representing how many clicks each slot in the list received.
 */
export async function getPositionClicksForSource(
  source: string
): Promise<Record<string, number>> {
  if (!isKvConfigured()) return {};
  try {
    const hash =
      (await kv.hgetall<Record<string, number>>(
        `clicks:positions:${source}`
      )) ?? {};
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(hash)) {
      out[k] = Number(v ?? 0);
    }
    return out;
  } catch (err) {
    console.error("[kv] getPositionClicksForSource error", err);
    return {};
  }
}

/**
 * Returns the full position breakdown for every source that has position
 * data — `{ source: { "1": n, "2": n, ... } }`. Used by the admin
 * dashboard to render the "Clicks by Position" table.
 */
export async function getAllPositionClicks(): Promise<
  Record<string, Record<string, number>>
> {
  if (!isKvConfigured()) return {};
  try {
    const sources =
      ((await kv.smembers("clicks:position_sources")) as string[]) ?? [];
    const out: Record<string, Record<string, number>> = {};
    for (const s of sources) {
      out[s] = await getPositionClicksForSource(s);
    }
    return out;
  } catch (err) {
    console.error("[kv] getAllPositionClicks error", err);
    return {};
  }
}

/** Returns { providerSlug: totalClicks } */
export async function getProviderClicks(): Promise<Record<string, number>> {
  if (!isKvConfigured()) return {};
  try {
    const providers = (await kv.smembers("clicks:providers")) as string[];
    if (!providers || providers.length === 0) return {};
    const counts = await Promise.all(
      providers.map((p) => kv.get<number>(`clicks:provider:${p}`))
    );
    const out: Record<string, number> = {};
    providers.forEach((p, i) => {
      out[p] = Number(counts[i] ?? 0);
    });
    return out;
  } catch (err) {
    console.error("[kv] getProviderClicks error", err);
    return {};
  }
}

/** Returns { source: clicks } for a given provider */
export async function getSourceClicks(
  provider: string
): Promise<Record<string, number>> {
  if (!isKvConfigured()) return {};
  try {
    const sources = (await kv.smembers(
      `clicks:sources:${provider}`
    )) as string[];
    if (!sources || sources.length === 0) return {};
    const counts = await Promise.all(
      sources.map((s) => kv.get<number>(`clicks:source:${provider}:${s}`))
    );
    const out: Record<string, number> = {};
    sources.forEach((s, i) => {
      out[s] = Number(counts[i] ?? 0);
    });
    return out;
  } catch (err) {
    console.error("[kv] getSourceClicks error", err);
    return {};
  }
}

/** Returns combined source clicks across all providers */
export async function getAllSourceClicks(): Promise<Record<string, number>> {
  if (!isKvConfigured()) return {};
  try {
    const providers = (await kv.smembers("clicks:providers")) as string[];
    const totals: Record<string, number> = {};
    for (const p of providers) {
      const sources = (await kv.smembers(
        `clicks:sources:${p}`
      )) as string[];
      for (const s of sources) {
        const c = Number(
          (await kv.get<number>(`clicks:source:${p}:${s}`)) ?? 0
        );
        totals[s] = (totals[s] ?? 0) + c;
      }
    }
    return totals;
  } catch (err) {
    console.error("[kv] getAllSourceClicks error", err);
    return {};
  }
}

export interface DailyClickEntry {
  date: string;
  total: number;
  byProvider: Record<string, number>;
}

/** Returns last N days of clicks (most recent last) */
export async function getDailyClicks(days: number): Promise<DailyClickEntry[]> {
  if (!isKvConfigured()) return [];
  try {
    const out: DailyClickEntry[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = dayKey(i);
      const hash =
        (await kv.hgetall<Record<string, number>>(`clicks:by_day:${date}`)) ??
        {};
      const byProvider: Record<string, number> = {};
      let total = 0;
      for (const [k, v] of Object.entries(hash)) {
        const n = Number(v ?? 0);
        byProvider[k] = n;
        total += n;
      }
      out.push({ date, total, byProvider });
    }
    return out;
  } catch (err) {
    console.error("[kv] getDailyClicks error", err);
    return [];
  }
}
