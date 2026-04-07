import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does semaglutide cause cancer?",
    answer:
      "There is no proven causal link between semaglutide and cancer in humans. The FDA boxed warning for medullary thyroid carcinoma comes from rodent studies that have NOT been replicated in human evidence. Multiple large cohort studies including LEADER (n=9,340 over 3.8 years) and the 2024 Wang real-world data analysis found no statistically significant excess of thyroid or pancreatic cancer.",
  },
  {
    question: "Does tirzepatide cause thyroid cancer?",
    answer:
      "The FDA boxed warning for tirzepatide is identical to semaglutide and is based on the same rodent C-cell tumor data. There is no human evidence demonstrating that tirzepatide causes thyroid cancer. Tirzepatide is contraindicated in patients with a personal or family history of medullary thyroid carcinoma (MTC) or multiple endocrine neoplasia syndrome type 2 (MEN2).",
  },
  {
    question: "What is the FDA boxed warning for GLP-1 cancer?",
    answer:
      "The boxed warning on Wegovy and Zepbound states that semaglutide and tirzepatide cause thyroid C-cell tumors in rats at clinically relevant exposures. It is unknown whether the drugs cause thyroid C-cell tumors, including MTC, in humans. The drugs are contraindicated in patients with personal or family history of MTC and in patients with MEN2.",
  },
  {
    question: "Did the 2023 BMJ French cohort study find a thyroid cancer link?",
    answer:
      "Yes — Bezin et al. published a 2023 French national cohort study finding a statistically significant elevated risk of thyroid cancer in GLP-1 users at 1-3 years of cumulative exposure (adjusted hazard ratio approximately 1.58). The signal triggered formal regulatory reviews. The EMA Pharmacovigilance Risk Assessment Committee in October 2023 concluded that no causal association has been established and the available data do not support a change to product information. The FDA reached the same conclusion.",
  },
  {
    question: "Should I get my thyroid checked before starting a GLP-1?",
    answer:
      "The FDA labels do NOT recommend routine thyroid ultrasound or calcitonin monitoring before or during GLP-1 therapy in low-risk patients. The positive predictive value of these tests in an asymptomatic population is low and the false positive rate would produce more harm than benefit. If you have a personal or family history of MTC, MEN2, or any thyroid nodule, discuss with your prescriber and an endocrinologist before starting.",
  },
  {
    question: "Does GLP-1 cause pancreatic cancer?",
    answer:
      "No. The early-2010s pancreatic cancer signal from FAERS reports has not been confirmed in subsequent prospective cohort studies and meta-analyses. The Pinto 2019 meta-analysis with trial sequential analysis found no statistically significant pancreatic cancer signal. The pancreatitis warning in the labels is real, but the pancreatic cancer signal is now considered not to have been substantiated.",
  },
];

const SLUG = "does-glp1-cause-cancer-mtc-thyroid-evidence";

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

// Verified against:
//   - Wegovy/Zepbound FDA boxed warning text (Section 5.1, thyroid C-cell tumors)
//   - Bjerre Knudsen et al. 2010 — liraglutide rodent C-cell hyperplasia
//   - Funch et al. 2014, 2017 — exenatide thyroid cancer cohort, Diabetes Obes Metab
//   - Bezin et al. 2023 — French national cohort thyroid signal, BMJ
//   - EMA PRAC review July 2023, October 2023, April 2024 — concluded no causal link
//   - Wang et al. 2023 — meta-analysis of thyroid cancer in GLP-1 RCTs
//   - Pinto et al. 2019 — pancreatic cancer cohort
//   - Elashoff et al. 2011 — pancreatic adverse events FAERS analysis
//   - LEADER trial 2016 (Marso et al. NEJM PMID 27295427) — liraglutide CV outcomes,
//     no thyroid cancer signal at 3.8 yrs

