import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "why-am-i-not-losing-weight-glp1-plateau";

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

export default function PlateauArticle() {
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
        "Rubino D, Abrahamsson N, Davies M, Hesse D, Greenway FL, Jensen C, Lingvay I, Mosenzon O, Rosenstock J, Rubio MA, Rudofsky G, Tadayon S, Wadden TA, Dicker D; STEP 4 Investigators.",
      title:
        "Effect of Continued Weekly Subcutaneous Semaglutide vs Placebo on Weight Loss Maintenance in Adults With Overweight or Obesity: The STEP 4 Randomized Clinical Trial.",
      source: "JAMA",
      year: 2021,
      pmid: "33755728",
    },
    {
      authors:
        "Frid AH, Kreugel G, Grassi G, Halimi S, Hicks D, Hirsch LJ, Smith MJ, Wellhoener R, Bode BW, Hirsch IB, Kalra S, Ji L, Strauss KW.",
      title:
        "New Insulin Delivery Recommendations.",
      source: "Mayo Clinic Proceedings",
      year: 2016,
      pmid: "27594187",
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
      authors:
        "Wilding JPH, Batterham RL, Davies M, Van Gaal LF, Kandler K, Konakli K, Lingvay I, McGowan BM, Oral TK, Rosenstock J, Wadden TA, Wharton S, Yokote K, Kushner RF; STEP 1 Study Group.",
      title:
        "Weight regain and cardiometabolic effects after withdrawal of semaglutide: The STEP 1 trial extension.",
      source: "Diabetes, Obesity and Metabolism",
      year: 2022,
      pmid: "35441470",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        &ldquo;Why am I not losing weight on semaglutide?&rdquo; is a
        high-volume patient search (~1,400/mo) for a reason: the
        STEP-1 trial reported that roughly 14% of participants on
        semaglutide 2.4 mg lost less than 5% of body weight over 68
        weeks [1], and SURMOUNT-1 reported that roughly 9% of
        tirzepatide 15 mg participants fell into the same bucket
        [2]. Non-response is real, documented, and distinct from
        the much larger group of patients who think they&apos;re
        non-responders but are actually in one of three addressable
        states: early-titration (dose hasn&apos;t reached full
        effect), technical error (dose math or injection technique
        is silently reducing absorption), or the natural late-trial
        plateau that almost every successful responder hits around
        week 40-60. This guide walks through each bucket with the
        specific fix.
      </p>

      <h2>The three buckets — and how to tell which one you&apos;re in</h2>

      <ol>
        <li>
          <strong>Early-titration &ldquo;not yet&rdquo; (weeks 1-16).</strong>{" "}
          Most patients who feel they&apos;re not responding in the
          first 3-4 months are in this bucket. The dose has
          simply not reached its full pharmacokinetic effect yet.
          See the week-by-week expected weight loss curve in our{" "}
          <Link href="/research/how-long-does-glp1-take-to-work">
            how long does GLP-1 take to work guide
          </Link>
          . If you&apos;re at week 8 and frustrated that you&apos;ve
          only lost 3%, that&apos;s actually on the STEP-1 trial
          curve and the next 12 weeks are the steepest-loss window.
        </li>
        <li>
          <strong>Technical error (any time).</strong> A silent error
          in dose math or injection technique can reduce absorption
          by 25-50% without producing any visible sign [4]. This is
          the most fixable bucket and also the most common
          overlooked cause. Fix it and the weight loss resumes.
        </li>
        <li>
          <strong>Trial-curve plateau (weeks 40-68).</strong> After
          week 40 on semaglutide or week 52 on tirzepatide, the
          weight loss curve naturally flattens. If you&apos;re at
          week 50 and you&apos;ve already lost 13% but the scale
          hasn&apos;t moved for a month, you&apos;re hitting the
          same plateau almost every successful responder hits in
          the STEP and SURMOUNT curves [1, 2]. This is not
          failure — it&apos;s the shape of the curve.
        </li>
      </ol>

      <h2>Bucket 1: Early-titration non-response</h2>

      <p>
        The STEP-1 weight loss curve at weeks 4, 12, 20, and 28
        (verified from the trial publication [1]):
      </p>

      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Semaglutide arm mean weight loss</th>
            <th>Placebo arm mean</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Week 4</td>
            <td>~1.5%</td>
            <td>~0.5%</td>
          </tr>
          <tr>
            <td>Week 12</td>
            <td>~6%</td>
            <td>~1.5%</td>
          </tr>
          <tr>
            <td>Week 20 (post-titration)</td>
            <td>~10%</td>
            <td>~2%</td>
          </tr>
          <tr>
            <td>Week 28</td>
            <td>~12%</td>
            <td>~2.5%</td>
          </tr>
        </tbody>
      </table>

      <p>
        If you&apos;re at or above the trial curve numbers for your
        week, you are <em>not</em> a non-responder. If you&apos;re
        below, check bucket 2 before concluding anything.
      </p>

      <h2>Bucket 2: Technical error in dose or injection</h2>

      <p>
        This is the most fixable and most under-appreciated bucket.
        Three specific errors account for almost all silent
        under-dosing:
      </p>

      <h3>Error 1: Wrong unit count on a compounded vial</h3>

      <p>
        Compounded GLP-1 vials are dosed in <em>insulin syringe
        units</em>, and the mg-to-units conversion depends on the
        vial concentration. A 2.5 mg/mL semaglutide vial at &ldquo;20
        units&rdquo; delivers 0.5 mg. A 5 mg/mL vial at the same 20
        units delivers 1.0 mg. Patients who switch between
        pharmacies or concentrations frequently end up on the wrong
        unit count for their new vial and effectively halve or
        double their dose without realizing. Use our{" "}
        <Link href="/tools/glp1-unit-converter">
          GLP-1 unit converter
        </Link>{" "}
        to verify your current math against the concentration
        printed on your vial label.
      </p>

      <h3>Error 2: Injecting into lipohypertrophy</h3>

      <p>
        Repeated injection into the same small patch of subcutaneous
        tissue produces lipohypertrophy — firm fatty nodules that
        absorb injected drug 25-50% slower than normal tissue [4].
        The most common patient error is returning to the same
        &ldquo;favorite&rdquo; spot because it hurts less, which is
        actually the early sign of lipohypertrophy. Fix: rotate
        sites every injection, at least 1 inch from the last one.
        See our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          injection technique guide
        </Link>{" "}
        for the recommended rotation pattern.
      </p>

      <h3>Error 3: Wrong-dose pen</h3>

      <p>
        For brand-name Wegovy and Ozempic pens, each pen delivers a
        specific fixed dose. Patients occasionally end up with a
        starter-dose pen (0.25 mg) when they should be on a
        maintenance pen (2.4 mg) and the pharmacy tech or the
        telehealth prescriber made a dispensing error. Check the
        dose printed on the pen label against your prescribed dose
        at every pickup.
      </p>

      <h2>Bucket 3: The trial-curve plateau</h2>

      <p>
        Look at the STEP-1 and SURMOUNT-1 curves past week 40 [1,
        2]. The rate of weight loss slows progressively:
      </p>

      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Week 28</th>
            <th>Week 52</th>
            <th>Week 68 (end)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STEP-1 semaglutide 2.4 mg</td>
            <td>~12%</td>
            <td>~14%</td>
            <td>−14.9%</td>
          </tr>
          <tr>
            <td>SURMOUNT-1 tirzepatide 15 mg</td>
            <td>~14%</td>
            <td>~19%</td>
            <td>−20.9% (at wk 72)</td>
          </tr>
        </tbody>
      </table>

      <p>
        The curves are not linear. Between weeks 28 and 68 of
        STEP-1, the average participant lost only 3 additional
        percentage points — compared to the 12 points they lost in
        weeks 0-28. That&apos;s the natural shape, not a signal
        that the drug stopped working. The STEP-4 extension trial
        [3] confirmed that patients who continued on semaglutide
        past week 20 maintained the loss, while patients who
        stopped regained weight rapidly. The maintenance effect is
        real; it just doesn&apos;t produce continuing dramatic loss.
      </p>

      <h2>What to actually do when the scale stops moving</h2>

      <p>
        A prioritized action plan for any patient who thinks
        they&apos;ve hit a plateau or non-response:
      </p>

      <ol>
        <li>
          <strong>Confirm your week number against the trial
          curve.</strong> If you&apos;re below week 16, you&apos;re
          probably not non-responding — you&apos;re early. Wait
          until week 20-24 to judge.
        </li>
        <li>
          <strong>Verify your dose math.</strong> Pull out your
          vial label, check the concentration, and recompute the
          units you should be drawing using our{" "}
          <Link href="/tools/glp1-unit-converter">
            unit converter
          </Link>
          . This catches ~30% of &ldquo;plateaus&rdquo; in
          practice.
        </li>
        <li>
          <strong>Examine your injection site.</strong> Feel for
          firm nodules. If you find any, stop using that site for
          6-8 weeks and rotate to fresh tissue. Absorption from
          the new site is usually normal.
        </li>
        <li>
          <strong>Verify you&apos;re on the maintenance dose.</strong>{" "}
          Wegovy maintenance is 2.4 mg. Zepbound maintenance is
          15 mg. If you&apos;re not at maintenance yet, the
          conversation is about completing titration, not about
          plateau.
        </li>
        <li>
          <strong>Track body composition, not just body weight.</strong>{" "}
          During the late-trial plateau, body composition often
          improves (lean mass up, fat mass down) even when total
          body weight is flat. Waist circumference is the cheapest
          proxy; body composition testing is more precise.
        </li>
        <li>
          <strong>Review protein intake and resistance training.</strong>{" "}
          If you&apos;re losing muscle, the scale can stay flat
          even as you add fat — a bad outcome. See our{" "}
          <Link href="/research/semaglutide-muscle-mass-loss">
            muscle mass deep-dive
          </Link>
          .
        </li>
        <li>
          <strong>Discuss drug switching with your prescriber.</strong>{" "}
          Tirzepatide produces larger weight loss than semaglutide
          in head-to-head comparisons [2]. If you&apos;re on
          semaglutide and have truly plateaued at maintenance dose
          with verified correct technique, switching to tirzepatide
          is an evidence-based next step.
        </li>
      </ol>

      <h2>When to consider stopping</h2>

      <p>
        The STEP-1 Extension trial (Wilding 2022 Diabetes Obesity
        Metabolism [6]) is the key reference for the discontinuation
        decision. Participants regained approximately two-thirds
        (~67%) of their lost weight in the year after semaglutide
        was stopped (regaining 11.6 percentage points of the 17.3%
        they had lost). This is not a failure of willpower — it&apos;s
        a documented physiological rebound driven by the same
        appetite and energy-expenditure mechanisms the drug was
        suppressing. Before deciding to discontinue:
      </p>

      <ul>
        <li>
          Understand that GLP-1 therapy for obesity is a{" "}
          <em>chronic disease therapy</em>, not a course of
          treatment. The trial evidence does not support short-
          course use followed by drug-free maintenance.
        </li>
        <li>
          See our{" "}
          <Link href="/research/what-happens-when-you-stop-semaglutide">
            what happens when you stop semaglutide deep-dive
          </Link>{" "}
          for the full STEP-4 data and the expected rebound
          timeline.
        </li>
        <li>
          Discuss alternative drug options with your prescriber
          before discontinuing — switching is almost always a
          better option than stopping.
        </li>
      </ul>

      <h2>Related research and tools</h2>

      <p>
        For the verified trial-curve timing, see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          how long does GLP-1 take to work guide
        </Link>
        . For the injection technique pattern that prevents
        absorption loss, see our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          injection guide
        </Link>
        . For the dose math, use our{" "}
        <Link href="/tools/glp1-unit-converter">
          unit converter
        </Link>
        . For the discontinuation rebound data, see our{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          post-discontinuation deep-dive
        </Link>
        . For the head-to-head that supports switching from
        semaglutide to tirzepatide, see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          head-to-head comparison
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Why am I not losing weight on Wegovy or Zepbound?",
            answer:
              "There are three buckets of non-response: (1) early-titration non-response — you're still on the starter dose and the drug hasn't reached steady state; (2) technical errors in injection technique or stale pen/vial; (3) the trial-curve plateau — about 10-15% of trial participants lost less than 5% even at the maintenance dose. The first step is identifying which bucket you're in, because the fix is different for each.",
          },
          {
            question: "How long does it take for a GLP-1 to start working?",
            answer:
              "Appetite suppression starts within hours to days. Steady-state plasma concentrations take 4-5 weeks per dose level (roughly 5 half-lives). Measurable weight loss typically begins around week 4 of the maintenance dose; meaningful loss (5% or more) is at week 16; the trial average plateau is at month 12-18. If you're at week 4 of the starter dose, you're not at steady state yet — patience is the right answer.",
          },
          {
            question: "What percentage of patients don't respond to GLP-1s?",
            answer:
              "Approximately 10-15% of patients in the STEP-1 and SURMOUNT-1 trials lost less than 5% body weight even at the maintenance dose. This is the published 'non-responder' rate. Another 10-20% lose less than the trial average. Individual variability is large: some patients lose 25%+ while others lose almost nothing on the same dose, and the predictors of response are not fully understood.",
          },
          {
            question: "Should I increase my GLP-1 dose if I'm not losing weight?",
            answer:
              "Discuss with your prescriber. The dose-escalation schedules in STEP-1 and SURMOUNT-1 are well-defined, and most patients escalate to the highest tolerated dose over 4-5 months. If you've completed full titration to the maintenance dose and given it 12-16 weeks at steady state without meaningful response, the conversation shifts to whether to (a) switch to a more potent agent (e.g., semaglutide → tirzepatide), (b) add a complementary intervention, or (c) accept that this drug class isn't going to deliver the results you wanted and explore alternatives.",
          },
          {
            question: "Is it normal to plateau on Ozempic after losing some weight?",
            answer:
              "Yes. Both STEP-1 and SURMOUNT-1 show clear plateaus around month 12-18 in their published weight-loss curves. The mechanism is partly metabolic adaptation (resting energy expenditure drops as you lose weight) and partly behavioral (caloric intake creeps back up). The plateau is the body finding a new equilibrium. Continuing the drug typically maintains the loss; stopping the drug typically causes regain. Adding resistance training and protein helps preserve lean mass through the plateau.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
