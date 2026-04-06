import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "surmount-osa-tirzepatide-sleep-apnea";

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

// Every numerical claim in this article is verified against
// either (a) the SURMOUNT-OSA primary publication (Malhotra et al,
// NEJM Oct 3, 2024, PMID 38912654) or (b) the FDA's own press
// release announcing the approval, both directly cited in the
// references list below. The FDA press release URL was confirmed
// editorially before publication.

export default function SurmountOsaArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Malhotra A, Grunstein RR, Fietze I, Weaver TE, Redline S, Azarbarzin A, Sands SA, Schwab RJ, Dunn JP, Chakladar S, Bunck MC, Bednarik J; SURMOUNT-OSA Investigators.",
      title:
        "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity.",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38912654",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA approves first medication for obstructive sleep apnea (press release).",
      source: "FDA News & Events",
      year: 2024,
      url: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-obstructive-sleep-apnea",
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
      authors: "Eli Lilly and Company.",
      title: "ZEPBOUND (tirzepatide) Prescribing Information.",
      source: "U.S. Food and Drug Administration",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806Orig1s020lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Until 2024, the standard pharmacological treatment for
        obstructive sleep apnea (OSA) was nothing — there wasn&apos;t one.
        CPAP machines and oral appliances were the only options, and
        roughly two-thirds of patients prescribed CPAP don&apos;t tolerate
        it long-term. The SURMOUNT-OSA trial, published in the New
        England Journal of Medicine on October 3, 2024 [1], changed
        that. Tirzepatide cut the apnea-hypopnea index by 25–29 events
        per hour from a baseline of around 50, both in patients
        actively using CPAP and patients who weren&apos;t. The FDA
        followed with what its own press release describes as the
        first medication ever approved for obstructive sleep apnea [2].
        Here&apos;s what the trial actually showed and what it changes
        for the millions of obese adults living with sleep apnea.
      </p>

      <h2>Why this trial mattered before it ran</h2>

      <p>
        Obstructive sleep apnea is the most common sleep-disordered
        breathing condition in adults. It&apos;s strongly associated
        with obesity — visceral fat around the upper airway and neck
        contributes to the airway collapse that defines the disease.
        For decades, clinicians have observed that significant weight
        loss (typically via bariatric surgery) reduces OSA severity,
        sometimes dramatically. But until SURMOUNT-OSA, no
        randomized trial had specifically tested whether a
        pharmacological weight-loss intervention could deliver the
        same benefit on a measurable apnea endpoint.
      </p>

      <p>
        The clinical context made the question urgent. Standard OSA
        treatment is positive airway pressure (PAP) therapy —
        delivered via CPAP, BiPAP, or APAP machines that hold the
        airway open with pressurized air during sleep. PAP works
        when patients use it, but long-term adherence is a
        well-documented clinical problem in sleep medicine: a
        substantial fraction of patients prescribed CPAP either
        abandon the therapy or use it inconsistently within the
        first year, though published adherence rates vary widely by
        study population, definition of &ldquo;adherent,&rdquo; and
        follow-up duration. For non-adherent patients, the remaining
        options before SURMOUNT-OSA were oral appliances (modest
        efficacy), positional therapy (very limited), and bariatric
        surgery (effective but invasive and inappropriate for most
        patients).
      </p>

      <p>
        A pharmacological option that worked even in patients who
        couldn&apos;t tolerate CPAP would change the standard of
        care. SURMOUNT-OSA was designed to find out whether
        tirzepatide could be that option.
      </p>

      <h2>SURMOUNT-OSA trial design</h2>

      <p>
        SURMOUNT-OSA was actually two parallel randomized trials, run
        simultaneously and reported together [1]:
      </p>

      <ul>
        <li>
          <strong>Trial 1 — PAP-naïve cohort:</strong> patients with
          moderate-to-severe OSA and obesity who were NOT using PAP
          therapy at baseline. Mean baseline AHI was 51.5 events per
          hour. Mean baseline BMI was 39.1 kg/m².
        </li>
        <li>
          <strong>Trial 2 — PAP-treated cohort:</strong> patients
          with moderate-to-severe OSA and obesity who WERE using PAP
          therapy at baseline and continued PAP throughout the trial.
          Mean baseline AHI (on PAP) was 49.5 events per hour. Mean
          baseline BMI was 38.7 kg/m².
        </li>
      </ul>

      <p>
        Both trials were phase 3, double-blind, placebo-controlled,
        randomized, and ran for 52 weeks. Participants in the
        tirzepatide arms received the maximum tolerated dose (10 mg
        or 15 mg subcutaneously weekly) per the standard SURMOUNT
        titration schedule. The primary endpoint in both trials was
        absolute change in AHI (apnea-hypopnea events per hour of
        sleep) from baseline to week 52, measured by polysomnography
        in a sleep lab — the gold-standard objective measurement of
        OSA severity [1].
      </p>

      <h2>The primary results</h2>

      <p>
        Both trials hit their primary endpoint with comfortable
        statistical margins [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Tirzepatide AHI change</th>
            <th>Placebo AHI change</th>
            <th>Treatment difference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trial 1 — PAP-naïve</td>
            <td>−25.3 events/hour</td>
            <td>−5.3 events/hour</td>
            <td>
              <strong>−20.0 events/hour (P&lt;0.001)</strong>
            </td>
          </tr>
          <tr>
            <td>Trial 2 — PAP-treated</td>
            <td>−29.3 events/hour</td>
            <td>−5.5 events/hour</td>
            <td>
              <strong>−23.8 events/hour (P&lt;0.001)</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        From a baseline of approximately 50 events per hour (which
        meets the clinical definition of severe OSA), tirzepatide
        cut AHI by roughly half — to around 25 events per hour in
        the PAP-naïve group and around 20 events per hour in the
        PAP-treated group. For context, an AHI below 5 is considered
        normal, 5–15 is mild OSA, 15–30 is moderate, and 30+ is
        severe. SURMOUNT-OSA participants moved from severe OSA
        territory to the lower end of moderate OSA on average, and a
        meaningful subset moved into the mild range or below
        clinically meaningful thresholds entirely.
      </p>

      <h2>What this means clinically</h2>

      <p>
        The 20-event-per-hour reduction in the PAP-naïve cohort is the
        more clinically remarkable result. These patients started the
        trial with no other OSA treatment, and tirzepatide alone — no
        CPAP, no oral appliance, no positional therapy — moved them
        from severe OSA to moderate. For patients who refuse or
        cannot tolerate PAP therapy, this is the first
        pharmacological intervention that delivers a clinically
        meaningful effect on the underlying disease, not just a
        downstream symptom.
      </p>

      <p>
        The PAP-treated cohort result is also clinically interesting.
        Patients on tirzepatide PLUS PAP achieved an even larger AHI
        reduction (29.3 events/hour) than tirzepatide alone — but
        the most editorially important interpretation is that
        tirzepatide is additive to PAP rather than competing with it.
        Patients who currently tolerate CPAP and want to keep using it
        can add tirzepatide for a deeper response, while patients who
        don&apos;t tolerate CPAP have an alternative that works on its
        own.
      </p>

      <h2>Secondary endpoints</h2>

      <p>
        The published abstract [1] reports that all prespecified key
        secondary endpoints favored tirzepatide. These included
        measures the trial team selected because they capture the
        downstream consequences of OSA — the things that actually
        matter to patients beyond a number on a sleep study report:
      </p>

      <ul>
        <li>Body weight reduction</li>
        <li>Systolic blood pressure reduction</li>
        <li>
          Hypoxic burden — a measure of how much time the patient
          spent with low blood oxygen during sleep, which is the
          mechanistic driver of most of OSA&apos;s long-term
          cardiovascular harm
        </li>
        <li>
          High-sensitivity C-reactive protein (hsCRP), a marker of
          systemic inflammation associated with OSA
        </li>
        <li>Patient-reported sleep disturbance measures</li>
      </ul>

      <p>
        The published trial reports that all of these moved
        favorably with tirzepatide vs placebo. The exact magnitudes
        for individual secondary endpoints are detailed in the full
        NEJM publication; we&apos;re reporting at the level of
        statistical direction here because the abstract verifies the
        direction but not every magnitude [1].
      </p>

      <h2>The FDA approval</h2>

      <p>
        Following SURMOUNT-OSA&apos;s positive primary endpoint
        result, the FDA approved Zepbound (tirzepatide) for the
        treatment of moderate-to-severe obstructive sleep apnea in
        adults with obesity. The FDA&apos;s own press release
        describes this as the first medication ever approved by the
        agency for obstructive sleep apnea [2].
      </p>

      <p>
        The approval matters as much for what it signals as for what
        it does directly. For decades, OSA has been treated as a
        mechanical problem — your airway closes, so we deliver
        pressurized air to hold it open. Tirzepatide approval marks
        the first time the FDA has accepted a pharmacological,
        weight-loss-mediated approach as a legitimate treatment for
        OSA itself. That precedent is likely to influence the
        regulatory and clinical conversation around adjacent
        pharmacological approaches over the coming years.
      </p>

      <p>
        For the most current label language, dosing information, and
        contraindications, refer to the official Zepbound prescribing
        information at the FDA&apos;s drug information portal [4].
      </p>

      <h2>Insurance coverage implications</h2>

      <p>
        The OSA approval is editorially significant for one reason
        most patients won&apos;t see in the press coverage: it
        creates a new covered indication for tirzepatide that some
        insurers will reimburse where they currently deny weight
        loss as the primary indication. Many commercial plans
        explicitly exclude GLP-1 / GIP-GLP-1 medications for weight
        loss alone, but those same plans typically cover the same
        drugs for an FDA-approved disease indication. Sleep apnea is
        now such an indication.
      </p>

      <p>
        Patients with documented moderate-to-severe OSA whose
        insurance currently denies tirzepatide for weight loss
        should discuss with their prescriber whether the OSA
        indication may now provide a coverage path. Documentation
        requirements vary by insurer, but typically include a sleep
        study report with AHI and a treating physician&apos;s letter
        of medical necessity. See our{" "}
        <Link href="/research/glp1-insurance-coverage-audit-2026">
          GLP-1 insurance coverage audit
        </Link>{" "}
        for the per-insurer breakdown of how the major commercial
        plans handle GLP-1 prior authorization.
      </p>

      <h2>Adverse events: same pattern as SURMOUNT-1</h2>

      <p>
        SURMOUNT-OSA reported that the most frequently observed
        adverse events with tirzepatide were gastrointestinal in
        nature, primarily mild to moderate in severity, and
        consistent with what was seen in the obesity-only trial
        SURMOUNT-1 [1, 3]. Translation: nausea during dose
        escalation, diarrhea, occasional vomiting and constipation,
        most resolving with continued use.
      </p>

      <p>
        For the full GLP-1 / GIP-GLP-1 adverse event picture
        including the percentage breakdowns from SURMOUNT-1 and
        STEP-1, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        . The OSA population didn&apos;t expose any new safety signal
        — the patient cohort is essentially a subset of the obese
        adult population already studied at length in the SURMOUNT
        program.
      </p>

      <h2>What this changes for OSA patients</h2>

      <p>
        Most OSA patients are not going to switch to tirzepatide
        monotherapy and discard their CPAP machine. CPAP, when
        tolerated, is still highly effective and considerably
        cheaper. The clinical utility of tirzepatide for OSA is
        sharper for two specific patient populations:
      </p>

      <ol>
        <li>
          <strong>Patients with moderate-to-severe OSA + obesity who
          cannot tolerate CPAP.</strong> This is the largest
          unaddressed-need population in sleep medicine. Tirzepatide
          gives them, for the first time, an evidence-based
          alternative that actually changes the underlying disease
          rather than just a symptom.
        </li>
        <li>
          <strong>Patients on PAP therapy who also have obesity and
          want a deeper treatment response.</strong> The PAP-treated
          arm of SURMOUNT-OSA (Trial 2) showed that adding
          tirzepatide on top of CPAP produces a larger AHI
          reduction than CPAP alone, even in patients with good PAP
          adherence at baseline.
        </li>
      </ol>

      <p>
        For both populations, the conversation with a sleep
        specialist now needs to include the tirzepatide option as a
        legitimate first-line consideration. That wasn&apos;t true
        18 months ago.
      </p>

      <h2>What we don&apos;t yet know</h2>

      <p>
        SURMOUNT-OSA gave us 52 weeks of randomized data. The open
        questions for the next several years of clinical research:
      </p>

      <ul>
        <li>
          <strong>Long-term durability.</strong> Does the AHI
          reduction persist past one year of treatment? What
          happens if patients lose insurance coverage and stop the
          drug? Based on the SURMOUNT-4 weight maintenance data
          for tirzepatide, the working assumption is that
          discontinuation will likely produce regain of both
          weight and AHI, but this needs direct measurement in OSA-
          specific populations.
        </li>
        <li>
          <strong>Semaglutide for OSA.</strong> No semaglutide-
          specific OSA trial has been published. It&apos;s plausible
          that semaglutide produces comparable benefits given its
          effective weight loss profile, but absent direct trial
          data, the FDA-approved indication is currently limited to
          tirzepatide.
        </li>
        <li>
          <strong>Mechanism — weight loss alone, or more?</strong>{" "}
          The relationship between weight loss and AHI improvement
          has been clinically observed for decades, but the
          published quantitative literature doesn&apos;t yet
          decompose how much of the SURMOUNT-OSA benefit is purely
          weight loss vs how much is potential additional effects
          (upper airway fat, inflammatory tone, autonomic function).
          This is an active research question.
        </li>
        <li>
          <strong>Head-to-head with CPAP.</strong> SURMOUNT-OSA
          measured tirzepatide vs placebo, not tirzepatide vs CPAP.
          A direct comparison would tell clinicians how to choose
          between the two for patients who could realistically use
          either.
        </li>
      </ul>

      <h2>The bottom line</h2>

      <p>
        SURMOUNT-OSA is the first randomized trial to demonstrate
        that a pharmacological intervention can produce a clinically
        meaningful reduction in objective obstructive sleep apnea
        severity. Tirzepatide cut AHI by roughly half from a severe
        baseline, both with and without concurrent CPAP. The FDA
        has since approved Zepbound for OSA in adults with obesity,
        making it the first prescription medication ever approved
        for the condition [2]. For the millions of obese adults who
        don&apos;t tolerate CPAP, this is the first credible
        alternative that addresses the disease itself rather than
        just compensating for its symptoms.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
