/**
 * Image sitemap at /sitemap-images.xml
 *
 * Why this exists alongside /sitemap.xml:
 *
 *   Next.js 14's typed MetadataRoute.Sitemap does NOT support the
 *   sitemap-image extension (<image:image> tags), so the existing
 *   /sitemap.xml has no way to tell Google about our per-route OG
 *   images. Without that, Google Image Search has to discover the
 *   images by crawling each page individually — slow, partial,
 *   and misses the opportunity to surface our branded hero images
 *   for image-search queries.
 *
 *   This file is a hand-rolled XML sitemap that emits one <url>
 *   entry per indexable route, each containing an <image:image>
 *   tag pointing at the per-route opengraph-image.tsx output.
 *   Google reads it via the Sitemap directive in robots.ts and
 *   indexes every OG image as a first-class image asset.
 *
 * What gets included:
 *   - / (homepage hero image)
 *   - /reviews/[provider]      → unique provider OG image
 *   - /compare/[matchup]       → comparison OG image
 *   - /blog/[slug]             → article OG image
 *   - /drugs/[drug]            → drug profile OG image
 *   - /pharmacies/[slug]       → pharmacy OG image
 *   - /fda-warning-letters/[slug] → enforcement-themed OG image
 *   - /research/[slug]         → research article OG image
 *   - /states/[state]/[drug]   → "where to get [drug] in [state]" OG
 *   - /best/[category]         → ranking OG image
 *   - /best/[category]/[variant] → variant OG image
 *   - /insurance/[insurer]     → insurance coverage OG image
 *   - /cities/[city]/[drug]    → city/drug OG image
 *   - /savings/[comparison]    → brand-vs-compounded OG image
 *   - /learn/[topic]/[slug]    → educational article OG image
 *
 * Why this matters more than people realize:
 *   Image Search is the third-largest search vertical after Web
 *   and Maps. Health-related image queries ("compounded
 *   semaglutide vial", "GLP-1 telehealth provider logos",
 *   "FDA warning letter") drive a significant minority of WLR
 *   traffic potential. Unique branded images per page is the
 *   only way to compete in that vertical.
 */

import { getAllProviders, getAllBlogPosts, getAllProviderSlugs } from "@/lib/data";
import { getAllDrugSlugs } from "@/lib/drugs";
import { US_STATES } from "@/lib/states";
import { getAllCities, CITY_DRUG_SLUGS } from "@/lib/cities";
import { SAVINGS_COMPARISONS } from "@/lib/savings-comparisons";
import { getAllInsurers } from "@/lib/insurers";
import { getAllPharmacies } from "@/lib/pharmacies";
import { RESEARCH_ARTICLES } from "@/lib/research";
import { getAllWarningLetters } from "@/lib/fda-warning-letters";
import { getAllVariantPaths } from "@/lib/variants";

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

export const dynamic = "force-static";
export const revalidate = 86400; // once a day

interface ImageEntry {
  pageUrl: string;
  imageUrl: string;
  caption: string;
  title?: string;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const entries: ImageEntry[] = [];

  // Homepage
  entries.push({
    pageUrl: BASE_URL,
    imageUrl: `${BASE_URL}/opengraph-image`,
    caption: "Independent rankings and reviews of GLP-1 telehealth providers",
    title: "Weight Loss Rankings",
  });

  // Reviews
  const providers = await getAllProviders();
  const providerSlugs = await getAllProviderSlugs();
  for (const { slug } of providerSlugs) {
    const provider = providers.find((p) => p.slug === slug);
    entries.push({
      pageUrl: `${BASE_URL}/reviews/${slug}`,
      imageUrl: `${BASE_URL}/reviews/${slug}/opengraph-image`,
      caption: `Independent review of ${provider?.name ?? slug} — pricing, pros and cons, scores`,
      title: provider?.name ?? slug,
    });
  }

  // Drugs
  const drugSlugs = getAllDrugSlugs();
  for (const { slug } of drugSlugs) {
    entries.push({
      pageUrl: `${BASE_URL}/drugs/${slug}`,
      imageUrl: `${BASE_URL}/drugs/${slug}/opengraph-image`,
      caption: `Drug profile for ${slug} — FDA status, dosing, side effects, providers`,
    });
  }

  // States × drugs
  for (const state of US_STATES) {
    for (const drug of ["semaglutide", "tirzepatide"] as const) {
      entries.push({
        pageUrl: `${BASE_URL}/states/${state.slug}/${drug}`,
        imageUrl: `${BASE_URL}/states/${state.slug}/${drug}/opengraph-image`,
        caption: `Where to get ${drug} in ${state.name}`,
      });
    }
  }

