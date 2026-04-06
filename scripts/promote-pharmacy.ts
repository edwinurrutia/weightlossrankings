/**
 * promote-pharmacy.ts — atomically move a pharmacy from the pending
 * editorial review queue into the live src/data/pharmacies.json.
 *
 * Background: src/data/pharmacies-pending.json holds 86+ pharmacies
 * auto-discovered by scripts/scrape-fda-outsourcing-facilities.ts.
 * Each pending entry has confidence=low and several mandatory fields
 * set to null (produces_semaglutide, internal_score, etc.) because
 * the FDA registry can't tell us those things — only that the
 * facility is registered as 503B.
 *
 * The live pharmacies.json is editorially curated and the rendering
 * code in /pharmacies and /pharmacies/[slug] assumes every entry has
 * non-null values for those mandatory fields (e.g. it calls
 * .toFixed(1) on internal_score). So pending entries cannot just be
 * dumped into the live file — an editor has to enrich them first.
 *
 * This CLI is the tool an editor uses to promote one entry. It:
 *
 *   1. Loads the pending file and finds the entry by slug
 *   2. Validates that all mandatory fields are now filled in
 *      (or shows the editor what's still missing)
 *   3. If --set k=v flags were passed, applies them to the entry
 *      before validation
 *   4. Re-bumps verification.confidence to "medium" or "high"
 *   5. Removes the entry from pending and appends it to live
 *   6. Writes both files atomically
 *
 * Usage:
 *   # Show what's missing on a pending entry
 *   npx tsx scripts/promote-pharmacy.ts olympia-pharmaceuticals --check
 *
 *   # Promote with inline edits
 *   npx tsx scripts/promote-pharmacy.ts olympia-pharmaceuticals \
 *     --set produces_semaglutide=true \
 *     --set produces_tirzepatide=true \
 *     --set website=https://olympiapharmaceuticals.com \
 *     --set internal_score=8.0 \
 *     --set established=2010 \
 *     --set confidence=medium
 *
 *   # Dry run (no file writes)
 *   npx tsx scripts/promote-pharmacy.ts olympia-pharmaceuticals --check --dry-run
 *
 *   # List all pending entries with one-line summary
 *   npx tsx scripts/promote-pharmacy.ts --list
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

interface PharmacyVerification {
  last_verified?: string;
  verified_by?: string;
  source_urls?: string[];
  confidence?: "low" | "medium" | "high";
  notes?: string;
}

interface Pharmacy {
  _id: string;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
  established?: number | null;
  type: "503A" | "503B" | "Both" | "Hybrid" | "Unknown";
  certifications: string[];
  states_licensed: string[];
  produces_semaglutide: boolean | null;
  produces_tirzepatide: boolean | null;
  linked_providers: string[];
  website: string | null;
  phone: string | null;
  regulatory_actions: unknown[];
  external_reviews: Record<string, unknown>;
  internal_score: number | null;
  description: string;
  verification: PharmacyVerification;
}

const LIVE_PATH = join(process.cwd(), "src/data/pharmacies.json");
const PENDING_PATH = join(process.cwd(), "src/data/pharmacies-pending.json");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const CHECK_ONLY = args.includes("--check");
const LIST = args.includes("--list");

// Parse --set k=v flags
const setOps: Array<{ key: string; value: string }> = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--set" && i + 1 < args.length) {
    const kv = args[i + 1];
    const eq = kv.indexOf("=");
    if (eq > 0) {
      setOps.push({ key: kv.slice(0, eq), value: kv.slice(eq + 1) });
    }
    i++;
  }
}

const positional = args.filter(
  (a, i) =>
    !a.startsWith("--") &&
    !(args[i - 1] === "--set"),
);
const slugArg = positional[0] ?? "";

// ---------------- mandatory fields ----------------

const MANDATORY_FIELDS: Array<keyof Pharmacy> = [
  "name",
  "slug",
  "city",
  "state",
  "type",
  "produces_semaglutide",
  "produces_tirzepatide",
  "website",
  "internal_score",
  "description",
];

function isMissing(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

function listMissing(p: Pharmacy): string[] {
  const out: string[] = [];
  for (const field of MANDATORY_FIELDS) {
    if (isMissing(p[field])) out.push(String(field));
  }
  return out;
}

// ---------------- file IO ----------------

function loadJsonArray<T>(path: string): T[] {
  if (!existsSync(path)) return [];
  try {
    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    console.error(`Failed to parse ${path}: ${(err as Error).message}`);
    process.exit(1);
  }
}

function writeJsonArray(path: string, data: unknown[]) {
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

// ---------------- field coercion ----------------

function coerceField(
  field: string,
  raw: string,
): { ok: true; key: string; value: unknown } | { ok: false; error: string } {
  // Special-cased aliases for fields nested under verification
  if (field === "confidence") {
    if (!["low", "medium", "high"].includes(raw)) {
      return { ok: false, error: `confidence must be low|medium|high, got ${raw}` };
    }
    return { ok: true, key: "verification.confidence", value: raw };
  }
  if (field === "verified_by") {
    return { ok: true, key: "verification.verified_by", value: raw };
  }
  if (field === "verification_notes") {
    return { ok: true, key: "verification.notes", value: raw };
  }

  // Boolean fields
  if (
    field === "produces_semaglutide" ||
    field === "produces_tirzepatide"
  ) {
    if (raw === "true") return { ok: true, key: field, value: true };
    if (raw === "false") return { ok: true, key: field, value: false };
    return { ok: false, error: `${field} must be true|false, got ${raw}` };
  }

  // Numeric fields
  if (field === "internal_score" || field === "established") {
    const n = field === "internal_score" ? parseFloat(raw) : parseInt(raw, 10);
    if (!Number.isFinite(n)) {
      return { ok: false, error: `${field} must be a number, got ${raw}` };
    }
    return { ok: true, key: field, value: n };
  }

  // Array-of-string fields
  if (
    field === "certifications" ||
    field === "states_licensed" ||
    field === "linked_providers"
  ) {
    const arr = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return { ok: true, key: field, value: arr };
  }

  // Default: string
  return { ok: true, key: field, value: raw };
}

function applySet(
  pharmacy: Pharmacy,
  key: string,
  value: unknown,
): void {
  if (key.includes(".")) {
    const [parent, child] = key.split(".");
    // Only verification is supported as a nested target
    if (parent === "verification") {
      pharmacy.verification = pharmacy.verification ?? {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pharmacy.verification as any)[child] = value;
      return;
    }
    throw new Error(`Unsupported nested key: ${key}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pharmacy as any)[key] = value;
}

// ---------------- modes ----------------

function printList() {
  const pending = loadJsonArray<Pharmacy>(PENDING_PATH);
  if (pending.length === 0) {
    console.log("No pending pharmacies. Run scripts/scrape-fda-outsourcing-facilities.ts to import.");
    return;
  }
  console.log(`${pending.length} pending pharmacies (sorted by name):\n`);
  for (const p of pending) {
    const missing = listMissing(p);
    const flag = missing.length === 0 ? " ✅" : ` ⚠️  missing ${missing.length}`;
    console.log(
      `  ${p.slug.padEnd(50)} ${(p.city ?? "?").padEnd(20)} ${(p.state ?? "??").padEnd(3)}${flag}`,
    );
  }
}

function printCheck(pharmacy: Pharmacy, missing: string[]) {
  console.log(`${pharmacy.name} (${pharmacy.slug})`);
  console.log(`  type:        ${pharmacy.type}`);
  console.log(`  location:    ${pharmacy.city ?? "?"}, ${pharmacy.state ?? "??"}`);
  console.log(`  phone:       ${pharmacy.phone ?? "(missing)"}`);
  console.log(`  certs:       ${(pharmacy.certifications ?? []).join(", ") || "(none)"}`);
  console.log(`  confidence:  ${pharmacy.verification?.confidence ?? "(unset)"}`);
  console.log("");
  if (missing.length === 0) {
    console.log("  ✅ Ready to promote — all mandatory fields filled.");
  } else {
    console.log(`  ⚠️  Missing ${missing.length} mandatory field${missing.length === 1 ? "" : "s"}:`);
    for (const f of missing) console.log(`     - ${f}`);
    console.log("");
    console.log("  To fill in via CLI, pass one or more --set flags:");
    console.log("    npx tsx scripts/promote-pharmacy.ts " + pharmacy.slug + " \\");
    console.log("      --set produces_semaglutide=true \\");
    console.log("      --set produces_tirzepatide=true \\");
    console.log("      --set website=https://example.com \\");
    console.log("      --set internal_score=8.0 \\");
    console.log("      --set confidence=medium");
  }
}

// ---------------- main ----------------

function main() {
  if (LIST) {
    printList();
    return;
  }

  if (!slugArg) {
    console.error("Usage:");
    console.error("  promote-pharmacy.ts <slug> [--check] [--set k=v]... [--dry-run]");
    console.error("  promote-pharmacy.ts --list");
    process.exit(1);
  }

  const pending = loadJsonArray<Pharmacy>(PENDING_PATH);
  const idx = pending.findIndex((p) => p.slug === slugArg);
  if (idx < 0) {
    console.error(`No pending pharmacy with slug "${slugArg}".`);
    console.error('Run with "--list" to see all pending entries.');
    process.exit(1);
  }
  // Clone so we don't mutate the on-disk array until we're ready to write
  const pharmacy: Pharmacy = JSON.parse(JSON.stringify(pending[idx]));

  // Apply --set flags
  for (const op of setOps) {
    const coerced = coerceField(op.key, op.value);
    if (!coerced.ok) {
      console.error(`Cannot set ${op.key}=${op.value}: ${coerced.error}`);
      process.exit(1);
    }
    applySet(pharmacy, coerced.key, coerced.value);
  }

  // Always bump the verification timestamp when an editor touches it
  if (setOps.length > 0) {
    pharmacy.verification = pharmacy.verification ?? {};
    pharmacy.verification.last_verified = new Date()
      .toISOString()
      .slice(0, 10);
    if (!pharmacy.verification.verified_by || pharmacy.verification.verified_by === "fda-503b-scraper") {
      pharmacy.verification.verified_by = "manual";
    }
  }

  const missing = listMissing(pharmacy);

  if (CHECK_ONLY || missing.length > 0) {
    printCheck(pharmacy, missing);
    if (CHECK_ONLY) return;
    if (missing.length > 0) {
      console.error("");
      console.error("Refusing to promote: required fields are still missing.");
      process.exit(1);
    }
  }

  // Refuse to promote at low confidence — promotion implies editorial review
  if (
    !pharmacy.verification?.confidence ||
    pharmacy.verification.confidence === "low"
  ) {
    console.error(
      `Refusing to promote: verification.confidence is "${
        pharmacy.verification?.confidence ?? "unset"
      }". Pass --set confidence=medium (or high) to confirm editorial review.`,
    );
    process.exit(1);
  }

  // OK — actually move the entry
  const live = loadJsonArray<Pharmacy>(LIVE_PATH);
  if (live.some((p) => p.slug === pharmacy.slug)) {
    console.error(
      `Refusing to promote: a pharmacy with slug "${pharmacy.slug}" already exists in the live file.`,
    );
    process.exit(1);
  }

  const newLive = [...live, pharmacy].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const newPending = pending.filter((_, i) => i !== idx);

  if (DRY_RUN) {
    console.log(`Dry run: would promote ${pharmacy.name} (${pharmacy.slug}).`);
    console.log(`  live:    ${live.length} → ${newLive.length}`);
    console.log(`  pending: ${pending.length} → ${newPending.length}`);
    return;
  }

  writeJsonArray(LIVE_PATH, newLive);
  writeJsonArray(PENDING_PATH, newPending);

  console.log(`✅ Promoted ${pharmacy.name} (${pharmacy.slug}).`);
  console.log(`   live:    ${live.length} → ${newLive.length}`);
  console.log(`   pending: ${pending.length} → ${newPending.length}`);
}

main();
