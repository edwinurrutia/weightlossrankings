import type { Metadata } from "next";
import Link from "next/link";
import { getAllProviders } from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";
import { isCmsConfigured } from "@/lib/github-cms";
import { validateProvider } from "@/lib/schema";
import ProviderListFilters, {
  type ProviderRow,
} from "@/components/admin/ProviderListFilters";

export const metadata: Metadata = {
  title: "Admin · Providers",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProvidersPage() {
  const providers = await getAllProviders();
  const cmsConfigured = isCmsConfigured();
  const now = Date.now();
  const DAY_MS = 1000 * 60 * 60 * 24;

  const rows: ProviderRow[] = providers.map((p) => {
    const overall = computeOverallScore(p.scores);
    const minPrice = p.pricing.length
      ? Math.min(...p.pricing.map((row) => row.monthly_cost))
      : null;
    const validation = validateProvider(p);
    const lastVerified = p.verification?.last_verified ?? null;
    let status: ProviderRow["status"];
    if (!validation.valid) {
      status = "invalid";
    } else if (!p.verification) {
      status = "unverified";
    } else {
      const days = Math.floor(
        (now - new Date(p.verification.last_verified).getTime()) / DAY_MS
      );
      status = days > 30 ? "stale" : "verified";
    }
    return {
      slug: p.slug,
      name: p.name,
      logo: p.logo,
      category: p.category,
      overall,
      min_price: minPrice,
      states_count: p.states_available.length,
      last_verified: lastVerified,
      confidence: p.verification?.confidence ?? null,
      is_valid: validation.valid,
      status,
    };
  });

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-text-primary">
            Providers
            <span className="ml-2 text-sm font-semibold text-brand-text-secondary">
              ({providers.length.toLocaleString("en-US")})
            </span>
          </h1>
          <p className="text-xs text-brand-text-secondary mt-1">
            Edits commit to <code>src/data/providers.json</code> via GitHub.
          </p>
        </div>
        {cmsConfigured && (
          <Link
            href="/admin/providers/new"
            className="inline-flex items-center rounded-lg bg-brand-gradient text-white font-semibold px-4 py-2 text-sm shadow-sm"
          >
            + Add Provider
          </Link>
        )}
      </header>

      {!cmsConfigured && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold mb-1">
            GitHub CMS is not configured — read-only mode.
          </p>
          <p>
            Add <code>GITHUB_TOKEN</code>, <code>GITHUB_REPO_OWNER</code>, and{" "}
            <code>GITHUB_REPO_NAME</code> to your Vercel env vars to enable
            editing. See <code>docs/admin-cms-setup.md</code>.
          </p>
        </div>
      )}

      <ProviderListFilters rows={rows} cmsConfigured={cmsConfigured} />
    </div>
  );
}
