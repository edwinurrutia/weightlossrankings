import type { MetadataRoute } from "next";
import {
  getAllProviderSlugs,
  getAllProviders,
  getAllBlogPosts,
} from "@/lib/data";
import { getAllDrugSlugs } from "@/lib/drugs";
import { US_STATES } from "@/lib/states";
import { getAllVariantPaths } from "@/lib/variants";
import { getAllCities, CITY_DRUG_SLUGS } from "@/lib/cities";
import { SAVINGS_COMPARISONS } from "@/lib/savings-comparisons";
import { getAllInsurers } from "@/lib/insurers";
import { getAllPharmacies } from "@/lib/pharmacies";
import {
  RESEARCH_ARTICLES,
  SPANISH_RESEARCH_SLUGS,
} from "@/lib/research";
import { AUTHORS } from "@/data/authors";
import { RESEARCH_CLUSTERS } from "@/lib/research-clusters";
import { TOOLS, NON_TOOLS_INTERACTIVE_PAGES } from "@/lib/tools";
import {
  getAllWarningLetters,
  getAllWarningLetterSlugs,
} from "@/lib/fda-warning-letters";

// Helper: parse a YYYY-MM-DD or full ISO date string and return a
// Date object, falling back to "now" if the input is empty or
// malformed. Used to feed real per-content lastModified values to
// the sitemap so Google's freshness signal isn't washed out by
// every page reporting "modified now."
function safeDate(input: string | undefined | null): Date {
  if (!input) return new Date();
  const d = new Date(input);
  return isNaN(d.getTime()) ? new Date() : d;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

const CATEGORY_KEYS = [
  "semaglutide-providers",
  "tirzepatide-providers",
  "orforglipron-providers",
  "compounded-semaglutide",
  "compounded-tirzepatide",
  "cheapest-semaglutide",
  "cheapest-tirzepatide",
  "weight-loss-programs",
  "weight-loss-supplements",
  "meal-delivery-for-weight-loss",
  "fitness-apps-for-weight-loss",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // /best, /reviews, /alternatives, /savings indexes — all newly
    // created in the 2026-04-08 schema audit follow-up. Each was
    // previously a 404 even though child pages were sitemap-listed
    // and breadcrumb-linked.
    {
      url: `${BASE_URL}/best`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/alternatives`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/savings`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    // Rankings / best pages
    ...CATEGORY_KEYS.map((category) => ({
      url: `${BASE_URL}/best/${category}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Compare landing
    {
      url: `${BASE_URL}/compare`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    // /tools index page
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    // /tools/* — auto-iterated from src/lib/tools.ts TOOLS registry.
    // Adding a new tool to that registry now automatically inserts
    // it here. This was the SEO bug fixed in the Wave 5 staleness
    // audit; previously tools were manually enumerated and several
    // shipped tools were missing from the sitemap until somebody
    // remembered to update this file.
    ...TOOLS.map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: safeDate(t.lastUpdated ?? t.publishedDate),
      changeFrequency: t.changeFrequency,
      priority: t.sitemapPriority,
    })),
    // Top-level non-/tools-prefixed interactive pages (savings,
    // insurance checker), also from the registry
    ...NON_TOOLS_INTERACTIVE_PAGES.map((t) => ({
      url: `${BASE_URL}/${t.slug}`,
      lastModified: safeDate(t.lastUpdated ?? t.publishedDate),
      changeFrequency: t.changeFrequency,
      priority: t.sitemapPriority,
    })),
    {
      url: `${BASE_URL}/dose-timeline`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/price-tracker`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    // Listing pages
    {
      url: `${BASE_URL}/drugs`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/states`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/insurance`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pharmacies`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // Trust pages
    {
      url: `${BASE_URL}/sources`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/press`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/disclosure`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/nature-of-reviews`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    // Legal & info pages
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    // E-E-A-T anchor pages — shipped 2026-04-09 in the deep SEO audit
    // follow-up. Each is referenced from Organization schema's
    // publishingPrinciples / correctionsPolicy / masthead properties
    // in src/app/layout.tsx and from author bylines on every YMYL
    // article, so they MUST be in the sitemap or Google will find
    // them via crawl but treat them as secondary. Priority 0.6 since
    // they carry the site-wide trust signal.
    {
      url: `${BASE_URL}/editorial-policy`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/corrections`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/code-of-conduct`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/medical-disclaimer`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/trademarks`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/fda-warning-letters`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic: /fda-warning-letters/[slug]
  // Use the actual letter date so Google sees real freshness signals
  // when new letters are added — washing every page out with "now"
  // makes the freshness column meaningless to crawlers.
  const allWarningLetters = getAllWarningLetters();
  const fdaWarningLetterPages: MetadataRoute.Sitemap = allWarningLetters.map(
    (letter) => ({
      url: `${BASE_URL}/fda-warning-letters/${letter.id}`,
      lastModified: safeDate(letter.added_date ?? letter.letter_date),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );
  // Suppress unused-import warning — we kept the slug helper for the
  // type signature even though we now read full letter records.
  void getAllWarningLetterSlugs;

  // Dynamic: /authors/[slug] — one entry per named editorial contributor.
  // Author bio pages are the landing target for every article byline and
  // carry the ProfilePage + Person JSON-LD that Google reads for E-E-A-T
  // attribution, so they need to be crawlable via sitemap, not just via
  // byline links.
  const authorPages: MetadataRoute.Sitemap = AUTHORS.map((author) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic: /reviews/[provider]
  const providerSlugs = await getAllProviderSlugs();
  const reviewPages: MetadataRoute.Sitemap = providerSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/reviews/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic: /alternatives/[provider]
  const alternativesPages: MetadataRoute.Sitemap = providerSlugs.map(
    ({ slug }) => ({
      url: `${BASE_URL}/alternatives/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // Dynamic: /drugs/[drug]
  const drugSlugs = getAllDrugSlugs();
  const drugPages: MetadataRoute.Sitemap = drugSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/drugs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: /states/[state]
  const statePages: MetadataRoute.Sitemap = US_STATES.map((state) => ({
    url: `${BASE_URL}/states/${state.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: /states/[state]/[drug] — 50 states × 2 drugs = 100 pages
  const stateDrugPages: MetadataRoute.Sitemap = US_STATES.flatMap((state) =>
    (["semaglutide", "tirzepatide"] as const).map((drug) => ({
      url: `${BASE_URL}/states/${state.slug}/${drug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  // Dynamic: /compare/[matchup] — all pairs within the same category
  const allProviders = await getAllProviders();
  const comparePages: MetadataRoute.Sitemap = [];
  const categoryGroups = allProviders.reduce<Record<string, string[]>>(
    (acc, provider) => {
      const cat = provider.category ?? "uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(provider.slug);
      return acc;
    },
    {}
  );
  for (const slugs of Object.values(categoryGroups)) {
    for (let i = 0; i < slugs.length; i++) {
      for (let j = i + 1; j < slugs.length; j++) {
        comparePages.push({
          url: `${BASE_URL}/compare/${slugs[i]}-vs-${slugs[j]}`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.9,
        });
      }
    }
  }

  // Dynamic: /best/[category]/[variant] — dose, form, insurance variant pages
  const variantPages: MetadataRoute.Sitemap = getAllVariantPaths().map(
    ({ category, variant }) => ({
      url: `${BASE_URL}/best/${category}/${variant}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

  // Dynamic: /cities/[city] — 20 city index pages
  const allCities = getAllCities();
  const cityPages: MetadataRoute.Sitemap = allCities.map((c) => ({
    url: `${BASE_URL}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic: /cities/[city]/[drug] — 20 cities × 2 drugs = 40 pages
  const cityDrugPages: MetadataRoute.Sitemap = allCities.flatMap((c) =>
    CITY_DRUG_SLUGS.map((drug) => ({
      url: `${BASE_URL}/cities/${c.slug}/${drug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Dynamic: /savings/[comparison] — 4 brand-vs-compounded pages
  const savingsPages: MetadataRoute.Sitemap = SAVINGS_COMPARISONS.map((c) => ({
    url: `${BASE_URL}/savings/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic: /insurance/[insurer] — 10 insurer coverage pages
  const insurerPages: MetadataRoute.Sitemap = getAllInsurers().map((i) => ({
    url: `${BASE_URL}/insurance/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic: /pharmacies/[slug]
  const pharmacyPages: MetadataRoute.Sitemap = getAllPharmacies().map((p) => ({
    url: `${BASE_URL}/pharmacies/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: /blog/[slug] — feed real published/updated dates
  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: safeDate(post.updated_date ?? post.published_date),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Dynamic: /research/[slug] — feed lastUpdated when present, else
  // publishedDate. Excludes Spanish slugs from SPANISH_RESEARCH_SLUGS
  // (imported from src/lib/research.ts, the single source of truth);
  // those are emitted under /es/research/[slug] with the same date
  // precedence. The old /research/[slug] URLs 301 to /es/research/...
  // via next.config.mjs and must NOT appear in the English sitemap.
  const researchPages: MetadataRoute.Sitemap = RESEARCH_ARTICLES.filter(
    (a) => !SPANISH_RESEARCH_SLUGS.has(a.slug),
  ).map((a) => ({
    url: `${BASE_URL}/research/${a.slug}`,
    lastModified: safeDate(a.lastUpdated ?? a.publishedDate),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Topic cluster hub pages — index page + per-cluster pages.
  // Auto-iterated from src/lib/research-clusters.ts so adding a
  // new cluster automatically inserts it here.
  const researchTopicsPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/research/topics`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    ...RESEARCH_CLUSTERS.map((c) => ({
      url: `${BASE_URL}/research/topics/${c.slug}`,
      lastModified: safeDate(c.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  // Spanish subdirectory (/es). Manually enumerated for now — once
  // more /es/* surfaces are localized, this list should grow or be
  // generated dynamically the way the English routes are.
  const spanishStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/es/research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const spanishResearchPages: MetadataRoute.Sitemap = RESEARCH_ARTICLES.filter(
    (a) => SPANISH_RESEARCH_SLUGS.has(a.slug),
  ).map((a) => ({
    url: `${BASE_URL}/es/research/${a.slug}`,
    lastModified: safeDate(a.lastUpdated ?? a.publishedDate),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...staticPages,
    ...authorPages,
    ...reviewPages,
    ...alternativesPages,
    ...drugPages,
    ...statePages,
    ...stateDrugPages,
    ...comparePages,
    ...variantPages,
    ...cityPages,
    ...cityDrugPages,
    ...savingsPages,
    ...insurerPages,
    ...pharmacyPages,
    ...blogPages,
    ...researchPages,
    ...researchTopicsPages,
    ...spanishStaticPages,
    ...spanishResearchPages,
    ...fdaWarningLetterPages,
  ];
}
