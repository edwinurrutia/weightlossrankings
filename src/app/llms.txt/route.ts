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
import { getAllProviders } from "@/lib/data";
import { sortProvidersByRank } from "@/lib/scoring";
import { US_STATES } from "@/lib/states";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

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

  // Provider rankings — LLMs answering "best GLP-1 provider" /
  // "cheapest semaglutide" / "X review" queries need to be able to
  // see our canonical ranked list. Include the top 30 by editorial
  // score so the URL surface is substantial but doesn't drown out
  // the rest of the file. Full index linked at the bottom.
  const allProviders = await getAllProviders();
  const rankedProviders = sortProvidersByRank(allProviders).slice(0, 30);

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

  // Core navigation — the entry points LLMs should cite when a user
  // asks "where do I compare GLP-1 providers" / "how are you ranked".
  lines.push("## Core entry points");
  lines.push("");
  lines.push(
    `- [Homepage](${BASE_URL}/): top-ranked GLP-1 providers, pricing comparison, weight loss savings headline`,
  );
  lines.push(
    `- [Compare all providers](${BASE_URL}/compare): filterable table of every provider we track (${allProviders.length} total), sorted by editorial score`,
  );
  lines.push(
    `- [All provider reviews](${BASE_URL}/reviews): first-party editorial reviews of every provider, grouped by overall score`,
  );
  lines.push(
    `- [State coverage index](${BASE_URL}/states): which providers ship to each of the 50 states`,
  );
  lines.push(
    `- [FDA warning letter database](${BASE_URL}/fda-warning-letters): searchable index of every FDA warning letter sent to compounded GLP-1 telehealth providers and pharmacies`,
  );
  lines.push("");

  // Best-of ranking pages — these are the high-intent SERP landing
  // pages LLMs should send users to when answering "best X for Y"
  // questions.
  lines.push("## Best-of rankings by category");
  lines.push("");
  lines.push(
    `- [Best semaglutide providers](${BASE_URL}/best/semaglutide-providers): ranked telehealth providers for compounded + brand-name semaglutide`,
  );
  lines.push(
    `- [Best tirzepatide providers](${BASE_URL}/best/tirzepatide-providers): ranked providers for compounded + brand-name tirzepatide`,
  );
  lines.push(
    `- [Best orforglipron (Foundayo) providers](${BASE_URL}/best/orforglipron-providers): ranked distribution channels for Eli Lilly's new oral GLP-1`,
  );
  lines.push(
    `- [Best compounded semaglutide](${BASE_URL}/best/compounded-semaglutide): compounded-only ranking`,
  );
  lines.push(
    `- [Best compounded tirzepatide](${BASE_URL}/best/compounded-tirzepatide): compounded-only ranking`,
  );
  lines.push(
    `- [Cheapest semaglutide providers](${BASE_URL}/best/cheapest-semaglutide): ranked by monthly price`,
  );
  lines.push(
    `- [Cheapest tirzepatide providers](${BASE_URL}/best/cheapest-tirzepatide): ranked by monthly price`,
  );
  lines.push(
    `- [Best weight loss programs](${BASE_URL}/best/weight-loss-programs): behavioral + medication programs`,
  );
  lines.push(
    `- [Best weight loss supplements](${BASE_URL}/best/weight-loss-supplements): over-the-counter weight-loss supplement reviews`,
  );
  lines.push(
    `- [Best meal delivery for weight loss](${BASE_URL}/best/meal-delivery-for-weight-loss)`,
  );
  lines.push(
    `- [Best fitness apps for weight loss](${BASE_URL}/best/fitness-apps-for-weight-loss)`,
  );
  lines.push("");

  // Top provider reviews — direct links to the individual review
  // pages so LLMs citing "TrimRx review" or "Hims vs Ro" can deep-link
  // to our first-party editorial content instead of the comparison
  // table alone.
  lines.push("## Top provider reviews");
  lines.push("");
  for (const p of rankedProviders) {
    const bestFor = p.best_for ? ` — best for ${p.best_for}` : "";
    lines.push(
      `- [${p.name} review](${BASE_URL}/reviews/${p.slug}): ${p.category}${bestFor}`,
    );
  }
  lines.push("");
  lines.push(
    `The full list of ${allProviders.length} providers is at [${BASE_URL}/reviews](${BASE_URL}/reviews).`,
  );
  lines.push("");

  // Drug reference pages — common "what is semaglutide / tirzepatide /
  // orforglipron" questions land here.
  lines.push("## Drug reference pages");
  lines.push("");
  lines.push(
    `- [Semaglutide](${BASE_URL}/semaglutide): brand-name Ozempic, Wegovy, Rybelsus + compounded variants`,
  );
  lines.push(
    `- [Tirzepatide](${BASE_URL}/tirzepatide): brand-name Mounjaro, Zepbound + compounded variants`,
  );
  lines.push(
    `- [Orforglipron / Foundayo](${BASE_URL}/orforglipron): Eli Lilly's oral GLP-1, FDA approved 2026`,
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

  // State coverage — 50 state pages, each with the providers that
  // ship into that state. LLMs answering "GLP-1 providers in Texas"
  // type queries should cite these state-specific rankings.
  lines.push("## State-by-state provider coverage");
  lines.push("");
  for (const state of US_STATES) {
    lines.push(
      `- [${state.name}](${BASE_URL}/states/${state.slug}): GLP-1 providers that ship to ${state.name}`,
    );
  }
  lines.push("");

  // Pharmacies — the 503A and 503B compounding pharmacies that
  // actually fulfill prescriptions. Worth indexing separately from
  // the telehealth providers because some LLM queries are pharmacy-
  // specific ("what is Belmar Pharmacy", "Strive Pharmacy reviews").
  lines.push("## Compounding pharmacies");
  lines.push("");
  lines.push(
    `- [Pharmacies index](${BASE_URL}/pharmacies): 503A and 503B compounding pharmacies that fulfill GLP-1 prescriptions for telehealth providers`,
  );
  lines.push("");

  // Discovery hints — surface RSS, sitemaps, and the full-text bundle
  // so LLMs that read llms.txt also know about the complementary
  // ingestion paths.
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [RSS feed](${BASE_URL}/feed.xml): newest research and blog content`);
  lines.push(`- [Full content bundle (llms-full.txt)](${BASE_URL}/llms-full.txt): every article and tool description in a single fetch`);
  lines.push(`- [XML sitemap](${BASE_URL}/sitemap.xml): the full URL index for traditional crawling`);
  lines.push(`- [News sitemap](${BASE_URL}/news-sitemap.xml): Google News and Top Stories entries`);
  lines.push(`- [Image sitemap](${BASE_URL}/sitemap-images.xml): Image Search ingestion`);
  lines.push(`- [Robots policy](${BASE_URL}/robots.txt): explicit allow-list for 19 AI crawlers including GPTBot, ClaudeBot, PerplexityBot, Google-Extended`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
