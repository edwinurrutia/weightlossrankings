import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStateBySlug, US_STATES } from "@/lib/states";
import { getProvidersByState } from "@/lib/data";
import type { Provider } from "@/lib/types";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import EmailCapture from "@/components/shared/EmailCapture";

export function generateStaticParams() {
  return US_STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) return {};

  return {
    title: `Best Weight Loss Options in ${stateData.name} (2026)`,
    description: `Find the top-rated weight loss providers available in ${stateData.name}. Compare GLP-1 programs, pricing, and reviews to find the best option for you.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) {
    notFound();
  }

  const providers: Provider[] = await getProvidersByState(stateData.code);

  return (
    <main className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary leading-tight">
            Best Weight Loss Options in{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {stateData.name}
            </span>
          </h1>
          <p className="text-brand-text-secondary text-lg leading-relaxed">
            {providers.length > 0
              ? `We found ${providers.length} weight loss provider${providers.length === 1 ? "" : "s"} available in ${stateData.name}. Compare options, pricing, and reviews to find the best fit.`
              : `We're working on adding providers for ${stateData.name}. Check back soon for the latest options.`}
          </p>
          <AffiliateDisclosure />
        </div>

        {/* Provider Grid */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-xl font-bold text-brand-text-primary mb-6"
          >
            Available Providers in {stateData.name}
          </h2>
          <ProviderGrid providers={providers} />
        </section>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CTAButton href="/compare" size="lg">
            Compare All Providers
          </CTAButton>
          <CTAButton
            href="/savings-calculator"
            size="lg"
            variant="outline"
          >
            Calculate Savings
          </CTAButton>
        </div>

        {/* Email Capture */}
        <EmailCapture
          heading={`Get ${stateData.name} Price Alerts`}
          description={`Be the first to know about new providers and price changes in ${stateData.name}.`}
          source={`state_${stateData.slug}`}
        />
      </div>
    </main>
  );
}
