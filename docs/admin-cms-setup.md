# Admin CMS Setup

This document explains how to configure the WeightLossRankings admin CMS
(`/admin`) — multi-user auth, GitHub-as-backend writes, and the audit log.

## URL Structure

| Path                       | Purpose                                          |
| -------------------------- | ------------------------------------------------ |
| `/admin`                   | Dashboard (click analytics)                      |
| `/admin/providers`         | Provider CRUD (wave 2)                           |
| `/admin/scraper`           | Scraper review (wave 2)                          |
| `/admin/content`           | Content editor (wave 2)                          |
| `/admin/data-quality`      | Existing data-quality report                     |
| `/admin/audit-log`         | Audit log of every admin write                   |
| `/admin/settings`          | Read-only settings & integration status          |
| `/admin/sign-out`          | Clears HTTP basic-auth credentials               |
| `/api/admin/test-github`   | Returns 200 if the GitHub PAT is valid           |

All admin pages emit `noindex, nofollow` and are gated by middleware
(`src/middleware.ts`).

## Environment Variables

| Variable             | Required | Purpose                                              |
| -------------------- | -------- | ---------------------------------------------------- |
| `ADMIN_USERS`        | yes\*    | Comma-separated `user:pass` pairs                    |
| `ADMIN_PASSWORD`     | legacy\* | Single-user fallback if `ADMIN_USERS` is unset       |
| `GITHUB_TOKEN`       | yes      | Fine-grained PAT, Contents: write                    |
| `GITHUB_REPO_OWNER`  | yes      | e.g. `edwinurrutia`                                  |
| `GITHUB_REPO_NAME`   | yes      | e.g. `weightlossrankings`                            |
| `GITHUB_BRANCH`      | no       | Defaults to `main`                                   |
| `KV_REST_API_URL`    | yes      | Vercel KV REST endpoint (audit log + analytics)      |
| `KV_REST_API_TOKEN`  | yes      | Vercel KV REST token                                 |

\* Either `ADMIN_USERS` or `ADMIN_PASSWORD` must be set. `ADMIN_USERS` wins
when both are present.

## Multi-user Auth

`ADMIN_USERS` format (comma-separated `user:password` pairs, no quotes):

```
ADMIN_USERS=alice:s3cret1,bob:s3cret2,carol:s3cret3
```

Rules:

- Whitespace around `user` and `password` is trimmed.
- Passwords cannot contain `,` or `:` (use `ADMIN_PASSWORD` legacy mode if
  you need either character — wave 2 will move to a stronger format).
- Comparisons are constant-time (pure JS — Edge runtime safe).

The middleware writes the verified username to the request as the
`x-admin-user` header. Server components can read it via:

```ts
import { getCurrentAdminUser } from "@/lib/admin-users";
const username = await getCurrentAdminUser();
```

### Migrating from `ADMIN_PASSWORD`

The legacy single-user mode is still supported. If `ADMIN_USERS` is unset
but `ADMIN_PASSWORD` is set, the system creates a single user named
`admin` with that password. To migrate:

1. In Vercel → Project → Settings → Environment Variables
2. Add `ADMIN_USERS=admin:<your-old-password>,newuser:newpass`
3. Remove `ADMIN_PASSWORD` (optional — it will be ignored)
4. Redeploy.

## GitHub-as-Backend

The CMS commits JSON files to the repo (e.g. `src/data/providers.json`),
and Vercel auto-deploys the change. There is no separate database for
content.

### Creating a fine-grained PAT

1. GitHub → Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token.
2. Resource owner: your account / org.
3. Repository access: only the `weightlossrankings` repo.
4. Permissions:
   - **Contents: Read and write**
   - Metadata: Read-only (added automatically)
5. Expiration: 90 days recommended; rotate via Vercel env vars.
6. Copy the token (starts with `github_pat_…`) and set as `GITHUB_TOKEN`
   in Vercel.

### Helpers

Use `src/lib/github-cms.ts`:

```ts
import { readJsonFile, writeJsonFile, isCmsConfigured } from "@/lib/github-cms";

const { data, sha } = await readJsonFile<MyType>("src/data/providers.json");
await writeJsonFile({
  path: "src/data/providers.json",
  data: updated,
  sha, // pass the previous sha for updates
  message: "admin: update Hims pricing",
  author: { name: "alice", email: "alice@weightlossrankings.org" },
});
```

### Testing the connection

Visit `/api/admin/test-github` while logged in. A 200 with
`{ ok: true, repo: "owner/name" }` means the PAT works. A 502 means the
GitHub API rejected the request — check the `error` field.

## Audit Log

Every admin write should call `logAuditEvent()` from `src/lib/audit-log.ts`.
The log is stored in Vercel KV under the list key `audit:log` (newest
first, capped at 5,000 entries). View it at `/admin/audit-log`.

```ts
import { logAuditEvent } from "@/lib/audit-log";

await logAuditEvent({
  user: username,
  action: "update",
  resource_type: "provider",
  resource_id: "hims",
  summary: "Updated monthly price from $199 to $189",
  diff: { before: { price: 199 }, after: { price: 189 } },
});
```

Audit failures NEVER throw — wrap is internal.

## Manual Verification

```bash
# Build
cd /Users/weightlossrankings && npx next build

# Local sanity check (set env vars first)
ADMIN_USERS=alice:test1 npm run dev
# Then visit http://localhost:3000/admin and log in as alice / test1
```


## Featured Provider Modal

A scroll- and exit-intent-triggered modal promotes one featured provider on public pages (never shown on `/admin` or `/admin-login`).

- Config file: `src/data/featured-modal.json`
- To disable: set `"enabled": false`
- To swap provider: change `provider_slug` to any slug in `src/data/providers.json`
- Other tunables: `headline`, `subheadline`, `features[]`, `cta_text`, `dismissal_cap_hours`, `scroll_trigger_percent`, `initial_delay_seconds`
- Frequency cap is enforced client-side via `localStorage` key `wlr_modal_dismissed_at`
- CTA click fires `/api/track-click` with source `modal_featured_{provider_slug}`
