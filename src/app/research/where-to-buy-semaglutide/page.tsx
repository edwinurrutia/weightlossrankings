import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "where-to-buy-semaglutide";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": `/research/${SLUG}`,
        es: `/es/research/ozempic-precio-costo-comprar`,
        "es-US": `/es/research/ozempic-precio-costo-comprar`,
        "x-default": `/research/${SLUG}`,
      },
    },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Pricing verified directly from FDA labels, NovoCare Pharmacy, and
// our 80-provider compounded pricing dataset on 2026-04-07. Editorial
// cadence: this list is reviewed monthly and refreshed whenever
// NovoCare or major telehealth platforms change their cash-pay tiers.

export default function WhereToBuySemaglutideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "NovoCare Pharmacy direct-to-patient cash pay program for Wegovy — Take a Wegovy Step savings offer (effective 11/17/2025 through 6/30/2026).",
      source: "NovoCare patient program",
      year: 2026,
      url: "https://www.novocare.com/patient/medicines/wegovy/savings-offer.html",
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
      authors: "U.S. Food and Drug Administration.",
      title:
        "Semaglutide Injection — Resolved Drug Shortage (resolved February 21, 2025).",
      source: "FDA Drug Shortages Database",
      year: 2025,
      url: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Semaglutide+Injection",
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
      question: "Is it legal to buy compounded semaglutide in 2026?",
      answer:
        "Yes, with limits. After the FDA declared the semaglutide shortage resolved on February 21, 2025, 503B outsourcing facilities can no longer mass-compound semaglutide. 503A pharmacies can still compound semaglutide for an individual patient when a prescriber documents a clinical need (such as an allergy or a dose not commercially available). Most telehealth platforms still operate through this 503A pathway.",
    },
    {
      question: "What is the cheapest legal way to get semaglutide?",
      answer:
        "For commercially insured patients, the Wegovy savings card combined with insurance coverage is usually the cheapest path. Without insurance, the current NovoCare Pharmacy Take a Wegovy Step promotion (effective 11/17/2025 through 6/30/2026) offers new self-pay patients $199/month for the first two fills of 0.25 mg and 0.5 mg starter doses and $349/month thereafter; the non-promotional baseline is $499/month for all doses. 503A compounded semaglutide via telehealth ranges from roughly $99 to $249/month depending on the provider and dose. Promotion subject to change — verify current pricing at NovoCare.",
    },
    {
      question: "Can I buy Ozempic for weight loss?",
      answer:
        "Ozempic is FDA-approved for type 2 diabetes, not for weight loss. A clinician can prescribe it off-label for weight loss, but most commercial insurers will not cover Ozempic without a diabetes diagnosis. Wegovy is the FDA-approved semaglutide product for chronic weight management.",
    },
    {
      question: "How much does Wegovy cost without insurance in 2026?",
      answer:
        "List price at retail pharmacies is roughly $1,350/month. Through Novo Nordisk's NovoCare Pharmacy direct-pay program, the current Take a Wegovy Step promotion (effective 11/17/2025 through 6/30/2026) offers new self-pay patients $199/month for the first two fills of the 0.25 mg and 0.5 mg starter doses and $349/month thereafter. The non-promotional baseline is $499/month for all doses. Compounded semaglutide via telehealth is typically $99-$249/month but is not the brand-name product. Promotion subject to change — verify current pricing at NovoCare.",
    },
    {
      question: "Does Medicare cover semaglutide?",
      answer:
        "Medicare Part D covers Ozempic for type 2 diabetes. Wegovy for weight loss has historically not been covered by Medicare for obesity alone, though coverage was expanded in March 2024 for patients with established cardiovascular disease and overweight/obesity. Medicaid coverage varies by state.",
    },
    {
      question: "How do I know if a compounded semaglutide pharmacy is legitimate?",
      answer:
        "Look for PCAB accreditation through the Accreditation Commission for Health Care, verify the pharmacy is licensed in your state through your state board of pharmacy, and confirm it operates as a 503A compounding pharmacy with a valid patient-specific prescription. Avoid any seller offering semaglutide without a prescription or shipping from outside the US.",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
<Link href="/drugs/semaglutide">Semaglutide</Link> is sold in the United States under three brand
        names — <Link href="/drugs/wegovy"><strong>Wegovy</strong></Link> (FDA-approved for chronic
        weight management)<Cite n={1} />, <Link href="/drugs/ozempic"><strong>Ozempic</strong></Link>{" "}
        (FDA-approved for type 2 diabetes)<Cite n={2} />, and{" "}
        <strong>Rybelsus</strong> (oral tablet for type 2 diabetes).
        It is also still legally available as a 503A compounded
        injectable through telehealth platforms, even though the FDA
        declared the semaglutide shortage resolved in early 2025
        <Cite n={5} />. This article walks through every legitimate
        US channel a patient can use to buy semaglutide in 2026,
        with verified pricing from FDA labels, the NovoCare patient
        site, and our live 80-provider compounded pricing dataset.
      </p>

      <h2>The four legal ways to buy semaglutide in 2026</h2>
      <p>
        There are exactly four legitimate channels. Anything outside
        these — research peptides, gray-market vials shipped from
        overseas, sellers operating without a prescription — is
        either illegal, unsafe, or both. Stick to one of the
        following.
      </p>

      <h3>1. Brand Wegovy or Ozempic via retail pharmacy with insurance<Cite n={1} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> A standard prescription for
          brand-name Wegovy or Ozempic, filled at a normal retail
          pharmacy (CVS, Walgreens, Walmart, Costco, grocery store
          pharmacies, Amazon Pharmacy) and run through your
          commercial insurance.
        </li>
        <li>
          <strong>How to get it:</strong> See your PCP or a
          telehealth clinician. Wegovy requires documentation of
          BMI ≥30, or BMI ≥27 with at least one weight-related
          comorbidity (hypertension, type 2 diabetes, dyslipidemia).
          Ozempic requires a documented type 2 diabetes diagnosis.
        </li>
        <li>
          <strong>Cash price without insurance:</strong> Roughly
          $1,000-$1,400/month at the major retail pharmacies for
          either Wegovy or Ozempic.
        </li>
        <li>
          <strong>Insured copay:</strong> Highly variable. With a
          covered formulary plan plus the Novo Nordisk savings
          card, commercially insured patients can sometimes pay as
          little as $0-$25/month. Without coverage, the savings
          card alone caps the price at a higher cash-equivalent
          tier.
        </li>
      </ul>

      <h3>2. NovoCare Pharmacy direct-pay (the manufacturer cash channel)<Cite n={3} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> Novo Nordisk&apos;s own
          self-pay pharmacy channel for cash-paying patients without
          insurance coverage for Wegovy. Launched in March 2025
          alongside the resolution of the semaglutide shortage.
        </li>
        <li>
          <strong>How to get it:</strong> Get a Wegovy prescription
          from any licensed US prescriber, then fill it through
          NovoCare Pharmacy directly. You bring your own
          prescription; NovoCare dispenses and ships.
        </li>
        <li>
          <strong>Cash price (current Take a Wegovy Step promotion,
          effective November 17, 2025 through June 30, 2026):</strong>{" "}
          new self-pay patients pay{" "}
          <strong>$199/month for the first two fills</strong> of the
          0.25 mg and 0.5 mg starter doses, then{" "}
          <strong>$349/month for all doses thereafter</strong> under
          the promotional tier. The{" "}
          <strong>non-promotional baseline is $499/month for all
          Wegovy doses</strong>, including the higher 1.7 mg and 2.4
          mg maintenance doses that are normally the most expensive
          at retail pharmacies. Even the $499 baseline is roughly a
          65% discount versus retail cash pay. Promotion is subject
          to change &mdash; verify current pricing directly at
          NovoCare before enrolling.
        </li>
        <li>
          <strong>Eligibility:</strong> Cash-paying US patients only.
          Patients with insurance that covers Wegovy are routed to
          the standard pharmacy benefit instead.
        </li>
        <li>
          <strong>Shipping:</strong> Direct to patient, all 50
          states.
        </li>
      </ul>

      <h3>3. Compounded semaglutide via 503A telehealth pharmacy<Cite n={4} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> A compounded preparation of
          semaglutide (typically as semaglutide sodium or
          semaglutide acetate, in a multi-dose vial) prepared by a
          state-licensed 503A compounding pharmacy on a
          patient-specific prescription. This is the channel that
          dominated the telehealth market during the 2022-2025
          semaglutide shortage.
        </li>
        <li>
          <strong>Legal status in 2026:</strong> The FDA declared
          the semaglutide injection shortage resolved on February
          21, 2025<Cite n={5} />. After resolution, 503B outsourcing
          facilities can no longer mass-compound semaglutide. 503A
          pharmacies can still compound semaglutide for an
          individual patient when a prescriber documents a clinical
          need (e.g., a different dose, an allergy to an excipient,
          a non-commercial formulation). Most telehealth platforms
          continue to operate through this 503A pathway.
        </li>
        <li>
          <strong>Cash price:</strong> Typically{" "}
          <strong>$99-$249/month</strong> across the 80+ telehealth
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
          semaglutide without a prescription, any product shipped
          from outside the US, anything sold as &quot;research
          peptide&quot; or &quot;not for human use,&quot; and any
          pharmacy that cannot show you a state license.
        </li>
      </ul>

      <h3>4. The insurance prior-authorization path</h3>
      <ul>
        <li>
          <strong>What it is:</strong> The traditional pharmacy
          benefit path, where your commercial insurance covers
          Wegovy on formulary subject to prior authorization (PA)
          and step therapy requirements.
        </li>
        <li>
          <strong>How it works:</strong> Your prescriber submits a
          PA documenting BMI, comorbidities, and prior weight-loss
          attempts. If approved, you pay a standard tier copay
          (often $25-$100/month depending on the plan).
        </li>
        <li>
          <strong>Reality check:</strong> Most commercial plans now
          cover Wegovy on formulary, but coverage for obesity
          medications is still inconsistent. Medicare historically
          excluded weight-loss drugs entirely; in March 2024 CMS
          allowed Part D coverage of Wegovy for patients with
          established cardiovascular disease who are also
          overweight or obese. State Medicaid coverage varies. Our{" "}
          <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
            GLP-1 insurance coverage research
          </Link>{" "}
          breaks down which plans cover what.
        </li>
      </ul>

      <h2>Which channel is cheapest?</h2>
      <p>
        The honest answer depends on your insurance status and
        which form of semaglutide you are willing to take. Here is
        the rough hierarchy in 2026:
      </p>
      <ol>
        <li>
          <strong>Insurance + Wegovy savings card</strong> — often
          $0-$25/month if your plan covers Wegovy and you qualify
          for the manufacturer copay card. This is the cheapest path
          when it works.
        </li>
        <li>
          <strong>Compounded semaglutide via 503A telehealth</strong>{" "}
          — $99-$249/month with no insurance required. The cheapest
          path for cash-pay patients, but you are getting a
          compounded preparation, not the brand-name FDA-approved
          product.
        </li>
        <li>
          <strong>NovoCare Pharmacy direct-pay</strong> — currently
          $199/month for the first two starter-dose fills and
          $349/month thereafter for new self-pay patients under the
          Take a Wegovy Step promotion (effective 11/17/2025 through
          6/30/2026); the non-promotional baseline is $499/month for
          all doses. The cheapest path to brand-name semaglutide for
          cash-pay patients. Verify current pricing directly at
          NovoCare.
        </li>
        <li>
          <strong>Retail pharmacy cash pay</strong> — $1,000-$1,400/
          month. Generally the most expensive option and rarely the
          right choice when NovoCare exists.
        </li>
      </ol>
      <p>
        For a side-by-side cost comparison across the entire
        provider universe, see our{" "}
        <Link href="/best/cheapest-semaglutide">
          cheapest semaglutide providers
        </Link>{" "}
        listicle and the{" "}
        <Link href="/research/cheapest-compounded-semaglutide">
          cheapest compounded semaglutide research
        </Link>
        . For the full ranked directory of every telehealth platform
        offering semaglutide, see{" "}
        <Link href="/best/semaglutide-providers">
          best semaglutide providers
        </Link>
        .
      </p>

      <h2>How the dispensing chain actually works</h2>
      <p>
        Semaglutide reaches a US patient through one of three
        distinct supply chains, and it&apos;s worth understanding
        which one you&apos;re using:
      </p>
      <ul>
        <li>
          <strong>Brand Wegovy or Ozempic</strong> — manufactured by
          Novo Nordisk, distributed through standard pharmaceutical
          wholesalers, dispensed by retail and mail-order
          pharmacies. NovoCare Pharmacy is Novo Nordisk&apos;s own
          direct-to-patient channel using the same brand-name drug.
        </li>
        <li>
          <strong>Compounded semaglutide</strong> — semaglutide API
          (active pharmaceutical ingredient) sourced from FDA-
          registered API suppliers, prepared into a multi-dose vial
          by a state-licensed 503A compounding pharmacy on a
          patient-specific prescription, dispensed directly to the
          patient. The clinician consult and the program wrap are
          provided by the telehealth platform on top of the
          pharmacy.
        </li>
        <li>
          <strong>Imported or research-grade peptides</strong> —
          neither legal nor safe. The FDA has issued multiple
          warnings about the unverified identity, purity, and
          sterility of semaglutide products sourced outside the
          legitimate compounding pathway<Cite n={4} />. Avoid.
        </li>
      </ul>

      <h2>Where NOT to buy semaglutide</h2>
      <ul>
        <li>
          Anywhere selling semaglutide without a US prescription
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
          consult (a quick form does not count as a medical visit)
        </li>
        <li>
          Any &quot;wellness&quot; or &quot;biohacking&quot; site
          selling semaglutide as a supplement
        </li>
      </ul>

      <h2>How to actually start</h2>
      <ol>
        <li>
          <strong>Check your insurance.</strong> Call the member
          services number on your insurance card and ask
          specifically: &quot;Is Wegovy on formulary? What is the
          prior authorization requirement? What is my copay?&quot;
          If your plan covers it, this is almost always the cheapest
          path.
        </li>
        <li>
          <strong>If insurance doesn&apos;t cover it,</strong>{" "}
          decide whether you want brand-name semaglutide or a
          compounded preparation. Brand-name via NovoCare currently
          runs $199/month for the first two starter-dose fills and
          $349/month thereafter under the Take a Wegovy Step
          promotion through 6/30/2026, with a $499/month
          non-promotional baseline for all doses. Compounded via
          503A telehealth is $99-$249/month.
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
          <Link href="/best/semaglutide-providers">
            Best semaglutide providers
          </Link>{" "}
          — full ranked directory of every US telehealth platform
          offering semaglutide
        </li>
        <li>
          <Link href="/best/cheapest-semaglutide">
            Cheapest semaglutide providers
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
          <Link href="/research/cheapest-compounded-semaglutide">
            Cheapest compounded semaglutide research
          </Link>{" "}
          — methodology behind the cheapest-tier rankings
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

      <h3>Is it legal to buy compounded semaglutide in 2026?</h3>
      <p>
        Yes, with limits. After the FDA declared the semaglutide
        shortage resolved on February 21, 2025<Cite n={5} />, 503B
        outsourcing facilities can no longer mass-compound
        semaglutide. 503A pharmacies can still compound semaglutide
        for an individual patient when a prescriber documents a
        clinical need (such as an allergy to an excipient or a dose
        not commercially available). Most telehealth platforms still
        operate through this 503A pathway.
      </p>

      <h3>What is the cheapest legal way to get semaglutide?</h3>
      <p>
        For commercially insured patients, the Wegovy savings card
        combined with insurance coverage is usually the cheapest
        path. Without insurance, the current NovoCare Pharmacy{" "}
        <em>Take a Wegovy Step</em> promotion (effective November 17,
        2025 through June 30, 2026) offers new self-pay patients{" "}
        <strong>$199/month for the first two fills</strong> of the
        0.25 mg and 0.5 mg starter doses and{" "}
        <strong>$349/month thereafter</strong>; the non-promotional
        baseline is <strong>$499/month</strong> for all Wegovy doses
        <Cite n={3} />. 503A compounded semaglutide via telehealth
        ranges from roughly $99 to $249/month depending on the
        provider and dose. Promotion subject to change &mdash;
        verify current pricing directly at NovoCare.
      </p>

      <h3>Can I buy Ozempic for weight loss?</h3>
      <p>
        Ozempic is FDA-approved for type 2 diabetes, not for weight
        loss<Cite n={2} />. A clinician can prescribe it off-label
        for weight loss, but most commercial insurers will not
        cover Ozempic without a diabetes diagnosis. Wegovy is the
        FDA-approved semaglutide product for chronic weight
        management.
      </p>

      <h3>How much does Wegovy cost without insurance in 2026?</h3>
      <p>
        List price at retail pharmacies is roughly $1,350/month.
        Through Novo Nordisk&apos;s NovoCare Pharmacy direct-pay
        program, the current <em>Take a Wegovy Step</em> promotion
        (effective November 17, 2025 through June 30, 2026) offers
        new self-pay patients{" "}
        <strong>$199/month for the first two fills</strong> of the
        0.25 mg and 0.5 mg starter doses and{" "}
        <strong>$349/month for all doses thereafter</strong>. The
        non-promotional baseline is $499/month for all Wegovy doses
        <Cite n={3} />. Compounded semaglutide via telehealth is
        typically $99-$249/month but is not the brand-name product.
        Promotion subject to change &mdash; verify current pricing
        directly at NovoCare.
      </p>

      <h3>Does Medicare cover semaglutide?</h3>
      <p>
        Medicare Part D covers Ozempic for type 2 diabetes. Wegovy
        for weight loss has historically not been covered by
        Medicare for obesity alone, though coverage was expanded in
        March 2024 for patients with established cardiovascular
        disease and overweight or obesity. Medicaid coverage varies
        by state.
      </p>

      <h3>How do I know if a compounded semaglutide pharmacy is legitimate?</h3>
      <p>
        Look for PCAB accreditation through the Accreditation
        Commission for Health Care, verify the pharmacy is licensed
        in your state through your state board of pharmacy, and
        confirm it operates as a 503A compounding pharmacy with a
        valid patient-specific prescription<Cite n={6} />. Avoid
        any seller offering semaglutide without a prescription or
        shipping from outside the US.
      </p>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Pricing
        is verified directly from FDA labels, the NovoCare patient
        site, and our 80-provider compounded pricing dataset on the
        publication date. Pricing and availability change frequently
        — verify directly with the provider before signing up. This
        is a YMYL article about a real prescription drug; clinical
        decisions should always involve your prescribing clinician.
        Weight Loss Rankings has no financial relationship with
        Novo Nordisk or any of the providers referenced.
      </p>

      <References items={citations} />
      <FaqSchema items={faqs} />
    </ResearchArticleLayout>
  );
}
