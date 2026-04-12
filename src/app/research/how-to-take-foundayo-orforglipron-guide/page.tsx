import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";
import FaqSchema from "@/components/research/FaqSchema";

const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Take Foundayo once daily, any time of day",
    text: "Swallow one Foundayo tablet whole, once daily. The Foundayo prescribing information allows administration at any time of day, with or without food, with no water restrictions. Pick a time that fits your routine and take it consistently to keep the daily rhythm steady.",
  },
  {
    name: "Use the labeled titration schedule",
    text: "Foundayo titrates upward in steps with at least 30 days between each dose increase, per the FDA label. Do not skip steps and do not escalate faster than every 30 days, even if you are tolerating the current dose well — slow titration is the main lever for minimizing nausea.",
  },
  {
    name: "If you miss a dose, take it as soon as you remember the same day",
    text: "If you remember the same day you missed your dose, take it as soon as you remember. If it is already the next day, skip the missed dose and resume your normal once-daily schedule. Never take two doses in the same day.",
  },
  {
    name: "Use backup contraception around start and dose escalations",
    text: "Per the Foundayo prescribing information, women on oral contraceptives should add a barrier method (or switch to a non-oral hormonal method, IUD, or implant) for 4 weeks after initiating Foundayo and for 4 weeks after each dose escalation, because GLP-1 receptor agonists slow gastric emptying and can affect oral contraceptive absorption. Confirm the exact protocol with your prescriber.",
  },
  {
    name: "Watch for strong CYP3A4 inhibitors and interacting medications",
    text: "Co-administration with strong CYP3A4 inhibitors increases orforglipron exposure. The Foundayo label limits the maximum dose to 9 mg once daily when used with a strong CYP3A4 inhibitor. Tell your prescriber about every prescription, OTC medication, and supplement you take before starting and at every dose change.",
  },
  {
    name: "Store at room temperature",
    text: "Foundayo is a tablet — no refrigeration required. Store at controlled room temperature in the original packaging, away from moisture and direct sunlight, and out of reach of children. The lack of cold chain is a real advantage over the injectable GLP-1s when traveling.",
  },
];

