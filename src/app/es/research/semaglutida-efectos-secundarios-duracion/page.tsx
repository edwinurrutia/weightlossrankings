import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Re-export pattern: the article body lives at the original
// /research/semaglutida-efectos-secundarios-duracion location.
// This file is the canonical URL under /es/research/, with metadata
// overridden to point canonical and hreflang at the right places.
// The old /research/ URL is 301-redirected via next.config.mjs.
export { default } from "@/app/research/semaglutida-efectos-secundarios-duracion/page";

const SLUG = "semaglutida-efectos-secundarios-duracion";
const ENGLISH_COUNTERPART = "glp1-side-effects-fatigue-hair-loss-duration";

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
