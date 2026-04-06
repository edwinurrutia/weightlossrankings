"use client";

import { useState, useEffect, useMemo } from "react";
import type { Provider } from "@/lib/types";
import { computeOverallScore } from "@/lib/scoring";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import ProviderGrid from "@/components/providers/ProviderGrid";

type SortKey = "score" | "price" | "name";
type CategoryKey = string | "all";

const CATEGORY_OPTIONS: { value: CategoryKey; label: string }[] = [
  { value: "all", label: "All categories" },
  { value: "GLP-1 Provider", label: "GLP-1 Provider" },
  { value: "Weight Loss Program", label: "Weight Loss Program" },
  { value: "Supplement", label: "Supplement" },
  { value: "Meal Delivery", label: "Meal Delivery" },
  { value: "Fitness App", label: "Fitness App" },
];

const CATEGORY_PLURAL: Record<string, string> = {
  "GLP-1 Provider": "GLP-1 Providers",
  "Weight Loss Program": "Weight Loss Programs",
  "Supplement": "Supplements",
  "Meal Delivery": "Meal Delivery",
  "Fitness App": "Fitness Apps",
};

const FORM_OPTIONS = ["compounded", "brand"] as const;

const PRICE_MIN = 0;
const PRICE_MAX = 500;

function minPrice(p: Provider): number {
  if (!p.pricing || p.pricing.length === 0) return Number.POSITIVE_INFINITY;
  return Math.min(...p.pricing.map((x) => x.promo_price ?? x.monthly_cost));
}

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
      <div className="h-10 bg-gray-200 rounded-full mt-4" />
    </div>
  );
}

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: CategoryKey;
  setSelectedCategory: (v: CategoryKey) => void;
  selectedForms: string[];
  toggleForm: (v: string) => void;
  topFeatures: string[];
  selectedFeatures: string[];
  toggleFeature: (v: string) => void;
  priceMax: number;
  setPriceMax: (v: number) => void;
  onReset: () => void;
}

