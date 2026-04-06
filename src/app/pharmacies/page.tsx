import type { Metadata } from "next";
import { getAllPharmacies } from "@/lib/pharmacies";
import PharmacyDirectory from "@/components/pharmacies/PharmacyDirectory";
import PageHero from "@/components/marketing/PageHero";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import EmailCapture from "@/components/shared/EmailCapture";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import JsonLd from "@/components/shared/JsonLd";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

export const metadata: Metadata = {
  title:
    "Compounding Pharmacies for GLP-1 Medications | Reviews & Certifications",
  description:
    "Directory of US compounding pharmacies that produce compounded semaglutide and tirzepatide. Compare 503A and 503B pharmacies, PCAB accreditation, state licensure, and regulatory standing.",
  alternates: { canonical: "/pharmacies" },
  openGraph: {
    title:
      "Compounding Pharmacies for GLP-1 Medications | Reviews & Certifications",
    description:
      "Directory of US compounding pharmacies that produce compounded semaglutide and tirzepatide. Compare 503A vs 503B, PCAB accreditation, and regulatory standing.",
    url: "/pharmacies",
    type: "website",
    siteName: "WeightLossRankings",
  },
};

export default function PharmaciesIndexPage() {
  const pharmacies = getAllPharmacies();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pharmacies.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `https://weightlossrankings.org/pharmacies/${p.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={itemListJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Pharmacies", url: "/pharmacies" },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <PageHero
          badges={[
            { icon: "🧪", text: `${pharmacies.length} Pharmacies` },
            { icon: "✅", text: "Independently Researched" },
          ]}
          title={
            <>
              Compounding Pharmacies for{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                GLP-1 Medications
              </span>
            </>
          }
          subtitle="Telehealth providers don't make compounded semaglutide or tirzepatide themselves — licensed compounding pharmacies do. This directory tracks the US 503A and 503B pharmacies known to supply the GLP-1 telehealth market, with certifications, state licensure, and regulatory standing."
        >
          <AffiliateDisclosure />
        </PageHero>

        <PharmacyDirectory pharmacies={pharmacies} />

        {/* Educational section */}
        <section className="rounded-2xl border border-brand-violet/10 bg-white p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            What is a compounding pharmacy?
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            A compounding pharmacy is a licensed pharmacy that prepares
            medications from raw ingredients, typically to meet a patient need
            that can&apos;t be met by a commercially manufactured drug. During
            the FDA-declared shortages of semaglutide and tirzepatide,
            compounding pharmacies were permitted to produce compounded
            versions of these GLP-1 medications for patient use. The pharmacy
            that actually makes your medication matters — it determines
            sterility, potency, and safety.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
              <h3 className="font-semibold text-emerald-900 mb-2">
                503A Pharmacies
              </h3>
              <p className="text-sm text-emerald-900/80 leading-relaxed">
                Traditional compounding pharmacies that prepare
                patient-specific prescriptions. They operate under state board
                of pharmacy oversight and USP &lt;797&gt; sterile compounding
                standards. A 503A pharmacy can only dispense compounded
                medication in response to an individual prescription for a
                named patient.
              </p>
            </div>
            <div className="rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-5">
              <h3 className="font-semibold text-brand-violet mb-2">
                503B Outsourcing Facilities
              </h3>
              <p className="text-sm text-brand-text-primary/80 leading-relaxed">
                Outsourcing facilities that register directly with the FDA and
                follow current Good Manufacturing Practices (cGMP) — the same
                standard used by drug manufacturers. 503B facilities can
                produce compounded medications in larger batches without
                patient-specific prescriptions and are inspected by the FDA.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-brand-text-primary mb-2">
              What is PCAB accreditation?
            </h3>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              The Pharmacy Compounding Accreditation Board (PCAB), operated by
              ACHC, is a voluntary accreditation program that audits
              compounding pharmacies against nationally recognized quality and
              safety standards. PCAB accreditation is considered a strong
              signal that a pharmacy meets best practices for sterile
              compounding, though it is not legally required.
            </p>
          </div>
        </section>

        <EmailCapture
          heading="Pharmacy Watch Alerts"
          description="Get notified when a pharmacy in this directory has a new FDA action, PCAB status change, or major regulatory update."
          source="pharmacy_watch"
          buttonText="Subscribe"
        />

        <SourcesPanel
          sourceIds={[
            "fda-503a-compounding",
            "fda-503b-outsourcing",
            "pcab-accreditation-standards",
          ]}
          dataAsOf={getLatestVerificationDate()}
        />
      </div>
    </main>
  );
}
