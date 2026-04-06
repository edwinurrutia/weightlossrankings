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
