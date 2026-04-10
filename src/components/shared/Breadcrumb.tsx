import Link from "next/link";

export interface BreadcrumbItem {
  /** Display label for this segment. The current page (last item)
   *  is rendered as plain text, not a link, per Google's BreadcrumbList
   *  guidance. */
  label: string;
  /** Absolute or root-relative href. Required for every segment
   *  except the current page (last item) where it can be omitted. */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Visible HTML breadcrumb navigation rendered above the page H1 on
 * every detail page (reviews, research, drugs, states, pharmacies,
 * authors, best/category).
 *
 * Why this exists in code rather than per-page markup:
 *
 *   We already emit BreadcrumbList JSON-LD on detail pages, but
 *   that's invisible to users — it only feeds Google's rich-result
 *   carousel. Visible breadcrumbs serve THREE different purposes
 *   the JSON-LD doesn't:
 *
 *     1. Internal-link distribution: every breadcrumb is an actual
 *        anchor tag in the DOM, distributing PageRank up the
 *        hierarchy on every page view. Hub pages (like /reviews,
 *        /research, /states) get backlinks from every detail page
 *        below them just from the breadcrumb trail, no manual link
 *        management required.
 *
 *     2. UX/CTR: breadcrumbs are a Nielsen-Norman-documented
 *        navigation pattern that reduces bounce rate and increases
 *        pages-per-session. Users landing from a SERP query on a
 *        long-tail page can orient themselves and explore upward.
 *
 *     3. Crawl-budget signaling: visible nav links tell Google's
 *        crawler that the parent pages are "important" relative to
 *        the leaf, which improves how often parents get re-crawled
 *        for content updates.
 *
 *   The component should ALWAYS be paired with BreadcrumbSchema
 *   (the JSON-LD emitter) on the same page so the visible
 *   breadcrumb and the structured data agree. There's nothing in
 *   the type system enforcing this — be careful at call sites.
 */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-brand-text-secondary mb-6 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-violet transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-text-primary font-medium" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="text-brand-text-secondary/40" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
