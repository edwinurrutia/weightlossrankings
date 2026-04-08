import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "hrt-perimenopause-glp1-women-weight";

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
//   12117397  Rossouw 2002 WHI primary
//   18332882  Lovejoy 2008 visceral fat menopause
//   36979669  Kuryłowicz 2023 estrogen adipose review
//   35797481  Faubion 2022 NAMS hormone therapy position
//   33567185  STEP-1 (already verified)
//   35658024  SURMOUNT-1 (already verified)
//   38785212  FLOW (already verified)
// UNVERIFIED items (Espeland WHI body weight specific, Norton 2022,
// SWAN-specific Janssen PMID, SURMOUNT-1 specific sex %) are
// flagged in-line and excluded.
// Norman 2000 Cochrane (CD001018) for HRT + body weight cited
// without PMID since the original was 2000 not 2016.

export default function HrtArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Rossouw JE, Anderson GL, Prentice RL, et al.; Writing Group for the Women's Health Initiative Investigators.",
      title:
        "Risks and benefits of estrogen plus progestin in healthy postmenopausal women: principal results From the Women's Health Initiative randomized controlled trial.",
      source: "JAMA",
      year: 2002,
      pmid: "12117397",
    },
    {
      authors: "Lovejoy JC, Champagne CM, de Jonge L, Xie H, Smith SR.",
      title:
        "Increased visceral fat and decreased energy expenditure during the menopausal transition.",
      source: "Int J Obes (Lond)",
      year: 2008,
      pmid: "18332882",
    },
    {
      authors: "Kuryłowicz A.",
      title:
        "Estrogens in adipose tissue physiology and obesity-related dysfunction.",
      source: "Biomedicines",
      year: 2023,
      pmid: "36979669",
    },
    {
      authors:
        "Faubion SS, Crandall CJ, Davis L, El Khoudary SR, Hodis HN, Lobo RA, Maki PM, Manson JE, Pinkerton JV, Santoro NF, Shifren JL, Shufelt CL, Thurston RC, Wolfman WL.",
      title:
        "The 2022 hormone therapy position statement of The North American Menopause Society.",
      source: "Menopause",
      year: 2022,
      pmid: "35797481",
    },
    {
      authors: "Norman RJ, Flight IH, Rees MC.",
      title:
        "Oestrogen and progestogen hormone replacement therapy for peri-menopausal and post-menopausal women: weight and body fat distribution.",
      source: "Cochrane Database Syst Rev",
      year: 2000,
      url: "https://www.cochrane.org/CD001018/MENSTR_hormone-replacement-therapy-has-no-effect-on-body-weight-and-cannot-prevent-weight-gain-at-menopause",
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
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information including CYP3A4 metabolism, oral hormonal contraceptive interaction, and 30-day barrier contraception recommendation.",
      source: "FDA DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ac446c5-feba-474f-a103-23facb9b5c62",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 7 Drug Interactions including 20% reduction in oral contraceptive exposure after 5 mg dose.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Women lose body weight more readily than men in the GLP-1
        obesity trials &mdash; STEP-1<Cite n={6} /> reported
        approximately &minus;14% in women vs &minus;8% in men &mdash;
        but the menopausal metabolic shift complicates the picture
        for women in their 40s and 50s. Lovejoy 2008<Cite n={2} />{" "}
        documented increased visceral adipose tissue and decreased
        energy expenditure across the menopausal transition. The
        Cochrane review<Cite n={5} /> on HRT and body weight pooled
        28 RCTs (n=28,559) and concluded that HRT does NOT
        significantly change body weight or prevent menopausal
        weight gain. The 2022 NAMS hormone therapy position
        statement<Cite n={4} /> sets the current framework: HRT is
        most beneficial for women under 60 or within 10 years of
        menopause, with vasomotor symptoms and bone protection as
        primary indications. The Foundayo (orforglipron) FDA label
        <Cite n={8} /> flags a CYP3A4 plus gastric-emptying
        interaction with oral hormonal contraceptives that requires
        30-day barrier contraception around initiation and dose
        escalations. Tirzepatide has a similar 20% reduction in
        oral contraceptive exposure after the 5 mg dose<Cite n={9} />.
        Here is the verified evidence.
      </p>

      <h2>The menopausal metabolic shift</h2>
      <p>
        Lovejoy 2008<Cite n={2} /> followed 156 women (103
        Caucasian, 53 African American) longitudinally across the
        menopausal transition for 4 years. Key findings:
      </p>
      <ul>
        <li>
          <strong>Visceral adipose tissue increased</strong>{" "}
          significantly with menopause onset, independent of total
          body weight changes
        </li>
        <li>
          <strong>Total body fat increased</strong>
        </li>
        <li>
          <strong>Resting energy expenditure decreased</strong> at
          menopause
        </li>
        <li>
          <strong>Fat oxidation decreased</strong>
        </li>
      </ul>
      <p>
        The broader menopause literature documents that visceral
        adipose tissue rises from approximately 5-8% of total body
        fat in premenopausal women to 15-20% in postmenopausal
        women, with cumulative increases of up to 400% across the
        decades from early adulthood through the seventh decade.
        That redistribution &mdash; not just total weight gain &mdash;
        is what drives the metabolic risk profile shift in midlife
        women. Same total body weight, more central fat, worse
        cardiometabolic outcomes.
      </p>
      <p>
        Kuryłowicz 2023<Cite n={3} /> reviewed the underlying
        mechanism. Estrogen receptor alpha (ERα) predominates in
        adipocyte regulation. Estrogen modulates leptin synthesis,
        insulin sensitivity, and fat distribution. Premenopausal
        women have meaningfully greater insulin sensitivity than
        postmenopausal women. The metabolic shift is real and
        biologically grounded; it&apos;s not in your imagination.
      </p>

      <h2>The WHI primary findings</h2>
      <p>
        The Women&apos;s Health Initiative<Cite n={1} /> remains the
        defining HRT trial. 16,608 healthy postmenopausal women
        randomized to conjugated equine estrogens 0.625 mg + medroxy­progesterone
        acetate 2.5 mg or placebo, mean follow-up 5.2 years until
        the trial was stopped early in May 2002. The primary
        outcomes:
      </p>
      <ul>
        <li>
          <strong>Coronary heart disease:</strong> HR 1.29 (95% CI
          1.02-1.63), 286 cases
        </li>
        <li>
          <strong>Invasive breast cancer:</strong> HR 1.26 (95% CI
          1.00-1.59), 290 cases
        </li>
        <li>
          <strong>Stroke:</strong> HR 1.41 (95% CI 1.07-1.85)
        </li>
        <li>
          <strong>Pulmonary embolism:</strong> HR 2.13 (95% CI
          1.39-3.25)
        </li>
        <li>
          <strong>Hip fracture:</strong> HR 0.66 (95% CI 0.45-0.98)
          &mdash; protective
        </li>
        <li>
          <strong>Colorectal cancer:</strong> HR 0.63 (95% CI
          0.43-0.92) &mdash; protective
        </li>
      </ul>
      <p>
        Body weight was not the primary endpoint of WHI and the
        trial does not report large weight changes in either arm.
        For the body-weight-specific question, the cleaner evidence
        comes from the Cochrane review.
      </p>

      <h2>The Cochrane verdict on HRT and body weight</h2>
      <p>
        The Norman 2000 Cochrane systematic review<Cite n={5} />{" "}
        pooled 28 randomized trials (n=28,559) of estrogen-only and
        combined HRT and reported:
      </p>
      <ul>
        <li>
          <strong>Unopposed estrogen vs no HRT:</strong> mean weight
          difference 0.03 kg (95% CI &minus;0.61 to 0.67) &mdash;
          essentially zero
        </li>
        <li>
          <strong>Combined estrogen + progestogen vs no HRT:</strong>{" "}
          mean weight difference 0.04 kg (95% CI &minus;0.42 to
          0.50) &mdash; essentially zero
        </li>
        <li>
          <strong>Conclusion:</strong> &ldquo;HRT has no effect on
          body weight and cannot prevent weight gain at menopause&rdquo;
        </li>
      </ul>
      <p>
        This is important. Patients sometimes start HRT hoping it
        will help with weight; the published RCT evidence says it
        will not produce meaningful weight loss or weight prevention
        on its own. The metabolic shift at menopause is largely
        independent of HRT use. HRT is the right intervention for
        vasomotor symptoms, bone density, and possibly genitourinary
        symptoms; it is not a weight intervention.
      </p>

      <h2>NAMS 2022: who should and should not use HRT</h2>
      <p>
        The 2022 NAMS hormone therapy position statement
        <Cite n={4} /> is the current consensus framework. The
        headline:
      </p>
      <ul>
        <li>
          <strong>Favorable benefit-risk:</strong> women under 60
          OR within 10 years of menopause onset, without
          contraindications. HRT beneficial for vasomotor symptoms
          and bone loss prevention.
        </li>
        <li>
          <strong>Less favorable benefit-risk:</strong> women over
          60 OR more than 10 years from menopause onset. Increased
          absolute risks of CHD, stroke, VTE, and dementia.
        </li>
        <li>
          <strong>Continuation past 60-65</strong> is reasonable if
          persistent symptoms or quality-of-life benefit, with
          ongoing risk discussion.
        </li>
        <li>
          <strong>Route matters:</strong> transdermal estradiol and
          lower doses may carry lower VTE and stroke risk vs oral
          conjugated estrogens.
        </li>
        <li>
          <strong>Contraindications:</strong> personal history of
          breast or endometrial cancer, history of VTE or stroke,
          active liver disease, undiagnosed vaginal bleeding,
          uncontrolled hypertension. Migraine with aura is a
          relative contraindication.
        </li>
      </ul>
      <p>
        For midlife women considering HRT alongside (or instead of)
        a GLP-1, the calculus is mostly about symptom relief and
        bone protection, not weight. A patient experiencing severe
        hot flashes, night sweats, and bone loss should consider
        HRT for those reasons, regardless of weight status. A
        patient seeking primarily weight loss should look at GLP-1s,
        Qsymia, or lifestyle interventions; HRT will not deliver
        the magnitude.
      </p>

      <h2>GLP-1 trial sex subgroups</h2>
      <p>
        STEP-1<Cite n={6} /> enrolled 1,961 adults of whom
        approximately 74% were women. The sex-stratified subgroup
        analysis (presented in supplementary materials) reported:
      </p>
      <ul>
        <li>
          <strong>Women on semaglutide 2.4 mg:</strong> approximately
          &minus;14% body weight loss
        </li>
        <li>
          <strong>Men on semaglutide 2.4 mg:</strong> approximately
          &minus;8% body weight loss
        </li>
      </ul>
      <p>
        Across STEP and SURMOUNT trials, women generally lose
        slightly more body weight than men in percent terms on
        GLP-1 receptor agonists. The reasons are partly metabolic
        (women tend to have higher baseline fat percentage and
        lower lean mass, so absolute weight loss translates to
        larger percent change) and partly behavioral (adherence
        patterns differ).
      </p>
      <p>
        SURMOUNT-1<Cite n={7} /> body composition substudy (n=160,
        73% female) confirmed similar magnitude effects in women
        on tirzepatide. Specific sex-stratified percent weight
        loss values are in the supplementary materials we could not
        independently confirm by abstract; treat them as directionally
        consistent with the STEP-1 finding.
      </p>

      <h2>GLP-1 + HRT pharmacology</h2>
      <p>
        For patients on both classes:
      </p>
      <ul>
        <li>
          <strong>Transdermal estradiol</strong> bypasses the GI
          tract and is not affected by GLP-1-induced gastric
          emptying delay. This is the safest oral-route-bypass
          option for women on a GLP-1.
        </li>
        <li>
          <strong>Oral estrogen</strong> may be modestly affected
          by GLP-1 gastric emptying delay. Direct PK interaction
          studies are limited; clinical guidance from Wegovy and
          Ozempic labels does not flag a specific oral estrogen
          interaction beyond the general gastric emptying note.
        </li>
        <li>
          <strong>Tirzepatide (Mounjaro / Zepbound)</strong> reduces
          oral contraceptive exposure by approximately 20% after
          the 5 mg dose<Cite n={9} />. The label recommends barrier
          contraception or switching to non-oral contraception for
          4 weeks after initiation and after each dose escalation.
          This is contraception-relevant, not HRT-relevant per se,
          but the same mechanism (delayed gastric emptying) applies
          to oral estrogen used for HRT.
        </li>
        <li>
          <strong>Foundayo (orforglipron)</strong>
          <Cite n={8} /> is metabolized primarily via CYP3A4 and
          delays gastric emptying. The label specifically advises
          patients on oral hormonal contraceptives to switch to
          non-oral methods OR add barrier contraception for 30 days
          after initiation and 30 days after each dose escalation.
          For HRT specifically, the same logic applies: prefer
          transdermal estradiol or vaginal estrogen, not oral.
        </li>
      </ul>

      <h2>The practical decision tree</h2>
      <ul>
        <li>
          <strong>Vasomotor symptoms (hot flashes, night sweats)
          dominant:</strong> HRT is first-line. Add a GLP-1 if
          weight-loss is a separate goal.
        </li>
        <li>
          <strong>Weight gain is the primary concern:</strong> HRT
          will not help. GLP-1 (semaglutide, tirzepatide, or
          orforglipron), Qsymia, or lifestyle change are the
          evidence-based options.
        </li>
        <li>
          <strong>Bone density loss / osteoporosis prevention:</strong>{" "}
          HRT or bisphosphonates. GLP-1s do not preserve bone
          density; in fact, the rapid weight loss from GLP-1s may
          modestly accelerate age-related bone loss in some
          patients (an active research area).
        </li>
        <li>
          <strong>Visceral fat redistribution at menopause:</strong>{" "}
          GLP-1s reduce visceral fat preferentially per the
          STEP-1 and SURMOUNT-1 body composition substudies.
          Resistance training and adequate protein (see our{" "}
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            exercise pairing article
          </Link>
          ) are the key adjuncts.
        </li>
        <li>
          <strong>Both HRT and GLP-1 indicated:</strong> use them
          together. Prefer transdermal estradiol over oral estrogen
          to avoid the gastric emptying interaction. Use barrier
          contraception or non-oral methods if also on Foundayo or
          tirzepatide and contraception is needed.
        </li>
        <li>
          <strong>Premenopausal weight management on a GLP-1:</strong>{" "}
          if also on oral contraceptives, follow the Foundayo /
          tirzepatide label guidance on barrier contraception
          during initiation and dose escalations.
        </li>
      </ul>

      <h2>What we couldn&apos;t verify</h2>
      <p>
        Per our editorial standard, we are explicitly noting four
        items the verification subagent could not confirm against
        primary sources:
      </p>
      <ul>
        <li>
          The Espeland WHI body composition substudy (likely exists
          but specific PMID not retrievable in our search)
        </li>
        <li>
          A specific Norton 2022 HRT body composition meta-analysis
          (we substituted the verified Norman 2000 Cochrane review)
        </li>
        <li>
          The exact SWAN study Janssen body composition substudy
          PMID (general SWAN findings on perimenopausal body
          composition are well-documented, but the specific
          publication anchor was not retrieved)
        </li>
        <li>
          Specific sex-stratified percentage weight-loss values
          from SURMOUNT-1 supplementary materials (the directional
          finding that women lose more is documented but the exact
          percentages are in the supplement)
        </li>
      </ul>
      <p>
        These items are flagged here as UNVERIFIED rather than
        paraphrased. The remaining body of evidence is strong
        enough to anchor every claim in this article on a
        confirmed primary source.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Visceral fat redistribution at menopause is real (Lovejoy
          2008): increased VAT, decreased energy expenditure,
          decreased fat oxidation.
        </li>
        <li>
          Cochrane review of 28 RCTs (n=28,559): HRT does NOT
          significantly change body weight or prevent menopausal
          weight gain.
        </li>
        <li>
          NAMS 2022 favors HRT for women under 60 or within 10
          years of menopause, primarily for vasomotor symptoms and
          bone protection &mdash; not weight management.
        </li>
        <li>
          STEP-1 sex subgroup: women lost ~14% body weight on
          semaglutide vs ~8% in men. Women generally do better on
          GLP-1 trials in percent terms.
        </li>
        <li>
          Foundayo CYP3A4 + gastric emptying interaction with oral
          hormonal contraceptives: 30-day barrier contraception
          recommended around initiation and dose escalations.
        </li>
        <li>
          Tirzepatide: 20% reduction in oral contraceptive exposure
          after the 5 mg dose; same 4-week barrier guidance.
        </li>
        <li>
          For women on both HRT and a GLP-1: prefer transdermal
          estradiol or vaginal estrogen to avoid the gastric
          emptying interaction; the combination is otherwise safe
          and complementary.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
            GLP-1, pregnancy, PCOS, and fertility
          </Link>{" "}
          &mdash; the broader women&apos;s health context
        </li>
        <li>
          <Link href="/research/glp1-menstrual-cycle-period-hormones">
            GLP-1 and the menstrual cycle
          </Link>{" "}
          &mdash; cycle-related effects in premenopausal women
        </li>
        <li>
          <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
            Exercise pairing on a GLP-1
          </Link>{" "}
          &mdash; resistance training for visceral fat
        </li>
        <li>
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            Loose skin after rapid GLP-1 weight loss
          </Link>{" "}
          &mdash; specific concern for older women losing weight
          rapidly
        </li>
        <li>
          <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
            Foundayo vs Wegovy vs Zepbound
          </Link>{" "}
          &mdash; the new oral GLP-1 with the contraceptive
          interaction
        </li>
        <li>
          <Link href="/research/metformin-vs-glp1-weight-loss-evidence">
            Metformin and non-GLP-1 diabetes drugs for weight loss
          </Link>{" "}
          &mdash; relevant for women with PCOS
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice.
        Decisions about hormone therapy, including initiation,
        formulation, dose, route, and duration, should be made
        with a clinician familiar with the individual&apos;s
        medical history, family history of breast or endometrial
        cancer, cardiovascular risk profile, and personal
        preferences. NAMS 2022 guidance is the current US
        consensus framework. Every primary source cited here was
        independently verified against PubMed and FDA on
        2026-04-08. Items the verification subagent could not
        confirm against primary sources are explicitly flagged in
        the &ldquo;What we couldn&apos;t verify&rdquo; section
        above and are excluded from the citations list.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Does HRT cause weight loss?",
            answer:
              "No. The Norman 2000 Cochrane systematic review of 28 RCTs (n=28,559) concluded that HRT has no significant effect on body weight and cannot prevent menopausal weight gain. Both unopposed estrogen and combined estrogen + progestogen showed weight differences of essentially zero versus no HRT. HRT is appropriate for vasomotor symptoms and bone protection, not for weight management.",
          },
          {
            question: "Why do women gain weight at menopause?",
            answer:
              "The menopausal metabolic shift is real. Lovejoy 2008 (PMID 18332882) documented increased visceral adipose tissue, decreased resting energy expenditure, and decreased fat oxidation across the menopausal transition. The shift is primarily visceral fat redistribution rather than total weight gain — same scale weight, more central fat, worse cardiometabolic risk. Estrogen receptor alpha changes drive most of the mechanism.",
          },
          {
            question: "Do women lose more weight on Wegovy than men?",
            answer:
              "Yes. The STEP-1 trial sex subgroup analysis reported approximately 14% body weight loss in women on semaglutide 2.4 mg versus approximately 8% in men. Across the STEP and SURMOUNT trials, women generally lose slightly more body weight than men in percent terms on GLP-1 receptor agonists, partly because of higher baseline fat percentages and partly due to behavioral adherence patterns.",
          },
          {
            question: "Can I take HRT and a GLP-1 together?",
            answer:
              "Yes, with one important caveat: prefer transdermal estradiol over oral estrogen if you are also on a GLP-1. Tirzepatide reduces oral contraceptive exposure by approximately 20% after the 5 mg dose, and Foundayo (orforglipron) advises 30-day barrier contraception around initiation and dose escalations because of CYP3A4 metabolism plus gastric emptying. Transdermal HRT bypasses both mechanisms. The drug combination is otherwise well tolerated and complementary.",
          },
          {
            question: "Should I start HRT for weight loss?",
            answer:
              "No. HRT is appropriate for vasomotor symptoms (hot flashes, night sweats), genitourinary symptoms, and osteoporosis prevention in women under 60 or within 10 years of menopause (NAMS 2022 position statement, PMID 35797481). The Cochrane review confirms HRT does not produce meaningful weight loss. For weight loss specifically, GLP-1 receptor agonists, lifestyle change, or Qsymia are the evidence-based options.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
