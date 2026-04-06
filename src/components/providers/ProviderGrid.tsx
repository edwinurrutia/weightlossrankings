import type { Provider } from "@/lib/types";
import ProviderCard from "./ProviderCard";

interface ProviderGridProps {
  providers: Provider[];
  selectedDose?: string;
  trackingSource?: string;
}

export default function ProviderGrid({
  providers,
  selectedDose,
  trackingSource = "unknown",
}: ProviderGridProps) {
  if (!providers || providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-brand-text-secondary text-lg">
          No providers match your current filters.
        </p>
        <p className="text-brand-text-secondary text-sm mt-1">
          Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {providers.map((provider) => (
        <ProviderCard
          key={provider._id}
          provider={provider}
          selectedDose={selectedDose}
          trackingSource={trackingSource}
        />
      ))}
    </div>
  );
}
