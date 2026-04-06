/**
 * Google News sitemap at /news-sitemap.xml
 *
 * Different from the regular sitemap.xml at /sitemap.xml:
 *
 *   - Only includes content published in the last 48 hours. Anything
 *     older is dropped because Google News only ingests fresh
 *     content via this endpoint.
 *   - Uses the news: XML namespace from
 *     https://www.google.com/schemas/sitemap-news/0.9
 *   - Each entry carries a <news:publication>, <news:title>, and
 *     <news:publication_date> in addition to the regular <loc>
 *
 * Why a separate file even though /sitemap.xml exists:
 *
 *   The standard sitemap is consumed by general Google crawl. The
 *   news sitemap is specifically consumed by Google News (and by
 *   extension, the news-aware portion of Discover). Without a
 *   dedicated news sitemap, fresh editorial content can wait
 *   hours-to-days to surface in Top Stories or Discover even if
 *   the regular sitemap has it. This file is the fast lane.
 *
 *   Apple News and Smart News (Yahoo) also accept news sitemaps,
 *   so this single endpoint feeds three large news distribution
 *   surfaces.
 *
 * Discoverability:
 *
 *   The URL is referenced from src/app/robots.ts under the
 *   `Sitemap:` directive. Google News also auto-discovers it if
 *   you submit /news-sitemap.xml in Search Console.
 *
 * Format reference:
 *   https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 */

import { getAllBlogPosts } from "@/lib/data";
import { RESEARCH_ARTICLES } from "@/lib/research";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

const PUBLICATION_NAME = "Weight Loss Rankings";
const PUBLICATION_LANGUAGE = "en";

// Google News only consumes articles published in the last 48
// hours. Anything older has to come through the regular sitemap.
const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

export const dynamic = "force-static";
export const revalidate = 600; // 10 minutes — fresh news matters

interface NewsItem {
  url: string;
  title: string;
  publishedAt: Date;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safeDate(iso: string | undefined | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

export async function GET() {
  const cutoff = new Date(Date.now() - FORTY_EIGHT_HOURS_MS);
  const items: NewsItem[] = [];

  // Pull blog posts published or updated in the last 48 hours
  const posts = await getAllBlogPosts();
  for (const post of posts) {
    const published = safeDate(post.updated_date ?? post.published_date);
    if (!published) continue;
    if (published < cutoff) continue;
    items.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      title: post.title,
      publishedAt: published,
    });
  }

  // Pull research articles published in the last 48 hours
  for (const article of RESEARCH_ARTICLES) {
    const published = safeDate(article.publishedDate);
    if (!published) continue;
    if (published < cutoff) continue;
    items.push({
      url: `${BASE_URL}/research/${article.slug}`,
      title: article.title,
      publishedAt: published,
    });
  }

  // Sort newest first
  items.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const itemXml = items
    .map(
      (it) => `
  <url>
    <loc>${escapeXml(it.url)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(PUBLICATION_NAME)}</news:name>
        <news:language>${PUBLICATION_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${it.publishedAt.toISOString()}</news:publication_date>
      <news:title>${escapeXml(it.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${itemXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache for 10 minutes — news content matters that fresh news
      // surfaces fast, but we don't want to hammer the data layer
      // every time Googlebot checks.
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
