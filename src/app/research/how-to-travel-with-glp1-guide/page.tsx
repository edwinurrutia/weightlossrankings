import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";
import FaqSchema from "@/components/research/FaqSchema";

const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Pack the pen in carry-on, never checked baggage",
    text: "Cargo hold temperatures swing from below freezing to over 100°F, which can damage GLP-1 medications. Always carry the pen onboard in your cabin baggage.",
  },
  {
    name: "Use an insulated medical travel case with frozen ice packs",
    text: "FRIO, MedAngel, or similar insulated cases keep the pen at the right temperature for the duration of the trip. Frozen gel ice packs are allowed at TSA security under the medication exemption.",
  },
  {
    name: "Bring your prescription documentation",
    text: "Carry the original pharmacy label on the box, plus a copy of the prescription if possible. TSA officers may ask. The labeled prescription is your exemption from the 3-1-1 liquid rule.",
  },
  {
    name: "Declare medications at TSA security",
    text: "Tell the TSA officer at the security line that you are carrying prescription medication that requires temperature control. They will route you and the cooler bag through the standard medical-medication screening.",
  },
  {
    name: "Check the labeled out-of-fridge tolerance for your specific drug",
    text: "Wegovy and Zepbound are stable at temperatures up to 86°F (30°C) for 28 days. Mounjaro is stable for 21 days at the same temperature. Ozempic is stable for 56 days. Foundayo is an oral pill and needs no refrigeration at all.",
  },
  {
    name: "Stay on your home time zone for weekly injections",
    text: "Weekly GLP-1s (Wegovy, Ozempic, Zepbound, Mounjaro) are forgiving on timing — taking the dose a day or two early or late on a long trip is fine. Keep using your normal injection day rather than recalculating for the new time zone.",
  },
  {
    name: "If a pen warms above 86°F, discard it",
    text: "A pen left in a hot car (above 30°C / 86°F) for more than the labeled out-of-fridge window should be discarded. The drug may not be stable. Contact your prescriber for an emergency replacement prescription if needed.",
  },
];

const SLUG = "how-to-travel-with-glp1-guide";

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

// Every storage tolerance window in this article was sourced directly
// from the Section 16 ("How Supplied / Storage and Handling") of the
// FDA-approved prescribing information PDFs for Wegovy, Ozempic,
// Zepbound, and Mounjaro. The TSA carry-on rules are sourced from
// TSA.gov's official medication policy page.

