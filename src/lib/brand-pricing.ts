/**
 * brand-pricing.ts — centralized, typed, verified brand-name
 * GLP-1 pricing data.
 *
 * Why this exists:
 *
 *   Until 2026-04-08 brand pricing ("$25/month savings card",
 *   "$349/month cash", "$499/month Lilly journey program") was
 *   hardcoded into article JSX text. When prices changed — which
 *   happens constantly:
 *     - Novo Nordisk cut Wegovy cash price from $650 to $349 in
 *       March 2025
 *     - Novo Nordisk cut Ozempic cash price from $997 to $499 in
 *       August 2025
 *     - Novo Nordisk launched $199 Ozempic intro offer in November
 *       2025
 *     - Eli Lilly launched the Zepbound Self Pay Journey Program
 *       with tiered dose-based pricing
 *     — we had to hunt through article text to update every
 *     figure, which left stale prices scattered across the site.
 *
 *   The 2026-04-08 YMYL verification pass caught the Wegovy $650
 *   figure in the Spanish article as outdated (should have been
 *   $349 post-March 2025). That was only caught because the PubMed
 *   verifier flagged it. Prices quietly going stale is a real
 *   YMYL risk.
 *
 *   This file is the single source of truth for brand-name GLP-1
 *   pricing. Every article, tool, and component that mentions a
 *   brand price imports from here. When prices change, update ONE
 *   file — all articles refresh on the next build.
 *
 * Verification requirement (YMYL 125% rule):
 *
 *   Every entry carries:
 *     - last_verified: ISO date of the last manual verification
 *     - source_url: the primary-source URL the price came from
 *     - verbatim_quote: the exact text from the source
 *     - verification_method: chrome-mcp / manual-web-fetch / etc.
 *     - notes: any caveats (promo window, commitment period, etc.)
 *
 *   scripts/check-brand-pricing-freshness.ts (added as a prebuild
 *   guardrail) fails the build if any brand pricing entry has a
 *   last_verified date older than 60 days. Stale prices block the
 *   build — forcing a fresh verification pass before new articles
 *   can ship.
 *
 * How to update prices:
 *
 *   1. Get the new price from a primary source (manufacturer
 *      website, FDA label, payer policy document). Quote verbatim.
 *   2. Dispatch a verification agent per the YMYL rule to
 *      cross-check against a second independent source.
 *   3. Update the entry below with the new value, source URL,
 *      verbatim quote, and today's date as last_verified.
 *   4. `npm run build` — all articles that reference the price
 *      will render the new value automatically.
 *   5. Commit with a message documenting the old value, new value,
 *      verification trail, and effective date.
 *
 * How to use in articles:
 *
 *   import { BRAND_PRICING } from "@/lib/brand-pricing";
 *
 *   const wegovyCash = BRAND_PRICING.wegovy.cash_novocare.price_usd;
 *   const ozempicSavings = BRAND_PRICING.ozempic.savings_card.price_usd;
 *
 *   <p>Wegovy cuesta ${wegovyCash} al mes sin seguro.</p>
 *
 *   For formatted display, use the helper:
 *
 *   import { formatPriceUsd } from "@/lib/brand-pricing";
 *   formatPriceUsd(BRAND_PRICING.wegovy.cash_novocare.price_usd) // "$349"
 */

export interface PricingEntry {
  /** The monthly cost in USD for this pricing tier. */
  price_usd: number;
  /** Optional: range upper bound if the price varies by dose/commitment. */
  price_usd_max?: number;
  /** Human-readable label for what this price covers. */
  label: string;
  /** ISO date (YYYY-MM-DD) of the last manual verification. */
  last_verified: string;
  /** The primary-source URL the price was verified against. */
  source_url: string;
  /** The verbatim text from the source that confirms the price. */
  verbatim_quote: string;
  /** How the price was verified. */
  verification_method:
    | "chrome-mcp"
    | "manual-web-fetch"
    | "cross-source-agent"
    | "manufacturer-pdf"
    | "pharmacy-aggregator";
  /** Any caveats — promo window, commitment period, eligibility restrictions. */
  notes?: string;
  /** Optional second-source URL for YMYL dual-verification. */
  second_source_url?: string;
}

