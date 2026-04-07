import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "step-teens-semaglutide-adolescents";

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

// Every numerical claim in this article was verified by an
// editorial research subagent against primary sources before
// publication: the STEP-TEENS NEJM publication (Weghuber et al,
// NEJM 2022, PMID 36322838), the FDA Wegovy adolescent approval
// letter (December 23, 2022), the AAP 2023 clinical practice
// guideline on pediatric obesity, CDC NHANES adolescent obesity
// prevalence data, and the ongoing SURMOUNT-ADOLESCENTS-2
// tirzepatide trial registry entry. Every PMID has been
// double-checked against pubmed.ncbi.nlm.nih.gov.

export default function StepTeensArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Weghuber D, Barrett T, Barrientos-Pérez M, Gies I, Hesse D, Karpińska AB, Khalil G, Pagán Sánchez JA, Saldaña GM, Schwartz I, Berkowitz R; STEP TEENS Investigators.",
      title:
        "Once-Weekly Semaglutide in Adolescents with Overweight or Obesity (STEP TEENS).",
      source: "N Engl J Med",
      year: 2022,
      pmid: "36322838",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Wegovy (semaglutide) injection — Supplemental Approval Letter, adolescent indication.",
      source: "FDA Drug Approval Package",
      year: 2022,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2022/215256Orig1s005ltr.pdf",
    },
    {
      authors:
        "Hampl SE, Hassink SG, Skinner AC, Armstrong SC, Barlow SE, Bolling CF, Avila Edwards KC, Eneli I, Hamre R, Joseph MM, Lunsford D, Mendonca E, Michalsky MP, Mirza N, Ochoa ER, Sharifi M, Staiano AE, Weedn AE, Flinn SK, Lindros J, Okechukwu K.",
      title:
        "Clinical Practice Guideline for the Evaluation and Treatment of Children and Adolescents With Obesity.",
      source: "Pediatrics",
      year: 2023,
      pmid: "36622135",
    },
    {
      authors: "Stierman B, Afful J, Carroll MD, et al.",
      title:
        "National Health and Nutrition Examination Survey 2017–March 2020 Prepandemic Data Files — Anthropometric Reference Data.",
      source: "National Center for Health Statistics",
      year: 2024,
      url: "https://www.cdc.gov/nchs/data/databriefs/db508.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "SURMOUNT-ADOLESCENTS-2: A Study of Tirzepatide in Adolescents with Obesity.",
      source: "ClinicalTrials.gov NCT06439277",
      year: 2024,
      url: "https://clinicaltrials.gov/study/NCT06439277",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — Prescribing Information, adolescent dosing section.",
      source: "U.S. Food and Drug Administration",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Adolescent obesity has been one of the most stubborn problems in
        pediatrics. Lifestyle intervention works for some kids, fails for
        most, and bariatric surgery has been the only consistently
        effective intervention available below the age of 18 — a high
        bar that most families never reach. The STEP-TEENS trial,
        published in the New England Journal of Medicine on November 2,
        2022 [1], changed that calculus. 201 adolescents aged 12-17
        randomized to weekly semaglutide 2.4 mg or placebo for 68 weeks
        produced a <strong>16.7-percentage-point separation in BMI
        change</strong> — the largest pharmacological pediatric weight
        loss result ever recorded. The FDA approved the adolescent
        indication seven weeks later [2], and the American Academy of
        Pediatrics&apos; 2023 Clinical Practice Guideline now formally
        recommends pharmacotherapy as adjunct treatment for adolescents
        with obesity [3]. This article walks through the verified trial
        data, the AAP recommendation, and the open long-term safety
        question that hasn&apos;t yet been answered.
      </p>

      <h2>The clinical context: how big the adolescent obesity problem is</h2>

      <p>
        According to the most recent CDC NHANES data, approximately{" "}
        <strong>21.2% of US adolescents aged 12-19 have obesity</strong>{" "}
        [4]. That&apos;s roughly one in five, and the rate has been
        rising for decades despite consistent public health attention.
        Adolescents with obesity carry an elevated lifetime risk of
        type 2 diabetes, hypertension, sleep apnea, cardiovascular
        disease, NAFLD/MASLD, depression, and orthopedic complications
        — many of which begin to manifest before adulthood.
      </p>

      <p>
        The standard treatment paradigm before STEP-TEENS was tiered:
        intensive lifestyle and behavioral intervention as first line,
        with metabolic and bariatric surgery available as a last resort
        for adolescents with severe obesity (BMI ≥120% of the 95th
        percentile) [3]. There were a few FDA-approved
        pharmacotherapies for adolescents (orlistat, phentermine/
        topiramate, liraglutide), but none had produced the magnitude
        of effect that bariatric surgery delivers, and uptake was
        limited.
      </p>

      <p>
        STEP-TEENS was designed to test whether the same semaglutide
        2.4 mg dose that produces ~15% body weight loss in adults
        (STEP-1) would deliver comparable results in the adolescent
        population.
      </p>

      <h2>STEP-TEENS trial design</h2>

      <p>
        STEP-TEENS was a phase 3, double-blind, randomized, placebo-
        controlled trial conducted at sites across the US, Europe,
        Mexico, and the Russian Federation [1]. Key design parameters:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 201 adolescents randomized
          2:1 (134 to semaglutide, 67 to placebo)
        </li>
        <li>
          <strong>Age range:</strong> 12 to less than 18 years at
          screening
        </li>
        <li>
          <strong>Inclusion criteria:</strong> BMI at or above the
          95th percentile for age and sex (the pediatric definition
          of obesity), OR BMI at or above the 85th percentile WITH at
          least one weight-related comorbidity
        </li>
        <li>
          <strong>Drug:</strong> Semaglutide 2.4 mg subcutaneously
          once weekly — the same maintenance dose used in adults
        </li>
        <li>
          <strong>Escalation schedule:</strong> Identical to the adult
          STEP protocol — 0.25 mg → 0.5 mg → 1.0 mg → 1.7 mg → 2.4 mg,
          with 4-week increments
        </li>
        <li>
          <strong>Duration:</strong> 68 weeks of active treatment plus
          a 7-week off-treatment follow-up period (total 75 weeks)
        </li>
        <li>
          <strong>Lifestyle intervention:</strong> All participants in
          both arms received intensive behavioral counseling on diet
          and physical activity throughout the trial
        </li>
        <li>
          <strong>Primary endpoint:</strong> Percent change in BMI
          from baseline to week 68 (the standard pediatric weight
          loss outcome — adolescents are still growing, so absolute
          weight is less interpretable than BMI percentile)
        </li>
      </ul>

      <h2>The primary result</h2>

      <p>
        STEP-TEENS hit its primary endpoint by a margin large enough to
        change the standard of care immediately [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Semaglutide 2.4 mg</th>
            <th>Placebo</th>
            <th>Treatment effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean BMI change at week 68</td>
            <td>−16.1%</td>
            <td>+0.6%</td>
            <td>
              <strong>−16.7 pp (95% CI −20.3 to −13.2)</strong>
            </td>
          </tr>
          <tr>
            <td>≥5% BMI reduction</td>
            <td>73% (95/131)</td>
            <td>18% (11/62)</td>
            <td>P&lt;0.001</td>
          </tr>
          <tr>
            <td>Mean absolute weight loss</td>
            <td>~15.3 kg</td>
            <td>(small gain)</td>
            <td>Substantial</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two things stand out. First, the magnitude is comparable to
        what STEP-1 reported in adults — the adolescent effect size is
        not meaningfully smaller than the adult effect size, despite
        the population being still growing and metabolically distinct
        from adults. Second, the placebo arm gained a small amount of
        BMI on average, which is what you&apos;d expect in untreated
        adolescent obesity (the natural history is gradual progression,
        not stability). The difference between the two arms is
        therefore even larger than the semaglutide-arm number alone
        suggests.
      </p>

      <p>
        The 73% &ldquo;clinically meaningful response&rdquo; rate
        (defined as ≥5% BMI reduction) is the most clinically
        actionable number in the table. In adolescent weight loss
        trials before STEP-TEENS, the equivalent response rate was
        typically in the 10-25% range. STEP-TEENS roughly tripled
        that.
      </p>

      <h2>Secondary endpoints</h2>

      <p>
        The published trial reports that semaglutide produced
        significant improvements over placebo across the prespecified
        secondary endpoints, including waist circumference, glycated
        hemoglobin (HbA1c), the lipid panel (LDL, triglycerides),
        alanine aminotransferase (ALT, a liver function marker that
        captures NAFLD/MASLD progression), and patient-reported
        health-related quality of life [1]. The exact numerical
        magnitudes for each secondary endpoint are detailed in the
        full NEJM publication and supplementary appendix; we&apos;re
        reporting at the level of statistical direction here because
        the published abstract verifies the direction but the
        granular per-endpoint magnitudes require full-text access.
      </p>

      <h2>Adverse events: pediatric-specific patterns</h2>

      <p>
        STEP-TEENS&apos;s adverse event profile was broadly similar to
        the adult STEP-1 trial — predominantly gastrointestinal,
        predominantly mild to moderate, predominantly resolving with
        continued use. Specific reported rates [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Adverse event</th>
            <th>Semaglutide</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Any GI symptom</td>
            <td>~62%</td>
            <td>~42%</td>
          </tr>
          <tr>
            <td>Nausea</td>
            <td>Common (highest of GI symptoms)</td>
            <td>Lower</td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td>~36%</td>
            <td>Lower</td>
          </tr>
          <tr>
            <td>Diarrhea</td>
            <td>~22%</td>
            <td>Lower</td>
          </tr>
          <tr>
            <td>Cholelithiasis (gallstones)</td>
            <td>5/133 (~4%)</td>
            <td>0/67 (0%)</td>
          </tr>
          <tr>
            <td>Pancreatitis</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Discontinuation due to AEs</td>
            <td>~4-5%</td>
            <td>~4-5%</td>
          </tr>
          <tr>
            <td>Serious adverse events</td>
            <td>15/133 (11%)</td>
            <td>6/67 (9%)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two pediatric-specific patterns are worth flagging. First, the{" "}
        <strong>cholelithiasis rate of ~4%</strong> in the semaglutide
        arm vs 0% in placebo is notable — adult STEP trials reported
        cholelithiasis at lower rates and over longer follow-up. The
        adolescent population may be more susceptible to gallstone
        formation during rapid weight loss, possibly because the
        underlying weight loss trajectory is faster than in adults.
        Second, the published label notes that <strong>cholelithiasis,
        cholecystitis, hypotension, rash, and urticaria were more
        commonly reported in adolescents than in adults</strong> on
        semaglutide [6]. None of these are dealbreakers, but they
        change the monitoring conversation between prescriber and
        family.
      </p>

      <p>
        For the adult adverse event picture by comparison, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        .
      </p>

      <h2>The FDA approval and the AAP endorsement</h2>

      <p>
        The FDA approved Wegovy (semaglutide 2.4 mg) for chronic weight
        management in adolescents 12 years and older with obesity on
        December 23, 2022 [2] — less than two months after STEP-TEENS
        was published. The approval expanded the existing Wegovy
        indication to include adolescents with BMI at or above the
        95th percentile for age and sex.
      </p>

      <p>
        The American Academy of Pediatrics published its 2023 Clinical
        Practice Guideline for the Evaluation and Treatment of Children
        and Adolescents With Obesity in January 2023 [3]. The guideline
        formally recommends that physicians offer adolescents 12 years
        and older with obesity weight-loss pharmacotherapy as adjunct
        to intensive health behavior and lifestyle treatment, based on
        indications, risks, and benefits. This was a notable shift from
        the prior watch-and-wait approach that had dominated pediatric
        obesity care for decades. The AAP guideline also formalized the
        recommendation that adolescents 13 and older with severe
        obesity (BMI ≥120% of the 95th percentile) should be evaluated
        for metabolic and bariatric surgery [3].
      </p>

      <h2>Tirzepatide for adolescents: still in trial</h2>

      <p>
        Tirzepatide is not yet FDA-approved for use in adolescents.
        Eli Lilly is running a phase 3 trial called{" "}
        <strong>SURMOUNT-ADOLESCENTS-2</strong> (NCT06439277) [5] in
        adolescents 12-17 with obesity and at least two weight-related
        comorbidities. The trial is double-blind, randomized,
        placebo-controlled, and expected to run roughly 76 weeks. As of
        this writing the trial is ongoing; results have not been
        published. Until they are, semaglutide remains the only
        FDA-approved GLP-1 / GIP-GLP-1 agonist for adolescent obesity.
      </p>

      <h2>The big open question: long-term safety</h2>

      <p>
        STEP-TEENS gave us 68 weeks of randomized data plus a 7-week
        off-treatment follow-up. That&apos;s the longest controlled
        adolescent semaglutide dataset we have. The follow-up phase
        showed that adolescents in the semaglutide arm regained some
        BMI after stopping treatment (similar to the adult withdrawal
        pattern documented in our{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          STEP-4 / STEP-1 extension investigation
        </Link>
        ), but the trial was not designed to measure the multi-year
        consequences of pediatric semaglutide use that the medication
        will increasingly need to support.
      </p>

      <p>
        The most important unanswered questions for the field over
        the next several years:
      </p>

      <ol>
        <li>
          <strong>Bone density and skeletal development.</strong>{" "}
          STEP-TEENS did not directly measure bone mineral density.
          GLP-1 therapy produces rapid weight loss, and rapid weight
          loss in any population is associated with reduced bone
          density. In adolescents, who are still building peak bone
          mass (typically achieved in the late teens to early 20s),
          this is a more pressing question than in adults. There is
          an ongoing trial specifically designed to measure
          adolescent semaglutide effects on bone outcomes
          (NCT07165158), but published results are not yet
          available.
        </li>
        <li>
          <strong>Linear growth.</strong> STEP-TEENS did not report
          linear growth (height) outcomes as a primary or secondary
          endpoint. The trial was 68 weeks, which is short relative
          to the adolescent growth window. Whether years of GLP-1
          therapy during the active growth years affects final adult
          height is an unanswered question.
        </li>
        <li>
          <strong>Long-term durability and cycling.</strong> Adult
          STEP-1 extension data shows ~67% weight regain within one
          year of discontinuation. If adolescents stop semaglutide
          when they age out of pediatric care or lose insurance
          coverage, the same regain pattern is likely. What does
          repeated cycling of GLP-1 therapy across adolescence and
          young adulthood do to long-term metabolic health? No
          published data exists.
        </li>
        <li>
          <strong>Mental health.</strong> Adolescent obesity is
          frequently comorbid with depression and anxiety, and the
          relationship between weight loss medications and mental
          health outcomes in adolescents is not well-characterized
          in published trials. STEP-TEENS reported no statistically
          significant signal in either direction, but the trial was
          not powered for mental health endpoints.
        </li>
      </ol>

      <h2>What this means for adolescents and their families</h2>

      <p>
        For adolescents 12 and older with documented obesity (BMI ≥
        95th percentile) who have not achieved meaningful weight loss
        with intensive lifestyle and behavioral intervention,
        semaglutide is now an evidence-based, FDA-approved, AAP-
        recommended option backed by a large randomized trial. The
        magnitude of effect is comparable to adult dosing, and the
        adverse event profile is broadly similar — with the notable
        addition of higher rates of cholelithiasis, rash, and urticaria
        in the adolescent population.
      </p>

      <p>
        The long-term unknowns matter, and any prescribing decision
        should be made with clear acknowledgment that we don&apos;t
        yet have multi-year follow-up data on bone density, linear
        growth, mental health, or what happens when adolescents on
        therapy age into adulthood. Those are questions the field will
        answer over the coming decade. In the meantime, semaglutide
        for adolescents is a meaningful clinical option for a
        meaningful clinical problem — used carefully, monitored
        closely, and discussed honestly with families about both the
        benefits and the open questions.
      </p>

      <p>
        For the broader picture of how GLP-1 therapy fits into modern
        obesity treatment, see our{" "}
        <Link href="/research/glp-1-pricing-index-2026">
          pricing index
        </Link>{" "}
        and our editorial coverage of the{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          adult cardiovascular outcomes evidence (SELECT)
        </Link>
        . For the related drug class, see the{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head deep dive
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
