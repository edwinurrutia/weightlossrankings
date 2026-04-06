# UI/UX Audit — weightlossrankings.org
**Date:** 2026-04-06
**Auditor:** Claude (Opus 4.6)
**Method:** Live page inspection (Chrome DevTools / computed styles, 1440x900 desktop + 390x844 mobile) + source review of `src/app/page.tsx`. 11 target pages reviewed.

---

## 1. Executive Summary

**Overall grade: B-**

The site has a clean, modern SaaS aesthetic with a coherent purple→blue gradient design system, well-built reusable cards, structured review pages, and meaningful tools (calculator, insurance checker, price tracker). The fundamentals — IA, hierarchy on review pages, score breakdowns, CTAs that stand out via gradient — are in place. But several **conversion-critical issues** are leaving money on the table: only one affiliate CTA per review page on a 4,000px scroll, no sticky CTA, an undifferentiated `/compare` page that dumps 40 cards with no filters, and a state page that has zero state-specific content.

### Top 5 strengths
1. **Consistent, ownable visual system** — purple→blue gradient + white rounded-2xl cards is recognizable and professional.
2. **Strong review-page IA** — Score breakdown → Pricing → Pros → Cons → Alternatives → FAQ is exactly the Baymard pattern that converts.
3. **Real ranking infrastructure** — numbered ranks, weighted score breakdowns (Value 25%, Effectiveness 25%, etc.), and rating numbers are present on category pages.
4. **Tools-as-content strategy is right** — savings calculator, insurance checker, price tracker, dose timeline are all useful conversion magnets.
5. **Affiliate disclosure visible** — "WeightLossRankings.org is reader-supported" appears above the fold on comparison pages (trust signal + FTC compliance).

### Top 5 critical issues
1. **CONFIRMED: Hero headline still has tight leading on desktop.** Live computed `line-height: 48px` on a `48px` font (ratio 1.0). Tailwind's `text-5xl` utility hard-sets `line-height: 1`, which beats `leading-tight`. The repo source already attempts to fix this with `leading-[1.15]` but the live site is on the old class string `text-4xl sm:text-5xl font-bold ... leading-tight`. Either the fix hasn't deployed yet or the deploy has the wrong file. **Verify by force-refreshing and shipping `leading-[1.15]` (or `leading-snug` = 1.375).**
2. **Only ONE affiliate CTA on the entire review page.** Mobile review page is 4,143px tall, the lone "Visit CoreAge Rx" button sits at y=606. Everything below the fold (Pros, Cons, FAQ, Alternatives) is conversion-dead. No sticky CTA, no secondary CTA after Pros/Cons, no in-section CTA. **This is the single highest-leverage fix on the site.**
3. **`/compare` is a 40-card dump with no filters, sort, table, or categorization.** No selects, no inputs, no H2 sections. Users land expecting comparison and get a flat grid. Provides no decision support; bounces users.
4. **`/states/texas` has zero Texas-specific content.** Same provider list as the homepage, no Medicaid coverage notes, no city breakdowns, no local pricing, no Texas-licensed filtering. Hurts both UX and the entire SEO premise of state pages (and there are 50 of them).
5. **`/dose-timeline` ships with the generic homepage `<title>` tag** ("WeightLossRankings | Compare GLP-1 Providers, Prices & Reviews 2026") instead of a page-specific title. Tab-bar UX bug + SEO miss.

---

## 2. Page-by-Page Findings

### 2.1 Homepage (`/`)

**Critical**
- **Hero headline leading is 1.0 on desktop.** Computed `font-size: 48px / line-height: 48px`. The two visual lines stack with no breathing room. The repo has a draft fix (`leading-[1.15]`) but live HTML still serves `leading-tight` and Tailwind `text-5xl` overrides line-height to 1. **Fix:** either deploy the repo change OR change to `leading-snug` (1.375) and confirm by inspecting computed style after deploy. **Effort: S.**

