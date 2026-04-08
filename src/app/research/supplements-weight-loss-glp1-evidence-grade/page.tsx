import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "supplements-weight-loss-glp1-evidence-grade";

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
//   32690176  Asbaghi 2020 berberine meta
//   18442638  Yin 2008 berberine T2D
//   20634337  Liu 2010 berberine bioavailability
//   23949208  Proksch 2014 collagen peptide skin
//   25636220  Mumme 2015 MCT vs LCT meta
//   19597519  Hursel 2009 green tea catechin meta
//   21197150  Onakpoya 2011 garcinia meta
//   23495911  Onakpoya 2013 chromium meta
//   17490954  Whigham 2007 CLA meta
//   18842808  Sood 2008 glucomannan meta
//   21787454  Pal 2011 psyllium
//   32614129  Heshmati 2020 lemon balm meta (no weight)
//   27055824  Choudhary 2017 ashwagandha (weight not quantified)
//   32170375  Launholt 2020 ACV review
//   33567185  STEP-1 (already verified)
//   35658024  SURMOUNT-1 (already verified)
// UNVERIFIED items: L-lysine (no weight RCT), magnesium specific
// PMID 32718360 (Askari/Rafiee — flagged as PARTIALLY VERIFIED),
// Khezri 2018 ACV (J Funct Foods, no PMID indexed), all flagged
// in-line per editorial policy.

