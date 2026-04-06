# Sources Audit — How-To

Operational guide for `scripts/audit-sources.ts`.

## What this script does

Every external claim on WeightLossRankings.org traces back to an entry in
`src/lib/citations.ts`. This script periodically checks each entry's URL
to answer two questions:

1. **Is the URL still live?** — does it return HTTP 2xx?
2. **Has the content drifted?** — has the page body changed materially since
   the last time we hashed it?

The "last known good" baseline lives in `data/source-snapshots.json` (committed
to git, ~20 KB). Each run compares the freshly-fetched content hash against
the baseline and assigns each entry one of four statuses:

| Status   | Meaning                                                              |
|----------|----------------------------------------------------------------------|
| OK       | URL fetched 2xx and the content hash matches the baseline.          |
| DRIFT    | URL fetched 2xx but the hash changed. A human should review.        |
| BROKEN   | URL returned non-2xx, timed out, or errored. Likely needs a fix.    |
| SKIPPED  | PubMed (`pmid`) entry — status check only, no hashing (PubMed URLs are stable). |

## How to run it

```bash
npm run audit:sources
```

Useful flags:

```bash
# Read-only — never write the snapshot file. Good for ad-hoc checks.
npm run audit:sources -- --no-update

# Audit one citation by id.
npm run audit:sources -- --id step1-nejm-2021

# Audit one category.
npm run audit:sources -- --category clinical-trial

# Quiet mode — only print the final summary.
npm run audit:sources -- --quiet

# Re-baseline: accept ALL current hashes as the new baseline.
# Use this AFTER manually reviewing each drift and confirming the source
# still supports the claim it backs.
npm run audit:sources -- --refresh
```

The full flag list is also available via `npm run audit:sources -- --help`.

## How to interpret results

- **OK** — no action needed.
- **SKIPPED** — no action needed; PubMed URLs almost never break.
- **DRIFT** — open the URL in a browser, compare with the citation `label`
  and `dataYear`, and decide:
  - If the source still supports the claim → re-baseline with `--refresh`.
  - If the source has materially changed (study retracted, page restructured,
    numbers updated) → fix the citation in `src/lib/citations.ts` (update
    `accessedDate`, `dataYear`, or replace the URL), then re-baseline.
- **BROKEN** — urgent. Open the URL in a browser:
  - If it loads in a browser but the script gets 403, the publisher is
    blocking bots. Verify manually and the script will accept it on a
    future run if the publisher unblocks; otherwise consider replacing
    with a more bot-friendly canonical URL.
  - If the URL really is dead (404, moved), find the new canonical URL,
    update `src/lib/citations.ts`, and re-run.

> **False positives are normal.** Hashes flag any text change, including
> cookie banners, "last updated" timestamps, and ad-rotation copy. The
> script is a tripwire; a human is the judge.

## When to use `--refresh`

Use `--refresh` only after you have manually opened every DRIFT entry and
confirmed the source still supports the underlying claim. Running
`--refresh` blindly defeats the purpose of having a baseline.

Recommended flow:

1. `npm run audit:sources` (regular run, may report DRIFT)
2. Open each drifted URL, verify the claim still holds.
3. If all good: `npm run audit:sources -- --refresh` to re-baseline.
4. Commit the updated `data/source-snapshots.json`.

## Suggested cadence

Weekly is plenty. Most cited sources (NEJM, FDA, CDC, KFF) change on a
much slower cadence than that, and the per-run cost is ~30 seconds per
source. A Monday morning run lets the team triage drift before the
publishing week begins.

## Example GitHub Actions workflow

Save as `.github/workflows/sources-audit.yml`:

