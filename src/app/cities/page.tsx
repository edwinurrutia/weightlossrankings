import type { Metadata } from "next";
import Link from "next/link";
import { getAllCities } from "@/lib/cities";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "GLP-1 Providers by City — Browse 20 Largest US Cities",
  description:
    "Find GLP-1 weight loss providers and compounded semaglutide options in the 20 largest US cities. Compare local pricing, telehealth availability, and provider rankings.",
  alternates: { canonical: "/cities" },
};

export default function CitiesIndexPage() {
  const cities = getAllCities().sort((a, b) => b.population - a.population);

  return (
    <main className="min-h-screen bg-brand-bg">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Cities", url: "/cities" },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
            Browse by <span className="text-gradient">City</span>
          </h1>
          <p className="text-brand-text-secondary text-lg mt-3 max-w-2xl mx-auto">
            Compare GLP-1 telehealth providers and local clinic options in the
            20 largest US cities. Pricing, availability, and insurance vary by
            location.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/cities/${c.slug}`}
              className="rounded-xl bg-white border border-brand-violet/10 p-5 hover:border-brand-violet/30 hover:shadow-md transition-all"
            >
              <div className="font-semibold text-brand-text-primary text-lg">
                {c.city}, {c.state_code}
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                Pop. {c.population.toLocaleString()} · Obesity{" "}
                {c.obesity_rate.toFixed(1)}%
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
