import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "how-to-take-foundayo-orforglipron-guide";

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

// Verified against:
//   - Foundayo (orforglipron) US Prescribing Information, Eli Lilly 2026
//   - ATTAIN-1 phase 3 obesity trial readout (Eli Lilly press release)
//   - Ma X et al. 2024, orforglipron PK/food-effect (PMID 38402332)
//   - Wegovy US Prescribing Information (2025) for comparison context

export default function FoundayoHowToTakeArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information. FDA approval announcement, April 1, 2026.",
      source: "Eli Lilly Investor News",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ATTAIN-1: A Phase 3 Trial of Orforglipron in Adults with Obesity — topline results supporting the FDA approval of Foundayo.",
      source: "Eli Lilly Investor News",
      year: 2025,
      url: "https://investor.lilly.com/news-releases/news-release-details/lillys-oral-glp-1-orforglipron-demonstrated-statistically",
    },
    {
      authors:
        "Ma X, Pratt E, Wang Y, Loghin C, Ekanem PE, Crawford R, Cui X, Coskun T, Haupt A, Robins D, Benson C.",
      title:
        "Pharmacokinetics, safety, and tolerability of orforglipron, an oral, nonpeptide glucagon-like peptide-1 receptor agonist: Food effect and absolute bioavailability studies.",
      source: "Clin Pharmacol Drug Dev",
      year: 2024,
      pmid: "38402332",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "RYBELSUS (semaglutide) tablets — US Prescribing Information. Reference for the oral GLP-1 empty-stomach administration paradigm.",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s019lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Foundayo (orforglipron) is the first oral, non-peptide GLP-1
        receptor agonist approved by the FDA for chronic weight management,
        cleared on <strong>April 1, 2026</strong> based on the ATTAIN-1
        phase 3 trial<Cite n={1} /><Cite n={2} />. Unlike Wegovy and
        Zepbound, it is a daily tablet — but unlike Rybelsus, it is a
        small molecule rather than a peptide, which gives it more
        forgiving but still strict food and timing rules. This guide
        walks through exactly how to take it: the titration steps from
        the FDA label, the morning empty-stomach window, the food and
        beverage pitfall that can wreck absorption, the missed-dose
        rule, the 30-day backup contraception requirement, and what to
        expect at each step of the schedule.
      </p>

      <h2>What Foundayo actually is</h2>
      <p>
        Foundayo is Eli Lilly&apos;s brand name for{" "}
        <strong>orforglipron</strong>, a small-molecule (non-peptide)
        GLP-1 receptor agonist taken once daily as a tablet. Because it
        is not a peptide, it does not require a permeation enhancer like
        oral semaglutide (Rybelsus) and does not need refrigeration or a
        cold chain<Cite n={1} /><Cite n={3} />. It is the only oral
        GLP-1 currently FDA-approved for chronic weight management in
        adults with obesity (BMI &ge; 30) or overweight (BMI &ge; 27)
        with at least one weight-related comorbidity<Cite n={1} />. At
        the FDA-approved 17.2 mg labeled maximum dose, adults without
        type 2 diabetes lost approximately <strong>11.1%</strong> of
        body weight on average (about 24.9 lbs) at 72 weeks per the
        Foundayo prescribing information; adults with type 2 diabetes
        lost about 9.6% (21.2 lbs)<Cite n={1} />.
      </p>

      <h2>The titration schedule from the FDA label</h2>
      <p>
        Foundayo uses a six-step, 4-week-per-step titration schedule.
        The point of the slow ramp is the same as with the injectables:
        let your gut adapt and minimize the nausea that otherwise causes
        people to quit<Cite n={1} />.
      </p>
      <ul>
        <li>
          <strong>Weeks 1-4 — 0.8 mg once daily.</strong> Initiation
          dose. Not therapeutic for weight loss; the entire purpose is
          tolerability.
        </li>
        <li>
          <strong>Weeks 5-8 — 2.5 mg once daily.</strong> First
          escalation. Most patients begin to notice meaningful appetite
          suppression here.
        </li>
        <li>
          <strong>Weeks 9-12 — 5.5 mg once daily.</strong> Second
          escalation. Satiety effect builds further.
        </li>
        <li>
          <strong>Weeks 13-16 — 9 mg once daily.</strong> Third
          escalation.
        </li>
        <li>
          <strong>Weeks 17-20 — 14.5 mg once daily.</strong> Fourth
          escalation. Some patients stay here as a maintenance dose if
          they are tolerating well and losing weight at an acceptable
          rate.
        </li>
        <li>
          <strong>Weeks 21+ — 17.2 mg once daily (maintenance).</strong>{" "}
          The full FDA-labeled maintenance dose. At this dose adults
          without type 2 diabetes lost approximately 11.1% of body
          weight (about 24.9 lbs) at 72 weeks per the Foundayo
          prescribing information<Cite n={1} />.
        </li>
      </ul>
      <p>
        As with the injectable GLP-1s, the four-week pace is a maximum,
        not a minimum. If you are still nauseated at the end of a step,
        the standard practice is to stay on the current dose for an
        additional 2-4 weeks before moving up. There is no published
        evidence that a slower titration reduces final weight loss.
      </p>

      <h2>Time of day: morning, on an empty stomach</h2>
      <p>
        The Foundayo label requires you to take the tablet{" "}
        <strong>
          in the morning, on an empty stomach, with no more than 4
          ounces of plain water, at least 30 minutes before any food,
          beverage other than water, or other oral medications
        </strong>
        <Cite n={1} />. This rule mirrors the administration paradigm
        for oral semaglutide (Rybelsus)<Cite n={4} /> and exists because
        food and other liquids can dramatically reduce orforglipron
        absorption. In the dedicated food-effect pharmacokinetic study
        by Ma et al. 2024, taking orforglipron with a high-fat meal
        substantially decreased peak concentration and total
        exposure compared to the fasted state<Cite n={3} />.
      </p>
      <p>
        The practical version of the rule is simple: the moment you
        wake up, swallow the tablet with a small sip of plain water,
        then start a 30-minute timer. During those 30 minutes you may
        drink more plain water, but nothing else — no coffee, no tea,
        no juice, no sparkling water, no electrolyte mix, no milk, no
        food, and no other pills or supplements. After 30 minutes you
        can have your normal breakfast, coffee, and any other
        medications.
      </p>

      <h2>The food and drink rule is the practical pitfall</h2>
      <p>
        This is the single most important thing to get right. Patients
        who take Foundayo with their morning coffee, or who swallow it
        with juice or milk, or who eat breakfast 10 minutes after the
        tablet, are likely cutting their absorbed dose by a meaningful
        fraction<Cite n={3} />. They will lose less weight than the
        trial participants did, blame the drug, and switch to an
        injectable that they could have avoided.
      </p>
      <ul>
        <li>
          <strong>Plain water only</strong> for swallowing the tablet
          and for the 30-minute window. Mineral water and sparkling
          water are not on the label as acceptable; stick to plain
          still water.
        </li>
        <li>
          <strong>No coffee, tea, or any caloric beverage</strong>{" "}
          before the 30-minute window closes. This is the most common
          accidental violation.
        </li>
        <li>
          <strong>No other oral medications or supplements</strong>{" "}
          inside the 30-minute window. If you take a morning thyroid
          tablet, blood pressure pill, or multivitamin, plan the order:
          Foundayo first, wait 30 minutes, then everything else with
          breakfast.
        </li>
        <li>
          <strong>Do not crush, split, or chew the tablet.</strong>{" "}
          Swallow whole.
        </li>
      </ul>

      <h2>What to do if you miss a dose</h2>
      <p>
        Per the Foundayo prescribing information<Cite n={1} />, the
        missed-dose rule is straightforward because it is a daily drug
        rather than a weekly one:
      </p>
      <ul>
        <li>
          If you remember <strong>the same day</strong> and you have
          not yet eaten or had any non-water beverage, take the missed
          dose immediately on an empty stomach and start a fresh
          30-minute fasting window.
        </li>
        <li>
          If you have already eaten or had coffee or other beverages
          that morning, <strong>skip the dose for that day</strong> and
          resume your normal once-daily morning schedule the next
          morning. Do not double up the next day.
        </li>
        <li>
          If you miss more than a few consecutive days, contact your
          prescriber. Depending on how long you have been off the drug,
          you may need to drop back to a lower titration step before
          resuming the maintenance dose, in the same way the
          injectables are restarted after long interruptions.
        </li>
      </ul>

      <h2>The 30-day backup contraception rule</h2>
      <p>
        Section 7.1 of the Foundayo PI includes an important warning
        for women using oral hormonal contraceptives<Cite n={1} />.
        Because GLP-1 receptor agonists slow gastric emptying and
        because Foundayo itself can affect the absorption of co-
        administered oral medications, the label recommends that women
        on combined oral contraceptives or progestin-only pills{" "}
        <strong>
          add a barrier method (or switch to a non-oral contraceptive)
          for 4 weeks after initiating Foundayo and for 4 weeks after
          each dose escalation
        </strong>
        . The conservative practical rule that many prescribers give
        is: assume your oral contraceptive is unreliable for the first
        30 days of Foundayo and for 30 days after every dose step-up,
        and use condoms or another non-oral method during those
        windows. If you are sexually active and pregnancy would be a
        problem, this is not optional — confirm the exact protocol with
        your prescriber before starting.
      </p>

      <h2>What to expect at each titration step</h2>
      <ul>
        <li>
          <strong>0.8 mg (weeks 1-4).</strong> Mild nausea is common
          in the first week. Appetite suppression is subtle. You will
          probably not see meaningful weight loss yet — that is normal
          and not a sign the drug isn&apos;t working.
        </li>
        <li>
          <strong>2.5 mg (weeks 5-8).</strong> First real wave of
          appetite suppression. Nausea may peak again in the first
          week of the new dose, then resolve. Most patients start
          losing 1-2 lb per week here.
        </li>
        <li>
          <strong>5.5 mg (weeks 9-12).</strong> Satiety effect deepens.
          Smaller meals fill you up faster. Some patients have a second
          nausea wave; the same fixes apply (smaller meals, less fat,
          more hydration).
        </li>
        <li>
          <strong>9 mg (weeks 13-16).</strong> Steady weight-loss
          curve. Many patients are 6-10% down from baseline by the end
          of this step.
        </li>
        <li>
          <strong>14.5 mg (weeks 17-20).</strong> Stronger appetite
          control. Some patients elect to stay here as a maintenance
          dose.
        </li>
        <li>
          <strong>17.2 mg (weeks 21+).</strong> Full maintenance dose.
          Continued slow loss for 6-12 more months in most ATTAIN-1
          patients before reaching a plateau<Cite n={2} />.
        </li>
      </ul>
      <p>
        For nausea management at each step the same principles that
        apply to injectable GLP-1s apply here — see our{" "}
        <Link href="/research/glp1-nausea-management-practical-guide">
          GLP-1 nausea management guide
        </Link>{" "}
        for the full dietary and antiemetic playbook.
      </p>

      <h2>Storage</h2>
      <p>
        Foundayo is stored at controlled room temperature (typically
        20-25&deg;C / 68-77&deg;F, with brief excursions allowed per
        the package insert)<Cite n={1} />. <strong>No refrigeration is
        required.</strong> Keep the tablets in their original blister
        pack until you are ready to take them, store them away from
        direct sunlight and humidity (so not on a bathroom counter),
        and keep them out of reach of children. This is a structural
        advantage over Wegovy and Zepbound, which require refrigerated
        storage prior to first use<Cite n={5} />.
      </p>

      <h2>Travel</h2>
      <p>
        The travel story is where oral GLP-1s really shine. Because
        Foundayo is a room-temperature tablet:
      </p>
      <ul>
        <li>
          <strong>No cold chain.</strong> You can put a month of
          tablets in a carry-on or even a checked bag without worrying
          about an ice pack failing.
        </li>
        <li>
          <strong>No needles, no sharps, no TSA awkwardness.</strong>{" "}
          Tablets pass through airport security exactly like any other
          prescription medication.
        </li>
        <li>
          <strong>No injection routine to disrupt.</strong> The only
          travel logistics are timing your morning fasted window —
          which is the same problem as taking a daily levothyroxine on
          the road and is solved the same way.
        </li>
        <li>
          <strong>Time zone changes:</strong> shift the dose to the new
          local morning. Because the half-life of orforglipron is long
          enough to support once-daily dosing, a single shifted day
          will not meaningfully change steady-state concentration.
        </li>
      </ul>

      <h2>Foundayo vs the injectables: when oral is the right answer</h2>
      <p>
        Foundayo is genuinely the right first choice for some patients
        and a suboptimal choice for others. The honest framing:
      </p>
      <ul>
        <li>
          <strong>Choose Foundayo if:</strong> needles are a hard stop
          for you, you travel frequently and the cold chain is a real
          obstacle, you live somewhere without reliable refrigeration,
          you have a morning routine that already includes a
          well-spaced fasted period (e.g. you already take morning
          thyroid medication), or you have tried injectables and
          discontinued for injection-site or needle reasons.
        </li>
        <li>
          <strong>Choose an injectable (Wegovy or Zepbound) if:</strong>{" "}
          you want the highest possible average weight loss (the
          tirzepatide trials produced ~21% mean loss vs Foundayo&apos;s
          ~11.1% at the 17.2 mg labeled dose<Cite n={1} />), you know
          you will not reliably take a daily morning fasted tablet,
          your morning routine is chaotic, or you are already happy on
          once-weekly dosing.
        </li>
      </ul>
      <p>
        The labeled-dose 11.1% mean weight loss for Foundayo is a real
        number and is clinically meaningful — comparable to early
        semaglutide phase 3 results — but it is meaningfully lower than
        the SURMOUNT tirzepatide numbers. The trade-off is real:
        Foundayo buys convenience at some cost in average efficacy.
        Many patients will reasonably make that trade.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Foundayo is the first oral, non-peptide GLP-1 approved for
          weight management, dosed as a once-daily tablet titrated over
          20 weeks from 0.8 mg to a maintenance dose of 17.2 mg
          <Cite n={1} />.
        </li>
        <li>
          Take it in the morning on an empty stomach with no more than
          4 oz of plain water, then wait at least 30 minutes before any
          food, non-water beverage, or other oral medication
          <Cite n={1} /><Cite n={3} />.
        </li>
        <li>
          The food-and-drink rule is the single biggest practical
          pitfall. Coffee, juice, milk, or breakfast inside the
          30-minute window can substantially reduce absorbed dose
          <Cite n={3} />.
        </li>
        <li>
          Missed a dose? If you have not yet eaten, take it that
          morning. If you already broke the fast, skip and resume the
          next morning — never double up.
        </li>
        <li>
          Women on oral contraceptives should add a barrier method for
          30 days after initiating Foundayo and for 30 days after each
          dose increase, per Section 7.1 of the PI<Cite n={1} />.
        </li>
        <li>
          Storage is room temperature with no refrigeration — a real
          advantage over the injectables when traveling.
        </li>
        <li>
          Average labeled-dose (17.2 mg) weight loss was ~11.1% at 72
          weeks per the FDA prescribing information<Cite n={1} /> —
          meaningful, but lower than SURMOUNT tirzepatide. Pick
          Foundayo for convenience; pick an
          injectable for maximum average efficacy.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo (orforglipron) FDA approval: the trial data and what it means
          </Link>{" "}
          — the full ATTAIN-1 readout and label analysis
        </li>
        <li>
          <Link href="/research/glp1-nausea-management-practical-guide">
            GLP-1 nausea management: the practical guide
          </Link>{" "}
          — the same dietary and antiemetic playbook applies to Foundayo
        </li>
        <li>
          <Link href="/research/how-to-get-glp1-prescription">
            How to get a GLP-1 prescription in 2026
          </Link>{" "}
          — the telehealth and in-person paths to a Foundayo prescription
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — check whether your current medications conflict with Foundayo
        </li>
        <li>
          <Link href="/tools/glp1-bmi-calculator">
            GLP-1 BMI calculator
          </Link>{" "}
          — confirm whether you meet the FDA-label BMI threshold for Foundayo
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Foundayo
        has FDA-labeled contraindications, warnings, and dosing
        instructions that should be reviewed in full with a licensed
        prescriber before starting. Decisions about initiating,
        titrating, pausing, or stopping Foundayo should always be made
        with your prescribing clinician and based on the official
        prescribing information.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
