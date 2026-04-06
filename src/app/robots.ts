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
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
