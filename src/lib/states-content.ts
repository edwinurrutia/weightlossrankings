import statesContent from "@/data/states-content.json";

export interface StateContent {
  name: string;
  slug: string;
  telehealth_legal: boolean;
  medicaid_glp1_coverage: string;
  average_compounded_price_monthly: number;
  top_cities: string[];
  obesity_rate: number;
  obesity_rank: number;
  regulatory_notes: string;
  key_facts: string[];
}

export function getStateContent(stateCode: string): StateContent | null {
  return (statesContent as Record<string, StateContent>)[stateCode] ?? null;
}
