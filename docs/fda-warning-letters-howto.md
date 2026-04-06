# FDA Warning Letters — How-To

This doc covers the editorial and operational workflow for the FDA Warning
Letters database surfaced at `/fda-warning-letters` and as alert flags on
`/reviews/[provider]` pages.

This is regulated content. The single-most-important rule:

> **Quality > speed. When in doubt, leave it out. A wrong cite on this
> page is libel-shaped risk; a missing entry is just a TODO.**

---

## What this system does

- Maintains an editor-reviewed database of FDA warning letters issued to
  compounded GLP-1 telehealth providers (`src/data/fda-warning-letters.json`).
- Renders an index page at `/fda-warning-letters` (sortable, mobile-first,
  Schema.org `Dataset` markup).
- Renders per-letter detail pages at `/fda-warning-letters/[slug]` with
  Schema.org `Article` markup, a prominent link to the original FDA URL,
  and a boilerplate "what warning letters mean" explainer.
- Surfaces a `<FdaWarningFlag>` alert on `/reviews/[provider]` pages when
  a provider in our dataset has been matched (via the
  `matched_provider_slug` field) to an active warning letter.
- Adds entries to `sitemap.xml` automatically.

## Files in this system

| File | Purpose |
|---|---|
| `src/data/fda-warning-letters.json` | The dataset. Single source of truth. |
| `src/lib/fda-warning-letters.ts` | Typed loader / helpers. |
| `src/app/fda-warning-letters/page.tsx` | Index page. |
| `src/app/fda-warning-letters/[slug]/page.tsx` | Per-letter detail page. |
| `src/components/marketing/FdaWarningFlag.tsx` | Review-page alert component. |
| `scripts/scrape-fda-warning-letters.ts` | Scraper that pulls new entries from fda.gov. |
| `src/app/sitemap.ts` | Sitemap entries (modified). |
| `src/app/reviews/[provider]/page.tsx` | Renders the flag (modified). |

---

## Adding a warning letter manually

Manual curation is the preferred path. Open
`src/data/fda-warning-letters.json` and append an entry:

```json
{
  "id": "company-name-letter-number",
  "company_name": "Company Name LLC",
  "company_dba": "Doing Business As Name",
  "letter_number": "717986",
  "letter_date": "2026-02-20",
  "fda_url": "https://www.fda.gov/.../company-name-717986-02202026",
  "issuing_office": "FDA",
  "subject": "(verbatim FDA subject line)",
  "violations_summary": "(measured factual summary or verbatim FDA quote)",
  "matched_provider_slug": null,
  "status": "active",
  "added_date": "2026-04-06"
}
```

### `id` slug convention

Match the FDA URL slug pattern: `<company-slug>-<letter-number>`. Example:
the FDA URL `…/join-josie-717986-02202026` becomes the id `join-josie-717986`.

### `matched_provider_slug`

Search `src/data/providers.json` for any provider whose name matches the
company. If you find one, use its `slug`. Otherwise leave as `null`. The
review-page flag only renders when a match is set.

### `status`

- `"active"` — the letter is open. (Default for new entries.)
- `"closed-out"` — FDA published a close-out letter. Update the entry but
  do not delete it.
- `"withdrawn"` — FDA withdrew the warning letter.

### `letter_date` vs `added_date`

- `letter_date` is the date FDA issued the letter (from the URL slug or
  the index table).
- `added_date` is the date *we* added it to our dataset. The latest
  `added_date` powers the "as of" stamp on the index page.

---

## Editorial review checklist (BEFORE pushing)

Every new entry must pass all of these:

- [ ] **The fda.gov URL resolves and matches the company.** Open it in a
      browser. If FDA redirects or 404s, do not publish.
- [ ] **The subject line is verbatim** from FDA's index table or the
      letter header. Do not paraphrase.
- [ ] **The `violations_summary` is either a verbatim quote or a measured
      factual description** that does not characterize the company. Avoid
      adjectives like "egregious", "deceptive", or "misleading" unless
      they are inside a quote attributed to FDA.
- [ ] **The disclaimer is rendered.** It is hardcoded into the index and
      detail templates, but verify after layout changes.
- [ ] **No private/PII data.** Warning letters sometimes mention
      individuals by name (CEOs, signatories). We do not store these
      fields.
- [ ] **Build passes.** `npm run build` and `npm run lint`.

If matching to a provider:

- [ ] **Triple-check the match.** A wrongly-matched provider gets a giant
      amber alert on their review page. Wrong match = libel risk. Confirm
      the company name on FDA exactly matches the provider's legal entity
      or affiliate URL.

---

## Running the scraper

```bash
# Smoke test: print help, no network
npm run scrape:fda-letters -- --help

# Dry run: fetch from FDA but don't write the JSON
npm run scrape:fda-letters -- --dry-run --verbose

# Real run
npm run scrape:fda-letters

# Limit to first 5 new letters (smoke test against live FDA)
npm run scrape:fda-letters -- --limit 5
```

The scraper:

1. Loads the existing `src/data/fda-warning-letters.json`.
2. Uses Playwright to query the FDA warning letters index for each of
   `semaglutide`, `tirzepatide`, `compounded`.
3. Parses each row, derives the letter id from the URL, and skips
   anything already in our dataset.
4. Writes new entries with a *boilerplate* `violations_summary` and
   `subject` (when FDA's column is empty).
5. Prints a notice that **every new entry needs editorial review** before
   publishing.

The scraper deliberately does *not* fetch the body of each letter and
extract violation text. Doing so would tempt us to auto-publish unverified
characterizations of regulated entities. The body has to be reviewed by a
human.

### Suggested cadence

- **Weekly:** run the scraper. Review new entries. Replace boilerplate
  with verbatim FDA quotes. Commit.
- **Monthly:** spot-check the existing dataset for close-out letters
  (search fda.gov for the company name + "close-out").

---

## Adding a new field to the dataset

1. Update the `FdaWarningLetter` interface in
   `src/lib/fda-warning-letters.ts`.
2. Update the `WarningLetter` interface in the scraper.
3. Backfill existing entries in the JSON (or make the field optional).
4. Render it in the detail page.

---

## What the scraper does NOT do

- Does not paraphrase FDA language.
- Does not extract violation text from the letter body.
- Does not auto-match companies to our provider dataset.
- Does not call the FDA API (FDA does not publish a public warning
  letters API; the index is HTML-only).
- Does not retry on failure indefinitely — it logs and skips, by design.

---

## Failure modes

- **FDA changes their HTML.** The scraper logs and returns []. No data
  loss; nothing is written. Fix the selectors in `fetchIndexRows`.
- **Playwright not installed.** The scraper logs and exits cleanly.
- **Network failure.** The scraper logs and exits cleanly.
- **Letter URL slug doesn't match the expected pattern.** That row is
  skipped with a `--verbose` log line. The pattern is
  `<slug>-<5-7 digit number>-<MMDDYYYY>`.
