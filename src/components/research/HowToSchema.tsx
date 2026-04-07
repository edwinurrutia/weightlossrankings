import JsonLd from "@/components/shared/JsonLd";

export interface HowToStep {
  /** Step title — short, imperative ("Wash your hands"). */
  name: string;
  /**
   * Plain-text instructions for the step. Google's HowTo SERP card
   * renders this as the body of each step. Keep it under ~200
   * characters per step for best rendering.
   */
  text: string;
}

interface HowToSchemaProps {
  /** The how-to title — typically the article H1 or a sub-section H2. */
  name: string;
  /** A one-sentence description of what the user will accomplish. */
  description: string;
  /** Steps in order. Each must correspond to visible content on the page. */
  steps: HowToStep[];
  /** Optional total time estimate in ISO 8601 duration format (e.g. "PT5M" for 5 minutes). */
  totalTime?: string;
  /** Optional URL of the article so Google can link from the SERP card. */
  url?: string;
  /** Optional image URL for the SERP card hero. */
  image?: string;
}

/**
 * Emits HowTo JSON-LD for an article. Google renders HowTo as an
 * expanded step-by-step rich result with visible numbered steps in
 * the SERP itself — one of the highest-CTR organic enhancements
 * available for procedural content.
 *
 * Best practice: every HowTo step must correspond to actual visible
 * content on the page (Google penalizes hidden HowTo schema). The
 * existing H3 step headings + their first paragraph make perfect
 * source material.
 */
export default function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  url,
  image,
}: HowToSchemaProps) {
  if (!steps || steps.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return <JsonLd data={schema} />;
}
