import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentAdminUser } from "@/lib/admin-users";
import { isCmsConfigured } from "@/lib/github-cms";
import ProviderForm from "@/components/admin/ProviderForm";
import type { Provider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin · New Provider",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const EMPTY_PROVIDER: Provider = {
  _id: "",
  name: "",
  slug: "",
  description: "",
  category: "GLP-1 Provider",
  pricing: [{ dose: "", form: "compounded", monthly_cost: 0 }],
  scores: {
    value: 7,
    effectiveness: 7,
    ux: 7,
    trust: 7,
    accessibility: 7,
    support: 7,
  },
  features: [],
  states_available: [],
  affiliate_url: "",
  fda_warnings: [],
  pros: [],
  cons: [],
  is_featured: false,
  verification: {
    last_verified: new Date().toISOString().slice(0, 10),
    verified_by: "manual",
    source_urls: [],
    confidence: "medium",
    notes: "",
  },
};

export default async function NewProviderPage() {
  const username = await getCurrentAdminUser();
  const cmsConfigured = isCmsConfigured();

  return (
    <div className="space-y-4">
      <div>
        <Link
          href="/admin/providers"
          className="text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary"
        >
          ← All providers
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-text-primary mt-1">
          New Provider
        </h1>
        <p className="text-xs text-brand-text-secondary mt-1">
          Fill in the details and click Save Changes to commit a new entry to{" "}
          <code>src/data/providers.json</code>.
        </p>
      </div>

      {!cmsConfigured && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">GitHub CMS not configured.</p>
          <p>
            Saving is disabled until <code>GITHUB_TOKEN</code>,{" "}
            <code>GITHUB_REPO_OWNER</code>, and <code>GITHUB_REPO_NAME</code>{" "}
            are set in Vercel.
          </p>
        </div>
      )}

      <ProviderForm initial={EMPTY_PROVIDER} mode="create" currentUser={username} />
    </div>
  );
}
