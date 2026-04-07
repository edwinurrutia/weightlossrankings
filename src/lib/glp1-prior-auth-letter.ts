// ---------------------------------------------------------------------------
// Pure data, types, and letter-generation logic for the GLP-1 Prior
// Authorization Letter Generator.
//
// Lives in /lib (no "use client") so the server-rendered page.tsx can
// import DRUGS / INSURERS / buildSampleLetter() to render the static
// SEO fallback letter, while the "use client" Generator.tsx imports the
// same data + functions for the interactive form. Without this split
// Next 14 errors during static generation when the server tries to
// serialize a function reference exported from a client module.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DrugId =
  | "wegovy-2_4"
  | "zepbound-5"
  | "zepbound-10"
  | "zepbound-15"
  | "saxenda-3"
  | "foundayo-17_2";

export type InsurerId =
  | "aetna"
  | "anthem"
  | "bcbs"
  | "cigna"
  | "uhc"
  | "humana"
  | "kaiser"
  | "tricare"
  | "medicare"
  | "other";

export type ComorbidityId =
  | "t2d"
  | "htn"
  | "hld"
  | "osa"
  | "cvd"
  | "nafld"
  | "pcos"
  | "oa"
  | "other";

export type PriorAttemptId =
  | "diet"
  | "exercise"
  | "phentermine"
  | "contrave"
  | "saxenda"
  | "bariatric"
  | "other";

export interface DrugSpec {
  id: DrugId;
  label: string;
  brand: string;
  generic: string;
  dose: string;
  trial: string;
  trialFull: string;
  fdaUrl: string;
  ndcQty: string;
}

export interface InsurerSpec {
  id: InsurerId;
  label: string;
  /** Department line shown in the letter header. */
  department: string;
  /** Optional 1-2 sentence insurer-specific paragraph injected into the body. */
  insurerNote: string;
}

export interface ComorbiditySpec {
  id: ComorbidityId;
  label: string;
  /** Clinical phrasing used inside the letter body. */
  clinical: string;
}

export interface PriorAttemptSpec {
  id: PriorAttemptId;
  label: string;
  clinical: string;
}

export interface FormState {
  patientName: string;
  patientDob: string;
  insurerId: InsurerId;
  drugId: DrugId;
  bmi: string;
  weightLbs: string;
  heightFt: string;
  heightIn: string;
  comorbidities: ComorbidityId[];
  priorAttempts: PriorAttemptId[];
  clinician: string;
}

// ---------------------------------------------------------------------------
// Reference data
// ---------------------------------------------------------------------------

