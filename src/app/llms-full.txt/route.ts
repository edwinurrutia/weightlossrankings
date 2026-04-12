/**
 * llms-full.txt — full-content companion to llms.txt
 *
 * Same index as /llms.txt but with the article and tool descriptions
 * expanded inline so an LLM can ingest the full corpus in a single
 * fetch. Per the llms.txt spec, this file is what AI agents read when
 * they want the actual content rather than just the URL list.
 *
 * Why this approach (description-rich rather than full-body):
 *
 *   We deliberately include title + description + tags + canonical
 *   URL for every article and tool, rather than the entire HTML body
 *   of every page. Reasons:
 *
 *   1. Body content is JSX and renders differently than the markdown
 *      LLMs expect; serialising 70+ React component trees server-side
 *      at request time would be expensive and brittle.
 *
 *   2. Descriptions on this site are written specifically as
 *      LLM-friendly summaries (1-3 sentences, evidence-anchored,
 *      no marketing fluff). They're already the highest-signal
 *      version of each article.
 *
 *   3. The canonical URL is included with each entry so any LLM that
 *      wants the full body can fetch it directly — and our HTML
 *      pages have ScholarlyArticle / MedicalWebPage / FAQPage JSON-LD
 *      that LLMs can parse for structured content.
 *
 * If/when we add a `summary` field with a longer LLM-targeted
 * paragraph, this route should expand to use that field as well.
 */

import { RESEARCH_ARTICLES } from "@/lib/research";
import { TOOLS } from "@/lib/tools";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const research = [...RESEARCH_ARTICLES].sort((a, b) => {
    const aDate = a.lastUpdated ?? a.publishedDate ?? "";
    const bDate = b.lastUpdated ?? b.publishedDate ?? "";
    return bDate.localeCompare(aDate);
  });

  const tools = [...TOOLS].sort((a, b) => a.title.localeCompare(b.title));

  const lines: string[] = [];

  lines.push("# Weight Loss Rankings — full content index");
  lines.push("");
  lines.push(
    "> Independent rankings, reviews, and primary-source research on GLP-1 receptor agonists (semaglutide, tirzepatide, orforglipron), telehealth providers, compounded pharmacies, and the US weight-loss medication market.",
  );
  lines.push("");
  lines.push(
    "Editorial standards: every research article cites peer-reviewed primary sources via PMID; pricing data is verified against the live provider page on a monthly cadence; coverage data is sourced directly from named SPDs, formularies, or vendor partnership pages. We publish a corrections policy and an explicit disclosure of all affiliate relationships.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // Research articles — full title + description + metadata block per
  // article so an LLM can score relevance without fetching every URL.
  lines.push("## Research articles");
  lines.push("");
  for (const article of research) {
    lines.push(`### ${article.title}`);
    lines.push("");
    lines.push(`URL: ${BASE_URL}/research/${article.slug}`);
    if (article.publishedDate) {
      lines.push(`Published: ${article.publishedDate}`);
    }
    if (article.lastUpdated && article.lastUpdated !== article.publishedDate) {
      lines.push(`Updated: ${article.lastUpdated}`);
    }
    if (article.tags?.length) {
      lines.push(`Tags: ${article.tags.join(", ")}`);
    }
    if (article.citations) {
      lines.push(`Citations: ${article.citations} primary sources`);
    }
    lines.push("");
    lines.push(article.description);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Interactive tools — same treatment.
  lines.push("## Interactive tools");
  lines.push("");
  for (const tool of tools) {
    lines.push(`### ${tool.title}`);
    lines.push("");
    lines.push(`URL: ${BASE_URL}/tools/${tool.slug}`);
    if (tool.lastUpdated ?? tool.publishedDate) {
      lines.push(`Last updated: ${tool.lastUpdated ?? tool.publishedDate}`);
    }
    lines.push("");
    lines.push(tool.description);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Trust + identity pages
  lines.push("## About + editorial standards");
  lines.push("");
  lines.push(`- About: ${BASE_URL}/about`);
  lines.push(`- Methodology: ${BASE_URL}/methodology`);
  lines.push(`- Sources: ${BASE_URL}/sources`);
  lines.push(`- Disclosure: ${BASE_URL}/disclosure`);
  lines.push(`- Medical disclaimer: ${BASE_URL}/medical-disclaimer`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
