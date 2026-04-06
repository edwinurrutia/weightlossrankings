import Link from "next/link";

export interface CategoryNavCard {
  emoji: string;
  label: string;
  slug: string;
  comingSoon?: boolean;
}

interface CategoryNavCardsProps {
  categories: CategoryNavCard[];
  hrefBuilder?: (slug: string) => string;
}

export default function CategoryNavCards({
  categories,
  hrefBuilder = (slug: string) => `/best/${slug}`,
}: CategoryNavCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((cat) => {
        const inner = (
          <div className="rounded-2xl bg-white border border-brand-violet/10 p-5 flex flex-col items-center gap-2 shadow-sm text-center h-full transition-shadow hover:shadow-md">
            <span className="text-3xl">{cat.emoji}</span>
            <span className="font-heading font-semibold text-brand-text-primary text-sm leading-tight">
              {cat.label}
            </span>
            {cat.comingSoon && (
              <span className="text-xs text-brand-text-secondary">
                Coming soon
              </span>
            )}
          </div>
        );

        if (cat.comingSoon || !cat.slug) {
          return (
            <div key={cat.label} className="cursor-default">
              {inner}
            </div>
          );
        }

        return (
          <Link
            key={cat.label}
            href={hrefBuilder(cat.slug)}
            className="group block"
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
