import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProviders, getProviderBySlug } from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import CTAButton from "@/components/shared/CTAButton";
import StickyCTABar from "@/components/shared/StickyCTABar";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import ScoreBadge from "@/components/providers/ScoreBadge";
import StarRating from "@/components/providers/StarRating";
import FeatureBadge from "@/components/providers/FeatureBadge";
import TrustBadgesRow from "@/components/marketing/TrustBadgesRow";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import DYORCallout from "@/components/marketing/DYORCallout";

// ─── helpers ────────────────────────────────────────────────────────────────

function getOverallScore(provider: Provider): number {
  return computeOverallScore(provider.scores);
}

function getMinPrice(provider: Provider): number | null {
  if (!provider.pricing || provider.pricing.length === 0) return null;
  return provider.pricing.reduce((min, p) => {
    const effective = p.promo_price ?? p.monthly_cost;
    return effective < min ? effective : min;
  }, provider.pricing[0].promo_price ?? provider.pricing[0].monthly_cost);
}

function hasCompounded(provider: Provider): boolean {
  return provider.pricing.some((p) => p.form === "compounded");
}

function hasBrandName(provider: Provider): boolean {
  return provider.pricing.some((p) => p.form === "brand");
}

function hasFsaHsa(provider: Provider): boolean {
  return provider.features.some((f) =>
    f.toLowerCase().includes("fsa") || f.toLowerCase().includes("hsa")
  );
}

function parseMatchup(matchup: string): { slugA: string; slugB: string } | null {
  // Find "-vs-" separator — slugs may contain hyphens, so find the literal "-vs-"
  const vsIndex = matchup.indexOf("-vs-");
  if (vsIndex === -1) return null;
  const slugA = matchup.slice(0, vsIndex);
  const slugB = matchup.slice(vsIndex + 4);
  if (!slugA || !slugB) return null;
  return { slugA, slugB };
}

// ─── generateStaticParams ────────────────────────────────────────────────────

export async function generateStaticParams() {
  const allProviders = await getAllProviders();
  const params: { matchup: string }[] = [];

  // Group by category
  const byCategory: Record<string, Provider[]> = {};
  for (const p of allProviders) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  }

  // Generate unique pairs within each category (no duplicates)
  for (const category of Object.keys(byCategory)) {
    const providers = byCategory[category];
    for (let i = 0; i < providers.length; i++) {
      for (let j = i + 1; j < providers.length; j++) {
        params.push({
          matchup: `${providers[i].slug}-vs-${providers[j].slug}`,
        });
      }
    }
  }

  return params;
}

