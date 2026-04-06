import type { Metadata } from "next";
import Link from "next/link";
import { getAllInsurers } from "@/lib/insurers";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

export const metadata: Metadata = {
  title: "Does My Insurance Cover GLP-1s? Browse 10 Major Insurers (2026)",
  description:
    "Find out if your health insurance covers Wegovy, Ozempic, Zepbound, and Mounjaro. Compare coverage rules across BCBS, UHC, Aetna, Cigna, Humana, Medicare, Medicaid, and more.",
  alternates: { canonical: "/insurance" },
};

export default function InsuranceIndexPage() {
  const insurers = getAllInsurers().sort(
    (a, b) => b.member_count - a.member_count
  );

  return (
    <main className="min-h-screen bg-brand-bg">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insurance", url: "/insurance" },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
            GLP-1 Coverage by{" "}
            <span className="text-gradient">Insurance Plan</span>
          </h1>
          <p className="text-brand-text-secondary text-lg mt-3 max-w-2xl mx-auto">
            Find out exactly what your insurance plan covers for Wegovy,
            Ozempic, Zepbound, and Mounjaro in 2026.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-900">
          <strong className="font-semibold">Editorial note:</strong> Insurance
          coverage of GLP-1 medications is changing rapidly as plans respond
          to new clinical evidence and shifting federal and state policy.
          Always verify current coverage rules with your own plan
          administrator or member services line before making a treatment or
          financial decision based on any information on this page.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insurers.map((i) => (
            <Link
              key={i.slug}
              href={`/insurance/${i.slug}`}
              className="rounded-xl bg-white border border-brand-violet/10 p-5 hover:border-brand-violet/30 hover:shadow-md transition-all"
            >
              <div className="font-semibold text-brand-text-primary text-lg">
                {i.name}
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                {i.member_count.toLocaleString()} members · Coverage:{" "}
                {i.covers_glp1}
              </div>
            </Link>
          ))}
        </div>

        <SourcesPanel
          sourceIds={[
            "kff-medicaid-obesity-drug-coverage",
            "cms-medicare-part-d",
            "irs-pub-502-medical-expenses",
          ]}
          dataAsOf={getLatestVerificationDate()}
        />
      </div>
    </main>
  );
}
