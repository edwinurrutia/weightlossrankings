import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import LiveDataCallout from "@/components/research/LiveDataCallout";
import References, { Cite } from "@/components/research/References";

const SLUG = "semaglutide-muscle-mass-loss";

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

export default function MuscleMassArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const dataAsOf = getLatestVerificationDate();

  return (
    <ResearchArticleLayout article={article} dataAsOf={dataAsOf}>
      <p>
        Every weight-loss intervention &mdash; surgical, pharmaceutical, or
        dietary &mdash; takes some of the weight from lean tissue rather
        than fat. The interesting question is how much. For semaglutide,
        the answer matters because the drug is increasingly prescribed to
        populations where preserving muscle is medically important: older
        adults, post-menopausal women, and people with type 2 diabetes who
        already have lower baseline lean mass.
      </p>

      <p>
        The headline number that has been circulating in popular coverage
        &mdash; that 30&ndash;40% of weight lost on semaglutide is lean
        body mass &mdash; is essentially correct, but it deserves
        unpacking. It comes from a DEXA sub-analysis of the STEP 1 trial,
        and the picture it paints is more nuanced than either the
        &ldquo;semaglutide melts your muscles&rdquo; takes or the
        defensive industry response that &ldquo;all weight loss looks like
        this&rdquo; would suggest. Both can be true at the same time.
        <Cite n={1} />
      </p>

      <h2>What STEP 1 actually measured</h2>

      <p>
        STEP 1 was the pivotal phase 3 trial that put semaglutide on the
        weight-loss map. 1,961 adults with overweight or obesity (and
        without type 2 diabetes) were randomized 2:1 to weekly subcutaneous
        semaglutide 2.4 mg or placebo, both layered on top of lifestyle
        intervention. After 68 weeks, the semaglutide arm had lost a mean
        of 14.9% of body weight, versus 2.4% in the placebo arm.
        <Cite n={2} />
      </p>

      <p>
        Buried inside that trial was a body composition sub-study: 140
        participants underwent DEXA (dual-energy X-ray absorptiometry)
        scans at baseline and again at week 68. DEXA is the gold standard
        non-invasive method for separating fat mass from lean mass. The
        sub-study results were published as a separate analysis a year
        after the main trial, and they are the source of every credible
        statistic on this topic.
        <Cite n={3} />
      </p>

      <p>
        Among DEXA participants in the semaglutide arm:
      </p>

      <ul>
        <li>
          Total body weight loss averaged <strong>15.8 kg</strong> (about
          35 lb).
        </li>
        <li>
          Of that loss, roughly <strong>9.7 kg was fat mass</strong>{" "}
          (61%).
        </li>
        <li>
          And roughly <strong>6.1 kg was lean body mass</strong> (39%).
        </li>
        <li>
          Visceral adipose tissue dropped sharply &mdash; the metabolically
          dangerous fat fell faster than subcutaneous fat, which is the
          finding that matters most for cardiovascular and diabetes
          outcomes.
        </li>
      </ul>

      <p>
        The 39% lean-mass figure is what gets quoted. But the qualifier
        the original investigators added is important: the{" "}
        <em>proportion</em> of lost weight that comes from lean tissue
        during semaglutide therapy is comparable to what you see in any
        unstructured caloric restriction of similar magnitude. In other
        words, the issue isn&apos;t that GLP-1s are uniquely catabolic
        &mdash; it&apos;s that fast weight loss without resistance training
        and adequate protein causes lean-mass loss across the board, and
        GLP-1s simply make fast weight loss possible at scale for the
        first time.
        <Cite n={4} />
      </p>

      <h2>How that compares to other weight-loss methods</h2>

      <p>
        For context, here&apos;s what the literature shows for the share
        of lost weight that comes from lean mass across several
        well-studied interventions:
      </p>

      <ul>
        <li>
          <strong>Bariatric surgery (Roux-en-Y).</strong> Roughly
          25&ndash;30% of total weight lost is lean mass, with significant
          variation by patient age and post-op activity. The percentage
          tends to be lower in younger, more active patients.
          <Cite n={5} />
        </li>
        <li>
          <strong>Very low calorie diets (VLCD, &lt;800 kcal/day).</strong>
          {" "}25&ndash;45% lean mass loss, depending on protein intake.
          High-protein VLCDs sit at the low end of that range.
          <Cite n={6} />
        </li>
        <li>
          <strong>Intermittent fasting.</strong> Generally 20&ndash;40%
          lean-mass share, with the same protein-and-resistance-training
          modifiers.
          <Cite n={7} />
        </li>
        <li>
          <strong>Semaglutide (STEP 1 sub-study).</strong> ~39% lean-mass
          share.
        </li>
        <li>
          <strong>Tirzepatide (SURMOUNT 1 sub-study).</strong> Similar
          range, with newer evidence suggesting comparable proportional
          composition despite the larger absolute weight loss.
          <Cite n={8} />
        </li>
      </ul>

      <p>
        The takeaway: semaglutide isn&apos;t catastrophically worse than
        other major interventions on lean-mass preservation, but it also
        isn&apos;t magically better. The percentages are similar; the
        difference is that semaglutide produces dramatically more total
        weight loss in routine clinical use, which means the absolute
        number of pounds of lean mass lost is larger even when the
        percentage is normal.
      </p>

      <LiveDataCallout
        drug="semaglutide"
        form="compounded"
        label="Live: cheapest compounded semaglutide"
      />

      <h2>Why this matters more for some patients than others</h2>

      <p>
        Not every kilogram of lean mass loss is equal. Lean body mass is
        an aggregate that includes skeletal muscle, organ tissue, bone
        mineral, and intracellular water. When weight drops fast,
        intracellular water shifts can account for a meaningful chunk of
        early &ldquo;lean&rdquo; loss without representing actual muscle
        atrophy. That&apos;s the strongest argument for not panicking
        about the headline number.
        <Cite n={9} />
      </p>

      <p>
        But the patients where the concern is real and not theoretical
        are:
      </p>

      <ul>
        <li>
          <strong>Adults over 65.</strong> Sarcopenia &mdash; age-related
          muscle loss &mdash; starts in the fourth decade and accelerates
          past 60. An older patient losing 6 kg of lean mass on top of
          natural sarcopenia can plausibly cross the threshold into
          functional impairment (slower gait speed, reduced grip strength,
          higher fall risk).
          <Cite n={10} />
        </li>
        <li>
          <strong>Post-menopausal women.</strong> The estrogen drop at
          menopause already accelerates muscle and bone loss. Layered on
          top of GLP-1 weight loss without a resistance program, this
          population shows the largest decrements in DEXA lean mass.
        </li>
        <li>
          <strong>Patients with sarcopenic obesity at baseline.</strong>{" "}
          A subset of obese patients already have low muscle mass relative
          to their body size before starting any weight-loss program.
          They&apos;re the highest-risk group, and ironically the group
          most likely to benefit from the metabolic effects of weight
          loss. Resistance training matters most for them.
          <Cite n={11} />
        </li>
        <li>
          <strong>People with type 2 diabetes.</strong> Diabetes itself
          accelerates muscle loss through insulin resistance and chronic
          inflammation. The combined effect of diabetes plus rapid weight
          loss can be larger than either alone.
        </li>
      </ul>

      <h2>What the trials show actually preserves lean mass</h2>

      <p>
        The good news is that exercise and adequate protein intake
        during GLP-1 therapy have been studied directly, and the
        results are encouraging. Several trials have shown that
        structured exercise during or after GLP-1 receptor agonist
        therapy preserves more lean body mass than diet or drug
        alone &mdash; Sandsdal and colleagues (Cardiovascular
        Diabetology, 2023) reported that combining exercise with
        GLP-1 receptor agonist treatment reduced the severity of
        adverse body composition changes compared with the drug
        alone in adults with obesity.
        <Cite n={12} />
      </p>

      <p>
        The interventions that have actually been tested in trials and
        show meaningful effect:
      </p>

      <ol>
        <li>
          <strong>Resistance training, 2&ndash;3 sessions per week,
          progressive overload.</strong> Doesn&apos;t need to be a gym
          program &mdash; bodyweight protocols and resistance bands have
          been shown to work in older adults. The dose-response
          relationship favors heavier loads when tolerable. Volume matters
          more than session length.
        </li>
        <li>
          <strong>Protein intake of 1.2&ndash;1.6 g/kg body weight per
          day.</strong> Higher than the standard 0.8 g/kg RDA. For a
          75 kg person, that&apos;s roughly 90&ndash;120 g per day. Spread
          across meals because GLP-1s slow gastric emptying and you can
          run into satiety problems trying to hit the target in one
          sitting.
          <Cite n={13} />
        </li>
        <li>
          <strong>Maintaining intake even during early appetite
          suppression.</strong> The first 8&ndash;12 weeks on semaglutide
          are when appetite drops fastest. Patients who passively let
          calorie intake fall to 800&ndash;1,000 kcal/day during this
          window are the ones who show the worst lean-mass outcomes.
          Forcing protein intake even when not hungry is the single
          most actionable lever.
        </li>
        <li>
          <strong>Vitamin D and creatine.</strong> Smaller effects, both
          well-tolerated, both supported by reasonable trial evidence in
          older adults losing weight.
          <Cite n={14} />
        </li>
      </ol>

      <p>
        Notice what isn&apos;t on the list: branched-chain amino acid
        supplements, &ldquo;anabolic&rdquo; nutraceuticals, leucine
        powders, or any of the marketing categories sold around GLP-1s.
        None of these have trial-grade evidence for preserving lean mass
        during pharmaceutical weight loss.
      </p>

      <h2>The clinical bottom line</h2>

      <p>
        The fair summary of the evidence: semaglutide produces lean-mass
        loss in roughly the same proportion as other rapid weight-loss
        methods, but the absolute amount is larger because the absolute
        weight loss is larger. For most patients under 60 with normal
        baseline muscle mass and any kind of physical activity, the
        clinical significance of the lean-mass loss is small relative to
        the cardiovascular, metabolic, and quality-of-life benefits of the
        weight loss itself.
      </p>

      <p>
        For older patients, post-menopausal women, and anyone with
        sarcopenic obesity, the picture changes &mdash; and the
        evidence-based response is not to avoid GLP-1s but to layer
        resistance training and protein intake on top of them. That
        combination has been studied, and it works.
      </p>

      <p>
        The thing nobody quotes: the same STEP 1 DEXA sub-study found
        that visceral adipose tissue (the metabolically dangerous fat
        around the organs) fell roughly twice as fast as subcutaneous fat
        on semaglutide. That&apos;s the finding that drives the
        cardiovascular outcome benefits seen in SELECT and other
        post-marketing trials. From a longevity and metabolic-health
        standpoint, the trade is heavily favorable for almost every
        patient who would clinically qualify for the drug.
      </p>

      <p>
        If you&apos;re weighing semaglutide and the muscle-loss concern
        is what&apos;s holding you back, the right question isn&apos;t
        &ldquo;is this drug catabolic?&rdquo; It&apos;s &ldquo;am I
        willing to lift weights twice a week and eat enough protein
        while I&apos;m on it?&rdquo; If the answer is yes, the data
        suggests you&apos;ll come out the other side leaner, healthier,
        and not meaningfully weaker. If the answer is no, the trade is
        less obviously favorable &mdash; and that&apos;s a conversation
        worth having with the prescribing clinician before starting.
      </p>

      <h2>Related research</h2>

      <p>For the broader picture beyond body composition:</p>

      <ul>
        <li>
          <Link href="/research/what-happens-when-you-stop-semaglutide">
            What happens when you stop taking semaglutide
          </Link>{" "}
          — STEP-4, STEP-1 extension, and SURMOUNT-4 on weight regain
          after discontinuation. Lean mass loss during treatment is
          one half of the body composition story; weight regain after
          stopping is the other.
        </li>
        <li>
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            GLP-1 side effects from the RCT adverse-event tables
          </Link>{" "}
          — including the &ldquo;Ozempic face&rdquo; discussion and
          how it relates to the lean-mass loss documented above.
        </li>
        <li>
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            What SELECT showed about cardiovascular outcomes
          </Link>{" "}
          — semaglutide&apos;s 20% MACE reduction in non-diabetic
          adults with established CVD, and the finding that the
          cardiovascular benefit appears largely independent of how
          much weight patients actually lost.
        </li>
      </ul>

      <References
        items={[
          {
            authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
            title:
              "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
            source: "N Engl J Med",
            year: 2021,
            pmid: "33567185",
          },
          {
            authors: "Wilding JPH, Batterham RL, Davies M, et al.",
            title:
              "Weight Regain and Cardiometabolic Effects After Withdrawal of Semaglutide: The STEP 1 Trial Extension.",
            source: "Diabetes Obes Metab",
            year: 2022,
            pmid: "35441470",
          },
          {
            authors: "Wilding JPH, Calanna S, Davies M, et al.",
            title:
              "Body Composition and Cardiometabolic Risk Factors in STEP 1 (Sub-Study).",
            source: "Diabetes Obes Metab",
            year: 2021,
            pmid: "34514714",
          },
          {
            authors: "Conte C, Hall KD, Klein S.",
            title:
              "Is Weight Loss-Induced Muscle Mass Loss Clinically Relevant?",
            source: "JAMA",
            year: 2024,
            pmid: "38113043",
          },
          {
            authors: "Ciangura C, Bouillot JL, Lloret-Linares C, et al.",
            title:
              "Dynamics of Change in Total and Regional Body Composition After Gastric Bypass in Obese Patients.",
            source: "Obesity (Silver Spring)",
            year: 2010,
            pmid: "19851307",
          },
          {
            authors: "Cava E, Yeat NC, Mittendorfer B.",
            title:
              "Preserving Healthy Muscle During Weight Loss.",
            source: "Adv Nutr",
            year: 2017,
            pmid: "28507015",
          },
          {
            authors: "Tinsley GM, Moore ML, Graybeal AJ, et al.",
            title:
              "Time-Restricted Feeding Plus Resistance Training in Active Females.",
            source: "Am J Clin Nutr",
            year: 2019,
            pmid: "31180451",
          },
          {
            authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
            title:
              "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
            source: "N Engl J Med",
            year: 2022,
            pmid: "35658024",
          },
          {
            authors: "Heymsfield SB, Yang S, McCarthy C, et al.",
            title:
              "Proportion of Caloric Restriction-Induced Weight Loss as Skeletal Muscle.",
            source: "Obesity (Silver Spring)",
            year: 2024,
            pmid: "38311805",
          },
          {
            authors: "Cruz-Jentoft AJ, Bahat G, Bauer J, et al.",
            title:
              "Sarcopenia: Revised European Consensus on Definition and Diagnosis (EWGSOP2).",
            source: "Age Ageing",
            year: 2019,
            pmid: "30312372",
          },
          {
            authors: "Batsis JA, Villareal DT.",
            title:
              "Sarcopenic Obesity in Older Adults: Aetiology, Epidemiology and Treatment Strategies.",
            source: "Nat Rev Endocrinol",
            year: 2018,
            pmid: "29736588",
          },
          {
            authors: "Sandsdal RM, Juhl CR, Jensen SBK, et al.",
            title:
              "Combination of Exercise and GLP-1 Receptor Agonist Treatment Reduces Severity of Metabolic Syndrome and Body Composition Changes.",
            source: "Cardiovasc Diabetol",
            year: 2023,
            pmid: "37202741",
          },
          {
            authors: "Phillips SM, Chevalier S, Leidy HJ.",
            title:
              "Protein 'Requirements' Beyond the RDA: Implications for Optimizing Health.",
            source: "Appl Physiol Nutr Metab",
            year: 2016,
            pmid: "26844893",
          },
          {
            authors: "Devries MC, Phillips SM.",
            title:
              "Creatine Supplementation During Resistance Training in Older Adults.",
            source: "Med Sci Sports Exerc",
            year: 2014,
            pmid: "24576864",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
