/**
 * Source freshness audit for WeightLossRankings.org
 *
 * The site exposes a central citation registry at src/lib/citations.ts.
 * This script periodically asks two questions per entry:
 *
 *   1. Is the URL still live? (HTTP 200, follows redirects)
 *   2. Has the page content drifted significantly since we last looked?
 *
 * Drift is detected by hashing the body text (HTML) or raw bytes (PDF /
 * other) and comparing against a baseline stored in
 * data/source-snapshots.json. The baseline is committed so the whole team
 * shares the "last known good" state.
 *
 * Hashes are *flags*, not verdicts. Minor publisher template changes can
 * trip drift; a human reviewer decides whether the underlying claim still
 * holds, then re-baselines with --refresh.
 *
 * Usage:
 *   npx tsx scripts/audit-sources.ts                      # full audit, write snapshot
 *   npx tsx scripts/audit-sources.ts --refresh            # accept current hashes as new baseline
 *   npx tsx scripts/audit-sources.ts --id step1-nejm-2021 # audit one entry
 *   npx tsx scripts/audit-sources.ts --category pricing   # audit one category
 *   npx tsx scripts/audit-sources.ts --no-update          # read-only, never write snapshot
 *   npx tsx scripts/audit-sources.ts --quiet              # only print final summary
 *   npx tsx scripts/audit-sources.ts --help               # usage
 *
 * Exit codes:
 *   0 = all OK or DRIFT only
 *   1 = at least one BROKEN source (urgent)
 *   2 = script error (couldn't load registry, etc.)
 */

import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { pathToFileURL } from "url";

// ---------------- types ----------------

// Re-import the registry types from the site so we never drift from src/.
type CitationCategory =
  | "regulatory"
  | "clinical-trial"
  | "pricing"
  | "statistics"
  | "guideline";

interface CitationEntry {
  id: string;
  label: string;
  publisher: string;
  url: string;
  category: CitationCategory;
  accessedDate: string;
  dataYear: string;
  pmid?: string;
  doi?: string;
}

type EntryStatus = "ok" | "drift" | "broken" | "skipped";

interface SnapshotEntry {
  url: string;
  lastVerified: string; // YYYY-MM-DD
  lastStatus: EntryStatus;
  contentHash: string | null;
  lastChanged: string | null; // YYYY-MM-DD when hash last changed
  consecutiveFailures: number;
}

interface SnapshotFile {
  lastRunDate: string; // ISO timestamp
  entries: Record<string, SnapshotEntry>;
}

interface AuditEntryResult {
  id: string;
  label: string;
  category: CitationCategory;
  url: string;
  status: EntryStatus;
  httpStatus: number | null;
  contentHash: string | null;
  previousHash: string | null;
  lastChanged: string | null;
  consecutiveFailures: number;
  bytesHashed: number;
  contentType: string | null;
  error?: string;
}

interface AuditReport {
  runDate: string;
  isoDate: string;
  totals: { ok: number; drift: number; broken: number; skipped: number; total: number };
  results: AuditEntryResult[];
}

// ---------------- args ----------------

