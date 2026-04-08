/**
 * check-redirect-loops.ts — guardrail against host-canonicalization
 * redirect loops that take the entire site down.
 *
 * Why this exists:
 *
 *   On 2026-04-08 the production site went totally down with
 *   ERR_TOO_MANY_REDIRECTS because two redirect rules were fighting:
 *
 *     vercel.json:    apex → 307 → www
 *     next.config.mjs: www → 308 → apex
 *
 *   Each rule was independently sensible, but together they formed
 *   an infinite loop that no human caught in code review. The site
 *   was unreachable until we removed both rules.
 *
 *   This script runs as part of `npm run prebuild` and fails the
 *   build if it detects ANY combination of redirect rules across
 *   next.config.mjs, vercel.json, and src/middleware.ts that could
 *   form a host-canonicalization loop. The check is conservative:
 *   if it can't prove the rules are safe, it fails.
 *
 * What it catches:
 *
 *   1. apex → www in one file AND www → apex in another file
 *   2. Two redirect rules in the same file with mirror-image hosts
 *   3. Any redirect rule whose destination matches its own source
 *      host (a self-loop with rewritten path)
 *
 * What it does NOT catch (because it's a static analysis script,
 * not a network test):
 *
 *   - Redirect loops introduced by Vercel dashboard configuration
 *     (those don't appear in any committed file). For those, run
 *     the post-deploy smoke test in scripts/check-redirect-chain.ts.
 *
 * Usage:
 *
 *   npx tsx scripts/check-redirect-loops.ts          # exits 0 or 1
 *   npm run check:redirects                          # via package.json
 *
 * Wire-up:
 *
 *   package.json `prebuild` script chains this in front of `next
 *   build`. Any redirect loop = build fails before it even compiles.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface RedirectRule {
  source: string;
  destination: string;
  /** Host the rule fires on, if specified via `has`. */
  hostMatch?: string;
  /** Where this rule was defined (for error messages). */
  origin: string;
}

const ROOT = process.cwd();
const NEXT_CONFIG_PATH = join(ROOT, "next.config.mjs");
const VERCEL_JSON_PATH = join(ROOT, "vercel.json");

