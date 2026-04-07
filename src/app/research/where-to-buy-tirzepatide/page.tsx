import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "where-to-buy-tirzepatide";

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

// Pricing verified directly from FDA labels, LillyDirect, and our
// 80-provider compounded pricing dataset on 2026-04-07. Editorial
// cadence: this list is reviewed monthly and refreshed whenever
// LillyDirect or major telehealth platforms change their cash-pay
// tiers.

export default function WhereToBuyTirzepatideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/217806s003lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "MOUNJARO (tirzepatide) injection — US Prescribing Information (type 2 diabetes only).",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215866s015lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "LillyDirect Self Pay Pharmacy Solutions for Zepbound — single-dose vial direct-pay channel.",
      source: "Eli Lilly patient program",
      year: 2026,
      url: "https://lillydirect.lilly.com/pharmacy-solutions/zepbound",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Tirzepatide Injection — Resolved Drug Shortage (resolved December 19, 2024).",
      source: "FDA Drug Shortages Database",
      year: 2024,
      url: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Tirzepatide+Injection",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA's Concerns with Unapproved GLP-1 Drugs Used for Weight Loss — consumer Q&A on compounding.",
      source: "FDA.gov",
      year: 2025,
      url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss",
    },
    {
      authors: "Weight Loss Rankings editorial.",
      title:
        "PCAB accreditation and the compounding pharmacy quality investigation.",
      source: "Weight Loss Rankings research",
      year: 2026,
      url: "https://www.weightlossrankings.com/research/pcab-accreditation-compounding-pharmacy-investigation",
    },
  ];

  const faqs = [
    {
      question: "Is Mounjaro approved for weight loss?",
      answer:
        "No. Mounjaro is FDA-approved only for type 2 diabetes. Zepbound is the FDA-approved tirzepatide product for chronic weight management. A clinician can prescribe Mounjaro off-label for weight loss, but most commercial insurers will not cover it without a diabetes diagnosis.",
    },
    {
      question: "Is compounded tirzepatide still legal in 2026?",
      answer:
        "Yes, with limits. After the FDA declared the tirzepatide shortage resolved on December 19, 2024, 503B outsourcing facilities can no longer mass-compound tirzepatide. 503A pharmacies can still compound tirzepatide for an individual patient when a prescriber documents a clinical need. Most telehealth platforms continue to operate through this 503A pathway.",
    },
    {
      question: "What is the cheapest legal way to get Zepbound?",
      answer:
        "For commercially insured patients with Zepbound on formulary, the Lilly savings card combined with insurance coverage is usually the cheapest path. Without insurance, LillyDirect single-dose vials at $399-$499/month are the cheapest brand-name option. Compounded tirzepatide via 503A telehealth is typically $149-$349/month.",
    },
    {
      question: "How much does Zepbound cost at a regular pharmacy?",
      answer:
        "List price for the Zepbound autoinjector pen at retail pharmacies is roughly $1,000-$1,300/month depending on the dose. The single-dose vial program through LillyDirect is significantly cheaper at $399-$499/month for cash-paying patients without insurance coverage.",
    },
    {
      question: "Does Medicare cover Zepbound?",
      answer:
        "Medicare Part D historically did not cover weight-loss medications. CMS expanded coverage in March 2024 to allow Wegovy for patients with established cardiovascular disease, but Zepbound coverage under Medicare remains limited as of 2026. Medicaid coverage varies by state.",
    },
    {
      question: "How do I know if a compounded tirzepatide pharmacy is legitimate?",
      answer:
        "Look for PCAB accreditation through the Accreditation Commission for Health Care, verify the pharmacy is licensed in your state through your state board of pharmacy, and confirm it operates as a 503A compounding pharmacy with a valid patient-specific prescription. Avoid any seller offering tirzepatide without a prescription or shipping from outside the US.",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Tirzepatide is sold in the United States under two brand
        names — <strong>Zepbound</strong> (FDA-approved for chronic
        weight management)<Cite n={1} /> and <strong>Mounjaro</strong>{" "}
        (FDA-approved for type 2 diabetes only)<Cite n={2} />. It is
        also still legally available as a 503A compounded
        injectable through telehealth platforms, even though the
        FDA declared the tirzepatide shortage resolved in December
        2024<Cite n={4} />. This article walks through every
        legitimate US channel a patient can use to buy tirzepatide
        in 2026, with verified pricing from FDA labels, the
        LillyDirect patient site, and our live 80-provider
        compounded pricing dataset.
      </p>

      <h2>The four legal ways to buy tirzepatide in 2026</h2>
      <p>
        There are exactly four legitimate channels. Anything outside
        these — research peptides, gray-market vials shipped from
        overseas, sellers operating without a prescription — is
        either illegal, unsafe, or both. Stick to one of the
        following.
      </p>

      <h3>1. Brand Zepbound via LillyDirect single-dose vials (the cheapest brand path)<Cite n={3} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> Eli Lilly&apos;s own
          self-pay pharmacy channel selling Zepbound as
          single-dose vials (rather than the autoinjector pen).
          Launched in August 2024 to give cash-paying patients a
          dramatically cheaper brand-name option during and after
          the tirzepatide shortage.
        </li>
        <li>
          <strong>How to get it:</strong> Get a Zepbound
          prescription from any licensed US prescriber. LillyDirect
          does not write the prescription itself — you bring your
          own prescriber, then fill the prescription through
          LillyDirect Pharmacy.
        </li>
        <li>
          <strong>Cash price:</strong>{" "}
          <strong>$399/month for the 2.5 mg starter vial</strong>{" "}
          and <strong>$499/month for the 5 mg, 7.5 mg, 10 mg, 12.5
          mg, and 15 mg single-dose vials</strong>. That is roughly
          a 60% discount versus retail pen pricing.
        </li>
        <li>
          <strong>Format:</strong> Single-dose vials, drawn up with
          a syringe. This is a different physical product from the
          autoinjector pen most patients picture when they think of
          Zepbound, even though the active ingredient and labeled
          dose are the same.
        </li>
        <li>
          <strong>Eligibility:</strong> Cash-paying US patients
          only. Patients with insurance that covers Zepbound are
          routed to the standard pharmacy benefit instead.
        </li>
        <li>
          <strong>Shipping:</strong> Direct to patient, all 50
          states.
        </li>
      </ul>

      <h3>2. Brand Zepbound autoinjector pen via retail pharmacy<Cite n={1} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> The standard Zepbound
          autoinjector pen, filled at a normal retail pharmacy
          (CVS, Walgreens, Walmart, Costco, grocery store
          pharmacies, Amazon Pharmacy) and run through your
          commercial insurance.
        </li>
        <li>
          <strong>How to get it:</strong> See your PCP or a
          telehealth clinician. Zepbound is FDA-approved for
          patients with BMI ≥30, or BMI ≥27 with at least one
          weight-related comorbidity (hypertension, type 2
          diabetes, dyslipidemia, obstructive sleep apnea).
        </li>
        <li>
          <strong>Cash price without insurance:</strong> Roughly
          $1,000-$1,300/month for the pen at the major retail
          pharmacies, depending on dose.
        </li>
        <li>
          <strong>Insured copay:</strong> Highly variable. With a
          covered formulary plan plus the Lilly savings card,
          commercially insured patients can sometimes pay as little
          as $25/month. Without coverage, the savings card alone
          caps the cash-equivalent price at a higher tier.
        </li>
      </ul>

      <h3>3. Brand Mounjaro via retail pharmacy (diabetes only)<Cite n={2} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> The same active ingredient
          (tirzepatide) sold under a different brand name and
          FDA-approved only for type 2 diabetes. Mounjaro is{" "}
          <strong>not</strong> FDA-approved for weight loss; using
          it for weight loss is off-label.
        </li>
        <li>
          <strong>How to get it:</strong> Requires a documented
          type 2 diabetes diagnosis to get insurance coverage. A
          clinician can prescribe it off-label for weight loss, but
          most commercial insurers will not cover Mounjaro without
          the diabetes diagnosis.
        </li>
        <li>
          <strong>Cash price without insurance:</strong> Roughly
          the same as Zepbound at retail — $1,000-$1,300/month for
          the pen.
        </li>
        <li>
          <strong>When this matters:</strong> If you have type 2
          diabetes, Mounjaro is the on-label tirzepatide product
          and is more likely to be covered by your insurance than
          Zepbound. If you do not have type 2 diabetes, Zepbound is
          the correct product.
        </li>
      </ul>

      <h3>4. Compounded tirzepatide via 503A telehealth pharmacy<Cite n={5} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> A compounded preparation of
          tirzepatide prepared by a state-licensed 503A compounding
          pharmacy on a patient-specific prescription. This is the
          channel that dominated the telehealth market during the
          2022-2024 tirzepatide shortage.
        </li>
        <li>
          <strong>Legal status in 2026:</strong> The FDA declared
          the tirzepatide shortage resolved on December 19, 2024
          <Cite n={4} />. After resolution, 503B outsourcing
          facilities can no longer mass-compound tirzepatide. 503A
          pharmacies can still compound tirzepatide for an
          individual patient when a prescriber documents a clinical
          need (e.g., a different dose, an allergy to an excipient,
          a non-commercial formulation). Most telehealth platforms
          continue to operate through this 503A pathway.
        </li>
        <li>
          <strong>Cash price:</strong> Typically{" "}
          <strong>$149-$349/month</strong> across the 80+ telehealth
          providers in our dataset, depending on the provider, the
          dose, and any first-month promotional pricing. Our{" "}
          <Link href="/research/glp1-pricing-index">
            GLP-1 Compounded Pricing Index
          </Link>{" "}
          tracks the median, 10th percentile, and 90th percentile
          prices live as our dataset updates.
        </li>
        <li>
          <strong>How to verify a provider:</strong> Look for PCAB
          accreditation, state board of pharmacy licensure in your
          state, and a real US-based clinician consult. See our{" "}
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          for the full vetting framework.
        </li>
        <li>
          <strong>What to avoid:</strong> Any seller offering
          tirzepatide without a prescription, any product shipped
          from outside the US, anything sold as &quot;research
          peptide&quot; or &quot;not for human use,&quot; and any
          pharmacy that cannot show you a state license.
        </li>
      </ul>

      <h2>Which channel is cheapest?</h2>
      <p>
        Like semaglutide, the cheapest path depends on your
        insurance status and which form of tirzepatide you are
        willing to take. Here is the rough hierarchy in 2026:
      </p>
      <ol>
        <li>
          <strong>Insurance + Lilly savings card</strong> — often
          $25/month if your plan covers Zepbound and you qualify
          for the manufacturer copay card. This is the cheapest
          path when it works.
        </li>
        <li>
          <strong>Compounded tirzepatide via 503A telehealth</strong>{" "}
          — $149-$349/month with no insurance required. The
          cheapest path for cash-pay patients, but you are getting
          a compounded preparation, not the brand-name FDA-approved
          product.
        </li>
        <li>
          <strong>LillyDirect single-dose Zepbound vials</strong>{" "}
          — $399/month for the 2.5 mg starter and $499/month for
          the higher doses. The cheapest path to brand-name
          tirzepatide for cash-pay patients.
        </li>
        <li>
          <strong>Retail pharmacy cash pay (pen)</strong> —
          $1,000-$1,300/month. Generally the most expensive option
          and rarely the right choice when LillyDirect single-dose
          vials exist.
        </li>
      </ol>
      <p>
        For a side-by-side cost comparison across the entire
        provider universe, see our{" "}
        <Link href="/best/cheapest-tirzepatide">
          cheapest tirzepatide providers
        </Link>{" "}
        listicle. For the full ranked directory of every telehealth
        platform offering tirzepatide, see{" "}
        <Link href="/best/tirzepatide-providers">
          best tirzepatide providers
        </Link>
        .
      </p>

      <h2>Zepbound vs Mounjaro: which one do you actually want?</h2>
      <p>
        Zepbound and Mounjaro are the same molecule (tirzepatide)
        in the same delivery format (autoinjector pen), at the same
        labeled doses (2.5, 5, 7.5, 10, 12.5, and 15 mg). They are
        manufactured by the same company (Eli Lilly) on the same
        production lines. The difference is the FDA label:
      </p>
      <ul>
        <li>
          <strong>Zepbound</strong> — FDA-approved for chronic
          weight management in adults with obesity (BMI ≥30) or
          overweight (BMI ≥27) with at least one weight-related
          comorbidity. Also FDA-approved for moderate to severe
          obstructive sleep apnea in adults with obesity. This is
          the correct product if your indication is weight loss.
        </li>
        <li>
          <strong>Mounjaro</strong> — FDA-approved only for type 2
          diabetes as an adjunct to diet and exercise. Not approved
          for weight loss. If you have type 2 diabetes, Mounjaro is
          the on-label product and is more likely to be covered by
          your insurance.
        </li>
      </ul>
      <p>
        For a deeper comparison of both brands plus a head-to-head
        with Wegovy, see our{" "}
        <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
          Foundayo vs Wegovy vs Zepbound comparison
        </Link>
        .
      </p>

      <h2>How the dispensing chain actually works</h2>
      <p>
        Tirzepatide reaches a US patient through one of three
        distinct supply chains:
      </p>
      <ul>
        <li>
          <strong>Brand Zepbound or Mounjaro</strong> — manufactured
          by Eli Lilly, distributed through standard pharmaceutical
          wholesalers, dispensed by retail and mail-order
          pharmacies. LillyDirect Pharmacy is Lilly&apos;s own
          direct-to-patient channel using the same brand-name drug
          (with the single-dose vial as a separate, cheaper SKU).
        </li>
        <li>
          <strong>Compounded tirzepatide</strong> — tirzepatide API
          sourced from FDA-registered API suppliers, prepared into
          a multi-dose vial by a state-licensed 503A compounding
          pharmacy on a patient-specific prescription, dispensed
          directly to the patient. The clinician consult and the
          program wrap are provided by the telehealth platform on
          top of the pharmacy.
        </li>
        <li>
          <strong>Imported or research-grade peptides</strong> —
          neither legal nor safe. The FDA has issued multiple
          warnings about the unverified identity, purity, and
          sterility of tirzepatide products sourced outside the
          legitimate compounding pathway<Cite n={5} />. Avoid.
        </li>
      </ul>

      <h2>Where NOT to buy tirzepatide</h2>
      <ul>
        <li>
          Anywhere selling tirzepatide without a US prescription
        </li>
        <li>
          Any seller shipping from China, India, or Eastern Europe
        </li>
        <li>
          Any product labeled &quot;for research use only&quot; or
          &quot;not for human consumption&quot;
        </li>
        <li>
          Any peptide vendor not operating as a state-licensed
          pharmacy
        </li>
        <li>
          Any platform that does not require a real clinician
          consult
        </li>
        <li>
          Any &quot;wellness&quot; or &quot;biohacking&quot; site
          selling tirzepatide as a supplement
        </li>
      </ul>

      <h2>How to actually start</h2>
      <ol>
        <li>
          <strong>Check your insurance.</strong> Call the member
          services number on your insurance card and ask
          specifically: &quot;Is Zepbound on formulary? What is the
          prior authorization requirement? What is my copay?&quot;
          If your plan covers it, this is almost always the
          cheapest path.
        </li>
        <li>
          <strong>If insurance doesn&apos;t cover it,</strong>{" "}
          decide whether you want brand-name tirzepatide or a
          compounded preparation. Brand-name via LillyDirect
          single-dose vials is $399-$499/month. Compounded via 503A
          telehealth is $149-$349/month.
        </li>
        <li>
          <strong>Get a clinician consult.</strong> See our{" "}
          <Link href="/research/how-to-get-glp1-prescription">
            how to get a GLP-1 prescription
          </Link>{" "}
          guide for the full eligibility framework and the
          step-by-step path through PCP, telehealth, and obesity
          medicine specialists.
        </li>
        <li>
          <strong>Verify the pharmacy.</strong> If you go the
          compounded route, confirm PCAB accreditation and state
          board of pharmacy licensure before you pay anything. The
          telehealth platform should be transparent about which
          pharmacy fills the prescription.
        </li>
      </ol>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/best/tirzepatide-providers">
            Best tirzepatide providers
          </Link>{" "}
          — full ranked directory of every US telehealth platform
          offering tirzepatide
        </li>
        <li>
          <Link href="/best/cheapest-tirzepatide">
            Cheapest tirzepatide providers
          </Link>{" "}
          — sorted by lowest monthly cash price
        </li>
        <li>
          <Link href="/research/glp1-pricing-index">
            GLP-1 Compounded Pricing Index 2026
          </Link>{" "}
          — live median, p10, p90 pricing across 80+ providers
        </li>
        <li>
          <Link href="/research/compounded-glp1-price-movement-12-months">
            Compounded GLP-1 price movement (12 months)
          </Link>{" "}
          — how pricing has shifted post-shortage-resolution
        </li>
        <li>
          <Link href="/research/how-to-get-glp1-prescription">
            How to get a GLP-1 prescription in 2026
          </Link>{" "}
          — eligibility, consult paths, and the four-channel buyer
          funnel
        </li>
        <li>
          <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
            GLP-1 insurance coverage: Medicare, Medicaid, commercial
          </Link>{" "}
          — what each plan type actually covers
        </li>
        <li>
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          — how to vet a compounding pharmacy
        </li>
      </ul>

      <h2>Frequently asked questions</h2>

      <h3>Is Mounjaro approved for weight loss?</h3>
      <p>
        No. Mounjaro is FDA-approved only for type 2 diabetes
        <Cite n={2} />. Zepbound is the FDA-approved tirzepatide
        product for chronic weight management. A clinician can
        prescribe Mounjaro off-label for weight loss, but most
        commercial insurers will not cover it without a diabetes
        diagnosis.
      </p>

      <h3>Is compounded tirzepatide still legal in 2026?</h3>
      <p>
        Yes, with limits. After the FDA declared the tirzepatide
        shortage resolved on December 19, 2024<Cite n={4} />, 503B
        outsourcing facilities can no longer mass-compound
        tirzepatide. 503A pharmacies can still compound tirzepatide
        for an individual patient when a prescriber documents a
        clinical need. Most telehealth platforms continue to
        operate through this 503A pathway.
      </p>

      <h3>What is the cheapest legal way to get Zepbound?</h3>
      <p>
        For commercially insured patients with Zepbound on
        formulary, the Lilly savings card combined with insurance
        coverage is usually the cheapest path. Without insurance,
        LillyDirect single-dose vials at $399-$499/month
        <Cite n={3} /> are the cheapest brand-name option.
        Compounded tirzepatide via 503A telehealth is typically
        $149-$349/month.
      </p>

      <h3>How much does Zepbound cost at a regular pharmacy?</h3>
      <p>
        List price for the Zepbound autoinjector pen at retail
        pharmacies is roughly $1,000-$1,300/month depending on the
        dose. The single-dose vial program through LillyDirect is
        significantly cheaper at $399-$499/month for cash-paying
        patients without insurance coverage.
      </p>

      <h3>Does Medicare cover Zepbound?</h3>
      <p>
        Medicare Part D historically did not cover weight-loss
        medications. CMS expanded coverage in March 2024 to allow
        Wegovy for patients with established cardiovascular disease,
        but Zepbound coverage under Medicare remains limited as of
        2026. Medicaid coverage varies by state.
      </p>

      <h3>How do I know if a compounded tirzepatide pharmacy is legitimate?</h3>
      <p>
        Look for PCAB accreditation through the Accreditation
        Commission for Health Care, verify the pharmacy is licensed
        in your state through your state board of pharmacy, and
        confirm it operates as a 503A compounding pharmacy with a
        valid patient-specific prescription<Cite n={6} />. Avoid
        any seller offering tirzepatide without a prescription or
        shipping from outside the US.
      </p>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Pricing
        is verified directly from FDA labels, the LillyDirect
        patient site, and our 80-provider compounded pricing
        dataset on the publication date. Pricing and availability
        change frequently — verify directly with the provider
        before signing up. This is a YMYL article about a real
        prescription drug; clinical decisions should always involve
        your prescribing clinician. Weight Loss Rankings has no
        financial relationship with Eli Lilly or any of the
        providers referenced.
      </p>

      <References items={citations} />
      <FaqSchema items={faqs} />
    </ResearchArticleLayout>
  );
}
