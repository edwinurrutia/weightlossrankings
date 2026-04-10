import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import InjectionSitesDiagram from "@/components/research/InjectionSitesDiagram";
import FaqSchema from "@/components/research/FaqSchema";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";

const SLUG = "where-to-inject-semaglutide-tirzepatide-guide";

// HowTo steps correspond to the visible injection technique
// instructions in the article body, sourced from the FDA-approved
// IFU documents for Wegovy, Ozempic, Zepbound, and Mounjaro. Google
// requires every HowTo step to map to on-page content.
const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Choose an FDA-approved site",
    text: "Pick one of the three FDA-approved sites: abdomen (at least 2 inches from the navel), front of thigh, or back of the upper arm. All three are equivalent for semaglutide and tirzepatide absorption.",
  },
  {
    name: "Rotate the site between doses",
    text: "Use a different site each week to prevent lipohypertrophy (lumpy tissue that slows absorption). Rotate in a pattern you can track — left abdomen, right abdomen, left thigh, right thigh, etc.",
  },
  {
    name: "Clean the site with alcohol and let it dry",
    text: "Wipe the injection site with an alcohol pad and let the alcohol air-dry completely. Wet alcohol stings on injection and can dilute the dose at the injection point.",
  },
  {
    name: "Insert the needle at 90 degrees",
    text: "Press the auto-injector pen firmly flat against the skin so the needle enters at a 90-degree angle. This is the labeled angle for all current subcutaneous GLP-1 pens.",
  },
  {
    name: "Hold the pen in place for the full dose delivery",
    text: "Hold the pen steady against the skin for the full dose duration indicated by the device (typically 5–10 seconds) and the post-injection hold time. Do not withdraw early — it wastes the dose.",
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

// Every clinical claim in this article was sourced directly from the
// FDA prescribing information for Wegovy (semaglutide 2.4 mg),
// Ozempic (semaglutide), Zepbound (tirzepatide), and Mounjaro
// (tirzepatide), plus the manufacturer Instructions for Use (IFU)
// documents that ship with each pen. The injection-site rotation
// guidance is sourced from the American Diabetes Association
// Standards of Care (annual update) which has covered subcutaneous
// injection technique for decades. Site preference data is sourced
// from Frid et al, Mayo Clinic Proceedings 2016 (PMID 27594187),
// the most-cited consensus on insulin injection technique that
// remains the de facto reference for GLP-1 injection technique.

export default function InjectionGuideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information and Instructions for Use.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information and Instructions for Use.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information and Instructions for Use.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatide) injection — US Prescribing Information and Instructions for Use.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
    },
    {
      authors:
        "Frid AH, Kreugel G, Grassi G, Halimi S, Hicks D, Hirsch LJ, Smith MJ, Wellhoener R, Bode BW, Hirsch IB, Kalra S, Ji L, Strauss KW.",
      title:
        "New Insulin Delivery Recommendations.",
      source: "Mayo Clinic Proceedings",
      year: 2016,
      pmid: "27594187",
    },
    {
      authors: "American Diabetes Association.",
      title:
        "Standards of Care in Diabetes — Section on Insulin Administration and Injection Technique (annual update).",
      source: "Diabetes Care",
      year: 2025,
      url: "https://diabetesjournals.org/care/issue/48/Supplement_1",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <HowToSchema
        name="Where and How to Inject Semaglutide and Tirzepatide"
        description="Step-by-step injection technique for the three FDA-approved subcutaneous sites (abdomen, front of thigh, back of upper arm), sourced from the Wegovy, Ozempic, Zepbound, and Mounjaro Instructions for Use."
        steps={HOW_TO_STEPS}
        url="https://weightlossrankings.org/research/where-to-inject-semaglutide-tirzepatide-guide"
        image="https://weightlossrankings.org/research/where-to-inject-semaglutide-tirzepatide-guide/opengraph-image"
        totalTime="PT3M"
      />
      <p data-speakable="lead">
        Most GLP-1 telehealth providers ship a vial and a syringe with
        a one-line dosing instruction and almost no detail about where
        on the body the injection actually goes. The FDA prescribing
        information for Wegovy, Ozempic, Zepbound, and Mounjaro all
        approve the same three subcutaneous injection sites — the
        abdomen, the front of the thigh, and the back of the upper
        arm [1, 2, 3, 4]. Patient-reported soreness, ease of self-
        injection, and absorption profile vary meaningfully between
        them, but the labels themselves don&apos;t rank the three sites
        — they let you and your prescriber pick. This guide walks
        through the labeled anatomy with a body diagram, explains the
        rotation pattern that reduces lipohypertrophy and bruising,
        documents the injection depth and angle (which is the same
        for all four drugs), and covers the small technique details
        that make the difference between a comfortable injection and
        a sore one.
      </p>

      <h2>The three FDA-approved injection sites</h2>

      <p>
        The Wegovy [1], Ozempic [2], Zepbound [3], and Mounjaro [4]
        Instructions for Use documents all approve identical injection
        site options. There is no FDA-recommended site preference
        within them — the labels say only that the patient should
        rotate sites and pick from the three approved areas:
      </p>

      <InjectionSitesDiagram />

      <ol>
        <li>
          <strong>Abdomen.</strong> The most common site for self-
          injection. The label specifies anywhere on the abdomen{" "}
          <em>except a 2-inch radius around the navel</em> [1, 2, 3,
          4]. The skin is loose and easy to pinch, the subcutaneous
          fat layer is generally thicker than the other sites, and
          self-injection is straightforward because the patient can
          easily see the injection site.
        </li>
        <li>
          <strong>Front of thigh.</strong> The middle, mid-front of
          the thigh — not the inner thigh and not the lateral side.
          This is the second-most-common site. Slightly more
          patient-reported soreness than the abdomen because the
          quadriceps muscle sits directly under the subcutaneous fat
          layer and movement during walking can irritate the
          injection point for the first day or two.
        </li>
        <li>
          <strong>Back of upper arm.</strong> The deltoid/triceps
          junction at the back of the upper arm. This site is
          generally <em>not recommended for self-injection</em>
          because it&apos;s difficult for most patients to reach and
          to pinch the skin one-handed while inserting the needle.
          The label allows it but practical experience reserves it
          for patients who have a partner injecting them.
        </li>
      </ol>

      <h2>Why rotation matters</h2>

      <p>
        The most common patient mistake with GLP-1 injection technique
        is using the same spot week after week. Repeated injection
        into the same square inch of subcutaneous tissue causes a
        condition called <strong>lipohypertrophy</strong> — fatty
        nodules under the skin that absorb the drug
        unpredictably. Lipohypertrophy is a documented and well-
        characterized phenomenon in the insulin literature (Frid et
        al., Mayo Clinic Proceedings 2016 [5]) that translates
        directly to GLP-1 injections because the tissue and absorption
        physics are the same. The two clinical consequences:
      </p>

      <ol>
        <li>
          <strong>Variable absorption.</strong> Drug injected into a
          lipohypertrophic nodule may absorb 25-50% slower than drug
          injected into normal tissue, producing inconsistent week-
          to-week effect. Patients often interpret this as &ldquo;the
          medication stopped working&rdquo; when in fact it&apos;s
          their injection site that changed, not the drug.
        </li>
        <li>
          <strong>Reduced visibility.</strong> Lipohypertrophy nodules
          look and feel firm but not necessarily painful, so patients
          inject into them preferentially because the injection
          actually <em>hurts less</em> than fresh tissue. This makes
          the rotation problem self-reinforcing.
        </li>
      </ol>

      <p>
        The recommended rotation pattern from both the Frid 2016
        consensus [5] and the ADA Standards of Care [6] is to use a
        different square at least 1 inch away from the previous
        injection on each shot. A simple grid mental model: divide
        the abdomen into 8 quadrants (4 above the navel, 4 below)
        and inject into each one sequentially across 8 weeks before
        returning to the first. The same pattern works on the
        thighs.
      </p>

      <h2>Injection depth, angle, and technique</h2>

      <p>
        For all four GLP-1 drugs, the injection is{" "}
        <strong>subcutaneous</strong>, not intramuscular. That means
        into the layer of fat just under the skin, at a 90-degree
        angle (perpendicular) to the skin surface for most adults.
        Specific technique details from the FDA-approved IFU
        documents [1, 2, 3, 4]:
      </p>

      <ul>
        <li>
          <strong>Skin pinch — depends on the device.</strong> For{" "}
          <em>vial-and-syringe</em> compounded GLP-1 injection,
          where needles are typically longer than the brand pens,
          pinch a 1-2 inch fold of skin and subcutaneous fat
          between thumb and forefinger to lift the tissue away
          from underlying muscle. For{" "}
          <em>brand-pen injection</em> (Wegovy, Ozempic, Zepbound,
          Mounjaro pens), the auto-injector needles are 4-8 mm and
          most adults do <strong>not</strong> need a pinch — per
          the FDA pen IFUs and the Frid 2016 New Insulin Delivery
          Recommendations consensus, 4-5 mm needles reach
          subcutaneous tissue in essentially all adults at the
          recommended sites without a pinch. If you are very lean
          or injecting in the arm, a light pinch is still
          reasonable; otherwise follow the device IFU.
        </li>
        <li>
          <strong>Needle insertion:</strong> Insert at 90 degrees
          (straight in) for most patients. For very lean patients, a
          45-degree angle is acceptable to avoid muscle.
        </li>
        <li>
          <strong>Inject slowly:</strong> Push the plunger over 5-10
          seconds, not in a single fast push. This reduces the
          stinging sensation that some patients report from rapid
          injection.
        </li>
        <li>
          <strong>Hold the needle in place:</strong> After the plunger
          is fully depressed, hold the needle in the skin for an
          additional 5-10 seconds before withdrawing. This prevents
          drug leakage out of the injection site.
        </li>
        <li>
          <strong>Release the pinch and withdraw:</strong> Release
          the skin pinch and withdraw the needle in a single smooth
          motion. Apply light pressure with a clean cotton ball or
          gauze for 10 seconds. Do not rub the site — rubbing can
          cause bruising.
        </li>
      </ul>

      <h2>Brand pen vs compounded vial: what changes</h2>

      <p>
        The injection site rules and technique are{" "}
        <strong>identical</strong> for the brand-name pens and for
        compounded vial-and-syringe preparations. The mechanical
        differences are about the device, not the anatomy:
      </p>

      <ul>
        <li>
          <strong>Wegovy and Ozempic pens</strong> are pre-filled
          single-use auto-injectors that handle the needle and dose
          for the patient. The patient just selects the dose, places
          the pen against the skin, and presses the button.
          Manufacturer needle is short (4-5 mm) so even a moderate
          skin pinch reaches subcutaneous fat at every site [1, 2].
        </li>
        <li>
          <strong>Zepbound and Mounjaro pens</strong> work the same
          way — pre-filled, auto-injector, single-use, short
          needle [3, 4].
        </li>
        <li>
          <strong>Compounded vials</strong> are paired with a
          standard U-100 insulin syringe (typically 0.3 mL or 0.5
          mL capacity) and the patient draws their own dose and
          injects manually. The needle is also short (typically
          5/16&quot; = 8 mm) but the patient is responsible for the
          full technique sequence above. For the unit-vs-mg dose
          calculation that comes up here, see our{" "}
          <Link href="/tools/glp1-unit-converter">
            GLP-1 unit converter tool
          </Link>
          .
        </li>
      </ul>

      <p>
        The compounded format requires more technique discipline
        because the patient performs every step manually, but the
        injection sites and the principles above don&apos;t change
        between formats.
      </p>

      <h2>Patient-reported tricks for less soreness</h2>

      <p>
        These are not in the FDA labels but they appear consistently
        in patient communities and are supported by the broader
        insulin injection technique literature [5]:
      </p>

      <ol>
        <li>
          <strong>Cold or warm?</strong> Most patients report less
          stinging when the injection is given at <em>room
          temperature</em> rather than straight out of the
          refrigerator. Take the pen or vial out 15-30 minutes
          before injecting (within the room-temperature stability
          window — see our storage guide).
        </li>
        <li>
          <strong>Pick a fresh site, not the &ldquo;easy&rdquo;
          spot.</strong> The site that hurts less today is often the
          one with early lipohypertrophy. Force yourself to rotate
          even when one spot feels noticeably easier.
        </li>
        <li>
          <strong>Inject after a warm shower.</strong> Increased
          blood flow to surface tissue reduces the perceived sting.
        </li>
        <li>
          <strong>Don&apos;t inject through clothing.</strong>{" "}
          Fabric fibers can be carried into the subcutaneous tissue
          and increase the chance of injection-site irritation.
        </li>
        <li>
          <strong>Skip alcohol pad if you can&apos;t let it dry.</strong>{" "}
          Alcohol pads are routine but injecting through wet alcohol
          stings considerably more than injecting through dry skin.
          Wait 30 seconds for the alcohol to evaporate fully.
        </li>
      </ol>

      <h2>When to call your prescriber</h2>

      <p>
        Mild redness, mild bruising, and mild local soreness for
        24-48 hours after a GLP-1 injection are common and not a
        cause for concern. Call your prescriber if any of the
        following happens:
      </p>

      <ul>
        <li>
          A firm lump under the skin that lasts more than 1-2 weeks
          (possible early lipohypertrophy or sterile abscess).
        </li>
        <li>
          Significant redness, warmth, or expanding swelling that
          worsens after the first 48 hours (possible infection).
        </li>
        <li>
          A nodule that becomes painful, red, and warm — call
          immediately, this can be a sterile abscess that requires
          medical evaluation.
        </li>
        <li>
          Repeated injections at the same site that have produced a
          visible lump — your prescriber should examine for
          lipohypertrophy and confirm a different rotation pattern.
        </li>
        <li>
          Any signs of a systemic allergic reaction (hives,
          swelling away from the injection site, breathing
          difficulty) — call 911 or go to the nearest emergency
          department.
        </li>
      </ul>

      <h2>Where the FDA labels are very clear (and where they leave you on your own)</h2>

      <p>
        The FDA-approved IFU documents are explicit about: the three
        approved sites, the requirement to rotate, the
        contraindication of injecting into a 2-inch radius around
        the navel, the subcutaneous (not intramuscular) route, and
        the prohibition on sharing needles between patients [1, 2,
        3, 4]. The labels do <em>not</em> provide a recommended
        rotation pattern, do not specify how many days between
        repeating a site, and do not address site-specific
        differences in absorption or comfort. That gap is where
        third-party patient guides like this one — and the
        consensus literature [5, 6] — fill in the practical
        details.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For the calculations that come up when you&apos;re drawing a
        compounded vial dose with a U-100 insulin syringe, see our{" "}
        <Link href="/tools/glp1-unit-converter">
          GLP-1 unit converter
        </Link>
        . For the side-effect profile of each drug, see our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        . For pen vs compounded vial differences in operational
        practice, see our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          Wegovy pen vs compounded vial deep-dive
        </Link>
        . For the difference between semaglutide and tirzepatide
        themselves, see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Where should I inject Wegovy, Ozempic, Zepbound, or Mounjaro?",
            answer:
              "The FDA-approved injection sites for all four GLP-1 pens are the abdomen (at least 2 inches from the navel), the front of the thigh, and the back of the upper arm. Rotate the site each week to avoid lipohypertrophy (lumps under the skin from repeated injection in the same spot).",
          },
          {
            question: "Does it matter which site I pick for absorption?",
            answer:
              "For once-weekly GLP-1s the difference between sites is clinically small. The prescribing information treats abdomen, thigh, and upper arm as interchangeable. Consistency and rotation matter more than which site you pick. If you have very little subcutaneous fat in one area, use a site with more tissue for a more reliable subcutaneous (not intramuscular) injection.",
          },
          {
            question: "Can I inject in the same spot every week?",
            answer:
              "No. Repeated injection in the exact same spot causes lipohypertrophy — firm, lumpy tissue that absorbs medication unpredictably and can reduce drug effect. Rotate at least 1 inch from the previous site, and ideally rotate between the abdomen, thigh, and arm over consecutive weeks.",
          },
          {
            question: "Is the abdomen the best site for GLP-1 injections?",
            answer:
              "The abdomen is the most commonly chosen site because it's easy to see, easy to pinch, and has ample subcutaneous tissue in most adults. That said, the FDA labels treat thigh and upper arm as equally valid — pick whichever you can access consistently and rotate between them.",
          },
          {
            question: "How deep should the needle go for a GLP-1 injection?",
            answer:
              "GLP-1 pens use short (4-5mm) subcutaneous needles designed to deliver the drug into the fat layer just under the skin, not into muscle. Pinch a fold of skin, insert the needle perpendicular to the pinch, and hold for 5-10 seconds after the click to ensure the full dose is delivered.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
