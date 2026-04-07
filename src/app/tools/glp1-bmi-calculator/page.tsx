import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import BmiCalculator from "./BmiCalculator";

export const metadata: Metadata = {
  title:
    "GLP-1 BMI Calculator | See Where You Land at Each Trial Endpoint | Weight Loss Rankings",
  description:
    "Free BMI calculator with a GLP-1 outcome overlay. Enter your starting weight and height to see your current WHO BMI category, your Wegovy/Zepbound FDA eligibility, and what BMI category you'd land in at each trial endpoint (STEP-1, SURMOUNT-1, ATTAIN-1). Sourced from FDA prescribing information and NEJM publications.",
  alternates: { canonical: "/tools/glp1-bmi-calculator" },
};

const CITATIONS = [
  {
    authors: "World Health Organization.",
    title:
      "Body mass index — BMI — Global Database on Body Mass Index.",
    source: "WHO Nutrition",
    year: 2024,
    url: "https://www.who.int/health-topics/obesity",
  },
  {
    authors: "Centers for Disease Control and Prevention.",
    title:
      "Adult BMI Categories — CDC Healthy Weight, Nutrition, and Physical Activity.",
    source: "CDC",
    year: 2024,
    url: "https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information, Section 1: Indication and Usage (BMI ≥ 30 or ≥ 27 with comorbidity).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 1: Indication and Usage (BMI ≥ 30 or ≥ 27 with comorbidity).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
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
  {
    authors: "Eli Lilly and Company.",
    title:
      "FDA approves Lilly's Foundayo (orforglipron), the only GLP-1 pill for weight loss.",
    source: "Lilly Investor Press Release, April 1, 2026",
    year: 2026,
    url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
  },
];

export default function BmiCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">GLP-1 BMI calculator</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          BMI calculator with GLP-1 overlay
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 BMI Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Calculate your current Body Mass Index, see your FDA-approved
          Wegovy and Zepbound eligibility, and see what BMI category
          you&apos;d land in at each published GLP-1 trial endpoint —
          STEP-1, SURMOUNT-1, and ATTAIN-1.
        </p>
      </header>

      <BmiCalculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>What BMI is and what it isn&apos;t</h2>
        <p>
          BMI is a simple ratio of body weight to height squared
          (kg/m²) that the World Health Organization uses to classify
          adults into six categories: underweight, normal weight,
          overweight, and three classes of obesity [1, 2]. It&apos;s a
          population-level screening tool, not a diagnosis. BMI does
          not distinguish between fat mass and lean mass, doesn&apos;t
          account for body fat distribution, and can over- or
          under-classify athletes, older adults, and people with
          certain body compositions.
        </p>
        <p>
          For GLP-1 prescribing decisions, however, BMI is the
          specific clinical criterion the FDA uses to define
          eligibility, so even though it&apos;s an imperfect tool,
          it&apos;s the tool that determines whether you can get a
          prescription [3, 4].
        </p>

        <h2>FDA eligibility for Wegovy and Zepbound</h2>
        <p>
          Both Wegovy (semaglutide 2.4 mg) and Zepbound (tirzepatide
          15 mg) have the same FDA-approved BMI eligibility criterion
          for chronic weight management [3, 4]:
        </p>
        <ul>
          <li>
            <strong>BMI ≥ 30</strong> (any class of obesity), OR
          </li>
          <li>
            <strong>BMI ≥ 27</strong> WITH at least one weight-related
            comorbidity such as type 2 diabetes, hypertension, sleep
            apnea, dyslipidemia, or established cardiovascular
            disease.
          </li>
        </ul>
        <p>
          Patients below BMI 27 are generally not eligible under the
          FDA-approved labeling. Off-label prescribing exists but is
          uncommon for weight management at lower BMI ranges.
        </p>

        <h2>What the GLP-1 overlay shows</h2>
        <p>
          The trial outcome cards below the BMI result show the
          predicted BMI and category you&apos;d land in if you achieved
          the published mean weight loss from each phase 3 trial:
        </p>
        <ul>
          <li>
            <strong>STEP-1 [5]</strong> — semaglutide 2.4 mg, 14.9%
            mean body weight loss at 68 weeks
          </li>
          <li>
            <strong>SURMOUNT-1 [6]</strong> — tirzepatide 15 mg, 20.9%
            mean body weight loss at 72 weeks
          </li>
          <li>
            <strong>ATTAIN-1 [7]</strong> — orforglipron (Foundayo),
            12.4% mean body weight loss at 72 weeks
          </li>
        </ul>
        <p>
          The math is direct: your starting BMI multiplied by{" "}
          (1 - mean loss percentage / 100). Real outcomes vary
          substantially by individual — see our{" "}
          <Link href="/tools/glp1-weight-loss-calculator">
            weight loss calculator
          </Link>{" "}
          for the full conservative/optimistic range and the
          week-by-week milestones.
        </p>

        <h2>Important caveats</h2>
        <ul>
          <li>
            <strong>BMI is a population tool, not a diagnostic.</strong>{" "}
            Two people with the same BMI can have very different body
            compositions and very different cardiometabolic risk
            profiles.
          </li>
          <li>
            <strong>FDA eligibility is the floor, not the ceiling.</strong>{" "}
            Insurance coverage decisions often add additional criteria
            (lifestyle program documentation, BMI ≥ 35, specific
            comorbidities) on top of the FDA approval. See our{" "}
            <Link href="/tools/insurance-employer-checker">
              insurance employer checker
            </Link>
            .
          </li>
          <li>
            <strong>Individual variation is large.</strong> The trial
            mean values are averages across thousands of patients.
            About 10-15% of trial participants lost less than 5% even
            at the maintenance dose; about 10% lost considerably more.
            See our{" "}
            <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
              plateau and non-responder guide
            </Link>{" "}
            for the response distribution.
          </li>
          <li>
            <strong>Body composition matters more than total weight.</strong>{" "}
            Up to 40% of weight lost on a GLP-1 can be lean mass if
            protein intake and resistance training are inadequate.
            See our{" "}
            <Link href="/research/semaglutide-muscle-mass-loss">
              muscle mass deep-dive
            </Link>
            .
          </li>
          <li>
            <strong>Discontinuation rebound.</strong> The STEP-4 and
            SURMOUNT-4 trials showed that patients who stopped GLP-1
            therapy regained roughly 67% of the lost weight within a
            year. See our{" "}
            <Link href="/research/how-to-taper-off-glp1-safely-guide">
              tapering guide
            </Link>
            .
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This calculator is for educational purposes only and does
          not constitute medical advice. BMI is a screening tool, not
          a diagnosis, and FDA eligibility is one of many factors a
          prescriber considers when deciding whether to start GLP-1
          therapy. Individual outcomes vary substantially. Weight Loss
          Rankings does not provide medical advice, diagnosis, or
          treatment recommendations.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/tools/glp1-weight-loss-calculator">
              GLP-1 weight loss calculator
            </Link>{" "}
            — week-by-week trial-data-backed predictions
          </li>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose plotter
            </Link>{" "}
            — pharmacokinetic buildup curves for each titration step
          </li>
          <li>
            <Link href="/tools/glp1-unit-converter">
              GLP-1 unit converter
            </Link>{" "}
            — mg ↔ insulin syringe units for compounded vials
          </li>
          <li>
            <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
              Tirzepatide vs semaglutide head-to-head
            </Link>{" "}
            — full effect-size comparison
          </li>
          <li>
            <Link href="/research/foundayo-orforglipron-fda-approval-2026">
              Foundayo (orforglipron) approval deep-dive
            </Link>{" "}
            — the new oral option
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
