# WeightLossRankings.org — Design Spec

## Overview

Affiliate marketing website ranking and comparing the full weight loss ecosystem: GLP-1 telehealth providers, weight loss programs, supplements, meal delivery, fitness apps, metabolic testing, and coaching. Combines editorial rankings (SEO traffic capture) with an interactive comparison tool (high-intent conversion). Monetized via affiliate commissions, email list monetization, and sponsored listings.

**Domain:** weightlossrankings.org
**Tech Stack:** Next.js 14 (App Router) + Tailwind CSS + Sanity CMS (free tier, 3 users)
**Design:** Modern & vibrant — purple/blue gradients, soft shadows, rounded cards
**Deploy:** Vercel (free tier to start)

---

## Content Categories

### Launch (Phase 1)
- **GLP-1 Telehealth Providers** — Hims, Ro, Found, Calibrate, Henry Meds, Sesame, Mochi, PlushCare, etc.
- **Weight Loss Programs** — Noom, WeightWatchers, Calibrate, Optavia, Jenny Craig, etc.

### Expansion (Phase 2)
- Supplements (protein, fat burners, fiber, probiotics)
- Meal Delivery (Factor, HelloFresh, BistroMD, Nutrisystem)
- Fitness Apps (MyFitnessPal, Fitbit, Apple Fitness+, Peloton)
- Metabolic Testing (Lumen, Signos, InsideTracker)
- Coaching (personal trainers, nutritionists, online coaching platforms)

---

## Page Architecture

### 1. Homepage (`/`)

**Purpose:** Orient visitors, surface top picks, drive into comparison tool or category pages.

**Sections:**
- Hero: "Find the Best Weight Loss Solution for You" + CTA to comparison tool + search bar
- Quick category nav cards (GLP-1 Providers, Programs, Supplements, Meal Delivery, etc.)
- "Top Rated This Month" — 3 featured provider cards with scores, prices, affiliate CTAs
- Interactive tool promo banner (savings calculator, insurance checker)
- Latest blog posts / price drop alerts
- Email signup CTA with lead magnet ("Free GLP-1 Starter Guide")
- Trust bar: methodology link, editorial independence statement, medical advisor names

### 2. Interactive Comparison Tool (`/compare`)

**Purpose:** Bottom-of-funnel conversion tool. Users filter and sort providers to find their best match.

**Filters:**
- Category (GLP-1 Provider, Weight Loss Program, Supplement, etc.)
- Drug type (Semaglutide, Tirzepatide — for GLP-1 category)
- Form (Compounded, Brand Name — for GLP-1)
- State (dropdown, all 50 states)
- Dose (0.25mg, 0.5mg, 1mg, 1.7mg, 2.5mg — for GLP-1)
- Price range (slider)
- Features (FSA/HSA, video calls, dietitian, 24/7 support)
- Sort by: cheapest, highest rated, most reviewed

**Provider Cards Display:**
- Provider logo + name
- WeightLossRankings score (out of 10)
- Price (prominent, large font) with "per month" label
- Star rating + review count
- Feature badges (Compounded, FSA/HSA, All States, etc.)
- Coupon code display if available
- FDA warning badge if applicable
- "Visit Provider" CTA button (affiliate link)

**Special Features:**
- "Compare" checkbox on cards → opens side-by-side comparison drawer (max 3)
- URL updates with filter state for shareability and SEO
- Sticky filter bar on scroll

### 3. Head-to-Head Comparison (`/compare/[provider-a]-vs-[provider-b]`)

**Purpose:** SEO pages for "[X] vs [Y]" searches + conversion tool for undecided users.

**Auto-generated** for every provider pair in same category. Content from CMS data.

**Layout:**
- Split screen: Provider A (left) vs Provider B (right)
- Row-by-row comparison: price, rating, features, state availability, dose options, support type
- Pros/cons for each
- "Our Verdict" section with recommendation
- CTA buttons for both providers
- "See more alternatives" link to full comparison tool

### 4. Rankings Pages (`/best/[category]`)

**Purpose:** SEO traffic capture for "best [X]" searches. Editorial authority.

