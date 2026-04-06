import { NextResponse } from "next/server";
import { getAllProviders } from "@/lib/data";

export async function GET() {
  try {
    const providers = await getAllProviders();
    return NextResponse.json(providers);
  } catch (err) {
    console.error("Error fetching providers:", err);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
