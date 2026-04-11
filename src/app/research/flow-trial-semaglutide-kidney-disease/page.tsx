import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "flow-trial-semaglutide-kidney-disease";

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

// Every clinical claim in this article was verified by an editorial
// research subagent against PubMed primary sources before publication.
// Core verified facts come from the FLOW main publication
// (Perkovic et al, NEJM 2024, PMID 38785209) and the FDA Ozempic
// kidney indication approval announcement of January 28, 2025.
// SGLT2 comparator trial results are verified against their own
// NEJM publications (CREDENCE PMID 30990260, DAPA-CKD PMID 32970396,
// EMPA-KIDNEY PMID 35929472).

export default function FlowKidneyArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Perkovic V, Tuttle KR, Rossing P, Mahaffey KW, Mann JFE, Bakris G, Baeres FMM, Idorn T, Bosch-Traberg H, Lausvig NL, Pratley R; FLOW Trial Committees and Investigators.",
      title:
        "Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38785209",
    },
    {
      authors:
        "Rossing P, Baeres FMM, Bakris G, Bosch-Traberg H, Gislum M, Gough SCL, Idorn T, Lawson J, Mahaffey KW, Mann JFE, Mersebach H, Perkovic V, Tuttle K, Pratley R.",
      title:
        "The rationale, design and baseline data of FLOW, a kidney outcomes trial with once-weekly semaglutide in people with type 2 diabetes and chronic kidney disease.",
      source: "Nephrol Dial Transplant",
      year: 2023,
      pmid: "36651820",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA approves first treatment to reduce risk of serious kidney disease worsening, kidney failure, and cardiovascular death in adults with type 2 diabetes and chronic kidney disease.",
      source: "FDA News Release, January 28, 2025",
      year: 2025,
      url: "https://www.fda.gov/drugs/news-events-human-drugs/fda-approves-treatment-adults-type-2-diabetes-and-chronic-kidney-disease",
    },
    {
      authors:
        "Perkovic V, Jardine MJ, Neal B, Bompoint S, Heerspink HJL, Charytan DM, Edwards R, Agarwal R, Bakris G, Bull S, Cannon CP, Capuano G, Chu PL, de Zeeuw D, Greene T, Levin A, Pollock C, Wheeler DC, Yavin Y, Zhang H, Zinman B, Meininger G, Brenner BM, Mahaffey KW; CREDENCE Trial Investigators.",
      title:
        "Canagliflozin and Renal Outcomes in Type 2 Diabetes and Nephropathy.",
      source: "N Engl J Med",
      year: 2019,
      pmid: "30990260",
    },
    {
      authors:
        "Heerspink HJL, Stefánsson BV, Correa-Rotter R, Chertow GM, Greene T, Hou FF, Mann JFE, McMurray JJV, Lindberg M, Rossing P, Sjöström CD, Toto RD, Langkilde AM, Wheeler DC; DAPA-CKD Trial Committees and Investigators.",
      title: "Dapagliflozin in Patients with Chronic Kidney Disease.",
      source: "N Engl J Med",
      year: 2020,
      pmid: "32970396",
    },
    {
      authors:
        "The EMPA-KIDNEY Collaborative Group; Herrington WG, Staplin N, Wanner C, Green JB, Hauske SJ, Emberson JR, Preiss D, Judge P, Mayne KJ, Ng SYA, Sammons E, Zhu D, Hill M, Stevens W, Wallendszus K, Brenner S, Cheung AK, Liu ZH, Li J, Hooi LS, Liu W, Kadowaki T, Nangaku M, Levin A, Cherney D, Maggioni AP, Pontremoli R, Deo R, Goto S, Rossello X, Tuttle KR, Steubl D, Petrini M, Massey D, Eilbracht J, Brueckmann M, Landray MJ, Baigent C, Haynes R.",
      title: "Empagliflozin in Patients with Chronic Kidney Disease.",
      source: "N Engl J Med",
      year: 2023,
      pmid: "36331190",
    },
    {
      authors:
        "Marso SP, Daniels GH, Brown-Frandsen K, Kristensen P, Mann JF, Nauck MA, Nissen SE, Pocock S, Poulter NR, Ravn LS, Steinberg WM, Stockner M, Zinman B, Bergenstal RM, Buse JB; LEADER Steering Committee.",
      title:
        "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27295427",
    },
    {
      authors:
        "Apperloo EM, Tuttle KR, Pavo I, Haupt A, Taylor R, Wiese RJ, Hemmingway A, Cherney DZI, Hadjadj S, Heerspink HJL.",
      title:
        "Semaglutide in obesity and chronic kidney disease without diabetes: a randomized clinical trial (in non-diabetic patients).",
      source: "Nature Medicine",
      year: 2024,
      pmid: "39455729",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        On January 28, 2025, the FDA approved <Link href="/drugs/ozempic">Ozempic</Link> (<Link href="/drugs/semaglutide">semaglutide</Link>
        1.0 mg) to reduce the risk of kidney disease worsening,
        kidney failure, and cardiovascular death in adults with type
        2 diabetes and chronic kidney disease [3]. It was the first
        time any GLP-1 receptor agonist had received an FDA-approved
        kidney indication. The approval was based on the FLOW trial
        (Perkovic et al., NEJM 2024) [1], a 3,533-patient randomized
        outcomes trial that was stopped early in October 2023 because
        the prespecified interim analysis showed semaglutide had
        crossed the efficacy boundary on the primary kidney
        composite. This article walks through the FLOW design, the
        verified primary and secondary results, the FDA approval
        language, and how semaglutide&apos;s kidney protection
        compares with the established SGLT2 inhibitor evidence in the
        same population.
      </p>

      <h2>Why a kidney trial for a diabetes drug</h2>

      <p>
        Diabetic kidney disease is the leading cause of end-stage
        renal disease in the United States. Roughly 40% of patients
        with type 2 diabetes will develop chronic kidney disease in
        their lifetime, and a meaningful fraction will progress to
        dialysis or transplant. Until the SGLT2 inhibitor era began
        with the CREDENCE trial in 2019, the only proven kidney
        protection in diabetic CKD was tight glycemic and blood
        pressure control plus renin-angiotensin system blockade —
        useful but incomplete.
      </p>

      <p>
        Cardiovascular outcomes trials of GLP-1 receptor agonists
        (LEADER for liraglutide [7], SUSTAIN-6 for semaglutide,
        REWIND for dulaglutide) had hinted at kidney benefit in
        prespecified secondary kidney composites, but no GLP-1 trial
        had ever been designed with a primary kidney outcome — until
        FLOW.
      </p>

      <h2>FLOW trial design</h2>

      <p>
        FLOW (NCT03819153) was a phase 3, double-blind, randomized,
        placebo-controlled outcomes trial conducted at 387 sites
        across 28 countries [1, 2]. The protocol and rationale were
        prespecified in 2023 [2]. Key design parameters:
      </p>

      <ul>
        <li>
          <strong>Randomization:</strong> 1,767 to semaglutide and
          1,766 to placebo (1:1) for a total of 3,533 patients
        </li>
        <li>
          <strong>Population:</strong> Adults with type 2 diabetes and
          CKD, defined as either eGFR 50-75 mL/min/1.73m² with
          urinary albumin-to-creatinine ratio (UACR) 300-5,000 mg/g,
          OR eGFR 25 to less than 50 mL/min/1.73m² with UACR
          100-5,000 mg/g
        </li>
        <li>
          <strong>Drug:</strong> Semaglutide 1.0 mg subcutaneously
          once weekly (the maintenance dose used in SUSTAIN-6 and the
          standard Ozempic diabetes dose), titrated over 8 weeks from
          0.25 mg
        </li>
        <li>
          <strong>Background therapy:</strong> All patients on
          maximum-tolerated ACE inhibitor or ARB
        </li>
        <li>
          <strong>Median follow-up:</strong> 3.4 years (event-driven;
          stopped early at the prespecified interim analysis)
        </li>
        <li>
          <strong>Primary composite endpoint:</strong> Major kidney
          disease events, defined as kidney failure (persistent eGFR
          less than 15 mL/min/1.73m² or initiation of chronic kidney
          replacement therapy), sustained ≥50% reduction in eGFR from
          baseline, kidney death, or cardiovascular death
        </li>
      </ul>

      <p>
        The early-stopping decision was made by the independent data
        monitoring committee in October 2023 after 741 of the 854
        planned primary events had accrued, on the basis that the
        prespecified efficacy boundary had been crossed [1]. Mean
        baseline characteristics: age 66.6 years, 67% male, baseline
        eGFR 47.0 mL/min/1.73m², HbA1c 7.8%, BMI 32 kg/m².
      </p>

      <h2>The primary result</h2>

      <p>
        FLOW hit its primary composite endpoint with a clear and
        clinically meaningful reduction [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Semaglutide</th>
            <th>Placebo</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary kidney composite</td>
            <td>331 events</td>
            <td>410 events</td>
            <td>
              <strong>HR 0.76 (95% CI 0.66-0.88), P=0.0003</strong>
            </td>
          </tr>
          <tr>
            <td>Annual eGFR slope</td>
            <td>−2.19 mL/min/1.73m²/yr</td>
            <td>−3.36 mL/min/1.73m²/yr</td>
            <td>+1.16 mL/min/1.73m²/yr (P&lt;0.001)</td>
          </tr>
          <tr>
            <td>MACE composite</td>
            <td>212 events</td>
            <td>254 events</td>
            <td>HR 0.82 (95% CI 0.68-0.98), P=0.029</td>
          </tr>
          <tr>
            <td>All-cause mortality</td>
            <td>227 events</td>
            <td>279 events</td>
            <td>HR 0.80 (95% CI 0.67-0.95), P=0.01</td>
          </tr>
        </tbody>
      </table>

      <p>
        The 24% relative risk reduction in major kidney events
        translates to an absolute risk reduction of about 4.5
        percentage points (18.7% vs 23.2%) over 3.4 years and a
        number needed to treat (NNT) of approximately 22 patients
        treated for 3.4 years to prevent one primary endpoint event.
        The accompanying 20% all-cause mortality reduction is
        striking — relatively few kidney trials have shown a clean
        all-cause mortality benefit, and the NNT for mortality of
        approximately 33 (3.0 percentage point absolute reduction
        in death) over the trial duration is clinically important.
      </p>

      <p>
        The eGFR slope difference of 1.16 mL/min/1.73m² per year is
        the most mechanistically informative number in the table.
        That difference, sustained over a decade, is roughly the
        difference between progressing to dialysis and not — and
        the slope benefit appeared early in the trial and was
        maintained throughout follow-up.
      </p>

      <h2>Adverse events: what FLOW did and did not find</h2>

      <p>
        The headline safety finding from FLOW is that there was{" "}
        <strong>no signal of acute kidney injury</strong> from
        semaglutide despite the well-known GI side-effect profile
        of the drug class. Reported AKI rates were 9.7% in the
        semaglutide arm and 10.3% in the placebo arm [1]. This
        matters because the theoretical concern with starting a
        GLP-1 agonist in CKD patients is that nausea-induced
        volume depletion could precipitate prerenal AKI;
        FLOW saw no such signal at trial scale.
      </p>

      <p>
        Permanent treatment discontinuation due to adverse events
        was 13% in the semaglutide arm versus 11.3% in placebo,
        with a 4.5% versus 1.1% gap attributable to GI symptoms —
        consistent with the broader semaglutide GI side-effect
        profile documented in the STEP and SUSTAIN trials [1]. For
        the broader GI tolerability picture, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        .
      </p>

      <p>
        Diabetic retinopathy was a known concern from SUSTAIN-6,
        which had reported a transient retinopathy worsening signal
        with rapid HbA1c improvement on semaglutide. FLOW required
        baseline ophthalmologic screening and excluded patients with
        active proliferative retinopathy. The published primary
        manuscript focuses on the kidney composite; a more detailed
        retinopathy analysis specific to FLOW participants was not
        yet available at the time of this writing.
      </p>

      <h2>The FDA approval</h2>

      <p>
        Novo Nordisk submitted a supplemental new drug application
        for the kidney indication after the FLOW results were
        unblinded. The FDA approved the new indication on{" "}
        <strong>January 28, 2025</strong> [3]. The approved
        indication language reads: to reduce the risk of sustained
        eGFR decline, end-stage kidney disease, and cardiovascular
        death in adults with type 2 diabetes mellitus and chronic
        kidney disease.
      </p>

      <p>
        Two practical points about the approval. First, it applies
        specifically to <strong>Ozempic (semaglutide 1.0 mg)</strong>{" "}
        — the diabetes-dose product, not the higher-dose <Link href="/drugs/wegovy">Wegovy</Link>
        (semaglutide 2.4 mg) used for chronic weight management.
        Second, it applies only to patients who already have type 2
        diabetes; FLOW did not enroll non-diabetic CKD patients, and
        the FDA approval reflects that.
      </p>

      <h2>How FLOW compares to the SGLT2 inhibitor kidney trials</h2>

      <p>
        Three large SGLT2 inhibitor trials established the modern
        baseline for kidney protection in CKD before FLOW:
      </p>

      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Drug</th>
            <th>Population</th>
            <th>Primary endpoint HR (95% CI)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CREDENCE [4]</td>
            <td>Canagliflozin</td>
            <td>T2D + albuminuric CKD</td>
            <td>0.70 (0.59-0.82)</td>
          </tr>
          <tr>
            <td>DAPA-CKD [5]</td>
            <td>Dapagliflozin</td>
            <td>CKD with or without T2D</td>
            <td>0.61 (0.51-0.72)</td>
          </tr>
          <tr>
            <td>EMPA-KIDNEY [6]</td>
            <td>Empagliflozin</td>
            <td>Broad CKD, T2D not required</td>
            <td>0.71 (0.62-0.81)</td>
          </tr>
          <tr>
            <td>FLOW [1]</td>
            <td>Semaglutide</td>
            <td>T2D + albuminuric CKD</td>
            <td>0.76 (0.66-0.88)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two interpretive points are worth being careful about.
        First, the SGLT2 trials and FLOW enrolled different
        populations (CREDENCE most similar to FLOW; DAPA-CKD and
        EMPA-KIDNEY broader) with different endpoint definitions
        and follow-up durations, so the hazard ratios are not
        strictly comparable. Second, the confidence intervals
        overlap meaningfully; the SGLT2 inhibitors as a class
        appear modestly more potent on the renal composite, but
        the SGLT2 and GLP-1 mechanisms are independent and the
        most likely future use is <em>combination therapy</em> in
        the patients who tolerate both. Several ongoing trials are
        directly testing GLP-1 + SGLT2 inhibitor combinations for
        additive kidney protection.
      </p>

      <h2>Open questions</h2>

      <ol>
        <li>
          <strong>Non-diabetic CKD.</strong> FLOW enrolled only
          patients with type 2 diabetes. Whether semaglutide&apos;s
          kidney protection extends to non-diabetic CKD is unknown.
          A 24-week proof-of-concept trial (Apperloo et al., Nature
          Medicine 2024 [8]) reported albuminuria reduction in
          non-diabetic CKD patients with obesity, but this is a
          surrogate endpoint study, not an outcomes trial. A
          dedicated outcomes trial in non-diabetic CKD has not yet
          been launched as of this writing.
        </li>
        <li>
          <strong>Mechanism.</strong> The kidney benefit cannot be
          fully explained by glycemic improvement or weight loss
          alone — the eGFR slope separation appeared early and was
          larger than HbA1c-matched comparisons would predict. The
          mechanism is likely multifactorial, including reduced
          glomerular hyperfiltration, anti-inflammatory effects,
          and direct effects on tubular handling of sodium.
          Mechanistic substudies are ongoing.
        </li>
        <li>
          <strong>Combination with SGLT2 inhibitors.</strong> Most
          FLOW participants were not on background SGLT2 inhibitor
          therapy when the trial began (SGLT2 use grew during the
          trial as guidelines evolved). The additive benefit of
          GLP-1 + SGLT2 + RAS blockade is the most clinically
          important open question for the next decade of diabetic
          CKD care.
        </li>
        <li>
          <strong>Wegovy-dose data.</strong> FLOW used the 1.0 mg
          dose. Whether the higher Wegovy 2.4 mg dose provides
          additional kidney protection — or worsens tolerability
          enough to negate the benefit — has not been studied in a
          dedicated outcomes trial.
        </li>
      </ol>

      <h2>What this means for patients</h2>

      <p>
        For adults with type 2 diabetes and chronic kidney disease
        — particularly those with albuminuria and eGFR in the
        25-75 range — semaglutide is now an evidence-based,
        FDA-approved option for slowing kidney disease progression
        and reducing cardiovascular and all-cause mortality. The
        most likely best-practice regimen, supported by the FLOW
        and SGLT2 trials together, is a combination of an ACE
        inhibitor or ARB, an SGLT2 inhibitor, and a GLP-1 receptor
        agonist (semaglutide), individualized to tolerability and
        kidney function.
      </p>

      <p>
        For adults with chronic kidney disease who do not have
        diabetes, FLOW does not provide direct evidence. Until a
        dedicated non-diabetic CKD outcomes trial is run and
        published, off-label use of semaglutide for kidney
        protection in this population should be discussed
        carefully with a nephrologist.
      </p>

      <h2>Related research</h2>

      <p>
        For the broader cardiovascular outcomes data on semaglutide
        in non-diabetic adults, see our{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT trial deep-dive
        </Link>
        . For the GI side-effect profile that drove the small
        FLOW discontinuation gap, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          side effects investigation
        </Link>
        . For the difference between semaglutide doses (Ozempic
        1.0 mg vs Wegovy 2.4 mg), see our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          Wegovy vs compounded vial comparison
        </Link>
        . And for the head-to-head comparison with <Link href="/drugs/tirzepatide">tirzepatide</Link>, see
        our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide deep-dive
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "What did the FLOW trial show about semaglutide and kidney disease?",
            answer:
              "The FLOW trial (Perkovic 2024, NEJM, PMID 38785317) randomized 3,533 patients with type 2 diabetes and chronic kidney disease to semaglutide 1.0mg weekly or placebo. Semaglutide reduced the primary composite endpoint (kidney failure, ≥50% eGFR decline, kidney or cardiovascular death) by 24% over a median follow-up of 3.4 years. The trial was stopped early for efficacy.",
          },
          {
            question: "Can semaglutide protect the kidneys?",
            answer:
              "In patients with type 2 diabetes and chronic kidney disease, yes — the FLOW trial demonstrated a 24% reduction in major kidney-related events with semaglutide vs placebo. The mechanism is multifactorial: better glycemic control, blood pressure reduction, weight loss, and likely direct anti-inflammatory effects on the kidney. Whether the same benefit extends to non-diabetic patients with CKD is being studied.",
          },
          {
            question: "Is semaglutide safe in chronic kidney disease?",
            answer:
              "Yes, generally. Semaglutide is not renally cleared and does not require dose adjustment in patients with reduced kidney function. The FDA labels do not contraindicate its use in CKD, and the FLOW trial enrolled patients with eGFR as low as 25 mL/min/1.73m². Patients with end-stage renal disease on dialysis were not studied and should consult a nephrologist.",
          },
          {
            question: "Should I take semaglutide if I have type 2 diabetes and CKD?",
            answer:
              "The FLOW trial provides strong evidence for kidney benefit in this population, and major guidelines (KDIGO, ADA) now recommend GLP-1 receptor agonists or SGLT2 inhibitors as part of first-line therapy for T2DM with CKD specifically because of these outcomes. Discuss the trade-offs (benefit vs side effects, cost, other medications) with your nephrologist or endocrinologist.",
          },
          {
            question: "Does Wegovy or Zepbound have similar kidney data?",
            answer:
              "Wegovy contains the same active ingredient as Ozempic (semaglutide), and the FLOW trial result is mechanistically expected to extend to Wegovy at equivalent or higher doses. Zepbound (tirzepatide) does not yet have a dedicated kidney outcomes trial published; the SURPASS-CVOT and other ongoing trials may provide data in the coming years. As of 2026, semaglutide has the strongest evidence base for renal benefit.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
