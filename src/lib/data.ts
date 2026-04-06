import type { Provider, BlogPost } from "@/lib/types";
import providersData from "@/data/providers.json";
import blogPostsData from "@/data/blog-posts.json";

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
  return providers
    .filter((p) => p.is_featured)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 3);
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
