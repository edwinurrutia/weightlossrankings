/**
 * California State Board of Pharmacy scraper — BLOCKED BY CLOUDFLARE TURNSTILE
 *
 * California is the largest single state for compounding pharmacy
 * licensing, and the Department of Consumer Affairs (DCA) license
 * search at https://search.dca.ca.gov publishes the entire register
 * for free. Relevant license types for GLP-1 production:
 *
 *   BD=7200 TP=107  Sterile Compounding (in-state)
 *   BD=7200 TP=110  Non-Resident Sterile Compounding
 *                   (out-of-state pharmacies licensed to ship to CA)
 *   BD=7200 TP=180  Outsourcing Facility (CA's own 503B registry)
 *
 * Together those cover ~1,000-2,000 pharmacies authorized to ship
 * GLP-1 compounds to California residents.
 *
 * THE ACTUAL BLOCKER (discovered after multiple Playwright recon
 * attempts):
 *
 *   The search button (input#srchSubmitHome) is gated behind a
 *   Cloudflare Turnstile challenge. The button is hard-disabled
 *   on page load and the ONLY thing that enables it is this
 *   inline JS callback firing successfully:
 *
 *     function onTurnstileSuccess(token) {
 *       document.getElementById("srchSubmitHome").disabled = false;
 *     }
 *
 *   The challenge is rendered by Cloudflare's turnstile widget
 *   (`<div data-action="search" data-callback="onTurnstileSuccess">`)
 *   and a real browser session has to solve it before the button
 *   becomes clickable. Pressing Enter on the input doesn't work
 *   either — the form rejects submissions without a valid Turnstile
 *   token.
 *
 *   This rules out every reasonable headless scraper approach:
 *     - page.fill() / page.type() / page.press("Enter") → button stays disabled
 *     - direct POST to /results with CSRF token → server rejects
 *       without Turnstile token
 *     - playwright-stealth / undetected-chromedriver → Turnstile
 *       specifically detects automation runtime fingerprints
 *
 * Three legitimate paths forward (none cheap):
 *
 *   PATH A — Manual export sweep (easy, slow, free).
 *     Sit at a real browser, search by single-letter busName
 *     prefix (a, b, c, ..., z) twice (TP=107 and TP=110), copy the
 *     result tables into a CSV, and import via a separate
 *     `import-ca-pharmacies-csv.ts` script. ~52 manual searches,
 *     half a day of clicking. Realistic for a one-time backfill.
 *
 *   PATH B — Cloudflare Turnstile bypass service (~$1 per 1000
 *     solves via 2captcha / anti-captcha / capsolver). Violates
 *     Cloudflare ToS and may earn an IP block from CA DCA. Not
 *     recommended for a regulated content site.
 *
 *   PATH C — Data partnership / public records request to the CA
 *     Board of Pharmacy. Most state boards will provide a data
 *     export to media organizations on request, especially for a
 *     legitimate editorial use case. Slowest path, but produces
 *     the cleanest data and zero legal risk.
 *
 * Other state boards to evaluate after CA:
 *   - Texas State Board of Pharmacy
 *   - Florida Department of Health (Pharmacy)
 *   - New York State Education Department (Office of the Professions)
 *   - Pennsylvania State Board of Pharmacy
 *
 *   Most of them now use the same DCA-style Turnstile gating, so
 *   expect the same blocker pattern. Path A or Path C are the
 *   realistic options state-by-state.
 *
 * For now, /pharmacies content remains powered by:
 *   - The 13 manually-curated entries in src/data/pharmacies.json
 *   - The 86 FDA 503B + 500-800 PCAB imports waiting in
 *     src/data/pharmacies-pending.json (after editorial review)
 *
 * To run anyway (will print this message and exit non-zero):
 *   npx tsx scripts/scrape-ca-pharmacy-board.ts
 */

console.error(
  "California Board of Pharmacy scraper is BLOCKED by Cloudflare\n" +
    "Turnstile — the search button only enables when a real\n" +
    "browser session passes the challenge. See the header comment\n" +
    "for the three legitimate paths forward (manual export sweep,\n" +
    "Turnstile bypass service, or public records request).\n",
);
process.exit(2);