export const DRUGS: DrugSpec[] = [
  {
    id: "wegovy-2_4",
    label: "Wegovy 2.4 mg (semaglutide)",
    brand: "Wegovy",
    generic: "semaglutide",
    dose: "2.4 mg subcutaneous once weekly",
    trial: "STEP-1",
    trialFull:
      "STEP-1 (Wilding et al., NEJM 2021) demonstrated mean total body weight loss of 14.9% over 68 weeks at the 2.4 mg maintenance dose.",
    fdaUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s026lbl.pdf",
    ndcQty: "four (4) single-dose 2.4 mg pens per 28 days",
  },
  {
    id: "zepbound-5",
    label: "Zepbound 5 mg (tirzepatide)",
    brand: "Zepbound",
    generic: "tirzepatide",
    dose: "5 mg subcutaneous once weekly",
    trial: "SURMOUNT-1",
    trialFull:
      "SURMOUNT-1 (Jastreboff et al., NEJM 2022) demonstrated mean total body weight loss of 15.0% at the 5 mg maintenance dose over 72 weeks.",
    fdaUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
    ndcQty: "four (4) single-dose 5 mg vials or pens per 28 days",
  },
  {
    id: "zepbound-10",
    label: "Zepbound 10 mg (tirzepatide)",
    brand: "Zepbound",
    generic: "tirzepatide",
    dose: "10 mg subcutaneous once weekly",
    trial: "SURMOUNT-1",
    trialFull:
      "SURMOUNT-1 (Jastreboff et al., NEJM 2022) demonstrated mean total body weight loss of 19.5% at the 10 mg maintenance dose over 72 weeks.",
    fdaUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
    ndcQty: "four (4) single-dose 10 mg vials or pens per 28 days",
  },
  {
    id: "zepbound-15",
    label: "Zepbound 15 mg (tirzepatide)",
    brand: "Zepbound",
    generic: "tirzepatide",
    dose: "15 mg subcutaneous once weekly",
    trial: "SURMOUNT-1",
    trialFull:
      "SURMOUNT-1 (Jastreboff et al., NEJM 2022) demonstrated mean total body weight loss of 20.9% at the 15 mg maintenance dose over 72 weeks.",
    fdaUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
    ndcQty: "four (4) single-dose 15 mg vials or pens per 28 days",
  },
  {
    id: "saxenda-3",
    label: "Saxenda 3 mg (liraglutide)",
    brand: "Saxenda",
    generic: "liraglutide",
    dose: "3 mg subcutaneous once daily",
    trial: "SCALE",
    trialFull:
      "The SCALE Obesity and Prediabetes trial demonstrated mean total body weight loss of approximately 8.0% at the 3 mg maintenance dose over 56 weeks.",
    fdaUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/206321s019lbl.pdf",
    ndcQty: "five (5) prefilled 3 mL multi-dose pens per 30 days",
  },
  {
    id: "foundayo-17_2",
    label: "Foundayo 17.2 mg (orforglipron)",
    brand: "Foundayo",
    generic: "orforglipron",
    dose: "17.2 mg oral once daily",
    trial: "ATTAIN-1",
    trialFull:
      "ATTAIN-1, the pivotal trial supporting the Foundayo FDA approval, demonstrated mean total body weight loss of approximately 11.1% at the 17.2 mg maintenance dose.",
    fdaUrl:
      "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ac446c5-feba-474f-a103-23facb9b5c62",
    ndcQty: "thirty (30) 17.2 mg tablets per 30 days",
  },
];

export const INSURERS: InsurerSpec[] = [
  {
    id: "aetna",
    label: "Aetna",
    department: "Aetna Pharmacy Prior Authorization Department",
    insurerNote:
      "Per Aetna's published Clinical Policy Bulletin for anti-obesity medications, the patient meets the BMI threshold and has documented prior weight management attempts as required for step-therapy compliance.",
  },
  {
    id: "anthem",
    label: "Anthem / Elevance",
    department: "Anthem Pharmacy Prior Authorization Department",
    insurerNote:
      "Per Anthem's commercial weight-loss medication policy, the patient satisfies the BMI eligibility criteria and has documented a prior trial of behavioral weight management as required for step-therapy compliance.",
  },
  {
    id: "bcbs",
    label: "Blue Cross Blue Shield",
    department: "Blue Cross Blue Shield Pharmacy Prior Authorization",
    insurerNote:
      "Per the local BCBS plan's anti-obesity medication coverage policy, the patient meets BMI eligibility and has documented prior lifestyle and pharmacologic weight management trials as required for step-therapy compliance.",
  },
  {
    id: "cigna",
    label: "Cigna",
    department: "Cigna Pharmacy Prior Authorization (Express Scripts)",
    insurerNote:
      "Per Cigna's coverage policy for GLP-1 receptor agonists prescribed for chronic weight management, the patient meets the BMI threshold and has documented prior weight loss attempts.",
  },
  {
    id: "uhc",
    label: "UnitedHealthcare",
    department: "UnitedHealthcare / OptumRx Prior Authorization",
    insurerNote:
      "Per UnitedHealthcare's OptumRx coverage criteria for GLP-1 anti-obesity medications, the patient satisfies the BMI requirement and has a documented history of supervised weight management attempts.",
  },
  {
    id: "humana",
    label: "Humana",
    department: "Humana Pharmacy Prior Authorization",
    insurerNote:
      "Per Humana's commercial pharmacy coverage policy for anti-obesity medications, the patient meets the BMI threshold and has documented prior weight loss interventions.",
  },
  {
    id: "kaiser",
    label: "Kaiser Permanente",
    department: "Kaiser Permanente Pharmacy Services",
    insurerNote:
      "Per Kaiser Permanente's regional formulary policy for anti-obesity GLP-1 receptor agonists, the patient meets the BMI threshold and has documented prior structured weight management.",
  },
  {
    id: "tricare",
    label: "Tricare",
    department: "Tricare / Express Scripts Prior Authorization",
    insurerNote:
      "Per the Tricare Uniform Formulary criteria for anti-obesity GLP-1 agents, the patient meets BMI eligibility and has documented prior weight management trials.",
  },
  {
    id: "medicare",
    label: "Medicare",
    department: "Medicare Part D Plan Sponsor",
    insurerNote:
      "Note: Medicare Part D currently does not cover anti-obesity medications under federal statute. This letter cannot be used for a Medicare weight-loss indication submission.",
  },
  {
    id: "other",
    label: "Other / Not listed",
    department: "Pharmacy Benefits Prior Authorization Department",
    insurerNote:
      "Per the plan's published anti-obesity medication coverage criteria, the patient meets the BMI threshold and has documented prior weight management attempts.",
  },
];

