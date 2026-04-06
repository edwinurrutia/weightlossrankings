interface StatItem {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: string;
}

interface StatGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

export default function StatGrid({ stats, columns = 3 }: StatGridProps) {
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-4`}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-lg border border-brand-border bg-brand-surface p-4"
        >
          {stat.icon && (
            <div className="text-2xl mb-1" aria-hidden="true">
              {stat.icon}
            </div>
          )}
          <div className="text-sm text-brand-text-muted mb-1">{stat.label}</div>
          <div className="text-2xl font-bold text-brand-text-primary">
            {stat.value}
          </div>
          {stat.sublabel && (
            <div className="text-xs text-brand-text-secondary mt-1">
              {stat.sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