**Important**
- Two equal-weight CTAs in hero ("Compare Providers" gradient + "Calculate Your Savings" outline) split intent. The outline button's contrast is borderline (purple on light purple bg). **Fix:** make "Compare Providers" the dominant primary, demote secondary to text-link or ghost button. **Effort: S.**
- Body copy below hero (`text-lg ... text-brand-text-secondary`) is fine but doesn't carry a quantified benefit. **Fix:** swap to "Save up to $800/mo on GLP-1s — compare 25+ providers in 60 seconds." **Effort: S.**
- "Browse by Category" emoji cards are visually flat — equal weight as everything below; the two empty `comingSoon` slots create dead space when none are coming-soon. The current static array has all four `comingSoon: false`, so this is fine, but the cards are small and easily missed at desktop. **Effort: S.**
- `mb-4` between hero subhead and CTAs vs `gap-4` between buttons creates inconsistent rhythm. Standardize on a vertical scale (4/6/8/12). **Effort: S.**

**Nice-to-have**
- The "Free Tools to Save You Money" gradient banner repeats the same gradient as the hero accent → visual redundancy. Vary it (e.g., dark navy card with single purple accent). **Effort: S.**
- No social proof above the fold (no logos, no review count, no "as seen in"). **Fix:** add a thin "Trusted by 12,000+ readers" or press-logo strip below the CTAs. **Effort: S.**

---

### 2.2 `/compare`

**Critical**
- **No filters, no sort, no comparison table, no segmentation.** 40 cards in a single grid, alphabetical-ish, with `Lose It!`, `Apple Fitness+`, `Noom`, and `CoreAge Rx` mixed together. Zero H2 section breaks beyond the main heading. This is "the compare page" — users arrive here to make a decision and get no scaffolding. **Fix:** add (a) sticky filter sidebar (Category, Price, Insurance, Rx required); (b) sort dropdown (Score, Price, Popularity); (c) section by category (GLP-1 / Programs / Supplements / Apps). **Effort: M.**
- The real comparison value is a side-by-side table — there is none on this page. The H2 "compare" expectation is unmet. **Fix:** either put a sticky 2-3 provider compare-tray at top OR add a `<table>` summary view as default. **Effort: M.**

**Important**
- 40 cards = scroll fatigue. Implement pagination or "show more" after the first 12. **Effort: S.**
- No score visible on the cards from the audit pull → check whether the global ProviderCard component shows the score; if not, surface it. **Effort: S.**

---

### 2.3 `/best/semaglutide-providers`

**Important**
- "Quick Picks: Top 5" H2 is good, but the H3s under "Detailed Reviews" lose ranks visually (the rank number "1" is small text inside the card, not a prominent badge). **Fix:** big colored rank chip in the top-left corner of each card (`#1` in 32px gradient text). **Effort: S.**
- Score breakdown table inside each card (`Value 9.5 / Effectiveness 8.5 / ...`) is dense — 5 metric rows × 25 cards = visual noise. **Fix:** collapse score breakdown into an accordion ("See score breakdown ▼") or only show on top 5. **Effort: S.**
- Each provider has a `Visit X →` gradient button (good — height 48px, width ~200px), but no secondary "Read full review" link inside the card. Many shoppers want to read before clicking out. **Fix:** add ghost "Full Review" link beside the affiliate CTA. **Effort: S.**

**Nice-to-have**
- "Best for: best overall value" tag under each provider is generic across cards. **Fix:** vary by provider ("Best overall", "Best for low price", "Best for insurance", "Most flexible"). **Effort: M.**
- 25+ providers on a single category page with no filter. Add Category sub-filters (Compounded vs Brand, Telehealth vs In-person, Insurance accepted). **Effort: M.**

---

### 2.4 `/reviews/coreage-rx`

**Critical**
- **One CTA on a 4,143px page.** Single "Visit CoreAge Rx" link at y=606. After the hero block, users scroll past Score Breakdown, Pricing, Pros, Cons, Alternatives, FAQ — none of which have a CTA. **Fix:** (a) add a sticky bottom CTA bar on mobile ("Visit CoreAge Rx — From $179/mo") that appears after scrolling 600px; (b) add an inline CTA after the "Pros" section and after the "FAQ"; (c) consider a sticky right-rail CTA card on desktop. **Effort: S/M. This is the single highest-impact change on the site.**

