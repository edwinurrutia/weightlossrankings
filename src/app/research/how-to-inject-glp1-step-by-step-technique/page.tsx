import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";

// HowTo JSON-LD source. Each step maps to a real instruction in the
// article body. Google's HowTo SERP card renders these as numbered
// steps directly in the search results — one of the highest-CTR
// organic enhancements for procedural content.
const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Take the pen out of the refrigerator",
    text: "Remove the pen from the fridge 15-30 minutes before injecting. Cold injections sting more.",
  },
  {
    name: "Inspect the pen",
    text: "Check the pen window. The liquid should be clear and colorless. If it is cloudy, discolored, or has particles, do not use the pen.",
  },
  {
    name: "Wash your hands",
    text: "Wash hands with soap and water before handling the pen.",
  },
  {
    name: "Choose and clean an injection site",
    text: "Pick the abdomen (at least 2 inches from the navel), front of the thigh, or back of the upper arm. Clean with alcohol and let it dry completely — wet alcohol stings.",
  },
  {
    name: "Remove the pen cap",
    text: "Pull off the pen cap. For Wegovy and Zepbound this arms the auto-injector. Do not put the cap back on.",
  },
  {
    name: "Press the pen flat against the skin",
    text: "Press the pen firmly against the cleaned skin at a 90-degree angle. You should feel firm contact, not just a touch.",
  },
  {
    name: "Press and hold the injection button",
    text: "Press the dose button. You will hear a click as the needle enters and the dose starts. Keep pressing firmly against the skin throughout the dose.",
  },
  {
    name: "Hold for the labeled dwell time",
    text: "Hold the pen against the skin for 5-10 seconds (Wegovy), 10 seconds (Zepbound), or 6 seconds (Ozempic) after the dose-counter clicks stop. Lifting too early is the most common cause of partial doses.",
  },
  {
    name: "Lift the pen straight off the skin",
    text: "Pull the pen straight out. Do not rub the injection site. A small drop of blood is normal.",
  },
  {
    name: "Dispose of the pen safely",
    text: "Drop the entire pen into an FDA-cleared sharps container. Do not recap.",
  },
];

const SLUG = "how-to-inject-glp1-step-by-step-technique";

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
//   - Wegovy PI Section 2.2 Administration (2025)
//   - Ozempic PI Section 2.2 Administration (2025)
//   - Zepbound PI Section 2.2 Administration (2025)
//   - Mounjaro PI Section 2.2 Administration (2025)
//   - Frid et al. 2016 — Worldwide Injection Technique Questionnaire
//   - ADA 2022 Standards of Care, injection technique section

