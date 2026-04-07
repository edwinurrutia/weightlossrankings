import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "glp1-insurance-coverage-medicare-medicaid-commercial";

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

// Every coverage claim in this article was verified by an editorial
// research subagent against primary CMS, KFF, Mercer, OPM, TRICARE,
// and VA sources before publication. The November 2025 Trump
// administration GLP-1 deal and the resulting Medicare GLP-1 Bridge
// program (July-December 2026) and BALANCE permanent model are the
// dominant Medicare story; the 13-state Medicaid count is from KFF
// January 2026 data; the 49% large-employer coverage figure is from
// the 2025 Mercer National Survey of Employer-Sponsored Health Plans.

export default function InsuranceCoverageArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Centers for Medicare & Medicaid Services.",
      title:
        "Medicare GLP-1 Bridge Program — Temporary Coverage of Anti-Obesity Medications, July 1 - December 31, 2026.",
      source: "CMS.gov",
      year: 2026,
      url: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge",
    },
    {
      authors: "Centers for Medicare & Medicaid Services.",
      title:
        "BALANCE Model — Better Approaches to Lifestyle and Nutrition for Comprehensive hEalth (CMMI Innovation Model, beginning 2027).",
      source: "CMS Innovation Center",
      year: 2026,
      url: "https://www.cms.gov/priorities/innovation/innovation-models/balance",
    },
    {
      authors: "KFF (Kaiser Family Foundation).",
      title:
        "Medicaid Coverage of and Spending on GLP-1 Drugs for Obesity — January 2026 update.",
      source: "KFF Health Policy",
      year: 2026,
      url: "https://www.kff.org/medicaid/medicaid-coverage-of-and-spending-on-glp-1s/",
    },
    {
      authors: "KFF (Kaiser Family Foundation).",
      title:
        "2025 Employer Health Benefits Survey — Section on GLP-1 weight loss drug coverage.",
      source: "KFF Health Policy",
      year: 2025,
      url: "https://www.kff.org/health-costs/2025-employer-health-benefits-survey/",
    },
    {
      authors: "Mercer.",
      title:
        "National Survey of Employer-Sponsored Health Plans — GLP-1 coverage trends (2025).",
      source: "Mercer Health & Benefits",
      year: 2025,
      url: "https://www.mercer.com/insights/total-rewards/employee-benefits-strategy/",
    },
    {
      authors: "Defense Health Agency.",
      title:
        "TRICARE Coverage of Weight Loss Medications — TRICARE Newsroom and Pharmacy Program updates (August 2025).",
      source: "TRICARE.mil",
      year: 2025,
      url: "https://newsroom.tricare.mil/News/TRICARE-News/Article/4266447/tricare-coverage-of-weight-loss-medications-what-to-know",
    },
    {
      authors: "U.S. Department of Veterans Affairs.",
      title:
        "VA National Formulary Advisor — Semaglutide coverage criteria.",
      source: "VA.gov",
      year: 2025,
      url: "https://www.va.gov/formularyadvisor/drugs/4040576-SEMAGLUTIDE-INJ-SOLN",
    },
    {
      authors: "U.S. Office of Personnel Management.",
      title:
        "Federal Employees Health Benefits (FEHB) Program — 2026 Plan Year Anti-Obesity Drug Coverage Requirements.",
      source: "OPM.gov",
      year: 2026,
      url: "https://www.opm.gov/healthcare-insurance/healthcare/plan-information/plans/",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Insurance coverage for GLP-1 weight loss drugs is the most
        volatile category in employer pharmacy benefits. The 2025-2026
        landscape changed dramatically: the original CMS proposed rule
        allowing Wegovy under Medicare Part D was rejected in April
        2025, then partially reversed by a November 2025 Trump
        administration deal that created a temporary Medicare GLP-1
        Bridge program (July through December 2026) and the BALANCE
        permanent Medicare model that begins in 2027 [1, 2].
        Medicaid coverage shrank from 16 states in October 2025 to 13
        in January 2026 after California and Pennsylvania ended their
        weight-management coverage [3]. Commercial coverage moved the
        opposite way — 49% of large employers covered GLP-1s in 2025
        per the Mercer survey, up from 44% in 2024 [4, 5]. Tricare,
        the VA, and FEHB all changed their rules. This guide walks
        through the verified state of coverage across every major US
        payer category in April 2026.
      </p>

      <h2>The Medicare situation: what actually changed in 2025-2026</h2>

      <p>
        The Medicare Part D statute (42 USC §1395w-102(e)(2)(A))
        prohibits coverage of &ldquo;drugs used for weight loss.&rdquo; This rule
        has applied since the program&apos;s inception in 2003 and is
        the legal foundation for why Medicare beneficiaries
        historically could not get Wegovy, Zepbound, or any other
        anti-obesity drug covered through their Part D plan.
      </p>

      <p>
        Two specific events in 2025 changed (and re-changed) this
        situation:
      </p>

      <ol>
        <li>
          <strong>The November 2024 CMS proposed rule</strong> would
          have removed the weight-loss prohibition under 42 CFR
          §423.120(b)(1). The Trump administration&apos;s final rule
          (April 8, 2025) did NOT finalize the anti-obesity medication
          provisions — CMS stated it did not intend to finalize them.
        </li>
        <li>
          <strong>The November 6, 2025 Trump administration deal</strong>{" "}
          with Novo Nordisk and Eli Lilly created two new pathways
          [1, 2]:
        </li>
      </ol>

      <h3>The Medicare GLP-1 Bridge program (July 1 - December 31, 2026)</h3>

      <p>
        Verified details from the CMS Medicare GLP-1 Bridge program
        page [1]:
      </p>

      <ul>
        <li>
          <strong>Drugs covered:</strong> Foundayo (all formulations),
          Wegovy (all formulations), Zepbound KwikPen
        </li>
        <li>
          <strong>Patient cost:</strong> $50 copayment per fill
        </li>
        <li>
          <strong>Eligibility:</strong> BMI ≥35 alone, OR BMI ≥27
          plus one of the standard weight-related comorbidities
          (hypertension, type 2 diabetes, dyslipidemia, sleep apnea,
          cardiovascular disease)
        </li>
        <li>
          <strong>Process:</strong> Prior authorization required;
          Humana administers the program on behalf of CMS
        </li>
        <li>
          <strong>Duration:</strong> Temporary — runs through
          December 31, 2026 only
        </li>
      </ul>

      <h3>The BALANCE permanent model (begins 2027)</h3>

      <p>
        BALANCE (Better Approaches to Lifestyle and Nutrition for
        Comprehensive hEalth) is the CMS Innovation Center model that
        will replace the Bridge program in 2027 [2]. As of April 2026
        the full design details are still in development. CMS has
        committed to making the model permanent rather than rolling
        coverage back at the end of the Bridge period.
      </p>

      <h3>Ozempic for kidney disease: a separate Medicare path</h3>

      <p>
        On January 28, 2025, the FDA approved Ozempic (semaglutide)
        for reducing the risk of kidney disease worsening, kidney
        failure, and cardiovascular death in adults with type 2
        diabetes and chronic kidney disease, based on the FLOW trial
        (Perkovic et al., NEJM 2024, PMID 38785209). Because this
        is a <em>diabetes</em> indication and not a weight-loss-only
        indication, it falls outside the Part D weight-loss
        prohibition entirely. Medicare Part D covers Ozempic for
        eligible T2D + CKD patients as a diabetes drug.
      </p>

      <h2>Medicaid coverage: a state-by-state patchwork</h2>

      <p>
        State Medicaid programs make their own decisions about
        anti-obesity drug coverage. The KFF January 2026 update [3]
        reported that <strong>only 13 state Medicaid Fee-For-Service
        programs cover GLP-1s for obesity</strong>, down from 16
        states in October 2025. The recent retractions:
      </p>

      <ul>
        <li>
          <strong>California Medi-Cal:</strong> ended weight-loss
          coverage effective January 1, 2026
        </li>
        <li>
          <strong>Pennsylvania:</strong> ended obesity coverage
          effective January 1, 2026
        </li>
        <li>
          <strong>North Carolina:</strong> eliminated coverage in
          October 2025, then reinstated in December 2025
        </li>
      </ul>

      <p>
        The state-level decisions are driven primarily by budget
        impact — GLP-1 spending hit double-digit percentages of
        Medicaid pharmacy budgets in many states, and several state
        legislatures explicitly cited cost as the reason for
        retraction. A patient on Medicaid should call their state
        Medicaid office or check the most recent KFF tracker for
        their specific state, since the situation continues to
        change quarter to quarter.
      </p>

      <h2>Commercial insurance: the Mercer 2025 survey numbers</h2>

      <p>
        Commercial coverage moved the opposite direction from
        Medicaid. The 2025 Mercer National Survey of
        Employer-Sponsored Health Plans [5] and the 2025 KFF
        Employer Health Benefits Survey [4] both reported expanded
        coverage:
      </p>

      <ul>
        <li>
          <strong>Large employers (≥5,000 workers):</strong> 43%
          covered GLP-1s for weight loss in 2025, up from 28% in
          2024
        </li>
        <li>
          <strong>All large firms:</strong> approximately 19%
          covered for weight loss in 2025
        </li>
        <li>
          <strong>Mercer overall figure:</strong> 49% of large
          employers covered GLP-1s for weight loss in 2025, up from
          44% in 2024
        </li>
        <li>
          <strong>Cost impact:</strong> 59% of employers with
          coverage reported higher-than-expected utilization, and
          66% reported significant impact on their prescription
          drug spending. Mercer projected a 6.7% health benefit
          cost increase in 2026 driven in part by GLP-1 spending.
        </li>
      </ul>

      <p>
        The trend line is for more employers to add coverage but
        with stricter prior auth criteria — BMI thresholds,
        documented lifestyle program participation, step therapy
        through cheaper drugs. See the prior auth section below, and
        our broader{" "}
        <Link href="/research/glp1-insurance-coverage-audit">
          insurer-by-insurer GLP-1 coverage audit
        </Link>{" "}
        for the per-payer formulary picture.
      </p>

      <h2>Tricare (military families and retirees)</h2>

      <p>
        Tricare made two notable changes in 2025 [6]:
      </p>

      <ul>
        <li>
          <strong>Active duty + retirees on Tricare Prime/Select:</strong>{" "}
          Tricare covers Wegovy and Zepbound with prior
          authorization. Eligibility: BMI ≥30, or BMI ≥27 with a
          weight-related condition. Patient must have failed oral
          anti-obesity medications (Qsymia, Contrave) plus 6 months
          of documented lifestyle modification. Zepbound PA is
          valid initially for 6 months, then 12-month renewals.
        </li>
        <li>
          <strong>Tricare For Life beneficiaries:</strong> GLP-1s are
          NO LONGER covered for Tricare For Life as of August 31,
          2025. This is the Medicare-eligible retiree population, so
          they fall under the Medicare GLP-1 Bridge program instead
          (with its $50 copayment and BMI ≥35 / BMI ≥27+comorbidity
          criteria).
        </li>
      </ul>

      <h2>Veterans Affairs</h2>

      <p>
        VA coverage is split between the diabetes and weight-loss
        indications [7]:
      </p>

      <ul>
        <li>
          <strong>For type 2 diabetes:</strong> The VA covers
          Ozempic (and other GLP-1s) for veterans with T2D as part
          of standard diabetes care.
        </li>
        <li>
          <strong>For weight loss specifically:</strong> The VA
          covers GLP-1s for veterans with BMI ≥27 plus a
          weight-related condition (or BMI ≥30 alone) who have
          failed lower-cost anti-obesity agents and who participate
          in the VA Whole Health weight management program.
        </li>
        <li>
          <strong>CHAMPVA (family members):</strong> As of January
          1, 2025, CHAMPVA covers GLP-1s ONLY for type 2 diabetes
          diagnosis — not for weight loss alone.
        </li>
      </ul>

      <h2>Federal Employees Health Benefits (FEHB)</h2>

      <p>
        OPM&apos;s 2026 plan year guidance requires that all FEHB
        plans provide coverage for at least one GLP-1 medication for
        weight loss plus two oral anti-obesity drugs [8]. Tier
        placement varies by carrier:
      </p>

      <ul>
        <li>
          <strong>FEP Blue Focus:</strong> Wegovy and Zepbound
          listed as Tier 2 Preferred (lower copay)
        </li>
        <li>
          <strong>FEP Blue Basic / Standard:</strong> Zepbound
          listed as Tier 3 non-preferred (higher copay)
        </li>
        <li>
          <strong>Kaiser FEHB plans:</strong> Increased member cost
          share to 50% for GLP-1s for weight loss in 2026
        </li>
      </ul>

      <h2>Prior authorization: what every payer typically requires</h2>

      <p>
        Across nearly all payers (commercial, Tricare, VA, FEHB), the
        standard prior auth criteria for Wegovy or Zepbound for
        weight management require:
      </p>

      <ol>
        <li>
          <strong>BMI threshold:</strong> ≥30 alone, OR ≥27 with a
          documented weight-related comorbidity
        </li>
        <li>
          <strong>Comorbidity documentation:</strong> ICD-10 code
          for at least one of: hypertension (I10), type 2 diabetes
          (E11), dyslipidemia (E78), obstructive sleep apnea (G47.33),
          or established cardiovascular disease (I25.x)
        </li>
        <li>
          <strong>Current vitals:</strong> height, weight, and BMI
          recorded within the past 30 days
        </li>
        <li>
          <strong>Lifestyle modification documentation:</strong> 6
          months of documented diet and exercise records, structured
          weight loss program participation, or visit notes
          documenting prior attempts
        </li>
        <li>
          <strong>Prior medication trial details:</strong> dosage,
          duration, and reason for failure of any previously tried
          anti-obesity medication
        </li>
        <li>
          <strong>Letter of Medical Necessity</strong> from the
          prescriber
        </li>
      </ol>

      <p>
        Some payers add specific step therapy requirements. CVS
        Caremark, for example, requires patients seeking Zepbound to
        first try Wegovy for 12-16 weeks and demonstrate &lt;5% weight
        loss or documented intolerance before approving the
        Zepbound switch. UnitedHealthcare commercial plans vary
        widely — some require BMI ≥40 for Wegovy approval.
      </p>

      <h2>Legislative landscape: TROA and state mandates</h2>

      <p>
        The Treat and Reduce Obesity Act (S.1973 / H.R.4231 in the
        119th Congress) was reintroduced in 2025 with bipartisan
        support but has NOT been enacted as of April 2026. TROA would
        permanently amend the Medicare Part D statute to allow
        coverage of FDA-approved anti-obesity medications. Its
        progress is tracked at congress.gov.
      </p>

      <p>
        At the state level, two states have already passed binding
        mandates requiring commercial insurance coverage of GLP-1
        anti-obesity drugs:
      </p>

      <ul>
        <li>
          <strong>North Dakota</strong> became the first US state in
          January 2025 to amend its Essential Health Benefits clause
          to require all individual and group health plans to cover
          FDA-approved GLP-1 and GIP medications for weight loss as
          part of ACA compliance.
        </li>
        <li>
          <strong>California</strong> followed with AB 575, effective
          January 1, 2026, requiring health service plans and
          insurers to cover at least one FDA-approved GLP-1 receptor
          agonist with no prior authorization required, and
          prohibiting coverage criteria more restrictive than the
          FDA approval label.
        </li>
      </ul>

      <p>
        At least 14 other states introduced similar legislation in
        the first half of 2025. The patchwork is tracked by the KFF
        state legislation database and the Pharmacy Times state
        mandate tracker.
      </p>

      <h2>Self-pay pricing snapshot (April 2026)</h2>

      <p>
        For patients without coverage, the manufacturer direct-pay
        prices as of April 2026 are (and our{" "}
        <Link href="/research/glp1-pricing-index">
          live GLP-1 pricing index
        </Link>{" "}
        tracks the cash-pay compounded benchmark across 80+
        telehealth providers for patients comparing against an
        insurance copay):
      </p>

      <ul>
        <li>
          <strong>Wegovy (NovoCare Pharmacy Direct):</strong>{" "}
          injectable $199-$499/month depending on dose and
          introductory status; oral formulation $149-$349/month
          (the introductory $149 4 mg offer ends August 31, 2026,
          then reverts to $199/month).
        </li>
        <li>
          <strong>Zepbound (LillyDirect single-vial):</strong>{" "}
          following the December 1, 2025 price reduction:
          2.5 mg vial $299/month, 5 mg $399/month, and 7.5/10/12.5/15
          mg $449/month with a 45-day refill incentive.
        </li>
        <li>
          <strong>Foundayo (Lilly oral GLP-1):</strong> $25/month
          with commercial insurance + savings card; $149-$299/month
          self-pay depending on dose; ~$50/month for eligible
          Medicare Part D patients via the Bridge program starting
          July 1, 2026.
        </li>
      </ul>

      <p>
        For the full cost comparison across all 10 access paths
        (commercial + direct-pay + compounded + Foundayo), see our{" "}
        <Link href="/tools/glp1-savings-calculator">
          GLP-1 savings calculator
        </Link>
        .
      </p>

      <h2>How to find out what your specific plan covers</h2>

      <p>
        The fastest way to know what you&apos;re actually eligible
        for:
      </p>

      <ol>
        <li>
          <strong>Look up your plan&apos;s formulary.</strong> Every
          insurance plan publishes a drug formulary listing covered
          medications and their tier placement. Search for &ldquo;Wegovy&rdquo;
          or &ldquo;Zepbound&rdquo; by name. If the drug is listed, the
          formulary will note the prior auth requirement and the
          tier copay.
        </li>
        <li>
          <strong>Call the member services number on your insurance
          card.</strong> Ask specifically: &ldquo;Is Wegovy or Zepbound on
          my formulary for chronic weight management? What are the
          prior auth criteria? What would my copay be at tier X?&rdquo;
        </li>
        <li>
          <strong>Check our{" "}
          <Link href="/tools/insurance-employer-checker">
            insurance employer checker
          </Link>
          </strong>{" "}
          if you work for one of the 30 large employers we track.
          It shows reported coverage status for each.
        </li>
        <li>
          <strong>Talk to your prescriber.</strong> Many prescribers
          have benefits navigators or PA specialists who can submit
          the prior auth on your behalf.
        </li>
        <li>
          <strong>Use a manufacturer savings card if eligible.</strong>{" "}
          With commercial insurance and an approved PA, the Wegovy
          and Zepbound savings cards typically bring patient cost
          to ~$25/month. Foundayo is at $25/month with insurance and
          $149/month self-pay.
        </li>
      </ol>

      <h2>Important disclaimer</h2>

      <p>
        This article is educational and reflects the publicly
        available state of coverage as of April 2026. Insurance
        coverage decisions change frequently and the specific terms
        of your plan may differ from the general categories described
        here. Always verify coverage with your specific insurance
        plan&apos;s member services line and your prescriber before
        making decisions about your therapy. Weight Loss Rankings does
        not provide medical or financial advice.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For employer-by-employer coverage data on 30 large US
        employers, see our{" "}
        <Link href="/tools/insurance-employer-checker">
          insurance employer checker
        </Link>
        . For the cost comparison if you do end up self-paying, see
        our{" "}
        <Link href="/tools/glp1-savings-calculator">
          savings calculator
        </Link>
        . For the new Foundayo $149/month launch that&apos;s
        reshaping the cost floor, see our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo FDA approval deep-dive
        </Link>
        . For the FLOW kidney trial that opened Ozempic Medicare
        coverage for T2D + CKD patients, see our{" "}
        <Link href="/research/flow-trial-semaglutide-kidney-disease">
          FLOW trial deep-dive
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
