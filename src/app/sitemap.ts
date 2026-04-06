import type { MetadataRoute } from "next";
import {
  getAllProviderSlugs,
  getAllProviders,
  getAllBlogSlugs,
} from "@/lib/data";
import { getAllDrugSlugs } from "@/lib/drugs";
import { US_STATES } from "@/lib/states";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

const CATEGORY_KEYS = ["semaglutide-providers", "weight-loss-programs"];

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
      url: `${BASE_URL}/disclosure`,
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
    ...comparePages,
    ...blogPages,
  ];
}