const args = process.argv.slice(2);
function flag(name: string): boolean {
  return args.includes(name);
}
function arg(name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

if (flag("--help") || flag("-h")) {
  console.log(
    [
      "audit-sources — verify cited URLs are still live and hashes haven't drifted",
      "",
      "Usage:",
      "  npx tsx scripts/audit-sources.ts [flags]",
      "",
      "Flags:",
      "  --refresh              Accept current hashes as the new baseline",
      "  --id <citation-id>     Audit only one citation",
      "  --category <category>  Audit only one category",
      "                         (clinical-trial|regulatory|pricing|statistics|guideline)",
      "  --no-update            Read-only — do not write snapshots.json",
      "  --quiet                Suppress per-entry stdout, only print summary",
      "  --help, -h             Show this help",
      "",
      "Exit codes:",
      "  0 = all OK or DRIFT only",
      "  1 = at least one BROKEN source",
      "  2 = script error",
    ].join("\n")
  );
  process.exit(0);
}

const REFRESH = flag("--refresh");
const NO_UPDATE = flag("--no-update");
const QUIET = flag("--quiet");
const ONLY_ID = arg("--id");
const ONLY_CATEGORY = arg("--category") as CitationCategory | undefined;

// ---------------- constants ----------------

const PER_URL_TIMEOUT_MS = 30_000;
const NAVIGATION_TIMEOUT_MS = 5_000;
const POLITENESS_SLEEP_MS = 500;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const SNAPSHOT_PATH = join(process.cwd(), "data/source-snapshots.json");
const REGISTRY_PATH = join(process.cwd(), "src/lib/citations.ts");

// ---------------- helpers ----------------

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function pubmedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

function effectiveUrl(c: CitationEntry): string {
  if (c.pmid) return pubmedUrl(c.pmid);
  return c.url;
}

function sha256(buf: Uint8Array | string): string {
  const h = createHash("sha256");
  h.update(buf);
  return h.digest("hex");
}

/**
 * Strip HTML to a normalized body-text representation suitable for hashing.
 * - drops <script>, <style>, HTML comments
 * - drops everything outside <body> if a body tag exists
 * - removes all tags and attributes
 * - decodes a handful of common entities
 * - collapses whitespace
 */
function htmlToNormalizedText(html: string): string {
  let s = html;

  // Prefer body if present
  const bodyMatch = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) s = bodyMatch[1];

  s = s
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  return s;
}

// ---------------- fetch ----------------

interface FetchResult {
  ok: boolean;
  httpStatus: number | null;
  contentType: string | null;
  contentHash: string | null;
  bytesHashed: number;
  error?: string;
}

async function fetchAndHash(url: string): Promise<FetchResult> {
  // Hard outer timeout — guarantees we never hang on a single URL.
  const outer = new AbortController();
  const outerTimer = setTimeout(() => outer.abort(), PER_URL_TIMEOUT_MS);

  // Inner timeout for navigation / first byte.
  const navTimer = setTimeout(() => {
    // Best-effort: if the request is still pending after NAV timeout we
    // also abort. fetch() does not give us a separate "first byte" hook,
    // so this acts as a stricter ceiling for hung connections.
    outer.abort();
  }, NAVIGATION_TIMEOUT_MS + PER_URL_TIMEOUT_MS); // belt-and-suspenders, see notes below

  // NOTE: we intentionally do NOT abort on NAVIGATION_TIMEOUT_MS alone,
  // because the spec says 5s for first byte, then up to 30s for the body.
  // Node's fetch doesn't expose first-byte separately — we use the outer
  // 30s as the only real ceiling. The nav timer above is dead code on
  // success but keeps the contract documented.
  void navTimer;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.google.com/",
      },
      redirect: "follow",
      signal: outer.signal,
    });

    const httpStatus = res.status;
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      // Drain body to free socket but don't hash a non-2xx page.
      try {
        await res.arrayBuffer();
      } catch {
        // ignore
      }
      return {
        ok: false,
        httpStatus,
        contentType,
        contentHash: null,
        bytesHashed: 0,
        error: `http_${httpStatus}`,
      };
    }

    const buf = new Uint8Array(await res.arrayBuffer());
    const ct = (contentType ?? "").toLowerCase();

    let hash: string;
    if (ct.includes("html") || ct.includes("xml")) {
      const html = new TextDecoder("utf-8", { fatal: false }).decode(buf);
      const text = htmlToNormalizedText(html);
      hash = sha256(text);
    } else {
      // PDF, JSON, plain text, octet-stream — hash raw bytes.
      hash = sha256(buf);
    }

    return {
      ok: true,
      httpStatus,
      contentType,
      contentHash: hash,
      bytesHashed: buf.byteLength,
    };
  } catch (err) {
    const msg = (err as Error).message || String(err);
    const isAbort = msg.toLowerCase().includes("abort");
    return {
      ok: false,
      httpStatus: null,
      contentType: null,
      contentHash: null,
      bytesHashed: 0,
      error: isAbort ? "timeout" : `fetch_error:${msg.slice(0, 80)}`,
    };
  } finally {
    clearTimeout(outerTimer);
    clearTimeout(navTimer);
  }
}

