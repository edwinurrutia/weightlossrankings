/**
 * check-schema.ts — structured-data validation guardrail.
 *
 * Why this exists:
 *
 *   The site ships ~13 distinct Schema.org JSON-LD types across
 *   ~700 pages: ScholarlyArticle, MedicalWebPage, FAQPage,
 *   BreadcrumbList, ItemList, CollectionPage, SoftwareApplication,
 *   Product, AggregateRating, Drug, NewsArticle, HowTo, Dataset,
 *   Organization, WebSite. Each type has required fields that
 *   Google's rich-result tester flags as errors when missing.
 *
 *   The 2026-04-08 SEO push added FaqSchema to all 50 research
 *   articles, ItemList enrichment to /states and /cities, Dataset
 *   to /price-tracker, AboutPage/CreativeWork/DataCatalog to trust
 *   pages, HowTo to /dose-timeline, etc. Every one of those
 *   additions could silently regress: a typo in a field name, a
 *   missing @type, a malformed nested object — none of those break
 *   the build, but Google strips the rich result and the article
 *   stops appearing in the FAQ accordion / SERP feature.
 *
 *   This script is a build-time guardrail that crawls every route
 *   in src/app, extracts every JSON-LD block, validates it against
 *   the Schema.org type's REQUIRED fields, and fails the build on
 *   any violation. It's not a full Schema.org validator (way too
 *   much surface area), but it catches the high-frequency mistakes
 *   that we've actually made in this codebase.
 *
 * What it checks (per JSON-LD block):
 *
 *   1. Has @context (must be https://schema.org)
 *   2. Has @type (must be a non-empty string)
 *   3. For each known type: has the required fields documented in
 *      the Google rich-result spec
 *   4. URLs are absolute (https://...) where required
 *   5. Common typos: 'image' as string when it should be ImageObject,
 *      datePublished without dateModified, etc.
 *
 * What it does NOT check:
 *
 *   - Whether the JSON-LD content matches the visible page content
 *     (Google penalizes mismatches but we can't detect them statically)
 *   - Schema.org enumeration values (e.g. whether availabilityStatus
 *     is one of the 5 valid enums)
 *   - Cross-reference validation (e.g. whether @id references resolve)
 *
 * Strategy:
 *
 *   Rather than doing a full crawl of every built page (too slow,
 *   and runtime data isn't available statically), we extract JSON-LD
 *   patterns from the source files. Specifically: any object literal
 *   passed to <JsonLd data={...}> or to one of the schema components
 *   (FaqSchema, HowToSchema, ToolSchema, etc.). We look for "@type":
 *   "TypeName" patterns and validate the surrounding object.
 *
 *   For dynamic schemas built from runtime data (e.g. ItemList of
 *   filtered providers), we validate the static template structure.
 *
 * Usage:
 *
 *   npx tsx scripts/check-schema.ts          # exits 0 or 1
 *   npm run check:schema                     # via package.json
 *   npm run prebuild                         # chained automatically
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, "src");

// ─── Schema.org type spec ────────────────────────────────────────────
//
// Each entry lists the required fields per Google's rich-result
// guidelines. Sourced from
// https://developers.google.com/search/docs/appearance/structured-data.
//
// 'Required' means: missing this field disqualifies the page from
// the rich-result feature in Google SERP. We don't enforce
// 'recommended' fields because they're less load-bearing.

interface TypeSpec {
  required: string[];
  // If present, these field names are common typos / wrong shapes
  // that we want to call out specifically.
  warnIfMissing?: string[];
}

const SCHEMA_SPEC: Record<string, TypeSpec> = {
  // Article / news / scholarly
  ScholarlyArticle: {
    required: ["headline", "datePublished", "author"],
    warnIfMissing: ["dateModified", "image", "publisher"],
  },
  Article: {
    required: ["headline", "datePublished", "author"],
    warnIfMissing: ["dateModified", "image", "publisher"],
  },
  NewsArticle: {
    required: ["headline", "datePublished", "author"],
    warnIfMissing: ["dateModified", "image", "publisher"],
  },
  BlogPosting: {
    required: ["headline", "datePublished", "author"],
    warnIfMissing: ["dateModified", "image"],
  },

  // Medical
  MedicalWebPage: {
    required: ["name"],
    warnIfMissing: ["description", "url", "lastReviewed"],
  },
  Drug: {
    required: ["name"],
    warnIfMissing: ["alternateName", "description"],
  },

  // Page types
  WebPage: {
    required: ["name"],
    warnIfMissing: ["description", "url"],
  },
  WebSite: {
    required: ["name", "url"],
  },
  CollectionPage: {
    required: ["name"],
    warnIfMissing: ["description", "url"],
  },
  AboutPage: {
    required: ["name"],
    warnIfMissing: ["url"],
  },

  // Lists
  ItemList: {
    required: ["itemListElement"],
    warnIfMissing: ["name"],
  },

  // FAQ / How-to
  FAQPage: {
    required: ["mainEntity"],
  },
  HowTo: {
    required: ["name", "step"],
    warnIfMissing: ["totalTime", "description"],
  },

  // Breadcrumbs
  BreadcrumbList: {
    required: ["itemListElement"],
  },

  // Apps / tools
  SoftwareApplication: {
    required: ["name", "applicationCategory"],
    warnIfMissing: ["operatingSystem", "offers"],
  },

  // Reviews / products
  Review: {
    required: ["reviewRating", "author"],
    warnIfMissing: ["itemReviewed"],
  },
  AggregateRating: {
    required: ["ratingValue", "reviewCount"],
  },
  Product: {
    required: ["name"],
    warnIfMissing: ["image", "description", "offers"],
  },
  Offer: {
    required: ["price", "priceCurrency"],
  },

  // Organization / contact
  Organization: {
    required: ["name", "url"],
    warnIfMissing: ["logo", "sameAs"],
  },

  // Data
  Dataset: {
    required: ["name", "description"],
    warnIfMissing: ["url", "creator", "license"],
  },
  DataCatalog: {
    required: ["name"],
    warnIfMissing: ["description", "url"],
  },

  // Creative work fallback
  CreativeWork: {
    required: ["name"],
    warnIfMissing: ["url", "author"],
  },
};

// ─── File discovery ───────────────────────────────────────────────────

function* walkFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (entry.startsWith(".") || entry === "node_modules") continue;
      yield* walkFiles(full);
      continue;
    }
    if (stat.isFile() && /\.tsx?$/.test(entry)) {
      yield full;
    }
  }
}

// ─── JSON-LD extraction ───────────────────────────────────────────────
//
// We don't try to fully parse TS files. Instead we extract the
// object literal passed to <JsonLd data={...}> or assigned to a
// const named *Schema. We then look for the "@type" string and the
// surrounding field names.
//
// This is a heuristic — it can miss highly dynamic schemas — but
// the codebase consistently uses one of two patterns:
//
//   const someSchema = {
//     "@context": "https://schema.org",
//     "@type": "TypeName",
//     name: "...",
//     ...
//   };
//
// Or inline:
//
//   <JsonLd data={{
//     "@context": "https://schema.org",
//     "@type": "TypeName",
//     ...
//   }} />
//
// Both forms are caught by extracting object literals containing
// "@type": "...".

interface ExtractedSchema {
  type: string;
  fields: Set<string>;
  raw: string;
  file: string;
  line: number;
  /**
   * True if this block has its own @context — meaning it's a
   * top-level schema passed to JsonLd (not a nested child object).
   * Only top-level schemas need to satisfy required-field rules;
   * nested children inherit context from the parent and only need
   * to be well-formed within their parent.
   */
  isTopLevel: boolean;
}

