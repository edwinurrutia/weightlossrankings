import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPharmacies,
  getPharmacyBySlug,
  type Pharmacy,
} from "@/lib/pharmacies";
import { getAllProviders } from "@/lib/data";
import type { Provider } from "@/lib/types";
import ProviderCard from "@/components/providers/ProviderCard";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import JsonLd from "@/components/shared/JsonLd";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

export function generateStaticParams() {
  return getAllPharmacies().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pharmacy = getPharmacyBySlug(slug);
  if (!pharmacy) return {};

  const certPhrase = pharmacy.certifications.includes("PCAB")
    ? "PCAB Certified"
    : `${pharmacy.type}`;
  const title = `${pharmacy.name} Review: ${certPhrase} Compounding Pharmacy`;
  const description = `Is ${pharmacy.name} legit? Review of the ${pharmacy.city}, ${pharmacy.state} compounding pharmacy: 503A/503B status, PCAB accreditation, state licensure, GLP-1 production, and regulatory history.`;

  return {
    title,
    description,
    alternates: { canonical: `/pharmacies/${pharmacy.slug}` },
    openGraph: {
      title,
      description,
      url: `/pharmacies/${pharmacy.slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function TypeBadge({ type }: { type: Pharmacy["type"] }) {
  const classes =
    type === "503B"
      ? "bg-brand-violet/10 text-brand-violet border-brand-violet/30"
      : type === "Both"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold uppercase tracking-wide border rounded-full px-3 py-1 ${classes}`}
    >
      {type}
    </span>
  );
}

const CERTIFICATION_DESCRIPTIONS: Record<string, string> = {
  PCAB:
    "Pharmacy Compounding Accreditation Board — voluntary third-party accreditation (operated by ACHC) auditing the pharmacy against nationally recognized quality and safety standards for sterile and non-sterile compounding.",
  cGMP:
    "Current Good Manufacturing Practices — the FDA standard used by pharmaceutical manufacturers, required of 503B outsourcing facilities.",
  "FDA Registered 503B":
    "Registered directly with the FDA as a 503B outsourcing facility. Subject to FDA inspection and required to follow cGMP standards.",
  "State Licensed":
    "Licensed by the pharmacy's home state board of pharmacy. All US pharmacies must hold a state license at minimum.",
};

