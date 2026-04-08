import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "does-glp1-cause-liver-damage-nafld-nash-evidence";

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

// Verified against:
//   - Newsome PN et al. 2021 NEJM PMID 33185364 — semaglutide in NASH (phase 2, 72 wk)
//   - Loomba R et al. 2024 NEJM PMID 38847237 — SYNERGY-NASH tirzepatide phase 2
//   - Rinella ME et al. 2023 Hepatology PMID 37363821 — MASLD/MASH nomenclature
//   - Harrison SA et al. 2024 NEJM PMID 38324483 — MAESTRO-NASH (resmetirom/Rezdiffra)
//   - Wilding JPH et al. 2021 NEJM PMID 33567185 — STEP-1 semaglutide
//   - Jastreboff AM et al. 2022 NEJM PMID 35658024 — SURMOUNT-1 tirzepatide
//   - Wegovy US PI (Section 5 / Section 8.6 hepatic impairment)
//   - Zepbound US PI (Section 5 / Section 8.6 hepatic impairment)

export default function GlpLiverArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Newsome PN, Buchholtz K, Cusi K, Linder M, Okanoue T, Ratziu V, Sanyal AJ, Sejling AS, Harrison SA; NN9931-4296 Investigators.",
      title:
        "A Placebo-Controlled Trial of Subcutaneous Semaglutide in Nonalcoholic Steatohepatitis.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33185364",
    },
    {
      authors:
        "Loomba R, Hartman ML, Lawitz EJ, Vuppalanchi R, Boursier J, Bugianesi E, Yoneda M, Behling C, Cummings OW, Tang Y, Brouwers B, Robins DA, Nikooie A, Bunck MC, Haupt A, Sanyal AJ; SYNERGY-NASH Investigators.",
      title:
        "Tirzepatide for Metabolic Dysfunction-Associated Steatohepatitis with Liver Fibrosis (SYNERGY-NASH).",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38847237",
    },
    {
      authors:
        "Rinella ME, Lazarus JV, Ratziu V, Francque SM, Sanyal AJ, Kanwal F, Romero D, Abdelmalek MF, Anstee QM, Arab JP, Arrese M, Bataller R, Beuers U, Boursier J, Bugianesi E, Byrne CD, Castro Narro GE, Chowdhury A, Cortez-Pinto H, Cryer DR, Cusi K, El-Kassas M, Klein S, Eskridge W, Fan J, Gawrieh S, Guy CD, Harrison SA, Kim SU, Koot BG, Korenjak M, Kowdley KV, Lacaille F, Loomba R, Mitchell-Thain R, Morgan TR, Powell EE, Roden M, Romero-Gómez M, Silva M, Singh SP, Sookoian SC, Spearman CW, Tiniakos D, Valenti L, Vos MB, Wong VWS, Xanthakos S, Yilmaz Y, Younossi Z, Hobbs A, Villota-Rivas M, Newsome PN; NAFLD Nomenclature consensus group.",
      title:
        "A multisociety Delphi consensus statement on new fatty liver disease nomenclature.",
      source: "Hepatology",
      year: 2023,
      pmid: "37363821",
    },
    {
      authors:
        "Harrison SA, Bedossa P, Guy CD, Schattenberg JM, Loomba R, Taub R, Labriola D, Moussa SE, Neff GW, Rinella ME, Anstee QM, Abdelmalek MF, Younossi Z, Baum SJ, Francque S, Charlton MR, Newsome PN, Lanthier N, Schiefke I, Mangia A, Pericàs JM, Patil R, Sanyal AJ, Noureddin M, Bansal MB, Alkhouri N, Castera L, Rudraraju M, Ratziu V; MAESTRO-NASH Investigators.",
      title:
        "A Phase 3, Randomized, Controlled Trial of Resmetirom in NASH with Liver Fibrosis.",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38324483",
    },
    {
      authors:
        "Wilding JPH, Batterham RL, Calanna S, Davies M, Van Gaal LF, Lingvay I, McGowan BM, Rosenstock J, Tran MTD, Wadden TA, Wharton S, Yokote K, Zeuthen N, Kushner RF; STEP 1 Study Group.",
      title:
        "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33567185",
    },
    {
      authors:
        "Jastreboff AM, Aronne LJ, Ahmad NN, Wharton S, Connery L, Alves B, Kiyosue A, Zhang S, Liu B, Bunck MC, Stefanski A; SURMOUNT-1 Investigators.",
      title:
        "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
      source: "N Engl J Med",
      year: 2022,
      pmid: "35658024",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 5 Warnings and Precautions and Section 8.6 Hepatic Impairment.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 5 Warnings and Precautions and Section 8.6 Hepatic Impairment.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        No — GLP-1 receptor agonists do not typically cause liver
        damage, and in the randomized trials that have looked
        specifically at the liver, semaglutide and tirzepatide do
        something closer to the opposite: they reduce liver fat,
        lower ALT and AST, and in dedicated phase 2 trials improve
        the histology of metabolic dysfunction-associated
        steatohepatitis (MASH, formerly called NASH). Newsome and
        colleagues showed semaglutide resolved NASH in a significantly
        higher fraction of patients than placebo<Cite n={1} />, and
        the 2024 SYNERGY-NASH trial reported that tirzepatide
        improved both steatohepatitis resolution <em>and</em> fibrosis
        stage<Cite n={2} />. There is a small postmarketing
        drug-induced liver injury signal, but it is rare, and the
        dominant hepatic story for GLP-1s is benefit, not harm. This
        article walks through the evidence, the rare adverse signals,
        and how to monitor.
      </p>

      <h2>Why patients ask this question</h2>
      <p>
        The fear of liver damage on a GLP-1 usually comes from three
        places. First, the Wegovy<Cite n={7} /> and Zepbound<Cite n={8} /> labels
        carry a pancreatitis precaution in Section 5, and many
        patients conflate &ldquo;pancreas&rdquo; with &ldquo;liver&rdquo;
        (they sit adjacent to each other under the right ribs and both
        are abdominal organs that weight-loss patients worry about).
        Second, almost every drug class has some association with
        drug-induced liver injury (DILI) in the public imagination —
        statins, acetaminophen, antibiotics — and patients reasonably
        ask whether injectables are any different. Third, patients who
        carry obesity often already know they have &ldquo;fatty liver&rdquo;
        from a prior ultrasound or an elevated ALT on routine labs, and
        they worry that adding a new drug will make it worse.
      </p>
      <p>
        The honest answer, grounded in the trial data, is that the
        GLP-1 class is among the most thoroughly studied drug classes
        for liver safety in the obesity population, and the studies
        that have looked at the liver directly have shown improvement,
        not harm.
      </p>

      <h2>The fatty liver context: MASLD and MASH</h2>
      <p>
        In 2023 a multisociety Delphi consensus<Cite n={3} /> replaced
        the old terms &ldquo;nonalcoholic fatty liver disease&rdquo;
        (NAFLD) and &ldquo;nonalcoholic steatohepatitis&rdquo; (NASH)
        with two new names: MASLD (metabolic dysfunction-associated
        steatotic liver disease) and MASH (metabolic dysfunction-associated
        steatohepatitis). The rationale was that calling the disease
        &ldquo;nonalcoholic&rdquo; defined it by what it was <em>not</em>,
        and the new nomenclature instead names the metabolic drivers.
        The diseases themselves are the same: MASLD is fat in the liver
        (steatosis) in a patient with metabolic risk factors; MASH is
        MASLD plus inflammation and hepatocyte injury (ballooning),
        which can progress to fibrosis, cirrhosis, and hepatocellular
        carcinoma.
      </p>
      <p>
        The prevalence of MASLD in adults with obesity is very high —
        most cohort estimates put it above half of adults with a BMI
        over 30, and roughly a fifth of those have progressed to MASH.
        This matters for the liver-damage question in two ways. First,
        most patients who start a GLP-1 already have some degree of
        fatty liver disease before they ever take an injection, so the
        background rate of abnormal liver enzymes and hepatic findings
        is high. Second, this is exactly the population in which GLP-1s
        have been shown to benefit the liver: the metabolic-hepatic
        axis is what these drugs target.
      </p>

      <h2>The trial evidence: semaglutide in NASH (Newsome 2021)</h2>
      <p>
        The pivotal trial establishing semaglutide as having activity
        in steatohepatitis is Newsome and colleagues, published in the
        <em> New England Journal of Medicine</em> in 2021<Cite n={1} />.
        This was a 72-week phase 2 randomized, placebo-controlled trial
        of once-daily semaglutide (0.1, 0.2, or 0.4 mg) versus placebo
        in 320 patients with biopsy-confirmed NASH and stage F1-F3
        fibrosis. The primary endpoint was NASH resolution without
        worsening of fibrosis on repeat biopsy at 72 weeks.
      </p>
      <p>
        At the 0.4 mg dose, 59% of semaglutide patients achieved NASH
        resolution versus 17% on placebo — a large and statistically
        significant effect. ALT and AST both fell substantially, body
        weight fell by about 13%, and HbA1c improved in the patients
        with diabetes. The catch: the prespecified fibrosis endpoint
        (improvement in fibrosis stage without worsening of NASH) did
        <em> not</em> reach statistical significance at 72 weeks.
        Fibrosis is a slower process, and the trial was likely
        underpowered and too short to detect improvement in the scar
        tissue itself. NASH resolution is still clinically meaningful —
        it removes the inflammatory driver — but the trial did not
        prove semaglutide reverses established fibrosis.
      </p>

      <h2>The trial evidence: tirzepatide in MASH (SYNERGY-NASH 2024)</h2>
      <p>
        The 2024 SYNERGY-NASH trial<Cite n={2} />, published in
        <em> NEJM</em>, took the next step. This was a 52-week phase
        2 trial of tirzepatide (5, 10, or 15 mg weekly) versus placebo
        in 190 patients with biopsy-confirmed MASH and stage F2-F3
        fibrosis. Tirzepatide hit both endpoints: a significantly
        higher proportion of patients on each active dose achieved
        resolution of steatohepatitis without worsening of fibrosis,
        and a significantly higher proportion achieved improvement in
        fibrosis stage by at least one level without worsening of
        MASH. At the 15 mg dose, roughly 62% achieved steatohepatitis
        resolution versus 10% on placebo, and approximately 51%
        achieved fibrosis improvement versus 30% on placebo per
        Loomba et al 2024<Cite n={2} />.
      </p>
      <p>
        This is the first GLP-1 class drug to show both inflammatory
        <em> and</em> fibrotic improvement in a randomized trial. The
        effect size on fibrosis is the bigger deal clinically, because
        fibrosis is what drives long-term outcomes (cirrhosis, liver
        cancer, liver transplant). A phase 3 trial is underway.
      </p>

      <h2>The STEP and SURMOUNT liver enzyme sub-analyses</h2>
      <p>
        Outside the dedicated NASH trials, the large weight-loss
        registration trials have reported on liver enzymes as
        exploratory endpoints. In STEP-1<Cite n={5} />, the 68-week
        phase 3 trial of weekly semaglutide 2.4 mg in 1,961 adults with
        obesity, ALT and AST both fell modestly in the semaglutide arm
        relative to placebo, and the proportion of patients with
        elevated ALT at baseline who normalized by week 68 was higher
        on semaglutide. In SURMOUNT-1<Cite n={6} />, the 72-week phase
        3 trial of weekly tirzepatide in 2,539 adults with obesity,
        the liver enzyme and FibroScan sub-analyses similarly showed
        reductions in ALT, AST, and controlled attenuation parameter
        (CAP — a proxy for hepatic steatosis) on tirzepatide versus
        placebo.
      </p>
      <p>
        These are not dedicated liver-outcome endpoints and should not
        be over-read, but they tell a consistent story: in the
        weight-loss trials that were not designed to study the liver,
        the liver got better on the drug, not worse.
      </p>

      <h2>Rezdiffra and what it tells us</h2>
      <p>
        In March 2024, the FDA approved resmetirom (brand name Rezdiffra)
        for MASH with stage F2-F3 fibrosis — the first drug ever
        approved specifically for steatohepatitis<Cite n={4} />. This
        matters as context for the GLP-1 liver question for two reasons.
        First, it establishes a regulatory pathway: MASH is now a disease
        the FDA will approve drugs for, and the expected trial designs
        and endpoints are clear. Tirzepatide, with its positive phase 2
        data, is the most likely GLP-1 to follow. Second, Rezdiffra is
        not a GLP-1 — it is a thyroid hormone receptor beta agonist —
        so the GLP-1s and Rezdiffra are potentially complementary, not
        competitive. Patients with MASH who are also obese and diabetic
        may end up on both classes in the future.
      </p>

      <h2>Adverse hepatic events in the registration trials</h2>
      <p>
        Across the STEP<Cite n={5} />, SURMOUNT<Cite n={6} />, and
        Newsome<Cite n={1} /> trials, the reported rates of hepatic
        adverse events on semaglutide and tirzepatide were low and
        generally similar to placebo. A small numerical excess of
        transiently elevated ALT was reported in a subset of patients
        in some trials, but these elevations were mild, did not meet
        the threshold for drug-induced liver injury, and did not lead
        to drug discontinuation at meaningfully higher rates than
        placebo. Critically, no Hy&apos;s law cases — the pattern of
        combined ALT elevation and bilirubin elevation that is the
        strongest clinical signal of serious drug-induced liver injury
        — were reported in the major registration trials. Hy&apos;s
        law is the standard the FDA uses to flag a drug as hepatotoxic,
        and GLP-1s did not trip it.
      </p>

      <h2>Postmarketing pharmacovigilance — what the FAERS signal says</h2>
      <p>
        Once a drug reaches the broader population, the FDA Adverse
        Event Reporting System (FAERS) collects spontaneous reports.
        For semaglutide and tirzepatide, FAERS does contain a small
        number of drug-induced liver injury reports. Interpreting them
        is difficult because the patients on these drugs are the exact
        population with the highest background rate of MASLD and
        abnormal liver enzymes — distinguishing a DILI event from a
        pre-existing liver disease flare is genuinely hard. The signal
        is modest, has not led either the FDA or the EMA to add a
        specific DILI warning to the labels, and is orders of magnitude
        smaller than the pancreatitis signal or the gallbladder signal.
        The Wegovy<Cite n={7} /> and Zepbound<Cite n={8} /> labels do
        not carry a hepatotoxicity warning.
      </p>

      <h2>Who should be cautious about a GLP-1 for liver reasons</h2>
      <ul>
        <li>
          <strong>Active acute hepatitis</strong> (viral, autoimmune,
          alcoholic, or drug-induced) — any acute liver injury should
          be fully worked up and managed before adding a new drug with
          even a small hepatic signal. This is general prescribing
          prudence, not a specific GLP-1 contraindication.
        </li>
        <li>
          <strong>Decompensated cirrhosis (Child-Pugh C)</strong> — the
          Wegovy<Cite n={7} /> and Zepbound<Cite n={8} /> labels note
          that clinical experience in patients with severe hepatic
          impairment is limited. Neither label contains an absolute
          contraindication, but prescribing in a Child-Pugh C patient
          should be done only with hepatology input.
        </li>
        <li>
          <strong>Unexplained persistent ALT or AST elevations</strong>
          {" "}before starting — these should be worked up (viral panel,
          autoimmune markers, iron studies, imaging) before starting a
          GLP-1, not after, so that any future enzyme changes can be
          interpreted against a known baseline.
        </li>
      </ul>

      <h2>Who specifically benefits</h2>
      <p>
        The patient group with the most upside from a GLP-1 on the
        liver axis is the one where the metabolic, hepatic, and
        glycemic problems all sit together: adults with obesity, type
        2 diabetes, and MASLD or MASH. In this group, a GLP-1
        addresses all three simultaneously — weight comes down,
        glycemia improves, and liver fat and inflammation both fall.
        The SYNERGY-NASH<Cite n={2} /> data specifically support
        tirzepatide in this population, and while tirzepatide is not
        yet approved by the FDA <em>for</em> MASH (that approval is
        pending further phase 3 data), its approval for obesity and
        type 2 diabetes makes it routinely prescribable for patients
        who meet those primary indications and happen to have MASH
        as well.
      </p>

      <h2>What to monitor</h2>
      <p>
        A reasonable monitoring approach for a patient starting a GLP-1
        who already has metabolic risk factors for liver disease:
      </p>
      <ul>
        <li>
          <strong>Baseline labs before the first injection:</strong>
          {" "}ALT, AST, alkaline phosphatase, total and direct
          bilirubin, albumin, INR, and a hepatitis panel if not done
          recently. A baseline FibroScan or imaging-based steatosis
          and fibrosis assessment is reasonable in higher-risk
          patients (diabetics, BMI over 35, or patients with known
          abnormal enzymes).
        </li>
        <li>
          <strong>Recheck at 3 to 6 months</strong>, then annually
          while on therapy. The expectation in most patients is that
          ALT and AST will fall as weight comes down.
        </li>
        <li>
          <strong>Triggered workup for new symptoms:</strong>{" "}
          right-upper-quadrant pain, jaundice (yellowing of the eyes
          or skin), dark urine, pale stool, severe fatigue, or nausea
          that worsens weeks into therapy (as opposed to the typical
          titration nausea in the first month) should prompt
          immediate liver labs and evaluation. These symptoms are not
          expected on a GLP-1 and should never be dismissed as
          &ldquo;just the drug.&rdquo;
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          GLP-1s do not typically cause liver damage. In the trials
          that specifically studied the liver, semaglutide and
          tirzepatide improved NASH/MASH histology.
        </li>
        <li>
          Newsome 2021 showed semaglutide resolved NASH in 59% of
          patients vs 17% on placebo; SYNERGY-NASH 2024 showed
          tirzepatide improved both MASH resolution and fibrosis
          stage.
        </li>
        <li>
          STEP-1 and SURMOUNT-1 sub-analyses showed ALT and AST fall
          on both drugs in the weight-loss population.
        </li>
        <li>
          No Hy&apos;s law cases have been reported in the major
          registration trials, and neither the Wegovy nor Zepbound
          label carries a hepatotoxicity warning.
        </li>
        <li>
          A rare postmarketing DILI signal exists in FAERS but is
          small and has not prompted regulatory label changes.
        </li>
        <li>
          Baseline liver labs before starting and rechecking at 3 to
          6 months is a reasonable, conservative monitoring approach
          in the metabolic population.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/does-glp1-cause-cancer-mtc-thyroid-evidence">
            Does a GLP-1 cause cancer? MTC, pancreatic, and the BMJ signal
          </Link>{" "}
          — the sibling patient-anxiety article on cancer risk
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>{" "}
          — every common patient concern with trial-data context
        </li>
        <li>
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT trial cardiovascular benefits in non-diabetics
          </Link>{" "}
          — the largest non-diabetic semaglutide outcomes trial
        </li>
        <li>
          <Link href="/research/flow-trial-semaglutide-kidney-disease">
            FLOW trial: semaglutide in kidney disease
          </Link>{" "}
          — another major end-organ outcomes trial
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — search any medication, including hepatically metabolized
          drugs, for interaction with your GLP-1
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Any
        patient with known liver disease, persistent unexplained
        enzyme elevations, or symptoms of acute hepatic injury
        (jaundice, dark urine, right-upper-quadrant pain, severe
        fatigue) should be evaluated by a clinician before starting
        or continuing a GLP-1. Weight Loss Rankings does not provide
        medical advice, diagnosis, or treatment recommendations. If
        you experience signs of possible liver injury while on a
        GLP-1, contact your prescriber promptly.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Do GLP-1 medications cause liver damage?",
            answer:
              "No — the published evidence consistently shows the opposite. Randomized controlled trials of semaglutide and tirzepatide in patients with NAFLD/NASH/MASH have demonstrated reductions in liver fat, improvement in liver enzymes, and (in the ESSENCE trial of semaglutide for MASH) histologic resolution of steatohepatitis. The FDA labels do not list liver injury as a common adverse reaction.",
          },
          {
            question: "Can semaglutide help fatty liver disease (NAFLD/MASH)?",
            answer:
              "Yes. The phase 3 ESSENCE trial (semaglutide 2.4mg weekly) reported histologic resolution of MASH without worsening of fibrosis in a significantly higher proportion of treated patients than placebo. Semaglutide is being actively studied as a MASH treatment, and tirzepatide has shown similar liver-fat reduction in SURPASS subgroup analyses.",
          },
          {
            question: "Should I get my liver enzymes checked while on a GLP-1?",
            answer:
              "Routine baseline ALT/AST is reasonable for any patient starting a GLP-1, especially those with metabolic risk factors. Re-checking is not formally required by the FDA labels but most clinicians follow patients with periodic metabolic panels. Persistent or worsening enzyme elevations on a GLP-1 should prompt evaluation for other causes (alcohol, hepatitis, other drugs) — they're not typically caused by the GLP-1 itself.",
          },
          {
            question: "What if I already have cirrhosis or chronic liver disease?",
            answer:
              "GLP-1s have not been adequately studied in decompensated cirrhosis. Patients with compensated chronic liver disease (Child-Pugh A) are generally considered candidates with caution and clinician oversight. Decompensated patients should not start a GLP-1 without specialty hepatology input. Always disclose liver disease history to your prescriber before starting therapy.",
          },
          {
            question: "Can a GLP-1 cause acute liver injury or hepatitis?",
            answer:
              "Acute drug-induced liver injury attributable to semaglutide or tirzepatide is exceedingly rare in the published literature — case reports exist but causality is often unclear because affected patients had other liver risk factors. The FDA labels do not flag hepatotoxicity as a recognized class effect. Any patient who develops jaundice, dark urine, or right-upper-quadrant pain on therapy should stop the drug and seek evaluation.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
