// Multi-user admin auth helper.
//
// Reads the ADMIN_USERS env var (format: "alice:pass1,bob:pass2,carol:pass3")
// and exposes verification + lookup helpers. Falls back to legacy single-user
// mode using ADMIN_PASSWORD if ADMIN_USERS is not set.
//
// IMPORTANT: this module runs in both Edge middleware and Node server
// components, so it must NOT import any Node-only APIs at module top level.
// `next/headers` is imported lazily inside getCurrentAdminUser().

export interface AdminUser {
  username: string;
  // password is never stored in memory longer than verification
}

/**
 * Parse ADMIN_USERS env var into a Map<username, password>.
 * Falls back to ADMIN_PASSWORD legacy single-user mode if ADMIN_USERS unset.
 */
export function parseAdminUsers(): Map<string, string> {
  const raw = process.env.ADMIN_USERS;
  if (!raw) {
    // Fallback: legacy single-user mode using ADMIN_PASSWORD
    const legacyPassword = process.env.ADMIN_PASSWORD;
    if (legacyPassword) return new Map([["admin", legacyPassword]]);
    return new Map();
  }
  const map = new Map<string, string>();
  for (const entry of raw.split(",")) {
    const [user, pass] = entry.split(":");
    if (user && pass) map.set(user.trim(), pass.trim());
  }
  return map;
}

/**
 * Verify a username + password against the configured admin users.
 * Uses constant-time comparison to mitigate timing attacks.
 */
export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const users = parseAdminUsers();
  const stored = users.get(username);
  if (!stored) return false;
  return constantTimeEqual(stored, password);
}

/**
 * Constant-time string comparison. Pure-JS implementation so it works in
 * the Edge runtime where Node `crypto.timingSafeEqual` is unavailable.
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Server component / route handler helper: returns the username of the
 * currently authenticated admin, or null. Reads the `x-admin-user` header
 * set by the middleware on successful basic-auth verification.
 *
 * NOTE: imports `next/headers` lazily so this file remains safe to import
 * from Edge middleware (which can't use `next/headers`).
 */
export async function getCurrentAdminUser(): Promise<string | null> {
  const { headers } = await import("next/headers");
  const h = headers();
  return h.get("x-admin-user");
}

/** List of admin usernames (no passwords). Safe for display in settings. */
export function listAdminUsernames(): string[] {
  return Array.from(parseAdminUsers().keys());
}
