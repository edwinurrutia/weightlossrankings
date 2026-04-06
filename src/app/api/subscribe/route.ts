import { NextRequest, NextResponse } from "next/server";
import { subscribeToConvertKit } from "@/lib/convertkit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const result = await subscribeToConvertKit(trimmed, {
      source: typeof source === "string" ? source : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
