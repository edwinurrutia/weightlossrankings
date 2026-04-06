import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProviderBySlug } from "@/lib/data";
import { getCurrentAdminUser } from "@/lib/admin-users";
import { isCmsConfigured } from "@/lib/github-cms";
import ProviderForm from "@/components/admin/ProviderForm";

export const metadata: Metadata = {
  title: "Admin · Edit Provider",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditProviderPage({
  params,
}: {
  params: { slug: string };
}) {
  const provider = await getProviderBySlug(params.slug);
  if (!provider) notFound();

  const username = await getCurrentAdminUser();
  const cmsConfigured = isCmsConfigured();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link
            href="/admin/providers"
            className="text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary"
          >
            ← All providers
          </Link>
          <h1 className="font-heading text-2xl font-bold text-brand-text-primary mt-1">
            Edit {provider.name}
          </h1>
          <p className="text-xs text-brand-text-secondary mt-1">
            Slug: <code>{provider.slug}</code>
          </p>
        </div>
        <Link
          href={`/providers/${provider.slug}`}
          target="_blank"
          rel="noopener"
          className="text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary"
        >
          View on site ↗
        </Link>
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

      <ProviderForm initial={provider} mode="edit" currentUser={username} />
    </div>
  );
}
