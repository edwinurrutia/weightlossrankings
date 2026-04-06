import config from "@/data/featured-modal.json";
import { getProviderBySlug } from "@/lib/data";
import type { Provider } from "@/lib/types";

export interface FeaturedModalConfig {
  enabled: boolean;
  provider_slug: string;
  headline: string;
  subheadline: string;
  features: string[];
  cta_text: string;
  dismissal_cap_hours: number;
  scroll_trigger_percent: number;
  initial_delay_seconds: number;
}

export async function getFeaturedModalData(): Promise<{
  config: FeaturedModalConfig;
  provider: Provider | null;
}> {
  const typed = config as FeaturedModalConfig;
  const provider = await getProviderBySlug(typed.provider_slug);
  return { config: typed, provider: provider ?? null };
}
