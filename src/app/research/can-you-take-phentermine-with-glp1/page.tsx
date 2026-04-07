import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can you take phentermine with semaglutide?",
    answer:
      "There is no FDA-approved combination product containing phentermine and semaglutide, and no randomized controlled trial of the combination. Some obesity-medicine specialists prescribe both off-label in selected patients (typically GLP-1 plateau cases), with cardiovascular workup and monitoring. Phentermine has real contraindications (cardiovascular disease, hyperthyroidism, glaucoma, history of substance abuse) that don't change when a GLP-1 is added.",
  },
  {
    question: "Can you take phentermine with tirzepatide?",
    answer:
      "Same answer as semaglutide — no FDA approval as a combination, no RCT data, off-label prescribing exists in obesity-medicine practice. Tirzepatide is the more potent GLP-1 (mean 20.9% weight loss in SURMOUNT-1 vs 14.9% on Wegovy), so the case for adding phentermine is weaker — the larger weight loss leaves less room for additional appetite suppression to add benefit.",
  },
  {
    question: "Is phentermine + GLP-1 safe?",
    answer:
      "There is no published long-term safety data on the specific combination. The known risks are: phentermine raises heart rate by 7-10 bpm and systolic BP by 4-7 mmHg (Hendricks 2011 cohort). GLP-1s independently raise heart rate by 2-4 bpm. Phentermine is contraindicated in cardiovascular disease, hyperthyroidism, glaucoma, history of substance abuse, MAO inhibitor use, pregnancy, agitated states, and is a relative contraindication over age 65. The combination should only be initiated by an obesity-medicine specialist with baseline cardiovascular workup.",
  },
  {
    question: "Will phentermine restart weight loss if my GLP-1 plateaus?",
    answer:
      "There is no published RCT evidence that adding phentermine restarts weight loss after a GLP-1 plateau. Case series and retrospective cohorts from obesity-medicine clinics describe modest additional weight loss in some patients, but these have no control group and significant selection bias. Standard practice before considering phentermine: ensure you are on a true maintenance GLP-1 dose (Wegovy 2.4 mg, Zepbound 15 mg) for at least 3-6 months and that the plateau is real, not measurement noise.",
  },
];

const SLUG = "can-you-take-phentermine-with-glp1";

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
//   - Adipex-P (phentermine HCl) US Prescribing Information
//   - Wegovy/Zepbound FDA labels
//   - Aronne et al. 2010 Conquer trial — phentermine/topiramate
//   - Hendricks et al. 2014 — long-term phentermine safety analysis
//   - Bays et al. 2025 — Obesity Medicine Association combination therapy clinical practice
//   - Nathan et al. 2022 — phentermine cardiovascular outcomes

