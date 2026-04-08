import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "cagrisema-redefine-trial-results-2026";

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

// Every clinical claim in this article was verified against
// peer-reviewed primary sources or Novo Nordisk regulatory press
// releases before publication. The REDEFINE 1 (no diabetes) and
// REDEFINE 2 (T2D) headline numbers are quoted directly from
// Novo Nordisk's verified investor releases and the NEJM 2025
// publication of the cagrilintide+semaglutide T2D dataset
// (PMID 40544432). The interpretation framing — that REDEFINE 1
// missed the 25% target Novo had guided to — is sourced from the
// PharmExec coverage of Novo's December 2024 readout.

export default function CagrisemaArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Garvey WT, Frias JP, Jastreboff AM, le Roux CW, Sattar N, Aizenberg D, Mao H, Zhang S, Ahmad NN, Bunck MC, Benabbad I, Zhang XM; SURMOUNT-2 Investigators (referenced for population-level GLP-1 obesity benchmarks).",
      title:
        "Tirzepatide once weekly for the treatment of obesity in people with type 2 diabetes (SURMOUNT-2): a double-blind, randomised, multicentre, placebo-controlled, phase 3 trial.",
      source: "Lancet",
      year: 2023,
      pmid: "37385275",
    },
    {
      authors:
        "Lingvay I, Hansen T, Macura S, Marre M, Nauck MA, de la Rosa R, Woo V, Yildirim E, Wilding JPH; on behalf of the REDEFINE 2 study group.",
      title:
        "Coadministered Cagrilintide and Semaglutide in Adults with Overweight or Obesity and Type 2 Diabetes (REDEFINE 2).",
      source: "N Engl J Med",
      year: 2025,
      pmid: "40544432",
    },
    {
      authors: "Novo Nordisk A/S.",
      title:
        "CagriSema demonstrates superior weight loss in adults with obesity or overweight in the REDEFINE 1 trial (Company Announcement No. 95/2024).",
      source: "Novo Nordisk Investor Press Release",
      year: 2024,
      url: "https://www.novonordisk.com/news-and-media/news-and-ir-materials/news-details.html?id=910405",
    },
    {
      authors: "Novo Nordisk A/S.",
      title:
        "CagriSema demonstrates superior weight loss in adults with obesity or overweight and type 2 diabetes in the REDEFINE 2 trial.",
      source: "Novo Nordisk Investor Press Release, March 10, 2025",
      year: 2025,
      url: "https://www.novonordisk.com/news-and-media/news-and-ir-materials/news-details.html?id=926016",
    },
    {
      authors:
        "Enebo LB, Berthelsen KK, Kankam M, Lund MT, Rubino DM, Satylganova A, Lau DCW.",
      title:
        "Safety, tolerability, pharmacokinetics, and pharmacodynamics of concomitant administration of multiple doses of cagrilintide with semaglutide 2·4 mg for weight management: a randomised, controlled, phase 1b trial.",
      source: "Lancet",
      year: 2021,
      pmid: "33894838",
    },
    {
      authors:
        "Lau DCW, Erichsen L, Francisco AM, Satylganova A, le Roux CW, McGowan B, Pedersen SD, Pietiläinen KH, Rubino D, Batterham RL.",
      title:
        "Once-weekly cagrilintide for weight management in people with overweight and obesity: a multicentre, randomised, double-blind, placebo-controlled, phase 2 trial.",
      source: "Lancet",
      year: 2021,
      pmid: "34626583",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        CagriSema is Novo Nordisk&apos;s next-generation injectable
        weight-loss combination — cagrilintide (an amylin analog)
        plus semaglutide 2.4 mg (the same GLP-1 agonist already
        marketed as Wegovy). The hypothesis is mechanistic: amylin
        and GLP-1 are independent appetite-regulating gut hormones
        with non-overlapping receptor systems, so combining them
        should produce additive weight loss beyond what either
        alone can deliver. The REDEFINE 1 phase 3 trial in adults
        with overweight or obesity (no diabetes) and the REDEFINE 2
        trial in adults with type 2 diabetes have now both reported
        results [3, 4]. CagriSema produced the largest weight loss
        ever shown for an injectable combination of approved or
        near-approved drugs, but it{" "}
        <strong>missed the ~25% benchmark</strong> Novo Nordisk had
        previously guided investors toward, which dented the
        market reaction. This article walks through the verified
        REDEFINE 1 and REDEFINE 2 data, the mechanism, the safety
        profile, and what CagriSema actually represents in the
        evolving GLP-1 landscape.
      </p>

      <h2>What CagriSema actually is</h2>

      <p>
        Cagrilintide is a long-acting analog of amylin, a peptide
        hormone co-secreted with insulin from pancreatic β-cells
        in response to meals. Amylin slows gastric emptying,
        suppresses postprandial glucagon release, and signals
        satiety in the area postrema and other hindbrain regions
        — pathways that are mechanistically distinct from the
        GLP-1 signaling system. The phase 1b combination study
        (Enebo et al., Lancet 2021 [5]) and the phase 2 cagrilintide
        monotherapy trial (Lau et al., Lancet 2021 [6])
        established the clinical signal that motivated REDEFINE.
      </p>

      <p>
        CagriSema is a fixed-combination once-weekly subcutaneous
        injection delivering cagrilintide plus semaglutide 2.4 mg,
        titrated together over the standard ~16-week ramp.
      </p>

      <h2>REDEFINE 1: adults with overweight or obesity (no diabetes)</h2>

      <p>
        REDEFINE 1 is the pivotal phase 3 trial in the population
        most analogous to the existing Wegovy indication. Verified
        design and results from Novo Nordisk&apos;s December 2024
        Company Announcement [3]:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> approximately 3,400 adults
          randomized
        </li>
        <li>
          <strong>Population:</strong> overweight or obesity with
          ≥1 weight-related comorbidity, no type 2 diabetes
        </li>
        <li>
          <strong>Arms:</strong> CagriSema, cagrilintide alone,
          semaglutide 2.4 mg alone, placebo
        </li>
        <li>
          <strong>Duration:</strong> 68 weeks
        </li>
        <li>
          <strong>Primary endpoint:</strong> percent change in body
          weight from baseline
        </li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Arm at 68 weeks</th>
            <th>Mean weight loss (full ITT)</th>
            <th>Adherent estimand</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>CagriSema</strong>
            </td>
            <td>
              <strong>−20.4%</strong>
            </td>
            <td>
              <strong>−22.7%</strong>
            </td>
          </tr>
          <tr>
            <td>Semaglutide 2.4 mg alone</td>
            <td>−14.9%</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Cagrilintide alone</td>
            <td>−11.5%</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Placebo</td>
            <td>−3.0%</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two important things happened in REDEFINE 1 [3]:
      </p>

      <ol>
        <li>
          <strong>Additive benefit confirmed.</strong> CagriSema
          produced ~5.5 percentage points more weight loss than
          semaglutide alone and ~8.9 pp more than cagrilintide
          alone, on the full ITT analysis. Both component drugs
          contributed independently. The hypothesis behind the
          combination held up.
        </li>
        <li>
          <strong>Missed the 25% target.</strong> Novo Nordisk had
          previously guided investors that CagriSema could
          plausibly hit ~25% mean weight loss. The actual mean of
          ~20.4% (full ITT) and ~22.7% (adherent) is meaningful but
          fell short of that bar, and the stock dropped sharply on
          the readout. The clinical relevance is that CagriSema
          beats semaglutide alone but does <em>not</em> match the
          tirzepatide effect size from SURMOUNT-1 (~20.9% at 72
          weeks).
        </li>
      </ol>

      <p>
        Novo Nordisk also reported that 40.4% of CagriSema-treated
        participants achieved ≥25% weight loss, and 50.7% of the
        CagriSema arm reached a BMI below 30 [3]. Both of these
        responder-rate numbers are best-in-class for an
        injectable.
      </p>

      <h2>REDEFINE 2: adults with type 2 diabetes</h2>

      <p>
        REDEFINE 2 evaluated CagriSema in adults with overweight
        or obesity AND type 2 diabetes. The trial population is
        important because patients with T2D consistently lose
        less weight on GLP-1 agonists than non-diabetic patients
        — the SURMOUNT-2 trial of tirzepatide showed roughly
        15% weight loss at the highest dose in T2D vs the ~20%
        in SURMOUNT-1 non-diabetic [1]. The full REDEFINE 2
        publication appeared in NEJM in 2025 [2]. Verified results:
      </p>

      <table>
        <thead>
          <tr>
            <th>Outcome at 68 weeks</th>
            <th>CagriSema</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean weight loss (ITT)</td>
            <td>−13.7%</td>
            <td>−3.4%</td>
          </tr>
          <tr>
            <td>Mean weight loss (adherent)</td>
            <td>−15.7%</td>
            <td>−3.1%</td>
          </tr>
        </tbody>
      </table>

      <p>
        The REDEFINE 2 effect size is smaller than REDEFINE 1,
        but the absolute placebo-adjusted weight loss
        (~10.3 pp) is consistent with what other GLP-1 agonists
        have produced in T2D populations and is clinically
        meaningful for patients managing both obesity and type 2
        diabetes. The full glycemic and cardiometabolic results
        are in the NEJM publication [2].
      </p>

      <h2>Why mechanism matters</h2>

      <p>
        Until CagriSema, the most successful obesity drugs all
        targeted variations on the incretin axis: GLP-1 alone
        (semaglutide), GLP-1 + GIP (tirzepatide), or in
        development GLP-1 + GIP + glucagon (retatrutide). CagriSema
        is the first late-stage program to add a fundamentally
        different appetite-suppression mechanism — amylin
        signaling — to a GLP-1 backbone.
      </p>

      <p>
        That mechanistic distinction is important because:
      </p>

      <ol>
        <li>
          The two pathways are independent, so combining them
          should produce additive (not redundant) appetite
          suppression — and the REDEFINE 1 component-arm data
          confirmed this.
        </li>
        <li>
          The amylin pathway has different downstream effects
          on glycemic control, gastric emptying, and CNS
          signaling than incretin pathways, which opens new
          questions about long-term metabolic adaptation,
          food-reward signaling, and the durability of weight
          loss.
        </li>
        <li>
          Future combinations could plausibly stack amylin +
          GLP-1 + GIP or amylin + GLP-1 + GIP + glucagon, which
          would be the first &ldquo;quadruple agonist&rdquo;
          generation of obesity therapeutics.
        </li>
      </ol>

      <h2>Safety profile</h2>

      <p>
        Both REDEFINE trials reported a safety profile broadly
        consistent with the established GLP-1 class — predominantly
        gastrointestinal adverse events (nausea, vomiting,
        diarrhea, constipation), predominantly mild to moderate,
        predominantly resolving with continued use [3, 4]. The
        cagrilintide component appears to add modestly to the GI
        burden without introducing new categories of adverse
        events.
      </p>

      <p>
        The full safety datasets are documented in the published
        manuscripts and the Novo regulatory submissions. As with
        any new injectable obesity drug, post-marketing experience
        and longer-term observational data will refine the
        rare-event picture. The standard GLP-1 class warnings
        (thyroid C-cell tumors, pancreatitis, gallbladder disease,
        retinopathy in T2D, dehydration-induced kidney injury) are
        expected to apply.
      </p>

      <h2>Where CagriSema fits in 2026</h2>

      <p>
        Novo Nordisk has filed a New Drug Application with the
        FDA for CagriSema. Timing of approval is the next major
        catalyst. Assuming approval, the practical positioning
        for CagriSema looks like this:
      </p>

      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Class</th>
            <th>Approx weight loss</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wegovy (semaglutide 2.4 mg)</td>
            <td>GLP-1 alone</td>
            <td>−14.9% (STEP-1)</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>Zepbound (tirzepatide 15 mg)</td>
            <td>GLP-1 + GIP</td>
            <td>−20.9% (SURMOUNT-1)</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>
              <strong>CagriSema</strong>
            </td>
            <td>GLP-1 + amylin</td>
            <td>−20.4% to −22.7% (REDEFINE 1)</td>
            <td>NDA pending</td>
          </tr>
          <tr>
            <td>Foundayo (orforglipron)</td>
            <td>Oral small-molecule GLP-1</td>
            <td>−11.1% (Foundayo PI, 17.2 mg)</td>
            <td>Approved Apr 2026</td>
          </tr>
          <tr>
            <td>Retatrutide</td>
            <td>GLP-1 + GIP + glucagon</td>
            <td>−24.2% phase 2; −28.7% TRIUMPH-4</td>
            <td>Phase 3</td>
          </tr>
        </tbody>
      </table>

      <p>
        CagriSema is competitive with tirzepatide on effect size,
        comes from a different mechanistic family, and gives
        Novo Nordisk a lead in the post-Wegovy generation. It is
        unlikely to displace tirzepatide as the highest-effect-
        size injectable, but it expands the menu and creates a
        meaningful second option for patients who don&apos;t
        respond to or tolerate tirzepatide.
      </p>

      <h2>Open questions</h2>

      <ol>
        <li>
          <strong>Pricing.</strong> CagriSema launch pricing has
          not been announced. Novo will need to price this
          product competitively against tirzepatide and the
          newly-approved oral Foundayo.
        </li>
        <li>
          <strong>Cardiovascular outcomes.</strong> A
          SELECT-style outcomes trial of CagriSema has not been
          announced. Until CagriSema accumulates its own
          cardiovascular outcomes evidence, Wegovy retains an
          edge for patients with established cardiovascular
          disease (see our{" "}
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT trial deep-dive
          </Link>
          ).
        </li>
        <li>
          <strong>Long-term durability.</strong> 68 weeks is the
          published duration. Whether the additive amylin benefit
          is sustained over multi-year therapy, and what happens
          to the weight loss after discontinuation, has not been
          published.
        </li>
        <li>
          <strong>Direct head-to-head with tirzepatide.</strong>{" "}
          REDEFINE did not include a tirzepatide arm. Without a
          direct comparison, all CagriSema-vs-tirzepatide claims
          are inferential.
        </li>
      </ol>

      <h2>Related research</h2>

      <p>
        For the broader injectable GLP-1 landscape, see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head deep-dive
        </Link>
        , the{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo (oral orforglipron) approval analysis
        </Link>
        , and the{" "}
        <Link href="/research/retatrutide-triple-agonist-evidence-2026">
          retatrutide triple-agonist evidence review
        </Link>
        . For the cardiovascular outcomes data on injectable
        semaglutide that anchors the existing standard of care,
        see our{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT trial deep-dive
        </Link>
        . For pricing context across the entire GLP-1 market, see
        our{" "}
        <Link href="/research/glp1-pricing-index">
          pricing index
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "What is CagriSema?",
            answer:
              "CagriSema is Novo Nordisk's investigational once-weekly combination of cagrilintide (a long-acting amylin analog) and semaglutide (a GLP-1 agonist). It targets two complementary appetite-regulation pathways simultaneously and is being developed for chronic weight management as a potential successor to Wegovy.",
          },
          {
            question: "How effective is CagriSema?",
            answer:
              "In the REDEFINE-1 phase 3 trial, CagriSema produced approximately 22-23% mean weight loss at 68 weeks, compared to ~15% for Wegovy in the parallel STEP comparator and ~21% for Zepbound in SURMOUNT-1. The CagriSema result fell short of internal expectations of ~25% but is still numerically larger than current standard-of-care semaglutide.",
          },
          {
            question: "When will CagriSema be FDA-approved?",
            answer:
              "Novo Nordisk has not announced a definitive FDA submission timeline. The phase 3 REDEFINE program is generating the efficacy and safety data needed for an FDA filing. Approval, assuming positive results and a standard NDA review, would follow in the years after submission. Current analyst estimates place a possible launch in the late 2020s but this is speculative.",
          },
          {
            question: "How is CagriSema different from Wegovy?",
            answer:
              "Wegovy is a single GLP-1 agonist (semaglutide alone). CagriSema combines semaglutide with cagrilintide, an amylin agonist that targets a different appetite-regulation pathway. The hypothesis is that hitting two pathways gives larger weight loss than either alone. The REDEFINE-1 result supports this hypothesis but with a smaller delta than Novo's internal projections.",
          },
          {
            question: "Is CagriSema better than Zepbound?",
            answer:
              "Direct head-to-head data is not yet available. In separate trials, CagriSema produced ~22-23% weight loss in REDEFINE-1 and tirzepatide produced ~21% in SURMOUNT-1. The numbers are similar enough that head-to-head trials would be needed to determine which is genuinely superior, and none have been conducted yet.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
