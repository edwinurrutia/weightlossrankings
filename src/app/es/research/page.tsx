import type { Metadata } from "next";
import Link from "next/link";
import { RESEARCH_ARTICLES } from "@/lib/research";

export const metadata: Metadata = {
  title:
    "Investigación — Guías PubMed sobre semaglutida, tirzepatida y GLP-1",
  description:
    "Investigaciones independientes en español sobre la semaglutida, la tirzepatida y los proveedores de telemedicina GLP-1 en Estados Unidos. Citas de PubMed y la FDA.",
  alternates: {
    canonical: "/es/research",
    languages: {
      "en-US": "/research",
      "es-US": "/es/research",
    },
  },
  openGraph: {
    title: "Investigación en español — Weight Loss Rankings",
    description:
      "Guías editoriales en español sobre semaglutida, tirzepatida y los proveedores GLP-1.",
    type: "website",
    locale: "es_US",
  },
};

// Slugs that have been migrated to /es/research/[slug]. Other Spanish
// articles still live under the English /research/[slug] tree (we
// surface them here on the index, but link to their original location)
// until they are migrated in a follow-up. As more articles move, add
// their slug to this set.
const MIGRATED_TO_ES_TREE = new Set<string>([
  "semaglutide-para-que-sirve",
  "tirzepatide-para-que-sirve",
  "cuanto-tarda-glp1-en-hacer-efecto",
  "guia-marcas-wegovy-ozempic-zepbound-mounjaro",
  "efectos-secundarios-glp1-preguntas-respuestas",
]);

function spanishHrefFor(slug: string): string {
  return MIGRATED_TO_ES_TREE.has(slug)
    ? `/es/research/${slug}`
    : `/research/${slug}`;
}

export default function SpanishResearchIndexPage() {
  const articles = RESEARCH_ARTICLES.filter(
    (a) => a.tags.includes("Español") || MIGRATED_TO_ES_TREE.has(a.slug),
  ).sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Language switcher */}
      <div className="mb-6 text-xs">
        <Link
          href="/research"
          className="text-brand-violet hover:underline font-semibold"
        >
          Available in English →
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Investigación
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Guías clínicas en español sobre GLP-1, citadas en PubMed y la FDA.
        </h1>
        <p className="mt-6 text-lg text-brand-text-secondary leading-relaxed">
          Publicamos guías editoriales independientes en español sobre la
          semaglutida, la tirzepatida y los proveedores de telemedicina
          GLP-1 en Estados Unidos. Cada guía se basa en estudios revisados
          por pares y en la información de prescripción aprobada por la
          FDA — nada de marketing y nada de afirmaciones sin fuente.
        </p>
      </header>

      {/* Article list */}
      {articles.length === 0 ? (
        <p className="text-sm text-brand-text-secondary">
          Pronto publicaremos más guías en español.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={spanishHrefFor(a.slug)}
                className="group block h-full rounded-3xl border border-brand-violet/15 bg-white p-7 shadow-sm hover:shadow-md hover:border-brand-violet/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
                    Guía clínica
                  </span>
                  <span className="text-[10px] text-brand-text-secondary">
                    {a.readMinutes} minutos · {a.citations} citas
                  </span>
                </div>
                <h2 className="font-heading text-xl font-bold text-brand-text-primary leading-tight tracking-tight group-hover:text-brand-violet transition-colors">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">
                  {a.excerpt}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <li
                      key={t}
                      className="text-[10px] font-semibold text-brand-text-secondary bg-brand-violet/[0.06] border border-brand-violet/10 rounded-full px-2 py-0.5"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-violet">
                  Leer la guía
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Editorial note */}
      <section className="mt-16 rounded-3xl border border-brand-violet/15 bg-brand-violet/[0.04] p-8 sm:p-10">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-3">
          Cómo trabajamos
        </h2>
        <p className="text-sm text-brand-text-secondary leading-relaxed max-w-3xl">
          Cada cifra de nuestras investigaciones se verifica directamente
          contra el sitio web del proveedor o contra la información de
          prescripción aprobada por la FDA. Cada guía clínica cita
          literatura primaria de PubMed, etiquetas de la FDA o ensayos
          clínicos revisados por pares — nunca resúmenes de blogs ni
          páginas de marketing. Las guías se revisan y actualizan cuando
          cambia la base de evidencia subyacente.
        </p>
        <p className="mt-4 text-sm text-brand-text-secondary leading-relaxed max-w-3xl">
          No vendemos ni recomendamos tratamientos médicos específicos —
          consulte siempre con un profesional de la salud calificado antes
          de iniciar cualquier medicamento.
        </p>
      </section>
    </main>
  );
}