**Important**
- No "Verdict" / "Bottom Line" section before scrolling into the long body. Users want a TL;DR. **Fix:** add a "Bottom Line" callout card above Score Breakdown ("✓ Best for: budget shoppers · Score: 9.0 · Price: $179/mo"). **Effort: S.**
- Pros/Cons each as a separate H2 means users have to scroll past Pros to get to Cons. **Fix:** put them side-by-side in a 2-column grid (one card each). **Effort: S.**
- Trust badges ("Expert Reviewed", "Updated April 2026", "Independently Researched") were observed on the head-to-head page but not confirmed on this review page. **Fix:** ensure the same trust strip appears on every review page above the H1. **Effort: S.**

**Nice-to-have**
- FAQ uses H3 inside H2 instead of native `<details>` accordions — costs scannability and hurts FAQ schema rich results if not paired with FAQPage JSON-LD. **Effort: S.**

---

### 2.5 `/savings-calculator`

**Important**
- **No progress indicator on a multi-step form.** Step 1 asks "Which medication are you taking?" with 5 buttons but no "Step 1 of 4" / progress bar. Users abandon multi-step forms when they don't know how long it'll take. **Fix:** add a thin progress bar at top + step counter. **Effort: S.**
- The 5 medication buttons stack vertically with $X/mo printed inside — this works but is visually monotonous. **Fix:** use a 2-column grid on desktop with brand-pill badges. **Effort: S.**
- Subhead promises "Takes less than 60 seconds" — good. Pair with progress so promise is verifiable. **Effort: S.**
- After-result CTAs not yet inspectable without completing the flow, but the homepage references this calculator as a primary funnel — the post-result screen MUST drop users into the highest-EV affiliate CTA with the medication they selected. **Verify manually. Effort: S to add if missing.**

**Nice-to-have**
- No "skip / I don't know" path on the medication step is fine because there's "I'm not currently taking anything", but that label is wordy. Shorten to "Not currently taking GLP-1". **Effort: S.**

---

### 2.6 `/insurance-checker`

**Important**
- Same multi-step UX as savings calculator — **no progress indicator**. Same fix. **Effort: S.**
- 11 insurance buttons in a single vertical list is long on mobile. **Fix:** 2-column grid. **Effort: S.**
- "Other / No Insurance" is a critical branch — should visually be set apart with a dividing line so users don't scan past it. **Effort: S.**

**Nice-to-have**
- Add an upfront ZIP code question (drives the state filter and is a known engagement booster on coverage tools). **Effort: M.**
- Capture email at the result step with "Email me my coverage report" — major email-list growth lever. **Effort: M.**

---

### 2.7 `/states/texas`

**Critical**
- **Zero Texas-specific content.** The H2 is literally "Available Providers in Texas" and the body is the same generic alphabetical provider grid (Apple Fitness+, BistroMD, Calibrate, ... — most of which have nothing to do with Texas). No Texas Medicaid notes, no Texas city breakdowns (Houston, Dallas, Austin, San Antonio), no Texas-specific telehealth licensing notes, no Texas average pricing, no in-state clinic data. **Fix:** for each state page programmatically generate (a) state Medicaid coverage status, (b) top 3 cities with metro-specific provider lists, (c) state-specific average price, (d) any state-licensing caveats. Use a single template populated from a `states.ts` data file. **Effort: M (one component, 50 data entries).**
- Without state-specific content, the 50 state pages will be flagged as duplicate / thin content by Google. This is both an SEO disaster AND a user-trust killer ("they don't actually know anything about Texas").

**Important**
- The provider list has no "in-state available" filter. CoreAge Rx ships to all 50 states, but a meal-delivery brand like Factor and a fitness app like Apple Fitness+ are noise on a state-specific page. **Fix:** scope the list to GLP-1 providers + locally-relevant programs only. **Effort: S.**