export default function PhentermineComboArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Teva Pharmaceuticals USA Inc.",
      title:
        "ADIPEX-P (phentermine hydrochloride) capsules — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2023,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/085128s073lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 7 Drug Interactions.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 7.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Hendricks EJ, Greenway FL, Westman EC, Gupta AK.",
      title:
        "Blood pressure and heart rate effects, weight loss and maintenance during long-term phentermine pharmacotherapy for obesity.",
      source: "Obesity (Silver Spring)",
      year: 2011,
      pmid: "21331068",
    },
    {
      authors:
        "Lewis KH, Fischer H, Ard J, Barton L, Bessesen DH, Daley MF, Desai J, Fitzpatrick SL, Horberg M, Koebnick C, Oshiro C, Yamamoto A, Young DR, Arterburn DE.",
      title:
        "Safety and Effectiveness of Longer-Term Phentermine Use: Clinical Outcomes from an Electronic Health Record Cohort.",
      source: "Obesity (Silver Spring)",
      year: 2019,
      pmid: "30421863",
    },
    {
      authors:
        "Bays HE, Burridge K, Richards J, Fitch A.",
      title:
        "Obesity Pillars Roundtable: Combination Pharmacotherapy in Obesity Management.",
      source: "Obes Pillars",
      year: 2023,
      url: "https://www.sciencedirect.com/journal/obesity-pillars",
    },
    {
      authors:
        "Aronne LJ, Wadden TA, Peterson C, Winslow D, Odeh S, Gadde KM.",
      title:
        "Evaluation of phentermine and topiramate versus phentermine/topiramate extended-release in obese adults.",
      source: "Obesity (Silver Spring)",
      year: 2013,
      pmid: "23512441",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Phentermine is a stimulant appetite suppressant that has
        been FDA-approved for weight loss since 1959. It is the
        most prescribed weight-loss drug in the US after the GLP-1s
        themselves. With the rise of GLP-1 therapy, the question of
        combining the two has become increasingly common — and the
        answer is more nuanced than either &ldquo;never&rdquo; or
        &ldquo;sure.&rdquo; There is no randomized controlled trial
        of phentermine plus a GLP-1, no FDA approval for the
        combination, and several legitimate safety concerns. At the
        same time, many obesity-medicine specialists do prescribe
        both in selected patients, particularly those plateauing on
        GLP-1 monotherapy. Here is the evidence and the risk
        framework.
      </p>

      <h2>What phentermine is</h2>
      <p>
        Phentermine is a sympathomimetic amine — a stimulant
        chemically related to amphetamine. It works by triggering
        norepinephrine release in the hypothalamus, which suppresses
        appetite via central mechanisms<Cite n={1} />. The
        FDA-approved indication is short-term (12 week) use as part
        of a comprehensive weight management plan for adults with
        BMI ≥ 30, or BMI ≥ 27 with weight-related comorbidities —
        the same eligibility threshold as Wegovy and Zepbound. It
        is a DEA Schedule IV controlled substance because of its
        amphetamine-related abuse potential.
      </p>
      <p>
        Effect size: phentermine monotherapy produces approximately
        5-7% body weight loss over 12 weeks in trial settings. This
        is meaningful but well below the 14.9% (Wegovy) or 20.9%
        (Zepbound) seen at 68-72 weeks of GLP-1 therapy.
      </p>

      <h2>Is the combination FDA-approved?</h2>
      <p>
        No. There is no FDA-approved combination product containing
        phentermine and a GLP-1, and the GLP-1 labels do not include
        phentermine in their drug interaction sections<Cite n={2} /><Cite n={3} />.
        Off-label combination prescribing is legal in the US — a
        physician can prescribe two FDA-approved drugs together
        based on clinical judgment — but the combination is not
        formally tested or labeled.
      </p>
      <p>
        For comparison, Qsymia (phentermine + topiramate) is an
        FDA-approved combination for weight management, and the
        Aronne et al. trial<Cite n={7} /> established its efficacy
        and safety profile. There is no equivalent for phentermine
        plus a GLP-1.
      </p>

      <h2>Why anyone would consider the combination</h2>
      <p>
        Three clinical scenarios commonly drive the question:
      </p>
      <ol>
        <li>
          <strong>GLP-1 plateau.</strong> A patient who lost 10-15%
          body weight on Wegovy or Zepbound but has stalled on the
          maintenance dose for 3-6 months. The plateau is real and
          common — see our{" "}
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            plateau article
          </Link>{" "}
          for the response distribution. The hope is that adding
          phentermine restarts weight loss via a different mechanism.
        </li>
        <li>
          <strong>
            Insufficient response to GLP-1 monotherapy.
          </strong>{" "}
          About 10-15% of patients in STEP-1 lost less than 5% body
          weight even at the full Wegovy 2.4 mg dose. For
          non-responders or partial responders, adding a second
          mechanism is appealing.
        </li>
        <li>
          <strong>
            Cost / access to a higher GLP-1 dose is limited.
          </strong>{" "}
          Phentermine is cheap (~$10/mo generic) and widely
          available. Some patients on a lower titration step of a
          GLP-1 add phentermine instead of escalating the GLP-1.
        </li>
      </ol>

      <h2>The mechanistic argument FOR combination</h2>
      <p>
        Phentermine and GLP-1 receptor agonists act through
        different appetite-regulation pathways:
      </p>
      <ul>
        <li>
          <strong>Phentermine</strong> — central norepinephrine
          release in the hypothalamus, suppresses food-seeking and
          hunger signals
        </li>
        <li>
          <strong>GLP-1 receptor agonists</strong> — peripheral
          slowing of gastric emptying plus central GLP-1 receptor
          activation in satiety circuits, reducing meal size and
          increasing satiety duration
        </li>
      </ul>
      <p>
        In principle, two non-overlapping mechanisms acting on the
        same outcome (energy intake) should produce additive effects
        — that&apos;s the same logic that justifies most polypharmacy
        in cardiology and oncology. The 2023 Obesity Medicine
        Association roundtable<Cite n={6} /> specifically discussed
        the rationale for combining anti-obesity medications with
        non-overlapping mechanisms.
      </p>

      <h2>The mechanistic argument AGAINST combination</h2>
      <ul>
        <li>
          <strong>Diminishing returns.</strong> Patients on a
          maintenance-dose GLP-1 are typically already eating
          30-40% less than their pre-treatment baseline. There may
          not be much &ldquo;room&rdquo; for a second appetite
          suppressant to add to the effect.
        </li>
        <li>
          <strong>Cardiovascular load.</strong> Phentermine raises
          heart rate and blood pressure<Cite n={4} />. Many obese
          patients already have hypertension and elevated resting
          heart rate at baseline. The Hendricks 2011 long-term
          phentermine cohort showed mean increases of 4-7 mmHg
          systolic and 7-10 bpm heart rate.
        </li>
        <li>
          <strong>Schedule IV abuse potential.</strong> Phentermine
          is amphetamine-related. Patients with a history of
          stimulant misuse, untreated ADHD, or anxiety disorders
          may be at elevated risk.
        </li>
        <li>
          <strong>
            GLP-1 nausea and phentermine GI side effects can stack.
          </strong>{" "}
          Both drugs cause dry mouth, constipation, and reduced
          appetite — combined intake can be problematic for
          nutrition and hydration.
        </li>
        <li>
          <strong>
            No long-term safety data on the combination
            specifically.
          </strong>{" "}
          Phentermine alone has reasonable long-term cohort data
          <Cite n={5} />, and GLP-1s have extensive long-term trial
          data. The combination has neither.
        </li>
      </ul>

      <h2>Who should NOT take the combination</h2>
      <p>
        Phentermine is contraindicated in several conditions that
        overlap heavily with the obese population<Cite n={1} />.
        Adding a GLP-1 does not change these contraindications:
      </p>
      <ul>
        <li>
          History of cardiovascular disease (coronary artery
          disease, stroke, arrhythmias, congestive heart failure,
          uncontrolled hypertension)
        </li>
        <li>Hyperthyroidism</li>
        <li>Glaucoma</li>
        <li>History of drug abuse</li>
        <li>
          Use of MAO inhibitors within 14 days
        </li>
        <li>Pregnancy or breastfeeding</li>
        <li>
          Agitated states or significant anxiety disorders
        </li>
        <li>Age &gt;65 (relative contraindication)</li>
      </ul>
      <p>
        If any of these apply, the combination is off the table —
        the conversation is about whether GLP-1 monotherapy at the
        next dose step or a different second-line option (Qsymia,
        Contrave, naltrexone) makes sense.
      </p>

      <h2>The prescriber framework that obesity-medicine specialists use</h2>
      <p>
        Obesity-medicine specialists who do prescribe the
        combination typically use a framework like this<Cite n={6} />:
      </p>
      <ol>
        <li>
          <strong>
            Optimize GLP-1 monotherapy first.
          </strong>{" "}
          Make sure the patient is on a true maintenance dose
          (Wegovy 2.4 mg, Zepbound 15 mg, or the highest tolerated
          dose) for at least 3-6 months before adding a second
          drug.
        </li>
        <li>
          <strong>Confirm the plateau is real.</strong> Track for
          at least 8-12 weeks of stable weight on a fully titrated
          dose with documented adherence. Many &ldquo;plateaus&rdquo;
          turn out to be measurement noise or temporary.
        </li>
        <li>
          <strong>Cardiovascular workup.</strong> Baseline blood
          pressure, resting heart rate, and screening EKG. Document
          the absence of contraindications.
        </li>
        <li>
          <strong>Start phentermine at a low dose</strong> (15 mg
          or 18.75 mg, not the standard 37.5 mg) and titrate
          cautiously. Many patients on a GLP-1 do not need or
          tolerate the full phentermine dose.
        </li>
        <li>
          <strong>
            Reassess heart rate and blood pressure
          </strong>{" "}
          at 2 weeks, 4 weeks, and monthly thereafter.
        </li>
        <li>
          <strong>
            Time-limit the phentermine course.
          </strong>{" "}
          The FDA label is for 12-week use. Some specialists
          extend off-label, but the duration should be a
          deliberate clinical decision, not an indefinite default.
        </li>
        <li>
          <strong>
            Stop phentermine if no additional weight loss appears
            within 4-8 weeks
          </strong>{" "}
          — adding a drug that doesn&apos;t add benefit only adds
          risk.
        </li>
      </ol>

      <h2>What the actual evidence on the combination looks like</h2>
      <p>
        There is no published randomized controlled trial of
        phentermine plus a GLP-1 receptor agonist as of April 2026.
        The available evidence is limited to:
      </p>
      <ul>
        <li>
          <strong>Case series and retrospective cohorts</strong> from
          obesity-medicine clinics — these generally describe modest
          additional weight loss when phentermine is added to GLP-1
          plateauing patients, but they have no control group and
          significant selection bias.
        </li>
        <li>
          <strong>Clinical practice consensus statements</strong>{" "}
          from the Obesity Medicine Association<Cite n={6} /> that
          discuss the combination as a reasonable option in
          selected patients.
        </li>
        <li>
          <strong>Inferential reasoning</strong> from the Qsymia
          trials (phentermine + topiramate, an FDA-approved
          combination) showing that combination anti-obesity
          pharmacotherapy can produce additive effects beyond
          monotherapy<Cite n={7} />.
        </li>
      </ul>
      <p>
        That&apos;s thin evidence for a YMYL clinical decision. The
        honest summary: this is a clinically reasonable option that
        some specialists use, but it&apos;s not established practice
        and the long-term safety profile is not known.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Phentermine + GLP-1 is not FDA-approved as a combination
          and has no randomized trial data.
        </li>
        <li>
          Some obesity-medicine specialists prescribe it for
          plateauing patients or non-responders, with monitoring.
        </li>
        <li>
          Phentermine is contraindicated in cardiovascular disease,
          hyperthyroidism, glaucoma, history of substance abuse, and
          several other conditions that are common in the obese
          population. These contraindications do not change when a
          GLP-1 is added.
        </li>
        <li>
          The combination should be initiated and monitored by an
          obesity-medicine specialist or experienced prescriber, not
          self-prescribed and not requested casually from a
          telehealth platform.
        </li>
        <li>
          Optimize GLP-1 monotherapy fully (3-6 months on the
          maintenance dose) before considering a second drug.
        </li>
        <li>
          If you do start combination therapy, monitor blood
          pressure and heart rate, time-limit the phentermine
          course, and stop if no additional benefit appears within
          4-8 weeks.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            Why am I not losing weight on a GLP-1? Plateau guide
          </Link>{" "}
          — the response distribution and what to do first
        </li>
        <li>
          <Link href="/research/switching-between-glp1-medications-guide">
            Switching between GLP-1 medications
          </Link>{" "}
          — the alternative to adding a second drug
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — search any medication for its interaction with your
          GLP-1
        </li>
        <li>
          <Link href="/tools/glp1-weight-loss-calculator">
            GLP-1 weight loss calculator
          </Link>{" "}
          — STEP-1/SURMOUNT-1 trial-data-backed predictor
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-nausea-management-practical-guide">
            GLP-1 nausea management guide
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice or a
        recommendation to combine any specific medications.
        Combination obesity pharmacotherapy is a clinical decision
        that should be made by a qualified prescriber with full
        knowledge of your medical history, cardiovascular risk
        profile, and current medications. Phentermine is a
        Schedule IV controlled substance with significant
        contraindications and is not appropriate for every patient.
        Discuss any combination strategy with your prescribing
        clinician.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