export const COMORBIDITIES: ComorbiditySpec[] = [
  {
    id: "t2d",
    label: "Type 2 diabetes",
    clinical: "Type 2 diabetes mellitus (ICD-10 E11.9)",
  },
  {
    id: "htn",
    label: "Hypertension",
    clinical: "Essential hypertension (ICD-10 I10)",
  },
  {
    id: "hld",
    label: "Hyperlipidemia / dyslipidemia",
    clinical: "Mixed hyperlipidemia (ICD-10 E78.2)",
  },
  {
    id: "osa",
    label: "Obstructive sleep apnea",
    clinical: "Obstructive sleep apnea (ICD-10 G47.33)",
  },
  {
    id: "cvd",
    label: "Cardiovascular disease",
    clinical: "Established atherosclerotic cardiovascular disease (ICD-10 I25.10)",
  },
  {
    id: "nafld",
    label: "NAFLD / MASH",
    clinical:
      "Metabolic dysfunction-associated steatotic liver disease (ICD-10 K76.0)",
  },
  {
    id: "pcos",
    label: "PCOS",
    clinical: "Polycystic ovarian syndrome (ICD-10 E28.2)",
  },
  {
    id: "oa",
    label: "Weight-bearing osteoarthritis",
    clinical: "Weight-bearing joint osteoarthritis (ICD-10 M17.9)",
  },
  {
    id: "other",
    label: "Other weight-related comorbidity",
    clinical: "Additional weight-related comorbid condition",
  },
];

export const PRIOR_ATTEMPTS: PriorAttemptSpec[] = [
  {
    id: "diet",
    label: "Structured diet program",
    clinical:
      "supervised reduced-calorie dietary intervention of at least 6 months duration",
  },
  {
    id: "exercise",
    label: "Structured exercise program",
    clinical:
      "structured physical activity program of at least 150 minutes per week sustained for 6 months",
  },
  {
    id: "phentermine",
    label: "Phentermine trial",
    clinical:
      "prior trial of phentermine, discontinued for inadequate response or intolerance",
  },
  {
    id: "contrave",
    label: "Contrave (naltrexone/bupropion) trial",
    clinical:
      "prior trial of naltrexone/bupropion (Contrave), discontinued for inadequate response or intolerance",
  },
  {
    id: "saxenda",
    label: "Saxenda (liraglutide) trial",
    clinical:
      "prior trial of liraglutide 3 mg (Saxenda), discontinued for inadequate response or intolerance",
  },
  {
    id: "bariatric",
    label: "Bariatric surgery consultation",
    clinical:
      "documented bariatric surgery evaluation and consultation",
  },
  {
    id: "other",
    label: "Other documented attempt",
    clinical: "additional documented weight management intervention",
  },
];

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

