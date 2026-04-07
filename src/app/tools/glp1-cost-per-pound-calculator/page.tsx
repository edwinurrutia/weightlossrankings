import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import FaqSchema from "@/components/research/FaqSchema";
import Calculator, { DRUGS, projectDrug } from "./Calculator";

export const metadata: Metadata = {
  title:
    "GLP-1 Cost Per Pound Lost Calculator: Sema vs Tirz vs Foundayo",
  description:
    "Free calculator that converts GLP-1 monthly price into dollars per pound lost using STEP-1, SURMOUNT-1, ATTAIN-1, and SCALE trial data. Compare Wegovy, Zepbound, Foundayo, and Saxenda by efficiency, not sticker price.",
  alternates: { canonical: "/tools/glp1-cost-per-pound-calculator" },
};

const CITATIONS = [
  {
    authors: "Novo Nordisk Inc.",
    title: "WEGOVY (semaglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title: "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "FOUNDAYO (orforglipron) tablets — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2026,
    url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
  },
  {
    authors: "Novo Nordisk Inc.",
    title: "SAXENDA (liraglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2024,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/206321s019lbl.pdf",
  },
  {
    authors:
      "Wilding JPH, Batterham RL, Calanna S, Davies M, Van Gaal LF, Lingvay I, McGowan BM, Rosenstock J, Tran MTD, Wadden TA, Wharton S, Yokote K, Zeuthen N, Kushner RF; STEP 1 Study Group.",
    title:
      "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
    source: "N Engl J Med",
    year: 2021,
    pmid: "33567185",
  },
  {
    authors:
      "Jastreboff AM, Aronne LJ, Ahmad NN, Wharton S, Connery L, Alves B, Kiyosue A, Zhang S, Liu B, Bunck MC, Stefanski A; SURMOUNT-1 Investigators.",
    title:
      "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
    source: "N Engl J Med",
    year: 2022,
    pmid: "35658024",
  },
];

const FAQS = [
  {
    question: "Why does cost per pound matter more than monthly cost?",
    answer:
      "Two drugs with the same monthly price can produce very different total weight loss. A $1,000/month drug that helps you lose 50 lbs is dramatically more efficient than an $800/month drug that helps you lose 20 lbs. Cost per pound lost normalizes for efficacy so you compare what you actually get for the spend.",
  },
  {
    question: "Which GLP-1 has the lowest cost per pound lost?",
    answer:
      "At list price, Zepbound 15 mg (tirzepatide) is the most efficient brand-name option because its 20.9% trial weight loss is the highest of any FDA-approved obesity drug, and Lilly's monthly list price is similar to Wegovy. Compounded semaglutide and tirzepatide can be even cheaper per pound, but compounding carries quality and supply risk.",
  },
  {
    question: "Are these numbers accurate for me personally?",
    answer:
      "They are an honest projection based on trial averages, not a guarantee. Roughly half of trial participants lost more than the mean and half lost less. Adherence, dose escalation, diet, sleep, and biology all matter. Treat the calculator as a planning tool, not a prediction.",
  },
  {
    question:
      "Why is tirzepatide cheaper per pound despite a similar monthly cost?",
    answer:
      "Because the SURMOUNT-1 trial showed tirzepatide 15 mg produced 20.9% mean weight loss versus 14.9% for semaglutide 2.4 mg in STEP-1. More pounds lost for the same monthly spend means a lower dollar-per-pound number, even when the sticker prices are close.",
  },
  {
    question: "What about compounded versions?",
    answer:
      "Compounded semaglutide and tirzepatide can drop the monthly cost to $150 to $300, which collapses the cost per pound lost. The math changes dramatically — see our cheapest compounded semaglutide guide for current pricing and the supply and quality caveats you need to understand first.",
  },
  {
    question: "Does insurance change the math?",
    answer:
      "Yes, dramatically. If your plan covers Wegovy or Zepbound at a $25 to $50 copay, the cost per pound drops by an order of magnitude. Plug your actual out-of-pocket monthly cost into the calculator instead of the brand list price to see your real number.",
  },
];

// ---------------------------------------------------------------------------
// Static fallback table for no-JS / first-crawl SEO content.
// Uses the same projectDrug() math as the client component.
// ---------------------------------------------------------------------------

const STATIC_WEIGHTS = [150, 200, 250, 300];
const STATIC_MONTHS = 12;

interface FallbackCell {
  weight: number;
  drugId: string;
  costPerLb: number | null;
  lbsLost: number;
  totalCost: number;
}