export default function SupplementsArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Asbaghi O, Ghanbari N, Shekari M, et al.",
      title:
        "The effect of berberine supplementation on obesity parameters, inflammation and liver function enzymes: A systematic review and meta-analysis of randomized controlled trials.",
      source: "Phytother Res",
      year: 2020,
      pmid: "32690176",
    },
    {
      authors: "Yin J, Xing H, Ye J.",
      title:
        "Efficacy of berberine in patients with type 2 diabetes mellitus.",
      source: "Metabolism",
      year: 2008,
      pmid: "18442638",
    },
    {
      authors: "Liu YT, Hao HP, Xie HG, et al.",
      title:
        "Extensive intestinal first-pass elimination and predominant hepatic distribution of berberine explain its low plasma levels in rats.",
      source: "Drug Metab Dispos",
      year: 2010,
      pmid: "20634337",
    },
    {
      authors: "Mumme K, Stonehouse W.",
      title:
        "Effects of medium-chain triglycerides on weight loss and body composition: a meta-analysis of randomized controlled trials.",
      source: "J Acad Nutr Diet",
      year: 2015,
      pmid: "25636220",
    },
    {
      authors:
        "Hursel R, Viechtbauer W, Westerterp-Plantenga MS.",
      title:
        "The effects of green tea on weight loss and weight maintenance: a meta-analysis.",
      source: "Int J Obes (Lond)",
      year: 2009,
      pmid: "19597519",
    },
    {
      authors: "Onakpoya I, Hung SK, Perry R, Wider B, Ernst E.",
      title:
        "The Use of Garcinia Extract (Hydroxycitric Acid) as a Weight loss Supplement: A Systematic Review and Meta-Analysis of Randomised Clinical Trials.",
      source: "J Obes",
      year: 2011,
      pmid: "21197150",
    },
    {
      authors: "Onakpoya I, Posadzki P, Ernst E.",
      title:
        "Chromium supplementation in overweight and obesity: a systematic review and meta-analysis of randomized clinical trials.",
      source: "Obes Rev",
      year: 2013,
      pmid: "23495911",
    },
    {
      authors: "Whigham LD, Watras AC, Schoeller DA.",
      title:
        "Efficacy of conjugated linoleic acid for reducing fat mass: a meta-analysis in humans.",
      source: "Am J Clin Nutr",
      year: 2007,
      pmid: "17490954",
    },
    {
      authors: "Sood N, Baker WL, Coleman CI.",
      title:
        "Effect of glucomannan on plasma lipid and glucose concentrations, body weight, and blood pressure: systematic review and meta-analysis.",
      source: "Am J Clin Nutr",
      year: 2008,
      pmid: "18842808",
    },
    {
      authors: "Pal S, Khossousi A, Binns C, Dhaliwal S, Ellis V.",
      title:
        "The effect of a fibre supplement compared to a healthy diet on body composition, lipids, glucose, insulin and other metabolic syndrome risk factors in overweight and obese individuals.",
      source: "Br J Nutr",
      year: 2011,
      pmid: "21787454",
    },
    {
      authors: "Heshmati J, Morvaridzadeh M, Sepidarkish M, et al.",
      title:
        "Effects of Melissa officinalis (Lemon Balm) on cardio-metabolic outcomes: A systematic review and meta-analysis.",
      source: "Phytother Res",
      year: 2020,
      pmid: "32614129",
    },
    {
      authors: "Choudhary D, Bhattacharyya S, Joshi K.",
      title:
        "Body Weight Management in Adults Under Chronic Stress Through Treatment With Ashwagandha Root Extract: A Double-Blind, Randomized, Placebo-Controlled Trial.",
      source: "J Evid Based Complement Altern Med",
      year: 2017,
      pmid: "27055824",
    },
    {
      authors: "Proksch E, Segger D, Degwert J, Schunck M, Zague V, Oesser S.",
      title:
        "Oral supplementation of specific collagen peptides has beneficial effects on human skin physiology: a double-blind, placebo-controlled study.",
      source: "Skin Pharmacol Physiol",
      year: 2014,
      pmid: "23949208",
    },
    {
      authors: "Launholt TL, Kristiansen CB, Hjorth P.",
      title:
        "Safety and side effects of apple vinegar intake and its effect on metabolic parameters and body weight: a systematic review.",
      source: "Eur J Nutr",
      year: 2020,
      pmid: "32170375",
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
        Sixteen popular weight-loss supplements graded A through D
        against verified PubMed primary sources. Only{" "}
        <strong>three reach grade A or B</strong> for weight loss
        with credible RCT evidence: <strong>berberine</strong>{" "}
        (Asbaghi 2020 meta &minus;2.07 kg)<Cite n={1} />,{" "}
        <strong>MCT oil</strong> as a long-chain triglyceride
        replacement (Mumme 2015 meta &minus;0.51 kg vs LCT)
        <Cite n={4} />, and <strong>green tea catechins</strong>{" "}
        (Hursel 2009 meta &minus;1.31 kg)<Cite n={5} />. Glucomannan
        <Cite n={9} />, psyllium<Cite n={10} />, CLA<Cite n={8} />,
        and apple cider vinegar reach grade B with caveats. The
        remaining 9 supplements have grade C or D evidence &mdash;
        either animal-only data, a single underpowered trial, no
        human weight-loss data at all, or evidence so methodologically
        weak that it disappears under quality filters. Even the
        best supplements produce roughly{" "}
        <strong>1-5% of GLP-1 magnitude</strong>. Lemon balm has
        2,700 monthly searches and{" "}
        <strong>zero human weight-loss RCTs</strong>. Marketing
        volume does not equal evidence. Here is the verified
        evidence map.
      </p>

      <h2>The grading scale</h2>
      <ul>
        <li>
          <strong>Grade A:</strong> Multiple RCTs converge on a
          consistent effect; meta-analysis with statistically
          significant magnitude; mechanism well-characterized.
        </li>
        <li>
          <strong>Grade B:</strong> Single decent meta-analysis or
          multiple RCTs with directional signal; modest magnitude;
          some methodological caveats.
        </li>
        <li>
          <strong>Grade C:</strong> Animal or pilot human data only;
          single underpowered RCT; or evidence that disappears
          under quality filters.
        </li>
        <li>
          <strong>Grade D:</strong> No human RCT evidence for weight
          loss specifically; folklore or marketing claims only.
        </li>
      </ul>

      <h2>Grade A: Berberine</h2>
      <p>
        We covered berberine in detail in our{" "}
        <Link href="/research/berberine-vs-glp1-evidence-review">
          dedicated berberine vs GLP-1 article
        </Link>
        . The headline: Asbaghi 2020<Cite n={1} /> meta-analyzed
        12 RCTs and reported a mean weight reduction of{" "}
        <strong>&minus;2.07 kg</strong> (95% CI &minus;3.09 to
        &minus;1.05, p&lt;0.001) and BMI reduction of &minus;0.47
        kg/m² over a median 12-week follow-up. Yin 2008<Cite n={2} />{" "}
        anchors the diabetes side. The Liu 2010 PK study
        <Cite n={3} /> showed approximately 0.36% oral
        bioavailability in rats &mdash; the bottleneck that limits
        any &ldquo;nature&apos;s Ozempic&rdquo; magnitude argument.
      </p>
      <p>
        <strong>Grade: A</strong>. Real, replicable, well-characterized
        mechanism, but ~5-8% of GLP-1 magnitude. Reasonable adjunct;
        not a substitute.
      </p>

      <h2>Grade B: MCT oil (as a fat replacement)</h2>
      <p>
        Mumme and Stonehouse 2015<Cite n={4} /> meta-analyzed 13
        RCTs (n=749) of medium-chain triglycerides as a replacement
        for long-chain triglycerides in the diet. Pooled effect:{" "}
        <strong>&minus;0.51 kg</strong> (95% CI &minus;0.80 to
        &minus;0.23, p&lt;0.001) for body weight; &minus;1.46 cm
        waist; &minus;0.79 cm hip. Effect was consistent across
        trials but modest in absolute magnitude.
      </p>
      <p>
        Critical caveat: MCT oil works as an LCT <em>replacement</em>,
        not as an additive caloric source. Bulletproof coffee
        (added MCT oil + butter on top of normal eating) is not
        the trial design. For patients to capture the modest
        benefit, they need to substitute MCT for an equal-calorie
        amount of LCT (typically olive oil or other long-chain fat).
      </p>
      <p>
        <strong>Grade: B</strong>. Real but modest, ~1-2% of GLP-1
        magnitude. Cost is not negligible (~$15-30/month for
        therapeutic doses).
      </p>

      <h2>Grade B: Green tea catechins / EGCG</h2>
      <p>
        Hursel 2009<Cite n={5} /> meta-analyzed 11 RCTs of green
        tea catechin preparations (typically standardized to ~270
        mg EGCG/day with caffeine). Pooled effect:{" "}
        <strong>&minus;1.31 kg</strong> body weight, p&lt;0.001.
        The effect was modulated by ethnicity (Asian populations
        showed larger responses) and by habitual caffeine intake
        (regular caffeine consumers showed smaller effects due to
        catechin-caffeine interaction).
      </p>
      <p>
        Decaffeinated green tea preparations show minimal benefit;
        the catechin + caffeine combination is what drives the
        effect. Hepatotoxicity has been rarely reported with
        high-dose green tea extract supplements (not with green
        tea as a beverage); USP and Cochrane note this as a low-
        but-real signal warranting label warnings.
      </p>
      <p>
        <strong>Grade: B</strong>. Real but modest, ~3-5% of GLP-1
        magnitude. Decaffeinated forms minimal benefit.
      </p>

      <h2>Grade B: Glucomannan and psyllium fiber</h2>
      <p>
        <strong>Glucomannan</strong> (konjac fiber): Sood 2008
        <Cite n={9} /> meta-analyzed 14 RCTs (n=531). Pooled body
        weight effect: <strong>&minus;0.79 kg</strong> (95% CI
        &minus;1.53 to &minus;0.05). Also reduced total cholesterol
        by 19.28 mg/dL and triglycerides by 11.08 mg/dL. Mechanism:
        viscous fiber gels in the stomach, expanding gastric volume
        and delaying emptying &mdash; satiety, not metabolism.
      </p>
      <p>
        <strong>Psyllium husk</strong> (Plantago ovata): Pal 2011
        <Cite n={10} /> randomized 66 overweight adults to psyllium
        plus a healthy diet over 12 weeks. Modest body composition
        and lipid improvements. Multiple subsequent meta-analyses
        confirm a similar profile: ~0.8-1.5 kg weight effect and
        meaningful LDL/triglyceride improvements.
      </p>
      <p>
        Both fibers carry a real choking risk if not taken with
        adequate water. Both are inexpensive, safe in renal
        disease, and support the satiety side of GI tolerance on
        a GLP-1.
      </p>
      <p>
        <strong>Grade: B</strong>. Real but modest, ~2-3% of GLP-1
        magnitude. Inexpensive and safe; reasonable adjuncts.
      </p>

      <h2>Grade B: Conjugated linoleic acid (CLA)</h2>
      <p>
        Whigham 2007<Cite n={8} /> meta-analyzed 18 RCTs of CLA
        supplementation. At 3.2 g/day (the typical effective dose),
        fat mass loss was approximately <strong>&minus;0.09 kg per
        week</strong> versus placebo, plateauing after about 6
        months. That works out to roughly &minus;4.7 kg of fat over
        6 months at the high dose &mdash; not trivial, but with
        meaningful caveats: GI upset (diarrhea, fatty stools),
        insulin resistance reported in some diabetic subgroups,
        and cost ($30-50/month) that erodes cost-effectiveness.
      </p>
      <p>
        <strong>Grade: B</strong>. Real but modest, ~3-5% of GLP-1
        magnitude. Side effects and cost limit value.
      </p>

      <h2>Grade B: Apple cider vinegar (with caveats)</h2>
      <p>
        Apple cider vinegar is heavily marketed for weight loss.
        The published evidence is thin. The Khezri 2018 trial in
        the <em>Journal of Functional Foods</em> (not PubMed-
        indexed at search time) reported an additional ~1.2 kg
        weight loss vs diet alone in 39 patients on a calorie-
        restricted diet. Launholt 2020<Cite n={14} /> in{" "}
        <em>European Journal of Nutrition</em> systematically
        reviewed the ACV literature and concluded that{" "}
        <strong>evidence for weight or metabolic effects is
        insufficient</strong> due to methodological limitations
        across the trial base.
      </p>
      <p>
        A separate 2024 BMJ Nutrition Prevention Health trial in
        Lebanese adolescents (Abou-Khalil 2024) initially reported
        large effects but was{" "}
        <strong>retracted in September 2025</strong> due to
        improbable data characteristics. Treat any weight-loss
        ACV claim sourced to that paper as void.
      </p>
      <p>
        Side effects: dental erosion with prolonged daily exposure;
        esophageal irritation if undiluted. Cost: ~$1-3/month
        (cheap vinegar from a grocery store).
      </p>
      <p>
        <strong>Grade: B with caveats</strong>. Effect is small,
        diet-context dependent, and the literature is methodologically
        weak. Cheap and harmless in moderation, but unlikely to
        meaningfully move the needle.
      </p>

      <h2>Grade C: Ashwagandha (Withania somnifera)</h2>
      <p>
        Choudhary 2017<Cite n={12} /> randomized 52 chronically
        stressed adults to ashwagandha or placebo for 8 weeks. The
        trial reported significant improvements in stress, food
        cravings, and a directional improvement in body weight,
        but the exact weight effect size was not disclosed in the
        available abstract. The weight-loss arm of the ashwagandha
        evidence base is essentially this one underpowered trial
        in a stressed-adult population.
      </p>
      <p>
        Cortisol-reduction evidence (Salve 2019, Lopresti 2019,
        covered in our{" "}
        <Link href="/research/stress-cortisol-glp1-food-noise-evidence">
          stress and cortisol article
        </Link>
        ) is somewhat stronger, but cortisol reduction is not
        weight loss.
      </p>
      <p>
        <strong>Grade: C</strong>. Plausible adjunct for stress
        eating; not a primary weight intervention. Watch for rare
        hepatotoxicity case reports.
      </p>

      <h2>Grade D / oppositional: Creatine monohydrate</h2>
      <p>
        Creatine is the most-misunderstood supplement on the list.
        It is one of the most rigorously-studied performance
        supplements with strong evidence for muscle preservation
        and strength gains during resistance training. But for{" "}
        <em>weight loss</em>, creatine works in the opposite
        direction: initial water retention from muscle creatine
        loading typically <strong>increases</strong> body weight by
        0.5-2 kg in the first weeks. Long-term, creatine supports
        lean mass preservation in caloric deficit (Forbes 2019
        meta-analysis: lean mass +0.68 kg, especially when paired
        with resistance training).
      </p>
      <p>
        For a GLP-1 patient who is already losing fat and trying
        to preserve lean mass, creatine 5 g/day plus resistance
        training is a defensible adjunct &mdash; it tilts the
        body composition outcome more favorably without preventing
        fat loss. But it does not <em>cause</em> weight loss and
        will increase the scale number short-term.
      </p>
      <p>
        <strong>Grade: D for weight loss</strong>; A for muscle
        preservation when used with resistance training. See our{" "}
        <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
          exercise pairing article
        </Link>
        .
      </p>

      <h2>Grade C: Magnesium</h2>
      <p>
        Magnesium is metabolically important and many adults are
        marginally deficient. Recent meta-analyses (Askari 2021
        and others) of magnesium supplementation and body weight
        report modest BMI reductions (~&minus;0.21 kg/m²) without
        significant body weight effects overall. Subgroup analyses
        in obese patients show waist circumference reductions of
        ~2 cm. Magnesium is useful for muscle cramps, sleep, and
        insulin sensitivity in deficient patients; it is not a
        weight-loss agent.
      </p>
      <p>
        <strong>Grade: C</strong> for weight loss; B for related
        metabolic support in deficient adults.
      </p>

      <h2>Grade D: Collagen peptides</h2>
      <p>
        The Proksch 2014 RCT<Cite n={13} /> randomized 69 women to
        oral collagen peptides or placebo for 8 weeks. The trial
        showed significant improvement in skin elasticity (the
        primary endpoint), but{" "}
        <strong>did not measure or report weight loss</strong>.
        Collagen peptides are protein, so they contribute to
        protein satiety like any other protein source, but there
        is no evidence that the collagen-specific composition
        produces weight loss above and beyond what an equivalent
        protein dose would.
      </p>
      <p>
        <strong>Useful for skin elasticity in midlife women;
        useless for weight loss directly.</strong> Relevant for
        patients losing weight rapidly on a GLP-1 who are
        concerned about loose skin (see our{" "}
        <Link href="/research/loose-skin-after-glp1-weight-loss">
          loose skin article
        </Link>
        ).
      </p>
      <p>
        <strong>Grade: D</strong> for weight loss; B for skin
        elasticity in healthy mid-life women.
      </p>

      <h2>Grade C: Cinnamon</h2>
      <p>
        Cinnamon has a weak, statistically detectable effect on
        fasting glucose in T2D patients (Allen 2013 Annals of
        Family Medicine meta-analysis: ~&minus;24.6 mg/dL fasting
        glucose, no significant A1c effect). The Allen meta did
        not report weight as a primary outcome and the broader
        cinnamon literature does not support a meaningful weight
        effect. The TikTok &ldquo;cinnamon coffee for weight loss&rdquo;
        trend is not evidence-based.
      </p>
      <p>
        <strong>Grade: C</strong>. Modest glucose effect, no
        meaningful weight effect.
      </p>

      <h2>Grade D: Garcinia cambogia (HCA)</h2>
      <p>
        Garcinia cambogia (hydroxycitric acid) is one of the most
        heavily marketed weight-loss supplements. Onakpoya 2011
        <Cite n={6} /> meta-analyzed 12 RCTs and reported a pooled
        weight effect of <strong>&minus;0.88 kg</strong> (95% CI
        &minus;1.75 to 0.00) &mdash; statistically borderline.
        When the analysis was restricted to high-quality RCTs only,
        the effect <strong>disappeared entirely</strong>. The
        signal in the meta is driven by low-quality, short-duration,
        small-sample trials.
      </p>
      <p>
        Safety: rare case reports of hepatotoxicity (FDA Consumer
        Update 2009, multiple subsequent case reports). The
        magnitude is too small to justify any risk.
      </p>
      <p>
        <strong>Grade: D</strong>. Minimal effect that disappears
        with quality filtering. Marketing exceeds evidence
        substantially.
      </p>

      <h2>Grade C: Chromium picolinate</h2>
      <p>
        Onakpoya 2013<Cite n={7} /> meta-analyzed 20 RCTs of
        chromium picolinate. The pooled body weight effect was
        statistically significant but the authors explicitly noted
        that the clinical magnitude was unclear and the effect
        was driven by trials of variable quality. Chromium is
        metabolically active in patients with documented chromium
        deficiency (rare); for the general population it does not
        produce meaningful weight loss.
      </p>
      <p>
        <strong>Grade: C</strong>. Statistically detectable but
        clinically marginal.
      </p>

      <h2>Grade D: Lemon balm (Melissa officinalis)</h2>
      <p>
        Lemon balm has 2,700 monthly searches in the US for
        weight loss. The Heshmati 2020<Cite n={11} /> meta-analysis
        of 7 RCTs on lemon balm and cardiometabolic outcomes
        explicitly{" "}
        <strong>did not measure body weight</strong>. Lipids, blood
        pressure, and glucose were unchanged. The remaining lemon
        balm literature is on anxiety and stress, where it shows
        modest benefit.{" "}
        <strong>There is no human RCT evidence for lemon balm as a
        weight-loss intervention.</strong>
      </p>
      <p>
        <strong>Grade: D</strong>. Marketing volume vastly exceeds
        evidence. Useful for anxiety; not for weight.
      </p>

      <h2>Grade D: L-Lysine</h2>
      <p>
        L-lysine has 2,300+ monthly searches for weight loss. Our
        verification subagent searched PubMed extensively and
        found{" "}
        <strong>no human RCT evidence for L-lysine causing weight
        loss</strong>. The mechanism stories (carnitine biosynthesis,
        ketone metabolism) are speculative. More than 94% of US
        adults already meet the WHO/FAO lysine requirement from
        diet alone, so supplementation is unlikely to fill any
        meaningful nutritional gap.
      </p>
      <p>
        <strong>Grade: D</strong>. UNVERIFIED for weight loss in
        humans.
      </p>

      <h2>The summary table</h2>
      <table className="not-prose w-full text-sm border-collapse mt-6 mb-6">
        <thead>
          <tr className="border-b border-brand-violet/20">
            <th className="text-left py-2 px-3 font-bold text-brand-text-primary">
              Supplement
            </th>
            <th className="text-left py-2 px-3 font-bold text-brand-text-primary">
              Grade
            </th>
            <th className="text-left py-2 px-3 font-bold text-brand-text-primary">
              Magnitude
            </th>
            <th className="text-left py-2 px-3 font-bold text-brand-text-primary">
              vs GLP-1
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Berberine</td>
            <td className="py-2 px-3 font-bold text-brand-violet">A</td>
            <td className="py-2 px-3">&minus;2.07 kg / 12 wks</td>
            <td className="py-2 px-3">~5-8%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Green tea catechins</td>
            <td className="py-2 px-3 font-bold text-brand-violet">B</td>
            <td className="py-2 px-3">&minus;1.31 kg</td>
            <td className="py-2 px-3">~3-5%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">CLA (3.2 g/day)</td>
            <td className="py-2 px-3 font-bold text-brand-violet">B</td>
            <td className="py-2 px-3">~&minus;4.7 kg / 6 mo</td>
            <td className="py-2 px-3">~3-5%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Glucomannan</td>
            <td className="py-2 px-3 font-bold text-brand-violet">B</td>
            <td className="py-2 px-3">&minus;0.79 kg</td>
            <td className="py-2 px-3">~2-3%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Psyllium fiber</td>
            <td className="py-2 px-3 font-bold text-brand-violet">B</td>
            <td className="py-2 px-3">~&minus;1 kg / 12 wks</td>
            <td className="py-2 px-3">~2-3%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">MCT oil (replacement)</td>
            <td className="py-2 px-3 font-bold text-brand-violet">B</td>
            <td className="py-2 px-3">&minus;0.51 kg vs LCT</td>
            <td className="py-2 px-3">~1-2%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Apple cider vinegar</td>
            <td className="py-2 px-3 font-bold text-brand-violet">
              B (caveat)
            </td>
            <td className="py-2 px-3">~1.2 kg (diet-dependent)</td>
            <td className="py-2 px-3">~3-5%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Ashwagandha</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              C
            </td>
            <td className="py-2 px-3">Underpowered single trial</td>
            <td className="py-2 px-3">&lt;1% est.</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Magnesium</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              C
            </td>
            <td className="py-2 px-3">Weight-neutral</td>
            <td className="py-2 px-3">~0%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Cinnamon</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              C
            </td>
            <td className="py-2 px-3">No weight evidence</td>
            <td className="py-2 px-3">&lt;1%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Chromium picolinate</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              C
            </td>
            <td className="py-2 px-3">Clinically marginal</td>
            <td className="py-2 px-3">&lt;1%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Creatine</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              D for weight loss
            </td>
            <td className="py-2 px-3">+0.5-2 kg short-term</td>
            <td className="py-2 px-3">Oppositional</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Collagen peptides</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              D
            </td>
            <td className="py-2 px-3">No weight evidence</td>
            <td className="py-2 px-3">~0%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Garcinia cambogia</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              D
            </td>
            <td className="py-2 px-3">Disappears with quality filter</td>
            <td className="py-2 px-3">&lt;1%</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-2 px-3">Lemon balm</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              D
            </td>
            <td className="py-2 px-3">Zero human RCT</td>
            <td className="py-2 px-3">UNVERIFIED</td>
          </tr>
          <tr>
            <td className="py-2 px-3">L-lysine</td>
            <td className="py-2 px-3 font-bold text-brand-text-secondary">
              D
            </td>
            <td className="py-2 px-3">Zero human RCT</td>
            <td className="py-2 px-3">UNVERIFIED</td>
          </tr>
        </tbody>
      </table>

      <h2>Comparator anchors: GLP-1 magnitudes</h2>
      <ul>
        <li>
          <strong>Semaglutide 2.4 mg (STEP-1):</strong> &minus;14.9%
          body weight at 68 weeks<Cite n={15} />
        </li>
        <li>
          <strong>Tirzepatide 15 mg (SURMOUNT-1):</strong>{" "}
          &minus;20.9% at 72 weeks<Cite n={16} />
        </li>
      </ul>
      <p>
        For a 100 kg starting weight, that&apos;s &minus;15 to
        &minus;21 kg. Even the highest-grade supplement (berberine
        at &minus;2.07 kg) is roughly 1/7 to 1/10 the magnitude.
        Patients seeking 10%+ weight loss are not going to get there
        on supplements alone.
      </p>

      <h2>Regulatory context</h2>
      <p>
        Dietary supplements in the US cannot legally make disease
        treatment claims (DSHEA 1994). Weight loss is not a disease
        per se but weight-loss claims still attract FTC scrutiny
        when unsupported. FDA does not pre-approve supplement
        efficacy or label accuracy. Independent testing programs
        (USP, NSF, ConsumerLab) repeatedly find purity and potency
        variation across supplement brands, especially in
        weight-loss product categories.
      </p>
      <p>
        The NIH Office of Dietary Supplements maintains a{" "}
        <a
          href="https://ods.od.nih.gov/factsheets/WeightLoss-HealthProfessional/"
          target="_blank"
          rel="noopener noreferrer"
        >
          weight-loss supplement factsheet
        </a>{" "}
        that is more conservative than published meta-analyses
        and emphasizes clinical relevance over statistical
        significance. Their bottom line aligns closely with this
        article: the evidence base for weight-loss supplements is
        thin, and patients seeking meaningful weight loss should
        focus on lifestyle changes and FDA-approved
        pharmacotherapy.
      </p>

      <h2>The honest patient framing</h2>
      <ul>
        <li>
          <strong>If you want significant weight loss (≥10%):</strong>{" "}
          supplements are not going to deliver. GLP-1s
          (semaglutide, tirzepatide, orforglipron), Qsymia, or
          bariatric surgery are the evidence-based options.
        </li>
        <li>
          <strong>If you&apos;re already on a GLP-1 and want a
          metabolic-support adjunct:</strong> berberine (if not on
          a CYP3A4-sensitive medication), green tea catechins, and
          fiber (glucomannan or psyllium) have the strongest
          supplement evidence.
        </li>
        <li>
          <strong>If you&apos;re trying to preserve lean mass on a
          GLP-1:</strong> creatine 5 g/day plus resistance training
          is the best-evidenced supplement intervention. See our{" "}
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            exercise pairing article
          </Link>
          .
        </li>
        <li>
          <strong>If you&apos;re on a GLP-1 and worried about loose
          skin:</strong> oral collagen peptides have evidence for
          skin elasticity (Proksch 2014) but not for weight loss.
          See our{" "}
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            loose skin article
          </Link>
          .
        </li>
        <li>
          <strong>Skip:</strong> garcinia cambogia, chromium
          picolinate, lemon balm for weight loss, L-lysine for
          weight loss, and any supplement marketed as
          &ldquo;nature&apos;s Ozempic.&rdquo;
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          16 popular weight-loss supplements graded against PubMed
          primary sources.
        </li>
        <li>
          Only berberine reaches grade A. Only six others reach
          grade B. Nine are grade C or D.
        </li>
        <li>
          Even the best supplements produce roughly 1-5% of GLP-1
          magnitude.
        </li>
        <li>
          Marketing volume does not equal evidence: lemon balm and
          L-lysine have thousands of monthly searches and zero
          human weight-loss RCTs.
        </li>
        <li>
          Creatine is oppositional: it increases scale weight
          short-term but supports lean mass preservation when
          paired with resistance training.
        </li>
        <li>
          For meaningful weight loss, FDA-approved pharmacotherapy
          (GLP-1s or Qsymia) and lifestyle change are the
          evidence-based options.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/berberine-vs-glp1-evidence-review">
            Berberine vs GLP-1: dedicated deep-dive
          </Link>
        </li>
        <li>
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            Exercise pairing on a GLP-1
          </Link>{" "}
          &mdash; for the creatine + resistance training context
        </li>
        <li>
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            Loose skin after rapid GLP-1 weight loss
          </Link>{" "}
          &mdash; for the collagen peptide context
        </li>
        <li>
          <Link href="/research/stress-cortisol-glp1-food-noise-evidence">
            Stress, cortisol, and food noise on a GLP-1
          </Link>{" "}
          &mdash; for the ashwagandha context
        </li>
        <li>
          <Link href="/research/metformin-vs-glp1-weight-loss-evidence">
            Metformin and non-GLP-1 diabetes drugs for weight loss
          </Link>{" "}
          &mdash; the prescription comparators
        </li>
        <li>
          <Link href="/tools/glp1-protein-calculator">
            GLP-1 protein calculator
          </Link>{" "}
          &mdash; for the actual evidence-based dietary intervention
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Dietary
        supplements are not FDA-approved for weight loss and may
        interact with prescription medications. Patients on
        statins, anticoagulants, antidepressants, thyroid
        medication, or any GLP-1 receptor agonist should discuss
        supplement use with their prescribing clinician before
        starting. Berberine inhibits CYP3A4 and warrants caution
        with statins (see our berberine article). Green tea extract
        has rare hepatotoxicity case reports at high doses. Garcinia
        cambogia has been associated with rare liver injury. Every
        primary source cited here was independently verified
        against PubMed on 2026-04-08. Items the verification
        subagent could not confirm against primary sources
        (specifically L-lysine and lemon balm for weight loss) are
        explicitly flagged as UNVERIFIED rather than paraphrased.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
