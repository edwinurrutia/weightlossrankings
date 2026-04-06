import type { Provider } from "@/lib/types";
import ProviderCard from "@/components/providers/ProviderCard";

interface RelatedProvidersSectionProps {
  title: string;
  providers: Provider[];
  trackingSource: string;
  description?: string;
  limit?: number;
}

export default function RelatedProvidersSection({
  title,
  providers,
  trackingSource,
  description,
  limit,
}: RelatedProvidersSectionProps) {
  if (!providers || providers.length === 0) return null;
  const items = limit ? providers.slice(0, limit) : providers;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-bold text-brand-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-brand-text-secondary text-sm">{description}</p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <ProviderCard
            key={p._id}
            provider={p}
            trackingSource={trackingSource}
          />
        ))}
      </div>
    </section>
  );
}
