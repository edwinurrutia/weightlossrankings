# SEO Content Strategy — WeightLossRankings.org

**Date:** 2026-04-06
**Owner:** Editorial (one-person team)
**Goal:** Drive qualified organic traffic that converts to (a) affiliate clicks on `/best/*`, `/reviews/*`, `/compare/*`, `/drugs/*`, `/states/*` and (b) email signups via Kit.

This document is the operating doc for content. It is paired with `/Users/weightlossrankings/docs/seo-audit-2026-04-06.md` (the technical/keyword audit). Read that first for the keyword list and ranked opportunities.

---

## A. Content Architecture Decision

### Recommendation: **(c) Hub-and-Spoke under `/learn/`**

Routes:

- `/learn` — index of all topical pillars
- `/learn/[topic]` — pillar page (e.g. `/learn/glp-1-medications`)
- `/learn/[topic]/[slug]` — cluster article (e.g. `/learn/glp-1-medications/semaglutide-vs-tirzepatide`)

### Why hub-and-spoke (vs single `/blog/` or split `/guides/+/news/+/blog/`)

1. **Topical authority is the #1 ranking driver in YMYL niches in 2026.** Google's Helpful Content + E-E-A-T systems reward sites that exhaustively cover one topic before sprawling. A hub-and-spoke structure tells Google "we are the GLP-1 site" by literally clustering URLs under topical parents.
2. **Internal-link math is superior.** Every cluster post links up to its pillar (which links to a money page); every pillar links down to 5–10 clusters and out to 2–3 money pages. This creates dense, semantically tight link clusters — exactly what Google's link-distance ranking algorithm rewards.
3. **One person can ship it.** A flat `/blog/` invites endless category bikeshedding. The split `/guides/+/news/+/blog/` triples the ops burden (3 templates, 3 sitemaps, 3 RSS feeds). Hub-and-spoke is one template, one data file, one mental model. The existing `/blog/` route stays for opinion/short pieces and old content (no migration cost).
4. **URL hierarchy IS sitemap hierarchy.** Search Console traffic reports break out by URL prefix. With `/learn/glp-1-medications/*` we can immediately see which pillar is performing without writing custom queries.
5. **Future-proof for programmatic.** When we want to spin up city pages, drug-specific deep dives, or insurance breakdowns, they slot into existing pillars without a re-architecture.

### What stays at `/blog/`

The existing `/blog/[slug]` route stays untouched. Use it for:

- News (FDA announcements, shortage updates, pricing changes)
- Op-ed and short opinion (< 1,000 words)
- Press releases / partner announcements

All net-new long-form SEO content goes under `/learn/`.

---

## B. Content Pillars

Six pillars. Each has one pillar page (`/learn/[topic]`), a target query, 5–10 cluster article ideas, and explicit money-page targets.

### Pillar 1 — `glp-1-medications` — "GLP-1 Medications: Complete Guide"
**Target query:** "glp-1 medications" / "what are glp-1 drugs" (combined ~22k/mo)
**Money pages it feeds:** `/drugs/semaglutide`, `/drugs/tirzepatide`, `/drugs/wegovy`, `/drugs/ozempic`, `/drugs/mounjaro`, `/drugs/zepbound`, `/best/semaglutide-providers`
**Clusters:**
1. Semaglutide vs Tirzepatide: Which Is More Effective? *(SHIPPED — article 1)*
2. Ozempic vs Wegovy: Same Drug, Different Prices *(SHIPPED — article 2)*
3. Mounjaro vs Zepbound: Which Should You Take? *(SHIPPED — article 3)*
4. How GLP-1 Drugs Actually Work in Your Body
5. Oral vs Injectable Semaglutide (Rybelsus Comparison)
6. Semaglutide Dosing Schedule: Complete Titration Guide *(SHIPPED — article 6)*
7. Tirzepatide Dosing: Week-by-Week Titration
8. Retatrutide and the Next Generation of GLP-1s

