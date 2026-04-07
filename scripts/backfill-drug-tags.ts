/**
 * One-time backfill: infer the `drug` field on each Pricing entry in
 * src/data/providers.json based on dose, form, features, and provider context.
 *
 * Run: npx tsx scripts/backfill-drug-tags.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

type DrugType = "semaglutide" | "tirzepatide" | "orforglipron";

interface Pricing {
  dose: string;
  form: "compounded" | "brand";
  drug?: DrugType;
  monthly_cost: number;
  promo_code?: string;
  promo_price?: number;
}

interface Provider {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  category?: string;
  features?: string[];
  pricing: Pricing[];
}

const SEMA_DOSES = new Set([
  "0.25mg",
  "0.5mg",
  "1mg",
  "1.7mg",
  "2mg",
  "2.4mg",
  // Rybelsus oral pill strengths
  "3mg",
  "7mg",
  "14mg",
]);

const TIRZ_DOSES = new Set([
  "5mg",
  "7.5mg",
  "10mg",
  "12.5mg",
  "15mg",
]);

// 2.5mg is genuinely ambiguous: it's the smallest tirzepatide step but
// some semaglutide compounders also push to 2.5mg. Resolve via context.

function inferDrugFromDose(dose: string): DrugType | null {
  const norm = dose.trim().toLowerCase().replace(/\s+/g, "");
  if (SEMA_DOSES.has(norm)) return "semaglutide";
  if (TIRZ_DOSES.has(norm)) return "tirzepatide";
  return null;
}

function providerHasFeature(p: Provider, feat: string): boolean {
  return (p.features ?? []).some((f) => f.toLowerCase() === feat.toLowerCase());
}

function inferDrugForEntry(
  pricing: Pricing,
  provider: Provider
): DrugType | undefined {
  if (pricing.drug) return pricing.drug;

  const dose = pricing.dose.toLowerCase();

  // 1. Direct dose match
  const fromDose = inferDrugFromDose(pricing.dose);
  if (fromDose) return fromDose;

  // 2. Dose string contains the drug name.
  // Foundayo first because it's the only oral non-peptide GLP-1 — if a
  // brand or generic match hits before we check for orforglipron, we'd
  // misclassify it as semaglutide via the oral fallback below.
  if (dose.includes("orforglipron") || dose.includes("foundayo")) {
    return "orforglipron";
  }
  if (dose.includes("tirzepatide") || dose.includes("zepbound") || dose.includes("mounjaro")) {
    return "tirzepatide";
  }
  if (
    dose.includes("semaglutide") ||
    dose.includes("ozempic") ||
    dose.includes("wegovy") ||
    dose.includes("rybelsus")
  ) {
    return "semaglutide";
  }

  // 3. Microdosing — almost always sub-therapeutic semaglutide
  if (dose.includes("microdosing") || dose.includes("micro-dose")) {
    return "semaglutide";
  }

  // 4. Oral / pill / lozenge / tablet — Rybelsus is semaglutide; Foundayo
  // (orforglipron, FDA-approved April 2026) is the first non-peptide oral
  // GLP-1 — checked above by name. If we got here we're in legacy oral-
  // semaglutide territory (Rybelsus, sublingual compounded sema, etc.).
  if (
    dose.includes("oral") ||
    dose.includes("pill") ||
    dose.includes("lozenge") ||
    dose.includes("tablet") ||
    dose.includes("drops") ||
    dose.includes("sublingual")
  ) {
    return "semaglutide";
  }

  // 5. Skip non-GLP-1 categories entirely
  if (provider.category && provider.category !== "GLP-1 Provider") {
    return undefined;
  }

  // 6. Generic labels ("Starting", "Injectable", "Maintenance", etc.) on a
  // GLP-1 provider — use sibling pricing entries to infer.
  const siblingDrugs = new Set(
    provider.pricing
      .filter((pr) => pr !== pricing)
      .map((pr) => pr.drug)
      .filter((d): d is DrugType => !!d)
  );

  // If only one drug appears across siblings AND provider only sells that one
  // drug (per features), inherit it.
  const hasSemaFeat = providerHasFeature(provider, "Semaglutide");
  const hasTirzFeat = providerHasFeature(provider, "Tirzepatide");

  if (hasSemaFeat && !hasTirzFeat) return "semaglutide";
  if (hasTirzFeat && !hasSemaFeat) return "tirzepatide";

  // Provider sells both drugs — try to use ordering heuristic. Convention
  // observed in providers.json: when a provider lists two "Starting" entries,
  // semaglutide comes first (cheaper) and tirzepatide second (more expensive).
  if (hasSemaFeat && hasTirzFeat) {
    const idx = provider.pricing.indexOf(pricing);
    const sameForm = provider.pricing.filter((pr) => pr.form === pricing.form);
    const sameFormIdx = sameForm.indexOf(pricing);

    if (sameForm.length === 2) {
      // Two entries of same form: cheaper = sema, pricier = tirz
      const minCost = Math.min(...sameForm.map((pr) => pr.promo_price ?? pr.monthly_cost));
      const myCost = pricing.promo_price ?? pricing.monthly_cost;
      return myCost === minCost ? "semaglutide" : "tirzepatide";
    }

    // Single-entry provider with both drugs in features: ambiguous, but most
    // "starting" prices are advertised on semaglutide (the cheaper hook).
    if (sameForm.length === 1) {
      return "semaglutide";
    }

    // 4-entry pattern: (sema-start, sema-maint, tirz-start, tirz-maint) — fall
    // through to ordering split.
    const half = Math.floor(provider.pricing.length / 2);
    return idx < half ? "semaglutide" : "tirzepatide";
    void sameFormIdx;
  }

  // 7. Cost-range fallback for ambiguous compounded GLP-1 providers
  const cost = pricing.promo_price ?? pricing.monthly_cost;
  if (cost > 0) {
    return cost < 250 ? "semaglutide" : "tirzepatide";
  }

  return undefined;
}

function main() {
  const path = join(process.cwd(), "src/data/providers.json");
  const raw = readFileSync(path, "utf-8");
  const providers: Provider[] = JSON.parse(raw);

  let total = 0;
  let alreadyTagged = 0;
  let newlyTagged = 0;
  let undef = 0;
  const undefDetails: Array<{ slug: string; dose: string; form: string }> = [];

  for (const provider of providers) {
    if (!Array.isArray(provider.pricing)) continue;

    for (const pricing of provider.pricing) {
      total++;
      if (pricing.drug) {
        alreadyTagged++;
        continue;
      }

      const inferred = inferDrugForEntry(pricing, provider);
      if (inferred) {
        // Insert `drug` immediately after `form` for readability
        const ordered: Pricing = {
          dose: pricing.dose,
          form: pricing.form,
          drug: inferred,
          monthly_cost: pricing.monthly_cost,
          ...(pricing.promo_code !== undefined ? { promo_code: pricing.promo_code } : {}),
          ...(pricing.promo_price !== undefined ? { promo_price: pricing.promo_price } : {}),
        };
        Object.assign(pricing, ordered);
        // Re-key pricing object so JSON output preserves key order
        const idx = provider.pricing.indexOf(pricing);
        provider.pricing[idx] = ordered;
        newlyTagged++;
      } else {
        undef++;
        undefDetails.push({
          slug: provider.slug,
          dose: pricing.dose,
          form: pricing.form,
        });
      }
    }
  }

  writeFileSync(path, JSON.stringify(providers, null, 2) + "\n");

  console.log("=== Drug-Tag Backfill Report ===");
  console.log(`Providers scanned:       ${providers.length}`);
  console.log(`Total pricing entries:   ${total}`);
  console.log(`Already tagged:          ${alreadyTagged}`);
  console.log(`Newly tagged:            ${newlyTagged}`);
  console.log(`Remaining undefined:     ${undef}`);
  console.log(
    `Tagged total:            ${alreadyTagged + newlyTagged}/${total} (${(
      ((alreadyTagged + newlyTagged) / total) *
      100
    ).toFixed(1)}%)`
  );

  if (undefDetails.length > 0) {
    console.log("\nUndefined entries (expected: non-GLP-1 categories):");
    for (const u of undefDetails) {
      console.log(`  - ${u.slug}: dose="${u.dose}" form=${u.form}`);
    }
  }
}

main();
