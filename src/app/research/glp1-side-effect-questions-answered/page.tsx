import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

// FAQPage JSON-LD source. Each item maps to a real H2 question and
// its first paragraph in the article body — Google penalizes
// FAQPage schema with hidden or made-up content. Plain text only,
// under ~300 characters per answer for best SERP rendering.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does semaglutide cause headaches?",
    answer:
      "Yes. STEP-1 reported headache in 14.2% of semaglutide 2.4 mg patients vs 10.0% of placebo, so the drug-attributable rate is about 4 percentage points (~1 in 25 patients). The most common mechanism is dehydration from blunted thirst plus rapid weight loss. Increase water intake to 2-3 L per day.",
  },
  {
    question: "Does tirzepatide cause sulfur burps?",
    answer:
      "Yes — eructation (burping) is listed as a common adverse reaction in the Wegovy and Zepbound FDA labels. Patient-reported 'sulfur' or 'rotten-egg' burps are thought to be driven by slowed gastric emptying changing the bacterial fermentation profile in the upper GI tract. Smaller meals, less fat, and less garlic/onion/eggs in the first weeks of titration typically help.",
  },
  {
    question: "Does semaglutide or tirzepatide cause depression?",
    answer:
      "The 2024 EMA Pharmacovigilance Risk Assessment Committee review of GLP-1 receptor agonists found no causal association with depression or suicidal ideation in randomized trial data. A separate observational signal in some patient cohorts exists but is not currently considered causal. Patients with history of depression should monitor mood actively in the first 8-12 weeks and discuss any changes with their prescriber.",
  },
  {
    question: "Does GLP-1 cause brain fog?",
    answer:
      "Brain fog is not on the FDA label adverse reactions table for Wegovy or Zepbound and was not tracked as a formal adverse event in STEP-1 or SURMOUNT-1. The FDA's Adverse Event Reporting System (FAERS) has received some reports of cognitive complaints associated with GLP-1 receptor agonists, but no causal signal has been established. Possible mechanisms include dehydration, hypoglycemia (especially with insulin/sulfonylurea co-treatment), and rapid weight loss. Patients reporting brain fog should discuss it with their prescriber.",
  },
  {
    question: "Does semaglutide or tirzepatide cause acne?",
    answer:
      "Acne is not on the FDA label adverse reactions table for either drug and has not been formally established as a causal effect in any randomized trial. Some patients do report worsening acne while on GLP-1s; the mechanism is not established. Most patient reports describe the acne as transient and improving over the first few months of treatment.",
  },
  {
    question: "Does GLP-1 affect sleep or cause insomnia?",
    answer:
      "Insomnia is not on the FDA label as a primary GLP-1 side effect but appears in postmarketing patient reports. Possible mechanisms: nighttime nausea, evening hypoglycemia in diabetic patients, or the heart rate increase that GLP-1s produce (2-4 bpm baseline shift). Try injecting in the morning instead of evening, eat a small protein-containing snack 1-2 hours before bed, and avoid late caffeine.",
  },
  {
    question: "Does GLP-1 affect libido or sexual function?",
    answer:
      "There is no causal trial signal for libido or sexual dysfunction on GLP-1s, and randomized trials did not report elevated rates. The background rate of sexual dysfunction in obese populations is high, so attribution of individual patient reports is difficult. In general, weight loss itself often improves sexual function over time.",
  },
  {
    question: "Does GLP-1 cause body odor changes?",
    answer:
      "Patient reports of body odor changes on GLP-1s are not on the FDA label and have no published trial data. The most plausible mechanism is metabolic: rapid weight loss releases stored fatty acids and can transiently change skin microbiome and sweat composition. Usually transient and resolves once weight stabilizes.",
  },
  {
    question: "Does GLP-1 cause cold intolerance or temperature changes?",
    answer:
      "Cold intolerance is not on the FDA label but is a recurring patient report. The most likely mechanism is the loss of insulating subcutaneous fat as patients lose weight rapidly. It is not a drug-specific effect — it is a general consequence of large fat-mass reduction. Layer up and watch for thyroid symptoms (which can also cause cold intolerance and warrant a workup).",
  },
  {
    question: "Does GLP-1 affect taste (dysgeusia)?",
    answer:
      "Dysgeusia (altered taste) is in the FDA label adverse reactions table for both Wegovy and Zepbound, with a rate of approximately 1.7% on Wegovy vs 0.5% on placebo in STEP-1. Most commonly described as metallic or muted taste, particularly in the first 4-8 weeks. Usually improves as the body adapts to the maintenance dose.",
  },
];

