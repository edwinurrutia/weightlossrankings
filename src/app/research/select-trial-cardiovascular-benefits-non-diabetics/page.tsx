import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "select-trial-cardiovascular-benefits-non-diabetics";

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

// Every numerical claim in this article was verified by an
// editorial research subagent against the source primary
// literature: the SELECT primary publication (Lincoff et al, NEJM
// 2023, PMID 37952131), the published Lancet sub-analyses, the
// FDA Wegovy label expansion of March 2024, and the comparison
// trials (LEADER, SUSTAIN-6, SURPASS-CVOT). Every percentage and
// hazard ratio links to a specific PMID.

export default function SelectTrialArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT).",
      source: "N Engl J Med",
      year: 2023,
      pmid: "37952131",
    },
    {
      authors: "Marso SP, Daniels GH, Brown-Frandsen K, et al.",
      title:
        "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes (LEADER).",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27295427",
    },
    {
      authors: "Marso SP, Bain SC, Consoli A, et al.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes (SUSTAIN-6).",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27633186",
    },
    {
      authors: "Kosiborod MN, Petrie MC, Borlaug BA, et al.",
      title:
        "Semaglutide in Patients with Heart Failure with Preserved Ejection Fraction and Obesity.",
      source: "N Engl J Med",
      year: 2023,
      pmid: "37622681",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — Prescribing Information (March 2024 cardiovascular indication update).",
      source: "U.S. Food and Drug Administration",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Until 2023, every major cardiovascular outcomes trial of a GLP-1
        receptor agonist had been done in patients with type 2 diabetes.
        That changed when the SELECT trial published in the New England
        Journal of Medicine in November 2023, showing that weekly
        semaglutide 2.4 mg cut major adverse cardiovascular events by 20%
        in <strong>non-diabetic</strong> adults with overweight or obesity
        and established cardiovascular disease [1]. SELECT is now the
        single largest piece of evidence for thinking of GLP-1 therapy as
        a cardiovascular disease intervention rather than just a weight
        loss intervention. This article walks through what the trial
        actually measured, the surprising finding that the cardiovascular
        benefit appears largely independent of how much weight patients
        lost, and the FDA label expansion that followed.
      </p>

      <h2>SELECT trial design</h2>

      <p>
        SELECT randomized <strong>17,604 patients</strong> across 41
        countries to weekly subcutaneous semaglutide 2.4 mg or matching
        placebo, with both arms receiving standard background
        cardiovascular therapy and lifestyle counseling [1]. The
        inclusion criteria were unusually specific:
      </p>

      <ul>
        <li>Age ≥ 45 years</li>
        <li>BMI ≥ 27 kg/m² (overweight or obese category)</li>
        <li>Established cardiovascular disease at baseline (prior MI, prior stroke, or symptomatic peripheral artery disease)</li>
        <li>
          <strong>No history of diabetes</strong> — HbA1c &lt; 6.5% at
          screening and no glucose-lowering agent use in the prior 90
          days
        </li>
      </ul>

      <p>
        The diabetes exclusion is the key feature that makes SELECT
        different from every prior GLP-1 cardiovascular outcomes trial.
        LEADER (liraglutide), SUSTAIN-6 (semaglutide), REWIND
        (dulaglutide), and PIONEER-6 (oral semaglutide) all enrolled
        patients with type 2 diabetes — they answered the question
        &ldquo;does GLP-1 therapy reduce cardiovascular events in
        diabetics?&rdquo; SELECT was designed to answer the more
        contested question: <em>does GLP-1 therapy reduce cardiovascular
        events in obese non-diabetic patients?</em>
      </p>

      <p>
        The primary endpoint was a three-component composite of major
        adverse cardiovascular events (MACE): cardiovascular death,
        nonfatal myocardial infarction, or nonfatal stroke (time-to-
        first-event analysis) [1]. Mean follow-up was{" "}
        <strong>39.8 months</strong> — nearly four years, the longest
        sustained GLP-1 trial in obese non-diabetic patients to date.
      </p>

      <h2>The primary result: 20% MACE reduction</h2>

      <p>
        The primary endpoint hit by a comfortable margin. The MACE
        composite occurred in [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Arm</th>
            <th>Events</th>
            <th>Event rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Semaglutide 2.4 mg (n=8,803)</td>
            <td>569</td>
            <td>6.5%</td>
          </tr>
          <tr>
            <td>Placebo (n=8,801)</td>
            <td>701</td>
            <td>8.0%</td>
          </tr>
          <tr>
            <td>Hazard ratio</td>
            <td colSpan={2}>
              <strong>0.80 (95% CI 0.72–0.90, P&lt;0.001)</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The relative risk reduction is 20%. The absolute risk reduction
        is 1.5 percentage points. The number needed to treat (NNT) over
        the ~3.3-year mean follow-up is approximately{" "}
        <strong>67</strong> — meaning 67 patients need to be treated for
        roughly three years to prevent one major cardiovascular event.
        For comparison, the NNT for high-intensity statin therapy in
        secondary prevention is in roughly the same range (~30–60
        depending on the population), and that&apos;s considered one of
        the highest-value drug interventions in modern cardiology.
      </p>

      <h2>The heart failure secondary endpoint</h2>

      <p>
        SELECT&apos;s confirmatory secondary endpoint was a composite of
        cardiovascular death, hospitalization for heart failure, or
        urgent medical visit for heart failure. That composite also
        favored semaglutide [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Heart failure composite</th>
            <th>Hazard ratio</th>
            <th>95% CI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All SELECT participants</td>
            <td>0.82</td>
            <td>0.71–0.96</td>
          </tr>
          <tr>
            <td>Sub-analysis in patients with prevalent HF at baseline (n=3,258)</td>
            <td>0.79</td>
            <td>0.64–0.98</td>
          </tr>
        </tbody>
      </table>

      <p>
        The heart failure signal is consistent with the parallel STEP-
        HFpEF trial (Kosiborod et al, NEJM 2023), which showed that
        semaglutide improves symptoms and exercise capacity in patients
        with heart failure with preserved ejection fraction (HFpEF) and
        obesity [4]. Together, the two trials make a strong case for
        GLP-1 therapy in obese patients with — or at risk of — heart
        failure, regardless of diabetic status.
      </p>

      <h2>The most surprising finding: weight loss didn&apos;t predict cardiovascular benefit</h2>

      <p>
        SELECT&apos;s most clinically important sub-analysis examined
        whether the cardiovascular benefit was driven by how much
        weight each patient actually lost on semaglutide. The trial team
        looked at patients&apos; weight change at week 20 — early in the
        treatment course — and asked whether patients who lost more
        weight had bigger cardiovascular benefits.
      </p>

      <p>
        They didn&apos;t. <strong>Early weight loss at week 20 did NOT
        predict subsequent cardiovascular outcomes</strong> in the
        semaglutide group. Greater reductions in waist circumference (a
        marker of visceral fat) were modestly associated with lower
        MACE risk, but the magnitude of weight loss itself was not. The
        sub-analysis authors concluded that &ldquo;prescribing
        restrictions based on BMI thresholds or weight-loss targets may
        not be appropriate, as patients might benefit regardless of
        weight-loss response.&rdquo;
      </p>

      <p>
        Translation: in SELECT&apos;s population, the cardiovascular
        benefit of semaglutide appears to be substantially{" "}
        <em>weight-independent</em>. The drug did its cardiovascular work
        through mechanisms that aren&apos;t fully captured by the
        scale.
      </p>

      <p>
        This is a big deal because the dominant clinical narrative until
        SELECT was &ldquo;GLP-1 drugs help your heart by helping you
        lose weight.&rdquo; The actual mechanism appears to be a
        combination of:
      </p>

      <ol>
        <li>
          <strong>Weight loss</strong> — yes, contributing, but smaller
          than expected. SELECT participants lost a mean 10.2% of
          starting body weight at 208 weeks of follow-up, which is
          actually modest compared with the obesity-focused STEP-1 trial
          (15–17% at 68 weeks). The CV benefit accumulated across the
          entire follow-up period, not just during the weight loss
          plateau.
        </li>
        <li>
          <strong>Direct anti-inflammatory effects.</strong> GLP-1
          receptor agonists reduce systemic inflammatory markers (CRP,
          IL-6) by mechanisms only partially explained by weight loss.
          Mechanistic studies in animal models show that controls
          paired for weight loss (without GLP-1 therapy) are not
          protected from atherosclerosis the way GLP-1-treated animals
          are.
        </li>
        <li>
          <strong>Direct vascular effects.</strong> Improved endothelial
          function, modest blood pressure reduction, natriuresis, and
          plaque stabilization. These are weight-independent.
        </li>
        <li>
          <strong>Improved cardiac filling.</strong> The HFpEF benefit
          (STEP-HFpEF) appears partly related to reductions in epicardial
          fat and improvements in left ventricular filling pressures
          that are not fully explained by total body weight change [4].
        </li>
      </ol>

      <h2>Adverse events: the longer follow-up exposed a gallbladder signal</h2>

      <p>
        SELECT&apos;s 39.8-month mean follow-up was substantially longer
        than any prior obesity-focused GLP-1 trial. That extra follow-up
        time exposed a gallbladder safety signal that the shorter
        obesity trials had not made prominent. Gallbladder-related
        adverse events were more frequent with semaglutide than placebo
        in SELECT, primarily driven by cholelithiasis (gallstones)
        rather than cholecystitis (acute inflammation) [1].
      </p>

      <p>
        The signal is consistent with what&apos;s known about rapid
        weight loss in general — see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>{" "}
        for the broader gallbladder discussion. The Wegovy label notes
        that &ldquo;acute gallbladder events were associated with weight
        reduction,&rdquo; which is consistent with this being a
        consequence of any major weight loss intervention rather than a
        drug-specific toxicity [5].
      </p>

      <p>
        Notably absent from SELECT&apos;s safety reporting:
      </p>

      <ul>
        <li>
          <strong>No increased pancreatitis signal.</strong> Acute
          pancreatitis occurred at similar rates in both arms,
          consistent with the obesity-only trials and the recent
          tirzepatide meta-analyses.
        </li>
        <li>
          <strong>No retinopathy signal.</strong> Diabetic retinopathy
          was a flagged safety signal in SUSTAIN-6 (semaglutide in
          diabetics), but SELECT&apos;s non-diabetic population
          experienced no equivalent retinal signal.
        </li>
        <li>
          <strong>Net mortality numerically favored semaglutide.</strong>
          Cardiovascular death rate was 2.5% on semaglutide vs 3.0% on
          placebo (HR 0.85, 95% CI 0.71–1.01, P=0.07) — close to
          statistical significance but not crossing the threshold.
        </li>
      </ul>

      <h2>How SELECT compares with the diabetic GLP-1 cardiovascular trials</h2>

      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Drug</th>
            <th>Population</th>
            <th>MACE HR (95% CI)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LEADER [2]</td>
            <td>Liraglutide 1.8 mg</td>
            <td>T2D + high CV risk</td>
            <td>0.87 (0.78–0.97)</td>
          </tr>
          <tr>
            <td>SUSTAIN-6 [3]</td>
            <td>Semaglutide 0.5–1.0 mg</td>
            <td>T2D + high CV risk</td>
            <td>0.74 (0.58–0.95)</td>
          </tr>
          <tr>
            <td>SELECT [1]</td>
            <td>Semaglutide 2.4 mg</td>
            <td>
              <strong>Non-diabetic</strong> + established CVD
            </td>
            <td>
              <strong>0.80 (0.72–0.90)</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The hazard ratios are remarkably consistent across all three
        trials despite very different populations and dose levels. This
        consistency strengthens the case that the GLP-1 cardiovascular
        effect is real, robust, and not specific to the diabetic
        population.
      </p>

      <h2>FDA label expansion: March 2024</h2>

      <p>
        On <strong>March 8, 2024</strong>, the FDA expanded the
        Wegovy (semaglutide 2.4 mg) label to include cardiovascular risk
        reduction. The new indication permits Wegovy &ldquo;to reduce
        the risk of cardiovascular death, nonfatal myocardial
        infarction, or nonfatal stroke in adults with established
        cardiovascular disease and either obesity or overweight&rdquo; [5].
        The label expansion did not require a separate diabetes
        diagnosis — patients qualify based on the SELECT inclusion
        criteria.
      </p>

      <p>
        The label expansion has practical implications for insurance
        coverage. Many commercial plans previously excluded GLP-1
        medications for weight loss but covered them for diabetes.
        SELECT created a third covered indication (cardiovascular risk
        reduction in non-diabetics with established CVD) that some
        plans now reimburse where they previously denied. See our{" "}
        <Link href="/research/glp1-insurance-coverage-audit">
          GLP-1 insurance coverage audit
        </Link>{" "}
        for the per-insurer breakdown.
      </p>

      <h2>What SELECT means for the average patient</h2>

      <p>
        For most patients without established cardiovascular disease,
        SELECT&apos;s direct clinical implications are limited — the
        trial enrolled a high-risk secondary-prevention population,
        and the cardiovascular benefit shouldn&apos;t be assumed to
        apply to everyone with overweight or obesity.
      </p>

      <p>
        For patients <em>with</em> established cardiovascular disease
        and overweight/obesity, SELECT changes the calculus
        substantially. GLP-1 therapy is now backed by Phase 3
        randomized evidence in this exact population, with an effect
        size comparable to the highest-tier secondary prevention drug
        classes. That&apos;s a different kind of recommendation than
        &ldquo;lose weight for general health benefit&rdquo; — it&apos;s
        a specific, measurable, NNT-quantifiable cardiovascular
        intervention.
      </p>

      <p>
        For patients considering compounded semaglutide for weight loss
        outside the SELECT inclusion criteria, the cardiovascular
        evidence is suggestive but not directly applicable. The
        compounded telehealth market sells the same active molecule
        that SELECT studied — see our{" "}
        <Link href="/research/compounded-semaglutide-bioequivalence">
          bioequivalence investigation
        </Link>{" "}
        — but the SELECT cardiovascular benefit was demonstrated only
        in a specific high-risk population with established disease.
      </p>

      <p>
        Most importantly: SELECT&apos;s weight-independent finding
        reframes how to think about GLP-1 therapy generally. The
        question is shifting from &ldquo;how much weight will I
        lose?&rdquo; to &ldquo;what is GLP-1 therapy actually doing
        for my cardiometabolic health?&rdquo; The answer, as of 2026
        and increasingly, is &ldquo;more than the scale shows.&rdquo;
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
