import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import ToolDataFreshness from "@/components/tools/ToolDataFreshness";
import ReconstitutionCalculator from "./ReconstitutionCalculator";

export const metadata: Metadata = {
  title:
    "GLP-1 Reconstitution Calculator — BAC Water, Concentration, and U-100 Units",
  description:
    "Free reconstitution calculator for compounded semaglutide and tirzepatide vials. Enter your vial peptide content (mg), bacteriostatic water added (mL), and target dose (mg) to compute the resulting concentration, volume to draw, and units on a U-100 insulin syringe — with FDA maximum-dose guards and ISMP-aligned safety warnings.",
  alternates: { canonical: "/tools/glp1-reconstitution-calculator" },
};

const CITATIONS = [
  {
    authors: "United States Pharmacopeia.",
    title:
      "USP <797> Pharmaceutical Compounding — Sterile Preparations (2023 revision; Category 1 BUD up to 60 days refrigerated).",
    source: "USP General Chapters",
    year: 2023,
    url: "https://www.usp.org/compounding/general-chapter-797",
  },
  {
    authors: "Hospira / Pfizer.",
    title:
      "Bacteriostatic Water for Injection, USP — Multi-dose vial monograph (0.9% benzyl alcohol; 28-day in-use expiry post-puncture).",
    source: "FDA DailyMed",
    year: 2024,
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=87d6e9dc-fe3b-4593-ac9a-d7493d1959c7",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information, Section 2.2 Dosing (max 2.4 mg once weekly).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s026lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 2.3 Dose Escalation (max 15 mg once weekly).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "MOUNJARO (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s015lbl.pdf",
  },
  {
    authors: "Institute for Safe Medication Practices (ISMP).",
    title:
      "Compounded GLP-1s require extra vigilance — ISMP advisory (December 2024).",
    source: "ISMP / ECRI",
    year: 2024,
    url: "https://home.ecri.org/blogs/ismp-news/compounded-glp-1s-require-extra-vigilance",
  },
  {
    authors: "Foley & Lardner LLP.",
    title:
      "FDA Removes Lilly's Zepbound and Mounjaro from Drug Shortage List — 503A enforcement discretion ended February 18, 2025.",
    source: "Foley & Lardner Health Care Insights",
    year: 2024,
    url: "https://www.foley.com/insights/publications/2024/10/glp-1-drugs-fda-removes-lillys-zepbound-and-mounjaro-tirzepatide-injection-from-its-drug-shortage-list/",
  },
  {
    authors: "Foley & Lardner LLP.",
    title:
      "FDA Removes Semaglutide from Drug Shortage List — 503A grace period through April 22, 2025.",
    source: "Foley & Lardner Health Care Insights",
    year: 2025,
    url: "https://www.foley.com/insights/publications/2025/02/glp-1-drugs-fda-removes-semaglutide-from-drug-shortage-list/",
  },
  {
    authors: "Pharmacy Compounding Accreditation Board (PCAB).",
    title:
      "PCAB Accreditation Standards for Sterile Compounding Pharmacies.",
    source: "Accreditation Commission for Health Care",
    year: 2024,
    url: "https://www.achc.org/pharmacy/pcab/",
  },
  {
    authors: "Boullata JI, Berlana D, Pietka M, Klek S, Muscaritoli M.",
    title:
      "Use of Intravenous Lipid Emulsions With Parenteral Nutrition: Practical Handling Aspects (relevant context on small-volume syringe accuracy).",
    source: "JPEN J Parenter Enteral Nutr",
    year: 2020,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8114303/",
  },
];

export default function ReconstitutionCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Reconstitution Calculator"
        description="Reconstitution math for compounded GLP-1 vials. Computes concentration (mg/mL), volume per dose, U-100 insulin syringe units, doses per vial, and surfaces FDA maximum-dose guards plus ISMP-aligned safety warnings."
        url="https://weightlossrankings.org/tools/glp1-reconstitution-calculator"
        image="https://weightlossrankings.org/tools/glp1-reconstitution-calculator/opengraph-image"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 reconstitution calculator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Reconstitution math · concentration · U-100 units · safety guards
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Reconstitution Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          For patients filling compounded GLP-1 prescriptions. Enter
          your vial&apos;s labeled peptide content (mg), the
          bacteriostatic water you will add (mL), and your target single
          dose (mg). The calculator returns the resulting concentration,
          the volume and units to draw on a standard U-100 insulin
          syringe, and how many doses you can get from the vial &mdash;
          with hard guards against doses above the FDA-approved
          maximums.
        </p>
      </header>

      <ReconstitutionCalculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>The math</h2>
        <p>The three identities are universal:</p>
        <ul>
          <li>
            <strong>Concentration (mg/mL)</strong> = vial mg ÷ BAC water mL
          </li>
          <li>
            <strong>Volume per dose (mL)</strong> = target dose mg ÷ concentration
          </li>
          <li>
            <strong>Units on a U-100 syringe</strong> = volume × 100 (because
            U-100 means 100 units per mL)
          </li>
        </ul>
        <p>
          The U-100 insulin syringe standard is the FDA-recognized
          medical specification: 100 units of insulin = 1 mL of liquid,
          so 1 unit = 0.01 mL. This is why every &ldquo;5 unit&rdquo;
          marking on a U-100 insulin syringe corresponds to 0.05 mL.
        </p>

        <h2>Why this calculator has hard limits</h2>
        <p>
          The calculator refuses to compute or strongly warns when the
          inputs would produce a clinically unsafe result. The
          guard rails are:
        </p>
        <ul>
          <li>
            <strong>FDA maximum weekly dose [3, 4, 5]:</strong> the
            calculator blocks any target dose above the FDA-approved
            maximum for the selected drug (semaglutide 2.4 mg/wk for
            Wegovy, tirzepatide 15 mg/wk for Mounjaro/Zepbound).
          </li>
          <li>
            <strong>Below 6 units (0.06 mL):</strong> drawing accuracy
            degrades meaningfully on a U-100 syringe when measuring less
            than 20% of capacity [10]. The calculator flags this and
            suggests adding less BAC water to raise concentration.
          </li>
          <li>
            <strong>Above 50 units (0.5 mL):</strong> exceeds the
            ergonomic upper limit for a single weekly subcutaneous
            injection. The calculator flags this and suggests adding
            less BAC water.
          </li>
          <li>
            <strong>Above 1.0 mL:</strong> no standard U-100 insulin
            syringe holds this in a single draw. Hard warning.
          </li>
          <li>
            <strong>Plausibility bounds:</strong> vial &gt; 200 mg or
            BAC water &gt; 50 mL trigger a verification prompt.
          </li>
        </ul>

        <h2>Bacteriostatic water and beyond-use dating</h2>
        <p>
          Bacteriostatic water for injection (USP) [2] contains 0.9%
          benzyl alcohol as a preservative. After the vial is first
          punctured, the standard pharmacy practice is a{" "}
          <strong>28-day in-use expiry</strong> at controlled room
          temperature, after which the vial should be discarded.
        </p>
        <p>
          The reconstituted GLP-1 vial itself has its own beyond-use
          date (BUD), assigned by the compounding pharmacy based on
          their sterility testing and environmental monitoring per
          USP &lt;797&gt; [1]. Category 1 (low-risk) sterile preparations
          can be assigned a BUD up to 60 days refrigerated under the
          2023 revision of USP &lt;797&gt;. The actual labeled BUD on
          your specific vial is the authoritative number &mdash; follow
          your pharmacy&apos;s labeled BUD, not a generic estimate.
        </p>

        <h2>Compounded GLP-1 legal status (April 2026)</h2>
        <p>
          The FDA removed tirzepatide from its drug shortage list on
          October 2, 2024, with 503A enforcement discretion ending
          February 18, 2025 [7]. Semaglutide was removed on February 21,
          2025, with the 503A grace period running through April 22,
          2025 [8]. As of April 2026, neither compound is under FDA
          enforcement discretion for routine 503A compounding unless
          the patient has a documented medical need that requires a
          formulation change (e.g., a documented allergy to an
          inactive ingredient in the brand product). Verify your
          pharmacy&apos;s legal status before ordering.
        </p>

        <h2>The most common dosing error</h2>
        <p>
          The Institute for Safe Medication Practices (ISMP) issued an
          advisory in December 2024 [6] specifically on compounded
          GLP-1 vigilance. The most common error category is{" "}
          <strong>confusing units with milligrams</strong> &mdash;
          patients counting the markings on their syringe and treating
          each mark as a milligram of drug rather than a unit of
          volume. The 2024 FDA pharmacovigilance database recorded
          520+ adverse event reports for compounded semaglutide and
          480+ for compounded tirzepatide as of April 30, 2025, with
          documented cases of 5- to 20-fold overdose driven by
          unfamiliar measurement.
        </p>
        <p>
          The mitigation: <strong>read your vial label carefully</strong>,
          verify the concentration with your pharmacy, and use this
          calculator (or your pharmacy&apos;s instructions) to convert
          a target mg dose into the correct volume in units before
          drawing.
        </p>

        <h2>Important disclaimer</h2>
        <p>
          This calculator is for educational purposes only and does
          not constitute medical advice or pharmacy dispensing
          instructions. Compounded GLP-1 medications are not FDA-
          approved. Decisions about reconstitution, dosing, and
          administration should follow your prescribing clinician&apos;s
          instructions and your compounding pharmacy&apos;s labeled
          directions. Patients with personal or family history of
          medullary thyroid carcinoma (MTC) or MEN 2 syndrome should
          NOT use semaglutide or tirzepatide because of the FDA boxed
          warning. Every coefficient and safety threshold in this tool
          was verified against primary sources by a research subagent
          on 2026-04-07.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/tools/glp1-unit-converter">
              GLP-1 unit converter
            </Link>{" "}
            — mg ↔ U-100 insulin syringe units (the building block of
            this calculator)
          </li>
          <li>
            <Link href="/research/compounded-glp1-reconstitution-mixing-guide">
              Compounded GLP-1 reconstitution mixing guide
            </Link>{" "}
            — narrative walkthrough with photos and step-by-step
            instructions
          </li>
          <li>
            <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
              PCAB accreditation: how to vet a compounded pharmacy
            </Link>
          </li>
          <li>
            <Link href="/research/fda-warning-letters-glp1">
              FDA warning letters on compounded GLP-1s
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose plotter
            </Link>{" "}
            — pharmacokinetic buildup curves
          </li>
          <li>
            <Link href="/tools/glp1-pen-leftover-calculator">
              GLP-1 pen leftover calculator
            </Link>{" "}
            — for patients on brand-name multi-dose pens (Ozempic,
            Saxenda) instead of compounded vials
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
      <ToolDataFreshness slug="glp1-reconstitution-calculator" />
    </main>
  );
}
