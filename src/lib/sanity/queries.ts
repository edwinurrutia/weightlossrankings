// All providers ordered by name, all fields except review_content, slug resolved
export const ALL_PROVIDERS_QUERY = `*[_type == "provider"] | order(name asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  "slug": slug.current,
  description,
  logo,
  website,
  category,
  states_available,
  is_featured,
  rating,
  price,
  pros,
  cons
}`;

// Single provider by slug, including review_content
export const PROVIDER_BY_SLUG_QUERY = `*[_type == "provider" && slug.current == $slug][0] {
  ...,
  "slug": slug.current
}`;

// Providers filtered by category
export const PROVIDERS_BY_CATEGORY_QUERY = `*[_type == "provider" && category == $category] | order(name asc) {
  ...,
  "slug": slug.current
}`;

// Just slugs for all providers
export const ALL_PROVIDER_SLUGS_QUERY = `*[_type == "provider"] {
  "slug": slug.current
}`;

// All categories with parent_slug resolved
export const ALL_CATEGORIES_QUERY = `*[_type == "category"] | order(name asc) {
  ...,
  "slug": slug.current,
  "parent_slug": parent->slug.current
}`;

// Single category by slug
export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  ...,
  "slug": slug.current,
  "parent_slug": parent->slug.current
}`;

// Category slugs only (no parent)
export const ALL_CATEGORY_SLUGS_QUERY = `*[_type == "category"] {
  "slug": slug.current
}`;

// Blog posts ordered by date desc, limited by $limit, no body
export const BLOG_POSTS_QUERY = `*[_type == "post"] | order(date desc) [0...$limit] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  date,
  excerpt,
  mainImage,
  author,
  categories
}`;

// Single blog post by slug, including body
export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  ...,
  "slug": slug.current
}`;

// Just blog slugs
export const ALL_BLOG_SLUGS_QUERY = `*[_type == "post"] {
  "slug": slug.current
}`;

// Featured providers (is_featured == true), limit 3
export const FEATURED_PROVIDERS_QUERY = `*[_type == "provider" && is_featured == true] | order(name asc) [0...3] {
  ...,
  "slug": slug.current
}`;

// Providers where $stateCode is in states_available
export const PROVIDERS_BY_STATE_QUERY = `*[_type == "provider" && $stateCode in states_available] | order(name asc) {
  ...,
  "slug": slug.current
}`;
