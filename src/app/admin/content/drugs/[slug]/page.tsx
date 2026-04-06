import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import drugs from "@/data/drugs.json";
import type { Drug } from "@/lib/types";
import DrugForm from "@/components/admin/forms/DrugForm";

export const metadata: Metadata = {
  title: "Admin · Edit Drug",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function EditDrugPage({
  params,
}: {
  params: { slug: string };
}) {
  const drug = (drugs as Drug[]).find((d) => d.slug === params.slug);
  if (!drug) notFound();

  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-semibold text-brand-text-secondary">
          <Link href="/admin/content" className="hover:underline">
            Content
          </Link>{" "}
          /{" "}
          <Link href="/admin/content/drugs" className="hover:underline">
            Drugs
          </Link>{" "}
          / {drug.slug}
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Edit: {drug.name}
        </h1>
      </header>
      <DrugForm initial={drug} />
    </div>
  );
}
