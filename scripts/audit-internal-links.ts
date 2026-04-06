/**
 * audit-internal-links.ts — find orphan pages and report internal
 * link density.
 *
 * An "orphan page" is a page that exists in the sitemap (or is
 * generatable via the route definitions) but has zero or near-zero
 * internal links pointing to it from other pages on the same site.
 * Google deprioritizes orphan pages aggressively because their
 * crawl pattern is "if no internal page thinks it's worth linking
 * to, neither do we."
 *
 * Why we run this manually rather than relying on Screaming Frog
 * or Ahrefs:
 *   - Free
 *   - Operates on the source-of-truth route definitions in the
 *     repo, so it catches orphans BEFORE they ship rather than
 *     after a crawler discovers them
 *   - No external rate limits — we can run it on every PR
 *
 * Approach:
 *   1. Enumerate all generatable URLs from src/lib/* data sources
 *      and the route directory structure (mirrors src/app/sitemap.ts)
 *   2. Scan every .tsx file in src/app and src/components for
 *      <Link href="..."> and <a href="..."> values
 *   3. Build a graph: outbound link count per source URL,
 *      inbound link count per target URL
 *   4. Report:
 *      - Pages with ZERO inbound links (true orphans)
 *      - Pages with 1 inbound link only (weakly linked, often
 *        the index page → detail page hop, no other path in)
 *      - Pages with the most inbound links (strongest internal
 *        authority — useful for understanding which pages
 *        Google's PageRank flow is concentrated on)
 *
 * Usage:
 *   npx tsx scripts/audit-internal-links.ts          # full report
 *   npx tsx scripts/audit-internal-links.ts --json   # machine-readable
 *   npx tsx scripts/audit-internal-links.ts --top 30 # top N most-linked
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";

const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const TOP_IDX = args.indexOf("--top");
const TOP = TOP_IDX >= 0 ? parseInt(args[TOP_IDX + 1] ?? "20", 10) : 20;

const ROOT = process.cwd();
const SRC_APP = join(ROOT, "src/app");
const SRC_COMPONENTS = join(ROOT, "src/components");

// ---------------- file walking ----------------

function walkTsxFiles(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      // Skip generated/build directories
      if (entry === "node_modules" || entry === ".next" || entry.startsWith(".")) continue;
      walkTsxFiles(full, out);
    } else if (
      st.isFile() &&
      (entry.endsWith(".tsx") || entry.endsWith(".ts"))
    ) {
      out.push(full);
    }
  }
  return out;
}

// ---------------- href extraction ----------------

/**
 * Extract every internal href from a TSX/TS file. Captures:
 *   href="/foo/bar"
 *   href={`/foo/${slug}`}                  → /foo/[slug]
 *   href={"/foo/" + slug}                  → /foo/[slug]
 *   <Link href="/foo">                     → /foo
 *
 * Drops external (http://...), mailto, tel, anchor (#...), and
 * /go/[slug] redirects (those are intentional outbound).
 */
function extractInternalHrefs(content: string): string[] {
  const hrefs = new Set<string>();
  // Plain string hrefs
  const plain = content.matchAll(/href\s*=\s*["']([^"'$\n]+)["']/g);
  for (const m of plain) hrefs.add(m[1]);
  // Template literal hrefs — collapse ${...} placeholders to a literal
  // path segment label so /reviews/${slug} → /reviews/[slug]
  const tpl = content.matchAll(/href\s*=\s*\{`([^`$]*(?:\$\{[^}]+\}[^`$]*)*)`\}/g);
  for (const m of tpl) {
    const collapsed = m[1].replace(/\$\{[^}]+\}/g, "[slug]");
    hrefs.add(collapsed);
  }
  // ctaHref / outbound prop variants used in marketing components
  const ctaPlain = content.matchAll(/(?:ctaHref|to|href)=\s*["']([^"'$\n]+)["']/g);
  for (const m of ctaPlain) hrefs.add(m[1]);

  return Array.from(hrefs).filter((h) => {
    if (!h) return false;
    if (/^https?:\/\//i.test(h)) return false;
    if (h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("#")) return false;
    if (h.startsWith("/go/")) return false; // intentional outbound redirect
    if (h.startsWith("/api/")) return false;
    if (h.startsWith("/admin")) return false;
    return h.startsWith("/");
  });
}

