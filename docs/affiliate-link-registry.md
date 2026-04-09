# Affiliate Link Registry

Single source of truth for every outbound affiliate CTA placement on
weightlossrankings.org. When you add a new placement, update this doc
**and** the `AFFILIATE_SOURCES` constant in `src/lib/affiliate-sources.ts`.

The `source` tag flows through three reporting surfaces:

1. **Internal click logs** (`/api/track-click` beacon + `/go/[slug]`
   server-side redirect) — `source` is logged as `src=<tag>`.
2. **Provider analytics** (Google Analytics, Mixpanel, etc.) — `source`
   is mapped to `utm_campaign=<tag>` so providers see us as a named
   referrer split by placement.
3. **Katalys (RevOffers) reporting** — for Katalys-network providers,
   `source` is appended to the tracking URL as `sub2=<tag>` and the
   list position as `sub3=pos-<n>`. Katalys's own dashboard splits
   payouts by sub-ID, so we can attribute conversions per placement
   directly without reconciling our internal logs against theirs.

## How to add a new placement

1. Pick a stable, lowercase, snake_case identifier (e.g.
   `state_page_alternatives`, not `StatePgAlts`).
2. Add it to `AFFILIATE_SOURCES` in `src/lib/affiliate-sources.ts`.
3. Add a one-line description to `AFFILIATE_SOURCE_DESCRIPTIONS`.
4. Add a row to the table below.
5. Import the constant in your component — never pass a string literal:
   ```tsx
   import { AFFILIATE_SOURCES } from "@/lib/affiliate-sources";
   <CTAButton trackSource={AFFILIATE_SOURCES.HOMEPAGE_TOP_RATED} ... />
   ```

## Active placements

| Source tag | Placement | Rendered by | Position passed? |
|---|---|---|---|
| `homepage_top_rated` | Top Rated section on the homepage — Editor's Pick + 2 runners-up | `src/components/marketing/HomeHeroProviders.tsx` | Yes (1, 2, 3) |
| `homepage_quick_match` | Quick Match interactive widget on the homepage | `src/components/marketing/HomeQuickMatch.tsx` | No |
| `homepage_featured_modal` | Scroll-triggered featured provider modal on the homepage | `src/components/marketing/FeaturedProviderModal.tsx` (via `featured-modal.json`) | No |
| `homepage_sticky_cta` | Mobile sticky CTA bar | `src/components/shared/StickyCTABar.tsx` | No |
| `provider_list` | Generic provider listing tiles (`/providers`, category index) | `src/components/provider/ProviderCard.tsx` | Yes |
| `compare_page` | Compare landing page tile/table CTA | `src/app/compare/page.tsx` | Yes |
| `compare_matchup` | Head-to-head matchup page winner CTA (`/compare/hers-vs-ro` etc.) | `src/app/compare/[a]-vs-[b]/page.tsx` | No |
| `state_page` | Per-state ranking page provider tiles (`/states/[state]`) | `src/app/states/[state]/page.tsx` | Yes |
| `state_page_undisclosed` | Per-state "Coverage not disclosed" subsection | `src/app/states/[state]/page.tsx` | No |
| `drug_detail` | Drug detail page (`/semaglutide`, `/tirzepatide`, etc.) | `src/app/[drug]/page.tsx` | Yes |
| `drug_cheapest` | Cheapest-providers list for a drug+form combo | `src/app/[drug]/page.tsx` | Yes |
| `research_article` | Research / scientific deep-dive article CTA at article end | `src/app/research/[slug]/page.tsx` | No |
| `research_index` | Research index page featured-article CTA | `src/app/research/page.tsx` | No |
| `blog_post` | Blog post CTA | `src/app/blog/[slug]/page.tsx` | No |
| `tool_result` | Calculator / interactive tool result screen — recommended-provider CTA | Various tool pages under `src/app/` | No |
| `tool_inline` | Inline CTA within a tool's body content | Various tool pages under `src/app/` | No |
| `unknown` | Fallback — should never appear in production analytics; investigate any clicks tagged with this | n/a | n/a |

## Reading the data

- **Internal logs**: `/admin/clicks` (or via the KV `click:*` keys)
  groups by `src`. Use this for unblocked, unsampled raw click counts.
- **GA / provider analytics**: filter by `utm_campaign=<source tag>`.
  Use this when you want session-level engagement (bounce, scroll
  depth, conversion to provider signup).
- **Katalys dashboard**: program detail page → Reports → split by
  `sub2`. The `sub3` value (`pos-1`, `pos-2`, ...) lets you check
  whether top-of-list slots actually convert better, or whether the
  Editor's Pick label matters more than position alone.

## When to retire a placement

If a `source` tag stops appearing in any component, remove it from
`AFFILIATE_SOURCES`, the descriptions map, and this table. Don't leave
zombie tags — historical click data already lives in the logs and
doesn't need a code-side anchor to remain queryable.