### Pillar 2 — `cost-and-insurance` — "GLP-1 Cost & Insurance Guide"
**Target query:** "how much does ozempic cost" / "glp-1 insurance coverage" (combined ~30k/mo)
**Money pages it feeds:** `/savings-calculator`, `/insurance-checker`, `/best/semaglutide-providers`, `/price-tracker`
**Clusters:**
1. How to Get GLP-1 Without Insurance: Complete 2026 Guide *(SHIPPED — article 4)*
2. Does Insurance Cover Wegovy? State-by-State Breakdown
3. The Real Cost of Wegovy vs Compounded Semaglutide
4. Manufacturer Coupons for Ozempic, Wegovy, Mounjaro
5. Medicare and GLP-1 Drugs: What's Covered in 2026
6. FSA and HSA Eligibility for Weight Loss Medications
7. PBM Tier Lists: Why Your Co-Pay Just Doubled

### Pillar 3 — `side-effects-and-safety` — "GLP-1 Side Effects & Safety"
**Target query:** "ozempic side effects" / "semaglutide side effects" (combined ~120k/mo, high difficulty)
**Money pages it feeds:** `/drugs/semaglutide`, `/drugs/tirzepatide`, `/methodology`
**Clusters:**
1. Compounded Semaglutide: Is It Safe? *(SHIPPED — article 5)*
2. Semaglutide Side Effects: Complete Management Guide *(SHIPPED — article 7)*
3. Ozempic and Gallbladder Issues: What the Research Shows
4. GLP-1 Drugs and Pancreatitis Risk Explained
5. What Happens When You Stop Taking Ozempic? The Rebound Effect
6. GLP-1 and Alcohol: Is It Safe to Drink on Semaglutide?
7. Thyroid Cancer Warning: How Worried Should You Be?
8. GLP-1 During Pregnancy: What Every Patient Must Know

### Pillar 4 — `diet-and-lifestyle` — "Diet & Lifestyle on GLP-1"
**Target query:** "what to eat on ozempic" (~12k/mo)
**Money pages it feeds:** `/dose-timeline`, `/best/meal-delivery-for-weight-loss`
**Clusters:**
1. 7-Day Meal Plan for Semaglutide Users
2. The Best Foods to Eat on Ozempic (and What to Avoid)
3. Protein Targets on a GLP-1: How Much You Actually Need
4. Strength Training on GLP-1: Preserving Lean Mass
5. How to Manage GLP-1 Nausea Through Food Choices
6. GLP-1 and Hydration: Why You Need More Water

### Pillar 5 — `provider-reviews` — "How to Choose a GLP-1 Provider"
**Target query:** "best telehealth weight loss" (~3.6k/mo)
**Money pages it feeds:** `/best/semaglutide-providers`, `/best/weight-loss-programs`, all `/reviews/*`, `/methodology`
**Clusters:**
1. How We Test GLP-1 Providers (Our Methodology Explained)
2. Red Flags to Watch For When Buying Compounded GLP-1
3. 503A vs 503B Compounding Pharmacies: What You Need to Know
4. LegitScript Certification: What It Actually Means
5. Telehealth GLP-1 vs In-Person Doctor: Pros and Cons
6. Subscription Lock-In: The Compounded GLP-1 Industry's Dirty Secret

### Pillar 6 — `state-guides` — "GLP-1 by State"
**Target query:** "buy ozempic [state]" (50 long-tail queries, ~50k/mo combined)
**Money pages it feeds:** All 50 `/states/*` pages
**Clusters:** (one cluster article per high-population state, links to its `/states/*` money page)
1. GLP-1 in Texas: Telehealth Laws, Pricing, and Top Providers
2. GLP-1 in California: 2026 Provider Guide
3. GLP-1 in Florida: Where to Get Semaglutide Legally
4. GLP-1 in New York: HB Telehealth Compliance Guide
5. GLP-1 in Illinois: Insurance and Pricing Breakdown
6. (... extend to remaining 45 states programmatically over 12 months)

---

## C. Keyword Targeting Framework

### Money Page → Keyword Cluster Map

