/**
 * GLP-1 exercise pairing configurator library — backs the
 * /tools/glp1-exercise-pairing-configurator tool.
 *
 * Generates a personalized weekly exercise template (resistance,
 * cardio, mobility, step target) for patients on or starting a
 * GLP-1 receptor agonist. Every recommendation is anchored on the
 * primary sources cited in the exercise pairing article.
 *
 * Verified PMIDs:
 *   33951361  Lundgren 2021 NEJM S-LiTE
 *   28507015  Cava 2017 Adv Nutr lean mass preservation
 *   38937282  Neeland 2024 GLP-1 lean mass mitigation
 *   26817506  Longland 2016 high-protein deficit RCT
 *   17275896  Murphy 2007 walking meta
 *   32207799  Saint-Maurice 2020 JAMA step count (8k inflection)
 *   28401638  Wewege 2017 HIIT vs MICT meta
 *   19127177  Donnelly 2009 ACSM weight loss position stand
 *   21694556  Garber 2011 ACSM RT position stand
 *   34623696  Murphy & Koehler 2022 deficit RT meta
 */

export type FitnessLevel = "beginner" | "intermediate" | "advanced";
export type AgeBucket = "under-50" | "50-64" | "65-plus";
export type Goal = "weight-loss" | "lean-mass-preservation" | "maintenance";
export type WeekOnGlp1 =
  | "starting"
  | "week-1-4"
  | "week-5-12"
  | "week-13-plus";

export interface ConfiguratorInput {
  fitnessLevel: FitnessLevel;
  ageBucket: AgeBucket;
  goal: Goal;
  weekOnGlp1: WeekOnGlp1;
  /** Whether the patient has access to weights / a gym. */
  hasGymAccess: boolean;
  /** Available training days per week (1-7). */
  availableDaysPerWeek: number;
}

export interface SessionRecommendation {
  /** Session type label */
  type: "Resistance" | "Cardio" | "HIIT" | "Mobility" | "Walking";
  /** Days per week */
  daysPerWeek: number;
  /** Minutes per session */
  minutesPerSession: number;
  /** What to do in the session */
  description: string;
  /** Citation anchor for the recommendation */
  rationale: string;
}

export interface ConfiguratorResult {
  weeklyTemplate: SessionRecommendation[];
  dailyStepTarget: number;
  weeklyCardioMinutes: number;
  resistanceDaysPerWeek: number;
  proteinTargetGramsPerKg: { low: number; high: number };
  estimatedWeeklyCalorieBurn: number;
  caveats: string[];
  rationale: string[];
}

const STEP_TARGETS: Record<AgeBucket, number> = {
  "under-50": 10000,
  "50-64": 8500,
  "65-plus": 7500,
};

/**
 * Determine baseline cardio minutes per week per ACSM 2009 (Donnelly).
 * The position stand says >250 min/wk for clinically significant
 * weight loss; modest goals are met at 150-250 min/wk.
 */
function cardioMinutesFor(goal: Goal, level: FitnessLevel): number {
  if (goal === "weight-loss") {
    return level === "beginner" ? 200 : 250;
  }
  if (goal === "lean-mass-preservation") {
    return 150;
  }
  return 150;
}

/**
 * Resistance training days per ACSM 2011 (Garber). 2-3 days/week
 * minimum. Bumped slightly higher for lean-mass-preservation goal.
 */
function resistanceDaysFor(
  goal: Goal,
  level: FitnessLevel,
  available: number,
): number {
  if (goal === "lean-mass-preservation") {
    return level === "advanced" ? Math.min(4, available) : 3;
  }
  if (goal === "weight-loss") {
    return level === "advanced" ? 3 : 2;
  }
  return 2;
}

/**
 * Protein target per Neeland 2024: GLP-1 patients should target
 * 1.6-2.3 g/kg fat-free mass. We translate to total body weight
 * conservatively at 1.2-1.6 g/kg for general lean-mass-preservation
 * and bump higher for weight-loss-on-GLP-1.
 */
function proteinTargetFor(
  goal: Goal,
  ageBucket: AgeBucket,
): { low: number; high: number } {
  if (goal === "lean-mass-preservation" || ageBucket === "65-plus") {
    return { low: 1.6, high: 2.0 };
  }
  if (goal === "weight-loss") {
    return { low: 1.4, high: 1.8 };
  }
  return { low: 1.2, high: 1.6 };
}

/**
 * Generate the weekly template.
 */
