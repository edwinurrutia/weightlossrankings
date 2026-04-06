// =====================================================================
// Variant config — defines every supported /best/[category]/[variant] route.
// =====================================================================

export type VariantDrug = "semaglutide" | "tirzepatide";

export interface VariantConfig {
  category: string;
  variant: string;
  parentLabel: string;
  parentExists: boolean;
  drug: VariantDrug;
  doseDisplay?: string;
  formFilter?: "compounded" | "brand";
  insuranceFilter?: "without" | "hsa";
  billingFilter?: "monthly" | "quarterly";
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
}

const SEMAGLUTIDE_DOSES: { slug: string; display: string; label: string }[] = [
  { slug: "0-25mg", display: "0.25mg", label: "Starter Dose" },
  { slug: "0-5mg", display: "0.5mg", label: "Step-Up Dose" },
  { slug: "1mg", display: "1mg", label: "Therapeutic Dose" },
  { slug: "1-7mg", display: "1.7mg", label: "Higher Dose" },
  { slug: "2-4mg", display: "2.4mg", label: "Max Dose" },
];

const TIRZEPATIDE_DOSES: { slug: string; display: string; label: string }[] = [
  { slug: "2-5mg", display: "2.5mg", label: "Starter Dose" },
  { slug: "5mg", display: "5mg", label: "Step-Up Dose" },
  { slug: "7-5mg", display: "7.5mg", label: "Therapeutic Dose" },
  { slug: "10mg", display: "10mg", label: "Higher Dose" },
];

function buildSemaglutideVariants(): VariantConfig[] {
  const out: VariantConfig[] = [];

  for (const dose of SEMAGLUTIDE_DOSES) {
    out.push({
      category: "semaglutide-providers",
      variant: dose.slug,
      parentLabel: "Semaglutide Providers",
      parentExists: true,
      drug: "semaglutide",
      doseDisplay: dose.display,
      h1: `Best Semaglutide ${dose.display} Providers in 2026`,
      intro: `The ${dose.display} ${dose.label.toLowerCase()} is one of the most-searched semaglutide tiers. We compare every telehealth provider that offers compounded or brand-name semaglutide at this dose, ranked by independent score, monthly price, and patient reviews.`,
      metaTitle: `Best Semaglutide ${dose.display} Providers (${dose.label}) — 2026 Prices`,
      metaDescription: `Compare every telehealth provider offering semaglutide ${dose.display} (${dose.label.toLowerCase()}). See monthly cost, compounded vs brand, and our independent rankings.`,
      faqs: [
        {
          question: `How much does semaglutide ${dose.display} cost per month?`,
          answer: `Pricing varies by provider and form. Compounded semaglutide ${dose.display} typically ranges from $149–$399/month, while brand-name Wegovy or Ozempic at this dose can run $900–$1,400/month without insurance.`,
        },
        {
          question: `Is semaglutide ${dose.display} a starting dose or maintenance dose?`,
          answer: `${dose.label} — see the full dose escalation timeline at /dose-timeline.`,
        },
      ],
    });
  }

  out.push({
    category: "semaglutide-providers",
    variant: "compounded",
    parentLabel: "Semaglutide Providers",
    parentExists: true,
    drug: "semaglutide",
    formFilter: "compounded",
    h1: "Best Compounded Semaglutide Providers in 2026",
    intro:
      "Compounded semaglutide is the budget-friendly path to GLP-1 weight loss. We rank every legitimate telehealth pharmacy offering compounded semaglutide, with verified pricing, sourcing transparency, and independent scores.",
    metaTitle: "Best Compounded Semaglutide Providers — 2026 Prices & Reviews",
    metaDescription:
      "Compare the best compounded semaglutide telehealth providers of 2026. See pricing per dose, 503A vs 503B sourcing, and our independent rankings.",
    faqs: [
      {
        question: "Is compounded semaglutide legal?",
        answer:
          "Yes — when produced by a licensed 503A or 503B compounding pharmacy under a valid prescription. The FDA permits compounding when commercial supply is constrained or for individualized patient needs.",
      },
      {
        question: "How does compounded semaglutide compare to Ozempic or Wegovy?",
        answer:
          "Both contain the same active ingredient (semaglutide). The differences are price (compounded is 60–90% cheaper), branding, and the specific manufacturing process.",
      },
    ],
  });

  out.push({
    category: "semaglutide-providers",
    variant: "brand",
    parentLabel: "Semaglutide Providers",
    parentExists: true,
    drug: "semaglutide",
    formFilter: "brand",
    h1: "Best Brand-Name Semaglutide Providers (Ozempic & Wegovy) in 2026",
    intro:
      "If you want FDA-approved brand-name semaglutide — Ozempic for type 2 diabetes or Wegovy for chronic weight management — these are the telehealth providers that prescribe and ship it nationwide.",
    metaTitle: "Best Brand-Name Semaglutide (Ozempic & Wegovy) Providers — 2026",
    metaDescription:
      "Compare telehealth providers that prescribe brand-name Ozempic and Wegovy. See cash prices, insurance acceptance, and our independent rankings.",
    faqs: [
      {
        question: "Will insurance cover Wegovy or Ozempic?",
        answer:
          "Coverage varies. Wegovy is covered by some commercial plans for obesity; Ozempic is generally covered for type 2 diabetes. Use our /insurance-checker to verify your plan.",
      },
    ],
  });

  out.push({
    category: "semaglutide-providers",
    variant: "without-insurance",
    parentLabel: "Semaglutide Providers",
    parentExists: true,
    drug: "semaglutide",
    h1: "Best Semaglutide Providers Without Insurance in 2026",
    intro:
      "Paying cash for semaglutide doesn't have to mean $1,300/month. These telehealth providers offer transparent cash pricing — no insurance, no surprises — for both compounded and brand-name semaglutide.",
    metaTitle: "Best Semaglutide Without Insurance — Cash Prices 2026",
    metaDescription:
      "Compare cash-pay semaglutide providers that don't require insurance. Compounded options from $149/month, brand-name from $799/month.",
    faqs: [
      {
        question: "Can I get semaglutide without insurance?",
        answer:
          "Yes. Most telehealth providers offer cash-pay options. Compounded semaglutide is significantly cheaper without insurance (often $149–$399/mo) than brand-name.",
      },
    ],
  });

  out.push({
    category: "semaglutide-providers",
    variant: "with-hsa",
    parentLabel: "Semaglutide Providers",
    parentExists: true,
    drug: "semaglutide",
    insuranceFilter: "hsa",
    h1: "Best HSA/FSA-Eligible Semaglutide Providers in 2026",
    intro:
      "Use your pre-tax Health Savings Account or Flexible Spending Account dollars on semaglutide. These providers accept HSA/FSA cards directly or supply itemized receipts for reimbursement.",
    metaTitle: "Best HSA/FSA Semaglutide Providers — 2026",
    metaDescription:
      "Compare semaglutide telehealth providers that accept HSA and FSA cards or supply reimbursement receipts.",
    faqs: [
      {
        question: "Is semaglutide HSA eligible?",
        answer:
          "Yes — semaglutide prescribed for a diagnosed medical condition (type 2 diabetes or obesity) is HSA/FSA eligible. You may need a Letter of Medical Necessity from your provider.",
      },
    ],
  });

  return out;
}

