import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "semaglutide-microdosing-evidence-guide";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Editorial YMYL framing note: this article deliberately does NOT
// provide dose recommendations. It summarizes what the published
// trial data shows about the STEP-1 0.25 mg arm (which is the
// closest published data to a "microdose") and explains why any
// dose below the FDA-approved maintenance is off-label. No amount
// of editorial framing makes off-label dosing advice appropriate
// from a publisher; the article exists to answer the patient's
// question honestly and then redirect to the prescriber.

export default function MicrodoseArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
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
      authors:
        "Kushner RF, Calanna S, Davies M, Dicker D, Garvey WT, Goldman B, Lingvay I, Thomsen M, Wadden TA, Wharton S, Wilding JPH, Rubino D.",
      title:
        "Semaglutide 2.4 mg for the Treatment of Obesity: Key Elements of the STEP Trials 1 to 5.",
      source: "Obesity (Silver Spring)",
      year: 2020,
      pmid: "32978870",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Off-Label Use of Approved Drugs and the Role of the Prescriber — FDA Basics for Patients.",
      source: "FDA Drug Information",
      year: 2023,
      url: "https://www.fda.gov/patients/learn-about-expanded-access-and-other-treatment-options/understanding-unapproved-use-approved-drugs-label",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        &ldquo;Microdosing semaglutide&rdquo; has become a common
        patient search term (~1,200/mo for the semaglutide query
        specifically, plus related terms). The term itself is not
        formally defined in the clinical literature — it generally
        refers to using semaglutide or tirzepatide at a dose{" "}
        <em>below the FDA-approved maintenance</em> (2.4 mg for
        Wegovy, 15 mg for Zepbound) with the goal of getting some
        of the appetite-suppression and weight-loss effect at a
        lower-cost, lower-side-effect profile. This article answers
        what the published trial data actually shows about
        sub-therapeutic doses, explains the off-label framework, and
        documents why the honest answer to &ldquo;does microdosing
        work?&rdquo; is &ldquo;less than the full dose, and less
        than most patients expect.&rdquo; <strong>This is an
        educational explainer, not a dosing recommendation. Any
        off-label dosing decision belongs with your prescriber.</strong>
      </p>

      <h2>What the trial data shows about low-dose semaglutide</h2>

      <p>
        The STEP-1 trial [1, 3] is the closest thing the published
        literature has to data on chronic sub-therapeutic
        semaglutide dosing. STEP-1 used the standard titration ramp
        (0.25 mg → 0.5 mg → 1.0 mg → 1.7 mg → 2.4 mg) with 4 weeks
        at each step. The 0.25 mg starting dose is effectively a
        microdose — and STEP-1 reports mean weight loss at the end
        of the 4-week 0.25 mg period: approximately{" "}
        <strong>1-1.5% of body weight</strong> [1]. Not
        transformative but not zero.
      </p>

      <p>
        By the end of the 4-week 0.5 mg period (week 8 of the
        trial), the mean weight loss was approximately 3%. By the
        end of the 1.0 mg period (week 12), approximately 6%. By
        the time patients reached the full 2.4 mg maintenance
        dose and stayed there for 48+ weeks, the final endpoint
        was −14.9% [1]. So the dose-response curve is steep and
        goes approximately like this:
      </p>

      <table>
        <thead>
          <tr>
            <th>Dose level (semaglutide)</th>
            <th>Approximate mean weight loss</th>
            <th>Time at dose in STEP-1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0.25 mg (&ldquo;microdose&rdquo;)</td>
            <td>~1-1.5%</td>
            <td>4 weeks</td>
          </tr>
          <tr>
            <td>0.5 mg</td>
            <td>~3%</td>
            <td>4 weeks</td>
          </tr>
          <tr>
            <td>1.0 mg</td>
            <td>~6%</td>
            <td>4 weeks</td>
          </tr>
          <tr>
            <td>1.7 mg</td>
            <td>~9%</td>
            <td>4 weeks</td>
          </tr>
          <tr>
            <td>2.4 mg (FDA maintenance)</td>
            <td>~14.9% at 68 wks</td>
            <td>48+ weeks</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two important caveats about reading these numbers as
        support for microdosing:
      </p>

      <ol>
        <li>
          The early weight loss at lower doses is partly a function
          of the <em>novelty effect</em> — any patient who starts a
          reduced-calorie intervention loses weight in the first 4
          weeks, and that effect fades as the body adapts. The
          STEP-1 placebo arm lost about 0.5% in the first 4 weeks
          [1], so the true drug-attributable loss at 0.25 mg is
          closer to 1% than 1.5%.
        </li>
        <li>
          <strong>STEP-1 does not include a maintenance arm at
          0.25 mg, 0.5 mg, 1.0 mg, or 1.7 mg.</strong> No one in
          the trial stayed at those doses for 6 months or a year.
          Whether low-dose semaglutide produces meaningful
          sustained weight loss at a steady sub-therapeutic dose
          over many months is{" "}
          <em>not established by published trial data</em>. The
          closest approximation is the data from the SUSTAIN
          diabetes trials, which used lower maintenance doses
          (0.5 mg and 1.0 mg) for diabetes management — and those
          trials reported modest weight-loss effects as secondary
          endpoints (3-5 kg over 52 weeks at 1.0 mg) but they
          were in a diabetic population with different metabolic
          profiles.
        </li>
      </ol>

      <h2>Why patients try microdosing</h2>

      <p>
        Four motivations account for most of the patient interest:
      </p>

      <ol>
        <li>
          <strong>Cost.</strong> A lower dose means fewer units per
          week, which means a vial lasts longer, which reduces
          monthly cost. This is the single biggest driver of the
          practice in compounded-telehealth patients.
        </li>
        <li>
          <strong>Side effect tolerance.</strong> Patients who had
          severe nausea or GI intolerance on the full titration
          ramp sometimes try staying at a lower dose step
          indefinitely as a tolerable compromise.
        </li>
        <li>
          <strong>Maintenance after weight loss.</strong> Patients
          who reached their goal weight and want to prevent regain
          sometimes try stepping the dose down rather than
          stopping entirely. There is no FDA-approved maintenance
          protocol for this use case.
        </li>
        <li>
          <strong>Perceived &ldquo;less drug = safer&rdquo;
          thinking.</strong> Patients who are uncomfortable with
          the full dose because of concerns about long-term side
          effects sometimes use microdosing as a harm-reduction
          framing. This is a reasonable intuition but the evidence
          base is thin.
        </li>
      </ol>

      <h2>The off-label framework — what &ldquo;off-label&rdquo; actually means</h2>

      <p>
        Any dose below the FDA-approved maintenance is off-label
        for chronic weight management [4, 5]. Off-label use is{" "}
        <em>legal</em> — the FDA does not regulate how licensed
        prescribers write prescriptions, and off-label prescribing
        is a normal and sometimes appropriate part of medical
        practice. But off-label use also means [5]:
      </p>

      <ul>
        <li>
          The dose has not been evaluated by the FDA for the
          specific indication and dose combination.
        </li>
        <li>
          Efficacy data for that specific dose is not in the
          approved label and is typically limited to investigator-
          initiated studies or patient experience.
        </li>
        <li>
          Insurance coverage for the off-label dose may be
          refused, especially for the commercial weight-management
          indication where PAs are already strict.
        </li>
        <li>
          The prescriber takes full clinical responsibility for
          the decision. The patient takes full informed-consent
          responsibility.
        </li>
      </ul>

      <h2>The practical safety profile of low-dose use</h2>

      <p>
        The STEP-1 trial documented the adverse-event profile at
        each dose step during the titration ramp [1]. Low doses
        produce lower rates of GI side effects:
      </p>

      <ul>
        <li>
          Nausea on 0.25 mg: &lt;10% of patients
        </li>
        <li>
          Nausea on 2.4 mg at steady state: ~44% reported at some
          point across the full trial
        </li>
      </ul>

      <p>
        The patient-reported experience on chronic low-dose use is
        consistently better tolerated. The safety profile at the
        tested doses is well-characterized. The{" "}
        <em>unknown</em> in long-term low-dose use is whether the
        rare but serious adverse events (pancreatitis, thyroid
        concerns, gallbladder disease) that appear at full dose
        also appear at low dose — and the answer is that they
        probably do at a dose-proportional rate but there is no
        dedicated low-dose long-term safety trial.
      </p>

      <h2>What an honest conversation with your prescriber looks like</h2>

      <p>
        If you are considering microdosing, the questions to raise
        with your prescriber:
      </p>

      <ol>
        <li>
          <strong>What is the specific goal?</strong> Weight loss?
          Maintenance after loss? Side effect tolerance? Cost
          control? The answer shapes the right approach.
        </li>
        <li>
          <strong>Is this for active weight loss or maintenance?</strong>{" "}
          The STEP-4 trial [1] showed that continuing at the full
          2.4 mg dose maintains weight loss, while stopping
          produces rebound. Whether a reduced maintenance dose
          sits somewhere in between is unstudied.
        </li>
        <li>
          <strong>What dose, what interval, for how long?</strong>{" "}
          The specifics need to be documented in your medical
          record so that follow-up labs and side-effect monitoring
          can be designed around the actual regimen.
        </li>
        <li>
          <strong>How will we know if it&apos;s working?</strong>{" "}
          Define the success criteria and the decision points in
          advance. If the answer is &ldquo;we&apos;ll see how it
          goes,&rdquo; that&apos;s a clinical plan gap worth
          filling.
        </li>
        <li>
          <strong>What&apos;s the exit plan?</strong> If the low
          dose doesn&apos;t deliver the desired outcome, what&apos;s
          the next step — go back to full dose, switch drugs, or
          something else?
        </li>
      </ol>

      <h2>Important disclaimer</h2>

      <p>
        This article is educational and summarizes what the published
        STEP-1 trial data shows about low semaglutide doses. It is
        not a dose recommendation and does not constitute medical
        advice. Any decision about dosing — including any decision
        to use a GLP-1 at a dose below the FDA-approved maintenance —
        belongs between you and your prescriber. Weight Loss Rankings
        does not endorse off-label dosing and cannot replace the
        clinical judgment of a licensed healthcare provider.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For the full STEP-1 maintenance-dose trial data, see our{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          post-discontinuation deep-dive
        </Link>
        . For the time-to-work curves at every dose step, see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          onset guide
        </Link>
        . For the dose math that lets you compute any target dose
        from a compounded vial, see our{" "}
        <Link href="/tools/glp1-unit-converter">
          unit converter
        </Link>
        . For the pharmacokinetic buildup at each dose level, see
        the{" "}
        <Link href="/tools/glp1-dose-plotter">
          dose plotter
        </Link>
        . For the broader side-effect profile across the dose-response
        curve, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          side effects investigation
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
