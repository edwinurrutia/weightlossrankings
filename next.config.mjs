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
    ];
  },
};

export default nextConfig;