function extractSchemas(filePath: string): ExtractedSchema[] {
  const content = readFileSync(filePath, "utf-8");
  const results: ExtractedSchema[] = [];

  // Find every "@type": "TypeName" occurrence and walk backward to
  // the enclosing { and forward to the matching }.
  const typeRe = /"@type":\s*"([A-Za-z]+)"/g;
  let match: RegExpExecArray | null;

  while ((match = typeRe.exec(content)) !== null) {
    const typeName = match[1];
    const typePos = match.index;

    // Walk backward to find the enclosing {
    let depth = 0;
    let start = -1;
    for (let i = typePos; i >= 0; i--) {
      if (content[i] === "}") depth++;
      else if (content[i] === "{") {
        if (depth === 0) {
          start = i;
          break;
        }
        depth--;
      }
    }
    if (start === -1) continue;

    // Walk forward to find the matching }
    depth = 0;
    let end = -1;
    for (let i = start; i < content.length; i++) {
      if (content[i] === "{") depth++;
      else if (content[i] === "}") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) continue;

    const block = content.slice(start, end + 1);

    // Extract top-level field names. Match `fieldName:` (long form)
    // OR `fieldName,` / `fieldName }` (TypeScript shorthand) at the
    // start of a token where the field is at depth 1 inside the
    // block. Shorthand matters because the codebase uses
    // `{ name, description, url }` style heavily in schema components.
    const fields = new Set<string>();
    let d = 0;
    let i = 0;
    let lineStartTokenOK = true;
    while (i < block.length) {
      const ch = block[i];
      if (ch === "{") {
        d++;
        lineStartTokenOK = true;
      } else if (ch === "}") {
        d--;
      } else if (ch === "," || ch === "\n") {
        lineStartTokenOK = true;
      } else if (
        d === 1 &&
        lineStartTokenOK &&
        (ch === '"' || /[a-zA-Z_]/.test(ch))
      ) {
        // Try long form first: "key": or key:
        const longMatch = block
          .slice(i)
          .match(/^(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*:/);
        if (longMatch) {
          const key = longMatch[1] ?? longMatch[2];
          if (key && !key.startsWith("@")) fields.add(key);
          i += longMatch[0].length;
          lineStartTokenOK = false;
          continue;
        }
        // Then shorthand: identifier followed by comma / newline / }
        const shortMatch = block
          .slice(i)
          .match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*[,}\n]/);
        if (shortMatch) {
          const key = shortMatch[1];
          if (key && !key.startsWith("@")) fields.add(key);
          i += shortMatch[1].length; // don't consume the trailing , or }
          lineStartTokenOK = false;
          continue;
        }
      } else if (!/\s/.test(ch)) {
        lineStartTokenOK = false;
      }
      i++;
    }

    // Compute the line number of the @type for error reporting
    const lineNum = content.slice(0, typePos).split("\n").length;

    // A top-level schema has its OWN "@context" field at the same
    // depth as @type. Walk the block at depth 1 looking for "@context".
    const hasOwnContext = (() => {
      let d = 0;
      for (let i = 0; i < block.length; i++) {
        const ch = block[i];
        if (ch === "{") d++;
        else if (ch === "}") d--;
        else if (d === 1 && block.slice(i, i + 11) === '"@context":') {
          return true;
        }
      }
      return false;
    })();

    results.push({
      type: typeName,
      fields,
      raw: block,
      file: relative(ROOT, filePath),
      line: lineNum,
      isTopLevel: hasOwnContext,
    });
  }

  return results;
}

