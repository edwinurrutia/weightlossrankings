interface StarRatingProps {
  score: number;
  count?: number;
}

export default function StarRating({ score, count }: StarRatingProps) {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <span className="text-brand-warning">
        {"★".repeat(fullStars)}
        {hasHalf ? "★" : ""}
        {"☆".repeat(emptyStars)}
      </span>
      <span className="text-sm text-brand-text-secondary font-medium">
        {score}
        {count !== undefined && (
          <span className="text-brand-text-secondary font-normal">
            {" "}
            ({count.toLocaleString()})
          </span>
        )}
      </span>
    </div>
  );
}
