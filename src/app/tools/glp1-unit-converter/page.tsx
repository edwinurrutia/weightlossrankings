import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title:
    "Compounded GLP-1 Unit ↔ mg Converter | Semaglutide & Tirzepatide Insulin Syringe Calculator",
  description:
    "Free interactive converter for compounded semaglutide and tirzepatide. Convert milligrams to insulin syringe units (and back) at any vial concentration. Answers 'how many units is 2.5 mg of tirzepatide?', 'how many mg is 40 units of semaglutide?', and every variation. Sourced from FDA prescribing information and BD insulin syringe specifications.",
  alternates: { canonical: "/tools/glp1-unit-converter" },
};

// The math behind this converter is implemented in src/lib/unit-converter.ts
// and verified by 162 unit tests + 1000 random fuzz iterations
// (scripts/test-unit-converter.ts). The formulas:
//   units = (mg * 100) / concentration_mg_per_mL
//   mg    = (units * concentration_mg_per_mL) / 100
// The "100" is the U-100 insulin syringe definition: 100 units = 1 mL.

const CITATIONS = [
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "OZEMPIC (semaglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "MOUNJARO (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
  },
  {
    authors: "Becton, Dickinson and Company (BD).",
    title:
      "BD Ultra-Fine Insulin Syringes — Product Specifications and U-100 Standard.",
    source: "BD Diabetes Care Product Documentation",
    year: 2024,
    url: "https://www.bd.com/en-us/products/diabetes/diabetes-injection/insulin-syringes",
  },
  {
    authors: "U.S. Food and Drug Administration.",
    title:
      "FDA Drug Safety Communication: Insulin Syringe Standards and the U-100 Concentration Convention.",
    source: "FDA Drugs",
    year: 2023,
    url: "https://www.fda.gov/drugs/drug-safety-and-availability/medication-errors-related-cdersafe-use-initiative",
  },
  {
    authors: "U.S. Food and Drug Administration.",
    title:
      "Compounded Drug Products — 503A and 503B Outsourcing Facility Information for Patients.",
    source: "FDA Drug Compounding Resources",
    year: 2024,
    url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
  },
];

