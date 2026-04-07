import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does semaglutide lower blood pressure?",
    answer:
      "Yes. STEP-1 reported a mean systolic BP reduction of 6.2 mmHg on semaglutide 2.4 mg vs 1.1 mmHg on placebo at week 68, and a 2.8 mmHg diastolic reduction. The mechanism is part weight loss, part natriuresis (kidney sodium excretion via GLP-1 receptors in the proximal tubule), and part direct vascular endothelial effects.",
  },
  {
    question: "Does tirzepatide lower blood pressure?",
    answer:
      "Yes. SURMOUNT-1 reported a mean systolic BP reduction of 7.2 mmHg on tirzepatide 15 mg vs 1.0 mmHg on placebo at week 72, and a 4.8 mmHg diastolic reduction. The BP-lowering effect is slightly larger than semaglutide on average, consistent with the larger weight loss tirzepatide produces.",
  },
  {
    question: "Can semaglutide raise blood pressure?",
    answer:
      "Population means hide individual variation. A small fraction of patients see modest BP increases on a GLP-1 despite the average effect being downward. Possible reasons include reflex BP rise from the heart-rate increase, white-coat hypertension during titration visits, stopping a previously tolerated antihypertensive, or interaction with sympathomimetics like decongestants or phentermine. If your home BP readings trend up, check simple causes first then call your prescriber.",
  },
  {
    question: "Does semaglutide raise heart rate?",
    answer:
      "Yes. GLP-1 receptor agonists increase resting heart rate by approximately 2-4 bpm in most patients. This is in Section 5.5 of the Wegovy and Zepbound labels and is consistently seen across the GLP-1 class. The mechanism is thought to involve GLP-1 receptor activation in the sinoatrial node and possibly increased sympathetic tone. Clinically minor for most patients but worth knowing about if you have pre-existing arrhythmias.",
  },
  {
    question: "Should I stop my blood pressure medication on a GLP-1?",
    answer:
      "Do not stop antihypertensives on your own. The BP-lowering effect of GLP-1s often allows for dose reductions over the first 3-6 months, but the deprescribing decision should always be made by the clinician managing your blood pressure. Monitor your BP at home weekly during titration and call your prescriber if you experience symptomatic hypotension (dizziness on standing, lightheadedness, fainting).",
  },
  {
    question: "What did the SELECT trial show about GLP-1 and cardiovascular events?",
    answer:
      "The SELECT trial (n=17,604, 39.8 months mean follow-up) showed that semaglutide 2.4 mg reduced major adverse cardiovascular events by 20% in patients with obesity and pre-existing cardiovascular disease but no diabetes. This is the strongest evidence that the BP-lowering effect translates to real cardiovascular benefit, and led to the FDA adding a labeled cardiovascular benefit indication to Wegovy in 2024.",
  },
];

const SLUG = "does-glp1-affect-blood-pressure-evidence";

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
//   - STEP-1 supplementary appendix BP table (PMID 33567185)
//   - SURMOUNT-1 supplementary appendix BP table (PMID 35658024)
//   - SELECT cardiovascular outcomes trial (Lincoff et al. NEJM 2023, PMID 38018037)
//   - Marso et al. LEADER 2016 (PMID 27295427) — liraglutide CV outcomes
//   - Davies et al. SUSTAIN-6 (PMID 27633186) — semaglutide CV outcomes
//   - Sun et al. 2015 meta-analysis of GLP-1 RA blood pressure effects
//   - Wegovy/Zepbound FDA labels Section 5 + Section 14 efficacy

