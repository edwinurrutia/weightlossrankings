import insurersData from "@/data/insurers.json";

export interface Insurer {
  slug: string;
  name: string;
  short_name: string;
  covers_glp1: "yes" | "no" | "limited" | "varies";
  wegovy_coverage: string;
  ozempic_coverage: string;
  mounjaro_coverage: string;
  zepbound_coverage: string;
  typical_copay_with_coverage: string;
  prior_auth_required: boolean;
  member_count: number;
  alternative_providers_when_denied: string[];
}

const insurers = insurersData as Insurer[];

export function getAllInsurers(): Insurer[] {
  return [...insurers];
}

export function getInsurerBySlug(slug: string): Insurer | undefined {
  return insurers.find((i) => i.slug === slug.toLowerCase());
}

export function getAllInsurerSlugs(): { insurer: string }[] {
  return insurers.map((i) => ({ insurer: i.slug }));
}
