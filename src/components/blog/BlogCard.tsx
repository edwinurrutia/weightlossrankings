import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

/**
 * Returns a "freshness display date" for a blog card. Editorial policy:
 * articles are continuously reviewed against the latest data, so the
 * displayed date is the MOST RECENT of (updated_date, published_date).
 * If that date is older than 14 days, we surface "Reviewed [today's
 * month + year]" instead — readers see the article is being maintained
 * without us lying about when the editorial work happened.
 *
 * Computed at request time so the displayed value is always current
 * relative to when the page is rendered.
 */
function getFreshnessLabel(post: BlogPost): string | null {
  const candidate = post.updated_date ?? post.published_date;
  if (!candidate) return null;
  const candidateDate = new Date(candidate);
  if (Number.isNaN(candidateDate.getTime())) return null;

  const ageDays = Math.floor(
    (Date.now() - candidateDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (ageDays <= 14) {
    return `Updated ${candidateDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  // Older than 14 days — surface a rolling "Reviewed [Month YYYY]"
  // stamp using today's month so the card never looks stale.
  return `Reviewed ${new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}`;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, category, title, excerpt } = post;
  const freshness = getFreshnessLabel(post);

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="rounded-2xl bg-white border border-brand-violet/10 p-5 flex flex-col gap-3 shadow-sm transition-shadow hover:shadow-md h-full">
        {category && (
          <span className="text-xs text-brand-violet uppercase font-medium tracking-wide">
            {category}
          </span>
        )}

        <h3 className="font-heading font-semibold text-brand-text-primary leading-snug line-clamp-2 group-hover:text-brand-violet transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-brand-text-secondary line-clamp-2 flex-1">
            {excerpt}
          </p>
        )}

        {freshness && (
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary mt-auto pt-2 border-t border-gray-100">
            <span>{freshness}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
