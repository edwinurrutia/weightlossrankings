import type { Metadata } from "next";
import { getResearchArticleBySlug } from "@/lib/research";

// Canonical URL for the Spanish Ozempic pricing guide is
// /es/research/ozempic-precio-costo-comprar. The article body
// lives at /research/ozempic-precio-costo-comprar (following the
// same pattern as the other Spanish articles on the site) and is
// re-exported here so Next.js renders it at the /es/research/
// canonical path. next.config.mjs has a 301 redirect from the
// legacy /research/ path to this canonical /es/research/ URL.
//
// All pricing claims verified by two independent background agents
// (pricing + FDA verifier + native-speaker linguistic review) per
// the YMYL 125% accuracy rule. See commit message for verification
// trail. Pricing data reflects March-August 2025 Novo Nordisk
// updates and the December 2025 FDA counterfeit Ozempic warning.

export { default } from "@/app/research/ozempic-precio-costo-comprar/page";

const SLUG = "ozempic-precio-costo-comprar";
const ENGLISH_COUNTERPART = "where-to-buy-semaglutide";

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
