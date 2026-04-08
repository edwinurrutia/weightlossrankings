import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import EmployerSearch from "./EmployerSearch";
import employersData from "@/data/employer-coverage.json";

const EMPLOYER_COUNT = employersData.length;

export const metadata: Metadata = {
  title:
    "Does My Employer Cover Wegovy or Zepbound? Verified Coverage Database",
  description: `Verified GLP-1 coverage data for ${EMPLOYER_COUNT} major US employers, plus a step-by-step DIY guide for finding your own employer's pharmacy benefit. Every entry is anchored in a primary source with a direct quote.`,
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
        description="Verified employer GLP-1 coverage benchmarks (Amazon, FedEx, JPMorgan Chase, Microsoft, Federal Government, USPS) plus a DIY guide to checking your own employer's pharmacy benefit."
        url="https://weightlossrankings.org/tools/insurance-employer-checker"
        image="https://weightlossrankings.org/tools/insurance-employer-checker/opengraph-image"
        isMedical={false}
        datePublished="2026-04-08"
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
          {EMPLOYER_COUNT} verified employers · DIY guide for everyone else
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Does my employer cover Wegovy or Zepbound?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Most US employers don&apos;t publish their pharmacy formulary.
          Below are <strong>{EMPLOYER_COUNT} employers we have
          verified directly</strong> from primary sources (employer
          benefits portals, vendor partnership pages, OPM filings, or
          plan documents) — every entry includes the source URL and a
          direct quote. If your employer isn&apos;t listed, scroll
          down for the 5-step DIY guide that works for any plan in
          under 10 minutes.
        </p>
      </header>

      <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-2">
        Verified employer database ({EMPLOYER_COUNT})
      </h2>
      <p className="text-sm text-brand-text-secondary mb-5 max-w-2xl">
        Each entry below is anchored in a primary source. Click
        &ldquo;Read full source notes&rdquo; on any card to see the
        exact verification quote and URL. New employers added as we
        verify them — see our{" "}
        <Link
          href="/methodology"
          className="text-brand-violet underline hover:no-underline"
        >
          methodology
        </Link>{" "}
        for how we verify.
      </p>
      <EmployerSearch />

      <div className="mt-12 rounded-2xl border-2 border-brand-violet bg-white p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
          How to find out if YOUR employer covers Wegovy or Zepbound
        </h2>
        <p className="text-base text-brand-text-secondary leading-relaxed mb-6">
          A 5-step process that works for any US employer-sponsored
          health plan. Total time: about 10 minutes. The output is
          the single source of truth for your specific plan year.
        </p>

        <ol className="space-y-6">
          <li>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-brand-text-primary mb-2">
                  Log into your benefits portal
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  Most US employers use one of: BenefitFocus, Workday
                  Benefits, ADP, BSwift, Empyrean, Mercer Marketplace,
                  Businessolver, or a custom HR portal. Your HR
                  department can point you at the right URL. The portal
                  is where the Summary of Benefits and Coverage (SBC),
                  the Summary Plan Description (SPD), and the
                  prescription drug formulary all live.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-brand-text-primary mb-2">
                  Download the prescription drug formulary
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  Look for a PDF labeled &ldquo;Formulary,&rdquo;{" "}
                  &ldquo;Drug List,&rdquo; or &ldquo;Pharmacy Benefit
                  Summary&rdquo; for the current plan year. It will
                  list every covered drug with its tier (1, 2, 3, 4)
                  and any prior authorization or step therapy
                  requirements. If your plan uses a separate Pharmacy
                  Benefit Manager (Caremark, ESI, OptumRx, MedImpact,
                  Prime, Navitus, Costco PBM), the formulary may be on
                  the PBM&apos;s site instead.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-brand-text-primary mb-2">
                  Search the formulary for these exact terms
                </h3>
                <ul className="text-sm text-brand-text-secondary leading-relaxed space-y-1 list-disc list-inside">
                  <li>
                    <strong>&ldquo;Wegovy&rdquo;</strong> (semaglutide
                    for weight management)
                  </li>
                  <li>
                    <strong>&ldquo;Zepbound&rdquo;</strong> (tirzepatide
                    for weight management)
                  </li>
                  <li>
                    <strong>&ldquo;semaglutide&rdquo;</strong>
                  </li>
                  <li>
                    <strong>&ldquo;tirzepatide&rdquo;</strong>
                  </li>
                  <li>
                    <strong>&ldquo;orforglipron&rdquo;</strong> or{" "}
                    <strong>&ldquo;Foundayo&rdquo;</strong> (the new
                    oral GLP-1)
                  </li>
                  <li>
                    <strong>
                      &ldquo;weight management drugs&rdquo;
                    </strong>{" "}
                    or <strong>&ldquo;anti-obesity drugs&rdquo;</strong>
                  </li>
                  <li>
                    <strong>&ldquo;exclusion&rdquo;</strong> (some plans
                    list weight-loss drugs as a category-level
                    exclusion)
                  </li>
                </ul>
                <p className="text-sm text-brand-text-secondary leading-relaxed mt-3">
                  If you find Wegovy or Zepbound listed: read the tier
                  and any PA / step therapy notes. If you don&apos;t
                  find them at all, they are almost certainly excluded
                  from your plan&apos;s weight-management benefit.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center text-sm">
                4
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-brand-text-primary mb-2">
                  Cross-reference with the plan administrator&apos;s
                  clinical policy bulletin
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  Even if your formulary lists Wegovy, the actual
                  approval criteria live in the plan administrator&apos;s
                  clinical policy bulletin. Aetna publishes CPB 0040,
                  Cigna publishes coverage policies under their{" "}
                  <em>medical necessity</em> manual, UnitedHealthcare
                  publishes its &ldquo;Pharmacy Coverage Determination
                  Guidelines,&rdquo; and BCBS plans publish per-state
                  medical policies. These documents tell you the
                  specific BMI thresholds, comorbidity requirements,
                  and supervised-weight-management prerequisites that
                  apply.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center text-sm">
                5
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-brand-text-primary mb-2">
                  Call member services if anything is unclear
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  The phone number is on the back of your insurance
                  card. Ask: &ldquo;Is Wegovy covered for chronic weight
                  management on my specific plan, and what are the
                  prior authorization requirements?&rdquo; They are
                  required to answer. Get the answer in writing if you
                  can — chat transcripts and email confirmations
                  protect you if there is later confusion.
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>

      <div className="mt-10 rounded-2xl border border-brand-violet/30 bg-brand-violet/5 p-6">
        <h2 className="font-heading text-lg font-bold text-brand-text-primary">
          Reference benchmarks, not authoritative for your plan
        </h2>
        <p className="mt-2 text-sm text-brand-text-secondary leading-relaxed">
          The 6 employer entries above are reference benchmarks. Even
          within the same employer, coverage frequently differs by plan
          tier, union vs. non-union status, state, deductible status,
          and which PBM administers the pharmacy benefit. Coverage of
          anti-obesity GLP-1s changes mid-year as plans add, drop, or
          restrict access. The single source of truth for{" "}
          <em>your</em> coverage is the formulary document for{" "}
          <em>your</em> plan year on <em>your</em> benefits portal.
          Follow the 5-step DIY guide above.
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
            <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
              GLP-1 insurance coverage landscape (Medicare, Medicaid &amp; commercial)
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose &amp; concentration plotter
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-savings-calculator">
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