function buildTirzepatideVariants(): VariantConfig[] {
  const out: VariantConfig[] = [];

  for (const dose of TIRZEPATIDE_DOSES) {
    out.push({
      category: "tirzepatide-providers",
      variant: dose.slug,
      parentLabel: "Tirzepatide Providers",
      parentExists: false,
      drug: "tirzepatide",
      doseDisplay: dose.display,
      h1: `Best Tirzepatide ${dose.display} Providers in 2026`,
      intro: `Tirzepatide ${dose.display} is the ${dose.label.toLowerCase()} tier. We compare every telehealth provider offering compounded tirzepatide or brand-name Mounjaro/Zepbound at this dose, ranked by price and independent score.`,
      metaTitle: `Best Tirzepatide ${dose.display} Providers (${dose.label}) — 2026 Prices`,
      metaDescription: `Compare every telehealth provider offering tirzepatide ${dose.display}. Monthly cost, compounded vs brand, independent rankings.`,
      faqs: [
        {
          question: `How much does tirzepatide ${dose.display} cost per month?`,
          answer: `Compounded tirzepatide ${dose.display} typically ranges from $249–$549/month. Brand-name Mounjaro or Zepbound at this dose can run $1,000–$1,600/month without insurance.`,
        },
      ],
    });
  }

  out.push({
    category: "tirzepatide-providers",
    variant: "compounded",
    parentLabel: "Tirzepatide Providers",
    parentExists: false,
    drug: "tirzepatide",
    formFilter: "compounded",
    h1: "Best Compounded Tirzepatide Providers in 2026",
    intro:
      "Compounded tirzepatide gives you the same dual GIP/GLP-1 receptor agonist as Mounjaro and Zepbound at a fraction of the price. We rank every legitimate compounding pharmacy and telehealth provider.",
    metaTitle: "Best Compounded Tirzepatide Providers — 2026 Prices",
    metaDescription:
      "Compare compounded tirzepatide telehealth providers. Pricing per dose, sourcing transparency, independent rankings.",
    faqs: [
      {
        question: "Is compounded tirzepatide still legal in 2026?",
        answer:
          "Yes, when produced by licensed 503A or 503B pharmacies and dispensed under a valid prescription. Check current FDA shortage list status before ordering.",
      },
    ],
  });

  out.push({
    category: "tirzepatide-providers",
    variant: "brand",
    parentLabel: "Tirzepatide Providers",
    parentExists: false,
    drug: "tirzepatide",
    formFilter: "brand",
    h1: "Best Brand-Name Tirzepatide (Mounjaro & Zepbound) Providers in 2026",
    intro:
      "Brand-name Mounjaro (type 2 diabetes) and Zepbound (chronic weight management) are FDA-approved tirzepatide products from Eli Lilly. These telehealth providers prescribe and ship them nationwide.",
    metaTitle: "Best Mounjaro & Zepbound Providers — 2026",
    metaDescription:
      "Compare telehealth providers that prescribe brand-name Mounjaro and Zepbound. Cash prices, insurance acceptance, rankings.",
    faqs: [
      {
        question: "What's the difference between Mounjaro and Zepbound?",
        answer:
          "Same molecule (tirzepatide), same manufacturer (Eli Lilly). Mounjaro is approved for type 2 diabetes; Zepbound is approved for chronic weight management.",
      },
    ],
  });

  out.push({
    category: "tirzepatide-providers",
    variant: "without-insurance",
    parentLabel: "Tirzepatide Providers",
    parentExists: false,
    drug: "tirzepatide",
    h1: "Best Tirzepatide Providers Without Insurance in 2026",
    intro:
      "Paying cash for tirzepatide is more affordable than ever. These telehealth providers offer transparent cash pricing for both compounded and brand-name tirzepatide.",
    metaTitle: "Best Tirzepatide Without Insurance — Cash Prices 2026",
    metaDescription:
      "Compare cash-pay tirzepatide providers. Compounded from $249/month, brand-name from $999/month. No insurance required.",
    faqs: [
      {
        question: "Can I get tirzepatide without insurance?",
        answer:
          "Yes. Most telehealth providers offer cash-pay options. Compounded tirzepatide is significantly cheaper than brand-name Zepbound or Mounjaro.",
      },
    ],
  });

  return out;
}

