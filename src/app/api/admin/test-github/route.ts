import { NextResponse } from "next/server";
import { isCmsConfigured, testGitHubConnection } from "@/lib/github-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isCmsConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "GitHub CMS is not configured. Set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME.",
      },
      { status: 400 }
    );
  }
  const result = await testGitHubConnection();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
