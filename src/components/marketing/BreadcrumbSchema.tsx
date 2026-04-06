import JsonLd from "@/components/shared/JsonLd";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  /**
   * Base URL prepended to relative `url` paths. Defaults to the canonical
   * production origin.
   */
  baseUrl?: string;
}

/**
 * Renders a BreadcrumbList JSON-LD blob. Pages should pass the trail in
 * order, e.g. `[{name: "Home", url: "/"}, {name: "Reviews", url: "/reviews"}, {name: "Ro"}]`.
 *
 * Items without a `url` are still emitted (as the leaf), but only items with
 * a url get an `item` property — matching prior hand-rolled schemas.
 */
export default function BreadcrumbSchema({
  items,
  baseUrl = "https://weightlossrankings.org",
}: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
      };
      if (item.url) {
        const fullUrl = item.url.startsWith("http")
          ? item.url
          : `${baseUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`;
        entry.item = fullUrl;
      }
      return entry;
    }),
  };

  return <JsonLd data={data} />;
}