**Examples:**
- `/best/semaglutide-providers`
- `/best/weight-loss-programs`
- `/best/weight-loss-supplements`
- `/best/meal-delivery-for-weight-loss`

**Layout:**
- H1: "Best [Category] in 2026 — Ranked & Reviewed"
- "Last updated" date + medical reviewer badge
- Quick pick summary table (top 5 with scores, prices, "best for" labels)
- Numbered detailed reviews:
  - Provider card (logo, score, price, CTA)
  - 300-500 word editorial review
  - Pros/cons list
  - Scoring breakdown (6 dimensions)
  - "Best for" superlative label
- Methodology link
- FAQ section (schema markup for rich snippets)

**Subcategory pages** (`/best/[category]/[subcategory]`):
- `/best/semaglutide-providers/without-insurance`
- `/best/weight-loss-programs/for-beginners`
- `/best/semaglutide-providers/cheapest`

### 5. Provider Review Pages (`/reviews/[provider]`)

**Purpose:** Deep-dive reviews for "[provider] review" SEO + conversion.

**Layout:**
- Provider hero: logo, name, score, price, CTA
- Scoring breakdown radar chart (6 dimensions)
- "At a Glance" quick facts table
- Detailed editorial review (800-1500 words)
- Pricing table by dose/plan
- Pros/cons
- State availability map
- User reviews section (curated)
- "Alternatives to [Provider]" section with 3 competitor cards
- FAQ section

### 6. Alternatives Pages (`/alternatives/[provider]`)

**Purpose:** SEO for "[provider] alternatives" searches.

**Layout:**
- "Why look for alternatives?" section
- Ranked list of alternatives with comparison to original provider
- Feature comparison table
- Price comparison
- CTA for each alternative

### 7. Savings Calculator (`/savings-calculator`)

**Purpose:** Email capture tool + conversion driver. Nobody else has this.

**Flow:**
1. User selects: current medication (brand Wegovy/Ozempic/Mounjaro or none)
2. User selects: current dose
3. User enters: what they currently pay (or "I don't know")
4. **Email gate:** "Enter your email to see your personalized savings report"
5. Results page: side-by-side cost comparison showing potential savings with compounded alternatives
6. Ranked provider recommendations sorted by savings amount
7. Each provider has affiliate CTA

### 8. Insurance Coverage Checker (`/insurance-checker`)

**Purpose:** Email capture + funnel users to right providers.

**Flow:**
1. Quiz: What's your insurance provider? (dropdown of major insurers)
2. Which medication are you interested in?
3. What state do you live in?
4. **Email gate:** "Get your coverage report"
5. Results: coverage likelihood, prior auth requirements, estimated copay
6. If not covered: "Here are the best compounded alternatives" → affiliate links
7. If covered: "Here are providers that accept your insurance" → affiliate links

### 9. Dose Timeline (`/dose-timeline`)

**Purpose:** Education + total cost transparency nobody else provides.

**Layout:**
- Visual timeline showing standard titration schedule (week by week)
- At each dose step: which providers offer it and at what price
- Total cost calculator: "Your first 6 months will cost approximately $X with [Provider]"
- Provider comparison at each dose tier
- Affiliate CTAs at each step

### 10. Price Tracker (`/price-tracker`)

**Purpose:** Recurring SEO content + return visits + email list growth.

**Layout:**
- Line charts showing price history by provider (monthly data points)
- "Price Drop Alerts" email signup
- Current best deals / recent price changes table
- Provider cards sorted by best current value
- Blog posts about notable price changes

### 11. State Pages (`/states/[state]`)

**Purpose:** Long-tail SEO for "semaglutide in [state]" and "weight loss programs in [state]".

**Auto-generated** for all 50 states from CMS data.

**Layout:**
- H1: "Best Weight Loss Options in [State]"
- State-specific availability filter (only show providers available there)
- State-specific regulations or notes
- Top providers available in this state with pricing
- In-person options if any
- State-specific blog content

### 12. Drug Guide Pages (`/drugs/[drug]`)

**Purpose:** Informational SEO for drug name searches.

