/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Spanish-language articles originally lived under the English
      // /research/ tree because that's where the registry pointed at
      // launch. We've moved them to a proper /es/research/ subdirectory
      // and 301 the old URLs so any links from the wild (and any old
      // sitemap entries Google still has) consolidate onto the new
      // canonical paths. The page files at the old paths still exist
      // in source — the new /es/research/[slug] pages re-export them —
      // but Next will run these redirects before route resolution, so
      // the old URLs never serve content.
      {
        source: "/research/semaglutide-para-que-sirve",
        destination: "/es/research/semaglutide-para-que-sirve",
        permanent: true,
      },
      {
        source: "/research/tirzepatide-para-que-sirve",
        destination: "/es/research/tirzepatide-para-que-sirve",
        permanent: true,
      },
      {
        source: "/research/cuanto-tarda-glp1-en-hacer-efecto",
        destination: "/es/research/cuanto-tarda-glp1-en-hacer-efecto",
        permanent: true,
      },
      {
        source: "/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro",
        destination: "/es/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro",
        permanent: true,
      },
      {
        source: "/research/efectos-secundarios-glp1-preguntas-respuestas",
        destination: "/es/research/efectos-secundarios-glp1-preguntas-respuestas",
        permanent: true,
      },
      // Year-suffixed URLs are an SEO foot-gun: when 2027 rolls
      // around, every backlink to a "2026" URL turns stale and we'd
      // have to either keep the URL fresh (confusing) or 301 to a
      // new "2027" URL (fragments equity). Evergreen URLs with the
      // year in the page title (which we refresh annually) are the
      // pattern. The renames below pair with the directory moves;
      // each old URL 301-redirects to the new evergreen URL so all
      // backlink and Google index equity flows to a single canonical.
      //
      // Historical-event slugs (foundayo-orforglipron-fda-approval-2026,
      // cagrisema-redefine-trial-results-2026, retatrutide-triple-
      // agonist-evidence-2026, glp1-pipeline-2026-survodutide-...)
      // intentionally KEEP the year because the year is part of the
      // historical record (when the FDA approval/trial readout/
      // pipeline snapshot happened). Those are not in this list.
      {
        source: "/tools/glp1-savings-calculator-2026",
        destination: "/tools/glp1-savings-calculator",
        permanent: true,
      },
      {
        source: "/research/glp-1-pricing-index-2026",
        destination: "/research/glp1-pricing-index",
        permanent: true,
      },
      {
        source:
          "/research/glp1-insurance-coverage-2026-medicare-medicaid-commercial",
        destination:
          "/research/glp1-insurance-coverage-medicare-medicaid-commercial",
        permanent: true,
      },
      {
        source: "/research/glp1-insurance-coverage-audit-2026",
        destination: "/research/glp1-insurance-coverage-audit",
        permanent: true,
      },
      {
        source: "/research/how-to-get-glp1-prescription-2026",
        destination: "/research/how-to-get-glp1-prescription",
        permanent: true,
      },
      {
        source: "/research/where-to-buy-foundayo-2026",
        destination: "/research/where-to-buy-foundayo",
        permanent: true,
      },
      {
        source: "/research/cheapest-compounded-semaglutide-2026",
        destination: "/research/cheapest-compounded-semaglutide",
        permanent: true,
      },
      {
        source: "/research/glp1-alcohol-use-disorder-evidence-2026",
        destination: "/research/glp1-alcohol-use-disorder-evidence",
        permanent: true,
      },
      {
        source: "/research/fda-warning-letters-glp1-2025-2026",
        destination: "/research/fda-warning-letters-glp1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
