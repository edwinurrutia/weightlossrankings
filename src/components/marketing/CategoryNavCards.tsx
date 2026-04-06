import Link from "next/link";
import Image from "next/image";

export interface CategoryNavCard {
  emoji?: string;
  image?: string;
  label: string;
  slug: string;
  description?: string;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((cat) => {
        const hasImage = Boolean(cat.image);

        const inner = (
          <div className="group/card relative bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-200 hover:border-brand-violet/40 hover:-translate-y-0.5 hover:shadow-md">
            {hasImage ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image
                  src={cat.image as string}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
              </div>
            ) : cat.emoji ? (
              <div className="flex items-center justify-center h-28 bg-gray-50 text-4xl">
                {cat.emoji}
              </div>
            ) : null}
            <div className="p-5 flex flex-col gap-1 flex-1">
              <h3 className="font-heading font-semibold text-brand-text-primary text-base leading-snug">
                {cat.label}
              </h3>
              {cat.description && (
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {cat.description}
                </p>
              )}
              {cat.comingSoon && (
                <span className="text-xs text-brand-text-secondary mt-1">
                  Coming soon
                </span>
              )}
            </div>
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