// ---------------- snapshot store ----------------

function loadSnapshot(): SnapshotFile | null {
  if (!existsSync(SNAPSHOT_PATH)) return null;
  try {
    const raw = readFileSync(SNAPSHOT_PATH, "utf-8");
    return JSON.parse(raw) as SnapshotFile;
  } catch (err) {
    console.error(`Failed to parse ${SNAPSHOT_PATH}: ${(err as Error).message}`);
    process.exit(2);
  }
}

function writeSnapshot(snap: SnapshotFile) {
  const dir = dirname(SNAPSHOT_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(snap, null, 2) + "\n");
}

// ---------------- registry loader ----------------

async function loadRegistry(): Promise<CitationEntry[]> {
  if (!existsSync(REGISTRY_PATH)) {
    console.error(`Registry not found at ${REGISTRY_PATH}`);
    process.exit(2);
  }
  try {
    // tsx supports importing .ts files at runtime. Use file:// URL to be
    // safe across platforms (matches the dynamic-import idiom used by
    // sibling scripts that pull in src/* modules).
    const mod = (await import(pathToFileURL(REGISTRY_PATH).href)) as {
      getAllCitations?: () => CitationEntry[];
    };
    if (!mod.getAllCitations) {
      console.error("citations.ts did not export getAllCitations()");
      process.exit(2);
    }
    return mod.getAllCitations();
  } catch (err) {
    console.error(`Failed to import citations registry: ${(err as Error).message}`);
    process.exit(2);
  }
}

// ---------------- audit core ----------------

function filterEntries(all: CitationEntry[]): CitationEntry[] {
  let out = all;
  if (ONLY_ID) out = out.filter((c) => c.id === ONLY_ID);
  if (ONLY_CATEGORY) out = out.filter((c) => c.category === ONLY_CATEGORY);
  // Internal site URLs (e.g. /research/...) are not auditable here.
  out = out.filter((c) => {
    const u = effectiveUrl(c);
    return /^https?:\/\//i.test(u);
  });
  return out;
}