---

### 2.8 `/compare/coreage-rx-vs-hims`

**Important**
- Has the trust strip ("✓ Expert Reviewed · 📅 Updated April 2026 · 🔒 Independently Researched") + side-by-side + verdict + 1 table. Solid structure.
- **Missing: visual "winner" badge.** The page has a "Verdict" H2 but no at-a-glance "Winner: CoreAge Rx" badge near the top. **Fix:** add a colored "Winner: X" pill above the side-by-side. **Effort: S.**
- **Missing: dual sticky CTAs** ("Visit CoreAge" + "Visit Hims") pinned to the bottom on mobile so users can pick either side without scrolling back up. **Effort: S.**
- The H2 for each provider "CoreAge Rx" / "Hims" duplicates the H1 label and creates an awkward IA. **Fix:** rename to "About CoreAge Rx" / "About Hims" or wrap them in a single "Provider Profiles" H2 with H3s underneath. **Effort: S.**

**Nice-to-have**
- Add a "Choose CoreAge if... / Choose Hims if..." callout box just before the verdict — proven decision-aid pattern (Baymard "decisional support"). **Effort: S.**

---

### 2.9 `/price-tracker`

**Important**
- 9 SVGs on the page suggests sparkline charts exist — good. The H2 "Recent Price Changes (last 90 days)" is the right hook.
- **No date stamp / "last updated" prominently shown.** Price tracking pages live or die on freshness. **Fix:** add a "Last updated: Apr 5, 2026" badge near the H1, AND a per-row "Updated: X days ago" if data freshness varies. **Effort: S.**
- "Best Current Deals" H2 is great, but each H3 (CoreAge Rx, Hims, Sesame, Ro, Henry Meds, Found) needs an inline "Get this price →" affiliate CTA, not just a name. **Fix:** ensure the deal cards have prominent CTAs. **Effort: S.**

**Nice-to-have**
- Add an "Email me when X drops below $Y" capture — the highest-EV email signup on the entire site. **Effort: M.**

---

### 2.10 `/dose-timeline`

**Critical**
- **Page `<title>` is the generic homepage title** ("WeightLossRankings | Compare GLP-1 Providers, Prices & Reviews 2026") instead of a page-specific title. Tab UX + SEO bug. **Fix:** set `metadata = { title: 'GLP-1 Dose Timeline — Titration Schedule & Total Cost', description: '...' }` in the page route. **Effort: S.**

**Important**
- Has a Semaglutide / Tirzepatide tabbed switch and a long provider picker list ("Compare pricing from: CoreAge Rx, Eden, Everlywell, GoodRx, Henry Meds, ..."). The provider list as flat text is bad UX — should be a multi-select chip group. **Fix:** convert to chip group with "select all top 5" preset. **Effort: S.**
- "Cost Summary" + "Alternative Providers" sections are good but need a CTA.

---

### 2.11 `/drugs/semaglutide`

**Strong page overall.** Has At a Glance → How It Works → Dosing → Side Effects → Clinical Trials → Where to Get → Cost Comparison → FAQ. Textbook structure.

**Important**
- "Where to Get Semaglutide" is the conversion section. Each H3 (CoreAge Rx, GoodRx, Form Health, Hims, Ro, Hers) needs to be a full provider card with score, price, and prominent affiliate CTA — not just a heading. **Verify and fix if missing. Effort: S.**
- Add a sticky "Find a Provider →" CTA on mobile — drug pages have high SEO traffic but low CTR to providers without one. **Effort: S.**

**Nice-to-have**
- Add an FAQ schema (`FAQPage` JSON-LD) for the FAQ section. **Effort: S.**

---

## 3. Cross-Site Patterns

