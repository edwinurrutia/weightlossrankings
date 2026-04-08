import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

// AI / LLM crawlers we want to ALLOW explicitly. Reason for being
// explicit even though `userAgent: "*"` already allows them: many
// publishers default-block these bots to opt out of AI training,
// so AI vendors look for explicit allow rules to confirm intent.
// Being explicit also makes it visible in code review when we
// change our policy. We treat AI Overviews / ChatGPT / Claude /
// Perplexity / Gemini citations as a third pillar of organic
// acquisition alongside Google Search and social, so we want to
// be in their training and retrieval indexes.
//
// Sources for the canonical bot names:
//   GPTBot:           OpenAI training crawler
//                     https://platform.openai.com/docs/gptbot
//   OAI-SearchBot:    OpenAI / ChatGPT search retrieval crawler
//                     https://platform.openai.com/docs/bots
//   ChatGPT-User:     OpenAI on-demand fetch when a user clicks a link
//   ClaudeBot:        Anthropic training + retrieval crawler
//                     https://support.anthropic.com/en/articles/8896518
//   anthropic-ai:     legacy Anthropic crawler name
//   PerplexityBot:    Perplexity retrieval crawler
//                     https://docs.perplexity.ai/docs/perplexitybot
//   Perplexity-User:  Perplexity on-demand user fetch
//   Google-Extended:  Google's AI training opt-out flag (Bard/Gemini)
//                     https://blog.google/technology/ai/an-update-on-web-publisher-controls/
//                     We ALLOW it because we want to be cited in
//                     Gemini and Google AI Overviews.
//   Applebot-Extended: Apple Intelligence training crawler
//   CCBot:            Common Crawl (feeds many open-source LLMs)
//   Bytespider:       ByteDance / Doubao crawler
//   Meta-ExternalAgent: Meta AI training/retrieval crawler
//   cohere-ai:        Cohere training crawler
//   Diffbot:          Diffbot knowledge graph crawler (cited by many AI tools)
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "Diffbot",
  "DuckAssistBot",
  "YouBot",
  "Amazonbot",
];

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
      // Explicit AI-crawler allow rules. Each bot gets its own rule
      // so the policy is grep-able and any future opt-out is a
      // single-line change.
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/", "/admin/", "/go/"],
      })),
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
