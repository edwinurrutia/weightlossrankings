import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface Verification {
  last_verified: string;
  verified_by?: "manual" | "scraper" | "owner-confirmed";
  source_urls: string[];
  confidence: "high" | "medium" | "low";
  notes?: string;
}

interface Provider {
  slug: string;
  name: string;
  affiliate_url?: string;
  verification?: Verification;
  [key: string]: unknown;
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let slug: string | undefined;
  let confidence: "high" | "medium" | "low" = "high";
  let source: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--confidence") {
      const next = args[++i];
      if (next === "high" || next === "medium" || next === "low") {
        confidence = next;
      } else {
        console.error(`Invalid confidence: ${next}`);
        process.exit(1);
      }
    } else if (a === "--source") {
      source = args[++i];
    } else if (!slug) {
      slug = a;
    }
  }

  if (!slug) {
    console.error(
      "Usage: npx tsx scripts/mark-verified.ts <slug> [--confidence high|medium|low] [--source URL]"
    );
    process.exit(1);
  }

  return { slug, confidence, source };
}

function main() {
  const { slug, confidence, source } = parseArgs(process.argv);
  const path = join(process.cwd(), "src/data/providers.json");
  const providers: Provider[] = JSON.parse(readFileSync(path, "utf-8"));

  const idx = providers.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    console.error(`Provider with slug "${slug}" not found.`);
    process.exit(1);
  }

  const today = new Date().toISOString().split("T")[0];
  const provider = providers[idx];
  const existing: Verification | undefined = provider.verification;

  const sourceUrls = new Set<string>(existing?.source_urls ?? []);
  if (source) sourceUrls.add(source);
  if (sourceUrls.size === 0 && provider.affiliate_url) {
    sourceUrls.add(provider.affiliate_url);
  }

  const verification: Verification = {
    last_verified: today,
    verified_by: existing?.verified_by ?? "manual",
    source_urls: Array.from(sourceUrls),
    confidence,
    ...(existing?.notes ? { notes: existing.notes } : {}),
  };

  providers[idx] = { ...provider, verification };

  writeFileSync(path, JSON.stringify(providers, null, 2));
  console.log(
    `Marked ${slug} as verified on ${today} (confidence: ${confidence}${
      source ? `, source added: ${source}` : ""
    })`
  );
}

main();
