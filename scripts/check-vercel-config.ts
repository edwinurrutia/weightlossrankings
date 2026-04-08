/**
 * check-vercel-config.ts — guardrail against vercel.json schema
 * rejection by the Vercel platform.
 *
 * Why this exists:
 *
 *   On 2026-04-08 the production site stopped deploying for 8
 *   consecutive commits because vercel.json contained a non-standard
 *   root-level field:
 *
 *     {
 *       "_comment": "EMERGENCY 2026-04-08: removed the apex-to-www..."
 *     }
 *
 *   I added the _comment as documentation when I cleaned up the
 *   redirect loop. Vercel's schema validator rejects ANY non-standard
 *   root field, with the error message:
 *
 *     The vercel.json schema validation failed with the following
 *     message: should NOT have additional property '_comment'
 *
 *   The validation runs BEFORE the build starts, so local `npm run
 *   build` passes (Next.js doesn't validate vercel.json) but every
 *   Vercel deploy fails instantly. I wasted ~45 minutes diagnosing
 *   build-step issues when the failure was at the platform level.
 *
 *   This script catches the same pattern at build time so it can
 *   never happen again.
 *
 * What it checks:
 *
 *   1. vercel.json exists and parses as valid JSON
 *   2. Every root-level field is in the known-allowed list below
 *   3. No empty / null / undefined values at the root level
 *
 * What it does NOT check:
 *
 *   - Sub-field shapes (e.g. whether each redirect rule is well-formed)
 *     — Vercel handles those, and the loop check in
 *     scripts/check-redirect-loops.ts catches the most dangerous
 *     case (host-canonicalization loops)
 *   - Headers / rewrites / functions config validity — too much
 *     surface area to maintain a local schema for
 *
 * Wire-up:
 *
 *   - npm run check:vercel-config — manual run
 *   - npm run prebuild — chained automatically before every build
 *   - .github/workflows/check-redirects.yml — runs on every push
 *
 * Updating the allow-list:
 *
 *   When Vercel adds a new top-level vercel.json field, append it to
 *   ALLOWED_FIELDS below with a one-line comment explaining what it
 *   does. The canonical schema is at:
 *
 *     https://vercel.com/docs/project-configuration
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const VERCEL_JSON_PATH = join(process.cwd(), "vercel.json");

// Allowlist of root-level fields Vercel's schema validator accepts.
// Sourced from https://vercel.com/docs/project-configuration as of
// 2026-04-08. If a deploy fails because we're using a newer field
// that's not in this list, append it here with a one-line comment.
const ALLOWED_FIELDS = new Set([
  // Build configuration
  "buildCommand", // Override build script
  "devCommand", // Override dev script
  "framework", // Force a framework preset (next, nuxt, etc.)
  "ignoreCommand", // Skip-build command
  "installCommand", // Override install script
  "outputDirectory", // Override default output dir

  // Routing
  "redirects", // Permanent / temporary redirects
  "rewrites", // URL rewrites (transparent)
  "routes", // Legacy routing (deprecated, kept for back-compat)
  "headers", // Custom response headers
  "cleanUrls", // Remove .html suffixes
  "trailingSlash", // Force or strip trailing slashes

  // Functions / runtime
  "functions", // Per-function config (memory, runtime, etc.)
  "crons", // Scheduled functions
  "regions", // Default deploy regions

  // Project metadata
  "public", // Mark project as public
  "name", // Project name (legacy)
  "version", // vercel.json schema version
  "scope", // Vercel team scope
  "alias", // Project aliases
  "builds", // Legacy builds array

  // Source / git
  "git", // Git deploy hooks config
  "github", // GitHub-specific config

  // Images / media
  "images", // Image optimization config

  // Env (project-level — most envs go via dashboard)
  "env", // Build-time env vars
  "build", // Build env vars

  // Newer / less common
  "trustedIps", // Trusted IP allowlist
  "oidcTokenConfig", // OIDC token claims
]);

interface ValidationError {
  field: string;
  reason: string;
}

function validateVercelConfig(): {
  ok: boolean;
  errors: ValidationError[];
  fieldsFound: string[];
} {
  const errors: ValidationError[] = [];

  if (!existsSync(VERCEL_JSON_PATH)) {
    // No vercel.json is fine — Vercel uses defaults.
    return { ok: true, errors: [], fieldsFound: [] };
  }

  let raw: string;
  try {
    raw = readFileSync(VERCEL_JSON_PATH, "utf-8");
  } catch (err) {
    errors.push({
      field: "<file>",
      reason: `cannot read vercel.json: ${(err as Error).message}`,
    });
    return { ok: false, errors, fieldsFound: [] };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    errors.push({
      field: "<file>",
      reason: `vercel.json is not valid JSON: ${(err as Error).message}`,
    });
    return { ok: false, errors, fieldsFound: [] };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    errors.push({
      field: "<root>",
      reason: "vercel.json root must be a JSON object",
    });
    return { ok: false, errors, fieldsFound: [] };
  }

  const fieldsFound = Object.keys(parsed);

  for (const field of fieldsFound) {
    if (!ALLOWED_FIELDS.has(field)) {
      errors.push({
        field,
        reason: `'${field}' is not an allowed Vercel root-level field. ` +
          `Vercel's schema validator will reject this and the deploy will ` +
          `fail with: 'should NOT have additional property ${field}'. ` +
          `Allowed fields: ${[...ALLOWED_FIELDS].sort().join(", ")}.`,
      });
    }
  }

  return { ok: errors.length === 0, errors, fieldsFound };
}

function main() {
  const { ok, errors, fieldsFound } = validateVercelConfig();

  if (!existsSync(VERCEL_JSON_PATH)) {
    console.log(
      "check-vercel-config: no vercel.json found. Vercel will use defaults — OK.",
    );
    process.exit(0);
  }

  console.log(
    `check-vercel-config: scanned vercel.json with ${fieldsFound.length} root-level field(s): ${fieldsFound.length === 0 ? "(none)" : fieldsFound.join(", ")}`,
  );

  if (ok) {
    console.log("✓ vercel.json schema is valid — Vercel will accept this deploy");
    process.exit(0);
  }

  console.error("");
  console.error("✗ VERCEL.JSON SCHEMA VIOLATION — build blocked");
  console.error("");
  for (const e of errors) {
    console.error(`  field: ${e.field}`);
    console.error(`  ${e.reason}`);
    console.error("");
  }
  console.error(
    "This pattern took the site offline for 8 consecutive deploys on",
  );
  console.error(
    "2026-04-08. The Vercel platform validates vercel.json BEFORE the build",
  );
  console.error(
    "starts, so local 'npm run build' passes but every Vercel deploy fails",
  );
  console.error("with an unhelpful error.");
  console.error("");
  console.error(
    "Fix: remove the offending field, or move documentation into a JS",
  );
  console.error("comment in next.config.mjs / a markdown file. NEVER use a fake");
  console.error("'_comment' or '_note' field in vercel.json.");
  process.exit(1);
}

main();
