/**
 * Reusable Chrome MCP prompt template for verifying a single
 * provider's GLP-1 pricing.
 *
 * The verifier CLI (scripts/verify-pricing.ts) takes each HIGH/MEDIUM
 * candidate from the regex audit and produces a structured prompt
 * that can be handed to a Chrome MCP agent (Claude with the
 * mcp__claude-in-chrome__* tools loaded). The agent navigates to the
 * provider's pricing page, locates the GLP-1 monthly cost (handling
 * JS-rendered pages, intake-gated pricing, membership + medication
 * splits, and decoy prices for unrelated services on the same page),
 * and returns a structured verdict.
 *
 * The prompt is intentionally explicit about the failure modes the
 * regex audit hits, so the verifier knows what to look out for:
 *   - Membership fees treated as the GLP-1 price (e.g., Mochi's $39)
 *   - First-month promo prices treated as ongoing monthly cost
 *   - Prices for unrelated services (enclomiphene, NAD+, rapamycin,
 *     metformin) on multi-product pages
 *   - Navigation banner prices that don't reflect the real cart
 *   - Prices behind a quiz/intake form
 */

export interface VerifierTaskInput {
  slug: string;
  name: string;
  url: string;
  datasetPrice: number | null;
  extractedPrice: number | null;
  candidates: number[];
  evidence: string;
  drug?: string;
}

export function buildVerifierPrompt(task: VerifierTaskInput): string {
  const drugLabel = task.drug ?? "compounded semaglutide or tirzepatide";
  const datasetPriceStr =
    task.datasetPrice !== null ? `$${task.datasetPrice}/month` : "(not set)";
  const extractedPriceStr =
    task.extractedPrice !== null ? `$${task.extractedPrice}/month` : "(none)";
  const candidatesStr = task.candidates.length
    ? task.candidates.map((c) => `$${c}`).join(", ")
    : "(none)";

  return `You are verifying the live pricing for a single GLP-1 telehealth provider. Use the Chrome MCP tools (mcp__claude-in-chrome__*) to navigate to the URL and find the actual monthly cost.

PROVIDER: ${task.name}
SLUG: ${task.slug}
URL: ${task.url}
DRUG TO PRICE: ${drugLabel}
WHAT WE CURRENTLY SHOW: ${datasetPriceStr}
WHAT THE REGEX EXTRACTED: ${extractedPriceStr}
ALL REGEX CANDIDATES: ${candidatesStr}

REGEX EVIDENCE: ${task.evidence}

YOUR JOB:
1. Navigate to the URL with mcp__claude-in-chrome__navigate
2. Read the rendered page text with mcp__claude-in-chrome__get_page_text
3. If pricing is gated behind a quiz/intake form, click through ONLY enough screens to see the actual GLP-1 pricing — do NOT submit personal info or check out
4. Find the actual monthly cost for ${drugLabel}
5. Take a screenshot of the pricing area with mcp__claude-in-chrome__computer
6. Return a structured JSON verdict

WATCH OUT FOR THESE COMMON FAILURE MODES (the regex hits these all the time):
- MEMBERSHIP + MEDICATION SPLITS: many providers separate a low membership fee (e.g., $39/mo) from the medication cost (e.g., $99-$249/mo). The TRUE monthly cost is membership + medication. Report both separately AND the all-in total.
- FIRST-MONTH PROMO PRICING: many providers advertise "$XX first month then $YY/month". The verified price is the ONGOING monthly cost ($YY), not the promo.
- DECOY PRICES FOR UNRELATED SERVICES: multi-product telehealth providers often show prices for enclomiphene, NAD+, rapamycin, metformin, peptides, hair loss, etc. on the same page. Make sure the price you report is for ${drugLabel}, NOT one of these decoys.
- NAVIGATION BANNERS: a "starting at $XX" banner at the top is often optimistic and doesn't reflect the actual cart total. Trust the cart/checkout area over the marketing banner.
- INTAKE-GATED PRICING: some providers don't show the price until after a 5-10 question intake. Click through (no PII required) until you see the price, then report.

RETURN THIS EXACT JSON SHAPE (no markdown, just valid JSON):
{
  "slug": "${task.slug}",
  "verified": true | false,
  "verified_price_usd": <number — the all-in monthly cost> | null,
  "verified_currency": "USD",
  "verified_drug": "compounded-semaglutide" | "compounded-tirzepatide" | "brand-wegovy" | "brand-zepbound" | "brand-ozempic" | "brand-mounjaro",
  "evidence_url": "<the exact URL where the price was visible>",
  "evidence_quote": "<the exact text from the page that shows the price, verbatim>",
  "screenshot_path": "<path returned by gif_creator or computer screenshot>",
  "confidence": "high" | "medium" | "low",
  "verifier_notes": "<any caveats — membership split, promo, intake-gated, etc.>"
}

If you genuinely cannot find the price (auth wall, broken page, or the provider is no longer offering the drug), set verified: false and explain in verifier_notes.

KEEP IT FAST: don't explore the site beyond what's needed to find the price. Total Chrome MCP work per provider should take 1-3 minutes.`;
}
