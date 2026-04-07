import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

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

// Every claim in this article is sourced to a primary document:
// the federal Part D statute (42 USC 1395w-102), the FDA Wegovy and
// Ozempic labels, the March 20, 2024 CMS HPMS guidance permitting
// Part D coverage of Wegovy for the SELECT MACE indication, the KFF
// Medicaid GLP-1 tracker, the Mercer 2024 National Survey of
// Employer-Sponsored Health Plans, OPM FEHB Carrier Letter 2023-01,
// and the SELECT and FLOW NEJM trial publications. Speculative claims
// about future Medicare programs, state-by-state monthly deltas, and
// payer-specific tier placements that could not be verified to a
// primary document have been removed.

export default function InsuranceCoverageArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Code.",
      title:
        "42 U.S.C. § 1395w-102(e)(2)(A) — Prescription drug benefits; excluded drugs (Medicare Part D statutory exclusion of drugs used for anorexia, weight loss, or weight gain).",
      source: "Legal Information Institute, Cornell Law School",
      year: 2003,
      url: "https://www.law.cornell.edu/uscode/text/42/1395w-102",
    },
    {
      authors: "Centers for Medicare & Medicaid Services.",
      title:
        "HPMS memo, March 20, 2024 — Coverage of Anti-Obesity Medications (AOMs) under Medicare Part D following FDA approval of an additional medically accepted indication.",
      source: "CMS / Congressional Research Service summary",
      year: 2024,
      url: "https://www.congress.gov/crs-product/IF12758",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA approves first treatment to reduce risk of serious heart problems specifically in adults with obesity or overweight (Wegovy / semaglutide 2.4 mg, March 8, 2024 supplemental approval; cardiovascular risk reduction indication based on the SELECT trial).",
      source: "FDA.gov press announcement",
      year: 2024,
      url: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-treatment-reduce-risk-serious-heart-problems-specifically-adults-obesity-or",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Wegovy (semaglutide) injection prescribing information, label revision 2024 (Sections 1.2 and 14.2 — cardiovascular risk reduction indication).",
      source: "Drugs@FDA, label code 215256s011lbl.pdf",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
    {
      authors:
        "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes. New England Journal of Medicine 2023;389:2221-2232. PMID 37952131. (SELECT trial.)",
      source: "NEJM",
      year: 2023,
      url: "https://pubmed.ncbi.nlm.nih.gov/37952131/",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Ozempic (semaglutide) injection prescribing information, label revision January 28, 2025 — added indication to reduce the risk of sustained eGFR decline, end-stage kidney disease, and cardiovascular death in adults with type 2 diabetes and chronic kidney disease.",
      source: "Drugs@FDA, label code 209637s035,s037lbl.pdf",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s035,209637s037lbl.pdf",
    },
    {
      authors:
        "Perkovic V, Tuttle KR, Rossing P, et al.",
      title:
        "Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes. New England Journal of Medicine 2024;391:109-121. PMID 38785209. (FLOW trial.)",
      source: "NEJM",
      year: 2024,
      url: "https://pubmed.ncbi.nlm.nih.gov/38785209/",
    },
    {
      authors: "KFF (Kaiser Family Foundation).",
      title:
        "Medicaid Coverage of and Spending on GLP-1s — issue brief and state-by-state tracker.",
      source: "KFF Medicaid Program",
      year: 2024,
      url: "https://www.kff.org/medicaid/medicaid-coverage-of-and-spending-on-glp-1s/",
    },
    {
      authors: "North Carolina State Health Plan / NC Department of State Treasurer.",
      title:
        "State Health Plan Board of Trustees votes to end coverage of GLP-1 medications when used for weight loss, effective April 1, 2024 (board vote held January 25, 2024).",
      source: "NC Treasurer press release / State Health Plan board minutes",
      year: 2024,
      url: "https://www.nctreasurer.gov/news/press-releases/2024/04/22/treasurer-folwell-and-state-health-plan-issue-request-information-glp-1-drugs",
    },
    {
      authors: "Mercer.",
      title:
        "National Survey of Employer-Sponsored Health Plans 2024 — coverage of GLP-1 drugs for obesity by employer size.",
      source: "Mercer Health & Benefits",
      year: 2024,
      url: "https://www.mercer.com/en-us/about/newsroom/employers-enhanced-health-benefits-in-2024-adding-coverage-for-weight-loss-medications-and-ivf-despite-growing-health-cost/",
    },
    {
      authors: "CVS Caremark.",
      title:
        "Enabling wider access to effective weight management treatment — CVS Caremark template formulary change removing Zepbound effective July 1, 2025, with Wegovy retained as the preferred GLP-1 for chronic weight management.",
      source: "CVS Caremark / business.caremark.com",
      year: 2025,
      url: "https://business.caremark.com/what-we-do/cost-management/formulary/glp-1s.html",
    },
    {
      authors: "U.S. Office of Personnel Management.",
      title:
        "FEHB Program Carrier Letter 2023-01 — Prevention and Treatment of Obesity (requires FEHB carriers to cover at least one GLP-1 drug for weight loss and at least two additional oral anti-obesity medications).",
      source: "OPM.gov",
      year: 2023,
      url: "https://www.opm.gov/healthcare-insurance/carriers/fehb/2023/2023-01.pdf",
    },
    {
      authors: "U.S. Congress.",
      title:
        "Treat and Reduce Obesity Act of 2025 — S.1973 (119th Congress) and H.R.4231 (119th Congress). Introduced; not enacted.",
      source: "Congress.gov",
      year: 2025,
      url: "https://www.congress.gov/bill/119th-congress/senate-bill/1973",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Coverage for GLP-1 weight loss drugs is the most fragmented
        category in US pharmacy benefits. Medicare Part D is barred by
        federal statute from covering any drug used for weight loss,
        with one narrow exception that opened in 2024 for Wegovy
        prescribed to reduce cardiovascular risk. Medicaid coverage
        varies state by state and only a minority of state programs
        cover GLP-1s for obesity. Commercial coverage depends entirely
        on the employer&apos;s plan design. This article walks through
        each payer category using only primary sources — the federal
        statute, FDA labels, CMS guidance, the SELECT and FLOW trial
        publications, the KFF Medicaid tracker, the Mercer national
        employer survey, and OPM&apos;s FEHB carrier letter.
      </p>

      <h2>1. The federal statutory framework</h2>

      <p>
        Medicare Part D is governed by 42 U.S.C. § 1395w-102. Section
        (e)(2)(A) of that statute incorporates the list of drugs that
        may be excluded from Medicaid coverage under Social Security
        Act § 1927(d)(2), which includes &ldquo;agents when used for
        anorexia, weight loss, or weight gain.&rdquo; That statutory
        exclusion has applied since Part D launched in 2006 and is the
        legal foundation for every Medicare GLP-1 coverage question
        <Cite n={1}/>. Congress has not amended this provision.
      </p>

      <h2>2. The one current Medicare Part D pathway: Wegovy for cardiovascular risk reduction</h2>

      <p>
        On March 8, 2024, the FDA approved a supplemental indication
        for Wegovy (semaglutide 2.4 mg) to reduce the risk of major
        adverse cardiovascular events (cardiovascular death, non-fatal
        myocardial infarction, and non-fatal stroke) in adults with
        established cardiovascular disease and either obesity or
        overweight, with no requirement for a type 2 diabetes
        diagnosis <Cite n={3}/><Cite n={4}/>. The approval was based
        on the SELECT trial, a randomized, double-blind, placebo-controlled
        outcomes study of 17,604 adults with preexisting cardiovascular
        disease and a BMI of 27 or greater but no diabetes. SELECT
        reported a primary MACE event in 6.5% of the semaglutide arm
        versus 8.0% of the placebo arm (hazard ratio 0.80; 95% CI 0.72
        to 0.90; P&lt;0.001) over a mean follow-up of 39.8 months
        <Cite n={5}/>.
      </p>

      <p>
        Twelve days later, on March 20, 2024, CMS issued an HPMS memo
        clarifying that an anti-obesity medication that subsequently
        receives FDA approval for an additional medically accepted
        indication may be considered a Part D drug for that specific
        use. CMS specifically noted that Wegovy, having received the
        cardiovascular risk reduction indication, may be covered by
        Part D plans when prescribed to reduce MACE risk in adults
        with established cardiovascular disease and obesity or
        overweight <Cite n={2}/>.
      </p>

      <p>The CMS guidance has four important limits:</p>

      <ul>
        <li>
          It is permissive, not mandatory. Part D plans <em>may</em>
          cover Wegovy for the cardiovascular indication; they are
          not required to.
        </li>
        <li>
          It applies only to Wegovy and only to the cardiovascular
          risk reduction indication. It does not extend to Zepbound,
          Saxenda, or any other anti-obesity GLP-1, none of which has
          a non-weight-loss FDA indication that would qualify them as
          a Part D drug for that use.
        </li>
        <li>
          It does not cover Wegovy when prescribed for the chronic
          weight management indication alone. A Part D plan that
          covers Wegovy under this pathway can apply prior
          authorization to confirm the prescription is for MACE
          reduction in an eligible patient.
        </li>
        <li>
          It does not change the underlying statutory exclusion at
          42 U.S.C. § 1395w-102(e)(2)(A). Drugs used for weight loss
          remain excluded.
        </li>
      </ul>

      <h2>3. The Ozempic kidney pathway (separate from weight loss)</h2>

      <p>
        On January 28, 2025, the FDA approved a supplemental indication
        for Ozempic (semaglutide injection 0.5 mg, 1 mg, and 2 mg) to
        reduce the risk of sustained eGFR decline, end-stage kidney
        disease, and cardiovascular death in adults with type 2
        diabetes and chronic kidney disease <Cite n={6}/>. The approval
        was based on the FLOW trial, which randomized 3,533 adults
        with type 2 diabetes and CKD to semaglutide 1 mg weekly versus
        placebo and reported a 24% relative reduction in the primary
        composite kidney outcome (hazard ratio 0.76; 95% CI 0.66 to
        0.88; P=0.0003) <Cite n={7}/>.
      </p>

      <p>
        Because the underlying indication is type 2 diabetes plus
        CKD, Ozempic for this use falls outside the Part D weight-loss
        exclusion entirely. Medicare Part D plans cover Ozempic for
        eligible T2D patients (with or without CKD) as a standard
        diabetes medication, subject to plan-level prior authorization.
        The same logic applies to Mounjaro (tirzepatide) for type 2
        diabetes. Neither drug is covered by Part D when prescribed
        for chronic weight management.
      </p>

      <h2>4. Medicaid: state-by-state variation</h2>

      <p>
        State Medicaid programs make their own decisions about
        anti-obesity drug coverage. KFF maintains a public tracker of
        which fee-for-service Medicaid programs cover GLP-1 drugs for
        obesity. As of KFF&apos;s 2024 reporting, approximately 13
        state Medicaid programs covered at least one GLP-1 drug for
        the obesity indication, and most of those imposed
        utilization controls including prior authorization and BMI
        thresholds <Cite n={8}/>. KFF also reported that nearly
        two-thirds of responding state programs cited cost as a
        factor in their coverage decision.
      </p>

      <p>
        All 50 state Medicaid programs cover Ozempic, Mounjaro, and
        Rybelsus for type 2 diabetes (subject to prior authorization
        and preferred drug list rules). The state-by-state divergence
        is entirely about the obesity indication.
      </p>

      <p>
        Because state coverage decisions can change with each
        legislative session or pharmacy bulletin, the only reliable
        way to confirm current coverage in a specific state is to
        check that state Medicaid program&apos;s preferred drug list
        and the most recent KFF tracker entry. We do not list
        individual state policies in this article because state
        decisions move faster than any static page can track
        accurately.
      </p>

      <h2>5. Commercial insurance: variable, employer-driven</h2>

      <p>
        Commercial coverage of GLP-1 anti-obesity drugs depends on
        the employer&apos;s plan design. The Mercer National Survey
        of Employer-Sponsored Health Plans 2024 (n=2,194 employers,
        fielded June through August 2024) reported that 44% of large
        employers (≥500 workers) covered GLP-1 drugs for obesity in
        2024, up from 41% in 2023. Among the largest employers (≥20,000
        workers), 64% covered GLP-1s for obesity, up from 56% in 2023
        <Cite n={10}/>. Mercer also reported that nearly all employers
        offering coverage applied prior authorization or other
        utilization management.
      </p>

      <p>
        The Mercer figures describe coverage by employer count weighted
        to the larger end of the market and should not be confused
        with KFF&apos;s separate Employer Health Benefits Survey,
        which uses a different sampling universe and reports lower
        prevalence in the broader firm population. When citing &ldquo;X%
        of employers cover GLP-1s,&rdquo; always check which survey, which
        firm-size cutoff, and which year.
      </p>

      <p>
        For commercial plans that do cover GLP-1s for chronic weight
        management, prior authorization criteria typically include a
        BMI threshold of 30 or higher (or 27 or higher with a
        weight-related comorbidity such as hypertension, dyslipidemia,
        type 2 diabetes, obstructive sleep apnea, or established
        cardiovascular disease), documentation of prior diet and
        exercise efforts, and a Letter of Medical Necessity from the
        prescriber. Specific criteria vary by plan and the only
        authoritative source for any patient is their own plan&apos;s
        coverage policy document.
      </p>

      <h3>The CVS Caremark template formulary change</h3>

      <p>
        Effective July 1, 2025, CVS Caremark removed Zepbound
        (tirzepatide) from its standard control, advanced control,
        and value template formularies, retaining Wegovy (semaglutide
        2.4 mg) as the preferred GLP-1 for chronic weight management
        on plans that use those templates <Cite n={11}/>. CVS Caremark
        framed the decision as a cost-management measure tied to its
        ability to negotiate net price on Wegovy. Patients on plans
        using a CVS Caremark template formulary who had previously
        been stable on Zepbound generally needed to switch to Wegovy
        or pursue a formulary exception based on documented
        intolerance or insufficient response to Wegovy. Note that not
        every CVS Caremark client uses the standard templates; some
        large employers maintain custom formularies that are not
        affected by the template change.
      </p>

      <h2>6. Tricare</h2>

      <p>
        Tricare Prime and Tricare Select beneficiaries (active duty
        and dependents) have access to GLP-1 weight management drugs
        through the Tricare Uniform Formulary, subject to the prior
        authorization criteria published by the Defense Health
        Agency. Tricare For Life beneficiaries are Medicare-eligible
        and their pharmacy coverage is delivered through Medicare
        Part D, which means the federal Part D weight-loss exclusion
        described above applies to them as well: Tricare For Life
        does not provide a separate weight-loss-drug benefit that
        bypasses the Medicare statute.
      </p>

      <p>
        Tricare prior-authorization criteria and uniform formulary
        status can change with each Pharmacy and Therapeutics
        Committee meeting. The authoritative source is the current
        Tricare Formulary Search tool and the corresponding DHA
        criteria document for each drug. We do not cite specific
        Tricare termination dates or formulary tier placements in
        this article unless they appear in a current DHA document.
      </p>

      <h2>7. Federal Employees Health Benefits (FEHB)</h2>

      <p>
        OPM Carrier Letter 2023-01 (&ldquo;Prevention and Treatment of
        Obesity&rdquo;) requires FEHB carriers to cover at least one
        anti-obesity drug from the GLP-1 class plus at least two
        additional oral anti-obesity drugs <Cite n={12}/>. That
        requirement establishes a coverage floor across all FEHB
        plans, but it does not set tier placement, copay levels,
        prior authorization criteria, or which specific GLP-1 each
        carrier chooses to cover. Those details vary carrier by
        carrier and plan year, and the only authoritative source for
        any specific FEHB plan is the plan&apos;s current Rate
        Information (RI) brochure for that plan year. Federal
        employees comparing plans during Open Season should pull each
        candidate plan&apos;s brochure and search it for &ldquo;Wegovy,&rdquo;
        &ldquo;Zepbound,&rdquo; &ldquo;Saxenda,&rdquo; &ldquo;semaglutide,&rdquo; and
        &ldquo;tirzepatide&rdquo; before deciding.
      </p>

      <h2>8. The Treat and Reduce Obesity Act (TROA)</h2>

      <p>
        The Treat and Reduce Obesity Act would amend the Medicare
        Part D statute to permit coverage of FDA-approved
        anti-obesity medications. TROA has been introduced in
        Congress repeatedly since 2012 and was reintroduced in the
        119th Congress as S.1973 (Senate) and H.R.4231 (House) in
        2025 <Cite n={13}/>. TROA has not been enacted into law in
        any Congress. Until and unless Congress passes TROA or a
        similar amendment, the Part D weight-loss exclusion at
        42 U.S.C. § 1395w-102(e)(2)(A) remains in effect.
      </p>

      <h2>9. How to find out what your specific plan covers</h2>

      <p>
        The fastest way to know what you are actually eligible for:
      </p>

      <ol>
        <li>
          <strong>Look up your plan&apos;s formulary.</strong> Every
          insurance plan publishes a drug formulary listing covered
          medications and their tier placement. Search for &ldquo;Wegovy,&rdquo;
          &ldquo;Zepbound,&rdquo; or &ldquo;Saxenda&rdquo; by name. If the drug
          is listed, the formulary will note prior authorization
          requirements and the tier copay.
        </li>
        <li>
          <strong>Call the member services number on your insurance
          card.</strong> Ask: &ldquo;Is Wegovy or Zepbound on my formulary
          for chronic weight management? What are the prior
          authorization criteria? What would my copay be?&rdquo;
        </li>
        <li>
          <strong>Talk to your prescriber.</strong> Many prescribers
          have benefits navigators or prior-authorization specialists
          who can submit the PA on your behalf.
        </li>
        <li>
          <strong>Use a manufacturer savings card if eligible.</strong>{" "}
          With commercial insurance and an approved PA, the Wegovy
          and Zepbound savings cards reduce patient cost
          substantially. Eligibility rules vary and Medicare/Medicaid
          beneficiaries are excluded by federal anti-kickback rules.
        </li>
      </ol>

      <h2>Important disclaimer</h2>

      <p>
        This article reflects the publicly available state of
        coverage as of the publication date based on the primary
        sources cited above. Insurance coverage changes frequently
        and the specific terms of any individual plan may differ from
        the general categories described here. Always verify coverage
        with your specific insurance plan&apos;s member services line
        and your prescriber before making decisions about your
        therapy. Weight Loss Rankings does not provide medical or
        financial advice.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For employer-by-employer coverage data on the large US
        employers we track, see our{" "}
        <Link href="/tools/insurance-employer-checker">
          insurance employer checker
        </Link>
        . For the cost comparison if you end up self-paying, see our{" "}
        <Link href="/tools/glp1-savings-calculator">
          GLP-1 savings calculator
        </Link>
        . For the FLOW kidney trial that opened the Ozempic CKD
        pathway, see our{" "}
        <Link href="/research/flow-trial-semaglutide-kidney-disease">
          FLOW trial deep-dive
        </Link>
        . For the broader insurer-by-insurer formulary picture, see
        our{" "}
        <Link href="/research/glp1-insurance-coverage-audit">
          GLP-1 coverage audit
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
