import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "compounded-glp1-reconstitution-mixing-guide";

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

export default function ReconstitutionArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Pharmacopeial Convention.",
      title:
        "USP General Chapter <797> Pharmaceutical Compounding — Sterile Preparations.",
      source: "USP-NF",
      year: 2023,
      url: "https://www.usp.org/compounding/general-chapter-797",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Compounded Drug Products — 503A and 503B Outsourcing Facility Information for Patients.",
      source: "FDA Drug Compounding Resources",
      year: 2024,
      url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
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
      authors: "U.S. Food and Drug Administration.",
      title:
        "Bacteriostatic Water for Injection — Labeling and Patient Information.",
      source: "FDA Drug Label Resources",
      year: 2024,
      url: "https://www.accessdata.fda.gov/scripts/cder/daf/",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Most compounded GLP-1 vials ship as a ready-to-inject liquid
        solution. A minority ship as <strong>lyophilized powder</strong>{" "}
        — freeze-dried drug that the patient reconstitutes with
        bacteriostatic water at home before first use. Reconstitution
        is safe and well-documented when done correctly, but it adds
        several technical steps that the regular liquid format
        doesn&apos;t require, and the math for the resulting
        concentration is a consistent source of patient confusion.
        This guide walks through the process step by step with the
        FDA-adjacent safety boundaries and the concentration math
        that flows into our{" "}
        <Link href="/tools/glp1-unit-converter">
          unit converter tool
        </Link>
        . Note: this is an educational explainer, not a substitute
        for the instructions that ship with your specific vial.
      </p>

      <h2>Before you start — the safety boundaries</h2>

      <p>
        Reconstitution is a sterile procedure. The boundaries that
        protect you from contamination and dose error come from the
        USP General Chapter &lt;797&gt; framework that governs
        compounded sterile preparations [1] and the FDA compounding
        guidance for patients [2]:
      </p>

      <ol>
        <li>
          <strong>Follow the instructions that ship with your
          specific vial, not a generic recipe.</strong> Every
          compounding pharmacy has a specific protocol for the
          product they dispense, including the exact volume of
          bacteriostatic water to add, the target concentration, and
          the post-reconstitution BUD (beyond-use date). If your
          vial shipped without instructions, call the pharmacy
          before opening it.
        </li>
        <li>
          <strong>Use bacteriostatic water, not sterile water or
          saline.</strong> Bacteriostatic water for injection (BWFI)
          contains 0.9% benzyl alcohol as a bacteriostatic
          preservative, which prevents microbial growth in a
          multi-dose vial across its BUD [5]. Plain sterile water
          for injection (SWFI) does not contain a preservative and
          is only appropriate for single-use preparations —
          reconstituting a multi-dose GLP-1 vial with SWFI would
          shorten the BUD dramatically. Saline is isotonic but
          also not appropriate for peptide reconstitution unless
          your pharmacy specifically dispensed it.
        </li>
        <li>
          <strong>Single-use syringe and needle for drawing the
          water</strong>, separate from the one you use for
          injecting the dose. Cross-contamination between
          reconstitution and injection steps is a known infection
          source.
        </li>
        <li>
          <strong>Clean, flat, dry surface</strong> away from
          airflow, pets, and children. The reconstitution process
          takes 2-3 minutes but any contamination at this stage
          affects every subsequent dose from that vial.
        </li>
        <li>
          <strong>Once reconstituted, refrigerate</strong> and
          respect the BUD the pharmacy assigned on the label.
          Typical BUDs for reconstituted compounded GLP-1s
          refrigerated are 28-90 days depending on the pharmacy&apos;s
          stability documentation [1].
        </li>
      </ol>

      <h2>Step-by-step reconstitution</h2>

      <p>
        The generic reconstitution sequence for a lyophilized
        compounded GLP-1 vial:
      </p>

      <ol>
        <li>
          <strong>Wash hands thoroughly</strong> with soap and
          water, then dry. Set out your supplies on a clean flat
          surface: lyophilized vial, bacteriostatic water vial,
          reconstitution syringe (usually 3-5 mL), alcohol pads,
          sharps container.
        </li>
        <li>
          <strong>Inspect both vials.</strong> The drug vial should
          contain a dry powder cake, white or off-white, with no
          visible discoloration. The bacteriostatic water vial
          should be clear with no particulates. If either vial
          looks abnormal, do not use it — call the pharmacy.
        </li>
        <li>
          <strong>Wipe both vial stoppers</strong> with a fresh
          alcohol pad and let the alcohol air-dry fully (10-15
          seconds). Do not blow on it.
        </li>
        <li>
          <strong>Draw the bacteriostatic water.</strong> Use the
          reconstitution syringe to draw the exact volume specified
          by your pharmacy (commonly 2 mL, 3 mL, or 5 mL depending
          on the target concentration). Point the needle up and
          tap the syringe to dislodge any air bubbles, then press
          the plunger gently to expel them.
        </li>
        <li>
          <strong>Inject the water into the drug vial slowly.</strong>{" "}
          Insert the needle into the drug vial stopper at a
          45-degree angle (this reduces coring) and slowly press
          the plunger so the water streams gently against the vial
          wall, not directly onto the lyophilized powder cake.
          Streaming water directly into the cake can denature the
          peptide.
        </li>
        <li>
          <strong>Withdraw the syringe and dispose of it in a
          sharps container.</strong> Do not recap the needle.
        </li>
        <li>
          <strong>Dissolve the powder by gentle rotation.</strong>{" "}
          Hold the vial between your hands and roll it gently in a
          circular motion for 30-60 seconds. <em>Do not shake.</em>{" "}
          Shaking foams the peptide solution and can denature the
          drug. The powder should fully dissolve within about a
          minute; if it doesn&apos;t, continue gentle rotation for
          another minute or two.
        </li>
        <li>
          <strong>Inspect the reconstituted solution.</strong> It
          should be clear or very lightly opalescent with no
          visible particles. If it&apos;s cloudy or has visible
          particles, do not use it — call the pharmacy.
        </li>
        <li>
          <strong>Label the vial</strong> with the reconstitution
          date and the BUD assigned by the pharmacy. This is the
          one label you should never skip — patients frequently
          forget when they reconstituted a vial and then use it
          past BUD.
        </li>
        <li>
          <strong>Refrigerate</strong> at 2-8°C (36-46°F) between
          doses, unless the pharmacy specifically says otherwise.
        </li>
      </ol>

      <h2>The concentration math</h2>

      <p>
        The resulting concentration (mg/mL) depends on the amount
        of drug in the vial and the volume of bacteriostatic water
        you add. The formula:
      </p>

      <p>
        <code>
          concentration (mg/mL) = drug mg in vial ÷ water volume mL
        </code>
      </p>

      <p>
        Common compounded vial + reconstitution combinations:
      </p>

      <table>
        <thead>
          <tr>
            <th>Drug mg in vial</th>
            <th>+ BWFI volume</th>
            <th>= Concentration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5 mg semaglutide</td>
            <td>2 mL</td>
            <td>2.5 mg/mL</td>
          </tr>
          <tr>
            <td>10 mg semaglutide</td>
            <td>2 mL</td>
            <td>5 mg/mL</td>
          </tr>
          <tr>
            <td>10 mg semaglutide</td>
            <td>4 mL</td>
            <td>2.5 mg/mL</td>
          </tr>
          <tr>
            <td>20 mg tirzepatide</td>
            <td>2 mL</td>
            <td>10 mg/mL</td>
          </tr>
          <tr>
            <td>30 mg tirzepatide</td>
            <td>3 mL</td>
            <td>10 mg/mL</td>
          </tr>
          <tr>
            <td>40 mg tirzepatide</td>
            <td>4 mL</td>
            <td>10 mg/mL</td>
          </tr>
        </tbody>
      </table>

      <p>
        Once you know the concentration, you can compute the
        syringe units for any desired dose using our{" "}
        <Link href="/tools/glp1-unit-converter">
          GLP-1 unit converter
        </Link>
        . The most important point: the concentration depends
        entirely on how much water you added, so if you add a
        different volume than the pharmacy specified, your unit-to-
        mg math changes and every subsequent dose will be wrong.
        Always follow the pharmacy&apos;s reconstitution instructions
        exactly.
      </p>

      <h2>Common reconstitution errors</h2>

      <ol>
        <li>
          <strong>Shaking instead of rolling.</strong> Shaking
          foams the solution, denatures the peptide, and can
          reduce potency significantly. Gentle rotation only.
        </li>
        <li>
          <strong>Using the wrong water.</strong> Bacteriostatic
          water has the preservative needed for multi-dose
          storage. Sterile water for injection or saline does not.
          Your pharmacy should ship bacteriostatic water with the
          lyophilized vial — if they didn&apos;t, call them.
        </li>
        <li>
          <strong>Adding the wrong volume.</strong> The math only
          works if the volume matches what the pharmacy specified.
          If your instructions say 2 mL and you added 3 mL, your
          concentration dropped by 33% and every dose you draw
          will be 33% too low. Discard and start over with a
          fresh vial.
        </li>
        <li>
          <strong>Streaming water directly into the powder
          cake.</strong> The force of water jet on the lyophilized
          cake can denature the surface peptide. Aim the stream
          against the vial wall instead so the water gently
          dissolves the cake from the edges inward.
        </li>
        <li>
          <strong>Not labeling the reconstitution date.</strong>{" "}
          Without a date on the vial you cannot track the BUD. The
          reconstitution date is the most important label in the
          entire process.
        </li>
        <li>
          <strong>Freezing the reconstituted solution.</strong>{" "}
          Same rule as brand-name pens — never freeze a GLP-1
          solution. Freezing denatures the peptide.
        </li>
      </ol>

      <h2>When reconstitution is the wrong format for you</h2>

      <p>
        Lyophilized vials are uncommon in the compounded GLP-1
        market because most patients prefer the simplicity of a
        ready-to-inject liquid. If you&apos;re uncomfortable with
        the reconstitution process:
      </p>

      <ul>
        <li>
          Ask your telehealth provider if they can switch you to a
          pharmacy that dispenses ready-to-inject liquid vials.
          Most can.
        </li>
        <li>
          If you&apos;re on commercial insurance that covers
          Wegovy or Zepbound, the brand-name pens are pre-filled
          and require no reconstitution at all. The
          patient-experience difference is meaningful.
        </li>
        <li>
          If cost is the reason you&apos;re on lyophilized powder
          in the first place, the new Foundayo (orforglipron)
          approval includes a $149/month self-pay tier that may
          be price-competitive. See our{" "}
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo approval deep-dive
          </Link>
          .
        </li>
      </ul>

      <h2>Safety disclaimer</h2>

      <p>
        This guide is educational and does not replace the written
        instructions that ship with your vial or the clinical
        judgment of your prescriber. If you are unsure about any
        step of the reconstitution process, call your compounding
        pharmacy before opening the vial. Do not use any vial that
        looks abnormal, is past its BUD, or wasn&apos;t
        reconstituted correctly.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For the concentration-to-units math that flows from any
        reconstitution, use our{" "}
        <Link href="/tools/glp1-unit-converter">
          GLP-1 unit converter
        </Link>
        . For the injection technique after the vial is
        reconstituted, see our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          injection guide
        </Link>
        . For post-reconstitution storage rules and BUD, see our{" "}
        <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
          storage guide
        </Link>
        . For the 503A/503B distinction that governs how
        compounding pharmacies can operate, see our{" "}
        <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
          PCAB investigation
        </Link>
        . For what FDA has actually cited compounded GLP-1
        pharmacies for, see our{" "}
        <Link href="/research/fda-warning-letters-glp1">
          FDA warning letters database
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
