import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Re-export pattern: the article body lives at the original
// /research/rybelsus-semaglutida-oral-que-es location. This file
// is the canonical URL under /es/research/, with metadata
// overridden to point canonical and hreflang at the right places.
// The old /research/ URL is 301-redirected via next.config.mjs.
export { default } from "@/app/research/rybelsus-semaglutida-oral-que-es/page";

const SLUG = "rybelsus-semaglutida-oral-que-es";
// There is no dedicated English counterpart article yet; point
// hreflang at the /drugs/semaglutide drug guide as the closest
// topical match.
const ENGLISH_COUNTERPART = "drugs/semaglutide";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/es/research/${SLUG}`,
      languages: {
        "en-US": `/${ENGLISH_COUNTERPART}`,
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