export default function TravelGuideArticle() {
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
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s024lbl.pdf",
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
      authors: "Transportation Security Administration (TSA).",
      title:
        "Traveling with Medication: Carry-On Rules for Liquid Medication, Injectables, and Frozen Ice Packs.",
      source: "TSA.gov",
      year: 2025,
      url: "https://www.tsa.gov/travel/special-procedures/traveling-medication",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "Lilly receives U.S. FDA approval of Foundayo (orforglipron), the first oral non-peptide GLP-1 receptor agonist for chronic weight management.",
      source: "Eli Lilly Investor Press Release",
      year: 2026,
      url: "https://investor.lilly.com/news-releases",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <HowToSchema
        name="How to Travel With a GLP-1 (Wegovy, Ozempic, Zepbound, Mounjaro, Foundayo)"
        description="Step-by-step guide to traveling with a GLP-1 receptor agonist — TSA rules, cooler bag setup, time zone schedule, and what to do if a pen warms up. Sourced from each drug's FDA prescribing information storage section."
        steps={HOW_TO_STEPS}
        url="https://weightlossrankings.org/research/how-to-travel-with-glp1-guide"
        image="https://weightlossrankings.org/research/how-to-travel-with-glp1-guide/opengraph-image"
      />
      <p data-speakable="lead">
        Traveling with a GLP-1 is one of the most-asked, least-clearly-
        answered questions in weight-loss medicine. The pens are
        refrigerated drugs, but they are also explicitly designed to
        survive a window of room temperature — and that window is
        different for each drug. Wegovy gives you 28 days. Zepbound
        and Mounjaro give you 21. Ozempic gives you 56. Foundayo, the
        new oral pill, gives you forever, because it doesn&apos;t need
        a fridge at all. This guide pulls every number directly from
        the FDA-approved prescribing information for each drug, walks
        through TSA&apos;s actual carry-on rules for injectables and
        ice packs, and answers the practical questions patients
        consistently search for: what happens if my pen gets warm,
        what to do if I forget it at home, and how to handle time-zone
        changes on a once-weekly schedule.
      </p>

      <h2>Why GLP-1s need a fridge in the first place</h2>

      <p>
        Semaglutide and tirzepatide are peptide drugs — long chains of
        amino acids that fold into a specific three-dimensional shape
        to bind the GLP-1 receptor. Heat, freezing, and prolonged room
        temperature all encourage that chain to unfold, aggregate, or
        chemically degrade. The manufacturer&apos;s long-term shelf
        life (typically 24 months) is only valid when the drug is
        held between 2 and 8 degrees Celsius (36-46°F) the entire
        time before first use [1, 2, 3, 4]. The room-temperature
        windows that show up on the labels are not infinite — they
        are the boundary the manufacturer was able to validate with
        actual stability testing, and beyond them the drug&apos;s
        potency is no longer guaranteed.
      </p>

      <p>
        For travel, this means two things. First, you can absolutely
        leave the fridge for a trip — the windows are forgiving enough
        that a one or two week vacation is well within tolerance for
        every approved drug. Second, you should treat the upper
        temperature limit (30°C / 86°F) as a hard ceiling. A pen
        sitting in a hot car at 110°F is in a different stability
        regime than the labeled window contemplates, and the
        conservative call is to discard.
      </p>

      <h2>Storage tolerances at a glance</h2>

      <p>
        These numbers come directly from Section 16 of each
        FDA-approved prescribing information document [1, 2, 3, 4]
        and from Eli Lilly&apos;s Foundayo approval materials [6]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Form</th>
            <th>Out-of-fridge window</th>
            <th>Max temperature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wegovy (semaglutide 2.4 mg)</td>
            <td>Single-use pen</td>
            <td>Up to 28 days, then discard</td>
            <td>30°C / 86°F</td>
          </tr>
          <tr>
            <td>Ozempic (semaglutide)</td>
            <td>Multi-dose pen, in use</td>
            <td>Up to 56 days after first use</td>
            <td>30°C / 86°F</td>
          </tr>
          <tr>
            <td>Zepbound (tirzepatide)</td>
            <td>Single-use pen</td>
            <td>Up to 21 days, then discard</td>
            <td>30°C / 86°F</td>
          </tr>
          <tr>
            <td>Mounjaro (tirzepatide)</td>
            <td>Single-use pen</td>
            <td>Up to 21 days, then discard</td>
            <td>30°C / 86°F</td>
          </tr>
          <tr>
            <td>Foundayo (orforglipron)</td>
            <td>Oral tablet</td>
            <td>No refrigeration required</td>
            <td>Standard room temperature</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two practical observations. The 21-day Zepbound and Mounjaro
        windows are the tightest, so tirzepatide users on a long trip
        should plan around that number, not the more generous Wegovy
        figure. And the Foundayo tablet is the obvious winner for any
        traveler who hates the cold-chain logistics — no fridge, no
        ice pack, no TSA conversation, just a pill bottle in your
        carry-on. For more on the daily-pill protocol, see our{" "}
        <Link href="/research/how-to-take-foundayo-orforglipron-guide">
          Foundayo (orforglipron) practical guide
        </Link>
        .
      </p>

      <h2>TSA rules: pens, syringes, and ice packs</h2>

      <p>
        Injectable medications and the cooling supplies they need are
        explicitly exempt from the standard 3-1-1 liquid rule when
        carried in carry-on baggage [5]. The relevant TSA carve-outs:
      </p>

      <ul>
        <li>
          <strong>Injectable drugs are allowed in carry-on.</strong>{" "}
          GLP-1 pens, insulin syringes, and the multi-dose vials used
          for compounded semaglutide or tirzepatide can all go through
          security in your carry-on bag. There is no quantity limit on
          medically necessary liquid medication.
        </li>
        <li>
          <strong>Frozen ice packs are allowed.</strong> An ice pack
          accompanying a refrigerated medication is exempt from the
          3.4 oz limit. TSA prefers the ice pack to be fully frozen
          and solid at the checkpoint; partially melted slush is
          technically a liquid and can occasionally trigger extra
          screening.
        </li>
        <li>
          <strong>Declare at the checkpoint.</strong> You don&apos;t
          have to declare medications, but doing so up front avoids
          confusion. Tell the TSA officer you have a refrigerated
          injectable medication and an ice pack, and they will route
          you through the standard medical screening.
        </li>
        <li>
          <strong>Documentation is helpful but not required.</strong>{" "}
          A prescription label on the original carton is the cleanest
          option. A doctor&apos;s letter is also fine. Patients on
          compounded GLP-1 from a 503A pharmacy should bring the
          pharmacy label and ideally the patient information sheet.
        </li>
      </ul>

      <h2>Carry-on, never check</h2>

      <p>
        This is the single most important rule in this article.
        Cargo holds on commercial aircraft are not climate controlled
        in any meaningful sense — temperatures regularly drop below
        freezing at cruising altitude and can swing above 100°F on a
        hot tarmac. Either extreme will destroy a GLP-1. The
        FDA-approved labels for all four injectable drugs explicitly
        say to discard a pen that has been frozen, even if it has
        thawed and looks visually normal [1, 2, 3, 4]. Checked
        baggage is the single most reliable way to expose your
        medication to freezing temperatures. Always keep the pen,
        ice pack, and travel case in your cabin bag.
      </p>

      <h2>Cooler bags and gear that actually work</h2>

      <p>
        For trips up to a few days, a basic insulated medication
        travel case with a refreezable gel ice pack is sufficient.
        For longer trips, the evaporative cooling cases (FRIO and
        similar) are popular because they stay cool for 45 hours
        from a single tap-water soak with no ice pack at all — useful
        if you&apos;ll be in transit longer than your ice pack will
        stay frozen.
      </p>

      <p>
        Two practical notes. First, do not let an ice pack contact the
        pen directly. Wrap the ice pack in a small cloth or use a case
        with an insulated divider, because direct ice-pack contact can
        push the pen below freezing — and a frozen pen is a discarded
        pen. Second, if you&apos;re traveling for more than a week and
        want certainty, a cheap wireless thermometer (MedAngel,
        ThermoPro, or any small temperature logger) lets you verify
        the case stayed in the 2-30°C window the whole time.
      </p>

      <h2>Time zones and the once-weekly schedule</h2>

      <p>
        Wegovy, Ozempic, Zepbound, and Mounjaro are all weekly
        injectables. The once-weekly cadence is forgiving because
        steady-state plasma levels build over weeks, not days — a
        single dose shifted by a few hours has essentially no
        clinical effect. Practical guidance:
      </p>

      <ul>
        <li>
          <strong>Short trips (under a week):</strong> stay on your
          home time zone. If your usual injection day is Sunday
          morning at 9 a.m. Eastern, inject at 9 a.m. Eastern even if
          that&apos;s the middle of the afternoon at your destination.
        </li>
        <li>
          <strong>Long trips with a big time-zone shift:</strong>{" "}
          either keep injecting on home time, or shift your weekly
          dose by a few hours per week until it lines up with the
          local schedule. The FDA labels for all four weekly drugs
          explicitly allow shifting the dose day as long as at least
          two days have passed since the last dose.
        </li>
        <li>
          <strong>Foundayo (daily oral):</strong> take it in the
          morning local time on an empty stomach, the same way you
          would at home. Do not double up if you&apos;ve already taken
          your home-time dose for the day.
        </li>
      </ul>

      <h2>What to do if your pen gets warm</h2>

      <p>
        The labeled out-of-fridge windows are the answer to almost
        every &ldquo;what happens if&rdquo; question. A Wegovy pen
        that sat at room temperature for two days during a road trip
        is fine — that&apos;s well within the 28-day window. A
        Zepbound pen that stayed in a beach bag at 80°F for a long
        weekend is fine — it&apos;s within the 21-day window and well
        below the 86°F ceiling. The scenarios where you should
        actually discard:
      </p>

      <ol>
        <li>
          <strong>Sustained exposure above 86°F.</strong> A pen left
          in a hot car (interior temperatures of 110-140°F are
          common in summer) has exceeded the validated stability
          window. Discard.
        </li>
        <li>
          <strong>Out of the fridge longer than the labeled window.</strong>{" "}
          A Wegovy pen at room temperature for 30 days, a Zepbound or
          Mounjaro pen at room temperature for 25 days, or an Ozempic
          pen in use for 60 days — discard, even if it looks normal.
        </li>
        <li>
          <strong>Any freezing event.</strong> If the pen ever frozen
          (ice pack pressed against it, hotel mini-fridge set too
          cold, checked baggage at altitude), discard. Frozen GLP-1
          should not be used [1, 2, 3, 4].
        </li>
      </ol>

      <p>
        For the full FDA-sourced reference on every storage scenario,
        see our{" "}
        <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
          GLP-1 storage and shelf-life guide
        </Link>
        .
      </p>

      <h2>What if you forget your medication at home</h2>

      <p>
        It happens. The options, in rough order of speed:
      </p>

      <ul>
        <li>
          <strong>Local pharmacy refill.</strong> If you&apos;re still
          in the United States, most major chain pharmacies (CVS,
          Walgreens, Walmart) can pull your prescription on file from
          another state and dispense locally. Call ahead — Wegovy and
          Zepbound supply has been tight, so confirm stock before
          driving over.
        </li>
        <li>
          <strong>LillyDirect / NovoCare direct shipment.</strong>{" "}
          Both manufacturers operate direct-to-patient channels. If
          you have time (3-5 business days), they can ship Wegovy or
          Zepbound to a hotel address. Useful for longer trips.
        </li>
        <li>
          <strong>Telehealth bridge prescription.</strong> Most
          telehealth providers will issue a one-time bridge
          prescription to a local pharmacy if you contact support and
          explain the situation.
        </li>
        <li>
          <strong>Skip the dose.</strong> For weekly injectables,
          missing a single dose is not a clinical emergency. The FDA
          labels say to take the missed dose within 5 days of the
          scheduled day; otherwise skip and resume the normal schedule.
        </li>
      </ul>

      <h2>International travel</h2>

      <p>
        All four injectable GLP-1s and Foundayo are approved in most
        developed markets, though brand names and pen formats vary.
        Carrying your US-purchased medication into the EU, UK, Canada,
        Australia, or most of Asia for personal medical use is
        generally permitted, but the rules differ by country. A few
        specific points:
      </p>

      <ul>
        <li>
          <strong>Bring the original carton and the pharmacy label.</strong>{" "}
          Customs officers in most countries will wave through a
          clearly labeled prescription medication in an original
          manufacturer carton. Loose pens in a Ziploc invite questions.
        </li>
        <li>
          <strong>Carry a doctor&apos;s letter for longer trips.</strong>{" "}
          A simple letter on practice letterhead stating the drug, the
          dose, and the medical indication covers most customs
          inquiries. Have it translated into the local language for
          non-English-speaking destinations if you can.
        </li>
        <li>
          <strong>Check destination customs rules.</strong> Some
          countries (Japan, Singapore, the UAE) have strict
          import-by-personal-quantity rules and may require
          pre-arrival medication import certificates. Check the
          destination&apos;s embassy website at least two weeks
          before traveling.
        </li>
      </ul>

      <h2>Compounded GLP-1 vials and travel</h2>

      <p>
        Patients on compounded semaglutide or tirzepatide from a 503A
        pharmacy face a slightly different travel calculus. The
        upside: a compounded multi-dose vial is physically smaller
        than a brand-name pen, which is convenient. The downside: the
        room-temperature stability window for a compounded vial is
        not validated by the same large-scale FDA process as the
        brand pens. The vial&apos;s beyond-use date (BUD) is set by
        the compounding pharmacy under USP &lt;797&gt;, and the
        room-temperature tolerance varies by formulation.
      </p>

      <p>
        Practical guidance for compounded vial travel: keep the vial
        refrigerated when possible, treat the room-temperature window
        as &ldquo;a few days at most&rdquo; unless your pharmacy has
        documented otherwise, and call the compounding pharmacy
        before a long trip to ask for the specific stability window
        for your formulation. They will tell you. If the vial sits
        at room temperature for longer than the pharmacy&apos;s
        documented window, the conservative call is to discard.
      </p>

      <h2>Bottom line</h2>

      <p>
        Traveling with a GLP-1 is genuinely easy if you know the
        numbers. The labeled out-of-fridge windows — 28 days for
        Wegovy, 56 days for Ozempic, 21 days for Zepbound and
        Mounjaro, indefinite for Foundayo — cover almost every real
        travel scenario you&apos;ll encounter. The TSA explicitly
        allows pens, syringes, and frozen ice packs in carry-on.
        Cargo holds are the enemy. A basic insulated case keeps
        everything in spec for the duration of any normal trip. And
        if something goes wrong, the fix is almost always a phone
        call to your pharmacy or a one-time skipped dose, not a
        medical emergency.
      </p>

      <h2>Related research and tools</h2>

      <ul>
        <li>
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            GLP-1 storage and shelf-life: the full FDA reference
          </Link>
        </li>
        <li>
          <Link href="/research/how-to-inject-glp1-step-by-step-technique">
            How to inject a GLP-1: step-by-step technique guide
          </Link>
        </li>
        <li>
          <Link href="/research/how-to-take-foundayo-orforglipron-guide">
            How to take Foundayo (orforglipron): the daily oral GLP-1 guide
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            GLP-1 and surgery: the ASA anesthesia guidance
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-washout-calculator">
            GLP-1 washout calculator
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-unit-converter">
            GLP-1 unit converter (mg to units for compounded vials)
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary">
        Important disclaimer: this article is general patient
        education and not personalized medical advice. The storage
        windows quoted come directly from the FDA-approved
        prescribing information for each drug, but your individual
        medication, your specific compounded formulation, and your
        clinical situation may differ. Always defer to the
        instructions on your pharmacy label, the manufacturer carton,
        and your prescribing clinician. If you suspect your
        medication has been damaged by heat, cold, or freezing, do
        not use it — contact your pharmacy or prescriber for
        replacement guidance.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Can I bring my GLP-1 pen through TSA security?",
            answer:
              "Yes. TSA explicitly allows injectable medications and the cooling supplies (ice packs, gel packs, freezer bags) needed to keep them cold in carry-on baggage. You do not need a prescription, but bringing the original pharmacy label or a doctor's note avoids questions. Declare the medication to the officer at the start of screening.",
          },
          {
            question: "Should I put my Wegovy or Zepbound in checked baggage?",
            answer:
              "No. Cargo holds at altitude can drop below freezing, and freezing destroys GLP-1 medications. Always carry the pen on with you in an insulated medical travel case with an ice pack. Frozen GLP-1 should be discarded even after thawing.",
          },
          {
            question: "How long will an ice pack keep my pen cold during travel?",
            answer:
              "A standard insulated diabetic travel case (FRIO, MedAngel) with a frozen gel ice pack typically keeps a pen at refrigerated temperatures for 8-12 hours. For longer trips, plan a refrigeration stop or use a powered cooler. Don't let the ice pack directly contact the pen — wrap it in cloth or use a case with an insulated divider so the medication doesn't freeze.",
          },
          {
            question: "What if my GLP-1 pen gets warm during travel?",
            answer:
              "If the pen stayed below 86°F (30°C) and the cumulative time at room temperature is within the in-use window (28 days for Wegovy, 56 days for Ozempic, 21 days for Zepbound/Mounjaro), the pen is still safe per the FDA labels. If it exceeded 86°F or you are unsure, the conservative call is to discard and replace.",
          },
          {
            question: "How do I handle GLP-1 dosing across time zones?",
            answer:
              "GLP-1s are once-weekly, so a few hours of time-zone shift is not clinically significant. Take your dose on the same calendar day as usual; if the trip permanently shifts your schedule, choose a new injection day at the destination and stick with it. Do not double-dose to 'catch up' if you are off by a day — skip and resume the next week.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
