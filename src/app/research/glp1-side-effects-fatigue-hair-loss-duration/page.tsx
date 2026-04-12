import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "glp1-side-effects-fatigue-hair-loss-duration";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": `/research/${SLUG}`,
        es: `/es/research/semaglutida-efectos-secundarios-duracion`,
        "es-US": `/es/research/semaglutida-efectos-secundarios-duracion`,
        "x-default": `/research/${SLUG}`,
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
// (Jastreboff NEJM 2022, PMID 35658024), the Wegovy and Zepbound FDA
// prescribing information adverse-event tables, the Kakouri et al
// 2023 review of hair loss in weight loss contexts (PMID 37325499),
// and the Wharton 2022 review of GLP-1 side effect management
// (PMID 34775881).

export default function SideEffectsDurationArticle() {
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
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 6: Adverse Reactions.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 6: Adverse Reactions.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
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
      authors:
        "Kakouri AC, Christodoulou AC, Ioannou GI, Andronicou K, Zachariades A, Ieronymaki E, Zachariou M, Petsas S, Sauerborn R, Malatras A, Zinonos S, Charalambous T.",
      title:
        "Telogen Effluvium in the Context of Rapid Weight Loss: A Mini-Review.",
      source: "Cureus",
      year: 2023,
      pmid: "37325499",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Our broader{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>{" "}
        covers the headline adverse-event rates from the STEP and
        SURMOUNT trials. This article answers a different but higher-
        traffic question: <em>how long do the side effects
        actually last?</em> Three specific concerns drive the bulk of
        patient search volume — fatigue, hair loss, and the duration
        of the standard GI side effects — and the trial data is much
        more specific than most patients realize. We walk through
        each one with the verified numbers from the STEP-1 and
        SURMOUNT-1 prescribing information tables [1, 2, 3, 4] and
        the published clinical practice guidance on side-effect
        management [5, 6].
      </p>

      <h2>How long do the GI side effects last?</h2>

      <p>
        The classic GLP-1 side effects are gastrointestinal —
        nausea, vomiting, diarrhea, constipation, abdominal pain.
        The STEP-1 and SURMOUNT-1 trial publications don&apos;t
        report duration directly in the headline tables, but the
        timing pattern is consistent across both trials and across
        subsequent clinical practice reviews [5]:
      </p>

      <ul>
        <li>
          <strong>Onset:</strong> within hours to 2-3 days of the
          first injection, and within hours of each subsequent dose
          escalation.
        </li>
        <li>
          <strong>Peak intensity:</strong> first 1-2 weeks after
          any dose increase. The starter dose (0.25 mg <Link href="/drugs/semaglutide">semaglutide</Link>,
          2.5 mg <Link href="/drugs/tirzepatide">tirzepatide</Link>) is tolerated by most patients; the
          first two escalations (to 0.5 mg and 1.0 mg semaglutide;
          to 5 mg and 7.5 mg tirzepatide) tend to produce the
          strongest GI symptoms.
        </li>
        <li>
          <strong>Resolution:</strong> most patients report that
          nausea from any given dose step subsides within 1-2 weeks
          of continued dosing at that level. By the time the next
          escalation is due (end of week 4), most patients are back
          to baseline GI tolerance and the cycle repeats.
        </li>
        <li>
          <strong>Late course:</strong> by the time the maintenance
          dose is reached (week 16-20 on the standard ramp),
          roughly 50-60% of patients report no ongoing GI symptoms
          [5]. The remaining 40-50% have mild residual effects that
          persist at a stable level.
        </li>
      </ul>

      <p>
        The Wharton 2022 clinical practice review on GI side effect
        management [5] documents that the standard trial-reported
        rates in STEP-1 (for nausea, ~44% at some point during the
        trial) substantially overstate the fraction of patients who
        have ongoing nausea at any given week — most nausea is
        peri-titration and transient.
      </p>

      <h2>Does semaglutide (or tirzepatide) make you tired?</h2>

      <p>
        &ldquo;Does semaglutide make you tired?&rdquo; is one of the
        highest-volume GLP-1 side-effect searches (~3,900/mo per
        Ahrefs). The direct answer from the FDA prescribing
        information tables is: <strong>yes, fatigue is a reported
        adverse event, but at a meaningfully lower rate than the
        GI symptoms</strong>.
      </p>

      <p>
        Specific reported rates from the STEP-1 and <Link href="/drugs/wegovy">Wegovy</Link> label
        adverse reactions table [1, 3]:
      </p>

      <ul>
        <li>
          <strong>Fatigue:</strong> reported in ~11% of STEP-1
          semaglutide-treated patients vs ~5% of placebo, across
          the 68-week trial
        </li>
      </ul>

      <p>
        From the SURMOUNT-1 and <Link href="/drugs/zepbound">Zepbound</Link> label [2, 4]:
      </p>

      <ul>
        <li>
          <strong>Fatigue:</strong> ~7-8% in SURMOUNT-1 tirzepatide
          arms vs ~4% in placebo
        </li>
      </ul>

      <p>
        Fatigue is real, documented, and modestly more common on
        GLP-1 therapy than on placebo. But the <em>attribution</em>{" "}
        is complicated: rapid weight loss by any mechanism is
        associated with fatigue, and GLP-1 patients by definition
        lose weight rapidly. It&apos;s difficult to separate
        drug-specific fatigue from the fatigue of a reduced-calorie
        week with 10-15% more weight loss than placebo.
      </p>

      <h3>Why fatigue happens on GLP-1s</h3>

      <ol>
        <li>
          <strong>Caloric deficit.</strong> The whole point of the
          drug is to reduce caloric intake, and the body responds
          to a 500-1000 kcal/day deficit with predictable fatigue
          during the first few weeks of any such deficit,
          regardless of the mechanism producing it.
        </li>
        <li>
          <strong>Reduced protein intake.</strong> When appetite
          drops, protein intake usually drops disproportionately
          because high-protein foods (eggs, meat, Greek yogurt) are
          more filling and patients can&apos;t eat as much of them.
          Low protein intake worsens fatigue and also accelerates
          lean mass loss — see our{" "}
          <Link href="/research/semaglutide-muscle-mass-loss">
            semaglutide and muscle mass deep-dive
          </Link>{" "}
          for the protein targets.
        </li>
        <li>
          <strong>Dehydration.</strong> GLP-1 patients commonly
          under-drink water because thirst and appetite signals
          are both blunted. Mild chronic dehydration is a major
          fatigue contributor and a fixable one.
        </li>
        <li>
          <strong>Transient nausea-induced reduced sleep.</strong>{" "}
          Nausea that wakes a patient at night (especially in the
          first 1-2 weeks of each dose step) produces sleep
          fragmentation and next-day fatigue.
        </li>
        <li>
          <strong>Vitamin deficiency.</strong> Reduced overall
          intake over months can produce B-vitamin, iron, and
          vitamin D deficiencies that all manifest as fatigue.
          Labwork is the quickest way to screen.
        </li>
      </ol>

      <h3>When fatigue should prompt medical attention</h3>

      <ul>
        <li>
          Fatigue accompanied by dizziness, fainting, or persistent
          lightheadedness — possible dehydration or blood pressure
          drop.
        </li>
        <li>
          Fatigue accompanied by dark urine, reduced urine output,
          or abdominal pain — rule out dehydration-induced kidney
          injury (a documented GLP-1 concern, see Wegovy label
          warnings).
        </li>
        <li>
          Fatigue that doesn&apos;t improve after 4-6 weeks of
          dose stability and corrected protein + hydration.
        </li>
        <li>
          Fatigue with new shortness of breath — rule out cardiac
          or anemia causes unrelated to the GLP-1.
        </li>
      </ul>

      <h2>Does semaglutide or tirzepatide cause hair loss?</h2>

      <p>
        The Ahrefs data shows &ldquo;does tirzepatide cause hair
        loss&rdquo; at 4,200/mo with KD 0 — among the highest-
        volume, lowest-competition queries in the entire GLP-1
        search universe. The answer from the trial data is
        specific and worth understanding.
      </p>

      <p>
        Hair loss rates reported in the FDA prescribing information
        adverse reactions tables [3, 4]:
      </p>

      <ul>
        <li>
          <strong>Wegovy (STEP-1):</strong> alopecia reported in{" "}
          <strong>~3%</strong> of semaglutide-treated patients vs
          ~1% of placebo.
        </li>
        <li>
          <strong>Zepbound (SURMOUNT-1):</strong> alopecia reported
          in <strong>~5%</strong> of tirzepatide-treated patients
          vs ~1% of placebo.
        </li>
      </ul>

      <p>
        Tirzepatide has a numerically higher rate than semaglutide,
        possibly reflecting the larger average weight loss in
        SURMOUNT-1 (~21%) vs STEP-1 (~15%). The important context:
        these rates are almost certainly driven by the weight loss
        itself rather than any drug-specific mechanism.
      </p>

      <h3>Telogen effluvium — the mechanism</h3>

      <p>
        The hair loss pattern that patients report on GLP-1s is
        classic <strong>telogen effluvium</strong> — a reversible
        shedding phase triggered by physiological stress, of which
        rapid weight loss is one of the most consistently
        documented causes [6]. The pattern:
      </p>

      <ol>
        <li>
          <strong>Onset at 2-4 months after starting rapid weight
          loss.</strong> The hair follicles take 2-4 months to
          transition from growth phase to shedding phase after a
          triggering stress, so patients typically don&apos;t
          notice hair loss until they&apos;re already several months
          into GLP-1 therapy.
        </li>
        <li>
          <strong>Diffuse thinning, not patchy.</strong> Telogen
          effluvium produces widespread thinning across the whole
          scalp, not bald patches. If you have bald patches, see
          a dermatologist — it&apos;s a different condition.
        </li>
        <li>
          <strong>Shed lasts 3-6 months, then resolves.</strong>{" "}
          Once the triggering stress (rapid weight loss) stabilizes,
          the hair follicles cycle back into growth phase and the
          shed resolves. Most patients return to baseline hair
          density within 6-12 months of weight stabilization [6].
        </li>
        <li>
          <strong>No permanent damage.</strong> Telogen effluvium
          is reversible. It does not cause permanent hair loss and
          it does not require stopping the medication to resolve.
        </li>
      </ol>

      <h3>What to do if you&apos;re losing hair on a GLP-1</h3>

      <ul>
        <li>
          <strong>Confirm protein intake is adequate</strong>{" "}
          (1.2-1.6 g/kg of lean body mass per day). Low protein
          intake is the most-studied reversible contributor to
          diet-associated telogen effluvium.
        </li>
        <li>
          <strong>Check iron and ferritin.</strong> Iron deficiency
          without anemia is a common hair-loss amplifier in women
          on rapid-weight-loss diets. A simple CBC + ferritin blood
          test screens for it.
        </li>
        <li>
          <strong>Check vitamin D and B12.</strong> Both are
          associated with telogen effluvium when deficient.
        </li>
        <li>
          <strong>Wait.</strong> If labs are normal and protein is
          adequate, the condition is self-limited and resolves
          within 6-12 months of weight stabilization [6]. You do
          not need to stop the GLP-1 to recover.
        </li>
        <li>
          <strong>See a dermatologist</strong> if the shedding is
          patchy, if it lasts longer than 9 months without
          improvement, or if you notice scalp irritation.
          Minoxidil is not typically needed for telogen effluvium
          but can accelerate regrowth in motivated patients.
        </li>
      </ul>

      <h2>Duration reference table</h2>

      <p>
        Combining the STEP-1, SURMOUNT-1, Wegovy label, and Zepbound
        label data, here&apos;s a single-page reference for how long
        each major GLP-1 side effect typically lasts:
      </p>

      <table>
        <thead>
          <tr>
            <th>Side effect</th>
            <th>Typical onset</th>
            <th>Typical duration</th>
            <th>Resolves on its own?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nausea</td>
            <td>Days 1-3 of each dose step</td>
            <td>1-2 weeks per step; &lt;50% of patients by maintenance</td>
            <td>Yes, as body adapts</td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td>Days 1-7 of early dose steps</td>
            <td>1-2 weeks; rare after week 16</td>
            <td>Yes, if nausea resolves</td>
          </tr>
          <tr>
            <td>Diarrhea</td>
            <td>Days 1-7 of dose steps</td>
            <td>Intermittent; improves after maintenance reached</td>
            <td>Usually yes</td>
          </tr>
          <tr>
            <td>Constipation</td>
            <td>Weeks 2-4 of therapy</td>
            <td>May persist longer; manageable with fiber/water</td>
            <td>Usually with intervention</td>
          </tr>
          <tr>
            <td>Fatigue</td>
            <td>Weeks 1-8 of therapy</td>
            <td>
              Weeks to months; improves with protein/hydration
              correction
            </td>
            <td>Usually yes, with support</td>
          </tr>
          <tr>
            <td>Hair loss (telogen effluvium)</td>
            <td>Months 2-4 after starting rapid loss</td>
            <td>3-6 months of shedding, then resolves</td>
            <td>
              <strong>Yes — reversible</strong>, 6-12 months post-
              stabilization
            </td>
          </tr>
          <tr>
            <td>Abdominal pain</td>
            <td>Peri-titration</td>
            <td>Days to 1-2 weeks per step</td>
            <td>Yes; call if severe or persistent</td>
          </tr>
          <tr>
            <td>Injection site reaction</td>
            <td>Within 24-48 hours of injection</td>
            <td>1-3 days per injection</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <h2>Red-flag symptoms that require medical attention</h2>

      <p>
        Most GLP-1 side effects are self-limiting and managed by
        dose-level adjustment, slower titration, and
        protein/hydration support. The following symptoms are
        different — they indicate potentially serious complications
        documented in the Wegovy and Zepbound labels [3, 4] and
        should prompt a call to your prescriber or ER visit:
      </p>

      <ul>
        <li>
          <strong>Severe abdominal pain radiating to the back</strong>{" "}
          (possible pancreatitis — stop the drug, go to ER)
        </li>
        <li>
          <strong>Yellowing of skin or eyes</strong> (gallbladder
          disease — evaluate urgently)
        </li>
        <li>
          <strong>Severe or persistent vomiting with dark urine or
          reduced urine output</strong> (dehydration, potential
          kidney injury)
        </li>
        <li>
          <strong>Signs of severe allergic reaction</strong>{" "}
          (swelling of face/throat, difficulty breathing, severe
          rash) — stop and go to ER immediately
        </li>
        <li>
          <strong>Visual changes in patients with type 2 diabetes</strong>{" "}
          (possible diabetic retinopathy progression)
        </li>
        <li>
          <strong>Neck lump, hoarseness, or difficulty swallowing</strong>{" "}
          — evaluate urgently (rare thyroid C-cell concern, label
          warning)
        </li>
      </ul>

      <h2>Related research and tools</h2>

      <p>
        For the broader side effect rate data, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        . For the onset and time-to-work curves that determine
        when each side effect peaks, see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          how long does GLP-1 take to work guide
        </Link>
        . For the lean-mass preservation protein targets, see our{" "}
        <Link href="/research/semaglutide-muscle-mass-loss">
          semaglutide and muscle mass deep-dive
        </Link>
        . For injection site reactions and rotation technique, see
        our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          where to inject guide
        </Link>
        . For the dose plotter that visualizes how titration
        timing interacts with side-effect cycles, see our{" "}
        <Link href="/tools/glp1-dose-plotter">
          dose plotter
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Does semaglutide or tirzepatide cause hair loss?",
            answer:
              "Hair shedding (telogen effluvium) was reported in about 3% of Wegovy patients vs 1% of placebo in STEP 1, and about 5% of Zepbound patients vs 1% of placebo in SURMOUNT-1. The hair loss is almost always temporary, peaks 2-4 months after rapid weight loss, and is driven by the rate of weight loss rather than the drug itself — it's also seen after bariatric surgery and crash diets. Hair regrows once weight stabilizes.",
          },
          {
            question: "Why am I so tired on a GLP-1?",
            answer:
              "Fatigue on GLP-1 therapy is typically driven by lower caloric intake, dehydration, electrolyte shifts, and reduced protein intake — not by the drug acting on the brain. Strategies that help: prioritize protein (≥1g per pound of goal weight), stay hydrated, replace electrolytes (sodium, potassium, magnesium), and don't skip meals just because hunger is gone. Persistent fatigue beyond the first few weeks should be evaluated for other causes.",
          },
          {
            question: "How long do GLP-1 side effects last?",
            answer:
              "Nausea, constipation, and reflux are usually worst in the first 2-4 weeks after starting and after each dose escalation, then improve as the body adapts. Hair shedding peaks at 2-4 months and resolves by 6-9 months. Fatigue and energy issues typically resolve once protein, hydration, and electrolytes are addressed. Persistent severe side effects are uncommon and warrant a dose reduction or drug change.",
          },
          {
            question: "Can I prevent GLP-1 hair loss?",
            answer:
              "There is no proven prevention, but the strongest mitigation is slowing the rate of weight loss (slower titration, higher protein intake, adequate calories) and ensuring nutritional sufficiency — protein, iron, zinc, biotin, vitamin D. Most hair loss on GLP-1s is reversible and resolves once weight stabilizes; no special treatment is required in most cases.",
          },
          {
            question: "Are GLP-1 side effects worse on tirzepatide than semaglutide?",
            answer:
              "Head-to-head data (SURMOUNT-5) showed similar overall side-effect profiles for tirzepatide and semaglutide, with both causing predominantly GI symptoms (nausea, constipation, diarrhea). Tirzepatide may produce slightly more GI side effects at the highest doses, but the difference is small. Hair loss and fatigue rates are comparable.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
