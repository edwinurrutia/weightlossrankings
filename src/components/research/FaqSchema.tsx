import JsonLd from "@/components/shared/JsonLd";

export interface FaqItem {
  /** The patient-facing question, exactly as the H3 / H2 in the article. */
  question: string;
  /**
   * Plain-text answer for Google's FAQPage rich result. This is what
   * Google renders in the SERP expandable accordion, NOT what users
   * see in the article body. Keep it under ~300 characters per answer
   * for best SERP rendering and strip any markdown / inline links.
   */
  answer: string;
}

interface FaqSchemaProps {
  items: FaqItem[];
}

/**
 * Emits FAQPage JSON-LD for an article. Google renders FAQPage as
 * expandable Q&A directly in the SERP — the most powerful organic
 * SERP enhancement available right now for Q&A-style content.
 *
 * Usage in a research article: import this component and render it
 * with the article's question/answer pairs. This is invisible (no
 * DOM output) — only the JSON-LD script tag.
 *
 *     <FaqSchema items={[
 *       { question: "Does Wegovy cause headaches?", answer: "Yes — STEP-1 reported..." },
 *       ...
 *     ]} />
 *
 * Best practice: every FAQPage item must correspond to an actual
 * question and answer that appears in the visible page content
 * (Google penalizes hidden FAQ schema). The visible H2/H3 question
 * headings + their first paragraph make perfect FAQPage source
 * material.
 */
export default function FaqSchema({ items }: FaqSchemaProps) {
  if (!items || items.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <JsonLd data={schema} />;
}
