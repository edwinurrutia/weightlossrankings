import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/shared/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

export const metadata: Metadata = {
  title: "Best Of Rankings — GLP-1 Providers, Compounded, Cheapest & More",
  description:
    "Browse Weight Loss Rankings' editorial 'Best Of' rankings: best semaglutide providers, best tirzepatide, best Foundayo, cheapest compounded, best weight-loss programs and supplements. Updated 2026.",
  alternates: { canonical: "/best" },
  openGraph: {
    title: "Best Of Rankings — GLP-1 Providers, Compounded, Cheapest & More",
    description:
      "Browse our independent 'Best Of' rankings across every major GLP-1 telehealth category.",
    type: "website",
    url: "/best",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary_large_image" },
};

// 'Best Of' category index. Each entry maps to /best/[category],
// which renders the ranked provider list for that category. The
// list mirrors the CATEGORY_KEYS in src/app/sitemap.ts so the two
// stay in sync.
const CATEGORIES = [
  {
    slug: "semaglutide-providers",
    label: "Best Semaglutide Providers",
    description:
      "Independent rankings of every major semaglutide telehealth clinic — brand-name and compounded — scored across pricing, clinical oversight, and user experience.",
  },
  {
    slug: "tirzepatide-providers",
    label: "Best Tirzepatide Providers",
    description:
      "The 25+ tirzepatide telehealth providers we track, ranked by price, trust, and effectiveness.",
  },
  {
    slug: "orforglipron-providers",
    label: "Best Foundayo (Orforglipron) Providers",
    description:
      "Providers prescribing the new oral GLP-1 (Foundayo / orforglipron) — the first non-injectable approved for weight management.",
  },
  {
    slug: "compounded-semaglutide",
    label: "Best Compounded Semaglutide",
    description:
      "Verified compounded semaglutide providers, screened against state pharmacy licensure, FDA enforcement records, and pricing transparency.",
  },
  {
    slug: "compounded-tirzepatide",
    label: "Best Compounded Tirzepatide",
    description:
      "Verified compounded tirzepatide providers using the same six-dimension scoring methodology.",
  },
  {
    slug: "cheapest-semaglutide",
    label: "Cheapest Semaglutide",
    description:
      "Sorted by current monthly cost, with both brand-name savings-card pricing and compounded vendors included.",
  },
  {
    slug: "cheapest-tirzepatide",
    label: "Cheapest Tirzepatide",
    description: "Sorted by current monthly cost across every provider we track.",
  },
  {
    slug: "weight-loss-programs",
    label: "Best Weight Loss Programs",
    description:
      "Structured weight-loss programs (Noom, WW, Calibrate, etc.) ranked on the same six dimensions as the GLP-1 telehealth providers.",
  },
  {
    slug: "weight-loss-supplements",
    label: "Best Weight Loss Supplements",
    description:
      "Independent evaluations of the most-marketed supplements, with explicit attention to evidence quality (or lack thereof).",
  },
  {
    slug: "meal-delivery-for-weight-loss",
    label: "Best Meal Delivery for Weight Loss",
    description:
      "Meal delivery services suitable for patients on or starting a GLP-1 — sorted by macros, portion size, and price.",
  },
  {
    slug: "fitness-apps-for-weight-loss",
    label: "Best Fitness Apps for Weight Loss",
    description:
      "Strength training, walking, and habit-tracking apps that pair well with GLP-1 lean-mass preservation protocols.",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Best Of Rankings — Weight Loss Rankings",
  description:
    "Browse our independent editorial rankings across every major GLP-1, weight-loss program, and supplement category. Each ranking is scored using the same six-dimension methodology.",
  url: `${SITE_URL}/best`,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "Weight Loss Rankings",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Best Of Categories",
    numberOfItems: CATEGORIES.length,
    itemListElement: CATEGORIES.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/best/${c.slug}`,
      name: c.label,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Of", item: `${SITE_URL}/best` },
  ],
};

export default function BestOfIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Editorial rankings
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          Best Of Rankings
        </h1>
        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
          Independent rankings across every major GLP-1, weight-loss
          program, and supplement category. Every ranking uses the same
          six-dimension scoring methodology — value, clinical
          effectiveness, user experience, safety, accessibility, and
          ongoing support.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/best/${cat.slug}`}
            className="block rounded-2xl border border-brand-violet/15 bg-white p-6 hover:border-brand-violet/40 hover:shadow-md transition-all"
          >
            <h2 className="font-heading text-lg font-bold text-brand-text-primary leading-tight mb-2">
              {cat.label}
            </h2>
            <p className="text-brand-text-secondary text-sm leading-relaxed">
              {cat.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
