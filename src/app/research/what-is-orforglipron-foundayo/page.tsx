import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "what-is-orforglipron-foundayo";

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

// Foundational definitional article for the bare "what is orforglipron"
// query. Every clinical claim in this piece is sourced from either the
// Eli Lilly April 1, 2026 Foundayo investor press release or the Foundayo
// FDA Prescribing Information. Half-life, indication, labeled doses, and
// the 11.1% headline weight-loss number are all label-verified and were
// previously vetted in our /research/foundayo-orforglipron-fda-approval-2026
// approval write-up. Pronunciation: Lilly has not published an official
// pronunciation guide for "orforglipron" as of this article's publication
// date — we use "or-for-GLI-pron" as the standard four-syllable English
// reading and label it as such.

const FAQS = [
  {
    question: "Is orforglipron the same as Foundayo?",
    answer:
      "Yes. Orforglipron is the generic (chemical) name and Foundayo is the US brand name. They refer to the same Eli Lilly small-molecule GLP-1 receptor agonist tablet. Both names appear on the FDA-approved label.",
  },
  {
    question: "When was orforglipron FDA-approved?",
    answer:
      "The FDA approved Foundayo (orforglipron) on April 1, 2026 for chronic weight management in adults with obesity or overweight with at least one weight-related medical problem. Commercial dispensing began April 6, 2026.",
  },
  {
    question: "Is orforglipron a pill or an injection?",
    answer:
      "Orforglipron is a once-daily oral tablet — it is the first GLP-1 receptor agonist ever approved for weight loss in pill form. Every other GLP-1 weight-loss drug (Wegovy, Zepbound, Saxenda) is a subcutaneous injection.",
  },
  {
    question: "Does orforglipron work as well as Ozempic or Zepbound?",
    answer:
      "At the labeled max dose (17.2 mg) Foundayo produced about 11.1% mean weight loss over 72 weeks. Wegovy STEP-1 reported about 14.9%, and Zepbound SURMOUNT-1 reported about 20.9% at the 15 mg dose. Foundayo is less effective on average but is the only oral option.",
  },
  {
    question: "Who is orforglipron for?",
    answer:
      "Adults with obesity (BMI of 30 or higher) or adults with overweight (BMI of 27 or higher) plus at least one weight-related condition such as hypertension, dyslipidemia, obstructive sleep apnea, or cardiovascular disease.",
  },
  {
    question: "How do you pronounce orforglipron?",
    answer:
      "Or-for-GLI-pron — four syllables with the stress on the third (GLI). Eli Lilly has not published an official pronunciation guide, so this is the standard English reading of the spelling.",
  },
];

