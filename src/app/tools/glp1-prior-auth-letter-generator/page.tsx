import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import FaqSchema from "@/components/research/FaqSchema";
import Generator from "./Generator";
import { buildSampleLetter } from "@/lib/glp1-prior-auth-letter";

export const metadata: Metadata = {
  title:
    "GLP-1 Prior Authorization Letter Generator (Wegovy, Zepbound)",
  description:
    "Free GLP-1 prior authorization letter generator. Build a Wegovy, Zepbound, Saxenda, or Foundayo PA letter template using FDA-label language and pivotal trial citations — for your doctor to review and sign.",
  alternates: { canonical: "/tools/glp1-prior-auth-letter-generator" },
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
    authors: "American Medical Association.",
    title:
      "Prior Authorization Reform Initiatives and Physician Documentation Guidance.",
    source: "AMA",
    year: 2024,
    url: "https://www.ama-assn.org/practice-management/prior-authorization",
  },
  {
    authors: "Centers for Medicare & Medicaid Services.",
    title: "Prior Authorization — Healthcare.gov Glossary.",
    source: "Healthcare.gov",
    year: 2024,
    url: "https://www.healthcare.gov/glossary/prior-authorization/",
  },
  {
    authors: "Novo Nordisk / Eli Lilly.",
    title:
      "Patient access and savings card programs (NovoCare, Lilly Savings Card).",
    source: "Manufacturer Patient Access",
    year: 2025,
    url: "https://www.novocare.com/wegovy.html",
  },
];

const FAQS = [
  {
    question: "What is prior authorization for GLP-1 drugs?",
    answer:
      "Prior authorization is a coverage rule that requires your doctor to submit clinical documentation to your insurer before the plan will pay for a brand GLP-1 like Wegovy or Zepbound. It is the single biggest friction point in getting brand GLP-1 weight-loss drugs approved.",
  },
  {
    question:
      "Why do insurers require prior auth for Wegovy and Zepbound?",
    answer:
      "Brand GLP-1s cost $1,000-$1,400 per month at list price. Insurers require prior authorization to confirm the patient meets the FDA-label criteria (BMI ≥ 30, or BMI ≥ 27 with a weight-related comorbidity), has tried lower-cost weight management interventions first, and has a documented clinical rationale for therapy.",
  },
  {
    question: "How long does prior authorization take?",
    answer:
      "Most commercial plans process a complete PA submission within 3 to 14 business days. Standard turnaround is 5 business days; expedited reviews (for urgent clinical situations) are typically 24 to 72 hours. Incomplete submissions often add 1 to 2 weeks of back-and-forth.",
  },
  {
    question: "Will my doctor write the PA letter for me?",
    answer:
      "Yes — the prescribing clinician is required to author and sign the PA letter; insurers will not accept a letter from the patient. This generator produces a draft template you can hand to your doctor's office to speed up that process.",
  },
  {
    question: "What if my prior auth is denied?",
    answer:
      "You have a federally protected right to appeal under the Affordable Care Act. The most common reasons for denial are missing BMI documentation, missing prior weight-loss attempts, or a non-formulary status. A peer-to-peer review (your doctor calls the insurance medical director) overturns roughly 30 to 50 percent of initial denials.",
  },
  {
    question: "Do I need prior auth for compounded GLP-1?",
    answer:
      "No. Compounded semaglutide and tirzepatide from a 503A or 503B compounding pharmacy are paid out of pocket and do not run through your insurance pharmacy benefit, so no prior authorization is involved. The trade-off is no insurance coverage and added quality and supply risk.",
  },
  {
    question: "Can I appeal a denial?",
    answer:
      "Yes. You can request an internal appeal directly with your insurer and, if denied again, an independent external review. Federal law gives you 180 days from the denial notice to file the internal appeal. Including the original PA letter plus any additional clinical documentation strengthens the appeal substantially.",
  },
  {
    question: "How is the BMI requirement enforced?",
    answer:
      "Insurers verify BMI from the height and weight documented in the most recent clinical visit note. The BMI must be calculated and recorded in the patient's chart before the PA submission, not estimated. Wegovy, Zepbound, Saxenda, and Foundayo all share the same FDA-label threshold: BMI ≥ 30 kg/m², or BMI ≥ 27 kg/m² with a weight-related comorbidity.",
  },
];

