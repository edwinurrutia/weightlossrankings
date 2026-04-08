import type { Metadata } from "next";
import Link from "next/link";
import { SAVINGS_COMPARISONS } from "@/lib/savings-comparisons";
import JsonLd from "@/components/shared/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const metadata: Metadata = {
  title: "Brand-vs-Compounded GLP-1 Savings — Wegovy, Ozempic, Zepbound, Mounjaro",
  description:
    "Side-by-side cost comparisons between brand-name GLP-1 pens (Wegovy, Ozempic, Zepbound, Mounjaro) and compounded telehealth alternatives. See your potential monthly and annual savings.",
  alternates: { canonical: "/savings" },
  openGraph: {
    title: "Brand-vs-Compounded GLP-1 Savings",
    description:
      "How much does brand-name Wegovy/Zepbound cost vs compounded — and what is your real annual savings?",
    type: "website",
    url: "/savings",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary_large_image" },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Brand-vs-Compounded GLP-1 Savings",
  description:
    "Side-by-side cost comparisons between brand-name GLP-1 pens and compounded telehealth alternatives.",
  url: `${SITE_URL}/savings`,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "Weight Loss Rankings",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SAVINGS_COMPARISONS.length,
    itemListElement: SAVINGS_COMPARISONS.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/savings/${c.slug}`,
      name: `${c.brand_name} vs Compounded ${c.generic_name}`,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Savings", item: `${SITE_URL}/savings` },
  ],
};

export default function SavingsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Cost comparison
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          Brand-vs-compounded GLP-1 savings
        </h1>
        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
          Side-by-side cost comparisons between the four brand-name GLP-1
          pens (Wegovy, Ozempic, Zepbound, Mounjaro) and the compounded
          telehealth alternatives that dispense the same active
          ingredient at a fraction of the price.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SAVINGS_COMPARISONS.map((c) => (
          <Link
            key={c.slug}
            href={`/savings/${c.slug}`}
            className="block rounded-2xl border border-brand-violet/15 bg-white p-6 hover:border-brand-violet/40 hover:shadow-md transition-all"
          >
            <h2 className="font-heading text-lg font-bold text-brand-text-primary leading-tight mb-2">
              {c.brand_name} vs compounded {c.generic_name}
            </h2>
            <p className="text-brand-text-secondary text-sm leading-relaxed mb-3">
              {c.brand_name} list price: $
              {c.brand_monthly_price.toLocaleString()}/month for {c.brand_indication}.
            </p>
            <p className="text-xs text-brand-violet font-semibold">
              See full comparison →
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
