// Vercel KV wrapper with graceful fallback when KV is not configured.
// All functions return safe defaults on error so builds and pages never break.

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
 * Increment click counters for a provider click.
 * - clicks:provider:{provider}                      → total per provider
 * - clicks:source:{provider}:{source}               → per source within a provider
 * - clicks:by_day:{YYYY-MM-DD}                      → hash of provider → count
 * - clicks:position:{source}:{position}             → per (source, position) across all providers
 * - clicks:position:{provider}:{source}:{position}  → per (provider, source, position)
 *
 * `position` is the 1-indexed slot the link occupied in its list/section
 * (e.g. position 1 = first card in "Top Rated", position 3 = third row of
 * the comparison table). Pass `null` for one-off CTAs that aren't part of
 * an ordered list.
 */
export async function incrementClick(
  provider: string,
  source: string,
  position?: number | null
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

    await Promise.all(ops);
  } catch (err) {
    // Swallow errors — tracking must never break UX
    console.error("[kv] incrementClick error", err);
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
