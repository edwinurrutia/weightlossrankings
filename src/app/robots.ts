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
    // Three sitemaps:
    //   /sitemap.xml         general crawl + indexing
    //   /news-sitemap.xml    Google News + Top Stories + Discover
    //                        (last 48 hours of editorial content)
    //   /sitemap-images.xml  Image Search ingestion (one entry per
    //                        per-route OG image with caption + title)
    // The RSS feed at /feed.xml is auto-discovered separately via
    // the <link rel="alternate"> in src/app/layout.tsx.
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/news-sitemap.xml`,
      `${BASE_URL}/sitemap-images.xml`,
    ],
  };
}
