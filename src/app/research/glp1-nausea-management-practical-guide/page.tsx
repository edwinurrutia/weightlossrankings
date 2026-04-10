import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";

const SLUG = "glp1-nausea-management-practical-guide";

// HowTo steps correspond 1:1 to the six <h3> numbered subsections
// under "What the evidence actually supports for management" in the
// article body. Google requires each HowTo step to map to visible
// on-page content.
const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Slow the titration",
    text: "If nausea hits hard on a dose step, spend an extra 2–4 weeks at the current dose before advancing. The FDA labels explicitly allow extending the titration period at the prescriber's discretion.",
  },
  {
    name: "Eat smaller, more frequent meals",
    text: "Switch from 3 large meals to 5–6 small ones. Smaller gastric volumes reduce the stretching sensation that triggers nausea on slowed GLP-1 gastric emptying.",
  },
  {
    name: "Avoid high-fat trigger foods",
    text: "Fried food, greasy meat, heavy cream sauces, and full-fat dairy all slow gastric emptying further. Cutting these is the single biggest dietary lever for reducing GLP-1 nausea.",
  },
  {
    name: "Hydrate with electrolytes",
    text: "GLP-1 nausea and vomiting can cause dehydration that makes the nausea worse. Replace fluids with electrolyte drinks, not just water, to keep sodium and potassium in range.",
  },
  {
    name: "Time the injection for the evening",
    text: "Some patients tolerate the peak-level nausea better if they inject in the evening so the peak hits during sleep rather than during a workday or meal.",
  },
  {
    name: "Use anti-nausea medication when appropriate",
    text: "Ondansetron (Zofran) and promethazine are the two most-studied anti-nausea drugs for GLP-1-related nausea. Both require a prescription and should be used under clinician guidance, not indefinitely.",
  },
];

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
//   - STEP-1 (Wilding NEJM 2021, PMID 33567185) — Table S5 supplementary AE
//   - SURMOUNT-1 (Jastreboff NEJM 2022, PMID 35658024) — Table S5 supplementary
//   - Wegovy/Zepbound FDA Section 6 Adverse Reactions tables
//   - Wharton et al. Postgrad Med 2022 (PMID 34775881) — clinical practice rec
//   - Filippatos et al. 2014 (PMID 25396404) — adverse effects of GLP-1 RAs

