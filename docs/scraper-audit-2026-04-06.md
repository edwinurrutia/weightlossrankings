# Pricing Scraper Audit — 2026-04-06

**Auditor:** automated cohort selection + manual methodology
**Dataset:** `src/data/providers.json` (80 providers)
**Goal:** Validate that displayed prices in providers.json still match what is live on each provider's website. Stale or incorrect prices are an integrity issue — they drive ranking and conversion CTAs.

---

## 1. Audit Cohort (10 providers)

A diverse mix of name-brand telehealth, compounding-pharmacy direct providers, and one
non-GLP-1 lifestyle product. Picked for diversity of business model, price tier, and
checkout-flow style.

| # | Slug | Name | Website | Dataset price (lowest monthly) | What they sell |
|---|---|---|---|---|---|
| 1 | `coreage-rx` | CoreAge Rx | https://www.coreagerx.com | $149 | Compounded semaglutide + tirzepatide, direct-to-consumer |
| 2 | `henry-meds` | Henry Meds | https://henrymeds.com | $297 | Compounded semaglutide + tirzepatide, telehealth + pharmacy |
| 3 | `hims` | Hims | https://www.hims.com | $199 | Compounded semaglutide (large-brand telehealth) |
| 4 | `mochi-health` | Mochi Health | https://joinmochi.com | $99 | Insurance-billed brand GLP-1s + compounded |
| 5 | `ro` | Ro | https://ro.co | (no monthly_cost) | Brand GLP-1s (Wegovy/Zepbound) via insurance |
| 6 | `eden` | Eden | https://www.eden.com | $239 | Compounded semaglutide + tirzepatide |
| 7 | `noom-med` | Noom Med | https://www.noom.com/med | $99 | Brand GLP-1s + lifestyle program |
| 8 | `lemonaid-health` | Lemonaid Health | https://www.lemonaidhealth.com | $30 | Brand GLP-1s, doctor visit pricing |
| 9 | `reflexmd` | ReflexMD | https://www.reflexmd.com | $497 | Compounded tirzepatide (premium tier) |
| 10 | `weightrx` | WeightRx | https://weightrx.com | $99 | Compounded semaglutide (low-cost compounding pharmacy) |

This cohort spans price tiers from $30 (Lemonaid doctor visit) up to $497 (ReflexMD
compounded tirzepatide), and covers the four main business models we list:
direct-to-consumer compounding pharmacy, brand-name telehealth, insurance-billed brand,
and lifestyle-bundled GLP-1.

---

## 2. Manual Audit Methodology

For each cohort entry above, a human auditor should:

1. **Open the website** (the URL in the table above).
2. **Find the pricing surface.** Most provider sites expose pricing in one of:
   - a top-nav "Pricing" or "Plans" link
   - a "Get Started" / "Start Now" CTA that lands on a checkout step revealing price
   - a "How it works" or "Treatments" page
   - a programmatic checkout flow that requires entering ZIP / DOB before showing price
3. **Note the displayed monthly price for the lowest-dose semaglutide offering** (or
   tirzepatide if the provider only offers tirzepatide). This is the price we should
   be quoting in our ranking, because it's the entry-level price a real customer sees.
4. **Compare against the dataset price** in the table above.
5. **Flag drift** using these thresholds:
   - **HIGH severity:** delta > $20 OR > 15% in either direction → update immediately
   - **MEDIUM severity:** delta > $10 OR > 8% → review within a week
   - **OK:** within $10 and 8%
   - **UNKNOWN:** the auditor could not find a clear public price (bot wall, JS-rendered
     checkout, hidden behind ZIP gate). Mark for manual followup with screenshot.
6. **Capture evidence:** URL of the specific page where the price was found, and a
   1-line quote of the surrounding context. This goes into a followup PR if a price
   needs to be updated in `src/data/providers.json`.

**Common gotchas to watch for:**

- **Promo / first-month-only pricing.** Many providers headline a $49 or $99 first-month
  price that reverts to $199–$299 after month 1. We want the *recurring* monthly price,
  not the promo. If the page leads with a promo, scroll/dig until you find the
  thereafter price.
- **Multi-month bundles.** "$897 for 3 months" is $299/mo, not $897. Always normalize.
- **Insurance-billed providers.** Ro, Noom Med, Lemonaid all bill insurance for brand
  GLP-1s, so the "price" we display is the cash/membership fee, not the drug cost.
- **Dose-dependent pricing.** CoreAge Rx, Eden, Henry Meds tier their pricing by dose
  (0.25mg → 2.5mg). We always quote the *lowest dose* (entry-level).

---

## 3. Automated Audit Script

The real deliverable is `scripts/audit-pricing.ts`, which automates exactly the
manual process above for any subset of providers.

### How to run

```bash
# Default: random sample of 10 providers (browser fallback enabled)
npm run audit:pricing

# Larger sample
npm run audit:pricing -- --sample 20

# Audit every provider in the dataset
npm run audit:pricing -- --all

# Audit a single provider
npm run audit:pricing -- --slug hims

# Static fetch only (no Playwright — faster but misses JS-rendered sites)
npm run audit:pricing -- --no-browser
```