export default function InjectionTechniqueArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 2.2 Administration and Section 17 Patient Counseling.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information, Section 2.2 Administration.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 2.2 Administration.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatide) injection — US Prescribing Information, Section 2.2 Administration.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s015lbl.pdf",
    },
    {
      authors:
        "Frid AH, Kreugel G, Grassi G, Halimi S, Hicks D, Hirsch LJ, Smith MJ, Wellhoener R, Bode BW, Hirsch IB, Kalra S, Ji L, Strauss KW.",
      title:
        "New Insulin Delivery Recommendations.",
      source: "Mayo Clin Proc",
      year: 2016,
      pmid: "27594187",
    },
    {
      authors: "American Diabetes Association.",
      title:
        "Standards of Medical Care in Diabetes — 2022. Section 9: Pharmacologic Approaches to Glycemic Treatment (subcutaneous injection technique).",
      source: "Diabetes Care",
      year: 2022,
      pmid: "34964868",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <HowToSchema
        name="How to Inject a GLP-1 (Wegovy, Ozempic, Zepbound, Mounjaro)"
        description="Step-by-step injection technique for GLP-1 receptor agonist pre-filled auto-injector pens, sourced from the FDA-approved prescribing information for each drug."
        steps={HOW_TO_STEPS}
        url="https://weightlossrankings.org/research/how-to-inject-glp1-step-by-step-technique"
        image="https://weightlossrankings.org/research/how-to-inject-glp1-step-by-step-technique/opengraph-image"
        totalTime="PT5M"
      />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Most GLP-1 patients never get a real hands-on injection lesson.
        You get the pen, a quick clinic demonstration if you&apos;re
        lucky, a one-page leaflet, and a link to the manufacturer&apos;s
        YouTube video. This is the written reference for every common
        GLP-1 delivery format: pre-filled single-use pens, multi-dose
        pens, multi-dose vials with regular syringes, and compounded
        vials with U-100 insulin syringes. Click-by-click,
        site-by-site, and the troubleshooting list for what to do when
        something goes wrong.
      </p>

      <h2>The three things that are the same for every GLP-1 injection</h2>
      <p>
        Regardless of which device you use, three rules apply
        universally to all subcutaneous GLP-1 injections<Cite n={5} /><Cite n={6} />:
      </p>
      <ol>
        <li>
          <strong>Subcutaneous, not intramuscular.</strong> GLP-1s are
          designed to be absorbed from the fat layer just under the skin,
          not from muscle. Hitting muscle changes the absorption profile
          and can hurt more.
        </li>
        <li>
          <strong>Rotate sites.</strong> Repeatedly injecting the same
          spot causes lipohypertrophy — fatty lumps under the skin that
          look normal but absorb the drug erratically (often 25-50% less
          than fresh tissue).
        </li>
        <li>
          <strong>Clean technique, but not sterile theater.</strong>{" "}
          Wash your hands. Wipe the skin with alcohol and let it dry
          (alcohol on wet skin stings). Use a fresh needle every time.
          You do not need gloves or a mask.
        </li>
      </ol>

      <h2>Where to inject (the FDA-approved sites)</h2>
      <p>
        The Wegovy<Cite n={1} />, Ozempic<Cite n={2} />, Zepbound<Cite n={3} />,
        and Mounjaro<Cite n={4} /> labels all approve the same three
        injection sites:
      </p>
      <ul>
        <li>
          <strong>Abdomen</strong> — anywhere on the front of the
          abdomen, at least 2 inches (5 cm) away from the navel. This
          is the most popular site because there&apos;s typically the
          most subcutaneous fat and the easiest visualization.
        </li>
        <li>
          <strong>Front of the thigh</strong> — the upper outer quadrant
          of the front of the thigh. Avoid the inner thigh.
        </li>
        <li>
          <strong>Upper arm</strong> — the back of the upper arm, in
          the fatty area between the shoulder and elbow. This is the
          one site most patients can&apos;t comfortably reach
          themselves and may need help with.
        </li>
      </ul>
      <p>
        See our <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">where-to-inject anatomy guide</Link> for site
        diagrams and the rotation pattern that minimizes lipohypertrophy.
      </p>

      <h2>Pre-filled single-use pens (Wegovy and Zepbound)</h2>
      <p>
        Wegovy and Zepbound ship as single-use auto-injector pens.
        Each pen contains exactly one weekly dose. You twist off the
        cap, press the pen against the skin, and a spring delivers the
        full dose. There is no dial, no air bubble check, and no
        partial dose. The trade-off for the simplicity is that each
        dose costs more to manufacture, which is part of why brand-name
        Wegovy and Zepbound are expensive.
      </p>
      <p>
        Step-by-step from the FDA labels<Cite n={1} /><Cite n={3} />:
      </p>
      <ol>
        <li>
          Take the pen out of the refrigerator 15-30 minutes before
          injecting. Cold injections sting more.
        </li>
        <li>
          Inspect the pen window. The liquid should be clear and
          colorless. If it&apos;s cloudy, discolored, or has particles,
          do not use the pen — call the pharmacy.
        </li>
        <li>Wash your hands.</li>
        <li>
          Choose your injection site (abdomen, thigh, or upper arm)
          and clean with alcohol. Let the alcohol dry completely.
        </li>
        <li>
          Pull off the pen cap. Do not put the cap back on — for
          Wegovy and Zepbound, removing the cap arms the device.
        </li>
        <li>
          Press the pen flat against the skin. You should feel firm
          contact, not just a touch.
        </li>
        <li>
          Press and hold the injection button. You will hear a first
          click as the needle enters and the dose starts. Hold the pen
          firmly against the skin and wait for the second click and
          for the yellow indicator to stop moving — this is the
          drug being delivered.
        </li>
        <li>
          The Wegovy label specifies <strong>hold for 5-10 seconds</strong>{" "}
          after the click stops to make sure the full dose is delivered.
          The Zepbound label specifies <strong>hold for 10 seconds</strong>.
          Lifting the pen too early is the most common cause of partial
          doses.
        </li>
        <li>Lift the pen straight off the skin.</li>
        <li>
          Dispose of the entire pen in an FDA-cleared sharps container.
          Do not recap.
        </li>
      </ol>

      <h2>Multi-dose pens (Ozempic and Mounjaro)</h2>
      <p>
        Ozempic comes in a multi-dose pen that delivers 4 doses (0.25
        mg starter pen) or 4 weekly doses (0.5 mg, 1 mg, or 2 mg
        maintenance pen). Mounjaro comes as four single-use pens per
        carton, similar to Zepbound. The Ozempic multi-dose technique
        is the one that requires the most patient skill<Cite n={2} />:
      </p>
      <ol>
        <li>
          Wash hands and inspect the pen as above.
        </li>
        <li>
          Attach a new needle. Twist on a fresh needle (typically a
          NovoFine 32G 4mm or similar), pull off the outer cap, and
          set the inner cap aside.
        </li>
        <li>
          <strong>Flow check (every new pen, every new needle).</strong>{" "}
          Turn the dose selector to the flow check symbol (Ozempic
          shows two vertical dots). Hold the pen with the needle
          pointing up. Press the dose button. A drop of liquid should
          appear at the tip of the needle. If no drop appears after 6
          attempts, change the needle. If still no drop, do not use
          the pen — call the manufacturer.
        </li>
        <li>
          Turn the dose selector to your prescribed dose. The dial
          shows your dose number; turning the dial advances a fixed
          mechanical stop.
        </li>
        <li>Choose and clean your injection site.</li>
        <li>
          Insert the needle straight in (90° to the skin) at full
          depth. With a 4 mm needle there is no need to pinch the
          skin in most adults.
        </li>
        <li>
          Press and hold the dose button until the dose counter
          returns to 0. Then continue holding the needle in place for{" "}
          <strong>at least 6 seconds</strong> (Ozempic label
          specifies 6 seconds — you can count slowly to 10 to be
          safe). This is critical because the drug needs time to
          spread into the tissue rather than back-flow up the needle
          track.
        </li>
        <li>Pull the needle straight out.</li>
        <li>
          Replace the inner needle cap (use the table-edge or
          one-handed scoop technique — never the two-hand
          recap-from-the-fingertip method which causes most needle
          stick injuries), unscrew the needle, and dispose in a
          sharps container.
        </li>
        <li>
          Replace the pen cap and store the pen back in the
          refrigerator (or at room temperature for the labeled
          duration if you&apos;re traveling — see our{" "}
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            storage and shelf life guide
          </Link>
          ).
        </li>
      </ol>

      <h2>Multi-dose vials with a regular syringe</h2>
      <p>
        If your prescription is dispensed as a multi-dose vial (less
        common for brand-name GLP-1s but common for compounded
        semaglutide and tirzepatide), you draw up each dose yourself.
        The technique is the same as drawing up insulin from a vial:
      </p>
      <ol>
        <li>
          Wash hands and inspect the vial. Liquid should be clear and
          colorless.
        </li>
        <li>
          Wipe the rubber stopper of the vial with alcohol and let it
          dry.
        </li>
        <li>
          Draw air into the syringe equal to your dose volume. Inject
          the air into the vial (vial up, syringe needle through the
          stopper). This equalizes pressure.
        </li>
        <li>
          Invert the vial and draw your dose into the syringe. Tap
          out air bubbles by flicking the syringe with the needle
          pointing up, then push them back into the vial.
        </li>
        <li>
          Pull the needle out of the vial. Re-verify the dose volume
          against your prescription.
        </li>
        <li>
          Inject as described in the &ldquo;injecting&rdquo; section
          below.
        </li>
        <li>
          Recap the vial, return to the refrigerator, and dispose of
          the syringe in a sharps container.
        </li>
      </ol>

      <h2>Compounded vials with a U-100 insulin syringe</h2>
      <p>
        Compounded semaglutide and tirzepatide are typically dispensed
        as multi-dose vials with U-100 insulin syringes. The wrinkle is
        that the syringe is graduated in <em>insulin units</em>, not
        milliliters or milligrams, so you need to know your
        concentration to convert your prescribed milligrams to syringe
        units. Use our{" "}
        <Link href="/tools/glp1-unit-converter">GLP-1 unit converter</Link>
        {" "}
        for the math at any concentration.
      </p>
      <p>
        Once you know how many units to draw, the technique is the
        same as drawing from a regular vial except that the insulin
        syringe is much smaller (typically 0.3 mL or 0.5 mL total
        volume) and the needle is much shorter (5/16 inch or 8 mm). At
        these short needle lengths, a 90° straight-in injection at
        full depth is correct for almost every adult and pinching the
        skin is unnecessary.
      </p>

      <h2>The injection itself (any device)</h2>
      <ol>
        <li>
          Hold the device like a dart or a pen — whichever feels more
          stable to you.
        </li>
        <li>
          For a 4-8 mm needle, insert <strong>straight in at 90°</strong>{" "}
          to the skin. For a longer needle (12 mm or more), pinch a
          fold of skin and inject at 45° into the fold to avoid
          hitting muscle.
        </li>
        <li>
          Push the needle in completely in one smooth motion. Do not
          stab.
        </li>
        <li>
          Press the plunger down slowly and steadily. Faster is more
          painful and increases backflow.
        </li>
        <li>
          When the plunger is fully down, count to at least 10 before
          withdrawing the needle. This is the single most important
          step for getting the full dose into the tissue and not back
          out the needle track.
        </li>
        <li>
          Pull the needle straight out. Do not rub the site (rubbing
          spreads the drug into a wider area and can affect
          absorption).
        </li>
        <li>
          A small drop of blood is normal and means a tiny capillary
          was nicked. Press gently with a clean tissue for 30 seconds.
        </li>
      </ol>

      <h2>Common mistakes (and how to avoid them)</h2>
      <ul>
        <li>
          <strong>Lifting the pen or needle too early.</strong> The
          single biggest cause of partial doses. Always count to 10.
        </li>
        <li>
          <strong>
            Injecting cold drug straight from the fridge.
          </strong>{" "}
          More painful and can sting for hours. Let the pen or vial
          warm to room temperature for 15-30 minutes first.
        </li>
        <li>
          <strong>Injecting through clothing.</strong> The label says
          don&apos;t. Cloth fibers can be carried into the tissue and
          you can&apos;t see whether the needle entered correctly.
        </li>
        <li>
          <strong>Injecting in the same spot repeatedly.</strong>{" "}
          Lipohypertrophy is the result; absorption becomes erratic
          and weight loss can plateau for non-pharmacologic reasons.
          Rotate sites every injection.
        </li>
        <li>
          <strong>Reusing needles.</strong> Needles are designed for
          single use. Reusing dulls the bevel, increases pain, and
          increases infection risk.
        </li>
        <li>
          <strong>Skipping the alcohol-dry step.</strong> Wet alcohol
          on the skin stings when the needle goes in. Wait 10-15
          seconds for it to dry.
        </li>
        <li>
          <strong>Recapping needles two-handed.</strong> The most
          common needle stick injury in patients is from recapping
          with both hands. Use the one-handed scoop or the
          table-edge technique, or just drop the uncapped needle
          straight into the sharps container.
        </li>
      </ul>

      <h2>What a normal injection site reaction looks like</h2>
      <ul>
        <li>
          <strong>Normal:</strong> a small red dot at the injection
          site that fades within a few hours, occasional pinpoint
          bruising, or a slightly warm spot that resolves overnight.
        </li>
        <li>
          <strong>Mild reaction (still normal):</strong> a 1-2 cm
          area of redness or itching at the site that resolves within
          1-2 days. More common with the first few doses.
        </li>
        <li>
          <strong>Concerning:</strong> spreading redness larger than
          a quarter, pain that worsens after 24 hours, warmth that
          spreads, pus, fever, or red streaks moving away from the
          site. These can indicate cellulitis or an abscess and
          warrant a call to your prescriber within 24 hours.
        </li>
        <li>
          <strong>Lipohypertrophy:</strong> a soft, fatty lump under
          the skin where you inject repeatedly. Not painful, not
          inflamed, but the drug doesn&apos;t absorb properly through
          it. Stop injecting in that spot and rotate to a fresh area.
        </li>
      </ul>

      <h2>Troubleshooting checklist</h2>
      <ul>
        <li>
          <strong>The needle bent or broke off.</strong> If you can
          see the needle, remove it with clean tweezers. If you
          can&apos;t see it, leave it alone, mark the spot with a
          pen, and go to urgent care or your primary care office for
          imaging and removal. Do not dig.
        </li>
        <li>
          <strong>I think I only got a partial dose.</strong> For
          single-use pens (Wegovy, Zepbound), do NOT take a second
          dose to make up. Continue with your normal weekly schedule
          on the next scheduled day. For multi-dose pens (Ozempic),
          check the dose counter — if it stopped before reaching 0,
          the manufacturer&apos;s recommendation is to call them
          before re-dosing. Do not just inject again unless your
          prescriber tells you to.
        </li>
        <li>
          <strong>I missed my weekly dose.</strong> For weekly
          injectable GLP-1s, the FDA labels say if it&apos;s within{" "}
          <strong>5 days</strong> of the missed dose, take it as soon
          as you remember and continue your normal weekly schedule.
          If it&apos;s more than 5 days, skip the missed dose and
          take your next scheduled dose. Do not double up.
        </li>
        <li>
          <strong>I left the pen out of the refrigerator overnight.</strong>{" "}
          The Wegovy and Zepbound labels allow up to 28 days at
          temperatures up to 86°F (30°C) for an unopened pen, and
          Ozempic allows up to 56 days for the in-use pen. Within
          those windows, the pen is safe to use. See our{" "}
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            storage guide
          </Link>{" "}
          for the full out-of-fridge tolerance for each drug.
        </li>
        <li>
          <strong>I accidentally injected into muscle.</strong> Most
          common if you&apos;re lean or used a long needle in the
          arm. Absorption may be a bit faster but you don&apos;t
          need to do anything. Rotate to a fattier site next time
          and consider a shorter needle.
        </li>
      </ul>

      <h2>What to bring to your prescriber visit if you&apos;re struggling</h2>
      <ul>
        <li>The actual pen or vial (or a photo)</li>
        <li>A list of which sites you&apos;ve been using</li>
        <li>Photos of any concerning skin reactions or lumps</li>
        <li>
          A note of how long you&apos;re holding the needle in place
          after pressing the button
        </li>
        <li>
          Your weight loss (or lack of it) timeline — sometimes a
          plateau is a technique problem rather than a drug problem
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Subcutaneous, not intramuscular. Rotate sites every
          injection. Use a fresh needle every time.
        </li>
        <li>
          Hold the device against the skin for the FDA-labeled
          dwell time after the click or after the plunger reaches
          0 (5-10 seconds for Wegovy, 10 seconds for Zepbound, 6
          seconds for Ozempic). This is the single most important
          technique step.
        </li>
        <li>
          Let the pen warm up out of the fridge before injecting,
          and let alcohol dry completely before the needle goes in.
        </li>
        <li>
          Compounded vials with insulin syringes — convert mg to
          units with the right concentration math. Use our unit
          converter tool.
        </li>
        <li>
          Spreading redness, pus, fever, or red streaks = call your
          prescriber. Normal pinpoint redness and bruising = no
          action needed.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
            Where to inject: site anatomy guide
          </Link>{" "}
          — site diagrams and the rotation pattern
        </li>
        <li>
          <Link href="/tools/glp1-unit-converter">GLP-1 unit converter</Link>
          {" "}
          — mg to insulin syringe units math for compounded vials
        </li>
        <li>
          <Link href="/research/compounded-glp1-reconstitution-mixing-guide">
            Compounded vial reconstitution guide
          </Link>{" "}
          — for lyophilized compounded vials that arrive as powder
        </li>
        <li>
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            Storage and shelf life
          </Link>{" "}
          — fridge and out-of-fridge windows for every drug
        </li>
        <li>
          <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
            Wegovy pen vs compounded vial — practical differences
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — search any medication for its interaction with your GLP-1
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not replace the demonstration and
        instructions you should receive from your prescriber or
        pharmacist. Always follow the actual product insert that
        ships with your medication, and contact your prescribing
        clinician with any questions specific to your situation.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