| Money page | Primary keyword (volume) | Pillar | Needs supporting content? |
|---|---|---|---|
| `/best/semaglutide-providers` | "best glp-1 providers" (2,400) | Provider Reviews | YES — pillar + 3 clusters |
| `/best/weight-loss-programs` | "best telehealth weight loss" (3,600) | Provider Reviews | YES |
| `/reviews/coreage-rx` | "coreage rx review" (390) | Provider Reviews | Linked from cluster #1 |
| `/reviews/hims` | "hims weight loss review" (9,900) | Provider Reviews | YES — needs comparison cluster |
| `/reviews/ro` | "ro body weight loss review" (6,600) | Provider Reviews | YES |
| `/compare/coreage-rx-vs-hims` | "coreage rx vs hims" (low) | Provider Reviews | Yes — 2 clusters per side |
| `/drugs/semaglutide` | "semaglutide" (450k, very high) | GLP-1 Medications | YES — 5 clusters |
| `/drugs/tirzepatide` | "tirzepatide" (135k) | GLP-1 Medications | YES — 4 clusters |
| `/drugs/ozempic` | "ozempic" (1.5M) | GLP-1 Medications | YES |
| `/drugs/wegovy` | "wegovy" (300k) | GLP-1 Medications | YES |
| `/drugs/mounjaro` | "mounjaro" (820k) | GLP-1 Medications | YES |
| `/drugs/zepbound` | "zepbound" (300k) | GLP-1 Medications | YES |
| `/states/[state]` × 50 | "glp-1 in [state]" (long tail) | State Guides | YES — 1 cluster per top-15 state |
| `/savings-calculator` | "glp-1 cost calculator" (~1k) | Cost & Insurance | YES — pillar + 4 clusters |
| `/insurance-checker` | "does insurance cover wegovy" (4,400) | Cost & Insurance | YES |
| `/dose-timeline` | "semaglutide dosing schedule" (8,100) | GLP-1 Medications | YES — covered by article 6 |

### 90-Day Publishing Calendar (24 articles, 2/week)

| Wk | Article | Pillar | Target keyword |
|---|---|---|---|
| 1 | Semaglutide vs Tirzepatide | Meds | semaglutide vs tirzepatide |
| 1 | Ozempic vs Wegovy | Meds | ozempic vs wegovy |
| 2 | Mounjaro vs Zepbound | Meds | mounjaro vs zepbound |
| 2 | How to Get GLP-1 Without Insurance | Cost | glp-1 without insurance |
| 3 | Compounded Semaglutide: Is It Safe? | Safety | compounded semaglutide safety |
| 3 | Semaglutide Dosing Schedule | Meds | semaglutide dosing schedule |
| 4 | Semaglutide Side Effects: Management | Safety | semaglutide side effects |
| 4 | How GLP-1 Drugs Actually Work | Meds | how glp-1 works |
| 5 | The Real Cost of Wegovy | Cost | wegovy cost |
| 5 | Does Insurance Cover Wegovy | Cost | does insurance cover wegovy |
| 6 | Tirzepatide Dosing Guide | Meds | tirzepatide dosing |
| 6 | Foods to Eat on Ozempic | Diet | what to eat on ozempic |
| 7 | What Happens When You Stop Ozempic | Safety | stop taking ozempic |
| 7 | 7-Day Meal Plan on Semaglutide | Diet | semaglutide meal plan |
| 8 | Manufacturer Coupons for GLP-1s | Cost | ozempic coupon |
| 8 | Ozempic and Gallbladder Issues | Safety | ozempic gallbladder |
| 9 | Medicare and GLP-1 Drugs | Cost | medicare ozempic |
| 9 | GLP-1 in Texas | State | semaglutide texas |
| 10 | 503A vs 503B Pharmacies | Reviews | 503a 503b compounding |
| 10 | GLP-1 in California | State | semaglutide california |
| 11 | Strength Training on GLP-1 | Diet | exercise on ozempic |
| 11 | LegitScript Certification Explained | Reviews | legitscript pharmacy |
| 12 | GLP-1 and Alcohol | Safety | ozempic alcohol |
| 12 | GLP-1 in Florida | State | semaglutide florida |

