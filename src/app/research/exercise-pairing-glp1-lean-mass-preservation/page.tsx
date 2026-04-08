import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "exercise-pairing-glp1-lean-mass-preservation";

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
//   33951361  Lundgren 2021 NEJM S-LiTE
//   28507015  Cava 2017 Adv Nutr lean mass preservation review
//   38937282  Neeland 2024 GLP-1 lean mass mitigation
//   26817506  Longland 2016 high-protein deficit RCT
//   19927027  Mettler 2010 protein in athletes
//   22196436  Aladro-Gonzalvo 2012 Pilates body composition
//   17275896  Murphy 2007 walking meta-analysis
//   32207799  Saint-Maurice 2020 JAMA step count
//   28401638  Wewege 2017 HIIT vs MICT
//   27058944  Lauche 2016 yoga meta-analysis
//   19127177  Donnelly 2009 ACSM position stand
//   21694556  Garber 2011 ACSM position stand
//   34623696  Murphy & Koehler 2022 energy deficit RT meta

export default function ExerciseGlp1Article() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Lundgren JR, Janus C, Jensen SBK, Juhl CR, Olsen LM, Christensen RM, Svane MS, Bandholm T, Bojsen-Møller KN, Blond MB, Jensen JB, Stallknecht BM, Holst JJ, Madsbad S, Torekov SS.",
      title:
        "Healthy Weight Loss Maintenance with Exercise, Liraglutide, or Both Combined.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33951361",
    },
    {
      authors: "Cava E, Yeat NC, Mittendorfer B.",
      title: "Preserving Healthy Muscle during Weight Loss.",
      source: "Adv Nutr",
      year: 2017,
      pmid: "28507015",
    },
    {
      authors: "Neeland IJ, Linge J, Birkenfeld AL.",
      title:
        "Changes in lean body mass with glucagon-like peptide-1-based therapies and mitigation strategies.",
      source: "Diabetes Obes Metab",
      year: 2024,
      pmid: "38937282",
    },
    {
      authors: "Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM.",
      title:
        "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss: a randomized trial.",
      source: "Am J Clin Nutr",
      year: 2016,
      pmid: "26817506",
    },
    {
      authors: "Mettler S, Mitchell N, Tipton KD.",
      title:
        "Increased protein intake reduces lean body mass loss during weight loss in athletes.",
      source: "Med Sci Sports Exerc",
      year: 2010,
      pmid: "19927027",
    },
    {
      authors: "Aladro-Gonzalvo AR, Machado-Díaz M, Moncada-Jiménez J, Hernández-Elizondo J, Araya-Vargas G.",
      title:
        "The effect of Pilates exercises on body composition: a systematic review.",
      source: "J Bodyw Mov Ther",
      year: 2012,
      pmid: "22196436",
    },
    {
      authors: "Murphy MH, Nevill AM, Murtagh EM, Holder RL.",
      title:
        "The effect of walking on fitness, fatness and resting blood pressure: a meta-analysis of randomised, controlled trials.",
      source: "Prev Med",
      year: 2007,
      pmid: "17275896",
    },
    {
      authors:
        "Saint-Maurice PF, Troiano RP, Bassett DR Jr, Graubard BI, Carlson SA, Shiroma EJ, Fulton JE, Matthews CE.",
      title:
        "Association of Daily Step Count and Step Intensity With Mortality Among US Adults.",
      source: "JAMA",
      year: 2020,
      pmid: "32207799",
    },
    {
      authors: "Wewege M, van den Berg R, Ward RE, Keech A.",
      title:
        "The effects of high-intensity interval training vs. moderate-intensity continuous training on body composition in overweight and obese adults: a systematic review and meta-analysis.",
      source: "Obes Rev",
      year: 2017,
      pmid: "28401638",
    },
    {
      authors: "Lauche R, Langhorst J, Lee MS, Dobos G, Cramer H.",
      title:
        "A systematic review and meta-analysis on the effects of yoga on weight-related outcomes.",
      source: "Prev Med",
      year: 2016,
      pmid: "27058944",
    },
    {
      authors:
        "Donnelly JE, Blair SN, Jakicic JM, Manore MM, Rankin JW, Smith BK; American College of Sports Medicine.",
      title:
        "American College of Sports Medicine Position Stand. Appropriate physical activity intervention strategies for weight loss and prevention of weight regain for adults.",
      source: "Med Sci Sports Exerc",
      year: 2009,
      pmid: "19127177",
    },
    {
      authors:
        "Garber CE, Blissmer B, Deschenes MR, Franklin BA, Lamonte MJ, Lee IM, Nieman DC, Swain DP; American College of Sports Medicine.",
      title:
        "American College of Sports Medicine position stand. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults: guidance for prescribing exercise.",
      source: "Med Sci Sports Exerc",
      year: 2011,
      pmid: "21694556",
    },
    {
      authors: "Murphy C, Koehler K.",
      title:
        "Energy deficiency impairs resistance training gains in lean mass but not strength: A meta-analysis and meta-regression.",
      source: "Scand J Med Sci Sports",
      year: 2022,
      pmid: "34623696",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Exercise pairing on a GLP-1 is the area with the strongest
        mitigation evidence for the lean mass loss documented in
        STEP-1 and SURMOUNT-1. The S-LiTE trial<Cite n={1} /> &mdash; a
        195-patient randomized comparison of liraglutide alone,
        exercise alone, and both combined &mdash; reported &minus;9.5
        kg in the combination arm vs &minus;6.8 kg with liraglutide
        alone and &minus;4.1 kg with exercise alone, a 40% bigger
        weight loss in the combination arm with roughly double the
        body-fat reduction. The single highest-leverage intervention
        is resistance training paired with adequate protein
        <Cite n={4} /><Cite n={5} />. Pilates and yoga produce minimal
        weight effects but are useful for stress and mobility
        <Cite n={6} /><Cite n={10} />. ACSM 2009 sets the cardio
        threshold at &gt;250 min/week of moderate-intensity activity
        for clinically significant weight loss<Cite n={11} />, and
        the Saint-Maurice 2020 JAMA cohort<Cite n={8} /> identifies
        ~7,000-8,000 steps per day as the inflection point for
        mortality benefit. Here is the evidence map.
      </p>

      <h2>The lean mass problem GLP-1 trials surfaced</h2>
      <p>
        The STEP-1<Cite n={3} /> and SURMOUNT-1 body composition
        substudies showed that approximately 25-45% of total weight
        loss on semaglutide and tirzepatide is lean tissue when
        patients do not intervene with protein and resistance
        training. Neeland and colleagues<Cite n={3} /> reviewed the
        full GLP-1 lean mass literature in 2024 and concluded that
        the muscle changes appear adaptive (proportional to weight
        loss magnitude and improved insulin sensitivity), but that
        active mitigation is warranted in patients losing rapidly,
        in older adults, and in anyone planning sustained weight
        loss over 12-18 months. The recommended targets are
        1.6-2.3 g/kg fat-free mass of protein per day plus structured
        resistance training at least three times per week.
      </p>
      <p>
        For the protein side, see our{" "}
        <Link href="/tools/glp1-protein-calculator">
          GLP-1 protein &amp; macro calculator
        </Link>
        , which targets these recommendations directly. This article
        covers the exercise side.
      </p>

      <h2>S-LiTE: the trial that proved exercise + GLP-1 is more than additive</h2>
      <p>
        Lundgren and colleagues<Cite n={1} /> randomized 195 adults
        with obesity, after an initial 8-week low-calorie diet that
        produced ~12% body weight loss, to one of four arms for one
        year:
      </p>
      <ul>
        <li>
          <strong>Exercise + placebo:</strong> &minus;4.1 kg
        </li>
        <li>
          <strong>Liraglutide 3 mg + usual activity:</strong>{" "}
          &minus;6.8 kg
        </li>
        <li>
          <strong>Liraglutide + exercise (combination):</strong>{" "}
          &minus;9.5 kg
        </li>
        <li>
          <strong>Placebo + usual activity:</strong> reference
        </li>
      </ul>
      <p>
        The combination arm did not just add the two effects; the
        body-fat percent reduction was approximately double either
        single arm (&minus;3.9% in the combination vs &minus;1.7%
        and &minus;1.9% in the single arms), and the combination
        was the only arm that improved A1c, insulin sensitivity, AND
        cardiorespiratory fitness simultaneously. The structured
        exercise prescription was a 4-day-per-week program of
        moderate-to-vigorous aerobic activity totaling 150 minutes
        plus two strength sessions per week.
      </p>
      <p>
        S-LiTE is the most direct trial answer to the question
        &ldquo;does exercise still matter on a GLP-1?&rdquo; The
        answer is yes, and the magnitude of the additional benefit
        is large enough that exercise should not be treated as
        optional in patients capable of doing it.
      </p>

      <h2>Resistance training: the canonical evidence base</h2>
      <p>
        Three studies anchor the resistance-training-during-deficit
        recommendation:
      </p>
      <ul>
        <li>
          <strong>Longland 2016</strong><Cite n={4} /> randomized
          40 young men in a 4-week intense caloric deficit (~40%
          below maintenance) plus resistance + HIIT 6 days/week to
          1.2 g/kg/day vs 2.4 g/kg/day protein. The high-protein
          arm gained <strong>+1.2 ± 1.0 kg of lean body mass</strong>
          and lost &minus;4.8 ± 1.6 kg of fat. The standard-protein
          arm gained essentially no lean mass and lost less fat.
          High protein + resistance training preserved AND added
          muscle in a severe deficit.
        </li>
        <li>
          <strong>Mettler 2010</strong><Cite n={5} /> randomized 20
          resistance-trained athletes in a 2-week deficit to 1.0
          g/kg/day vs 2.3 g/kg/day protein. Lean mass loss was{" "}
          <strong>&minus;1.6 ± 0.3 kg (low protein)</strong> vs{" "}
          <strong>&minus;0.3 ± 0.3 kg (high protein)</strong> &mdash;
          1.3 kg of lean mass preserved by adequate protein in just
          two weeks.
        </li>
        <li>
          <strong>Cava 2017</strong><Cite n={2} /> reviewed the
          published literature on muscle preservation during weight
          loss in <em>Advances in Nutrition</em> and concluded that
          resistance training plus adequate protein is the
          best-evidenced strategy and should be promoted in any
          weight-loss program where lean mass preservation matters.
        </li>
      </ul>
      <p>
        The compound lifts that recruit the most muscle per session
        &mdash; squat, hinge (deadlift / Romanian deadlift),
        horizontal push (DB press / push-up), horizontal pull (row /
        pull-up), and carry (farmer carry / sled push) &mdash; are
        the highest-leverage exercises for the limited weekly
        training volume most patients can sustain.
      </p>

      <h2>Walking and the step count question</h2>
      <p>
        Walking is the most accessible exercise modality and has its
        own evidence base. Murphy and colleagues<Cite n={7} />{" "}
        meta-analyzed 24 RCTs of walking interventions and reported
        statistically significant reductions in body weight, BMI,
        body fat percent, and resting diastolic blood pressure with
        walking programs of at least 150 minutes per week of brisk
        intensity. The magnitude is modest at the lower doses but
        compounds at higher doses.
      </p>
      <p>
        Saint-Maurice and colleagues<Cite n={8} /> published the
        most-cited step count data in JAMA in 2020, using 4,840 US
        adults from NHANES 2003-2006 with objective accelerometer
        measurements followed through 2015. They reported:
      </p>
      <ul>
        <li>
          <strong>8,000 steps/day:</strong> hazard ratio 0.49 vs
          4,000 steps/day &mdash; a 51% reduction in all-cause
          mortality.
        </li>
        <li>
          <strong>12,000 steps/day:</strong> HR 0.35 vs 4,000 &mdash;
          65% reduction.
        </li>
        <li>
          <strong>Step intensity</strong> (faster vs slower walking)
          showed no independent benefit after adjusting for total
          daily steps. Total volume is what matters; speed is
          secondary.
        </li>
      </ul>
      <p>
        The practical take-home: 8,000-10,000 steps per day is the
        ergonomic floor for general health benefit and weight loss
        support, achievable for most people via deliberate walks
        plus accumulated daily activity.
      </p>

      <h2>HIIT vs steady-state cardio</h2>
      <p>
        Wewege and colleagues<Cite n={9} /> meta-analyzed 13 RCTs
        directly comparing HIIT to moderate-intensity continuous
        training (MICT) for body composition outcomes in overweight
        and obese adults. The headline finding: <strong>no
        significant difference</strong> between HIIT and MICT for
        whole-body fat or waist circumference, but HIIT achieved
        equivalent results in roughly 40% less training time. For
        time-pressured patients, HIIT is a strong choice; for
        patients who prefer longer steady-state work or have joint
        limitations, MICT is equally effective. The Wewege analysis
        also flagged that running-based programs produced more fat
        loss than cycling-based programs across both training types.
      </p>

      <h2>Pilates and yoga: the honest position</h2>
      <p>
        Pilates and yoga are popular and have a small but real
        evidence base.
      </p>
      <p>
        Aladro-Gonzalvo and colleagues<Cite n={6} /> systematically
        reviewed Pilates trials for body composition and reported
        only weak quantitative evidence of a positive effect. The
        underlying trials were methodologically limited (small
        samples, inconsistent measurement, inadequate dietary
        controls). Pilates produces minimal direct weight loss but
        improves core strength, postural control, and flexibility.
        For GLP-1 patients, Pilates is a reasonable adjunct for
        mobility maintenance, not a primary fat-loss modality.
      </p>
      <p>
        Lauche and colleagues<Cite n={10} /> meta-analyzed 30 yoga
        trials covering 2,173 participants and reported that yoga
        does not produce significant weight, BMI, or body fat
        changes overall. Subgroup analysis showed modest waist-to-
        hip ratio improvement in healthy adults and a small BMI
        reduction in overweight/obese adults, but the effects were
        not robust against publication bias. The honest take: yoga
        is a stress-reduction and mind-body intervention with
        meaningful benefits for stress eating and quality of life,
        not a weight-loss intervention per se.
      </p>

      <h2>The ACSM frameworks</h2>
      <p>
        Two ACSM position stands set the practical floor:
      </p>
      <p>
        <strong>Donnelly 2009</strong><Cite n={11} /> &mdash;
        Appropriate Physical Activity Intervention Strategies for
        Weight Loss and Prevention of Weight Regain. Key thresholds:
      </p>
      <ul>
        <li>
          <strong>Weight gain prevention:</strong> 150-250 minutes/
          week of moderate-intensity physical activity
        </li>
        <li>
          <strong>Modest weight loss:</strong> 150-250 minutes/week
          (yields modest results only)
        </li>
        <li>
          <strong>Clinically significant weight loss:</strong>{" "}
          &gt;250 minutes/week
        </li>
        <li>
          <strong>Weight maintenance after loss:</strong> &gt;250
          minutes/week
        </li>
        <li>
          Resistance training was noted as &ldquo;does not enhance
          weight loss but increases fat-free mass and fat loss&rdquo;
          &mdash; the muscle preservation point.
        </li>
      </ul>
      <p>
        <strong>Garber 2011</strong><Cite n={12} /> &mdash; ACSM
        position stand on quantity and quality of exercise for
        cardiorespiratory, musculoskeletal, and neuromotor fitness.
        Key resistance training recommendations:
      </p>
      <ul>
        <li>
          <strong>Frequency:</strong> 2-3 days per week minimum
        </li>
        <li>
          <strong>Exercises:</strong> 8-10 exercises targeting major
          muscle groups
        </li>
        <li>
          <strong>Volume:</strong> 8-12 repetitions per exercise for
          strength and endurance
        </li>
        <li>
          <strong>Progression:</strong> progressive overload (gradual
          increase in resistance)
        </li>
      </ul>

      <h2>The deficit ceiling: why more is not better</h2>
      <p>
        Murphy and Koehler<Cite n={13} /> meta-analyzed studies of
        resistance training in caloric deficit and reported that
        lean mass gains were significantly impaired in deficits
        greater than 500 kcal/day below maintenance (effect size
        &minus;0.57, p=0.02). Strength gains were preserved across
        the deficit range, but the muscle-building benefit of RT
        was attenuated in larger deficits.
      </p>
      <p>
        For GLP-1 patients this finding is critically important.
        The drugs suppress appetite enough that many patients
        unintentionally drop into 800-1000 kcal/day eating ranges
        from a maintenance baseline of 2200-2500 kcal &mdash; a
        deficit far beyond the 500 kcal/day ceiling that the RT
        literature supports. The combination of intense training
        plus an aggressive GLP-1-induced deficit can produce more
        lean mass loss than either alone, exactly the opposite of
        the goal. Tracking calories and protein during the first
        3-6 months of GLP-1 therapy is the simplest way to catch
        this.
      </p>

      <h2>The practical weekly template</h2>
      <p>
        Synthesizing the evidence into a starting weekly template
        for a typical GLP-1 patient (adjust to fitness and time):
      </p>
      <ul>
        <li>
          <strong>Resistance training: 2-3 days per week.</strong>{" "}
          45-60 minutes per session. Compound lifts (squat, hinge,
          push, pull, carry) at 8-12 reps per set, 2-4 sets per
          exercise. Progressive overload week to week. Garber 2011
          ACSM minimum<Cite n={12} />.
        </li>
        <li>
          <strong>Aerobic activity: total &gt;250 minutes per
          week</strong> at moderate intensity, distributed across
          5-6 days. Donnelly 2009 ACSM threshold for clinically
          significant weight loss<Cite n={11} />.
        </li>
        <li>
          <strong>Daily step target: 8,000-10,000 steps.</strong>{" "}
          Saint-Maurice 2020 JAMA inflection point<Cite n={8} />.
          Walks count toward both the daily step target and the
          weekly aerobic minutes.
        </li>
        <li>
          <strong>HIIT (optional): 1-2 sessions per week</strong> for
          time-efficient cardio. 4-8 intervals of 30-60 seconds at
          near-maximum effort with equal recovery. Wewege 2017
          shows equivalent fat loss to MICT in less time
          <Cite n={9} />.
        </li>
        <li>
          <strong>Mobility / flexibility / mind-body: 1-2 sessions
          per week</strong> (Pilates, yoga, foam rolling). Not for
          weight loss directly, but supports recovery and stress
          management.
        </li>
        <li>
          <strong>Recovery monitoring:</strong> track fatigue,
          subjective recovery, and training quality. If the RT
          sessions feel progressively harder week to week with no
          strength gains, the deficit is probably too steep
          (Murphy &amp; Koehler 2022)<Cite n={13} />.
        </li>
        <li>
          <strong>Protein floor: 1.2-1.6 g/kg/day</strong> (or 1.6-
          2.0 if on a GLP-1, per the Neeland 2024 review<Cite n={3} />).
          See the{" "}
          <Link href="/tools/glp1-protein-calculator">
            protein calculator
          </Link>{" "}
          for personalized targets.
        </li>
      </ul>

      <h2>Common patterns to avoid</h2>
      <ul>
        <li>
          <strong>Adding intense cardio without adding protein.</strong>{" "}
          The combination of GLP-1 appetite suppression + endurance
          training is the worst-case scenario for lean mass.
        </li>
        <li>
          <strong>Exclusive cardio with no resistance training.</strong>{" "}
          Cardio alone preserves less lean mass than resistance
          training alone. The lean mass goal requires structured
          loading.
        </li>
        <li>
          <strong>Tracking only minutes, not strength.</strong>{" "}
          Lifting the same dumbbells every week is not progressive
          overload. Logging your sets and reps is the cheapest way
          to verify your training is actually building (or
          preserving) capacity.
        </li>
        <li>
          <strong>
            Skipping resistance training because the gym is intimidating.
          </strong>{" "}
          Body weight progressions (push-up, squat, lunge, plank,
          band row) cover the major movement patterns and are a
          legitimate starting point. The progression matters more
          than the equipment.
        </li>
        <li>
          <strong>Ignoring fatigue signals.</strong> GLP-1 fatigue
          is real (see our{" "}
          <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
            fatigue article
          </Link>
          ) and can mask exercise-induced overreaching. If sessions
          feel progressively harder without progress, drop volume
          for a week.
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          The S-LiTE trial<Cite n={1} /> proves exercise + GLP-1 is
          more than additive: the combination arm produced 40%
          bigger weight loss and roughly double the body-fat
          reduction vs liraglutide alone.
        </li>
        <li>
          Resistance training plus adequate protein is the
          single-highest-leverage intervention for lean mass
          preservation on a GLP-1 (Longland 2016, Mettler 2010,
          Cava 2017, Neeland 2024).
        </li>
        <li>
          ACSM 2009 sets the cardio floor at &gt;250 minutes/week
          for clinically significant weight loss. ACSM 2011 sets the
          resistance training floor at 2-3 days/week of compound
          lifts.
        </li>
        <li>
          Saint-Maurice 2020 JAMA identifies 8,000 steps/day as the
          inflection point for mortality benefit, with 12,000 steps
          adding additional protection.
        </li>
        <li>
          HIIT and MICT produce equivalent body composition
          outcomes; HIIT is time-efficient.
        </li>
        <li>
          Pilates and yoga are useful mobility and stress-reduction
          adjuncts, not primary weight-loss modalities.
        </li>
        <li>
          Murphy &amp; Koehler 2022 warns that deficits &gt;500
          kcal/day impair lean mass gains in resistance-trained
          adults &mdash; directly relevant for GLP-1 patients whose
          appetite suppression can mask under-eating.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/tools/glp1-protein-calculator">
            GLP-1 protein &amp; macro calculator
          </Link>{" "}
          &mdash; the protein side of the muscle-preservation pair
        </li>
        <li>
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            Loose skin after rapid GLP-1 weight loss
          </Link>{" "}
          &mdash; the downstream effect this article is designed to
          mitigate
        </li>
        <li>
          <Link href="/research/semaglutide-muscle-mass-loss">
            Semaglutide and muscle mass loss
          </Link>{" "}
          &mdash; the underlying lean tissue loss problem
        </li>
        <li>
          <Link href="/research/what-to-eat-on-glp1-diet-protein-guide">
            What to eat on a GLP-1
          </Link>{" "}
          &mdash; food choices that meet the protein target
        </li>
        <li>
          <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
            GLP-1 fatigue and hair loss
          </Link>{" "}
          &mdash; relevant when titrating exercise volume
        </li>
        <li>
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            Why am I not losing weight on a GLP-1?
          </Link>{" "}
          &mdash; the plateau picture exercise interacts with
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice or an
        exercise prescription. Patients with cardiovascular disease,
        joint pathology, or other conditions limiting exertion should
        consult a clinician (and ideally a credentialed exercise
        physiologist or physical therapist) before starting any new
        exercise program. The S-LiTE trial used liraglutide 3 mg, not
        semaglutide or tirzepatide; the directional inference to the
        newer drugs is reasonable but not yet replicated in a
        head-to-head trial. Every primary source cited here was
        independently verified against PubMed on 2026-04-08 by a
        research subagent.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Do I still need to exercise on a GLP-1?",
            answer:
              "Yes — exercise dramatically improves outcomes. The S-LiTE trial (Lundgren NEJM 2021, PMID 33951361) randomized 195 adults to liraglutide alone, exercise alone, or both for 1 year after a low-calorie diet. The combination produced -9.5 kg vs -6.8 kg with the drug alone and -4.1 kg with exercise alone — a 40% bigger weight loss and roughly double the body fat reduction in the combination arm.",
          },
          {
            question: "What kind of exercise is best on a GLP-1?",
            answer:
              "Resistance training plus aerobic activity. The single highest-leverage intervention is 2-3 days/week of compound resistance training (squat, hinge, push, pull, carry) to preserve lean mass. Add 250+ minutes/week of moderate-intensity cardio per ACSM 2009 (PMID 19127177). Walking 8,000-10,000 steps/day per Saint-Maurice 2020 (PMID 32207799) covers most of the cardio requirement.",
          },
          {
            question: "Will Pilates or yoga help me lose weight on a GLP-1?",
            answer:
              "Modestly. Pilates has weak weight-loss evidence (Aladro-Gonzalvo 2012, PMID 22196436) but improves core strength and flexibility. Yoga produces no significant body weight effect overall (Lauche 2016, PMID 27058944) but benefits stress and quality of life. Both are reasonable adjuncts for mobility and stress management on a GLP-1, not primary fat-loss modalities.",
          },
          {
            question: "How much protein do I need on a GLP-1 for muscle preservation?",
            answer:
              "1.6-2.0 g per kg of body weight per day for most patients on a GLP-1. The Neeland 2024 review (PMID 38937282) recommends targeting 1.6-2.3 g/kg fat-free mass to mitigate the 25-45% lean tissue loss seen in GLP-1 trial body composition substudies. Longland 2016 (PMID 26817506) showed 2.4 g/kg/day plus resistance training added 1.2 kg of lean body mass in a 4-week severe deficit.",
          },
          {
            question: "Can a calorie deficit on a GLP-1 be too aggressive?",
            answer:
              "Yes. Murphy & Koehler 2022 (PMID 34623696) showed deficits >500 kcal/day below maintenance impair lean mass gains in resistance-trained adults. GLP-1 appetite suppression can mask under-eating; many patients drop into 800-1000 kcal/day from a 2200-2500 baseline without realizing. Tracking calories and protein for the first 3-6 months catches this. The combination of intense training plus an aggressive deficit produces more lean mass loss than either alone.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
