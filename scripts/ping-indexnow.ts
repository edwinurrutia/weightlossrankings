/**
 * ping-indexnow.ts — POST our canonical URL list to the IndexNow
 * protocol so Bing, Yandex, Seznam, Naver, and any other
 * IndexNow-participating search engines pick up our updates
 * within minutes instead of the usual 2-7 day crawl lag.
 *
 * Protocol: https://www.indexnow.org/documentation
 *
 * IndexNow is the fastest way to ensure Microsoft Edge / Bing
 * coverage because Bing honors IndexNow submissions essentially
 * in real time. Google does NOT participate in IndexNow (Google
 * declined) but we handle Google separately via sitemap.xml and
 * the Google Search Console ping on deploy.
 *
 * How the protocol works:
 *
 *   1. We generate a 64-hex-char key (done once, checked into
 *      public/<key>.txt for host-ownership verification).
 *   2. On deploy, we POST a JSON body to
 *      https://api.indexnow.org/indexnow listing the URLs we
 *      want re-crawled, along with the key and the keyLocation
 *      URL pointing at the verification file.
 *   3. Bing fetches the keyLocation URL to confirm the key
 *      matches the host, then re-crawls the submitted URLs.
 *
 * This script is wired into package.json as a `postbuild` hook
 * so every Vercel deploy pushes the latest URL set automatically.
 * The script is idempotent — submitting the same URL list on
 * every build is fine (Bing handles dedup).
 *
 * Failure is non-fatal: if IndexNow times out or returns non-200,
 * the script logs the error and exits 0 so it never breaks a
 * deploy. Bing will pick up the changes via sitemap.xml on the
 * next natural crawl anyway.
 */

import providersData from "../src/data/providers.json" assert { type: "json" };
import drugsData from "../src/data/drugs.json" assert { type: "json" };

const INDEXNOW_KEY =
  "63dc0f54cc7753b30da2b6954b725db6b7e1ee470621a664bafbe4d26cc4b279";
const HOST = "www.weightlossrankings.org";
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Bing's IndexNow endpoint enforces a 10,000 URL per request cap.
// We batch in chunks of 1,000 to stay well under that and to get
// partial delivery if one batch fails.
const BATCH_SIZE = 1_000;

interface Provider {
  slug: string;
  category?: string;
}

interface Drug {
  slug: string;
}

function buildUrlList(): string[] {
  const urls = new Set<string>();

  // Static high-priority pages
  const staticPaths = [
    "",
    "/compare",
    "/reviews",
    "/states",
    "/cities",
    "/drugs",
    "/insurance",
    "/pharmacies",
    "/fda-warning-letters",
    "/research",
    "/blog",
    "/price-tracker",
    "/tools",
    "/best",
    "/best/semaglutide-providers",
    "/best/tirzepatide-providers",
    "/best/orforglipron-providers",
    "/best/compounded-semaglutide",
    "/best/compounded-tirzepatide",
    "/best/cheapest-semaglutide",
    "/best/cheapest-tirzepatide",
    "/best/weight-loss-programs",
    "/best/weight-loss-supplements",
    "/best/meal-delivery-for-weight-loss",
    "/best/fitness-apps-for-weight-loss",
    "/semaglutide",
    "/tirzepatide",
    "/orforglipron",
    "/about",
    "/methodology",
    "/sources",
    "/disclosure",
    "/faq",
    "/feed.xml",
    "/sitemap.xml",
    "/llms.txt",
    "/llms-full.txt",
  ];
  for (const path of staticPaths) {
    urls.add(`${BASE}${path}`);
  }

  // Every provider review page — these are the highest-intent
  // long-tail URLs and the ones we most want Bing to re-crawl
  // after a provider is updated.
  const providers = providersData as Provider[];
  for (const p of providers) {
    urls.add(`${BASE}/reviews/${p.slug}`);
    // /alternatives/[provider] — same underlying data, same
    // update cadence as the review page. Cheap to submit.
    urls.add(`${BASE}/alternatives/${p.slug}`);
  }

  // Every drug guide page. These are refreshed whenever we add a
  // new provider (the cost comparison table pulls live data from
  // providers.json), so they merit a crawl ping on every deploy.
  const drugs = drugsData as Drug[];
  for (const d of drugs) {
    urls.add(`${BASE}/drugs/${d.slug}`);
  }

  // State/drug combo pages — 50 states × 2 drugs = 100 URLs.
  // Updated whenever any provider's state list changes.
  const stateCodes = [
    "alabama", "alaska", "arizona", "arkansas", "california",
    "colorado", "connecticut", "delaware", "florida", "georgia",
    "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas",
    "kentucky", "louisiana", "maine", "maryland", "massachusetts",
    "michigan", "minnesota", "mississippi", "missouri", "montana",
    "nebraska", "nevada", "new-hampshire", "new-jersey", "new-mexico",
    "new-york", "north-carolina", "north-dakota", "ohio", "oklahoma",
    "oregon", "pennsylvania", "rhode-island", "south-carolina",
    "south-dakota", "tennessee", "texas", "utah", "vermont",
    "virginia", "washington", "west-virginia", "wisconsin", "wyoming",
  ];
  for (const state of stateCodes) {
    urls.add(`${BASE}/states/${state}`);
    urls.add(`${BASE}/states/${state}/semaglutide`);
    urls.add(`${BASE}/states/${state}/tirzepatide`);
  }

  return Array.from(urls);
}

async function submitBatch(urlList: string[]): Promise<void> {
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  // 200 = accepted, 202 = accepted (queued), 422 = quota / rate
  // limit, anything else is a failure we should log but not
  // escalate into a deploy break.
  if (res.ok) {
    console.log(
      `[indexnow] submitted ${urlList.length} URLs → ${res.status} ${res.statusText}`,
    );
  } else {
    const text = await res.text().catch(() => "");
    console.error(
      `[indexnow] batch failed: ${res.status} ${res.statusText} ${text.slice(0, 200)}`,
    );
  }
}

async function main() {
  // Skip IndexNow during local development — we don't want to
  // submit localhost URLs to Bing. Only run when the Vercel
  // environment variables indicate a real deploy.
  const isVercelProd =
    process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";

  // Allow an explicit override for manual testing:
  //   INDEXNOW_FORCE=1 npx tsx scripts/ping-indexnow.ts
  const forced = process.env.INDEXNOW_FORCE === "1";

  if (!isVercelProd && !forced) {
    console.log(
      "[indexnow] skipping — not a Vercel production build (set INDEXNOW_FORCE=1 to override)",
    );
    return;
  }

  const urls = buildUrlList();
  console.log(`[indexnow] submitting ${urls.length} URLs to ${INDEXNOW_ENDPOINT}`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    try {
      await submitBatch(batch);
    } catch (err) {
      console.error(
        `[indexnow] batch ${i / BATCH_SIZE + 1} threw:`,
        (err as Error).message,
      );
      // Non-fatal — continue with next batch.
    }
  }
}

main().catch((err) => {
  console.error("[indexnow] unexpected error:", err);
  // Exit 0 — we never want IndexNow failures to break a deploy.
  process.exit(0);
});
