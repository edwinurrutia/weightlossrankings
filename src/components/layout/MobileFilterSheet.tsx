"use client";

import { useState } from "react";
import type { FilterState } from "@/lib/types";
import FilterBar from "@/components/compare/FilterBar";

interface MobileFilterSheetProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

export default function MobileFilterSheet({
  filters,
  onChange,
  resultCount,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed bottom trigger button — hidden on lg+ */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-4 bg-white border-t border-gray-100 shadow-lg">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-full bg-brand-gradient text-white font-semibold py-3 px-6 text-sm transition-opacity hover:opacity-90"
        >
          Filters · {resultCount} results
        </button>
      </div>

      {/* Bottom sheet overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="relative bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <span className="text-base font-semibold text-brand-text-primary">
                Filters
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-brand-text-secondary hover:text-brand-text-primary transition-colors text-sm font-medium"
              >
                Done
              </button>
            </div>

            {/* Scrollable filter content */}
            <div className="overflow-y-auto p-5 pb-8">
              <FilterBar filters={filters} onChange={onChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
