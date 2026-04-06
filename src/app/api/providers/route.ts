import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity/client";
import { ALL_PROVIDERS_QUERY } from "@/lib/sanity/queries";

export async function GET() {
  try {
    const providers = await sanityClient.fetch(ALL_PROVIDERS_QUERY);
    return NextResponse.json(providers);
  } catch (err) {
    console.error("Error fetching providers from Sanity:", err);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