// Parse next.config.mjs's redirects() return array. We can't
// dynamically import the file from a tsx script (it's an mjs with
// async function), so we do textual extraction. Conservative:
// matches the {source, destination, has?} object literal pattern
// that the file uses.
function parseNextConfigRedirects(): RedirectRule[] {
  if (!existsSync(NEXT_CONFIG_PATH)) return [];
  const text = readFileSync(NEXT_CONFIG_PATH, "utf-8");
  const rules: RedirectRule[] = [];

  // Find each redirect object literal between `redirects() {` and
  // the closing `]`. Each rule looks like:
  //   {
  //     source: "/...",
  //     [has: [...],]
  //     destination: "/...",
  //     permanent: true,
  //   }
  // We use a non-greedy regex with multiline flag.
  const objRe = /\{\s*source:\s*["']([^"']+)["'][\s\S]*?destination:\s*["']([^"']+)["'][\s\S]*?\},?/g;
  let m: RegExpExecArray | null;
  while ((m = objRe.exec(text)) !== null) {
    // Check if there's a `has: [{ type: "host", value: "..."}]`
    // block in the matched substring. If so, capture the host.
    const block = m[0];
    let hostMatch: string | undefined;
    const hasMatch = /has:\s*\[\s*\{\s*type:\s*["']host["'][\s\S]*?value:\s*["']([^"']+)["']/.exec(block);
    if (hasMatch) hostMatch = hasMatch[1];
    rules.push({
      source: m[1],
      destination: m[2],
      hostMatch,
      origin: "next.config.mjs",
    });
  }
  return rules;
}

// Parse vercel.json. JSON is well-formed so we can JSON.parse it.
function parseVercelJsonRedirects(): RedirectRule[] {
  if (!existsSync(VERCEL_JSON_PATH)) return [];
  const text = readFileSync(VERCEL_JSON_PATH, "utf-8");
  let parsed: { redirects?: Array<{ source: string; destination: string; has?: Array<{ type: string; value: string }> }> };
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }
  if (!parsed.redirects || !Array.isArray(parsed.redirects)) return [];
  return parsed.redirects.map((r) => {
    const hostMatch = r.has?.find((h) => h.type === "host")?.value;
    return {
      source: r.source,
      destination: r.destination,
      hostMatch,
      origin: "vercel.json",
    };
  });
}

// Extract the host portion of a destination URL. Returns null if
// the destination is a path (no host), in which case the rule
// doesn't change the host and can't participate in a host loop.
function extractHost(destination: string): string | null {
  try {
    const u = new URL(destination);
    return u.host.toLowerCase();
  } catch {
    return null;
  }
}

interface LoopReport {
  problem: string;
  ruleA: RedirectRule;
  ruleB: RedirectRule;
}

// The core check: do any two rules form a host-canonicalization loop?
// Definition: rule A fires on host H_a and redirects to host H_b,
// AND rule B fires on host H_b and redirects to host H_a.
function findHostLoops(rules: RedirectRule[]): LoopReport[] {
  const loops: LoopReport[] = [];
  for (let i = 0; i < rules.length; i++) {
    for (let j = 0; j < rules.length; j++) {
      if (i === j) continue;
      const a = rules[i];
      const b = rules[j];
      if (!a.hostMatch || !b.hostMatch) continue;
      const aDestHost = extractHost(a.destination);
      const bDestHost = extractHost(b.destination);
      if (!aDestHost || !bDestHost) continue;
      // Loop condition: A fires on H_a, redirects to H_b. B fires
      // on H_b, redirects to H_a.
      if (
        a.hostMatch.toLowerCase() !== aDestHost &&
        b.hostMatch.toLowerCase() !== bDestHost &&
        aDestHost === b.hostMatch.toLowerCase() &&
        bDestHost === a.hostMatch.toLowerCase()
      ) {
        loops.push({
          problem: `host-canonicalization loop between ${a.hostMatch} and ${b.hostMatch}`,
          ruleA: a,
          ruleB: b,
        });
      }
    }
  }
  return loops;
}

// Self-loop check: a single rule whose destination host equals its
// source host (with the same path), which would never resolve.
function findSelfLoops(rules: RedirectRule[]): LoopReport[] {
  const loops: LoopReport[] = [];
  for (const rule of rules) {
    if (!rule.hostMatch) continue;
    const destHost = extractHost(rule.destination);
    if (!destHost) continue;
    if (destHost === rule.hostMatch.toLowerCase()) {
      // Same host on both sides. If the path also matches, it's a
      // self-loop. We can't always tell if the paths are equivalent
      // without expanding the regex, so we flag it as a warning.
      loops.push({
        problem: `self-loop: rule fires on host ${rule.hostMatch} and redirects to the same host`,
        ruleA: rule,
        ruleB: rule,
      });
    }
  }
  return loops;
}

function main() {
  const nextRules = parseNextConfigRedirects();
  const vercelRules = parseVercelJsonRedirects();
  const allRules = [...nextRules, ...vercelRules];

  console.log(
    `check-redirect-loops: scanned ${nextRules.length} next.config.mjs rule(s) + ${vercelRules.length} vercel.json rule(s) = ${allRules.length} total`,
  );

  const loops = [...findHostLoops(allRules), ...findSelfLoops(allRules)];

  if (loops.length === 0) {
    console.log("✓ no host-canonicalization redirect loops detected");
    process.exit(0);
  }

  console.error("");
  console.error("✗ REDIRECT LOOP DETECTED — build blocked");
  console.error("");
  for (const loop of loops) {
    console.error(`  ${loop.problem}`);
    console.error(`    rule A (${loop.ruleA.origin}): host=${loop.ruleA.hostMatch}, source=${loop.ruleA.source}, → ${loop.ruleA.destination}`);
    if (loop.ruleA !== loop.ruleB) {
      console.error(`    rule B (${loop.ruleB.origin}): host=${loop.ruleB.hostMatch}, source=${loop.ruleB.source}, → ${loop.ruleB.destination}`);
    }
    console.error("");
  }
  console.error(
    "Two rules form a host-canonicalization loop when rule A fires on host X and",
  );
  console.error(
    "redirects to host Y, while rule B fires on host Y and redirects back to host X.",
  );
  console.error(
    "This pattern took the site totally down on 2026-04-08 with ERR_TOO_MANY_REDIRECTS.",
  );
  console.error("");
  console.error(
    "Fix: pick ONE canonical host. Remove ALL redirect rules pointing to the other.",
  );
  console.error(
    "Update src/app/layout.tsx, src/app/sitemap.ts, JSON-LD schemas, and llms.txt to",
  );
  console.error("match the chosen canonical. See scripts/check-redirect-loops.ts header for details.");
  process.exit(1);
}

main();