  // Cities × drugs
  const cities = getAllCities();
  for (const city of cities) {
    for (const drug of CITY_DRUG_SLUGS) {
      entries.push({
        pageUrl: `${BASE_URL}/cities/${city.slug}/${drug}`,
        imageUrl: `${BASE_URL}/cities/${city.slug}/${drug}/opengraph-image`,
        caption: `Where to get ${drug} in ${city.city}, ${city.state_code}`,
      });
    }
  }

  // Pharmacies
  const pharmacies = getAllPharmacies();
  for (const pharmacy of pharmacies) {
    entries.push({
      pageUrl: `${BASE_URL}/pharmacies/${pharmacy.slug}`,
      imageUrl: `${BASE_URL}/pharmacies/${pharmacy.slug}/opengraph-image`,
      caption: `${pharmacy.name} — compounding pharmacy profile`,
      title: pharmacy.name,
    });
  }

  // Blog posts
  const posts = await getAllBlogPosts();
  for (const post of posts) {
    entries.push({
      pageUrl: `${BASE_URL}/blog/${post.slug}`,
      imageUrl: `${BASE_URL}/blog/${post.slug}/opengraph-image`,
      caption: post.excerpt,
      title: post.title,
    });
  }

  // FDA warning letters
  const letters = getAllWarningLetters();
  for (const letter of letters) {
    entries.push({
      pageUrl: `${BASE_URL}/fda-warning-letters/${letter.id}`,
      imageUrl: `${BASE_URL}/fda-warning-letters/${letter.id}/opengraph-image`,
      caption: `FDA warning letter to ${letter.company_name}`,
      title: letter.company_name,
    });
  }

  // Research articles (4 hand-built dirs, each with its own opengraph-image)
  for (const article of RESEARCH_ARTICLES) {
    entries.push({
      pageUrl: `${BASE_URL}/research/${article.slug}`,
      imageUrl: `${BASE_URL}/research/${article.slug}/opengraph-image`,
      caption: article.description,
      title: article.title,
    });
  }

  // Insurance pages
  const insurers = getAllInsurers();
  for (const insurer of insurers) {
    entries.push({
      pageUrl: `${BASE_URL}/insurance/${insurer.slug}`,
      imageUrl: `${BASE_URL}/insurance/${insurer.slug}/opengraph-image`,
      caption: `${insurer.name} insurance coverage for GLP-1 medications`,
      title: insurer.name,
    });
  }

  // Savings comparison pages
  for (const comparison of SAVINGS_COMPARISONS) {
    entries.push({
      pageUrl: `${BASE_URL}/savings/${comparison.slug}`,
      imageUrl: `${BASE_URL}/savings/${comparison.slug}/opengraph-image`,
      caption: `${comparison.brand_name} vs compounded ${comparison.generic_name} savings`,
      title: `${comparison.brand_name} alternative`,
    });
  }

  // Best (category landing pages have their own OG image route)
  for (const category of CATEGORY_KEYS) {
    entries.push({
      pageUrl: `${BASE_URL}/best/${category}`,
      imageUrl: `${BASE_URL}/best/${category}/opengraph-image`,
      caption: `Best ${category.replace(/-/g, " ")} — independent ranking`,
    });
  }

  // Best variant pages
  const variantPaths = getAllVariantPaths();
  for (const { category, variant } of variantPaths) {
    entries.push({
      pageUrl: `${BASE_URL}/best/${category}/${variant}`,
      imageUrl: `${BASE_URL}/best/${category}/${variant}/opengraph-image`,
      caption: `Best ${variant.replace(/-/g, " ")} — ranking`,
    });
  }

  // Compare pages — only top-N pairs to keep the sitemap size sane
  // (the full pair count is providers × providers / 2 which is too
  // many for a single sitemap file). Cap at 1000.
  const sortedProviders = [...providers].sort((a, b) =>
    a.slug.localeCompare(b.slug),
  );
  let compareCount = 0;
  for (let i = 0; i < sortedProviders.length && compareCount < 1000; i++) {
    for (
      let j = i + 1;
      j < sortedProviders.length && compareCount < 1000;
      j++
    ) {
      if (sortedProviders[i].category !== sortedProviders[j].category) continue;
      const slug = `${sortedProviders[i].slug}-vs-${sortedProviders[j].slug}`;
      entries.push({
        pageUrl: `${BASE_URL}/compare/${slug}`,
        imageUrl: `${BASE_URL}/compare/${slug}/opengraph-image`,
        caption: `${sortedProviders[i].name} vs ${sortedProviders[j].name} — head-to-head comparison`,
      });
      compareCount += 1;
    }
  }

  // Build the XML
  const urlXml = entries
    .map(
      (e) => `
  <url>
    <loc>${escapeXml(e.pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(e.imageUrl)}</image:loc>
      <image:caption>${escapeXml(e.caption.slice(0, 200))}</image:caption>${
        e.title
          ? `\n      <image:title>${escapeXml(e.title.slice(0, 100))}</image:title>`
          : ""
      }
    </image:image>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
