import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "orforglipron-foundayo-side-effects";

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

// All adverse event language in this article is sourced from the FDA
// Foundayo (orforglipron) US Prescribing Information (April 1, 2026)
// and the ATTAIN-1 phase 3 readout summarized in Eli Lilly's approval
// press release. Where the exact ATTAIN-1 percentage point rates are
// not yet publicly itemized in a peer-reviewed publication, we cite
// the FDA label and describe the event qualitatively rather than
// inventing a number. Class-level comparisons (Wegovy, Zepbound) are
// sourced from the respective FDA labels.

const FAQ_ITEMS = [
  {
    question:
      "Are orforglipron side effects worse than Ozempic side effects?",
    answer:
      "No. The FDA Foundayo label and the ATTAIN-1 trial show the same GI side effect profile as injectable semaglutide — nausea, diarrhea, vomiting, constipation, and decreased appetite. Rates are broadly similar across the GLP-1 class because the mechanism is the same. Oral delivery does not make the GI effects worse.",
  },
  {
    question: "How long do orforglipron side effects last?",
    answer:
      "Most GI side effects appear in the first days after starting Foundayo or after a dose increase, then taper over 2 to 4 weeks as the body adapts. Persistent symptoms beyond a month, or severe symptoms at any point, should be reviewed with the prescribing clinician — sometimes the answer is to slow titration or stay an extra cycle on the current dose.",
  },
  {
    question: "Can orforglipron cause weight regain when you stop?",
    answer:
      "Stopping any GLP-1 typically causes some weight regain because the appetite signal returns. Long-term post-discontinuation data on orforglipron specifically has not been published yet, but the pattern documented for injectable semaglutide in STEP-1 and STEP-4 is that most patients regain a substantial fraction of lost weight within a year after stopping. Plan the off-ramp with a clinician.",
  },
  {
    question: "Does taking orforglipron with food help with nausea?",
    answer:
      "Foundayo is specifically labeled to be taken on an empty stomach with plain water, so you cannot take it with food. To reduce nausea, focus on the rest of the day: eat smaller meals, avoid greasy or very rich foods, stay hydrated, and stop eating at the first sign of fullness. Your prescriber can also slow the titration schedule.",
  },
  {
    question: "Is orforglipron safer than injectable GLP-1s?",
    answer:
      "The Foundayo FDA label carries the same boxed warning for medullary thyroid carcinoma and the same warnings for pancreatitis, gallbladder disease, kidney injury, hypoglycemia in combination with insulin or sulfonylureas, allergic reactions, and pregnancy contraindication as Wegovy, Ozempic, and Zepbound. The safety profile is broadly the same across the class.",
  },
  {
    question: "Should I stop orforglipron if I get side effects?",
    answer:
      "Mild to moderate GI side effects in the first weeks are expected and usually do not require stopping — they typically resolve as the body adapts. Stop and call the prescriber for severe persistent vomiting, severe abdominal pain (possible pancreatitis), neck swelling or trouble swallowing (possible thyroid issue), signs of an allergic reaction, or signs of dehydration.",
  },
];

export default function OrforgliproSideEffectsArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information (FDA-approved April 1, 2026). Includes boxed warning for thyroid C-cell tumors, warnings and precautions, and adverse reactions sections.",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FDA approves Lilly's Foundayo (orforglipron), the only GLP-1 pill for weight loss — investor press release with ATTAIN-1 phase 3 trial efficacy and safety summary.",
      source: "Eli Lilly Investor Relations",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information. Boxed warning for thyroid C-cell tumors and full adverse reactions table from the STEP program.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information. Boxed warning, warnings and precautions, and SURMOUNT program adverse reactions data.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/217806s000lbl.pdf",
    },
    {
      authors:
        "Bezin J, Gouverneur A, Penichon M, Mathieu C, Garrel R, Hillaire-Buys D, Pariente A, Faillie JL.",
      title:
        "GLP-1 Receptor Agonists and the Risk of Thyroid Cancer.",
      source: "Diabetes Care",
      year: 2023,
      pmid: "36356111",
    },
    {
      authors:
        "American Society of Anesthesiologists Task Force on Preoperative Fasting.",
      title:
        "American Society of Anesthesiologists Consensus-Based Guidance on Preoperative Management of Patients on Glucagon-Like Peptide-1 Receptor Agonists.",
      source: "ASA Guidance",
      year: 2023,
      url: "https://www.asahq.org/about-asa/newsroom/news-releases/2023/06/american-society-of-anesthesiologists-consensus-based-guidance-on-preoperative",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Updated Drug Safety Communication and Pregnancy Labeling for GLP-1 Receptor Agonists — discontinue at least 2 months before a planned pregnancy.",
      source: "FDA Drug Safety",
      year: 2024,
      url: "https://www.fda.gov/drugs/drug-safety-and-availability",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        The most common <Link href="/drugs/foundayo">Foundayo</Link> (orforglipron) side effects are{" "}
        <strong>
          nausea, diarrhea, vomiting, constipation, and decreased
          appetite
        </strong>{" "}
        — all gastrointestinal, all dose-dependent, and most resolve
        within a few weeks of starting therapy or moving up a titration
        step<Cite n={1} />. Foundayo carries the same boxed warning
        for medullary thyroid carcinoma as every other FDA-approved
        GLP-1 receptor agonist, and the same warnings for pancreatitis,
        gallbladder disease, kidney injury from dehydration,
        hypoglycemia in combination with insulin or sulfonylureas,
        allergic reactions, and pregnancy<Cite n={1} />. This article
        walks through what the FDA Foundayo label and the ATTAIN-1
        phase 3 trial actually report, how those rates compare to
        injectable <Link href="/drugs/wegovy">Wegovy</Link> and <Link href="/drugs/zepbound">Zepbound</Link>, and the practical questions
        patients keep searching for.
      </p>

      <div className="my-8 rounded-lg border border-brand-violet/30 bg-brand-violet/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">
          Quick answer
        </p>
        <p className="mt-2 text-brand-text-primary">
          The most common Foundayo (orforglipron) side effects are
          nausea, diarrhea, vomiting, constipation, and decreased
          appetite — all GI, all dose-dependent, most resolve within
          weeks. Foundayo also carries the same boxed warning for
          medullary thyroid carcinoma and the same pancreatitis,
          gallbladder, hypoglycemia (in combination), kidney, and
          pregnancy warnings as every other FDA-approved GLP-1.
        </p>
      </div>

      <h2>Most common side effects (ATTAIN-1 trial and FDA label)</h2>

      <p>
        Foundayo&apos;s approval was anchored on{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          ATTAIN-1
        </Link>
        , a 72-week, randomized, double-blind, placebo-controlled
        phase 3 trial in adults with obesity or overweight without
        type 2 diabetes<Cite n={2} />. The Eli Lilly approval press
        release for Foundayo identifies the most commonly reported
        adverse events in the ATTAIN program as the standard GLP-1
        gastrointestinal cluster — nausea, constipation, diarrhea,
        vomiting, abdominal pain, indigestion, belching, and heartburn
        — plus headache, abdominal distension, fatigue, gas, and hair
        loss<Cite n={2} />.
      </p>

      <p>
        The exact percentage point rates patients should consult are
        in Section 6 (Adverse Reactions) of the FDA Foundayo
        Prescribing Information<Cite n={1} />. The qualitative pattern
        is identical to what <Link href="/drugs/semaglutide">semaglutide</Link> and <Link href="/drugs/tirzepatide">tirzepatide</Link> produce in
        their respective trials: GI events are dose-dependent, peak
        in the days after a titration step, and taper as the body
        adapts. The FDA label is the source of truth — when in doubt,
        read Section 6 or ask your prescriber.
      </p>

      <table>
        <thead>
          <tr>
            <th>Side effect category</th>
            <th>Foundayo (per FDA label)</th>
            <th>Class context</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nausea</td>
            <td>Most common; dose-dependent</td>
            <td>Reported in 30-44% of Wegovy patients in STEP-1<Cite n={3} /></td>
          </tr>
          <tr>
            <td>Diarrhea</td>
            <td>Common; dose-dependent</td>
            <td>Common across all GLP-1 trials<Cite n={3} /></td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td>Common; dose-dependent</td>
            <td>Common across all GLP-1 trials<Cite n={3} /></td>
          </tr>
          <tr>
            <td>Constipation</td>
            <td>Common</td>
            <td>Common across all GLP-1 trials<Cite n={3} /></td>
          </tr>
          <tr>
            <td>Decreased appetite</td>
            <td>Common (often the desired effect)</td>
            <td>Class effect across all GLP-1 agonists<Cite n={3} /></td>
          </tr>
          <tr>
            <td>Headache, fatigue, abdominal pain</td>
            <td>Common in ATTAIN program</td>
            <td>Reported across the GLP-1 class<Cite n={2} /></td>
          </tr>
        </tbody>
      </table>

      <p>
        We are deliberately not inventing percentage figures the FDA
        Foundayo label has not yet itemized in publicly accessible
        copy. Once the full prescribing information is posted to
        DailyMed and the ATTAIN-1 manuscript is peer-reviewed, this
        article will be refreshed with the exact percentage point
        rates. The qualitative pattern — GI dominant, dose-dependent,
        adaptive over weeks — is consistent across every FDA-approved
        GLP-1 receptor agonist<Cite n={3} /><Cite n={4} />.
      </p>

      <h2>GI side effects in detail</h2>

      <p>
        The four GI events that drive most Foundayo discontinuation
        in the early weeks are nausea, vomiting, diarrhea, and
        constipation. They share a mechanism: GLP-1 receptor activation
        slows gastric emptying, which is exactly the appetite
        suppression mechanism patients are paying for. The same
        slowed-emptying signal that makes you feel full after a few
        bites is what makes a too-large meal feel uncomfortable for
        hours afterward.
      </p>

      <p>
        A common patient assumption is that an oral GLP-1 will be
        easier on the stomach than an injection. The trial data does
        not support that assumption. Foundayo is taken into the
        bloodstream and reaches the same GLP-1 receptors throughout
        the body — including the receptors on the GI tract — that
        injectable semaglutide and tirzepatide activate. The route of
        administration changes nothing about the downstream
        pharmacology<Cite n={2} />. Foundayo&apos;s GI tolerability
        profile is broadly comparable to injectable semaglutide at
        comparable receptor activation, not better.
      </p>

      <p>
        The single biggest tolerability lever is{" "}
        <strong>titration speed</strong>. The labeled Foundayo
        titration is six four-week steps from 0.8 mg up to the 17.2
        mg maintenance dose<Cite n={1} />. Patients who escalate too
        fast — chasing weight loss — typically pay for it with a week
        of GI symptoms after each step. Patients who stay on a step
        an extra cycle when they need to typically tolerate the
        eventual maintenance dose much better. See our{" "}
        <Link href="/research/how-to-take-foundayo-orforglipron-guide">
          Foundayo dosing guide
        </Link>{" "}
        for the full titration table.
      </p>

      <h2>Boxed warning: medullary thyroid carcinoma</h2>

      <p>
        Foundayo carries the same boxed warning as every other
        FDA-approved GLP-1 receptor agonist — Wegovy, <Link href="/drugs/ozempic">Ozempic</Link>,
        Zepbound, <Link href="/drugs/mounjaro">Mounjaro</Link>, Saxenda, Trulicity, Victoza, Rybelsus —
        for thyroid C-cell tumors, including medullary thyroid
        carcinoma (MTC)<Cite n={1} /><Cite n={3} /><Cite n={4} />.
        Foundayo is contraindicated in patients with a personal or
        family history of MTC and in patients with Multiple Endocrine
        Neoplasia syndrome type 2 (MEN 2)<Cite n={1} />.
      </p>

      <p>
        The boxed warning is based on{" "}
        <strong>rodent data</strong>, not human data. In the original
        carcinogenicity studies submitted for liraglutide and
        subsequent GLP-1 agonists, rats and mice given long-term
        high-dose GLP-1 exposure developed thyroid C-cell tumors. The
        relevance of that signal to humans is uncertain — humans have
        far fewer C-cells than rodents and the receptor density and
        signaling differ — and large pharmacovigilance studies have
        not consistently replicated a thyroid cancer signal in humans
        on GLP-1 agonists. A 2023 nested case-control study in the
        French national health database (Bezin et al., Diabetes Care)
        reported an association between cumulative GLP-1 use and
        thyroid cancer that has been heavily debated for residual
        confounding<Cite n={5} />. The current consensus is that the
        absolute risk in humans is very low if it exists at all, but
        the FDA has chosen to maintain the boxed warning across the
        class until cleaner long-term human data are available.
      </p>

      <p>
        For our full review of the GLP-1 thyroid cancer evidence,
        including the Bezin paper, the Spanish cohort, and the more
        reassuring SELECT post-hoc data, see{" "}
        <Link href="/research/does-glp1-cause-cancer-mtc-thyroid-evidence">
          Does GLP-1 cause cancer? The MTC and thyroid evidence
        </Link>
        .
      </p>

      <h2>Less common but serious adverse events</h2>

      <p>
        The Foundayo FDA label includes the same Section 5 (Warnings
        and Precautions) safety topics as the rest of the GLP-1
        class<Cite n={1} />:
      </p>

      <ul>
        <li>
          <strong>Pancreatitis.</strong> Acute pancreatitis has been
          reported across the GLP-1 class in postmarketing
          surveillance. Foundayo should be discontinued if pancreatitis
          is suspected. Patients with a personal history of
          pancreatitis should discuss the risk-benefit with their
          prescriber<Cite n={1} />.
        </li>
        <li>
          <strong>Gallbladder disease (cholelithiasis, cholecystitis).</strong>{" "}
          GLP-1 agonists are associated with an increased rate of
          gallbladder events, particularly in the context of rapid
          weight loss<Cite n={3} />. The Foundayo label warns for the
          same signal.
        </li>
        <li>
          <strong>Acute kidney injury.</strong> Severe GI side effects
          can cause dehydration, which in turn can cause acute kidney
          injury or worsen pre-existing chronic kidney disease.
          Patients should hydrate aggressively, especially during
          titration<Cite n={1} />.
        </li>
        <li>
          <strong>Hypoglycemia.</strong> Foundayo alone does not
          typically cause hypoglycemia in non-diabetic patients
          because GLP-1 only stimulates insulin in the presence of
          elevated glucose. Risk increases substantially when Foundayo
          is combined with insulin or a sulfonylurea<Cite n={1} />,
          which is why diabetic patients on those drugs need a dose
          reduction at the start of GLP-1 therapy.
        </li>
        <li>
          <strong>Hypersensitivity (allergic) reactions.</strong>{" "}
          Serious allergic reactions including anaphylaxis and
          angioedema have been reported across the GLP-1 class.
          Discontinue and seek emergency care for any signs of a
          severe allergic reaction<Cite n={1} />.
        </li>
        <li>
          <strong>Suicidal thoughts and behavior monitoring.</strong>{" "}
          The FDA reviewed the GLP-1 class for a suicidal ideation
          signal in 2024 and did not find a causal relationship, but
          the labels still recommend monitoring for new or worsening
          depression, suicidal thoughts, or behavior changes,
          particularly in patients with a history of mood disorders.
        </li>
        <li>
          <strong>Pulmonary aspiration during anesthesia.</strong>{" "}
          Because GLP-1 agonists slow gastric emptying, patients on
          Foundayo undergoing elective surgery or any procedure
          requiring sedation should follow the American Society of
          Anesthesiologists guidance, which currently recommends
          considering withholding the drug or extending fasting on
          procedure day to reduce aspiration risk<Cite n={6} />.
        </li>
      </ul>

      <h2>Pregnancy and fertility</h2>

      <p>
        Foundayo is contraindicated in pregnancy. The FDA recommends
        discontinuing GLP-1 receptor agonists at least{" "}
        <strong>two months</strong> before a planned pregnancy because
        the drug crosses the placenta and animal reproductive studies
        show fetal harm at therapeutic exposures<Cite n={7} />. The
        two-month washout reflects orforglipron&apos;s elimination
        half-life and the goal of clearing the drug before
        organogenesis.
      </p>

      <p>
        A separate consideration for women of reproductive age:
        Foundayo&apos;s prescribing information includes a specific
        oral contraceptive interaction. Per Section 7.1 of the
        Foundayo PI, women on oral contraceptives should add a barrier
        method (or switch to a non-oral hormonal method, an IUD, or an
        implant) for 30 days after starting Foundayo and 30 days after
        each dose increase<Cite n={1} />. For the broader fertility
        and pregnancy picture across the GLP-1 class, see{" "}
        <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
          GLP-1s, pregnancy, PCOS, and women&apos;s reproductive health
        </Link>
        .
      </p>

      <h2>How Foundayo side effects compare to injectable GLP-1s</h2>

      <p>
        The honest answer: rates look broadly similar across the
        class. Wegovy (semaglutide) reported nausea in roughly 30-44%
        of patients in STEP-1<Cite n={3} />, vomiting in 18-24%,
        diarrhea in 23-30%, and constipation in 17-24%. Zepbound
        (tirzepatide) reported similar rates in SURMOUNT-1<Cite n={4} />.
        Foundayo&apos;s ATTAIN program identifies the same GI cluster
        as the most common adverse events<Cite n={2} />, and the FDA
        Foundayo label includes the same warnings as Wegovy and
        Zepbound<Cite n={1} />.
      </p>

      <p>
        The fair statement is that <strong>oral delivery does not
        meaningfully change the GI tolerability profile</strong> of a
        GLP-1 agonist. The differences between Foundayo and the
        injectables are:
      </p>

      <ul>
        <li>
          <strong>Daily vs weekly dosing.</strong> Foundayo is a
          once-daily pill; Wegovy, Ozempic, Zepbound, and Mounjaro
          are once-weekly injections. A daily oral dose creates a
          smoother concentration curve with less peak-to-trough
          swing, which some patients tolerate better.
        </li>
        <li>
          <strong>No injection site reactions.</strong> Foundayo
          eliminates the redness, itching, and lump at the injection
          site that some injectable patients experience.
        </li>
        <li>
          <strong>Effect size.</strong> Foundayo&apos;s 17.2 mg
          labeled-dose efficacy (~11.1% mean weight loss in
          non-diabetic adults) sits below injectable semaglutide
          (~14.9% in STEP-1) and well below tirzepatide (~20.9% in
          SURMOUNT-1). The trade-off is convenience vs maximum
          weight loss.
        </li>
      </ul>

      <p>
        For the side-by-side trial-arm comparison and price
        breakdown, see our{" "}
        <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
          Foundayo vs Wegovy vs Zepbound comparison
        </Link>{" "}
        and the broader{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          GLP-1 side effects investigation
        </Link>
        .
      </p>

      <h2>Managing side effects</h2>

      <p>
        Most Foundayo GI side effects are manageable with simple
        practical changes, especially during the first weeks on a new
        dose. The four highest-leverage interventions:
      </p>

      <ol>
        <li>
          <strong>Slow titration.</strong> The single biggest lever.
          If a step makes you feel terrible for more than a few days,
          ask your prescriber whether you can stay on the previous
          dose for an extra 4 weeks before trying again. The labeled
          schedule is a maximum, not a minimum.
        </li>
        <li>
          <strong>Smaller, more frequent meals.</strong> Slowed gastric
          emptying makes large meals feel uncomfortable for hours.
          Stop eating at the first sign of fullness. Most patients
          find that 4-5 small meals per day are tolerated far better
          than 2-3 normal-sized ones.
        </li>
        <li>
          <strong>Hydration.</strong> Aim for at least 64 oz of
          non-caloric fluid daily, more if you have any vomiting or
          diarrhea. Dehydration is the mechanism behind the kidney
          injury warning on the Foundayo label<Cite n={1} />.
        </li>
        <li>
          <strong>Antiemetics for severe nausea.</strong> Prescribers
          can prescribe ondansetron (Zofran) or prochlorperazine for
          short courses if titration adjustment is not enough. Do not
          self-medicate without checking with your prescriber.
        </li>
      </ol>

      <p>
        For a full practical playbook on GLP-1 nausea management
        across the class, see{" "}
        <Link href="/research/glp1-nausea-management-practical-guide">
          GLP-1 nausea management practical guide
        </Link>
        .
      </p>

      <h2>When to call your doctor</h2>

      <div className="my-6 rounded-lg border border-brand-violet/30 bg-brand-violet/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">
          Red flags — call your prescriber or seek care
        </p>
        <ul className="mt-3 space-y-2 text-brand-text-primary">
          <li>
            <strong>Severe persistent vomiting</strong> that prevents
            keeping fluids down for more than 24 hours, or any signs
            of dehydration (dark urine, dizziness, rapid heart rate).
          </li>
          <li>
            <strong>Severe abdominal pain</strong>, especially upper
            abdominal pain that radiates to the back — possible
            pancreatitis. Stop Foundayo and seek evaluation.
          </li>
          <li>
            <strong>Right upper quadrant pain, fever, or jaundice</strong>{" "}
            — possible gallbladder event.
          </li>
          <li>
            <strong>Neck swelling, hoarseness, trouble swallowing, or
            shortness of breath</strong> — discuss with your prescriber
            given the boxed thyroid warning.
          </li>
          <li>
            <strong>Hives, facial or tongue swelling, trouble
            breathing</strong> — possible severe allergic reaction.
            Seek emergency care.
          </li>
          <li>
            <strong>New or worsening depression, suicidal thoughts,
            or unusual mood changes</strong> — contact your prescriber.
          </li>
          <li>
            <strong>Symptoms of low blood sugar</strong> (shaking,
            sweating, confusion) if you are on Foundayo plus insulin
            or a sulfonylurea — contact your prescriber for a dose
            reassessment.
          </li>
        </ul>
      </div>

      <h2>Frequently asked questions</h2>

      <h3>Are orforglipron side effects worse than Ozempic side effects?</h3>
      <p>
        No. The FDA Foundayo label and the ATTAIN-1 trial show the
        same GI side effect profile as injectable semaglutide —
        nausea, diarrhea, vomiting, constipation, and decreased
        appetite. Rates are broadly similar across the GLP-1 class
        because the mechanism is the same. Oral delivery does not
        make the GI effects worse<Cite n={1} /><Cite n={3} />.
      </p>

      <h3>How long do orforglipron side effects last?</h3>
      <p>
        Most GI side effects appear in the first days after starting
        Foundayo or after a dose increase, then taper over 2 to 4
        weeks as the body adapts. Persistent symptoms beyond a month,
        or severe symptoms at any point, should be reviewed with the
        prescribing clinician — sometimes the answer is to slow
        titration or stay an extra cycle on the current dose.
      </p>

      <h3>Can orforglipron cause weight regain when you stop?</h3>
      <p>
        Stopping any GLP-1 typically causes some weight regain because
        the appetite signal returns. Long-term post-discontinuation
        data on orforglipron specifically has not been published yet,
        but the pattern documented for injectable semaglutide is that
        most patients regain a substantial fraction of lost weight
        within a year after stopping. Plan the off-ramp with a
        clinician.
      </p>

      <h3>Does taking orforglipron with food help with nausea?</h3>
      <p>
        Foundayo is specifically labeled to be taken on an empty
        stomach with plain water<Cite n={1} />, so you cannot take it
        with food. To reduce nausea, focus on the rest of the day:
        eat smaller meals, avoid greasy or very rich foods, stay
        hydrated, and stop eating at the first sign of fullness. Your
        prescriber can also slow the titration schedule.
      </p>

      <h3>Is orforglipron safer than injectable GLP-1s?</h3>
      <p>
        The Foundayo FDA label carries the same boxed warning for
        medullary thyroid carcinoma and the same warnings for
        pancreatitis, gallbladder disease, kidney injury, hypoglycemia
        in combination with insulin or sulfonylureas, allergic
        reactions, and pregnancy contraindication as Wegovy, Ozempic,
        and Zepbound<Cite n={1} /><Cite n={3} /><Cite n={4} />. The
        safety profile is broadly the same across the class.
      </p>

      <h3>Should I stop orforglipron if I get side effects?</h3>
      <p>
        Mild to moderate GI side effects in the first weeks are
        expected and usually do not require stopping — they typically
        resolve as the body adapts. Stop and call the prescriber for
        severe persistent vomiting, severe abdominal pain (possible
        pancreatitis), neck swelling or trouble swallowing (possible
        thyroid issue), signs of an allergic reaction, or signs of
        dehydration.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          The most common Foundayo (orforglipron) side effects are
          GI: nausea, diarrhea, vomiting, constipation, and decreased
          appetite. All dose-dependent, most resolve within
          weeks<Cite n={1} /><Cite n={2} />.
        </li>
        <li>
          Foundayo carries the same boxed warning for medullary
          thyroid carcinoma as the rest of the GLP-1 class, based on
          rodent data. Contraindicated with personal or family history
          of MTC or MEN 2<Cite n={1} />.
        </li>
        <li>
          The same Section 5 warnings as Wegovy and Zepbound:
          pancreatitis, gallbladder disease, kidney injury,
          hypoglycemia (in combination with insulin or sulfonylureas),
          allergic reactions, anesthesia aspiration risk, and
          pregnancy contraindication<Cite n={1} /><Cite n={6} /><Cite n={7} />.
        </li>
        <li>
          Oral delivery does not meaningfully change GI tolerability
          versus injectable GLP-1s. The differences are dosing
          frequency, no injection site reactions, and a somewhat
          smaller effect size at the labeled maintenance dose.
        </li>
        <li>
          The biggest tolerability lever is titration speed. Stay on
          a step longer if you need to.
        </li>
      </ul>

      <h2>Related research</h2>
      <ul>
        <li>
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo (orforglipron) FDA approval deep-dive
          </Link>{" "}
          — the full ATTAIN-1 trial data and the approval narrative
        </li>
        <li>
          <Link href="/research/how-to-take-foundayo-orforglipron-guide">
            How to take Foundayo
          </Link>{" "}
          — daily protocol, titration schedule, missed-dose rules
        </li>
        <li>
          <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
            Foundayo vs Wegovy vs Zepbound comparison
          </Link>{" "}
          — head-to-head efficacy, safety, and pricing
        </li>
        <li>
          <Link href="/research/does-glp1-cause-cancer-mtc-thyroid-evidence">
            Does GLP-1 cause cancer? MTC and thyroid evidence
          </Link>{" "}
          — the boxed warning and what the human data actually show
        </li>
        <li>
          <Link href="/research/glp1-nausea-management-practical-guide">
            GLP-1 nausea management practical guide
          </Link>{" "}
          — the full playbook for GI side effects across the class
        </li>
        <li>
          <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
            GLP-1s, pregnancy, PCOS, and women&apos;s health
          </Link>{" "}
          — the two-month washout rule and the contraceptive overlap
        </li>
        <li>
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            GLP-1 side effects: what the trials actually showed
          </Link>{" "}
          — class-wide trial-rate comparison
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Adverse
        event language is sourced from the FDA Foundayo (orforglipron)
        Prescribing Information and the ATTAIN-1 phase 3 readout
        summarized in Eli Lilly&apos;s approval press release. Where
        the exact percentage point rates were not yet itemized in
        publicly accessible label copy at the time of writing, we
        described the event qualitatively and cited the FDA label
        rather than inventing a number. Always verify with your
        prescribing clinician and consult the most current FDA
        prescribing information before making any decisions about a
        prescription medication.
      </p>

      <References items={citations} />
      <FaqSchema items={FAQ_ITEMS} />
    </ResearchArticleLayout>
  );
}
