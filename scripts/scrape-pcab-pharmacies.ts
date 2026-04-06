/**
 * PCAB / APC Compounding Pharmacy Locator scraper — STUB
 *
 * The Alliance for Pharmacy Compounding's "Find a Compounder" page at
 * https://a4pc.org/find-a-compounder embeds a third-party locator
 * widget from Bullseye Locations (https://www.bullseyelocations.com)
 * via an iframe at:
 *
 *   https://iacprx.bullseyelocations.com/pages/compounders?f=1
 *
 * This source is on our pharmacy data roadmap because PCAB
 * accreditation is the most respected 503A quality signal in the
 * industry, and the locator covers ~1,000 accredited compounding
 * pharmacies — roughly 10× the FDA 503B registry.
 *
 * Why this scraper is a stub instead of working code:
 *
 * The Bullseye widget is an ASP.NET WebForms application with all of
 * the legacy Microsoft baggage that implies:
 *
 *   1. NO JSON API. Search results are not exposed via a REST or
 *      GraphQL endpoint we can hit directly with curl. The widget
 *      uses ASP.NET PostBack: every search is a POST that includes
 *      __VIEWSTATE, __EVENTVALIDATION, __VIEWSTATEGENERATOR, and
 *      other server-encrypted form state. Replicating that
 *      programmatically requires parsing those tokens from a fresh
 *      page load on every search.
 *
 *   2. GEO-ONLY SEARCH. There is no "list all locations" mode in the
 *      public widget. Every search requires a city/state/ZIP plus a
 *      radius (max 200 miles). To cover the entire United States we
 *      would need to iterate through ~20 anchor cities with 200mi
 *      radius each and dedupe the overlapping results.
 *
 *   3. WEBFORMS POSTBACK COMPLEXITY. The visible search button does
 *      not submit a normal form — it's an ASP.NET LinkButton that
 *      triggers a __doPostBack() JavaScript call which serializes
 *      the form state and POSTs back to the same URL with a
 *      __EVENTTARGET parameter. Reproducing this in a non-browser
 *      environment is fragile because the encrypted state changes
 *      on every page load.
 *
 *   4. CLOUDFLARE BOT CHALLENGE. The Bullseye host sits behind
 *      Cloudflare and serves a JS challenge to non-browser clients.
 *      Direct curl gets the challenge HTML rather than the locator
 *      page.
 *
 * Two paths forward (pick one in a focused follow-up session):
 *
 *   Path A — Playwright with anchor-city iteration. Launch Chromium,
 *   navigate to the locator iframe, fill the city/state field with
 *   each of ~20 anchor cities (NYC, Boston, DC, Atlanta, Miami,
 *   Charlotte, Detroit, Chicago, Memphis, New Orleans, Houston,
 *   Dallas, Denver, Phoenix, SLC, LA, SF, Seattle, Minneapolis,
 *   Kansas City), select 200mi radius, click search, wait for
 *   .location elements to render, extract each pharmacy's name +
 *   address + phone + website + distance, then dedupe by
 *   normalized name+address. Estimated: ~30 minutes of dev work
 *   plus a few minutes per scraper run.
 *
 *   Path B — Reverse-engineer Bullseye's XHR. Find the exact POST
 *   payload the widget sends after the user clicks search, replay
 *   it directly with fetch (including the VIEWSTATE tokens parsed
 *   from a fresh page load), and parse the resulting HTML fragment
 *   that the widget injects back into the page. Faster per run but
 *   more brittle to upstream changes.
 *
 * Recommended: Path A. Slower but much more resilient.
 *
 * For now, /pharmacies content remains powered by:
 *   - The 13 manually-curated entries in src/data/pharmacies.json
 *   - The 86 FDA 503B imports waiting in src/data/pharmacies-pending.json
 *
 * To run anyway (will print this message and exit non-zero):
 *   npx tsx scripts/scrape-pcab-pharmacies.ts
 */

console.error(
  "PCAB scraper is a documented stub — see header comment for the\n" +
    "Bullseye Locations / ASP.NET WebForms challenge. Two implementation\n" +
    "paths are described inline. Pick one in a focused follow-up session.\n",
);
process.exit(2);
