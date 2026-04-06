import pharmaciesData from "@/data/pharmacies.json";

export interface PharmacyVerification {
  last_verified: string;
  verified_by: string;
  source_urls: string[];
  confidence: "high" | "medium" | "low";
  notes?: string;
}

export interface PharmacyRegulatoryAction {
  date: string;
  description: string;
}

export interface PharmacyExternalReviews {
  google_score?: number;
  google_count?: number;
}

export interface Pharmacy {
  _id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  established?: number;
  type: "503A" | "503B" | "Both";
  certifications: string[];
  states_licensed: string[];
  produces_semaglutide: boolean;
  produces_tirzepatide: boolean;
  linked_providers: string[];
  website: string;
  phone?: string;
  regulatory_actions: PharmacyRegulatoryAction[];
  external_reviews?: PharmacyExternalReviews;
  internal_score: number;
  description: string;
  verification: PharmacyVerification;
}

const pharmacies = pharmaciesData as Pharmacy[];

export function getAllPharmacies(): Pharmacy[] {
  return [...pharmacies];
}

export function getPharmacyBySlug(slug: string): Pharmacy | undefined {
  return pharmacies.find((p) => p.slug === slug.toLowerCase());
}

export function getAllPharmacySlugs(): { slug: string }[] {
  return pharmacies.map((p) => ({ slug: p.slug }));
}

export function getPharmaciesByState(stateCode: string): Pharmacy[] {
  const code = stateCode.toUpperCase();
  return pharmacies.filter((p) => p.states_licensed.includes(code));
}

export function getPharmaciesByDrug(
  drug: "semaglutide" | "tirzepatide",
): Pharmacy[] {
  if (drug === "semaglutide") {
    return pharmacies.filter((p) => p.produces_semaglutide);
  }
  return pharmacies.filter((p) => p.produces_tirzepatide);
}