export default function GlpBloodPressureArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Wilding JPH, Batterham RL, Calanna S, Davies M, Van Gaal LF, Lingvay I, McGowan BM, Rosenstock J, Tran MTD, Wadden TA, Wharton S, Yokote K, Zeuthen N, Kushner RF; STEP 1 Study Group.",
      title:
        "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1) — supplementary appendix blood pressure analyses.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33567185",
    },
    {
      authors:
        "Jastreboff AM, Aronne LJ, Ahmad NN, Wharton S, Connery L, Alves B, Kiyosue A, Zhang S, Liu B, Bunck MC, Stefanski A; SURMOUNT-1 Investigators.",
      title:
        "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1) — supplementary appendix cardiovascular safety.",
      source: "N Engl J Med",
      year: 2022,
      pmid: "35658024",
    },
    {
      authors:
        "Lincoff AM, Brown-Frandsen K, Colhoun HM, Deanfield J, Emerson SS, Esbjerg S, Hardt-Lindberg S, Hovingh GK, Kahn SE, Kushner RF, Lingvay I, Oral TK, Michelsen MM, Plutzky J, Tornøe CW, Ryan DH; SELECT Trial Investigators.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT).",
      source: "N Engl J Med",
      year: 2023,
      pmid: "38018037",
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
        "Sun F, Wu S, Guo S, Yu K, Yang Z, Li L, Zhang Y, Quan X, Ji L, Zhan S.",
      title:
        "Impact of GLP-1 receptor agonists on blood pressure, heart rate and hypertension among patients with type 2 diabetes: A systematic review and network meta-analysis.",
      source: "Diabetes Res Clin Pract",
      year: 2015,
      pmid: "26117686",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 5.5 Increase in Heart Rate and Section 14 Clinical Studies (BP secondary endpoints).",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 5.5 and Section 14.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Marso SP, Bain SC, Consoli A, Eliaschewitz FG, Jódar E, Leiter LA, Lingvay I, Rosenstock J, Seufert J, Warren ML, Woo V, Hansen O, Holst AG, Pettersson J, Vilsbøll T; SUSTAIN-6 Investigators.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes (SUSTAIN-6).",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27633186",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        The honest answer to &ldquo;does a GLP-1 affect my blood
        pressure&rdquo; is: yes, in two directions. On average,
        GLP-1 receptor agonists <em>lower</em> systolic blood
        pressure by about 5-7 mmHg and diastolic by 2-3 mmHg in
        the obesity registration trials, an effect partly
        explained by weight loss and partly direct vascular and
        renal mechanisms. They also <em>raise</em> resting heart
        rate by about 2-4 bpm in most patients, an effect that is
        in the FDA labels and worth knowing about. The 2023 SELECT
        cardiovascular outcomes trial showed that semaglutide 2.4
        mg reduced major adverse cardiovascular events by 20% in
        patients with obesity and pre-existing CV disease. This
        article walks through the trial-by-trial blood pressure
        evidence and the practical implications for patients on
        antihypertensive medications.
      </p>

      <h2>The trial-reported blood pressure effects</h2>
      <p>
        Blood pressure was a pre-specified secondary endpoint in
        every major GLP-1 weight management trial. The published
        results at the maintenance dose:
      </p>

      <h3>STEP-1 (semaglutide 2.4 mg)<Cite n={1} /></h3>
      <ul>
        <li>
          Mean systolic BP change: <strong>−6.2 mmHg</strong> on
          semaglutide vs −1.1 mmHg on placebo at week 68
        </li>
        <li>
          Mean diastolic BP change: <strong>−2.8 mmHg</strong> on
          semaglutide vs −0.4 mmHg on placebo
        </li>
        <li>
          Mean resting heart rate increase: <strong>+3 bpm</strong>{" "}
          on semaglutide
        </li>
      </ul>

      <h3>SURMOUNT-1 (tirzepatide 15 mg)<Cite n={2} /></h3>
      <ul>
        <li>
          Mean systolic BP change: <strong>−7.2 mmHg</strong> on
          tirzepatide 15 mg vs −1.0 mmHg on placebo at week 72
        </li>
        <li>
          Mean diastolic BP change: <strong>−4.8 mmHg</strong> on
          tirzepatide vs −0.8 mmHg placebo
        </li>
        <li>
          Mean resting heart rate increase:{" "}
          <strong>+2-4 bpm</strong> across the tirzepatide doses
        </li>
      </ul>

      <h3>SELECT (semaglutide 2.4 mg cardiovascular outcomes)<Cite n={3} /></h3>
      <p>
        SELECT was the largest cardiovascular outcomes trial of a
        GLP-1 in non-diabetic patients with obesity. n=17,604, mean
        follow-up 39.8 months, mean BMI 33. Headline result:
        <strong>20% reduction in major adverse cardiovascular
        events</strong> (cardiovascular death, non-fatal MI,
        non-fatal stroke) in the semaglutide arm vs placebo. The
        BP component contributed: at year 2, the semaglutide arm
        had a sustained 4.3 mmHg lower systolic BP than placebo,
        an effect that contributed to but did not fully explain
        the CV benefit.
      </p>

      <h3>LEADER and SUSTAIN-6 (older liraglutide and semaglutide
      diabetes trials)<Cite n={4} /><Cite n={8} /></h3>
      <p>
        Both the older liraglutide (LEADER) and semaglutide
        (SUSTAIN-6) cardiovascular outcomes trials in type 2
        diabetes also showed modest BP reductions (~1-2 mmHg) and
        heart rate increases (~3 bpm) at lower doses than the
        current obesity-management drugs.
      </p>

      <h2>The Sun 2015 meta-analysis</h2>
      <p>
        A network meta-analysis by Sun and colleagues<Cite n={5} />{" "}
        pooled blood pressure data across 33 randomized trials of
        GLP-1 receptor agonists in type 2 diabetes (n=12,469
        patients). The pooled effect: a mean systolic BP reduction
        of 2.2 mmHg vs placebo across older GLP-1s at lower doses.
        At the higher doses now used for weight management (Wegovy
        2.4 mg, Zepbound 15 mg), the BP effect is roughly 2-3 times
        larger.
      </p>

      <h2>Why GLP-1s lower blood pressure</h2>
      <p>
        Three mechanisms contribute:
      </p>
      <ol>
        <li>
          <strong>Weight loss.</strong> Each kilogram of body
          weight lost is associated with approximately 1 mmHg
          reduction in systolic BP in non-pharmacologic
          interventions. A patient losing 15% body weight on a
          GLP-1 (mean STEP-1 result) loses about 14-15 kg, which
          predicts a ~10-15 mmHg systolic reduction from weight
          alone.
        </li>
        <li>
          <strong>Natriuresis (sodium excretion).</strong> GLP-1
          receptors are expressed in the proximal tubule of the
          kidney and activation increases sodium excretion, which
          reduces extracellular volume and blood pressure
          independent of weight loss.
        </li>
        <li>
          <strong>Direct vascular effects.</strong> GLP-1 receptors
          are expressed on vascular endothelium and smooth muscle.
          Activation produces vasodilation via nitric oxide
          pathways, contributing further to the BP reduction.
        </li>
      </ol>
      <p>
        The net result is a BP reduction that exceeds what you
        would predict from the weight loss alone — meaning some
        of the effect is genuinely pharmacologic, not just a
        secondary consequence of getting smaller.
      </p>

      <h2>The heart rate increase — the labeled adverse effect</h2>
      <p>
        The other side of the cardiovascular story is that GLP-1s
        increase resting heart rate by about 2-4 bpm in most
        patients<Cite n={6} /><Cite n={7} />. This is in Section
        5.5 of the Wegovy and Zepbound labels and is consistently
        seen across the GLP-1 class. The mechanism is thought to
        involve GLP-1 receptor activation in the sinoatrial node
        and possibly increased sympathetic tone.
      </p>
      <p>
        The clinical significance of a 2-4 bpm increase is small
        for most patients. It is not clinically meaningful in
        someone with a baseline heart rate of 70 bpm. It can be
        more concerning in patients with:
      </p>
      <ul>
        <li>
          Pre-existing tachyarrhythmias (atrial fibrillation,
          supraventricular tachycardia)
        </li>
        <li>
          Heart failure with preserved ejection fraction (HFpEF)
        </li>
        <li>
          Long QT syndrome or other repolarization abnormalities
        </li>
        <li>
          Untreated thyroid disease
        </li>
      </ul>

      <h2>Practical implications for patients on antihypertensive medications</h2>
      <p>
        If you are on blood pressure medication when you start a
        GLP-1, the BP-lowering effect can stack with your existing
        therapy in a few weeks to months and you may need to
        reduce or stop antihypertensive doses. Patient experience
        and clinical guidance:
      </p>
      <ul>
        <li>
          <strong>Monitor blood pressure at home weekly</strong>{" "}
          during the first 3-6 months of GLP-1 therapy. A simple
          home cuff is enough.
        </li>
        <li>
          <strong>Symptomatic hypotension</strong> — dizziness on
          standing, lightheadedness, fainting — is a sign that
          your blood pressure is now too low for your current
          antihypertensive dose. Call your prescriber.
        </li>
        <li>
          <strong>Diuretics first to deprescribe.</strong> The
          natriuretic effect of GLP-1s overlaps with thiazide and
          loop diuretics; many patients can taper diuretics first
          when their BP starts running low.
        </li>
        <li>
          <strong>Beta blockers</strong> may need to be reduced or
          continued depending on the indication. Patients on a
          beta blocker for tachycardia or atrial fibrillation
          should keep it; patients on a beta blocker only for
          hypertension may be able to taper.
        </li>
        <li>
          <strong>ACE inhibitors and ARBs</strong> are typically
          the last to deprescribe because they have non-BP
          benefits (renal protection in diabetes, post-MI
          remodeling).
        </li>
      </ul>
      <p>
        The deprescribing decision should always be made by the
        clinician managing your blood pressure, not unilaterally.
        See our{" "}
        <Link href="/tools/glp1-drug-interaction-checker">
          GLP-1 drug interaction checker
        </Link>{" "}
        for the antihypertensive interaction entries.
      </p>

      <h2>What if your blood pressure goes UP on a GLP-1?</h2>
      <p>
        Population means hide individual variation. A small
        fraction of patients see modest BP increases on a GLP-1
        despite the average effect being downward. Reasons this
        can happen include:
      </p>
      <ul>
        <li>
          <strong>The heart rate increase</strong> can produce a
          small reflex BP rise in some patients
        </li>
        <li>
          <strong>White-coat hypertension</strong> stress from
          frequent prescriber visits during titration
        </li>
        <li>
          <strong>Stopping a previously tolerated antihypertensive</strong>{" "}
          when starting GLP-1, anticipating a drop that
          didn&apos;t materialize as quickly
        </li>
        <li>
          <strong>Independent BP rise unrelated to GLP-1</strong>{" "}
          — pre-existing hypertension that&apos;s progressing on
          its own trajectory
        </li>
        <li>
          <strong>
            Drug interaction with sympathomimetics
          </strong>{" "}
          (e.g., decongestants like pseudoephedrine, ADHD
          stimulants, or phentermine — see our{" "}
          <Link href="/research/can-you-take-phentermine-with-glp1">
            phentermine + GLP-1 article
          </Link>
          )
        </li>
      </ul>
      <p>
        If your home BP readings are trending up despite weight
        loss on a GLP-1, check the simple things first (cuff
        technique, time of day, recent caffeine, recent
        decongestant use) and then call your prescriber.
      </p>

      <h2>The cardiovascular outcomes case (SELECT)<Cite n={3} /></h2>
      <p>
        The SELECT trial is the strongest evidence that the BP
        reduction translates to real cardiovascular benefit. In a
        population of 17,604 adults with obesity (BMI ≥27) and
        pre-existing cardiovascular disease but no diabetes,
        semaglutide 2.4 mg vs placebo over a mean 39.8 months:
      </p>
      <ul>
        <li>
          <strong>20% reduction</strong> in the primary composite
          (cardiovascular death, non-fatal MI, non-fatal stroke):
          HR 0.80, 95% CI 0.72-0.90
        </li>
        <li>
          15% reduction in cardiovascular death
        </li>
        <li>
          19% reduction in heart failure hospitalization
        </li>
        <li>
          The BP component (4.3 mmHg lower systolic at year 2)
          contributed to but did not fully explain the benefit
        </li>
      </ul>
      <p>
        On the strength of SELECT, the FDA added a labeled
        cardiovascular benefit indication to Wegovy in 2024 — the
        first weight-loss drug with formal cardiovascular outcome
        labeling. Zepbound and Foundayo do not yet have this
        indication; their cardiovascular outcome trials are
        either still running (SURPASS-CVOT for tirzepatide) or
        haven&apos;t been initiated.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          GLP-1 receptor agonists lower systolic blood pressure by
          about 5-7 mmHg and diastolic by 2-3 mmHg on average at
          the maintenance dose.
        </li>
        <li>
          The mechanism is part weight loss, part natriuresis,
          part direct vascular effect.
        </li>
        <li>
          The same drugs raise resting heart rate by about 2-4
          bpm — in the FDA labels as a Section 5.5 warning, but
          clinically minor for most patients.
        </li>
        <li>
          Patients on antihypertensive medication should monitor
          BP at home weekly during the first 3-6 months and
          coordinate dose reductions with their prescriber.
        </li>
        <li>
          The 2023 SELECT trial showed semaglutide 2.4 mg reduced
          major adverse cardiovascular events by 20% in patients
          with obesity and pre-existing CV disease — leading to a
          formal cardiovascular benefit indication on the Wegovy
          label.
        </li>
        <li>
          A small number of patients see BP increases despite the
          average effect being downward; check simple causes
          first and call your prescriber.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT trial: cardiovascular benefits in non-diabetics
          </Link>{" "}
          — the full SELECT review
        </li>
        <li>
          <Link href="/research/flow-trial-semaglutide-kidney-disease">
            FLOW trial: semaglutide in kidney disease
          </Link>{" "}
          — the renal outcomes companion
        </li>
        <li>
          <Link href="/research/step-hfpef-semaglutide-heart-failure">
            STEP-HFpEF: semaglutide in heart failure
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>
        </li>
        <li>
          <Link href="/research/can-you-take-phentermine-with-glp1">
            Can you take phentermine with a GLP-1?
          </Link>{" "}
          — the cardiovascular load argument against combination
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-bmi-calculator">
            GLP-1 BMI calculator
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Blood
        pressure management decisions, including starting,
        stopping, or adjusting any antihypertensive medication,
        should always be made with the prescribing clinician. If
        you experience symptomatic hypotension, severe headache,
        unusual chest discomfort, or other cardiovascular symptoms
        on a GLP-1, contact your prescriber promptly.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
