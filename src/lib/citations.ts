/**
 * Central citation registry for WeightLossRankings.org
 *
 * Every external claim published on this site should trace back to a source
 * registered here. Add new sources to the CITATIONS map; never delete entries
 * once they are live (mark url as TODO:// if a source moves and you need a
 * human to re-verify the canonical URL).
 *
 * Update `accessedDate` whenever you re-verify a source is still live and
 * accurate. This drives the freshness stamp shown to readers.
 */

export type CitationCategory =
  | "regulatory"
  | "clinical-trial"
  | "pricing"
  | "statistics"
  | "guideline";

export interface CitationEntry {
  /** Kebab-case unique identifier, e.g. "cdc-brfss-obesity-2023". */
  id: string;
  /** Short display title shown in footnotes and the /sources index. */
  label: string;
  /** Full publisher / organization name. */
  publisher: string;
  /**
   * Canonical primary-source URL.
   * If the real URL cannot be verified, use "https://todo.invalid/<id>"
   * so a human reviewer can find and fix it quickly.
   */
  url: string;
  /** Broad category used to group entries on the /sources page. */
  category: CitationCategory;
  /** ISO YYYY-MM-DD — date we last confirmed this source is accurate and live. */
  accessedDate: string;
  /** Year (or quarter) of the underlying data, e.g. "2023" or "Q4 2024". */
  dataYear: string;
  /** PubMed ID for journal articles indexed in MEDLINE. */
  pmid?: string;
  /** Digital Object Identifier, e.g. "10.1056/NEJMoa2032183". */
  doi?: string;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

const CITATIONS_LIST: CitationEntry[] = [
  // ── Pricing ──────────────────────────────────────────────────────────────

  {
    // 2026-04-06: The deep-link /savings-card.html path started 404ing in the
    // first source-freshness audit run. Switched to the canonical NovoCare
    // Wegovy product landing page, which surfaces current cash-pay, savings
    // card, and affordability information from the same publisher.
    id: "novocare-wegovy-cash-price",
    label: "NovoCare — Wegovy cash-pay and savings program",
    publisher: "Novo Nordisk (NovoCare)",
    url: "https://www.novocare.com/obesity/products/wegovy.html",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    // AUDIT-EXCLUDED: Eli Lilly's entire *.lilly.com and lillydirect.com
    // footprint returns HTTP 403 to any non-interactive Chrome User-Agent
    // (bot-fingerprinting / Akamai). Verified 2026-04-06. The canonical
    // LillyDirect Zepbound self-pay page remains the editorial primary
    // source for this claim; verify manually quarterly in a real browser.
    id: "lilly-zepbound-cash-price",
    label: "LillyDirect — Zepbound self-pay program and cash price",
    publisher: "Eli Lilly and Company (LillyDirect)",
    url: "https://www.lillydirect.com/zepbound",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    // 2026-04-06: The deep-link /savings-card.html path started 404ing in the
    // first source-freshness audit run. Switched to the canonical NovoCare
    // Ozempic product landing page on the same publisher's domain.
    id: "novocare-ozempic-cash-price",
    label: "NovoCare — Ozempic savings and patient assistance information",
    publisher: "Novo Nordisk (NovoCare)",
    url: "https://www.novocare.com/diabetes/products/ozempic.html",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    // AUDIT-EXCLUDED: Eli Lilly's *.lilly.com and lillydirect.com footprint
    // returns HTTP 403 to any non-interactive Chrome User-Agent (Akamai
    // bot-fingerprinting). Verified 2026-04-06. The canonical LillyDirect
    // Mounjaro self-pay page remains the editorial primary source for this
    // claim; verify manually quarterly in a real browser.
    id: "lilly-mounjaro-cash-price",
    label: "LillyDirect — Mounjaro self-pay and savings card program",
    publisher: "Eli Lilly and Company (LillyDirect)",
    url: "https://www.lillydirect.com/mounjaro",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "wlr-pricing-index",
    label:
      "Weight Loss Rankings — GLP-1 Pricing Index 2026 (our independent dataset)",
    publisher: "WeightLossRankings.org",
    url: "/research/glp-1-pricing-index-2026",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    // Our own per-insurer coverage dataset — manually curated from each
    // insurer's published formulary, prior-authorization rules, and
    // step-therapy requirements. Verified continuously and reviewed
    // monthly by the editorial team.
    id: "wlr-insurer-coverage-index",
    label:
      "Weight Loss Rankings insurer coverage index (manually curated formulary data)",
    publisher: "Weight Loss Rankings",
    url: "/insurance",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },

  // ── Regulatory ────────────────────────────────────────────────────────────

  {
    id: "fda-503a-compounding",
    label: "FDA — Compounding and the 503A Pharmacy Framework",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "fda-503b-outsourcing",
    label: "FDA — 503B Outsourcing Facility Registration and Requirements",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "fda-drug-shortage-list",
    label: "FDA — Drug Shortages Database (current shortage listings)",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/drugshortages/",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "fda-glp1-warning-letters",
    label:
      "FDA — Warning Letters Regarding Compounded GLP-1 Drug Products",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },

  // ── Statistics ────────────────────────────────────────────────────────────

  {
    // 2026-04-06: CDC restructured its obesity microsite in 2024–2025 and the
    // legacy /obesity/data/prevalence-maps.html deep link now 404s. Pointed
    // at the canonical CDC obesity data-and-statistics hub, which surfaces
    // the current BRFSS adult-obesity prevalence maps.
    id: "cdc-brfss-obesity",
    label:
      "CDC BRFSS — Adult Obesity Prevalence Maps by State (Behavioral Risk Factor Surveillance System)",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/obesity/data-and-statistics/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    // 2026-04-06: Legacy /obesity/data/adult.html path now 404s after the
    // 2024–2025 CDC site restructure. Moved to the canonical CDC "Adult
    // Obesity Facts" hub, which is the stable landing page for state-by-
    // state adult obesity prevalence and rankings.
    id: "cdc-state-obesity-rankings",
    label:
      "CDC — State Obesity Rankings and Adult Obesity Facts",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/obesity/adult-obesity-facts/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    // Canonical KFF Medicaid topic page — stable hub URL rather than a deep
    // issue-brief link that rotates as KFF publishes new analyses. Readers
    // following this link land on the latest KFF Medicaid coverage research,
    // including their periodic anti-obesity drug analyses.
    id: "kff-medicaid-obesity-drug-coverage",
    label:
      "KFF — Medicaid coverage research (anti-obesity & GLP-1 drug policy)",
    publisher: "Kaiser Family Foundation",
    url: "https://www.kff.org/medicaid/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    // CMS is the authoritative federal source for state Medicaid prescription
    // drug coverage policy. Linking to the canonical Rx drugs landing page
    // (rather than a deep-link that may move) so the source stays valid.
    id: "cms-medicaid-prescription-drugs",
    label:
      "CMS — Medicaid prescription drug coverage policy (state-by-state)",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.medicaid.gov/medicaid/prescription-drugs/index.html",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    // IRS Publication 502 is the authoritative source on what counts as a
    // qualified medical expense for HSA/FSA purposes. Used to ground claims
    // about HSA/FSA eligibility for prescription drugs (including compounded
    // medications, which are generally eligible with a prescription).
    id: "irs-pub-502-medical-expenses",
    label:
      "IRS Publication 502 — Medical and Dental Expenses (HSA/FSA eligibility)",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p502",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    id: "kff-glp1-pricing-brief",
    label:
      "KFF — Health costs research (GLP-1 pricing, Medicare & insurance coverage)",
    publisher: "Kaiser Family Foundation",
    url: "https://www.kff.org/health-costs/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },

  // ── Clinical Trials ───────────────────────────────────────────────────────

  {
    id: "step1-nejm-2021",
    label:
      "STEP 1 Trial — Once-Weekly Semaglutide in Adults with Overweight or Obesity (Wilding JPH et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2032183",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "33567185",
    doi: "10.1056/NEJMoa2032183",
  },
  {
    id: "surmount1-nejm-2022",
    label:
      "SURMOUNT-1 Trial — Tirzepatide Once Weekly for the Treatment of Obesity (Jastreboff AM et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2206038",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2022",
    pmid: "35658024",
    doi: "10.1056/NEJMoa2206038",
  },
  {
    id: "select-nejm-2023",
    label:
      "SELECT Trial — Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (Lincoff AM et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2307563",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2023",
    pmid: "37952131",
    doi: "10.1056/NEJMoa2307563",
  },
  {
    id: "surmount5-nejm-2025",
    label:
      "SURMOUNT-5 Trial — Tirzepatide vs. Semaglutide Head-to-Head in Obesity (Garvey WT et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2413944",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2025",
    pmid: "40334173",
    doi: "10.1056/NEJMoa2413944",
  },
  {
    id: "surpass2-nejm-2021",
    label:
      "SURPASS-2 Trial — Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (Frías JP et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2107519",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "34170647",
    doi: "10.1056/NEJMoa2107519",
  },

  // ── Clinical Trials — Semaglutide STEP family ────────────────────────────
  // The STEP (Semaglutide Treatment Effect in People with Obesity) program is
  // the pivotal Phase 3 evidence base supporting Wegovy's obesity indication.
  // STEP 1 is registered above; STEP 2–8, STEP TEENS, and STEP-HFpEF are
  // appended here as primary references for efficacy, safety, withdrawal
  // dynamics, head-to-head data, adolescents, and heart-failure outcomes.

  {
    id: "step2-lancet-2021",
    label:
      "STEP 2 Trial — Semaglutide 2.4 mg Once a Week in Adults with Overweight or Obesity and Type 2 Diabetes (Davies M et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/33667417/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "33667417",
  },
  {
    id: "step3-jama-2021",
    label:
      "STEP 3 Trial — Effect of Semaglutide vs Placebo as Adjunct to Intensive Behavioral Therapy on Body Weight (Wadden TA et al.)",
    publisher: "JAMA",
    url: "https://pubmed.ncbi.nlm.nih.gov/33625476/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "33625476",
  },
  {
    id: "step4-jama-2021",
    label:
      "STEP 4 Trial — Effect of Continued Weekly Subcutaneous Semaglutide vs Placebo on Weight Loss Maintenance (Rubino D et al.)",
    publisher: "JAMA",
    url: "https://pubmed.ncbi.nlm.nih.gov/33755728/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "33755728",
  },
  {
    id: "step5-natmed-2022",
    label:
      "STEP 5 Trial — Two-Year Effects of Semaglutide in Adults with Overweight or Obesity (Garvey WT et al.)",
    publisher: "Nature Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/36216945/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2022",
    pmid: "36216945",
  },
  {
    id: "step8-jama-2022",
    label:
      "STEP 8 Trial — Effect of Weekly Subcutaneous Semaglutide vs Daily Liraglutide on Body Weight (Rubino DM et al.)",
    publisher: "JAMA",
    url: "https://pubmed.ncbi.nlm.nih.gov/35015037/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2022",
    pmid: "35015037",
  },
  {
    id: "step-teens-nejm-2022",
    label:
      "STEP TEENS Trial — Once-Weekly Semaglutide in Adolescents with Obesity (Weghuber D et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/35323065/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2022",
    pmid: "35323065",
  },
  {
    id: "step-hfpef-nejm-2023",
    label:
      "STEP-HFpEF Trial — Semaglutide in Patients with Heart Failure with Preserved Ejection Fraction and Obesity (Kosiborod MN et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/37622681/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2023",
    pmid: "37622681",
  },

  // ── Clinical Trials — Semaglutide cardiovascular & renal outcomes ────────
  // SUSTAIN-6 established the CV safety / benefit signal in T2D that
  // ultimately motivated SELECT in obesity. FLOW extended the evidence to
  // chronic kidney disease outcomes.

  {
    id: "sustain6-nejm-2016",
    label:
      "SUSTAIN-6 Trial — Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes (Marso SP et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/27633186/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2016",
    pmid: "27633186",
  },
  {
    id: "flow-nejm-2024",
    label:
      "FLOW Trial — Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes (Perkovic V et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/38785288/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2024",
    pmid: "38785288",
  },

  // ── Clinical Trials — Tirzepatide SURMOUNT and SURPASS programs ──────────
  // SURMOUNT is the obesity Phase 3 program supporting Zepbound; SURPASS is
  // the type 2 diabetes Phase 3 program supporting Mounjaro. SURMOUNT-1 and
  // SURMOUNT-5 are registered above and intentionally not duplicated here.

  {
    id: "surmount2-lancet-2023",
    label:
      "SURMOUNT-2 Trial — Tirzepatide for the Treatment of Obesity in People with Type 2 Diabetes (Garvey WT et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/37356449/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2023",
    pmid: "37356449",
  },
  {
    id: "surmount3-natmed-2024",
    label:
      "SURMOUNT-3 Trial — Tirzepatide After Intensive Lifestyle Intervention in Adults with Overweight or Obesity (Wadden TA et al.)",
    publisher: "Nature Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/38334595/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2024",
    pmid: "38334595",
  },
  {
    id: "surmount4-jama-2023",
    label:
      "SURMOUNT-4 Trial — Continued vs. Withdrawn Tirzepatide for Maintenance of Weight Reduction (Aronne LJ et al.)",
    publisher: "JAMA",
    url: "https://pubmed.ncbi.nlm.nih.gov/38078870/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2023",
    pmid: "38078870",
  },
  {
    id: "surpass1-lancet-2021",
    label:
      "SURPASS-1 Trial — Tirzepatide versus Placebo as Monotherapy in Type 2 Diabetes (Rosenstock J et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/34186022/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "34186022",
  },
  {
    id: "surpass3-lancet-2021",
    label:
      "SURPASS-3 Trial — Tirzepatide versus Insulin Degludec in Type 2 Diabetes (Ludvik B et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/34370970/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "34370970",
  },
  {
    id: "surpass4-lancet-2021",
    label:
      "SURPASS-4 Trial — Tirzepatide versus Insulin Glargine in Type 2 Diabetes with High Cardiovascular Risk (Del Prato S et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/34508103/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "34508103",
  },

  // ── Clinical Trials — Oral semaglutide and next-generation incretins ─────

  {
    id: "oasis1-lancet-2023",
    label:
      "OASIS 1 Trial — Oral Semaglutide 50 mg for the Treatment of Adults with Overweight or Obesity (Knop FK et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/37364588/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2023",
    pmid: "37364588",
  },

  // ── Clinical Trials — Liraglutide predecessor reference ──────────────────
  // Liraglutide (Saxenda/Victoza) is the first-generation comparator that
  // anchors many GLP-1 efficacy and safety claims.

  {
    id: "scale-nejm-2015",
    label:
      "SCALE Obesity and Prediabetes Trial — A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management (Pi-Sunyer X et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/26132939/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2015",
    pmid: "26132939",
  },
  {
    id: "lead2-lancet-2009",
    label:
      "LEAD-2 Trial — Liraglutide vs Glimepiride as Add-on to Metformin in Type 2 Diabetes (Nauck M et al.)",
    publisher: "The Lancet",
    url: "https://pubmed.ncbi.nlm.nih.gov/19216158/",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2009",
    pmid: "19216158",
  },

  // ── Regulatory — FDA approvals and prescribing information ───────────────
  // Canonical FDA Drugs@FDA and Access Data landing pages. We intentionally
  // link to stable parent pages where deep PDF links rotate, so reviewers can
  // navigate to the current label.

  {
    id: "fda-wegovy-approval",
    label: "FDA — Wegovy (semaglutide) Approval History via Drugs@FDA",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=215256",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2021",
  },
  {
    id: "fda-zepbound-approval",
    label: "FDA — Zepbound (tirzepatide) Approval History via Drugs@FDA",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=217806",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    id: "fda-ozempic-label",
    label: "FDA — Ozempic (semaglutide) Prescribing Information via Drugs@FDA",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=209637",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "fda-mounjaro-label",
    label: "FDA — Mounjaro (tirzepatide) Prescribing Information via Drugs@FDA",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=215866",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2022",
  },
  {
    id: "fda-rybelsus-label",
    label: "FDA — Rybelsus (oral semaglutide) Prescribing Information via Drugs@FDA",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=213051",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },

  // ── Regulatory — Compounding, sterility, and adverse-event surveillance ──

  {
    id: "fda-faers",
    label: "FDA Adverse Event Reporting System (FAERS) Public Dashboard",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/questions-and-answers-fdas-adverse-event-reporting-system-faers/fda-adverse-event-reporting-system-faers-public-dashboard",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    // AUDIT-EXCLUDED: usp.org returns HTTP 403 to all non-interactive
    // User-Agents (aggressive WAF / bot-blocking, verified 2026-04-06 on the
    // full domain including /, /about, /compounding/*). USP General Chapter
    // <797> is the editorially correct primary source for sterile-compounding
    // standards and cannot be substituted with another publisher. Verify
    // manually quarterly in a real browser.
    id: "usp-797-sterile-compounding",
    label: "USP General Chapter <797> — Pharmaceutical Compounding: Sterile Preparations",
    publisher: "United States Pharmacopeia",
    url: "https://www.usp.org/compounding/general-chapter-797",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    // AUDIT-EXCLUDED: usp.org bot-blocks all non-interactive User-Agents
    // (HTTP 403, verified 2026-04-06). USP <85> is the primary-source
    // standard for bacterial endotoxin testing and cannot be substituted.
    // Verify manually quarterly in a real browser.
    id: "usp-85-endotoxin",
    label: "USP General Chapter <85> — Bacterial Endotoxins Test",
    publisher: "United States Pharmacopeia",
    url: "https://www.usp.org/harmonization-standards/pdg/general-methods/bacterial-endotoxins",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    // AUDIT-EXCLUDED: usp.org bot-blocks all non-interactive User-Agents
    // (HTTP 403, verified 2026-04-06). USP <71> is the primary-source
    // standard for sterility testing and cannot be substituted. Verify
    // manually quarterly in a real browser.
    id: "usp-71-sterility",
    label: "USP General Chapter <71> — Sterility Tests",
    publisher: "United States Pharmacopeia",
    url: "https://www.usp.org/harmonization-standards/pdg/general-methods/sterility-tests",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    id: "pcab-accreditation-standards",
    label: "PCAB — Pharmacy Compounding Accreditation Board Standards",
    publisher: "Accreditation Commission for Health Care (ACHC) / PCAB",
    url: "https://www.achc.org/pharmacy/",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },

  // ── Regulatory — Insurance, Medicare, and employer benefit law ───────────

  {
    id: "cms-medicare-part-d",
    label: "CMS — Medicare Part D Prescription Drug Coverage Program",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    id: "medicaid-drug-rebate-program",
    label: "CMS — Medicaid Drug Rebate Program (MDRP)",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.medicaid.gov/medicaid/prescription-drugs/medicaid-drug-rebate-program/index.html",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    id: "erisa-employer-health-plans",
    label: "U.S. Department of Labor — ERISA and Employer Health Plans",
    publisher: "U.S. Department of Labor, Employee Benefits Security Administration",
    url: "https://www.dol.gov/general/topic/health-plans/erisa",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },

  // ── Guidelines — Clinical practice guidance ──────────────────────────────
  // Authoritative society and task-force documents that physicians use to
  // prescribe and manage GLP-1 therapy. Linked at canonical hub URLs that the
  // issuing body maintains.

  {
    id: "aace-obesity-guidelines-2016",
    label:
      "AACE/ACE Comprehensive Clinical Practice Guidelines for Medical Care of Patients with Obesity (Garvey WT et al., 2016)",
    publisher: "American Association of Clinical Endocrinology",
    url: "https://pubmed.ncbi.nlm.nih.gov/27219496/",
    category: "guideline",
    accessedDate: "2026-04-06",
    dataYear: "2016",
    pmid: "27219496",
  },
  {
    id: "ahacc-obesity-guidelines",
    label:
      "2013 AHA/ACC/TOS Guideline for the Management of Overweight and Obesity in Adults (Jensen MD et al.)",
    publisher: "American Heart Association / American College of Cardiology / The Obesity Society",
    url: "https://pubmed.ncbi.nlm.nih.gov/24222017/",
    category: "guideline",
    accessedDate: "2026-04-06",
    dataYear: "2014",
    pmid: "24222017",
  },
  {
    // 2026-04-06: diabetesjournals.org returns HTTP 403 to non-interactive
    // User-Agents (Cloudflare bot protection). Moved to the ADA's
    // professional site "Standards of Care" hub, which is maintained by the
    // same publisher (American Diabetes Association) and links to the
    // current Standards of Care supplement.
    id: "ada-standards-of-care-2025",
    label: "ADA — Standards of Care in Diabetes (2025)",
    publisher: "American Diabetes Association",
    url: "https://professional.diabetes.org/standards-of-care",
    category: "guideline",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    id: "uspstf-behavioral-weight-loss",
    label:
      "USPSTF — Behavioral Weight Loss Interventions to Prevent Obesity-Related Morbidity and Mortality in Adults",
    publisher: "U.S. Preventive Services Task Force",
    url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/obesity-in-adults-interventions",
    category: "guideline",
    accessedDate: "2026-04-06",
    dataYear: "2018",
  },
  {
    id: "endocrine-society-glp1-guidance",
    label: "Endocrine Society — Pharmacological Management of Obesity Clinical Practice Guideline",
    publisher: "The Endocrine Society",
    url: "https://www.endocrine.org/clinical-practice-guidelines/pharmacological-management-of-obesity",
    category: "guideline",
    accessedDate: "2026-04-06",
    dataYear: "2015",
  },
  {
    id: "obesity-society-position-statement",
    label: "The Obesity Society — Position Statements and Clinical Resources",
    publisher: "The Obesity Society",
    url: "https://www.obesity.org/about/position-statements/",
    category: "guideline",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },

  // ── Statistics — Population health and prevalence ────────────────────────

  {
    // 2026-04-06: Legacy /nchs/nhanes/index.htm deep link now 404s after the
    // 2024–2025 CDC site restructure. Switched to the NCHS FastStats hub on
    // "Obesity and Overweight", which is the canonical population-health
    // prevalence page sourced from NHANES and maintained by the same CDC
    // NCHS publisher.
    id: "cdc-nhanes-obesity",
    label: "CDC NHANES — National Health and Nutrition Examination Survey: Obesity and Overweight",
    publisher: "Centers for Disease Control and Prevention / NCHS",
    url: "https://www.cdc.gov/nchs/fastats/obesity-overweight.htm",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    id: "nih-niddk-overweight-obesity",
    label: "NIH NIDDK — Overweight & Obesity Statistics",
    publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
    url: "https://www.niddk.nih.gov/health-information/health-statistics/overweight-obesity",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "who-obesity-fact-sheet",
    label: "WHO — Obesity and Overweight Fact Sheet",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },

  // ── Statistics — Insurance, access, and spending (KFF and similar) ───────

  {
    // 2026-04-06: KFF's permanent /employer-health-benefits-annual-survey/
    // redirect target broke in the first audit run. Switched to the
    // canonical 2024 EHBS report URL on the same publisher's domain —
    // KFF publishes one of these per year, so the URL will need a bump
    // when the 2025 edition lands.
    id: "kff-employer-health-benefits-survey",
    label: "KFF — Employer Health Benefits Annual Survey",
    publisher: "Kaiser Family Foundation",
    url: "https://www.kff.org/health-costs/report/2024-employer-health-benefits-survey/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "kff-medicare-glp1-spending",
    label: "KFF — Medicare Spending on GLP-1 Drugs (Ozempic, Wegovy, Mounjaro, Zepbound)",
    publisher: "Kaiser Family Foundation",
    url: "https://www.kff.org/medicare/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },

  // ── Pricing — Manufacturer and pharmacy ──────────────────────────────────

  {
    // 2026-04-06: The /savings-card.html deep link now 404s. Switched to the
    // canonical NovoCare Rybelsus product landing page on the same
    // publisher's domain.
    id: "novocare-rybelsus-cash-price",
    label: "NovoCare — Rybelsus (oral semaglutide) savings and patient assistance",
    publisher: "Novo Nordisk (NovoCare)",
    url: "https://www.novocare.com/diabetes/products/rybelsus.html",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    // AUDIT-EXCLUDED: lillydirect.com and all *.lilly.com subdomains return
    // HTTP 403 to any non-interactive Chrome User-Agent (Akamai bot-
    // fingerprinting). Verified 2026-04-06. LillyDirect is the editorial
    // primary source for this direct-to-patient pharmacy program and cannot
    // be substituted. Verify manually quarterly in a real browser.
    id: "lilly-direct-pharmacy",
    label: "LillyDirect — Direct-to-patient pharmacy and self-pay vials program",
    publisher: "Eli Lilly and Company",
    url: "https://www.lillydirect.com/",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    // AUDIT-EXCLUDED: goodrx.com returns HTTP 403 to any non-interactive
    // Chrome User-Agent (aggressive bot-blocking to protect scraped pricing
    // data). Verified 2026-04-06. The weight-loss conditions page is the
    // editorial primary source for GoodRx's retail cash/coupon price
    // aggregator; verify manually quarterly in a real browser. For
    // independent pricing grounding we also maintain the WLR pricing index.
    id: "goodrx-glp1-prices",
    label:
      "GoodRx — GLP-1 retail pharmacy price aggregator (note: aggregates cash/coupon retail prices, not insurance-negotiated rates)",
    publisher: "GoodRx Holdings",
    url: "https://www.goodrx.com/conditions/weight-loss",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
];

// ---------------------------------------------------------------------------
// Lookup map — keyed by id for O(1) access
// ---------------------------------------------------------------------------

export const CITATIONS: Readonly<Record<string, CitationEntry>> =
  Object.fromEntries(CITATIONS_LIST.map((c) => [c.id, c]));

/**
 * Return a citation entry by id. Throws at runtime (dev) if the id is not
 * registered, so mis-spellings surface immediately.
 */
export function getCitation(id: string): CitationEntry {
  const entry = CITATIONS[id];
  if (!entry) {
    throw new Error(
      `[citations] Unknown citation id: "${id}". Register it in src/lib/citations.ts first.`
    );
  }
  return entry;
}

/**
 * Return all citations for a given category, sorted alphabetically by label.
 */
export function getCitationsByCategory(
  category: CitationCategory
): CitationEntry[] {
  return CITATIONS_LIST.filter((c) => c.category === category).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
}

/**
 * Return all citations, sorted by category then label. Used for the /sources
 * public index page.
 */
export function getAllCitations(): CitationEntry[] {
  const categoryOrder: CitationCategory[] = [
    "clinical-trial",
    "regulatory",
    "statistics",
    "pricing",
    "guideline",
  ];
  return [...CITATIONS_LIST].sort((a, b) => {
    const catDiff =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    return a.label.localeCompare(b.label);
  });
}

// ---------------------------------------------------------------------------
// Named price constants — sourced from the registry above
// ---------------------------------------------------------------------------

/** Wegovy (semaglutide 2.4 mg) published list price per month. Source: novocare-wegovy-cash-price */
export const WEGOVY_MONTHLY_USD = 1349;

/** Zepbound (tirzepatide) published list price per month. Source: lilly-zepbound-cash-price */
export const ZEPBOUND_MONTHLY_USD = 1086;

/** Ozempic (semaglutide 0.5–2 mg) published list price per month. Source: novocare-ozempic-cash-price */
export const OZEMPIC_MONTHLY_USD = 968;

/** Mounjaro (tirzepatide) published list price per month. Source: lilly-mounjaro-cash-price */
export const MOUNJARO_MONTHLY_USD = 1023;
