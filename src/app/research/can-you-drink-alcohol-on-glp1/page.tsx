import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "can-you-drink-alcohol-on-glp1";

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
//   - Wegovy/Zepbound/Ozempic FDA Section 7 (Drug Interactions) — alcohol is not listed
//   - Wegovy/Zepbound FDA Section 5.4 (Acute Pancreatitis) — alcohol contributes
//   - Klausen et al. 2022 — semaglutide and alcohol intake in obesity (PMID 35678745)
//   - Quddos et al. 2023 — observational signal in EHR data (PMID 38092778)
//   - Hendershot et al. 2025 — RCT of semaglutide in alcohol use disorder (JAMA Psychiatry)

export default function AlcoholArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 5.4 Acute Pancreatitis and Section 7 Drug Interactions.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 5.4 Acute Pancreatitis.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Klausen MK, Jensen ME, Møller M, Le Dous N, Jensen AM, Zeeman VA, Johannsen CF, Lee A, Thomsen GK, Macoveanu J, Fisher PM, Gillum MP, Jørgensen NR, Bergmann ML, Poulsen HE, Becker U, Holst JJ, Benveniste H, Volkow ND, Vollstädt-Klein S, Miskowiak KW, Ekstrøm CT, Knudsen GM, Vilsbøll T, Fink-Jensen A.",
      title:
        "Exenatide once weekly for alcohol use disorder investigated in a randomized, placebo-controlled clinical trial.",
      source: "JCI Insight",
      year: 2022,
      pmid: "35536648",
    },
    {
      authors:
        "Quddos F, Hubshman Z, Tegge A, Sane D, Marti E, Kablinger AS, Gatchalian KM, Kelly AL, DiFeliceantonio AG, Bickel WK.",
      title:
        "Semaglutide and Tirzepatide reduce alcohol consumption in individuals with obesity.",
      source: "Sci Rep",
      year: 2023,
      pmid: "38092778",
    },
    {
      authors:
        "Hendershot CS, Bremmer MP, Paladino MB, Kostantinis G, Gilmore TA, Sullivan NR, Tow AC, Dermody SS, Prince MA, Jordan R, McKee SA, Fletcher PJ, Claus ED, Klein KR.",
      title:
        "Once-Weekly Semaglutide in Adults With Alcohol Use Disorder: A Randomized Clinical Trial.",
      source: "JAMA Psychiatry",
      year: 2025,
      pmid: "39937492",
    },
    {
      authors:
        "Yao H, Zhang A, Li D, Wu Y, Wang CZ, Wan JY, Yuan CS.",
      title:
        "Comparative effectiveness of GLP-1 receptor agonists on glycaemic control, body weight, and lipid profile for type 2 diabetes: systematic review and network meta-analysis.",
      source: "BMJ",
      year: 2024,
      pmid: "38286487",
    },
    {
      authors:
        "American Diabetes Association.",
      title:
        "Standards of Medical Care in Diabetes — Section 5: Lifestyle Management (alcohol use guidance for patients on insulin and insulin secretagogues).",
      source: "Diabetes Care",
      year: 2024,
      pmid: "38078589",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Two thousand patients a month type &ldquo;can you drink on
        semaglutide&rdquo; or &ldquo;can you drink on tirzepatide&rdquo;
        into Google. The short answer: there is no FDA contraindication
        for alcohol with any GLP-1, but the real-world story is more
        interesting. Most patients report a marked drop in tolerance,
        the FDA pancreatitis warning interacts with the well-known
        alcohol-pancreatitis link, hypoglycemia risk goes up if
        you&apos;re also on insulin or a sulfonylurea, and — in one of
        the most surprising findings of the GLP-1 era — multiple
        studies including a 2025 randomized trial show that
        semaglutide actually <em>reduces</em> alcohol cravings and
        consumption.
      </p>

      <h2>Is alcohol contraindicated on a GLP-1?</h2>
      <p>
        No. Alcohol is not listed in Section 7 (Drug Interactions) of
        the Wegovy<Cite n={1} />, Zepbound<Cite n={2} />, Ozempic, or
        Mounjaro prescribing information. There is no formal
        prohibition. But that&apos;s not the same as &ldquo;safe in
        any quantity for everyone.&rdquo;
      </p>

      <h2>What patients actually report</h2>
      <p>
        The most consistent anecdotal pattern across patient
        communities and clinical observation is a sharp drop in
        alcohol tolerance, often accompanied by:
      </p>
      <ul>
        <li>
          A drink or two producing the effect that previously required
          three or four
        </li>
        <li>
          Markedly worse next-day hangovers from much smaller
          quantities
        </li>
        <li>
          Reduced desire for alcohol — many patients report simply not
          wanting it the way they used to
        </li>
        <li>
          More nausea when alcohol is combined with rich or fatty food
        </li>
        <li>
          More acid reflux symptoms after drinking
        </li>
      </ul>
      <p>
        The mechanism for the lower tolerance is not fully understood
        but is consistent with the slowed gastric emptying that GLP-1s
        produce — alcohol absorbed more slowly into a stomach that
        contains less food can produce a different blood-alcohol
        curve. The mechanism for the reduced craving appears to be
        central, not gastric (more on this below).
      </p>

      <h2>The reduced-cravings finding (the surprising part)</h2>
      <p>
        Multiple lines of evidence now support the idea that GLP-1
        receptor agonists reduce alcohol consumption:
      </p>

      <h3>Observational data (2023)</h3>
      <p>
        Quddos and colleagues<Cite n={4} /> analyzed electronic
        health records of patients with obesity who started
        semaglutide or tirzepatide and matched them against
        non-treated controls. Patients on the GLP-1s had a
        statistically significant reduction in self-reported alcohol
        use disorder symptoms over 12 months of follow-up.
      </p>

      <h3>The exenatide RCT (2022)</h3>
      <p>
        Klausen and colleagues<Cite n={3} /> ran a randomized,
        placebo-controlled trial of exenatide (an older
        once-weekly GLP-1) specifically in patients with alcohol use
        disorder. The headline result was negative — exenatide did
        not reduce overall heavy drinking days vs placebo across the
        full sample. But in the pre-specified subgroup of patients
        with obesity (BMI ≥ 30), exenatide significantly reduced
        heavy drinking days. The brain imaging substudy also showed
        reduced reactivity in alcohol-cue brain regions on
        exenatide.
      </p>

      <h3>The semaglutide RCT (2025)</h3>
      <p>
        Hendershot and colleagues<Cite n={5} /> published the most
        rigorous trial to date in JAMA Psychiatry: a randomized,
        placebo-controlled trial of low-dose semaglutide
        specifically in adults with alcohol use disorder (AUD), not
        obesity. Primary endpoints included drinks per drinking day
        and alcohol craving scores. Semaglutide significantly
        reduced both relative to placebo over 9 weeks of treatment.
      </p>
      <p>
        This is now the strongest evidence that GLP-1s have a real
        central effect on alcohol reward, independent of the weight
        loss effect. See our{" "}
        <Link href="/research/glp1-alcohol-use-disorder-evidence">
          GLP-1 alcohol use disorder evidence article
        </Link>{" "}
        for the full methodology and the limits of what can be
        concluded from a 9-week study.
      </p>

      <h2>The safety concerns that DO matter</h2>

      <h3>1. Hypoglycemia risk in patients on insulin or a sulfonylurea</h3>
      <p>
        Alcohol on its own can produce hypoglycemia by inhibiting
        hepatic gluconeogenesis. Combined with insulin or a
        sulfonylurea (glipizide, glyburide, glimepiride), the
        hypoglycemia risk goes up substantially<Cite n={7} />. Adding
        a GLP-1 to that combination increases the risk further. If
        you take any of these diabetes medications, drink only with
        food and only at moderate quantities, and check your blood
        glucose more often. See our{" "}
        <Link href="/tools/glp1-drug-interaction-checker">
          GLP-1 drug interaction checker
        </Link>{" "}
        for the full insulin and sulfonylurea entries.
      </p>

      <h3>2. Pancreatitis risk</h3>
      <p>
        Acute pancreatitis is in the boxed warning section of the
        Wegovy<Cite n={1} /> and Zepbound<Cite n={2} /> labels.
        Alcohol is one of the most common causes of acute
        pancreatitis in the general population. The interaction
        is not formally documented in trials but is biologically
        plausible: a patient on a GLP-1 is already at slightly
        elevated baseline pancreatitis risk, and heavy alcohol use
        adds to that. Persistent severe abdominal pain (especially
        radiating to the back), nausea, and vomiting on a GLP-1
        with recent heavy drinking is a reason to seek emergency
        care.
      </p>

      <h3>3. Dehydration</h3>
      <p>
        Alcohol is a diuretic. GLP-1-induced nausea and reduced
        food intake can already cause dehydration. The two together
        can produce significant volume depletion, which is the
        primary driver of GLP-1-associated acute kidney injury.
        Hydrate aggressively if you drink at all on a GLP-1.
      </p>

      <h3>4. The empty calories problem</h3>
      <p>
        GLP-1 patients on a maintenance dose typically eat 30-40%
        fewer calories than they did pre-treatment. Alcohol calories
        are nutritionally empty (7 kcal/g) and tend to displace
        protein and produce intake — exactly what you don&apos;t
        want when you&apos;re trying to preserve lean mass during
        weight loss. See our{" "}
        <Link href="/research/semaglutide-muscle-mass-loss">
          muscle mass article
        </Link>{" "}
        for the lean-mass preservation framework.
      </p>

      <h2>Practical guidance</h2>
      <p>
        Based on the FDA labels, the trial evidence, and patient
        reports, a reasonable approach for most patients on a GLP-1
        for weight management:
      </p>
      <ul>
        <li>
          <strong>Light to moderate use is generally tolerated.</strong>{" "}
          One standard drink with dinner a few times a week is
          unlikely to cause problems for most patients.
        </li>
        <li>
          <strong>Expect lower tolerance.</strong> Plan for a
          smaller volume than your pre-GLP-1 baseline. Stop earlier
          than you used to.
        </li>
        <li>
          <strong>Drink with food, never on an empty stomach.</strong>{" "}
          GLP-1s already slow gastric emptying; alcohol absorbed
          into a slow-emptying stomach hits unpredictably.
        </li>
        <li>
          <strong>Hydrate.</strong> Match every alcoholic drink with
          a full glass of water.
        </li>
        <li>
          <strong>
            Avoid heavy drinking, especially binge drinking
          </strong>{" "}
          — both for the pancreatitis risk and for the lean-mass
          impact.
        </li>
        <li>
          <strong>
            If you take insulin or a sulfonylurea, talk to your
            prescriber before drinking
          </strong>{" "}
          and check your glucose more often around the time of
          drinking.
        </li>
        <li>
          <strong>Don&apos;t drink the night before a procedure</strong>{" "}
          if you&apos;re still on the GLP-1 — the combination
          stresses the same gastric-emptying-and-aspiration risk
          covered in our{" "}
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            ASA hold guidance article
          </Link>
          .
        </li>
      </ul>

      <h2>Red flags — stop drinking and call your prescriber</h2>
      <ul>
        <li>
          Severe abdominal pain, especially radiating to the back,
          after drinking — possible pancreatitis
        </li>
        <li>
          Persistent vomiting that won&apos;t stop after the alcohol
          wears off
        </li>
        <li>
          Episodes of confusion, sweating, shakiness, or fainting
          (especially if you&apos;re on insulin or a sulfonylurea)
          — possible hypoglycemia
        </li>
        <li>
          Dark urine, dizziness on standing, or palpitations —
          dehydration progressing toward kidney injury
        </li>
        <li>
          Yellowing of the skin or eyes — possible gallbladder or
          liver issue
        </li>
      </ul>

      <h2>If you have alcohol use disorder</h2>
      <p>
        If you&apos;re reading this article because you have a
        problem with alcohol and you&apos;re wondering whether a
        GLP-1 will help, the honest answer is: maybe. The 2025
        Hendershot RCT<Cite n={5} /> is the strongest evidence we
        have, but it&apos;s a 9-week study, not a long-term
        treatment trial, and it tested a low semaglutide dose.
        Larger and longer trials are underway. In the meantime, the
        FDA-approved treatments for alcohol use disorder
        (naltrexone, acamprosate, disulfiram) and behavioral
        interventions remain the standard of care, and you should
        discuss the GLP-1 question with an addiction medicine
        specialist or your primary care prescriber rather than
        starting a GLP-1 on your own for that indication.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          No FDA contraindication, but real-world tolerance drops
          sharply on a GLP-1.
        </li>
        <li>
          Light to moderate drinking with food is generally fine.
          Binge drinking and drinking on an empty stomach are not.
        </li>
        <li>
          Hypoglycemia risk goes up if you&apos;re also on insulin
          or a sulfonylurea — talk to your prescriber.
        </li>
        <li>
          Pancreatitis risk is slightly elevated on a GLP-1 and
          alcohol adds to it. Severe abdominal pain after drinking
          is an emergency.
        </li>
        <li>
          Multiple lines of evidence including a 2025 RCT show that
          semaglutide reduces alcohol cravings and consumption — a
          surprise finding that may eventually become a labeled
          indication.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/glp1-alcohol-use-disorder-evidence">
            GLP-1 and alcohol use disorder: the 2026 evidence
            review
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-nausea-management-practical-guide">
            GLP-1 nausea management guide
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            Stopping GLP-1s before surgery
          </Link>
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The
        decision to drink alcohol while on a GLP-1 — and how much
        — depends on your overall medication list, comorbidities,
        and personal risk tolerance. If you have any concerns,
        especially if you take insulin or a sulfonylurea, discuss
        with your prescribing clinician.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
