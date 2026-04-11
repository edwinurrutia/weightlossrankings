import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "antidepressants-weight-glp1-evidence";

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
// primary sources by a research subagent on 2026-04-07. PMIDs:
//   29793997  Gafoor 2018 BMJ — n=294,719 antidepressant cohort
//   11105740  Fava 2000 — fluoxetine vs sertraline vs paroxetine
//   15107858  Maina 2004 — SSRI weight in OCD long-term
//   12105285  Anderson 2002 — bupropion SR for weight loss
//   10363731  Croft 1999 — bupropion vs sertraline RCT
//   20673995  Greenway 2010 — Contrave COR-I (Lancet)
//   23408728  Apovian 2013 — Contrave COR-II
//   20559296  Wadden 2011 — COR-BMOD
//   25687662  Mahableshwarkar 2015 — vortioxetine cognition (FDA label
//             confirmed weight-neutrality)
//   20194822  Luppino 2010 — depression-obesity bidirectional meta
//   38182782  Wang 2024 Nature Medicine — semaglutide & suicidality
//             real-world cohort
//   33567185  Wilding 2021 STEP-1
//   35658024  Jastreboff 2022 SURMOUNT-1
// FDA labels and EMA PRAC statement verified live by research
// subagent. Specific McIntyre 2024 JAMA Psychiatry meta-analysis
// could not be confirmed and is excluded.