const SLUG = "glp1-side-effect-questions-answered";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": `/research/${SLUG}`,
        es: "/research/efectos-secundarios-glp1-preguntas-respuestas",
        "es-US": "/research/efectos-secundarios-glp1-preguntas-respuestas",
      },
    },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Every reported rate in this article was verified by an editorial
// research subagent against the STEP-1 (PMID 33567185) and SURMOUNT-1
// (PMID 35658024) NEJM publications and the FDA-approved Wegovy and
// Zepbound prescribing information adverse reactions tables.
// Confidence levels:
//   HIGH = direct from FDA label adverse reactions table or RCT publication
//   MEDIUM = peer-reviewed paper but not in primary trial AE table
//   LOW = patient-reported / pharmacovigilance signal only
// The 2024 EMA suicidal ideation review and the FDA brain fog
// pharmacovigilance signal are flagged where the evidence base is
// thinner than the headline patient question implies.

export default function SideEffectQAArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
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
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 6 Adverse Reactions table.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 6 Adverse Reactions table.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Wharton S, Davies M, Dicker D, Lingvay I, Mosenzon O, Rubino DM, Pedersen SD.",
      title:
        "Managing the gastrointestinal side effects of GLP-1 receptor agonists in obesity: recommendations for clinical practice.",
      source: "Postgraduate Medicine",
      year: 2022,
      pmid: "36177722",
    },
    {
      authors:
        "European Medicines Agency.",
      title:
        "PRAC review of GLP-1 receptor agonists and risk of suicidal thoughts and self-harm — concluded April 2024.",
      source: "EMA Pharmacovigilance Risk Assessment Committee",
      year: 2024,
      url: "https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-8-11-april-2024",
    },
    {
      authors:
        "Malhotra A, Grunstein RR, Fietze I, Weaver TE, Redline S, Azarbarzin A, Sands SA, Schwab RJ, Dunn JP, Chakladar S, Bednarik J, Bunck MC; SURMOUNT-OSA Investigators.",
      title:
        "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity (SURMOUNT-OSA).",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38912654",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <p data-speakable="lead">
        Our broader{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>{" "}
        covers the headline GI tolerability numbers from STEP-1 and
        SURMOUNT-1. This article answers the specific Q&amp;A queries
        patients search for: <em>does semaglutide cause headaches</em>{" "}
        (yes — 14.2% in STEP-1 vs 10% placebo), <em>does tirzepatide
        cause sulfur burps</em> (yes — slowed gastric emptying changes
        the bacterial fermentation profile), <em>does semaglutide
        cause depression</em> (no signal in the 2024 EMA review of
        randomized trial data, but a separate observational signal
        exists), <em>does GLP-1 cause brain fog</em> (an emerging FDA
        pharmacovigilance signal as of 2025). Every rate is sourced
        from the STEP-1 and SURMOUNT-1 NEJM publications and the
        Wegovy and Zepbound FDA prescribing information [1, 2, 3, 4].
      </p>

      <h2>The verified rate table</h2>

      <p>
        Verified rates from the FDA label adverse reactions tables
        and the published trial AE supplements [1, 2, 3, 4]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Side effect</th>
            <th>Sema (Wegovy)</th>
            <th>Tirz (Zepbound)</th>
            <th>Placebo</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nausea</td>
            <td>43.9%</td>
            <td>24.6-33.3%</td>
            <td>9-16%</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td>24.5%</td>
            <td>8.3-12.2%</td>
            <td>1.7-6.3%</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>Diarrhea</td>
            <td>29.7%</td>
            <td>18.7-23.0%</td>
            <td>7.3-15.9%</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>Constipation</td>
            <td>24.2%</td>
            <td>11.7-17.1%</td>
            <td>5.8-11.1%</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>Headache</td>
            <td>14.2%</td>
            <td>~9-12%</td>
            <td>10.0%</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>Eructation (sulfur burps)</td>
            <td>≥5% (label)</td>
            <td>listed (label)</td>
            <td>lower</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>GERD / acid reflux</td>
            <td>~11%</td>
            <td>~6%</td>
            <td>2-3%</td>
            <td>HIGH</td>
          </tr>
          <tr>
            <td>Dizziness</td>
            <td>~8%</td>
            <td>~6%</td>
            <td>~5%</td>
            <td>MEDIUM</td>
          </tr>
          <tr>
            <td>Dysgeusia (taste changes)</td>
            <td>~1.7%</td>
            <td>not commonly reported</td>
            <td>&lt;1%</td>
            <td>MEDIUM</td>
          </tr>
          <tr>
            <td>Mood / depression</td>
            <td>not elevated in RCTs</td>
            <td>not elevated in RCTs</td>
            <td>—</td>
            <td>MEDIUM (RCTs); LOW (observational)</td>
          </tr>
          <tr>
            <td>Insomnia</td>
            <td>not in label AE table</td>
            <td>not in label AE table</td>
            <td>—</td>
            <td>LOW</td>
          </tr>
          <tr>
            <td>Acne (post-hoc cohort)</td>
            <td>not in trial</td>
            <td>not in trial</td>
            <td>—</td>
            <td>LOW (observational only)</td>
          </tr>
          <tr>
            <td>Brain fog (FDA FAERS)</td>
            <td>emerging signal</td>
            <td>emerging signal</td>
            <td>—</td>
            <td>LOW (pharmacovigilance only)</td>
          </tr>
        </tbody>
      </table>

      <h2>Does semaglutide cause headaches?</h2>

      <p>
        Yes. STEP-1 reported headache in <strong>14.2% of
        semaglutide 2.4 mg patients vs 10.0% of placebo</strong>
        [1, 3]. The drug-attributable rate (~4 percentage points
        above placebo) is real but modest — about 1 in 25 patients
        experiences a drug-related headache that they wouldn&apos;t
        have had on placebo.
      </p>

      <p>
        The most common mechanism is dehydration. GLP-1 patients
        commonly drink less water (thirst is blunted along with
        appetite), produce slightly more nausea-related fluid loss
        in the early dose steps, and lose weight rapidly enough to
        trigger headaches in some individuals. The headache pattern
        usually improves once the patient stabilizes water intake
        and the body adapts to the maintenance dose.
      </p>

      <p>
        <strong>What to do:</strong> increase water intake to 2-3
        liters per day, watch for nausea-induced dehydration, take
        OTC pain relief if needed (acetaminophen or NSAIDs per your
        prescriber&apos;s guidance). Call your prescriber if
        headaches are severe, persistent past the first 4-6 weeks,
        or accompanied by visual changes.
      </p>

      <h2>Does tirzepatide cause sulfur burps?</h2>

      <p>
        Yes — and this is one of the most-searched and most-
        confusing GLP-1 side effects. Eructation (the clinical
        term for burping) is listed in the Wegovy and Zepbound
        FDA label adverse reactions sections as a common reaction
        occurring more frequently than on placebo [3, 4]. The
        Wegovy label lists it among adverse reactions reported
        in at least 5% of treated patients.
      </p>

      <p>
        The patient-reported &ldquo;sulfur burps&rdquo; or &ldquo;rotten egg burps&rdquo;
        phenomenon has a specific mechanism: GLP-1s slow gastric
        emptying, which means food sits in the stomach longer than
        usual. The longer food substrate is available for bacteria
        in the upper GI tract, the more those bacteria can produce
        hydrogen sulfide gas (H₂S) — which is the chemical
        responsible for the rotten-egg smell. Patients with diets
        higher in sulfur-containing foods (eggs, broccoli,
        cauliflower, garlic, onions, red meat, dairy) are more
        likely to notice this effect.
      </p>

      <p>
        <strong>What to do:</strong> reduce dietary sulfur load
        temporarily during the early dose steps, ensure smaller
        meals (large meals amplify the slow-emptying effect), and
        give the body time to adapt. The phenomenon usually
        improves significantly after the first 4-8 weeks of
        therapy.
      </p>

      <h2>Does semaglutide or tirzepatide cause depression?</h2>

      <p>
        <strong>The headline answer is no — but the evidence base
        is genuinely mixed and the question deserves a careful
        explanation.</strong>
      </p>

      <p>
        In the STEP-1 and SURMOUNT-1 randomized trials, mood changes
        and depression were not elevated above placebo at any
        statistically meaningful rate [1, 2]. Both trials
        specifically tracked psychiatric AEs and neither flagged a
        signal.
      </p>

      <p>
        In late 2023, anecdotal reports of suicidal ideation in
        GLP-1 users prompted the European Medicines Agency&apos;s
        Pharmacovigilance Risk Assessment Committee (PRAC) to open
        a formal review [6]. <strong>The PRAC concluded the review
        in April 2024 finding no evidence of a causal association
        between GLP-1 receptor agonists and suicidal thoughts or
        self-harm.</strong> The FDA conducted a parallel analysis
        and reached a similar conclusion. Neither agency added a
        warning to the GLP-1 labels.
      </p>

      <p>
        However, separate observational and database studies have
        reported mixed signals. A 2024 large EHR cohort study
        reported a numerically higher depression diagnosis rate in
        GLP-1 users vs matched controls; other observational
        studies have reported no association or even a protective
        effect (consistent with the documented improvement in
        weight-related psychological burden). The discrepancy
        between RCT data (no signal) and observational data
        (mixed) is unresolved.
      </p>

      <p>
        <strong>What to do:</strong> if you have a personal history
        of depression, anxiety, or suicidal ideation, discuss
        GLP-1 therapy with both your prescriber and a mental health
        provider before starting. Monitor mood actively in the
        first 8-12 weeks. Call your prescriber or seek urgent care
        if you experience persistent mood changes or thoughts of
        self-harm.
      </p>

      <h2>Does GLP-1 cause brain fog?</h2>

      <p>
        The trial AE tables in STEP-1 and SURMOUNT-1 do not list
        brain fog or cognitive impairment as a tracked adverse
        event [1, 2]. Brain fog is a non-specific patient-reported
        symptom that&apos;s difficult to measure in standard trial
        AE collection.
      </p>

      <p>
        The FDA&apos;s Adverse Event Reporting System (FAERS) has
        received some reports of cognitive complaints associated
        with GLP-1 receptor agonists, but no causal signal has
        been established and brain fog is not on the Wegovy or
        Zepbound label as of April 2026. Pharmacovigilance
        reports are hypothesis-generating, not confirmatory —
        we are deliberately not citing a specific reporting odds
        ratio here because we have not been able to source one
        to a peer-reviewed publication.
      </p>

      <p>
        Plausible mechanisms include central GLP-1 receptor
        activation in the hypothalamus and mesolimbic pathways
        (which can produce fatigue and lethargy), early-phase
        nutritional deficits during rapid caloric restriction, or
        dehydration. Paradoxically, longer-term observational
        data suggest GLP-1 use is associated with reduced
        Alzheimer&apos;s and dementia risk — so the brain fog
        signal, if real, may be transient and related to the
        early adjustment phase rather than a long-term concern.
      </p>

      <p>
        <strong>What to do:</strong> monitor cognitive function
        in the first 8-12 weeks. Ensure adequate hydration,
        protein intake, and B-vitamin status. Most patients
        report cognitive improvement (rather than worsening)
        over time as weight loss progresses and metabolic markers
        improve. Persistent or worsening cognitive symptoms
        warrant a prescriber visit.
      </p>

      <h2>Does semaglutide or tirzepatide cause acne?</h2>

      <p>
        Acne is not in the STEP-1 or SURMOUNT-1 trial AE tables
        and is not in the FDA label adverse reactions sections
        for Wegovy or Zepbound [1, 2, 3, 4]. Some patients report
        worsening acne while on GLP-1s, but this has not been
        formally established as a causal effect in any randomized
        trial. We are not citing a specific magnitude here
        because we have not been able to source a peer-reviewed
        effect size to a primary publication.
      </p>

      <p>
        Plausible mechanisms discussed in the dermatology
        literature include shifts in growth-hormone and IGF-1
        signalling during rapid weight loss (which can increase
        sebum production) and the fact that rapid weight loss in
        any context can transiently affect skin barrier function
        and oil production. None of these have been confirmed as
        causal in the GLP-1 context specifically.
      </p>

      <p>
        <strong>What to do:</strong> standard acne management
        (gentle cleanser, OTC benzoyl peroxide or salicylic acid,
        avoid heavy moisturizers) is reasonable. If acne is severe
        or persists, see a dermatologist — there&apos;s no need to
        stop the GLP-1 unless directed by your provider.
      </p>

      <h2>Does GLP-1 affect sleep or cause insomnia?</h2>

      <p>
        Insomnia is not commonly reported in the STEP-1 or
        SURMOUNT-1 AE tables [1, 2]. The opposite finding is much
        better documented: <strong>tirzepatide
        substantially improves obstructive sleep apnea</strong> in
        obese patients, per the SURMOUNT-OSA trial (Malhotra et
        al., NEJM 2024, PMID 38912654) [7]. The trial reported up
        to a 2/3 reduction in OSA severity at the highest dose
        over 52 weeks, leading to an FDA-approved Zepbound
        indication for OSA in obesity in December 2024.
      </p>

      <p>
        Some patients report sleep-related symptoms like vivid
        dreams or temporary insomnia during the early dose steps.
        These are usually transient and resolve within 4-8 weeks.
        Sleep apnea improvement is a documented secondary benefit
        of GLP-1 therapy with rigorous trial evidence, while de
        novo insomnia is a patient-reported phenomenon without
        formal AE tracking.
      </p>

      <h2>Does GLP-1 affect libido or sexual function?</h2>

      <p>
        Sexual dysfunction is not in the STEP-1 or SURMOUNT-1 AE
        tables [1, 2] and is not on the Wegovy or Zepbound FDA
        label adverse reactions tables [3, 4]. Some
        patient-reported cases exist in post-marketing
        pharmacovigilance, but these are unconfirmed and we
        deliberately do not cite a specific count here because
        we could not source one to a peer-reviewed publication.
        The background rate of sexual dysfunction in obese
        populations is high, which makes individual attribution
        to the drug difficult.
      </p>

      <p>
        The much better-documented effect runs in the opposite
        direction: weight loss in obese patients <em>improves</em>{" "}
        sexual function across multiple domains. Bariatric surgery
        meta-analyses consistently show improvement in libido,
        erectile function, and sexual satisfaction following
        weight loss, and the GLP-1 weight loss magnitudes are
        comparable to early bariatric surgery results.
      </p>

      <p>
        Some patients on GLP-1 therapy do report transient libido
        changes during dose escalation, possibly related to early
        nausea, fatigue, or hormonal shifts during rapid weight
        loss. These usually resolve as the patient stabilizes on
        the maintenance dose.
      </p>

      <h2>Does GLP-1 cause body odor changes?</h2>

      <p>
        Body odor is not in the trial AE tables or the FDA
        label adverse reactions sections. Patient-reported body
        odor changes do appear in online communities and may
        relate to: (1) altered sweat substrate composition due to
        dietary changes, (2) GI dysbiosis from delayed gastric
        emptying changing the volatile compounds in breath and
        sweat, or (3) ketosis-related body odor during early rapid
        weight loss.
      </p>

      <p>
        This is a low-confidence patient-reported phenomenon. If
        you notice it, hydration, dietary fiber, and standard
        hygiene generally manage it.
      </p>

      <h2>Does GLP-1 cause cold intolerance or temperature changes?</h2>

      <p>
        Not in the trial AE tables. Patient-reported cold
        sensitivity on GLP-1 therapy likely relates to two factors:
        (1) loss of adipose tissue insulation during rapid weight
        loss reduces the body&apos;s passive insulation, and (2)
        reduced caloric intake decreases dietary thermogenesis
        (the heat produced by digesting and processing food).
      </p>

      <p>
        Both mechanisms are well-documented in any rapid-weight-
        loss context (diet, surgery, drug-induced). They are not
        specific to GLP-1s and they typically improve as the body
        adapts to the new weight set point.
      </p>

      <h2>Does GLP-1 affect taste (dysgeusia)?</h2>

      <p>
        Yes, modestly. Dysgeusia (taste changes) is reported in
        approximately <strong>1.7% of Wegovy patients</strong> in
        the FDA label adverse reactions table [3]. Patient reports
        often describe metallic taste, food aversions, or specific
        foods tasting &ldquo;off.&rdquo;
      </p>

      <p>
        The mechanism likely involves GLP-1 receptor expression on
        taste receptor cells of the tongue. The effect is usually
        mild and transient, resolving within the first 4-8 weeks
        of therapy.
      </p>

      <h2>What red-flag symptoms require medical attention</h2>

      <p>
        Most of the side effects in this article are mild,
        transient, and self-limiting. The following symptoms are
        different and indicate potentially serious complications
        documented in the Wegovy and Zepbound labels [3, 4]:
      </p>

      <ul>
        <li>
          <strong>Severe abdominal pain radiating to the back</strong>{" "}
          — possible pancreatitis. Stop the drug, go to ER.
        </li>
        <li>
          <strong>Yellowing of skin or eyes</strong> — possible
          gallbladder disease. Evaluate urgently.
        </li>
        <li>
          <strong>Severe or persistent vomiting with dark urine</strong>{" "}
          — dehydration risk and potential acute kidney injury.
        </li>
        <li>
          <strong>Severe allergic reactions</strong> (face/throat
          swelling, difficulty breathing, severe rash) — stop and
          go to ER immediately.
        </li>
        <li>
          <strong>Visual changes in T2D patients</strong> — possible
          diabetic retinopathy progression on Ozempic/Mounjaro.
        </li>
        <li>
          <strong>Neck lump, hoarseness, or trouble swallowing</strong>{" "}
          — rare thyroid C-cell concern, label warning.
        </li>
        <li>
          <strong>Persistent thoughts of self-harm</strong> — call
          a mental health provider or 988 (Suicide and Crisis
          Lifeline). Stop the drug if your prescriber recommends.
        </li>
      </ul>

      <h2>Important disclaimer</h2>

      <p>
        This article is educational and reports the verified
        adverse-event rates from the published trial literature
        and the FDA prescribing information. Individual responses
        vary substantially. None of this constitutes medical
        advice — any persistent or severe symptom should be
        evaluated by your prescriber or a qualified healthcare
        provider. Weight Loss Rankings does not provide medical
        advice, diagnosis, or treatment recommendations.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For the broader headline side-effect rates and management
        strategies, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          full GLP-1 side effects investigation
        </Link>
        . For the duration of the most-searched specific symptoms
        (fatigue, hair loss), see our{" "}
        <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
          fatigue + hair loss duration guide
        </Link>
        . For the timing context that determines when each side
        effect typically peaks and resolves, see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          how long does GLP-1 take to work guide
        </Link>
        . For the diet adjustments that minimize the GI side
        effects, see our{" "}
        <Link href="/research/what-to-eat-on-glp1-diet-protein-guide">
          GLP-1 diet guide
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
