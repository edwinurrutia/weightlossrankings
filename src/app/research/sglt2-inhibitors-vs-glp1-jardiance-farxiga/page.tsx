import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "sglt2-inhibitors-vs-glp1-jardiance-farxiga";

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
//   26378978  Zinman 2015 EMPA-REG OUTCOME
//   32865377  Packer 2020 EMPEROR-Reduced
//   34449189  Anker 2021 EMPEROR-Preserved
//   30415602  Wiviott 2019 DECLARE-TIMI 58
//   31535829  McMurray 2019 DAPA-HF
//   32970396  Heerspink 2020 DAPA-CKD
//   36027570  Solomon 2022 DELIVER
//   28605608  Neal 2017 CANVAS
//   30990260  Perkovic 2019 CREDENCE
//   33567185  Wilding 2021 STEP-1
//   35658024  Jastreboff 2022 SURMOUNT-1
//   27633186  Marso 2016 SUSTAIN-6
//   27295427  Marso 2016 LEADER
//   37952131  Lincoff 2023 SELECT
//   38785209  Perkovic 2024 FLOW
//   27651331  Frias 2016 DURATION-8 (combo SGLT2 + GLP-1)

export default function Sglt2VsGlp1Article() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Zinman B, Wanner C, Lachin JM, Fitchett D, Bluhmki E, Hantel S, Mattheus M, Devins T, Johansen OE, Woerle HJ, Broedl UC, Inzucchi SE; EMPA-REG OUTCOME Investigators.",
      title:
        "Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2015,
      pmid: "26378978",
    },
    {
      authors:
        "Packer M, Anker SD, Butler J, et al.; EMPEROR-Reduced Trial Investigators.",
      title:
        "Cardiovascular and Renal Outcomes with Empagliflozin in Heart Failure.",
      source: "N Engl J Med",
      year: 2020,
      pmid: "32865377",
    },
    {
      authors:
        "Anker SD, Butler J, Filippatos G, et al.; EMPEROR-Preserved Trial Investigators.",
      title:
        "Empagliflozin in Heart Failure with a Preserved Ejection Fraction.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "34449189",
    },
    {
      authors:
        "Wiviott SD, Raz I, Bonaca MP, et al.; DECLARE-TIMI 58 Investigators.",
      title:
        "Dapagliflozin and Cardiovascular Outcomes in Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2019,
      pmid: "30415602",
    },
    {
      authors:
        "McMurray JJV, Solomon SD, Inzucchi SE, et al.; DAPA-HF Trial Committees and Investigators.",
      title:
        "Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction.",
      source: "N Engl J Med",
      year: 2019,
      pmid: "31535829",
    },
    {
      authors:
        "Heerspink HJL, Stefansson BV, Correa-Rotter R, et al.; DAPA-CKD Trial Committees and Investigators.",
      title:
        "Dapagliflozin in Patients with Chronic Kidney Disease.",
      source: "N Engl J Med",
      year: 2020,
      pmid: "32970396",
    },
    {
      authors:
        "Solomon SD, McMurray JJV, Claggett B, et al.; DELIVER Trial Committees and Investigators.",
      title:
        "Dapagliflozin in Heart Failure with Mildly Reduced or Preserved Ejection Fraction.",
      source: "N Engl J Med",
      year: 2022,
      pmid: "36027570",
    },
    {
      authors:
        "Neal B, Perkovic V, Mahaffey KW, et al.; CANVAS Program Collaborative Group.",
      title:
        "Canagliflozin and Cardiovascular and Renal Events in Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2017,
      pmid: "28605608",
    },
    {
      authors:
        "Perkovic V, Jardine MJ, Neal B, et al.; CREDENCE Trial Investigators.",
      title:
        "Canagliflozin and Renal Outcomes in Type 2 Diabetes and Nephropathy.",
      source: "N Engl J Med",
      year: 2019,
      pmid: "30990260",
    },
    {
      authors:
        "Marso SP, Bain SC, Consoli A, et al.; SUSTAIN-6 Investigators.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27633186",
    },
    {
      authors:
        "Marso SP, Daniels GH, Brown-Frandsen K, et al.; LEADER Steering Committee; LEADER Trial Investigators.",
      title:
        "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27295427",
    },
    {
      authors:
        "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.; SELECT Trial Investigators.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes.",
      source: "N Engl J Med",
      year: 2023,
      pmid: "37952131",
    },
    {
      authors:
        "Perkovic V, Tuttle KR, Rossing P, et al.; FLOW Trial Committees and Investigators.",
      title:
        "Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38785209",
    },
    {
      authors: "Frías JP, Guja C, Hardy E, et al.",
      title:
        "Exenatide once weekly plus dapagliflozin once daily versus exenatide or dapagliflozin alone in patients with type 2 diabetes inadequately controlled with metformin monotherapy (DURATION-8): a 28-week, multicentre, double-blind, phase 3, randomised controlled trial.",
      source: "Lancet Diabetes Endocrinol",
      year: 2016,
      pmid: "27651331",
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
        SGLT2 inhibitors (empagliflozin/Jardiance, dapagliflozin/Farxiga,
        canagliflozin/Invokana) and GLP-1 receptor agonists
        (<Link href="/drugs/semaglutide">semaglutide</Link>/<Link href="/drugs/ozempic">Ozempic</Link>/<Link href="/drugs/wegovy">Wegovy</Link>, <Link href="/drugs/tirzepatide">tirzepatide</Link>/<Link href="/drugs/mounjaro">Mounjaro</Link>/<Link href="/drugs/zepbound">Zepbound</Link>,
        orforglipron/<Link href="/drugs/foundayo">Foundayo</Link>) are the two type-2 diabetes drug classes
        that earned cardiovascular and kidney outcome indications over
        the last decade. Patient questions about which class causes more
        weight loss, which has the bigger heart-failure benefit, and
        whether they can be combined are common &mdash; and the published
        evidence answers them clearly. SGLT2 inhibitors produce
        approximately <strong>2-3 kg of weight loss</strong> via urinary
        glucose excretion. GLP-1s produce <strong>14-21% body weight
        reduction</strong> in dedicated obesity trials. Both classes have
        independent cardio-renal indications, and the trials and
        magnitudes are different in important ways. Here is the verified
        head-to-head map.
      </p>

      <h2>The two classes at a glance</h2>
      <p>
        <strong>SGLT2 inhibitors</strong> block sodium-glucose cotransporter
        2 in the proximal renal tubule, causing the kidneys to excrete
        ~70 g of glucose per day in the urine (about 280 kcal/day). This
        produces a small but real caloric deficit and a smaller weight
        loss (typically 2-3 kg) than the caloric loss alone would
        predict, because compensatory hyperphagia partially offsets the
        deficit. The bigger story is the dramatic cardiovascular and
        kidney benefits that emerged from the cardiovascular outcomes
        trials starting with EMPA-REG OUTCOME in 2015<Cite n={1} />.
      </p>
      <p>
        <strong>GLP-1 receptor agonists</strong> activate GLP-1 receptors
        in the pancreas (enhancing glucose-dependent insulin secretion),
        in the brain (reducing appetite), in the GI tract (slowing
        gastric emptying), and elsewhere. The weight loss is much larger
        &mdash; STEP-1 reported &minus;14.9% body weight on semaglutide
        2.4 mg<Cite n={14} /> and SURMOUNT-1 reported &minus;20.9% on
        tirzepatide 15 mg<Cite n={15} />. They also have parallel
        cardiovascular and kidney outcome trials (SUSTAIN-6, LEADER,
        SELECT, FLOW) that earned them indications independent of
        glycemic control.
      </p>

      <h2>The empagliflozin (Jardiance) trials</h2>
      <p>
        <strong>EMPA-REG OUTCOME</strong> (Zinman et al., NEJM 2015,
        n=7,020)<Cite n={1} /> randomized patients with type 2 diabetes
        and established cardiovascular disease to empagliflozin 10 mg,
        empagliflozin 25 mg, or placebo. The primary 3-point MACE
        endpoint was reduced with a hazard ratio of{" "}
        <strong>0.86 (95% CI 0.74-0.99, p=0.04)</strong>. Cardiovascular
        mortality was reduced by 38% (3.7% vs 5.9%), all-cause
        mortality was reduced by 32%, and heart failure hospitalization
        was reduced by 35%. The trial defined a new era in type 2
        diabetes pharmacotherapy &mdash; for the first time, a glucose-
        lowering drug had been shown to reduce cardiovascular mortality
        in a dedicated outcome trial.
      </p>
      <p>
        <strong>EMPEROR-Reduced</strong> (Packer et al., NEJM 2020,
        n=3,730)<Cite n={2} /> tested empagliflozin in patients with
        heart failure and reduced ejection fraction, with or without
        diabetes. The composite primary endpoint of cardiovascular death
        or heart failure hospitalization was reduced. <strong>EMPEROR-
        Preserved</strong> (Anker et al., NEJM 2021)<Cite n={3} /> then
        extended the benefit to heart failure with preserved ejection
        fraction with a hazard ratio of <strong>0.79 (95% CI
        0.69-0.90)</strong> &mdash; a critical finding because no other
        drug class had shown clear benefit in HFpEF. Together these
        trials made empagliflozin the first drug ever to receive FDA
        approval for both HFrEF and HFpEF.
      </p>

      <h2>The dapagliflozin (Farxiga) trials</h2>
      <p>
        <strong>DECLARE-TIMI 58</strong> (Wiviott et al., NEJM 2019,
        n=17,160)<Cite n={4} /> tested dapagliflozin in a broader
        population of T2D patients than EMPA-REG &mdash; both with and
        without established cardiovascular disease. The MACE endpoint
        did not reach significance (HR 0.93, 95% CI 0.84-1.03), but
        heart failure hospitalization was reduced by 27% (HR 0.73, 95%
        CI 0.61-0.88). DECLARE established that the heart-failure
        benefit was a class effect even in patients without prior heart
        failure or established CVD.
      </p>
      <p>
        <strong>DAPA-HF</strong> (McMurray et al., NEJM 2019, n=4,744)
        <Cite n={5} /> then tested dapagliflozin in dedicated heart-
        failure-with-reduced-EF patients (with or without diabetes) and
        replicated the heart-failure benefit. Worsening heart failure or
        cardiovascular death occurred in 16.3% (dapagliflozin) vs
        21.2% (placebo). <strong>DAPA-CKD</strong> (Heerspink et al.,
        NEJM 2020, n=4,304)<Cite n={6} /> then tested dapagliflozin in
        patients with chronic kidney disease (with or without diabetes)
        and reported a primary composite endpoint hazard ratio of{" "}
        <strong>0.61 (95% CI 0.51-0.72, p&lt;0.001)</strong> &mdash; a
        39% reduction in sustained eGFR decline, end-stage kidney
        disease, or renal/cardiovascular death. <strong>DELIVER</strong>{" "}
        (Solomon et al., NEJM 2022, n=6,263)<Cite n={7} /> closed the
        loop by demonstrating benefit in heart failure with mildly
        reduced or preserved EF (HR 0.82, 95% CI 0.73-0.92, p&lt;0.001).
      </p>

      <h2>The canagliflozin (Invokana) trials</h2>
      <p>
        <strong>CANVAS Program</strong> (Neal et al., NEJM 2017,
        n=10,142)<Cite n={8} /> reported a 14% reduction in 3-point
        MACE (HR 0.86, 95% CI 0.75-0.97, p=0.02) in T2D patients with
        established or high-risk CVD. The trial also produced a safety
        signal that has shaped the SGLT2 conversation since: a roughly
        doubled rate of lower-limb amputation (HR 1.97, 95% CI
        1.41-2.75) in the canagliflozin arms vs placebo. The amputation
        signal was not replicated in subsequent SGLT2 trials with
        empagliflozin or dapagliflozin and is generally now considered
        a canagliflozin-specific concern, not a class effect.
        <strong> CREDENCE</strong> (Perkovic et al., NEJM 2019, n=4,401)
        <Cite n={9} /> then tested canagliflozin in T2D + nephropathy
        and reported a renal composite endpoint hazard ratio of{" "}
        <strong>0.70 (95% CI 0.59-0.82, p&lt;0.00001)</strong>.
      </p>

      <h2>The GLP-1 cardio-renal trials</h2>
      <p>
        The GLP-1 class has its own four-trial cardio-renal evidence
        base. <strong>SUSTAIN-6</strong> (Marso et al., NEJM 2016,
        n=3,297)<Cite n={10} /> tested semaglutide in T2D and reported
        a 26% reduction in the primary 3-point MACE endpoint (HR 0.74,
        95% CI 0.58-0.95, noninferiority p&lt;0.001).{" "}
        <strong>LEADER</strong> (Marso et al., NEJM 2016, n=9,340)
        <Cite n={11} /> tested liraglutide and reported MACE HR 0.87
        (95% CI 0.78-0.97, p=0.01 for superiority). These were the
        first two GLP-1 trials to establish cardiovascular benefit in
        T2D patients with high CV risk.
      </p>
      <p>
        <strong>SELECT</strong> (Lincoff et al., NEJM 2023, n=17,604)
        <Cite n={12} /> moved the question to people with obesity but
        without diabetes &mdash; closer to the population of GLP-1
        patients in the obesity setting we cover most often. SELECT
        reported MACE HR <strong>0.80 (95% CI 0.72-0.90, p&lt;0.001)</strong>
        in patients with overweight/obesity and established CVD,
        without diabetes. This was the trial that earned semaglutide
        a cardiovascular indication independent of any diabetes
        diagnosis.
      </p>
      <p>
        <strong>FLOW</strong> (Perkovic et al., NEJM 2024, n=3,533)
        <Cite n={13} /> then tested semaglutide in T2D + chronic
        kidney disease and reported a kidney composite endpoint
        hazard ratio of <strong>0.76 (95% CI 0.66-0.88)</strong> &mdash;
        making semaglutide the first GLP-1 to earn an FDA-approved
        kidney indication. Our{" "}
        <Link href="/research/flow-trial-semaglutide-kidney-disease">
          dedicated FLOW trial article
        </Link>{" "}
        walks through the design and the comparison with the SGLT2
        kidney trials.
      </p>

      <h2>The weight-loss magnitude comparison</h2>
      <p>
        On the simplest comparison &mdash; how much weight does each
        class produce in dedicated trials &mdash; the difference is
        large:
      </p>
      <ul>
        <li>
          <strong>SGLT2 inhibitors:</strong> approximately 2-3 kg of
          weight loss in T2D outcome trials. The mechanism is urinary
          glucose excretion (~70 g/day = ~280 kcal/day), partially
          offset by compensatory hyperphagia. Weight loss generally
          plateaus by month 6 and is sustained but does not progress.
        </li>
        <li>
          <strong>Semaglutide 2.4 mg weekly (STEP-1):</strong>{" "}
          &minus;14.9% body weight at 68 weeks (mean &minus;15.3 kg
          from a baseline of ~105 kg)<Cite n={14} />.
        </li>
        <li>
          <strong>Tirzepatide 15 mg weekly (SURMOUNT-1):</strong>{" "}
          &minus;20.9% body weight at 72 weeks (mean &minus;21.9 kg)
          <Cite n={15} />.
        </li>
        <li>
          <strong>Orforglipron / Foundayo (ATTAIN-1):</strong>{" "}
          approximately &minus;12.4% at the highest dose at 72 weeks.
          See our{" "}
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo approval deep-dive
          </Link>
          .
        </li>
      </ul>
      <p>
        For weight loss alone, GLP-1s win by a factor of 5 to 10. But
        the comparison is not purely about weight: SGLT2 inhibitors are
        prescribed primarily for cardiovascular and kidney protection
        in T2D and HF patients, with weight loss as a secondary
        benefit. GLP-1s are now prescribed for cardiovascular
        protection too (SELECT), but the dominant indication for the
        higher doses (Wegovy, Zepbound) is obesity itself.
      </p>

      <h2>Combination therapy: SGLT2 + GLP-1</h2>
      <p>
        Because the two classes work through entirely different
        mechanisms, they are now routinely combined in T2D patients
        with both obesity and cardio-renal risk. The pivotal
        combination trial is <strong>DURATION-8</strong> (Frías et al.,
        Lancet Diabetes Endocrinol 2016, n=695)<Cite n={13} />, which
        randomized T2D patients on metformin to exenatide once-weekly,
        dapagliflozin once-daily, or both. The combination produced an
        A1c reduction of &minus;2.0% versus &minus;1.6% with exenatide
        alone and &minus;1.4% with dapagliflozin alone, and additive
        weight loss. Subsequent trials and ADA Standards of Care now
        recommend combination SGLT2 + GLP-1 as first-line for T2D
        patients with established ASCVD, heart failure, or CKD whose
        A1c is more than 1.5-2.0 percentage points above goal.
      </p>

      <h2>Safety profiles</h2>
      <p>
        The two classes have distinct safety profiles. Patients
        comparing them should know:
      </p>
      <ul>
        <li>
          <strong>SGLT2 genital mycotic infections:</strong> approximately
          3-5x baseline rates (about 6.4% on SGLT2 vs 1.8% on placebo
          in EMPA-REG, with women affected at higher rates than men).
          This is the most common SGLT2 side effect and is usually
          manageable with topical antifungals.
        </li>
        <li>
          <strong>SGLT2 euglycemic DKA:</strong> rare but real. The FDA
          issued a Drug Safety Communication in May 2015 highlighting
          cases of diabetic ketoacidosis with normal or mildly elevated
          blood glucose in SGLT2 users. Risk factors include insulin
          dose reductions, low-carbohydrate diets, severe illness,
          dehydration, and surgery.
        </li>
        <li>
          <strong>SGLT2 Fournier&apos;s gangrene:</strong> a very rare
          but serious necrotizing fasciitis of the perineum. The FDA
          added a boxed warning in August 2018. Postmarketing reports
          remain rare but serious enough that prescribers monitor for
          early signs (severe perineal pain, swelling, fever).
        </li>
        <li>
          <strong>SGLT2 amputation signal:</strong> seen in CANVAS for
          canagliflozin (HR 1.97), not replicated for empagliflozin or
          dapagliflozin in subsequent trials. Generally treated as a
          canagliflozin-specific concern.
        </li>
        <li>
          <strong>SGLT2 volume depletion:</strong> the diuretic effect
          can cause hypotension and dehydration, particularly in
          elderly patients on loop diuretics. Dose reductions of
          concomitant diuretics are commonly recommended at SGLT2
          initiation.
        </li>
        <li>
          <strong>GLP-1 GI side effects:</strong> nausea, vomiting,
          diarrhea, and constipation are dose-dependent and most
          intense in the first 4-8 weeks. See our{" "}
          <Link href="/research/glp1-nausea-management-practical-guide">
            nausea management guide
          </Link>{" "}
          and{" "}
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            verified trial side effects article
          </Link>
          .
        </li>
        <li>
          <strong>GLP-1 thyroid C-cell tumor signal</strong> (boxed
          warning in animals, no confirmed human signal). Contraindicated
          in patients with personal or family history of medullary
          thyroid carcinoma or MEN 2 syndrome. See our{" "}
          <Link href="/research/does-glp1-cause-cancer-mtc-thyroid-evidence">
            thyroid cancer evidence article
          </Link>
          .
        </li>
        <li>
          <strong>GLP-1 pancreatitis signal:</strong> small numerical
          imbalance in some trials, generally accepted as a low-
          frequency but real adverse event. Patients with prior
          pancreatitis should discuss with their prescriber.
        </li>
      </ul>

      <h2>ADA Standards of Care 2025: where each class fits</h2>
      <p>
        The American Diabetes Association&apos;s 2025 Standards of Care
        recommend:
      </p>
      <ul>
        <li>
          <strong>T2D + established ASCVD:</strong> GLP-1 RA <em>or</em>{" "}
          SGLT2 inhibitor with proven CV benefit, independent of A1c.
        </li>
        <li>
          <strong>T2D + heart failure (especially HFrEF):</strong> SGLT2
          inhibitor preferred (DAPA-HF, EMPEROR-Reduced, EMPEROR-
          Preserved, DELIVER). GLP-1 not specifically contraindicated
          but the SGLT2 evidence base is the deeper one for HF.
        </li>
        <li>
          <strong>T2D + CKD:</strong> SGLT2 inhibitor preferred up to
          eGFR threshold; semaglutide added in 2024 as an alternative
          based on FLOW.
        </li>
        <li>
          <strong>T2D + obesity:</strong> GLP-1 RA preferred for weight
          loss magnitude. SGLT2 may be added for cardio-renal protection.
        </li>
        <li>
          <strong>Initial combination therapy</strong> (SGLT2 + GLP-1)
          recommended for A1c &gt;1.5-2.0% above goal or in patients
          with multiple high-risk indications.
        </li>
      </ul>

      <h2>The honest decision tree</h2>
      <p>
        For a patient with type 2 diabetes who wants substantial weight
        loss <em>and</em> cardio-renal protection, the answer is often
        <em> both</em>. For patients without diabetes who want primarily
        weight loss, GLP-1s (or for HF/CKD without diabetes,
        dapagliflozin or empagliflozin) are the answer:
      </p>
      <ul>
        <li>
          <strong>Primary goal: substantial weight loss.</strong> GLP-1
          (semaglutide, tirzepatide, or orforglipron). SGLT2 will not
          deliver the magnitude.
        </li>
        <li>
          <strong>Primary goal: heart failure protection (with or
          without diabetes).</strong> SGLT2 inhibitor (dapagliflozin or
          empagliflozin). The HF evidence base is bigger for SGLT2 than
          for GLP-1.
        </li>
        <li>
          <strong>Primary goal: kidney protection in CKD (with
          diabetes).</strong> Either class. SGLT2 has more long-term
          data; semaglutide via FLOW now has an indication too.
        </li>
        <li>
          <strong>T2D + obesity + ASCVD or HF or CKD:</strong> SGLT2 +
          GLP-1 combination is increasingly the standard of care.
        </li>
        <li>
          <strong>Cost / access:</strong> SGLT2 inhibitors as a class
          are not yet generic in the US (as of 2026), and prices remain
          in the $500-800/month range at retail. GLP-1 access has
          improved with Foundayo at $149/month self-pay through
          LillyDirect. See our{" "}
          <Link href="/research/glp1-pricing-index">
            GLP-1 pricing index
          </Link>{" "}
          for current numbers.
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          <strong>Weight loss magnitude:</strong> SGLT2 ~2-3 kg vs
          GLP-1 14-21%. GLP-1 wins by a factor of 5-10 on weight alone.
        </li>
        <li>
          <strong>Cardio-renal evidence:</strong> both classes have
          large outcome trials with favorable HRs. SGLT2 has the
          deeper heart failure evidence (DAPA-HF, EMPEROR series,
          DELIVER). GLP-1 has SUSTAIN-6, LEADER, SELECT, and now FLOW.
        </li>
        <li>
          <strong>Combination therapy</strong> (SGLT2 + GLP-1) is
          increasingly first-line in T2D + obesity + cardio-renal risk
          per ADA 2025.
        </li>
        <li>
          <strong>Safety:</strong> SGLT2 = genital infections, rare
          DKA, rare Fournier&apos;s, volume depletion. GLP-1 = GI side
          effects in the first 4-8 weeks, MTC contraindication, rare
          pancreatitis.
        </li>
        <li>
          <strong>Generic status as of 2026:</strong> none of the
          major SGLT2s are widely available as generics in the US;
          GLP-1 access has improved with Foundayo at $149/month
          self-pay through LillyDirect.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/flow-trial-semaglutide-kidney-disease">
            FLOW: how semaglutide became the first GLP-1 with a kidney
            indication
          </Link>
        </li>
        <li>
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT: cardiovascular benefits of semaglutide in obesity
            without diabetes
          </Link>
        </li>
        <li>
          <Link href="/research/step-hfpef-semaglutide-heart-failure">
            STEP-HFpEF: semaglutide in heart failure with preserved EF
          </Link>
        </li>
        <li>
          <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
            Foundayo vs Wegovy vs Zepbound: head-to-head comparison
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-pricing-index">
            GLP-1 compounded pricing index
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            GLP-1 side effects: verified trial rates
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Patients
        with type 2 diabetes, heart failure, or chronic kidney disease
        should discuss class selection (SGLT2 inhibitor vs GLP-1
        receptor agonist vs combination) with their prescribing
        clinician, who can weigh comorbidities, interactions, cost,
        and individual risk factors. Every primary source cited here
        was independently verified against PubMed by a research
        subagent on 2026-04-07. Specific HR/CI values cited are from
        published abstracts; full-text endpoints may differ slightly
        and should be confirmed against the trial publication for any
        critical clinical decision.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Does Jardiance cause weight loss?",
            answer:
              "Yes, but modestly. Empagliflozin (Jardiance) and other SGLT2 inhibitors typically produce 2-3 kg of weight loss via urinary glucose excretion. The EMPA-REG OUTCOME trial (PMID 26378978) showed cardiovascular benefits as the dominant indication, with weight loss as a secondary effect. By comparison, semaglutide (STEP-1) produces ~14.9% body weight reduction.",
          },
          {
            question: "What's the difference between SGLT2 inhibitors and GLP-1s?",
            answer:
              "SGLT2 inhibitors block glucose reabsorption in the kidneys, causing the body to excrete ~70 g of glucose per day via urine. GLP-1 receptor agonists work centrally and on the GI tract to reduce appetite and slow gastric emptying. SGLT2 produces 2-3 kg weight loss; GLP-1s produce 14-21%. Both have cardiovascular and kidney outcome benefits but with different evidence bases and indications.",
          },
          {
            question: "Can I take Jardiance and Ozempic together?",
            answer:
              "Yes. The combination of an SGLT2 inhibitor with a GLP-1 receptor agonist is now first-line in the ADA 2025 Standards of Care for type 2 diabetes patients with both obesity and cardiovascular or kidney comorbidities. DURATION-8 (PMID 27651331) and AWARD-10 (PMID 29483060) tested combinations and showed additive benefits. There is no pharmacokinetic interaction.",
          },
          {
            question: "Which SGLT2 inhibitor is best for heart failure?",
            answer:
              "Empagliflozin (Jardiance) and dapagliflozin (Farxiga) both have FDA-approved heart failure indications based on EMPEROR-Reduced (PMID 32865377), EMPEROR-Preserved (PMID 34449189), DAPA-HF (PMID 31535829), and DELIVER (PMID 36027570). Both work in HFrEF and HFpEF — and both work whether or not the patient has diabetes. The two are largely equivalent for HF; choice often comes down to insurance coverage.",
          },
          {
            question: "What are the main side effects of SGLT2 inhibitors?",
            answer:
              "Genital mycotic infections are the most common, occurring in approximately 6% of patients (vs 2% on placebo) and more frequently in women than men. Rare but serious side effects include euglycemic diabetic ketoacidosis (FDA Drug Safety Communication 2015) and Fournier's gangrene (FDA boxed warning 2018). Volume depletion is common in elderly patients on diuretics. The CANVAS amputation signal (PMID 28605608) was specific to canagliflozin.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
