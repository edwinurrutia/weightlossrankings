import type { MetadataRoute } from "next";
import {
  getAllProviderSlugs,
  getAllProviders,
  getAllBlogPosts,
} from "@/lib/data";
import { getAllDrugSlugs, getAllDrugs } from "@/lib/drugs";
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

// Static per-section lastmod dates. Bumped manually when the content
// of a section materially changes. Using a fixed constant instead of
// `new Date()` prevents every deploy from stamping every sitemap URL
// with the current timestamp, which Google treats as a noisy/unreliable
// freshness signal and penalizes with reduced crawl budget.
//
// Rule: bump these when you genuinely change the underlying content
// template or data for that section. Do NOT bump on unrelated deploys.
const STATE_PAGES_LASTMOD = new Date("2026-04-08T00:00:00Z"); // state split + sortProvidersByRank
const CITY_PAGES_LASTMOD = new Date("2026-04-06T00:00:00Z"); // cities cleanup in Wave 5.4
const VARIANT_PAGES_LASTMOD = new Date("2026-04-09T00:00:00Z"); // per-variant OG images
const SAVINGS_PAGES_LASTMOD = new Date("2026-04-09T00:00:00Z");
const INSURER_PAGES_LASTMOD = new Date("2026-04-07T00:00:00Z");
const PHARMACY_PAGES_LASTMOD = new Date("2026-04-07T00:00:00Z");
const AUTHOR_PAGES_LASTMOD = new Date("2026-04-06T00:00:00Z"); // E-E-A-T author infra shipped
const HUB_PAGES_LASTMOD = new Date("2026-04-11T00:00:00Z"); // today — hubs reflect sitewide state

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // /best, /reviews, /alternatives, /savings indexes — all newly
    // created in the 2026-04-08 schema audit follow-up. Each was
    // previously a 404 even though child pages were sitemap-listed
    // and breadcrumb-linked.
    {
      url: `${BASE_URL}/best`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/alternatives`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/savings`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    // Rankings / best pages
    ...CATEGORY_KEYS.map((category) => ({
      url: `${BASE_URL}/best/${category}`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Compare landing
    {
      url: `${BASE_URL}/compare`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    // /tools index page
    {
      url: `${BASE_URL}/tools`,
      lastModified: HUB_PAGES_LASTMOD,
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
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/price-tracker`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    // Listing pages
    {
      url: `${BASE_URL}/drugs`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/states`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/insurance`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pharmacies`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // Trust pages
    {
      url: `${BASE_URL}/sources`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/press`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/disclosure`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/nature-of-reviews`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    // Legal & info pages
    {
      url: `${BASE_URL}/faq`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: HUB_PAGES_LASTMOD,
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
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/corrections`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/code-of-conduct`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/medical-disclaimer`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/trademarks`,
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/fda-warning-letters`,
      lastModified: HUB_PAGES_LASTMOD,
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
    lastModified: AUTHOR_PAGES_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic: /reviews/[provider]
  //
  // Per-URL lastmod sourced from each provider's verification.last_verified
  // date (the date the editorial team last cross-checked the provider's
  // website, pricing, and regulatory status). This gives Google an
  // honest per-URL freshness signal instead of the "everything modified
  // right now" noise from sitemap-wide `now`. Google's crawl scheduler
  // uses sitemap lastmod accuracy as an input to how much crawl budget
  // to spend on a domain — uniform "now" stamps across 700+ URLs were
  // almost certainly contributing to our 11/852-indexed ratio.
  const allProvidersForSitemap = await getAllProviders();
  const providerSlugs = await getAllProviderSlugs();
  const providerLastModBySlug = new Map<string, Date>();
  for (const p of allProvidersForSitemap) {
    if (p.slug) {
      providerLastModBySlug.set(p.slug, safeDate(p.verification?.last_verified));
    }
  }
  const reviewPages: MetadataRoute.Sitemap = providerSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/reviews/${slug}`,
    lastModified: providerLastModBySlug.get(slug) ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic: /alternatives/[provider] — alternatives listing is a
  // derivative of the same underlying provider data, so the lastmod
  // tracks the same verification date as the review page.
  const alternativesPages: MetadataRoute.Sitemap = providerSlugs.map(
    ({ slug }) => ({
      url: `${BASE_URL}/alternatives/${slug}`,
      lastModified: providerLastModBySlug.get(slug) ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // Dynamic: /drugs/[drug]
  //
  // Per-URL lastmod sourced from each drug's verification.last_verified
  // date (the date the editorial team last re-checked the FDA label and
  // pivotal trial references). Drug pages change less often than
  // provider pages, so the honest freshness signal is usually older.
  const allDrugsForSitemap = getAllDrugs();
  const drugLastModBySlug = new Map<string, Date>();
  for (const d of allDrugsForSitemap) {
    drugLastModBySlug.set(
      d.slug,
      safeDate(
        (d as { verification?: { last_verified?: string } }).verification
          ?.last_verified ?? d.approval_date
      )
    );
  }
  const drugSlugs = getAllDrugSlugs();
  const drugPages: MetadataRoute.Sitemap = drugSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/drugs/${slug}`,
    lastModified: drugLastModBySlug.get(slug) ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: /states/[state]
  const statePages: MetadataRoute.Sitemap = US_STATES.map((state) => ({
    url: `${BASE_URL}/states/${state.slug}`,
    lastModified: STATE_PAGES_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: /states/[state]/[drug] — 50 states × 2 drugs = 100 pages
  const stateDrugPages: MetadataRoute.Sitemap = US_STATES.flatMap((state) =>
    (["semaglutide", "tirzepatide"] as const).map((drug) => ({
      url: `${BASE_URL}/states/${state.slug}/${drug}`,
      lastModified: STATE_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  // Dynamic: /compare/[matchup]
  //
  // REMOVED FROM SITEMAP 2026-04-10 per GSC crawl-budget analysis.
  // With 108 providers the cartesian product generates 5,158 matchup
  // URLs. Submitting all of them on a new domain (11 indexed pages out
  // of 5,919 total) was drowning Google's crawl queue — 87% of the
  // sitemap was thin programmatic matchups, causing Google to throttle
  // indexing of our high-value research, review, and drug pages.
  //
  // The /compare pages still exist, still render, still pass internal
  // link equity, and can still be found by Googlebot via crawling
  // internal links. They just aren't on the priority list Google reads
  // from the sitemap.
  //
  // Plan: re-add the TOP 20-50 most-searched matchups once Google has
  // indexed the core 760 pages and the domain has established trust.
  // Monitor GSC "Discovered - currently not indexed" queue drain rate
  // as the leading indicator.
  const comparePages: MetadataRoute.Sitemap = [];

  // Dynamic: /best/[category]/[variant] — dose, form, insurance variant pages
  const variantPages: MetadataRoute.Sitemap = getAllVariantPaths().map(
    ({ category, variant }) => ({
      url: `${BASE_URL}/best/${category}/${variant}`,
      lastModified: VARIANT_PAGES_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

  // Dynamic: /cities/[city] — 20 city index pages
  const allCities = getAllCities();
  const cityPages: MetadataRoute.Sitemap = allCities.map((c) => ({
    url: `${BASE_URL}/cities/${c.slug}`,
    lastModified: CITY_PAGES_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic: /cities/[city]/[drug] — 20 cities × 2 drugs = 40 pages
  const cityDrugPages: MetadataRoute.Sitemap = allCities.flatMap((c) =>
    CITY_DRUG_SLUGS.map((drug) => ({
      url: `${BASE_URL}/cities/${c.slug}/${drug}`,
      lastModified: CITY_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Dynamic: /savings/[comparison] — 4 brand-vs-compounded pages
  const savingsPages: MetadataRoute.Sitemap = SAVINGS_COMPARISONS.map((c) => ({
    url: `${BASE_URL}/savings/${c.slug}`,
    lastModified: SAVINGS_PAGES_LASTMOD,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic: /insurance/[insurer] — 10 insurer coverage pages
  const insurerPages: MetadataRoute.Sitemap = getAllInsurers().map((i) => ({
    url: `${BASE_URL}/insurance/${i.slug}`,
    lastModified: INSURER_PAGES_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic: /pharmacies/[slug]
  const pharmacyPages: MetadataRoute.Sitemap = getAllPharmacies().map((p) => ({
    url: `${BASE_URL}/pharmacies/${p.slug}`,
    lastModified: PHARMACY_PAGES_LASTMOD,
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
      lastModified: HUB_PAGES_LASTMOD,
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
      lastModified: HUB_PAGES_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/es/research`,
      lastModified: HUB_PAGES_LASTMOD,
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