export function generateWeeklyTemplate(
  input: ConfiguratorInput,
): ConfiguratorResult {
  const cardioMinutes = cardioMinutesFor(input.goal, input.fitnessLevel);
  const rtDays = resistanceDaysFor(
    input.goal,
    input.fitnessLevel,
    input.availableDaysPerWeek,
  );
  const stepTarget = STEP_TARGETS[input.ageBucket];
  const protein = proteinTargetFor(input.goal, input.ageBucket);

  // Build sessions
  const template: SessionRecommendation[] = [];

  // Resistance training: ACSM 2011 minimum
  template.push({
    type: "Resistance",
    daysPerWeek: rtDays,
    minutesPerSession: 45,
    description: input.hasGymAccess
      ? "Compound lifts: squat, hinge (deadlift / RDL), horizontal push (DB press / push-up), horizontal pull (row / pull-up), and a carry (farmer carry / sled push). 8-12 reps per set, 2-4 sets per exercise. Progressive overload week to week."
      : "Body-weight progressions: bodyweight squat → goblet squat (with backpack or jugs), hip hinge with kettlebell or backpack, push-up variations, inverted row (under a sturdy table) or band row, plank, and a loaded carry (groceries, jugs). 8-12 reps per set, 2-3 sets.",
    rationale:
      "ACSM 2011 (Garber, PMID 21694556): minimum 2 days/week of compound multi-joint resistance training. Longland 2016 (PMID 26817506) and Mettler 2010 (PMID 19927027) show high-protein RT preserves and adds lean mass during caloric deficit.",
  });

  // HIIT (only if intermediate/advanced and goal is weight loss or LMP)
  const useHiit =
    (input.fitnessLevel === "intermediate" ||
      input.fitnessLevel === "advanced") &&
    input.goal !== "maintenance" &&
    input.weekOnGlp1 !== "starting" &&
    input.weekOnGlp1 !== "week-1-4";
  if (useHiit) {
    template.push({
      type: "HIIT",
      daysPerWeek: 1,
      minutesPerSession: 25,
      description:
        "4-8 intervals of 30-60 seconds at near-maximum effort with equal recovery periods. Stationary bike, rower, hill walking, or sprint variations. Time-efficient cardio.",
      rationale:
        "Wewege 2017 (PMID 28401638): HIIT and moderate-intensity continuous training produce equivalent body-fat loss outcomes; HIIT is roughly 40% more time-efficient.",
    });
  }

  // Walking — primary aerobic modality, accumulates toward step target
  const walkingDays = Math.min(
    input.availableDaysPerWeek,
    7,
  );
  const walkingMinutes = useHiit
    ? Math.max(20, Math.round((cardioMinutes - 25) / walkingDays))
    : Math.round(cardioMinutes / walkingDays);
  template.push({
    type: "Walking",
    daysPerWeek: walkingDays,
    minutesPerSession: walkingMinutes,
    description: `Brisk walking, hiking, or low-impact cardio at moderate intensity. Aim for ${stepTarget.toLocaleString()} total steps per day across deliberate walks plus accumulated daily movement.`,
    rationale:
      "Saint-Maurice 2020 JAMA (PMID 32207799): 8,000 steps/day produces a 51% mortality reduction vs 4,000 steps; 12,000 steps adds further protection. Murphy 2007 (PMID 17275896): walking >150 min/wk significantly improves body weight and BMI.",
  });

  // Mobility / stress (1-2 days/week): Pilates, yoga, foam rolling
  template.push({
    type: "Mobility",
    daysPerWeek: input.fitnessLevel === "beginner" ? 1 : 2,
    minutesPerSession: 30,
    description:
      "Pilates, yoga, foam rolling, or guided mobility work. Not for direct weight loss — for recovery, mobility, and stress management. Useful adjunct for lean mass preservation since it supports recovery between resistance training sessions.",
    rationale:
      "Aladro-Gonzalvo 2012 (PMID 22196436) on Pilates and Lauche 2016 (PMID 27058944) on yoga: weak weight-loss effects but real benefits for stress, flexibility, and quality of life.",
  });

  // Caveats
  const caveats: string[] = [];
  if (input.weekOnGlp1 === "starting" || input.weekOnGlp1 === "week-1-4") {
    caveats.push(
      "First 4 weeks of GLP-1: appetite suppression and nausea are at their worst. Ramp exercise gradually; do not increase intensity at the same time as a dose escalation. Rest day if you cannot eat enough to fuel a session.",
    );
  }
  if (input.fitnessLevel === "beginner") {
    caveats.push(
      "Beginner level: prioritize technique over load. Consider working with a physical therapist or certified trainer for the first 4-8 weeks to learn the compound movement patterns safely.",
    );
  }
  if (input.ageBucket === "65-plus") {
    caveats.push(
      "Age 65+: PROT-AGE 2013 protein target is 1.0-1.2 g/kg/day baseline, 1.2-1.5 g/kg/day with disease or exercise. Pair every resistance session with adequate protein. Watch for sarcopenia signs (handgrip strength, gait speed).",
    );
  }
  if (input.weekOnGlp1 === "week-13-plus" && input.goal === "weight-loss") {
    caveats.push(
      "Months 3+: lean mass loss accumulates if protein and resistance training are inadequate. Consider a DXA scan at month 6 to track body composition objectively.",
    );
  }
  caveats.push(
    "Murphy & Koehler 2022 (PMID 34623696): caloric deficits >500 kcal/day below maintenance impair lean mass gains during resistance training. GLP-1 appetite suppression can mask under-eating; track calories and protein for the first 3-6 months.",
  );

  // Estimated weekly calorie burn (rough — for motivation only, not
  // for prescription). Walking ~250 kcal/30 min, RT ~250 kcal/45 min,
  // HIIT ~300 kcal/25 min.
  const estimatedBurn =
    rtDays * 250 +
    (useHiit ? 300 : 0) +
    walkingDays * (walkingMinutes / 30) * 250;

  return {
    weeklyTemplate: template,
    dailyStepTarget: stepTarget,
    weeklyCardioMinutes: cardioMinutes,
    resistanceDaysPerWeek: rtDays,
    proteinTargetGramsPerKg: protein,
    estimatedWeeklyCalorieBurn: Math.round(estimatedBurn),
    caveats,
    rationale: [
      `S-LiTE trial (Lundgren NEJM 2021, PMID 33951361): exercise + GLP-1 produced -9.5 kg vs -6.8 kg with the drug alone — 40% bigger weight loss in the combination arm.`,
      `ACSM 2009 (PMID 19127177): >250 minutes/week of moderate-intensity activity for clinically significant weight loss.`,
      `Cava 2017 (PMID 28507015) and Neeland 2024 (PMID 38937282): resistance training plus adequate protein is the highest-leverage intervention for preserving lean mass during GLP-1 weight loss.`,
    ],
  };
}
