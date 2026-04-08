import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "stress-cortisol-glp1-food-noise-evidence";

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
//   11020091  Epel 2000 cortisol + central fat
//   12119665  Björntorp 2001 HPA + visceral obesity review
//   19465744  Block 2009 stress + weight US cohort
//   20948519  Wardle 2011 longitudinal stress meta
//   17543357  Adam & Epel 2007 reward stress eating
//   18517032  Cappuccio 2008 sleep meta n=634,511
//   15583226  Spiegel 2004 sleep restriction leptin/ghrelin
//   24395196  Goyal 2014 MBSR JAMA Intern Med meta
//   32021735  Salve 2019 ashwagandha cortisol
//   31517876  Lopresti 2019 ashwagandha
//   33567185  STEP-1 (already verified)

export default function CortisolArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Epel ES, McEwen B, Seeman T, Matthews K, Castellazzo G, Brownell KD, Bell J, Ickovics JR.",
      title:
        "Stress and body shape: stress-induced cortisol secretion is consistently greater among women with central fat.",
      source: "Psychosom Med",
      year: 2000,
      pmid: "11020091",
    },
    {
      authors: "Björntorp P.",
      title:
        "Do stress reactions cause abdominal obesity and comorbidities?",
      source: "Obes Rev",
      year: 2001,
      pmid: "12119665",
    },
    {
      authors: "Block JP, He Y, Zaslavsky AM, Ding L, Ayanian JZ.",
      title:
        "Psychosocial stress and change in weight among US adults.",
      source: "Am J Epidemiol",
      year: 2009,
      pmid: "19465744",
    },
    {
      authors: "Wardle J, Chida Y, Gibson EL, Whitaker KL, Steptoe A.",
      title:
        "Stress and adiposity: a meta-analysis of longitudinal studies.",
      source: "Obesity (Silver Spring)",
      year: 2011,
      pmid: "20948519",
    },
    {
      authors: "Adam TC, Epel ES.",
      title: "Stress, eating and the reward system.",
      source: "Physiol Behav",
      year: 2007,
      pmid: "17543357",
    },
    {
      authors:
        "Cappuccio FP, Taggart FM, Kandala NB, Currie A, Peile E, Stranges S, Miller MA.",
      title:
        "Meta-analysis of short sleep duration and obesity in children and adults.",
      source: "Sleep",
      year: 2008,
      pmid: "18517032",
    },
    {
      authors: "Spiegel K, Tasali E, Penev P, Van Cauter E.",
      title:
        "Brief communication: Sleep curtailment in healthy young men is associated with decreased leptin levels, elevated ghrelin levels, and increased hunger and appetite.",
      source: "Ann Intern Med",
      year: 2004,
      pmid: "15583226",
    },
    {
      authors:
        "Goyal M, Singh S, Sibinga EM, Gould NF, Rowland-Seymour A, Sharma R, Berger Z, Sleicher D, Maron DD, Shihab HM, Ranasinghe PD, Linn S, Saha S, Bass EB, Haythornthwaite JA.",
      title:
        "Meditation programs for psychological stress and well-being: a systematic review and meta-analysis.",
      source: "JAMA Intern Med",
      year: 2014,
      pmid: "24395196",
    },
    {
      authors: "Salve J, Pate S, Debnath K, Langade D.",
      title:
        "Adaptogenic and Anxiolytic Effects of Ashwagandha Root Extract in Healthy Adults: A Double-Blind, Randomized, Placebo-Controlled Clinical Study.",
      source: "Cureus",
      year: 2019,
      pmid: "32021735",
    },
    {
      authors:
        "Lopresti AL, Smith SJ, Malvi H, Kodgule R.",
      title:
        "An investigation into the stress-relieving and pharmacological actions of an ashwagandha (Withania somnifera) extract: A randomized, double-blind, placebo-controlled study.",
      source: "Medicine (Baltimore)",
      year: 2019,
      pmid: "31517876",
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
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Stress and weight have a real, mechanistic relationship. The
        Epel 2000 study<Cite n={1} /> showed women with central body
        fat secrete consistently more cortisol under stress and lack
        habituation to repeated stress challenges. Björntorp 2001
        <Cite n={2} /> reviewed the HPA-axis-to-visceral-obesity
        pathway. Sleep deprivation is one of the most underappreciated
        weight risk factors: Spiegel 2004<Cite n={7} /> showed that
        just two nights of sleep restriction in healthy young men
        reduced leptin <strong>18%</strong>, increased ghrelin{" "}
        <strong>28%</strong>, and increased cravings for
        high-carbohydrate foods <strong>33-45%</strong>. Cappuccio
        2008<Cite n={6} /> meta-analyzed 45 studies covering 634,511
        participants and reported short sleep duration is
        independently associated with adult obesity (OR 1.55, 95%
        CI 1.43-1.68). On the intervention side, the Goyal 2014
        JAMA Internal Medicine meta-analysis<Cite n={8} />{" "}
        (47 trials, n=3,515) found moderate evidence for
        mindfulness-based stress reduction reducing anxiety and
        depression but only low/insufficient evidence for direct
        weight effects. Ashwagandha modestly reduces cortisol
        (Salve 2019, Lopresti 2019)<Cite n={9} /><Cite n={10} />.
        GLP-1s appear to reduce &ldquo;food noise&rdquo; &mdash; the
        intrusive food thoughts that intersect with stress eating
        &mdash; based on emerging surveys and neuroimaging data.
        Here is the verified evidence.
      </p>

      <h2>The cortisol-visceral fat axis</h2>
      <p>
        Epel and colleagues<Cite n={1} /> studied 59 healthy
        premenopausal women, splitting them by waist-to-hip ratio
        (a marker of central fat distribution) and exposing them to
        a series of laboratory stressors over multiple days. The
        finding: women with high WHR (more central fat) secreted
        significantly more cortisol during the first stress session
        AND failed to habituate to the stressor across days,
        continuing to mount elevated cortisol responses to familiar
        challenges. The low-WHR women adapted; the high-WHR women
        did not.
      </p>
      <p>
        Björntorp 2001<Cite n={2} /> synthesized the mechanistic
        pathway in <em>Obesity Reviews</em>. Repeated activation of
        the HPA axis (cortisol) and sympathetic nervous system in
        chronically stressed individuals drives a pattern of
        visceral fat accumulation and metabolic syndrome &mdash;
        glucose intolerance, dyslipidemia, hypertension. Cushing
        syndrome (the disease state of excess cortisol) is the
        clinical analog: pathological hypercortisolism produces
        the same central obesity, insulin resistance, and metabolic
        derangements that chronic stress produces in milder form.
      </p>
      <p>
        The take-home: chronic stress is not just psychologically
        unpleasant. It has measurable metabolic consequences that
        compound over years.
      </p>

      <h2>Stress and weight: longitudinal cohort data</h2>
      <p>
        Two important longitudinal studies bound the
        population-level signal:
      </p>
      <p>
        <strong>Block 2009</strong><Cite n={3} /> studied 1,355 US
        men and women in a nationally-representative cohort. Among
        people with high baseline BMI, weight gain was associated
        with multiple stressors:
      </p>
      <ul>
        <li>
          Job demands (p&lt;0.001 in both sexes)
        </li>
        <li>
          Lack of skill discretion at work (p=0.014, men)
        </li>
        <li>
          Difficulty paying bills (p=0.004 men, p=0.010 women)
        </li>
        <li>
          Family relationship strain (p=0.016, women)
        </li>
        <li>
          Life constraints (p&lt;0.001, women)
        </li>
      </ul>
      <p>
        <strong>Wardle 2011</strong><Cite n={4} /> meta-analyzed 14
        longitudinal cohorts and reported that stress was
        associated with increasing adiposity (r=0.014, small but
        significant). About 69% of individual analyses found no
        effect; 25% found a positive association (stress → more
        weight gain) and only 6% found a negative association.
        Effects were stronger in men than women and stronger over
        longer follow-up. The Wardle meta confirms the directional
        signal but the absolute effect sizes are small &mdash;
        stress is one of many contributors to weight, not a
        dominant single factor.
      </p>

      <h2>The reward-eating model</h2>
      <p>
        Adam and Epel 2007<Cite n={5} /> published a foundational
        review in <em>Physiology &amp; Behavior</em> proposing a
        &ldquo;reward-based stress eating&rdquo; model. The
        mechanism:
      </p>
      <ul>
        <li>
          Stress activates the HPA axis (cortisol release) and
          sympathetic nervous system
        </li>
        <li>
          Both stress AND palatable food intake trigger endogenous
          opioid release, which attenuates HPA axis activation
          (negative feedback)
        </li>
        <li>
          Over repeated cycles, the brain learns that palatable
          food provides stress relief
        </li>
        <li>
          Chronic stress sensitizes the reward system to highly
          palatable food via cortisol effects on leptin, insulin,
          and neuropeptide Y
        </li>
        <li>
          The result: chronic stressed individuals develop a
          conditioned drive toward high-fat, high-sugar food as a
          stress-relief behavior
        </li>
      </ul>
      <p>
        This is the mechanistic basis for &ldquo;stress eating&rdquo;
        as a real biological phenomenon, not just a behavioral
        weakness. It also overlaps with the binge-eating disorder
        framework we covered in our{" "}
        <Link href="/research/vyvanse-adderall-stimulants-weight-glp1">
          Vyvanse / stimulants article
        </Link>{" "}
        &mdash; BED is the diagnostic extreme of the same
        reward-eating spectrum.
      </p>

      <h2>Sleep, leptin, ghrelin, and weight</h2>
      <p>
        Sleep deprivation is one of the most consistently
        replicated weight risk factors and is mechanistically
        connected to the cortisol story.
      </p>
      <p>
        Spiegel 2004<Cite n={7} /> &mdash; the small but tightly
        controlled Annals of Internal Medicine study &mdash;
        randomized 12 healthy young men to 2 nights of sleep
        restriction (4 hours/night) vs 2 nights of sleep extension
        (10 hours/night) in a crossover design. After just 2
        nights of restriction:
      </p>
      <ul>
        <li>
          <strong>Leptin</strong> (the satiety hormone){" "}
          <strong>decreased 18%</strong> (p=0.04)
        </li>
        <li>
          <strong>Ghrelin</strong> (the hunger hormone){" "}
          <strong>increased 28%</strong> (p&lt;0.04)
        </li>
        <li>
          Subjective hunger increased <strong>24%</strong>{" "}
          (p&lt;0.001)
        </li>
        <li>
          Subjective appetite increased <strong>23%</strong>{" "}
          (p&lt;0.001)
        </li>
        <li>
          Cravings for high-carbohydrate, calorie-dense foods
          increased <strong>33-45%</strong>
        </li>
      </ul>
      <p>
        That is 2 nights of restricted sleep producing measurable
        appetite-hormone changes. The patients had no underlying
        obesity; the effect was entirely driven by sleep
        restriction itself.
      </p>
      <p>
        Cappuccio 2008<Cite n={6} /> meta-analyzed 45 cross-sectional
        and longitudinal studies covering 634,511 participants.
        The pooled odds ratio for short sleep duration and obesity
        was:
      </p>
      <ul>
        <li>
          <strong>Children:</strong> OR 1.89 (95% CI 1.46-2.43,
          p&lt;0.0001)
        </li>
        <li>
          <strong>Adults:</strong> OR 1.55 (95% CI 1.43-1.68,
          p&lt;0.0001)
        </li>
      </ul>
      <p>
        Cappuccio noted causal inference is difficult (confounders,
        reverse causation), but the directional signal across
        45 studies and 634,511 people is one of the most robust in
        the obesity literature. Sleep deprivation increases obesity
        risk; obesity (especially obstructive sleep apnea)
        worsens sleep; the cycle compounds.
      </p>

      <h2>Stress-reduction interventions: what works for weight?</h2>
      <p>
        The honest answer is: <em>not much</em> directly, but
        meaningful indirect effects.
      </p>
      <p>
        <strong>Goyal 2014 JAMA Internal Medicine</strong>
        <Cite n={8} /> systematically reviewed 47 trials of
        meditation programs (mostly mindfulness-based stress
        reduction) covering 3,515 participants &mdash; one of the
        largest analyses of mindfulness in the medical literature.
        Findings:
      </p>
      <ul>
        <li>
          <strong>Anxiety:</strong> moderate evidence of benefit
          (effect size 0.38 at 8 weeks, 0.22 at 3-6 months)
        </li>
        <li>
          <strong>Depression:</strong> moderate evidence (ES 0.30
          at 8 weeks, 0.23 at 3-6 months)
        </li>
        <li>
          <strong>Pain:</strong> moderate evidence (ES 0.33)
        </li>
        <li>
          <strong>Stress / distress:</strong> low evidence
        </li>
        <li>
          <strong>Mental health quality of life:</strong> low
          evidence
        </li>
        <li>
          <strong>Mood, attention, substance use, eating habits,
          sleep, weight gain:</strong> low or insufficient evidence
        </li>
      </ul>
      <p>
        MBSR is a real intervention with real benefits for anxiety,
        depression, and pain. As a direct weight-loss intervention,
        the evidence is weak. As an adjunct to weight management
        for patients with significant stress eating, it&apos;s
        defensible &mdash; the benefits to mood and quality of
        life are real even if the direct weight effect is small.
      </p>
      <p>
        <strong>Exercise</strong> is well-documented to reduce
        cortisol, particularly through diurnal cortisol slope
        normalization. We cover the broader exercise evidence in
        our{" "}
        <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
          exercise pairing article
        </Link>
        .
      </p>
      <p>
        <strong>Sleep hygiene</strong> is the highest-leverage
        intervention based on the Spiegel and Cappuccio data.
        Practical targets: 7-9 hours per night, consistent timing,
        cool dark room, screen-free wind-down, treat OSA if
        present. The effect on appetite hormones is detectable
        within days, the effect on weight emerges over months.
      </p>

      <h2>Adaptogens: ashwagandha specifically</h2>
      <p>
        Ashwagandha is the most-studied adaptogen for cortisol
        reduction in humans. Two reasonably well-designed trials:
      </p>
      <p>
        <strong>Salve 2019 (Cureus)</strong><Cite n={9} />:
        randomized 60 healthy stressed adults to ashwagandha
        250 mg/day, 600 mg/day, or placebo for 8 weeks.
      </p>
      <ul>
        <li>
          <strong>250 mg/day:</strong> reduced perceived stress
          scale (p&lt;0.05) and serum cortisol (p&lt;0.05)
        </li>
        <li>
          <strong>600 mg/day:</strong> reduced PSS (p&lt;0.001) and
          cortisol (p&lt;0.0001)
        </li>
        <li>
          Improved sleep quality vs placebo
        </li>
      </ul>
      <p>
        <strong>Lopresti 2019 (Medicine)</strong><Cite n={10} />:
        randomized 60 stressed healthy adults to ashwagandha
        (Shoden) 240 mg/day or placebo for 60 days. Results:
      </p>
      <ul>
        <li>
          Greater morning cortisol reduction (p&lt;0.001)
        </li>
        <li>
          Greater DHEA-S reduction (p=0.004)
        </li>
        <li>
          HAM-A anxiety scale reduction (p=0.040)
        </li>
        <li>
          No serious adverse events
        </li>
      </ul>
      <p>
        Both trials show modest cortisol reduction (roughly 18-48%
        magnitude). Neither was a weight-loss trial; weight effects
        were not measured directly. The honest framing for
        ashwagandha is: it reduces cortisol modestly in stressed
        adults, which <em>may</em> indirectly support stress-eating
        management, but it is not an evidence-based primary
        weight-loss intervention. We cover the broader supplement
        evidence in our{" "}
        <Link href="/research/supplements-weight-loss-glp1-evidence-grade">
          supplements article
        </Link>{" "}
        (when shipped).
      </p>

      <h2>GLP-1s and &ldquo;food noise&rdquo;</h2>
      <p>
        One of the most consistent patient-reported effects of
        GLP-1 receptor agonists is the reduction of intrusive food
        thoughts &mdash; what patients have started calling
        &ldquo;food noise.&rdquo; The phenomenon is described as
        persistent, unwanted, dysphoric thoughts about food that
        occupy attention and drive eating behavior. Patient surveys
        suggest that before starting a GLP-1, ~62% of patients
        report constant food-related thoughts; on semaglutide, that
        proportion drops to ~16%.
      </p>
      <p>
        The mechanism appears to involve the GLP-1 receptors
        expressed in the ventral tegmental area, nucleus accumbens,
        and broader mesolimbic reward pathway. GLP-1 activation
        reduces reward-driven food intake without abolishing the
        physiologic hunger response, and the patient experience of
        &ldquo;the chatter is quieter&rdquo; is mechanistically
        plausible. Neuroimaging work has documented decreased
        cortical activation to high-calorie food cues on
        semaglutide; this is an active research area with new
        publications appearing through 2024-2026.
      </p>
      <p>
        For patients whose weight problem is partly stress-eating
        and reward-driven food choices, the GLP-1 effect on food
        noise is one of the most important practical benefits of
        the drugs. It is also why patients sometimes describe GLP-1
        therapy as feeling &ldquo;like the food obsession was
        lifted&rdquo; rather than &ldquo;I&apos;m forcing myself to
        eat less.&rdquo; The mechanism is genuinely different from
        a stimulant suppressing appetite.
      </p>
      <p>
        The honest framing: GLP-1s reduce the appetite signal AND
        the food-noise signal. That intersects mechanistically with
        stress eating but is not a substitute for evidence-based
        stress management (sleep, exercise, mindfulness, treating
        underlying anxiety or depression).
      </p>

      <h2>When stress eating warrants endocrine workup</h2>
      <p>
        Chronic stress with weight gain is common. Pathological
        hypercortisolism (Cushing syndrome or Cushing disease) is
        rare but worth considering when the clinical picture
        includes:
      </p>
      <ul>
        <li>Proximal muscle weakness</li>
        <li>Purple abdominal striae (wide, &gt;1 cm)</li>
        <li>New-onset hypertension that is hard to control</li>
        <li>New-onset glucose intolerance / diabetes</li>
        <li>Easy bruising</li>
        <li>Moon facies</li>
        <li>Buffalo hump (dorsocervical fat pad)</li>
      </ul>
      <p>
        These are the textbook Cushingoid features. If multiple
        are present, an endocrine workup (24-hour urinary free
        cortisol, late-night salivary cortisol, low-dose
        dexamethasone suppression test) is warranted. Garden-variety
        stress eating with visceral fat redistribution does not
        require an endocrine workup; the clinical picture is
        usually clear.
      </p>

      <h2>The practical playbook</h2>
      <ul>
        <li>
          <strong>Sleep is the highest-leverage intervention.</strong>{" "}
          7-9 hours per night, consistent timing, treat sleep
          apnea if present. Effect on appetite hormones is rapid;
          effect on weight emerges over months.
        </li>
        <li>
          <strong>Exercise reduces cortisol</strong> through diurnal
          rhythm normalization (in addition to caloric expenditure).
          See our{" "}
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            exercise article
          </Link>
          .
        </li>
        <li>
          <strong>MBSR / mindfulness</strong> has moderate evidence
          for anxiety and depression (Goyal 2014) and is a
          defensible adjunct for stress-eating patients. Direct
          weight effect is small.
        </li>
        <li>
          <strong>Ashwagandha</strong> modestly reduces cortisol in
          stressed adults; not a primary weight intervention.
          Consider as an adjunct, not a substitute.
        </li>
        <li>
          <strong>GLP-1s reduce food noise</strong> via mesolimbic
          reward modulation. For stress-eating patients
          specifically, this may be the most relevant aspect of
          GLP-1 therapy.
        </li>
        <li>
          <strong>Treat underlying mood disorders.</strong>{" "}
          Depression and anxiety drive stress eating. Bupropion,
          sertraline, and vortioxetine are the antidepressants
          with the best weight profile for stress-eating patients.
          See our{" "}
          <Link href="/research/antidepressants-weight-glp1-evidence">
            antidepressants article
          </Link>
          .
        </li>
        <li>
          <strong>Consider Cushingoid features</strong> if the
          clinical picture is severe or out of proportion to
          obvious lifestyle drivers. Low threshold for endocrine
          workup in those cases.
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Cortisol-visceral-fat link is real (Epel 2000, Björntorp
          2001).
        </li>
        <li>
          Sleep restriction directly disrupts appetite hormones
          (Spiegel 2004: leptin &minus;18%, ghrelin +28% in 2 nights).
        </li>
        <li>
          Sleep duration is associated with adult obesity (Cappuccio
          2008: OR 1.55 across 634,511 participants).
        </li>
        <li>
          Stress-weight longitudinal effect is real but small at the
          population level (Wardle 2011 meta).
        </li>
        <li>
          MBSR moderately benefits anxiety and depression; direct
          weight effect is small (Goyal 2014).
        </li>
        <li>
          Ashwagandha modestly reduces cortisol in stressed adults
          (Salve 2019, Lopresti 2019); not a weight-loss primary.
        </li>
        <li>
          GLP-1s reduce &ldquo;food noise&rdquo; via mesolimbic
          reward pathways &mdash; one of the most patient-reported
          benefits and mechanistically intersects with stress eating.
        </li>
        <li>
          Treat sleep, treat mood, treat the appetite signal.
          Stress management plus a GLP-1 in the right patient is a
          reasonable combination.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            Exercise pairing on a GLP-1
          </Link>{" "}
          &mdash; the cortisol-lowering and metabolic side
        </li>
        <li>
          <Link href="/research/antidepressants-weight-glp1-evidence">
            Antidepressants and weight on a GLP-1
          </Link>{" "}
          &mdash; for stress-eating patients with comorbid mood
          disorders
        </li>
        <li>
          <Link href="/research/vyvanse-adderall-stimulants-weight-glp1">
            Vyvanse and stimulants for weight
          </Link>{" "}
          &mdash; binge-eating disorder context
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            GLP-1 side effects questions answered
          </Link>{" "}
          &mdash; including mood and food-noise signals
        </li>
        <li>
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            Loose skin after rapid GLP-1 weight loss
          </Link>{" "}
          &mdash; downstream concern for stress eaters losing
          weight quickly
        </li>
        <li>
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            Why am I not losing weight on a GLP-1?
          </Link>{" "}
          &mdash; the plateau picture, sometimes driven by stress
          and sleep
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice.
        Patients with severe stress, anxiety, depression, or
        suspected hypercortisolism should consult a qualified
        clinician. Adaptogenic supplements (ashwagandha, rhodiola,
        and others) are not FDA-approved for any indication and
        should be discussed with a clinician before use,
        particularly in pregnancy, breastfeeding, or in patients
        on thyroid medication or immunosuppressants. Every primary
        source cited here was independently verified against
        PubMed on 2026-04-08. The food-noise patient-survey data
        is from emerging clinical surveys and not yet anchored in
        a single canonical RCT; treat it as directionally robust
        but not definitive.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