function buildFallbackRows(): FallbackCell[][] {
  return STATIC_WEIGHTS.map((w) =>
    DRUGS.map((d) => {
      const p = projectDrug(d, w, STATIC_MONTHS, d.defaultMonthlyCost);
      return {
        weight: w,
        drugId: d.id,
        costPerLb: p.costPerLb,
        lbsLost: p.expectedLossLbs,
        totalCost: p.totalCost,
      };
    }),
  );
}

function fmtMoney(n: number | null): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export default function CostPerPoundCalculatorPage() {
  const fallback = buildFallbackRows();

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Cost Per Pound Lost Calculator"
        description="Convert any GLP-1 monthly price into dollars per pound lost using STEP-1, SURMOUNT-1, ATTAIN-1, and SCALE trial data. Compare Wegovy, Zepbound, Foundayo, and Saxenda by efficiency."
        url="https://weightlossrankings.org/tools/glp1-cost-per-pound-calculator"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <FaqSchema items={FAQS} />

      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 cost per pound calculator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Efficiency calculator
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Cost Per Pound Lost Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Stop comparing GLP-1s by sticker price. This calculator
          plugs your weight, drug choice, and monthly cost into the
          published phase 3 trial weight-loss curves and tells you
          what you actually pay per pound lost — the efficiency
          metric nobody else publishes.
        </p>
      </header>

      <Calculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How the math works</h2>
        <p>
          Every brand-name GLP-1 obesity drug has a published mean
          weight loss percentage from its FDA pivotal trial. We use
          the FDA-label values:
        </p>
        <ul>
          <li>
            <strong>Wegovy 2.4 mg (semaglutide)</strong> — 14.9% mean
            weight loss over 68 weeks in STEP-1 [5].
          </li>
          <li>
            <strong>Zepbound 5 mg (tirzepatide)</strong> — 15.0% over
            72 weeks in SURMOUNT-1 [2].
          </li>
          <li>
            <strong>Zepbound 10 mg (tirzepatide)</strong> — 19.5%
            over 72 weeks in SURMOUNT-1 [2].
          </li>
          <li>
            <strong>Zepbound 15 mg (tirzepatide)</strong> — 20.9%
            over 72 weeks in SURMOUNT-1 [2][6].
          </li>
          <li>
            <strong>Foundayo 17.2 mg (orforglipron)</strong> — 11.1%
            over 72 weeks per the FDA-approved Foundayo prescribing
            information (the labeled maximum dose) [3].
          </li>
          <li>
            <strong>Saxenda 3 mg (liraglutide)</strong> — 8.0% over
            56 weeks in SCALE [4].
          </li>
        </ul>
        <p>
          For time horizons shorter than the trial endpoint, the
          calculator scales linearly along an S-curve anchored to
          the published intra-trial milestones:{" "}
          <code>
            month 1 = 25%, month 3 = 55%, month 6 = 80%, month 9 =
            95%, month 12+ = 100%
          </code>{" "}
          of the trial-endpoint loss. Most weight loss occurs in
          months 1-9 then plateaus, so this is a rough but reasonable
          approximation. Then:{" "}
          <code>
            lbs lost = starting weight &times; (trial % &times; time
            factor)
          </code>{" "}
          and{" "}
          <code>
            $/lb = (monthly cost &times; months) &divide; lbs lost
          </code>
          .
        </p>

        <h2>Reference table — $/lb lost at common weights (12 months, list price)</h2>
        <p>
          The table below assumes you stay on therapy for 12 months
          and pay the typical US brand cash list price (Wegovy and
          Saxenda at $1,349/mo, Zepbound at $1,086/mo, Foundayo at
          $999/mo). Plug your real out-of-pocket cost into the
          calculator above for an accurate personal number.
        </p>
        <div className="not-prose overflow-x-auto rounded-xl border border-brand-violet/15 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-violet/[0.06] text-brand-text-primary">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">
                  Starting weight
                </th>
                {DRUGS.map((d) => (
                  <th
                    key={d.id}
                    className="px-3 py-2 text-right font-semibold"
                  >
                    {d.brand}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fallback.map((row, i) => (
                <tr
                  key={STATIC_WEIGHTS[i]}
                  className="border-t border-brand-violet/10"
                >
                  <td className="px-3 py-2 font-semibold text-brand-text-primary">
                    {STATIC_WEIGHTS[i]} lbs
                  </td>
                  {row.map((cell) => (
                    <td
                      key={cell.drugId}
                      className="px-3 py-2 text-right text-brand-text-primary"
                    >
                      {fmtMoney(cell.costPerLb)}
                      <span className="block text-[11px] text-brand-text-secondary">
                        {cell.lbsLost.toFixed(1)} lbs
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-brand-text-secondary">
          Pattern to notice: dollar-per-pound is essentially
          independent of starting weight at a fixed percentage —
          which is exactly why efficacy percentage matters more
          than starting weight when comparing drugs. A 150 lb patient
          and a 300 lb patient will see similar $/lb on the same
          drug; the heavier patient just sees a bigger absolute pound
          number.
        </p>

        <h2>Frequently asked questions</h2>

        <h3>Why does cost per pound matter more than monthly cost?</h3>
        <p>
          Two drugs with the same monthly price can produce very
          different total weight loss. A $1,000/month drug that
          helps you lose 50 lbs is dramatically more efficient than
          an $800/month drug that helps you lose 20 lbs. Cost per
          pound lost normalizes for efficacy so you compare what you
          actually get for the spend.
        </p>

        <h3>Which GLP-1 has the lowest cost per pound lost?</h3>
        <p>
          At list price, Zepbound 15 mg (tirzepatide) is the most
          efficient brand-name option because its 20.9% trial weight
          loss is the highest of any FDA-approved obesity drug, and
          Lilly&apos;s monthly list price is similar to Wegovy.
          Compounded semaglutide and tirzepatide can be even cheaper
          per pound — see our{" "}
          <Link href="/research/cheapest-compounded-semaglutide">
            cheapest compounded semaglutide guide
          </Link>{" "}
          — but compounding carries quality and supply risk.
        </p>

        <h3>Are these numbers accurate for me personally?</h3>
        <p>
          They are an honest projection based on trial averages, not
          a guarantee. Roughly half of trial participants lost more
          than the mean and half lost less. Adherence, dose
          escalation, diet, sleep, and biology all matter. Treat the
          calculator as a planning tool, not a prediction.
        </p>

        <h3>
          Why is tirzepatide cheaper per pound despite a similar
          monthly cost?
        </h3>
        <p>
          Because SURMOUNT-1 [6] showed tirzepatide 15 mg produced
          20.9% mean weight loss versus 14.9% for semaglutide 2.4 mg
          in STEP-1 [5]. More pounds lost for the same monthly spend
          means a lower dollar-per-pound number, even when the
          sticker prices are close. This is the head-to-head efficacy
          gap covered in detail in our{" "}
          <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
            tirzepatide vs semaglutide head-to-head
          </Link>
          .
        </p>

        <h3>What about compounded versions?</h3>
        <p>
          Compounded semaglutide and tirzepatide can drop the
          monthly cost to $150 to $300, which collapses the cost per
          pound lost. The math changes dramatically. See our{" "}
          <Link href="/research/cheapest-compounded-semaglutide">
            cheapest compounded semaglutide guide
          </Link>{" "}
          for current pricing and the supply and quality caveats
          you need to understand first.
        </p>

        <h3>Does insurance change the math?</h3>
        <p>
          Yes, dramatically. If your plan covers Wegovy or Zepbound
          at a $25 to $50 copay, the cost per pound drops by an order
          of magnitude. Plug your actual out-of-pocket monthly cost
          into the calculator above instead of the brand list price
          to see your real number. For coverage strategy, see our{" "}
          <Link href="/research/glp1-pricing-index">
            GLP-1 pricing index
          </Link>
          .
        </p>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. The projected weight loss values
          come from the published mean efficacy data in the FDA
          prescribing information for each drug and from the
          underlying NEJM trial publications. Individual results vary
          substantially. Pricing assumptions are list prices and
          will not match your real out-of-pocket cost. Weight Loss
          Rankings does not provide medical advice, diagnosis, or
          treatment recommendations.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
              Tirzepatide vs semaglutide head-to-head
            </Link>{" "}
            — why the SURMOUNT-1 efficacy edge drives the $/lb gap
          </li>
          <li>
            <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
              Foundayo vs Wegovy vs Zepbound comparison
            </Link>{" "}
            — the three-way GLP-1 obesity drug comparison
          </li>
          <li>
            <Link href="/research/glp1-pricing-index">
              GLP-1 pricing index
            </Link>{" "}
            — current cash and insurance prices across the brands
          </li>
          <li>
            <Link href="/research/cheapest-compounded-semaglutide">
              Cheapest compounded semaglutide
            </Link>{" "}
            — how compounding changes the $/lb math
          </li>
          <li>
            <Link href="/tools/glp1-weight-loss-calculator">
              GLP-1 weight loss calculator
            </Link>{" "}
            — week-by-week trial-curve weight loss predictor
          </li>
          <li>
            <Link href="/tools/glp1-savings-calculator">
              GLP-1 savings calculator
            </Link>{" "}
            — how much you save vs cash brand pricing
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