### What the script does

1. Loads `src/data/providers.json`.
2. Picks a random sample (or `--all`, or `--slug`).
3. For each provider:
   - **Static fetch** the homepage with a Chrome desktop User-Agent.
   - If static returns nothing useful, falls back to **Playwright** (Chromium headless).
   - Extracts price candidates using a stack of three heuristics:
     1. **JSON-LD** product `price` / `lowPrice` fields (highest signal — when present)
     2. **`$X / month` regex** patterns (`$199/mo`, `$199 per month`, etc.)
     3. **Broad `$XX` sweep** as a last-resort fallback
   - Picks the **mode** (most-common candidate) as the extracted price; falls back to
     the median when no value repeats.
4. Compares against `pricing[].monthly_cost` from providers.json (or `promo_price` if
   no monthly_cost is set). Uses the *lowest* monthly_cost — that's the entry-level
   "starting at" price we display in the ranking card.
5. Writes a JSON report to `/tmp/pricing-audit-{ISO-date}.json` and prints a tabular
   summary to stdout.

### Severity classification

Identical to the manual rules above:

| Severity | Threshold | Action |
|---|---|---|
| **HIGH** | delta > $20 OR > 15% | Update providers.json this week — open a followup PR immediately |
| **MEDIUM** | delta > $10 OR > 8% | Review within a week, may be promo / dose mismatch |
| **OK** | within $10 and 8% | No action |
| **UNKNOWN** | extraction failed | Add to manual followup queue (run with `--slug` and inspect) |

### Robustness features

- **30s hard timeout per provider** so a single hung site never blocks the run
- **5s navigation timeout** for the Playwright `goto`
- **Try/catch around every provider** — exceptions are captured into the result, never
  crash the run
- **Reuses Chrome 122 desktop UA** (same as `scrape-providers.ts`)
- **Tiny politeness delay** between providers (400ms) so we don't hammer any host
- **Exit code 1** when any HIGH severity drift is detected — drop into CI as a nightly
  cron and it will fail loudly when prices drift

### Output structure (JSON)

```json
{
  "runDate": "2026-04-06T12:34:56.789Z",
  "providersAudited": 10,
  "results": [
    {
      "slug": "hims",
      "name": "Hims",
      "url": "https://www.hims.com",
      "datasetPrice": 199,
      "extractedPrice": 199,
      "candidates": [199, 199, 249, 199],
      "deltaUsd": 0,
      "deltaPct": 0,
      "severity": "OK",
      "evidence": "source=per-month-pattern, 4 candidates, mode/median=$199"
    }
  ],
  "summary": { "high": 0, "medium": 1, "ok": 8, "unknown": 1 }
}
```

---

## 4. Recommended Cadence

- **Weekly cron:** `npm run audit:pricing -- --all` on Sundays at 02:00 UTC. Send
  Slack alert on exit code 1.
- **Pre-deploy hook:** `npm run audit:pricing -- --sample 20` as a non-blocking check
  before any homepage change ships.
- **Quarterly full audit:** human-driven manual cohort audit (this document) to catch
  the things the regex stack misses — namely promo-vs-recurring drift, dose mismatches,
  and providers whose prices are gated behind ZIP/DOB checkout flows.

---

## 5. Known Limitations

The script's heuristics will *not* catch:

1. **Promo-vs-recurring drift.** If a provider rewords "$49 first month, $199 thereafter"
   to "$49 / month", the regex will pick up $49 and flag drift even though the recurring
   price is unchanged. Manual review required.
2. **Checkout-gated pricing.** Providers like LifeMD and Strive Pharmacy hide their
   monthly price behind a multi-step intake (ZIP → DOB → BMI → … → price). Playwright
   can't navigate that without a per-provider script. These will surface as `UNKNOWN`.
3. **Bot walls.** Cloudflare-protected sites (some compounding pharmacies) return 403
   to both static fetch and headless Chromium. These also surface as `UNKNOWN`.
4. **Multi-currency / regional pricing.** All extraction assumes USD.
5. **Per-dose tiered pricing.** The script returns one extracted price; if a provider
   shows a $149/$199/$249/$299 tier ladder, we'll flag the mode (probably one of the
   middle values), not the entry-level price. The dataset's `min(monthly_cost)` rule
   handles this on the dataset side, but the comparison can still false-positive.

For all of the above, an `UNKNOWN` or `MEDIUM` flag should trigger manual followup,
not an automated providers.json edit. **The script never writes to providers.json.**
That's intentional — pricing edits go through human review every time.

---

## 6. What was NOT done in this task

- The script was authored but **not** executed against live provider sites in this
  sandbox (no guarantee of outbound network access). It is ready to run via
  `npm run audit:pricing` on any environment with internet + Playwright installed.
- `src/data/providers.json` was **not** modified. This task is audit-only.
- No prices were updated. Any drift surfaced by the first real run should land in a
  separate followup PR with manual verification.
