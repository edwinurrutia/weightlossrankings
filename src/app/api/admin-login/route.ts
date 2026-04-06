import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminCredentials } from "@/lib/admin-users";
import { createSession, SESSION_CONFIG } from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const username = body?.username?.trim();
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 }
    );
  }

  if (!verifyAdminCredentials(username, password)) {
    // Generic error — don't reveal whether user exists.
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = await createSession(username);
  } catch (err) {
    console.error("[admin-login] createSession failed", err);
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_CONFIG.cookieName,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_CONFIG.ttlSeconds,
  });
  return res;
}
