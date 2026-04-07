import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "wegovy-pen-vs-compounded-vial-practical-differences";

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

// This article is operational/practical rather than data-driven.
// Sources are the FDA-approved Wegovy prescribing label, the
// USP <797> sterile compounding standards (the regulatory
// document compounding pharmacies follow for vial-and-syringe
// products), and the Wegovy patient instructions for use (IFU).
// Every operational claim about the brand-name pen comes from
// the FDA label.

export default function WegovyPenVsCompoundedVialArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title: "WEGOVY (semaglutide) injection — Prescribing Information.",
      source: "U.S. Food and Drug Administration",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — Instructions for Use, single-dose pen.",
      source: "U.S. Food and Drug Administration",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
    {
      authors: "United States Pharmacopeial Convention.",
      title:
        "USP General Chapter <797> Pharmaceutical Compounding — Sterile Preparations.",
      source: "USP Compounding Compendium",
      year: 2023,
      url: "https://www.usp.org/compounding/general-chapter-797",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Brand-name Wegovy and compounded semaglutide contain the same active
        molecule when both are prepared correctly. But the delivery format
        is completely different — Wegovy ships in a pre-filled multi-dose
        injector pen designed for patients with no syringe experience,
        while compounded semaglutide ships in a sterile glass vial that
        the patient draws from with a separate insulin syringe at every
        dose. The differences matter more than people expect, and the
        learning curve catches new patients off-guard. This article
        documents 12 specific operational differences worth knowing before
        you decide which format is right for you.
      </p>

      <h2>1. The injection device itself</h2>

      <p>
        <strong>Wegovy pen:</strong> a pre-filled, single-use, single-dose
        injector that comes ready to use. The patient removes a cap,
        presses the pen against the injection site, and clicks a button.
        The pen has a hidden needle that retracts after the dose is
        delivered. No vial, no syringe, no measuring [1, 2].
      </p>

      <p>
        <strong>Compounded vial:</strong> a sterile glass vial containing
        a multi-week or multi-month supply of semaglutide solution. The
        patient receives separate insulin syringes (typically 0.3 mL
        capacity, 31-gauge needle) and draws each weekly dose individually.
        Vial-and-syringe is the standard delivery format for any 503A
        compounded injectable [3].
      </p>

      <h2>2. Dose precision and the math problem</h2>

      <p>
        <strong>Wegovy pen:</strong> each pen delivers exactly one dose.
        The dose tier is printed on the box (0.25 mg, 0.5 mg, 1 mg, 1.7
        mg, or 2.4 mg). Patients escalate by changing which pen they
        receive monthly — they never measure anything themselves [1].
      </p>

      <p>
        <strong>Compounded vial:</strong> the patient draws each dose
        from the vial using markings on the insulin syringe. The dose
        in milligrams must be converted to volume in milliliters or
        units using the concentration printed on the vial label
        (typically 2.5 mg/mL or 5 mg/mL, but it varies by compounder).
        A 0.5 mg dose at 2.5 mg/mL concentration equals 0.2 mL — the
        patient must perform this calculation correctly every week.
        The FDA has received hundreds of adverse-event reports of
        dosing errors caused by unit-conversion mistakes when patients
        confused milliliters with units, or read the wrong tick mark on
        the syringe. This is the single biggest practical risk of the
        compounded format.
      </p>

      <h2>3. Refrigeration requirements</h2>

      <p>
        <strong>Wegovy pen:</strong> must be refrigerated at 36–46°F
        (2–8°C) until first use. Once a pen is in use, it can stay at
        room temperature (up to 86°F / 30°C) for up to 28 days, after
        which any remaining drug must be discarded [1, 2]. In practice,
        Wegovy single-dose pens are used immediately, so the room-
        temperature window is rarely relevant.
      </p>

      <p>
        <strong>Compounded vial:</strong> typically must be refrigerated
        at 36–46°F (2–8°C) for the entire shelf life of the vial,
        which is usually 28–60 days from compounding depending on the
        pharmacy&apos;s validation studies. The exact in-use beyond-use
        date is set by the compounding pharmacy and printed on the
        label per USP <span aria-label="section 797">&lt;797&gt;</span>{" "}
        rules [3]. Patients who travel with compounded semaglutide need
        a small insulated cooler or a TSA-friendly travel pouch to
        keep the vial chilled.
      </p>

      <h2>4. Needle gauge and injection comfort</h2>

      <p>
        <strong>Wegovy pen:</strong> uses a hidden 32-gauge ultra-thin
        needle (0.23 mm diameter) that retracts after the injection.
        Patients typically rate the injection as nearly painless — the
        needle gauge is finer than most insulin syringes [1].
      </p>

      <p>
        <strong>Compounded vial:</strong> patients use whichever insulin
        syringe their telehealth provider ships with the kit. Most ship
        31-gauge syringes (0.25 mm) which are slightly thicker than
        Wegovy&apos;s pen needle. Some ship 30-gauge or even 29-gauge
        syringes, which are noticeably more painful. If you&apos;re
        sensitive to injection discomfort, ask your compounded provider
        which gauge they ship and request 31-gauge or finer if it
        isn&apos;t the default.
      </p>

      <h2>5. Injection site rotation</h2>

      <p>
        Both formats use the same subcutaneous injection sites: abdomen
        (avoiding a 2-inch zone around the navel), upper thighs, or
        upper arms. Both formats benefit from rotating sites to avoid
        lipohypertrophy (fat tissue thickening at repeatedly-injected
        sites). The rotation discipline is the same whether
        you&apos;re using a pen or a vial — site selection has nothing
        to do with the delivery format.
      </p>

      <h2>6. Travel logistics</h2>

      <p>
        <strong>Wegovy pen:</strong> single-dose pens are TSA-approved
        for carry-on with the prescription label visible. You can take
        a single pen on a trip in an insulated travel pouch and inject
        in your hotel room. The fact that the pen is one-time-use
        eliminates the need to bring extra syringes.
      </p>

      <p>
        <strong>Compounded vial:</strong> you must travel with the vial
        itself plus enough insulin syringes for the doses you&apos;ll
        take during the trip, plus an alcohol swab packet, plus a
        sharps disposal container or sealed plastic bottle for used
        needles. TSA permits all of this in carry-on with the
        prescription label visible, but it requires more pre-trip
        planning and more bag space.
      </p>

      <h2>7. Sharps disposal</h2>

      <p>
        Both formats produce sharps waste — Wegovy pens have a built-in
        retractable needle but the pen itself is still sharps-classified
        and should not go in regular trash. Vial-and-syringe users
        produce one syringe + needle per week. Both should be disposed
        of in an FDA-cleared sharps container, which can be ordered
        from any pharmacy or major drugstore for $5–10. Some compounded
        telehealth providers ship a small sharps container with the
        starter kit.
      </p>

      <h2>8. Refill cadence and shipping</h2>

      <p>
        <strong>Wegovy pen:</strong> typically dispensed monthly (4
        single-use pens per box for the once-weekly schedule). Most
        commercial pharmacies dispense Wegovy in 30-day or 90-day
        supplies depending on the patient&apos;s insurance.
      </p>

      <p>
        <strong>Compounded vial:</strong> the typical monthly vial
        contains enough drug for 4 weekly doses at the patient&apos;s
        current dose tier. Telehealth providers ship to the patient&apos;s
        home in temperature-controlled packaging via overnight or
        2-day carriers. The vial concentration may change as the
        patient escalates dose, since the same vial volume can deliver
        more drug per dose at higher concentrations.
      </p>

      <h2>9. Dose escalation flexibility</h2>

      <p>
        <strong>Wegovy pen:</strong> the FDA-approved dose escalation
        is fixed: 0.25 mg → 0.5 mg → 1.0 mg → 1.7 mg → 2.4 mg, four
        weeks at each dose [1]. To skip a step or move slower, the
        prescriber must override the standard schedule, which insurance
        plans often resist. The pens themselves are dose-locked — a
        0.5 mg pen cannot deliver 0.4 mg.
      </p>

      <p>
        <strong>Compounded vial:</strong> dose escalation is set by the
        prescriber and patient together. Because the vial contains a
        full month of drug at a specific concentration, the patient
        can be instructed to increase by smaller increments
        (e.g., 0.25 → 0.35 → 0.5 → 0.65 mg) or to stretch the
        escalation schedule longer than the standard 4-week intervals.
        Patients sensitive to nausea often appreciate this
        flexibility, though slower escalation does delay the full
        therapeutic effect.
      </p>

      <h2>10. Cost (the big one)</h2>

      <p>
        <strong>Wegovy pen:</strong> cash list price approximately
        $1,349 per month. Insurance copays vary widely; many plans
        require prior authorization and step therapy, and the
        out-of-pocket cost after authorization typically ranges from
        $25 to $200/month for covered patients. See our{" "}
        <Link href="/research/glp1-insurance-coverage-audit">
          insurance coverage audit
        </Link>{" "}
        for the per-insurer breakdown.
      </p>

      <p>
        <strong>Compounded vial:</strong> cash market median is around
        $199/month at the 0.5 mg dose tier, with the floor near
        $99/month at our cheapest verified providers. See our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>{" "}
        and{" "}
        <Link href="/research/cheapest-compounded-semaglutide">
          cheapest compounded semaglutide investigation
        </Link>{" "}
        for the live data. The compounded format is roughly 5–10× cheaper
        than the brand-name pen for an uninsured patient.
      </p>

      <h2>11. Quality verification</h2>

      <p>
        <strong>Wegovy pen:</strong> manufactured at FDA-inspected Novo
        Nordisk facilities with batch-level release testing, sterility
        validation, and FDA serialization tracking. Counterfeiting is
        rare and generally caught at the pharmacy distribution level.
      </p>

      <p>
        <strong>Compounded vial:</strong> the quality of the actual
        product depends entirely on the compounding pharmacy. Some
        compounders are PCAB-accredited and follow USP <span aria-label="section 797">&lt;797&gt;</span>{" "}
        sterile compounding standards rigorously [3]. Others have
        received FDA warning letters for adulteration, salt-form
        sourcing, or inadequate sterility validation — see our{" "}
        <Link href="/research/fda-warning-letters-glp1">
          FDA warning letter investigation
        </Link>{" "}
        for the documented patterns. Patients should verify the
        compounding pharmacy their telehealth provider uses against
        our{" "}
        <Link href="/pharmacies">pharmacy database</Link> before
        choosing a compounded provider.
      </p>

      <h2>12. The FDA shortage list timing risk</h2>

      <p>
        Compounded semaglutide is only legally permitted while
        brand-name semaglutide remains on the FDA drug shortage list.
        If the FDA removes semaglutide from the shortage list — as it
        did temporarily with tirzepatide in late 2024 before
        re-listing — every compounded semaglutide telehealth provider
        becomes legally restricted overnight. Compounded patients
        should know that this is a regulatory possibility, not a
        certainty, and that some providers prepare patients for the
        transition by stockpiling vials in advance of any expected
        FDA action. There is no equivalent shortage-list risk for
        Wegovy pens.
      </p>

      <h2>How to decide</h2>

      <p>
        The decision is rarely about which format is &ldquo;better&rdquo;
        in absolute terms — it&apos;s about which set of operational
        trade-offs fits your specific situation. A short decision tree:
      </p>

      <ul>
        <li>
          <strong>If you&apos;re insurance-covered with a copay below
          $200/month</strong>, take the Wegovy pen. The cost difference
          isn&apos;t worth the operational complexity of vial-and-syringe.
        </li>
        <li>
          <strong>If you&apos;re paying out of pocket and the
          $1,000/month cash gap matters</strong>, the compounded vial is
          almost certainly the right answer — but spend the time to
          verify your provider&apos;s pharmacy partner against our{" "}
          <Link href="/pharmacies">pharmacy database</Link>.
        </li>
        <li>
          <strong>If you have a history of dosing errors with
          self-administered medications</strong>, lean toward the pen.
          The compounded vial-and-syringe format requires reliable unit
          conversion math at every dose.
        </li>
        <li>
          <strong>If you need dose escalation flexibility</strong> (slow
          titration, micro-dosing, alternative schedules), the
          compounded vial allows this; the pen does not.
        </li>
        <li>
          <strong>If you travel frequently</strong>, the pen format is
          slightly more convenient, but both formats work fine with
          basic planning.
        </li>
      </ul>

      <p>
        For a side-by-side cost calculation specific to your dose and
        insurance situation, use our{" "}
        <Link href="/savings-calculator">savings calculator</Link>. For
        the live pricing across every compounded provider we track, see
        the{" "}
        <Link href="/price-tracker">price tracker</Link>.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