```yaml
name: sources-audit

on:
  schedule:
    # 14:00 UTC = 09:00 ET Monday
    - cron: "0 14 * * 1"
  workflow_dispatch: {}

jobs:
  audit:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - run: npm ci
      - name: Run sources audit
        id: audit
        run: npm run audit:sources -- --no-update --quiet
        continue-on-error: true
      - name: Open issue on drift / broken
        if: steps.audit.outcome == 'failure'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const date = new Date().toISOString().slice(0, 10);
            const reportPath = `/tmp/sources-audit-${date}.json`;
            const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
            const broken = report.results.filter(r => r.status === 'broken');
            const drift = report.results.filter(r => r.status === 'drift');
            const body = [
              `Weekly sources audit — ${date}`,
              ``,
              `**Totals:** OK ${report.totals.ok} · DRIFT ${report.totals.drift} · BROKEN ${report.totals.broken} · SKIPPED ${report.totals.skipped}`,
              ``,
              broken.length ? `### Broken\n${broken.map(b => `- \`${b.id}\` — ${b.error || 'HTTP ' + b.httpStatus}\n  ${b.url}`).join('\n')}` : '',
              drift.length ? `### Drift\n${drift.map(d => `- \`${d.id}\` (last unchanged ${d.lastChanged})\n  ${d.url}`).join('\n')}` : '',
              ``,
              `Re-baseline locally with \`npm run audit:sources -- --refresh\` after review.`,
            ].filter(Boolean).join('\n');
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Sources audit — ${date} (${broken.length} broken, ${drift.length} drift)`,
              body,
              labels: ['sources-audit'],
            });
```

Note the workflow uses `--no-update`: the snapshot baseline should be
updated by humans via PR, not by CI, so re-baselining requires explicit
review.

## File map

- `scripts/audit-sources.ts` — the script
- `data/source-snapshots.json` — committed baseline (last known good hashes)
- `/tmp/sources-audit-YYYY-MM-DD.json` — per-run JSON report (gitignored, used by CI)
- `src/lib/citations.ts` — the registry being audited (do not modify from this script)

---

## Automated Weekly Audit (GitHub Actions)

The workflow at `.github/workflows/audit-sources.yml` runs the audit
automatically every **Monday at 09:00 UTC** and opens a GitHub issue when
anything requires attention. A `workflow_dispatch` trigger lets you kick it
off on demand from the Actions tab without waiting for Monday.

### What the workflow does

1. Checks out the repo and installs dependencies with `npm ci`.
2. Runs `npm run audit:sources -- --no-update --quiet` (read-only — the
   snapshot baseline is never written by CI).
3. Reads the JSON report from `/tmp/sources-audit-YYYY-MM-DD.json`.
4. Opens or updates a GitHub issue based on the results:

| Outcome | Issue title prefix | Labels |
|---------|--------------------|--------|
| At least one BROKEN source | `🚨 [Sources Audit] BROKEN sources detected` | `sources-audit` + `urgent` |
| DRIFT only (no broken) | `⚠️ [Sources Audit] Drift detected` | `sources-audit` + `review` |
| All OK / SKIPPED | No issue opened | — |

5. Uploads the JSON report as a workflow artifact (retained 30 days).

### Duplicate-issue handling

If an open issue with the same title prefix already exists, the workflow
adds a comment to it rather than opening a new issue. This means a single
issue tracks the condition until you resolve it and close the issue.

### Issue labels

- `sources-audit` — all issues from this workflow
- `urgent` — at least one BROKEN URL (the site is citing a dead link)
- `review` — content drift detected (the cited page has changed)

### Interpreting the issue body

The issue body contains a summary table (OK / DRIFT / BROKEN / SKIPPED
counts) followed by two sections:

- **Broken sources** — each entry shows the citation ID, the failure reason
  (e.g. `http_404`, `timeout`), the consecutive failure count, and the URL.
- **Drift flagged** — each entry shows the citation ID, the date the hash
  last matched, and the URL.

These are the same entries you would see in a local `--quiet` run but
formatted as Markdown for the issue.

### Re-baselining is always a manual operation

The `--refresh` flag is never run by CI. After reviewing flagged drift:

```bash
# 1. Run locally to get the current hashes
npm run audit:sources -- --refresh

# 2. Commit the updated snapshot
git add data/source-snapshots.json
git commit -m "chore(citations): re-baseline source snapshots YYYY-MM-DD"
git push origin <branch>
# Open a PR for review
```

Committing the snapshot through a PR keeps the baseline change visible and
reviewable — it is the paper trail that the cited sources were checked.

### Silencing a known false-positive

Close the GitHub issue and add the `wontfix` label. The workflow will open
a new issue on the next run if the condition is still present (a different
date will be in the title), but if you keep the old issue open the
deduplication logic will keep posting comments rather than new issues.

### Artifact download

Every run (including clean runs) uploads the JSON report. To download it:
Actions tab > the specific "Sources freshness audit" run > scroll to the
Artifacts section at the bottom of the page > click
`sources-audit-report-<run_id>`.