Articles 1–7 are shipped in Deliverable 3 of this initiative. Articles 8–24 are queued for editorial.

---

## D. Internal Linking Rules

Hard rules — every article and money page must comply:

1. **Every cluster article links to:**
   - 1 pillar page (its parent)
   - 1 money page (its primary commercial target — usually a `/best/*` or `/drugs/*`)
   - 2–3 sibling cluster articles (within the same or adjacent pillar)
2. **Every pillar page links to:**
   - All cluster articles in its topic
   - 2–3 money pages relevant to that topic
3. **Every money page links to:**
   - 3–5 cluster articles in its pillar (in a "Learn more" or "Related guides" sidebar/footer)
4. **Every state page links to:**
   - Its state-specific cluster article (e.g. `/states/texas` → `/learn/state-guides/glp-1-texas`)
5. **Every drug page links to:**
   - Its drug-specific cluster article (e.g. `/drugs/semaglutide` → `/learn/glp-1-medications/semaglutide-dosing-schedule`)
6. **Anchor text variation:** never use the same anchor text twice on a page. Use exact-match keyword sparingly (1×/page max), use partial-match and branded variants for the rest.
7. **Link from above the fold:** place at least one money-page link in the first 300 words of every article.

---

## E. Content Brief Template

Use this template for every new article. Fill in before writing.

```
ARTICLE BRIEF: [working title]

1. TARGET KEYWORD (primary): [keyword]
   Volume: [N]/mo | Difficulty: [Low/Med/High] | Intent: [Info/Comm/Trans]
2. SECONDARY KEYWORDS (3–5): [list]
3. SEARCH INTENT: [what does the user actually want?]
4. WORD COUNT TARGET: [1500/2000/2500]
5. PILLAR: /learn/[topic]
6. URL SLUG: /learn/[topic]/[slug]
7. H2/H3 OUTLINE:
   H2: ...
     H3: ...
   H2: ...
8. INTERNAL LINKS (8–15 required):
   - Pillar: /learn/[topic]
   - Primary money page: /[best|drugs|reviews]/...
   - Sibling clusters (2–3): ...
   - Related money pages (2–4): ...
9. SCHEMA TYPE: Article | MedicalWebPage | FAQPage | HowTo
10. AUTHOR: WeightLossRankings Editorial Team
11. MEDICAL REVIEWER: [TBD — placeholder until contracted]
12. CITATIONS (3–5 minimum, real URLs): NEJM, FDA label, manufacturer page, JAMA, peer-reviewed source
13. CTA PLACEMENT:
    - Above the fold: link to primary money page
    - Mid-article: EmailCapture component
    - End of article: large CTA card linking to most-relevant money page
14. LEAD MAGNET: GLP-1 Starter Guide (default Kit funnel)
15. KEY TAKEAWAYS BOX: 4–6 bullet points at the top
16. COMPARISON TABLE: yes/no + columns
17. PUBLISH DATE: [YYYY-MM-DD]
18. SCHEDULED PROMOTION:
    - Reddit: r/[sub] post within 48h
    - Twitter thread: same day
    - Newsletter: Friday digest
    - Quora: 2 answers within 1 week
```

---

## F. Quality Bar / E-E-A-T Signals

Every `/learn/*` article must include:

1. **Author byline:** "By WeightLossRankings Editorial Team" — single persona until we contract individual authors. Visible at the top + included in `Article` schema `author` field.
2. **Medical reviewer placeholder:** display a small badge: *"Medically reviewed by: pending. We are contracting a board-certified MD reviewer for all YMYL content in Q2 2026."* This is honest and signals intent. When the contract closes, swap in the real name + add `reviewedBy` to schema.
3. **Source citations (3–5 minimum):** All medical claims must link to real, well-known sources. Approved domains: `nejm.org`, `jamanetwork.com`, `fda.gov`, `nih.gov`, `pubmed.ncbi.nlm.nih.gov`, `accessdata.fda.gov`, `novonordisk.com`, `lilly.com`, `cdc.gov`, `ncbi.nlm.nih.gov`. Render as a numbered "Sources" section at the bottom.
4. **Last updated badge:** every article shows "Published: [date] · Updated: [date]". Update at least quarterly for evergreen content.
5. **Methodology link:** every article footer links to `/methodology` ("How we research & rank").
6. **Disclosure:** affiliate disclosure component above the first money-page CTA (reuse existing `AffiliateDisclosure`).
7. **No AI-generated stock claims:** every statistic must be cited. Round numbers from clinical trials (e.g. "14.9% body weight loss in STEP-1") not vague ones ("about 15%").

