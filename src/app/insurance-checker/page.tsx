import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import type { Provider } from "@/lib/types";
import InsuranceWizard from "@/components/insurance/InsuranceWizard";

export const metadata: Metadata = {
  title: "Insurance Coverage Checker — GLP-1 Medications",
  description:
    "Check if your insurance covers Wegovy, Ozempic, Mounjaro, or Zepbound. Get a personalized coverage estimate and see compounded alternatives if you're not covered.",
  alternates: { canonical: "/insurance-checker" },
};

export default async function InsuranceCheckerPage() {
  const providers: Provider[] = await getAllProviders();

  return (
    <main className="min-h-screen bg-brand-gradient-light">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-text-primary leading-tight">
            GLP-1{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              Insurance Checker
            </span>
          </h1>
          <p className="mt-3 text-brand-text-secondary text-base">
            Find out if your insurance covers your GLP-1 medication. Takes less than 60 seconds.
          </p>
        </div>

        <InsuranceWizard providers={providers} />
      </div>
    </main>
  );
}