function buildCheapestVariants(): VariantConfig[] {
  return [
    {
      category: "cheapest-semaglutide",
      variant: "monthly",
      parentLabel: "Cheapest Semaglutide",
      parentExists: false,
      drug: "semaglutide",
      billingFilter: "monthly",
      h1: "Cheapest Monthly Semaglutide Providers in 2026",
      intro:
        "Looking for the lowest monthly price on semaglutide? We sort every telehealth provider by per-month cash cost — no annual commitments, no upfront bulk purchases, just the cheapest monthly bill.",
      metaTitle: "Cheapest Semaglutide Per Month — 2026",
      metaDescription:
        "The cheapest monthly semaglutide providers. No bulk purchase required. Sorted by lowest cash price.",
      faqs: [
        {
          question: "What's the cheapest monthly semaglutide in 2026?",
          answer:
            "Compounded semaglutide starter doses (0.25mg) start around $149/month with the lowest-priced telehealth providers.",
        },
      ],
    },
    {
      category: "cheapest-semaglutide",
      variant: "quarterly",
      parentLabel: "Cheapest Semaglutide",
      parentExists: false,
      drug: "semaglutide",
      billingFilter: "quarterly",
      h1: "Cheapest 3-Month Semaglutide Plans in 2026",
      intro:
        "Quarterly (3-month) semaglutide plans typically save 15–30% over monthly billing. We rank every telehealth provider that offers a discounted quarterly subscription.",
      metaTitle: "Cheapest 3-Month Semaglutide Plans — 2026",
      metaDescription:
        "Compare 3-month semaglutide plans with quarterly discounts. Lowest effective per-month price.",
      faqs: [
        {
          question: "Should I commit to a 3-month semaglutide plan?",
          answer:
            "Quarterly plans usually save 15–30%. They make sense if you've already tolerated semaglutide and plan to stay on it through dose escalation.",
        },
      ],
    },
    {
      category: "cheapest-tirzepatide",
      variant: "monthly",
      parentLabel: "Cheapest Tirzepatide",
      parentExists: false,
      drug: "tirzepatide",
      billingFilter: "monthly",
      h1: "Cheapest Monthly Tirzepatide Providers in 2026",
      intro:
        "Looking for the lowest monthly price on tirzepatide? We sort every telehealth provider by per-month cash cost — compounded and brand-name, monthly billing only.",
      metaTitle: "Cheapest Tirzepatide Per Month — 2026",
      metaDescription:
        "The cheapest monthly tirzepatide providers. No bulk purchase required. Sorted by lowest cash price.",
      faqs: [
        {
          question: "What's the cheapest monthly tirzepatide in 2026?",
          answer:
            "Compounded tirzepatide starter doses (2.5mg) start around $249/month with the lowest-priced telehealth providers.",
        },
      ],
    },
  ];
}

export const ALL_VARIANTS: VariantConfig[] = [
  ...buildSemaglutideVariants(),
  ...buildTirzepatideVariants(),
  ...buildCheapestVariants(),
];

export function getAllVariantPaths(): { category: string; variant: string }[] {
  return ALL_VARIANTS.map(({ category, variant }) => ({ category, variant }));
}

export function findVariant(
  category: string,
  variant: string,
): VariantConfig | null {
  return (
    ALL_VARIANTS.find((v) => v.category === category && v.variant === variant) ??
    null
  );
}
