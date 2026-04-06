# GitHub Actions Workflows

WeightLossRankings.org currently runs two automated audit workflows. Neither
workflow writes to the repository — they are read-only observers that open
GitHub issues when human attention is needed.

---

## audit-sources.yml — Weekly source freshness audit

**What it does**

Fetches every external URL in the citation registry (`src/lib/citations.ts`),
compares content hashes against the committed baseline in
`data/source-snapshots.json`, and classifies each entry as:

| Status  | Meaning |
|---------|---------|
| OK      | Live and hash matches baseline |
| DRIFT   | Live but content has changed since last baseline |
| BROKEN  | Non-2xx, timeout, or connection error |
| SKIPPED | PubMed entry — status check only, no hashing |

**Schedule**

Mondays at 09:00 UTC (04:00 ET / 05:00 ET DST). Weekly is deliberately
conservative: major sources (NEJM, FDA, CDC, KFF) change slowly, and ~60
outbound fetches per week is polite to the publishers.

**Triggering manually**

Actions tab > "Sources freshness audit" > Run workflow > Run workflow.

**Issue labels**

| Label          | When opened |
|----------------|-------------|
| `sources-audit` + `urgent` | At least one BROKEN source (script exits 1) |
| `sources-audit` + `review` | DRIFT detected, no broken sources (script exits 0) |

**Duplicate-issue handling**

If an open issue with the same title prefix already exists (same category:
broken vs. drift), the workflow adds a comment to that issue instead of
opening a new one. This prevents spam on long-running issues that are
awaiting human review.

**Silencing a known false-positive**

Close the issue and add the `wontfix` label. The workflow will open a new
issue on the next run if the condition persists (different run date in
title), but the comment-deduplication logic will keep it clean as long as
it remains open.

**Why --no-update is enforced**

The workflow always passes `--no-update` to the script. This means the
snapshot baseline (`data/source-snapshots.json`) is never modified by CI.
Re-baselining is a human operation: run `npm run audit:sources -- --refresh`
locally after reviewing each flagged drift, then commit the result and
open a PR.

**Artifacts**

JSON report (`/tmp/sources-audit-YYYY-MM-DD.json`) is uploaded as a
workflow artifact on every run, retained for 30 days. Download it from:
Actions tab > the specific workflow run > the Artifacts section at the
bottom of the page.

---

## audit-pricing.yml — Daily pricing drift audit

**What it does**

Visits a random sample of 20 provider websites using Playwright (headless
Chromium), extracts price candidates with heuristic scrapers (JSON-LD,
`$/month` patterns, broad `$` sweep), and compares the consensus price
against the values stored in `src/data/providers.json`.

Severity tiers:

| Severity | Threshold | Action |
|----------|-----------|--------|
| HIGH     | delta > $20 or > 15% | Script exits 1; issue opened |
| MEDIUM   | delta > $10 or > 8%  | Script exits 0; visible in artifact only |
| OK       | within tolerance | No action |
| UNKNOWN  | price not extractable | No action |

**Schedule**

Daily at 11:00 UTC (06:00 ET / 07:00 ET DST). Pricing changes more
frequently than citation content, so daily is appropriate. Each run covers
a different random sample, giving broad weekly coverage with manageable
daily cost.

**Triggering manually**

Actions tab > "Pricing drift audit" > Run workflow > Run workflow.

**Issue labels**

| Label | When opened |
|-------|-------------|
| `pricing-audit` + `urgent` | At least one HIGH severity drift (script exits 1) |

MEDIUM and UNKNOWN results are never noisy — they appear only in the
downloaded artifact.

**Duplicate-issue handling**

Same deduplication logic as the sources audit: open issues are commented on
rather than duplicated.

**Silencing a known false-positive**

Close the issue and add the `wontfix` label. Common false-positive causes:
- Provider site blocks headless browsers (Playwright falls back to static
  fetch, which may miss JavaScript-rendered prices)
- Promo pricing temporarily shown on the landing page

For persistent bot-blocking providers, consider adding `--no-browser` in a
local test to verify the static fetch result, then update providers.json if
warranted.

**Playwright**

The workflow runs `npx playwright install --with-deps chromium` before the
audit. Chromium is not cached between runs (its install takes ~30 seconds).
This keeps the workflow self-contained with no additional caching setup.

**Artifacts**

JSON report (`/tmp/pricing-audit-YYYY-MM-DD.json`) uploaded on every run,
retained for 14 days. Download from:
Actions tab > the specific workflow run > the Artifacts section.

---

## Permissions

Both workflows request the minimum necessary permissions:

```yaml
permissions:
  contents: read   # git checkout
  issues: write    # open / comment on issues
```

No push, packages, pull-request, or deployment permissions are requested.

---

## Labels auto-created

On first issue creation the workflows will create these labels if they do
not already exist:

| Label | Color | Used by |
|-------|-------|---------|
| `sources-audit` | indigo `#6366f1` | both sources workflow issues |
| `pricing-audit` | orange `#f97316` | pricing workflow issues |
| `urgent`        | red    `#e11d48` | BROKEN / HIGH severity issues |
| `review`        | amber  `#f59e0b` | DRIFT-only issues |

You can also create these manually in the repository's Labels settings
page before the first run.
