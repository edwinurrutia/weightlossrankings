import type { MetadataRoute } from "next";
import {
  getAllProviderSlugs,
  getAllProviders,
  getAllBlogSlugs,
} from "@/lib/data";
import { getAllDrugSlugs } from "@/lib/drugs";
import { US_STATES } from "@/lib/states";
import { getAllVariantPaths } from "@/lib/variants";
import { getAllCities, CITY_DRUG_SLUGS } from "@/lib/cities";
import { SAVINGS_COMPARISONS } from "@/lib/savings-comparisons";
import { getAllInsurers } from "@/lib/insurers";
import { getAllPharmacies } from "@/lib/pharmacies";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

const CATEGORY_KEYS = [
  "semaglutide-providers",
  "tirzepatide-providers",
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
    // Static tool / guide pages
    {
      url: `${BASE_URL}/savings-calculator`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/insurance-checker`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
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
    {
      url: `${BASE_URL}/code-of-conduct`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
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
  ];

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

  // Dynamic: /blog/[slug]
  const blogSlugs = await getAllBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
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
  ];
}
