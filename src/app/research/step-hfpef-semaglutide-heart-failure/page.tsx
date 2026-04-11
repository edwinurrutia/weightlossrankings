import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "step-hfpef-semaglutide-heart-failure";

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

// Every clinical claim in this article was verified by an editorial
// research subagent against the actual PubMed records before publication.
// Primary STEP-HFpEF citations: PMID 37622681 (Kosiborod NEJM 2023),
// PMID 38587233 (Kosiborod NEJM 2024 STEP-HFpEF DM), PMID 38599221
// (pooled Lancet 2024). SGLT2 comparator trials: EMPEROR-Preserved
// PMID 34449189 (Anker NEJM 2021), DELIVER PMID 36027570 (Solomon
// NEJM 2022).

export default function StepHfpefArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Kosiborod MN, Abildstrøm SZ, Borlaug BA, Butler J, Rasmussen S, Davies M, Hovingh GK, Kitzman DW, Lindegaard ML, Møller DV, Shah SJ, Treppendahl MB, Verma S, Abhayaratna W, Ahmed FZ, Chopra V, Ezekowitz J, Fu M, Ito H, Lelonek M, Melenovsky V, Merkely B, Núñez J, Perna E, Schou M, Senni M, Sharma K, Van der Meer P, von Lewinski D, Wolf D, Petrie MC; STEP-HFpEF Trial Committees and Investigators.",
      title:
        "Semaglutide in Patients with Heart Failure with Preserved Ejection Fraction and Obesity.",
      source: "N Engl J Med",
      year: 2023,
      pmid: "37622681",
    },
    {
      authors:
        "Kosiborod MN, Petrie MC, Borlaug BA, Butler J, Davies MJ, Hovingh GK, Kitzman DW, Møller DV, Treppendahl MB, Verma S, Jensen TJ, Liisberg K, Lindegaard ML, Abhayaratna W, Ahmed FZ, Ben-Gal T, Chopra V, Ezekowitz JA, Fu M, Ito H, Lelonek M, Melenovský V, Merkely B, Núñez J, Perna ER, Schou M, Senni M, Sharma K, van der Meer P, von Lewinski D, Wolf D, Shah SJ; STEP-HFpEF DM Trial Committees and Investigators.",
      title:
        "Semaglutide in Patients with Obesity-Related Heart Failure and Type 2 Diabetes (STEP-HFpEF DM).",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38587233",
    },
    {
      authors:
        "Butler J, Shah SJ, Petrie MC, Borlaug BA, Abildstrøm SZ, Davies MJ, Hovingh GK, Kitzman DW, Møller DV, Verma S, Einfeldt MN, Lindegaard ML, Rasmussen S, Abhayaratna W, Ahmed FZ, Ben Gal T, Chopra V, Ezekowitz JA, Fu M, Ito H, Lelonek M, Melenovský V, Merkely B, Núñez J, Perna ER, Schou M, Senni M, Sharma K, van der Meer P, von Lewinski D, Wolf D, Kosiborod MN; STEP-HFpEF Trial Committees and Investigators.",
      title:
        "Semaglutide versus placebo in people with obesity-related heart failure with preserved ejection fraction: a pooled analysis of the STEP-HFpEF and STEP-HFpEF DM randomised trials.",
      source: "Lancet",
      year: 2024,
      pmid: "38599221",
    },
    {
      authors:
        "Anker SD, Butler J, Filippatos G, Ferreira JP, Bocchi E, Böhm M, Brunner-La Rocca HP, Choi DJ, Chopra V, Chuquiure-Valenzuela E, Giannetti N, Gomez-Mesa JE, Janssens S, Januzzi JL, Gonzalez-Juanatey JR, Merkely B, Nicholls SJ, Perrone SV, Piña IL, Ponikowski P, Senni M, Sim D, Spinar J, Squire I, Taddei S, Tsutsui H, Verma S, Vinereanu D, Zhang J, Carson P, Lam CSP, Marx N, Zeller C, Sattar N, Jamal W, Schnaidt S, Schnee JM, Brueckmann M, Pocock SJ, Zannad F, Packer M; EMPEROR-Preserved Trial Investigators.",
      title:
        "Empagliflozin in Heart Failure with a Preserved Ejection Fraction.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "34449189",
    },
    {
      authors:
        "Solomon SD, McMurray JJV, Claggett B, de Boer RA, DeMets D, Hernandez AF, Inzucchi SE, Kosiborod MN, Lam CSP, Martinez F, Shah SJ, Desai AS, Jhund PS, Belohlavek J, Chiang CE, Borleffs CJW, Comin-Colet J, Dobreanu D, Drozdz J, Fang JC, Alcocer-Gamba MA, Al Habeeb W, Han Y, Cabrera Honorio JW, Janssens SP, Katova T, Kitakaze M, Merkely B, O'Meara E, Saraiva JFK, Tereshchenko SN, Thierer J, Vaduganathan M, Vardeny O, Verma S, Pham VN, Wilderäng U, Zaozerska N, Bachus E, Lindholm D, Petersson M, Langkilde AM; DELIVER Trial Committees and Investigators.",
      title:
        "Dapagliflozin in Heart Failure with Mildly Reduced or Preserved Ejection Fraction.",
      source: "N Engl J Med",
      year: 2022,
      pmid: "36027570",
    },
    {
      authors:
        "Pfeffer MA, Claggett B, Assmann SF, Boineau R, Anand IS, Clausell N, Desai AS, Diaz R, Fleg JL, Gordeev I, Heitner JF, Lewis EF, O'Meara E, Rouleau JL, Probstfield JL, Shaburishvili T, Shah SJ, Solomon SD, Sweitzer NK, McKinlay SM, Pitt B.",
      title:
        "Regional variation in patients and outcomes in the Treatment of Preserved Cardiac Function Heart Failure with an Aldosterone Antagonist (TOPCAT) trial.",
      source: "Circulation",
      year: 2015,
      pmid: "25406305",
    },
    {
      authors:
        "Borlaug BA, Reddy YNV, Braun A, Sorimachi H, Omar M, Popovic D, Alogna A, Jensen MD, Carter R.",
      title:
        "Cardiac and Metabolic Effects of Semaglutide in Heart Failure with Preserved Ejection Fraction.",
      source: "Circulation",
      year: 2024,
      pmid: "38583923",
    },
    {
      authors:
        "Heidenreich PA, Bozkurt B, Aguilar D, Allen LA, Byun JJ, Colvin MM, Deswal A, Drazner MH, Dunlay SM, Evers LR, Fang JC, Fedson SE, Fonarow GC, Hayek SS, Hernandez AF, Khazanie P, Kittleson MM, Lee CS, Link MS, Milano CA, Nnacheta LC, Sandhu AT, Stevenson LW, Vardeny O, Vest AR, Yancy CW.",
      title:
        "2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines.",
      source: "Circulation",
      year: 2022,
      pmid: "35363499",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        For decades, heart failure with preserved ejection fraction
        (HFpEF) was the heart failure phenotype with no
        disease-modifying therapy. Trials of ACE inhibitors, ARBs,
        beta blockers, and mineralocorticoid receptor antagonists
        either failed outright or produced equivocal results in this
        population [6, 8]. The SGLT2 inhibitors changed that with
        EMPEROR-Preserved (2021) [4] and DELIVER (2022) [5]. Then in
        2023, the STEP-HFpEF trial published in NEJM showed that
        <Link href="/drugs/semaglutide">semaglutide</Link> 2.4 mg in patients with HFpEF and obesity
        improved both heart failure symptoms and functional capacity
        on top of producing meaningful weight loss [1]. STEP-HFpEF
        DM extended that finding to patients who also have type 2
        diabetes [2], and the pooled Lancet analysis confirmed the
        signal across the full 1,145-patient dataset [3]. This
        article walks through the verified trial data, what
        semaglutide actually changes in the obesity-HFpEF phenotype,
        and where it fits alongside the SGLT2 inhibitors in modern
        HFpEF care.
      </p>

      <h2>What is HFpEF and why is the obese phenotype different</h2>

      <p>
        Heart failure with preserved ejection fraction is the
        clinical syndrome of heart failure (shortness of breath,
        exertional intolerance, congestion) in patients whose left
        ventricular ejection fraction is preserved (LVEF ≥50%, by
        the most common definition). It accounts for roughly half
        of all heart failure cases in the US and disproportionately
        affects older adults, women, and patients with metabolic
        syndrome [8]. The pathophysiology is heterogeneous —
        diastolic stiffness, systemic inflammation, microvascular
        dysfunction, and cardiometabolic comorbidities all
        contribute — which is one reason the trial evidence has
        historically been so disappointing.
      </p>

      <p>
        The obesity-HFpEF phenotype is increasingly recognized as a
        distinct subgroup. These patients tend to have higher
        natriuretic peptide levels for their LV filling pressures,
        more inflammation, and a strong link between adipose tissue
        biology and the heart failure syndrome itself. STEP-HFpEF
        was specifically designed to test whether targeting the
        weight and inflammation axis with semaglutide would improve
        symptoms and function in this phenotype.
      </p>

      <h2>STEP-HFpEF (non-diabetic) trial design</h2>

      <p>
        The STEP-HFpEF trial (Kosiborod et al., NEJM 2023) was a
        phase 3 randomized, double-blind, placebo-controlled trial
        in patients with HFpEF and obesity who did not have type 2
        diabetes [1]. Verified design parameters:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 529 randomized (264
          semaglutide, 265 placebo)
        </li>
        <li>
          <strong>Population:</strong> LVEF ≥45%, BMI ≥30 kg/m²,
          NYHA class II-IV, structural heart disease findings, no
          diabetes
        </li>
        <li>
          <strong>Drug:</strong> Semaglutide 2.4 mg subcutaneously
          once weekly (the <Link href="/drugs/wegovy">Wegovy</Link> weight-management dose)
        </li>
        <li>
          <strong>Duration:</strong> 52 weeks of active treatment
        </li>
        <li>
          <strong>Dual primary endpoints:</strong> change in the
          Kansas City Cardiomyopathy Questionnaire Clinical Summary
          Score (KCCQ-CSS — a validated patient-reported HF symptom
          and quality-of-life measure), and percentage change in
          body weight, both at week 52
        </li>
      </ul>

      <h2>The STEP-HFpEF results</h2>

      <p>
        STEP-HFpEF hit both primary endpoints decisively [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Outcome at 52 weeks</th>
            <th>Semaglutide 2.4 mg</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>KCCQ-CSS change (points)</td>
            <td>+16.6</td>
            <td>+8.7</td>
          </tr>
          <tr>
            <td>Body weight change (%)</td>
            <td>−13.3%</td>
            <td>−2.6%</td>
          </tr>
          <tr>
            <td>6-minute walk distance (m), pooled STEP-HFpEF + STEP-HFpEF DM (Butler 2024 Lancet [3])</td>
            <td colSpan={2}>+17.1 m treatment difference (95% CI 9.2–25.0, P&lt;0.0001)</td>
          </tr>
          <tr>
            <td>NT-proBNP (% change from baseline)</td>
            <td>−20.9%</td>
            <td>−5.3%</td>
          </tr>
        </tbody>
      </table>

      <p>
        The estimated treatment difference for KCCQ-CSS was about
        7.8 points in favor of semaglutide. For context, a
        clinically meaningful change on KCCQ-CSS is typically
        considered ≥5 points, and a change of ≥10 points is
        considered large. The semaglutide-vs-placebo difference of
        ~8 points is therefore substantially larger than the
        minimum clinically important difference and translates to
        meaningful symptom improvement for patients [1].
      </p>

      <p>
        The 6-minute walk distance improvement of 17 meters is
        also meaningful for this population — these are patients
        whose exercise capacity is severely limited by HFpEF, and
        a 17-meter improvement on a standardized walk test
        translates to real-world functional gain.
      </p>

      <h2>Adverse events: better than expected</h2>

      <p>
        The most striking safety finding across the STEP-HFpEF program
        is that serious adverse events were <em>lower</em> in the
        semaglutide arm than in placebo. In the Butler 2024 pooled
        Lancet analysis [3] of 1,145 patients, there were 161 serious
        adverse events with semaglutide vs 301 with placebo —
        approximately a 50% reduction in SAE counts despite the
        well-known GI tolerability profile of the drug. Discontinuation
        due to adverse events was higher with semaglutide (driven
        predominantly by the expected GI side-effect profile), but
        discontinuations specifically due to serious adverse events
        were not increased by semaglutide.
      </p>

      <p>
        In other words: in this population, the GI tolerability
        problems that drive standard semaglutide discontinuation
        were offset at the &ldquo;serious AE&rdquo; level by the
        cardiac improvements semaglutide produced. That&apos;s an
        unusual safety profile and one of the reasons cardiologists
        took the trial seriously.
      </p>

      <h2>STEP-HFpEF DM: replicating the result in T2D patients</h2>

      <p>
        STEP-HFpEF DM (Kosiborod et al., NEJM 2024) replicated the
        STEP-HFpEF design in patients who also had type 2 diabetes
        — a population the original trial had specifically excluded
        [2]. Verified results from the published abstract:
      </p>

      <table>
        <thead>
          <tr>
            <th>Outcome at 52 weeks</th>
            <th>Semaglutide</th>
            <th>Placebo</th>
            <th>Treatment difference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>n</td>
            <td>310</td>
            <td>306</td>
            <td>—</td>
          </tr>
          <tr>
            <td>KCCQ-CSS change</td>
            <td>+13.7</td>
            <td>+6.4</td>
            <td>+7.3 (95% CI 4.1–10.4, P&lt;0.001)</td>
          </tr>
          <tr>
            <td>Body weight % change</td>
            <td>−9.8%</td>
            <td>−3.4%</td>
            <td>−6.4 pp (95% CI −7.6 to −5.2, P&lt;0.001)</td>
          </tr>
        </tbody>
      </table>

      <p>
        The KCCQ benefit replicated cleanly. The body weight effect
        was somewhat smaller than in the non-diabetic STEP-HFpEF
        trial, which is consistent with the broader pattern that
        patients with type 2 diabetes typically lose less weight on
        semaglutide than patients without diabetes — but the
        symptom improvement is essentially the same magnitude.
      </p>

      <h2>The pooled analysis</h2>

      <p>
        Butler et al. published the pooled analysis of both STEP-HFpEF
        trials in The Lancet in 2024 [3]. Across 1,145 patients
        (573 semaglutide, 572 placebo), the confirmatory secondary
        endpoints were:
      </p>

      <ul>
        <li>
          <strong>6-minute walk distance:</strong> +17.1 m (95% CI
          9.2–25.0, P&lt;0.0001)
        </li>
        <li>
          <strong>Hierarchical composite (win ratio):</strong> 1.65
          (95% CI 1.42–1.91, P&lt;0.0001) — this composite combines
          death, HF events, KCCQ change, and walk distance change
          using a hierarchical comparison
        </li>
        <li>
          <strong>C-reactive protein (CRP) ratio:</strong> 0.64
          (95% CI 0.56–0.72, P&lt;0.0001) — semaglutide reduced
          systemic inflammation by ~36% relative to placebo
        </li>
      </ul>

      <p>
        The CRP reduction is mechanistically informative. One
        leading hypothesis for how semaglutide improves HFpEF is
        that it reduces the systemic and adipose-tissue
        inflammation that drives the obese-HFpEF phenotype. The
        magnitude of CRP reduction in the pooled dataset is
        consistent with that hypothesis, and supplementary
        cardiac-mechanics work (Borlaug et al., Circulation 2024)
        documented favorable effects on diastolic function and
        filling pressures in a smaller mechanistic substudy [7].
      </p>

      <h2>How STEP-HFpEF compares to the SGLT2 inhibitor trials</h2>

      <p>
        Two large SGLT2 inhibitor trials established the modern
        baseline for HFpEF therapy before STEP-HFpEF:
      </p>

      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Drug</th>
            <th>n</th>
            <th>Primary endpoint</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMPEROR-Preserved [4]</td>
            <td>Empagliflozin 10 mg</td>
            <td>5,988</td>
            <td>CV death or HF hospitalization</td>
            <td>HR 0.79 (95% CI 0.69–0.90)</td>
          </tr>
          <tr>
            <td>DELIVER [5]</td>
            <td>Dapagliflozin 10 mg</td>
            <td>6,263</td>
            <td>Worsening HF or CV death</td>
            <td>HR 0.82 (95% CI 0.73–0.92)</td>
          </tr>
          <tr>
            <td>STEP-HFpEF [1]</td>
            <td>Semaglutide 2.4 mg</td>
            <td>529</td>
            <td>KCCQ-CSS + body weight</td>
            <td>+7.8 KCCQ pts; −10.7 pp weight</td>
          </tr>
        </tbody>
      </table>

      <p>
        These trials are not directly comparable. The SGLT2
        inhibitor trials are large outcomes trials with hard
        composite endpoints (death and hospitalization) and ~2-2.5
        years of follow-up. STEP-HFpEF is a 52-week trial focused
        on symptoms, quality of life, and functional capacity in a
        narrower population (obesity required, no diabetes in the
        original trial). The trials measure different things in
        different populations.
      </p>

      <p>
        The clinically actionable interpretation is that the SGLT2
        inhibitors and semaglutide work through largely distinct
        mechanisms (cardiometabolic + diuretic for SGLT2, weight +
        anti-inflammatory + cardiac mechanics for semaglutide), and
        the most likely best-practice regimen for an obese HFpEF
        patient is the combination — both classes, plus loop
        diuretic as needed for congestion, plus the standard
        background HFpEF care.
      </p>

      <h2>What STEP-HFpEF did not measure</h2>

      <p>
        STEP-HFpEF was not powered for hard outcomes. It did not
        report primary endpoints on all-cause mortality,
        cardiovascular mortality, or HF hospitalization. The
        hierarchical composite in the pooled analysis includes
        these events, but as components of a win-ratio analysis
        rather than as standalone endpoints. The published trials
        also have only 52 weeks of treatment plus a brief
        off-treatment follow-up period, so multi-year durability,
        the rebound pattern after discontinuation, and
        cumulative-cycling effects are unknown.
      </p>

      <p>
        A larger semaglutide HFpEF outcomes trial powered for
        hospitalization and mortality has not been announced as of
        this writing. Given that semaglutide has now demonstrated
        cardiovascular benefit in non-diabetic adults (SELECT) and
        kidney benefit in T2D patients with CKD (FLOW), an HFpEF
        outcomes trial would round out the cardiometabolic outcomes
        story and is the most logical next step in the development
        program.
      </p>

      <h2>FDA labeling status</h2>

      <p>
        As of this writing, the Wegovy (semaglutide 2.4 mg) US
        prescribing information includes a cardiovascular risk
        reduction indication based on the SELECT trial in
        non-diabetic adults with established cardiovascular disease,
        but does <strong>not</strong> currently list a separate
        HFpEF indication driven by the STEP-HFpEF data. The trial
        evidence is in the public literature and increasingly
        cited in cardiology guideline updates, but the formal
        label change has not been announced.
      </p>

      <h2>What this means for patients</h2>

      <p>
        For adults with obesity (BMI ≥30) and HFpEF — particularly
        those who have ongoing symptoms despite background HFpEF
        therapy — semaglutide 2.4 mg is now an evidence-based
        option backed by two large randomized trials and a pooled
        Lancet analysis. The expected benefits are improvement in
        symptom burden, exercise capacity, and quality of life,
        with weight loss as a co-benefit. The expected costs are
        the standard semaglutide GI tolerability profile and the
        ongoing financial burden of weight-management dosing.
      </p>

      <p>
        For patients without obesity or who have ejection fraction
        below the trial cutoffs, STEP-HFpEF does not directly
        apply. The decision should be made together with a
        cardiologist familiar with both the STEP-HFpEF and SGLT2
        inhibitor evidence.
      </p>

      <h2>Related research</h2>

      <p>
        For semaglutide&apos;s broader cardiovascular and renal
        outcomes evidence, see our{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT trial deep-dive
        </Link>{" "}
        and our{" "}
        <Link href="/research/flow-trial-semaglutide-kidney-disease">
          FLOW kidney trial deep-dive
        </Link>
        . For the GI side-effect profile that drives discontinuation,
        see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        . For the pricing of brand-name and compounded semaglutide,
        see our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>
        . For a head-to-head comparison with tirzepatide (which is
        also being studied in HFpEF), see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide deep-dive
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Does semaglutide help heart failure?",
            answer:
              "In patients with HFpEF (heart failure with preserved ejection fraction) and obesity, yes. The STEP-HFpEF trial (Kosiborod 2023, NEJM, PMID 37622681) randomized 529 patients with HFpEF and obesity to semaglutide 2.4mg weekly or placebo. Semaglutide improved heart failure symptoms (KCCQ score), exercise capacity (6-minute walk distance), CRP, and weight at 52 weeks. The benefit was substantially larger than what most heart failure drugs produce.",
          },
          {
            question: "What is HFpEF?",
            answer:
              "HFpEF is heart failure with preserved ejection fraction — a syndrome where the heart's pumping function (ejection fraction) is normal but the heart cannot fill properly during diastole. It's strongly associated with obesity, hypertension, diabetes, and aging. Treatment options have historically been limited compared to HFrEF (reduced EF), which is why the STEP-HFpEF result was a meaningful advance.",
          },
          {
            question: "Is Wegovy approved for heart failure?",
            answer:
              "As of 2026, Wegovy is FDA-approved for chronic weight management and cardiovascular risk reduction in patients with established CVD and obesity, but not specifically labeled for HFpEF. The STEP-HFpEF and STEP-HFpEF DM trials provide strong evidence that semaglutide improves outcomes in HFpEF patients with obesity, and major heart failure guidelines (ACC/AHA, ESC) are incorporating GLP-1 use in this population.",
          },
          {
            question: "Should I take Wegovy if I have heart failure?",
            answer:
              "If you have HFpEF and obesity, the evidence supports semaglutide as a meaningful treatment for both your weight and your heart failure symptoms. Discuss with your cardiologist — the benefits in trials (improved symptoms, exercise capacity, weight loss) are substantial. Patients with HFrEF (reduced EF) have less direct evidence; trials are ongoing.",
          },
          {
            question: "Does tirzepatide also help heart failure?",
            answer:
              "The SUMMIT trial (Packer 2024, NEJM) showed tirzepatide improved KCCQ symptom score, 6-minute walk distance, and weight in patients with HFpEF and obesity, replicating and extending the semaglutide finding. Both GLP-1-class drugs now have phase 3 RCT evidence supporting their use in HFpEF with obesity, though neither is yet FDA-labeled for that specific indication.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