**Examples:** `/drugs/semaglutide`, `/drugs/tirzepatide`, `/drugs/wegovy`

**Layout:**
- Drug overview (what it is, how it works, FDA status)
- Dosing information
- Side effects
- Cost comparison table across providers
- "Where to get [Drug]" → affiliate links
- Clinical trial results summary
- FAQ

### 13. Blog (`/blog/[slug]`)

**Purpose:** SEO content, freshness signals, email list growth.

**Content types:**
- Price drop news ("Hims Drops Semaglutide to $X")
- FDA updates
- "How to" guides
- Comparison articles
- User success stories (curated/sourced)

### 14. Trust Pages

- `/methodology` — Scoring system explained (6 dimensions, weighting, data sources)
- `/about` — Team, mission, medical advisors, editorial independence
- `/advertise` — Sponsored listing pitch page with traffic stats
- `/newsletter` — Email signup landing page with lead magnet
- `/privacy`, `/terms`, `/disclosure` — Legal pages with FTC affiliate disclosure

---

## Scoring System

Every provider/program receives a **WeightLossRankings Score** (out of 10) across 6 dimensions:

1. **Value** (weight: 25%) — Price relative to category, cost transparency, hidden fees
2. **Effectiveness** (weight: 25%) — Clinical evidence, weight loss outcomes, clinical trial data
3. **User Experience** (weight: 15%) — App quality, onboarding flow, support responsiveness
4. **Trust & Safety** (weight: 15%) — FDA compliance, medical oversight, pharmacy verification, transparency
5. **Accessibility** (weight: 10%) — State availability, insurance acceptance, FSA/HSA, shipping speed
6. **Support** (weight: 10%) — Dietitian access, coaching, community, follow-up care

Composite score = weighted average. Displayed as overall score + radar chart breakdown on review pages.

---

## Data Model (Sanity CMS)

### Provider
- name, slug, logo, description
- category (GLP-1 Provider, Weight Loss Program, Supplement, etc.)
- pricing (array of { dose, form, monthly_cost, promo_code, promo_price })
- scores (value, effectiveness, ux, trust, accessibility, support)
- features (array of strings: "FSA/HSA", "Video Calls", "Dietitian", etc.)
- states_available (array of state codes)
- affiliate_url, affiliate_network
- fda_warnings (array of { date, description })
- review_content (rich text)
- pros, cons (arrays of strings)
- best_for (string superlative)
- is_featured (boolean, for sponsored listings)
- external_reviews ({ trustpilot_score, trustpilot_count, google_score, google_count })

### Drug
- name, slug, generic_name, brand_names
- description, how_it_works, side_effects
- fda_status, approval_date
- dosing_schedule (array of { week_range, dose })
- clinical_trial_summary

### Category
- name, slug, description, icon
- parent_category (for subcategories)

### Blog Post
- title, slug, excerpt, body (rich text)
- author, published_date, updated_date
- category, tags
- featured_image

### State
- name, code, slug
- notes (state-specific regulations)
- featured_providers (references)

### Price History
- provider (reference), date, dose, price
- Used for price tracker charts

---

## Design System

### Colors
- **Primary gradient:** `#8b5cf6` (violet) → `#3b82f6` (blue)
- **Background:** `#faf5ff` (very light purple) → `#f0f9ff` (very light blue)
- **Surface:** `#ffffff` with `border: 1px solid rgba(139,92,246,0.15)`
- **Text primary:** `#1e1b4b` (deep indigo)
- **Text secondary:** `#64748b` (slate)
- **Success/savings:** `#10b981` (emerald)
- **Warning/FDA:** `#f59e0b` (amber)
- **Star ratings:** `#f59e0b`
- **CTA buttons:** Primary gradient, white text, rounded-full

### Typography
- **Headings:** Inter or Plus Jakarta Sans, bold
- **Body:** Inter, regular
- **Scores/prices:** Tabular numbers, bold, gradient text for emphasis

