import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "topamax-qsymia-topiramate-weight-loss";

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
//   12805393  Bray 2003 dose-ranging topiramate
//   15536230  Astrup 2004 topiramate maintenance
//   15486569  Wilding 2004 topiramate 60-week
//   22051941  Allison 2012 EQUIP
//   21481449  Gadde 2011 CONQUER
//   22158731  Garvey 2012 SEQUEL
//   33567185  STEP-1 (already verified)
//   35658024  SURMOUNT-1 (already verified)
//   21165738  Maalouf 2010 nephrolithiasis
// Note: Qsymia generic launched 7 May 2025 (verified)
// Note: Bray PMID is 12805393 not 12446669 (corrected)

export default function TopamaxArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Bray GA, Hollander P, Klein S, Kushner R, Levy B, Fitchet M, Perry BH.",
      title:
        "A 6-month randomized, placebo-controlled, dose-ranging trial of topiramate for weight loss in obesity.",
      source: "Obes Res",
      year: 2003,
      pmid: "12805393",
    },
    {
      authors: "Astrup A, Caterson I, Zelissen P, Guy-Grand B, Carruba M, Levy B, Sun X, Fitchet M.",
      title:
        "Topiramate: long-term maintenance of weight loss induced by a low-calorie diet in obese subjects.",
      source: "Obes Res",
      year: 2004,
      pmid: "15536230",
    },
    {
      authors: "Wilding J, Van Gaal L, Rissanen A, Vercruysse F, Fitchet M; OBES-002 Study Group.",
      title:
        "A randomized double-blind placebo-controlled study of the long-term efficacy and safety of topiramate in the treatment of obese subjects.",
      source: "Int J Obes Relat Metab Disord",
      year: 2004,
      pmid: "15486569",
    },
    {
      authors:
        "Allison DB, Gadde KM, Garvey WT, Peterson CA, Schwiers ML, Najarian T, Tam PY, Troupin B, Day WW.",
      title:
        "Controlled-release phentermine/topiramate in severely obese adults: a randomized controlled trial (EQUIP).",
      source: "Obesity (Silver Spring)",
      year: 2012,
      pmid: "22051941",
    },
    {
      authors:
        "Gadde KM, Allison DB, Ryan DH, Peterson CA, Troupin B, Schwiers ML, Day WW.",
      title:
        "Effects of low-dose, controlled-release, phentermine plus topiramate combination on weight and associated comorbidities in overweight and obese adults (CONQUER): a randomised, placebo-controlled, phase 3 trial.",
      source: "Lancet",
      year: 2011,
      pmid: "21481449",
    },
    {
      authors:
        "Garvey WT, Ryan DH, Look M, Gadde KM, Allison DB, Peterson CA, Schwiers M, Day WW, Bowden CH.",
      title:
        "Two-year sustained weight loss and metabolic benefits with controlled-release phentermine/topiramate in obese and overweight adults (SEQUEL): a randomized, placebo-controlled, phase 3 extension study.",
      source: "Am J Clin Nutr",
      year: 2012,
      pmid: "22158731",
    },
    {
      authors: "Maalouf NM, Langston JP, Van Ness PC, Moe OW, Sakhaee K.",
      title:
        "Nephrolithiasis in topiramate users.",
      source: "Urol Res",
      year: 2011,
      pmid: "21165738",
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
      authors: "VIVUS LLC.",
      title:
        "QSYMIA (phentermine and topiramate extended-release) capsules — US Prescribing Information including REMS program and BMI eligibility.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022580s029lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA Drug Safety Communication: Risk of oral clefts in children born to mothers taking Topamax (topiramate).",
      source: "FDA Drug Safety Communication",
      year: 2011,
      url: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-risk-oral-clefts-children-born-mothers-taking-topamax-topiramate",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Topiramate (Topamax) and the phentermine + topiramate ER
        combination Qsymia are the third major FDA-approved oral
        weight-loss option after the GLP-1 receptor agonists. The
        published evidence is strong: Bray 2003<Cite n={1} />{" "}
        reported &minus;6.3% body weight loss at 192-384 mg
        topiramate over 6 months in a dose-ranging RCT (n=385);
        Astrup 2004<Cite n={2} /> reported sustained &minus;16.5%
        from baseline at 192 mg in a 44-week maintenance trial after
        an initial low-calorie diet run-in. The Qsymia Phase 3
        program &mdash; EQUIP<Cite n={4} />, CONQUER<Cite n={5} />,
        and the SEQUEL 108-week extension<Cite n={6} /> &mdash;
        established Qsymia as producing roughly{" "}
        <strong>10% sustained body weight loss</strong> at the
        15 mg phentermine / 92 mg topiramate dose, plus a 78.7%
        reduction in incident type 2 diabetes. That magnitude is{" "}
        <strong>two-thirds of semaglutide and half of tirzepatide</strong>.
        The cognitive &ldquo;dopamax&rdquo; side effect, kidney
        stone risk (10.7% in long-term users), metabolic acidosis
        (40-71% abnormal bicarbonate), and the cleft palate
        teratogenicity (RR 5.16 at &gt;100 mg topiramate) are real
        and shape who should use it. Generic phentermine/topiramate
        ER launched May 7, 2025, substantially lowering the cost
        barrier. Here is the verified evidence.
      </p>

      <h2>The original topiramate weight-loss trials (off-label)</h2>
      <p>
        Topiramate&apos;s weight-loss effect was discovered as a
        side effect during epilepsy and migraine trials and then
        formally studied for weight management before the Qsymia
        combination was developed.
      </p>
      <p>
        <strong>Bray 2003</strong><Cite n={1} /> randomized 385 obese
        adults to topiramate at 64, 96, 192, or 384 mg/day vs
        placebo over 6 months. Mean body weight changes:
      </p>
      <ul>
        <li>
          <strong>Placebo:</strong> &minus;2.6%
        </li>
        <li>
          <strong>64 mg:</strong> &minus;5.0%
        </li>
        <li>
          <strong>96 mg:</strong> &minus;4.8%
        </li>
        <li>
          <strong>192 mg:</strong> &minus;6.3%
        </li>
        <li>
          <strong>384 mg:</strong> &minus;6.3%
        </li>
      </ul>
      <p>
        Two important findings: the dose-response was real and
        statistically significant up to ~192 mg, and pushing past
        192 mg added no additional weight benefit but caused more
        cognitive and CNS side effects. 192 mg/day ended up being
        the practical ceiling for monotherapy.
      </p>
      <p>
        <strong>Astrup 2004</strong><Cite n={2} /> studied
        topiramate as a long-term <em>maintenance</em> agent after
        an initial 8-week low-calorie diet that produced ~8% weight
        loss. 701 patients entered the run-in; 439 with adequate
        early loss were randomized to topiramate 96 mg, 192 mg, or
        placebo for 44 additional weeks. Total weight loss from
        baseline at 52 weeks:
      </p>
      <ul>
        <li>
          <strong>Placebo:</strong> &minus;8.9% (regression toward
          baseline as the diet-only group regained)
        </li>
        <li>
          <strong>Topiramate 96 mg:</strong> &minus;15.4%
        </li>
        <li>
          <strong>Topiramate 192 mg:</strong> &minus;16.5%
        </li>
      </ul>
      <p>
        The Astrup trial is the cleanest evidence that topiramate
        meaningfully prevents weight regain after a low-calorie
        diet, which is the hardest problem in weight management.
        The placebo arm regained as expected; the topiramate arms
        continued to lose weight through the maintenance phase.
      </p>
      <p>
        <strong>Wilding 2004</strong><Cite n={3} /> (n=1,289) tested
        topiramate at 96, 192, and 256 mg over 60 weeks. Results
        confirmed dose-dependent weight loss (&minus;7.0% at 96 mg
        to &minus;9.7% at 256 mg), with diminishing returns and
        rising side effects at higher doses.
      </p>

      <h2>The Qsymia Phase 3 program</h2>
      <p>
        Qsymia combines phentermine (a sympathomimetic appetite
        suppressant approved for weight loss in 1959) with
        topiramate ER (a CNS-acting appetite reducer) in a single
        once-daily capsule. The combination was developed because
        the two drugs work through different mechanisms and have
        complementary side-effect profiles &mdash; phentermine&apos;s
        nervousness offset by topiramate&apos;s sedation, for
        example.
      </p>
      <p>
        <strong>EQUIP</strong> (Allison 2012)<Cite n={4} /> tested
        Qsymia in <em>severely</em> obese adults (BMI &ge;35 with no
        specific comorbidity requirement). 1,571 patients were
        randomized to placebo, low-dose Qsymia (3.75/23), or
        full-dose Qsymia (15/92) for 56 weeks. Mean weight loss:
      </p>
      <ul>
        <li>
          <strong>Placebo:</strong> &minus;1.6%
        </li>
        <li>
          <strong>Qsymia 3.75/23:</strong> &minus;5.1%
        </li>
        <li>
          <strong>Qsymia 15/92:</strong> &minus;10.9%
        </li>
      </ul>
      <p>
        <strong>CONQUER</strong> (Gadde 2011)<Cite n={5} /> tested
        Qsymia in 2,487 overweight or obese adults (BMI 27-45) with
        at least <em>two</em> obesity-related comorbidities
        (hypertension, dyslipidemia, T2D, prediabetes, abdominal
        obesity). 56-week mean weight loss:
      </p>
      <ul>
        <li>
          <strong>Placebo:</strong> &minus;1.4 kg
        </li>
        <li>
          <strong>Qsymia 7.5/46:</strong> &minus;8.1 kg
        </li>
        <li>
          <strong>Qsymia 15/92:</strong> &minus;10.2 kg (&minus;9.8%)
        </li>
      </ul>
      <p>
        Response rates at the 15/92 dose: 70% achieved &ge;5%
        weight loss and 48% achieved &ge;10%. CONQUER also showed
        meaningful improvements in BP, lipids, fasting glucose, and
        glycemic control.
      </p>
      <p>
        <strong>SEQUEL</strong> (Garvey 2012)<Cite n={6} /> was the
        108-week extension of CONQUER &mdash; one of the longest
        sustained obesity-pharmacology trials ever conducted. 487
        patients continued for an additional 52 weeks. Total
        weight loss at week 108:
      </p>
      <ul>
        <li>
          <strong>Placebo:</strong> &minus;2.5%
        </li>
        <li>
          <strong>Qsymia 7.5/46:</strong> &minus;10.9%
        </li>
        <li>
          <strong>Qsymia 15/92:</strong> &minus;12.1%
        </li>
      </ul>
      <p>
        SEQUEL also reported a <strong>78.7% relative reduction in
        incident T2D</strong> in non-diabetic Qsymia 15/92 patients
        vs placebo &mdash; a remarkably large diabetes-prevention
        signal. The trial established that Qsymia&apos;s weight
        loss is sustained for at least 2 years and that the
        cardiometabolic benefits compound.
      </p>

      <h2>Magnitude vs the modern GLP-1s</h2>
      <p>
        Side by side at the highest tested doses:
      </p>
      <ul>
        <li>
          <strong>Qsymia 15/92 (CONQUER 56-week):</strong>{" "}
          &minus;9.8% body weight
        </li>
        <li>
          <strong>Semaglutide 2.4 mg (STEP-1, 68-week):</strong>{" "}
          &minus;14.9%<Cite n={8} />
        </li>
        <li>
          <strong>Tirzepatide 15 mg (SURMOUNT-1, 72-week):</strong>{" "}
          &minus;20.9%<Cite n={9} />
        </li>
      </ul>
      <p>
        Qsymia produces approximately <strong>two-thirds of
        semaglutide&apos;s effect</strong> and{" "}
        <strong>half of tirzepatide&apos;s</strong>. That&apos;s
        better than metformin (~1/5 to 1/7) and better than the
        SGLT2 inhibitors. For patients who can&apos;t tolerate or
        afford a GLP-1, Qsymia is the next-best evidence-based oral
        option, with the longest sustained-loss data of any non-GLP-1
        weight drug.
      </p>

      <h2>Topiramate mechanism and side effects</h2>
      <p>
        Topiramate has multiple known mechanisms of action: GABA-A
        modulation, voltage-dependent sodium channel blockade,
        glutamate receptor antagonism, and carbonic anhydrase
        inhibition. Which of these drives the weight effect is not
        entirely clear; appetite suppression, altered taste
        perception (especially of carbonated beverages), and
        increased satiety all play roles.
      </p>
      <p>
        The side effects that limit topiramate use are the same
        ones that limit it in epilepsy and migraine prophylaxis:
      </p>
      <ul>
        <li>
          <strong>Cognitive effects (&ldquo;dopamax&rdquo;).</strong>{" "}
          Word-finding difficulty, slowed processing speed, memory
          impairment, and difficulty with concentration. The
          incidence is dose-dependent: roughly 10-20% at the lower
          Qsymia doses, climbing to 40-50%+ at the high
          monotherapy doses (192-384 mg) used in epilepsy and the
          Bray trial. Effects are reversible on discontinuation.
        </li>
        <li>
          <strong>Paresthesias</strong> (tingling in fingers and
          toes): 35-51% incidence depending on dose. Usually
          tolerable; potassium supplementation sometimes helps.
        </li>
        <li>
          <strong>Metabolic acidosis.</strong> 40-71% of long-term
          users have abnormal serum bicarbonate; usually mild and
          asymptomatic, occasionally requires dose adjustment or
          monitoring.
        </li>
        <li>
          <strong>Kidney stones.</strong> Maalouf 2010<Cite n={7} />{" "}
          reported 10.7% symptomatic kidney stones and 20%
          asymptomatic stones (detected by CT) in long-term
          topiramate users (median dose 300 mg, median duration 48
          months). Mechanism: hypocitraturia and elevated urine pH
          from carbonic anhydrase inhibition.
        </li>
        <li>
          <strong>Cleft lip / cleft palate teratogenicity.</strong>{" "}
          The 2011 FDA Drug Safety Communication<Cite n={11} />{" "}
          reported a 21.3-fold increased risk of oral clefts in
          topiramate-exposed pregnancies, with a clear dose-response
          (RR 1.64 at &le;100 mg/day; RR 5.16 at &gt;100 mg/day).
          This is why Qsymia ships with a REMS (Risk Evaluation and
          Mitigation Strategy) program: women of childbearing age
          must use effective contraception, and pregnancy testing
          is required before initiation and monthly during
          treatment.
        </li>
        <li>
          <strong>Mood effects.</strong> Depression-related adverse
          events occurred in 4-7% of Qsymia patients in CONQUER vs
          4% on placebo &mdash; small absolute increase but worth
          monitoring.
        </li>
      </ul>

      <h2>FDA approval, dosing, and the discontinuation rule</h2>
      <p>
        Qsymia was FDA-approved July 17, 2012<Cite n={10} /> for
        chronic weight management in adults with:
      </p>
      <ul>
        <li>BMI ≥30, OR</li>
        <li>BMI ≥27 with at least one weight-related comorbidity</li>
      </ul>
      <p>
        Doses available:
      </p>
      <ul>
        <li>
          <strong>3.75 mg phentermine / 23 mg topiramate ER</strong>{" "}
          (starter, 14 days)
        </li>
        <li>
          <strong>7.5 mg / 46 mg</strong> (standard maintenance)
        </li>
        <li>
          <strong>11.25 mg / 69 mg</strong> (escalation)
        </li>
        <li>
          <strong>15 mg / 92 mg</strong> (maximum)
        </li>
      </ul>
      <p>
        The FDA-mandated <strong>discontinuation rule</strong> is
        notable: if a patient has lost &lt;3% of body weight at 12
        weeks on the 7.5/46 dose, the prescriber should escalate
        to 15/92 OR discontinue. If the patient has lost &lt;5% at
        12 weeks on 15/92, discontinuation is required because
        continued treatment is unlikely to produce clinically
        meaningful loss. This is a more rigid stopping rule than
        most obesity drugs carry, and it&apos;s built into the
        label.
      </p>

      <h2>Cost and generic availability (2026)</h2>
      <p>
        Generic phentermine/topiramate ER was first FDA-approved in
        June 2024 (Actavis Labs, Teva, Dr. Reddy&apos;s) and
        launched commercially on May 7, 2025. As of April 2026:
      </p>
      <ul>
        <li>
          <strong>Brand Qsymia:</strong> ~$200/month or more without
          insurance
        </li>
        <li>
          <strong>Generic phentermine/topiramate ER:</strong>{" "}
          substantially cheaper, often $50-100/month with discount
          programs
        </li>
        <li>
          <strong>Insurance coverage:</strong> historically poor.
          Medicare excludes weight-loss drugs as a class, so Qsymia
          and the GLP-1s are equally not covered. Roughly half of
          Medicaid plans do not cover; commercial plans vary
          widely. The generic launch may improve coverage modestly
          but most patients will still pay out of pocket.
        </li>
      </ul>
      <p>
        At ~$50-100/month generic vs $149/month for Foundayo
        through LillyDirect or $349-499/month for Wegovy NovoCare,
        Qsymia is now competitive on price with the cheapest oral
        GLP-1, while delivering roughly two-thirds the weight loss.
        For patients without GLP-1 access this is a meaningful
        change.
      </p>

      <h2>Combining Qsymia with a GLP-1</h2>
      <p>
        There is no published RCT data on combining Qsymia with a
        GLP-1, and the combination is not FDA-approved. Some
        obesity-medicine specialists do use the combination
        off-label, typically for GLP-1 plateau cases, with
        cardiovascular monitoring (phentermine raises heart rate
        and blood pressure; GLP-1s raise heart rate by 2-4 bpm).
        The mechanistic concerns are real:
      </p>
      <ul>
        <li>
          <strong>Additive appetite suppression.</strong> Phentermine
          and GLP-1 both reduce appetite via different mechanisms;
          the combination can produce excessive nausea, vomiting,
          or insufficient caloric intake.
        </li>
        <li>
          <strong>Cardiovascular load.</strong> Heart rate and blood
          pressure effects compound. Baseline ECG and ongoing CV
          monitoring are warranted.
        </li>
        <li>
          <strong>Topiramate teratogenicity.</strong> The same REMS
          requirements apply; the combination does not relax them.
        </li>
      </ul>
      <p>
        See our existing{" "}
        <Link href="/research/can-you-take-phentermine-with-glp1">
          phentermine + GLP-1 article
        </Link>{" "}
        for the closer analog. The pure phentermine + GLP-1
        combination has more clinical-experience documentation
        than the Qsymia + GLP-1 combination.
      </p>

      <h2>Topiramate&apos;s other FDA-approved indications</h2>
      <p>
        Topiramate is FDA-approved for:
      </p>
      <ul>
        <li>
          <strong>Epilepsy</strong> (partial seizures, primary
          generalized tonic-clonic seizures, Lennox-Gastaut
          syndrome)
        </li>
        <li>
          <strong>Migraine prophylaxis</strong> (target dose ~100
          mg/day)
        </li>
        <li>
          <strong>Chronic weight management</strong> in the Qsymia
          combination only (NOT as monotherapy)
        </li>
      </ul>
      <p>
        Topiramate is also commonly used <em>off-label</em> for
        binge-eating disorder, bulimia, alcohol use disorder, and
        bipolar disorder. Patients on topiramate for one of these
        indications who happen to lose weight are experiencing a
        documented side effect &mdash; not the primary therapeutic
        effect.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Topiramate monotherapy produces ~6-10% body weight loss
          at 96-256 mg over 6-12 months (Bray 2003, Wilding 2004).
        </li>
        <li>
          As a maintenance agent after diet-induced weight loss,
          topiramate prevents regain effectively (Astrup 2004:
          &minus;16.5% from baseline at 192 mg over 52 weeks).
        </li>
        <li>
          Qsymia (phentermine + topiramate ER) at the 15/92 dose
          produces ~10% sustained weight loss out to 108 weeks
          (CONQUER, SEQUEL) and reduces incident T2D by 78.7%.
        </li>
        <li>
          Magnitude is roughly two-thirds of semaglutide and half
          of tirzepatide &mdash; better than metformin or SGLT2
          inhibitors, less than GLP-1s.
        </li>
        <li>
          The cognitive (&ldquo;dopamax&rdquo;), kidney stone (10.7%
          long-term), metabolic acidosis (40-71%), and cleft palate
          teratogenicity (RR 5.16 at &gt;100 mg) side effects are
          real and shape who should use it.
        </li>
        <li>
          Generic phentermine/topiramate ER launched May 7, 2025;
          cost is now competitive with the cheapest oral GLP-1.
        </li>
        <li>
          Combining Qsymia with a GLP-1 is off-label, not RCT-tested,
          and warrants cardiovascular monitoring and specialist
          oversight.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/can-you-take-phentermine-with-glp1">
            Can you take phentermine with a GLP-1?
          </Link>{" "}
          &mdash; the closest precedent for combining Qsymia with a
          GLP-1
        </li>
        <li>
          <Link href="/research/metformin-vs-glp1-weight-loss-evidence">
            Metformin and non-GLP-1 diabetes drugs for weight loss
          </Link>{" "}
          &mdash; the other major non-GLP-1 oral option
        </li>
        <li>
          <Link href="/research/sglt2-inhibitors-vs-glp1-jardiance-farxiga">
            SGLT2 inhibitors vs GLP-1s
          </Link>{" "}
          &mdash; another comparator class
        </li>
        <li>
          <Link href="/research/antidepressants-weight-glp1-evidence">
            Antidepressants and weight on a GLP-1
          </Link>{" "}
          &mdash; bupropion / Contrave context
        </li>
        <li>
          <Link href="/research/glp1-pricing-index">
            GLP-1 pricing index
          </Link>{" "}
          &mdash; the cost half of the comparison
        </li>
        <li>
          <Link href="/tools/glp1-bmi-calculator">
            GLP-1 BMI calculator
          </Link>{" "}
          &mdash; FDA eligibility for GLP-1s and comparison to
          Qsymia&apos;s BMI thresholds
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Qsymia
        is contraindicated in pregnancy, hyperthyroidism, glaucoma,
        and during or within 14 days of MAOI use, and requires
        baseline pregnancy testing in women of childbearing age.
        Topiramate dose escalation should be slow to manage
        cognitive and metabolic side effects. Patients with a
        history of kidney stones, metabolic acidosis, or
        psychiatric disease should discuss alternative options
        with their prescriber. Every primary source cited here was
        independently verified against PubMed and FDA on
        2026-04-08.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