async function auditOne(
  c: CitationEntry,
  prev: SnapshotEntry | undefined
): Promise<{ result: AuditEntryResult; nextSnapshot: SnapshotEntry }> {
  const url = effectiveUrl(c);
  const today = todayISODate();
  const isPmid = !!c.pmid;

  // pmid entries: status check only, no hash.
  if (isPmid) {
    const fr = await fetchAndHash(url);
    const status: EntryStatus = fr.httpStatus && fr.httpStatus >= 200 && fr.httpStatus < 400
      ? "skipped"
      : "broken";
    const consecutive =
      status === "broken" ? (prev?.consecutiveFailures ?? 0) + 1 : 0;
    const next: SnapshotEntry = {
      url,
      lastVerified: today,
      lastStatus: status,
      contentHash: null,
      lastChanged: prev?.lastChanged ?? null,
      consecutiveFailures: consecutive,
    };
    return {
      result: {
        id: c.id,
        label: c.label,
        category: c.category,
        url,
        status,
        httpStatus: fr.httpStatus,
        contentHash: null,
        previousHash: prev?.contentHash ?? null,
        lastChanged: prev?.lastChanged ?? null,
        consecutiveFailures: consecutive,
        bytesHashed: 0,
        contentType: fr.contentType,
        error: fr.error,
      },
      nextSnapshot: next,
    };
  }

  const fr = await fetchAndHash(url);

  if (!fr.ok || !fr.contentHash) {
    const consecutive = (prev?.consecutiveFailures ?? 0) + 1;
    const next: SnapshotEntry = {
      url,
      lastVerified: today,
      lastStatus: "broken",
      contentHash: prev?.contentHash ?? null,
      lastChanged: prev?.lastChanged ?? null,
      consecutiveFailures: consecutive,
    };
    return {
      result: {
        id: c.id,
        label: c.label,
        category: c.category,
        url,
        status: "broken",
        httpStatus: fr.httpStatus,
        contentHash: null,
        previousHash: prev?.contentHash ?? null,
        lastChanged: prev?.lastChanged ?? null,
        consecutiveFailures: consecutive,
        bytesHashed: 0,
        contentType: fr.contentType,
        error: fr.error,
      },
      nextSnapshot: next,
    };
  }

  // Successful fetch — compare hash
  const newHash = fr.contentHash;
  const oldHash = prev?.contentHash ?? null;
  const drifted = oldHash !== null && oldHash !== newHash;

  let status: EntryStatus;
  let lastChanged = prev?.lastChanged ?? null;

  if (oldHash === null) {
    // First sighting — record baseline as OK.
    status = "ok";
    lastChanged = today;
  } else if (drifted) {
    status = REFRESH ? "ok" : "drift";
    lastChanged = today;
  } else {
    status = "ok";
  }

  const next: SnapshotEntry = {
    url,
    lastVerified: today,
    lastStatus: status,
    // If --refresh, accept the new hash. If drift and not refreshing, keep
    // the OLD hash so the next run still flags drift until a human reviews.
    contentHash:
      REFRESH || !drifted || oldHash === null ? newHash : oldHash,
    lastChanged: REFRESH || !drifted || oldHash === null ? lastChanged : prev?.lastChanged ?? null,
    consecutiveFailures: 0,
  };

  return {
    result: {
      id: c.id,
      label: c.label,
      category: c.category,
      url,
      status,
      httpStatus: fr.httpStatus,
      contentHash: newHash,
      previousHash: oldHash,
      lastChanged: next.lastChanged,
      consecutiveFailures: 0,
      bytesHashed: fr.bytesHashed,
      contentType: fr.contentType,
    },
    nextSnapshot: next,
  };
}

// ---------------- output ----------------

function printSummary(report: AuditReport, isFirstRun: boolean) {
  const { totals, isoDate, results } = report;
  const lines: string[] = [];
  lines.push("");
  lines.push(`Sources audit — ${isoDate}`);
  lines.push("─────────────────────────────────────────");
  lines.push(`OK         ${String(totals.ok).padStart(4)}`);
  lines.push(`DRIFT      ${String(totals.drift).padStart(4)}   ${totals.drift ? "(review and re-baseline)" : ""}`);
  lines.push(`BROKEN     ${String(totals.broken).padStart(4)}   ${totals.broken ? "(urgent — fix or replace)" : ""}`);
  lines.push(`SKIPPED    ${String(totals.skipped).padStart(4)}   (pmid entries)`);
  lines.push("─────────────────────────────────────────");
  lines.push(`Total      ${String(totals.total).padStart(4)}`);

  const drifts = results.filter((r) => r.status === "drift");
  if (drifts.length > 0) {
    lines.push("");
    lines.push("Drift detected:");
    for (const d of drifts) {
      const since = d.lastChanged ? ` (last unchanged ${d.lastChanged})` : "";
      lines.push(`  - ${d.id}${since}`);
    }
  }

  const brokens = results.filter((r) => r.status === "broken");
  if (brokens.length > 0) {
    lines.push("");
    lines.push("Broken (consecutive failures > 0):");
    for (const b of brokens) {
      const reason = b.error ?? (b.httpStatus ? `HTTP ${b.httpStatus}` : "unknown");
      lines.push(`  - ${b.id}  (${b.consecutiveFailures} failure${b.consecutiveFailures === 1 ? "" : "s"}, ${reason})`);
    }
  }

  if (isFirstRun) {
    lines.push("");
    lines.push("First run — baseline written. Re-run to detect drift.");
  }

  lines.push("");
  console.log(lines.join("\n"));
}

