interface BottomLineCardProps {
  verdict: string;
  score?: number;
  bestFor?: string;
  fromPrice?: number | null;
}

export default function BottomLineCard({
  verdict,
  score,
  bestFor,
  fromPrice,
}: BottomLineCardProps) {
  return (
    <section className="rounded-2xl bg-brand-violet/5 border border-brand-violet/20 p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-violet mb-2">
        The Bottom Line
      </p>
      <p className="text-lg font-semibold text-brand-text-primary mb-3">
        {verdict}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-text-secondary">
        {score !== undefined && (
          <span>
            <strong className="text-brand-text-primary">Score:</strong> {score}
            /10
          </span>
        )}
        {bestFor && (
          <span>
            <strong className="text-brand-text-primary">Best for:</strong>{" "}
            {bestFor}
          </span>
        )}
        {fromPrice !== undefined && fromPrice !== null && (
          <span>
            <strong className="text-brand-text-primary">From:</strong> $
            {fromPrice}/mo
          </span>
        )}
      </div>
    </section>
  );
}