export default function PriorAuthLetterGeneratorPage() {
  const sampleLetter = buildSampleLetter();

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Prior Authorization Letter Generator"
        description="Free GLP-1 prior authorization letter generator. Build a Wegovy, Zepbound, Saxenda, or Foundayo PA letter template using FDA-label language and pivotal trial citations."
        url="https://weightlossrankings.org/tools/glp1-prior-auth-letter-generator"
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
          GLP-1 prior authorization letter generator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Insurance access tool
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Prior Authorization Letter Generator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Build a draft prior authorization letter for Wegovy,
          Zepbound, Saxenda, or Foundayo in under two minutes. Uses
          FDA-label indication language, the relevant pivotal trial
          citation, and the step-therapy documentation most US
          insurers require. Hand the draft to your prescribing
          clinician — they review, edit, sign, and submit.
        </p>
      </header>

      <Generator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>What prior authorization is and why GLP-1s need it</h2>
        <p>
          Prior authorization (PA) is a utilization management rule
          insurers use to control spending on high-cost drugs. For
          brand GLP-1 weight-loss medications — Wegovy, Zepbound,
          Saxenda, and the newly approved Foundayo — virtually every
          US commercial plan requires PA before paying any portion of
          the prescription. The reason is simple: list prices are
          $999 to $1,349 per month, and a covered patient on therapy
          for a year represents $12,000 to $16,000 of annual plan
          spend.
        </p>
        <p>
          A complete PA submission has to demonstrate three things:
          (1) the patient meets the FDA-label eligibility criteria
          (BMI ≥ 30 kg/m², or BMI ≥ 27 kg/m² with at least one
          weight-related comorbidity), (2) prior weight management
          attempts have been documented to satisfy the plan&apos;s
          step-therapy requirement, and (3) the prescribing clinician
          attests to the clinical rationale and ongoing monitoring
          plan. The letter generated by this tool covers all three
          and uses FDA-label language verbatim where possible.
        </p>

        <h2>How to use the generator</h2>
        <ol>
          <li>Pick your insurer from the dropdown.</li>
          <li>Pick the drug and dose your clinician is prescribing.</li>
          <li>Enter your weight and height — BMI auto-computes.</li>
          <li>Check off any documented comorbidities.</li>
          <li>
            Check off documented prior weight loss attempts (the
            step-therapy requirement most plans enforce).
          </li>
          <li>
            Copy the letter and bring it to your prescribing
            clinician. They will review, edit, sign, and submit it
            through the insurer&apos;s pharmacy benefit portal.
          </li>
        </ol>
        <p>
          Nothing you enter is stored or transmitted — the letter is
          assembled in your browser only. We do not log patient
          information.
        </p>

        <h2>Sample PA letter (Wegovy + BMI 32 + Type 2 diabetes + Aetna)</h2>
        <p>
          Below is a fully rendered sample of what the generator
          produces for the most common case: a patient requesting
          Wegovy 2.4 mg, BMI 32, with documented Type 2 diabetes,
          covered by Aetna. The live generator above customizes this
          for every drug, insurer, and comorbidity combination.
        </p>
        <pre className="not-prose whitespace-pre-wrap rounded-xl border border-brand-violet/15 bg-white p-5 text-xs sm:text-sm text-brand-text-primary leading-relaxed font-mono">
{sampleLetter}
        </pre>

        <h2>Frequently asked questions</h2>

        <h3>What is prior authorization for GLP-1 drugs?</h3>
        <p>
          Prior authorization is a coverage rule that requires your
          doctor to submit clinical documentation to your insurer
          before the plan will pay for a brand GLP-1 like Wegovy or
          Zepbound. It is the single biggest friction point in
          getting brand GLP-1 weight-loss drugs approved.
        </p>

        <h3>Why do insurers require prior auth for Wegovy and Zepbound?</h3>
        <p>
          Brand GLP-1s cost $1,000 to $1,400 per month at list price.
          Insurers require PA to confirm the patient meets the FDA
          label criteria, has tried lower-cost weight management
          interventions first, and has a documented clinical
          rationale for therapy. See our{" "}
          <Link href="/research/glp1-insurance-coverage-audit">
            GLP-1 insurance coverage audit
          </Link>{" "}
          for the actual coverage rates by plan.
        </p>

        <h3>How long does prior authorization take?</h3>
        <p>
          Most commercial plans process a complete PA submission
          within 3 to 14 business days. Standard turnaround is about
          5 business days; expedited reviews are typically 24 to 72
          hours. Incomplete submissions add 1 to 2 weeks of
          back-and-forth — which is exactly the friction this tool is
          designed to eliminate.
        </p>

        <h3>Will my doctor write the PA letter for me?</h3>
        <p>
          Yes — the prescribing clinician is required to author and
          sign the PA letter; insurers will not accept a letter from
          the patient. This generator produces a draft template the
          clinician can review, edit, and sign. See our guide on{" "}
          <Link href="/research/how-to-get-glp1-prescription">
            how to get a GLP-1 prescription
          </Link>
          .
        </p>

        <h3>What if my prior auth is denied?</h3>
        <p>
          You have a federally protected right to appeal under the
          Affordable Care Act. Common denial reasons are missing BMI
          documentation, missing prior weight-loss attempts, or
          non-formulary status. A peer-to-peer review (your doctor
          calls the insurance medical director) overturns roughly 30
          to 50 percent of initial denials.
        </p>

        <h3>Do I need prior auth for compounded GLP-1?</h3>
        <p>
          No. Compounded semaglutide and tirzepatide from a 503A or
          503B compounding pharmacy are paid out of pocket and do
          not run through your insurance pharmacy benefit, so no PA
          is involved. The trade-off is no insurance coverage and
          added quality and supply risk.
        </p>

        <h3>Can I appeal a denial?</h3>
        <p>
          Yes. You can request an internal appeal directly with your
          insurer and, if denied again, an independent external
          review. Federal law gives you 180 days from the denial
          notice to file the internal appeal. Including the original
          PA letter plus additional clinical documentation
          strengthens the appeal.
        </p>

        <h3>How is the BMI requirement enforced?</h3>
        <p>
          Insurers verify BMI from the height and weight documented
          in the most recent clinical visit note. The BMI must be
          calculated and recorded in the patient&apos;s chart before
          PA submission, not estimated. Wegovy, Zepbound, Saxenda,
          and Foundayo all share the same FDA-label threshold: BMI ≥
          30 kg/m², or BMI ≥ 27 kg/m² with a weight-related
          comorbidity.
        </p>

        <h2>Important disclaimer</h2>
        <p>
          <strong>
            This tool produces a draft template only. It is not
            medical advice, legal advice, or a guarantee of insurance
            coverage.
          </strong>{" "}
          The letter must be reviewed, edited, and signed by the
          prescribing clinician before submission. The generator
          uses FDA-label language verbatim where possible and does
          not invent clinical recommendations. Weight Loss Rankings
          does not provide medical advice, diagnosis, or treatment
          recommendations and is not affiliated with any insurer or
          drug manufacturer.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
              GLP-1 insurance coverage: Medicare, Medicaid, and commercial
            </Link>{" "}
            — what each plan type actually covers
          </li>
          <li>
            <Link href="/research/glp1-insurance-coverage-audit">
              GLP-1 insurance coverage audit
            </Link>{" "}
            — coverage rates by major commercial plan
          </li>
          <li>
            <Link href="/tools/insurance-employer-checker">
              Employer insurance checker
            </Link>{" "}
            — check whether your employer covers GLP-1s
          </li>
          <li>
            <Link href="/research/how-to-get-glp1-prescription">
              How to get a GLP-1 prescription
            </Link>{" "}
            — the full clinician workflow
          </li>
          <li>
            <Link href="/tools/glp1-cost-per-pound-calculator">
              GLP-1 cost per pound lost calculator
            </Link>{" "}
            — what you actually pay per pound at list price vs covered
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
