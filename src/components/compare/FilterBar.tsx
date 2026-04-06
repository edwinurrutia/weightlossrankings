"use client";

import type { FilterState } from "@/lib/types";
import { US_STATES } from "@/lib/states";
import { ALL_FEATURES, DOSE_OPTIONS } from "@/lib/filters";
import FilterPill from "./FilterPill";
import SortDropdown from "./SortDropdown";

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">
      {children}
    </p>
  );
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  function toggleCategory(value: string) {
    onChange({ ...filters, category: filters.category === value ? undefined : value });
  }

  function toggleForm(value: string) {
    onChange({ ...filters, form: filters.form === value ? undefined : value });
  }

  function toggleDose(value: string) {
    onChange({ ...filters, dose: filters.dose === value ? undefined : value });
  }

  function toggleFeature(feature: string) {
    const current = filters.features ?? [];
    const next = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    onChange({ ...filters, features: next.length > 0 ? next : undefined });
  }

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange({ ...filters, state: e.target.value || undefined });
  }

  return (
    <div className="flex flex-col gap-5 text-brand-text-primary">
      {/* Sort */}
      <div>
        <SectionLabel>Sort By</SectionLabel>
        <SortDropdown
          value={filters.sort}
          onChange={(sort) => onChange({ ...filters, sort })}
        />
      </div>

      {/* Category */}
      <div>
        <SectionLabel>Category</SectionLabel>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="GLP-1 Provider"
            active={filters.category === "glp1"}
            onClick={() => toggleCategory("glp1")}
          />
          <FilterPill
            label="Weight Loss Program"
            active={filters.category === "weight-loss-program"}
            onClick={() => toggleCategory("weight-loss-program")}
          />
        </div>
      </div>

      {/* Form */}
      <div>
        <SectionLabel>Form</SectionLabel>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="Compounded"
            active={filters.form === "compounded"}
            onClick={() => toggleForm("compounded")}
          />
          <FilterPill
            label="Brand"
            active={filters.form === "brand"}
            onClick={() => toggleForm("brand")}
          />
        </div>
      </div>

      {/* Dose */}
      <div>
        <SectionLabel>Dose</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {DOSE_OPTIONS.map((dose) => (
            <FilterPill
              key={dose}
              label={dose}
              active={filters.dose === dose}
              onClick={() => toggleDose(dose)}
            />
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <SectionLabel>State</SectionLabel>
        <select
          value={filters.state ?? ""}
          onChange={handleStateChange}
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-brand-text-secondary font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-violet focus:border-transparent transition-all"
        >
          <option value="">All States</option>
          {US_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* Features */}
      <div>
        <SectionLabel>Features</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {ALL_FEATURES.map((feature) => (
            <FilterPill
              key={feature}
              label={feature}
              active={(filters.features ?? []).includes(feature)}
              onClick={() => toggleFeature(feature)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
