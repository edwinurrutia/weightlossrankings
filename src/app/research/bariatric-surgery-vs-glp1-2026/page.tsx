import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "bariatric-surgery-vs-glp1-2026";

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

// Editorial note: every clinical claim verified against PubMed
// primary sources by a research subagent on 2026-04-07. PMIDs:
//   1733140   NIH 1991 Consensus on bariatric surgery
//   36280539  Eisenberg 2022 ASMBS/IFSO indications update
//   28199805  Schauer 2017 STAMPEDE 5-year
//   29340676  Salminen 2018 SLEEVEPASS 5-year
//   35731535  Salminen 2022 SLEEVEPASS 10-year
//   29340679  Peterli 2018 SM-BOSS 5-year
//   17715408  Sjöström 2007 SOS 10.9-year mortality
//   17715409  Adams 2007 NEJM gastric bypass mortality
//   22215166  Sjöström 2012 SOS cardiovascular
//   24915261  Sjöström 2014 SOS cancer
//   15479938  Buchwald 2004 meta-analysis (n=22,094)
//   35657620  Aminian 2022 SPLENDID cancer outcomes
//   33567185  Wilding 2021 STEP-1
//   35658024  Jastreboff 2022 SURMOUNT-1

export default function BariatricVsGlp1Article() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "NIH Consensus Development Panel.",
      title:
        "Gastrointestinal surgery for severe obesity. NIH Consensus Development Conference Statement.",
      source: "Am J Clin Nutr",
      year: 1992,
      pmid: "1733140",
    },
    {
      authors:
        "Eisenberg D, Shikora SA, Aarts E, Aminian A, Angrisani L, Cohen RV, De Luca M, Faria SL, Goodpaster KPS, Haddad A, Himpens JM, Kow L, Kurian M, Loi K, Mahawar K, Nimeri A, O'Kane M, Papasavas PK, Ponce J, Pratt JSA, Rogers AM, Steele KE, Suter M, Kothari SN.",
      title:
        "2022 American Society for Metabolic and Bariatric Surgery (ASMBS) and International Federation for the Surgery of Obesity and Metabolic Disorders (IFSO): Indications for Metabolic and Bariatric Surgery.",
      source: "Surg Obes Relat Dis",
      year: 2022,
      pmid: "36280539",
    },
    {
      authors:
        "Schauer PR, Bhatt DL, Kirwan JP, Wolski K, Aminian A, Brethauer SA, Navaneethan SD, Singh RP, Pothier CE, Nissen SE, Kashyap SR; STAMPEDE Investigators.",
      title:
        "Bariatric Surgery versus Intensive Medical Therapy for Diabetes — 5-Year Outcomes (STAMPEDE).",
      source: "N Engl J Med",
      year: 2017,
      pmid: "28199805",
    },
    {
      authors:
        "Salminen P, Helmiö M, Ovaska J, Juuti A, Leivonen M, Peromaa-Haavisto P, Hurme S, Soinio M, Nuutila P, Victorzon M.",
      title:
        "Effect of Laparoscopic Sleeve Gastrectomy vs Laparoscopic Roux-en-Y Gastric Bypass on Weight Loss at 5 Years Among Patients With Morbid Obesity: The SLEEVEPASS Randomized Clinical Trial.",
      source: "JAMA",
      year: 2018,
      pmid: "29340676",
    },
    {
      authors:
        "Salminen P, Grönroos S, Helmiö M, Hurme S, Juuti A, Juusela R, Peromaa-Haavisto P, Leivonen M, Nuutila P, Ovaska J.",
      title:
        "Effect of Laparoscopic Sleeve Gastrectomy vs Roux-en-Y Gastric Bypass on Weight Loss, Comorbidities, and Reflux at 10 Years in Adult Patients With Obesity: The SLEEVEPASS Randomized Clinical Trial.",
      source: "JAMA Surg",
      year: 2022,
      pmid: "35731535",
    },
    {
      authors:
        "Peterli R, Wölnerhanssen BK, Peters T, Vetter D, Kröll D, Borbély Y, Schultes B, Beglinger C, Drewe J, Schiesser M, Nett P, Bueter M.",
      title:
        "Effect of Laparoscopic Sleeve Gastrectomy vs Laparoscopic Roux-en-Y Gastric Bypass on Weight Loss in Patients With Morbid Obesity: The SM-BOSS Randomized Clinical Trial.",
      source: "JAMA",
      year: 2018,
      pmid: "29340679",
    },
    {
      authors:
        "Sjöström L, Narbro K, Sjöström CD, Karason K, Larsson B, Wedel H, Lystig T, Sullivan M, Bouchard C, Carlsson B, Bengtsson C, Dahlgren S, Gummesson A, Jacobson P, Karlsson J, Lindroos AK, Lönroth H, Näslund I, Olbers T, Stenlöf K, Torgerson J, Agren G, Carlsson LM; Swedish Obese Subjects Study.",
      title:
        "Effects of Bariatric Surgery on Mortality in Swedish Obese Subjects.",
      source: "N Engl J Med",
      year: 2007,
      pmid: "17715408",
    },
    {
      authors:
        "Adams TD, Gress RE, Smith SC, Halverson RC, Simper SC, Rosamond WD, Lamonte MJ, Stroup AM, Hunt SC.",
      title: "Long-Term Mortality after Gastric Bypass Surgery.",
      source: "N Engl J Med",
      year: 2007,
      pmid: "17715409",
    },
    {
      authors:
        "Sjöström L, Peltonen M, Jacobson P, Sjöström CD, Karason K, Wedel H, Ahlin S, Anveden Å, Bengtsson C, Bergmark G, Bouchard C, Carlsson B, Dahlgren S, Karlsson J, Lindroos AK, Lönroth H, Narbro K, Näslund I, Olbers T, Svensson PA, Carlsson LM.",
      title:
        "Bariatric surgery and long-term cardiovascular events.",
      source: "JAMA",
      year: 2012,
      pmid: "22215166",
    },
    {
      authors:
        "Sjöström L, Gummesson A, Sjöström CD, Narbro K, Peltonen M, Wedel H, Bengtsson C, Bouchard C, Carlsson B, Dahlgren S, Jacobson P, Karason K, Karlsson J, Larsson B, Lindroos AK, Lönroth H, Näslund I, Olbers T, Stenlöf K, Torgerson J, Carlsson LM; Swedish Obese Subjects Study.",
      title:
        "Effects of bariatric surgery on cancer incidence in obese patients in Sweden (Swedish Obese Subjects Study): a prospective, controlled intervention trial.",
      source: "Lancet Oncol",
      year: 2009,
      pmid: "24915261",
    },
    {
      authors: "Buchwald H, Avidor Y, Braunwald E, Jensen MD, Pories W, Fahrbach K, Schoelles K.",
      title: "Bariatric surgery: a systematic review and meta-analysis.",
      source: "JAMA",
      year: 2004,
      pmid: "15479938",
    },
    {
      authors:
        "Aminian A, Wilson R, Al-Kurd A, Tu C, Milinovich A, Kroh M, Rosenthal RJ, Brethauer SA, Schauer PR, Kattan MW, Brown JC, Berger NA, Abraham J, Nissen SE.",
      title:
        "Association of Bariatric Surgery With Cancer Risk and Mortality in Adults With Obesity.",
      source: "JAMA",
      year: 2022,
      pmid: "35657620",
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
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Bariatric surgery and GLP-1 receptor agonists are the two most
        effective treatments for severe obesity in 2026, and they are
        not interchangeable. Bariatric surgery has 30+ years of long-
        term data &mdash; the Swedish Obese Subjects study<Cite n={7} />,
        the Adams 2007 NEJM gastric bypass cohort<Cite n={8} />, the
        STAMPEDE diabetes-remission trial<Cite n={3} />, and the
        SLEEVEPASS<Cite n={4} /><Cite n={5} /> and SM-BOSS<Cite n={6} />{" "}
        sleeve-vs-bypass head-to-head trials &mdash; showing sustained
        25-30% body weight loss at 10 years and a roughly 40% reduction
        in all-cause mortality. GLP-1s have produced 14.9% (semaglutide,
        STEP-1)<Cite n={13} /> and 20.9% (tirzepatide, SURMOUNT-1)
        <Cite n={14} /> weight loss in 68-72 week trials, plus
        cardiovascular benefit in SELECT, but no comparable long-term
        mortality data yet. Recent real-world comparisons show bariatric
        surgery still produces roughly 5x the 2-year weight loss of
        GLP-1 monotherapy in matched cohorts. Eligibility, insurance
        coverage, complication profiles, and out-of-pocket costs differ
        substantially between the two paths.
      </p>

      <h2>Eligibility: NIH 1991 vs ASMBS 2022</h2>
      <p>
        The eligibility threshold for bariatric surgery has shifted
        meaningfully in the last few years. The original{" "}
        <strong>1991 NIH Consensus Development Conference</strong> on
        Gastrointestinal Surgery for Severe Obesity<Cite n={1} />{" "}
        established the criteria that defined the field for three
        decades:
      </p>
      <ul>
        <li>BMI ≥ 40 kg/m² (regardless of comorbidities), <em>or</em></li>
        <li>
          BMI ≥ 35 kg/m² with at least one serious comorbidity (T2D,
          severe sleep apnea, obesity-related cardiomyopathy, severe
          joint disease)
        </li>
        <li>Plus prior unsuccessful non-surgical weight loss attempts</li>
        <li>Plus multidisciplinary evaluation (surgical, medical, psychiatric, nutritional)</li>
      </ul>
      <p>
        The <strong>2022 ASMBS/IFSO Indications Statement</strong>
        <Cite n={2} />, by Eisenberg and 23 international expert
        co-authors, lowered the eligibility threshold significantly:
      </p>
      <ul>
        <li>
          <strong>BMI ≥ 35 kg/m² regardless of comorbidities</strong>{" "}
          &mdash; surgery is now recommended at this BMI without
          requiring additional disease
        </li>
        <li>
          <strong>BMI 30-34.9 kg/m² with metabolic disease</strong>{" "}
          (T2D, dyslipidemia, hypertension, OSA, NASH, PCOS) &mdash;
          surgery should be <em>considered</em> in this lower BMI range
          when there is a clear metabolic indication
        </li>
        <li>
          <strong>Asian populations:</strong> BMI ≥ 27.5 with metabolic
          disease, reflecting the lower BMI threshold for clinical
          obesity in Asian adults
        </li>
        <li>
          <strong>Pediatric/adolescent</strong> criteria are addressed
          separately in the AAP 2023 obesity treatment guidelines
        </li>
      </ul>
      <p>
        US payer policies have not yet uniformly adopted the ASMBS 2022
        update. Medicare&apos;s NCD 100.1 still uses the BMI ≥ 35 +
        comorbidity criterion, and most major commercial insurers
        require BMI ≥ 40 (or ≥ 35 with comorbidity) for coverage. The
        bariatric eligibility checker tool we&apos;re building applies
        both standards in parallel so patients can see whether they
        qualify under the academic guideline, the Medicare standard, or
        their specific commercial payer&apos;s criteria.
      </p>

      <h2>STAMPEDE: the surgery vs medical therapy diabetes trial</h2>
      <p>
        STAMPEDE (Surgical Therapy and Medications Potentially Eradicate
        Diabetes Efficiently) is the landmark RCT directly comparing
        bariatric surgery to intensive medical therapy in T2D. Schauer
        and colleagues randomized 150 patients with T2D and BMI 27-43
        to one of three arms: intensive medical therapy alone, Roux-en-Y
        gastric bypass plus medical therapy, or sleeve gastrectomy plus
        medical therapy. The 5-year outcomes paper<Cite n={3} /> reported:
      </p>
      <ul>
        <li>
          <strong>Weight loss:</strong> RYGB &minus;23%, sleeve
          gastrectomy &minus;19%, intensive medical therapy &minus;5%
        </li>
        <li>
          <strong>HbA1c ≤ 6.0% (the primary endpoint):</strong> RYGB
          29%, sleeve 23%, IMT 5% (p=0.03 for RYGB vs IMT, p=0.07 for
          sleeve vs IMT)
        </li>
        <li>
          <strong>Insulin use:</strong> reduced in surgical arms by
          ~35%, in IMT by 13%
        </li>
        <li>
          <strong>Triglyceride reduction:</strong> RYGB &minus;40%,
          sleeve &minus;29%, IMT &minus;8%
        </li>
      </ul>
      <p>
        The STAMPEDE 5-year paper is the strongest single piece of
        randomized evidence that bariatric surgery is superior to
        intensive medical therapy for T2D weight and glycemic outcomes.
        It is from before the modern GLP-1 era &mdash; the medical
        therapy arms in STAMPEDE did not include semaglutide 2.4 mg or
        tirzepatide, which would have produced more weight loss than
        the medical therapy arms achieved.
      </p>

      <h2>SLEEVEPASS and SM-BOSS: sleeve vs bypass</h2>
      <p>
        For patients choosing between procedures, two randomized trials
        provide the cleanest head-to-head data.{" "}
        <strong>SLEEVEPASS</strong> (Salminen et al., JAMA 2018, n=240)
        <Cite n={4} /> randomized Finnish patients with median BMI 44.6
        to sleeve gastrectomy or Roux-en-Y gastric bypass. At 5 years:
      </p>
      <ul>
        <li>
          <strong>Excess weight loss:</strong> sleeve 49%, RYGB 57% (an
          8.2 percentage point difference, just outside the prespecified
          equivalence margin)
        </li>
        <li>
          <strong>T2D remission:</strong> sleeve 37%, RYGB 45%
        </li>
        <li>
          <strong>Hypertension medication discontinuation:</strong>{" "}
          sleeve 29%, RYGB 51% (statistically significant in favor of
          RYGB)
        </li>
        <li>
          <strong>Treatment-related mortality:</strong> zero in both arms
        </li>
      </ul>
      <p>
        The 10-year SLEEVEPASS follow-up<Cite n={5} /> reported median
        excess weight loss of 43.5% (sleeve) vs 50.7% (RYGB) &mdash; the
        gap had narrowed slightly but the directional advantage of RYGB
        persisted. Reflux was more prevalent after sleeve gastrectomy
        than after RYGB at 10 years.
      </p>
      <p>
        <strong>SM-BOSS</strong> (Peterli et al., JAMA 2018, n=217)
        <Cite n={6} /> was the Swiss multicenter equivalent. At 5 years
        the excess BMI loss was 61.6% (sleeve) vs 68.3% (RYGB),
        statistically not significantly different after adjustment.
        GERD remission was meaningfully better after RYGB (60.4% vs
        25.0%), and reoperation rates were 15.8% (sleeve) vs 22.1%
        (RYGB) over 5 years.
      </p>
      <p>
        <strong>The takeaway from both head-to-head trials:</strong>{" "}
        RYGB produces slightly more weight loss and slightly better
        comorbidity remission than sleeve, but at the cost of more
        complications and a more complex anatomy. Sleeve gastrectomy
        is the more common procedure today (faster surgery, shorter
        recovery) and the choice between the two is increasingly
        individualized to comorbidities (RYGB favored for severe GERD
        or T2D), patient preference, and surgeon expertise.
      </p>

      <h2>Long-term mortality: SOS and Adams 2007</h2>
      <p>
        The two studies that established the long-term mortality
        benefit of bariatric surgery are still the dominant references.
      </p>
      <p>
        <strong>Adams TD et al.</strong>, NEJM 2007<Cite n={8} /> studied
        7,925 gastric bypass patients in Utah matched to 7,925 obese
        non-surgical controls. After a mean follow-up of 7.1 years,
        all-cause mortality was 37.6 deaths/10,000 person-years in the
        surgery group vs 57.1/10,000 person-years in the control group
        &mdash; <strong>a 40% reduction</strong> in adjusted all-cause
        mortality. Cause-specific reductions were even larger:
        coronary artery disease mortality &minus;56%, diabetes mortality
        &minus;92%, cancer mortality &minus;60%. The trial also
        identified a paradoxical finding that has shaped post-bariatric
        psychiatric care: non-disease-related deaths (accidents,
        suicide) were 58% <em>higher</em> in the surgery group, which
        is now reflected in routine pre- and post-operative mental
        health screening protocols.
      </p>
      <p>
        <strong>The Swedish Obese Subjects (SOS) Study</strong>
        (Sjöström et al., NEJM 2007<Cite n={7} />) is the largest
        long-term prospective controlled bariatric trial. 2,010
        surgical patients (RYGB 13%, banding 19%, vertical-banded
        gastroplasty 68%) were matched to 2,037 non-surgical controls
        and followed for ~10.9 years. The adjusted hazard ratio for
        all-cause mortality was <strong>0.71 (95% CI 0.54-0.92,
        p=0.01)</strong>. The 24-year follow-up published in NEJM 2020
        (PMID 33053284) reported a sustained HR of 0.77 (95% CI
        0.68-0.87, p&lt;0.001) and a median life-expectancy gain of 3.0
        years (95% CI 1.8-4.2) in the surgery group &mdash; though life
        expectancy was still 5.5 years shorter than the general
        non-obese population.
      </p>
      <p>
        SOS subsequently reported reductions in cardiovascular events
        (Sjöström 2012 JAMA<Cite n={9} />: HR 0.67 for total CV events,
        HR 0.47 for CV deaths) and cancer incidence (Sjöström 2009
        Lancet Oncology<Cite n={10} />: women HR 0.58, men non-
        significant). The <strong>SPLENDID</strong> study by Aminian
        and colleagues<Cite n={12} /> (JAMA 2022, n=5,053 surgery vs
        25,265 controls) replicated the cancer signal in a more
        contemporary US cohort: 10-year cancer incidence 2.9% (surgery)
        vs 4.9% (control), adjusted HR 0.68 (p=0.002), with a 48%
        reduction in cancer-specific mortality.
      </p>
      <p>
        These mortality and outcome data are the strongest single
        argument for bariatric surgery in patients who qualify and can
        access it. GLP-1s do not yet have comparable long-term data,
        though the SELECT trial<Cite n={13} /> (semaglutide,
        cardiovascular outcomes in obesity without diabetes) is the
        most direct GLP-1 analog to date. SELECT reported a 20%
        reduction in 3-point MACE (HR 0.80, 95% CI 0.72-0.90) over a
        median 39.8 months of follow-up &mdash; a meaningful and
        well-powered cardiovascular signal, but a much shorter follow-up
        and a different endpoint than SOS or Adams.
      </p>

      <h2>The 2024-2025 head-to-head: surgery vs GLP-1 in real-world cohorts</h2>
      <p>
        No published RCT has yet directly randomized patients to
        bariatric surgery vs semaglutide or tirzepatide. The closest
        evidence is recent observational comparative work, including a
        2025 ASMBS Annual Meeting presentation analyzing 51,085
        matched-cohort patients across NYU Langone and NYC Health +
        Hospitals data (2018-2024). The headline finding: at 2 years,
        bariatric surgery patients lost approximately 58 lb (24% total
        body weight) vs approximately 12 lb (4.7% total body weight)
        for GLP-1 monotherapy &mdash; a roughly 5-fold weight loss
        advantage for surgery in real-world use.
      </p>
      <p>
        That ratio is much larger than the 2-3x ratio that the
        randomized trial weight-loss numbers (STEP-1, SURMOUNT-1, vs
        STAMPEDE bariatric arms) would suggest. The discrepancy is
        almost entirely about adherence and persistence: patients in
        the STEP-1 and SURMOUNT-1 trials were closely supervised and
        had high persistence with weekly injections; real-world GLP-1
        patients have much higher discontinuation rates (often 50% or
        more by 12 months) due to cost, side effects, and weight
        regain on cessation. Bariatric surgery is a one-time procedure
        with a permanent anatomical change.
      </p>

      <h2>Cost and insurance coverage</h2>
      <p>
        Cost is one of the dimensions where the comparison gets
        complicated. Bariatric surgery is a significant up-front cost;
        GLP-1 therapy is a recurring monthly cost.
      </p>
      <ul>
        <li>
          <strong>Sleeve gastrectomy (US, 2024-2025):</strong> typical
          range $9,500-$23,000 cash pay, with average commercial
          insurance billings around $17,000-$22,000. Self-pay packages
          at high-volume centers commonly run $9,500-$15,000.
        </li>
        <li>
          <strong>Roux-en-Y gastric bypass (US):</strong> typical range
          $13,000-$25,000 cash pay; commercial insurance billings
          around $18,000-$24,000.
        </li>
        <li>
          <strong>Geographic variation</strong> is large. Cost varies
          almost 2-fold between low-cost states and high-cost states
          for identical procedures.
        </li>
        <li>
          <strong>Post-op out-of-pocket</strong> with commercial
          insurance: ~$1,100-$1,400/year for years 1-3 (clinic visits,
          labs, supplements, occasional revisions).
        </li>
      </ul>
      <p>
        Compared to the recurring cost of GLP-1 therapy at brand-name
        prices ($349-$499/month for Wegovy NovoCare, $299-$699/month
        for Zepbound LillyDirect, $149/month for Foundayo, or
        $125-$300/month for compounded semaglutide or tirzepatide), the
        total 5-year cost of GLP-1 therapy can equal or exceed the cost
        of surgery, especially at brand-name pricing. Our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>{" "}
        documents the current numbers.
      </p>
      <p>
        <strong>Insurance coverage</strong> for bariatric surgery is
        broader than for GLP-1s in many populations. Medicare&apos;s
        NCD 100.1 covers RYGB, BPD/DS, sleeve gastrectomy, and gastric
        banding for patients meeting BMI ≥ 35 + comorbidity criteria
        with prior failure of medical management at an
        ASMBS/MBSAQIP-certified facility. 48 of 50 state Medicaid
        programs offer some level of bariatric surgery coverage with
        state-specific PA criteria. Major commercial insurers (Aetna,
        Cigna, UnitedHealthcare, BCBS, Humana) generally cover surgery
        with prior authorization requiring documented BMI, supervised
        medical weight management (often 6-12 months), psychological
        evaluation, and smoking cessation. By contrast, employer
        coverage of GLP-1s for obesity (vs T2D) remains highly
        variable; see our{" "}
        <Link href="/research/glp1-insurance-coverage-audit">
          GLP-1 insurance coverage audit
        </Link>{" "}
        for the patterns.
      </p>

      <h2>Complication profiles compared</h2>
      <p>
        Surgery and GLP-1 therapy have very different risk profiles.
      </p>
      <p>
        <strong>Bariatric surgery</strong>:
      </p>
      <ul>
        <li>
          30-day operative mortality: 0.1% (banding) to 1.1% (BPD/DS)
          per Buchwald 2004<Cite n={11} />; modern series cite ~0.1-0.3%
          for sleeve and RYGB at high-volume centers.
        </li>
        <li>
          Early postoperative complications (leaks, bleeding, wound
          infection): 5-15% depending on procedure and center.
        </li>
        <li>
          Long-term complications: dumping syndrome (RYGB), severe
          GERD (sleeve), nutritional deficiencies (B12, iron, calcium,
          vitamin D), hypoglycemia, marginal ulceration. Lifetime
          monitoring is required.
        </li>
        <li>
          Reoperation rates: SLEEVEPASS reported 15.8% (sleeve) vs
          22.1% (RYGB) over 5 years.
        </li>
        <li>
          Psychological / suicidality risk: documented post-surgical
          increase per Adams 2007 and SOS data; routine pre- and
          post-surgical mental health support is now standard.
        </li>
      </ul>
      <p>
        <strong>GLP-1 receptor agonists</strong>:
      </p>
      <ul>
        <li>
          GI side effects (nausea, vomiting, diarrhea, constipation)
          dose-dependent and most intense in first 4-8 weeks. See our{" "}
          <Link href="/research/glp1-nausea-management-practical-guide">
            nausea management guide
          </Link>
          .
        </li>
        <li>
          Boxed warning for thyroid C-cell tumors (animal data;
          contraindicated in MTC and MEN 2 history).
        </li>
        <li>
          Pancreatitis signal: small numerical excess in trials.
        </li>
        <li>
          Gallbladder events: increased rates of cholelithiasis with
          rapid weight loss.
        </li>
        <li>
          Lean mass loss: ~25-45% of total weight loss is lean tissue
          without protein and resistance training intervention. See
          our{" "}
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            loose skin after rapid GLP-1 weight loss
          </Link>{" "}
          article.
        </li>
        <li>
          Discontinuation effect: substantial weight regain on
          stopping, documented in STEP-4 and SURMOUNT-4.
        </li>
      </ul>

      <h2>The honest decision tree</h2>
      <ul>
        <li>
          <strong>BMI ≥ 40 (or ≥ 35 with severe comorbidity):</strong>{" "}
          surgery is the more effective long-term option in the
          published evidence. GLP-1 may be a reasonable bridge or
          adjunct, especially if surgery is delayed for cardio-metabolic
          optimization.
        </li>
        <li>
          <strong>BMI 30-35 with metabolic disease:</strong> ASMBS 2022
          now considers surgery; insurance often does not cover it
          yet. GLP-1 is the first-line option and is widely covered for
          T2D.
        </li>
        <li>
          <strong>BMI 27-30 with comorbidity:</strong> GLP-1 is
          first-line. Surgery is generally not indicated.
        </li>
        <li>
          <strong>Patient prefers a one-time procedure</strong> and is
          willing to accept the surgical risk and lifelong nutritional
          monitoring: surgery.
        </li>
        <li>
          <strong>Patient prefers a reversible / titratable
          intervention:</strong> GLP-1.
        </li>
        <li>
          <strong>Severe sleep apnea, severe T2D with poor control,
          NASH cirrhosis, severe joint disease impairing mobility:</strong>{" "}
          surgery has the strongest long-term comorbidity-resolution
          data per Buchwald 2004 (T2D resolved 76.8%, HTN 61.7%, OSA
          85.7%).
        </li>
        <li>
          <strong>Pre/post-operative GLP-1 management:</strong> the
          ASA 2023 guidance on preoperative cessation of GLP-1s before
          elective surgery was updated in 2024 to a more permissive
          position (most patients may continue, with individualized
          risk assessment). See our{" "}
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            GLP-1 surgery and anesthesia guidance article
          </Link>
          .
        </li>
        <li>
          <strong>Weight regain after bariatric surgery</strong> (which
          occurs in ~25-30% of patients) is now commonly treated with
          GLP-1 RAs as a non-revisional option, with semaglutide and
          tirzepatide both showing meaningful weight reduction in
          post-bariatric cohorts.
        </li>
      </ul>

      <h2>Bottom line</h2>
      <ul>
        <li>
          Bariatric surgery has 30+ years of long-term mortality data
          (Adams 2007, SOS 24-year follow-up) showing 40% reduction in
          all-cause mortality and meaningful reductions in
          cardiovascular events and cancer.
        </li>
        <li>
          GLP-1s have produced comparable short-term weight loss
          magnitudes (14-21% in 68-72 week trials) and parallel
          cardiovascular outcomes (SELECT), but no comparable long-term
          mortality data yet.
        </li>
        <li>
          Real-world matched cohorts show bariatric surgery still
          produces ~5x the 2-year weight loss of GLP-1 monotherapy,
          driven largely by GLP-1 discontinuation rates.
        </li>
        <li>
          ASMBS 2022 lowered the surgery eligibility threshold to BMI
          ≥ 35 (regardless of comorbidities) and BMI 30-34.9 with
          metabolic disease &mdash; a meaningful expansion that US
          payers have not yet fully adopted.
        </li>
        <li>
          Total 5-year cost of brand-name GLP-1 therapy can equal or
          exceed the cost of bariatric surgery; insurance coverage for
          surgery is generally broader than for GLP-1s in obesity.
        </li>
        <li>
          The two interventions are increasingly used in sequence or
          in combination (GLP-1 for post-surgical weight regain, GLP-1
          as a bridge to surgery, surgery as a definitive option after
          GLP-1 discontinuation).
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            GLP-1 surgery and anesthesia (ASA) guidance
          </Link>{" "}
          &mdash; perioperative GLP-1 management, including for
          bariatric surgery
        </li>
        <li>
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            SELECT trial: cardiovascular benefits in obesity without
            diabetes
          </Link>{" "}
          &mdash; the closest GLP-1 analog to the SOS / Adams mortality
          evidence
        </li>
        <li>
          <Link href="/research/glp1-pricing-index">
            GLP-1 compounded pricing index
          </Link>{" "}
          &mdash; the recurring-cost half of the comparison
        </li>
        <li>
          <Link href="/research/glp1-insurance-coverage-audit">
            GLP-1 insurance coverage audit
          </Link>{" "}
          &mdash; how payers handle GLP-1s vs how they handle
          bariatric surgery
        </li>
        <li>
          <Link href="/research/loose-skin-after-glp1-weight-loss">
            Loose skin after rapid GLP-1 weight loss
          </Link>{" "}
          &mdash; a downstream issue shared by both pathways
        </li>
        <li>
          <Link href="/research/sglt2-inhibitors-vs-glp1-jardiance-farxiga">
            SGLT2 inhibitors vs GLP-1s
          </Link>{" "}
          &mdash; the third major drug option for T2D + obesity
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The choice
        between bariatric surgery and pharmacologic obesity therapy
        depends on BMI, comorbidities, prior treatments, payer
        coverage, and patient preference, and should be made with a
        bariatric surgeon and an obesity-medicine clinician
        experienced in both pathways. Every primary source cited here
        was independently verified against PubMed and CMS by a
        research subagent on 2026-04-07. Self-pay cost ranges are
        approximate and vary substantially by region and facility;
        verify with your specific surgeon&apos;s office before
        financial planning.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Is bariatric surgery better than Wegovy or Zepbound?",
            answer:
              "For absolute weight loss in real-world cohorts, yes. Recent matched-cohort data from NYU Langone (51,085 patients) showed bariatric surgery patients lost approximately 58 lb (24% body weight) at 2 years vs 12 lb (4.7%) on GLP-1 monotherapy — roughly a 5x advantage for surgery, driven largely by GLP-1 discontinuation. Surgery has 30+ years of long-term mortality data (Adams 2007 NEJM PMID 17715409: 40% reduction in all-cause mortality).",
          },
          {
            question: "Do I qualify for bariatric surgery?",
            answer:
              "Under the older NIH 1991 criteria still used by Medicare and most commercial insurers: BMI ≥40, OR BMI ≥35 with at least one comorbidity. The 2022 ASMBS / IFSO update (PMID 36280539) lowered the academic threshold to BMI ≥35 regardless of comorbidities and BMI 30-34.9 with metabolic disease — but most US payers have not yet adopted these lower thresholds. Use our bariatric eligibility checker tool to see your status under each standard.",
          },
          {
            question: "How much does bariatric surgery cost?",
            answer:
              "Sleeve gastrectomy typically costs $9,500-$23,000 in the US (cash pay or insurance billed); Roux-en-Y gastric bypass $13,000-$25,000. Average commercial billings for both procedures are around $17,000-$22,000. Geographic variation is roughly 2-fold between low-cost and high-cost states. Medicare and 48 of 50 state Medicaid programs cover bariatric surgery with prior authorization for patients meeting the BMI + comorbidity criteria.",
          },
          {
            question: "Can I take a GLP-1 after bariatric surgery?",
            answer:
              "Yes. Approximately 25-30% of bariatric surgery patients experience weight regain over time. GLP-1 receptor agonists are now commonly used as a non-revisional option for post-bariatric weight regain, with both semaglutide and tirzepatide showing meaningful additional weight loss in retrospective cohorts. Most commonly initiated 2-4 years after surgery. Check our perioperative GLP-1 guidance article for the safety considerations.",
          },
          {
            question: "What's the long-term mortality benefit of bariatric surgery?",
            answer:
              "Adams 2007 in NEJM (PMID 17715409) studied 7,925 gastric bypass patients matched to non-surgical controls and reported a 40% reduction in adjusted all-cause mortality at 7 years. The Swedish Obese Subjects (SOS) study (PMID 17715408) reported a hazard ratio of 0.71 for all-cause mortality at 10.9 years, with sustained benefit at 24-year follow-up (HR 0.77). Cause-specific reductions include 56% lower CAD mortality, 92% lower diabetes mortality, and 60% lower cancer mortality.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