1. **Sticky CTA missing on every long-form page.** Reviews, drugs, head-to-heads, state pages all benefit from a fixed-bottom mobile CTA bar.
2. **Multi-step tools have no progress indicator.** Both calculator and insurance-checker.
3. **Tailwind `text-5xl` clobbers any `leading-*` utility.** Anywhere `text-5xl` or `text-6xl` is used, line-height defaults to 1.0. Use bracket notation `leading-[1.15]` (or set `lineHeight` per-size in `tailwind.config.ts`).
4. **State + category pages dump alphabetical card grids with no filtering / segmentation.**
5. **No "last updated" badges on time-sensitive pages** (price tracker, reviews, best-of lists).
6. **Limited social proof.** No press logos, no aggregate review counts, no testimonials anywhere I checked.
7. **No email capture on tool result pages.** Calculator, insurance checker, and price tracker all have natural "send me my report" hooks that aren't being used.
8. **The same purple→blue gradient appears on hero text, primary buttons, info banners, and accent backgrounds.** Slight overuse — see §6.

---

## 4. Quick Wins (each <30 min, high impact)

1. **Fix hero leading globally** — set `lineHeight` for `text-5xl`/`text-6xl` in `tailwind.config.ts` so `leading-snug` actually works.
2. **Add page `metadata` to `/dose-timeline`** so the tab title is correct.
3. **Add "Last updated: Apr 5, 2026" badge** to `/price-tracker` H1.
4. **Add a second affiliate CTA** at the end of every review page (after FAQ).
5. **Sticky mobile CTA bar component** for reviews + drugs + head-to-head pages (one component, dropped into 3 layouts).
6. **Add "Bottom Line" callout** above the Score Breakdown on every review page.
7. **Add "Winner: X" pill** to head-to-head pages above the side-by-side.
8. **Convert Pros + Cons to a 2-column side-by-side grid** on review pages.
9. **Add progress bar to multi-step calculator and insurance checker** (`Step 1 of N`).
10. **Add ghost "Read full review" link** beside every affiliate CTA on category pages.
11. **Filter `/states/[state]` provider lists** to GLP-1 + telehealth-only (drop meal kits and apps).
12. **Add a thin "Trusted by 12,000+ readers" or press-logo strip** below the homepage hero CTAs.
13. **Quantify the homepage hero subhead** — "Save up to $800/mo on GLP-1s. Compare 25+ providers in 60 seconds."
14. **Demote the homepage secondary CTA** to a ghost button so primary stands out.
15. **Add `<details>` accordions to all FAQ sections** + `FAQPage` JSON-LD for rich snippets.

---

## 5. Conversion Funnel Analysis

**Path:** Homepage → Category (`/best/semaglutide-providers`) → Review (`/reviews/coreage-rx`) → Affiliate click.

| Step | Friction | Severity |
|---|---|---|
| Homepage | Hero leading too tight; two competing CTAs split intent; no quantified benefit; no social proof | Medium |
| → Click "Compare Providers" | Lands on `/compare` which has 40 mixed cards and no filters → user confusion → likely bounce or back-button to homepage | **High** |
| Alt path: click a category | Best-of page is well-structured; good rank/score visibility; gradient CTAs are healthy 48px tall | Low |
| → Click a provider name or "Read review" | Inside review: TL;DR/Bottom Line missing → user must scan whole page to know if it's a fit; only ONE CTA at y=606 | **High** |
| → Scroll past CTA into Pros/Cons/FAQ | Zero CTAs visible; user must scroll back up — most won't | **Critical** |
| → Click affiliate | Healthy gradient CTA, clear copy, opens in new tab | Low |

**The single biggest win: a sticky bottom-of-screen CTA on review and head-to-head pages.** It would lift affiliate CTR materially with maybe 60 minutes of work (one component, 3 routes).

**Second biggest win: rebuilding `/compare` with filters + sort + segmentation.** Right now `/compare` actively destroys the funnel for users who land there from the homepage's primary CTA.

---

## 6. Design System Observations

