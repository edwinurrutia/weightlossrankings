import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import WeightLossCalculator from "./WeightLossCalculator";

export const metadata: Metadata = {
  title:
    "GLP-1 Weight Loss Calculator | STEP-1 & SURMOUNT-1 Trial Data Predictor",
  description:
    "Free interactive weight loss calculator backed by the actual STEP-1 (semaglutide), SURMOUNT-1 (tirzepatide), and ATTAIN-1 (Foundayo/orforglipron) phase 3 trial data. Enter your starting weight and target week to see predicted weight loss at every milestone. Sourced from NEJM publications.",
  alternates: { canonical: "/tools/glp1-weight-loss-calculator" },
};

const CITATIONS = [
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
  {
    authors: "Eli Lilly and Company.",
    title:
      "FDA approves Lilly's Foundayo (orforglipron), the only GLP-1 pill for weight loss that can be taken any time of day without food or water restrictions.",
    source: "Lilly Investor Press Release, April 1, 2026",
    year: 2026,
    url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
  },
  {
    authors:
      "Kushner RF, Calanna S, Davies M, Dicker D, Garvey WT, Goldman B, Lingvay I, Thomsen M, Wadden TA, Wharton S, Wilding JPH, Rubino D.",
    title:
      "Semaglutide 2.4 mg for the Treatment of Obesity: Key Elements of the STEP Trials 1 to 5.",
    source: "Obesity (Silver Spring)",
    year: 2020,
    pmid: "32978870",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
  },
];

export default function WeightLossCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 weight loss calculator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Weight loss predictor
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Weight Loss Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Enter your starting weight and see the predicted weight loss
          at every milestone on semaglutide, tirzepatide, or
          orforglipron. Predictions are scaled from the actual
          published STEP-1, SURMOUNT-1, and ATTAIN-1 phase 3 trial
          curves — not generic percentages.
        </p>
      </header>

      <WeightLossCalculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How the predictions are calculated</h2>
        <p>
          Most online weight-loss calculators use simplistic
          percentages (&ldquo;you&apos;ll lose 10-15% on a GLP-1&rdquo;).
          This calculator does something different: it takes the
          actual published week-by-week mean weight loss curves from
          three phase 3 trials and scales them to your starting
          weight using linear interpolation between the published
          datapoints.
        </p>
        <p>
          The three trials powering the calculator:
        </p>
        <ul>
          <li>
            <strong>STEP-1 [1]</strong> — Wilding et al., NEJM 2021,
            n=1,961, semaglutide 2.4 mg weekly, 68 weeks. Final
            endpoint: −14.9%.
          </li>
          <li>
            <strong>SURMOUNT-1 [2]</strong> — Jastreboff et al., NEJM
            2022, n=2,539, tirzepatide 15 mg weekly, 72 weeks.
            Final endpoint: −20.9%.
          </li>
          <li>
            <strong>ATTAIN-1 [3]</strong> — Eli Lilly 2026 FDA
            approval trial, n=3,127, orforglipron (Foundayo) 17.2 mg
            daily oral, 72 weeks. Final endpoint: −12.4%.
          </li>
        </ul>
        <p>
          At each published week in the trial (weeks 4, 8, 12, 16,
          20, 28, 40, 52, and the final endpoint), the calculator
          uses the reported mean body weight loss as a percentage.
          Between those datapoints, a linear interpolation
          approximates the curve. Your predicted absolute weight loss
          at any week is simply{" "}
          <code>(starting weight × mean loss %)</code>.
        </p>

        <h2>What the conservative and optimistic ranges mean</h2>
        <p>
          The low and high estimates in the prediction card are
          approximately ±25% of the mean, which encompasses roughly
          the interquartile band of the STEP-1 patient-level
          variability reported in the trial supplementary data. In
          STEP-1, about 86% of participants achieved at least 5%
          weight loss on semaglutide [1] — so the &ldquo;low&rdquo;
          estimate corresponds to approximately the 25th percentile
          responder, the mean to the 50th percentile, and the
          &ldquo;high&rdquo; to approximately the 75th percentile.
          Patients in the top 10% of responders often lose
          considerably more than the &ldquo;optimistic&rdquo;
          estimate suggests; patients in the bottom 10% may lose
          considerably less.
        </p>

        <h2>What the calculator doesn&apos;t account for</h2>
        <p>
          This is an educational tool that approximates the
          published trial data. It does not account for:
        </p>
        <ul>
          <li>
            <strong>Individual variation.</strong> Starting BMI, age,
            sex, baseline metabolic rate, diet quality, physical
            activity, and sleep all affect response. Trial means
            hide significant patient-level variance.
          </li>
          <li>
            <strong>Dose-response at lower doses.</strong> The
            predictions assume you are progressing through the
            standard titration schedule and reaching the maintenance
            dose that the trial used. Patients who stay at a lower
            dose indefinitely (microdosing) will see less weight
            loss — see our{" "}
            <Link href="/research/semaglutide-microdosing-evidence-guide">
              microdose evidence guide
            </Link>{" "}
            for the dose-response data.
          </li>
          <li>
            <strong>Injection technique errors.</strong> Repeated
            injection into a lipohypertrophic site can reduce
            absorption by 25-50% and cause an apparent &ldquo;non-
            response&rdquo; that is actually an injection issue. See
            our{" "}
            <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
              injection guide
            </Link>
            .
          </li>
          <li>
            <strong>Compounded dose math errors.</strong> If you are
            on compounded semaglutide or tirzepatide and the unit-to-
            mg conversion is wrong, your effective dose can be half
            or double the intended. See our{" "}
            <Link href="/tools/glp1-unit-converter">
              unit converter
            </Link>
            .
          </li>
          <li>
            <strong>Protein intake and exercise.</strong> The STEP
            and SURMOUNT trials all included dietary counseling.
            Patients who ignore the dietary side of therapy
            generally do worse than the trial average — see our{" "}
            <Link href="/research/what-to-eat-on-glp1-diet-protein-guide">
              diet guide
            </Link>{" "}
            and{" "}
            <Link href="/research/semaglutide-muscle-mass-loss">
              muscle mass deep-dive
            </Link>
            .
          </li>
          <li>
            <strong>Discontinuation rebound.</strong> The STEP-4
            extension trial showed that patients who stopped
            semaglutide regained roughly 67% of the lost weight
            within a year. Predictions assume continued treatment.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. The predicted values are
          scaled from the published mean weight loss curves of
          phase 3 clinical trials and should not be interpreted as
          a guarantee of your personal outcome. Individual results
          vary substantially based on factors the calculator
          cannot account for. Weight Loss Rankings does not provide
          medical advice, diagnosis, or treatment recommendations.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose plotter
            </Link>{" "}
            — the plasma concentration buildup curves behind these
            weight loss numbers
          </li>
          <li>
            <Link href="/tools/glp1-unit-converter">
              GLP-1 unit converter
            </Link>{" "}
            — mg ↔ insulin syringe units for compounded dosing
          </li>
          <li>
            <Link href="/research/how-long-does-glp1-take-to-work">
              How long does GLP-1 take to work?
            </Link>{" "}
            — the three separate timescales explained
          </li>
          <li>
            <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
              Tirzepatide vs semaglutide head-to-head
            </Link>{" "}
            — why SURMOUNT-1 produces larger weight loss than STEP-1
          </li>
          <li>
            <Link href="/research/what-happens-when-you-stop-semaglutide">
              What happens when you stop semaglutide
            </Link>{" "}
            — the STEP-4 extension data on rebound
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