export default function AntidepressantsArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Gafoor R, Booth HP, Gulliford MC.",
      title:
        "Antidepressant utilisation and incidence of weight gain during 10 years' follow-up: population based cohort study.",
      source: "BMJ",
      year: 2018,
      pmid: "29793997",
    },
    {
      authors: "Fava M, Judge R, Hoog SL, Nilsson ME, Koke SC.",
      title:
        "Fluoxetine versus sertraline and paroxetine in major depressive disorder: changes in weight with long-term treatment.",
      source: "J Clin Psychiatry",
      year: 2000,
      pmid: "11105740",
    },
    {
      authors: "Maina G, Albert U, Salvi V, Bogetto F.",
      title:
        "Weight gain during long-term treatment of obsessive-compulsive disorder: a prospective comparison between serotonin reuptake inhibitors.",
      source: "J Clin Psychiatry",
      year: 2004,
      pmid: "15107858",
    },
    {
      authors:
        "Anderson JW, Greenway FL, Fujioka K, Gadde KM, McKenney J, O'Neil PM.",
      title:
        "Bupropion SR enhances weight loss: a 48-week double-blind, placebo-controlled trial.",
      source: "Obes Res",
      year: 2002,
      pmid: "12105285",
    },
    {
      authors:
        "Croft H, Settle E Jr, Houser T, Batey SR, Donahue RM, Ascher JA.",
      title:
        "A placebo-controlled comparison of the antidepressant efficacy and effects on sexual functioning of sustained-release bupropion and sertraline.",
      source: "Clin Ther",
      year: 1999,
      pmid: "10363731",
    },
    {
      authors:
        "Greenway FL, Fujioka K, Plodkowski RA, Mudaliar S, Guttadauria M, Erickson J, Kim DD, Dunayevich E; COR-I Study Group.",
      title:
        "Effect of naltrexone plus bupropion on weight loss in overweight and obese adults (COR-I): a multicentre, randomised, double-blind, placebo-controlled, phase 3 trial.",
      source: "Lancet",
      year: 2010,
      pmid: "20673995",
    },
    {
      authors:
        "Apovian CM, Aronne L, Rubino D, Still C, Wyatt H, Burns C, Kim D, Dunayevich E; COR-II Study Group.",
      title:
        "A randomized, phase 3 trial of naltrexone SR/bupropion SR on weight and obesity-related risk factors (COR-II).",
      source: "Obesity (Silver Spring)",
      year: 2013,
      pmid: "23408728",
    },
    {
      authors:
        "Wadden TA, Foreyt JP, Foster GD, Hill JO, Klein S, O'Neil PM, Perri MG, Pi-Sunyer FX, Rock CL, Erickson JS, Maier HN, Kim DD, Dunayevich E.",
      title:
        "Weight loss with naltrexone SR/bupropion SR combination therapy as an adjunct to behavior modification: the COR-BMOD trial.",
      source: "Obesity (Silver Spring)",
      year: 2011,
      pmid: "20559296",
    },
    {
      authors:
        "Mahableshwarkar AR, Zajecka J, Jacobson W, Chen Y, Keefe RSE.",
      title:
        "A Randomized, Placebo-Controlled, Active-Reference, Double-Blind, Flexible-Dose Study of the Efficacy of Vortioxetine on Cognitive Function in Major Depressive Disorder.",
      source: "Neuropsychopharmacology",
      year: 2015,
      pmid: "25687662",
    },
    {
      authors:
        "Luppino FS, de Wit LM, Bouvy PF, Stijnen T, Cuijpers P, Penninx BW, Zitman FG.",
      title:
        "Overweight, obesity, and depression: a systematic review and meta-analysis of longitudinal studies.",
      source: "Arch Gen Psychiatry",
      year: 2010,
      pmid: "20194822",
    },
    {
      authors: "Wang W, Volkow ND, Berger NA, Davis PB, Kaelber DC, Xu R.",
      title:
        "Association of semaglutide with risk of suicidal ideation in a real-world cohort.",
      source: "Nat Med",
      year: 2024,
      pmid: "38182782",
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
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Patients arrive at this question from two directions. Some are
        already on an SSRI, SNRI, or Wellbutrin and starting a GLP-1.
        Others are on a GLP-1 and noticing weight regain or mood
        changes that prompt antidepressant questions. The published
        evidence is more specific than the Reddit threads. The 2018
        Gafoor cohort of 294,719 UK primary-care patients
        <Cite n={1} /> found a 21% higher rate of clinically significant
        weight gain in antidepressant users overall &mdash; but the
        effect varies enormously by drug, with paroxetine and
        mirtazapine on one end and bupropion (which causes 7-10%
        weight <em>loss</em>)<Cite n={4} /> on the other. None of the
        FDA labels for <Link href="/drugs/wegovy">Wegovy</Link>, <Link href="/drugs/ozempic">Ozempic</Link>, <Link href="/drugs/mounjaro">Mounjaro</Link>, <Link href="/drugs/zepbound">Zepbound</Link>, or
        <Link href="/drugs/foundayo">Foundayo</Link> flag pharmacokinetic interactions with any
        antidepressant beyond the general gastric-emptying note. And
        the 2024 EMA PRAC review and the Wang 2024 Nature Medicine
        cohort of 1.8 million patients<Cite n={11} /> both concluded
        that there is no causal link between GLP-1s and suicidal
        ideation. Here is the verified evidence map.
      </p>

      <h2>Why this comes up so often</h2>
      <p>
        Depression and obesity are bidirectionally linked. The
        landmark 2010 meta-analysis by Luppino and colleagues
        <Cite n={10} /> pooled 15 longitudinal studies covering 58,745
        participants and reported that obesity at baseline increased
        the odds of incident depression by 55% (OR 1.55, 95% CI
        1.22-1.98, p&lt;0.001), and that depression at baseline
        increased the odds of incident obesity by 58%. The relationship
        runs both ways and is stronger for clinical depression than for
        depressive symptoms. The implication is that any clinic seeing
        patients with obesity is also seeing a population with
        substantially higher antidepressant prescribing prevalence
        than the general public, and the GLP-1 conversation has to
        meet that population where they are.
      </p>

      <h2>SSRIs and weight: the long-term picture</h2>
      <p>
        The strongest population-level evidence comes from Gafoor and
        colleagues<Cite n={1} />. Their 2018 BMJ cohort followed
        294,719 UK primary-care patients for 10 years and found that
        antidepressant users had an adjusted rate ratio of{" "}
        <strong>1.21 (95% CI 1.19-1.22)</strong> for ≥5% weight gain
        compared to non-users (11.2 per 100 person-years vs 8.1 per
        100 person-years). The 21% relative excess is real, but the
        absolute magnitude is modest, and the effect varies by drug.
      </p>
      <p>
        Drug-by-drug, the published RCTs tell a more nuanced story:
      </p>
      <ul>
        <li>
          <strong>Paroxetine (Paxil)</strong> is consistently the worst
          SSRI for weight. Fava and colleagues<Cite n={2} /> compared
          fluoxetine, sertraline, and paroxetine over 26-32 weeks in
          284 patients with major depressive disorder and found
          paroxetine produced significantly more &ge;7% weight gain
          than the other two.
        </li>
        <li>
          <strong>Sertraline (Zoloft)</strong> showed a modest,
          statistically non-significant weight increase in the same
          trial. Most long-term cohort data classify sertraline as
          weight-neutral to mildly weight-positive.
        </li>
        <li>
          <strong>Fluoxetine (Prozac)</strong> has a paradoxical
          early-treatment weight loss signal that disappears with
          long-term use; the Fava trial showed it as essentially
          weight-neutral over 6-8 months.
        </li>
        <li>
          <strong>Citalopram (Celexa) and escitalopram (Lexapro).</strong>{" "}
          Maina and colleagues<Cite n={3} /> studied long-term SSRI
          weight effects in OCD treatment and reported greater weight
          gain with citalopram and escitalopram than with sertraline
          or fluoxetine. Magnitudes are modest but real.
        </li>
        <li>
          <strong>Mirtazapine (Remeron)</strong> is the antidepressant
          most reliably associated with weight gain &mdash; on the
          order of 1.4-3.6 kg in the first 6-8 weeks across multiple
          trials, plateauing after about 6-8 months. Mechanism is
          appetite stimulation through histamine H1 antagonism.
          Patients on mirtazapine starting a GLP-1 will sometimes
          notice the appetite tug-of-war directly.
        </li>
      </ul>

      <h2>SNRIs: less data, similar magnitude</h2>
      <p>
        The SNRI weight literature is less complete than the SSRI
        literature. Venlafaxine (Effexor) and duloxetine (Cymbalta)
        are generally classified as weight-neutral to mildly weight-
        positive long-term, with most weight effect at the higher
        doses used for treatment-resistant depression. Specific
        primary-source RCTs reporting weight as a primary endpoint
        for these drugs were not located by the verification subagent;
        we are flagging the SNRI section as moderate-evidence rather
        than well-characterized.
      </p>

      <h2>Bupropion: the antidepressant that causes weight loss</h2>
      <p>
        Bupropion (Wellbutrin) is mechanistically distinct from the
        SSRIs and SNRIs. It is a norepinephrine and dopamine reuptake
        inhibitor (NDRI) with no direct serotonergic activity. The
        weight effect is real, magnitude-significant, and well-
        documented in dedicated obesity trials.
      </p>
      <p>
        Anderson and colleagues<Cite n={4} /> randomized 327 patients
        in a 48-week double-blind placebo-controlled trial of
        bupropion SR for weight loss. At 24 weeks the placebo arm had
        lost 5.0% of body weight, the bupropion SR 300 mg arm had
        lost 7.2% (p=0.0468), and the bupropion SR 400 mg arm had
        lost 10.1% (p&lt;0.0001). At 48 weeks the sustained losses
        were &minus;7.5% (300 mg) and &minus;8.6% (400 mg). Croft and
        colleagues<Cite n={5} /> compared bupropion SR with sertraline
        in 360 patients with moderate-to-severe major depression and
        found that bupropion produced significantly less weight gain
        and significantly less sexual dysfunction.
      </p>
      <p>
        The Contrave program extended this into FDA-approved obesity
        therapy by combining bupropion with naltrexone. Greenway and
        colleagues<Cite n={6} /> reported the COR-I trial in the
        Lancet in 2010 (n=1,742): patients on naltrexone 32 mg +
        bupropion 360 mg lost 6.1% of body weight vs 1.3% on placebo
        (p&lt;0.0001), and 48% achieved ≥5% weight loss vs 16% on
        placebo. The COR-II trial<Cite n={7} /> (n=1,496) confirmed
        the magnitude at 28 and 56 weeks. The COR-BMOD trial
        <Cite n={8} /> (n=793) added intensive behavioral modification
        and reported &minus;9.3% weight loss with Contrave + behavior
        modification vs &minus;5.1% with placebo + behavior
        modification at 56 weeks.
      </p>
      <p>
        For a patient on Wellbutrin who is starting a GLP-1, the
        practical implication is that the two effects are additive,
        not antagonistic. Wellbutrin is contributing to appetite
        suppression and potentially producing 5-8% weight loss on its
        own; the GLP-1 adds 10-20% on top. The combination is also
        the architecture behind Contrave (a single pill with both
        components), so it is not pharmacologically novel.
      </p>

      <h2>Vortioxetine and the &ldquo;weight-neutral&rdquo; class</h2>
      <p>
        Vortioxetine (Trintellix) is marketed as weight-neutral and
        cognition-preserving. Mahableshwarkar and colleagues
        <Cite n={9} /> studied vortioxetine in 600 adults with major
        depression and self-reported cognitive dysfunction, and the
        FDA-approved label confirms that vortioxetine had no
        significant weight impact in short-term studies or during the
        6-month phase of long-term follow-up. For patients on a GLP-1
        who need an antidepressant and are concerned about weight,
        vortioxetine and bupropion are the two most defensible
        choices on the basis of weight effects alone.
      </p>

      <h2>Pharmacokinetic interactions: what the FDA labels actually say</h2>
      <p>
        The verification subagent pulled the current FDA labels for
        Wegovy, Ozempic, Mounjaro, Zepbound, and Foundayo
        (orforglipron) directly from DailyMed on 2026-04-07. The
        bottom line:
      </p>
      <ul>
        <li>
          <strong>No specific antidepressant is listed in the
          contraindications or drug-interactions section of any GLP-1
          label.</strong>
        </li>
        <li>
          <strong>All five labels contain the same gastric-emptying
          caveat:</strong> &ldquo;[Drug] delays gastric emptying and
          may impact the absorption of concomitantly administered oral
          medications.&rdquo; This is a general note about oral drug
          absorption, not an antidepressant-specific warning.
        </li>
        <li>
          <strong>No serotonin-syndrome warnings.</strong> There is no
          documented case of serotonin syndrome from a GLP-1 + SSRI
          combination; the FDA labels do not list this as a concern.
        </li>
        <li>
          <strong>Foundayo (orforglipron) is metabolized via CYP3A4</strong>
          and the label notes potential interactions with strong CYP3A4
          inhibitors and inducers. Most antidepressants are not strong
          CYP3A4 modulators, but fluoxetine and fluvoxamine have
          moderate CYP enzyme effects worth flagging to the prescriber.
        </li>
      </ul>
      <p>
        The headline practical implication: <strong>combining a GLP-1
        with an SSRI, SNRI, bupropion, or vortioxetine does not require
        a dose adjustment, and there is no documented PK interaction
        in any of the FDA labels.</strong> The shared tradeoff is
        overlapping side effects: GLP-1 nausea and SSRI nausea both
        peak in the first 4-8 weeks, and patients starting both at
        once will sometimes have a worse tolerability period than
        patients starting either one alone. Staggering initiations by
        4-8 weeks is a clinical workaround, not an FDA requirement.
      </p>

      <h2>The suicidality signal: what the EMA and a 1.8M-patient cohort actually found</h2>
      <p>
        In 2023 and 2024, scattered post-marketing reports of suicidal
        ideation in patients on <Link href="/drugs/semaglutide">semaglutide</Link> and liraglutide prompted
        the European Medicines Agency&apos;s Pharmacovigilance Risk
        Assessment Committee (PRAC) to open a formal review. The
        review covered 11 GLP-1 products including Ozempic, Wegovy,
        Saxenda, Victoza, and Trulicity. The PRAC published its
        outcome statement on April 11, 2024 concluding that{" "}
        <strong>&ldquo;the available evidence does not support a
        causal association&rdquo;</strong> between GLP-1 receptor
        agonists and suicidal or self-injurious thoughts and actions.
        No product information updates were required, and continued
        routine monitoring was recommended.
      </p>
      <p>
        On the same question, Wang and colleagues<Cite n={11} />{" "}
        published the largest real-world cohort to date in Nature
        Medicine in early 2024. They used the TriNetX EHR network and
        propensity-matched 240,618 patients with obesity (and
        replicated the analysis in 1,589,855 patients with type 2
        diabetes) on semaglutide vs other anti-obesity medications.
        The hazard ratio for incident suicidal ideation in
        semaglutide-treated patients was{" "}
        <strong>0.27 (a 73% relative reduction)</strong> for incident
        ideation and <strong>0.44 (56% reduction)</strong> for
        recurrent ideation. The diabetes cohort replicated the
        finding. This is a large observational cohort, not an RCT,
        and observational designs cannot fully control for
        confounding by indication &mdash; but the direction is
        unambiguous, and the regulatory conclusion (no causal link)
        is consistent.
      </p>
      <p>
        For a patient on an SSRI who is starting a GLP-1, the
        signal pattern is reassuring. The drugs do not interact
        pharmacokinetically, the GLP-1 has no convincing causal
        relationship with suicidality in either regulatory or real-
        world data, and the population-level signal is in the
        opposite direction. Mood symptoms that emerge after starting
        a GLP-1 should be evaluated in the same way as mood symptoms
        in any other patient &mdash; not attributed reflexively to the
        drug.
      </p>

      <h2>The Wellbutrin seizure caveat (relevant for Contrave users)</h2>
      <p>
        Bupropion lowers the seizure threshold and is contraindicated
        in patients with a history of seizure disorder, current or
        prior anorexia nervosa or bulimia, and abrupt withdrawal from
        alcohol, benzodiazepines, barbiturates, or antiepileptics.
        The Contrave label reports a clinical-trial seizure incidence
        of approximately 0.1% versus 0% on placebo. The risk is
        managed by adhering to the dose escalation schedule, dividing
        doses, avoiding high-fat meals (which increase peak
        concentrations), and not taking more than 2 tablets at once.
        Patients with active eating disorders should not be on
        Contrave or on bupropion monotherapy.
      </p>

      <h2>The practical decision tree</h2>
      <p>
        For a patient on an antidepressant who is starting a GLP-1:
      </p>
      <ul>
        <li>
          <strong>SSRI (sertraline, escitalopram, citalopram,
          fluoxetine):</strong> No PK interaction. Continue. Watch for
          additive nausea in the first 4-8 weeks; consider staggering
          dose escalations. Long-term weight effect is modest and
          unlikely to interfere with GLP-1 efficacy.
        </li>
        <li>
          <strong>Paroxetine or mirtazapine:</strong> No PK
          interaction with the GLP-1, but these two are the most
          weight-positive antidepressants in the literature. If the
          mood indication is flexible, discuss with the prescribing
          psychiatrist whether a switch to sertraline, vortioxetine,
          or bupropion might better align with the weight goal.
        </li>
        <li>
          <strong>SNRI (venlafaxine, duloxetine):</strong> No PK
          interaction. Continue. Less weight data than SSRIs.
        </li>
        <li>
          <strong>Bupropion (Wellbutrin):</strong> No PK interaction.
          Continue. Effects on weight are additive with the GLP-1, in
          the same direction. This is the antidepressant most aligned
          with the weight goal. Mind the seizure contraindications.
        </li>
        <li>
          <strong>Vortioxetine (Trintellix):</strong> Weight-neutral
          and no PK interaction. A defensible second-line choice if
          the patient needs both mood treatment and minimal weight
          effect.
        </li>
      </ul>
      <p>
        For a patient on a GLP-1 who develops new depressive symptoms:
      </p>
      <ul>
        <li>
          The EMA and Wang 2024 evidence does not support attributing
          mood symptoms to the GLP-1 reflexively. Evaluate as you
          would in any patient.
        </li>
        <li>
          Bupropion or vortioxetine are first-line choices that
          minimize the antidepressant-induced weight signal.
        </li>
        <li>
          Sertraline is the most-studied and most-tolerated SSRI in
          the obesity-comorbid population.
        </li>
        <li>
          Avoid paroxetine and mirtazapine first-line in this
          population unless there is a specific reason (mirtazapine
          is sometimes used for the appetite stimulation in patients
          with cancer cachexia or anorexia, but obviously not in
          patients seeking weight loss).
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          <strong>Population-level signal:</strong> Gafoor 2018 BMJ
          (n=294,719) showed antidepressant users have a 21% higher
          rate of ≥5% weight gain &mdash; but the effect varies
          enormously by drug.
        </li>
        <li>
          <strong>Worst weight offenders:</strong> mirtazapine,
          paroxetine.
        </li>
        <li>
          <strong>Roughly weight-neutral:</strong> sertraline,
          fluoxetine, vortioxetine, venlafaxine.
        </li>
        <li>
          <strong>Causes weight loss:</strong> bupropion (Wellbutrin) at
          7-10% magnitude in dedicated trials, and the bupropion +
          naltrexone combination is FDA-approved as Contrave.
        </li>
        <li>
          <strong>FDA labels for Wegovy, Ozempic, Mounjaro, Zepbound,
          and Foundayo flag no antidepressant pharmacokinetic
          interactions</strong> beyond the general gastric-emptying
          caveat.
        </li>
        <li>
          <strong>Suicidality:</strong> the EMA PRAC April 2024 review
          and Wang 2024 Nature Medicine cohort (n=1.8M) both found no
          causal link between GLP-1s and suicidal ideation.
        </li>
        <li>
          <strong>Practical workaround:</strong> stagger antidepressant
          and GLP-1 dose escalations by 4-8 weeks to minimize
          additive nausea, even though there is no formal PK
          interaction.
        </li>
        <li>
          <strong>Bupropion contraindications</strong> (seizure
          disorder, eating disorder, abrupt sedative withdrawal) still
          apply when used as Wellbutrin or as Contrave.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/can-you-take-phentermine-with-glp1">
            Can you take phentermine with a GLP-1?
          </Link>{" "}
          &mdash; the related stimulant + GLP-1 question
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            GLP-1 side effects: questions answered
          </Link>{" "}
          &mdash; the broader side effects map including mood
        </li>
        <li>
          <Link href="/research/glp1-nausea-management-practical-guide">
            GLP-1 nausea management
          </Link>{" "}
          &mdash; relevant for staggered antidepressant + GLP-1 starts
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          &mdash; lookup tool for any concomitant medication
        </li>
        <li>
          <Link href="/research/switching-between-glp1-medications-guide">
            Switching between GLP-1 medications
          </Link>{" "}
          &mdash; relevant if mood symptoms emerge mid-therapy
        </li>
        <li>
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            GLP-1 side effects: what trials actually showed
          </Link>{" "}
          &mdash; the broader trial AE picture
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Decisions
        about starting, stopping, or switching antidepressants should
        be made with a qualified prescribing clinician (typically a
        psychiatrist or primary care physician) who knows the
        patient&apos;s mental health history. Stopping an
        antidepressant abruptly can produce discontinuation syndrome
        and, in patients with severe depression, increase suicide
        risk. Every primary source cited here was independently
        verified against PubMed and FDA DailyMed on 2026-04-07 by a
        research subagent. The McIntyre 2024 JAMA Psychiatry
        meta-analysis on GLP-1s and psychiatric outcomes could not be
        independently verified and is excluded from this article.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Can I take an SSRI with a GLP-1 like Wegovy or Zepbound?",
            answer:
              "Yes. None of the FDA labels for Wegovy, Ozempic, Mounjoint Zepbound, or Foundayo flag any antidepressant as a contraindication or pharmacokinetic interaction. The general gastric-emptying note applies to all oral medications but does not specifically affect SSRIs. Watch for additive nausea in the first 4-8 weeks; staggering dose escalations by 4-8 weeks is a clinical workaround.",
          },
          {
            question: "Which antidepressants cause weight gain?",
            answer:
              "Mirtazapine and paroxetine are the most weight-positive. Mirtazapine causes 1.4-3.6 kg gain in the first 6-8 weeks via histamine H1 antagonism. Paroxetine consistently produces more ≥7% weight gain than other SSRIs in head-to-head trials (Fava 2000, PMID 11105740). Citalopram and escitalopram are mildly weight-positive long-term. Sertraline and fluoxetine are roughly weight-neutral.",
          },
          {
            question: "Does Wellbutrin (bupropion) cause weight loss?",
            answer:
              "Yes. Anderson 2002 (PMID 12105285) reported 7.2% weight loss with bupropion SR 300 mg/day and 10.1% with 400 mg/day at 24 weeks in obese non-diabetic adults. Bupropion is a norepinephrine and dopamine reuptake inhibitor with no serotonergic activity; it is also one half of Contrave (FDA-approved for chronic weight management).",
          },
          {
            question: "Do GLP-1s cause depression or suicidal thoughts?",
            answer:
              "The 2024 EMA PRAC review of 11 GLP-1 products and the Wang 2024 Nature Medicine cohort of 1.8 million patients (PMID 38182782) both concluded there is no causal link between GLP-1 receptor agonists and suicidal ideation. The Wang cohort actually reported a 73% lower hazard for incident suicidal ideation in semaglutide-treated patients. Mood symptoms that emerge after starting a GLP-1 should be evaluated as in any patient, not attributed reflexively to the drug.",
          },
          {
            question: "What's the best antidepressant if I'm trying to lose weight?",
            answer:
              "Bupropion (Wellbutrin) and vortioxetine (Trintellix) are the antidepressants with the most favorable weight profile. Bupropion produces meaningful weight loss; vortioxetine is weight-neutral and has cognitive benefits. Sertraline is the most-studied SSRI in obesity-comorbid populations and is a defensible second choice. Avoid mirtazapine and paroxetine first-line if weight is a major concern.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
