import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/api/track-click",
          "/admin",
          "/admin/",
          // Affiliate redirect endpoint — server-side 302 to provider
          // sites. Crawlers should never follow these (they're not
          // content) and indexing them would burn crawl budget on
          // 80+ links that resolve to off-site URLs.
          "/go/",
        ],
      },
    ],
    // Two sitemaps: the regular full sitemap for general crawl, and
    // the news-specific sitemap that only contains content from the
    // last 48 hours for Google News / Discover ingestion. Listing
    // both here lets Googlebot discover them on its own. The RSS
    // feed at /feed.xml is auto-discovered via the
    // <link rel="alternate"> in src/app/layout.tsx.
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/news-sitemap.xml`],
  };
}
