import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import ToolDataFreshness from "@/components/tools/ToolDataFreshness";
import BariatricEligibilityChecker from "./BariatricEligibilityChecker";
import { DATA_LAST_VERIFIED } from "@/lib/bariatric-eligibility";

export const metadata: Metadata = {
  title:
    "Bariatric Surgery Eligibility Checker — NIH 1991, ASMBS 2022, and Major US Payers",
  description:
    "Free bariatric surgery eligibility checker. Enter height, weight, age, and comorbidities to see whether you qualify under the academic NIH 1991 and ASMBS 2022 standards and under the major US payer policies (Medicare NCD 100.1, Aetna CPB 0157, Cigna 0051, UnitedHealthcare, BCBS, Humana). Every payer entry traces to the published clinical policy bulletin.",
  alternates: { canonical: "/tools/bariatric-surgery-eligibility-checker" },
};

const CITATIONS = [
  {
    authors: "NIH Consensus Development Panel.",
    title:
      "Gastrointestinal surgery for severe obesity. NIH Consensus Development Conference Statement.",
    source: "Am J Clin Nutr",
    year: 1992,
    pmid: "1733140",
  },
  {
    authors:
      "Eisenberg D, Shikora SA, Aarts E, et al.",
    title:
      "2022 American Society for Metabolic and Bariatric Surgery (ASMBS) and International Federation for the Surgery of Obesity and Metabolic Disorders (IFSO): Indications for Metabolic and Bariatric Surgery.",
    source: "Surg Obes Relat Dis",
    year: 2022,
    pmid: "36280539",
  },
  {
    authors: "Centers for Medicare & Medicaid Services.",
    title:
      "National Coverage Determination (NCD) 100.1 — Bariatric Surgery for Treatment of Co-morbid Conditions Related to Morbid Obesity.",
    source: "CMS Medicare Coverage Database",
    year: 2024,
    url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?NCDId=57",
  },
  {
    authors: "Aetna Inc.",
    title:
      "Aetna Clinical Policy Bulletin 0157 — Obesity Surgery.",
    source: "Aetna Medical Clinical Policy Bulletins",
    year: 2024,
    url: "https://www.aetna.com/cpb/medical/data/100_199/0157.html",
  },
  {
    authors: "Cigna.",
    title:
      "Cigna Medical Coverage Policy 0051 — Bariatric Surgery.",
    source: "Cigna Medical Coverage Policies",
    year: 2024,
    url: "https://static.cigna.com/assets/chcp/pdf/coveragePolicies/medical/mm_0051_coveragepositioncriteria_bariatric_surgery.pdf",
  },
  {
    authors: "UnitedHealthcare.",
    title:
      "UnitedHealthcare Commercial Medical Policy — Bariatric Surgery.",
    source: "UHC Provider Policies",
    year: 2024,
    url: "https://www.uhcprovider.com/content/dam/provider/docs/public/policies/comm-medical-drug/bariatric-surgery.pdf",
  },
  {
    authors: "Blue Cross Blue Shield Federal Employee Program.",
    title:
      "FEP Medical Policy 7.01.47 — Bariatric Surgery.",
    source: "FEP Blue Cross Blue Shield",
    year: 2024,
    url: "https://www.fepblue.org/-/media/PDFs/Medical%20Policies/2024/January/Medical%20Policies%20Dec%202023/New%20Add/70147%20Bariatric%20Surgery.pdf",
  },
  {
    authors: "Humana Inc.",
    title:
      "Humana Clinical Coverage Policy — Bariatric Surgery.",
    source: "Humana Clinical Policies",
    year: 2024,
    url: "https://assets.humana.com/is/content/humana/Bariatric_Surgerypdf",
  },
  {
    authors:
      "Schauer PR, Bhatt DL, Kirwan JP, Wolski K, Aminian A, Brethauer SA, Navaneethan SD, Singh RP, Pothier CE, Nissen SE, Kashyap SR; STAMPEDE Investigators.",
    title:
      "Bariatric Surgery versus Intensive Medical Therapy for Diabetes — 5-Year Outcomes (STAMPEDE).",
    source: "N Engl J Med",
    year: 2017,
    pmid: "28199805",
  },
  {
    authors:
      "Sjöström L, Narbro K, Sjöström CD, Karason K, Larsson B, Wedel H, Lystig T, Sullivan M, et al.",
    title:
      "Effects of Bariatric Surgery on Mortality in Swedish Obese Subjects.",
    source: "N Engl J Med",
    year: 2007,
    pmid: "17715408",
  },
  {
    authors:
      "Adams TD, Gress RE, Smith SC, Halverson RC, Simper SC, Rosamond WD, Lamonte MJ, Stroup AM, Hunt SC.",
    title: "Long-Term Mortality after Gastric Bypass Surgery.",
    source: "N Engl J Med",
    year: 2007,
    pmid: "17715409",
  },
  {
    authors:
      "Buchwald H, Avidor Y, Braunwald E, Jensen MD, Pories W, Fahrbach K, Schoelles K.",
    title: "Bariatric surgery: a systematic review and meta-analysis.",
    source: "JAMA",
    year: 2004,
    pmid: "15479938",
  },
];

export default function BariatricEligibilityCheckerPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="Bariatric Surgery Eligibility Checker"
        description="Bariatric surgery eligibility under NIH 1991, ASMBS 2022, Medicare NCD 100.1, and major US commercial payers (Aetna, Cigna, UHC, BCBS, Humana). Every payer entry traces to the published clinical policy bulletin."
        url="https://weightlossrankings.org/tools/bariatric-surgery-eligibility-checker"
        image="https://weightlossrankings.org/tools/bariatric-surgery-eligibility-checker/opengraph-image"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          Bariatric eligibility checker
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          NIH 1991 · ASMBS 2022 · Medicare · 5 commercial payers
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Bariatric Surgery Eligibility Checker
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Enter your height, weight, age, and comorbidities to see
          whether you qualify under the academic guidelines (NIH 1991,
          ASMBS 2022) and under the major US payer clinical policy
          bulletins (Medicare NCD 100.1, Aetna CPB 0157, Cigna 0051,
          UnitedHealthcare, BCBS FEP, Humana). Every payer entry links
          back to the source document and shows when it was last
          verified.
        </p>
        <p className="mt-3 text-sm text-brand-text-secondary">
          Payer data last verified <strong>{DATA_LAST_VERIFIED}</strong>.
          Re-verified quarterly per the staleness audit.
        </p>
      </header>

      <BariatricEligibilityChecker />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>What this tool does and does not do</h2>
        <p>
          The tool reads the published BMI and comorbidity criteria
          from each payer&apos;s clinical policy bulletin and tells
          you whether you meet the medical-necessity threshold. It
          does <strong>not</strong> guarantee that any specific payer
          will approve your surgery. Final coverage decisions are
          made by the payer at the prior-authorization stage and
          depend on documentation that this tool cannot evaluate
          (psychological evaluation, supervised diet records, smoking
          cessation status, facility accreditation, surgeon network
          status, prior failed weight-loss attempts, etc.).
        </p>

        <h2>The academic standards</h2>
        <p>
          Two guidelines define the academic landscape:
        </p>
        <ul>
          <li>
            <strong>NIH 1991 Consensus [1]</strong> — BMI ≥ 40, or BMI
            ≥ 35 with at least one serious comorbidity. The foundational
            standard cited by Medicare and most commercial insurers
            for three decades.
          </li>
          <li>
            <strong>ASMBS / IFSO 2022 Indications [2]</strong> — lowered
            the threshold to BMI ≥ 35 regardless of comorbidities, and
            added a BMI 30-34.9 + metabolic disease pathway. The
            current academic standard, but most US payers have not
            yet adopted it.
          </li>
        </ul>

        <h2>The payer landscape</h2>
        <p>
          Six US payers are included, each linked to its published
          clinical policy bulletin or coverage determination:
        </p>
        <ul>
          <li>
            <strong>Medicare NCD 100.1 [3]:</strong> BMI ≥ 35 + at
            least one comorbidity, prior failure of medical management,
            ASMBS Center of Excellence or MBSAQIP-accredited facility.
            Covers RYGB, BPD/DS, sleeve gastrectomy, and LAGB.
          </li>
          <li>
            <strong>Aetna CPB 0157 [4]:</strong> BMI ≥ 40 alone or ≥
            35 with comorbidity (≥ 37.5 / ≥ 32.5 for Asian ancestry),
            12 supervised diet sessions on separate dates within 2
            years (≈6-month elapsed), psychological evaluation, 2-year
            documented obesity duration.
          </li>
          <li>
            <strong>Cigna 0051 [5]:</strong> BMI ≥ 40 alone or ≥ 35
            with comorbidity, documented prior failed weight loss,
            preauthorization required, psychological evaluation,
            nutritional counseling.
          </li>
          <li>
            <strong>UnitedHealthcare [6]:</strong> BMI ≥ 40 alone or
            ≥ 35 with comorbidity, MBSAQIP-accredited facility or
            equivalent program, psychosocial-behavioral evaluation.
          </li>
          <li>
            <strong>BCBS FEP 7.01.47 [7]:</strong> BMI ≥ 40 alone, or
            ≥ 35 with comorbidity, or ≥ 30 with type 2 diabetes
            (a Class 1 + T2D pathway). State licensee policies vary.
          </li>
          <li>
            <strong>Humana [8]:</strong> BMI ≥ 40 alone or ≥ 35 with
            comorbidity, 6-month physician-supervised weight loss
            program, multidisciplinary preparatory regimen,
            psychological evaluation.
          </li>
        </ul>

        <h2>Why so many payers say BMI ≥ 40 vs ASMBS 2022 BMI ≥ 35</h2>
        <p>
          Payer policies update on slower cycles than academic
          guidelines. The ASMBS 2022 update [2] is the current
          academic recommendation, but most commercial insurers and
          Medicare still use the older NIH 1991 threshold. This means
          that a patient with BMI 36 and no comorbidities is{" "}
          <strong>academically eligible under ASMBS 2022 but not
          insurance-eligible</strong> under most payers. The tool
          surfaces this gap explicitly so patients understand which
          standard applies to which decision.
        </p>

        <h2>Outcomes evidence underlying the eligibility criteria</h2>
        <p>
          The clinical guidelines are anchored on:
        </p>
        <ul>
          <li>
            <strong>STAMPEDE [9]:</strong> Schauer 2017 NEJM 5-year RCT
            showed bariatric surgery + medical therapy produced
            &minus;19% to &minus;23% body weight loss vs &minus;5% on
            intensive medical therapy alone, with substantially better
            T2D remission.
          </li>
          <li>
            <strong>Adams 2007 [11]:</strong> Long-term mortality after
            gastric bypass cohort (n=15,850) reported a 40% reduction
            in all-cause mortality at 7 years post-surgery vs matched
            non-surgical controls.
          </li>
          <li>
            <strong>Sjöström 2007 (SOS) [10]:</strong> The Swedish
            Obese Subjects study reported sustained mortality benefit
            (HR 0.71 at 10.9 years; HR 0.77 at 24 years).
          </li>
          <li>
            <strong>Buchwald 2004 [12]:</strong> Meta-analysis of
            22,094 patients across 136 studies reported mean excess
            weight loss of 61.2% and T2D resolution in 76.8%.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice or a payer coverage determination.
          Payer policies change quarterly and vary by plan, by
          employer group, and by state. Final eligibility for
          bariatric surgery requires evaluation by a qualified
          bariatric surgeon at an accredited center, prior
          authorization from your specific insurance plan, and the
          documentation specified by that plan. Patients with active
          eating disorders, untreated severe depression, or
          uncontrolled substance use should not pursue bariatric
          surgery without addressing those conditions first. Every
          payer criterion in this tool was independently verified
          against the cited source URL by a research subagent on
          {" "}{DATA_LAST_VERIFIED}.
        </p>

        <h2>Related research and tools</h2>
        <ul>
          <li>
            <Link href="/research/bariatric-surgery-vs-glp1-2026">
              Bariatric surgery vs GLP-1s in 2026
            </Link>{" "}
            — full evidence comparison and outcome data
          </li>
          <li>
            <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
              GLP-1 surgery and anesthesia (ASA) guidance
            </Link>{" "}
            — perioperative GLP-1 management
          </li>
          <li>
            <Link href="/tools/glp1-bmi-calculator">
              GLP-1 BMI calculator
            </Link>{" "}
            — drug eligibility (Wegovy, Zepbound, Foundayo)
          </li>
          <li>
            <Link href="/tools/glp1-protein-calculator">
              GLP-1 protein & macro calculator
            </Link>{" "}
            — for muscle preservation pre- and post-operatively
          </li>
          <li>
            <Link href="/research/glp1-insurance-coverage-audit">
              GLP-1 insurance coverage audit
            </Link>{" "}
            — payer patterns for GLP-1 vs surgery
          </li>
          <li>
            <Link href="/insurance">
              Insurance directory
            </Link>{" "}
            — full coverage detail by insurer
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
      <ToolDataFreshness slug="bariatric-surgery-eligibility-checker" />
    </main>
  );
}
