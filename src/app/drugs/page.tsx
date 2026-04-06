import type { Metadata } from "next";
import Link from "next/link";
import { getAllDrugs } from "@/lib/drugs";

export const metadata: Metadata = {
  title: "GLP-1 Drug Guides — Semaglutide, Tirzepatide & More",
  description:
    "Comprehensive guides to GLP-1 medications: Semaglutide, Tirzepatide, Wegovy, Ozempic, Mounjaro, and Zepbound. Costs, side effects, and where to buy.",
  alternates: { canonical: "/drugs" },
};

export default function DrugsIndexPage() {
  const drugs = getAllDrugs();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
          <span className="text-gradient">Drug Guides</span>
        </h1>
        <p className="text-brand-text-secondary text-lg mt-3 max-w-2xl mx-auto">
          In-depth guides to every GLP-1 medication — costs, side effects,
          dosing schedules, and where to buy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drugs.map((drug) => (
          <Link
            key={drug.slug}
            href={`/drugs/${drug.slug}`}
            className="rounded-2xl bg-white border border-brand-violet/10 p-6 hover:border-brand-violet/30 hover:shadow-md transition-all"
          >
            <h2 className="font-heading font-bold text-xl text-brand-text-primary">
              {drug.name}
            </h2>
            {drug.brand_names && drug.brand_names.length > 0 && (
              <p className="text-xs text-brand-violet uppercase tracking-wide mt-1">
                {drug.brand_names.join(" • ")}
              </p>
            )}
            <p className="text-sm text-brand-text-secondary mt-3 line-clamp-3">
              {drug.description}
            </p>
            <p className="text-sm font-semibold text-brand-violet mt-4">
              Read guide →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
