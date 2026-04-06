import citiesData from "@/data/cities.json";

export interface City {
  slug: string;
  city: string;
  state: string;
  state_code: string;
  population: number;
  metro_population: number;
  obesity_rate: number;
  notable_clinics: string[];
  intro: string;
}

const cities = citiesData as City[];

export function getAllCities(): City[] {
  return [...cities];
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug.toLowerCase());
}

export function getAllCitySlugs(): { city: string }[] {
  return cities.map((c) => ({ city: c.slug }));
}

/**
 * Drugs available for /cities/[city]/[drug] pages.
 * Limited to the two generic GLP-1 molecules to keep page count at 40
 * (20 cities x 2 drugs).
 */
export const CITY_DRUG_SLUGS = ["semaglutide", "tirzepatide"] as const;
export type CityDrugSlug = (typeof CITY_DRUG_SLUGS)[number];

export function isCityDrugSlug(slug: string): slug is CityDrugSlug {
  return (CITY_DRUG_SLUGS as readonly string[]).includes(slug);
}

export function getCityDrugLabel(slug: CityDrugSlug): string {
  if (slug === "semaglutide") return "Semaglutide";
  return "Tirzepatide";
}
