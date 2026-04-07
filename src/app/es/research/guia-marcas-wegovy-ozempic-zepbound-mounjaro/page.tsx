import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Re-export pattern: the article body lives at the original
// /research/guia-marcas-wegovy-ozempic-zepbound-mounjaro location.
// This file is the new canonical URL under /es/research/, with the
// metadata overridden to point canonical and hreflang at the right
// places. The old /research/ URL is 301-redirected via next.config.mjs.
export { default } from "@/app/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro/page";

const SLUG = "guia-marcas-wegovy-ozempic-zepbound-mounjaro";
const ENGLISH_COUNTERPART = "wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet";

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
