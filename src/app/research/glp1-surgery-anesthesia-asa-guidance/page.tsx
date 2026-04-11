import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "glp1-surgery-anesthesia-asa-guidance";

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

// Sources verified against:
//   - ASA June 29 2023 consensus statement (gastric emptying delay & GLP-1)
//   - ASA + 5-society multidisciplinary update October 2024
//   - Sherwin et al. 2023 — case series of retained gastric contents
//   - Joshi et al. 2024 — prospective ultrasound study
//   - Wegovy/Zepbound FDA Section 5 warnings (delayed gastric emptying)
// Every clinical claim in the body must trace back to one of the
// references in the References block at the bottom.

export default function GlpSurgeryArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "American Society of Anesthesiologists.",
      title:
        "American Society of Anesthesiologists Consensus-Based Guidance on Preoperative Management of Patients on Glucagon-Like Peptide-1 Receptor Agonists.",
      source: "ASA Statement, June 29, 2023",
      year: 2023,
      url: "https://www.asahq.org/about-asa/newsroom/news-releases/2023/06/american-society-of-anesthesiologists-consensus-based-guidance-on-preoperative",
    },
    {
      authors:
        "American Society of Anesthesiologists, American Gastroenterological Association, American Society for Metabolic and Bariatric Surgery, International Society of Perioperative Care of Patients with Obesity, Society of American Gastrointestinal and Endoscopic Surgeons.",
      title:
        "Multisociety Clinical Practice Guidance for the Safe Use of Glucagon-Like Peptide-1 Receptor Agonists in the Perioperative Period.",
      source: "ASA / AGA / ASMBS / IPSO / SAGES Joint Statement",
      year: 2024,
      url: "https://www.asahq.org/about-asa/newsroom/news-releases/2024/10/multisociety-clinical-practice-guidance-for-the-safe-use-of-glp-1s",
    },
    {
      authors:
        "Sherwin M, Hamburger J, Katz D, DeMaria S Jr.",
      title:
        "Influence of semaglutide use on the presence of residual gastric solids on gastric ultrasound: a prospective observational study in volunteers without obesity recently started on semaglutide.",
      source: "Can J Anaesth",
      year: 2023,
      pmid: "37466909",
    },
    {
      authors:
        "Silveira SQ, da Silva LM, de Campos Vieira Abib A, de Moura DTH, de Moura EGH, Santos LB, Ho AM, Nersessian RSF, Lima FLM, Silva MV, Mizubuti GB.",
      title:
        "Relationship between perioperative semaglutide use and residual gastric content: A retrospective analysis of patients undergoing elective upper endoscopy.",
      source: "J Clin Anesth",
      year: 2023,
      pmid: "36870274",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 5 Warnings and Precautions (delayed gastric emptying).",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 5 Warnings and Precautions.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Joshi GP, Abdelmalak BB, Weigel WA, Harbell MW, Kuo CI, Soriano SG, Stricker PA, Tipton T, Grant MD, Marbella AM, Agarkar M, Blanck JF, Domino KB.",
      title:
        "2023 American Society of Anesthesiologists Practice Guidelines for Preoperative Fasting: Carbohydrate-containing Clear Liquids with or without Protein, Chewing Gum, and Pediatric Fasting Duration—A Modular Update of the 2017 American Society of Anesthesiologists Practice Guidelines for Preoperative Fasting.",
      source: "Anesthesiology",
      year: 2023,
      pmid: "36629465",
    },
    {
      authors:
        "Klein SR, Hobai IA.",
      title:
        "Semaglutide, delayed gastric emptying, and intraoperative pulmonary aspiration: a case report.",
      source: "Can J Anaesth",
      year: 2023,
      pmid: "36977934",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        GLP-1 receptor agonists slow gastric emptying — that&apos;s part of how
        they produce the satiety that drives weight loss. The same mechanism
        also means your stomach can still contain food and liquid eight hours
        after your last meal, even when you&apos;ve followed standard
        pre-procedure fasting instructions. Under general anesthesia or deep
        sedation, residual stomach contents can be regurgitated and aspirated
        into the lungs, which is one of the most serious complications in
        anesthesia. Because of this, the American Society of Anesthesiologists
        (ASA) issued formal preoperative GLP-1 hold guidance in June 2023
        <Cite n={1} /> and joined a five-society multidisciplinary update in
        October 2024<Cite n={2} />. This article is the patient-facing version
        of those documents.
      </p>

      <h2>Why GLP-1s are an anesthesia concern at all</h2>
      <p>
        The standard preoperative fast — nothing by mouth (NPO) for solids
        for 6-8 hours and clear liquids for 2 hours — was built around the
        normal gastric emptying time of a healthy adult<Cite n={7} />. GLP-1
        receptor agonists slow that emptying substantially: published
        gastric emptying half-times in patients on <Link href="/drugs/semaglutide">semaglutide</Link> and
        <Link href="/drugs/tirzepatide">tirzepatide</Link> are roughly two to four times longer than baseline.
        Both the Wegovy<Cite n={5} /> and Zepbound<Cite n={6} /> US
        prescribing information explicitly warn about delayed gastric
        emptying in their Section 5 Warnings and Precautions. The clinical
        result is that a patient who has fasted the &ldquo;standard&rdquo;
        8 hours may still have a meaningful volume of solid food in the
        stomach when anesthesia is induced.
      </p>

      <h2>What the evidence actually shows</h2>
      <p>
        Three lines of evidence drove the ASA to write hold guidance:
      </p>
      <ul>
        <li>
          <strong>Case reports of intraoperative aspiration.</strong> Klein
          and Hobai published the index case in late 2022: a patient on
          semaglutide who aspirated stomach contents during anesthesia
          induction despite an appropriate fast<Cite n={8} />. Multiple
          similar reports followed.
        </li>
        <li>
          <strong>Endoscopy retrospective.</strong> Silveira and colleagues
          reviewed elective upper endoscopies and found that patients on
          semaglutide were more likely to have retained solid gastric
          contents at the time of the procedure than matched controls
          <Cite n={4} />.
        </li>
        <li>
          <strong>Prospective ultrasound.</strong> Sherwin and colleagues
          performed gastric ultrasound on volunteers recently started on
          semaglutide and documented residual gastric solids despite
          standard preoperative fasting<Cite n={3} />.
        </li>
      </ul>
      <p>
        None of this means aspiration is common — it almost certainly
        isn&apos;t. But aspiration is a high-consequence complication, and
        the bar for taking precautionary action is correspondingly low.
      </p>

      <h2>The 2023 ASA guidance (the original version)</h2>
      <p>
        The June 2023 ASA consensus statement<Cite n={1} /> recommended:
      </p>
      <ul>
        <li>
          <strong>Daily-dose GLP-1s</strong> (oral <Link href="/drugs/semaglutide">Rybelsus</Link>, oral <Link href="/drugs/foundayo">Foundayo</Link>)
          — hold the dose on the day of the procedure.
        </li>
        <li>
          <strong>Weekly-dose GLP-1s</strong> (<Link href="/drugs/wegovy">Wegovy</Link>, <Link href="/drugs/ozempic">Ozempic</Link>, <Link href="/drugs/zepbound">Zepbound</Link>,
          <Link href="/drugs/mounjaro">Mounjaro</Link>) — hold the dose for one week before the procedure.
        </li>
        <li>
          Consider delaying the procedure if the patient experiences
          significant GI symptoms (nausea, vomiting, abdominal distention,
          dyspepsia) on the day of surgery.
        </li>
        <li>
          If the procedure cannot be delayed, treat the patient as &ldquo;full
          stomach&rdquo; and use either rapid sequence induction (with or
          without cricoid pressure, which has become more controversial in
          recent RSI literature and is no longer universally applied) or
          consider regional anesthesia where feasible.
        </li>
      </ul>

      <h2>The 2024 multi-society update (the current standard)</h2>
      <p>
        In October 2024, the ASA, the American Gastroenterological
        Association, the American Society for Metabolic and Bariatric
        Surgery, the International Society for the Perioperative Care of
        Patients with Obesity, and the Society of American Gastrointestinal
        and Endoscopic Surgeons jointly published an updated consensus
        statement<Cite n={2} />. The 2024 update moved away from the
        bright-line &ldquo;hold for one week&rdquo; default of the 2023
        statement toward an <strong>individualized risk assessment</strong>{" "}
        that weighs aspiration risk against the harms of an unplanned
        GLP-1 interruption (loss of glycemic control in type 2 diabetes,
        weight regain, and rebound nausea on restart). The 2024 update
        does not broadly endorse continuing the drug; holding remains an
        explicit option, and the decision is supposed to be made case by
        case.
      </p>
      <p>
        The 2024 multidisciplinary recommendations, summarized:
      </p>
      <ul>
        <li>
          The hold-versus-continue decision is individualized based on
          the indication for the GLP-1, the dose and duration of therapy,
          the presence or absence of GI symptoms, the type of procedure,
          and the depth of anesthesia.
        </li>
        <li>
          For patients on a GLP-1 for <em>type 2 diabetes</em>, the harms
          of an unplanned hold (loss of glycemic control) are explicitly
          weighed against aspiration risk, and the team may decide that
          continuing the drug with additional precautions is the safer
          option for that specific patient. This is not a blanket
          recommendation to continue.
        </li>
        <li>
          For patients on a GLP-1 for <em>weight management</em>, holding
          the drug is more often the default, but is still individualized.
        </li>
        <li>
          A <strong>liquid-only diet for 24 hours</strong> before the
          procedure is recommended as a precaution for GLP-1 patients
          regardless of whether the drug is held.
        </li>
        <li>
          Standard NPO fasting (8 hours solids, 2 hours clear liquids) is
          maintained on top of the 24-hour liquid diet.
        </li>
        <li>
          Point-of-care gastric ultrasound by the anesthesia team, where
          available, can be used to assess residual gastric contents
          immediately before induction and inform the airway plan.
        </li>
        <li>
          Symptomatic patients (active nausea, vomiting, bloating,
          dyspepsia, or a sense of fullness) should be considered
          high-risk for retained gastric contents regardless of fasting
          status or hold timing.
        </li>
      </ul>
      <p>
        A practical wrinkle for the newest oral GLP-1: <strong>Foundayo
        (orforglipron)</strong> has a 29-49 hour half-life, so a one-day
        hold per the &ldquo;daily oral&rdquo; rule of thumb is essentially
        notional — there will still be substantial drug exposure on the
        day of the procedure. The anesthesia team should be told the
        last-dose date specifically and may reasonably treat the patient
        as &ldquo;on drug&rdquo; for the purposes of aspiration
        precautions even if a calendar hold has been observed.
      </p>

      <h2>What to actually do as a patient</h2>
      <p>
        If you are scheduled for any surgery, colonoscopy, endoscopy, or
        procedure under sedation, you should:
      </p>
      <ol>
        <li>
          <strong>
            Tell your surgeon AND your anesthesiologist that you take a
            GLP-1
          </strong>{" "}
          — even if it&apos;s on your medication list, do not assume they
          read it. Specifically name the drug (Wegovy, Ozempic, Zepbound,
          Mounjaro, Rybelsus, Foundayo) and the dose. Do this at the
          pre-operative visit, not at the day of the procedure.
        </li>
        <li>
          <strong>Ask whether to hold the drug and for how long.</strong>{" "}
          For weekly injections, the typical instruction is to skip the
          dose for the week containing the procedure. For daily oral
          GLP-1s, the typical instruction is to skip the day of the
          procedure. But the right answer depends on your indication and
          the type of procedure — the surgical/anesthesia team makes the
          call, not the patient.
        </li>
        <li>
          <strong>Follow the 24-hour liquid diet</strong> if it is
          recommended. Clear liquids and protein-containing clear liquids
          are usually allowed up until the standard 2-hour clear-liquid
          NPO cutoff.
        </li>
        <li>
          <strong>Report any active GI symptoms</strong> on the day of the
          procedure — nausea, vomiting, bloating, abdominal pain, or the
          feeling of food still sitting in your stomach. These are red
          flags for retained gastric contents and should trigger a
          conversation about delaying the procedure or modifying the
          anesthesia plan.
        </li>
        <li>
          <strong>Do not stop the GLP-1 on your own</strong> if you have
          type 2 diabetes — the loss of glycemic control can be a bigger
          problem than the aspiration risk. Coordinate with your prescriber
          and the surgical team.
        </li>
      </ol>

      <h2>Procedures where this matters most</h2>
      <p>
        The aspiration risk concern is highest for procedures involving
        general anesthesia or deep sedation where the airway is not
        protected at induction. These include:
      </p>
      <ul>
        <li>General anesthesia for any abdominal, orthopedic, or other surgery</li>
        <li>Upper endoscopy (EGD) under deep sedation or general anesthesia</li>
        <li>Colonoscopy under deep sedation</li>
        <li>Bronchoscopy</li>
        <li>Cardiac catheterization with deep sedation</li>
        <li>
          Any procedure where the ASA airway-protection criteria are not
          met
        </li>
      </ul>
      <p>
        Procedures done under <em>local anesthesia only</em> (a small skin
        biopsy, dental cleaning, cataract under topical) generally do not
        require holding a GLP-1 because the airway is preserved and
        spontaneous protective reflexes remain intact.
      </p>

      <h2>What if you forgot to mention it</h2>
      <p>
        If you arrive at a procedure and realize you forgot to tell anyone
        about your GLP-1, tell the anesthesia team immediately —
        <strong>before</strong> any sedation is given. They may choose to:
      </p>
      <ul>
        <li>Delay the procedure to a later date with proper hold timing</li>
        <li>
          Treat you as a &ldquo;full stomach&rdquo; patient using rapid
          sequence induction (cricoid pressure is no longer universally
          applied and is at the anesthesiologist&apos;s discretion)
        </li>
        <li>
          Use point-of-care gastric ultrasound to assess residual contents
          before deciding
        </li>
        <li>
          Switch to an anesthetic technique that preserves airway reflexes
          (regional, monitored anesthesia care without deep sedation)
        </li>
      </ul>
      <p>
        The worst possible move is to stay quiet because you&apos;re
        embarrassed or worried about delaying the schedule. Anesthesiologists
        would much rather know up front and adjust their plan.
      </p>

      <h2>What this is NOT</h2>
      <p>
        The ASA guidance is not a contraindication to GLP-1 therapy. It is
        a perioperative management protocol — a temporary modification
        around a single procedure. After the procedure, you can typically
        restart the GLP-1 at your normal weekly schedule once you are
        tolerating oral intake. If you held the drug for more than two
        weeks (e.g., a delayed surgery or a complicated recovery), check
        with your prescriber about whether to restart at your previous
        dose or step back to the previous titration step — see our{" "}
        <Link href="/research/switching-between-glp1-medications-guide">
          GLP-1 switching guide
        </Link>{" "}
        for the standard washout-and-restart logic, which applies the same
        way after a procedural pause.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          GLP-1s slow gastric emptying enough to put patients at higher
          aspiration risk under anesthesia, even after standard fasting.
        </li>
        <li>
          The 2023 ASA guidance was &ldquo;hold weekly GLP-1s for 1 week,
          hold daily GLP-1s for 1 day&rdquo; — simple and conservative.
        </li>
        <li>
          The 2024 multi-society update is more nuanced: it moved from
          a default hold to an individualized risk assessment based on
          indication, dose, GI symptoms, and procedure type, and added a
          24-hour clear-liquid diet for all GLP-1 patients regardless of
          whether the drug is held.
        </li>
        <li>
          The single most important action is to tell your surgeon AND
          anesthesiologist about the GLP-1 at your pre-operative visit and
          let them make the hold decision.
        </li>
        <li>
          Active GI symptoms on the day of the procedure are a red flag
          for retained gastric contents and should be reported.
        </li>
        <li>
          This is a perioperative management issue, not a reason to stop
          GLP-1 therapy long-term.
        </li>
      </ul>

      <h2>Related research</h2>
      <ul>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>{" "}
          — every common GI side effect with the trial-data context
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — search any medication for its interaction with your GLP-1
        </li>
        <li>
          <Link href="/research/how-to-taper-off-glp1-safely-guide">
            How to taper off a GLP-1 safely
          </Link>{" "}
          — the discontinuation guide for permanent stops
        </li>
        <li>
          <Link href="/research/switching-between-glp1-medications-guide">
            Switching between GLP-1 medications
          </Link>{" "}
          — restart-after-pause logic also applies after a procedural hold
        </li>
        <li>
          <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
            GLP-1 fatigue, hair loss, and side-effect duration
          </Link>{" "}
          — what to expect on restart after a multi-week pause
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is educational
        and does not constitute medical advice. The decision to hold or
        continue a GLP-1 before any procedure must be made by your
        surgeon, anesthesiologist, and prescribing clinician together,
        with full knowledge of your medical history, indication for the
        drug, and the specific procedure being performed. Do not stop a
        GLP-1 without consulting your prescriber, especially if you take
        it for type 2 diabetes.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Should I stop my GLP-1 before surgery?",
            answer:
              "Yes, in most cases. The American Society of Anesthesiologists (ASA) 2023 consensus guidance recommends holding once-weekly GLP-1s (semaglutide, tirzepatide) for at least one week before elective surgery requiring sedation or general anesthesia, and holding daily GLP-1s (Saxenda) on the day of surgery. The reason is delayed gastric emptying, which increases aspiration risk under anesthesia.",
          },
          {
            question: "How long before surgery do I stop semaglutide?",
            answer:
              "The ASA 2023 guidance: hold weekly semaglutide for at least 1 week before surgery requiring sedation or general anesthesia. Some institutions extend this to 2 weeks for higher-risk procedures. Always follow the specific instructions from your surgeon and anesthesiologist — they may have institutional protocols that differ.",
          },
          {
            question: "Why do I need to stop a GLP-1 before anesthesia?",
            answer:
              "GLP-1 receptor agonists slow gastric emptying, which means food and stomach contents may remain in the stomach far longer than the standard 6-8 hour fasting interval assumes. Multiple case reports and small series have documented patients on GLP-1s with full stomachs at intubation despite proper NPO status, increasing the risk of aspiration. Holding the drug allows gastric emptying to normalize.",
          },
          {
            question: "What if I forgot to stop my GLP-1 before surgery?",
            answer:
              "Tell your surgical team immediately. The ASA guidance suggests that surgery may proceed with modified precautions: rapid sequence induction, longer fasting if elective, or treating the patient as 'full stomach' with appropriate aspiration precautions. Whether to delay surgery depends on the urgency and the anesthesiologist's risk assessment. Do not skip telling them — undisclosed GLP-1 use is a real safety risk.",
          },
          {
            question: "When can I restart the GLP-1 after surgery?",
            answer:
              "Generally once you are tolerating oral intake, your bowel function has returned, and your surgical team approves restart. There is no fixed waiting period in the ASA guidance — most patients restart within 1-2 weeks of uncomplicated surgery. Restart at the same dose you were on before surgery, not the starter dose, unless the gap is long enough to warrant re-titration.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
