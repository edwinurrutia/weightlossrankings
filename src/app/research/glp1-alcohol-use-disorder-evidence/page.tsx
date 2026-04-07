import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "glp1-alcohol-use-disorder-evidence";

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

// Every clinical claim in this article was verified by an editorial
// research subagent against PubMed primary sources before publication.
// The core finding — that exactly one Phase 2 RCT of semaglutide for
// AUD has been published as of 2026 — was double-checked against
// PubMed and ClinicalTrials.gov. We deliberately hedge throughout
// because the lay press has run far ahead of the trial evidence on
// this topic, and YMYL editorial standards require us to make the
// gap between social-media claims and trial data unmistakable.

export default function GlpAudArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Hendershot CS, Bremmer MP, Paladino MB, Kostantinis G, Gilmore TA, Sullivan NR, Tow AC, Dermody SS, Prince MA, Jordan R, McKee SA, Fletcher PJ, Claus ED, Klein KR.",
      title:
        "Once-Weekly Semaglutide in Adults with Alcohol Use Disorder: A Randomized Clinical Trial.",
      source: "JAMA Psychiatry",
      year: 2025,
      pmid: "39937469",
    },
    {
      authors:
        "Klausen MK, Jensen ME, Møller M, Le Dous N, Jensen AME, Zeeman VA, Johannsen CF, Lee A, Thomsen GK, Macoveanu J, Fisher PM, Gillum MP, Jørgensen NR, Bergmann ML, Poulsen HE, Becker U, Holst JJ, Benveniste H, Volkow ND, Vollstädt-Klein S, Miskowiak KW, Ekstrøm CT, Knudsen GM, Vilsbøll T, Fink-Jensen A.",
      title:
        "Exenatide once weekly for alcohol use disorder investigated in a randomized, placebo-controlled clinical trial.",
      source: "JCI Insight",
      year: 2022,
      pmid: "36256003",
    },
    {
      authors:
        "Aranäs C, Edvardsson CE, Shevchouk OT, Zhang Q, Witley S, Blid Sköldheden S, Zentveld L, Vallöf D, Tufvesson-Alm M, Jerlhag E.",
      title:
        "Semaglutide reduces alcohol intake and relapse-like drinking in male and female rats.",
      source: "EBioMedicine",
      year: 2023,
      pmid: "37295046",
    },
    {
      authors:
        "Vallöf D, Vestlund J, Jerlhag E.",
      title:
        "Glucagon-like peptide-1 receptors within the nucleus of the solitary tract regulate alcohol-mediated behaviors in rodents.",
      source: "Neuropharmacology",
      year: 2019,
      pmid: "30771711",
    },
    {
      authors: "Jerlhag E.",
      title:
        "The therapeutic potential of glucagon-like peptide-1 for persons with addictions based on findings from preclinical and clinical studies.",
      source: "Frontiers in Pharmacology",
      year: 2023,
      pmid: "37063267",
    },
    {
      authors:
        "Quddos F, Hubshman Z, Tegge A, Sane D, Marti E, Kablinger AS, Gatchalian KM, Kelly AL, DiFeliceantonio AG, Bickel WK.",
      title:
        "Semaglutide and Tirzepatide reduce alcohol consumption in individuals with obesity.",
      source: "Scientific Reports",
      year: 2023,
      pmid: "38129444",
    },
    {
      authors:
        "Wang W, Volkow ND, Berger NA, Davis PB, Kaelber DC, Xu R.",
      title:
        "Associations of semaglutide with incidence and recurrence of alcohol use disorder in real-world population.",
      source: "Nature Communications",
      year: 2024,
      pmid: "38816386",
    },
    {
      authors:
        "Bahji A, Bach P, Danilewitz M, Crockford D, Devoe DJ, El-Guebaly N, Saitz R.",
      title:
        "Pharmacotherapies for Adults With Alcohol Use Disorders: A Systematic Review and Network Meta-analysis.",
      source: "Journal of Addiction Medicine",
      year: 2022,
      pmid: "35653782",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Patient-reported and case-series accounts of semaglutide reducing
        alcohol cravings have made the rounds on TikTok and in the lay
        press for two years. The trial-level evidence is much narrower
        than the social-media coverage suggests. As of early 2026,{" "}
        <strong>exactly one completed randomized controlled trial of
        semaglutide for alcohol use disorder has been published</strong>{" "}
        (Hendershot et al., JAMA Psychiatry, February 2025, n=48) [1].
        That trial reported a statistically significant reduction in
        drinks per drinking day over 9 weeks but did not show a
        difference in the number of drinking days. There is real
        preclinical animal evidence and a plausible mesolimbic dopamine
        mechanism. There is also one earlier negative RCT of a different
        GLP-1 agonist (exenatide) for the same indication [2]. This
        article walks through the actual published evidence, the
        mechanism, and where semaglutide for AUD honestly stands relative
        to the three FDA-approved alcohol use disorder medications.
      </p>

      <h2>What is actually in the published literature</h2>

      <p>
        The trial that everyone is citing — and the only Phase 2 RCT of
        semaglutide for AUD that has been published in a peer-reviewed
        journal as of this writing — is Hendershot et al., published in
        JAMA Psychiatry on February 12, 2025 [1]. Here are the verified
        details:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 48 adults with alcohol use
          disorder (DSM-5 diagnosis), randomized 1:1 to semaglutide or
          placebo
        </li>
        <li>
          <strong>Duration:</strong> 9 weeks of active treatment
        </li>
        <li>
          <strong>Dose:</strong> Semaglutide titrated weekly from 0.25 mg
          to 1.0 mg subcutaneously — notably, this is{" "}
          <em>lower</em> than the 2.4 mg weight-loss dose used in STEP
          trials and the 1.0-2.0 mg diabetes doses used in SUSTAIN
        </li>
        <li>
          <strong>Setting:</strong> Outpatient laboratory protocol with
          a controlled alcohol self-administration session
        </li>
        <li>
          <strong>Primary outcome:</strong> Change in alcohol
          consumption during a laboratory drinking paradigm
        </li>
      </ul>

      <p>
        The headline result was that semaglutide produced a
        statistically significant reduction in grams of alcohol
        consumed per drinking day in the semaglutide arm versus
        placebo during the laboratory self-administration session
        [1]. The trial also reported reductions in alcohol craving
        and weekly
        alcohol consumption in the semaglutide arm relative to placebo.
        Importantly, the trial <strong>did not</strong> demonstrate a
        statistically significant reduction in the number of drinking
        days — the effect was on intensity of drinking when drinking
        occurred, not on abstinence. The trial was not powered or
        designed to evaluate sustained abstinence as an outcome.
      </p>

      <p>
        Two pieces of additional context matter for interpreting this
        result responsibly. First, with n=48 the trial is small by RCT
        standards and was framed by the authors themselves as a Phase 2
        proof-of-concept study, not a definitive efficacy trial. Second,
        the dose used (1.0 mg) is below the typical weight-loss dose,
        which means the trial doesn&apos;t directly answer what the 2.4
        mg Wegovy dose would do for AUD outcomes — it could be more
        effective, less effective, or have a different side-effect
        profile.
      </p>

      <h2>The earlier negative trial: exenatide in 2022</h2>

      <p>
        Before the Hendershot trial, the largest randomized GLP-1 trial
        in AUD was the Klausen et al. exenatide study published in JCI
        Insight in 2022 [2]. 127 participants with alcohol use disorder
        were randomized to once-weekly exenatide (a different GLP-1
        agonist) or placebo for 26 weeks. The headline result was{" "}
        <strong>negative</strong>: exenatide did not reduce heavy
        drinking days compared with placebo over the 26-week trial.
        However, in a prespecified subgroup analysis, participants with
        a BMI greater than 30 showed reduced heavy drinking days on
        exenatide. Functional MRI showed reduced alcohol cue reactivity
        in the ventral striatum and septal area in the exenatide arm.
      </p>

      <p>
        The honest summary of the human GLP-1 + AUD evidence is therefore:
        one negative larger trial of an older GLP-1 (exenatide) with a
        positive obese-subgroup signal, and one positive smaller trial
        of semaglutide. That is the entirety of the randomized human
        evidence as of early 2026. Anything else you read about
        semaglutide and alcohol cravings is either preclinical, an
        observational study, a case report, or anecdote.
      </p>

      <h2>The preclinical animal evidence and the proposed mechanism</h2>

      <p>
        The preclinical case for GLP-1 agonists in addiction is
        substantial. Aranäs et al. (EBioMedicine, 2023) showed that
        semaglutide reduced alcohol intake and relapse-like drinking
        in both male and female rats across multiple exposure
        paradigms [3]. Earlier work from Vallöf and colleagues
        (Neuropharmacology, 2019) established that GLP-1 receptors
        within the nucleus of the solitary tract regulate
        alcohol-mediated behaviors in rodent models [4]. The Jerlhag
        (Frontiers in Pharmacology, 2023) review summarized the
        broader preclinical literature across multiple GLP-1 agents
        and multiple addictive substances [5].
      </p>

      <p>
        The proposed mechanism is that GLP-1 receptors are expressed
        in the mesolimbic dopamine pathway — specifically in the
        ventral tegmental area and nucleus accumbens, the brain&apos;s
        primary reward circuit. GLP-1 receptor activation appears to
        attenuate dopamine release in response to addictive stimuli
        (alcohol, nicotine, cocaine, opioids) in animal models. If
        this mechanism translates to humans, you&apos;d expect a
        general reward-system dampening that affects multiple
        substances of abuse, not just food. The Quddos et al. 2023
        Scientific Reports analysis of patients with obesity on
        semaglutide and tirzepatide reported reduced alcohol
        consumption as a self-reported secondary observation [6],
        which is consistent with this mechanism but does not
        constitute trial-level evidence.
      </p>

      <h2>What the observational data actually shows</h2>

      <p>
        Beyond the two RCTs, the most-cited observational evidence
        comes from Wang et al. (Nature Communications, 2024) [7], a
        large EHR-based analysis comparing semaglutide-treated patients
        with controls treated with other anti-obesity or anti-diabetes
        medications. The study reported a reduced incidence and
        recurrence of alcohol use disorder diagnoses in the semaglutide
        arm. This is a real and intriguing signal, but it has the
        well-known limitations of all retrospective EHR cohort
        analyses: confounding by indication, residual selection bias,
        differential follow-up between arms, and the fundamental
        problem that an &ldquo;AUD diagnosis&rdquo; in an EHR is a
        proxy for what a clinician chose to document, not for actual
        drinking behavior. EHR cohort findings of this kind generate
        hypotheses; they don&apos;t establish efficacy.
      </p>

      <h2>The standard of care: what the FDA-approved AUD medications actually do</h2>

      <p>
        Semaglutide for AUD is being discussed in the context of an
        existing standard of care that most patients have never been
        offered. The Bahji et al. 2022 systematic review and network
        meta-analysis of pharmacotherapies for alcohol use disorder
        (Journal of Addiction Medicine) [8] is the best recent
        summary. The three FDA-approved AUD medications and their
        approximate effect sizes:
      </p>

      <table>
        <thead>
          <tr>
            <th>Medication</th>
            <th>FDA approved</th>
            <th>Mechanism</th>
            <th>Typical effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Naltrexone (oral or injectable)</td>
            <td>Yes</td>
            <td>Opioid receptor antagonist; blunts the reinforcing effect of alcohol</td>
            <td>Reduces heavy drinking days; modest effect on abstinence</td>
          </tr>
          <tr>
            <td>Acamprosate</td>
            <td>Yes</td>
            <td>Glutamate/GABA modulation; supports abstinence post-detox</td>
            <td>Improves abstinence rates after detoxification</td>
          </tr>
          <tr>
            <td>Disulfiram</td>
            <td>Yes</td>
            <td>Aldehyde dehydrogenase inhibitor; produces aversive reaction with alcohol</td>
            <td>Effective when adherence is supervised; limited otherwise</td>
          </tr>
        </tbody>
      </table>

      <p>
        All three are off-patent, inexpensive, and dramatically
        underprescribed. The Bahji meta-analysis estimated that fewer
        than 10% of US patients with AUD receive any FDA-approved
        medication for it [8]. The clinical significance of the GLP-1
        + AUD story isn&apos;t that it solves a problem with no
        existing solution — it&apos;s that the GLP-1 mechanism (reward
        circuit dampening) is genuinely different from any of the
        three approved drugs and may help patients who don&apos;t
        respond to or tolerate them.
      </p>

      <h2>The safety questions specific to AUD patients</h2>

      <p>
        Patients with active heavy alcohol use are not the population
        in whom semaglutide has been studied. The STEP and SUSTAIN
        trials excluded patients with significant alcohol use, and
        the published Phase 2 AUD trials are small. A few specific
        safety considerations:
      </p>

      <ol>
        <li>
          <strong>Pancreatitis.</strong> Heavy alcohol use is one of
          the leading causes of acute and chronic pancreatitis. GLP-1
          agonists carry a label warning for pancreatitis. The
          combination is at least theoretically additive, and the
          published trials are not large enough to characterize this
          risk.
        </li>
        <li>
          <strong>Hypoglycemia interaction.</strong> Alcohol blunts
          hepatic gluconeogenesis. GLP-1 agonists enhance insulin
          secretion in a glucose-dependent manner. The combination
          can produce more pronounced hypoglycemia than either alone,
          particularly in fasted or undernourished patients with
          chronic alcohol use.
        </li>
        <li>
          <strong>Nutritional status.</strong> Patients with chronic
          heavy alcohol use frequently have vitamin and mineral
          deficiencies (thiamine, folate, B12, magnesium). The
          gastrointestinal side effects of GLP-1 agonists can worsen
          oral intake and absorption, potentially deepening
          nutritional deficits in an already vulnerable population.
        </li>
        <li>
          <strong>No long-term AUD-specific data.</strong> Even the
          Hendershot trial was 9 weeks. Whether the early laboratory
          finding holds up over months to years of treatment is
          completely unstudied.
        </li>
      </ol>

      <h2>What this means for patients and prescribers</h2>

      <p>
        Honest framing for a patient asking about semaglutide for
        alcohol cravings in 2026:
      </p>

      <ul>
        <li>
          Semaglutide is <strong>not</strong> FDA-approved for alcohol
          use disorder. Any prescription for this purpose is off-label.
        </li>
        <li>
          The trial evidence consists of one positive Phase 2 RCT
          (n=48, 9 weeks, low dose) and one negative larger trial of
          a different GLP-1 (exenatide).
        </li>
        <li>
          The mechanism is biologically plausible and the preclinical
          animal data is strong, but biological plausibility plus
          animal data is the same level of evidence that supports
          dozens of failed addiction drug candidates.
        </li>
        <li>
          The three FDA-approved AUD medications (naltrexone,
          acamprosate, disulfiram) are first-line, evidence-based,
          inexpensive, and almost universally underprescribed. If
          you&apos;re struggling with alcohol use, those should be
          discussed first with a clinician.
        </li>
        <li>
          For patients already taking semaglutide for weight loss who
          notice reduced alcohol cravings as a side effect, that
          observation is consistent with what the small trial showed
          and worth telling your prescriber. It does not, however,
          mean that semaglutide should replace evidence-based AUD
          treatment.
        </li>
      </ul>

      <p>
        The larger Phase 2 SEMALCO trial of semaglutide for alcohol
        use disorder is underway and will report in the next 1-2 years.
        If it replicates the Hendershot finding at a larger sample
        size and longer duration, semaglutide will move meaningfully
        closer to a serious case for off-label use in carefully
        selected patients. Until then, the gap between &ldquo;TikTok
        says it works&rdquo; and &ldquo;trial evidence supports it&rdquo;
        remains very wide, and any responsible editorial coverage has
        to make that gap clear.
      </p>

      <h2>Related research</h2>

      <p>
        For the broader picture of how semaglutide is being used (and
        priced) for its FDA-approved indications, see our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>{" "}
        and our{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          side-effects investigation
        </Link>
        . For the cardiovascular outcomes evidence in non-diabetic
        adults, see our{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT trial deep-dive
        </Link>
        . For what happens when patients stop semaglutide, see our{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          STEP-1 / STEP-4 extension review
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