export default function WhatIsOrforglipronArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information (FDA-approved April 1, 2026).",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FDA approves Lilly's Foundayo (orforglipron), the only GLP-1 pill for weight loss that can be taken any time of day without food or water restrictions.",
      source: "Lilly Investor Press Release",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
    },
    {
      authors:
        "Wharton S, Aronne LJ, Garvey WT, Kahan S, Wadden TA, Aroda VR, et al.",
      title:
        "Orforglipron, an Oral Small-Molecule GLP-1 Receptor Agonist, in Adults with Obesity (ATTAIN-1).",
      source: "N Engl J Med",
      year: 2025,
      pmid: "40960239",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "Foundayo (orforglipron) — patient and product information site.",
      source: "Lilly Foundayo product page",
      year: 2026,
      url: "https://www.foundayo.lilly.com",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Drugs@FDA: FDA-Approved Drugs — Foundayo (orforglipron) approval record.",
      source: "Drugs@FDA Database",
      year: 2026,
      url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm",
    },
    {
      authors: "Endocrine News.",
      title:
        "Pharma Friday: April 3, 2026 — Foundayo approval and rollout coverage.",
      source: "Endocrine Society",
      year: 2026,
      url: "https://endocrinenews.endocrine.org/pharma-friday-april-3-2026",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Orforglipron is the first oral GLP-1 pill approved for weight
        loss. Its US brand name is <strong>Foundayo</strong>, it is
        made by <strong>Eli Lilly and Company</strong>, and the FDA
        approved it on <strong>April 1, 2026</strong> for chronic
        weight management in adults with obesity or overweight with
        a weight-related medical condition<Cite n={1} />
        <Cite n={2} />. This article is the foundational explainer:
        what orforglipron is as a drug, who makes it, how the
        small-molecule GLP-1 mechanism works, what it is approved
        for, how effective it is in trials, what it costs, and how
        to pronounce the name.
      </p>

      <div className="my-8 rounded-2xl bg-brand-violet/[0.06] p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">
          Quick answer
        </p>
        <p className="mt-2 text-base text-brand-text-primary">
          <strong>Orforglipron</strong> is a once-daily oral GLP-1
          receptor agonist tablet, sold in the US under the brand
          name <strong>Foundayo</strong>, made by{" "}
          <strong>Eli Lilly</strong>, FDA-approved on April 1, 2026
          for chronic weight management. It is the first
          non-peptide, small-molecule GLP-1 ever approved — which
          is the chemistry reason it can be a pill instead of an
          injection. Mean weight loss at the labeled 17.2 mg dose
          was about <strong>11.1% over 72 weeks</strong> in the
          ATTAIN-1 phase 3 trial<Cite n={1} />. List price is about
          $999/month; the Lilly Savings Card brings commercially
          insured patients to <strong>$25/month</strong>
          <Cite n={2} />.
        </p>
      </div>

      <h2>What is orforglipron?</h2>
      <p>
        Orforglipron is the generic (international nonproprietary)
        name for a prescription weight-management drug developed by
        Eli Lilly and Company. In the US it is sold under the brand
        name <strong>Foundayo</strong>
        <Cite n={1} />. The drug was originally discovered by
        Chugai Pharmaceutical and licensed to Eli Lilly in 2018, and
        Lilly developed it through phase 1, 2, and 3 trials under
        the internal designation LY3502970<Cite n={2} />.
      </p>
      <p>
        Pharmacologically, orforglipron is a{" "}
        <strong>non-peptide, small-molecule GLP-1 receptor agonist</strong>
        <Cite n={1} />. Translated into plain language: it binds
        and activates the same receptor (the glucagon-like peptide-1
        receptor) that semaglutide, tirzepatide, liraglutide, and
        every other GLP-1 weight-loss drug binds and activates — but
        unlike those drugs, it is not a peptide. That single
        chemistry distinction is the reason orforglipron can be
        taken as a swallowable tablet rather than as an injection.
        We unpack that mechanism in detail below.
      </p>
      <p>
        Foundayo is supplied as a once-daily oral tablet in six
        labeled strengths — 1 mg, 2 mg, 4 mg, 8 mg, 12 mg, and{" "}
        <strong>17.2 mg</strong> (the labeled maximum) — taken at
        any time of day with or without food, and with no water
        restrictions<Cite n={1} />. The half-life is approximately
        30 hours, much shorter than injectable semaglutide
        (~7 days) or injectable tirzepatide (~5 days), which is
        why it is dosed once daily instead of once weekly.
      </p>

      <h2>Who makes orforglipron?</h2>
      <p>
        Orforglipron is manufactured and marketed by{" "}
        <strong>Eli Lilly and Company</strong>, the Indianapolis-based
        pharmaceutical company that also makes Mounjaro and Zepbound
        (the brand names for tirzepatide, the injectable dual GIP/GLP-1
        agonist FDA-approved for type 2 diabetes and chronic weight
        management, respectively)<Cite n={2} />. Lilly is one of the
        two companies that effectively created the modern incretin
        weight-loss market — the other being Novo Nordisk, which
        makes semaglutide (Ozempic, Wegovy, Rybelsus).
      </p>
      <p>
        Lilly&apos;s strategic rationale for developing an oral
        small-molecule GLP-1 is straightforward. Injectable GLP-1
        drugs are extraordinarily effective but the manufacturing
        is constrained: peptide synthesis is slow, expensive, and
        requires sterile injectable formulation. A small-molecule
        oral drug is dramatically cheaper to manufacture, can be
        scaled the way an ordinary tablet is scaled, and removes
        the needle-phobia barrier that keeps a meaningful fraction
        of eligible patients off the injectable GLP-1 class
        entirely. Lilly has publicly stated that orforglipron was
        engineered specifically to be the GLP-1 that closes those
        gaps<Cite n={2} />.
      </p>

      <h2>How does orforglipron work?</h2>
      <p>
        Orforglipron is a GLP-1 receptor agonist, which means it
        activates the same receptor that the body&apos;s own
        glucagon-like peptide-1 hormone activates after a meal. The
        downstream effects of GLP-1 receptor activation are well
        characterized<Cite n={1} />:
      </p>
      <ul>
        <li>
          <strong>Appetite suppression.</strong> GLP-1 receptors in
          the hypothalamus and brainstem reduce hunger signaling
          and reward-driven eating, so patients feel less hungry
          between meals and are satisfied with smaller portions.
        </li>
        <li>
          <strong>Slowed gastric emptying.</strong> GLP-1
          activation slows the rate at which the stomach passes
          food into the small intestine, which prolongs the feeling
          of fullness after a meal.
        </li>
        <li>
          <strong>Increased satiety.</strong> The combined central
          and peripheral effects produce earlier and longer-lasting
          satiety, which is what drives the sustained calorie deficit
          that produces the trial-reported weight loss.
        </li>
        <li>
          <strong>Glucose-dependent insulin secretion.</strong>{" "}
          GLP-1 stimulates insulin release from pancreatic beta
          cells when blood glucose is elevated, which is why GLP-1
          drugs are also used for type 2 diabetes (orforglipron is
          being studied separately in diabetes under the ATTAIN-2
          program).
        </li>
      </ul>
      <p>
        The chemistry detail that matters: every other FDA-approved
        GLP-1 receptor agonist (semaglutide, tirzepatide, liraglutide,
        dulaglutide, exenatide) is a <strong>peptide</strong> — a
        short chain of amino acids. Peptides are digested in the
        stomach, which is why all of them need to be injected to
        survive into the bloodstream. The one partial exception is
        Rybelsus (oral semaglutide for type 2 diabetes), which is
        peptide semaglutide formulated with an absorption enhancer
        called SNAC and which has to be taken on an empty stomach
        with no more than 4 ounces of water followed by a 30-minute
        wait before eating, drinking, or taking other oral
        medications<Cite n={2} />.
      </p>
      <p>
        Orforglipron is not a peptide at all. It is a small organic
        molecule designed from the ground up to bind the GLP-1
        receptor in the same orientation as the natural peptide
        ligand. Because it is a small molecule, it survives stomach
        acid and the digestive enzymes that destroy peptides, it
        does not require an absorption enhancer, and it does not
        require any food or water restrictions<Cite n={1} />. That
        is the reason it works as an ordinary swallowable tablet —
        and the reason it is the first true oral GLP-1 ever
        approved for weight loss.
      </p>

      <h2>What is orforglipron used for?</h2>
      <p>
        The FDA-approved indication for Foundayo is{" "}
        <strong>chronic weight management</strong> in adults who
        meet either of the following criteria<Cite n={1} />:
      </p>
      <ul>
        <li>
          <strong>BMI of 30 kg/m² or higher</strong> (the clinical
          definition of obesity), or
        </li>
        <li>
          <strong>BMI of 27 kg/m² or higher</strong> (overweight)
          plus at least one weight-related medical condition such
          as hypertension, type 2 diabetes, dyslipidemia, obstructive
          sleep apnea, or cardiovascular disease.
        </li>
      </ul>
      <p>
        Foundayo is intended to be used as an adjunct to a
        reduced-calorie diet and increased physical activity, the
        same wraparound prescribing language that appears on every
        FDA-approved chronic weight management drug<Cite n={1} />.
      </p>
      <p>
        Orforglipron is also being investigated for type 2 diabetes
        (ATTAIN-2), obstructive sleep apnea, knee osteoarthritis,
        hypertension, and several other indications, but as of April
        2026 the only FDA-approved use is the chronic weight
        management indication described above<Cite n={2} />. For
        the full ATTAIN-1 trial breakdown and efficacy estimands,
        see our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo FDA approval deep-dive
        </Link>
        .
      </p>

      <h2>How is it different from other GLP-1s?</h2>
      <p>
        The simplest framing is the form-vs-effect-size trade-off.
        Foundayo is the only oral option in the GLP-1 weight-loss
        class. The injectables produce more weight loss on average,
        but require a needle. Here is how the four major GLP-1
        weight-loss drugs compare on the dimensions patients
        actually care about:
      </p>
      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Form</th>
            <th>Frequency</th>
            <th>Half-life</th>
            <th>Mean weight loss</th>
            <th>FDA year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foundayo (orforglipron)</td>
            <td>Oral tablet</td>
            <td>Daily</td>
            <td>~30 hours</td>
            <td>~11.1% (17.2 mg)</td>
            <td>2026</td>
          </tr>
          <tr>
            <td>Wegovy (semaglutide)</td>
            <td>Injection</td>
            <td>Weekly</td>
            <td>~7 days</td>
            <td>~14.9% (2.4 mg)</td>
            <td>2021</td>
          </tr>
          <tr>
            <td>Zepbound (tirzepatide)</td>
            <td>Injection</td>
            <td>Weekly</td>
            <td>~5 days</td>
            <td>~20.9% (15 mg)</td>
            <td>2023</td>
          </tr>
          <tr>
            <td>Saxenda (liraglutide)</td>
            <td>Injection</td>
            <td>Daily</td>
            <td>~13 hours</td>
            <td>~8.0% (3 mg)</td>
            <td>2014</td>
          </tr>
        </tbody>
      </table>
      <p>
        For a head-to-head walkthrough that includes pricing,
        side-effect profile, and the case for choosing each drug,
        see our{" "}
        <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
          Foundayo vs Wegovy vs Zepbound comparison
        </Link>
        .
      </p>

      <h2>How effective is orforglipron?</h2>
      <p>
        Foundayo&apos;s approval was anchored on the{" "}
        <strong>ATTAIN-1</strong> phase 3 trial, a 72-week
        randomized, double-blind, placebo-controlled trial in
        3,127 adults with obesity or overweight without type 2
        diabetes<Cite n={3} />. The FDA-labeled mean weight loss
        at the labeled maximum 17.2 mg dose was approximately{" "}
        <strong>11.1% (about 24.9 pounds)</strong> in the
        non-diabetic population<Cite n={1} />. In the parallel
        ATTAIN trial population that included adults with type 2
        diabetes, the labeled-dose result was approximately 9.6%
        (about 21.2 pounds) — slightly less weight loss, which is
        the consistent pattern across the GLP-1 class for diabetic
        versus non-diabetic populations<Cite n={1} />.
      </p>
      <p>
        Honest framing: Foundayo&apos;s effect size sits below
        injectable semaglutide and well below tirzepatide. STEP-1
        reported about 14.9% mean weight loss for Wegovy 2.4 mg
        weekly, and SURMOUNT-1 reported about 20.9% for Zepbound
        15 mg weekly. The trade-off Foundayo offers patients is
        roughly 3-10 percentage points less weight loss in exchange
        for a daily pill that requires no needles, no cold-chain
        shipping, and no sharps disposal. For patients who would
        not otherwise start a GLP-1 because of injection burden,
        that trade-off is the entire point of the drug.
      </p>

      <h2>What does orforglipron cost?</h2>
      <p>
        Foundayo&apos;s US list price is approximately{" "}
        <strong>$999 per month</strong> at the labeled doses. The
        most relevant out-of-pocket numbers for actual patients
        depend on the access path<Cite n={2} />:
      </p>
      <ul>
        <li>
          <strong>Commercial insurance + Lilly Savings Card:</strong>{" "}
          as low as <strong>$25 per month</strong> for commercially
          insured patients (not Medicare or Medicaid). This is the
          cheapest legal path to a brand-name FDA-approved GLP-1
          in 2026 by a wide margin.
        </li>
        <li>
          <strong>Cash pay through LillyDirect:</strong> $149 per
          month for the lowest dose, scaling up at the higher
          labeled doses.
        </li>
        <li>
          <strong>Medicare Part D (eligible):</strong> as low as
          $50 per month, beginning July 1, 2026.
        </li>
      </ul>
      <p>
        For the live provider directory and the channel-by-channel
        pricing, see our{" "}
        <Link href="/research/where-to-buy-foundayo">
          Where to buy Foundayo provider list
        </Link>
        . To compare cost-per-pound of weight loss across every
        FDA-approved GLP-1, use our{" "}
        <Link href="/tools/glp1-cost-per-pound-calculator">
          GLP-1 cost-per-pound calculator
        </Link>
        .
      </p>

      <h2>How do you pronounce orforglipron?</h2>
      <p>
        The standard English pronunciation is{" "}
        <strong>or-for-GLI-pron</strong> — four syllables, with
        the stress on the third syllable (GLI). Broken out:
      </p>
      <ul>
        <li>
          <strong>or</strong> — as in &ldquo;or&rdquo;
        </li>
        <li>
          <strong>for</strong> — as in &ldquo;for&rdquo;
        </li>
        <li>
          <strong>GLI</strong> — as in &ldquo;glee&rdquo; (stressed)
        </li>
        <li>
          <strong>pron</strong> — rhymes with &ldquo;Ron&rdquo;
        </li>
      </ul>
      <p>
        Eli Lilly has not published an official pronunciation guide
        for orforglipron as of this article&apos;s publication date,
        so this is the standard English reading of the spelling
        rather than a manufacturer-confirmed pronunciation. The
        brand name <strong>Foundayo</strong> is pronounced
        &ldquo;foun-DAY-oh&rdquo; — three syllables, stress on
        the second.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Is orforglipron the same as Foundayo?</h3>
      <p>
        Yes. <strong>Orforglipron</strong> is the generic
        (chemical) name and <strong>Foundayo</strong> is the US
        brand name. They refer to the same Eli Lilly small-molecule
        GLP-1 receptor agonist tablet. Both names appear on the
        FDA-approved label<Cite n={1} />.
      </p>

      <h3>When was orforglipron FDA-approved?</h3>
      <p>
        The FDA approved Foundayo (orforglipron) on{" "}
        <strong>April 1, 2026</strong> for chronic weight
        management in adults with obesity or overweight with at
        least one weight-related medical problem. Commercial
        dispensing through LillyDirect began April 6, 2026
        <Cite n={2} />.
      </p>

      <h3>Is orforglipron a pill or an injection?</h3>
      <p>
        Orforglipron is a once-daily <strong>oral tablet</strong> —
        it is the first GLP-1 receptor agonist ever approved for
        weight loss in pill form. Every other GLP-1 weight-loss
        drug (Wegovy, Zepbound, Saxenda) is a subcutaneous
        injection<Cite n={1} />. For the full daily protocol, see
        our{" "}
        <Link href="/research/how-to-take-foundayo-orforglipron-guide">
          how to take Foundayo guide
        </Link>
        .
      </p>

      <h3>Does orforglipron work as well as Ozempic or Zepbound?</h3>
      <p>
        Not on average. At the labeled maximum 17.2 mg dose
        Foundayo produced about 11.1% mean weight loss over 72
        weeks. Wegovy STEP-1 reported about 14.9%, and Zepbound
        SURMOUNT-1 reported about 20.9% at the 15 mg dose. Foundayo
        is less effective than the best injectables but is the only
        oral option<Cite n={1} /><Cite n={3} />.
      </p>

      <h3>Who is orforglipron for?</h3>
      <p>
        Adults with obesity (BMI of 30 or higher) or adults with
        overweight (BMI of 27 or higher) plus at least one
        weight-related condition such as hypertension, dyslipidemia,
        obstructive sleep apnea, type 2 diabetes, or cardiovascular
        disease<Cite n={1} />.
      </p>

      <h3>How do you say orforglipron?</h3>
      <p>
        <strong>Or-for-GLI-pron</strong> — four syllables with the
        stress on the third syllable (GLI). Lilly has not published
        an official pronunciation guide, so this is the standard
        English reading of the spelling.
      </p>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo (orforglipron) FDA approval deep-dive
          </Link>{" "}
          — full ATTAIN-1 trial review, dosing, and the approval
          narrative
        </li>
        <li>
          <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
            Foundayo vs Wegovy vs Zepbound head-to-head
          </Link>{" "}
          — trial efficacy, pricing, and the case for each drug
        </li>
        <li>
          <Link href="/research/where-to-buy-foundayo">
            Where to buy Foundayo in 2026
          </Link>{" "}
          — verified provider directory and channel-by-channel
          pricing
        </li>
        <li>
          <Link href="/research/how-to-take-foundayo-orforglipron-guide">
            How to take Foundayo
          </Link>{" "}
          — daily protocol, food rules, missed-dose handling
        </li>
        <li>
          <Link href="/best/orforglipron-providers">
            Best orforglipron providers
          </Link>{" "}
          — ranked list of telehealth platforms prescribing Foundayo
        </li>
        <li>
          <Link href="/tools/glp1-cost-per-pound-calculator">
            GLP-1 cost-per-pound calculator
          </Link>{" "}
          — compare Foundayo, Wegovy, and Zepbound on dollars per
          pound lost
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice.
        Foundayo (orforglipron) is a prescription drug with a boxed
        warning for thyroid C-cell tumors and several other class
        warnings — it should only be used under the supervision of
        a licensed prescribing clinician. Pricing and availability
        change frequently in the first weeks of any new drug
        launch; verify directly with the prescriber and pharmacy.
        Weight Loss Rankings has no financial relationship with
        Eli Lilly.
      </p>

      <References items={citations} />
      <FaqSchema items={FAQS} />
    </ResearchArticleLayout>
  );
}