function FilterControls(props: FilterControlsProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-brand-text-primary mb-2">
          Search
        </label>
        <input
          type="text"
          value={props.searchQuery}
          onChange={(e) => props.setSearchQuery(e.target.value)}
          placeholder="Provider name..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        />
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-brand-text-primary mb-2">
          Category
        </h3>
        <div className="space-y-1.5">
          {CATEGORY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer hover:text-brand-text-primary"
            >
              <input
                type="radio"
                name="category"
                checked={props.selectedCategory === opt.value}
                onChange={() => props.setSelectedCategory(opt.value)}
                className="text-brand-primary focus:ring-brand-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Form */}
      <div>
        <h3 className="text-sm font-semibold text-brand-text-primary mb-2">
          Form
        </h3>
        <div className="space-y-1.5">
          {FORM_OPTIONS.map((form) => (
            <label
              key={form}
              className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer hover:text-brand-text-primary"
            >
              <input
                type="checkbox"
                checked={props.selectedForms.includes(form)}
                onChange={() => props.toggleForm(form)}
                className="text-brand-primary focus:ring-brand-primary rounded"
              />
              {form === "compounded" ? "Compounded" : "Brand Name"}
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      {props.topFeatures.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-brand-text-primary mb-2">
            Features
          </h3>
          <div className="space-y-1.5">
            {props.topFeatures.map((feature) => (
              <label
                key={feature}
                className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer hover:text-brand-text-primary"
              >
                <input
                  type="checkbox"
                  checked={props.selectedFeatures.includes(feature)}
                  onChange={() => props.toggleFeature(feature)}
                  className="text-brand-primary focus:ring-brand-primary rounded"
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-brand-text-primary mb-2">
          Max Price
        </h3>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={props.priceMax}
          onChange={(e) => props.setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>${PRICE_MIN}</span>
          <span className="font-semibold text-brand-text-primary">
            ${props.priceMax}/mo
          </span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={props.onReset}
        className="w-full text-sm font-semibold text-brand-primary hover:text-brand-primary/80 py-2 border border-brand-primary/30 rounded-lg hover:bg-brand-primary/5 transition"
      >
        Reset filters
      </button>
    </div>
  );
}

export default function ComparePage() {
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(PRICE_MAX);
  const [selectedSort, setSelectedSort] = useState<SortKey>("score");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  // Compute top 6 most common features across all providers
  const topFeatures = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of allProviders) {
      for (const f of p.features ?? []) {
        counts.set(f, (counts.get(f) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([f]) => f);
  }, [allProviders]);

  const toggleForm = (v: string) =>
    setSelectedForms((cur) =>
      cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
    );
  const toggleFeature = (v: string) =>
    setSelectedFeatures((cur) =>
      cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
    );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedForms([]);
    setSelectedFeatures([]);
    setPriceMax(PRICE_MAX);
  };

  // Filter + sort
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const out = allProviders.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (selectedCategory !== "all" && p.category !== selectedCategory)
        return false;
      if (selectedForms.length > 0) {
        const hasForm = (p.pricing ?? []).some((pr) =>
          selectedForms.includes(pr.form),
        );
        if (!hasForm) return false;
      }
      if (selectedFeatures.length > 0) {
        const pf = p.features ?? [];
        if (!selectedFeatures.every((f) => pf.includes(f))) return false;
      }
      const mp = minPrice(p);
      if (Number.isFinite(mp) && mp > priceMax) return false;
      return true;
    });

    if (selectedSort === "score") {
      out.sort(
        (a, b) => computeOverallScore(b.scores) - computeOverallScore(a.scores),
      );
    } else if (selectedSort === "price") {
      out.sort((a, b) => minPrice(a) - minPrice(b));
    } else {
      out.sort((a, b) => a.name.localeCompare(b.name));
    }

    return out;
  }, [
    allProviders,
    searchQuery,
    selectedCategory,
    selectedForms,
    selectedFeatures,
    priceMax,
    selectedSort,
  ]);

  // Group by category for sectioned view
  const grouped = useMemo(() => {
    if (selectedCategory !== "all") return null;
    const map = new Map<string, Provider[]>();
    for (const p of filtered) {
      const arr = map.get(p.category) ?? [];
      arr.push(p);
      map.set(p.category, arr);
    }
    // Order by CATEGORY_OPTIONS order
    const ordered: { category: string; providers: Provider[] }[] = [];
    for (const opt of CATEGORY_OPTIONS) {
      if (opt.value === "all") continue;
      const arr = map.get(opt.value);
      if (arr && arr.length > 0)
        ordered.push({ category: opt.value, providers: arr });
    }
    // Append any uncategorized leftovers
    for (const [cat, arr] of Array.from(map.entries())) {
      if (!CATEGORY_OPTIONS.find((o) => o.value === cat)) {
        ordered.push({ category: cat, providers: arr });
      }
    }
    return ordered;
  }, [filtered, selectedCategory]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    selectedForms.length +
    selectedFeatures.length +
    (priceMax < PRICE_MAX ? 1 : 0);

  return (
    <div className="min-h-screen bg-brand-gradient-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 lg:pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-brand-text-primary mb-2">
            Compare Weight Loss Providers
          </h1>
          <p className="text-lg text-brand-text-secondary mb-3">
            Filter, sort, and compare 50+ GLP-1 providers, weight loss programs,
            and tools side by side.
          </p>
          <p className="text-sm text-brand-text-secondary max-w-3xl mb-4">
            Whether you&apos;re shopping for compounded semaglutide, a brand-name
            GLP-1 prescription, a structured weight loss program, or a supplement
            stack, this tool puts every option on a level playing field. Use the
            filters to narrow by category, price, and features, then sort by our
            independent score, lowest price, or alphabetically.
          </p>
          <AffiliateDisclosure />
        </div>

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-brand-text-primary shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-brand-primary text-white text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0 lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h2 className="text-base font-bold font-heading text-brand-text-primary mb-4">
                Filters
              </h2>
              <FilterControls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedForms={selectedForms}
                toggleForm={toggleForm}
                topFeatures={topFeatures}
                selectedFeatures={selectedFeatures}
                toggleFeature={toggleFeature}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                onReset={resetFilters}
              />
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Top bar: count + sort */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-sm text-brand-text-secondary">
                {loading
                  ? "Loading providers..."
                  : `Showing ${filtered.length} of ${allProviders.length} providers`}
              </p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="text-sm text-brand-text-secondary"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as SortKey)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                >
                  <option value="score">Score</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <div className="mx-auto w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-heading text-brand-text-primary mb-1">
                  No providers match your filters
                </h3>
                <p className="text-sm text-brand-text-secondary mb-4">
                  Try removing a filter or broadening your price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-primary/90 transition"
                >
                  Reset filters
                </button>
              </div>
            ) : grouped ? (
              <div className="space-y-10">
                {grouped.map((section) => (
                  <section key={section.category}>
                    <h2 className="text-2xl font-bold font-heading text-brand-text-primary mb-4">
                      {CATEGORY_PLURAL[section.category] ?? section.category}{" "}
                      <span className="text-base font-semibold text-brand-text-secondary">
                        ({section.providers.length})
                      </span>
                    </h2>
                    <ProviderGrid
                      providers={section.providers}
                      trackingSource="compare_tool"
                    />
                  </section>
                ))}
              </div>
            ) : (
              <ProviderGrid
                providers={filtered}
                trackingSource="compare_tool"
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold font-heading text-brand-text-primary">
                Filters
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-brand-text-secondary hover:text-brand-text-primary"
                aria-label="Close filters"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FilterControls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedForms={selectedForms}
                toggleForm={toggleForm}
                topFeatures={topFeatures}
                selectedFeatures={selectedFeatures}
                toggleFeature={toggleFeature}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                onReset={resetFilters}
              />
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full px-4 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary/90 transition"
              >
                Show {filtered.length} providers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
