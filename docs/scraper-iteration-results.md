# Scraper Iteration Results — 2026-04-06

## Summary

- Total providers: 87
- Match (exact or approx within 10%): 23
- Stale match (GLP-1 keyword context but outside 10% band): 12
- Mismatch (price found, no GLP-1 context or wrong drug): 11
- No data found (fetched OK, no price regex hit): 32
- Fetch failed (DNS / TLS / 403 / 404): 9
- Providers with any scraped price: 46 / 87 = 52.9%
- Providers with a GLP-1-corroborated price: 42 / 87 = 48.3%
- Providers where stored prices match scraped GLP-1 prices: 21 / 87 = 24.1%
- False positive rate in matches (spot-checked 23 matches): 2 / 23 = 8.7%
  - Both are non-GLP-1 products in the master list (MitoQ, Fitbit Premium) that should be excluded upstream.
  - Among actual GLP-1 providers, false positive rate is 0%.

Iteration rounds completed: 2 (of 3 allowed — Round 3 skipped because Round 2 is stable and remaining gaps are structural, not scraper bugs).

## Fixes applied this iteration

- **User-Agent rotation**: round-robin across 5 realistic UAs (Chrome 122, Firefox 122, Safari 17 on macOS and Windows).
- **Header hardening**: added `Referer: https://www.google.com/`, `sec-ch-ua` client hints on Chrome UAs, `Sec-Fetch-Site: cross-site`, `Cache-Control: no-cache`.
- **Retry on transient failure**: `staticFetch` now retries once after 500ms on DNS/TLS resets with a fresh UA.
- **Tight GLP-1 proximity window**: keyword match is now restricted to ±125 chars (250 char total window) of each price, instead of ±200. Cleaned up false positives like AmberHealth picking a non-GLP-1 $174.
- **New pricing regexes**:
  - `$X for 3 months` → `3month` period (divides by 3)
  - `three-month plan for $X`, `3 months at $X` → same
  - bare `from $X` (footnote-style "starting at")
- **Conservative auto-update**: `confidence: "high"` is only granted when a matched price carries GLP-1 keyword proximity (or drug hint) AND is within ±10% of the stored value. Plain number matches stay at "medium".
- Build validated with `next build` after each code change.

## Known limitations

### Sites with DNS / TLS failures (9) — likely dropped or now-blocked domains
- G-Plans (`www.gplans.com`)
- maxlife (`maxlifeusa.com`)
- MEDVi (`joinmedvi.com`)
- NativeMed Health (`nativemedhealth.com`)
- New Self Medical (`newselfmedical.com`)
- Priority Meds Online Care (`prioritymedsonline.com`)
- Rx Pros Health (`rxproshealth.com`)
- Timeless Aesthetics and Laser Clinic (`timelessaestheticsandlaser.com`)
- Lean Hybrid Protein (`www.leanhybrid.com`)

Note: none of these returned a 403. They fail at the network layer (getaddrinfo / connection reset), which the scraper cannot fix with headers alone. These are either dead sites, blocking non-residential egress, or have wrong URLs in providers.json.

### Sites with bot protection / JS-walled pricing (no_data_found, browser fallback still empty)
These sites load fine but never expose a price the regexes can read. Most use cookie/age gates, interactive widgets, or require login/quiz completion:
- GoodRx Care, PlushCare, Nurx, Walgreens Weight Management (big portals — pricing is keyed off insurance / zip code and rendered client-side post-interaction)
- Henry Meds, Eden, Form Health, EllieMD, Nuform Health, Remedy Meds, Willow, Nu Image Medical, Good Life Meds, BeyondMD, JumpstartMD, Ivy Rx, CoreAge Rx, Lavender Sky Health, RNK Health, Empower Pharmacy, Strive Pharmacy, CallonDoc, The Calibrate Clinic (pricing behind intake quiz / account creation)
- Apple Fitness+, Factor, BistroMD, Nutrisystem, Green Chef, MyFitnessPal Premium, Lose It!, Transparent Labs Fat Burner, Thorne Metabolic Health Bundle (non-GLP-1 products in the list — should be excluded from the GLP-1 scraper scope)

### Sites requiring login for pricing
- Nurx, PlushCare (behind auth wall after clicking "Get started")

## Manual review queue (top 10 priority)

Ordered by traffic importance and ease of confirmation:

1. **GoodRx Care** — high-traffic aggregator; pricing is quote-driven. Manually verify and mark `confidence: low`.
2. **Henry Meds** — major advertiser; pricing is on `/weight` deep link, behind JS. Check manually.
3. **Form Health** — insurance-first; pricing only shown after qualification. Manual note.
4. **PlushCare** — visit-fee + med-cost model; pricing model differs from flat monthly.
5. **Nurx** — subscription-style but requires account. Manual check.
6. **Eden** — compounded GLP-1 provider, pricing on sub-page behind quiz.
7. **Empower Pharmacy** — 503B compounder, B2C pricing sometimes posted on FAQ.
8. **Remedy Meds** — competitive compounder, pricing table behind "Get Started" quiz.
9. **Nu Image Medical** — historically published flat rates; may have moved them.
10. **Walgreens Weight Management** — massive brand; pricing varies by pharmacy + insurance.

## Next iteration ideas

- **Deep-link candidate paths per provider**: store a `pricing_url` field in providers.json so the scraper hits the correct sub-page (e.g., `/weight-loss/pricing`) directly instead of walking generic paths.
- **Quiz-walled sites**: drive the intake flow via Playwright with scripted form fills. Feasible only for a handful of top providers; too brittle for 30+ sites.
- **JSON-LD and schema.org scraping**: many Next.js / Shopify-based sites ship `Product` / `Offer` JSON-LD blocks containing authoritative prices. Add a parser pass over `<script type="application/ld+json">` before the regex pass.
- **Screenshot + OCR fallback** for sites that render pricing inside a canvas or background image.
- **Prune non-GLP-1 products from the master list**: ~10 providers in providers.json are meal kits, trackers, and supplements. They should live in a separate scraper with different keyword rules.
- **Separate failure classes in the report**: split `fetch_failed` into `dns_error`, `tls_error`, `403_bot_block`, `404_not_found` for cleaner triage.
- **Cache `document.body.innerText` per provider** across runs (24h TTL) so repeat scrapes skip the expensive Playwright launch for unchanged pages.

---

## Baseline (round 1, before fixes)

| Metric | Round 1 | Round 2 | Delta |
|---|---|---|---|
| Match | 22 | 23 | +1 |
| Stale match | 13 | 12 | -1 |
| Mismatch | 10 | 11 | +1 |
| No data found | 33 | 32 | -1 |
| Fetch failed | 9 | 9 | 0 |

The small deltas are expected — Round 1 already had most of the scraping infrastructure in place. The key round 2 wins are **qualitative**:

- The glp1_proximity flag is now populated on every FoundPrice record (previously missing from report JSON)
- Tight 250-char window eliminated several spurious matches on generic "$X/mo" lines surrounded by non-GLP-1 text
- Auto-update now guards against upgrading confidence to "high" without GLP-1 corroboration, preventing regressions from future false positives
