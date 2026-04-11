import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "metformin-vs-glp1-weight-loss-evidence";

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
//   11832527  Knowler 2002 DPP NEJM
//   19878986  DPP/DPPOS 10-year Lancet 2009
//   31009939  Apolzan 2019 DPPOS 15-year Ann Intern Med
//   17145742  Kahn 2006 ADOPT NEJM
//   23147210  Seifarth 2013 non-diabetic obesity
//   34189841  AWARD-11 dulaglutide weight
//   33567185  STEP-1 semaglutide
//   35658024  SURMOUNT-1 tirzepatide
//   12117397  Rossouw 2002 WHI primary
//   12105285  Anderson 2002 bupropion (already verified)
//   20673995  Greenway 2010 COR-I (already verified)

export default function MetforminArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Knowler WC, Barrett-Connor E, Fowler SE, Hamman RF, Lachin JM, Walker EA, Nathan DM; Diabetes Prevention Program Research Group.",
      title:
        "Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin.",
      source: "N Engl J Med",
      year: 2002,
      pmid: "11832527",
    },
    {
      authors: "Diabetes Prevention Program Research Group.",
      title:
        "10-year follow-up of diabetes incidence and weight loss in the Diabetes Prevention Program Outcomes Study.",
      source: "Lancet",
      year: 2009,
      pmid: "19878986",
    },
    {
      authors:
        "Apolzan JW, Venditti EM, Edelstein SL, Knowler WC, Dabelea D, Boyko EJ, Pi-Sunyer X, Kalyani RR, Franks PW, Srikanthan P, Gadde KM; Diabetes Prevention Program Research Group.",
      title:
        "Long-Term Weight Loss With Metformin or Lifestyle Intervention in the Diabetes Prevention Program Outcomes Study.",
      source: "Ann Intern Med",
      year: 2019,
      pmid: "31009939",
    },
    {
      authors: "Kahn SE, Haffner SM, Heise MA, Herman WH, Holman RR, Jones NP, Kravitz BG, Lachin JM, O'Neill MC, Zinman B, Viberti G; ADOPT Study Group.",
      title:
        "Glycemic durability of rosiglitazone, metformin, or glyburide monotherapy.",
      source: "N Engl J Med",
      year: 2006,
      pmid: "17145742",
    },
    {
      authors: "Seifarth C, Schehler B, Schneider HJ.",
      title:
        "Effectiveness of metformin on weight loss in non-diabetic individuals with obesity.",
      source: "Exp Clin Endocrinol Diabetes",
      year: 2013,
      pmid: "23147210",
    },
    {
      authors:
        "Frias JP, Bonora E, Nevarez Ruiz L, Li YG, Yu Z, Milicevic Z, Malik R, Bethel MA, Cox DA.",
      title:
        "Efficacy and Safety of Dulaglutide 3.0 mg and 4.5 mg Versus Dulaglutide 1.5 mg in Metformin-Treated Patients With Type 2 Diabetes in a Randomized Controlled Trial (AWARD-11).",
      source: "Diabetes Obes Metab",
      year: 2021,
      pmid: "34189841",
    },
    {
      authors: "Anderson JW, Greenway FL, Fujioka K, Gadde KM, McKenney J, O'Neil PM.",
      title:
        "Bupropion SR enhances weight loss: a 48-week double-blind, placebo-controlled trial.",
      source: "Obes Res",
      year: 2002,
      pmid: "12105285",
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
      authors: "Rossouw JE, Anderson GL, Prentice RL, et al.; Writing Group for the Women's Health Initiative Investigators.",
      title:
        "Risks and benefits of estrogen plus progestin in healthy postmenopausal women: principal results from the Women's Health Initiative randomized controlled trial.",
      source: "JAMA",
      year: 2002,
      pmid: "12117397",
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
        Metformin is the single most-searched non-GLP-1 weight-loss
        drug on the internet, with 10,000 monthly searches on{" "}
        <em>does metformin cause weight loss</em> alone. The
        published evidence is real but modest. The Diabetes
        Prevention Program (Knowler NEJM 2002, n=3,234)<Cite n={1} />{" "}
        reported &minus;2.1 kg with metformin vs &minus;0.1 kg with
        placebo over 2.8 years. The 15-year DPP Outcomes Study
        (Apolzan Ann Intern Med 2019)<Cite n={3} /> reported a
        <strong> &minus;6.2%</strong> sustained weight loss in
        metformin responders &mdash; durable but small. The Seifarth
        2013 trial<Cite n={5} /> in non-diabetic obesity reported
        &minus;5.6% over 6 months. Compared to <Link href="/drugs/semaglutide">semaglutide</Link>
        &minus;14.9% (STEP-1)<Cite n={10} /> and <Link href="/drugs/tirzepatide">tirzepatide</Link>
        &minus;20.9% (SURMOUNT-1)<Cite n={11} />, metformin produces
        roughly <strong>1/5 to 1/7 the magnitude</strong>. It is
        cheap, generic, has 60+ years of safety data, and has the
        best long-term safety profile of any obesity drug &mdash; but
        it is not in the same league as a GLP-1 for absolute weight
        loss. Here is the verified evidence map.
      </p>

      <h2>The DPP — the foundational metformin weight-loss data</h2>
      <p>
        The Diabetes Prevention Program<Cite n={1} /> remains the
        single most important metformin weight study. Knowler and
        colleagues randomized 3,234 adults with prediabetes (impaired
        glucose tolerance and elevated fasting glucose) to one of
        three arms over a mean 2.8 years:
      </p>
      <ul>
        <li>
          <strong>Lifestyle intervention</strong> (low-fat diet,
          150 minutes/week of exercise, behavioral modification):{" "}
          <strong>&minus;5.6 kg</strong>, 58% reduction in incident
          T2D (95% CI 48-66%)
        </li>
        <li>
          <strong>Metformin 850 mg twice daily:</strong>{" "}
          <strong>&minus;2.1 kg</strong>, 31% reduction in incident
          T2D (95% CI 17-43%)
        </li>
        <li>
          <strong>Placebo:</strong> &minus;0.1 kg, reference
        </li>
      </ul>
      <p>
        Two things to take away. First, the lifestyle arm produced
        more than twice the weight loss of metformin. Second,
        metformin&apos;s weight effect was real and statistically
        significant but modest in absolute terms &mdash; about 2 kg
        over nearly 3 years. The diabetes-prevention benefit was
        also real, but it was smaller than the lifestyle benefit.
      </p>

      <h2>DPPOS: 10- and 15-year follow-up</h2>
      <p>
        The DPP cohort was followed for an additional decade in the
        DPP Outcomes Study (DPPOS). The 10-year analysis<Cite n={2} />{" "}
        reported that metformin sustained approximately
        &minus;2.5 kg of weight loss out to year 10, while the
        lifestyle arm regressed back to about &minus;2 kg as
        behavior change attenuated.
      </p>
      <p>
        The Apolzan 2019 15-year analysis<Cite n={3} /> in{" "}
        <em>Annals of Internal Medicine</em> looked specifically at
        the patients who responded to metformin in year 1 with
        &ge;5% weight loss. In those responders, sustained weight
        loss across years 6-15 was:
      </p>
      <ul>
        <li>
          <strong>Metformin responders:</strong> &minus;6.2% (95% CI
          5.2-7.2%)
        </li>
        <li>
          <strong>Lifestyle responders:</strong> &minus;3.7% (95% CI
          3.1-4.4%)
        </li>
        <li>
          <strong>Placebo responders:</strong> &minus;2.8% (95% CI
          1.3-4.4%)
        </li>
      </ul>
      <p>
        For the patients who did respond to metformin, the
        long-term durability was actually <em>greater</em> than for
        the lifestyle arm. The catch is that fewer patients respond
        to metformin than respond to lifestyle, and the absolute
        magnitude is still small. But this is the cleanest published
        evidence that metformin&apos;s weight effect is durable in
        responders &mdash; not a transient effect that washes out.
      </p>

      <h2>ADOPT: metformin vs other oral diabetes drugs</h2>
      <p>
        The ADOPT trial<Cite n={4} /> (Kahn NEJM 2006, n=4,360) was
        a head-to-head comparison of three oral T2D monotherapies
        in newly-diagnosed patients followed for a mean of 4 years.
        Mean body weight changes at 48 months:
      </p>
      <ul>
        <li>
          <strong>Metformin:</strong> &minus;2.8 kg
        </li>
        <li>
          <strong>Glyburide</strong> (sulfonylurea): +1.6 kg
        </li>
        <li>
          <strong>Rosiglitazone</strong> (TZD): +4.8 kg
        </li>
      </ul>
      <p>
        ADOPT remains the reference for &ldquo;does metformin cause
        weight loss in T2D&rdquo; &mdash; the answer is yes,
        modestly, and it is one of the only oral diabetes drugs
        that does. Sulfonylureas (glyburide, glipizide, glimepiride)
        and thiazolidinediones (rosiglitazone, pioglitazone) cause
        weight gain. SGLT2 inhibitors and GLP-1 agonists cause
        weight loss; we cover those classes in detail in our{" "}
        <Link href="/research/sglt2-inhibitors-vs-glp1-jardiance-farxiga">
          SGLT2 vs GLP-1 article
        </Link>
        .
      </p>

      <h2>Metformin in non-diabetic obesity</h2>
      <p>
        For patients without diabetes, the most cited prospective
        cohort is Seifarth and colleagues<Cite n={5} /> in
        <em>Experimental and Clinical Endocrinology &amp; Diabetes</em>
        2013. They followed 154 obese, non-diabetic adults treated
        with metformin (compared to 45 controls) over 6 months and
        reported a mean weight loss of <strong>&minus;5.8 ± 7.0
        kg</strong> (about 5.6% body weight reduction). The effect
        was larger in patients with severe insulin resistance,
        consistent with metformin&apos;s mechanism &mdash; the more
        insulin-resistant the patient, the more metformin moves
        the needle.
      </p>
      <p>
        That magnitude is bigger than the DPP weight effect at the
        same time horizon, and there are a few reasons. The DPP was
        a placebo-controlled prevention trial in patients with only
        prediabetes (relatively low baseline metabolic
        dysfunction). Seifarth was a clinic-based observational
        cohort in obese patients with greater baseline insulin
        resistance. Selection effects probably amplify the
        Seifarth signal somewhat. The honest range is{" "}
        <strong>2-5 kg over 6-12 months</strong> for metformin in
        non-diabetic obesity, with more effect in patients with
        worse baseline insulin resistance.
      </p>

      <h2>The magnitude gap to GLP-1s</h2>
      <p>
        Side by side:
      </p>
      <ul>
        <li>
          <strong>Metformin:</strong> &minus;2 to &minus;3 kg over
          1-2 years (DPP, ADOPT); &minus;5.8 kg over 6 months in
          non-diabetic obese (Seifarth); &minus;6.2% durable in
          long-term responders (DPPOS 15-year).
        </li>
        <li>
          <strong>Semaglutide 2.4 mg weekly (STEP-1):</strong>{" "}
          &minus;14.9% body weight at 68 weeks &mdash; approximately
          &minus;15 kg from a baseline of 100 kg.
        </li>
        <li>
          <strong>Tirzepatide 15 mg weekly (SURMOUNT-1):</strong>{" "}
          &minus;20.9% at 72 weeks &mdash; approximately &minus;22 kg.
        </li>
      </ul>
      <p>
        Metformin produces approximately <strong>1/5 the magnitude
        of semaglutide and 1/7 of tirzepatide</strong>. The
        comparison is not flattering for metformin in absolute
        weight terms. But metformin has three things going for it
        that the GLP-1s do not:
      </p>
      <ul>
        <li>
          <strong>60 years of safety data</strong> &mdash; the longest
          safety record of any obesity drug
        </li>
        <li>
          <strong>~$4/month generic price</strong> through US discount
          pharmacies, vs. $149-$1,400/month for GLP-1s
        </li>
        <li>
          <strong>Cardiovascular and possibly cancer benefits</strong>{" "}
          documented in long-term diabetes cohorts (UK Prospective
          Diabetes Study, observational cohorts)
        </li>
      </ul>
      <p>
        For patients who don&apos;t want or can&apos;t get a GLP-1,
        and who have insulin resistance or prediabetes, metformin
        is a defensible option. For patients whose primary goal is
        weight loss without an underlying metabolic indication,
        metformin alone is not going to deliver the magnitude they
        are looking for.
      </p>

      <h2>Metformin + GLP-1: combination therapy</h2>
      <p>
        The combination of metformin + GLP-1 is the standard of
        care in T2D and has been studied extensively in the GLP-1
        registration trials. STEP-1 was conducted in non-diabetic
        adults; SURMOUNT-1 was non-diabetic; the diabetes
        equivalents (STEP-2, SURPASS-2) used metformin background
        therapy in many patients. The combination is well tolerated
        with no PK interaction. Adding metformin to a GLP-1 in T2D
        adds a small additional weight benefit (typically &lt;1 kg)
        on top of the GLP-1 effect, and adds the cardiovascular and
        glycemic benefits metformin is known for.
      </p>
      <p>
        For non-diabetic patients on a GLP-1, metformin is
        generally not added unless there is an insulin-resistance
        indication (PCOS, prediabetes). It can be a reasonable
        bridging strategy before starting a GLP-1, and a reasonable
        maintenance strategy after stopping a GLP-1, but it is not
        a substitute.
      </p>

      <h2>Trulicity and the GLP-1 dose ladder</h2>
      <p>
        Patients searching for &ldquo;does Trulicity cause weight
        loss&rdquo; (1,300/mo) sit at the boundary of this article,
        because dulaglutide is a GLP-1 receptor agonist &mdash; the
        same class as semaglutide and tirzepatide. The honest answer
        is yes, but less than semaglutide and dramatically less
        than tirzepatide.
      </p>
      <p>
        AWARD-11<Cite n={6} /> tested higher doses of dulaglutide
        (3.0 mg and 4.5 mg) against the standard 1.5 mg dose in T2D
        patients on metformin background therapy. The 36-week
        weight loss results:
      </p>
      <ul>
        <li>
          <strong>Dulaglutide 1.5 mg:</strong> &minus;3.1 kg
        </li>
        <li>
          <strong>Dulaglutide 3.0 mg:</strong> &minus;4.0 kg
        </li>
        <li>
          <strong>Dulaglutide 4.5 mg:</strong> &minus;4.7 kg
        </li>
      </ul>
      <p>
        These are T2D-population numbers (smaller weight effects
        than non-diabetic populations) at the highest dulaglutide
        doses ever tested. Compared with semaglutide 2.4 mg
        (&minus;15.3 kg) and tirzepatide 15 mg (&minus;22 kg) in
        non-diabetic obesity, dulaglutide is the lowest-magnitude
        GLP-1 in current clinical use. It earned its place when it
        was the only weekly GLP-1 available; semaglutide and
        tirzepatide have eclipsed it for weight management.
      </p>

      <h2>Other non-GLP-1 obesity drugs (briefly)</h2>
      <p>
        For completeness, the rest of the non-GLP-1 weight-loss
        drug landscape:
      </p>
      <ul>
        <li>
          <strong>Bupropion (Wellbutrin)</strong> &mdash; covered in
          our{" "}
          <Link href="/research/antidepressants-weight-glp1-evidence">
            antidepressants article
          </Link>
          . Anderson 2002<Cite n={7} /> reported &minus;7.2% to
          &minus;10.1% weight loss with bupropion SR 300-400 mg/day
          at 24 weeks in obese non-diabetic adults.
        </li>
        <li>
          <strong>Naltrexone + bupropion (Contrave)</strong> &mdash;
          Greenway COR-I 2010<Cite n={8} /> reported &minus;6.1% with
          NB 32/360 vs &minus;1.3% placebo at 56 weeks in n=1,742.
          FDA-approved for chronic weight management.
        </li>
        <li>
          <strong>Topiramate / Qsymia</strong> &mdash; covered in our
          dedicated{" "}
          <Link href="/research/topamax-qsymia-topiramate-weight-loss">
            Topamax / Qsymia article
          </Link>
          . CONQUER showed &minus;9.8% with the 15/92 dose at 56
          weeks.
        </li>
        <li>
          <strong>Vyvanse (lisdexamfetamine)</strong> &mdash; FDA-
          approved for binge-eating disorder, NOT weight loss. See
          our{" "}
          <Link href="/research/vyvanse-adderall-stimulants-weight-glp1">
            stimulants article
          </Link>
          .
        </li>
        <li>
          <strong>HRT</strong> &mdash; the WHI primary trial<Cite n={9} />{" "}
          did not report large weight effects. See our{" "}
          <Link href="/research/hrt-perimenopause-glp1-women-weight">
            HRT and perimenopause article
          </Link>
          .
        </li>
        <li>
          <strong>SGLT2 inhibitors (Jardiance, Farxiga)</strong>{" "}
          &mdash; ~2-3 kg weight loss via urinary glucose excretion;
          see our{" "}
          <Link href="/research/sglt2-inhibitors-vs-glp1-jardiance-farxiga">
            SGLT2 vs GLP-1 article
          </Link>
          .
        </li>
        <li>
          <strong>Spironolactone, levothyroxine, antidepressants
          other than bupropion</strong> &mdash; not weight-loss
          drugs; some have weight-related side effects but none
          should be prescribed primarily for weight management.
        </li>
      </ul>
      <p>
        For a side-by-side lookup of every drug and its expected
        weight effect, see our{" "}
        <Link href="/tools/non-glp1-drug-weight-effect-lookup">
          Non-GLP-1 Drug Weight Effect Lookup tool
        </Link>{" "}
        (when shipped).
      </p>

      <h2>The honest take for patients</h2>
      <ul>
        <li>
          <strong>If you have prediabetes or PCOS</strong> and want
          a low-cost, safe, evidence-based first step before
          considering a GLP-1: metformin is defensible. Expect
          ~2-3 kg over the first year and possibly more if you
          respond.
        </li>
        <li>
          <strong>If your A1c is in the diabetes range</strong> and
          you want both glycemic control and weight loss: a
          GLP-1 (semaglutide or tirzepatide) is preferred per ADA
          2025 Standards of Care. Metformin remains a useful
          adjunct.
        </li>
        <li>
          <strong>If your primary goal is significant weight loss
          (≥10%)</strong> and you have no specific
          metformin-indication, metformin is unlikely to deliver
          alone. A GLP-1 will be 5-7x more effective in absolute
          terms.
        </li>
        <li>
          <strong>If you cannot afford or cannot tolerate a GLP-1</strong>{" "}
          and have insulin resistance or prediabetes, metformin is
          a reasonable starting point. Combine it with structured
          lifestyle change (which DPP showed is the highest-leverage
          intervention) and resistance training.
        </li>
        <li>
          <strong>If you are already on a GLP-1 + metformin
          combination</strong> (common in T2D), continue both. They
          have no PK interaction and the combination is well
          studied.
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          DPP (Knowler 2002): metformin &minus;2.1 kg vs placebo
          &minus;0.1 kg over 2.8 years in 3,234 adults with
          prediabetes.
        </li>
        <li>
          DPPOS 15-year (Apolzan 2019): &minus;6.2% sustained weight
          loss in metformin responders &mdash; durable but small.
        </li>
        <li>
          ADOPT (Kahn 2006): &minus;2.8 kg with metformin in
          newly-diagnosed T2D, vs +1.6 kg glyburide and +4.8 kg
          rosiglitazone at 4 years.
        </li>
        <li>
          Seifarth 2013: &minus;5.8 kg over 6 months in non-diabetic
          obese adults, larger in those with severe insulin
          resistance.
        </li>
        <li>
          Magnitude gap: metformin produces ~1/5 the weight loss of
          semaglutide and ~1/7 of tirzepatide.
        </li>
        <li>
          But metformin has 60+ years of safety data, ~$4/month
          generic pricing, and the broadest evidence base of any
          obesity drug for cardiovascular and possibly cancer
          benefits.
        </li>
        <li>
          For patients who can&apos;t access or tolerate GLP-1s,
          metformin is a defensible first step. For everyone else,
          it is an adjunct, not a substitute.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/sglt2-inhibitors-vs-glp1-jardiance-farxiga">
            SGLT2 inhibitors vs GLP-1s
          </Link>{" "}
          &mdash; the other major non-GLP-1 diabetes drug class
        </li>
        <li>
          <Link href="/research/antidepressants-weight-glp1-evidence">
            Antidepressants and weight on a GLP-1
          </Link>{" "}
          &mdash; bupropion / Wellbutrin in detail
        </li>
        <li>
          <Link href="/research/berberine-vs-glp1-evidence-review">
            Berberine vs GLP-1s
          </Link>{" "}
          &mdash; the natural-product comparator
        </li>
        <li>
          <Link href="/research/glp1-pricing-index">
            GLP-1 pricing index
          </Link>{" "}
          &mdash; the cost half of the metformin-vs-GLP-1 decision
        </li>
        <li>
          <Link href="/research/glp1-insurance-coverage-audit">
            GLP-1 insurance coverage audit
          </Link>{" "}
          &mdash; access patterns
        </li>
        <li>
          <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
            Foundayo vs Wegovy vs Zepbound
          </Link>{" "}
          &mdash; modern GLP-1 head-to-heads
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Patients
        with type 2 diabetes, prediabetes, PCOS, or chronic kidney
        disease should discuss metformin (initiation, continuation,
        or combination with a GLP-1) with their prescribing
        clinician. Metformin is contraindicated in severe renal
        impairment and during contrast imaging. Every primary
        source cited here was independently verified against PubMed
        on 2026-04-08 by a research subagent.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Does metformin cause weight loss?",
            answer:
              "Yes, but modestly. The Diabetes Prevention Program (Knowler 2002 NEJM, PMID 11832527) reported -2.1 kg with metformin vs -0.1 kg placebo over 2.8 years in 3,234 adults with prediabetes. The 15-year DPPOS follow-up (Apolzan 2019, PMID 31009939) reported -6.2% sustained weight loss in metformin responders. The Seifarth 2013 study in non-diabetic obese adults (PMID 23147210) reported -5.8 kg over 6 months. Real but small.",
          },
          {
            question: "Is metformin as good as Ozempic for weight loss?",
            answer:
              "No. Metformin produces approximately 1/5 the weight loss of semaglutide and 1/7 of tirzepatide. STEP-1 reported -14.9% body weight on semaglutide 2.4 mg over 68 weeks; SURMOUNT-1 reported -20.9% on tirzepatide 15 mg. Metformin's typical 2-3 kg over 1-2 years is real and durable but dramatically smaller in absolute terms.",
          },
          {
            question: "How much weight will I lose on metformin?",
            answer:
              "Approximately 2-3 kg over the first year for most people, with larger effects in patients with significant insulin resistance or PCOS. The DPP cohort averaged -2.1 kg over 2.8 years; the Seifarth non-diabetic obesity cohort averaged -5.8 kg over 6 months. Individual responses vary substantially; about 25% of patients are 'responders' who achieve ≥5% weight loss long-term.",
          },
          {
            question: "Can I take metformin and a GLP-1 together?",
            answer:
              "Yes. Metformin + GLP-1 is the standard of care in type 2 diabetes and has been studied in the GLP-1 registration trials. There is no pharmacokinetic interaction. Adding metformin to a GLP-1 in T2D adds a small additional weight benefit and contributes the cardiovascular and possibly cancer benefits documented in long-term metformin cohorts.",
          },
          {
            question: "Is metformin safer than a GLP-1?",
            answer:
              "Metformin has the longest safety record of any obesity drug — over 60 years of widespread clinical use. It is contraindicated in severe renal impairment and during contrast imaging due to lactic acidosis risk. GLP-1 receptor agonists have a shorter safety record but are also generally safe in trials, with main concerns being GI side effects, the boxed warning for thyroid C-cell tumors in animal models, and rare pancreatitis. Both are generally well tolerated when used appropriately.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
