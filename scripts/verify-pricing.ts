/**
 * verify-pricing.ts — Chrome-MCP-driven verification step for the
 * pricing audit.
 *
 * Architecture:
 *
 *   audit-pricing.ts (cheap regex sweep, runs nightly in CI)
 *      ↓
 *   src/data/pricing-audit-latest.json (committed snapshot of HIGH/
 *   MEDIUM candidates from the last sweep)
 *      ↓
 *   verify-pricing.ts (THIS FILE — runs locally in a Claude session)
 *      ↓
 *   For each unverified candidate, prints a structured Chrome-MCP
 *   prompt that the running Claude can execute via the
 *   mcp__claude-in-chrome__* tools to navigate, read the page, and
 *   extract the actual price.
 *      ↓
 *   src/data/pricing-verification-log.json (append-only log of
 *   verified prices, with evidence URL + quote + screenshot path)
 *      ↓
 *   audit-pricing.ts auto-downgrades severity for any provider where
 *   verification_log has a recent entry matching the dataset price.
 *
 * Why a separate script: regex extraction against arbitrary
 * telehealth landing pages cannot reliably find the right monthly
 * cost (membership splits, decoy prices, intake-gated pricing,
 * promotional first-month pricing all break it). Chrome MCP gives a
 * real DOM walker + LLM extractor that actually understands the
 * page structure. The split lets the cheap regex sweep run nightly
 * in CI (catching candidates) and the expensive Chrome verification
 * run on demand (confirming or rejecting candidates).
 *
 * Usage:
 *
 *   # Print verifier tasks for every unverified HIGH/MEDIUM candidate
 *   npx tsx scripts/verify-pricing.ts
 *
 *   # Print verifier task for a single provider by slug
 *   npx tsx scripts/verify-pricing.ts --slug mochi-health
 *
 *   # Include OK signals too (re-verify a passed audit)
 *   npx tsx scripts/verify-pricing.ts --include-ok
 *
 *   # Limit to N candidates
 *   npx tsx scripts/verify-pricing.ts --limit 5
 *
 * The output is meant to be read by a Claude session that has the
 * Chrome MCP tools loaded. For each task, copy the prompt into a
 * fresh agent (or use SendMessage) and the agent will return a JSON
 * verdict that you append to src/data/pricing-verification-log.json.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { buildVerifierPrompt, type VerifierTaskInput } from "./lib/verifier-prompt";

interface AuditResult {
  slug: string;
  name: string;
  url: string;
  datasetPrice: number | null;
  extractedPrice: number | null;
  candidates: number[];
  deltaUsd: number | null;
  deltaPct: number | null;
  severity: "HIGH" | "MEDIUM" | "OK" | "UNKNOWN";
  evidence: string;
  error?: string;
}

interface AuditReport {
  runDate: string;
  providersAudited: number;
  results: AuditResult[];
  summary: { high: number; medium: number; ok: number; unknown: number };
}

interface VerificationEntry {
  slug: string;
  verified_price_usd: number | null;
  verified_currency: string;
  verified_drug: string;
  verification_date: string;
  verification_method: string;
  evidence_url: string;
  evidence_quote: string;
  confidence: "high" | "medium" | "low";
  verifier_notes: string;
}

interface VerificationLog {
  _schema?: unknown;
  entries: VerificationEntry[];
}

const ROOT = process.cwd();
const AUDIT_LATEST_PATH = join(ROOT, "src/data/pricing-audit-latest.json");
const VERIFICATION_LOG_PATH = join(
  ROOT,
  "src/data/pricing-verification-log.json",
);
const DOWNGRADE_WINDOW_DAYS = 30;

function flag(name: string): boolean {
  return process.argv.includes(name);
}

function arg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx === -1 || idx === process.argv.length - 1) return undefined;
  return process.argv[idx + 1];
}

function loadAudit(): AuditReport | null {
  if (!existsSync(AUDIT_LATEST_PATH)) return null;
  return JSON.parse(readFileSync(AUDIT_LATEST_PATH, "utf-8"));
}

function loadVerificationLog(): VerificationLog {
  if (!existsSync(VERIFICATION_LOG_PATH)) return { entries: [] };
  return JSON.parse(readFileSync(VERIFICATION_LOG_PATH, "utf-8"));
}

function isRecentlyVerified(
  slug: string,
  log: VerificationLog,
  windowDays: number,
): VerificationEntry | null {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);
  const cutoffIso = cutoff.toISOString().slice(0, 10);
  // Find the most recent verification entry for this slug
  const entries = log.entries
    .filter((e) => e.slug === slug)
    .sort((a, b) => b.verification_date.localeCompare(a.verification_date));
  if (entries.length === 0) return null;
  if (entries[0].verification_date >= cutoffIso) return entries[0];
  return null;
}

function main() {
  const audit = loadAudit();
  if (!audit) {
    console.error(
      `No audit snapshot found at ${AUDIT_LATEST_PATH}. Run audit-pricing.ts first.`,
    );
    process.exit(2);
  }

  const log = loadVerificationLog();
  const onlySlug = arg("--slug");
  const includeOk = flag("--include-ok");
  const limitArg = arg("--limit");
  const limit = limitArg ? parseInt(limitArg, 10) : Number.POSITIVE_INFINITY;

  // Pick the candidates that need verification
  const candidates = audit.results.filter((r) => {
    if (onlySlug) return r.slug === onlySlug;
    if (r.severity === "HIGH" || r.severity === "MEDIUM") return true;
    if (includeOk && r.severity === "OK") return true;
    return false;
  });

  // Filter out anything already verified within the downgrade window
  const tasks: AuditResult[] = [];
  const recentlyVerified: { slug: string; entry: VerificationEntry }[] = [];

  for (const c of candidates) {
    const recent = isRecentlyVerified(c.slug, log, DOWNGRADE_WINDOW_DAYS);
    if (recent) {
      recentlyVerified.push({ slug: c.slug, entry: recent });
      continue;
    }
    tasks.push(c);
    if (tasks.length >= limit) break;
  }

  // Header
  console.log("=".repeat(72));
  console.log("PRICING AUDIT VERIFIER");
  console.log("=".repeat(72));
  console.log(`Audit run date:        ${audit.runDate}`);
  console.log(`Total providers:       ${audit.providersAudited}`);
  console.log(`Audit summary:         HIGH=${audit.summary.high} MEDIUM=${audit.summary.medium} OK=${audit.summary.ok} UNKNOWN=${audit.summary.unknown}`);
  console.log(`Verification log:      ${log.entries.length} historical entries`);
  console.log(`Downgrade window:      ${DOWNGRADE_WINDOW_DAYS} days`);
  console.log("");
  console.log(`Candidates needing verification: ${tasks.length}`);
  console.log(`Already verified (within window): ${recentlyVerified.length}`);
  console.log("");

  if (recentlyVerified.length > 0) {
    console.log("ALREADY VERIFIED (skipped):");
    for (const v of recentlyVerified) {
      console.log(
        `  ${v.slug.padEnd(28)} verified ${v.entry.verification_date} → $${v.entry.verified_price_usd ?? "?"} [${v.entry.confidence}]`,
      );
    }
    console.log("");
  }

  if (tasks.length === 0) {
    console.log("Nothing to verify. All candidates have a recent verification entry.");
    process.exit(0);
  }

  // Emit one Chrome MCP prompt per task. The running Claude session
  // (which has the mcp__claude-in-chrome__* tools loaded) reads these
  // prompts and dispatches them as agent tasks.
  console.log("=".repeat(72));
  console.log("CHROME-MCP VERIFIER TASKS");
  console.log("=".repeat(72));
  console.log(
    "For each task below: copy the prompt into a fresh Chrome-MCP-enabled",
  );
  console.log(
    "Claude session (or Agent tool with subagent_type general-purpose).",
  );
  console.log(
    "The agent returns a JSON verdict — append it to the entries array in",
  );
  console.log("src/data/pricing-verification-log.json.");
  console.log("");

  tasks.forEach((task, i) => {
    const input: VerifierTaskInput = {
      slug: task.slug,
      name: task.name,
      url: task.url,
      datasetPrice: task.datasetPrice,
      extractedPrice: task.extractedPrice,
      candidates: task.candidates,
      evidence: task.evidence,
    };
    console.log("");
    console.log("─".repeat(72));
    console.log(
      `TASK ${i + 1}/${tasks.length}: ${task.name} [${task.severity}]`,
    );
    console.log("─".repeat(72));
    console.log(buildVerifierPrompt(input));
  });

  console.log("");
  console.log("=".repeat(72));
  console.log("After verifying, append entries to src/data/pricing-verification-log.json");
  console.log("Schema is documented in the file's _schema field.");
  console.log("=".repeat(72));
}

main();
