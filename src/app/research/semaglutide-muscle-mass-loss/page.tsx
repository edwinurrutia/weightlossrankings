import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import LiveDataCallout from "@/components/research/LiveDataCallout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

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
        than fat. The interesting question is how much. For <Link href="/drugs/semaglutide">semaglutide</Link>,
        the answer matters because the drug is increasingly prescribed to
        populations where preserving muscle is medically important: older
        adults, post-menopausal women, and people with type 2 diabetes who
        already have lower baseline lean mass.
      </p>

      <p>
        The headline number that has been circulating in popular coverage
        &mdash; that 20&ndash;40% of weight lost on a GLP-1 receptor
        agonist is lean body mass &mdash; is essentially correct, but it
        deserves unpacking. The picture is more nuanced than either the
        &ldquo;semaglutide melts your muscles&rdquo; takes or the
        defensive industry response that &ldquo;all weight loss looks like
        this&rdquo; would suggest. Both can be true at the same time.
      </p>

      <h2>What the trials actually measured</h2>

      <p>
        STEP 1 was the pivotal phase 3 trial that put semaglutide on the
        weight-loss map. 1,961 adults with overweight or obesity (and
        without type 2 diabetes) were randomized 2:1 to weekly subcutaneous
        semaglutide 2.4 mg or placebo, both layered on top of lifestyle
        intervention. After 68 weeks, the semaglutide arm had lost a mean
        of 14.9% of body weight, versus 2.4% in the placebo arm.
        <Cite n={1} />
      </p>

      <p>
        The body-composition picture for GLP-1 receptor agonists comes
        from several sources. The most directly comparable is the
        SURMOUNT-1 body-composition sub-study (Look et al., Diabetes
        Obes Metab 2025), which used DEXA in 160 participants from the
        <Link href="/drugs/tirzepatide">tirzepatide</Link> pivotal obesity trial. At week 72, the tirzepatide
        arm lost 21.3% of body weight, with fat mass falling 33.9% and
        lean mass falling 10.9%. Roughly 75% of the weight lost was
        fat mass and 25% was lean mass &mdash; and the same ~75/25
        split was seen in the placebo arm, suggesting the proportional
        composition of the loss was no different than diet alone.
        <Cite n={2} />
      </p>

      <p>
        A 2025 systematic review and network meta-analysis by Karakasis
        and colleagues pooled 22 randomized trials of GLP-1 receptor
        agonists and co-agonists (2,258 participants) and found that
        across the class, lean mass accounts for approximately 25% of
        total weight loss. Semaglutide and tirzepatide produced the
        largest absolute fat loss but were among the least effective at
        preserving lean mass relative to other agents.
        <Cite n={3} />
      </p>

      <p>
        The qualifier that matters: the <em>proportion</em> of lost
        weight that comes from lean tissue during GLP-1 therapy is
        comparable to what you see in unstructured caloric restriction
        of similar magnitude. The Heymsfield 2024 modeling paper in
        Obesity, drawing on 897 healthy adults followed longitudinally,
        estimated that men lose roughly 26% of weight as skeletal muscle
        during voluntary calorie restriction without exercise, and
        women roughly 14%. In other words, GLP-1s aren&apos;t uniquely
        catabolic &mdash; fast weight loss without resistance training
        and adequate protein causes lean-mass loss across the board,
        and GLP-1s simply make fast weight loss possible at scale for
        the first time.
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
          <Cite n={6} />
        </li>
        <li>
          <strong>Caloric restriction (general).</strong> Modeling
          across pooled cohorts puts the share at roughly 26% of weight
          loss as skeletal muscle in men and 14% in women without
          structured exercise.
          <Cite n={4} />
        </li>
        <li>
          <strong>Very low calorie diets and intermittent fasting.</strong>
          {" "}Generally fall in the 20&ndash;40% lean-mass range,
          modified heavily by protein intake and concurrent resistance
          training.
          <Cite n={7} /><Cite n={8} />
        </li>
        <li>
          <strong>Tirzepatide (SURMOUNT-1 sub-study).</strong> ~25%
          lean-mass share over 72 weeks &mdash; the same proportional
          split as the placebo arm of the same trial.
          <Cite n={2} /><Cite n={9} />
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
        about the headline number, and it is the central point of a
        2024 JAMA viewpoint by Conte, Hall and Klein arguing that the
        clinical relevance of GLP-1-induced fat-free mass loss in most
        adults with obesity has been overstated.
        <Cite n={7} /><Cite n={5} />
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
        The thing worth keeping in view: in the SURMOUNT-1
        body-composition sub-study, fat mass fell about three times
        faster than lean mass on tirzepatide, and the proportional
        ~75/25 split of weight loss into fat versus lean was no
        different from the placebo arm of the same trial. That&apos;s
        the finding consistent with the cardiovascular and metabolic
        outcome benefits seen in SELECT and other post-marketing
        trials of GLP-1 receptor agonists. From a longevity and
        metabolic-health standpoint, the trade is heavily favorable
        for almost every patient who would clinically qualify for
        the drug.
        <Cite n={2} />
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
          — including the &ldquo;<Link href="/drugs/ozempic">Ozempic</Link> face&rdquo; discussion and
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
        <li>
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            Exercise pairing for lean-mass preservation
          </Link>{" "}
          — the resistance-training protocols that the published
          literature shows mitigate the lean-mass loss documented
          above.
        </li>
        <li>
          <Link href="/tools/glp1-protein-calculator">
            GLP-1 protein calculator
          </Link>{" "}
          — calculates your daily protein target with the GLP-1
          bump applied, anchored on the Neeland 2024 lean-mass
          mitigation review.
        </li>
        <li>
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            Loose skin after GLP-1 weight loss
          </Link>{" "}
          — the downstream consequence of inadequate lean-mass
          preservation during rapid weight loss.
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
            authors:
              "Look M, Dunn JP, Kushner RF, Cao D, Harris C, Hunter Gibble T, Stefanski A, Griffin R.",
            title:
              "Body Composition Changes During Weight Reduction with Tirzepatide in the SURMOUNT-1 Study of Adults with Obesity or Overweight.",
            source: "Diabetes Obes Metab",
            year: 2025,
            pmid: "39996356",
          },
          {
            authors:
              "Karakasis P, Patoulias D, Fragakis N, Mantzoros CS.",
            title:
              "Effect of Glucagon-Like Peptide-1 Receptor Agonists and Co-Agonists on Body Composition: Systematic Review and Network Meta-Analysis.",
            source: "Metabolism",
            year: 2025,
            pmid: "39719170",
          },
          {
            authors:
              "Heymsfield SB, Yang S, McCarthy C, Brown JB, Martin CK, Redman LM, Ravussin E, Shen W, Müller MJ, Bosy-Westphal A.",
            title:
              "Proportion of Caloric Restriction-Induced Weight Loss as Skeletal Muscle.",
            source: "Obesity (Silver Spring)",
            year: 2024,
            pmid: "37807154",
          },
          {
            authors: "Conte C, Hall KD, Klein S.",
            title:
              "Is Weight Loss-Induced Muscle Mass Loss Clinically Relevant?",
            source: "JAMA",
            year: 2024,
            pmid: "38829659",
          },
          {
            authors:
              "Ciangura C, Bouillot JL, Lloret-Linares C, Poitou C, Veyrie N, Basdevant A, Oppert JM.",
            title:
              "Dynamics of Change in Total and Regional Body Composition After Gastric Bypass in Obese Patients.",
            source: "Obesity (Silver Spring)",
            year: 2010,
            pmid: "19834464",
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
            authors:
              "Tinsley GM, Moore ML, Graybeal AJ, Paoli A, Kim Y, Gonzales JU, Harry JR, VanDusseldorp TA, Kennedy DN, Cruz MR.",
            title:
              "Time-Restricted Feeding Plus Resistance Training in Active Females: A Randomized Trial.",
            source: "Am J Clin Nutr",
            year: 2019,
            pmid: "31268131",
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
            pmid: "30065268",
          },
          {
            authors:
              "Sandsdal RM, Juhl CR, Jensen SBK, Lundgren JR, Janus C, Blond MB, Rosenkilde M, Bogh AF, Gliemann L, Jensen JB, Antoniades C, Stallknecht BM, Holst JJ, Madsbad S, Torekov SS.",
            title:
              "Combination of Exercise and GLP-1 Receptor Agonist Treatment Reduces Severity of Metabolic Syndrome, Abdominal Obesity, and Inflammation: A Randomized Controlled Trial.",
            source: "Cardiovasc Diabetol",
            year: 2023,
            pmid: "36841762",
          },
          {
            authors: "Phillips SM, Chevalier S, Leidy HJ.",
            title:
              "Protein 'Requirements' Beyond the RDA: Implications for Optimizing Health.",
            source: "Appl Physiol Nutr Metab",
            year: 2016,
            pmid: "26960445",
          },
          {
            authors: "Devries MC, Phillips SM.",
            title:
              "Creatine Supplementation During Resistance Training in Older Adults: A Meta-Analysis.",
            source: "Med Sci Sports Exerc",
            year: 2014,
            pmid: "24576864",
          },
        ]}
      />
      <FaqSchema
        items={[
          {
            question: "Does semaglutide cause muscle loss?",
            answer:
              "Yes — but it's largely a function of rapid weight loss, not a direct drug effect. Body composition substudies in STEP 1 (semaglutide) and SURMOUNT-1 (tirzepatide) showed about 25-40% of total weight loss came from lean tissue. The same lean-mass loss occurs after bariatric surgery and severe calorie restriction. Strategies that mitigate it: high protein intake, resistance training, slower titration, and adequate calories.",
          },
          {
            question: "How much muscle do you lose on Wegovy or Zepbound?",
            answer:
              "DXA-based body composition analyses suggest 25-40% of total weight loss on semaglutide and tirzepatide is fat-free mass (which includes water, organ tissue, and muscle). For a patient losing 40 lb total, that's roughly 10-16 lb of fat-free mass, of which about half (5-8 lb) is skeletal muscle. The proportion can be reduced significantly with protein and resistance training.",
          },
          {
            question: "How much protein should I eat on a GLP-1 to preserve muscle?",
            answer:
              "Published recommendations for adults losing weight while preserving lean mass range from 1.6-2.2 g of protein per kg of body weight per day (Phillips 2016, Helms 2014, ISSN 2017). The Neeland 2024 review on GLP-1 lean-mass mitigation specifically recommends targeting the higher end of this range. For a 200-lb patient that's about 145-200 g of protein daily.",
          },
          {
            question: "Is the muscle loss on a GLP-1 permanent?",
            answer:
              "No. Skeletal muscle is highly responsive to resistance training at any age, and lost muscle can be regained with progressive overload + adequate protein after weight loss stabilizes. The stronger concern is the loss of muscle quality (intramuscular fat, neural drive) in older adults, which is harder to restore — making protein and resistance training during the active loss phase the better strategy.",
          },
          {
            question: "Does resistance training prevent muscle loss on a GLP-1?",
            answer:
              "Resistance training does not eliminate lean-mass loss during a caloric deficit, but it dramatically reduces it. Trials in non-GLP-1 weight-loss settings consistently show that the combination of high protein + resistance training preserves about twice as much lean mass as diet alone. There is no GLP-1-specific RCT yet, but the underlying biology is the same: muscle protein synthesis responds to load and substrate regardless of why you're in a deficit.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