const SLUG = "how-to-take-foundayo-orforglipron-guide";

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
      <HowToSchema
        name="How to Take Foundayo (Orforglipron) Daily"
        description="Step-by-step guide to taking Foundayo, the first oral non-peptide GLP-1 receptor agonist for weight management. Sourced from the Foundayo prescribing information."
        steps={HOW_TO_STEPS}
        url="https://www.weightlossrankings.org/research/how-to-take-foundayo-orforglipron-guide"
        image="https://www.weightlossrankings.org/research/how-to-take-foundayo-orforglipron-guide/opengraph-image"
        totalTime="PT5M"
      />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        <Link href="/drugs/foundayo">Foundayo</Link> (orforglipron) is the first oral, non-peptide GLP-1
        receptor agonist approved by the FDA for chronic weight
        management, cleared on <strong>April 1, 2026</strong> based on
        the ATTAIN-1 phase 3 trial<Cite n={1} /><Cite n={2} />. Unlike
        <Link href="/drugs/wegovy">Wegovy</Link> and <Link href="/drugs/zepbound">Zepbound</Link> it is a daily tablet, and unlike <Link href="/drugs/semaglutide">Rybelsus</Link>
        (oral semaglutide) it is a small molecule rather than a peptide,
        which is why the FDA-approved Foundayo label allows it to be
        taken <strong>any time of day, with or without food, with no
        water restrictions</strong><Cite n={1} /><Cite n={3} />. This
        guide walks through exactly how to take it: the titration steps
        from the FDA label, the missed-dose rule, the contraceptive
        warning, the strong CYP3A4 inhibitor dose cap, and what to
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
        the FDA-approved labeled maintenance dose, ATTAIN-1 participants
        without type 2 diabetes lost approximately <strong>11.1%</strong>{" "}
        of body weight on average at 72 weeks per the Foundayo
        prescribing information<Cite n={1} /><Cite n={2} />.
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

      <h2>Time of day and food: any time, with or without food</h2>
      <p>
        This is where Foundayo differs sharply from the older oral
        semaglutide pill (Rybelsus). The Foundayo prescribing
        information allows the tablet to be taken{" "}
        <strong>
          at any time of day, with or without food, with no water
          restrictions
        </strong>
        <Cite n={1} />. There is no morning fasting window, no 4-ounce
        plain water rule, and no 30-minute wait before coffee, food, or
        other medications. The dedicated food-effect pharmacokinetic
        study by Ma et al. 2024 supported this label position: peak
        concentration and total exposure were not affected in a
        clinically meaningful way by food<Cite n={3} />. That food-
        independent administration was a major part of the design
        rationale for orforglipron and is one of the central practical
        differences from Rybelsus<Cite n={4} />.
      </p>
      <p>
        The only practical guidance is the standard advice that applies
        to any daily medication: pick a time you will remember,
        consistently take it at that time, and swallow the tablet whole
        rather than crushing, splitting, or chewing it. Many patients
        anchor it to a daily habit they already have — first thing in
        the morning, with breakfast, with dinner, or at bedtime — to
        keep adherence high.
      </p>

      <h2>Drug interaction note: strong CYP3A4 inhibitors cap the dose</h2>
      <p>
        Orforglipron is metabolized in part by CYP3A4. The Foundayo
        label limits the maximum dose to{" "}
        <strong>9 mg once daily when co-administered with a strong
        CYP3A4 inhibitor</strong> (for example clarithromycin,
        itraconazole, ketoconazole, or ritonavir-boosted antivirals)
        <Cite n={1} />. Tell your prescriber about every prescription,
        OTC product, and supplement you take before starting Foundayo
        and at every dose change so the labeled dose cap can be applied
        if needed.
      </p>

      <h2>What to do if you miss a dose</h2>
      <p>
        Per the Foundayo prescribing information<Cite n={1} />, the
        missed-dose rule is straightforward because it is a daily drug
        rather than a weekly one:
      </p>
      <ul>
        <li>
          If you remember <strong>the same day</strong> you missed the
          dose, take it as soon as you remember.
        </li>
        <li>
          If it is already the next day, <strong>skip the missed
          dose</strong> and resume your normal once-daily schedule.
          Never take two doses in the same day.
        </li>
        <li>
          If you miss more than a few consecutive days, contact your
          prescriber. Depending on how long you have been off the drug,
          you may need to drop back to a lower titration step before
          resuming the maintenance dose, in the same way the
          injectables are restarted after long interruptions.
        </li>
      </ul>

      <h2>The backup contraception rule</h2>
      <p>
        The Foundayo prescribing information includes an important
        warning for women using oral hormonal contraceptives
        <Cite n={1} />. Because GLP-1 receptor agonists slow gastric
        emptying and because orforglipron can affect the absorption of
        co-administered oral medications, the label recommends that
        women on combined oral contraceptives or progestin-only pills{" "}
        <strong>
          add a barrier method (or switch to a non-oral contraceptive)
          for 4 weeks after initiating Foundayo and for 4 weeks after
          each dose escalation
        </strong>
        . If you are sexually active and pregnancy would be a problem,
        this is not optional — confirm the exact protocol with your
        prescriber before starting.
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
          <strong>No injection routine to disrupt.</strong> Just take
          the daily tablet on your normal schedule, with or without
          food, exactly as you would at home.
        </li>
        <li>
          <strong>Time zone changes:</strong> shift the dose to the new
          local time you plan to take it. Because the half-life of
          orforglipron is long enough to support once-daily dosing, a
          single shifted day will not meaningfully change steady-state
          concentration.
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
          you prefer a daily oral pill over a weekly injection, or you
          have tried injectables and discontinued for injection-site or
          needle reasons.
        </li>
        <li>
          <strong>Choose an injectable (Wegovy or Zepbound) if:</strong>{" "}
          you want the highest possible average weight loss (the
          <Link href="/drugs/tirzepatide">tirzepatide</Link> trials produced ~21% mean loss at the 15 mg dose
          vs Foundayo&apos;s ~11.1% at the labeled maintenance dose
          <Cite n={1} />), you know you will not reliably take a daily
          tablet, or you are already happy on once-weekly dosing.
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
          weight management, dosed as a once-daily tablet titrated upward
          to a maintenance dose with at least 30 days between dose
          increases<Cite n={1} />.
        </li>
        <li>
          The Foundayo label allows administration{" "}
          <strong>any time of day, with or without food, with no water
          restrictions</strong> — there is no morning fasting window
          <Cite n={1} /><Cite n={3} />. This is the central practical
          difference from Rybelsus<Cite n={4} />.
        </li>
        <li>
          With strong CYP3A4 inhibitors the labeled maximum dose is
          capped at 9 mg once daily<Cite n={1} />. Always reconcile your
          medication list with your prescriber before starting.
        </li>
        <li>
          Missed a dose? If you remember the same day, take it. If it is
          already the next day, skip and resume the normal schedule. Never
          double up.
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
      <FaqSchema
        items={[
          {
            question: "How do you take Foundayo (orforglipron)?",
            answer:
              "Foundayo is taken as one oral tablet once daily, with or without food. Unlike injectable GLP-1s, there is no need to inject, no refrigeration, and no special timing window. The starter dose escalates over weeks to the target maintenance dose per the FDA prescribing information. Always follow your prescriber's specific instructions and the patient information leaflet that comes with your prescription.",
          },
          {
            question: "Can I take Foundayo with food?",
            answer:
              "Yes. Foundayo can be taken with or without food per the prescribing information. Some patients find taking it with a small meal reduces nausea, especially during the early titration weeks. Consistency matters more than timing — pick a daily time and stick with it.",
          },
          {
            question: "What if I miss a dose of Foundayo?",
            answer:
              "If you miss a dose and remember within several hours, take it as soon as you remember. If it's almost time for the next dose, skip the missed dose and resume your normal schedule. Do not take two doses to make up for a missed dose. Multiple missed doses in a row may warrant restarting at a lower dose to manage GI side effects — consult your prescriber.",
          },
          {
            question: "Do I need to take Foundayo at the same time each day?",
            answer:
              "Same time daily is recommended for consistency, but the FDA label does not require a specific time of day. Pick a time that fits your routine — many patients tie it to a daily anchor (morning coffee, breakfast, before bed) to make adherence easier. Consistency improves adherence more than the specific time chosen.",
          },
          {
            question: "Can I drink alcohol on Foundayo?",
            answer:
              "There is no formal contraindication, but alcohol can amplify GI side effects (nausea, gastritis) and may worsen the early-titration discomfort. Many patients on GLP-1s report reduced alcohol cravings and tolerance. If you drink, do so in moderation, especially during the first weeks. Heavy alcohol use is generally discouraged on any GLP-1.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