### Components
- **Provider Card:** White rounded-2xl, subtle shadow, gradient border-left accent for featured
- **Score Badge:** Circular, gradient background, large number
- **Filter Pills:** Rounded-full, purple/blue tones, active state fills with gradient
- **CTA Button:** Gradient background, white text, rounded-full, hover glow effect
- **Comparison Table:** Alternating rows, sticky header, checkmark/x icons
- **Trust Badge:** Small pill with icon (medical reviewer, last updated, verified)

### Responsive
- **Desktop:** 3-column provider grid, sidebar filters
- **Tablet:** 2-column grid, collapsible filters
- **Mobile:** Single column, bottom sheet filters, sticky CTA bar

---

## Email Capture Strategy

### Lead Magnets (email-gated)
1. Savings Calculator results
2. Insurance Coverage Checker results
3. "Free GLP-1 Starter Guide" (PDF)
4. Price drop alerts subscription

### Email Sequences
1. **Welcome sequence** (5 emails): education → comparison → recommendation → CTA
2. **Price drop alerts**: automated when CMS price data changes
3. **Weekly newsletter**: new reviews, price changes, FDA news
4. **Abandoned tool flow**: started calculator but didn't finish → reminder email

### Tool: Resend (transactional emails) + ConvertKit (sequences, newsletter, automation)

---

## Sponsored Listings

Providers can pay for enhanced visibility:
- **Featured badge** on provider card
- **Top placement** in comparison tool (labeled "Sponsored")
- **Enhanced review page** with video embed and extended content
- **Homepage feature** in "Top Rated This Month" section

All sponsored content clearly labeled per FTC guidelines. Sales page at `/advertise` with traffic stats and pricing.

---

## SEO Strategy

### Programmatic Pages (auto-generated from CMS data)
- 50 state pages (`/states/[state]`)
- ~100 provider review pages (`/reviews/[provider]`)
- ~500 VS pages (`/compare/[a]-vs-[b]`) — every pair in same category
- ~50 alternatives pages (`/alternatives/[provider]`)
- ~20 "best" category pages (`/best/[category]`)
- ~40 subcategory pages (`/best/[category]/[subcategory]`)

### Technical SEO
- Static generation (SSG) for all content pages
- Dynamic rendering for comparison tool with filter state in URL
- JSON-LD schema markup: Product, Review, FAQ, HowTo, MedicalWebPage
- Canonical URLs for filtered comparison tool states
- XML sitemap auto-generated from CMS
- Open Graph + Twitter cards for social sharing
- Core Web Vitals optimized (target all green)

### Content Calendar
- 2-4 blog posts per week
- Monthly price update sweeps
- Quarterly full re-review of top providers
- Real-time FDA news coverage

---

## Analytics & Tracking

- **Vercel Analytics** for Core Web Vitals
- **PostHog or Plausible** for privacy-friendly analytics (no cookie banner needed)
- **Affiliate click tracking:** UTM parameters + custom event logging
- **Conversion funnel tracking:** filter usage → card views → affiliate clicks
- **Email capture rate** per tool
- **A/B testing** on CTA copy, card layouts, pricing display formats

---

## Launch Plan

### Phase 1 (MVP — Weeks 1-3)
- Homepage, comparison tool, 10 GLP-1 provider reviews, 5 "best" pages
- Savings calculator (email-gated)
- 5 state pages (TX, CA, FL, NY, IL)
- Blog with 5 launch articles
- Basic email capture + welcome sequence

### Phase 2 (Weeks 4-6)
- All 50 state pages
- Insurance checker tool
- VS pages (auto-generated)
- Alternatives pages
- Weight loss programs category (Noom, WW, etc.)
- Price tracker with historical data
- Dose timeline tool

### Phase 3 (Weeks 7-10)
- Supplements, meal delivery, fitness apps categories
- Sponsored listings system + `/advertise` page
- Newsletter monetization
- Advanced comparison features (side-by-side drawer)
- Metabolic testing, coaching categories

---

## FTC Compliance

- Clear affiliate disclosure on every page with affiliate links
- "Sponsored" labels on all paid placements
- Editorial independence statement on `/methodology`
- No false health claims — stick to FDA-approved language
- Medical disclaimer on health-related content
