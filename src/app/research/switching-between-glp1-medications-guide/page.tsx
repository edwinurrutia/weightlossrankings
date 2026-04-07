import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "switching-between-glp1-medications-guide";

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

export default function SwitchingGuideArticle() {
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
    {
      authors:
        "Wharton S, Davies M, Dicker D, Lingvay I, Mosenzon O, Rubino DM, Pedersen SD.",
      title:
        "Managing the gastrointestinal side effects of GLP-1 receptor agonists in obesity: recommendations for clinical practice.",
      source: "Postgraduate Medicine",
      year: 2022,
      pmid: "36177722",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Switching between GLP-1 medications is increasingly common:
        patients plateau on semaglutide and want to try tirzepatide,
        commercial insurance starts covering Zepbound so patients
        move off Wegovy, a compounded vial supply problem pushes
        patients back to brand-name pens, or the new Foundayo (oral
        orforglipron) becomes an option for patients who hate
        injections. Each switching scenario has a different
        protocol, a different washout period, and different
        dose-mapping considerations. This guide walks through every
        common switch with the FDA-label-supported washout timing
        and the practical dose equivalence tables. <strong>Any
        actual switching decision belongs between you and your
        prescriber</strong> — this is an educational explainer,
        not a dose recommendation.
      </p>

      <h2>Can you switch between GLP-1s?</h2>

      <p>
        Yes, switching is clinically routine and happens for several
        legitimate reasons [5]:
      </p>

      <ul>
        <li>
          <strong>Plateau or non-response.</strong> A patient on
          semaglutide 2.4 mg at maintenance who has truly stopped
          losing weight after week 40 may benefit from switching to
          tirzepatide, which produced larger mean weight loss in
          SURMOUNT-1 than STEP-1 reported for semaglutide [1, 2].
        </li>
        <li>
          <strong>Insurance coverage changes.</strong> The most
          common real-world reason. An employer adds Zepbound to
          the formulary, or Wegovy goes off, or a patient moves to
          a plan with different anti-obesity drug coverage, and
          they need to switch drugs mid-therapy.
        </li>
        <li>
          <strong>Side effect intolerance.</strong> Some patients
          tolerate tirzepatide&apos;s GI side-effect profile better
          than semaglutide, or vice versa. Switching is the clean
          way to test the other option.
        </li>
        <li>
          <strong>Supply shortages.</strong> Compounded supply can
          become unreliable when 503A pharmacies cycle on and off
          the FDA shortage list, pushing patients onto brand-name
          pens. Brand-name supply has also had intermittent
          shortages.
        </li>
        <li>
          <strong>Price changes.</strong> The Foundayo launch at
          $149/month self-pay has created a new price floor that
          will drive some patients off compounded vials.
        </li>
      </ul>

      <h2>General switching principles</h2>

      <p>
        Across every scenario, a few common rules apply [3, 4, 5]:
      </p>

      <ol>
        <li>
          <strong>Don&apos;t combine GLP-1s.</strong> Both the
          Wegovy and Zepbound prescribing information explicitly
          say: do not use the drug in combination with any other
          GLP-1 receptor agonist [3, 4]. When switching, the old
          drug stops and the new drug starts — no overlap.
        </li>
        <li>
          <strong>Time the switch to your next scheduled
          injection.</strong> Both semaglutide and tirzepatide are
          weekly drugs with ~5-7 day half-lives [3, 4]. The cleanest
          switch happens at the natural weekly injection point —
          skip the next dose of the old drug and take the first
          dose of the new drug in its place.
        </li>
        <li>
          <strong>Restart the titration ramp on the new drug.</strong>{" "}
          The FDA-approved titration schedules exist to let the
          GI tract adapt to the GLP-1 mechanism. Even if you were
          already at maintenance on the old drug, the new drug
          should start at its lowest approved dose (0.25 mg for
          semaglutide; 2.5 mg for tirzepatide) and ramp up on the
          standard 4-week schedule [3, 4]. Skipping the ramp
          produces predictable severe nausea.
        </li>
        <li>
          <strong>Do not expect the titration period to be
          &ldquo;wasted time.&rdquo;</strong> Patients switching
          from maintenance-dose sema to tirz assume they&apos;ll
          just continue losing weight on the new drug&apos;s
          starter dose. In practice, during the 16-20 weeks it
          takes to re-titrate, weight loss slows significantly —
          you may even see a small regain during the early ramp
          weeks. This is expected and the curve usually catches up
          once maintenance is reached on the new drug.
        </li>
      </ol>

      <h2>Scenario 1: Semaglutide → Tirzepatide (the most common switch)</h2>

      <p>
        This is the most-searched switching scenario (~600 combined
        monthly Google queries for &ldquo;can you switch from
        semaglutide to tirzepatide&rdquo; and variants). Typical
        patient profile: on Wegovy 2.4 mg or Ozempic for weight
        loss, plateaued or wants larger effect, insurance now
        covers Zepbound.
      </p>

      <h3>Protocol</h3>

      <ol>
        <li>
          <strong>Finalize with your prescriber.</strong> They
          write a new tirzepatide prescription and cancel the
          remaining semaglutide refills (or advise you to discard
          remaining doses).
        </li>
        <li>
          <strong>Take your last semaglutide dose on your regular
          injection day.</strong> This is day 0.
        </li>
        <li>
          <strong>One week later (day 7 — your next scheduled
          injection day), start tirzepatide 2.5 mg.</strong> This
          is the FDA-approved starter dose for Zepbound [4]. Do
          not start at a higher dose even if you were on maintenance
          semaglutide — the tirzepatide titration schedule exists
          for GI tolerance and skipping it produces severe nausea.
        </li>
        <li>
          <strong>Follow the standard tirzepatide titration ramp:</strong>{" "}
          2.5 mg for 4 weeks → 5 mg for 4 weeks → 7.5 mg for 4 weeks
          → 10 mg for 4 weeks → 12.5 mg for 4 weeks → 15 mg
          maintenance [4]. Most prescribers settle patients at 10
          mg or 15 mg depending on response and tolerability.
        </li>
      </ol>

      <h3>What to expect</h3>

      <ul>
        <li>
          <strong>Weeks 1-4 on 2.5 mg:</strong> Mild GI symptoms
          (nausea especially in days 1-3). Appetite suppression
          may feel weaker than you remember on maintenance
          semaglutide because you&apos;re back at the lowest dose.
        </li>
        <li>
          <strong>Weeks 4-8 on 5 mg:</strong> Appetite suppression
          strengthens. You should feel similar to where you were
          on 1 mg semaglutide.
        </li>
        <li>
          <strong>Weeks 12-16 (on 7.5 to 10 mg):</strong> You
          generally match or exceed your previous semaglutide
          effect.
        </li>
        <li>
          <strong>Weeks 20-24 (10-15 mg maintenance):</strong> You
          reach the full tirzepatide effect. Expected continued
          loss from this point forward if you still have additional
          fat mass to lose.
        </li>
      </ul>

      <h2>Scenario 2: Tirzepatide → Semaglutide</h2>

      <p>
        Less common than sema → tirz, but happens for insurance
        reasons or when tirzepatide side effects are intolerable
        and the patient wants to try the (slightly milder but
        similar) semaglutide.
      </p>

      <h3>Protocol</h3>

      <ol>
        <li>
          <strong>Take your last tirzepatide dose on your regular
          day.</strong>
        </li>
        <li>
          <strong>One week later, start semaglutide 0.25 mg.</strong>{" "}
          FDA-approved starter dose for Wegovy and Ozempic [3].
        </li>
        <li>
          <strong>Standard semaglutide titration ramp:</strong>{" "}
          0.25 mg for 4 weeks → 0.5 mg → 1 mg → 1.7 mg → 2.4 mg
          maintenance (Wegovy) or 2 mg maintenance (Ozempic).
        </li>
      </ol>

      <p>
        Expect weight loss to be modestly smaller than it was on
        tirzepatide at equivalent timepoints based on the
        trial-arm comparisons [1, 2], but with potentially better
        GI tolerability at maintenance.
      </p>

      <h2>Scenario 3: Ozempic → Wegovy (same drug, different label)</h2>

      <p>
        Ozempic and Wegovy are both semaglutide manufactured by
        Novo Nordisk — same molecule, same manufacturer, different
        FDA labels and different maximum doses [3]. Ozempic&apos;s
        diabetes label caps at 2 mg weekly; Wegovy&apos;s weight-
        management label goes up to 2.4 mg weekly. The switch is
        primarily about insurance (Ozempic often covered for T2D
        patients, Wegovy for obesity).
      </p>

      <h3>Protocol</h3>

      <ol>
        <li>
          If already at Ozempic 2 mg, continue at the same dose
          level when switching to Wegovy pens. Your prescriber
          should dispense Wegovy 2 mg pens to start, then escalate
          to 2.4 mg after 4 weeks if additional loss is desired.
        </li>
        <li>
          If on a lower Ozempic dose (0.5 mg, 1 mg), continue at
          the same dose level when switching to Wegovy — the
          molecule is identical, so there&apos;s no need to
          re-titrate from the starter dose.
        </li>
      </ol>

      <p>
        This is the cleanest switch in the category: no washout,
        no re-titration, just a pharmacy/insurance change.
      </p>

      <h2>Scenario 4: Wegovy → Zepbound (or vice versa)</h2>

      <p>
        This is a <em>different-molecule</em> switch (semaglutide
        to tirzepatide), so treat it like Scenario 1 — last
        semaglutide dose, skip one week, start tirzepatide at
        2.5 mg and ramp up. The commercial-insurance reality in
        2026 is that many plans now cover Zepbound specifically
        for weight management, which is pushing many Wegovy
        patients to switch.
      </p>

      <h2>Scenario 5: Brand-name → Compounded</h2>

      <p>
        Patients who can&apos;t afford brand-name pens often move
        to compounded vials through a telehealth provider. The
        same-molecule rule applies:
      </p>

      <ul>
        <li>
          <strong>Wegovy/Ozempic → compounded semaglutide:</strong>{" "}
          Same molecule. Continue at the same mg dose level. The
          main operational change is the injection format (pen →
          vial with insulin syringe), which requires learning the
          unit-vs-mg conversion (see our{" "}
          <Link href="/tools/glp1-unit-converter">
            unit converter
          </Link>
          ).
        </li>
        <li>
          <strong>Zepbound/Mounjaro → compounded tirzepatide:</strong>{" "}
          Same molecule. Same dose continuation. Same operational
          change to the vial-and-syringe format.
        </li>
      </ul>

      <p>
        The clinical switch is trivial because the active drug is
        the same. The technical switch (learning to draw a dose
        from a vial with an insulin syringe) is the main new
        thing to adapt to. See our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          pen vs compounded vial deep-dive
        </Link>{" "}
        for the full operational comparison.
      </p>

      <h2>Scenario 6: Compounded → Brand-name</h2>

      <p>
        Patients switching back to brand-name pens (usually
        because they got insurance coverage, or because of
        quality concerns about a specific compounding pharmacy).
        Same rules as the reverse: same molecule, same dose, new
        delivery format.
      </p>

      <h2>Scenario 7: Injectable → Foundayo (oral orforglipron)</h2>

      <p>
        Foundayo was FDA-approved in April 2026 and is a different
        molecule than semaglutide or tirzepatide — it&apos;s a
        non-peptide small-molecule GLP-1 agonist. Patients switching
        from injectable sema or tirz to oral Foundayo are making
        both a drug change and a delivery-format change.
      </p>

      <h3>Protocol</h3>

      <ol>
        <li>
          Take your last injectable dose on the regular day.
        </li>
        <li>
          Skip one week, then start Foundayo 0.8 mg orally once
          daily (the FDA-approved starter dose).
        </li>
        <li>
          Follow the Foundayo titration ramp: 0.8 mg → 2.5 mg →
          5.5 mg → 9 mg → 14.5 mg → 17.2 mg, increased every 4
          weeks.
        </li>
      </ol>

      <p>
        Expect the full effect to be smaller than injectable
        tirzepatide (~12% vs ~21% at comparable timepoints based
        on ATTAIN-1 vs SURMOUNT-1) but with the convenience of a
        daily pill with no food restrictions. See our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo approval deep-dive
        </Link>{" "}
        for the full trial data.
      </p>

      <h2>Dose-equivalence reference table</h2>

      <p>
        There is no formal FDA-approved dose equivalence between
        semaglutide and tirzepatide — they target different
        receptors and the dose-response curves aren&apos;t
        directly mappable. But from the STEP-1 and SURMOUNT-1
        trial arms at roughly equivalent weight-loss endpoints, a
        rough operational mapping looks like this:
      </p>

      <table>
        <thead>
          <tr>
            <th>Semaglutide dose (mg weekly)</th>
            <th>≈ Equivalent tirzepatide dose (mg weekly)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0.25 mg (starter)</td>
            <td>2.5 mg (starter)</td>
          </tr>
          <tr>
            <td>0.5 mg</td>
            <td>5 mg</td>
          </tr>
          <tr>
            <td>1.0 mg</td>
            <td>7.5 mg</td>
          </tr>
          <tr>
            <td>1.7 mg</td>
            <td>10 mg</td>
          </tr>
          <tr>
            <td>2.4 mg (Wegovy maintenance)</td>
            <td>12.5–15 mg</td>
          </tr>
        </tbody>
      </table>

      <p>
        This is a rough operational mapping for patient-side
        expectation management, not a prescribing guide. Your
        prescriber will decide the specific dose based on your
        history, tolerability, and response.
      </p>

      <h2>Common switching mistakes to avoid</h2>

      <ol>
        <li>
          <strong>Combining two GLP-1s.</strong> Both drugs&apos;
          FDA labels prohibit this [3, 4]. Do not take your last
          semaglutide dose and the first tirzepatide dose on the
          same day. Skip the next scheduled dose of the old drug.
        </li>
        <li>
          <strong>Skipping the new drug&apos;s titration ramp.</strong>{" "}
          &ldquo;I was at maintenance on the old drug so I&apos;ll
          start the new one at maintenance too&rdquo; — this
          produces severe nausea and frequently leads to
          discontinuation. The titration schedule exists because
          the GI tract needs to re-adapt to the new molecule, not
          because the nervous system needs to re-adapt to GLP-1
          signaling in general.
        </li>
        <li>
          <strong>Not understanding the weight-loss pause during
          re-titration.</strong> The 16-20 week ramp on the new
          drug usually produces slower weight loss or even minor
          regain before the curve catches up. This is not a
          failure — it&apos;s the shape of the curve. See our{" "}
          <Link href="/research/how-long-does-glp1-take-to-work">
            onset guide
          </Link>{" "}
          for week-by-week expectations.
        </li>
        <li>
          <strong>Switching drugs when the real problem is
          technique.</strong> Many patients who think they&apos;ve
          plateaued have actually developed lipohypertrophy at a
          favorite injection site, or are miscalculating the
          unit-to-mg conversion on a compounded vial. Fix those
          first. See our{" "}
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            plateau guide
          </Link>
          .
        </li>
      </ol>

      <h2>Related research and tools</h2>

      <p>
        For the brand-name cheat sheet that disambiguates which
        product equals which molecule, see our{" "}
        <Link href="/research/wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet">
          brand cheat sheet
        </Link>
        . For the plateau diagnosis flow that determines whether
        you should actually switch, see our{" "}
        <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
          plateau guide
        </Link>
        . For the unit-vs-mg conversion when switching from pens
        to compounded vials (or back), use our{" "}
        <Link href="/tools/glp1-unit-converter">
          unit converter
        </Link>
        . For the expected week-by-week curve on each drug, use
        our{" "}
        <Link href="/tools/glp1-weight-loss-calculator">
          weight loss calculator
        </Link>
        . For the injection technique that stays the same across
        all switches, see our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          injection guide
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
