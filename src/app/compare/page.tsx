"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Provider } from "@/lib/types";
import { sortProvidersByRank } from "@/lib/scoring";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import ProviderGrid from "@/components/providers/ProviderGrid";

type SortKey = "score" | "price" | "name";
type CategoryKey = string | "all";
type DrugKey = "semaglutide" | "tirzepatide" | "all";

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
  selectedDrug: DrugKey;
  setSelectedDrug: (v: DrugKey) => void;
  selectedForms: string[];
  toggleForm: (v: string) => void;
  topFeatures: string[];
  selectedFeatures: string[];
  toggleFeature: (v: string) => void;
  priceMax: number;
  setPriceMax: (v: number) => void;
  onReset: () => void;
}

const DRUG_OPTIONS: { value: DrugKey; label: string }[] = [
  { value: "all", label: "All drugs" },
  { value: "semaglutide", label: "Semaglutide" },
  { value: "tirzepatide", label: "Tirzepatide" },
];

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

      {/* Drug */}
      <div>
        <h3 className="text-sm font-semibold text-brand-text-primary mb-2">
          Drug
        </h3>
        <div className="space-y-1.5">
          {DRUG_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer hover:text-brand-text-primary"
            >
              <input
                type="radio"
                name="drug"
                checked={props.selectedDrug === opt.value}
                onChange={() => props.setSelectedDrug(opt.value)}
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

/* ------------------------------------------------------------------ */
/*  Mobile-only pill/chip filter controls                              */
/*  Large touch targets (44px+), wrapping pills instead of radios/    */
/*  checkboxes.  Only rendered inside the mobile drawer (<lg).        */
/* ------------------------------------------------------------------ */

function PillButton({
  active,
  onClick,
  children,
  multiSelect,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  multiSelect?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-brand-primary text-white"
          : "bg-gray-50 text-brand-text-primary border border-gray-200"
      }`}
    >
      {multiSelect && active && (
        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {children}
    </button>
  );
}

function MobileFilterControls(props: FilterControlsProps) {
  return (
    <div className="space-y-6">
      {/* Search — 16px font prevents iOS zoom */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
          Search
        </div>
        <input
          type="text"
          value={props.searchQuery}
          onChange={(e) => props.setSearchQuery(e.target.value)}
          placeholder="Provider name..."
          className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        />
      </div>

      {/* Category — single-select pills */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
          Category
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <PillButton
              key={opt.value}
              active={props.selectedCategory === opt.value}
              onClick={() => props.setSelectedCategory(opt.value)}
            >
              {opt.label}
            </PillButton>
          ))}
        </div>
      </div>

      {/* Drug — single-select pills */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
          Drug
        </div>
        <div className="flex flex-wrap gap-2">
          {DRUG_OPTIONS.map((opt) => (
            <PillButton
              key={opt.value}
              active={props.selectedDrug === opt.value}
              onClick={() => props.setSelectedDrug(opt.value)}
            >
              {opt.label}
            </PillButton>
          ))}
        </div>
      </div>

      {/* Form — multi-select pills */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
          Form
        </div>
        <div className="flex flex-wrap gap-2">
          {FORM_OPTIONS.map((form) => (
            <PillButton
              key={form}
              active={props.selectedForms.includes(form)}
              onClick={() => props.toggleForm(form)}
              multiSelect
            >
              {form === "compounded" ? "Compounded" : "Brand Name"}
            </PillButton>
          ))}
        </div>
      </div>

      {/* Features — multi-select pills */}
      {props.topFeatures.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
            Features
          </div>
          <div className="flex flex-wrap gap-2">
            {props.topFeatures.map((feature) => (
              <PillButton
                key={feature}
                active={props.selectedFeatures.includes(feature)}
                onClick={() => props.toggleFeature(feature)}
                multiSelect
              >
                {feature}
              </PillButton>
            ))}
          </div>
        </div>
      )}

      {/* Price — larger slider with custom thumb */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
          Max Price
        </div>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={props.priceMax}
          onChange={(e) => props.setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-primary h-2 rounded-lg appearance-none bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-primary [&::-webkit-slider-thumb]:shadow-md"
        />
        <div className="flex justify-between text-sm text-brand-text-secondary mt-2">
          <span>${PRICE_MIN}</span>
          <span className="font-bold text-brand-text-primary">
            ${props.priceMax}/mo
          </span>
        </div>
      </div>
    </div>
  );
}

function ComparePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);

  // Filter state — initialized from URL searchParams
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(
    () => searchParams.get("category") ?? "all",
  );
  const [selectedDrug, setSelectedDrug] = useState<DrugKey>(() => {
    const d = searchParams.get("drug");
    return d === "semaglutide" || d === "tirzepatide" ? d : "all";
  });
  const [selectedForms, setSelectedForms] = useState<string[]>(() => {
    const f = searchParams.get("form");
    return f === "compounded" || f === "brand" ? [f] : [];
  });
  const [selectedState, setSelectedState] = useState<string>(
    () => (searchParams.get("state") ?? "").toUpperCase(),
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    () => searchParams.getAll("features"),
  );
  const [priceMax, setPriceMax] = useState<number>(PRICE_MAX);
  const [selectedSort, setSelectedSort] = useState<SortKey>(() => {
    const s = searchParams.get("sort");
    return s === "price" || s === "name" || s === "score" ? s : "score";
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync filters → URL searchParams
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedDrug !== "all") params.set("drug", selectedDrug);
    // Form is single-value in the URL contract; we still allow array internally
    // but only persist the first selected form to keep URLs clean and rankable.
    if (selectedForms.length === 1) params.set("form", selectedForms[0]);
    if (selectedState) params.set("state", selectedState.toUpperCase());
    for (const f of selectedFeatures) params.append("features", f);
    if (selectedSort !== "score") params.set("sort", selectedSort);

    const qs = params.toString();
    const next = qs ? `/compare?${qs}` : "/compare";
    // Avoid pushing if URL is already in sync (prevents loops on mount)
    const current =
      window.location.pathname +
      (window.location.search ? window.location.search : "");
    if (current !== next) {
      router.replace(next, { scroll: false });
    }
  }, [
    router,
    searchQuery,
    selectedCategory,
    selectedDrug,
    selectedForms,
    selectedState,
    selectedFeatures,
    selectedSort,
  ]);

  // Manage canonical link tag client-side. Strips q, sort, features.
  // Note: client-side canonicals are weaker than server-rendered, but the
  // dedicated /best/[category]/[variant] money pages are the primary SEO target.
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDrug !== "all") params.set("drug", selectedDrug);
    if (selectedForms.length === 1) params.set("form", selectedForms[0]);
    if (selectedState) params.set("state", selectedState.toUpperCase());
    const qs = params.toString();
    const canonicalPath = qs ? `/compare?${qs}` : "/compare";
    const href = `https://weightlossrankings.org${canonicalPath}`;

    let link = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [selectedDrug, selectedForms, selectedState]);

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
    setSelectedDrug("all");
    setSelectedForms([]);
    setSelectedState("");
    setSelectedFeatures([]);
    setPriceMax(PRICE_MAX);
    setSelectedSort("score");
  };

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // ignore
    }
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let out = allProviders.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (selectedCategory !== "all" && p.category !== selectedCategory)
        return false;
      if (selectedForms.length > 0) {
        const hasForm = (p.pricing ?? []).some((pr) =>
          selectedForms.includes(pr.form),
        );
        if (!hasForm) return false;
      }
      if (selectedDrug !== "all") {
        const hasDrug = (p.pricing ?? []).some(
          (pr) => pr.drug === selectedDrug,
        );
        if (!hasDrug) return false;
      }
      if (selectedState) {
        if (!p.states_available?.includes(selectedState)) return false;
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
      out = sortProvidersByRank(out);
    } else if (selectedSort === "price") {
      out.sort((a, b) => minPrice(a) - minPrice(b));
    } else {
      out.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Affiliate CTR test: bubble Katalys-network providers to the top
    // of the list (within each sort mode) so we can measure which
    // affiliate programs get clicked. The within-group ordering is
    // preserved — Katalys providers stay sorted by score/price/name
    // among themselves, and non-Katalys providers keep their order too.
    // TODO: remove this once the CTR test concludes and revert to
    // pure editorial ranking.
    const katalys = out.filter((p) => p.affiliate_network === "Katalys");
    const others = out.filter((p) => p.affiliate_network !== "Katalys");
    out = [...katalys, ...others];

    return out;
  }, [
    allProviders,
    searchQuery,
    selectedCategory,
    selectedDrug,
    selectedForms,
    selectedState,
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
    (selectedDrug !== "all" ? 1 : 0) +
    selectedForms.length +
    (selectedState ? 1 : 0) +
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
            Filter, sort, and compare 100+ GLP-1 providers, weight loss programs,
            and tools side by side.
          </p>
          <p className="text-sm text-brand-text-secondary max-w-3xl mb-4">
            Whether you&apos;re shopping for compounded semaglutide, a brand-name
            GLP-1 prescription, a structured weight loss program, or a supplement
            stack, this tool puts every option on a level playing field. Use the
            filters to narrow by category, price, and features, then sort by our
            independent score, lowest price, or alphabetically.
          </p>
          {/* /compare → /reviews bridge — internal-linking fix from
              the deep SEO audit. The /reviews index page used to have
              zero inbound links from /compare even though /compare is
              the higher-traffic landing page. This callout distributes
              link equity to /reviews and gives readers a path into
              the editorial reviews when they want depth instead of
              the filter UI. */}
          <p className="text-sm text-brand-text-secondary max-w-3xl mb-4">
            New to comparing?{" "}
            <a
              href="/reviews"
              className="text-brand-violet font-semibold underline underline-offset-2 hover:text-brand-blue"
            >
              Start with our editorial reviews →
            </a>{" "}
            Each one has a six-dimension score, primary-source citations,
            and a verified pricing table.
          </p>
          <AffiliateDisclosure />
          {activeFilterCount > 0 && (
            <div className="mt-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-brand-primary/30 rounded-lg text-xs font-semibold text-brand-primary hover:bg-brand-primary/5 transition shadow-sm"
                aria-label="Copy shareable link to this filtered view"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                {shareCopied ? "Link copied!" : "Share this view"}
              </button>
            </div>
          )}
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
                selectedDrug={selectedDrug}
                setSelectedDrug={setSelectedDrug}
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

      {/* Mobile filter drawer — pill/chip controls for touch */}
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
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm font-semibold text-brand-primary"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 -mr-2 text-brand-text-secondary hover:text-brand-text-primary"
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
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <MobileFilterControls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedDrug={selectedDrug}
                setSelectedDrug={setSelectedDrug}
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
                className="w-full px-4 py-3.5 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition text-base"
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

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-gradient-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="h-8 w-72 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-96 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      }
    >
      <ComparePageInner />
    </Suspense>
  );
}