---

## G. Distribution & Promotion (Low-Budget)

Every new article gets the following promo treatment within 7 days of publication:

### Reddit
- **Allowed subs:** r/Semaglutide, r/Mounjaro, r/Tirzepatide, r/loseit, r/Ozempic, r/WeightLossAdvice
- **Rules:** never link-spam. Comment with genuine value first (10+ comments per sub before posting your own link). Disclose affiliation when relevant. Aim for 1 link drop per article per sub max.
- **Best post format:** "I wrote up [topic] after seeing this question 5x this week — covers X, Y, Z. Happy to answer questions in comments." Drop the link in the body, not the title.

### Quora
- Search the target keyword on Quora — answer 2–3 existing questions per article. Link back as a "further reading" reference, not as the entire answer.

### Newsletter (Kit)
- Every Friday: a digest email to all subscribers with the week's 2 new articles + 1 money-page CTA. Use the existing Kit form (`source: newsletter_friday`).

### Twitter/X
- Each article = one 8–12 tweet thread. Pull the most counterintuitive / specific claims for hooks. Link in the final tweet (algorithmic penalty for early links).
- Cross-post as a LinkedIn post for B2B-adjacent topics (Cost & Insurance pillar especially).

### Backlink Targets
- **Provider partner sites:** offer to write guest posts for partner providers' blogs in exchange for backlink to a relevant `/learn/*` article (not a money page).
- **Health blogs:** Outreach to mid-tier health writers (Substack, Medium) — offer original data from the price tracker as link bait.
- **Niche directories:** Submit to GLP-1.org, GLP1-Daily, Weight Loss Resources directory. Free, high-DR.
- **HARO / Help A Reporter:** 3 pitches/week from the editorial team using `/methodology` as the credibility anchor.

---

## H. Measurement

### KPIs (track weekly)

| KPI | Tool | Target (90 days) | Target (180 days) |
|---|---|---|---|
| Organic sessions | GA4 + GSC | 10k/mo | 35k/mo |
| Top 10 ranked keywords | GSC Search Analytics | 25 | 100 |
| Indexed `/learn/*` URLs | GSC Coverage | 24 | 60 |
| Click-through to `/best/*` | GA4 events | 800/mo | 3,500/mo |
| Click-through to `/reviews/*` | GA4 events | 400/mo | 2,000/mo |
| Email subscribers | Kit | +500 | +2,500 |
| Articles ranking p1–3 | GSC | 5 | 25 |
| Backlinks earned | Ahrefs (free tier) / GSC links | 15 | 75 |

### Tools

- **Google Search Console** — primary source of truth for impressions, clicks, position, indexed pages.
- **Vercel Analytics** — page-level traffic (built in, free).
- **GA4** — funnel events: article view → money-page click → outbound affiliate click.
- **Kit** — newsletter growth, list segmentation by source.
- **Ahrefs Webmaster Tools** — free backlink tracking for verified domains.
- **Bing Webmaster Tools** — secondary index, ChatGPT search powered by Bing.

### Review cadence

- **Weekly:** check GSC for new ranking keywords; identify articles with high impressions but low CTR (rewrite title/meta).
- **Monthly:** prune the lowest-performing articles (refresh, redirect, or expand). Look for content cannibalization.
- **Quarterly:** refresh all evergreen `/learn/*` articles with new dates, updated stats, new internal links to newly published clusters.

---

*End of strategy doc. See Deliverables 2 and 3 for the architecture implementation and the first 7 articles.*