// ─── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matchup: string }>;
}): Promise<Metadata> {
  const { matchup } = await params;
  const parsed = parseMatchup(matchup);
  if (!parsed) return { title: "Comparison Not Found" };

  const [providerA, providerB] = await Promise.all([
    getProviderBySlug(parsed.slugA),
    getProviderBySlug(parsed.slugB),
  ]);

  if (!providerA || !providerB) return { title: "Comparison Not Found" };

  const title = `${providerA.name} vs ${providerB.name}: Which is Better in 2026?`;
  const description = `Compare ${providerA.name} vs ${providerB.name} side-by-side — pricing, scores, features, pros & cons, and our expert verdict on which ${providerA.category} is right for you.`;

  return {
    title,
    description,
    alternates: { canonical: `/compare/${matchup}` },
    openGraph: {
      title,
      description,
      url: `/compare/${matchup}`,
      type: "article",
      siteName: "WeightLossRankings",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function MatchupPage({
  params,
}: {
  params: Promise<{ matchup: string }>;
}) {
  const { matchup } = await params;
  const parsed = parseMatchup(matchup);
  if (!parsed) notFound();

  const [providerA, providerB] = await Promise.all([
    getProviderBySlug(parsed.slugA),
    getProviderBySlug(parsed.slugB),
  ]);

  if (!providerA || !providerB) notFound();
  if (providerA.category !== providerB.category) notFound();

  const scoreA = getOverallScore(providerA);
  const scoreB = getOverallScore(providerB);
  const priceA = getMinPrice(providerA);
  const priceB = getMinPrice(providerB);

  const winner: Provider | null =
    scoreA > scoreB ? providerA : scoreB > scoreA ? providerB : null;

  const categoryLabel = providerA.category;

  // Best external review score for each provider
  const reviewScoreA =
    providerA.external_reviews?.trustpilot_score ??
    providerA.external_reviews?.google_score ??
    null;
  const reviewScoreB =
    providerB.external_reviews?.trustpilot_score ??
    providerB.external_reviews?.google_score ??
    null;

  return (
    <div className="min-h-screen bg-brand-gradient-light pb-24 lg:pb-0">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
          {
            name: `${providerA.name} vs ${providerB.name}`,
            url: `/compare/${matchup}`,
          },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Trust badges ── */}
        <div className="mb-6">
          <TrustBadgesRow
            badges={[
              { icon: "✓", text: "Expert Reviewed" },
              { icon: "📅", text: "Updated April 2026" },
              { icon: "🔒", text: "Independently Researched" },
            ]}
          />
        </div>

        <div className="mb-6">
          <DYORCallout variant="compact" />
        </div>

        {/* ── H1 ── */}
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-brand-text-primary mb-3">
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            {providerA.name} vs {providerB.name}
          </span>
        </h1>
        <p className="text-brand-text-secondary mb-4">
          An in-depth comparison of two leading {categoryLabel}s
        </p>

        <AffiliateDisclosure />

        {/* ── Head-to-Head Split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {[providerA, providerB].map((p) => {
            const minPrice = getMinPrice(p);
            const reviewScore =
              p.external_reviews?.trustpilot_score ??
              p.external_reviews?.google_score ??
              null;
            const reviewCount =
              p.external_reviews?.trustpilot_count ??
              p.external_reviews?.google_count ??
              undefined;

            return (
              <div
                key={p.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
              >
                {/* Name + score */}
                <div className="flex items-center gap-4">
                  <ScoreBadge scores={p.scores} size="lg" />
                  <div>
                    <h2 className="text-xl font-bold font-heading text-brand-text-primary">
                      {p.name}
                    </h2>
                    {p.best_for && (
                      <span className="text-xs font-medium text-brand-violet uppercase tracking-wide">
                        Best for {p.best_for}
                      </span>
                    )}
                  </div>
                </div>

                {/* Star rating */}
                {reviewScore !== null && (
                  <StarRating score={reviewScore} count={reviewCount} />
                )}

                {/* Starting price */}
                {minPrice !== null && (
                  <p className="text-sm text-brand-text-secondary">
                    Starting at{" "}
                    <span className="font-semibold text-brand-text-primary">
                      ${minPrice}/mo
                    </span>
                  </p>
                )}

                {/* Top 4 features */}
                <div className="flex flex-wrap gap-1.5">
                  {p.features.slice(0, 4).map((f) => (
                    <FeatureBadge key={f} label={f} />
                  ))}
                </div>

                {/* CTA */}
                <CTAButton
                  href={p.affiliate_url}
                  external
                  size="md"
                  className="mt-auto w-full"
                  trackProvider={p.slug}
                  trackSource={`vs_${matchup}`}
                >
                  Visit {p.name} →
                </CTAButton>
              </div>
            );
          })}
        </div>

        {/* ── Comparison Table ── */}
        <div className="mt-10 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold font-heading text-brand-text-primary">
              Side-by-Side Comparison
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 font-semibold text-brand-text-secondary w-1/3">
                  Feature
                </th>
                <th className="text-center px-4 py-3 font-semibold text-brand-text-primary">
                  {providerA.name}
                </th>
                <th className="text-center px-4 py-3 font-semibold text-brand-text-primary">
                  {providerB.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">

              {/* Overall Score */}
              <CompareRow
                label="Overall Score"
                cellA={
                  <span className="font-bold text-brand-text-primary">
                    {scoreA.toFixed(1)}/10
                  </span>
                }
                cellB={
                  <span className="font-bold text-brand-text-primary">
                    {scoreB.toFixed(1)}/10
                  </span>
                }
                winnerSide={scoreA > scoreB ? "a" : scoreB > scoreA ? "b" : null}
              />

              {/* Starting Price */}
              <CompareRow
                label="Starting Price"
                cellA={
                  priceA !== null ? (
                    <span>${priceA}/mo</span>
                  ) : (
                    <span className="text-brand-text-secondary">—</span>
                  )
                }
                cellB={
                  priceB !== null ? (
                    <span>${priceB}/mo</span>
                  ) : (
                    <span className="text-brand-text-secondary">—</span>
                  )
                }
                // Lower price wins
                winnerSide={
                  priceA !== null && priceB !== null
                    ? priceA < priceB
                      ? "a"
                      : priceB < priceA
                      ? "b"
                      : null
                    : null
                }
              />

              {/* Rating */}
              <CompareRow
                label="Customer Rating"
                cellA={
                  reviewScoreA !== null ? (
                    <span>{reviewScoreA} ★</span>
                  ) : (
                    <span className="text-brand-text-secondary">—</span>
                  )
                }
                cellB={
                  reviewScoreB !== null ? (
                    <span>{reviewScoreB} ★</span>
                  ) : (
                    <span className="text-brand-text-secondary">—</span>
                  )
                }
                winnerSide={
                  reviewScoreA !== null && reviewScoreB !== null
                    ? reviewScoreA > reviewScoreB
                      ? "a"
                      : reviewScoreB > reviewScoreA
                      ? "b"
                      : null
                    : null
                }
              />

              {/* Features Count */}
              <CompareRow
                label="Features"
                cellA={<span>{providerA.features.length} features</span>}
                cellB={<span>{providerB.features.length} features</span>}
                winnerSide={
                  providerA.features.length > providerB.features.length
                    ? "a"
                    : providerB.features.length > providerA.features.length
                    ? "b"
                    : null
                }
              />

              {/* States Available */}
              <CompareRow
                label="States Available"
                cellA={<span>{providerA.states_available.length}</span>}
                cellB={<span>{providerB.states_available.length}</span>}
                winnerSide={
                  providerA.states_available.length >
                  providerB.states_available.length
                    ? "a"
                    : providerB.states_available.length >
                      providerA.states_available.length
                    ? "b"
                    : null
                }
              />

              {/* Compounded */}
              <CompareRow
                label="Compounded"
                cellA={<BoolCell value={hasCompounded(providerA)} />}
                cellB={<BoolCell value={hasCompounded(providerB)} />}
                winnerSide={null}
              />

              {/* Brand Name */}
              <CompareRow
                label="Brand Name"
                cellA={<BoolCell value={hasBrandName(providerA)} />}
                cellB={<BoolCell value={hasBrandName(providerB)} />}
                winnerSide={null}
              />

              {/* FSA/HSA */}
              <CompareRow
                label="FSA/HSA Accepted"
                cellA={<BoolCell value={hasFsaHsa(providerA)} />}
                cellB={<BoolCell value={hasFsaHsa(providerB)} />}
                winnerSide={null}
              />

              {/* FDA Warnings */}
              <CompareRow
                label="FDA Warnings"
                cellA={
                  <span
                    className={
                      providerA.fda_warnings.length === 0
                        ? "text-brand-success font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {providerA.fda_warnings.length === 0
                      ? "None"
                      : `${providerA.fda_warnings.length} warning${providerA.fda_warnings.length > 1 ? "s" : ""}`}
                  </span>
                }
                cellB={
                  <span
                    className={
                      providerB.fda_warnings.length === 0
                        ? "text-brand-success font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {providerB.fda_warnings.length === 0
                      ? "None"
                      : `${providerB.fda_warnings.length} warning${providerB.fda_warnings.length > 1 ? "s" : ""}`}
                  </span>
                }
                // Fewer warnings wins
                winnerSide={
                  providerA.fda_warnings.length < providerB.fda_warnings.length
                    ? "a"
                    : providerB.fda_warnings.length <
                      providerA.fda_warnings.length
                    ? "b"
                    : null
                }
              />
            </tbody>
          </table>
        </div>

        {/* ── Pros / Cons Side-by-Side ── */}
        <div className="mt-10">
          <h2 className="text-xl font-bold font-heading text-brand-text-primary mb-6">
            Pros &amp; Cons
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[providerA, providerB].map((p) => (
              <div
                key={p.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <h3 className="font-bold font-heading text-brand-text-primary mb-4">
                  {p.name}
                </h3>

                {/* Pros */}
                {p.pros.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-success mb-2">
                      Pros
                    </p>
                    <ul className="space-y-1.5">
                      {p.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-brand-text-secondary">
                          <span className="text-brand-success mt-0.5 flex-shrink-0">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {p.cons.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                      Cons
                    </p>
                    <ul className="space-y-1.5">
                      {p.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-brand-text-secondary">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Verdict ── */}
        <div className="mt-10 rounded-2xl bg-white border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold font-heading text-brand-text-primary mb-4">
            Our Verdict
          </h2>

          {winner ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white text-sm font-semibold px-4 py-1.5">
                  Winner: {winner.name}
                </span>
                <span className="text-brand-text-secondary text-sm">
                  Score: {getOverallScore(winner).toFixed(1)}/10
                </span>
              </div>
              <p className="text-brand-text-secondary leading-relaxed">
                {winner.name} edges out {winner.slug === providerA.slug ? providerB.name : providerA.name} with a higher
                overall score of {getOverallScore(winner).toFixed(1)}/10
                {winner.best_for ? ` and is particularly strong for ${winner.best_for}` : ""}.
                {" "}
                {winner.slug === providerA.slug
                  ? `${providerB.name} remains a solid alternative${providerB.best_for ? `, especially if you're looking for ${providerB.best_for}` : ""}.`
                  : `${providerA.name} remains a solid alternative${providerA.best_for ? `, especially if you're looking for ${providerA.best_for}` : ""}.`}
              </p>
            </>
          ) : (
            <p className="text-brand-text-secondary leading-relaxed">
              Both {providerA.name} and {providerB.name} score equally well overall — the right
              choice depends on your priorities.
              {providerA.best_for && providerB.best_for
                ? ` Choose ${providerA.name} if you want ${providerA.best_for}, or ${providerB.name} if ${providerB.best_for} matters most to you.`
                : " Review the features and pricing above to find the best fit for your needs."}
            </p>
          )}
        </div>

        {/* ── Final CTAs ── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CTAButton
            href={providerA.affiliate_url}
            external
            size="lg"
            className="w-full"
            trackProvider={providerA.slug}
            trackSource={`vs_${matchup}`}
          >
            Get Started with {providerA.name} →
          </CTAButton>
          <CTAButton
            href={providerB.affiliate_url}
            external
            size="lg"
            variant="outline"
            className="w-full"
            trackProvider={providerB.slug}
            trackSource={`vs_${matchup}`}
          >
            Get Started with {providerB.name} →
          </CTAButton>
        </div>

      </div>

      <StickyCTABar
        providers={[
          {
            name: providerA.name,
            slug: providerA.slug,
            affiliateUrl: providerA.affiliate_url,
          },
          {
            name: providerB.name,
            slug: providerB.slug,
            affiliateUrl: providerB.affiliate_url,
          },
        ]}
        trackingSource={`vs_${matchup}_sticky`}
      />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <span className="text-brand-success font-semibold">✓ Yes</span>
  ) : (
    <span className="text-brand-text-secondary">—</span>
  );
}

interface CompareRowProps {
  label: string;
  cellA: React.ReactNode;
  cellB: React.ReactNode;
  winnerSide: "a" | "b" | null;
}

function CompareRow({ label, cellA, cellB, winnerSide }: CompareRowProps) {
  const winnerClass = "bg-brand-gradient/5 font-semibold";

  return (
    <tr>
      <td className="px-6 py-3 text-brand-text-secondary font-medium">{label}</td>
      <td
        className={`px-4 py-3 text-center ${
          winnerSide === "a" ? winnerClass : ""
        }`}
      >
        {winnerSide === "a" && (
          <span className="inline-block w-4 h-4 rounded-full bg-brand-gradient text-white text-[10px] font-bold leading-4 mr-1 align-middle">
            ✓
          </span>
        )}
        {cellA}
      </td>
      <td
        className={`px-4 py-3 text-center ${
          winnerSide === "b" ? winnerClass : ""
        }`}
      >
        {winnerSide === "b" && (
          <span className="inline-block w-4 h-4 rounded-full bg-brand-gradient text-white text-[10px] font-bold leading-4 mr-1 align-middle">
            ✓
          </span>
        )}
        {cellB}
      </td>
    </tr>
  );
}
