import type { Metadata } from "next";
import Link from "next/link";
import { US_STATES } from "@/lib/states";

export const metadata: Metadata = {
  title: "Weight Loss Providers by State — Browse All 50 States",
  description:
    "Find GLP-1 providers and weight loss programs available in your state. Compare pricing, availability, and coverage across all 50 US states.",
  alternates: { canonical: "/states" },
};

export default function StatesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
          Browse by <span className="text-gradient">State</span>
        </h1>
        <p className="text-brand-text-secondary text-lg mt-3 max-w-2xl mx-auto">
          Find the best weight loss providers available in your state. Prices,
          features, and availability vary by location.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {US_STATES.map((state) => (
          <Link
            key={state.code}
            href={`/states/${state.slug}`}
            className="rounded-xl bg-white border border-brand-violet/10 p-4 text-center hover:border-brand-violet/30 hover:shadow-md transition-all tap-target flex items-center justify-center"
          >
            <span className="font-medium text-brand-text-primary text-sm">
              {state.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
