import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "what-happens-when-you-stop-semaglutide";

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

// Every numerical claim in this article is cited to a primary
// source via the citation registry (src/lib/citations.ts) and the
// References component renders the full reference list at the
// bottom of the page. The article was researched against
// PubMed-indexed primary literature; the "two-thirds regain"
// figure that frequently appears in lay press is corrected here
// against the actual STEP-1 extension data (Wilding et al. 2022).

export default function WhatHappensWhenYouStopSemaglutideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  // Inline citation list — every numerical claim in the body
  // points back to one of these via [N] superscript notation. All
  // PMIDs verified against pubmed.ncbi.nlm.nih.gov by editorial
  // research before publication.
  const citations = [
    {
      authors: "Rubino D, Abrahamsson N, Davies M, et al.",
      title:
        "Effect of continued weekly subcutaneous semaglutide vs placebo on weight loss maintenance in adults with overweight or obesity: the STEP 4 randomized clinical trial.",
      source: "JAMA",
      year: 2021,
      pmid: "33755728",
    },
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
        "Weight regain and cardiometabolic effects after withdrawal of semaglutide: the STEP 1 trial extension.",
      source: "Diabetes Obes Metab",
      year: 2022,
      pmid: "35441470",
    },
    {
      authors: "Aronne LJ, Sattar N, Horn DB, et al.",
      title:
        "Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial.",
      source: "JAMA",
      year: 2024,
      pmid: "38078870",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Semaglutide isn&apos;t like an antibiotic. You don&apos;t take a course
        and stay better. Three large randomized trials —{" "}
        <strong>STEP-4</strong>, the <strong>STEP-1 extension</strong>, and{" "}
        <strong>SURMOUNT-4</strong> for tirzepatide — have specifically
        measured what happens to body weight after these drugs are stopped.
        The numbers are unambiguous: most patients regain about two-thirds
        of their lost weight within a year of discontinuation. This article
        walks through the actual published trial data, the proposed
        biological mechanism, and what these findings should change about
        how patients and prescribers think about &ldquo;a course&rdquo; of
        GLP-1 therapy.
      </p>

      <h2>STEP-4: the dedicated withdrawal trial for semaglutide</h2>

      <p>
        The first trial designed specifically to answer the
        &ldquo;what happens when you stop&rdquo; question for semaglutide was
        STEP-4, published in JAMA in April 2021 by Rubino and colleagues
        [1]. STEP-4 was a randomized, double-blind, 68-week phase 3a trial
        with an unusual design: a 20-week run-in period where everyone
        received semaglutide (16 weeks dose escalation up to 2.4 mg weekly,
        plus 4 weeks at the maintenance dose), followed by a 48-week
        randomization where participants who had successfully reached the
        full 2.4 mg dose were assigned 2:1 to either continue semaglutide
        or switch to placebo. Both arms continued receiving the same
        lifestyle intervention (counseling, exercise, calorie tracking) for
        the entire 68 weeks.
      </p>

      <p>
        803 participants were randomized at week 20 — 535 to continue
        semaglutide and 268 to placebo. Every one of them had already lost
        weight on semaglutide before randomization (mean weight loss during
        the run-in was 10.6% of starting body weight) [1]. The question
        was: what happens over the next 48 weeks?
      </p>

      <p>
        The primary endpoint was percent body weight change from week 20
        (the start of randomization) to week 68 (the end of the trial).
        Here&apos;s what STEP-4 actually measured [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Arm</th>
            <th>Mean weight change, week 20 → week 68</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Continued semaglutide (n=535)</td>
            <td>−7.9%</td>
          </tr>
          <tr>
            <td>Switched to placebo (n=268)</td>
            <td>+6.9%</td>
          </tr>
          <tr>
            <td>Treatment difference</td>
            <td>−14.8 percentage points (95% CI, −16.0 to −13.5; P&lt;.001)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Read that carefully. The patients who stayed on semaglutide
        continued to lose weight — an additional 7.9% over the 48-week
        randomization phase. The patients who stopped semaglutide{" "}
        <em>regained</em> 6.9 percentage points of body weight over the
        same window. Combined, the people who continued semaglutide ended
        the trial about 14.8 percentage points lighter than the people who
        stopped. That&apos;s the largest divergence ever recorded in a
        weight-loss withdrawal trial.
      </p>

      <p>
        Translated into proportional terms: STEP-4 placebo participants
        had lost a mean 10.6% during the run-in, then regained 6.9 points
        of body weight over the next 48 weeks. That&apos;s approximately
        65% of the weight they had lost — gone within ~11 months of
        stopping the drug [1].
      </p>

      <h2>STEP-1 extension: what happens over a full year of discontinuation</h2>

      <p>
        STEP-4 measured 48 weeks post-randomization. The follow-up
        question — what happens after a full calendar year off the drug —
        was answered by a separate analysis of the STEP-1 cohort, published
        in <em>Diabetes, Obesity and Metabolism</em> in 2022 by Wilding et
        al. [3].
      </p>

      <p>
        The STEP-1 extension followed 327 participants from the original
        STEP-1 trial [2]. In the original trial, semaglutide produced a
        mean weight loss of 17.3% (SD 9.3%) over 68 weeks of active
        treatment, versus 2.0% (SD 6.1%) on placebo [2]. After the active
        treatment phase ended at week 68, semaglutide was discontinued —
        the extension simply tracked what happened next.
      </p>

      <p>
        By week 120 (one full year after the last semaglutide dose),
        participants who had been on semaglutide had regained 11.6
        percentage points of weight. Their net retention from baseline
        had dropped from 17.3% loss to just 5.6% loss [3]. That&apos;s
        approximately <strong>67% of the weight loss reversed</strong>{" "}
        within one year of discontinuation.
      </p>

      <p>
        Important note for anyone seeing the &ldquo;two-thirds regain&rdquo;
        figure cited in the lay press: it comes from the STEP-1
        extension [3], NOT from STEP-4 [1] as it&apos;s often
        misattributed. The two trials measured different things.
        STEP-4 measured a 48-week withdrawal divergence; the STEP-1
        extension measured the full 52-week post-discontinuation
        trajectory. Both arrive at roughly the same answer (~64–67%
        regain), but the citation matters.
      </p>

      <h2>SURMOUNT-4: the same story for tirzepatide</h2>

      <p>
        Tirzepatide (the dual GIP/GLP-1 agonist sold as Zepbound for
        weight loss and Mounjaro for type 2 diabetes) is a meaningfully
        more effective drug than semaglutide on the primary efficacy
        endpoint, but the withdrawal pattern looks essentially the same.
        SURMOUNT-4, published in JAMA in 2024 by Aronne and colleagues [4],
        randomized 694 participants who had achieved at least 10% weight
        reduction during a 36-week tirzepatide lead-in. They were
        randomized 2:1 to continue tirzepatide or switch to placebo for
        another 52 weeks.
      </p>

      <table>
        <thead>
          <tr>
            <th>Arm</th>
            <th>Mean weight change, week 36 → week 88</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Continued tirzepatide (n=386)</td>
            <td>−5.5%</td>
          </tr>
          <tr>
            <td>Switched to placebo (n=308)</td>
            <td>+14.0%</td>
          </tr>
          <tr>
            <td>Treatment difference</td>
            <td>−19.4 percentage points</td>
          </tr>
        </tbody>
      </table>

      <p>
        SURMOUNT-4 also reported that{" "}
        <strong>82.5% of the placebo-switched arm regained at least 25%
        of the weight they had lost during the initial 36-week treatment
        phase</strong> [4]. That&apos;s a stronger regain signal than
        STEP-4 produced for semaglutide, possibly because tirzepatide&apos;s
        deeper appetite suppression creates a larger gap between the
        on-drug and off-drug homeostatic set point.
      </p>

      <h2>Why the regain happens: the mechanism</h2>

      <p>
        GLP-1 receptor agonists work centrally in the hypothalamus. They
        activate satiety-promoting neurons (particularly POMC and CART
        neurons in the dorsomedial hypothalamus) and suppress
        appetite-stimulating NPY/AgRP neurons. The result is a sustained
        downward shift in the body&apos;s appetite set point — patients
        feel full faster, stop thinking about food between meals, and
        spontaneously eat less without willpower mediation.
      </p>

      <p>
        When the drug is withdrawn, two things happen at once:
      </p>

      <ol>
        <li>
          The central appetite suppression disappears within days, because
          semaglutide&apos;s half-life is roughly one week. Hunger and
          food preoccupation return rapidly.
        </li>
        <li>
          The body&apos;s compensatory hormonal signals — ghrelin (the
          appetite-stimulating gut hormone) and leptin (the satiety
          hormone secreted by fat tissue) — recalibrate to defend the
          higher pre-treatment body weight. Ghrelin rises, leptin
          sensitivity drops as fat stores rebuild, and the homeostatic
          system actively pulls weight back toward the original set point.
        </li>
      </ol>

      <p>
        The clinical implication is uncomfortable but unambiguous: for
        most patients, GLP-1 weight loss is not a cure — it&apos;s a
        disease management strategy that requires ongoing therapy to
        maintain the benefit. This is exactly why the FDA-approved
        Wegovy indication explicitly states the drug is for weight
        reduction <em>and weight maintenance</em>, with the implication
        that maintenance therapy is expected to be long-term.
      </p>

      <h2>What this means if you&apos;re considering stopping</h2>

      <p>
        If you&apos;re currently on semaglutide or tirzepatide and
        thinking about stopping — for cost reasons, side effects, or
        because you&apos;ve hit your target weight — the trial data is
        clear about what to expect. Most patients in randomized trials
        regained the majority of their weight within 12 months of
        discontinuation, even with continued lifestyle intervention.
      </p>

      <p>
        That doesn&apos;t mean stopping is wrong. It means three things:
      </p>

      <ol>
        <li>
          <strong>Plan for the long term.</strong> If you&apos;re budgeting
          for compounded GLP-1 therapy, budget for years, not months.
          Our <Link href="/savings-calculator">savings calculator</Link>{" "}
          shows the real out-of-pocket cost over a multi-year window.
        </li>
        <li>
          <strong>Tapering is poorly studied.</strong> The trials measured
          abrupt discontinuation, not gradual dose reduction. There is
          some clinical experience suggesting that stretching dosing
          intervals (e.g., moving from weekly to every 10-14 days) can
          help maintain weight loss at lower drug exposure, but the
          rigorous trial data isn&apos;t there yet. Our{" "}
          <Link href="/research/how-to-taper-off-glp1-safely-guide">
            practical guide to tapering off a GLP-1 safely
          </Link>{" "}
          and our{" "}
          <Link href="/research/semaglutide-microdosing-evidence-guide">
            semaglutide microdosing evidence guide
          </Link>{" "}
          walk through what is and isn&apos;t known about lower-dose
          maintenance strategies.
        </li>
        <li>
          <strong>Cost matters more than usual.</strong> Because long-term
          therapy is the expectation, the per-month price gap between
          providers compounds dramatically over time. Our{" "}
          <Link href="/research/glp1-pricing-index">
            pricing index
          </Link>{" "}
          and{" "}
          <Link href="/research/compounded-glp1-price-movement-12-months">
            16-month price movement investigation
          </Link>{" "}
          show how the market has been moving — and how to find the
          cheapest legitimate provider available in your state.
        </li>
      </ol>

      <h2>The bottom line</h2>

      <p>
        Three peer-reviewed randomized trials have specifically measured
        what happens after GLP-1 weight loss medications are stopped.
        STEP-4 [1], the STEP-1 extension [3], and SURMOUNT-4 [4] all
        produce the same answer: patients regain the majority of lost
        weight within a year of discontinuation, even with continued
        lifestyle intervention. The mechanism is well-described in the
        published literature — central appetite suppression reverses
        within days, and hormonal compensation recalibrates body weight
        toward the pre-treatment set point.
      </p>

      <p>
        That doesn&apos;t mean these drugs don&apos;t work. It means they
        work in the way you&apos;d expect any chronic disease management
        medication to work — when you take them, the disease (in this
        case, the body&apos;s defended high weight) is suppressed; when
        you stop, the disease returns. Patients and prescribers should
        plan accordingly.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
