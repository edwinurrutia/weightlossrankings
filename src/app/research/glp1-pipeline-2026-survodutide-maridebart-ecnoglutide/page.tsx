import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "glp1-pipeline-2026-survodutide-maridebart-ecnoglutide";

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

// All clinical claims verified against PubMed primary sources or
// company investor releases:
// - Maridebart cafraglutide (MariTide): Jastreboff et al, NEJM 2025,
//   PMID 40549887, n=592, up to -16.2% weight loss at 52 weeks.
// - Ecnoglutide (SLIMMER): Lancet Diabetes & Endocrinology 2025,
//   PMID 40555243, n=664, up to -13.2% at 40 weeks.
// - Survodutide (SYNCHRONIZE): Boehringer Ingelheim phase 3 program
//   active, baseline characteristics published 2026 (PMIDs 41187967,
//   41216778). Phase 2 produced up to 19% weight loss.

export default function GlpPipelineArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Jastreboff AM, Ryan DH, Bays HE, Ebeling PR, Mathieu C, Frias JP, Davies M, le Roux CW, Cohen R, Kushner RF, Cosentino F, Akhmedov A, Mullins B, Saltus K, Lal A, Chao A, Skarbaliene J, Lokken K; MariTide Phase 2 Trial Investigators.",
      title:
        "Once-Monthly Maridebart Cafraglutide for the Treatment of Obesity — A Phase 2 Trial.",
      source: "N Engl J Med",
      year: 2025,
      pmid: "40549887",
    },
    {
      authors:
        "Ji L, Jiang H, Bi Y, Su Q, Tang L, Yu X, Tian H, Cheng Z, Xie K, Yan J, Wang J, Mu Y, Liu X, Cao S, Tian X, Lou Z, Yu D, Wei H, Yang G; SLIMMER Investigators.",
      title:
        "Efficacy and safety of a biased GLP-1 receptor agonist ecnoglutide in adults with overweight or obesity: a multicentre, randomised, double-blind, placebo-controlled, phase 3 trial.",
      source: "Lancet Diabetes & Endocrinology",
      year: 2025,
      pmid: "40555243",
    },
    {
      authors:
        "Wharton S, Roux CWL, Pedersen SD, et al.",
      title:
        "Baseline characteristics in the SYNCHRONIZE-2 randomized phase 3 trial of survodutide, a glucagon receptor/GLP-1 receptor dual agonist, for obesity in people with type 2 diabetes.",
      source: "Diabetes, Obesity and Metabolism",
      year: 2026,
      pmid: "41216778",
    },
    {
      authors:
        "le Roux CW, Wadden TA, Aronne LJ, et al.",
      title:
        "Survodutide for treatment of obesity: Baseline characteristics of participants in a randomized, double-blind, placebo-controlled, phase 3 trial (SYNCHRONIZE-1).",
      source: "Diabetes, Obesity and Metabolism",
      year: 2026,
      pmid: "41187967",
    },
    {
      authors:
        "le Roux CW, Steen O, Lucas KJ, Startseva E, Unseld A, Hennige AM, Kahn SE, Plutzky J, Bracher F, Hennings J.",
      title:
        "Glucagon and GLP-1 receptor dual agonist survodutide for obesity: a randomised, double-blind, placebo-controlled, dose-finding phase 2 trial.",
      source: "Lancet Diabetes & Endocrinology",
      year: 2024,
      pmid: "38437846",
    },
    {
      authors:
        "Sanyal AJ, Bedossa P, Fraessdorf M, Neff GW, Lawitz E, Bugianesi E, Anstee QM, Hussain SA, Newsome PN, Ratziu V, Hosseini-Tabatabaei A, Schattenberg JM, Noureddin M, Alkhouri N, Younes R, Kühnast S, Hennige AM, Hannich JT, Hupfer C; SYNCHRONIZE-MASH Investigators.",
      title:
        "A Phase 2 Randomized Trial of Survodutide in MASH and Liver Fibrosis.",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38847460",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        The US weight-loss drug market in early 2026 is dominated by
        Eli Lilly (Zepbound, Mounjaro, and now Foundayo) and Novo
        Nordisk (Wegovy, Ozempic, and the pending CagriSema). But the
        pipeline behind those four products is bigger than most
        patients realize. This article walks through the verified
        published evidence for the three most-watched late-stage
        challenger GLP-1 drugs that <em>aren&apos;t</em> being made by
        Lilly or Novo: <strong>survodutide</strong> (Boehringer
        Ingelheim / Zealand Pharma), <strong>maridebart cafraglutide
        (MariTide)</strong> from Amgen, and <strong>ecnoglutide</strong>{" "}
        from Sciwind (licensed to Pfizer for the Chinese market). All
        three have produced peer-reviewed phase 2 or phase 3 results
        and at least one has already received regulatory approval — in
        a non-US market. Here&apos;s what the actual data shows.
      </p>

      <h2>Why a non-Lilly, non-Novo pipeline matters for patients</h2>

      <p>
        For most of the GLP-1 era, patients have had two effective
        injectable choices (Wegovy and Zepbound) and one effective
        oral (now Foundayo). Pricing has been high, supply has been
        constrained, and the entire conversation about access has
        revolved around two manufacturers. A genuinely competitive
        pipeline matters because:
      </p>

      <ol>
        <li>
          Three or four real injectable competitors with overlapping
          mechanisms produces price competition in a way two cannot.
        </li>
        <li>
          Different mechanisms (e.g., GLP-1 + glucagon vs GLP-1 alone
          vs GLP-1 + amylin) give patients who don&apos;t respond to
          or tolerate one mechanism a meaningfully different second
          option, not just a slightly different molecule from the same
          family.
        </li>
        <li>
          Non-US-headquartered programs (Boehringer in Germany,
          Sciwind in China) reduce the supply-chain risk concentration
          that has been a quiet contributor to the multi-year US
          shortage cycles.
        </li>
      </ol>

      <h2>1. Survodutide (Boehringer Ingelheim + Zealand Pharma)</h2>

      <p>
        Survodutide (BI 456906) is a glucagon receptor + GLP-1
        receptor dual agonist developed by Boehringer Ingelheim in
        partnership with Zealand Pharma. It activates both the
        GLP-1 receptor (driving the standard appetite suppression
        and gastric emptying delay) and the glucagon receptor
        (driving increased energy expenditure and lipolysis). The
        glucagon arm is the same mechanistic addition that makes
        retatrutide&apos;s effect size larger than tirzepatide&apos;s
        — survodutide is a dual agonist version of that idea
        (without the GIP arm).
      </p>

      <h3>Phase 2 evidence</h3>

      <p>
        The phase 2 dose-finding trial (le Roux et al., Lancet
        Diabetes & Endocrinology 2024 [5]) tested multiple
        survodutide dose levels in adults with obesity. The headline
        result was up to <strong>~19% mean weight loss</strong> at
        the highest dose at 46 weeks, with a roughly linear
        dose-response curve and a GI adverse-event profile broadly
        consistent with the GLP-1 class. The 19% magnitude is
        meaningfully larger than what semaglutide produces at the
        Wegovy dose and approximately matches what tirzepatide
        produces at 15 mg, supporting the case for moving directly
        to phase 3 with the higher doses.
      </p>

      <p>
        Survodutide also has a separate phase 2 trial in MASH (the
        new name for NASH — metabolic dysfunction-associated
        steatohepatitis) published in NEJM 2024 (Sanyal et al. [6]),
        with positive liver-fibrosis and hepatic-fat results. This
        opens an additional indication path independent of obesity.
      </p>

      <h3>SYNCHRONIZE phase 3 program</h3>

      <p>
        Boehringer Ingelheim has launched the SYNCHRONIZE phase 3
        program — three large registrational trials that together
        cover obesity in non-diabetic adults, obesity in adults with
        type 2 diabetes, and a long-term cardiovascular outcomes
        study:
      </p>

      <ul>
        <li>
          <strong>SYNCHRONIZE-1</strong> (NCT06066515): obesity (BMI
          ≥30) or overweight (BMI ≥27 with comorbidities) in patients
          without type 2 diabetes. Baseline characteristics published
          in Diabetes, Obesity and Metabolism 2026 [4].
        </li>
        <li>
          <strong>SYNCHRONIZE-2</strong> (NCT06066528): same
          inclusion criteria but in adults with type 2 diabetes
          (HbA1c ≥6.5%, &lt;10%). Baseline characteristics also
          published in DOM 2026 [3].
        </li>
        <li>
          <strong>SYNCHRONIZE-CVOT</strong>: long-term cardiovascular
          outcomes trial in patients with established CV disease,
          chronic kidney disease, or major CV risk factors.
        </li>
      </ul>

      <p>
        The SYNCHRONIZE-CVOT design is the most strategically
        important of the three because it positions survodutide for a
        SELECT-style cardiovascular indication if the trial reads
        out positive — that&apos;s the indication that has driven
        the most insurance coverage expansion for semaglutide. As of
        this writing, no SYNCHRONIZE trial has reported efficacy
        data; only baseline characteristics. We&apos;ll update this
        article when topline results are available.
      </p>

      <h2>2. Maridebart cafraglutide (MariTide, Amgen)</h2>

      <p>
        Maridebart cafraglutide — branded MariTide in Amgen
        communications — is one of the most mechanistically
        unusual entries in the late-stage pipeline. It is a
        once-monthly subcutaneous injection that combines a GLP-1
        receptor <em>agonist</em> with a GIP receptor{" "}
        <em>antagonist</em>. That&apos;s the opposite of
        tirzepatide, which agonizes both GLP-1 and GIP. The
        rationale is that there is debate about whether GIP receptor
        agonism or antagonism produces better metabolic outcomes,
        and Amgen is testing the antagonist hypothesis at scale.
      </p>

      <p>
        The other distinguishing feature is dosing frequency —
        once a month — which would be a meaningful real-world
        adherence advantage if the efficacy held up.
      </p>

      <h3>Phase 2 trial (NEJM 2025)</h3>

      <p>
        Jastreboff et al. published the full phase 2 results in
        NEJM in June 2025 [1]. Verified design and outcomes:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 592 participants (465 in
          the obesity cohort, 127 in the obesity + type 2 diabetes
          cohort)
        </li>
        <li>
          <strong>Doses tested:</strong> 140 mg, 280 mg, and 420 mg
          subcutaneously, given every 4 weeks or every 8 weeks,
          with and without dose escalation
        </li>
        <li>
          <strong>Duration:</strong> 52 weeks
        </li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Population</th>
            <th>MariTide weight loss range</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Obesity (no diabetes)</td>
            <td>−12.3% to −16.2% (95% CI −18.9 to −13.5 at top dose)</td>
            <td>−2.5%</td>
          </tr>
          <tr>
            <td>Obesity + T2D</td>
            <td>up to ~17%</td>
            <td>−1.4%</td>
          </tr>
        </tbody>
      </table>

      <p>
        At the highest dose, MariTide produced approximately 16%
        mean weight loss at 52 weeks in the non-diabetic obesity
        cohort and 17% in the T2D cohort. These are substantial
        numbers but slightly lower than the topline that some
        early Amgen guidance had suggested, and the stock dropped
        on the readout — a similar dynamic to the CagriSema
        REDEFINE 1 reaction. MariTide also produced an HbA1c
        reduction of up to 2.2% in the T2D cohort and across-the-
        board cardiometabolic improvements (waist circumference,
        blood pressure, hs-CRP, lipid panel).
      </p>

      <h3>Phase 3 program</h3>

      <p>
        Amgen has stated it expects to initiate phase 3 outcomes
        trials in atherosclerotic cardiovascular disease, heart
        failure, and obstructive sleep apnea in the 2025 timeframe.
        Phase 3 weight management trials are also planned. None
        have read out as of this writing.
      </p>

      <h2>3. Ecnoglutide (Sciwind / Pfizer)</h2>

      <p>
        Ecnoglutide is a biased GLP-1 receptor agonist developed
        by Sciwind Biosciences in China. The &ldquo;biased&rdquo;
        descriptor refers to a pharmacological property:
        ecnoglutide preferentially activates the cAMP signaling
        arm downstream of the GLP-1 receptor while producing less
        β-arrestin recruitment. The hypothesis is that cAMP-biased
        signaling produces the desired metabolic effects (insulin
        secretion, appetite suppression) with less of the
        β-arrestin-mediated effects associated with GI tolerability
        problems and possibly receptor desensitization. Whether
        biased agonism actually delivers better real-world
        outcomes is still an open scientific question, but the
        SLIMMER phase 3 trial gives us the first large-scale
        clinical answer.
      </p>

      <h3>SLIMMER phase 3 trial (Lancet Diabetes & Endocrinology 2025)</h3>

      <p>
        Ji et al. published the SLIMMER phase 3 results in Lancet
        Diabetes & Endocrinology in 2025 [2]. Verified design and
        outcomes:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 664 adults randomized
          across 36 medical centers in China
        </li>
        <li>
          <strong>Population:</strong> overweight or obesity, no
          type 1 or type 2 diabetes
        </li>
        <li>
          <strong>Doses tested:</strong> ecnoglutide 1.2 mg, 1.8
          mg, 2.4 mg subcutaneously weekly vs volume-matched
          placebo
        </li>
        <li>
          <strong>Duration:</strong> 40 weeks (with extended
          analysis to 48 weeks)
        </li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Outcome at week 40</th>
            <th>Placebo</th>
            <th>1.2 mg</th>
            <th>1.8 mg</th>
            <th>2.4 mg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LS-mean % weight change</td>
            <td>+0.1%</td>
            <td>−9.1%</td>
            <td>−10.9%</td>
            <td>−13.2%</td>
          </tr>
          <tr>
            <td>≥5% weight loss</td>
            <td>16%</td>
            <td>77%</td>
            <td>84%</td>
            <td>87%</td>
          </tr>
        </tbody>
      </table>

      <p>
        At the extended 48-week timepoint, the highest-dose group
        averaged more than 15% weight loss. This puts ecnoglutide
        in the same effect-size band as injectable semaglutide
        2.4 mg (Wegovy) — comparable, not superior. The headline
        story is therefore not that ecnoglutide is more effective
        than what&apos;s already on the US market, but that{" "}
        <strong>it&apos;s a credible non-Western, non-Lilly,
        non-Novo manufacturer producing a phase-3-validated
        Wegovy-class drug</strong>. That matters for global pricing
        competition and supply chain diversity.
      </p>

      <h3>Regulatory status and Pfizer licensing</h3>

      <p>
        Sciwind has filed ecnoglutide for approval in China for
        both type 2 diabetes and obesity. The drug received
        regulatory approval from China&apos;s NMPA for chronic
        weight management. In a separately announced 2026
        agreement, <strong>Pfizer licensed the mainland China
        commercialization rights</strong> to ecnoglutide
        (marketed as Xianweiying in China), giving Pfizer its
        first GLP-1 commercial product after the company shut
        down its own internal danuglipron program. There is no
        US filing for ecnoglutide as of this writing, and a
        US-population phase 3 trial would likely be required for
        FDA approval given the Chinese-only enrollment in
        SLIMMER.
      </p>

      <h2>How the three pipeline drugs compare</h2>

      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Mechanism</th>
            <th>Best published weight loss</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Survodutide</td>
            <td>GLP-1 + glucagon dual agonist</td>
            <td>~19% (phase 2)</td>
            <td>Phase 3 (SYNCHRONIZE active)</td>
          </tr>
          <tr>
            <td>MariTide</td>
            <td>GLP-1 agonist + GIP antagonist (monthly)</td>
            <td>−16.2% (phase 2 NEJM 2025)</td>
            <td>Phase 3 planned</td>
          </tr>
          <tr>
            <td>Ecnoglutide</td>
            <td>cAMP-biased GLP-1 agonist</td>
            <td>−13.2% (40 wk) / &gt;15% (48 wk)</td>
            <td>Phase 3 done; China-approved</td>
          </tr>
        </tbody>
      </table>

      <p>
        For comparison with the approved and near-approved drugs:
        Wegovy −14.9%, Zepbound −20.9%, Foundayo −11.1% (17.2 mg labeled max), CagriSema
        −22.7%, and retatrutide phase 3 readout −28.7% at the
        highest dose. The pipeline drugs in this article are
        clustering in the same effect-size band as the approved
        injectables, which means the differentiation will come
        from <em>mechanism diversity</em>, <em>dosing frequency</em>{" "}
        (MariTide&apos;s monthly schedule), and{" "}
        <em>manufacturer/supply diversity</em>, not from raw
        weight-loss magnitude.
      </p>

      <h2>What this means for patients in 2026 and 2027</h2>

      <ol>
        <li>
          <strong>None of these three are FDA-approved for
          obesity in the US yet.</strong> Survodutide and MariTide
          are in or entering phase 3; ecnoglutide has Chinese
          approval but no US filing. Patients should not expect to
          access any of them through US prescribers in the near
          term unless they are enrolled in a clinical trial.
        </li>
        <li>
          <strong>Compounding pharmacies cannot legally compound
          drugs that are still investigational</strong> unless they
          are on an FDA bulk substances list, which none of these
          three are. Any &ldquo;compounded survodutide&rdquo; or
          &ldquo;compounded MariTide&rdquo; offered by a telehealth
          provider would be a regulatory red flag.
        </li>
        <li>
          <strong>The competitive landscape for the existing
          approved drugs will get more interesting</strong> as
          phase 3 readouts arrive over the next 12-24 months.
          Pricing pressure on Wegovy, Zepbound, and Foundayo is
          likely to follow.
        </li>
        <li>
          <strong>Mechanism diversity is the bigger near-term
          story.</strong> Patients who don&apos;t tolerate or
          don&apos;t respond to Wegovy, Zepbound, or Foundayo
          today will have meaningfully different mechanistic
          options to try in the second half of the decade.
        </li>
      </ol>

      <h2>Open questions</h2>

      <ol>
        <li>
          <strong>Will SYNCHRONIZE replicate the phase 2 19%
          number?</strong> Phase 3 trials in obesity often produce
          slightly smaller mean weight loss than phase 2 dose-
          finding work because of broader populations and longer
          duration. Survodutide&apos;s phase 3 magnitude is the
          single biggest open question for the non-Lilly/Novo
          pipeline.
        </li>
        <li>
          <strong>Does monthly MariTide dosing actually improve
          adherence?</strong> Real-world adherence to weekly
          injectables drops sharply after the first 6 months. A
          monthly schedule should help, but the trial-to-real-
          world translation has not been measured.
        </li>
        <li>
          <strong>Will ecnoglutide come to the US?</strong>{" "}
          Sciwind would need to either run a US phase 3 trial or
          partner with a US-headquartered company to clear FDA
          requirements. Pfizer&apos;s involvement on the
          commercialization side may shape this decision.
        </li>
      </ol>

      <h2>Related research</h2>

      <p>
        For the approved-drug landscape that these pipeline drugs
        are competing against, see our deep-dives on{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo (orforglipron)
        </Link>
        ,{" "}
        <Link href="/research/cagrisema-redefine-trial-results-2026">
          CagriSema
        </Link>
        ,{" "}
        <Link href="/research/retatrutide-triple-agonist-evidence-2026">
          retatrutide
        </Link>
        , and the{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head
        </Link>
        . For the cardiovascular outcomes evidence anchoring the
        existing standard of care, see our{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT trial deep-dive
        </Link>
        . For pricing context, see our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