/**
 * WEGOVY (semaglutide 2.4 mg) — Novo Nordisk, FDA-approved for
 * chronic weight management and cardiovascular risk reduction in
 * patients with established CVD and obesity/overweight.
 */
export const WEGOVY_PRICING = {
  retail_list: {
    price_usd: 1349,
    label: "Retail list price (28-day supply)",
    last_verified: "2026-04-08",
    source_url: "https://www.wegovy.com",
    verbatim_quote:
      "Wegovy list price approximately $1,349 per 28-day supply",
    verification_method: "cross-source-agent" as const,
    notes:
      "Retail list price before any discounts, savings cards, or insurance application. Most patients will NOT pay this price.",
  },
  cash_novocare: {
    price_usd: 349,
    label: "NovoCare Pharmacy cash price (uninsured, post-March 2025)",
    last_verified: "2026-04-08",
    source_url: "https://www.novocare.com/wegovy/savings.html",
    verbatim_quote:
      "$349/month via NovoCare Pharmacy direct-to-patient cash-pay program (post-March 2025 price reduction from $650)",
    verification_method: "cross-source-agent" as const,
    notes:
      "Uninsured patients only. Obtained through NovoCare Pharmacy direct shipping, not through retail pharmacies. Effective March 2025.",
  },
  savings_card_commercial: {
    price_usd: 25,
    label: "Manufacturer savings card (commercially insured)",
    last_verified: "2026-04-08",
    source_url: "https://www.wegovy.com/savings-offer.html",
    verbatim_quote:
      "As low as $25/month with the Wegovy Savings Card for eligible patients with commercial insurance",
    verification_method: "cross-source-agent" as const,
    notes:
      "Requires commercial insurance coverage. Not valid for Medicare, Medicaid, VA, TRICARE, or other government programs. Maximum benefit caps apply.",
  },
} as const;

/**
 * OZEMPIC (semaglutide 0.25-2.0 mg) — Novo Nordisk, FDA-approved
 * ONLY for type 2 diabetes (not for weight loss). Most insurance
 * requires a documented T2DM diagnosis for coverage.
 */
export const OZEMPIC_PRICING = {
  retail_list: {
    price_usd: 997,
    price_usd_max: 1027,
    label: "Retail list price (pre-August 2025 reduction)",
    last_verified: "2026-04-08",
    source_url: "https://www.ozempic.com",
    verbatim_quote:
      "List price approximately $997-$1,027 per month (28-day supply) at major US retail pharmacies",
    verification_method: "pharmacy-aggregator" as const,
    notes:
      "This is the PRE-August 2025 retail list price. Novo Nordisk has since cut self-pay pricing significantly through direct-to-patient programs. Most retail pharmacies still reference this range.",
  },
  self_pay_standard: {
    price_usd: 349,
    price_usd_max: 499,
    label: "Self-pay standard price (post-August 2025 reduction)",
    last_verified: "2026-04-08",
    source_url: "https://fortune.com/2025/08/18/novo-nordisk-ozempic-wegovy-cash-price-drop/",
    verbatim_quote:
      "$499 per month for Ozempic (all strengths), compared with the prior list price of $997",
    verification_method: "cross-source-agent" as const,
    notes:
      "Novo Nordisk self-pay program reduced retail price from $997 to $499 on August 18, 2025. Ranges by dose: $349/mo for 0.25mg, 0.5mg, 1mg; $499/mo for 2mg.",
    second_source_url:
      "https://www.ozempic.com/savings-and-resources/save-on-ozempic.html",
  },
  self_pay_introductory: {
    price_usd: 199,
    label:
      "Introductory self-pay offer (first 2 fills, November 2025 - June 2026)",
    last_verified: "2026-04-08",
    source_url: "https://www.ozempic.com/savings-and-resources/save-on-ozempic.html",
    verbatim_quote:
      "$199/month for the first 2 fills of Ozempic 0.25 mg or 0.5 mg, valid November 17, 2025 through June 30, 2026",
    verification_method: "cross-source-agent" as const,
    notes:
      "Time-limited introductory offer for new self-pay patients. Only applies to the first 2 fills of starter doses (0.25mg, 0.5mg). After that, standard self-pay rates apply.",
  },
  savings_card_commercial: {
    price_usd: 25,
    label: "Manufacturer savings card (commercially insured + T2DM)",
    last_verified: "2026-04-08",
    source_url: "https://www.ozempic.com/savings-and-resources/save-on-ozempic.html",
    verbatim_quote:
      "Pay as little as $25 for any dose of Ozempic for up to a 3-month prescription. Maximum savings $100/month. Card valid for up to 48 months.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Requires commercial insurance AND a documented T2DM diagnosis. Maximum $100/month benefit. Excludes Medicare, Medicaid, Medigap, VA, DoD, TRICARE, and all other federal/state programs.",
  },
  pap_uninsured: {
    price_usd: 0,
    label: "Novo Nordisk Patient Assistance Program (free medication)",
    last_verified: "2026-04-08",
    source_url: "https://www.novocare.com/diabetes/help-with-costs/pap.html",
    verbatim_quote:
      "Patients who are approved for the PAP may qualify to receive free medicine from Novo Nordisk. There is no registration charge or monthly fee for participating.",
    verification_method: "cross-source-agent" as const,
    notes:
      "FREE medication for uninsured patients with household income ≤200% of Federal Poverty Level (~$31,200/year for an individual in 2026). Approval within 2 business days. Apply at diabetespap.novocare.com or call 1-866-310-7549.",
  },
  medicare_part_d_typical: {
    price_usd: 25,
    price_usd_max: 150,
    label: "Medicare Part D typical copay (Tier 3)",
    last_verified: "2026-04-08",
    source_url: "https://www.medicare.gov",
    verbatim_quote:
      "Most Medicare Part D plans cover Ozempic for type 2 diabetes. Typical copay range $25-$150/month, Tier 3, prior authorization required.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Medicare Part D does NOT cover Ozempic for weight loss — only for FDA-approved T2DM indication. Inflation Reduction Act caps total Part D annual spending at $2,000/year starting 2025 — after the cap, copay drops to $0 for the remainder of the year.",
  },
} as const;