export function computeBmi(
  weightLbs: number,
  heightFt: number,
  heightIn: number,
): number | null {
  const totalIn = heightFt * 12 + heightIn;
  if (!Number.isFinite(weightLbs) || weightLbs <= 0) return null;
  if (!Number.isFinite(totalIn) || totalIn <= 0) return null;
  return (weightLbs / (totalIn * totalIn)) * 703;
}

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function todayUS(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Letter generation
// ---------------------------------------------------------------------------

export interface LetterInputs {
  patientName: string;
  patientDob: string;
  insurer: InsurerSpec;
  drug: DrugSpec;
  bmi: number | null;
  weightLbs: number | null;
  heightFt: number | null;
  heightIn: number | null;
  comorbidities: ComorbiditySpec[];
  priorAttempts: PriorAttemptSpec[];
  clinician: string;
}

export function generateLetter(input: LetterInputs): string {
  const {
    patientName,
    patientDob,
    insurer,
    drug,
    bmi,
    weightLbs,
    heightFt,
    heightIn,
    comorbidities,
    priorAttempts,
    clinician,
  } = input;

  if (insurer.id === "medicare") {
    return [
      "MEDICARE NOTICE",
      "",
      "Medicare Part D does not cover GLP-1s for the weight management indication per SSA §1860D-2(e)(2)(A). However, per CMS HPMS guidance issued March 20, 2024, Part D plans may cover Wegovy when prescribed for the FDA-approved cardiovascular risk reduction indication in adults with established cardiovascular disease and obesity or overweight (no type 2 diabetes required).",
      "",
      "If your patient has documented established CVD, this letter template is not the right form — submit a Wegovy CV indication PA citing the SELECT trial (Lincoff NEJM 2023, PMID 37952131). For all other weight-loss indications and for Zepbound/Foundayo/Saxenda, Medicare Part D coverage is not currently available.",
      "",
      "If the patient has Type 2 diabetes, separate FDA-approved diabetes formulations (Ozempic, Mounjaro, Rybelsus) may be covered when prescribed for diabetes management — but those are different brand names and require a diabetes diagnosis.",
      "",
      "Read more about Medicare GLP-1 coverage here: https://weightlossrankings.org/research/glp1-insurance-coverage-medicare-medicaid-commercial",
      "",
      "DRAFT — Review with prescribing clinician before submission. Not legal or medical advice.",
    ].join("\n");
  }

  const patient = patientName.trim() || "[Patient Name]";
  const dob = patientDob.trim() || "[DOB]";
  const clin = clinician.trim() || "[Prescribing Clinician Name, Credentials]";
  const bmiStr = bmi != null ? bmi.toFixed(1) : "[BMI]";
  const weightStr = weightLbs != null ? `${weightLbs.toFixed(0)} lbs` : "[weight]";
  const heightStr =
    heightFt != null && heightIn != null
      ? `${heightFt} ft ${heightIn} in`
      : "[height]";

  const hasComorb = comorbidities.length > 0;
  const bmiQualifies =
    bmi != null && (bmi >= 30 || (bmi >= 27 && hasComorb));

  const indication = `${drug.brand} (${drug.generic}) is FDA-approved as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with obesity (initial BMI ≥ 30 kg/m²) or overweight (BMI ≥ 27 kg/m²) in the presence of at least one weight-related comorbid condition.`;

  let eligibilitySentence: string;
  if (bmi != null && bmi >= 30) {
    eligibilitySentence = `The patient's documented BMI of ${bmiStr} kg/m² meets the FDA-label criterion of BMI ≥ 30 kg/m² (obesity).`;
  } else if (bmi != null && bmi >= 27 && hasComorb) {
    eligibilitySentence = `The patient's documented BMI of ${bmiStr} kg/m² meets the FDA-label criterion of BMI ≥ 27 kg/m² in the presence of a weight-related comorbidity.`;
  } else if (bmi != null) {
    eligibilitySentence = `The patient's documented BMI is ${bmiStr} kg/m². Note: the FDA label requires BMI ≥ 30 kg/m², or BMI ≥ 27 kg/m² with at least one weight-related comorbidity. Please review eligibility carefully before submission.`;
  } else {
    eligibilitySentence = `The patient's BMI should be calculated from current height and weight and documented here as required by the FDA label (≥ 30 kg/m², or ≥ 27 kg/m² with comorbidity).`;
  }

  const comorbSentence = hasComorb
    ? `The patient additionally carries the following documented weight-related comorbid condition(s): ${formatList(
        comorbidities.map((c) => c.clinical),
      )}.`
    : `No additional weight-related comorbidities are documented at this time; eligibility rests on the BMI ≥ 30 kg/m² criterion alone.`;

  const attemptsSentence =
    priorAttempts.length > 0
      ? `Prior to this request, the patient has documented the following weight management attempts, none of which produced clinically meaningful or sustained weight loss: ${formatList(
          priorAttempts.map((p) => p.clinical),
        )}. These attempts satisfy the step-therapy documentation requirement.`
      : `Documentation of prior weight management attempts (lifestyle intervention, prior anti-obesity pharmacotherapy where applicable) should be attached to satisfy the plan's step-therapy requirement.`;

  const eligibilityFlag = bmiQualifies
    ? "The patient meets the FDA-approved indication and the plan's documented coverage criteria."
    : "Please confirm patient eligibility against the plan's coverage criteria before submission.";

  return [
    todayUS(),
    "",
    insurer.department,
    "Re: Prior Authorization Request",
    "",
    `Patient: ${patient}`,
    `Date of Birth: ${dob}`,
    `Height: ${heightStr}`,
    `Current Weight: ${weightStr}`,
    `BMI: ${bmiStr} kg/m²`,
    `Requested Medication: ${drug.brand} (${drug.generic}) ${drug.dose}`,
    `Requested Quantity: ${drug.ndcQty}`,
    "",
    "To Whom It May Concern,",
    "",
    `I am writing to request prior authorization coverage of ${drug.brand} (${drug.generic}) ${drug.dose} for the above-named patient for the FDA-approved indication of chronic weight management.`,
    "",
    `FDA-Approved Indication. ${indication}`,
    "",
    `Patient Eligibility. ${eligibilitySentence} ${comorbSentence}`,
    "",
    `Clinical Rationale. ${drug.brand} is supported by Level 1 evidence from the ${drug.trial} pivotal trial. ${drug.trialFull} The combination of the patient's BMI and documented comorbid burden places them squarely within the FDA-approved population studied in the pivotal trial, and the requested dose is the labeled maintenance dose.`,
    "",
    `Step Therapy and Prior Treatment History. ${attemptsSentence}`,
    "",
    `Plan-Specific Note. ${insurer.insurerNote}`,
    "",
    `Attestation. ${eligibilityFlag} I attest that the information above is accurate to the best of my knowledge, that I have personally evaluated this patient, that I will continue to monitor weight, vital signs, and adverse effects per standard of care, and that I will discontinue therapy if the patient does not achieve at least 5% total body weight loss after a clinically appropriate trial period at the maintenance dose, consistent with the FDA label discontinuation criterion.`,
    "",
    `Requested Action. Please approve coverage of ${drug.brand} ${drug.dose} for an initial 6-month supply, with reauthorization based on documented weight-loss response.`,
    "",
    "Thank you for your prompt review. Please contact my office with any questions or to request additional documentation.",
    "",
    "Sincerely,",
    "",
    clin,
    "Prescribing Clinician",
    "_________________________________",
    "Signature                                    Date",
    "",
    "DRAFT — Review with prescribing clinician before submission. Not legal or medical advice.",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Sample letter for SEO fallback (Wegovy + BMI 32 + T2D + Aetna)
// ---------------------------------------------------------------------------

export function buildSampleLetter(): string {
  const insurer = INSURERS.find((i) => i.id === "aetna")!;
  const drug = DRUGS.find((d) => d.id === "wegovy-2_4")!;
  return generateLetter({
    patientName: "[Patient Name]",
    patientDob: "[MM/DD/YYYY]",
    insurer,
    drug,
    bmi: 32.0,
    weightLbs: 210,
    heightFt: 5,
    heightIn: 8,
    comorbidities: [COMORBIDITIES.find((c) => c.id === "t2d")!],
    priorAttempts: [
      PRIOR_ATTEMPTS.find((p) => p.id === "diet")!,
      PRIOR_ATTEMPTS.find((p) => p.id === "exercise")!,
      PRIOR_ATTEMPTS.find((p) => p.id === "phentermine")!,
    ],
    clinician: "[Prescribing Clinician Name, MD]",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