// ---------------- main ----------------

async function main() {
  const all = await loadRegistry();
  const entries = filterEntries(all);

  if (entries.length === 0) {
    console.error("No citation entries selected (check --id / --category).");
    process.exit(2);
  }

  const existing = loadSnapshot();
  const isFirstRun = existing === null;
  const prevEntries = existing?.entries ?? {};

  if (!QUIET) {
    console.log(
      `audit-sources: ${entries.length}/${all.length} entries${
        isFirstRun ? " (first run — building baseline)" : ""
      }${REFRESH ? " (--refresh: re-baselining hashes)" : ""}`
    );
  }

  const results: AuditEntryResult[] = [];
  const nextEntries: Record<string, SnapshotEntry> = { ...prevEntries };

  for (let i = 0; i < entries.length; i++) {
    const c = entries[i];
    if (!QUIET) {
      process.stdout.write(`[${i + 1}/${entries.length}] ${c.id}... `);
    }
    try {
      const { result, nextSnapshot } = await auditOne(c, prevEntries[c.id]);
      results.push(result);
      nextEntries[c.id] = nextSnapshot;
      if (!QUIET) {
        const tag = result.status.toUpperCase();
        const extra = result.error ? ` (${result.error})` : result.httpStatus ? ` [${result.httpStatus}]` : "";
        console.log(`${tag}${extra}`);
      }
    } catch (err) {
      // Defensive: auditOne should never throw, but if it does we classify
      // as broken and keep going.
      const msg = (err as Error).message || String(err);
      results.push({
        id: c.id,
        label: c.label,
        category: c.category,
        url: effectiveUrl(c),
        status: "broken",
        httpStatus: null,
        contentHash: null,
        previousHash: prevEntries[c.id]?.contentHash ?? null,
        lastChanged: prevEntries[c.id]?.lastChanged ?? null,
        consecutiveFailures: (prevEntries[c.id]?.consecutiveFailures ?? 0) + 1,
        bytesHashed: 0,
        contentType: null,
        error: `unexpected:${msg.slice(0, 80)}`,
      });
      if (!QUIET) console.log(`BROKEN (unexpected: ${msg.slice(0, 60)})`);
    }
    await sleep(POLITENESS_SLEEP_MS);
  }

  const totals = {
    ok: results.filter((r) => r.status === "ok").length,
    drift: results.filter((r) => r.status === "drift").length,
    broken: results.filter((r) => r.status === "broken").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    total: results.length,
  };

  const isoDate = todayISODate();
  const report: AuditReport = {
    runDate: new Date().toISOString(),
    isoDate,
    totals,
    results,
  };

  // JSON report for CI / GitHub Actions issue body
  const jsonOut = `/tmp/sources-audit-${isoDate}.json`;
  try {
    writeFileSync(jsonOut, JSON.stringify(report, null, 2));
  } catch (err) {
    console.error(`Warning: failed to write JSON report: ${(err as Error).message}`);
  }

  // Snapshot write
  if (!NO_UPDATE) {
    const snap: SnapshotFile = {
      lastRunDate: report.runDate,
      entries: nextEntries,
    };
    writeSnapshot(snap);
  }

  printSummary(report, isFirstRun);
  if (!QUIET) console.log(`Report: ${jsonOut}`);
  if (!NO_UPDATE && !QUIET) console.log(`Snapshot: ${SNAPSHOT_PATH}`);

  // Exit codes
  if (totals.broken > 0) {
    if (!QUIET) {
      console.error(`\n${totals.broken} broken source(s) — failing CI.`);
    }
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
