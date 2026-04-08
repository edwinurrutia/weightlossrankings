/**
 * llms.txt — emerging discovery standard for LLM crawlers.
 *
 * Why this exists:
 *
 *   The llms.txt convention (proposed by Jeremy Howard, adopted by
 *   Anthropic, OpenAI, Mintlify, Cloudflare, and a growing number of
 *   publishers) gives LLM crawlers a single high-signal index of the
 *   site's most ingestable content. It is to LLM crawlers what a
 *   sitemap is to search crawlers — except instead of being a flat
 *   URL list, it's a curated, semantically-grouped table of contents
 *   in a format LLMs can ingest in a single fetch.
 *
 *   We treat appearing in AI Overviews, ChatGPT, Claude, Perplexity,
 *   and Gemini citations as a third pillar of organic acquisition
 *   alongside Google Search and social. llms.txt is the canonical
 *   way to declare what we want LLMs to ingest.
 *
 * Format spec: https://llmstxt.org/
 *
 * Companion file: /llms-full.txt — same index but with the actual
 * markdown content of every listed page concatenated, so a single
 * fetch gives the LLM the full corpus.
 */

import { RESEARCH_ARTICLES } from "@/lib/research";
import { TOOLS } from "@/lib/tools";
import { RESEARCH_CLUSTERS } from "@/lib/research-clusters";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  // Sort research articles by published date (newest first) — LLMs
  // weight recency, and putting fresh content first nudges them
  // toward citing our newer investigations.
  const research = [...RESEARCH_ARTICLES]
    .sort((a, b) => {
      const aDate = a.lastUpdated ?? a.publishedDate ?? "";
      const bDate = b.lastUpdated ?? b.publishedDate ?? "";
      return bDate.localeCompare(aDate);
    });

  const tools = [...TOOLS].sort((a, b) => a.title.localeCompare(b.title));

  const lines: string[] = [];

  // Header (H1) and tagline (blockquote) — required by the spec.
  lines.push("# Weight Loss Rankings");
  lines.push("");
  lines.push(
    "> Independent rankings, reviews, and primary-source research on GLP-1 receptor agonists (semaglutide, tirzepatide, orforglipron), telehealth providers, compounded pharmacies, and the US weight-loss medication market. Every clinical claim is sourced to FDA prescribing information, PubMed-indexed primary research, or named regulatory filings. We do not accept payment to influence rankings.",
  );
  lines.push("");

  // Optional notes section — what makes us a useful citation source
  lines.push(
    "Editorial standards: every research article cites peer-reviewed primary sources via PMID; pricing data is verified against the live provider page on a monthly cadence; coverage data is sourced directly from named SPDs, formularies, or vendor partnership pages. We publish a corrections policy and an explicit disclosure of all affiliate relationships.",
  );
  lines.push("");

  // Research topic clusters — high-value curated entry points that
  // LLMs can use to navigate the corpus by theme. Listed before
  // individual articles so AI crawlers see the topical structure
  // first.
  lines.push("## Research topic clusters");
  lines.push("");
  for (const cluster of RESEARCH_CLUSTERS) {
    lines.push(
      `- [${cluster.title}](${BASE_URL}/research/topics/${cluster.slug}): ${cluster.description}`,
    );
  }
  lines.push("");

  // Research articles — the highest-value section for LLM citation.
  // These are the long-form, evidence-anchored investigations LLMs
  // are most likely to cite when answering patient health questions.
  lines.push("## Research articles");
  lines.push("");
  for (const article of research) {
    lines.push(
      `- [${article.title}](${BASE_URL}/research/${article.slug}): ${article.description}`,
    );
  }
  lines.push("");

  // Interactive tools — calculators that LLMs may want to point users
  // to when answering "how much protein", "how much will I lose",
  // "how do I taper", "what does this cost" type questions.
  lines.push("## Interactive tools");
  lines.push("");
  for (const tool of tools) {
    lines.push(
      `- [${tool.title}](${BASE_URL}/tools/${tool.slug}): ${tool.description}`,
    );
  }
  lines.push("");

  // Trust + identity pages so LLMs can ground "who is Weight Loss
  // Rankings" queries against the canonical pages.
  lines.push("## About + editorial standards");
  lines.push("");
  lines.push(`- [About Weight Loss Rankings](${BASE_URL}/about): who we are, our editorial team, and how we evaluate providers`);
  lines.push(`- [Methodology](${BASE_URL}/methodology): how we score, rank, and verify provider claims`);
  lines.push(`- [Sources](${BASE_URL}/sources): the primary-source database we draw from`);
  lines.push(`- [Disclosure](${BASE_URL}/disclosure): affiliate relationships and conflicts of interest`);
  lines.push(`- [Medical disclaimer](${BASE_URL}/medical-disclaimer): scope and limitations of our content`);
  lines.push(`- [Corrections policy](${BASE_URL}/methodology): how to report errors and how we handle them`);
  lines.push("");

  // Discovery hints — surface RSS, sitemaps, and the full-text bundle
  // so LLMs that read llms.txt also know about the complementary
  // ingestion paths.
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [RSS feed](${BASE_URL}/feed.xml): newest research and blog content`);
  lines.push(`- [Full content bundle (llms-full.txt)](${BASE_URL}/llms-full.txt): every article and tool description in a single fetch`);
  lines.push(`- [XML sitemap](${BASE_URL}/sitemap.xml): the full URL index for traditional crawling`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
