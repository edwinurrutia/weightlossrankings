interface ProsConsGridProps {
  pros?: string[];
  cons?: string[];
}

export default function ProsConsGrid({ pros, cons }: ProsConsGridProps) {
  const hasPros = pros && pros.length > 0;
  const hasCons = cons && cons.length > 0;
  if (!hasPros && !hasCons) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hasPros && (
        <div className="rounded-2xl bg-brand-success/5 border border-brand-success/20 p-6">
          <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
            <span className="text-brand-success">✓</span> Pros
          </h2>
          <ul className="space-y-2">
            {pros!.map((pro, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-brand-text-secondary"
              >
                <span className="text-brand-success mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasCons && (
        <div className="rounded-2xl bg-red-50 border border-red-100 p-6">
          <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
            <span className="text-red-500">✗</span> Cons
          </h2>
          <ul className="space-y-2">
            {cons!.map((con, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-brand-text-secondary"
              >
                <span className="text-red-500 mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
