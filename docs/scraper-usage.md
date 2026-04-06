# Provider Scraper Usage

The provider scraper (`scripts/scrape-providers.ts`) keeps GLP-1 pricing data in
`src/data/providers.json` honest by periodically fetching each provider's site,
extracting prices, and comparing them to what we have stored.

## Architecture

Two layers, both opt-in to a third:

1. **Static layer** — plain `fetch()` + regex against the rendered HTML.
   Fast (~30s for 50 providers). Always runs.
2. **Browser layer** — Playwright headless Chromium fallback for JS-rendered
   sites (Hims, Ro, Eden, etc.). Only kicks in when static fetch returned 200
   but no prices were extracted. Optional — see install instructions below.
3. **Auto-update layer** — `--auto-update` flag bumps `verification.confidence`
   and `verification.last_verified` based on scrape results. **Never modifies
   stored prices.** Price changes still require manual review.

## Install Playwright (local only — NOT in production)

Playwright is intentionally not in `package.json` to keep the Vercel build
small. Install it locally when you want browser fallback:

```bash
npm install -D playwright
npx playwright install chromium
```

The scraper auto-detects whether Playwright is installed. If it isn't, the
script silently runs in static-only mode.

## Run

```bash
# Full run with browser fallback (if Playwright is installed)
npm run scrape

# Static only — no browser, no Playwright dependency required
npm run scrape:fast

# Auto-update verification metadata for matched/mismatched providers
npm run scrape:auto

# Smoke test on first 5 providers
npx tsx scripts/scrape-providers.ts --no-browser --limit 5
```

## Reports

Each run writes two files to `docs/`:

- `scraper-report-YYYY-MM-DD.md` — human-readable, mismatches at the top
- `scraper-report-YYYY-MM-DD.json` — programmatic consumption

## Interpreting the report

| Status | Meaning | Action |
|---|---|---|
| `match` | At least one stored price was found verbatim on the site | None |
| `mismatch` | Site loaded and prices were found, but none matched stored data | Manually review — prices may have changed |
| `no_data_found` | Site loaded but no price patterns matched (likely JS-rendered) | Run with browser fallback, or verify manually |
| `fetch_failed` | Could not reach the site at all | Check the affiliate_url |

## Manual verification flow

When the scraper flags a mismatch:

1. Visit the provider's site, confirm the real price.
2. Edit `src/data/providers.json` if pricing changed.
3. Mark verified: `npm run mark-verified <slug>`

## Suggested cron schedule

Weekly is a good cadence. Add to a local cron or GitHub Actions workflow:

```cron
# Every Monday at 9am ET
0 14 * * 1  cd ~/weightlossrankings && npm run scrape:fast >> ~/wlr-scrape.log 2>&1
```

For browser fallback in CI, install Playwright in the workflow step rather than
making it a permanent dep.

## Auto-update confidence rules

| Before | Scrape result | After |
|---|---|---|
| `low` | match | `medium` |
| `medium` | match | `high` |
| `high` | match | `high` |
| `high` | mismatch | `medium` |
| `medium` | mismatch | `low` |
| `low` | mismatch | `low` |

Auto-update writes `verification.notes` so you can audit which entries were
touched by the scraper vs. by humans.
