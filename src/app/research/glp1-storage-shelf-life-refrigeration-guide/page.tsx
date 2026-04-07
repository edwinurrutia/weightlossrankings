import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "glp1-storage-shelf-life-refrigeration-guide";

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

// Every storage rule in this article was sourced directly from the
// "How should I store..." sections of the FDA-approved prescribing
// information PDFs for Wegovy, Ozempic, Zepbound, and Mounjaro. The
// USP <797> beyond-use-date guidance for compounded preparations is
// from the USP General Chapter, which is what 503A pharmacies must
// follow when assigning BUDs to compounded GLP-1 vials.

export default function StorageGuideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 16: How Supplied / Storage and Handling.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information, Section 16: How Supplied / Storage and Handling.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 16: How Supplied / Storage and Handling.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatide) injection — US Prescribing Information, Section 16: How Supplied / Storage and Handling.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
    },
    {
      authors: "U.S. Pharmacopeial Convention.",
      title:
        "USP General Chapter <797> Pharmaceutical Compounding — Sterile Preparations: Beyond-Use Dating.",
      source: "USP-NF",
      year: 2023,
      url: "https://www.usp.org/compounding/general-chapter-797",
    },
    {
      authors:
        "Transportation Security Administration (TSA).",
      title:
        "Medications: Carry-On and Checked Baggage Rules for Refrigerated Drugs and Injectable Medications.",
      source: "TSA.gov",
      year: 2025,
      url: "https://www.tsa.gov/travel/special-procedures/traveling-medical-conditions",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        GLP-1 storage rules are not common knowledge and the FDA
        labels are buried inside multi-page prescribing information
        PDFs. Patients consistently search for &ldquo;does semaglutide
        need to be refrigerated,&rdquo; &ldquo;how long does
        tirzepatide last in the fridge,&rdquo; and &ldquo;does
        semaglutide expire&rdquo; — and the answers are different
        for each drug, different for unopened vs in-use pens, and
        different again for compounded vials. This reference walks
        through the actual approved storage rules for Wegovy, Ozempic,
        Zepbound, and Mounjaro pens, the typical compounding-pharmacy
        beyond-use-date assignments, what to do if your medication
        was accidentally frozen or left at room temperature too long,
        and how to fly with a GLP-1.
      </p>

      <h2>Quick reference: storage rules at a glance</h2>

      <p>
        Sourced directly from the &ldquo;How Supplied / Storage and
        Handling&rdquo; section of each FDA-approved prescribing
        information document [1, 2, 3, 4]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Refrigerated (unopened)</th>
            <th>Room temp (after first use)</th>
            <th>Freeze?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wegovy (semaglutide 2.4 mg)</td>
            <td>2-8°C (36-46°F) until expiration on label</td>
            <td>Up to 28 days at ≤30°C (86°F)</td>
            <td>
              <strong>Never</strong> — discard if frozen
            </td>
          </tr>
          <tr>
            <td>Ozempic (semaglutide)</td>
            <td>2-8°C (36-46°F) until expiration on label</td>
            <td>Up to 56 days at ≤30°C (86°F) after first use</td>
            <td>
              <strong>Never</strong> — discard if frozen
            </td>
          </tr>
          <tr>
            <td>Zepbound (tirzepatide)</td>
            <td>2-8°C (36-46°F) until expiration on label</td>
            <td>Up to 21 days at ≤30°C (86°F)</td>
            <td>
              <strong>Never</strong> — discard if frozen
            </td>
          </tr>
          <tr>
            <td>Mounjaro (tirzepatide)</td>
            <td>2-8°C (36-46°F) until expiration on label</td>
            <td>Up to 21 days at ≤30°C (86°F)</td>
            <td>
              <strong>Never</strong> — discard if frozen
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Three things stand out from the table: (1) all four drugs are
        <strong> normally refrigerated</strong> until first use, (2)
        the room-temperature window after first use varies meaningfully
        — Ozempic gets a much longer 56-day window than Wegovy&apos;s
        28 days even though they&apos;re the same active ingredient,
        and (3) <strong>none of the four can be frozen</strong>. If
        your medication was accidentally frozen at any point, the
        FDA labels say to discard it, even if it has thawed and looks
        normal [1, 2, 3, 4].
      </p>

      <h2>Why Wegovy is 28 days but Ozempic is 56 days</h2>

      <p>
        Both Wegovy and Ozempic contain semaglutide, manufactured by
        the same company, in the same multi-dose pre-filled pen
        format. Why does Ozempic get a longer room-temperature window?
        The short answer is that the room-temperature stability data
        package the manufacturer submitted to the FDA differs between
        the two drugs because the doses and the in-use scenarios are
        different. The Ozempic pen delivers up to several months of
        diabetes therapy from a single pen; the Wegovy pen is a
        single-use higher-dose injector. The 56-day Ozempic window
        reflects the actual stability data Novo Nordisk generated
        for that specific dose-and-pen combination [1, 2]. From a
        patient perspective, follow whichever number applies to{" "}
        <em>your specific drug</em>, not the other one.
      </p>

      <h2>Compounded GLP-1 vials: different rules</h2>

      <p>
        Compounded semaglutide and tirzepatide vials follow{" "}
        <strong>different storage rules</strong> than the brand-name
        pens because they are prepared as patient-specific
        compounded preparations under USP General Chapter &lt;797&gt;
        rather than as FDA-approved manufactured products [5]. The
        compounding pharmacy assigns a beyond-use date (BUD) when the
        vial leaves the pharmacy, and that BUD is what you should
        rely on — not the FDA pen labels above.
      </p>

      <p>
        Typical compounded GLP-1 BUD assignments:
      </p>

      <ul>
        <li>
          <strong>Refrigerated (2-8°C):</strong> 28-90 days from the
          compounding date, depending on the pharmacy&apos;s
          stability documentation and the specific concentration.
          Many 503A pharmacies assign 90 days for compounded
          semaglutide at 2.5 mg/mL refrigerated.
        </li>
        <li>
          <strong>Room temperature (15-25°C):</strong> typically not
          recommended for compounded preparations beyond a few days
          unless the pharmacy has documented stability at room temp
          for the specific formulation. Always refrigerate
          compounded vials between doses.
        </li>
        <li>
          <strong>Freezing:</strong> as with brand-name, do not
          freeze. Freezing destabilizes the peptide.
        </li>
      </ul>

      <p>
        The single source of truth for your compounded vial is the
        BUD label printed by the compounding pharmacy. If your
        pharmacy didn&apos;t include a BUD on the vial, call them
        and ask — under USP &lt;797&gt; the pharmacy is required to
        document and assign one [5].
      </p>

      <h2>What to do if your medication was left out too long</h2>

      <p>
        Three common scenarios and the FDA-approved answer for each:
      </p>

      <ol>
        <li>
          <strong>The pen sat at room temperature longer than the
          allowed window.</strong> If you have a Wegovy pen that was
          out of the fridge for more than 28 days (Wegovy/Zepbound/
          Mounjaro) or more than 56 days (Ozempic), the
          FDA-approved answer is to discard the pen even if it
          looks normal [1, 2, 3, 4]. The peptide degrades over time
          at room temperature in a way that may not be visible.
        </li>
        <li>
          <strong>The pen sat in a hot car (above 30°C / 86°F).</strong>{" "}
          The room-temperature limits in the table apply only at or
          below 30°C. Brief exposure to higher temperatures (a hot
          car for 30-60 minutes) is not directly addressed in the
          labels but is generally believed to be tolerable; sustained
          exposure (multiple hours, repeated days) is not.
          Conservative call: discard and replace.
        </li>
        <li>
          <strong>The pen was accidentally frozen.</strong> Discard.
          Even if the pen has thawed and the contents look clear,
          the FDA labels are unambiguous on this point — frozen GLP-1
          should not be used [1, 2, 3, 4].
        </li>
      </ol>

      <h2>How to fly with a GLP-1</h2>

      <p>
        TSA explicitly allows refrigerated injectable medications and
        the necessary cooling supplies through airport security in
        carry-on baggage [6]. Specific rules:
      </p>

      <ul>
        <li>
          <strong>Carry-on, not checked baggage.</strong> Checked
          baggage holds can reach freezing temperatures at altitude,
          which would destroy a GLP-1. Always carry the medication
          on with you.
        </li>
        <li>
          <strong>Insulated travel case + ice pack.</strong> A
          standard insulin/diabetic travel case with a refreezable
          ice pack works for trips up to about 8-12 hours.
          Do not let the ice pack directly contact the pen — wrap
          it in a cloth or use a case that has an insulated divider
          to prevent freezing.
        </li>
        <li>
          <strong>TSA notification.</strong> You don&apos;t need a
          prescription to bring injectables through security, but
          carrying the original pharmacy label or your doctor&apos;s
          note avoids questions. Declare the medication to the TSA
          officer at the start of screening if asked.
        </li>
        <li>
          <strong>At the destination.</strong> Refrigerate
          immediately on arrival. Hotel mini-fridges work; if the
          fridge has only a freezer compartment, use the back of
          the main fridge, not the freezer.
        </li>
      </ul>

      <h2>Does semaglutide expire?</h2>

      <p>
        Yes. The expiration date printed on the carton (for
        unopened pens) reflects the manufacturer&apos;s tested
        stability under refrigerated storage. After that date, the
        FDA labels say not to use the drug [1, 2]. For
        compounded vials, the BUD set by the pharmacy serves the
        same purpose [5]. Do not extrapolate past the printed date
        — peptide degradation is real and the manufacturer&apos;s
        date is the most rigorously tested boundary you have.
      </p>

      <h2>Common storage mistakes that ruin medication</h2>

      <ol>
        <li>
          <strong>Storing in the freezer compartment.</strong> The
          most common mistake. Refrigerator door bins or the
          coldest part of the main fridge are correct; the freezer
          is not.
        </li>
        <li>
          <strong>Storing on top of the fridge or in a sunny
          window.</strong> Both can exceed the 30°C room-temperature
          limit, especially in summer.
        </li>
        <li>
          <strong>Using a pen past its room-temperature window
          because it &ldquo;still works.&rdquo;</strong> Patients
          often rely on the absence of visible cloudiness or
          discoloration as a stability check. Peptide degradation
          can occur without visible signs. Trust the FDA-tested
          window, not the appearance.
        </li>
        <li>
          <strong>Mixing brand and compounded vial rules.</strong>{" "}
          The 28-day Wegovy room-temperature window does NOT apply
          to a compounded vial. Compounded vials follow the BUD
          set by the compounding pharmacy.
        </li>
      </ol>

      <h2>Related research and tools</h2>

      <p>
        For the injection technique that goes with proper storage,
        see our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          injection technique guide
        </Link>
        . For the compounded vial dose math (units to mg), see our{" "}
        <Link href="/tools/glp1-unit-converter">
          GLP-1 unit converter
        </Link>
        . For an explanation of the FDA-approved expiration windows
        for the brand pens, see the prescribing information PDFs
        cited below — every drug&apos;s &ldquo;Section 16&rdquo;
        contains the storage rules verbatim. For the difference
        between the brand-name pen and the compounded vial format
        in operational practice, see our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          Wegovy pen vs compounded vial deep-dive
        </Link>
        . For the regulatory framework that governs compounded
        BUD assignment, see our{" "}
        <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
          PCAB accreditation investigation
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
