import FaqAccordion from "@/components/shared/FaqAccordion";

interface FAQSectionProps {
  items: Array<{ question: string; answer: string }>;
  title?: string;
  id?: string;
}

/**
 * Wraps FaqAccordion (which already emits FAQPage JSON-LD) with a standard
 * H2 heading. Use this anywhere you'd previously hand-rolled the FAQ section.
 */
export default function FAQSection({
  items,
  title = "Frequently Asked Questions",
  id = "faq-heading",
}: FAQSectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="text-xl font-bold text-brand-text-primary">
        {title}
      </h2>
      <FaqAccordion items={items} />
    </section>
  );
}
