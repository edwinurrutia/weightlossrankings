# Retired tools

Tools we've pulled from the site, the reasoning, and the conditions under which we'd consider bringing them back. Read before proposing a similar tool.

## `/insurance-checker` (Insurance Coverage Checker) — retired 2026-04-08

**What it was.** A 5-step wizard (insurance type → medication → state → email gate → coverage result) that asked the user about their plan and returned a coverage prediction for Wegovy/Ozempic/Mounjaro/Zepbound.

**Why we retired it.**

1. **Structurally hard to be YMYL-accurate.** Insurance formularies change monthly. They vary by plan tier within the same insurer. Employer riders change them further. A static tool predicting "does your plan cover Wegovy?" will always be either wrong some percent of the time or so hedged it's useless. Our YMYL rule requires 125% accuracy with primary-source citations for every claim — that bar is structurally impossible for a coverage-prediction tool to clear.
2. **Already stale at retirement.** The medication list was `["Wegovy", "Ozempic", "Mounjaro", "Zepbound", "Not sure yet"]` — no Foundayo (orforglipron), which the FDA approved in early 2026. Every new GLP-1 approval widens the staleness gap.
3. **YMYL liability asymmetry.** If the tool says "your plan covers Zepbound" and it doesn't, the user is out hundreds of dollars and blames us. Being right is "meh, I already knew." Being wrong is real harm. That's the wrong risk profile for a YMYL site.
4. **We already have the honest version.** `/research/glp1-insurance-coverage-medicare-medicaid-commercial` covers the same ground as a research article with primary-source citations (KFF, CMS, employer survey data) and explicit caveats. It's the kind of content our SEO strategy ("rigorously sourced content + working tools") actually rewards.
5. **Doesn't fit the tool strategy.** Our other tools (weight loss calculator, savings calculator, dose plotter, protein calculator, reconstitution calculator, etc.) are grounded in math or verifiable inputs where we can be 110% correct. Insurance prediction is structurally a different kind of problem and doesn't belong in the same portfolio.

**What got deleted.**

- `src/app/insurance-checker/page.tsx`
- `src/components/insurance/` (entire directory: `InsuranceWizard`, `InsuranceStep`, `MedicationStep`, `StateStep`, `CoverageResults`, `EmailGate`)
- The `ToolEntry` for `insurance-checker` in `src/lib/tools.ts`
- References in `learn-topics.json`, `learn-articles.json` body text, `variants.ts`, `insurance/[insurer]/page.tsx` CTA, `insurance-employer-checker` related-tools list — all re-pointed at the research article or replaced with "call your insurer" guidance

**The 301.** `/insurance-checker` → `/research/glp1-insurance-coverage-medicare-medicaid-commercial` (permanent, via `next.config.mjs`).

**When we'd consider reviving it.**

We'd need a live, authoritative data source — ideally one of:

- A partnership with a formulary data vendor (MMIT, Fingertip Formulary, RxAssist) that publishes machine-readable formulary updates with confidence scores
- CMS Part D formulary file direct integration for the Medicare side (refreshed quarterly by CMS)
- An API from a PBM (Express Scripts, CVS Caremark, OptumRx) — these don't currently exist for third-party tools but could change
- A crowd-sourced data layer where users can correct entries and we track staleness per-entry with verification timestamps (similar to how the provider registry works)

Without one of those, a coverage prediction tool is guessing dressed up as a calculator — and the liability/accuracy profile makes it the wrong bet for this site's YMYL posture.

## `/savings-calculator` (older wizard) — retired 2026-04-08

**What it was.** A thinner (43-line page + `components/calculator/StepWizard`) multi-step email-gated wizard for GLP-1 savings calculation. Predated the current canonical tool.

**Why we retired it.** It was a strict duplicate of `/tools/glp1-savings-calculator`, which is the canonical version:

- Lives under the standard `/tools/glp1-*` naming convention
- Has a full `ToolEntry` in `src/lib/tools.ts`
- Ships the full 281-line page + 296-line `SavingsCalculator` component
- Uses the current pricing logic from `src/lib/savings-calculator-2026.ts`

The old version predated the tool registry standardization. Keeping two versions fragmented SEO signal, confused internal linking, and doubled maintenance.

**What got deleted.**

- `src/app/savings-calculator/page.tsx`
- `src/components/calculator/` (entire directory — only the retired page imported from it)

**The 301.** `/savings-calculator` → `/tools/glp1-savings-calculator` (permanent, via `next.config.mjs`).

**Header nav.** Updated from `/savings-calculator` to `/tools/glp1-savings-calculator` in `src/components/layout/Navbar.tsx`.

**Follow-up.** Deep-link hrefs in `learn-articles.json` bodies, research articles, city/state pages, and marketing components still point at the old `/savings-calculator` URL. They all follow the 301 correctly so nothing is broken, but it's cleaner to update them to the new canonical URL in a follow-up cleanup to save the redirect round trip. Low priority.