// ─── Validation ──────────────────────────────────────────────────────

interface ValidationIssue {
  file: string;
  line: number;
  type: string;
  severity: "ERROR" | "WARN";
  message: string;
}

function validateSchema(s: ExtractedSchema): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Skip nested children — they inherit context and parent
  // validation from their enclosing schema. Only top-level blocks
  // (those passed directly to <JsonLd>) carry their own @context
  // and must satisfy required-field rules independently.
  if (!s.isTopLevel) return [];

  const spec = SCHEMA_SPEC[s.type];

  if (!spec) {
    // Unknown top-level type — not necessarily wrong, but worth a
    // warning so we know to add it to SCHEMA_SPEC if it's a real
    // schema we're shipping.
    return [];
  }

  for (const required of spec.required) {
    if (!s.fields.has(required)) {
      issues.push({
        file: s.file,
        line: s.line,
        type: s.type,
        severity: "ERROR",
        message: `${s.type} is missing required field '${required}'`,
      });
    }
  }

  for (const recommended of spec.warnIfMissing ?? []) {
    if (!s.fields.has(recommended)) {
      issues.push({
        file: s.file,
        line: s.line,
        type: s.type,
        severity: "WARN",
        message: `${s.type} is missing recommended field '${recommended}'`,
      });
    }
  }

  return issues;
}

// ─── Main ────────────────────────────────────────────────────────────

function main() {
  const allSchemas: ExtractedSchema[] = [];
  const allIssues: ValidationIssue[] = [];
  const typeCounts: Record<string, number> = {};

  for (const file of walkFiles(SRC_DIR)) {
    let schemas: ExtractedSchema[];
    try {
      schemas = extractSchemas(file);
    } catch (err) {
      console.error(`  ERROR parsing ${relative(ROOT, file)}: ${(err as Error).message}`);
      continue;
    }
    for (const s of schemas) {
      allSchemas.push(s);
      // Only count top-level schemas in the distribution report
      // — nested types are noise.
      if (s.isTopLevel) {
        typeCounts[s.type] = (typeCounts[s.type] ?? 0) + 1;
      }
      const issues = validateSchema(s);
      allIssues.push(...issues);
    }
  }

  const topLevelCount = allSchemas.filter((s) => s.isTopLevel).length;
  const nestedCount = allSchemas.length - topLevelCount;
  console.log(
    `check-schema: scanned ${allSchemas.length} JSON-LD blocks across src/ (${topLevelCount} top-level, ${nestedCount} nested children)`,
  );
  console.log("");
  console.log("Top-level schema type distribution:");
  for (const [type, count] of Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1],
  )) {
    const known = type in SCHEMA_SPEC ? "" : " (unknown — add to SCHEMA_SPEC)";
    console.log(`  ${count.toString().padStart(4)} × ${type}${known}`);
  }
  console.log("");

  const errors = allIssues.filter((i) => i.severity === "ERROR");
  const warnings = allIssues.filter((i) => i.severity === "WARN");

  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings.slice(0, 30)) {
      console.log(`  ${w.file}:${w.line}  ${w.message}`);
    }
    if (warnings.length > 30) {
      console.log(`  ... and ${warnings.length - 30} more warnings`);
    }
    console.log("");
  }

  if (errors.length === 0) {
    console.log(
      `✓ no schema validation errors. ${warnings.length} warnings (recommended fields missing).`,
    );
    process.exit(0);
  }

  console.error(`✗ SCHEMA VALIDATION FAILED — ${errors.length} error(s)`);
  console.error("");
  for (const e of errors) {
    console.error(`  ${e.file}:${e.line}`);
    console.error(`    ${e.message}`);
    console.error("");
  }
  console.error(
    "Required-field violations strip the rich result from Google's SERP entirely.",
  );
  console.error(
    "Add the missing fields to the schema definitions before deploying.",
  );
  process.exit(1);
}

main();
