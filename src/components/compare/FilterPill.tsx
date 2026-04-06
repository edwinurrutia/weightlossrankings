interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "tap-target inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer select-none",
        active
          ? "bg-brand-gradient text-white shadow-sm"
          : "bg-white border border-gray-200 text-brand-text-secondary hover:border-brand-violet hover:text-brand-violet",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
