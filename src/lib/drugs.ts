import type { Drug } from "@/lib/types";
import drugsData from "@/data/drugs.json";

const drugs = drugsData as unknown as Drug[];

export function getAllDrugs(): Drug[] {
  return [...drugs];
}

export function getDrugBySlug(slug: string): Drug | undefined {
  return drugs.find((d) => d.slug === slug);
}

export function getAllDrugSlugs(): { slug: string }[] {
  return drugs.map((d) => ({ slug: d.slug }));
}
