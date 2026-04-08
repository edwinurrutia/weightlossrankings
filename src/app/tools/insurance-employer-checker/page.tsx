import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import EmployerSearch from "./EmployerSearch";

export const metadata: Metadata = {
  title:
    "Does My Employer Cover Wegovy or Zepbound? Verified Benchmarks + DIY Guide",
  description:
    "Six verified employer GLP-1 coverage benchmarks (Amazon, FedEx, JPMorgan Chase, Microsoft, Federal Government, USPS) plus a step-by-step guide to finding out whether YOUR employer covers Wegovy, Zepbound, Ozempic, or Mounjaro. Most US employers do not publish their pharmacy formularies; this page shows you how to find yours.",
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
          6 verified employer benchmarks · DIY guide for the rest
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Does my employer cover Wegovy or Zepbound?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Most US employers do not publish their pharmacy formularies.
          KFF, Mercer, and Sequoia survey 200+ companies but anonymize
          the answers. SEC filings rarely disclose benefit details.
          So instead of guessing, this page does two things: it shows
          the <strong>6 employers we have verified primary sources for</strong>,
          and it walks you through{" "}
          <strong>how to find out about YOUR specific employer</strong> in
          under 10 minutes.
        </p>
      </header>

      <div className="mb-10 rounded-2xl border-2 border-brand-violet/30 bg-brand-bg-purple p-6">
        <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-3">
          Why only 6 employers?
        </h2>
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-3">
          We previously listed 30 employers based on industry-survey
          aggregate data. When we audited the dataset for primary
          sources during our 2026-04-07 verification pass, only 5
          entries had verifiable employer-specific information (Amazon
          via the 9amHealth program page, FedEx, JPMorgan Chase, the
          US Federal Government&apos;s FEHB program, and USPS&apos;s
          PSHB program). We added Microsoft as medium-confidence
          because the Premera 5.01.621 policy framework is public even
          though Microsoft&apos;s specific election is not.
        </p>
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-3">
          The other 24 employers we previously listed (Walmart, Target,
          Apple, Google, Meta, Costco, Home Depot, Lowe&apos;s,
          Starbucks, Nike, Disney, Boeing, Delta, United, UPS, Bank of
          America, Wells Fargo, IBM, Salesforce, Oracle, Cisco, Intel,
          AT&amp;T, Verizon) had no verifiable primary source. KFF,
          Mercer, and Sequoia interview 200+ employers each year but
          deliberately anonymize the responses. SEC 10-K filings
          rarely break out specific drug benefit decisions. Benefits
          portals require employee logins. So we removed those rows
          rather than fabricate coverage data — per our editorial
          policy, &ldquo;honest unverified&rdquo; beats
          &ldquo;invented coverage.&rdquo;
        </p>
        <p className="text-sm text-brand-text-secondary leading-relaxed">
          The DIY guide below is now the primary use case for this
          page. The 6 verified rows are reference benchmarks of how
          the major plan administrators (Aetna, BCBS, UnitedHealthcare,
          Premera, OPM) handle GLP-1 weight management drugs.
        </p>
      </div>

      <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
        Verified employer benchmarks (6)
      </h2>
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
