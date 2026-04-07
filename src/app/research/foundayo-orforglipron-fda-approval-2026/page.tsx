import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "foundayo-orforglipron-fda-approval-2026";

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

// Every clinical claim in this article was verified directly against
// Eli Lilly's April 1, 2026 FDA approval press release for Foundayo
// (orforglipron) and the underlying ATTAIN-1 phase 3 protocol entry
// at ClinicalTrials.gov (NCT05869903). Pricing, dosing, and indication
// language are quoted from the Lilly investor release; pharmacokinetic
// detail is verified against Ma et al. Diabetes Therapy 2024 (PMID
// 38402332).

export default function FoundayoArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
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
        "Ma X, Liu R, Pratt EJ, Benson CT, Bhattachar SN, Sloop KW.",
      title:
        "Effect of Food Consumption on the Pharmacokinetics, Safety, and Tolerability of Once-Daily Orally Administered Orforglipron (LY3502970), a Non-peptide GLP-1 Receptor Agonist.",
      source: "Diabetes Therapy",
      year: 2024,
      pmid: "38402332",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ATTAIN-1: A Study of Daily Oral Orforglipron in Adult Participants With Obesity or Overweight.",
      source: "ClinicalTrials.gov NCT05869903",
      year: 2026,
      url: "https://clinicaltrials.gov/study/NCT05869903",
    },
    {
      authors:
        "Wilding JPH, Batterham RL, Calanna S, Davies M, Van Gaal LF, Lingvay I, McGowan BM, Rosenstock J, Tran MTD, Wadden TA, Wharton S, Yokote K, Zeuthen N, Kushner RF; STEP 1 Study Group.",
      title:
        "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33567185",
    },
    {
      authors:
        "Jastreboff AM, Aronne LJ, Ahmad NN, Wharton S, Connery L, Alves B, Kiyosue A, Zhang S, Liu B, Bunck MC, Stefanski A; SURMOUNT-1 Investigators.",
      title:
        "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
      source: "N Engl J Med",
      year: 2022,
      pmid: "35658024",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information. Section 2 (dosage), Section 5 (warnings), Section 7 (drug interactions, strong CYP3A4 inhibitor 9 mg dose cap), Section 12.3 (pharmacokinetics, half-life 29-49 h).",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://pi.lilly.com/us/foundayo-uspi.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        On April 1, 2026, the FDA approved Foundayo (orforglipron),
        Eli Lilly&apos;s once-daily oral GLP-1 pill, for chronic
        weight management in adults with obesity or overweight with
        weight-related medical problems [1]. Foundayo is the first
        non-peptide, small-molecule GLP-1 receptor agonist ever
        approved for weight loss. Unlike Rybelsus (oral semaglutide),
        which is a peptide formulated with an absorption enhancer
        and must be taken on an empty stomach with strict water
        restrictions, Foundayo is a true small molecule that can be
        taken any time of day with or without food. This is a
        material change to the dosing experience and the GLP-1 access
        story. We walk through the verified ATTAIN-1 phase 3 trial
        data, the dosing schedule, the launch pricing, the safety
        profile, and how Foundayo compares head-to-head with the
        injectable semaglutide and tirzepatide already on the market.
      </p>

      <h2>What Foundayo is, mechanically</h2>

      <p>
        Foundayo (generic name orforglipron, internal designation
        LY3502970) is a small-molecule, non-peptide GLP-1 receptor
        agonist [1]. The distinction between &ldquo;small-molecule&rdquo;
        and &ldquo;peptide&rdquo; matters because peptides are
        digested in the stomach. Every existing FDA-approved GLP-1
        agonist (semaglutide, tirzepatide, liraglutide, dulaglutide,
        exenatide) is a peptide, and that&apos;s why all of them
        are injectable — except for Rybelsus (oral semaglutide),
        which gets around the digestion problem with a special
        absorption enhancer (SNAC) and requires the patient to take
        it on an empty stomach with no more than 4 ounces of water
        and then wait 30 minutes before eating, drinking, or taking
        other oral medications.
      </p>

      <p>
        Orforglipron isn&apos;t a peptide at all. It&apos;s a small
        organic molecule that binds and activates the GLP-1 receptor
        directly, with the same downstream effects on appetite,
        gastric emptying, and reward circuitry that injectable
        semaglutide produces. Because it&apos;s a small molecule,
        it survives stomach acid and digestion, doesn&apos;t require
        food restrictions, and produced predictable pharmacokinetics
        across the food-effect study published in Diabetes Therapy
        in 2024 [2]. Orforglipron was originally discovered by
        Chugai Pharmaceutical and licensed to Eli Lilly in 2018 [1].
      </p>

      <h2>The ATTAIN-1 phase 3 trial</h2>

      <p>
        Foundayo&apos;s approval is anchored on the ATTAIN-1 phase
        3 trial (NCT05869903) [1, 3]. Verified design parameters:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 3,127 adults randomized
        </li>
        <li>
          <strong>Population:</strong> Adults with obesity, or
          overweight with at least one weight-related comorbidity
          (hypertension, dyslipidemia, obstructive sleep apnea, or
          cardiovascular disease) — and importantly,{" "}
          <strong>without diabetes</strong>. The diabetes population
          is being studied separately in ATTAIN-2.
        </li>
        <li>
          <strong>Design:</strong> Phase 3, randomized, double-blind,
          placebo-controlled, multi-dose
        </li>
        <li>
          <strong>Duration:</strong> 72 weeks
        </li>
        <li>
          <strong>Geography:</strong> 9 countries — US (including
          Puerto Rico, a US territory), Brazil, China, India, Japan,
          South Korea, Slovakia, Spain, and Taiwan
        </li>
        <li>
          <strong>Primary endpoint:</strong> Percent change in body
          weight from baseline at week 72
        </li>
      </ul>

      <h2>The headline efficacy</h2>

      <p>
        Two estimands were reported in the Lilly approval press
        release. The <em>efficacy estimand</em> represents what
        happens to participants who stayed on study drug for the
        full 72 weeks. The <em>treatment-regimen estimand</em>{" "}
        represents the average effect across all randomized
        participants regardless of whether they stuck with treatment.
        Both are clinically informative; the treatment-regimen
        estimand is closer to a real-world prescribing experience [1].
      </p>

      <p>
        <strong>Important dose distinction.</strong> ATTAIN-1 (Wharton
        et al., NEJM 2025, PMID 40960239) tested 6, 12, and{" "}
        <strong>36 mg</strong> orforglipron arms — not the
        FDA-approved labeled maximum of 17.2 mg. The 36 mg trial arm
        is what produces the headline 11-12% trial numbers below.
        The FDA-approved labeled-dose (17.2 mg) result patients will
        actually experience is reported separately from the
        Foundayo prescribing information.
      </p>

      <table>
        <thead>
          <tr>
            <th>Source / Dose</th>
            <th>Estimand</th>
            <th>Foundayo</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FDA label (17.2 mg, adults without T2D)</td>
            <td>Label-reported</td>
            <td>
              <strong>−11.1% (−24.9 lbs)</strong>
            </td>
            <td>—</td>
          </tr>
          <tr>
            <td>ATTAIN-1 36 mg (above label max)</td>
            <td>Efficacy (completers)</td>
            <td>−12.4% (−27.3 lbs)</td>
            <td>−0.9% (−2.2 lbs)</td>
          </tr>
          <tr>
            <td>ATTAIN-1 36 mg (above label max)</td>
            <td>Treatment-regimen (ITT)</td>
            <td>−11.2%</td>
            <td>−2.1%</td>
          </tr>
        </tbody>
      </table>

      <p>
        Foundayo also produced reductions in waist circumference,
        non-HDL cholesterol, triglycerides, and systolic blood
        pressure across all doses tested in the ATTAIN program [1].
      </p>

      <h2>How Foundayo compares to injectable GLP-1s</h2>

      <p>
        The comparison most patients will want to make: Foundayo vs
        Wegovy (semaglutide 2.4 mg weekly) vs Zepbound (tirzepatide
        15 mg weekly). These are not direct head-to-head trials —
        they&apos;re separate trials with different populations and
        designs — but the trial-arm magnitudes give a useful framing:
      </p>

      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Trial</th>
            <th>Highest-dose efficacy</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foundayo (oral pill, 17.2 mg labeled max)</td>
            <td>Foundayo PI [1]</td>
            <td>−11.1%</td>
            <td>72 wk</td>
          </tr>
          <tr>
            <td>Wegovy (sema 2.4 mg inj)</td>
            <td>STEP-1 [4]</td>
            <td>−14.9%</td>
            <td>68 wk</td>
          </tr>
          <tr>
            <td>Zepbound (tirz 15 mg inj)</td>
            <td>SURMOUNT-1 [5]</td>
            <td>−20.9%</td>
            <td>72 wk</td>
          </tr>
        </tbody>
      </table>

      <p>
        Foundayo&apos;s effect size sits below injectable semaglutide
        and well below tirzepatide. That&apos;s the trade-off the
        patient and prescriber need to weigh against the convenience
        of a daily pill that doesn&apos;t require injection technique,
        cold-chain shipping, or a sharps container. For patients who
        will not or cannot use an injectable — needle phobia is a
        meaningful barrier — Foundayo is now a real option backed by
        a large randomized trial. For patients optimizing for maximum
        weight loss, the injectables remain the higher-magnitude
        choice. See our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide deep-dive
        </Link>{" "}
        for the injectable comparison.
      </p>

      <h2>Dosing and titration</h2>

      <p>
        Foundayo is a once-daily oral tablet available in six
        strengths: 0.8 mg, 2.5 mg, 5.5 mg, 9 mg, 14.5 mg, and 17.2
        mg [1]. Tablets are swallowed whole — not broken, crushed,
        or chewed — and can be taken any time of day with or without
        food and with no water restrictions. Dose escalation follows
        a graduated schedule from the lowest strength upward,
        consistent with the GI-tolerability strategy used by all
        modern GLP-1 agonists. Like semaglutide and tirzepatide,
        Foundayo cannot be combined with other GLP-1 receptor
        agonist medications. Per the FDA label, the half-life of
        orforglipron is <strong>29-49 hours</strong>, which is why
        the drug is dosed once daily [6].
      </p>

      <h2>Drug interactions: the strong CYP3A4 inhibitor dose cap</h2>

      <p>
        Orforglipron is metabolized primarily by CYP3A4, and the
        Foundayo prescribing information carries a specific
        drug-drug interaction warning: when co-administered with a{" "}
        <strong>strong CYP3A4 inhibitor</strong> (e.g., clarithromycin,
        itraconazole, ketoconazole, or ritonavir-boosted antivirals),
        the maximum labeled Foundayo dose is reduced to{" "}
        <strong>9 mg once daily</strong> [6]. Patients already
        titrated above 9 mg who are started on a strong CYP3A4
        inhibitor should be stepped back to the 9 mg dose for the
        duration of the interacting medication. This is a labeled
        DDI warning unique to Foundayo among the GLP-1 weight-loss
        class — the injectable peptide GLP-1s (semaglutide,
        tirzepatide) are not metabolized by CYP3A4 and carry no
        comparable dose cap.
      </p>

      <h2>Safety and the boxed warning</h2>

      <p>
        Foundayo carries the same boxed warning as every other
        FDA-approved GLP-1 receptor agonist: thyroid C-cell tumors,
        including medullary thyroid carcinoma (MTC), have been
        observed in rodent studies, and the drug is contraindicated
        in patients with personal or family history of MTC or in
        patients with Multiple Endocrine Neoplasia syndrome type 2
        (MEN 2) [1]. The most common adverse events reported in the
        ATTAIN trials were the standard GLP-1 GI side effects
        (nausea, constipation, diarrhea, vomiting, abdominal pain,
        indigestion, belching, heartburn) plus headache, swollen
        belly, fatigue, gas, and hair loss [1]. For a detailed
        comparison of the GI side effect profile across the GLP-1
        class, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          side effects investigation
        </Link>
        .
      </p>

      <p>
        Other label warnings consistent with the GLP-1 class:
        pancreatitis, dehydration-induced kidney problems, gallbladder
        disease, hypoglycemia (particularly in patients on insulin
        or sulfonylureas), serious allergic reactions, diabetic
        retinopathy progression in patients with type 2 diabetes,
        and increased risk of food/liquid aspiration during
        anesthesia [1].
      </p>

      <h2>Pricing — the most important practical detail</h2>

      <p>
        Foundayo is launching through Lilly&apos;s direct-to-patient
        platform, LillyDirect, with shipping beginning April 6,
        2026, followed by broader retail and telehealth availability
        shortly after [1]. The pricing structure is the most
        important access change in the GLP-1 market in 2026:
      </p>

      <ul>
        <li>
          <strong>Commercial insurance coverage:</strong> as low as
          $25 per month with the Foundayo savings card
        </li>
        <li>
          <strong>Self-pay:</strong> $149 per month for the lowest
          dose
        </li>
        <li>
          <strong>Medicare Part D:</strong> not covered for the
          weight management indication. Section 1860D-2(e)(2)(A) of
          the Social Security Act excludes &ldquo;agents when used
          for anorexia, weight loss, or weight gain&rdquo; from
          Medicare Part D, which is why no FDA-approved GLP-1
          obesity drug (Wegovy, Zepbound, Saxenda, or Foundayo) is
          currently covered by Part D for weight loss. Medicare
          beneficiaries on Foundayo for weight management must pay
          cash.
        </li>
      </ul>

      <p>
        For comparison, the cash price of Wegovy in early 2026
        ranged from roughly $1,300 to $1,400 per month before
        rebates and savings cards; Zepbound cash pricing was in a
        similar range. The $149 self-pay floor for Foundayo is
        roughly an order of magnitude lower than the existing
        injectable cash prices. For the live state of compounded
        and brand-name GLP-1 pricing across the telehealth market,
        see our{" "}
        <Link href="/research/glp1-pricing-index">
          pricing index
        </Link>
        .
      </p>

      <h2>What this means for patients</h2>

      <p>
        Foundayo changes the GLP-1 access conversation in three
        practical ways:
      </p>

      <ol>
        <li>
          <strong>Needle removal.</strong> A meaningful fraction of
          patients who could benefit from GLP-1 therapy refuse or
          discontinue the injectables because of injection burden
          or needle phobia. Foundayo gives those patients a
          first-line, FDA-approved oral option backed by a large
          randomized trial — at the cost of about 2-3 percentage
          points of weight loss versus injectable semaglutide.
        </li>
        <li>
          <strong>Cash-pay floor at $149/month.</strong> Lilly is
          using Foundayo to compete on price as well as convenience.
          The $149 self-pay tier puts a branded, FDA-approved GLP-1
          inside the cash-pay range that, until now, was occupied
          almost entirely by compounded semaglutide and tirzepatide
          from telehealth providers. We expect this to materially
          reshape the compounded market.
        </li>
        <li>
          <strong>Pipeline implications.</strong> Orforglipron is
          also being studied for type 2 diabetes (ATTAIN-2),
          obstructive sleep apnea, knee osteoarthritis, hypertension,
          peripheral artery disease, and stress urinary incontinence
          [1]. If those indications read out positive, the small-
          molecule GLP-1 footprint will expand substantially over
          the next 2-3 years.
        </li>
      </ol>

      <h2>Open questions</h2>

      <ol>
        <li>
          <strong>Long-term durability.</strong> ATTAIN-1 was 72
          weeks. Whether the weight loss is maintained after that
          point — and whether the post-discontinuation regain
          pattern documented for injectable semaglutide (see our{" "}
          <Link href="/research/what-happens-when-you-stop-semaglutide">
            STEP-4 / STEP-1 extension review
          </Link>
          ) also applies to oral orforglipron — has not been
          published.
        </li>
        <li>
          <strong>Cardiovascular outcomes.</strong> Foundayo&apos;s
          approval is for chronic weight management. A SELECT-style
          cardiovascular outcomes trial in non-diabetic patients
          with established cardiovascular disease has not been
          announced. For the injectable semaglutide cardiovascular
          evidence, see our{" "}
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT trial deep-dive
          </Link>
          .
        </li>
        <li>
          <strong>Direct head-to-head data.</strong> No published
          trial has directly compared orforglipron to injectable
          semaglutide or tirzepatide in the same population on the
          same protocol. The trial-arm comparisons in this article
          are indirect.
        </li>
      </ol>

      <h2>Related research</h2>

      <p>
        For our broader coverage of the GLP-1 landscape, see the{" "}
        <Link href="/research/glp1-pricing-index">
          pricing index
        </Link>
        , the{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          side-effects investigation
        </Link>
        , the{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT cardiovascular trial deep-dive
        </Link>
        , the{" "}
        <Link href="/research/flow-trial-semaglutide-kidney-disease">
          FLOW kidney trial deep-dive
        </Link>
        , and the{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