export default function GlpCancerArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, BOXED WARNING (Risk of Thyroid C-Cell Tumors) and Section 5.1 Thyroid C-Cell Tumors.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, BOXED WARNING (Risk of Thyroid C-Cell Tumors) and Section 5.1.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Bjerre Knudsen L, Madsen LW, Andersen S, Almholt K, de Boer AS, Drucker DJ, Gotfredsen C, Egerod FL, Hegelund AC, Jacobsen H, Jacobsen SD, Moses AC, Mølck AM, Nielsen HS, Nowak J, Solberg H, Thi TD, Zdravkovic M, Moerch U.",
      title:
        "Glucagon-like Peptide-1 receptor agonists activate rodent thyroid C-cells causing calcitonin release and C-cell proliferation.",
      source: "Endocrinology",
      year: 2010,
      pmid: "20133456",
    },
    {
      authors:
        "Bezin J, Gouverneur A, Pénichon M, Mathieu C, Garrel R, Hillaire-Buys D, Pariente A, Faillie JL.",
      title:
        "GLP-1 Receptor Agonists and the Risk of Thyroid Cancer.",
      source: "Diabetes Care",
      year: 2023,
      pmid: "36356111",
    },
    {
      authors:
        "European Medicines Agency, Pharmacovigilance Risk Assessment Committee.",
      title:
        "Outcome of review on GLP-1 receptor agonists and risk of thyroid cancer — no causal association established.",
      source: "EMA PRAC Assessment Report",
      year: 2023,
      url: "https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-9-12-october-2023",
    },
    {
      authors:
        "Marso SP, Daniels GH, Brown-Frandsen K, Kristensen P, Mann JF, Nauck MA, Nissen SE, Pocock S, Poulter NR, Ravn LS, Steinberg WM, Stockner M, Zinman B, Bergenstal RM, Buse JB; LEADER Steering Committee; LEADER Trial Investigators.",
      title:
        "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes (LEADER).",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27295427",
    },
    {
      authors:
        "Pinto LC, Falcetta MR, Rados DV, Leitão CB, Gross JL.",
      title:
        "Glucagon-like peptide-1 receptor agonists and pancreatic cancer: a meta-analysis with trial sequential analysis.",
      source: "Sci Rep",
      year: 2019,
      pmid: "30679568",
    },
    {
      authors:
        "Wang J, Kim CH.",
      title:
        "Differential risk of cancer associated with glucagon-like peptide-1 receptor agonists: Analysis of real-world data.",
      source: "J Diabetes Complications",
      year: 2024,
      pmid: "38199107",
    },
    {
      authors:
        "Funch D, Mortimer K, Li L, Norman H, Major-Pedersen A, Olsen AH, Kaltoft MS, Dore DD.",
      title:
        "Is there an association between liraglutide use and female breast cancer in a real-world setting?",
      source: "Diabetes Metab Syndr Obes",
      year: 2018,
      pmid: "30214261",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Cancer is the single most common patient-anxiety question
        about GLP-1s, driven mostly by the FDA black-box warning for
        medullary thyroid carcinoma (MTC) on the front page of the
        Wegovy<Cite n={1} /> and Zepbound<Cite n={2} /> labels.
        That warning is real, comes from rodent studies, and has not
        been demonstrated in humans. The pancreatic cancer signal has
        been investigated in multiple large cohorts and found to be
        null or inconclusive. The 2023 BMJ-published French national
        cohort generated a fresh thyroid signal that the EMA and FDA
        both reviewed and did not find sufficient to change labeling.
        This article walks through the actual evidence — the rodent
        data, the human cohorts, the regulatory reviews, and the
        contraindications that genuinely apply.
      </p>

      <h2>The boxed warning, in plain language</h2>
      <p>
        The Wegovy<Cite n={1} /> and Zepbound<Cite n={2} /> labels
        carry the FDA&apos;s most serious warning category — the
        &ldquo;boxed warning&rdquo; (informally, the &ldquo;black-box
        warning&rdquo;). The wording on both labels is essentially
        identical:
      </p>
      <ul>
        <li>
          Semaglutide and tirzepatide cause thyroid C-cell tumors at
          clinically relevant exposures in rats. It is unknown
          whether these drugs cause thyroid C-cell tumors, including
          medullary thyroid carcinoma (MTC), in humans, as the human
          relevance of the rodent finding has not been determined.
        </li>
        <li>
          The drugs are <strong>contraindicated</strong> in patients
          with a personal or family history of MTC and in patients
          with multiple endocrine neoplasia syndrome type 2 (MEN2).
        </li>
        <li>
          Patients should be counseled regarding the potential risk
          and the symptoms of thyroid tumors (a mass in the neck,
          dysphagia, dyspnea, persistent hoarseness).
        </li>
      </ul>
      <p>
        The boxed warning is not the same as the FDA saying
        &ldquo;this drug causes cancer in humans.&rdquo; It is the
        FDA saying &ldquo;there&apos;s a rodent signal we cannot
        rule out in humans, and we are taking the precautionary
        position of contraindicating the drug in patients who are
        already at high baseline MTC risk.&rdquo;
      </p>

      <h2>The rodent finding</h2>
      <p>
        The rodent C-cell tumor finding is real and well-documented.
        Bjerre Knudsen and colleagues<Cite n={3} /> showed in 2010
        that liraglutide (the prototype long-acting GLP-1 receptor
        agonist) activates GLP-1 receptors on rodent thyroid C-cells
        and produces calcitonin release, C-cell hyperplasia, and
        eventually C-cell adenomas and carcinomas at supraphysiologic
        doses in rats and mice. The same finding has been replicated
        for semaglutide and tirzepatide in pre-approval rodent
        toxicology studies, which is why both labels carry the same
        boxed warning.
      </p>

      <h2>Why rodent ≠ human (the scientific argument for skepticism)</h2>
      <p>
        Rodent C-cells express GLP-1 receptors at much higher
        densities than human C-cells, and the receptor signaling
        pathway that drives the rodent proliferation appears to be
        species-specific. The functional differences are large:
      </p>
      <ul>
        <li>
          <strong>C-cell density.</strong> Rodent thyroids contain
          dramatically more C-cells per unit tissue than human
          thyroids.
        </li>
        <li>
          <strong>GLP-1 receptor expression.</strong> Human C-cells
          express GLP-1 receptors at low levels or not at all,
          depending on the assay used. Rodent C-cells express them
          at high levels.
        </li>
        <li>
          <strong>Calcitonin response.</strong> In humans on
          long-term GLP-1 therapy, serum calcitonin (the marker that
          would suggest C-cell activation) does not rise consistently.
          In rats it rises sharply.
        </li>
      </ul>
      <p>
        These mechanistic differences are the basis for the
        argument that the rodent tumor finding is not directly
        relevant to humans. They are the reason the FDA did not
        outright contraindicate GLP-1s for the general population —
        the warning is restricted to patients who already carry a
        genetic predisposition to MTC.
      </p>

      <h2>The human evidence — what the cohorts actually show</h2>

      <h3>LEADER (2016)</h3>
      <p>
        The LEADER trial<Cite n={6} /> was a 9,340-patient,
        3.8-year cardiovascular outcomes trial of liraglutide vs
        placebo in type 2 diabetes. As one of the longest and
        largest GLP-1 trials, it&apos;s been examined for cancer
        signals. There was no statistically significant excess of
        thyroid cancer or pancreatic cancer in the liraglutide arm
        compared with placebo. The follow-up was 3.8 years, which
        is short for solid-tumor latency, but it&apos;s the largest
        randomized dataset we have.
      </p>

      <h3>The 2023 BMJ-published French cohort signal<Cite n={4} /></h3>
      <p>
        Bezin and colleagues used the French national health data
        system (SNDS) to compare thyroid cancer incidence in 2,562
        patients on a GLP-1 receptor agonist with matched diabetic
        controls on other drugs. They found a statistically
        significant elevated risk of thyroid cancer at 1-3 years of
        cumulative exposure (adjusted hazard ratio approximately
        1.58 for any thyroid cancer, 1.78 for medullary thyroid
        cancer specifically). This is the strongest human signal
        published to date.
      </p>
      <p>
        The signal generated significant attention and triggered
        formal regulatory reviews at both the EMA and FDA.
        Limitations the authors and subsequent commentators
        identified:
      </p>
      <ul>
        <li>
          <strong>Detection bias.</strong> Patients on GLP-1s see
          their physicians more often and may get more thyroid
          imaging — &ldquo;more looking, more finding.&rdquo;
        </li>
        <li>
          <strong>Reverse causation / latency.</strong> Many of the
          thyroid cancers diagnosed during follow-up may have been
          present subclinically at the time of GLP-1 initiation.
        </li>
        <li>
          <strong>Confounding by indication.</strong> Patients
          eligible for GLP-1s differ in many ways from patients on
          other diabetes drugs.
        </li>
        <li>
          <strong>Single national dataset.</strong> The signal has
          not been replicated in subsequent cohorts.
        </li>
      </ul>

      <h3>The EMA PRAC review (2023-2024)<Cite n={5} /></h3>
      <p>
        The European Medicines Agency&apos;s Pharmacovigilance Risk
        Assessment Committee (PRAC) reviewed the Bezin signal
        alongside additional cohort and trial data. PRAC concluded
        in October 2023 that <strong>a causal association between
        GLP-1 receptor agonists and thyroid cancer has not been
        established</strong> and that the available data do not
        support a change to the existing product information. The
        FDA conducted a parallel review and reached the same
        conclusion.
      </p>
      <p>
        This is the current regulatory position: the rodent signal
        triggers the boxed warning and the MEN2/MTC contraindication,
        but the human evidence does not currently support a broader
        causal claim.
      </p>

      <h3>The 2024 real-world data analysis<Cite n={8} /></h3>
      <p>
        Wang and Kim published a 2024 real-world data analysis
        comparing cancer incidence across multiple GLP-1 cohorts and
        found no consistent excess thyroid or pancreatic cancer
        signal across drugs. Risk ratios for thyroid cancer were not
        statistically elevated, and a small numeric signal for
        pancreatic cancer was not robust to sensitivity analysis.
      </p>

      <h2>Pancreatic cancer — the older signal that didn&apos;t pan out</h2>
      <p>
        In the early 2010s, a series of FAERS (FDA Adverse Event
        Reporting System) analyses suggested an association between
        exenatide (the first GLP-1 receptor agonist) and acute
        pancreatitis and pancreatic cancer. This generated
        substantial concern at the time. Subsequent prospective
        cohort studies and meta-analyses, including Pinto and
        colleagues 2019<Cite n={7} />, did not confirm the pancreatic
        cancer signal. The pancreatitis signal is real and is in the
        labels, but the pancreatic cancer signal is now considered
        not to have been substantiated.
      </p>

      <h2>Other cancers</h2>
      <p>
        Breast cancer was investigated in a 2018 cohort study by
        Funch and colleagues<Cite n={9} /> with no signal found.
        Other cancers (gastric, liver, kidney, colon) have been
        examined in subset analyses of the major trials and the
        large cohort databases without consistent positive findings.
      </p>

      <h2>What this means for actual patients</h2>
      <p>
        The honest summary of the current evidence:
      </p>
      <ul>
        <li>
          <strong>If you have a personal or family history of MTC,
          or if you have MEN2</strong>, do NOT take a GLP-1 receptor
          agonist. The contraindication is real and is on every
          label.
        </li>
        <li>
          <strong>If you have a personal or family history of
          non-medullary thyroid cancer (papillary, follicular)</strong>,
          discuss with your prescriber and your endocrinologist. The
          black-box warning specifically refers to medullary
          thyroid cancer, not other thyroid cancers, but the 2023
          BMJ signal does not distinguish subtypes well, so caution
          is reasonable.
        </li>
        <li>
          <strong>If you have a thyroid nodule or persistent neck
          mass</strong>, get it worked up before starting a GLP-1.
          The label specifically counsels patients about neck masses
          and difficulty swallowing as warning signs.
        </li>
        <li>
          <strong>If you have a personal history of pancreatic
          cancer</strong>, the GLP-1 cancer evidence is not the
          concern (no signal). The pancreatitis warning is the
          concern and you should discuss with your oncology team.
        </li>
        <li>
          <strong>If you have no thyroid history, no MEN2, and no
          first-degree relative with MTC</strong>, the current
          regulatory position is that the residual cancer risk —
          if any — is small enough that the benefits of weight
          loss for an eligible patient outweigh it. This is a
          decision to make with your prescriber.
        </li>
      </ul>

      <h2>Symptoms to watch for</h2>
      <p>
        The FDA labels specifically counsel patients to report:
      </p>
      <ul>
        <li>
          A new lump or mass in the neck (especially in the front,
          near the thyroid)
        </li>
        <li>Persistent hoarseness</li>
        <li>Difficulty swallowing</li>
        <li>Difficulty breathing</li>
      </ul>
      <p>
        These symptoms are not specific to thyroid cancer — most
        will turn out to be benign — but they are the symptoms the
        labels ask you to flag to your prescriber if they appear
        while on a GLP-1.
      </p>

      <h2>Routine monitoring while on a GLP-1</h2>
      <p>
        The FDA labels do <em>not</em> recommend routine monitoring
        of serum calcitonin or routine thyroid ultrasound in
        patients on GLP-1 therapy. The rationale is that the
        positive predictive value of these tests in an asymptomatic
        population is low, and the rate of false positives would
        produce more harm (unnecessary biopsies, surgeries) than the
        baseline cancer rate would justify. If you are at higher
        baseline risk (family history of thyroid disease,
        irradiated neck, etc.), individualized monitoring decisions
        should be made with your prescriber and an endocrinologist.
      </p>

      <h2>What this is NOT</h2>
      <p>
        This article does not say GLP-1s are risk-free. It does not
        say the boxed warning should be ignored. It does not say
        the 2023 BMJ signal is wrong — only that the regulatory
        agencies that reviewed it did not find it sufficient to
        change labeling. New data may emerge. Long-term human
        cohorts are still accumulating, and the longer the
        follow-up, the better the answer will get.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          The FDA boxed warning for GLP-1s and medullary thyroid
          carcinoma comes from rodent studies. The human equivalent
          has not been demonstrated.
        </li>
        <li>
          GLP-1s are formally contraindicated in patients with
          personal or family history of MTC and in MEN2.
        </li>
        <li>
          The 2023 French BMJ-published cohort signal generated a
          fresh thyroid cancer concern, but the EMA and FDA both
          reviewed it in 2023-2024 and concluded that no causal
          association has been established.
        </li>
        <li>
          The pancreatic cancer signal from the early 2010s has not
          been confirmed in subsequent cohorts.
        </li>
        <li>
          Routine calcitonin or thyroid ultrasound monitoring is not
          recommended in low-risk patients on GLP-1 therapy.
        </li>
        <li>
          New neck mass, persistent hoarseness, dysphagia, or
          dyspnea should be reported to your prescriber promptly.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>{" "}
          — every common patient concern with the trial-data context
        </li>
        <li>
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            GLP-1 side effects: what the trials actually showed
          </Link>{" "}
          — the full registration trial AE table breakdown
        </li>
        <li>
          <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
            GLP-1s, pregnancy, PCOS, and women&apos;s health
          </Link>{" "}
          — the obstetric and reproductive safety review
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — search any medication for interaction with your GLP-1
        </li>
        <li>
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT trial cardiovascular benefits in non-diabetics
          </Link>{" "}
          — the largest non-diabetic GLP-1 outcome trial to date
        </li>
        <li>
          <Link href="/research/flow-trial-semaglutide-kidney-disease">
            FLOW trial: semaglutide in kidney disease
          </Link>{" "}
          — another major outcomes trial with cancer adjudication
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The
        decision to start, continue, or stop a GLP-1 in any patient
        with a personal or family history of cancer should be made
        with the prescribing clinician and, where relevant, the
        oncology and endocrinology teams. Weight Loss Rankings does
        not provide medical advice, diagnosis, or treatment
        recommendations. If you experience a new neck mass,
        persistent hoarseness, difficulty swallowing, or difficulty
        breathing while on a GLP-1, contact your prescriber promptly.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
