import type { Metadata } from "next";
import Link from "next/link";
import statesContent from "@/data/states-content.json";
import type { StateContent } from "@/lib/states-content";

export const metadata: Metadata = {
  title: "Admin · State Content",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminStatesListPage() {
  const all = Object.entries(statesContent as Record<string, StateContent>)
    .map(([code, s]) => ({ code, ...s }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-semibold text-brand-text-secondary">
          <Link href="/admin/content" className="hover:underline">
            Content
          </Link>{" "}
          / States
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          State Content
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          {all.length} states loaded from{" "}
          <code className="font-mono">src/data/states-content.json</code>.
        </p>
      </header>

      <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                <th className="py-3 px-5 text-left">State</th>
                <th className="py-3 px-5 text-left">Code</th>
                <th className="py-3 px-5 text-left">Telehealth</th>
                <th className="py-3 px-5 text-left">Medicaid GLP-1</th>
                <th className="py-3 px-5 text-right">Avg Price</th>
                <th className="py-3 px-5 text-right">Obesity Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {all.map((s) => (
                <tr key={s.code} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-brand-text-primary">
                    <Link
                      href={`/admin/content/states/${s.code}`}
                      className="hover:underline"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="py-3 px-5 text-xs font-mono text-brand-text-secondary">
                    {s.code}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        s.telehealth_legal
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200",
                      ].join(" ")}
                    >
                      {s.telehealth_legal ? "Legal" : "Restricted"}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-brand-text-secondary">
                    {s.medicaid_glp1_coverage}
                  </td>
                  <td className="py-3 px-5 text-right text-brand-text-primary tabular-nums">
                    ${s.average_compounded_price_monthly}
                  </td>
                  <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                    #{s.obesity_rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
