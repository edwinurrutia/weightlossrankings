/**
 * Single source of truth for every `source` tag we pass into outbound
 * affiliate links. Keeping these in one constant means:
 *
 *   1. We can grep one file to find every placement of a CTA, instead
 *      of hunting through dozens of components for stringly-typed
 *      `trackSource="..."` props.
 *   2. Renaming a placement (e.g. when we redesign a section) only
 *      requires updating one entry here — TypeScript will surface
 *      every component that needs to change.
 *   3. The companion doc at `docs/affiliate-link-registry.md` reads
 *      from this constant so the human-readable table never drifts
 *      from the code.
 *
 * When you add a new outbound CTA placement, add it here FIRST, then
 * import the constant in the rendering component. Do not pass raw
 * string literals — the linter rule (and TS narrowing on the type
 * below) will reject them.
 */

export const AFFILIATE_SOURCES = {
  // Homepage placements
  HOMEPAGE_TOP_RATED: "homepage_top_rated",
  HOMEPAGE_QUICK_MATCH: "homepage_quick_match",
  HOMEPAGE_FEATURED_MODAL: "homepage_featured_modal",
  HOMEPAGE_STICKY_CTA: "homepage_sticky_cta",

  // Provider listing / comparison surfaces
  PROVIDER_LIST: "provider_list",
  COMPARE_PAGE: "compare_page",
  COMPARE_MATCHUP: "compare_matchup",

  // State / geography pages
  STATE_PAGE: "state_page",
  STATE_PAGE_UNDISCLOSED: "state_page_undisclosed",

  // Drug-specific pages
  DRUG_DETAIL: "drug_detail",
  DRUG_CHEAPEST: "drug_cheapest",

  // Editorial / research / blog
  RESEARCH_ARTICLE: "research_article",
  RESEARCH_INDEX: "research_index",
  BLOG_POST: "blog_post",

  // Tools (calculators, matchers, etc.)
  TOOL_RESULT: "tool_result",
  TOOL_INLINE: "tool_inline",

  // Generic / fallback — only use when none of the above apply
  UNKNOWN: "unknown",
} as const;

export type AffiliateSource =
  (typeof AFFILIATE_SOURCES)[keyof typeof AFFILIATE_SOURCES];

/**
 * Human-readable description of where each source tag is rendered.
 * Used by `docs/affiliate-link-registry.md` and any internal admin
 * dashboard that wants to label clicks by placement.
 */
export const AFFILIATE_SOURCE_DESCRIPTIONS: Record<AffiliateSource, string> = {
  homepage_top_rated:
    "Top Rated section on the homepage — Editor's Pick + 2 runners-up",
  homepage_quick_match:
    "Quick Match interactive widget on the homepage — surfaced after the user answers the matcher questions",
  homepage_featured_modal:
    "Featured-provider scroll-triggered modal on the homepage",
  homepage_sticky_cta:
    "Mobile sticky CTA bar pinned to the bottom of the homepage",
  provider_list:
    "Generic provider listing tiles (e.g. /providers, category index)",
  compare_page: "Compare landing page tile or table CTA",
  compare_matchup:
    "Head-to-head matchup page (e.g. /compare/hers-vs-ro), winner CTA",
  state_page:
    "Per-state ranking page (e.g. /states/ca) — provider tiles in main grid",
  state_page_undisclosed:
    "Per-state page — providers whose state list is gated behind signup",
  drug_detail:
    "Drug detail page (e.g. /semaglutide, /tirzepatide) — provider tiles",
  drug_cheapest:
    "Drug-and-form cheapest-providers list (e.g. compounded semaglutide)",
  research_article:
    "Research / scientific deep-dive article CTA at end of article body",
  research_index: "Research index page — featured-article CTA",
  blog_post: "Blog post CTA — secondary editorial surface",
  tool_result:
    "Calculator / interactive tool result screen — recommended-provider CTA",
  tool_inline: "Inline CTA within a tool's body content",
  unknown:
    "Fallback — should never appear in production analytics; investigate any clicks tagged with this",
};
