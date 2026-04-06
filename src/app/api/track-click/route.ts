import { NextResponse } from "next/server";
import { incrementClick } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const provider = typeof body?.provider === "string" ? body.provider : "";
    const source = typeof body?.source === "string" ? body.source : "unknown";
    const rawPosition = body?.position;

    if (!provider) {
      return NextResponse.json({ ok: false, error: "missing provider" }, { status: 400 });
    }

    // Basic sanitization: slugs/sources should be short, ASCII-safe
    const safe = (s: string) => s.replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 80);
    const p = safe(provider);
    const s = safe(source) || "unknown";

    if (!p) {
      return NextResponse.json({ ok: false, error: "invalid provider" }, { status: 400 });
    }

    // Position is optional. Accept 1..100 only — anything outside is dropped
    // (and the click still records). Reject NaN, negatives, decimals, and
    // anything that's not a finite number.
    let position: number | null = null;
    if (typeof rawPosition === "number" && Number.isFinite(rawPosition)) {
      const intPos = Math.floor(rawPosition);
      if (intPos > 0 && intPos <= 100) position = intPos;
    }

    await incrementClick(p, s, position);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track-click] error", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
