import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Re-export pattern: the article body lives at the original
// /research/mounjaro-vs-ozempic-diabetes-surpass-2 location. This
// file is the canonical URL under /es/research/, with metadata
// overridden to point canonical and hreflang at the right places.
// The old /research/ URL is 301-redirected via next.config.mjs.
export { default } from "@/app/research/mounjaro-vs-ozempic-diabetes-surpass-2/page";

const SLUG = "mounjaro-vs-ozempic-diabetes-surpass-2";
// No dedicated English head-to-head article yet in the corpus;
// pointing at the closest topical counterpart.
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
