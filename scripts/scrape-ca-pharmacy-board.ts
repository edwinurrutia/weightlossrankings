/**
 * California State Board of Pharmacy scraper — STUB
 *
 * California is the largest single state for compounding pharmacy
 * licensing, and the Department of Consumer Affairs (DCA) license
 * search at https://search.dca.ca.gov publishes the entire register
 * for free. The relevant license types for GLP-1 production are:
 *
 *   BD=7200 TP=107  Sterile Compounding (in-state)
 *   BD=7200 TP=110  Non-Resident Sterile Compounding
 *                   (out-of-state pharmacies licensed to ship to CA)
 *   BD=7200 TP=180  Outsourcing Facility (CA's own 503B registry)
 *
 * Sterile Compounding and Non-Resident Sterile Compounding together
 * cover roughly the entire universe of pharmacies authorized to
 * produce GLP-1 compounds for California residents — easily
 * 1000-2000 pharmacies depending on the day.
 *
 * Why this scraper is a stub instead of working code:
 *
 *   1. The form has a CSRF token (csrfToken hidden input) plus
 *      cfAction=search and cfMode=managed parameters that signal
 *      this is a ColdFusion managed form. Replaying the POST
 *      directly with curl/fetch + a freshly-parsed CSRF token
 *      returns the same landing page rather than results — the
 *      server requires session state we haven't reproduced.
 *
 *   2. The submit button (input#srchSubmitHome) is JS-disabled by
 *      default. It only enables after the form's onChange listeners
 *      detect valid input. Playwright's page.fill() sets the value
 *      but does not fire the same input/change events the validator
 *      listens for, so the button stays disabled and click() times
 *      out. Need to call page.type() with delay or dispatch a real
 *      InputEvent.
 *
 *   3. Empty / wildcard search is not supported. The form requires
 *      at least one filter (busName prefix, license number, etc.).
 *      To get all entries we'd iterate by single-letter prefix
 *      (busName=a, busName=b, ...) and dedupe by license number.
 *      26 queries per license type × 2 license types = ~52 queries.
 *
 * Path forward when this becomes a priority:
 *
 *   1. Use Playwright with page.type() (not fill) to trigger the
 *      JS validators that enable the submit button.
 *   2. Iterate through busName prefixes a-z for both TP=107 and
 *      TP=110.
 *   3. Parse the result table (need to inspect the rendered HTML
 *      structure once a search actually returns).
 *   4. Dedupe by license number (CA pharmacies have stable license
 *      IDs that survive across both license-type searches).
 *   5. Append to pharmacies-pending.json with confidence=low.
 *
 * Other state boards to scrape after CA (in priority order):
 *   - Texas State Board of Pharmacy
 *   - Florida Department of Health (Pharmacy)
 *   - New York State Education Department (Office of the Professions)
 *   - Pennsylvania State Board of Pharmacy
 *
 * For now, /pharmacies content is powered by the FDA 503B import
 * (86 entries in pharmacies-pending.json) plus the 13 manually-
 * curated entries in pharmacies.json.
 *
 * To run anyway (will print this message and exit non-zero):
 *   npx tsx scripts/scrape-ca-pharmacy-board.ts
 */

console.error(
  "California Board of Pharmacy scraper is a documented stub —\n" +
    "see header comment for the ColdFusion form / JS-validator\n" +
    "challenges. The path forward is also documented inline.\n",
);
process.exit(2);