export default async function PharmacyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pharmacy = getPharmacyBySlug(slug);
  if (!pharmacy) notFound();

  const allProviders = await getAllProviders();
  const linkedProviders: Provider[] = allProviders.filter((p) =>
    pharmacy.linked_providers.includes(p.slug),
  );

  const dataAsOf = getLatestVerificationDate();

  // Source ids in display order (drives footnote numbering):
  // 1 = FDA 503A compounding framework
  // 2 = FDA 503B outsourcing facility framework
  // 3 = PCAB accreditation standards
  // 4 = USP <797> sterile compounding
  // 5 = USP <71> sterility testing
  // 6 = USP <85> bacterial endotoxin testing
  // 7 = FDA drug shortage list (basis for GLP-1 compounding eligibility)
  const SOURCE_FDA_503A = "fda-503a-compounding";
  const SOURCE_FDA_503B = "fda-503b-outsourcing";
  const SOURCE_PCAB = "pcab-accreditation-standards";
  const SOURCE_USP_797 = "usp-797-sterile-compounding";
  const SOURCE_USP_71 = "usp-71-sterility";
  const SOURCE_USP_85 = "usp-85-endotoxin";
  const SOURCE_FDA_SHORTAGE = "fda-drug-shortage-list";

  const producesGlp1 =
    pharmacy.produces_semaglutide || pharmacy.produces_tirzepatide;

  const sourceIds: string[] = [
    SOURCE_FDA_503A,
    SOURCE_FDA_503B,
    SOURCE_PCAB,
    SOURCE_USP_797,
    SOURCE_USP_71,
    SOURCE_USP_85,
    SOURCE_FDA_SHORTAGE,
  ];

  const faqs = [
    {
      question: `Is ${pharmacy.name} legit?`,
      answer: `${pharmacy.name} is a ${pharmacy.type} compounding pharmacy based in ${pharmacy.city}, ${pharmacy.state}${
        pharmacy.established ? ` that has been operating since ${pharmacy.established}` : ""
      }. ${
        pharmacy.certifications.includes("PCAB")
          ? "It holds PCAB accreditation, a voluntary third-party quality standard for compounding pharmacies."
          : "It operates under state board of pharmacy licensure."
      } ${
        pharmacy.regulatory_actions.length === 0
          ? "We are not aware of any recent public FDA enforcement actions against the pharmacy, though compounding pharmacy regulatory history can change. Always verify current status with your state board of pharmacy."
          : `Note: our records show ${pharmacy.regulatory_actions.length} documented regulatory action(s) — see the Regulatory Actions section below.`
      }`,
    },
    {
      question: `Where is ${pharmacy.name} located?`,
      answer: `${pharmacy.name} is headquartered in ${pharmacy.city}, ${pharmacy.state}. The pharmacy is licensed to ship to ${pharmacy.states_licensed.length} US states.`,
    },
    {
      question: `What does ${pharmacy.name} produce?`,
      answer: `${pharmacy.name} produces ${
        pharmacy.produces_semaglutide && pharmacy.produces_tirzepatide
          ? "compounded semaglutide and compounded tirzepatide"
          : pharmacy.produces_semaglutide
            ? "compounded semaglutide"
            : pharmacy.produces_tirzepatide
              ? "compounded tirzepatide"
              : "a range of compounded medications"
      } in addition to other compounded preparations. As a ${pharmacy.type} pharmacy, it ${
        pharmacy.type === "503B"
          ? "can batch-produce sterile compounds under FDA cGMP standards."
          : pharmacy.type === "Both"
            ? "operates both a patient-specific 503A division and an FDA-registered 503B outsourcing facility."
            : "dispenses compounded medications in response to individual patient prescriptions under state board of pharmacy oversight."
      }`,
    },
    {
      question: `What is the difference between 503A and 503B?`,
      answer: `503A pharmacies prepare compounded medications for individual patients in response to specific prescriptions and are regulated primarily by state boards of pharmacy under USP <797> sterile compounding standards. 503B outsourcing facilities register directly with the FDA, follow current Good Manufacturing Practices (cGMP), and can produce compounded medications in larger batches without patient-specific prescriptions. 503B facilities are subject to FDA inspection.`,
    },
  ];

  // Enriched Pharmacy schema for medical YMYL E-E-A-T. Schema.org's
  // Pharmacy type extends MedicalBusiness + LocalBusiness, so we
  // can populate fields from both. The more complete the entity,
  // the better Google's medical SERP ranking treats the page.
  const pharmacyJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacy.name,
    url: pharmacy.website,
    telephone: pharmacy.phone,
    description: pharmacy.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: pharmacy.city,
      addressRegion: pharmacy.state,
      addressCountry: "US",
    },
    medicalSpecialty: "Pharmacy",
    // Compounding pharmacies are licensed by state — areaServed
    // captures every US state they ship to, which is exactly what
    // Google uses to surface pharmacies in state-specific queries
    // ("compounded semaglutide florida").
    areaServed: (pharmacy.states_licensed ?? []).map((stateCode) => ({
      "@type": "State",
      name: stateCode,
    })),
    // Compounding type signals 503A vs 503B vs accreditation level
    additionalType:
      pharmacy.type === "503B"
        ? "https://schema.org/Pharmacy"
        : "https://schema.org/Pharmacy",
    knowsAbout: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Sterile compounding",
      pharmacy.type === "503B" ? "503B outsourcing" : "503A compounding",
    ],
  };
  if (pharmacy.established) {
    pharmacyJsonLd.foundingDate = String(pharmacy.established);
  }
  if (pharmacy.external_reviews?.google_score) {
    pharmacyJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: pharmacy.external_reviews.google_score,
      reviewCount: pharmacy.external_reviews.google_count ?? 1,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (pharmacy.certifications && pharmacy.certifications.length > 0) {
    pharmacyJsonLd.hasCredential = pharmacy.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: cert,
    }));
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const scoreBreakdown: Array<{ label: string; value: number; max: number }> = [
    {
      label: "Accreditation & Compliance",
      value: pharmacy.certifications.includes("PCAB") ? 9 : 6,
      max: 10,
    },
    {
      label: "Regulatory Standing",
      value: pharmacy.regulatory_actions.length === 0 ? 9 : 5,
      max: 10,
    },
    {
      label: "State Coverage",
      value: Math.min(10, Math.round((pharmacy.states_licensed.length / 51) * 10)),
      max: 10,
    },
    {
      label: "GLP-1 Production",
      value:
        (pharmacy.produces_semaglutide ? 5 : 0) +
        (pharmacy.produces_tirzepatide ? 5 : 0),
      max: 10,
    },
    {
      label: "Track Record",
      value:
        pharmacy.established && pharmacy.established <= 2010
          ? 9
          : pharmacy.established && pharmacy.established <= 2018
            ? 7
            : 5,
      max: 10,
    },
  ];

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={pharmacyJsonLd} />
      <JsonLd data={faqJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Pharmacies", url: "/pharmacies" },
          { name: pharmacy.name, url: `/pharmacies/${pharmacy.slug}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb link */}
        <nav className="text-sm text-brand-text-secondary">
          <Link href="/" className="hover:text-brand-violet">
            Home
          </Link>
          {" › "}
          <Link href="/pharmacies" className="hover:text-brand-violet">
            Pharmacies
          </Link>
          {" › "}
          <span className="text-brand-text-primary">{pharmacy.name}</span>
        </nav>

        <header className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
            Compounding Pharmacy ·{" "}
            {[
              pharmacy.established ? `Est. ${pharmacy.established}` : null,
              `${pharmacy.city}, ${pharmacy.state}`,
              pharmacy.type,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1
            className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {pharmacy.name}
            </span>{" "}
            Review
          </h1>
          <p className="text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
            {pharmacy.description}
          </p>
          <AffiliateDisclosure />
        </header>

        {/* Hero trust card */}
        <section className="rounded-2xl border border-brand-violet/10 bg-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={pharmacy.type} />
                {pharmacy.certifications.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wide border border-sky-200 bg-sky-50 text-sky-700 rounded-full px-3 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="text-sm text-brand-text-secondary space-y-1">
                <div>
                  <strong className="text-brand-text-primary">Location:</strong>{" "}
                  {pharmacy.city}, {pharmacy.state}
                </div>
                {pharmacy.phone && (
                  <div>
                    <strong className="text-brand-text-primary">Phone:</strong>{" "}
                    {pharmacy.phone}
                  </div>
                )}
                <div>
                  <strong className="text-brand-text-primary">Website:</strong>{" "}
                  <a
                    href={pharmacy.website}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-brand-violet hover:underline"
                  >
                    {pharmacy.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
                <div>
                  <strong className="text-brand-text-primary">
                    States licensed:
                  </strong>{" "}
                  {pharmacy.states_licensed.length}
                </div>
              </div>
            </div>
            <div className="text-center shrink-0">
              <div className="text-5xl font-bold text-brand-text-primary leading-none">
                {pharmacy.internal_score.toFixed(1)}
              </div>
              <div className="text-xs uppercase tracking-wide text-brand-text-secondary mt-2">
                Weight Loss Rankings Score
              </div>
              <div className="text-xs text-brand-text-secondary mt-1">
                out of 10
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            About this pharmacy
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            {pharmacy.description}
          </p>
        </section>

        {/* Certifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Certifications &amp; Compliance
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            All sterile compounding pharmacies in the United States are
            required to follow United States Pharmacopeia General Chapter
            &lt;797&gt; sterile compounding standards
            <Citation source={SOURCE_USP_797} n={4} />, with finished
            preparations evaluated against USP &lt;71&gt; sterility testing
            <Citation source={SOURCE_USP_71} n={5} /> and USP &lt;85&gt;
            bacterial endotoxin testing
            <Citation source={SOURCE_USP_85} n={6} /> as appropriate for the
            product type.
          </p>
          {pharmacy.certifications.length === 0 ? (
            <p className="text-sm text-brand-text-secondary">
              We have not verified any third-party accreditations for this
              pharmacy beyond its state pharmacy license.
            </p>
          ) : (
            <div className="space-y-3">
              {pharmacy.certifications.map((c) => (
                <div
                  key={c}
                  className="rounded-xl border border-brand-violet/10 bg-white p-4"
                >
                  <div className="font-semibold text-brand-text-primary">
                    {c}
                  </div>
                  <div className="text-sm text-brand-text-secondary mt-1">
                    {CERTIFICATION_DESCRIPTIONS[c] ??
                      "Additional certification disclosed by the pharmacy."}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Drugs produced */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Drugs Produced
          </h2>
          {producesGlp1 && (
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Compounding pharmacies&apos; ability to produce semaglutide or
              tirzepatide depends on the FDA Drug Shortage List status for
              each reference product; compounding eligibility can change when
              a drug moves on or off the shortage list
              <Citation source={SOURCE_FDA_SHORTAGE} n={7} />.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className={`rounded-xl border p-4 ${
                pharmacy.produces_semaglutide
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {pharmacy.produces_semaglutide ? "✅" : "—"}
                </span>
                <div>
                  <div className="font-semibold text-brand-text-primary">
                    Semaglutide
                  </div>
                  <div className="text-xs text-brand-text-secondary">
                    {pharmacy.produces_semaglutide
                      ? "Compounded semaglutide produced"
                      : "Not produced"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                pharmacy.produces_tirzepatide
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {pharmacy.produces_tirzepatide ? "✅" : "—"}
                </span>
                <div>
                  <div className="font-semibold text-brand-text-primary">
                    Tirzepatide
                  </div>
                  <div className="text-xs text-brand-text-secondary">
                    {pharmacy.produces_tirzepatide
                      ? "Compounded tirzepatide produced"
                      : "Not produced"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* States licensed */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            States Licensed ({pharmacy.states_licensed.length})
          </h2>
          <div className="rounded-xl border border-brand-violet/10 bg-white p-4">
            <div className="flex flex-wrap gap-1.5">
              {pharmacy.states_licensed.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center justify-center text-xs font-semibold text-brand-text-primary bg-brand-violet/5 border border-brand-violet/10 rounded px-2 py-1 min-w-[2.25rem]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Linked providers */}
        {linkedProviders.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              Telehealth Providers Sourcing From This Pharmacy
            </h2>
            <p className="text-sm text-brand-text-secondary">
              These telehealth brands are reported to fulfill some or all
              compounded GLP-1 prescriptions through {pharmacy.name}. Sourcing
              arrangements can change over time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {linkedProviders.map((p, idx) => (
                <ProviderCard
                  key={p._id}
                  provider={p}
                  trackingSource={`pharmacy_${pharmacy.slug}`}
                  position={idx + 1}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regulatory actions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Regulatory Actions
          </h2>
          {pharmacy.regulatory_actions.length === 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-sm text-emerald-900">
              No public FDA enforcement actions or recalls are on file in our
              records for {pharmacy.name}. Regulatory status can change — verify
              with the FDA and your state board of pharmacy before relying on
              this information.
            </div>
          ) : (
            <div className="space-y-3">
              {pharmacy.regulatory_actions.map((a, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-red-200 bg-red-50/50 p-4"
                >
                  <div className="font-semibold text-red-900 text-sm">
                    {a.date}
                  </div>
                  <div className="text-sm text-red-900/80 mt-1">
                    {a.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* External reviews */}
        {pharmacy.external_reviews?.google_score && (
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              External Reviews
            </h2>
            <div className="rounded-xl border border-brand-violet/10 bg-white p-4">
              <div className="text-sm text-brand-text-secondary">
                Google Reviews
              </div>
              <div className="text-2xl font-bold text-brand-text-primary mt-1">
                {pharmacy.external_reviews.google_score.toFixed(1)} / 5.0
              </div>
              {pharmacy.external_reviews.google_count && (
                <div className="text-xs text-brand-text-secondary mt-1">
                  Based on {pharmacy.external_reviews.google_count} reviews
                </div>
              )}
            </div>
          </section>
        )}

        {/* Score breakdown */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Weight Loss Rankings Score Breakdown
          </h2>
          <div className="rounded-xl border border-brand-violet/10 bg-white p-5 space-y-3">
            {scoreBreakdown.map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-brand-text-secondary">{row.label}</span>
                  <span className="font-semibold text-brand-text-primary">
                    {row.value}/{row.max}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-brand-gradient"
                    style={{ width: `${(row.value / row.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-text-secondary">
            Scores are independently researched. See our{" "}
            <Link href="/methodology" className="text-brand-violet underline">
              methodology
            </Link>{" "}
            for details.
          </p>
        </section>

        {/* Verification */}
        <section className="rounded-xl border border-brand-border bg-brand-surface/50 p-4 text-xs text-brand-text-secondary">
          <strong className="text-brand-text-primary">
            Data verification:
          </strong>{" "}
          Last verified {pharmacy.verification.last_verified} by{" "}
          {pharmacy.verification.verified_by}. Confidence:{" "}
          {pharmacy.verification.confidence}.
          {pharmacy.verification.notes && <> {pharmacy.verification.notes}</>}
        </section>

        <FAQSection items={faqs} />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CTAButton href="/best/semaglutide-providers" size="lg">
            See Top Semaglutide Providers
          </CTAButton>
          <CTAButton
            href="/pharmacies"
            size="lg"
            variant="outline"
          >
            All Pharmacies
          </CTAButton>
        </div>

        <SourcesPanel sourceIds={sourceIds} dataAsOf={dataAsOf} />
      </div>
    </main>
  );
}
