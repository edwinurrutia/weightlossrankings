import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Re-export the article body from the original /research tree. The
// canonical URL for this Spanish guide now lives at
// /es/research/tirzepatide-para-que-sirve, with a 301 redirect from
// the old /research/ path configured in next.config.mjs.
export { default } from "@/app/research/tirzepatide-para-que-sirve/page";

const SLUG = "tirzepatide-para-que-sirve";
const ENGLISH_COUNTERPART = "tirzepatide-vs-semaglutide-head-to-head";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/es/research/${SLUG}`,
      languages: {
        "en-US": `/research/${ENGLISH_COUNTERPART}`,
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