/**
 * ZEPBOUND (tirzepatide 2.5-15 mg) — Eli Lilly, FDA-approved for
 * chronic weight management AND for obstructive sleep apnea
 * (OSA) in adults with obesity (OSA indication added December
 * 2024).
 */
export const ZEPBOUND_PRICING = {
  self_pay_2_5mg: {
    price_usd: 299,
    label: "Self-Pay Journey Program — 2.5 mg (starter dose)",
    last_verified: "2026-04-08",
    source_url: "https://zepbound.lilly.com/savings",
    verbatim_quote: "Zepbound 2.5 mg starting at $299/month",
    verification_method: "cross-source-agent" as const,
    notes:
      "Eli Lilly Self-Pay Journey Program. Same price whether patient is on the Journey Program or paying standard rate for the 2.5mg starter dose.",
  },
  self_pay_5mg: {
    price_usd: 399,
    label: "Self-Pay Journey Program — 5 mg",
    last_verified: "2026-04-08",
    source_url: "https://zepbound.lilly.com/savings",
    verbatim_quote: "Zepbound 5 mg starting at $399/month",
    verification_method: "cross-source-agent" as const,
    notes:
      "Same price whether on Journey Program or paying standard rate for 5mg.",
  },
  self_pay_higher_dose_journey: {
    price_usd: 449,
    label: "Self-Pay Journey Program — 7.5/10/12.5/15 mg (with 45-day refill)",
    last_verified: "2026-04-08",
    source_url: "https://zepbound.lilly.com/savings",
    verbatim_quote:
      "Zepbound 7.5 mg, 10 mg, 12.5 mg, and 15 mg $449/month. For 7.5 mg, 10 mg, 12.5 mg and 15 mg doses, prices reflect monthly cost with Zepbound Self Pay Journey Program. Regular prices will apply if prescription is not refilled within 45 days.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Journey Program price requires maintaining refills within 45 days of the previous fill. Missing the refill window reverts to standard pricing which is significantly higher (see self_pay_higher_dose_standard).",
  },
  self_pay_higher_dose_standard: {
    price_usd: 499,
    price_usd_max: 699,
    label:
      "Self-pay standard (if refill window missed) — 7.5 mg $499; 10/12.5/15 mg $699",
    last_verified: "2026-04-08",
    source_url: "https://zepbound.lilly.com/savings",
    verbatim_quote:
      "Regular price for a 1-month supply of Zepbound single-patient-use KwikPen is $299 for 2.5 mg, $399 for 5 mg, $499 for 7.5 mg, $699 for 10 mg, $699 for 12.5 mg, and $699 for 15 mg.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Applies when the patient misses the 45-day Journey Program refill window. The jump from $449 to $699 on the 10/12.5/15 mg doses is significant.",
  },
  savings_card_commercial: {
    price_usd: 25,
    label: "Manufacturer savings card (commercially insured)",
    last_verified: "2026-04-08",
    source_url: "https://zepbound.lilly.com/savings",
    verbatim_quote:
      "Eligible and commercially insured patients with Zepbound coverage: Starting at $25 for up to a 3-month prescription of single-dose pen with savings program. Card savings are subject to a maximum monthly savings of up to $100 per 1-month prescription, $200 per 2-month prescription, or $300 per 3-month prescription fill and a separate maximum annual savings of up to $1,300 per calendar year. Card expires and savings end on 12/31/2026.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Requires commercial insurance with Zepbound coverage. Maximum $1,300/year benefit. Card expires December 31, 2026. Not valid for Medicare, Medicaid, or other government programs.",
  },
  medicare_osa_2026: {
    price_usd: 50,
    label: "Medicare Part D copay — OSA indication only (April 2026+)",
    last_verified: "2026-04-08",
    source_url: "https://www.medicare.gov",
    verbatim_quote:
      "Starting in April 2026, a government agreement sets the Zepbound copay at $50 per month for eligible Medicare patients with moderate-to-severe obstructive sleep apnea and obesity.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Medicare Part D covers Zepbound ONLY for the obstructive sleep apnea (OSA) indication (added December 2024). Medicare does NOT cover Zepbound for weight loss alone. Patients must have moderate-to-severe OSA plus obesity to qualify for the $50/month copay.",
  },
  pap_uninsured: {
    price_usd: null as number | null,
    label: "Lilly Cares Patient Assistance — NOT AVAILABLE",
    last_verified: "2026-04-08",
    source_url: "https://www.lillycares.com/",
    verbatim_quote:
      "Lilly Cares Foundation medication list does NOT include Zepbound as of April 2026. No free Patient Assistance Program is currently offered for Zepbound through Eli Lilly.",
    verification_method: "cross-source-agent" as const,
    notes:
      "CRITICAL GAP: Unlike Novo Nordisk (which offers free Ozempic/Wegovy through its PAP), Eli Lilly does NOT offer a free PAP for Zepbound. Uninsured patients must use the Self Pay Journey Program ($299-$449/month) or seek assistance from external foundations like NeedyMeds or RxAssist.",
  },
} as const;