/**
 * Normalize a discovered href into a route pattern that can be
 * matched against the sitemap. Strips query strings and trailing
 * slash; collapses dynamic segments to [slug]/[id]/etc. so that
 * `/reviews/hims` and `/reviews/[slug]` count as the same target
 * for orphan-detection purposes.
 */
function normalizeHref(href: string): string {
  let h = href.split("?")[0].split("#")[0];
  if (h.length > 1 && h.endsWith("/")) h = h.slice(0, -1);
  return h;
}

// ---------------- generatable URL enumeration ----------------

/**
 * Enumerate every URL the site can generate, mirroring src/app/sitemap.ts.
 * We deliberately re-implement this here rather than importing the
 * sitemap function so the audit script keeps working even if
 * sitemap.ts is broken.
 */
async function enumerateGeneratableUrls(): Promise<string[]> {
  const urls = new Set<string>();
  urls.add("/");

  // Use require() with a try/catch around each so we don't crash
  // when one data module is missing.
  const safeImport = async <T>(path: string): Promise<T | null> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (await import(path)) as any;
    } catch {
      return null;
    }
  };

  const data = await safeImport<{
    getAllProviderSlugs?: () => Promise<{ slug: string }[]>;
    getAllBlogSlugs?: () => Promise<{ slug: string }[]>;
  }>("@/lib/data");
  if (data?.getAllProviderSlugs) {
    const providerSlugs = await data.getAllProviderSlugs();
    for (const { slug } of providerSlugs) {
      urls.add(`/reviews/${slug}`);
      urls.add(`/alternatives/${slug}`);
    }
  }
  if (data?.getAllBlogSlugs) {
    const blogSlugs = await data.getAllBlogSlugs();
    for (const { slug } of blogSlugs) urls.add(`/blog/${slug}`);
  }

  const drugs = await safeImport<{
    getAllDrugSlugs?: () => string[];
  }>("@/lib/drugs");
  if (drugs?.getAllDrugSlugs) {
    for (const slug of drugs.getAllDrugSlugs()) urls.add(`/drugs/${slug}`);
  }

  const states = await safeImport<{
    US_STATES?: Array<{ slug: string }>;
  }>("@/lib/states");
  if (states?.US_STATES) {
    for (const s of states.US_STATES) urls.add(`/states/${s.slug}`);
  }

  const pharm = await safeImport<{
    getAllPharmacies?: () => Array<{ slug: string }>;
  }>("@/lib/pharmacies");
  if (pharm?.getAllPharmacies) {
    for (const p of pharm.getAllPharmacies()) urls.add(`/pharmacies/${p.slug}`);
  }

  const fda = await safeImport<{
    getAllWarningLetterSlugs?: () => Array<{ slug: string }>;
  }>("@/lib/fda-warning-letters");
  if (fda?.getAllWarningLetterSlugs) {
    for (const { slug } of fda.getAllWarningLetterSlugs())
      urls.add(`/fda-warning-letters/${slug}`);
  }

  const research = await safeImport<{
    RESEARCH_ARTICLES?: Array<{ slug: string }>;
  }>("@/lib/research");
  if (research?.RESEARCH_ARTICLES) {
    for (const a of research.RESEARCH_ARTICLES)
      urls.add(`/research/${a.slug}`);
  }

  // Common static landing pages — same set as sitemap.ts
  const staticPages = [
    "/about", "/contact", "/methodology", "/sources", "/research",
    "/blog", "/drugs", "/states", "/cities", "/pharmacies", "/insurance",
    "/insurance-checker", "/savings-calculator", "/savings", "/dose-timeline",
    "/price-tracker", "/compare", "/reviews", "/alternatives", "/learn",
    "/faq", "/press", "/careers", "/advertise", "/disclosure", "/privacy",
    "/terms", "/trademarks", "/code-of-conduct", "/nature-of-reviews",
    "/fda-warning-letters",
  ];
  for (const p of staticPages) urls.add(p);

  return Array.from(urls);
}

