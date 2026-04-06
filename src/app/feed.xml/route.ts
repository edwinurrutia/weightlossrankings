/**
 * RSS 2.0 feed for blog posts and research articles.
 *
 * Why this exists:
 *
 *   1. Google News + Discover ingestion. Google explicitly uses RSS
 *      feeds (alongside news sitemaps) as a discovery and freshness
 *      signal for news / editorial content. Without a feed, every
 *      new article waits for the next crawl cycle to be discovered.
 *
 *   2. Apple News inclusion. Apple News will not consider a
 *      publication for inclusion without a valid RSS feed.
 *
 *   3. AI crawler ingestion. Perplexity, ChatGPT (Bing), Claude
 *      (Anthropic crawler), and Common Crawl all prefer RSS feeds
 *      over crawling individual HTML pages because feeds are stable,
 *      structured, and explicitly mark fresh content. Showing up in
 *      AI Overviews / chatbot citations is increasingly the third
 *      pillar of organic traffic alongside Google Search and
 *      social.
 *
 *   4. Newsreaders and aggregators. Feedly, Inoreader, NetNewsWire,
 *      Substack, and IndieHackers all ingest RSS. Power-user
 *      audience that converts well.
 *
 * Format: RSS 2.0 with `<atom:link rel="self">` self-reference and
 * proper RFC 822 dates. Items are blog posts + research articles
 * sorted newest-first, capped at 50 items (anything older is still
 * available via the sitemap and individual URLs).
 */

import { getAllBlogPosts } from "@/lib/data";
import { RESEARCH_ARTICLES } from "@/lib/research";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

const SITE_TITLE = "Weight Loss Rankings";
const SITE_DESCRIPTION =
  "Independent rankings, reviews, and data investigations on GLP-1 telehealth providers, compounded semaglutide and tirzepatide, and the weight loss telehealth market.";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  guid: string;
  category?: string;
  author?: string;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: Date): string {
  // RSS 2.0 requires RFC 822 dates: "Mon, 06 Apr 2026 15:00:00 GMT"
  return date.toUTCString();
}

function safeDate(iso: string | undefined | null): Date {
  if (!iso) return new Date();
  const d = new Date(iso);
  return isNaN(d.getTime()) ? new Date() : d;
}

export async function GET() {
  // Pull blog posts
  const posts = await getAllBlogPosts();
  const blogItems: FeedItem[] = posts.map((p) => ({
    title: p.title,
    link: `${BASE_URL}/blog/${p.slug}`,
    description: p.excerpt,
    pubDate: safeDate(p.updated_date ?? p.published_date),
    guid: `${BASE_URL}/blog/${p.slug}`,
    category: p.category,
    author: p.author,
  }));

  // Pull research articles
  const researchItems: FeedItem[] = RESEARCH_ARTICLES.map((a) => ({
    title: a.title,
    link: `${BASE_URL}/research/${a.slug}`,
    description: a.description,
    pubDate: safeDate(a.publishedDate),
    guid: `${BASE_URL}/research/${a.slug}`,
    category: a.kind === "data-investigation" ? "Data Investigation" : "Research",
  }));

  // Merge, sort newest first, cap at 50
  const items = [...blogItems, ...researchItems]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 50);

  const lastBuildDate = items.length > 0 ? items[0].pubDate : new Date();

  const itemXml = items
    .map(
      (it) => `
    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${escapeXml(it.link)}</link>
      <guid isPermaLink="true">${escapeXml(it.guid)}</guid>
      <pubDate>${rfc822(it.pubDate)}</pubDate>
      <description>${escapeXml(it.description)}</description>${
        it.category ? `\n      <category>${escapeXml(it.category)}</category>` : ""
      }${
        it.author
          ? `\n      <dc:creator><![CDATA[${it.author}]]></dc:creator>`
          : ""
      }
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${rfc822(lastBuildDate)}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Next.js RSS feed</generator>${itemXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
