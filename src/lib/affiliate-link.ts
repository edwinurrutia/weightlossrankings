/**
 * Centralized outbound link builder for provider affiliate URLs.
 *
 * Why this exists: providers' analytics (Google Analytics, Mixpanel,
 * internal dashboards) need to attribute traffic back to us. Even
 * before we sign up for any affiliate program, tagging every outbound
 * link with UTM parameters means:
 *
 *   1. Provider analytics show "weightlossrankings.org" as a real
 *      named referrer instead of "(direct)" or generic "referral"
 *   2. When we approach affiliate managers later we have receipts —
 *      "we sent you N clicks last month from these specific pages"
 *   3. We don't need a code migration when we eventually sign up for
 *      Impact / ShareASale / direct programs — we change ONE file
 *      and every link site-wide picks up the new tracking format
 *
 * EVERY outbound link to a provider's site MUST go through this
 * helper. Do not put bare `affiliate_url` strings in href= attributes.
 */

const UTM_SOURCE = "weightlossrankings";
const UTM_MEDIUM = "referral";

/**
 * Katalys (RevOffers) publisher affiliate ID for the "MEAS Partners
 * LLC / weightlossrankings.org" account. This is a stable account-
 * level identifier — it does NOT rotate, does NOT vary per-offer, and
 * is safe to commit to the repo (it's a public tracking ID, not a
 * secret). Every tracked click needs this value in the aff_id param.
 *
 * Source: app.katalys.com → Settings → Partner ID (also visible in
 * the My Programs table, Traffic Source column).
 */
const KATALYS_AFF_ID = "12086";

/**
 * Katalys (RevOffers) tracking link endpoint. All approved-advertiser
 * clicks go through this host; Katalys then 302s to the advertiser's
 * configured landing page with its own attribution cookies set.
 */
const KATALYS_TRACK_HOST = "https://track.revoffers.com/aff_c";

/**
 * Build a Katalys / RevOffers affiliate tracking URL for a specific
 * advertiser offer. The return value is a fully-formed URL that can
 * be used as a 302 target from our /go/[slug] route handler.
 *
 * Example: buildKatalysRedirectUrl(1286, "homepage", "sprout-health")
 * returns:
 *   https://track.revoffers.com/aff_c
 *     ?offer_id=1286
 *     &aff_id=12086
 *     &source=homepage
 *     &sub1=sprout-health
 *
 * The `source` param maps to the section of our site that generated
 * the click (homepage, review page, compare page, etc.) and is
 * visible in Katalys analytics for per-page performance.
 *
 * The `sub1` param carries the provider slug so that when multiple
 * providers share a source page (e.g., a ranked list on the
 * homepage), we can still distinguish which one converted.
 *
 * Sub2-Sub5 are available on the Katalys side but we don't currently
 * use them. If we want to track position, split-test variant, or
 * similar later, add sub2/sub3 params here without breaking the
 * existing source/sub1 contract.
 */
export function buildKatalysRedirectUrl(
  offerId: number,
  source: string,
  providerSlug: string,
): string {
  const url = new URL(KATALYS_TRACK_HOST);
  url.searchParams.set("offer_id", String(offerId));
  url.searchParams.set("aff_id", KATALYS_AFF_ID);
  url.searchParams.set("source", sanitizeUtm(source) || "go");
  url.searchParams.set("sub1", sanitizeUtm(providerSlug) || "unknown");
  return url.toString();
}

/**
 * If the provider's affiliate_url already has its own tracking
 * parameters that we shouldn't overwrite, list them here. We never
 * touch query keys that already exist on the source URL — we only
 * add the ones that aren't already set. This protects affiliate
 * tracking IDs that are baked into the canonical URL.
 */

export interface BuildOutboundLinkOptions {
  /**
   * Where on our site the link is being rendered. Maps to
   * utm_campaign so we can compare conversion by source page in
   * provider analytics.
   *
   * Examples: "homepage", "ranked-list", "compare-matchup",
   * "review-page", "alternatives-page", "drug-detail", "dose-timeline"
   */
  source: string;
  /**
   * The destination provider's slug. Maps to utm_content so we can
   * tell which provider was clicked even when multiple providers
   * appear on the same source page.
   */
  provider?: string;
  /**
   * 1-indexed position in a list, if applicable. Maps to utm_term —
   * lets us see whether position #1 outperforms position #5 in
   * provider conversion data, not just our internal click data.
   */
  position?: number;
}

/**
 * Append UTM tracking params to an outbound provider URL without
 * clobbering any pre-existing query parameters. Returns the original
 * URL unchanged if it can't be parsed (e.g. mailto:, tel:, or a
 * malformed string).
 *
 * Future affiliate-program adapters (Impact subId, ShareASale
 * afftrack, Rakuten u1, etc.) can be layered on top of this function
 * by mapping the destination hostname to a known network and
 * injecting the network's preferred sub-ID parameter alongside the
 * UTMs. Keeping that logic here means callers never need to know
 * which network a provider belongs to.
 */
export function buildOutboundLink(
  href: string | undefined | null,
  options: BuildOutboundLinkOptions,
): string {
  if (!href || typeof href !== "string") return href ?? "";

  // Don't touch non-http(s) schemes — mailto, tel, anchors, etc.
  if (!/^https?:\/\//i.test(href)) return href;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    // Malformed URL — return unchanged rather than throw at render time
    return href;
  }

  const params = url.searchParams;

  // Never overwrite tracking already on the canonical URL — providers
  // sometimes bake their own affiliate IDs into the link they give us
  // and overwriting those would break attribution on their side.
  if (!params.has("utm_source")) params.set("utm_source", UTM_SOURCE);
  if (!params.has("utm_medium")) params.set("utm_medium", UTM_MEDIUM);
  if (!params.has("utm_campaign")) {
    params.set("utm_campaign", sanitizeUtm(options.source));
  }
  if (options.provider && !params.has("utm_content")) {
    params.set("utm_content", sanitizeUtm(options.provider));
  }
  if (
    typeof options.position === "number" &&
    Number.isFinite(options.position) &&
    options.position > 0 &&
    !params.has("utm_term")
  ) {
    params.set("utm_term", `pos-${Math.floor(options.position)}`);
  }

  return url.toString();
}

/**
 * UTM values must be ASCII-safe and stable. Lowercase, strip
 * everything but [a-z0-9_-], collapse separators, cap length.
 */
function sanitizeUtm(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
