import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Canonical URL for the Spanish injection technique guide is
// /es/research/como-inyectar-semaglutida-guia-paso-a-paso. The
// article body lives at /research/como-inyectar-... (following
// the same pattern as the other Spanish articles on the site) and
// is re-exported here so Next.js renders it at the /es/research/
// canonical path. next.config.mjs has a 301 redirect from the
// legacy /research/ path to this canonical /es/research/ URL.
//
// Article clinical claims have been verified by two independent
// background agents (FDA-label verifier + native-speaker linguistic
// review) per the YMYL 125% accuracy rule. See commit message for
// verification trail.

export { default } from "@/app/research/como-inyectar-semaglutida-guia-paso-a-paso/page";

const SLUG = "como-inyectar-semaglutida-guia-paso-a-paso";
const ENGLISH_COUNTERPART = "how-to-inject-glp1-step-by-step-technique";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/es/research/${SLUG}`,
      languages: {
        "en-US": `/research/${ENGLISH_COUNTERPART}`,
        es: `/es/research/${SLUG}`,
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
