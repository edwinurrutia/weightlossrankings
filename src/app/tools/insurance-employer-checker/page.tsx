import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import EmployerSearch from "./EmployerSearch";

export const metadata: Metadata = {
  title:
    "Does My Employer Cover Wegovy or Zepbound? | Insurance Employer Checker",
  description:
    "Look up GLP-1 weight loss drug coverage by employer. Wegovy, Zepbound, Ozempic, and Mounjaro coverage status for 30 large US employers including Amazon, Walmart, Google, Microsoft, and the federal government. Patient-reported and publicly-sourced — verify with your HR before assuming coverage.",
  alternates: { canonical: "/tools/insurance-employer-checker" },
};

const CITATIONS = [
  {
    authors: "US Office of Personnel Management.",
    title:
      "Federal Employees Health Benefits (FEHB) Program — Plan Brochures and Anti-Obesity Drug Coverage Policies.",
    source: "OPM.gov",
    year: 2026,
    url: "https://www.opm.gov/healthcare-insurance/healthcare/plan-information/plans/",
  },
  {
    authors: "US Office of Personnel Management.",
    title:
      "Postal Service Health Benefits (PSHB) Program — Carrier Plan Brochures.",
    source: "OPM.gov",
    year: 2026,
    url: "https://www.opm.gov/healthcare-insurance/pshb/",
  },
  {
    authors: "Mercer.",
    title:
      "National Survey of Employer-Sponsored Health Plans — GLP-1 Coverage Trends.",
    source: "Mercer Health & Benefits",
    year: 2025,
    url: "https://www.mercer.com/insights/total-rewards/employee-benefits-strategy/",
  },
  {
    authors: "International Foundation of Employee Benefit Plans.",
    title:
      "GLP-1 Drug Coverage Trends in Employer-Sponsored Health Plans.",
    source: "IFEBP Research",
    year: 2025,
    url: "https://www.ifebp.org/news/research/glp-1-drug-coverage",
  },
  {
    authors: "Kaiser Family Foundation.",
    title:
      "Employer Health Benefits Survey — Prescription Drug Benefits and GLP-1 Coverage.",
    source: "KFF",
    year: 2025,
    url: "https://www.kff.org/health-costs/report/employer-health-benefits-annual-survey/",
  },
  {
    authors: "Reuters.",
    title:
      "Walmart, Amazon, and other large employers weigh GLP-1 weight-loss drug coverage as costs surge.",
    source: "Reuters Healthcare",
    year: 2024,
    url: "https://www.reuters.com/business/healthcare-pharmaceuticals/",
  },
];

export default function InsuranceEmployerCheckerPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="Insurance Employer Checker"
        description="Look up Wegovy, Zepbound, Ozempic, and Mounjaro coverage at 30 large US employers including Amazon, Walmart, Google, Microsoft, and the federal government."
        url="https://weightlossrankings.org/tools/insurance-employer-checker"
        image="https://weightlossrankings.org/tools/insurance-employer-checker/opengraph-image"
        isMedical={false}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          Insurance employer checker
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Employer coverage lookup
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Does my employer cover Wegovy or Zepbound?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          A patient-facing lookup of GLP-1 weight loss drug coverage at
          30 large US employers. Search by name or industry to see
          reported coverage status for Wegovy, Zepbound, Ozempic, and
          Mounjaro — then verify the result with your HR or benefits
          portal before assuming anything.
        </p>
      </header>

      <EmployerSearch />

      <div className="mt-10 rounded-2xl border border-brand-violet/30 bg-brand-violet/5 p-6">
        <h2 className="font-heading text-lg font-bold text-brand-text-primary">
          This is not authoritative coverage information
        </h2>
        <p className="mt-2 text-sm text-brand-text-secondary leading-relaxed">
          Employer health plans change every plan year. Coverage of
          anti-obesity GLP-1s like Wegovy and Zepbound is one of the
          most volatile categories in employer pharmacy benefits right
          now — plans add, drop, or restrict access mid-year. Even
          within the same employer, coverage frequently differs by plan
          tier, by union vs. non-union status, by state, by deductible
          status, and by which PBM administers the pharmacy benefit.
          Use this tool as a starting point only. The single source of
          truth is your plan&apos;s formulary document and your HR
          benefits portal.
        </p>
      </div>

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How to read this tool</h2>
        <p>
          Each employer card shows the four major GLP-1 medications
          relevant to weight management. The two anti-obesity drugs
          (Wegovy and Zepbound) are the ones with the most volatile
          coverage decisions, since they are FDA-approved specifically
          for weight loss and are not categorized as diabetes
          medications. Ozempic and Mounjaro are FDA-approved for type 2
          diabetes; coverage for these is generally broader because
          they are clinically indicated for a chronic disease, but a
          prior authorization is almost always required.
        </p>

        <h2>Coverage status definitions</h2>
        <ul>
          <li>
            <strong>Covered</strong> — On the plan formulary with
            standard cost-sharing. The patient pays the normal copay or
            coinsurance for that tier.
          </li>
          <li>
            <strong>Prior auth</strong> — On formulary, but the
            prescriber must submit a prior authorization request
            documenting BMI, comorbidities, and prior weight management
            efforts before the pharmacy will fill it.
          </li>
          <li>
            <strong>Step therapy</strong> — The plan requires the
            patient to try (and fail) a less expensive medication
            first, often phentermine or older anti-obesity drugs,
            before approving a GLP-1.
          </li>
          <li>
            <strong>Not covered</strong> — Excluded from the plan
            formulary entirely. The patient pays the full cash price
            or uses a telehealth cash-pay route.
          </li>
          <li>
            <strong>Unknown</strong> — The employer has not publicly
            disclosed its coverage decision and we have not received
            patient-reported data we can validate. Treat this as a
            prompt to call your benefits hotline.
          </li>
        </ul>

        <h2>Confidence labels</h2>
        <p>
          Each card carries a confidence label that tells you how much
          weight to give the coverage status:
        </p>
        <ul>
          <li>
            <strong>Verified from plan documents</strong> — The
            coverage status was sourced directly from a published plan
            brochure or formulary document.
          </li>
          <li>
            <strong>Reported / publicly discussed</strong> — The
            employer has spoken about its GLP-1 coverage publicly (in
            press, in earnings calls, or in HR communications) but we
            have not confirmed it against the live formulary.
          </li>
          <li>
            <strong>Unverified — patient must confirm</strong> — No
            authoritative source. Coverage is listed as Unknown by
            default; the card exists so patients searching for the
            employer can find a credible &ldquo;we don&apos;t know,
            here&apos;s how to find out&rdquo; answer rather than
            speculation.
          </li>
        </ul>

        <h2>Methodology</h2>
        <p>
          The 30 employers in this tool were selected based on US
          headcount and search volume for &ldquo;does [employer] cover
          Wegovy.&rdquo; Most employers in the United States do not
          publicly disclose their pharmacy benefit formularies — that
          information lives behind a benefits-portal login. Where an
          employer has been quoted in trade press or earnings calls
          discussing its anti-obesity drug coverage, we mark the
          confidence as &ldquo;reported.&rdquo; Where coverage is not
          publicly disclosed, the default is &ldquo;Unknown&rdquo; with
          confidence &ldquo;unverified.&rdquo; We deliberately do not
          guess. The value of this tool is the structured framework
          and the verification prompt, not invented coverage data.
        </p>

        <h2>What to do next</h2>
        <p>
          If your employer is in this list, treat the result as a
          starting point and call your benefits hotline or open your HR
          portal. Look specifically for the prescription drug formulary
          document for the plan year you are enrolled in, and search
          for &ldquo;semaglutide,&rdquo; &ldquo;tirzepatide,&rdquo;
          &ldquo;Wegovy,&rdquo; and &ldquo;Zepbound.&rdquo; If you
          don&apos;t see them in the formulary, they are almost
          certainly not covered for the weight-loss indication on your
          plan.
        </p>

        <h2>If your plan does not cover Wegovy or Zepbound</h2>
        <p>
          You still have options. The two main routes are:
        </p>
        <ul>
          <li>
            <strong>Manufacturer self-pay programs.</strong> Novo
            Nordisk and Eli Lilly both run direct-to-patient cash-pay
            programs for Wegovy and Zepbound at significant discounts
            to list price.
          </li>
          <li>
            <strong>Telehealth GLP-1 providers.</strong> Many
            telehealth clinics offer brand or compounded GLP-1
            prescriptions on a cash-pay basis. See our{" "}
            <Link href="/compare">provider comparison</Link> for an
            independent ranking.
          </li>
        </ul>

        <h2>Related tools</h2>
        <ul>
          <li>
            <Link href="/insurance-checker">
              Insurance plan checker (by carrier and PBM)
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose &amp; concentration plotter
            </Link>
          </li>
          <li>
            <Link href="/savings-calculator">
              GLP-1 savings calculator
            </Link>
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for informational and educational use only and
          does not constitute medical, legal, or benefits advice.
          Coverage information is patient-reported and
          publicly-sourced; it is not authoritative and may be out of
          date. Weight Loss Rankings is not affiliated with any of the
          employers listed and does not have access to private plan
          documents. Always verify coverage with your employer&apos;s
          HR department or benefits portal before making any treatment
          decisions.
        </p>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
