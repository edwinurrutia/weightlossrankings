import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "vyvanse-adderall-stimulants-weight-glp1";

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

// Editorial note: every clinical claim verified against PubMed
// primary sources by a research subagent on 2026-04-08. PMIDs:
//   25587645  McElroy 2015 LDX dose-finding (corrected from 25587906)
//   26346638  McElroy 2016 Phase 3 pivotal trials
//   28700805  Hudson 2017 LDX maintenance
//   39258475  Grilo 2024 LDX maintenance
//   16815322  Hudson 2007 NCS-R BED prevalence
//   23290497  Kessler 2013 WHO BED prevalence
//   33567185  STEP-1 (already verified)
//   35658024  SURMOUNT-1 (already verified)

export default function StimulantsArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "McElroy SL, Hudson JI, Mitchell JE, Wilfley D, Ferreira-Cornwell MC, Gao J, Wang J, Whitaker T, Jonas J, Gasior M.",
      title:
        "Efficacy and Safety of Lisdexamfetamine for Treatment of Adults With Moderate to Severe Binge-Eating Disorder: A Randomized Clinical Trial.",
      source: "JAMA Psychiatry",
      year: 2015,
      pmid: "25587645",
    },
    {
      authors:
        "McElroy SL, Hudson J, Ferreira-Cornwell MC, Radewonuk J, Whitaker T, Gasior M.",
      title:
        "Lisdexamfetamine Dimesylate for Adults with Moderate to Severe Binge Eating Disorder: Results of Two Pivotal Phase 3 Randomized Controlled Trials.",
      source: "Neuropsychopharmacology",
      year: 2016,
      pmid: "26346638",
    },
    {
      authors:
        "Hudson JI, McElroy SL, Ferreira-Cornwell MC, Radewonuk J, Gasior M.",
      title:
        "Efficacy of Lisdexamfetamine in Adults With Moderate to Severe Binge-Eating Disorder: A Randomized Clinical Trial.",
      source: "JAMA Psychiatry",
      year: 2017,
      pmid: "28700805",
    },
    {
      authors:
        "Grilo CM, Lydecker JA, Gueorguieva R.",
      title:
        "Lisdexamfetamine maintenance treatment for binge-eating disorder: a randomized double-blind placebo-controlled trial.",
      source: "Psychol Med",
      year: 2024,
      pmid: "39258475",
    },
    {
      authors: "Hudson JI, Hiripi E, Pope HG Jr, Kessler RC.",
      title:
        "The prevalence and correlates of eating disorders in the National Comorbidity Survey Replication.",
      source: "Biol Psychiatry",
      year: 2007,
      pmid: "16815322",
    },
    {
      authors:
        "Kessler RC, Berglund PA, Chiu WT, Deitz AC, Hudson JI, Shahly V, Aguilar-Gaxiola S, Alonso J, Angermeyer MC, Benjet C, Bruffaerts R, de Girolamo G, de Graaf R, Maria Haro J, Kovess-Masfety V, O'Neill S, Posada-Villa J, Sasu C, Scott K, Viana MC, Xavier M.",
      title:
        "The prevalence and correlates of binge eating disorder in the World Health Organization World Mental Health Surveys.",
      source: "Biol Psychiatry",
      year: 2013,
      pmid: "23290497",
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
      authors: "Takeda Pharmaceuticals.",
      title:
        "VYVANSE (lisdexamfetamine dimesylate) capsules — US Prescribing Information including BED indication, cardiovascular and psychiatric warnings, and DEA Schedule II classification.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/021977s055lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Vyvanse (lisdexamfetamine) is the only FDA-approved
        medication for moderate-to-severe binge-eating disorder
        (BED) in adults. It is <strong>not</strong> approved for
        weight loss as a primary indication. Adderall (mixed
        amphetamine salts) is FDA-approved for ADHD and narcolepsy.
        It is <strong>also not</strong> approved for weight loss.
        Both are DEA Schedule II controlled substances with
        cardiovascular and psychiatric warnings. The published
        BED trial program (McElroy 2015 dose-finding<Cite n={1} />,
        McElroy 2016 Phase 3 pivotals<Cite n={2} />, Hudson 2017
        maintenance<Cite n={3} />, Grilo 2024 continuation
        <Cite n={4} />) is real and consistent: Vyvanse 50-70
        mg/day produces approximately <strong>&minus;5 kg</strong>{" "}
        weight loss as a secondary outcome alongside dramatic
        binge-frequency reductions. But that&apos;s the BED
        population &mdash; patients who meet DSM-5 BED criteria,
        not patients who occasionally overeat. Combining stimulants
        with a GLP-1 has zero RCT data and additive cardiovascular
        concerns. Here is the verified evidence.
      </p>

      <h2>The McElroy 2015 dose-finding trial</h2>
      <p>
        McElroy and colleagues<Cite n={1} /> randomized 259 adults
        with moderate-to-severe BED to lisdexamfetamine 30, 50, or
        70 mg/day or placebo over 11 weeks (3-week titration plus
        8-week maintenance). Primary endpoint: log-transformed
        binge-eating days per week.
      </p>
      <ul>
        <li>
          <strong>50 mg dose:</strong> significant binge-day
          reduction vs placebo (p=0.01)
        </li>
        <li>
          <strong>70 mg dose:</strong> significant binge-day
          reduction vs placebo (p&lt;0.001)
        </li>
        <li>
          <strong>30 mg dose:</strong> no significant difference
          from placebo
        </li>
      </ul>
      <p>
        4-week binge cessation rates: <strong>50% on 70 mg</strong>,
        42.2% on 50 mg, vs 21.3% on placebo. Weight loss as a
        secondary outcome:
      </p>
      <ul>
        <li>
          <strong>Placebo:</strong> &minus;0.1 kg
        </li>
        <li>
          <strong>30 mg:</strong> &minus;3.1 kg
        </li>
        <li>
          <strong>50 mg:</strong> &minus;4.9 kg
        </li>
        <li>
          <strong>70 mg:</strong> &minus;4.9 kg
        </li>
      </ul>
      <p>
        That weight loss is real and clinically meaningful, but it
        is the <em>secondary</em> endpoint of a BED trial, not a
        weight-loss trial. The 50 mg and 70 mg doses became the
        FDA-approved Vyvanse range for BED.
      </p>

      <h2>The 2016 pivotal Phase 3 trials</h2>
      <p>
        McElroy 2016<Cite n={2} /> reported the two pivotal Phase 3
        trials that supported the FDA approval. n=383 in Study 1
        and n=390 in Study 2; 12 weeks total (3-week titration + 9-week
        maintenance) at 50 or 70 mg/day vs placebo.
      </p>
      <ul>
        <li>
          <strong>Study 1:</strong> Vyvanse reduced binge-eating days
          by &minus;1.35 days/week more than placebo (p&lt;0.001)
        </li>
        <li>
          <strong>Study 2:</strong> Vyvanse reduced binge-eating days
          by &minus;1.66 days/week more than placebo (p&lt;0.001)
        </li>
      </ul>
      <p>
        Most common adverse events (≥10% of patients): dry mouth,
        insomnia, headache. Mean pulse rate increased 4.4-6.3 bpm
        in the active arms. The two trials together formed the
        basis for the FDA&apos;s January 30, 2015 approval of
        Vyvanse for moderate-to-severe BED in adults &mdash; the
        first and only FDA-approved BED medication.
      </p>

      <h2>The Hudson 2017 maintenance trial</h2>
      <p>
        Hudson 2017<Cite n={3} /> answered the durability question.
        418 patients entered a 12-week open-label optimization
        phase on Vyvanse; 275 completed and were randomized to
        continue Vyvanse vs switch to placebo for 26 additional
        weeks of double-blind maintenance.
      </p>
      <ul>
        <li>
          <strong>BED relapse over 6 months:</strong> 3.7% on
          Vyvanse (5/136 patients) vs 32.1% on placebo (42/131
          patients)
        </li>
        <li>
          <strong>Hazard ratio for relapse:</strong> 0.09 (95% CI
          0.04-0.23)
        </li>
      </ul>
      <p>
        The 6-month relapse data are striking. Vyvanse essentially
        eliminated relapse over 6 months in patients who had
        responded acutely &mdash; a much bigger maintenance effect
        than the original dose-finding trial would have predicted.
        This is the strongest single piece of evidence supporting
        long-term Vyvanse use in BED.
      </p>

      <h2>The Grilo 2024 continuation trial</h2>
      <p>
        Grilo 2024<Cite n={4} /> in Psychological Medicine
        (n=61) tested Vyvanse maintenance in patients who had
        responded to acute LDX with or without CBT. Smaller and
        more recent than the Hudson trial, with mixed-acute-treatment
        responders. Outcomes:
      </p>
      <ul>
        <li>
          <strong>BED relapse:</strong> 10.0% on LDX vs 17.9% on
          placebo (not statistically significant due to small n)
        </li>
        <li>
          <strong>Weight change at 12-week maintenance:</strong>{" "}
          &minus;2.3% LDX vs +2.2% placebo (statistically
          significant)
        </li>
        <li>
          Eating-disorder psychopathology stable on LDX, worsened
          on placebo
        </li>
      </ul>
      <p>
        The Grilo trial extends the Hudson 2017 finding into a
        more recent and slightly more diverse population. Same
        directional signal: Vyvanse maintains response in BED
        patients who initially benefited.
      </p>

      <h2>BED prevalence and overlap with obesity</h2>
      <p>
        Patients sometimes assume BED is rare. It isn&apos;t. Two
        major epidemiology studies bound the prevalence:
      </p>
      <p>
        <strong>Hudson 2007 (NCS-R)</strong><Cite n={5} /> reported
        from the National Comorbidity Survey Replication (n=9,282
        US community respondents):
      </p>
      <ul>
        <li>
          <strong>Lifetime BED prevalence:</strong> 3.5% in women,
          2.0% in men (overall ~2.8%)
        </li>
        <li>
          Strong association with severe obesity (BMI ≥40)
        </li>
        <li>
          Common comorbidity with mood, anxiety, and substance use
          disorders
        </li>
      </ul>
      <p>
        <strong>Kessler 2013</strong><Cite n={6} /> in 14-country
        WHO World Mental Health Surveys (n=24,124) reported a
        lifetime BED prevalence of 1.4% (range 0.8-1.9%) globally
        &mdash; somewhat lower than the US-only Hudson estimate.
        Both studies emphasized that fewer than half of people with
        BED ever receive treatment.
      </p>
      <p>
        BED is a distinct DSM-5 disorder &mdash; recurrent binge
        episodes (≥1 per week for ≥3 months) with marked distress,
        eating much more rapidly than normal, eating until
        uncomfortably full, eating large amounts when not
        physically hungry, eating alone due to embarrassment, and
        feelings of disgust or guilt afterward. It is{" "}
        <strong>not</strong> the same as &ldquo;I sometimes
        overeat&rdquo; and it requires a clinical diagnosis. Vyvanse
        is approved for the diagnosis, not the behavior in
        isolation.
      </p>

      <h2>Vyvanse cardiovascular and psychiatric warnings</h2>
      <p>
        The FDA label<Cite n={9} /> for Vyvanse carries a boxed
        warning for sudden death, myocardial infarction, and stroke.
        Specific concerns:
      </p>
      <ul>
        <li>
          <strong>Cardiovascular:</strong> mean systolic and
          diastolic BP increases of approximately 5-10 mmHg, mean
          resting HR increases of 4-6 bpm at therapeutic BED doses.
          Avoid in structural cardiac abnormalities, cardiomyopathy,
          coronary artery disease, and uncontrolled hypertension.
        </li>
        <li>
          <strong>Psychiatric:</strong> psychosis and mania risk,
          especially at higher doses; aggression, agitation, and
          paranoid ideation reported in a small proportion. Effects
          typically resolve 2-6 days after discontinuation.
        </li>
        <li>
          <strong>Seizure risk:</strong> lower than bupropion;
          ADHD stimulants are actually associated with lower
          seizure odds in adjusted analyses.
        </li>
        <li>
          <strong>Abuse and dependence:</strong> DEA Schedule II
          reflects high abuse potential. Lisdexamfetamine is a
          prodrug (lower immediate-release peak than d-amphetamine
          or methamphetamine), which somewhat reduces the abuse
          liability profile vs Adderall.
        </li>
      </ul>

      <h2>Adderall and weight loss</h2>
      <p>
        Adderall (mixed amphetamine salts) is FDA-approved for ADHD
        and narcolepsy. It is <strong>not</strong> approved for
        weight loss in any population, and any use for weight loss
        is off-label and not evidence-based. The pediatric ADHD
        literature documents weight effects (typically &minus;1 to
        &minus;2 kg in children on long-term stimulant treatment),
        but no RCT has tested Adderall specifically for weight loss
        in adults. The DEA explicitly warns that weight lost on
        stimulants is regained upon cessation and that misuse of
        prescription stimulants for cosmetic weight loss
        contributes to stimulant use disorder risk.
      </p>
      <p>
        Some obesity-medicine specialists prescribe Adderall
        off-label in patients with comorbid ADHD and obesity, with
        the rationale that treating the ADHD may improve dietary
        control and impulse regulation. This is a defensible
        clinical decision for patients with documented ADHD; it is
        not an evidence-based weight-loss intervention for
        non-ADHD patients.
      </p>

      <h2>Combining stimulants with a GLP-1</h2>
      <p>
        There is <strong>no published RCT</strong> on combining
        Vyvanse or Adderall with a GLP-1 receptor agonist. The
        closest precedent is the phentermine + GLP-1 literature,
        which we cover in our existing{" "}
        <Link href="/research/can-you-take-phentermine-with-glp1">
          phentermine + GLP-1 article
        </Link>
        . Theoretical concerns:
      </p>
      <ul>
        <li>
          <strong>Additive cardiovascular effects.</strong> Both
          drug classes elevate resting heart rate and blood
          pressure. The combination warrants baseline ECG, baseline
          BP, and ongoing monitoring.
        </li>
        <li>
          <strong>Additive appetite suppression.</strong> GLP-1s
          suppress appetite via vagal and CNS GLP-1R activation;
          stimulants suppress appetite via catecholaminergic
          mechanisms. The combination can produce excessive nausea,
          vomiting, gastric dysmotility, or insufficient caloric
          intake.
        </li>
        <li>
          <strong>Drug interaction risk.</strong> Amphetamines plus
          GLP-1 agonists on sympathomimetic tone is theoretically
          concerning, though no PK interaction is documented in
          the GLP-1 labels.
        </li>
        <li>
          <strong>Patient selection matters.</strong> A patient on
          Vyvanse for documented BED who develops obesity is a
          legitimate candidate for adding a GLP-1 with cardiovascular
          oversight. A patient on Adderall off-label for weight loss
          who wants to add a GLP-1 is in a much weaker
          evidence-and-safety position.
        </li>
      </ul>

      <h2>Vyvanse cost and access in 2026</h2>
      <p>
        Vyvanse went generic on August 25, 2023, when first generic
        approvals were granted to Actavis Elizabeth, Teva, Aurobindo,
        and others after the compound patent expired (February 24,
        2023) plus a 6-month pediatric exclusivity extension.
        Prices have dropped 50-85% from the brand peak. As of April
        2026, generic lisdexamfetamine is widely available at
        most US pharmacies.
      </p>
      <p>
        <strong>Adderall</strong>, by contrast, has been in active
        shortage since late 2022 due to API delays, manufacturer
        discontinuations (Mylan, Zydus discontinued IR tablets),
        and DEA quota constraints. The DEA increased the 2025
        amphetamine APQ from 21.2M to 26.5M grams; the 2026 APQ is
        24.2M grams (~14% above original proposal). As of April
        2026 the shortage continues with regional and dose-strength
        variability. This shortage has indirectly increased Vyvanse
        and other stimulant prescribing as substitutes.
      </p>
      <p>
        Both drugs are DEA Schedule II controlled substances:
      </p>
      <ul>
        <li>Written prescription required (no electronic auto-refills in most states)</li>
        <li>No refills allowed; new prescription required each fill</li>
        <li>Some states require triplicate or state-specific forms</li>
        <li>Pharmacy verification of prescriber DEA registration</li>
      </ul>

      <h2>Off-label vs on-label clarity</h2>
      <p>
        For a patient or clinician trying to make sense of all this:
      </p>
      <ul>
        <li>
          <strong>Vyvanse for diagnosed moderate-severe BED:</strong>{" "}
          on-label, evidence-based, FDA-approved. Weight loss is a
          documented secondary effect.
        </li>
        <li>
          <strong>Vyvanse for weight loss without BED:</strong>{" "}
          off-label, not evidence-based, not recommended.
        </li>
        <li>
          <strong>Adderall for ADHD:</strong> on-label, established.
          Weight loss is a secondary effect.
        </li>
        <li>
          <strong>Adderall for weight loss:</strong> off-label, not
          evidence-based, not recommended.
        </li>
        <li>
          <strong>Phentermine for weight loss:</strong> on-label,
          short-term (12 weeks). See our existing{" "}
          <Link href="/research/can-you-take-phentermine-with-glp1">
            phentermine + GLP-1 article
          </Link>
          .
        </li>
        <li>
          <strong>Qsymia (phentermine + topiramate):</strong>{" "}
          on-label, chronic weight management. See our{" "}
          <Link href="/research/topamax-qsymia-topiramate-weight-loss">
            Topamax / Qsymia article
          </Link>
          .
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Vyvanse is FDA-approved for moderate-severe BED in adults,
          NOT weight loss. Approval based on McElroy 2015
          dose-finding, McElroy 2016 pivotal Phase 3 trials, and
          Hudson 2017 maintenance trial.
        </li>
        <li>
          Vyvanse weight effect at 50-70 mg in BED trials: ~&minus;5
          kg, secondary outcome.
        </li>
        <li>
          BED lifetime prevalence: ~2.8% (Hudson 2007 NCS-R) to
          1.4% (Kessler 2013 WHO). Strongly associated with obesity
          but distinct from occasional overeating.
        </li>
        <li>
          Adderall has zero FDA approval for weight loss; off-label
          use is not evidence-based and not recommended.
        </li>
        <li>
          Both drugs are DEA Schedule II with cardiovascular and
          psychiatric warnings.
        </li>
        <li>
          No RCT data on stimulant + GLP-1 combinations. Theoretical
          additive cardiovascular and appetite-suppression concerns.
          Cite the phentermine + GLP-1 article as the closest
          analog.
        </li>
        <li>
          Vyvanse generic launched August 25, 2023; substantial
          price reductions. Adderall remains in shortage as of
          April 2026.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/can-you-take-phentermine-with-glp1">
            Can you take phentermine with a GLP-1?
          </Link>{" "}
          &mdash; the closest stimulant + GLP-1 precedent
        </li>
        <li>
          <Link href="/research/topamax-qsymia-topiramate-weight-loss">
            Topamax, Qsymia, and topiramate for weight loss
          </Link>{" "}
          &mdash; the FDA-approved phentermine + topiramate
          combination
        </li>
        <li>
          <Link href="/research/antidepressants-weight-glp1-evidence">
            Antidepressants and weight on a GLP-1
          </Link>{" "}
          &mdash; covers bupropion, the closest non-stimulant
          analog
        </li>
        <li>
          <Link href="/research/metformin-vs-glp1-weight-loss-evidence">
            Metformin and non-GLP-1 diabetes drugs for weight loss
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          &mdash; lookup any concomitant drug
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            GLP-1 side effects questions answered
          </Link>{" "}
          &mdash; including the cardiovascular signals that overlap
          with stimulant concerns
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice or a
        recommendation to use Vyvanse or Adderall for weight loss.
        Both are DEA Schedule II controlled substances with
        cardiovascular and psychiatric risks. Diagnosed
        binge-eating disorder is the only FDA-approved Vyvanse
        indication for adults; off-label use for weight loss alone
        is not evidence-based and warrants extreme caution.
        Decisions about stimulant therapy for any indication should
        be made with a qualified prescribing clinician (typically
        psychiatry or specialized obesity medicine) who can
        document the diagnosis, monitor cardiovascular and
        psychiatric status, and manage controlled-substance
        prescribing safely. Every primary source cited here was
        independently verified against PubMed and FDA on
        2026-04-08.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
