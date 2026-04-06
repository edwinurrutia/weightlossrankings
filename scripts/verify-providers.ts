import { readFileSync } from "fs";
import { join } from "path";

interface Pricing {
  dose: string;
  monthly_cost: number;
}

interface Provider {
  slug: string;
  name: string;
  affiliate_url?: string;
  pricing?: Pricing[];
}

interface Result {
  slug: string;
  name: string;
  status: "match" | "mismatch" | "unable_to_verify";
  expected: number[];
  found: number[];
  reason?: string;
}

const PRICE_REGEX = /\$(\d{2,4})\s*\/?\s*(mo|month|monthly)/gi;

async function fetchHomepage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WLR-Verifier/1.0; +https://weightlossrankings.org)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractPrices(html: string): number[] {
  const found = new Set<number>();
  let m: RegExpExecArray | null;
  while ((m = PRICE_REGEX.exec(html)) !== null) {
    const n = parseInt(m[1], 10);
    if (!Number.isNaN(n)) found.add(n);
  }
  return Array.from(found).sort((a, b) => a - b);
}

async function main() {
  const path = join(process.cwd(), "src/data/providers.json");
  const providers: Provider[] = JSON.parse(readFileSync(path, "utf-8"));

  const results: Result[] = [];

  for (const provider of providers) {
    const expected = (provider.pricing ?? []).map((p) => p.monthly_cost);

    if (!provider.affiliate_url) {
      results.push({
        slug: provider.slug,
        name: provider.name,
        status: "unable_to_verify",
        expected,
        found: [],
        reason: "no affiliate_url",
      });
      continue;
    }

    process.stdout.write(`Fetching ${provider.name}... `);
    const html = await fetchHomepage(provider.affiliate_url);

    if (!html) {
      console.log("FAIL");
      results.push({
        slug: provider.slug,
        name: provider.name,
        status: "unable_to_verify",
        expected,
        found: [],
        reason: "fetch failed",
      });
      continue;
    }

    const found = extractPrices(html);
    if (found.length === 0) {
      console.log("no prices found");
      results.push({
        slug: provider.slug,
        name: provider.name,
        status: "unable_to_verify",
        expected,
        found,
        reason: "no price patterns found (likely JS-rendered)",
      });
      continue;
    }

    const matches = expected.some((e) => found.includes(e));
    if (matches) {
      console.log("MATCH");
      results.push({
        slug: provider.slug,
        name: provider.name,
        status: "match",
        expected,
        found,
      });
    } else {
      console.log("MISMATCH");
      results.push({
        slug: provider.slug,
        name: provider.name,
        status: "mismatch",
        expected,
        found,
      });
    }
  }

  const matches = results.filter((r) => r.status === "match");
  const mismatches = results.filter((r) => r.status === "mismatch");
  const unable = results.filter((r) => r.status === "unable_to_verify");

  console.log("\n========== REPORT ==========");
  console.log(`Total:            ${results.length}`);
  console.log(`Matches:          ${matches.length}`);
  console.log(`Mismatches:       ${mismatches.length}`);
  console.log(`Unable to verify: ${unable.length}`);

  if (mismatches.length > 0) {
    console.log("\n--- Mismatches ---");
    for (const r of mismatches) {
      console.log(
        `${r.name} (${r.slug}): expected [${r.expected.join(", ")}], found [${r.found.join(", ")}]`
      );
    }
  }

  if (unable.length > 0) {
    console.log("\n--- Unable to verify ---");
    for (const r of unable) {
      console.log(`${r.name} (${r.slug}): ${r.reason}`);
    }
  }

  console.log("\nNote: this is a best-effort scan. Many sites use JS-rendered pricing.");
}

main();
