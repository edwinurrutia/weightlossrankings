import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import type { Provider } from "@/lib/types";
import StepWizard from "@/components/calculator/StepWizard";

export const metadata: Metadata = {
  title: "GLP-1 Savings Calculator — See How Much You Could Save",
  description:
    "Find out how much you could save by switching from brand-name Wegovy, Ozempic, Mounjaro, or Zepbound to a compounded GLP-1 provider. Takes less than 60 seconds.",
};

export default async function SavingsCalculatorPage() {
  const providers: Provider[] = await getAllProviders();

  return (
    <main className="min-h-screen bg-brand-gradient-light">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-text-primary leading-tight">
            GLP-1{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              Savings Calculator
            </span>
          </h1>
          <p className="mt-3 text-brand-text-secondary text-base">
            See how much you could save by switching to a compounded provider.
            Takes less than 60 seconds.
          </p>
        </div>

        <StepWizard providers={providers} />
      </div>
    </main>
  );
}
