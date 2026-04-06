import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const path = join(process.cwd(), "src/data/providers.json");
const providers = JSON.parse(readFileSync(path, "utf-8"));
const today = new Date().toISOString().split("T")[0];

const updated = providers.map((p: Record<string, unknown>) => ({
  ...p,
  verification: p.verification ?? {
    last_verified: today,
    verified_by: "manual",
    source_urls: [p.affiliate_url],
    confidence: "low",
    notes: "Initial seed data — needs manual verification",
  },
}));

writeFileSync(path, JSON.stringify(updated, null, 2));
console.log(`Backfilled verification metadata on ${updated.length} providers`);
