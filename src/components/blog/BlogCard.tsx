import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, category, title, excerpt, author, published_date } = post;

  const formattedDate = published_date
    ? new Date(published_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

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

        <div className="flex items-center gap-2 text-xs text-brand-text-secondary mt-auto pt-2 border-t border-gray-100">
          {author && <span>{author}</span>}
          {author && formattedDate && <span>·</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </Link>
  );
}
