import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "glp1-units-to-mg-dosage-chart";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Conversion math is the same engine that powers
// /tools/glp1-unit-converter (see src/lib/unit-converter.ts).
// Formula:  units = (mg * 100) / concentration_mg_per_mL
//           mg    = (units * concentration_mg_per_mL) / 100
// All values in the static tables below are computed from the same
// formula and verified against the unit-converter test suite.

// Helper: format a unit value for the table. Whole numbers stay
// integer; halves render as .5; otherwise show two decimals (these
// rare values cannot be drawn precisely on a U-100 syringe and we
// flag them in the body copy).
function fmtUnits(u: number): string {
  if (Number.isInteger(u)) return String(u);
  if (Math.abs(u * 2 - Math.round(u * 2)) < 1e-9) return u.toFixed(1);
  return u.toFixed(2);
}

const SEMA_DOSES = [0.25, 0.5, 1.0, 1.5, 1.7, 2.0, 2.4];
const SEMA_CONCS = [2, 5, 10, 25];
const TIRZ_DOSES = [2.5, 5, 7.5, 10, 12.5, 15];
const TIRZ_CONCS = [5, 10, 20, 30, 40];

function mgToUnits(mg: number, c: number): number {
  return (mg * 100) / c;
}

export default function Glp1UnitsToMgDosageChartArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "WEGOVY (semaglutide) injection, for subcutaneous use — US Prescribing Information.",
      source: "FDA Approved Labeling (Drugs@FDA)",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "OZEMPIC (semaglutide) injection, for subcutaneous use — US Prescribing Information.",
      source: "FDA Approved Labeling (Drugs@FDA)",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/209637s024lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "ZEPBOUND (tirzepatide) injection, for subcutaneous use — US Prescribing Information.",
      source: "FDA Approved Labeling (Drugs@FDA)",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/217806s006lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "MOUNJARO (tirzepatide) injection, for subcutaneous use — US Prescribing Information.",
      source: "FDA Approved Labeling (Drugs@FDA)",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215866s014lbl.pdf",
    },
    {
      authors: "Becton, Dickinson and Company (BD).",
      title:
        "BD Ultra-Fine insulin syringe specifications — U-100 standard, 100 units = 1 mL.",
      source: "BD Diabetes Care product documentation",
      year: 2024,
      url: "https://www.bd.com/en-us/products/diabetes/diabetes-products/insulin-syringes",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Insulin Syringes — Class II Medical Device classification (21 CFR 880.5570) and U-100 standard.",
      source: "FDA Code of Federal Regulations",
      year: 2023,
      url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?fr=880.5570",
    },
  ];

  const faqItems = [
    {
      question: "What does \"units\" mean on a syringe?",
      answer:
        "On a U-100 insulin syringe, 100 units equals exactly 1 mL of liquid. Each unit is therefore 0.01 mL. The unit is a volume marking, not a dose of drug. The actual milligrams of GLP-1 you draw depends on the concentration of your vial.",
    },
    {
      question: "Are insulin syringe units the same across brands?",
      answer:
        "Yes, as long as the syringe is labeled U-100 (the global standard for insulin syringes from BD, Easy Touch, ReliOn, and other brands). 100 units always equals 1 mL on a U-100 syringe. U-40 and U-500 syringes exist for veterinary and concentrated insulin and are not used for compounded GLP-1s.",
    },
    {
      question: "Can I use a tuberculin syringe instead?",
      answer:
        "A tuberculin syringe is graduated in mL, not units. 0.1 mL on a tuberculin syringe equals 10 units on a U-100 insulin syringe. Tuberculin syringes use a longer, larger-gauge needle that is more painful for subcutaneous injection, so insulin syringes are preferred for compounded GLP-1 administration.",
    },
    {
      question: "How precise are unit measurements?",
      answer:
        "Standard U-100 insulin syringes are graduated in 1-unit or 0.5-unit increments depending on the syringe size. The smallest 0.3 mL syringes typically have 0.5-unit gradations; the 1 mL syringes typically have 1-unit gradations. You cannot reliably draw a fractional unit smaller than the gradation.",
    },
    {
      question:
        "What if my pharmacy gives me a different concentration than expected?",
      answer:
        "Different compounding pharmacies use different concentrations, and the same pharmacy may change concentrations between refills. Always re-read the vial label on every new vial and recalculate your unit dose. Drawing the same number of units from a vial at a different concentration will deliver a different milligram dose.",
    },
    {
      question:
        "How many units is 2.5 mg of tirzepatide?",
      answer:
        "It depends on the vial concentration. On a 5 mg/mL vial, 2.5 mg equals 50 units. On a 10 mg/mL vial, 2.5 mg equals 25 units. On a 20 mg/mL vial, 2.5 mg equals 12.5 units. On a 40 mg/mL vial, 2.5 mg equals about 6 units. Always verify the concentration on the vial label.",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={faqItems} />

      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Compounded <Link href="/drugs/semaglutide">semaglutide</Link> and <Link href="/drugs/tirzepatide">tirzepatide</Link> are prescribed in
        milligrams but drawn into the syringe in <strong>units</strong>{" "}
        — and getting that conversion wrong is one of the most common
        compounded GLP-1 dosing errors. The reason is that the vial is
        liquid, the syringe is a U-100 insulin syringe, and the
        relationship between &quot;units on the syringe&quot; and
        &quot;milligrams of drug delivered&quot; depends entirely on
        the concentration printed on the vial label. This article is
        the complete static reference: the formula, the lookup tables
        for every common compounded concentration of semaglutide and
        tirzepatide, and the worked math behind the most-searched
        dosing questions on Google. If you want an interactive
        version, the same math powers our{" "}
        <Link href="/tools/glp1-unit-converter">GLP-1 unit converter</Link>.
      </p>

      <h2>The formula (the only one you need)</h2>
      <p>
        Every standard insulin syringe sold in the US is labeled U-100,
        which means <strong>100 units = 1 mL</strong>. One unit is
        therefore exactly 0.01 mL of liquid. This is the global
        insulin-syringe standard set by the FDA and used by BD,
        Easy Touch, ReliOn, and every other major brand
        <Cite n={5} />
        <Cite n={6} />.
      </p>
      <p>
        A compounded GLP-1 vial is a known concentration of active
        drug dissolved in sterile water — for example,{" "}
        <strong>5 mg/mL tirzepatide</strong> or{" "}
        <strong>10 mg/mL semaglutide</strong>. The concentration is
        printed on the vial label by the compounding pharmacy. To
        translate between &quot;mg of drug&quot; and &quot;units on
        the syringe,&quot; use:
      </p>
      <div className="my-4 rounded border border-brand-violet/30 bg-brand-violet/5 p-4">
        <p className="m-0 font-mono text-brand-text-primary">
          units = (mg &times; 100) &divide; concentration (mg/mL)
        </p>
        <p className="m-0 mt-2 font-mono text-brand-text-primary">
          mg = (units &times; concentration (mg/mL)) &divide; 100
        </p>
      </div>
      <p>
        That is the entire math. Everything else in this article is
        the result of applying those two equations to every common
        dose at every common concentration.
      </p>

      <h2>Common compounded concentrations (2026)</h2>
      <p>
        Compounding pharmacies do not all use the same concentration.
        The most common ones we have observed across US 503A
        compounding pharmacies as of 2026 are:
      </p>
      <ul>
        <li>
          <strong>Semaglutide:</strong> 2 mg/mL, 5 mg/mL, 10 mg/mL,
          and 25 mg/mL. The 2 mg/mL and 5 mg/mL strengths are by far
          the most common; the 10 mg/mL and 25 mg/mL strengths show
          up in higher-titration kits and stack vials.
        </li>
        <li>
          <strong>Tirzepatide:</strong> 5 mg/mL, 10 mg/mL, 20 mg/mL,
          30 mg/mL, and 40 mg/mL. The 5 mg/mL and 10 mg/mL strengths
          are the most common starting kits; 20-40 mg/mL appear in
          maintenance and high-dose vials so the patient can draw
          fewer units per injection.
        </li>
      </ul>
      <p>
        These are the columns in the reference tables below. If your
        vial is a concentration that is not listed, plug the number
        into the formula above (or use the{" "}
        <Link href="/tools/glp1-unit-converter">interactive
        calculator</Link>) to get an exact answer.
      </p>

      <h2>Semaglutide: complete units-by-dose reference table</h2>
      <p>
        For each FDA-style titration dose of semaglutide (0.25 mg
        starter through 2.4 mg <Link href="/drugs/wegovy">Wegovy</Link> maintenance dose<Cite n={1} />),
        here are the unit measurements at every common compounded
        concentration. Read across the row for your dose, find your
        vial concentration column, and that is the unit mark to draw
        to on the U-100 insulin syringe.
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-violet/40">
              <th className="text-left p-2 text-brand-text-primary">Dose (mg)</th>
              {SEMA_CONCS.map((c) => (
                <th key={c} className="text-left p-2 text-brand-text-primary">
                  {c} mg/mL
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEMA_DOSES.map((dose) => (
              <tr key={dose} className="border-b border-brand-violet/15">
                <td className="p-2 font-semibold text-brand-text-primary">
                  {dose} mg
                </td>
                {SEMA_CONCS.map((c) => (
                  <td key={c} className="p-2 text-brand-text-secondary">
                    {fmtUnits(mgToUnits(dose, c))} units
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        A few of these values do not land on a clean syringe gradation
        — for example, 1.7 mg at 25 mg/mL works out to 6.8 units,
        which a U-100 syringe with 1-unit gradations cannot draw
        precisely. In practice, your pharmacy should ship you a
        concentration that produces clean unit values for your
        prescribed dose. If your math gives you a fractional unit
        smaller than your syringe gradation, call the pharmacy
        before injecting.
      </p>

      <h2>Tirzepatide: complete units-by-dose reference table</h2>
      <p>
        Same format for tirzepatide, covering the standard
        FDA-titration doses from 2.5 mg starter through 15 mg <Link href="/drugs/zepbound">Zepbound</Link>
        maintenance<Cite n={3} /><Cite n={4} />.
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-violet/40">
              <th className="text-left p-2 text-brand-text-primary">Dose (mg)</th>
              {TIRZ_CONCS.map((c) => (
                <th key={c} className="text-left p-2 text-brand-text-primary">
                  {c} mg/mL
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIRZ_DOSES.map((dose) => (
              <tr key={dose} className="border-b border-brand-violet/15">
                <td className="p-2 font-semibold text-brand-text-primary">
                  {dose} mg
                </td>
                {TIRZ_CONCS.map((c) => (
                  <td key={c} className="p-2 text-brand-text-secondary">
                    {fmtUnits(mgToUnits(dose, c))} units
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Notice how dramatically the unit value drops as concentration
        rises. A 5 mg dose draws 100 units on a 5 mg/mL vial but only
        12.5 units on a 40 mg/mL vial. Same drug, same milligrams,
        eight-fold difference in syringe volume. This is exactly why
        you cannot share unit instructions between patients on
        different concentrations.
      </p>

      <h2>Worked example: How many units is 2.5 mg of tirzepatide?</h2>
      <p>
        This is the most-searched compounded GLP-1 dosing question on
        Google. The answer depends entirely on your vial
        concentration. Plugging 2.5 mg into the formula{" "}
        <code>units = (mg &times; 100) / concentration</code>:
      </p>
      <ul>
        <li>
          <strong>5 mg/mL tirzepatide:</strong> (2.5 &times; 100) /
          5 = <strong>50 units</strong>
        </li>
        <li>
          <strong>10 mg/mL tirzepatide:</strong> (2.5 &times; 100) /
          10 = <strong>25 units</strong>
        </li>
        <li>
          <strong>20 mg/mL tirzepatide:</strong> (2.5 &times; 100) /
          20 = <strong>12.5 units</strong>
        </li>
        <li>
          <strong>30 mg/mL tirzepatide:</strong> (2.5 &times; 100) /
          30 ≈ <strong>8.3 units</strong> (round to nearest 0.5)
        </li>
        <li>
          <strong>40 mg/mL tirzepatide:</strong> (2.5 &times; 100) /
          40 ≈ <strong>6.25 units</strong>
        </li>
      </ul>
      <p>
        The 5 mg/mL and 10 mg/mL answers (50 and 25 units) are the
        ones most patients land on, because those are the two most
        common starter-kit concentrations.
      </p>

      <h2>Worked example: How many mg is 40 units of semaglutide?</h2>
      <p>
        Inverse formula: <code>mg = (units &times; concentration) /
        100</code>. Plugging in 40 units of semaglutide:
      </p>
      <ul>
        <li>
          <strong>2 mg/mL semaglutide:</strong> (40 &times; 2) / 100
          = <strong>0.8 mg</strong>
        </li>
        <li>
          <strong>5 mg/mL semaglutide:</strong> (40 &times; 5) / 100
          = <strong>2.0 mg</strong>
        </li>
        <li>
          <strong>10 mg/mL semaglutide:</strong> (40 &times; 10) /
          100 = <strong>4.0 mg</strong>
        </li>
        <li>
          <strong>25 mg/mL semaglutide:</strong> (40 &times; 25) /
          100 = <strong>10.0 mg</strong>
        </li>
      </ul>
      <p>
        This is the safety lesson in one example: 40 units delivers
        0.8 mg on the lowest common concentration but{" "}
        <strong>12.5x more drug</strong> on the highest. The Wegovy
        maintenance dose is 2.4 mg<Cite n={1} />, so a patient who
        accidentally drew 40 units from a 25 mg/mL vial would receive
        roughly four times the maximum FDA-labeled weekly dose. This
        is why concentration is the load-bearing field on a
        compounded vial label.
      </p>

      <h2>Worked example: How many mg is 50 units of semaglutide?</h2>
      <ul>
        <li>
          <strong>2 mg/mL semaglutide:</strong> (50 &times; 2) / 100
          = <strong>1.0 mg</strong>
        </li>
        <li>
          <strong>5 mg/mL semaglutide:</strong> (50 &times; 5) / 100
          = <strong>2.5 mg</strong>
        </li>
        <li>
          <strong>10 mg/mL semaglutide:</strong> (50 &times; 10) /
          100 = <strong>5.0 mg</strong>
        </li>
        <li>
          <strong>25 mg/mL semaglutide:</strong> (50 &times; 25) /
          100 = <strong>12.5 mg</strong>
        </li>
      </ul>
      <p>
        Note that 5.0 mg and 12.5 mg of semaglutide both exceed the
        2.4 mg Wegovy maximum FDA-labeled dose<Cite n={1} /> and the
        2.0 mg <Link href="/drugs/ozempic">Ozempic</Link> maximum dose<Cite n={2} />. If you are drawing
        50 units and your vial is 10 mg/mL or 25 mg/mL, stop and
        verify with your prescriber before injecting.
      </p>

      <h2>Worked example: How many mg is 20 units of tirzepatide?</h2>
      <ul>
        <li>
          <strong>5 mg/mL tirzepatide:</strong> (20 &times; 5) / 100
          = <strong>1.0 mg</strong>
        </li>
        <li>
          <strong>10 mg/mL tirzepatide:</strong> (20 &times; 10) /
          100 = <strong>2.0 mg</strong>
        </li>
        <li>
          <strong>20 mg/mL tirzepatide:</strong> (20 &times; 20) /
          100 = <strong>4.0 mg</strong>
        </li>
        <li>
          <strong>30 mg/mL tirzepatide:</strong> (20 &times; 30) /
          100 = <strong>6.0 mg</strong>
        </li>
        <li>
          <strong>40 mg/mL tirzepatide:</strong> (20 &times; 40) /
          100 = <strong>8.0 mg</strong>
        </li>
      </ul>
      <p>
        20 units is a common &quot;round number&quot; instruction
        from telehealth clinicians, and the resulting milligram dose
        spans 1.0 mg (a sub-starter dose) to 8.0 mg (between the
        7.5 mg and 10 mg titration steps of Zepbound<Cite n={3} />).
        Same syringe mark, eight different milligram outcomes.
      </p>

      <h2>Why concentration matters (the only safety point)</h2>
      <p>
        The single most important takeaway from this entire reference
        page is: <strong>the same number of units delivers a
        different milligram dose at every concentration</strong>. A
        unit is a volume measurement on the syringe, not a dose of
        drug. The drug content of that volume is set by the vial
        concentration, which is set by the compounding pharmacy.
      </p>
      <p>
        Telehealth platforms often instruct patients in units rather
        than milligrams (&quot;draw to the 25 mark&quot;) because
        units are what the patient actually has to do. That works
        only as long as the concentration in the vial does not
        change. The most common dosing-error scenarios we see are:
      </p>
      <ul>
        <li>
          The pharmacy switched concentrations between refills and
          the patient kept drawing the old unit count.
        </li>
        <li>
          A patient on tirzepatide assumed semaglutide unit
          instructions translate (they do not — the concentrations
          are different).
        </li>
        <li>
          A patient stacked vials from two pharmacies with different
          concentrations and used the unit count from the wrong vial.
        </li>
        <li>
          A friend or partner started on the same drug at a different
          concentration and the patient used their unit count.
        </li>
      </ul>
      <p>
        Every one of those errors is preventable by re-reading the
        vial label and re-running the unit conversion every time you
        open a new vial.
      </p>

      <h2>How to find your concentration</h2>
      <p>
        The concentration should be printed on the vial label by the
        compounding pharmacy. Look for a value formatted like{" "}
        <strong>5 mg/mL</strong>, <strong>10 mg/mL</strong>, or{" "}
        <strong>2.5 mg/mL</strong>. It is usually printed near the
        drug name and the lot number. If the label only lists the
        total mg in the vial and the total mL, divide the two:
      </p>
      <div className="my-4 rounded border border-brand-violet/30 bg-brand-violet/5 p-4">
        <p className="m-0 font-mono text-brand-text-primary">
          concentration (mg/mL) = total mg in vial &divide; total mL
          in vial
        </p>
      </div>
      <p>
        For example, a vial labeled &quot;25 mg total / 5 mL&quot; is
        a 5 mg/mL vial. A vial labeled &quot;10 mg total / 2 mL&quot;
        is a 5 mg/mL vial. A vial labeled &quot;20 mg total /
        2 mL&quot; is a 10 mg/mL vial.
      </p>
      <p>
        If the concentration is not on the label and you cannot
        derive it from total mg and total mL, <strong>call the
        pharmacy before injecting</strong>. Do not guess. Do not
        assume it is the same as your last vial. Do not assume it is
        the same as a friend&apos;s vial. The compounding pharmacy
        keeps the concentration on file for every batch they ship.
      </p>

      <h2>Use the interactive calculator instead</h2>
      <p>
        Static tables answer the most common cases, but if your dose
        or concentration is off the chart, our interactive tool runs
        the same formula in real time and shows you the exact unit
        mark to draw to (rounded to the nearest 0.5 unit, since that
        is what an insulin syringe can actually deliver):
      </p>
      <ul>
        <li>
          <Link href="/tools/glp1-unit-converter">
            <strong>GLP-1 Unit Converter</strong>
          </Link>{" "}
          — interactive mg ↔ units calculator with rounding to the
          nearest syringe gradation. Same engine as the tables on
          this page; built for the cases the tables do not cover.
        </li>
      </ul>

      <h2>Frequently asked questions</h2>

      <h3>What does &quot;units&quot; mean on a syringe?</h3>
      <p>
        On a U-100 insulin syringe, 100 units equals exactly 1 mL of
        liquid<Cite n={5} />. Each unit is therefore 0.01 mL. The
        unit is a volume marking, not a dose of drug. The actual
        milligrams of GLP-1 you draw depends on the concentration of
        your vial.
      </p>

      <h3>Are insulin syringe units the same across brands?</h3>
      <p>
        Yes, as long as the syringe is labeled <strong>U-100</strong>
        — the global standard for insulin syringes from BD, Easy
        Touch, ReliOn, and every other major brand. 100 units always
        equals 1 mL on a U-100 syringe<Cite n={6} />. U-40 and U-500
        syringes exist for veterinary insulin and concentrated human
        insulin and are not used for compounded GLP-1s. If your
        compounded GLP-1 kit shipped with a syringe, it is U-100.
      </p>

      <h3>Can I use a tuberculin syringe instead?</h3>
      <p>
        A tuberculin syringe is graduated in mL rather than units.
        0.1 mL on a tuberculin syringe equals 10 units on a U-100
        insulin syringe (since 1 unit = 0.01 mL). Tuberculin syringes
        use a longer, larger-gauge needle that is more painful for
        subcutaneous injection, so insulin syringes are preferred for
        compounded GLP-1 administration. The math is identical — you
        just convert your prescribed unit count to mL by dividing by
        100.
      </p>

      <h3>How precise are unit measurements?</h3>
      <p>
        Standard U-100 insulin syringes are graduated in 1-unit or
        0.5-unit increments depending on the syringe size. The
        smallest 0.3 mL syringes typically have 0.5-unit gradations;
        the standard 1 mL syringes typically have 1-unit gradations.
        You cannot reliably draw a fractional unit smaller than the
        gradation, which is why pharmacies generally ship a
        concentration that produces clean unit values for the
        prescribed dose.
      </p>

      <h3>
        What if my pharmacy gives me a different concentration than
        expected?
      </h3>
      <p>
        Different compounding pharmacies use different
        concentrations, and the same pharmacy can change
        concentrations between refills. Always re-read the vial label
        on every new vial and recalculate your unit dose using the
        formula above (or the interactive{" "}
        <Link href="/tools/glp1-unit-converter">unit converter</Link>).
        Drawing the same number of units from a vial at a different
        concentration will deliver a different milligram dose. If the
        concentration changed unexpectedly, call your prescriber and
        the pharmacy before injecting.
      </p>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/tools/glp1-unit-converter">
            GLP-1 Unit Converter (interactive)
          </Link>{" "}
          — the live calculator that runs the same formula as this
          page, with rounding to the nearest syringe gradation
        </li>
        <li>
          <Link href="/research/compounded-glp1-reconstitution-mixing-guide">
            Compounded GLP-1 reconstitution and mixing guide
          </Link>{" "}
          — how concentration is set in the first place when you
          reconstitute a freeze-dried vial with bacteriostatic water
        </li>
        <li>
          <Link href="/research/how-to-inject-glp1-step-by-step-technique">
            How to inject a GLP-1: step-by-step technique
          </Link>{" "}
          — once you have the unit count, this is the injection
          procedure
        </li>
        <li>
          <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
            Wegovy pen vs compounded vial: practical differences
          </Link>{" "}
          — why brand-name pens dose in mg automatically and
          compounded vials force you to do this math
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The
        conversion math is verified against FDA-approved labels for
        Wegovy, Ozempic, Zepbound, and <Link href="/drugs/mounjaro">Mounjaro</Link> and against the
        BD U-100 insulin syringe specification, but the clinical
        decision of what dose to inject is the prescriber&apos;s and
        the patient&apos;s responsibility. Always verify your vial
        concentration on the label, recalculate the unit count for
        every new vial, and consult your prescribing clinician
        before changing your dose. If your pharmacy ships a vial at
        a concentration you did not expect, call them before
        injecting.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