export default function NauseaGuideArticle() {
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
        "Wharton S, Davies M, Dicker D, Lingvay I, Mosenzon O, Rubino DM, Pedersen SD.",
      title:
        "Managing the gastrointestinal side effects of GLP-1 receptor agonists in obesity: recommendations for clinical practice.",
      source: "Postgraduate Medicine",
      year: 2022,
      pmid: "34775881",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 6 Adverse Reactions table.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 6 Adverse Reactions table.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Filippatos TD, Panagiotopoulou TV, Elisaf MS.",
      title:
        "Adverse Effects of GLP-1 Receptor Agonists.",
      source: "Rev Diabet Stud",
      year: 2014,
      pmid: "25396404",
    },
    {
      authors:
        "Bettge K, Kahle M, Abd El Aziz MS, Meier JJ, Nauck MA.",
      title:
        "Occurrence of nausea, vomiting and diarrhoea reported as adverse events in clinical trials studying glucagon-like peptide-1 receptor agonists: A systematic analysis of published clinical trials.",
      source: "Diabetes Obes Metab",
      year: 2017,
      pmid: "27860132",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <HowToSchema
        name="How to Manage GLP-1 Nausea"
        description="Evidence-based techniques for reducing nausea on semaglutide, tirzepatide, Wegovy, Ozempic, Zepbound, and Mounjaro — sourced from FDA labels and clinical guidance on GLP-1 tolerability."
        steps={HOW_TO_STEPS}
        url="https://weightlossrankings.org/research/glp1-nausea-management-practical-guide"
        image="https://weightlossrankings.org/research/glp1-nausea-management-practical-guide/opengraph-image"
        totalTime="PT20M"
      />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Nausea is the most common GLP-1 side effect and the single biggest
        reason patients quit therapy. The headline numbers from the
        registration trials sound alarming: <strong>44.2%</strong> of
        patients on semaglutide 2.4 mg in STEP-1 reported nausea<Cite n={1} />
        , and <strong>29.0%</strong> of patients on tirzepatide 15 mg in
        SURMOUNT-1 reported nausea per the Zepbound FDA label adverse
        reactions table<Cite n={2} /><Cite n={5} />. But those are cumulative
        rates over 68-72 weeks of treatment, and almost all of the nausea
        is concentrated in the first few weeks of each new dose step. The
        practical management problem is not &ldquo;how do I avoid nausea
        for the next 18 months&rdquo; — it&apos;s &ldquo;how do I get
        through the first 8 weeks of each titration step.&rdquo;
      </p>

      <h2>The actual trial rates</h2>
      <p>
        From the STEP-1 (semaglutide) and SURMOUNT-1 (tirzepatide)
        Section 6 Adverse Reactions tables and supplementary appendices
        <Cite n={1} /><Cite n={2} /><Cite n={4} /><Cite n={5} />:
      </p>
      <ul>
        <li>
          <strong>Semaglutide 2.4 mg (Wegovy)</strong> — 44.2% nausea, 24.8%
          vomiting, 31.5% diarrhea, 23.4% constipation. Mostly mild to
          moderate. ~4.5% discontinued the drug for any GI side effect.
        </li>
        <li>
          <strong>Tirzepatide 15 mg (Zepbound)</strong> — 29.0% nausea,
          12.2% vomiting, 21.2% diarrhea, 11.7% constipation per the
          Zepbound FDA label Section 6 Adverse Reactions table. Mostly
          mild to moderate. ~4.3% discontinued for any GI side effect.
        </li>
        <li>
          <strong>Tirzepatide 5 mg</strong> — lower nausea than the 10 mg
          and 15 mg arms (the lowest of the three SURMOUNT-1 doses).
        </li>
        <li>
          <strong>Placebo</strong> — 9.8% (STEP-1) and 9.5% (SURMOUNT-1)
          nausea. Some background nausea is expected from the act of
          starting any new injectable medication.
        </li>
      </ul>
      <p>
        Two takeaways. First: tirzepatide is meaningfully easier on the
        gut than semaglutide on average, despite being the more potent
        weight-loss drug. Second: even on the higher-nausea drug, more
        than half of patients in the trials never reported nausea at all.
      </p>

      <h2>The timeline — when nausea actually happens</h2>
      <p>
        Both Wegovy and Zepbound use a slow 4-week titration schedule
        specifically to manage GI side effects. Each time the dose
        increases, there is a fresh wave of nausea that typically peaks
        within the first one to two weeks of the new dose and then
        resolves<Cite n={3} /><Cite n={6} />. The pattern looks like:
      </p>
      <ul>
        <li>
          <strong>Days 1-7 of a new dose</strong> — nausea peaks. Worst
          window is usually 24-48 hours after the injection.
        </li>
        <li>
          <strong>Days 7-14</strong> — nausea fades as the gut adapts to
          the new steady-state concentration.
        </li>
        <li>
          <strong>Weeks 3-4</strong> — most patients tolerate the dose
          well. This is the &ldquo;baseline&rdquo; window before the next
          dose increase.
        </li>
        <li>
          <strong>Repeat at every dose escalation</strong> until the
          maintenance dose is reached.
        </li>
      </ul>
      <p>
        Once you reach the maintenance dose and stay there for 6-8 weeks,
        most patients in the trials reported only occasional, mild
        nausea<Cite n={1} /><Cite n={2} />. The hard part is the first 5
        months of titration, not the long-term maintenance phase.
      </p>

      <h2>What the evidence actually supports for management</h2>
      <p>
        The Wharton et al. 2022 clinical practice paper<Cite n={3} /> is
        the most cited source for GI management guidance and is the
        framework most prescribers use. Their core recommendations:
      </p>

      <h3>1. Slow the titration</h3>
      <p>
        The strongest single intervention is to <strong>not advance the
        dose</strong> until you tolerate the current one. The 4-week
        titration schedule on the FDA labels is a maximum pace, not a
        required pace. If you are still nauseated at week 4 of a new dose
        step, it is standard practice to stay on the current dose for an
        additional 2-4 weeks before escalating. Many patients end up on a
        6-week-per-step schedule and reach the same maintenance dose,
        just two months later. There is no evidence that the slower
        titration reduces final efficacy.
      </p>

      <h3>2. Smaller, more frequent meals</h3>
      <p>
        GLP-1s slow gastric emptying. Large meals sit in the stomach
        longer and trigger more nausea. Patients in clinical practice do
        much better with 4-6 small meals per day than with 2-3 large
        ones. Stop eating <em>before</em> you feel full — the satiety
        signal lags the actual stomach distension by 15-20 minutes on a
        GLP-1.
      </p>

      <h3>3. Avoid the high-fat trigger foods</h3>
      <p>
        Fatty foods slow gastric emptying further and are the most
        commonly reported nausea trigger in patient surveys. Fried foods,
        creamy sauces, large servings of nut butter, very fatty cuts of
        meat, and high-fat desserts are the usual culprits. This does not
        mean &ldquo;low fat forever&rdquo; — most patients can reintroduce
        moderate fat once they are fully titrated and adapted.
      </p>

      <h3>4. Hydration and electrolytes</h3>
      <p>
        Dehydration amplifies nausea and is also the main mechanism behind
        GLP-1-associated kidney injury. Aim for 2-3 liters of fluid per
        day, ideally with some electrolytes (sodium and potassium) if you
        are also losing weight rapidly. Sip throughout the day rather than
        chugging large volumes, which can also trigger nausea on slowed
        gastric emptying.
      </p>

      <h3>5. Timing of the injection</h3>
      <p>
        Many patients report less nausea when they inject in the evening
        rather than the morning. The reason is practical: peak nausea
        often hits 24-48 hours after the dose, and if that window includes
        a sleep period, you spend less of it conscious and miserable.
        Wegovy and Zepbound have no labeled time-of-day restriction, so
        this is a flexibility you can use.
      </p>

      <h3>6. Anti-nausea medications when appropriate</h3>
      <p>
        Short-term use of antiemetics is reasonable for breakthrough
        nausea but should be discussed with your prescriber. Common
        choices include:
      </p>
      <ul>
        <li>
          <strong>Ondansetron (Zofran)</strong> — the most commonly
          prescribed. 4-8 mg as needed. Be aware that it can cause
          constipation, which is already a GLP-1 side effect, so it can
          stack badly.
        </li>
        <li>
          <strong>Promethazine (Phenergan)</strong> — sedating; useful at
          night.
        </li>
        <li>
          <strong>Vitamin B6 (pyridoxine)</strong> — over the counter;
          well-studied for nausea in pregnancy and reasonable to try at
          25-50 mg twice daily.
        </li>
        <li>
          <strong>Ginger</strong> — modest evidence base but very safe.
          Ginger tea, ginger chews, or 250-500 mg ginger capsules.
        </li>
      </ul>
      <p>
        Note that if you require regular antiemetics to tolerate the
        GLP-1, that is a signal to stay on the current dose longer rather
        than continuing to escalate.
      </p>

      <h2>What does NOT help</h2>
      <ul>
        <li>
          <strong>Powering through.</strong> If you are vomiting and not
          eating, the answer is to slow the titration, not to white-knuckle
          it. Pushing through severe nausea is the fastest path to
          discontinuation.
        </li>
        <li>
          <strong>Splitting the weekly dose.</strong> Wegovy and Zepbound
          are formulated as once-weekly injections and the
          pharmacokinetics are designed for that schedule. Splitting a
          weekly vial into two injections changes the peak-to-trough
          ratio in unpredictable ways and is not recommended.
        </li>
        <li>
          <strong>
            Skipping a dose because you feel sick that day
          </strong>{" "}
          unless you are advised to by your prescriber. The labels have
          specific guidance on missed doses (take within a few days for
          weekly drugs, otherwise skip and resume at the regular schedule)
          — see our{" "}
          <Link href="/research/glp1-side-effect-questions-answered">
            side effect Q&amp;A
          </Link>{" "}
          for the exact missed-dose rules.
        </li>
      </ul>

      <h2>Red flags — stop and call your prescriber</h2>
      <p>
        Most GLP-1 nausea is uncomfortable but not dangerous. These are
        the symptoms that mean stop self-managing and reach out
        immediately:
      </p>
      <ul>
        <li>
          <strong>Persistent vomiting</strong> for more than 24 hours, or
          inability to keep down liquids — risk of dehydration and
          electrolyte imbalance.
        </li>
        <li>
          <strong>Severe abdominal pain</strong>, especially if it
          radiates to the back — could indicate pancreatitis (rare but
          serious; in the FDA boxed warning).
        </li>
        <li>
          <strong>
            Signs of dehydration: dizziness on standing, dark urine,
            rapid heart rate, confusion
          </strong>{" "}
          — risk of acute kidney injury.
        </li>
        <li>
          <strong>
            Bloody vomit, black tarry stools, or vomiting undigested food
            from many hours ago
          </strong>{" "}
          — could indicate gastroparesis or another upper GI complication.
        </li>
        <li>
          <strong>
            Yellowing of the skin or eyes
          </strong>{" "}
          — risk of gallbladder complications, which are slightly more
          common on rapid weight loss with GLP-1s.
        </li>
        <li>
          <strong>Inability to eat for more than 48 hours.</strong>
        </li>
      </ul>
      <p>
        If any of these are present, call your prescriber. If symptoms
        are severe or you cannot reach your prescriber quickly, go to an
        urgent care or emergency room and bring your medication with you.
      </p>

      <h2>If nausea is the deal-breaker</h2>
      <p>
        About 4-5% of patients in the registration trials discontinued
        for GI side effects despite the slow titration<Cite n={1} /><Cite n={2} />.
        If you have tried slowing the titration, the dietary adjustments,
        and antiemetics and still cannot tolerate the drug, the
        reasonable next steps are:
      </p>
      <ul>
        <li>
          <strong>Switch to tirzepatide</strong> if you started on
          semaglutide. The lower nausea rate is a real difference.
        </li>
        <li>
          <strong>Switch to the lowest maintenance dose</strong> that
          still produces meaningful weight loss. Tirzepatide 5 mg
          delivered ~16% mean weight loss in SURMOUNT-1 with a lower
          nausea rate than the 10 mg and 15 mg arms — much more
          tolerable than the 15 mg dose.
        </li>
        <li>
          <strong>Try Foundayo (orforglipron)</strong> — the new oral
          GLP-1 has a different titration schedule and may suit some
          patients who couldn&apos;t tolerate injectables.
        </li>
        <li>
          <strong>Stop the GLP-1 entirely</strong> and revisit in 6-12
          months. There is no shame in deciding the trade-off isn&apos;t
          worth it. See our{" "}
          <Link href="/research/how-to-taper-off-glp1-safely-guide">
            tapering guide
          </Link>{" "}
          for the discontinuation protocol.
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Nausea on GLP-1s is real and common (roughly 29-44% in the
          registration trials), but
          mostly concentrated in the first 1-2 weeks of each new dose
          step.
        </li>
        <li>
          The single best management lever is to slow the titration —
          stay on the current dose until you tolerate it, even if that
          adds a few months to the schedule.
        </li>
        <li>
          Smaller meals, less fat, hydration, evening injections, and
          short-term antiemetics are evidence-supported and cost almost
          nothing to try.
        </li>
        <li>
          Tirzepatide is meaningfully easier on the gut than semaglutide
          on average.
        </li>
        <li>
          Persistent vomiting, severe abdominal pain, signs of
          dehydration, and bloody or coffee-ground vomit are red flags —
          call your prescriber.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>{" "}
          — every common side effect with the trial-data context
        </li>
        <li>
          <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
            GLP-1 fatigue, hair loss, and side-effect duration
          </Link>{" "}
          — what to expect after the nausea phase ends
        </li>
        <li>
          <Link href="/research/what-to-eat-on-glp1-diet-protein-guide">
            What to eat on a GLP-1: the protein guide
          </Link>{" "}
          — the food framework that minimizes both nausea and muscle loss
        </li>
        <li>
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            Stopping GLP-1s before surgery
          </Link>{" "}
          — ASA hold guidance and aspiration risk
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — search any antiemetic for interaction with your GLP-1
        </li>
        <li>
          <Link href="/tools/glp1-dose-plotter">GLP-1 dose plotter</Link>{" "}
          — visualize how each titration step builds in your bloodstream
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is educational
        and does not constitute medical advice. Side effect management
        decisions should always be made with your prescribing clinician.
        If you have any of the red flag symptoms listed above, seek care
        promptly.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "How common is nausea on Wegovy or Zepbound?",
            answer:
              "Nausea is the most common adverse event in GLP-1 trials. STEP-1 reported nausea in approximately 44% of semaglutide patients vs 18% on placebo. SURMOUNT-1 reported similar rates for tirzepatide. Most nausea is mild-to-moderate and concentrated in the first 4-8 weeks after starting or escalating a dose. It typically improves as the body adapts to the drug.",
          },
          {
            question: "When does GLP-1 nausea peak and when does it go away?",
            answer:
              "Nausea typically peaks within 1-2 weeks after starting a new dose level (so after each titration step) and improves over the following 2-4 weeks as the body adapts. The first 4-week titration period is usually the worst, with subsequent dose escalations producing milder rebounds. By the time you reach the maintenance dose, nausea should be substantially reduced or absent for most patients.",
          },
          {
            question: "What actually helps with GLP-1 nausea?",
            answer:
              "Slow dose escalation (don't push to the next dose if you're still nauseous), small frequent meals (rather than 3 large ones), avoiding high-fat meals, ginger (modest evidence), staying hydrated, and prescription antiemetics like ondansetron if needed. Eating slowly and stopping at first satiety is the highest-leverage behavioral change. Some patients use a B6 + doxylamine combination (the same anti-pregnancy-nausea protocol) off-label.",
          },
          {
            question: "When should I stop the GLP-1 because of nausea?",
            answer:
              "Red flags that warrant calling your prescriber: persistent vomiting (multiple episodes per day), inability to keep fluids down, signs of dehydration, severe abdominal pain (especially radiating to the back — possible pancreatitis), bloody vomit, or severe constipation lasting more than 5 days. For routine moderate nausea, the answer is usually 'wait, slow titration, and use anti-nausea strategies' rather than discontinue.",
          },
          {
            question: "Does nausea mean the GLP-1 is working?",
            answer:
              "Yes — nausea is a sign that the drug is engaging GLP-1 receptors, slowing gastric emptying, and reducing appetite. Patients with no nausea at all sometimes worry the drug isn't working. The correlation is real but not perfect; some people who don't experience nausea still lose weight effectively. Don't increase the dose to chase nausea — increase only on the prescribed schedule under your prescriber's guidance.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
