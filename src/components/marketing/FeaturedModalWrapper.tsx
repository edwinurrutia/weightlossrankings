import { getFeaturedModalData } from "@/lib/featured-modal";
import FeaturedProviderModal from "./FeaturedProviderModal";

/**
 * Server component that loads featured-modal config + provider data
 * and renders the client modal. Returns null when disabled or when
 * the configured provider cannot be resolved.
 */
export default async function FeaturedModalWrapper() {
  const { config, provider } = await getFeaturedModalData();
  if (!config.enabled || !provider) return null;
  return <FeaturedProviderModal config={config} provider={provider} />;
}
