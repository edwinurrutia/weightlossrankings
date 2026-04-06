// Central config helper for the admin CMS — surfaces feature flags so
// the settings page (and any future status checks) can show what's wired up.

import { isCmsConfigured } from "./github-cms";
import { parseAdminUsers } from "./admin-users";

export interface AdminConfig {
  cms_enabled: boolean;
  kv_enabled: boolean;
  multi_user_enabled: boolean;
  user_count: number;
}

export function getAdminConfig(): AdminConfig {
  return {
    cms_enabled: isCmsConfigured(),
    kv_enabled: Boolean(
      process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ),
    multi_user_enabled: Boolean(process.env.ADMIN_USERS),
    user_count: parseAdminUsers().size,
  };
}
