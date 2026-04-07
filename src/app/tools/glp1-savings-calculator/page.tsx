import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import SavingsCalculator from "./SavingsCalculator";

export const metadata: Metadata = {
  title:
    "GLP-1 Savings Calculator 2026 — Wegovy, Zepbound, Compounded, Foundayo Cost Comparison",
  description:
    "Calculate how much you'd save (or spend extra) by switching between brand-name Wegovy, Zepbound, compounded semaglutide or tirzepatide, and Foundayo (orforglipron) at $149/month self-pay. Real 2026 monthly costs across all 10 common access paths, with 1/2/5-year totals.",
  alternates: { canonical: "/tools/glp1-savings-calculator" },
};

// The year lives in the page title (browser tab + Google SERP) and
// in the visible "Updated [Month Year]" subhead — both can be
// refreshed annually without changing the canonical URL. The URL
// stays /tools/glp1-savings-calculator forever so all backlinks
// and SEO equity accumulate on a single evergreen path. Bump this
// to "2027" / "April 2027" when next year's price refresh ships.
const PRICING_AS_OF = "April 2026";

const CITATIONS = [
  {
    authors: "Eli Lilly and Company.",
    title:
      "FDA approves Lilly's Foundayo (orforglipron) — $25/month with insurance, $149/month self-pay through LillyDirect.",
    source: "Lilly Investor Press Release, April 1, 2026",
    year: 2026,
    url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "NovoCare Pharmacy direct-pay program for Wegovy.",
    source: "NovoCare",
    year: 2025,
    url: "https://www.novocare.com/wegovy.html",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "LillyDirect direct-pay vials for Zepbound — single-vial $349-$599 depending on dose.",
    source: "LillyDirect",
    year: 2025,
    url: "https://www.lillydirect.com",
  },
  {
    authors: "Weight Loss Rankings.",
    title:
      "GLP-1 Compounded Pricing Index 2026.",
    source: "Internal pricing index — live dataset",
    year: 2026,
    url: "https://weightlossrankings.org/research/glp1-pricing-index",
  },
  {
    authors: "U.S. Food and Drug Administration.",
    title:
      "Compounded Drug Products — 503A and 503B Outsourcing Facility Information.",
    source: "FDA Drug Compounding Resources",
    year: 2024,
    url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
  },
];

