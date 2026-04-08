# Pricing Audit + Verifier Workflow

## Why this exists

The cheap regex sweep in `scripts/audit-pricing.ts` runs nightly in CI and flags candidate drift signals against `src/data/providers.json`. The 2026-04-07 run flagged 9 HIGH severity drifts; investigation showed only 1 was a real price change. The other 8 were regex false positives — membership fees, decoy promotional first-month prices, prices for unrelated services on multi-product pages, and navigation banners that didn't reflect the actual GLP-1 monthly cost.

The honest conclusion: regex pattern matching against arbitrary telehealth landing pages cannot reliably extract the right monthly cost. We need a verifier that understands the rendered DOM, can click through intake-gated pricing, and knows the difference between a membership fee and a medication cost.

That verifier is **Chrome MCP**.

## Architecture

```
audit-pricing.ts (cheap regex sweep, runs nightly in CI)
   ↓
src/data/pricing-audit-latest.json (committed snapshot of HIGH/MEDIUM candidates)
   ↓
verify-pricing.ts (interactive CLI, runs locally in a Claude session)
   ↓
For each unverified candidate, prints a Chrome-MCP prompt
   ↓
Chrome-MCP agent navigates → reads DOM → extracts price → returns JSON verdict
   ↓
src/data/pricing-verification-log.json (append-only log of verified prices)
   ↓
Next audit-pricing run reads the log → auto-downgrades verified signals → CI returns to green
```

## Files

| Path | Purpose |
|------|---------|
| `scripts/audit-pricing.ts` | Cheap nightly regex sweep. Reads `providers.json`, extracts candidate prices, classifies severity. Auto-downgrades severity for any provider with a recent verification log entry. Exits 1 on unverified HIGH. |
| `scripts/verify-pricing.ts` | Interactive CLI. Reads the latest audit snapshot + verification log, filters to unverified HIGH/MEDIUM, prints one Chrome-MCP prompt per task. |
| `scripts/lib/verifier-prompt.ts` | Reusable prompt template with explicit instructions about the failure modes the regex hits (membership splits, promo pricing, decoy services, intake-gated pricing). |
| `src/data/pricing-audit-latest.json` | Committed snapshot of the most recent audit run. Auto-written by `audit-pricing.ts`. |
| `src/data/pricing-verification-log.json` | Append-only log of verified prices. Each entry records the slug, verified price, evidence URL + quote, screenshot path, confidence, and verifier notes. |

## Workflow

### Nightly (automated)

1. GitHub Actions runs `npm run audit:pricing`
2. Audit script writes `src/data/pricing-audit-latest.json`
3. If any HIGH severity signal exists that is NOT in the verification log within the 30-day window, CI fails

### Verification (manual, on-demand)

1. CI fails — go look at `pricing-audit-latest.json` to see which providers
2. Run `npm run verify:pricing`
3. The script prints one numbered task per unverified candidate, with:
   - The provider URL
   - The dataset price
   - The regex's extracted price
   - The full Chrome-MCP prompt template
4. For each task, dispatch a Chrome-MCP-enabled Claude agent (in your session) using the prompt
5. The agent navigates to the URL, finds the actual GLP-1 price, returns JSON
6. Append the JSON to the `entries` array in `src/data/pricing-verification-log.json`
7. Re-run `npm run audit:pricing` — the verified signals auto-downgrade and CI returns to green

### Single-provider verification

```bash
npx tsx scripts/verify-pricing.ts --slug mochi-health
```

Useful when you already know which provider needs re-verification and don't want to wait for the full audit.

## Verification entry shape

Each entry in `src/data/pricing-verification-log.json` should match this shape:

```json
{
  "slug": "mochi-health",
  "verified_price_usd": 138,
  "verified_currency": "USD",
  "verified_drug": "compounded-semaglutide",
  "verification_date": "2026-04-08",
  "verification_method": "chrome-mcp",
  "evidence_url": "https://joinmochi.com/pricing",
  "evidence_quote": "Membership $39/month + medication $99/month for compounded semaglutide",
  "confidence": "high",
  "verifier_notes": "Membership + medication split. All-in: $138/month for sema, $238/month for tirz."
}
```

The schema is documented in `src/data/pricing-verification-log.json` itself under `_schema`.

## Downgrade window

Verifications older than 30 days no longer auto-downgrade severity. The window is defined as `VERIFICATION_DOWNGRADE_WINDOW_DAYS` in `scripts/audit-pricing.ts`. Providers re-pricing within that window requires a fresh verification.

## What the Chrome-MCP verifier looks for

The reusable prompt template (`scripts/lib/verifier-prompt.ts`) explicitly warns the agent about the failure modes the regex hits:

1. **Membership + medication splits** — many providers separate a low membership fee (e.g., Mochi's $39) from the medication cost ($99-$249). The TRUE monthly cost is the all-in total.
2. **First-month promo pricing** — many providers advertise "$XX first month then $YY/month". The verified price is the ongoing monthly cost.
3. **Decoy prices for unrelated services** — multi-product telehealth providers show prices for enclomiphene, NAD+, rapamycin, metformin, peptides on the same page. Make sure the price is for the GLP-1, not a decoy.
4. **Navigation banners** — "starting at $XX" banners are often optimistic. Trust the cart/checkout area.
5. **Intake-gated pricing** — some providers don't show pricing until after a 5-10 question intake. Click through (no PII required) until the price is visible.

## Adding new verifiers

If a new failure mode emerges (e.g., a provider hides pricing behind a credit-card-required cart), add it to the warnings section in `scripts/lib/verifier-prompt.ts`. Future Chrome-MCP verifications will see the new warning automatically.