// ---------------- main ----------------

async function main() {
  const tsxFiles = [
    ...walkTsxFiles(SRC_APP),
    ...walkTsxFiles(SRC_COMPONENTS),
  ];

  // For each source file (representing a "page" if it lives in src/app)
  // collect every internal href it contains.
  const inboundCount = new Map<string, number>();
  const inboundFromAnyComponent = new Set<string>();

  for (const file of tsxFiles) {
    let content: string;
    try {
      content = readFileSync(file, "utf-8");
    } catch {
      continue;
    }
    const hrefs = extractInternalHrefs(content);
    for (const h of hrefs) {
      const normalized = normalizeHref(h);
      inboundCount.set(normalized, (inboundCount.get(normalized) ?? 0) + 1);
      inboundFromAnyComponent.add(normalized);
    }
  }

  const generatable = await enumerateGeneratableUrls();

  // Match generatable URLs against the inbound link map. For dynamic
  // URLs like /reviews/hims we also count links to the generic pattern
  // /reviews/[slug] that came out of template-literal extraction.
  function inboundFor(url: string): number {
    let count = inboundCount.get(url) ?? 0;
    // Map detail URL → pattern URL
    const segments = url.split("/").filter(Boolean);
    if (segments.length >= 2) {
      // Try /reviews/[slug] pattern for /reviews/hims
      const patternUrl =
        "/" +
        segments
          .map((seg, i) => (i === segments.length - 1 ? "[slug]" : seg))
          .join("/");
      count += inboundCount.get(patternUrl) ?? 0;
    }
    return count;
  }

  const orphans: string[] = [];
  const weakLinks: string[] = [];
  const links: Array<{ url: string; count: number }> = [];

  for (const url of generatable) {
    const count = inboundFor(url);
    links.push({ url, count });
    if (count === 0) orphans.push(url);
    else if (count === 1) weakLinks.push(url);
  }

  links.sort((a, b) => b.count - a.count);

  if (JSON_OUT) {
    console.log(
      JSON.stringify(
        {
          summary: {
            generatable: generatable.length,
            orphans: orphans.length,
            weaklyLinked: weakLinks.length,
          },
          orphans,
          weakLinks,
          topLinked: links.slice(0, TOP),
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(`Internal link audit — ${new Date().toISOString().slice(0, 10)}`);
  console.log("");
  console.log(`Generatable URLs:  ${generatable.length}`);
  console.log(`  ├ orphans:       ${orphans.length} (zero inbound links)`);
  console.log(`  └ weakly linked: ${weakLinks.length} (1 inbound link)`);
  console.log("");

  if (orphans.length > 0) {
    console.log(`ORPHAN PAGES (no internal links — Google will deprioritize):`);
    for (const url of orphans.slice(0, 50)) console.log(`  ${url}`);
    if (orphans.length > 50) {
      console.log(`  … and ${orphans.length - 50} more (use --json for the full list)`);
    }
    console.log("");
  }

  if (weakLinks.length > 0) {
    console.log(`WEAKLY LINKED PAGES (1 inbound link only):`);
    for (const url of weakLinks.slice(0, 30)) console.log(`  ${url}`);
    if (weakLinks.length > 30) {
      console.log(`  … and ${weakLinks.length - 30} more`);
    }
    console.log("");
  }

  console.log(`TOP ${TOP} MOST-LINKED (where PageRank flow is concentrated):`);
  for (const { url, count } of links.slice(0, TOP)) {
    console.log(`  ${String(count).padStart(4)} ${url}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
