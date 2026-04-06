export type DrugType = "semaglutide" | "tirzepatide";

export interface Pricing {
  dose: string;
  form: "compounded" | "brand";
  drug?: DrugType;
  monthly_cost: number;
  promo_code?: string;
  promo_price?: number;
}

export interface Scores {
  value: number;
  effectiveness: number;
  ux: number;
  trust: number;
  accessibility: number;
  support: number;
}

export interface FdaWarning {
  date: string;
  description: string;
}

export interface ExternalReviews {
  trustpilot_score?: number;
  trustpilot_count?: number;
  google_score?: number;
  google_count?: number;
}

export interface ProviderVerification {
  last_verified: string; // ISO date string YYYY-MM-DD
  verified_by?: "manual" | "scraper" | "owner-confirmed";
  source_urls: string[]; // URLs we used to verify pricing/features
  confidence: "high" | "medium" | "low";
  notes?: string;
}

export interface Provider {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  description: string;
  category: string;
  pricing: Pricing[];
  scores: Scores;
  features: string[];
  states_available: string[];
  affiliate_url: string;
  affiliate_network?: string;
  fda_warnings: FdaWarning[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  review_content?: any;
  pros: string[];
  cons: string[];
  best_for?: string;
  is_featured: boolean;
  external_reviews?: ExternalReviews;
  verification?: ProviderVerification;
}

export interface Drug {
  _id: string;
  name: string;
  slug: string;
  generic_name: string;
  brand_names: string[];
  description: string;
  how_it_works: string;
  side_effects: string;
  fda_status: string;
  approval_date?: string;
  dosing_schedule: { week_range: string; dose: string }[];
  clinical_trial_summary?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  parent_category?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  author: string;
  published_date: string;
  updated_date?: string;
  category: string;
  tags: string[];
  featured_image?: string | null;
  /**
   * Optional list of citation registry IDs (from src/lib/citations.ts)
   * that ground the factual claims in this post. Rendered as a
   * SourcesPanel at the bottom of the post via /blog/[slug]/page.tsx.
   */
  sources?: string[];
}

export interface USState {
  name: string;
  code: string;
  slug: string;
}

export type SortOption = "cheapest" | "highest-rated" | "most-reviewed";

export interface FilterState {
  category?: string;
  drug_type?: string;
  drug?: DrugType;
  form?: string;
  state?: string;
  dose?: string;
  min_price?: number;
  max_price?: number;
  features?: string[];
  sort: SortOption;
}
