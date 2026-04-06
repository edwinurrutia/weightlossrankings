import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// All 50 US state codes
const ALL_50_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const providers = [
  // ─── 1. CoreAge Rx (Featured #1) ────────────────────────────────────────────
  {
    _type: "provider",
    name: "CoreAge Rx",
    slug: { _type: "slug", current: "coreage-rx" },
    description:
      "CoreAge Rx offers LegitScript-verified compounded semaglutide and tirzepatide with free 2-day shipping to all 50 states. Backed by licensed physicians and 24/7 support, it delivers the most competitive pricing in the compounded GLP-1 space.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "ca1", dose: "0.25mg", form: "compounded", monthly_cost: 149 },
      { _key: "ca2", dose: "0.5mg",  form: "compounded", monthly_cost: 199 },
      { _key: "ca3", dose: "1mg",    form: "compounded", monthly_cost: 249 },
      { _key: "ca4", dose: "1.7mg",  form: "compounded", monthly_cost: 299 },
      { _key: "ca5", dose: "2.5mg",  form: "compounded", monthly_cost: 349 },
    ],
    scores: {
      value: 9.5,
      effectiveness: 8.5,
      ux: 9.0,
      trust: 9.0,
      accessibility: 9.0,
      support: 8.5,
    },
    features: [
      "Compounded",
      "Free 2-Day Shipping",
      "24/7 Support",
      "LegitScript Verified",
      "Semaglutide",
      "Tirzepatide",
    ],
    states_available: ALL_50_STATES,
    affiliate_url: "https://www.coreagerx.com",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "LegitScript certified — rigorous pharmacy standards",
      "Free 2-day shipping nationwide",
      "Both semaglutide and tirzepatide available",
      "Lowest per-month pricing in the compounded segment",
      "24/7 support team",
      "All 50 states covered",
    ],
    cons: [
      "Compounded only — no brand-name Ozempic or Wegovy",
      "Newer brand with fewer independent reviews than legacy players",
    ],
    best_for: "best overall value",
    is_featured: true,
    external_reviews: {
      trustpilot_score: 4.7,
      trustpilot_count: 850,
    },
  },

  // ─── 2. Hims (Featured) ─────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Hims",
    slug: { _type: "slug", current: "hims" },
    description:
      "Hims is a well-known telehealth platform offering compounded semaglutide to all 50 states. Its slick app, FSA/HSA acceptance, and frequent promotional pricing make it the go-to choice for budget-conscious buyers.",
    category: "GLP-1 Provider",
    pricing: [
      {
        _key: "h1",
        dose: "0.25mg",
        form: "compounded",
        monthly_cost: 199,
        promo_code: "SAVE50",
        promo_price: 149,
      },
      { _key: "h2", dose: "0.5mg", form: "compounded", monthly_cost: 299 },
      { _key: "h3", dose: "1mg",   form: "compounded", monthly_cost: 399 },
    ],
    scores: {
      value: 8.5,
      effectiveness: 8.0,
      ux: 9.0,
      trust: 8.5,
      accessibility: 9.0,
      support: 7.5,
    },
    features: [
      "Compounded",
      "FSA/HSA",
      "Text Only",
      "All 50 States",
    ],
    states_available: ALL_50_STATES,
    affiliate_url: "https://www.forhims.com/weight-loss",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Accepts FSA/HSA payments",
      "Frequent promo codes for first-month discounts",
      "Polished mobile app experience",
      "All 50 states covered",
      "Large, established brand with strong trust signals",
    ],
    cons: [
      "Text-only async consultation — no video visit",
      "Price increases sharply after promo period",
      "Support response times can lag",
    ],
    best_for: "budget-conscious buyers",
    is_featured: true,
    external_reviews: {
      trustpilot_score: 4.5,
      trustpilot_count: 12500,
    },
  },

  // ─── 3. Ro ──────────────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Ro",
    slug: { _type: "slug", current: "ro" },
    description:
      "Ro Body pairs licensed physicians with both brand-name and compounded GLP-1 options. Available in 20 states, Ro's holistic care model — combining medication, nutrition, and coaching — sets the bar for comprehensive telehealth weight management.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "ro1", dose: "0.25mg", form: "compounded", monthly_cost: 199 },
      { _key: "ro2", dose: "0.5mg",  form: "compounded", monthly_cost: 249 },
      { _key: "ro3", dose: "0.25mg", form: "brand",      monthly_cost: 1350 },
    ],
    scores: {
      value: 8.0,
      effectiveness: 8.5,
      ux: 8.5,
      trust: 9.0,
      accessibility: 8.5,
      support: 8.0,
    },
    features: [
      "Compounded",
      "Brand Available",
      "Nutrition Coaching",
      "Licensed Physicians",
    ],
    states_available: [
      "CA","CO","CT","FL","GA","IL","MA","MD","MI","MN",
      "NC","NJ","NY","OH","PA","TX","VA","WA","WI","AZ",
    ],
    affiliate_url: "https://www.ro.co/weight-loss",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Both brand-name and compounded options",
      "Integrated nutrition and coaching support",
      "High physician trust scores",
      "Dedicated care team per patient",
      "Strong clinical reputation",
    ],
    cons: [
      "Only available in 20 states",
      "Brand-name GLP-1s are expensive without insurance",
      "Waitlist can slow onboarding",
    ],
    best_for: "comprehensive medical care",
    is_featured: true,
    external_reviews: {
      trustpilot_score: 4.3,
      trustpilot_count: 8900,
    },
  },

  // ─── 4. Found ───────────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Found",
    slug: { _type: "slug", current: "found" },
    description:
      "Found combines prescription weight-loss medication with 1-on-1 coaching and registered dietitian access, starting at just $129/month — the lowest entry price among full-service GLP-1 providers. Available in 25 states.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "fo1", dose: "Starting dose", form: "compounded", monthly_cost: 129 },
    ],
    scores: {
      value: 9.0,
      effectiveness: 8.0,
      ux: 8.0,
      trust: 8.0,
      accessibility: 7.5,
      support: 9.0,
    },
    features: [
      "Coaching Included",
      "Dietitian Access",
      "Compounded",
      "Lowest Entry Price",
    ],
    states_available: [
      "CA","CO","CT","FL","GA","IL","MA","MD","MI","MN",
      "NC","NJ","NY","OH","PA","TX","VA","WA","AZ","NV",
      "OR","UT","WI","TN","MO",
    ],
    affiliate_url: "https://www.joinfound.com",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Cheapest full-service option at $129/mo",
      "Registered dietitian included in every plan",
      "1-on-1 health coaching",
      "Addresses root causes beyond medication",
      "Strong behavioral change curriculum",
    ],
    cons: [
      "Only 25 states",
      "Coaching model requires patient engagement",
      "Less brand recognition than Hims or Ro",
    ],
    best_for: "coaching + medication combo",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 4.1,
      trustpilot_count: 3200,
    },
  },

  // ─── 5. Henry Meds ──────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Henry Meds",
    slug: { _type: "slug", current: "henry-meds" },
    description:
      "Henry Meds is a no-frills telehealth platform focused on fast, affordable access to compounded GLP-1 medications. With quick onboarding and service in 30 states, it suits patients who want medication without the extras.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "hm1", dose: "0.25mg", form: "compounded", monthly_cost: 197 },
      { _key: "hm2", dose: "0.5mg",  form: "compounded", monthly_cost: 247 },
      { _key: "hm3", dose: "1mg",    form: "compounded", monthly_cost: 297 },
    ],
    scores: {
      value: 8.5,
      effectiveness: 7.5,
      ux: 7.5,
      trust: 7.5,
      accessibility: 8.0,
      support: 7.0,
    },
    features: [
      "Compounded",
      "Fast Onboarding",
      "No Coaching Upsells",
      "Subscription Model",
    ],
    states_available: [
      "AL","AZ","CA","CO","CT","FL","GA","IL","IN","KY",
      "LA","MA","MD","MI","MN","MO","NC","NJ","NV","NY",
      "OH","OK","OR","PA","TN","TX","UT","VA","WA","WI",
    ],
    affiliate_url: "https://www.henrymeds.com",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Fast enrollment — often same-day approval",
      "Straightforward subscription pricing",
      "No pressure to add coaching or extras",
      "Competitive price point",
    ],
    cons: [
      "Limited to 30 states",
      "Minimal coaching or lifestyle support",
      "Lower trust scores vs. established brands",
    ],
    best_for: "fast, no-frills access",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 4.0,
      trustpilot_count: 1800,
    },
  },

  // ─── 6. Sesame ──────────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Sesame",
    slug: { _type: "slug", current: "sesame" },
    description:
      "Sesame is a unique marketplace offering both video telehealth and in-person physician visits for GLP-1 prescriptions. Available in 10 states, it's the best option for patients who want face-to-face flexibility alongside telehealth convenience.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "se1", dose: "Consultation", form: "compounded", monthly_cost: 49 },
      { _key: "se2", dose: "0.25mg",       form: "compounded", monthly_cost: 249 },
    ],
    scores: {
      value: 8.0,
      effectiveness: 7.5,
      ux: 8.5,
      trust: 8.5,
      accessibility: 7.0,
      support: 7.0,
    },
    features: [
      "In-Person Option",
      "Video Telehealth",
      "Marketplace Model",
      "Compounded",
    ],
    states_available: [
      "CA","FL","IL","NY","PA","TX","GA","AZ","NC","WA",
    ],
    affiliate_url: "https://sesamecare.com/weight-loss",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Unique in-person + video hybrid model",
      "Transparent marketplace pricing",
      "No subscription lock-in",
      "Strong physician trust ratings",
    ],
    cons: [
      "Only 10 states — most limited availability",
      "Pharmacy coordination can add friction",
      "Lower support score vs. full-service providers",
    ],
    best_for: "in-person + telehealth flexibility",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 4.6,
      trustpilot_count: 5400,
    },
  },

  // ─── 7. Calibrate ───────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Calibrate",
    slug: { _type: "slug", current: "calibrate" },
    description:
      "Calibrate is a premium metabolic health program pairing brand-name GLP-1 medications with year-long physician oversight, health coaching, and behavior change curriculum. At $349/month, it targets patients who want the gold-standard clinical experience.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "cb1", dose: "Brand GLP-1", form: "brand", monthly_cost: 349 },
    ],
    scores: {
      value: 6.0,
      effectiveness: 9.0,
      ux: 8.5,
      trust: 9.5,
      accessibility: 6.5,
      support: 9.5,
    },
    features: [
      "Brand Name Only",
      "Year-Long Program",
      "Health Coaching",
      "Physician Oversight",
    ],
    states_available: [
      "CA","CO","CT","FL","GA","IL","MA","MD","MI","MN",
      "NC","NJ","NY","OH","PA","TX","VA","WA","AZ","WI",
      "OR",
    ],
    affiliate_url: "https://www.joincalibrate.com",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Highest effectiveness and support scores",
      "Brand-name GLP-1 (Ozempic/Wegovy)",
      "Full year of physician and coach access",
      "Insurance navigation assistance",
      "Comprehensive behavior change program",
    ],
    cons: [
      "Most expensive option at $349/mo",
      "Only 15 states",
      "Brand-only — no compounded fallback",
    ],
    best_for: "premium full-service experience",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 4.4,
      trustpilot_count: 2100,
    },
  },

  // ─── 8. PlushCare ───────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "PlushCare",
    slug: { _type: "slug", current: "plushcare" },
    description:
      "PlushCare is a telehealth platform that accepts most major insurance plans, making it the best path for patients who want to use insurance coverage for their GLP-1 prescription. Board-certified doctors available same-day.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "pc1", dose: "Consultation", form: "brand", monthly_cost: 19 },
      { _key: "pc2", dose: "GLP-1 Rx",    form: "brand", monthly_cost: 299 },
    ],
    scores: {
      value: 7.5,
      effectiveness: 8.0,
      ux: 8.0,
      trust: 9.0,
      accessibility: 8.0,
      support: 8.0,
    },
    features: [
      "Insurance Accepted",
      "Same-Day Appointments",
      "Board-Certified Doctors",
      "Brand Available",
    ],
    states_available: [
      "AL","AZ","CA","CO","CT","FL","GA","IL","IN","KY",
      "LA","MA","MD","MI","MN","MO","NC","NJ","NV","NY",
      "OH","OK","OR","PA","TN","TX","UT","VA","WA","WI",
      "DE","NH","NM","RI","SC","ID","MT","WY","ND","SD",
    ],
    affiliate_url: "https://plushcare.com/weight-management",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Accepts most major insurance plans",
      "Same-day doctor availability",
      "High physician trust rating",
      "Wide state availability",
      "Can navigate prior authorization",
    ],
    cons: [
      "Insurance billing adds complexity",
      "Out-of-pocket cost high without insurance",
      "Value score lower due to brand-only pricing",
    ],
    best_for: "using insurance coverage",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 4.2,
      trustpilot_count: 6700,
    },
  },

  // ─── 9. Mochi Health ────────────────────────────────────────────────────────
  {
    _type: "provider",
    name: "Mochi Health",
    slug: { _type: "slug", current: "mochi-health" },
    description:
      "Mochi Health connects patients with board-certified obesity medicine specialists — not just general practitioners — for GLP-1 prescriptions and ongoing management. Ideal for patients with complex metabolic health needs.",
    category: "GLP-1 Provider",
    pricing: [
      { _key: "mo1", dose: "0.25mg", form: "compounded", monthly_cost: 159 },
      { _key: "mo2", dose: "0.5mg",  form: "compounded", monthly_cost: 199 },
      { _key: "mo3", dose: "1mg",    form: "compounded", monthly_cost: 249 },
    ],
    scores: {
      value: 7.5,
      effectiveness: 8.5,
      ux: 8.0,
      trust: 8.5,
      accessibility: 7.0,
      support: 8.5,
    },
    features: [
      "Obesity Medicine Specialists",
      "Compounded",
      "Lab Work Integration",
      "Personalized Dosing",
    ],
    states_available: [
      "CA","CO","CT","FL","GA","IL","MA","MD","MI","MN",
      "NC","NJ","NY","OH","PA","TX","VA","WA","AZ","NV",
      "OR","UT","WI","TN","MO","IN","KY","LA","SC","DE",
    ],
    affiliate_url: "https://www.mochihealth.com",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Obesity medicine specialists — not just GPs",
      "Highly personalized dosing protocols",
      "Strong effectiveness and support scores",
      "Lab work integration for safety monitoring",
      "Clinically rigorous approach",
    ],
    cons: [
      "More limited state availability",
      "Higher price than no-frills options",
      "Waitlist for popular specialists",
    ],
    best_for: "specialist-led care",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 4.5,
      trustpilot_count: 980,
    },
  },

  // ─── 10. Noom (Weight Loss Program) ─────────────────────────────────────────
  {
    _type: "provider",
    name: "Noom",
    slug: { _type: "slug", current: "noom" },
    description:
      "Noom is a psychology-based weight loss app using cognitive behavioral techniques to drive lasting behavior change — no medication required. At $17/month on an annual plan, it's the most accessible structured weight-loss program available.",
    category: "Weight Loss Program",
    pricing: [
      { _key: "no1", dose: "Monthly Plan",  form: "compounded", monthly_cost: 70 },
      { _key: "no2", dose: "Annual Plan",   form: "compounded", monthly_cost: 17 },
    ],
    scores: {
      value: 7.5,
      effectiveness: 7.0,
      ux: 8.5,
      trust: 8.0,
      accessibility: 9.5,
      support: 7.5,
    },
    features: [
      "No Medication",
      "CBT-Based Curriculum",
      "Food Logging",
      "1-on-1 Coaching",
      "All 50 States",
    ],
    states_available: ALL_50_STATES,
    affiliate_url: "https://www.noom.com/weight",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Most accessible price — $17/mo annual",
      "All 50 states, no prescription needed",
      "Psychology-backed behavior change approach",
      "Strong UX and app experience",
      "Large community and research base",
    ],
    cons: [
      "No medication — results depend on adherence",
      "Lower effectiveness vs. GLP-1 providers",
      "Mixed reviews on long-term retention",
    ],
    best_for: "behavior change without medication",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 3.8,
      trustpilot_count: 45000,
    },
  },

  // ─── 11. WeightWatchers (Weight Loss Program) ────────────────────────────────
  {
    _type: "provider",
    name: "WeightWatchers",
    slug: { _type: "slug", current: "weightwatchers" },
    description:
      "WeightWatchers combines its proven Points system with community workshops and, increasingly, GLP-1 clinical support. From $23/month digital to $99/month GLP-1 clinic, it offers the broadest tier range of any program on this list.",
    category: "Weight Loss Program",
    pricing: [
      { _key: "ww1", dose: "Digital",      form: "compounded", monthly_cost: 23 },
      { _key: "ww2", dose: "Workshops",    form: "compounded", monthly_cost: 43 },
      { _key: "ww3", dose: "GLP-1 Clinic", form: "compounded", monthly_cost: 99 },
    ],
    scores: {
      value: 8.0,
      effectiveness: 7.5,
      ux: 7.5,
      trust: 9.0,
      accessibility: 9.5,
      support: 8.5,
    },
    features: [
      "Points System",
      "Community Workshops",
      "GLP-1 Clinic Tier",
      "All 50 States",
      "70+ Year Track Record",
    ],
    states_available: ALL_50_STATES,
    affiliate_url: "https://www.weightwatchers.com/us",
    affiliate_network: "direct",
    fda_warnings: [],
    pros: [
      "Most trusted brand — 70+ year history",
      "In-person community workshops available",
      "Multiple price tiers for every budget",
      "GLP-1 clinic option for medication seekers",
      "All 50 states",
      "Highest accessibility score",
    ],
    cons: [
      "Lower effectiveness without medication tier",
      "App UX feels dated vs. newer competitors",
      "Mixed Trustpilot reviews (3.5/5)",
    ],
    best_for: "community support + proven system",
    is_featured: false,
    external_reviews: {
      trustpilot_score: 3.5,
      trustpilot_count: 18000,
    },
  },
];

async function seed() {
  console.log(`Seeding ${providers.length} providers to Sanity...`);
  console.log(
    `Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} / Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  );

  for (const provider of providers) {
    try {
      const result = await client.create(provider);
      console.log(`✓ Created: ${provider.name} (${result._id})`);
    } catch (err) {
      console.error(`✗ Failed: ${provider.name}`, err);
    }
  }

  console.log("Done.");
}

seed();
