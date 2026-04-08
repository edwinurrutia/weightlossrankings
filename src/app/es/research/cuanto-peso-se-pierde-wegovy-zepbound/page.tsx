import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Re-export pattern: the article body lives at the original
// /research/cuanto-peso-se-pierde-wegovy-zepbound location. This
// file is the canonical URL under /es/research/, with metadata
// overridden to point canonical and hreflang at the right places.
// The old /research/ URL is 301-redirected via next.config.mjs.
export { default } from "@/app/research/cuanto-peso-se-pierde-wegovy-zepbound/page";

const SLUG = "cuanto-peso-se-pierde-wegovy-zepbound";
// There is no single English counterpart — closest topical match is
// the weight-loss calculator tool, which surfaces the same STEP-1
// and SURMOUNT-1 numbers interactively.
const ENGLISH_COUNTERPART = "glp1-weight-loss-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/es/research/${SLUG}`,
      languages: {
        "en-US": `/tools/${ENGLISH_COUNTERPART}`,
        "es-US": `/es/research/${SLUG}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      locale: "es_US",
      publishedTime: article.publishedDate,
    },
  };
}
