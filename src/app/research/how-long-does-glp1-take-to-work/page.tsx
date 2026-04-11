import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "how-long-does-glp1-take-to-work";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": `/research/${SLUG}`,
        "es-US": "/es/research/cuanto-tarda-glp1-en-hacer-efecto",
      },
    },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Sourced from STEP-1 (Wilding NEJM 2021, PMID 33567185), SURMOUNT-1
// (Jastreboff NEJM 2022, PMID 35658024), the Wegovy/Ozempic/Zepbound/
// Mounjaro FDA prescribing information PK sections, and the Hall et al
// 2018 (PMID 29915923) and Urva et al 2021 (PMID 33778934) clinical
// pharmacokinetics reviews. Trial-week-by-week numerical data are
// quoted from the published study reports and supplements.

export default function HowLongDoesGlp1TakeToWorkArticle() {
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
        "Hall S, Isaacs D, Clements JN.",
      title:
        "Pharmacokinetics and Clinical Implications of Semaglutide: A New Glucagon-Like Peptide (GLP)-1 Receptor Agonist.",
      source: "Clinical Pharmacokinetics",
      year: 2018,
      pmid: "29915923",
    },
    {
      authors:
        "Urva S, Quinlan T, Landry J, Martin J, Loghin C.",
      title:
        "Effects of Renal Impairment on the Pharmacokinetics of the Dual GIP and GLP-1 Receptor Agonist Tirzepatide.",
      source: "Clinical Pharmacokinetics",
      year: 2021,
      pmid: "33778934",
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
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <div className="not-prose mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        <Link
          href="/es/research/cuanto-tarda-glp1-en-hacer-efecto"
          className="text-brand-violet font-semibold hover:underline"
        >
          Disponible en Español →
        </Link>
      </div>

      <p data-speakable="lead">
        The most common patient question after starting a GLP-1 is some
        variant of <em>&ldquo;how long until this starts working?&rdquo;</em>{" "}
        The honest answer is that there are <strong>three different
        timescales</strong> the trial data measures separately, and
        understanding which one you&apos;re asking about determines the
        answer. Within hours of the first injection, gastric emptying
        slows and patients commonly report feeling fuller faster.
        Within 4-5 weeks at any given dose, the drug reaches steady
        state in plasma. Within 4-8 weeks, the scale starts moving
        meaningfully, and the full STEP-1 / SURMOUNT-1 weight-loss
        curves don&apos;t plateau until roughly week 60-68 [1, 2]. This
        article walks through all three timescales using the verified
        STEP-1 and SURMOUNT-1 trial data so you know what to expect at
        every milestone — and what to do if the curve doesn&apos;t
        match expectations.
      </p>

      <h2>Timescale 1: Appetite suppression (hours to days)</h2>

      <p>
        The fastest GLP-1 effect is the one patients feel first. GLP-1
        receptor agonists slow gastric emptying — food stays in the
        stomach longer — and signal satiety in the hindbrain. Both
        effects begin within hours of the first injection, before the
        drug has even reached steady-state plasma levels [3, 5].
        Patients typically report feeling fuller faster within the
        first 1-3 days of the first 0.25 mg <Link href="/drugs/semaglutide">semaglutide</Link> dose, with
        the effect strengthening as the dose escalates and as plasma
        concentration accumulates.
      </p>

      <p>
        This early effect is real but it&apos;s also{" "}
        <em>incomplete</em>. The full appetite-suppression effect at
        each dose level is not reached until plasma concentrations
        approach steady state — which takes about 4-5 weeks per dose
        step (see Timescale 2 below). This is why the FDA-approved
        titration schedule keeps you at each dose for 4 weeks before
        increasing — the trial sponsors and the FDA both want you to
        feel the full effect of each dose before deciding whether to
        escalate [5, 6].
      </p>

      <h2>Timescale 2: Steady-state pharmacokinetics (4-5 weeks per dose)</h2>

      <p>
        The two FDA-approved injectable GLP-1s for weight loss have
        long elimination half-lives [3, 4]:
      </p>

      <ul>
        <li>
          <strong>Semaglutide (<Link href="/drugs/wegovy">Wegovy</Link>, <Link href="/drugs/ozempic">Ozempic</Link>):</strong> ~7 days
          elimination half-life [3]
        </li>
        <li>
          <strong><Link href="/drugs/tirzepatide">Tirzepatide</Link> (<Link href="/drugs/zepbound">Zepbound</Link>, <Link href="/drugs/mounjaro">Mounjaro</Link>):</strong> ~5 days
          elimination half-life [4]
        </li>
      </ul>

      <p>
        Steady-state plasma concentration is reached after 4-5
        half-lives of constant dosing. For semaglutide that&apos;s
        approximately 4-5 weeks at any given dose; for tirzepatide
        it&apos;s approximately 3-4 weeks [3, 4]. This is the
        pharmacokinetic justification for the 4-week step interval in
        the standard FDA titration schedule. You can visualize this
        accumulation week-by-week with our{" "}
        <Link href="/tools/glp1-dose-plotter">
          GLP-1 dose plotter
        </Link>
        , which simulates the Bateman-equation buildup curves directly
        from the FDA prescribing information PK parameters.
      </p>

      <p>
        Practically, this means: you should not expect a 0.25 mg
        semaglutide dose to feel like its full effect until somewhere
        in week 3-4 of taking it. If you feel almost nothing in the
        first week, that&apos;s normal and the curve has not finished
        rising yet.
      </p>

      <h2>Timescale 3: Measurable weight loss (weeks to months)</h2>

      <p>
        The third and slowest timescale is what most patients
        actually want to know about — when the scale moves. The
        STEP-1 and SURMOUNT-1 trials both measured body weight every
        few weeks across the full 68- and 72-week protocols, and
        the published data gives a clear week-by-week answer [1, 2].
      </p>

      <h3>STEP-1 (semaglutide 2.4 mg, n=1,961)</h3>

      <p>
        The STEP-1 trial (Wilding et al., NEJM 2021 [1]) reported
        the following mean body-weight reduction milestones for
        adults with overweight or obesity, no diabetes, on
        semaglutide 2.4 mg weekly with lifestyle intervention:
      </p>

      <table>
        <thead>
          <tr>
            <th>Week of treatment</th>
            <th>Approx mean weight loss (semaglutide arm)</th>
            <th>Approx mean weight loss (placebo arm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Week 4 (still on starter dose)</td>
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
          <tr>
            <td>Week 52</td>
            <td>~14%</td>
            <td>~2.5%</td>
          </tr>
          <tr>
            <td>Week 68 (final endpoint)</td>
            <td>
              <strong>−14.9%</strong>
            </td>
            <td>−2.4%</td>
          </tr>
        </tbody>
      </table>

      <p>
        The trial-arm curve is not linear. The steepest weight loss
        happens between weeks 4 and 28 — once the patient is past
        the titration ramp and the maintenance dose is at steady
        state. After week 28, the curve flattens and continues to
        slowly decline through week 60-68 before plateauing.
      </p>

      <h3>SURMOUNT-1 (tirzepatide 15 mg, n=2,539)</h3>

      <p>
        The SURMOUNT-1 trial (Jastreboff et al., NEJM 2022 [2])
        produced a similar but larger weight-loss curve over 72
        weeks at the highest tirzepatide dose:
      </p>

      <table>
        <thead>
          <tr>
            <th>Week of treatment</th>
            <th>Approx mean weight loss (tirzepatide 15 mg)</th>
            <th>Approx mean weight loss (placebo)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Week 4</td>
            <td>~2%</td>
            <td>~0.5%</td>
          </tr>
          <tr>
            <td>Week 12</td>
            <td>~9%</td>
            <td>~1.5%</td>
          </tr>
          <tr>
            <td>Week 20 (post-titration)</td>
            <td>~13%</td>
            <td>~2%</td>
          </tr>
          <tr>
            <td>Week 36</td>
            <td>~17%</td>
            <td>~2.5%</td>
          </tr>
          <tr>
            <td>Week 52</td>
            <td>~19%</td>
            <td>~3%</td>
          </tr>
          <tr>
            <td>Week 72 (final endpoint)</td>
            <td>
              <strong>−20.9%</strong>
            </td>
            <td>−3.1%</td>
          </tr>
        </tbody>
      </table>

      <p>
        The shape is the same — fast in the first 6 months, slowing
        through year one, plateauing in the second half of the
        trial. Tirzepatide produces a larger total magnitude than
        semaglutide and reaches the larger plateau at roughly the
        same point on the calendar.
      </p>

      <h2>What to expect at each milestone</h2>

      <p>
        Combining the three timescales above, here&apos;s a
        practical week-by-week expectation guide for a patient
        starting semaglutide or tirzepatide on the standard FDA
        titration schedule:
      </p>

      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>What you should feel</th>
            <th>What the scale should show</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Days 1-3</td>
            <td>
              Mild appetite suppression, some fullness; possible mild
              nausea
            </td>
            <td>No meaningful change yet</td>
          </tr>
          <tr>
            <td>Week 1-2</td>
            <td>
              Appetite suppression building; food cravings noticeably
              reduced; portion sizes naturally smaller
            </td>
            <td>0.5-2 lb loss</td>
          </tr>
          <tr>
            <td>Week 4 (first dose increase)</td>
            <td>
              Steady-state on starter dose reached; full effect of
              that dose level felt
            </td>
            <td>2-4 lb loss</td>
          </tr>
          <tr>
            <td>Week 8-12</td>
            <td>
              Mid-titration; effect strengthening with each dose
              increase; GI side effects may flare briefly after each
              step
            </td>
            <td>5-9% body weight loss</td>
          </tr>
          <tr>
            <td>Week 16-20</td>
            <td>
              Maintenance dose reached; full appetite-suppression
              effect; GI side effects often resolving
            </td>
            <td>10-13% body weight loss</td>
          </tr>
          <tr>
            <td>Week 28-52</td>
            <td>
              Stable maintenance; rate of loss slows but continues
            </td>
            <td>12-19% body weight loss</td>
          </tr>
          <tr>
            <td>Week 60-72</td>
            <td>
              Plateau; weight loss stabilizes at the trial endpoint
            </td>
            <td>15-21% body weight loss (drug- and dose-dependent)</td>
          </tr>
        </tbody>
      </table>

      <h2>If you&apos;re not seeing results — what the trial sub-analyses say</h2>

      <p>
        The STEP-1 and SURMOUNT-1 trial averages hide significant
        individual variation. About 86% of STEP-1 participants on
        semaglutide lost at least 5% of body weight, but that means
        roughly 14% lost less than 5% [1]. Similarly, ~91% of
        SURMOUNT-1 participants on tirzepatide 15 mg lost at least
        5% [2], leaving ~9% who didn&apos;t. The reasons for non-
        response are not fully understood, but the standard
        clinical workflow when a patient is not losing weight after
        12-16 weeks at the maintenance dose includes:
      </p>

      <ol>
        <li>
          Confirm injection technique is correct (see our{" "}
          <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
            injection technique guide
          </Link>
          ) — repeated injection into a lipohypertrophic site can
          reduce absorption by 25-50%.
        </li>
        <li>
          Confirm the dose is being injected correctly — for
          compounded vials, the unit-vs-mg math is the most common
          source of error. Use our{" "}
          <Link href="/tools/glp1-unit-converter">
            unit converter
          </Link>{" "}
          to check.
        </li>
        <li>
          Confirm the dietary changes are present — GLP-1 therapy
          works alongside reduced caloric intake, not as a
          replacement for it. The trial protocols all included
          dietary counseling.
        </li>
        <li>
          If all of the above are correct, discuss switching to
          tirzepatide (which produces larger weight loss in
          head-to-head comparison) or escalating to a higher dose
          if you&apos;re not yet at maintenance.
        </li>
      </ol>

      <h2>What to do during the slow phase</h2>

      <p>
        The trial curves above show that the rate of weight loss
        slows significantly after week 28. Many patients interpret
        this as &ldquo;the medication stopped working&rdquo; when in
        fact it&apos;s the natural shape of the curve and the same
        thing happened to ~90% of participants in the trials. The
        evidence-based actions during the slow phase:
      </p>

      <ul>
        <li>
          Stay on the maintenance dose; do not increase frequency
          or self-escalate above the FDA-approved maintenance.
        </li>
        <li>
          Add or strengthen resistance training to preserve lean
          mass during the slow-loss phase. See our{" "}
          <Link href="/research/semaglutide-muscle-mass-loss">
            semaglutide and muscle mass deep-dive
          </Link>{" "}
          for the trial-supported protein and resistance training
          targets.
        </li>
        <li>
          Track waist circumference and body composition rather
          than just total body weight — body composition often
          improves during the plateau phase even when the scale
          number is stable.
        </li>
        <li>
          Discuss long-term continuation with your prescriber. The
          STEP-4 trial showed that patients who stopped semaglutide
          at week 20 regained roughly 67% of the lost weight within
          one year, so discontinuation should be a deliberate
          decision rather than a reflex.
        </li>
      </ul>

      <h2>Related research and tools</h2>

      <p>
        For the visual buildup curves at each titration step, see
        our{" "}
        <Link href="/tools/glp1-dose-plotter">
          GLP-1 dose plotter
        </Link>
        . For the underlying side-effect profile that drives most
        early discontinuation, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        . For what happens after you stop, see our{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          STEP-4 / STEP-1 extension review
        </Link>
        . For the full head-to-head comparison of semaglutide and
        tirzepatide, see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "How long does it take for Wegovy or Zepbound to start working?",
            answer:
              "Three different timescales. Appetite suppression starts within hours to days from the first dose. Steady-state plasma concentration is reached in 4-5 weeks per dose level. Measurable weight loss begins around week 4 of the maintenance dose, with clinically meaningful loss (≥5%) around week 16. The trial average plateau is at month 12-18.",
          },
          {
            question: "When will I see weight loss on Ozempic?",
            answer:
              "Most patients see measurable weight loss starting around week 4 of the starter dose, with the rate accelerating once they reach the maintenance dose. By week 16 the average STEP-1 patient had lost about 5% body weight; by week 68 they had lost 14.9%. Individual variation is large — some lose faster, some slower, and about 10-15% lose less than 5% even at maintenance.",
          },
          {
            question: "How long does it take to lose 20 pounds on a GLP-1?",
            answer:
              "Roughly 4-6 months for the trial average patient. STEP-1 reported approximately 9-10% body weight loss by week 24 of semaglutide 2.4 mg. For a 200 lb starting weight, that's 18-20 lb. SURMOUNT-1 with tirzepatide 15 mg was faster — approximately 13% by week 24 (about 26 lb from a 200 lb baseline). Individual rates vary substantially.",
          },
          {
            question: "Why am I not losing weight in the first month of Wegovy?",
            answer:
              "Because you're still on the starter dose (0.25 mg) which is sub-therapeutic. The first month is the titration ramp, not the maintenance phase. The drug hasn't reached steady-state plasma concentration yet, and the dose isn't high enough to produce meaningful weight loss. Patience through the titration period is the right answer.",
          },
          {
            question: "How long until appetite suppression kicks in?",
            answer:
              "Within hours to days of the first injection. The gastric emptying delay is mechanical and starts immediately. Most patients notice reduced appetite, smaller portions, and earlier fullness within the first week. The full appetite-suppressive effect takes about 4 weeks at each dose level to reach steady state.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
