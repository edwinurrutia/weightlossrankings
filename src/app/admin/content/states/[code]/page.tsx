import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import statesContent from "@/data/states-content.json";
import type { StateContent } from "@/lib/states-content";
import StateContentForm from "@/components/admin/forms/StateContentForm";

export const metadata: Metadata = {
  title: "Admin · Edit State",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function EditStatePage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code.toUpperCase();
  const all = statesContent as Record<string, StateContent>;
  const state = all[code];
  if (!state) notFound();

  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-semibold text-brand-text-secondary">
          <Link href="/admin/content" className="hover:underline">
            Content
          </Link>{" "}
          /{" "}
          <Link href="/admin/content/states" className="hover:underline">
            States
          </Link>{" "}
          / {code}
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Edit: {state.name}
        </h1>
      </header>
      <StateContentForm code={code} initial={state} />
    </div>
  );
}
