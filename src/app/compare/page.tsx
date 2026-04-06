"use client";

import { useState, useEffect } from "react";
import type { Provider, FilterState } from "@/lib/types";
import { filterProviders } from "@/lib/filters";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import FilterBar from "@/components/compare/FilterBar";
import ProviderGrid from "@/components/providers/ProviderGrid";
import MobileFilterSheet from "@/components/layout/MobileFilterSheet";

const DEFAULT_FILTERS: FilterState = {
  sort: "cheapest",
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-100 rounded" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-100 rounded-full w-16" />
        <div className="h-6 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="h-10 bg-gray-200 rounded-full mt-4" />
    </div>
  );
}

export default function ComparePage() {
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetch("/api/providers");
        if (!res.ok) throw new Error("Failed to fetch providers");
        const data: Provider[] = await res.json();
        setAllProviders(data);
      } catch (err) {
        console.error("Error loading providers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, []);

  const filtered = filterProviders(allProviders, filters);

  return (
    <div className="min-h-screen bg-brand-gradient-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 lg:pb-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-brand-text-primary mb-2">
            Compare GLP-1 &amp; Weight Loss Providers
          </h1>
          <AffiliateDisclosure />
        </div>

        {/* Layout: sidebar + grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <FilterBar filters={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Main grid */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <ProviderGrid
                providers={filtered}
                selectedDose={filters.dose}
                trackingSource="compare_tool"
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <MobileFilterSheet
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
      />
    </div>
  );
}
