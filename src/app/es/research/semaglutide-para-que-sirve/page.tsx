import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// The article body is identical to the original Spanish-tree page that
// lived under /research/semaglutide-para-que-sirve. We re-export the
// default component here so the article renders at its new canonical
// URL /es/research/semaglutide-para-que-sirve. The old URL is 301
// redirected via next.config.mjs.
//
// We DO override generateMetadata to point canonical at the new /es/
// URL and to emit the correct hreflang alternates pairing this page
// with its English counterpart.
export { default } from "@/app/research/semaglutide-para-que-sirve/page";

const SLUG = "semaglutide-para-que-sirve";
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