export default function GlpUnitConverterPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Unit to mg Converter"
        description="Convert prescribed milligrams of compounded semaglutide or tirzepatide to insulin syringe units (and back) at any vial concentration. Includes a reconstitution (BAC water) calculator for lyophilized vials. FDA prescribing information cited."
        url="https://weightlossrankings.org/tools/glp1-unit-converter"
        image="https://weightlossrankings.org/tools/glp1-unit-converter/opengraph-image"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">GLP-1 unit converter</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Dosage calculator
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Compounded GLP-1 Unit ↔ mg Converter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Convert prescribed milligrams of compounded semaglutide or
          tirzepatide to the corresponding mark on a standard insulin
          syringe — and back. Built for patients on compounded GLP-1
          therapy who need to confirm the math their telehealth
          provider sent them.
        </p>
      </header>

      <UnitConverter />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>Why this tool exists</h2>
        <p>
          Patients on compounded semaglutide and tirzepatide are
          consistently asked by their telehealth provider to draw a
          dose in <em>insulin syringe units</em> rather than in
          milligrams — for example, &ldquo;draw to the 40 unit
          mark.&rdquo; The provider almost never explains where that
          number comes from, and patients then search Google for
          questions like <em>&ldquo;how many mg is 40 units of
          semaglutide?&rdquo;</em> to verify it. The answer depends on
          a single critical number that the provider should have
          mentioned but usually didn&apos;t: the{" "}
          <strong>concentration of the vial in milligrams per
          milliliter (mg/mL)</strong>.
        </p>
        <p>
          This converter is the math your prescriber should have
          shown you. Pick your drug, pick your vial concentration, and
          either enter the dose in milligrams to get the syringe units,
          or enter the units to get the milligrams. Common doses and
          common unit values are pre-populated in the lookup tables
          below the calculator.
        </p>

        <h2>The math (so you can verify it yourself)</h2>
        <p>
          The standard insulin syringe used worldwide is called a{" "}
          <strong>U-100 syringe</strong>, which means it is calibrated
          so that <strong>100 units = 1 mL</strong>. This is the
          syringe almost always shipped by US compounding pharmacies
          with compounded GLP-1 vials [5, 6]. From there, the
          conversion is straightforward arithmetic:
        </p>
        <p>
          <code>
            units = (dose in mg × 100) ÷ concentration in mg/mL
          </code>
        </p>
        <p>
          <code>
            mg = (units × concentration in mg/mL) ÷ 100
          </code>
        </p>
        <p>
          For example, if your prescriber gave you a 2.5 mg/mL vial of
          compounded semaglutide and asked you to start at 0.25 mg per
          week, the calculation is:
        </p>
        <p>
          <code>
            units = (0.25 × 100) ÷ 2.5 = 10 units
          </code>
        </p>
        <p>
          So you would draw the syringe to the 10-unit mark.
        </p>

        <h2>Common compounded concentrations</h2>
        <p>
          US compounding pharmacies dispense semaglutide and
          tirzepatide at a small number of standard concentrations.
          The two most common for each drug, as documented across the
          US compounded GLP-1 telehealth market we track:
        </p>
        <ul>
          <li>
            <strong>Semaglutide:</strong> 2.5 mg/mL or 5 mg/mL. The
            2.5 mg/mL concentration is the most common; some 503A
            pharmacies dispense 5 mg/mL for higher-dose patients to
            keep the syringe volume manageable.
          </li>
          <li>
            <strong>Tirzepatide:</strong> 5 mg/mL or 10 mg/mL. The
            10 mg/mL concentration is the most common because the
            Zepbound maintenance dose (15 mg weekly) would otherwise
            require drawing more than 1 mL on a single syringe.
          </li>
        </ul>
        <p>
          The calculator above lets you switch concentration with a
          single click and recalculates everything live. Always
          confirm the actual concentration on your vial label before
          relying on any of the numbers below.
        </p>

        <h2>What can go wrong</h2>
        <p>
          The single most common patient error in compounded GLP-1
          dosing is using the unit number from a friend or a previous
          vial that had a <em>different concentration</em>. Because
          the same number of units delivers a different milligram
          dose at each concentration, an unrecognized concentration
          change can produce a 2× under- or over-dose with no visible
          warning. A few specific things to watch:
        </p>
        <ol>
          <li>
            <strong>The vial concentration changed.</strong> If your
            new vial label says 5 mg/mL and your old one said 2.5 mg/mL,
            your previous unit count will deliver double the
            milligrams. Recalculate before drawing.
          </li>
          <li>
            <strong>The pharmacy changed.</strong> Different
            compounding pharmacies often use different default
            concentrations even when fulfilling the same prescription.
            Confirm the concentration with the new pharmacy.
          </li>
          <li>
            <strong>The syringe is not U-100.</strong> Standard
            insulin syringes shipped with compounded GLP-1s are
            U-100. If you happen to use a U-40 or U-500 syringe (rare,
            but possible if you have leftover veterinary or insulin
            supplies), the calculation is different. Read the syringe
            label.
          </li>
          <li>
            <strong>The dose exceeds 100 units (1 mL).</strong> If
            your calculated dose is more than 100 units, you cannot
            draw it on a single insulin syringe. You will need to
            either split into two injections, request a higher-
            concentration vial from the pharmacy, or use a tuberculin
            syringe (1 mL). Confirm with your prescriber.
          </li>
        </ol>

        <h2>Important safety disclaimer</h2>
        <p>
          This tool reports calculations only. The clinical safety
          checks (right vial, right concentration, right syringe,
          right patient, right time) are the prescriber&apos;s and
          the patient&apos;s responsibility. Weight Loss Rankings
          does not provide medical advice, diagnosis, or treatment
          recommendations. If you are unsure about your dose,{" "}
          <strong>do not inject</strong>. Call your prescriber or
          your compounding pharmacy and verify before you draw.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose plotter
            </Link>
            : visualize how each titration step builds toward steady
            state in plasma.
          </li>
          <li>
            <Link href="/research/compounded-semaglutide-bioequivalence">
              Compounded semaglutide bioequivalence
            </Link>
            : what 503A and 503B pharmacies are required to test, and
            where the real quality risks live.
          </li>
          <li>
            <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
              PCAB accreditation investigation
            </Link>
            : how to evaluate the pharmacy fulfilling your
            prescription.
          </li>
          <li>
            <Link href="/research/fda-warning-letters-glp1">
              FDA warning letters database
            </Link>
            : cross-check your provider against documented enforcement
            actions.
          </li>
          <li>
            <Link href="/research/glp1-pricing-index">
              GLP-1 compounded pricing index
            </Link>
            : the live pricing snapshot for the entire compounded
            telehealth market.
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
