import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "how-to-get-glp1-prescription";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Pricing verified against the live manufacturer pages and our
// own pricing index as of 2026-04-07. The Wegovy NovoCare and
// Zepbound LillyDirect tiers are checked weekly by the editorial
// research subagent — see /research/glp1-pricing-index.

export default function HowToGetGlp1Article() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 1 Indications and Usage (BMI ≥ 30 or ≥ 27 with comorbidity).",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 1 Indications and Usage.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "NovoCare Pharmacy direct-pay program for Wegovy — patient-facing pricing tiers updated 2026.",
      source: "Novo Nordisk patient program",
      year: 2026,
      url: "https://www.novocare.com/wegovy.html",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "LillyDirect Self Pay Pharmacy Solutions for Zepbound — pricing tiers December 2025 update.",
      source: "Eli Lilly patient program",
      year: 2026,
      url: "https://lillydirect.lilly.com/pharmacy-solutions/zepbound",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) US Prescribing Information and Lilly Savings Card.",
      source: "FDA Approved Labeling + Lilly patient program",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
    },
    {
      authors: "US Food and Drug Administration.",
      title:
        "FDA's Concerns with Unapproved GLP-1 Drugs Used for Weight Loss — Consumer Update.",
      source: "FDA Drug Safety Communication",
      year: 2024,
      url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss",
    },
    {
      authors: "US Food and Drug Administration.",
      title:
        "Tirzepatide injection products: Resolution of shortage. FDA Drug Shortages.",
      source: "FDA Drug Shortages Database",
      year: 2025,
      url: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Tirzepatide+Injection",
    },
    {
      authors: "Pharmacy Compounding Accreditation Board.",
      title:
        "PCAB Accreditation Standards for Compounded Sterile and Nonsterile Preparations (USP 797 and 503A).",
      source: "PCAB / Accreditation Commission for Health Care",
      year: 2025,
      url: "https://www.achc.org/pcab/",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Most patients searching &ldquo;how to get semaglutide&rdquo;
        don&apos;t realize there are at least four legitimate paths
        to a GLP-1 prescription in the US in 2026 — each with
        different costs, different paperwork, and different waiting
        times. This is the buyer funnel: insurance, brand-name
        direct-pay, compounded telehealth, and the new oral Foundayo
        route. Plus the red flags that mean you&apos;re looking at an
        illegitimate seller, not a real pharmacy.
      </p>

      <h2>Step 1: Are you eligible at all?</h2>
      <p>
        The FDA-approved indication for chronic weight management with
        Wegovy<Cite n={1} /> and Zepbound<Cite n={2} /> is identical:
      </p>
      <ul>
        <li>
          <strong>Adults with BMI ≥ 30</strong> (any class of obesity), OR
        </li>
        <li>
          <strong>Adults with BMI ≥ 27</strong> AND at least one
          weight-related comorbidity such as type 2 diabetes,
          hypertension, dyslipidemia, sleep apnea, or established
          cardiovascular disease.
        </li>
      </ul>
      <p>
        If you&apos;re below BMI 27, the FDA-approved labeling
        doesn&apos;t cover you, and most insurance and brand-name
        direct-pay programs will not cover you either. You can
        check your eligibility in two minutes with our{" "}
        <Link href="/tools/glp1-bmi-calculator">BMI calculator</Link>.
        Off-label prescribing exists but is rare for weight management
        at lower BMIs.
      </p>

      <h2>Path 1 — Through insurance</h2>
      <p>
        The cheapest path if it works, and the most paperwork-heavy.
      </p>

      <h3>1a. Check if your plan covers GLP-1s for weight management</h3>
      <p>
        Most commercial insurance plans cover GLP-1s for type 2
        diabetes (Ozempic, Mounjaro). Far fewer cover them for weight
        management (Wegovy, Zepbound). Coverage varies by employer,
        not just by carrier — Aetna at one employer might cover
        Wegovy with prior authorization while Aetna at a different
        employer carves it out completely. The fastest way to find
        out is:
      </p>
      <ul>
        <li>
          Use our{" "}
          <Link href="/tools/insurance-employer-checker">
            insurance employer checker
          </Link>{" "}
          to see what 30 large US employers cover.
        </li>
        <li>
          Call the member-services number on the back of your
          insurance card and ask specifically: &ldquo;Is Wegovy on
          my formulary for weight management? What about Zepbound?
          Is prior authorization required? What is my copay at each
          tier?&rdquo;
        </li>
        <li>
          Check our{" "}
          <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
            insurance coverage 2026 article
          </Link>{" "}
          for the Medicare, Medicaid, and commercial landscape.
        </li>
      </ul>

      <h3>1b. Get a prescriber to write the prescription</h3>
      <p>
        You need either a PCP, an obesity-medicine physician, or an
        endocrinologist who is willing to prescribe a GLP-1 for
        weight management. Bring documented BMI from a clinical
        visit (not self-reported) and any comorbidity diagnoses
        (lab values for diabetes or pre-diabetes, blood pressure
        readings for hypertension, sleep study results for OSA).
      </p>

      <h3>1c. Survive prior authorization</h3>
      <p>
        Almost all insurance approvals for weight-management GLP-1s
        require a prior authorization (PA) form. The PA typically
        asks for:
      </p>
      <ul>
        <li>
          Documented BMI ≥ 30 (or ≥ 27 with a specific
          comorbidity)
        </li>
        <li>
          Documentation of a previous lifestyle program (diet,
          exercise, often a specific commercial program like
          Weight Watchers, Noom, or a hospital-based program)
        </li>
        <li>
          Often a previous medication trial (Qsymia, Contrave,
          phentermine — &ldquo;step therapy&rdquo;)
        </li>
        <li>
          Sometimes a sleep study or other comorbidity workup
        </li>
      </ul>
      <p>
        The PA process typically takes 3-14 days. Denials are
        common; most can be appealed successfully if your prescriber
        provides additional clinical documentation.
      </p>
      <p>
        <strong>Realistic out-of-pocket on insurance:</strong> if
        your plan covers the drug at the brand tier, copays range
        from $25-$100/month for most commercial plans. If you have
        a high-deductible plan, you may pay full retail until you
        meet the deductible.
      </p>

      <h2>Path 2 — Brand-name direct-pay (no insurance, no PA)</h2>
      <p>
        Both Novo Nordisk and Eli Lilly run patient-direct cash-pay
        programs that bypass insurance and PBM step therapy
        entirely. This is the path most patients take when their
        insurance doesn&apos;t cover weight-management GLP-1s.
      </p>

      <h3>2a. Wegovy NovoCare<Cite n={3} /></h3>
      <ul>
        <li>
          <strong>$499/month</strong> for the standard pen (any
          dose strength). Available to anyone in the US with a
          valid prescription, no insurance required.
        </li>
        <li>
          <strong>$199/month</strong> for the &ldquo;all dose
          strengths&rdquo; subscription if you&apos;re paying out
          of pocket and not using insurance. Includes free shipping.
        </li>
        <li>
          You still need a prescription from a US-licensed prescriber.
          NovoCare does not include the prescriber visit.
        </li>
      </ul>

      <h3>2b. Zepbound LillyDirect<Cite n={4} /></h3>
      <p>
        Lilly cut LillyDirect Zepbound prices on December 1, 2025.
        Current self-pay tiers:
      </p>
      <ul>
        <li>
          <strong>$299/month</strong> for the 2.5 mg starter dose
        </li>
        <li>
          <strong>$399/month</strong> for the 5 mg dose
        </li>
        <li>
          <strong>$449/month</strong> for the 7.5 mg and higher
          doses
        </li>
        <li>
          Available to any US patient with a valid prescription.
          LillyDirect ships to all 50 states.
        </li>
      </ul>

      <h3>2c. Foundayo (oral) — the new option<Cite n={5} /></h3>
      <p>
        Foundayo (orforglipron) is the first non-peptide oral GLP-1,
        FDA-approved April 1, 2026. Lilly is positioning it
        aggressively against the injectables on price:
      </p>
      <ul>
        <li>
          <strong>$25/month with the Lilly Savings Card</strong>{" "}
          for commercially insured patients (not Medicare or
          Medicaid)
        </li>
        <li>
          <strong>$149/month list price</strong> for cash-pay
          patients without insurance
        </li>
        <li>
          Pill, taken daily — no injection, no refrigeration
        </li>
        <li>
          The FDA-approved labeled maintenance dose (17.2 mg)
          produced 11.1% mean weight loss in adults without type 2
          diabetes at 72 weeks per the Foundayo prescribing
          information (less than Wegovy and Zepbound, but real)
        </li>
      </ul>
      <p>
        Foundayo is the cheapest legal path to a brand-name GLP-1 in
        2026 if you have commercial insurance. See our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo approval deep-dive
        </Link>{" "}
        for the full clinical context.
      </p>

      <h2>Path 3 — Compounded telehealth</h2>
      <p>
        Compounded semaglutide and tirzepatide are made by 503A
        compounding pharmacies, not by Novo Nordisk or Lilly. They
        are typically prescribed and dispensed through telehealth
        platforms that bundle the prescriber visit, the medication,
        and the shipping into a single subscription.
      </p>

      <h3>3a. Pricing range</h3>
      <ul>
        <li>
          <strong>$150-$250/month</strong> for compounded semaglutide
          at most reputable telehealth platforms (Hims, Henry Meds,
          Mochi Health, EmpowerRX, etc.)
        </li>
        <li>
          <strong>$250-$400/month</strong> for compounded tirzepatide
        </li>
        <li>
          See our live{" "}
          <Link href="/research/glp1-pricing-index">
            compounded pricing index
          </Link>{" "}
          for the median, p10, and p90 across the entire telehealth
          market.
        </li>
      </ul>

      <h3>3b. The shortage status caveat</h3>
      <p>
        Compounded GLP-1s exist legally because of FDA drug
        shortage rules under section 503A of the Federal Food, Drug,
        and Cosmetic Act. Tirzepatide came off the FDA shortage list
        in October 2024<Cite n={7} />, and semaglutide came off in
        early 2025. Compounding remains legal under the
        &ldquo;clinical difference&rdquo; provision (different
        dose, different concentration, different delivery), but
        FDA has issued multiple warning letters to compounders and
        marketers — see our{" "}
        <Link href="/research/fda-warning-letters-glp1">
          FDA warning letters tracker
        </Link>
        .
      </p>

      <h3>3c. How to vet a compounded telehealth provider</h3>
      <ul>
        <li>
          <strong>PCAB accreditation</strong> on the dispensing
          pharmacy<Cite n={8} /> — this is the gold standard for
          compounding quality.
        </li>
        <li>
          <strong>Pharmacy state license</strong> — every legitimate
          compounder is registered with at least one US state board
          of pharmacy. The license number should be visible on the
          provider&apos;s site or available on request.
        </li>
        <li>
          <strong>Real prescriber visit</strong> — a video visit or
          a structured intake reviewed by a physician, NP, or PA
          licensed in your state. If the provider just asks you to
          tick boxes on a form and ships the drug, that&apos;s a red
          flag.
        </li>
        <li>
          See our{" "}
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          for our full vetting framework.
        </li>
      </ul>

      <h2>Path 4 — &ldquo;Research peptides&rdquo; and grey-market sellers (DON&apos;T)</h2>
      <p>
        There is a large grey market of websites selling &ldquo;research
        peptide&rdquo; semaglutide and tirzepatide — vials labeled
        &ldquo;not for human consumption&rdquo; that are obviously
        marketed to humans. These are not legal pharmacies, are not
        regulated by the FDA, and have been the source of multiple
        contamination, dose-error, and counterfeit incidents.
      </p>
      <p>
        The FDA has issued specific consumer warnings about
        unapproved GLP-1 products<Cite n={6} />. Red flags:
      </p>
      <ul>
        <li>
          No prescription required, no prescriber visit
        </li>
        <li>
          No state pharmacy license listed
        </li>
        <li>
          Vials labeled &ldquo;for research use only&rdquo; or
          &ldquo;not for human consumption&rdquo;
        </li>
        <li>
          Prices significantly below the legitimate compounded
          range (e.g., &lt;$50/month for tirzepatide)
        </li>
        <li>
          Payment in cryptocurrency only
        </li>
        <li>
          Shipping from outside the US
        </li>
        <li>
          No US business address or customer service phone number
        </li>
      </ul>
      <p>
        The risks include incorrect dosing, contamination,
        counterfeit material with no active drug, and the lack of
        any recourse if something goes wrong. Don&apos;t do it.
      </p>

      <h2>Decision tree — which path probably fits you</h2>
      <ul>
        <li>
          <strong>
            You have commercial insurance and your plan covers
            weight-management GLP-1s
          </strong>{" "}
          → Path 1 (insurance). $25-$100/mo copay if approved.
        </li>
        <li>
          <strong>
            You have commercial insurance but your plan does NOT
            cover weight management
          </strong>{" "}
          → Path 2c (Foundayo $25/mo with savings card) is the
          cheapest. Path 2a/2b ($199-$499/mo) if you specifically
          want an injectable.
        </li>
        <li>
          <strong>You have no insurance at all</strong> → Path 3
          (compounded, $150-$400/mo) is usually the cheapest.
          Path 2 (NovoCare $199 or LillyDirect $299) is more
          expensive but is brand-name and avoids any compounding
          uncertainty.
        </li>
        <li>
          <strong>You have Medicare</strong> → coverage for weight
          management is limited; see our{" "}
          <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
            insurance coverage article
          </Link>{" "}
          for the current Medicare situation.
        </li>
        <li>
          <strong>You have Medicaid</strong> → coverage varies
          enormously by state; some states cover with PA, many do
          not.
        </li>
      </ul>

      <h2>What this article is NOT</h2>
      <p>
        This is a buyer&apos;s guide, not a recommendation to buy.
        Whether a GLP-1 is right for you depends on your medical
        history, your weight loss goals, your budget, and your
        tolerance for the GI side effects covered in our{" "}
        <Link href="/research/glp1-side-effect-questions-answered">
          side effect Q&amp;A
        </Link>{" "}
        and{" "}
        <Link href="/research/glp1-nausea-management-practical-guide">
          nausea management guide
        </Link>
        . Discuss the decision with a prescribing clinician who
        knows your medical history before you start.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Four legitimate paths in 2026: insurance, brand-name
          direct-pay (NovoCare/LillyDirect/Foundayo savings card),
          compounded telehealth, and Medicaid/Medicare.
        </li>
        <li>
          Cheapest if commercially insured: Foundayo $25/mo with
          savings card.
        </li>
        <li>
          Cheapest if uninsured: compounded telehealth $150-$400/mo
          OR Wegovy NovoCare at $199/mo for the all-dose
          subscription.
        </li>
        <li>
          You need a real prescriber, real BMI documentation, and a
          willingness to push back on insurance denials.
        </li>
        <li>
          Don&apos;t buy &ldquo;research peptides&rdquo; from
          unlicensed grey-market sellers — they are not legal
          pharmacies and have caused real patient harm.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/tools/glp1-savings-calculator">
            GLP-1 savings calculator 2026
          </Link>{" "}
          — compare 10 different access paths over 1, 5, and 10
          years
        </li>
        <li>
          <Link href="/tools/glp1-bmi-calculator">
            GLP-1 BMI calculator
          </Link>{" "}
          — check FDA eligibility in 30 seconds
        </li>
        <li>
          <Link href="/tools/insurance-employer-checker">
            Insurance employer checker
          </Link>{" "}
          — coverage at 30 large US employers
        </li>
        <li>
          <Link href="/research/glp1-pricing-index">
            GLP-1 compounded pricing index 2026
          </Link>{" "}
          — live median, p10, and p90 across the telehealth market
        </li>
        <li>
          <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
            Insurance coverage 2026: Medicare, Medicaid, commercial
          </Link>
        </li>
        <li>
          <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
            Wegovy pen vs compounded vial — practical differences
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice or a
        recommendation to use any particular drug, pharmacy, or
        program. Pricing is current as of April 2026 and is updated
        as the manufacturer programs change. Discuss any decision to
        start a GLP-1 with a prescribing clinician who knows your
        full medical history.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