export default function SavingsCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 savings calculator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Cost comparison · pricing updated {PRICING_AS_OF}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Savings Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Compare what you&apos;re currently paying for your GLP-1 to
          every other current access path — brand-name with insurance,
          manufacturer direct-pay, compounded vials, or Foundayo at
          $149/month self-pay. See your monthly, yearly, and 5-year
          savings or extra cost. Pricing data updated {PRICING_AS_OF}.
        </p>
      </header>

      <SavingsCalculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>The 2026 GLP-1 cost landscape</h2>
        <p>
          The cost of GLP-1 weight loss therapy varies by an{" "}
          <strong>order of magnitude</strong> across the access paths
          available in 2026 — from $25/month with full commercial
          insurance coverage and a savings card, to $99-$199/month
          for compounded semaglutide, to $499/month for Wegovy via
          NovoCare direct-pay, to $1,300+/month list price without
          any discounts.
        </p>
        <p>
          The biggest 2026 change is the{" "}
          <strong>Foundayo (orforglipron) launch on April 1, 2026 at
          $149/month self-pay</strong> [1]. This is the first
          FDA-approved branded GLP-1 priced at the same level as
          compounded semaglutide and tirzepatide, and it has
          materially compressed the price floor across the entire
          market.
        </p>

        <h2>How the calculator works</h2>
        <p>
          Pick your current access path from the &ldquo;Currently
          paying&rdquo; dropdown and the alternative you&apos;re
          considering from the &ldquo;Switching to&rdquo; dropdown.
          The calculator uses the verified 2026 default monthly cost
          for each option, but you can override either price with the
          actual amount you&apos;re paying or quoted. The result card
          shows your monthly, yearly, and 5-year savings (or extra
          cost) for the switch.
        </p>

        <h2>Important context for each access path</h2>
        <ul>
          <li>
            <strong>Brand-name with insurance + savings card.</strong>{" "}
            Both Wegovy and Zepbound have manufacturer savings cards
            that bring eligible patient costs to $25/month. Eligibility
            requires commercial insurance (not Medicare or Medicaid),
            an FDA-on-label prescription, and a prior authorization
            approval. Without the PA, the savings card doesn&apos;t
            apply.
          </li>
          <li>
            <strong>Brand-name self-pay direct-pay.</strong> Both
            manufacturers operate direct-pay pharmacies for patients
            who can&apos;t use insurance: NovoCare for Wegovy ($499/mo)
            and LillyDirect for Zepbound (single-vial pricing
            $349-$599 depending on dose) [2, 3]. These are bypass
            programs that skip the insurance system entirely.
          </li>
          <li>
            <strong>Compounded semaglutide and tirzepatide.</strong>{" "}
            Sold by 503A compounding pharmacies through telehealth
            providers. Prices range from $99/month at the floor to
            $300+/month at the median. The compounded format is{" "}
            <em>not FDA-approved</em> and quality varies meaningfully
            between pharmacies. See our{" "}
            <Link href="/research/compounded-semaglutide-bioequivalence">
              compounded bioequivalence investigation
            </Link>{" "}
            and our{" "}
            <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
              PCAB accreditation guide
            </Link>{" "}
            for the quality considerations [5].
          </li>
          <li>
            <strong>Foundayo (orforglipron).</strong> The newest
            entry. $25/month with commercial insurance + savings
            card, $149/month self-pay through LillyDirect [1]. The
            self-pay tier is the most aggressive branded GLP-1
            pricing in the market and we expect it to drive a
            meaningful share of the compounded patient population
            back to brand-name therapy through 2026 and 2027.
          </li>
        </ul>

        <h2>Things the calculator doesn&apos;t account for</h2>
        <ul>
          <li>
            <strong>Insurance deductibles.</strong> The $25/month
            insurance numbers assume you&apos;ve already met any
            deductible. Early-year costs may be higher.
          </li>
          <li>
            <strong>Quantity-discount programs.</strong> Many
            telehealth providers offer multi-month bundles at lower
            per-month cost.
          </li>
          <li>
            <strong>Dose escalation pricing.</strong> Some
            manufacturer programs price the lower titration doses
            differently from the maintenance dose. The defaults here
            are the maintenance-dose price.
          </li>
          <li>
            <strong>Switching costs.</strong> Switching providers
            sometimes has one-time fees (intake consultation,
            shipping). The calculator does not subtract these.
          </li>
          <li>
            <strong>Quality and reliability differences.</strong>{" "}
            The cheapest option is rarely the best. A pharmacy with
            FDA warning letters, an unaccredited compounding facility,
            or a telehealth provider that disappears mid-year is
            cheaper for a reason. See our{" "}
            <Link href="/research/fda-warning-letters-glp1">
              FDA warning letters database
            </Link>{" "}
            before optimizing purely for price.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          Pricing is highly volatile in this category and the default
          monthly costs are best-effort 2026 snapshots from public
          sources. Always confirm your actual price with your
          prescriber, pharmacy, or telehealth provider before
          committing to a switch. Insurance coverage decisions vary
          by plan and can change year to year. This calculator does
          not constitute medical or financial advice.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/research/glp1-pricing-index">
              Live GLP-1 pricing index
            </Link>{" "}
            — full dataset across the entire compounded telehealth
            market
          </li>
          <li>
            <Link href="/tools/glp1-weight-loss-calculator">
              GLP-1 weight loss calculator
            </Link>{" "}
            — predict your weight loss outcome at each access path
          </li>
          <li>
            <Link href="/tools/glp1-bmi-calculator">
              GLP-1 BMI calculator
            </Link>{" "}
            — see your FDA eligibility and trial-endpoint BMI
          </li>
          <li>
            <Link href="/tools/insurance-employer-checker">
              Insurance employer checker
            </Link>{" "}
            — see whether your employer covers Wegovy or Zepbound
          </li>
          <li>
            <Link href="/research/foundayo-orforglipron-fda-approval-2026">
              Foundayo approval deep-dive
            </Link>{" "}
            — the new $149/month oral pill that&apos;s reshaping the
            cost floor
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
