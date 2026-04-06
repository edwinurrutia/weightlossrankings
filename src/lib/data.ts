import type { Provider, BlogPost, DrugType } from "@/lib/types";
import providersData from "@/data/providers.json";
import blogPostsData from "@/data/blog-posts.json";
import { validateProvider } from "@/lib/schema";

const providers = providersData as unknown as Provider[];
const blogPosts = blogPostsData as unknown as BlogPost[];

export async function getAllProviders(): Promise<Provider[]> {
  return [...providers].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getProviderBySlug(
  slug: string
): Promise<Provider | null> {
  return providers.find((p) => p.slug === slug) ?? null;
}

export async function getProvidersByCategory(
  category: string
): Promise<Provider[]> {
  return providers
    .filter((p) => p.category === category)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllProviderSlugs(): Promise<{ slug: string }[]> {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function getFeaturedProviders(): Promise<Provider[]> {
  // Top GLP-1 providers for the homepage. Featured/sponsored bubble to top,
  // remainder filled by overall score. Returns 6 so the homepage feels alive.
  const glp1 = providers.filter((p) => p.category === "GLP-1 Provider");
  return [...glp1]
    .sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return computeOverallScore(b.scores) - computeOverallScore(a.scores);
    })
    .slice(0, 6);
}

export async function getProvidersByDrug(
  drug: DrugType
): Promise<Provider[]> {
  const all = await getAllProviders();
  return all.filter((p) =>
    p.pricing.some((pr) => pr.drug === drug)
  );
}

export async function getProvidersByDrugAndForm(
  drug: DrugType,
  form: "compounded" | "brand"
): Promise<Provider[]> {
  const all = await getAllProviders();
  return all.filter((p) =>
    p.pricing.some((pr) => pr.drug === drug && pr.form === form)
  );
}

export async function getCheapestProvidersByDrug(
  drug: DrugType,
  limit?: number
): Promise<Provider[]> {
  const providers = await getProvidersByDrug(drug);
  const withPrice = providers.map((p) => {
    const drugPrices = p.pricing.filter((pr) => pr.drug === drug);
    const minPrice = Math.min(
      ...drugPrices.map((pr) => pr.promo_price ?? pr.monthly_cost)
    );
    return { provider: p, minPrice };
  });
  withPrice.sort((a, b) => a.minPrice - b.minPrice);
  const sliced =
    limit !== undefined ? withPrice.slice(0, limit) : withPrice;
  return sliced.map((x) => x.provider);
}

export async function getProvidersByState(
  stateCode: string
): Promise<Provider[]> {
  return providers
    .filter((p) => p.states_available.includes(stateCode))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllBlogPosts(
  limit: number = 20
): Promise<BlogPost[]> {
  return [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    )
    .slice(0, limit);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export interface ValidationReport {
  total: number;
  valid: number;
  invalid: number;
  issues: Array<{ slug: string; name: string; errors: string[] }>;
  stale: Array<{
    slug: string;
    name: string;
    days_since_verified: number;
    last_verified: string;
  }>;
  unverified: Array<{ slug: string; name: string }>;
  recently_verified: Array<{
    slug: string;
    name: string;
    last_verified: string;
  }>;
}

export async function getValidationReport(): Promise<ValidationReport> {
  const issues: ValidationReport["issues"] = [];
  const stale: ValidationReport["stale"] = [];
  const unverified: ValidationReport["unverified"] = [];
  const recently_verified: ValidationReport["recently_verified"] = [];

  let valid = 0;
  let invalid = 0;
  const now = Date.now();
  const DAY_MS = 1000 * 60 * 60 * 24;

  for (const provider of providers) {
    const result = validateProvider(provider);
    if (result.valid) {
      valid++;
    } else {
      invalid++;
      issues.push({
        slug: provider.slug,
        name: provider.name,
        errors: result.errors,
      });
    }

    if (!provider.verification) {
      unverified.push({ slug: provider.slug, name: provider.name });
    } else {
      const verifiedTime = new Date(
        provider.verification.last_verified
      ).getTime();
      const days = Math.floor((now - verifiedTime) / DAY_MS);
      if (days > 30) {
        stale.push({
          slug: provider.slug,
          name: provider.name,
          days_since_verified: days,
          last_verified: provider.verification.last_verified,
        });
      }
      if (days <= 7) {
        recently_verified.push({
          slug: provider.slug,
          name: provider.name,
          last_verified: provider.verification.last_verified,
        });
      }
    }
  }

  stale.sort((a, b) => b.days_since_verified - a.days_since_verified);
  recently_verified.sort((a, b) =>
    b.last_verified.localeCompare(a.last_verified)
  );

  return {
    total: providers.length,
    valid,
    invalid,
    issues,
    stale,
    unverified,
    recently_verified,
  };
}