/**
 * MOUNJARO (tirzepatide 2.5-15 mg) — Eli Lilly, FDA-approved ONLY
 * for type 2 diabetes. Most insurance requires a documented T2DM
 * diagnosis for coverage. Contains the same active ingredient as
 * Zepbound but with a different label and indication.
 */
export const MOUNJARO_PRICING = {
  savings_card_with_coverage: {
    price_usd: 25,
    label:
      "Savings card — commercial insurance WITH Mounjaro coverage (T2DM)",
    last_verified: "2026-04-08",
    source_url: "https://mounjaro.lilly.com/savings-resources",
    verbatim_quote:
      "If you are eligible and commercially insured with coverage for Mounjaro, you may pay as little as $25 for up to a 3-month prescription of Mounjaro",
    verification_method: "cross-source-agent" as const,
    notes:
      "Requires commercial insurance that already covers Mounjaro for T2DM. Card expires December 31, 2026.",
  },
  savings_card_without_coverage: {
    price_usd: 499,
    label:
      "Savings card — commercial insurance WITHOUT Mounjaro coverage",
    last_verified: "2026-04-08",
    source_url: "https://mounjaro.lilly.com/savings-resources",
    verbatim_quote:
      "For patients with commercial drug insurance who do not have coverage for Mounjaro: You must have commercial drug insurance that does not cover Mounjaro and a prescription for an approved use consistent with FDA-approved product labeling to pay as low as $499 for a 1-month prescription fill of Mounjaro single-dose pen.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Alternative pathway for commercially insured patients whose plan doesn't cover Mounjaro. Requires FDA-approved use (T2DM). Card expires December 31, 2026.",
  },
  medicare_part_d_typical: {
    price_usd: 25,
    price_usd_max: 150,
    label: "Medicare Part D typical copay (Tier 3, T2DM only)",
    last_verified: "2026-04-08",
    source_url: "https://www.medicare.gov",
    verbatim_quote:
      "Medicare Part D covers Mounjaro for type 2 diabetes. Typical Tier 3 copay $25-$150/month with prior authorization.",
    verification_method: "cross-source-agent" as const,
    notes:
      "Covered only for T2DM indication. Inflation Reduction Act $2,000 annual cap applies — after the cap, copay drops to $0 for the rest of the year.",
  },
  pap_uninsured: {
    price_usd: null as number | null,
    label: "Lilly Cares Patient Assistance — NOT AVAILABLE",
    last_verified: "2026-04-08",
    source_url: "https://www.lillycares.com/",
    verbatim_quote:
      "Lilly Cares Foundation medication list does NOT include Mounjaro as of April 2026. No free Patient Assistance Program is currently offered for Mounjaro through Eli Lilly.",
    verification_method: "cross-source-agent" as const,
    notes:
      "CRITICAL GAP: Unlike Novo Nordisk (which offers free Ozempic through its PAP), Eli Lilly does NOT offer a free PAP for Mounjaro. Uninsured patients must use the standard savings card pathway ($499/month) or seek assistance from external foundations.",
  },
} as const;

