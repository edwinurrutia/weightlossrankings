import type { SortOption } from "@/lib/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-brand-text-secondary font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-violet focus:border-transparent transition-all"
    >
      <option value="cheapest">Cheapest First</option>
      <option value="highest-rated">Highest Rated</option>
      <option value="most-reviewed">Most Reviewed</option>
    </select>
  );
}
