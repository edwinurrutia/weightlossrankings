/**
 * check-redirect-chain.ts — POST-deploy smoke test that catches
 * redirect loops introduced via the Vercel dashboard (which the
 * static check in scripts/check-redirect-loops.ts cannot see).
 *
 * Why it exists:
 *
 *   The static loop check inspects committed files (next.config.mjs,
 *   vercel.json) and fails the build on any rule combination that
 *   could form a loop. But Vercel's dashboard ALSO supports adding
 *   redirects at the Project → Settings → Domains level — those
 *   never appear in any committed file, so static analysis can't
 *   catch them.
 *
 *   On 2026-04-08 the site went down because Vercel's dashboard
 *   apex→www redirect started fighting our committed www→apex
 *   redirect. The static check would catch the second half of that
 *   bug (the committed file half), but only a real network test can
 *   confirm there's no loop in the live deployment.
 *
 *   This script makes ONE HEAD request to each known canonical
 *   hostname, follows redirects, counts hops, and fails if there
 *   are too many or if the chain doesn't terminate.
 *
 * Usage:
 *
 *   # After every Vercel deploy, run:
 *   npx tsx scripts/check-redirect-chain.ts
 *
 *   # CI: wire into a post-deploy GitHub Action that runs after
 *   # `vercel deploy` completes. Fail the action if exit code != 0.
 *
 *   # Also runnable manually any time the site feels sluggish or
 *   # someone reports a redirect issue.
 */

const HOSTS_TO_CHECK = [
  "https://weightlossrankings.org",
  "https://www.weightlossrankings.org",
];

// Maximum number of 30x hops we tolerate. A healthy site should
// have AT MOST one host normalization hop (e.g. apex → www) and
// then 200 OK. Anything beyond 2 hops is suspicious; anything
// beyond 5 is almost certainly a loop.
const MAX_REDIRECT_HOPS = 5;

// Total time budget per hostname before we give up.
const PER_HOST_TIMEOUT_MS = 15_000;

interface HopRecord {
  url: string;
  status: number;
  location: string | null;
}

async function followChain(startUrl: string): Promise<HopRecord[]> {
  const hops: HopRecord[] = [];
  let currentUrl = startUrl;
  const visited = new Set<string>();
  for (let i = 0; i < MAX_REDIRECT_HOPS + 1; i++) {
    if (visited.has(currentUrl)) {
      // Cycle detected — same URL returned twice in the chain.
      hops.push({ url: currentUrl, status: -1, location: "CYCLE_DETECTED" });
      return hops;
    }
    visited.add(currentUrl);
    let res: Response;
    try {
      res = await fetch(currentUrl, {
        method: "HEAD",
        redirect: "manual",
        signal: AbortSignal.timeout(PER_HOST_TIMEOUT_MS),
      });
    } catch (err) {
      hops.push({
        url: currentUrl,
        status: -1,
        location: `FETCH_ERROR: ${(err as Error).message}`,
      });
      return hops;
    }
    const location = res.headers.get("location");
    hops.push({ url: currentUrl, status: res.status, location });
    if (res.status >= 300 && res.status < 400 && location) {
      // Resolve relative redirect targets against the current URL
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }
    return hops;
  }
  // We exhausted the hop budget without landing on a non-redirect.
  return hops;
}

function classify(hops: HopRecord[]): { ok: boolean; reason: string } {
  if (hops.length === 0) {
    return { ok: false, reason: "no hops recorded (network failure?)" };
  }
  const last = hops[hops.length - 1];
  if (last.status === -1) {
    return { ok: false, reason: `terminal hop failed: ${last.location}` };
  }
  if (last.status >= 300 && last.status < 400) {
    return {
      ok: false,
      reason: `chain did not terminate within ${MAX_REDIRECT_HOPS} hops — likely a loop`,
    };
  }
  if (last.status !== 200) {
    return { ok: false, reason: `terminal status ${last.status} (expected 200)` };
  }
  // Count redirects (not the final 200)
  const redirectCount = hops.length - 1;
  if (redirectCount > 2) {
    return {
      ok: false,
      reason: `${redirectCount} redirect hops (max acceptable: 2)`,
    };
  }
  return { ok: true, reason: `${redirectCount} redirect hop(s) → 200 OK` };
}

async function main() {
  console.log("=".repeat(64));
  console.log("REDIRECT CHAIN SMOKE TEST");
  console.log("=".repeat(64));
  console.log("");

  let allOk = true;
  for (const startUrl of HOSTS_TO_CHECK) {
    console.log(`▸ ${startUrl}`);
    const hops = await followChain(startUrl);
    for (let i = 0; i < hops.length; i++) {
      const h = hops[i];
      const isLast = i === hops.length - 1;
      const arrow = isLast ? " " : " ↓";
      const dest = h.location ? ` → ${h.location}` : "";
      console.log(`    ${h.status} ${h.url}${dest}${arrow}`);
    }
    const verdict = classify(hops);
    console.log(`    ${verdict.ok ? "✓" : "✗"} ${verdict.reason}`);
    console.log("");
    if (!verdict.ok) allOk = false;
  }

  if (!allOk) {
    console.error("=".repeat(64));
    console.error("✗ REDIRECT CHAIN CHECK FAILED");
    console.error("=".repeat(64));
    console.error("");
    console.error("One or more hostnames have a broken or looping redirect chain.");
    console.error("If this is a static-rule loop, run:");
    console.error("  npx tsx scripts/check-redirect-loops.ts");
    console.error("");
    console.error("If the static check passes but this one fails, the loop was added");
    console.error("via the Vercel dashboard — go to Vercel Project Settings → Domains");
    console.error("and remove the offending redirect rule.");
    process.exit(1);
  }

  console.log("✓ all hostnames resolved cleanly. Site is healthy.");
  process.exit(0);
}

main();