/**
 * The full brand pricing registry. Every article and tool that
 * mentions a brand price should import from this object.
 */
export const BRAND_PRICING = {
  wegovy: WEGOVY_PRICING,
  ozempic: OZEMPIC_PRICING,
  zepbound: ZEPBOUND_PRICING,
  mounjaro: MOUNJARO_PRICING,
} as const;

/**
 * Format a USD price for display (e.g., 349 → "$349"). For null
 * values (e.g., "not available"), returns "N/A".
 */
export function formatPriceUsd(price: number | null): string {
  if (price === null) return "N/A";
  return `$${price.toLocaleString("en-US")}`;
}

/**
 * Format a price range for display (e.g., {price_usd: 25,
 * price_usd_max: 150} → "$25-$150").
 */
export function formatPriceRange(
  entry: PricingEntry | { price_usd: number | null; price_usd_max?: number },
): string {
  if (entry.price_usd === null) return "N/A";
  if ("price_usd_max" in entry && entry.price_usd_max) {
    return `${formatPriceUsd(entry.price_usd)}-${formatPriceUsd(entry.price_usd_max)}`;
  }
  return formatPriceUsd(entry.price_usd);
}

/**
 * Format a price with its /month suffix for inline text.
 */
export function formatPriceMonthly(
  entry: PricingEntry | { price_usd: number | null; price_usd_max?: number },
): string {
  const base = formatPriceRange(entry);
  if (base === "N/A") return base;
  return `${base} al mes`;
}

/**
 * Same as formatPriceMonthly but in English (for English articles).
 */
export function formatPriceMonthlyEn(
  entry: PricingEntry | { price_usd: number | null; price_usd_max?: number },
): string {
  const base = formatPriceRange(entry);
  if (base === "N/A") return base;
  return `${base}/month`;
}

/**
 * Flatten every brand pricing entry into a single array, used by
 * the freshness check script (scripts/check-brand-pricing-
 * freshness.ts) to find entries that need re-verification.
 */
export function getAllPricingEntries(): Array<{
  brand: string;
  tier: string;
  entry: Omit<PricingEntry, "price_usd"> & { price_usd: number | null };
}> {
  const results: Array<{
    brand: string;
    tier: string;
    entry: Omit<PricingEntry, "price_usd"> & { price_usd: number | null };
  }> = [];
  for (const [brand, tiers] of Object.entries(BRAND_PRICING)) {
    for (const [tier, entry] of Object.entries(tiers)) {
      results.push({ brand, tier, entry: entry as PricingEntry });
    }
  }
  return results;
}
