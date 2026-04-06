// GitHub-as-backend helper.
//
// Uses the GitHub Contents REST API directly (no Octokit dependency).
// Admin writes from the CMS commit JSON files to the repo, which triggers
// a Vercel deployment with the new content.
//
// Required env vars:
//   GITHUB_TOKEN       — fine-grained PAT with Contents: write
//   GITHUB_REPO_OWNER  — e.g. "edwinurrutia"
//   GITHUB_REPO_NAME   — e.g. "weightlossrankings"
//   GITHUB_BRANCH      — defaults to "main"

const API_BASE = "https://api.github.com";

interface GitHubFileResponse {
  content: string; // base64
  sha: string;
  path: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function getRepoConfig() {
  return {
    owner: requireEnv("GITHUB_REPO_OWNER"),
    repo: requireEnv("GITHUB_REPO_NAME"),
    branch: process.env.GITHUB_BRANCH || "main",
    token: requireEnv("GITHUB_TOKEN"),
  };
}

/**
 * Read a JSON file from the configured GitHub repo.
 * Returns the parsed data plus the file's blob SHA (needed for writes).
 */
export async function readJsonFile<T>(
  path: string
): Promise<{ data: T; sha: string }> {
  const { owner, repo, branch, token } = getRepoConfig();
  const url = `${API_BASE}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  }
  const file = (await res.json()) as GitHubFileResponse;
  const content = Buffer.from(file.content, "base64").toString("utf-8");
  return { data: JSON.parse(content) as T, sha: file.sha };
}

/**
 * Write a JSON file to the configured GitHub repo (create or update).
 * Pass `sha` to update an existing file; omit it to create a new one.
 */
export async function writeJsonFile(opts: {
  path: string;
  data: unknown;
  sha?: string;
  message: string;
  author: { name: string; email: string };
}): Promise<{ commit_sha: string }> {
  const { owner, repo, branch, token } = getRepoConfig();
  const url = `${API_BASE}/repos/${owner}/${repo}/contents/${opts.path}`;
  const content = Buffer.from(
    JSON.stringify(opts.data, null, 2) + "\n",
    "utf-8"
  ).toString("base64");

  const body: Record<string, unknown> = {
    message: opts.message,
    content,
    branch,
    committer: opts.author,
    author: opts.author,
  };
  if (opts.sha) body.sha = opts.sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  }
  const result = (await res.json()) as { commit?: { sha?: string } };
  return { commit_sha: result.commit?.sha ?? "" };
}

/** True if all required GitHub CMS env vars are present. */
export function isCmsConfigured(): boolean {
  return Boolean(
    process.env.GITHUB_TOKEN &&
      process.env.GITHUB_REPO_OWNER &&
      process.env.GITHUB_REPO_NAME
  );
}

/**
 * Lightweight connection check: tries to fetch repo metadata.
 * Returns { ok: true } on success or { ok: false, error } on failure.
 */
export async function testGitHubConnection(): Promise<
  { ok: true; repo: string } | { ok: false; error: string }
> {
  try {
    const { owner, repo, token } = getRepoConfig();
    const res = await fetch(`${API_BASE}/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, error: `${res.status} ${await res.text()}` };
    }
    return { ok: true, repo: `${owner}/${repo}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