- **Gradient overuse.** Purple→blue is on the hero "Weight Loss Solution" highlight, the primary CTA buttons, the "Free Tools to Save You Money" banner, and the "Updated April 2026" badge. When everything is the brand accent, nothing is. **Fix:** reserve the gradient for primary CTAs only; use solid purple or a darker navy for content cards and info banners.
- **Card consistency is good.** `rounded-2xl bg-white border border-brand-violet/10 shadow-sm` is used everywhere. Keep this.
- **Spacing scale is OK but inconsistent.** Hero uses `mb-6` then `mb-8`; most sections use `pb-16`; some use `pb-20` and `pb-24`. **Fix:** consolidate vertical rhythm to a single 16/24/32/48 scale.
- **Typography hierarchy is correct** (font-heading for headings, sans for body) but heading line-height needs the global Tailwind config fix.
- **No dark mode and no need for one** — ignore.
- **No skeleton loaders observed.** With Next.js App Router + async data this matters less, but on the price-tracker chart load you should add at least a placeholder block.

---

## 7. Mobile-Specific Findings

(Tested at 390x844; viewport reported as 512px due to chrome UI but proportionally accurate.)

1. **Hero headline:** mobile computed `36px / 45px` line-height (ratio 1.25, OK) — mobile is fine. **Desktop is the broken case.**
2. **Tap targets <40px tall** in the homepage footer/blog area: "View all →" (20px), "Learn more" (15px), "Best Semaglutide Providers" (17px), "Best Weight Loss Programs" (17px). These violate Apple HIG (44px) and Google Material (48px). **Fix:** add `py-3` to footer link blocks or wrap each link in a button-shaped touch area. **Effort: S.**
3. **No horizontal scroll detected** on any page checked — good.
4. **Single CTA on review page** at y=606 means after one screen of scrolling on mobile (844px), the CTA is gone and won't return for ~3,500px.
5. **Multi-step tool buttons stack vertically** on mobile, which is fine, but list of 11 insurance providers is long. Consider 2-col grid even at 390px.
6. **Section vertical padding is generous on mobile** (64-80px) — feels intentional and reads well. Keep.
7. **No bottom tab nav.** Not strictly needed but a 3-button bottom bar (Compare · Tools · Reviews) on mobile would significantly aid navigation on long pages.

---

## 8. Priority Matrix

| # | Fix | Impact | Effort | Score |
|---|---|---|---|---|
| 1 | Sticky mobile CTA bar on review/drug/H2H pages | **Critical** | S | **★★★★★** |
| 2 | Rebuild `/compare` with filters + sort + sections | **Critical** | M | **★★★★★** |
| 3 | Fix hero headline leading (Tailwind config + redeploy) | Critical | S | **★★★★★** |
| 4 | Add Texas-style state-specific content + filter to `/states/[state]` | Critical | M | **★★★★** |
| 5 | Add `metadata.title` to `/dose-timeline` (and audit all routes) | High | S | **★★★★** |
| 6 | Add second CTA + Bottom-Line callout to all review pages | High | S | **★★★★** |
| 7 | Add progress bar to calculator + insurance checker | High | S | **★★★★** |
| 8 | Add "Last updated" badge to price tracker + reviews | Medium | S | **★★★** |
| 9 | Quantify homepage hero subhead + demote secondary CTA | Medium | S | **★★★** |
| 10 | Add Pros/Cons 2-col grid on reviews | Medium | S | **★★★** |
| 11 | Add Winner pill + dual sticky CTAs to head-to-head pages | Medium | S | **★★★** |
| 12 | Email capture on tool result screens | Medium | M | **★★★** |
| 13 | FAQ JSON-LD + native `<details>` accordions | Low | S | **★★** |
| 14 | Fix sub-40px tap targets in homepage footer | Low | S | **★★** |
| 15 | Reduce gradient overuse, vary banner styles | Low | S | **★★** |

**Top-right action list (high impact, low effort):** items 1, 3, 5, 6, 7, 9.

**The ONE thing that would move conversion most: ship a sticky mobile CTA bar on the review and drug pages.** It addresses the biggest leak in the funnel (one CTA on a 4,143px page) and ships in under an hour.

---

*End of audit.*
