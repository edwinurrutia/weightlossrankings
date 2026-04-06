// Cookie-based admin session helpers.
//
// Uses the Web Crypto API (HMAC-SHA256) so it runs in both Edge middleware
// and the Node server runtime without any extra dependencies.
//
// Session token format: `${base64url(payloadJson)}.${base64url(hmac)}`
//
// Required env var:
//   ADMIN_SESSION_SECRET — random string (32+ chars) used to sign cookies.
//   Generate with: `openssl rand -hex 32`

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

interface SessionPayload {
  username: string;
  expires: number; // unix timestamp ms
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET env var is required");
  }
  return secret;
}

async function importKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function base64UrlEncode(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  const padded =
    str.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((str.length + 3) % 4);
  const bin = atob(padded);
  // Allocate a fresh ArrayBuffer (not SharedArrayBuffer) so the resulting
  // Uint8Array is acceptable as a BufferSource for crypto.subtle APIs.
  const buf = new ArrayBuffer(bin.length);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export async function createSession(username: string): Promise<string> {
  const payload: SessionPayload = {
    username,
    expires: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const json = JSON.stringify(payload);
  const enc = new TextEncoder();
  const data = enc.encode(json);
  const key = await importKey(getSecret());
  const sig = await crypto.subtle.sign("HMAC", key, data);
  return `${base64UrlEncode(data)}.${base64UrlEncode(sig)}`;
}

export async function verifySession(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  try {
    const payloadBytes = base64UrlDecode(parts[0]);
    const sigBytes = base64UrlDecode(parts[1]);
    const key = await importKey(getSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes.buffer as ArrayBuffer,
      payloadBytes.buffer as ArrayBuffer
    );
    if (!valid) return null;
    const json = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(json) as SessionPayload;
    if (
      typeof payload.username !== "string" ||
      typeof payload.expires !== "number"
    ) {
      return null;
    }
    if (payload.expires < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_CONFIG = {
  cookieName: SESSION_COOKIE_NAME,
  ttlSeconds: SESSION_TTL_SECONDS,
};
