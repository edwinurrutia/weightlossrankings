import type { Metadata } from "next";
import Link from "next/link";
import drugs from "@/data/drugs.json";
import type { Drug } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin · Drug Guides",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminDrugsListPage() {
  const all = drugs as Drug[];
  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-semibold text-brand-text-secondary">
          <Link href="/admin/content" className="hover:underline">
            Content
          </Link>{" "}
          / Drugs
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Drug Guides
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          {all.length} drugs loaded from{" "}
          <code className="font-mono">src/data/drugs.json</code>.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {all.map((d) => (
          <Link
            key={d.slug}
            href={`/admin/content/drugs/${d.slug}`}
            className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5 hover:border-brand-violet/30 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-heading text-lg font-bold text-brand-text-primary truncate">
                  {d.name}
                </h2>
                <p className="text-xs text-brand-text-secondary mt-0.5">
                  {d.generic_name}
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center rounded-full bg-brand-violet/5 border border-brand-violet/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-text-primary">
                {d.brand_names?.[0] ?? "—"}
              </span>
            </div>
            <p className="text-xs text-brand-text-secondary mt-3 line-clamp-3">
              {d.description}
            </p>
            <div className="mt-4 text-xs font-semibold text-brand-violet">
              Edit →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
