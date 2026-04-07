import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Weight Loss Rankings — Rankings independientes de proveedores GLP-1",
  description:
    "Guías en español, basadas en estudios PubMed y la información de prescripción de la FDA, sobre semaglutida, tirzepatida y los proveedores de telemedicina GLP-1 en Estados Unidos.",
  alternates: {
    canonical: "/es",
    languages: {
      "en-US": "/",
      "es-US": "/es",
    },
  },
  openGraph: {
    title: "Weight Loss Rankings — en español",
    description:
      "Rankings independientes de proveedores GLP-1 y guías clínicas en español.",
    type: "website",
    locale: "es_US",
  },
};

const valueProps = [
  {
    title: "Investigación independiente",
    body: "Cada dato proviene de estudios revisados por pares en PubMed o de la información de prescripción aprobada por la FDA. Nada de marketing, nada de afirmaciones sin fuente.",
  },
  {
    title: "Datos en tiempo real",
    body: "Verificamos directamente los precios y la disponibilidad de más de 80 proveedores de telemedicina GLP-1 en Estados Unidos y actualizamos las cifras continuamente.",
  },
  {
    title: "Sin venta de tratamientos",
    body: "No vendemos medicamentos ni recetamos tratamientos. Somos una publicación editorial independiente. Consulte siempre con un profesional de la salud calificado.",
  },
];

const featuredArticles = [
  {
    href: "/es/research/semaglutide-para-que-sirve",
    title: "Semaglutida: para qué sirve, cómo funciona y qué dicen los estudios",
    excerpt:
      "Guía completa sobre la semaglutida (Wegovy, Ozempic): mecanismo, indicaciones aprobadas por la FDA, resultados del estudio STEP 1 y reacciones adversas.",
  },
  {
    href: "/es/research/tirzepatide-para-que-sirve",
    title: "Tirzepatida: para qué sirve, cómo funciona y qué dicen los estudios",
    excerpt:
      "Guía completa sobre la tirzepatida (Zepbound, Mounjaro): agonista dual GIP/GLP-1, resultados del SURMOUNT-1 y consideraciones de seguridad.",
  },
  {
    href: "/es/research/cuanto-tarda-glp1-en-hacer-efecto",
    title: "¿Cuánto tarda la semaglutida o la tirzepatida en hacer efecto?",
    excerpt:
      "Lo que muestran los estudios clínicos semana por semana sobre apetito, peso y glucosa, desde la primera dosis hasta el plateau.",
  },
];

const toolLinks = [
  {
    href: "/tools/glp1-bmi-calculator",
    title: "Calculadora de IMC",
    body: "Calcule su índice de masa corporal y compruebe los criterios de elegibilidad para Wegovy y Zepbound.",
  },
  {
    href: "/tools/glp1-savings-calculator-2026",
    title: "Calculadora de ahorros",
    body: "Compare 10 rutas de costos para semaglutida y tirzepatida — marca, compuesto, con y sin seguro.",
  },
  {
    href: "/tools/glp1-unit-converter",
    title: "Conversor de unidades GLP-1",
    body: "Convierta entre mg, mL y unidades para semaglutida y tirzepatida compuestas.",
  },
];

export default function SpanishHomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-brand-violet/10 bg-gradient-to-b from-brand-violet/[0.04] to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
            Weight Loss Rankings · en español
          </p>
          <h1
            className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            Rankings independientes de proveedores GLP-1, en español.
          </h1>
          <p className="mt-6 text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
            Investigaciones citadas en PubMed y la FDA sobre semaglutida,
            tirzepatida y los proveedores de telemedicina que las ofrecen
            en Estados Unidos. Sin marketing. Sin afirmaciones sin fuente.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/es/research"
              className="inline-flex items-center px-5 py-3 rounded-full bg-brand-violet text-white text-sm font-semibold hover:bg-brand-violet/90 transition-colors"
            >
              Ver toda la investigación →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-5 py-3 rounded-full border border-brand-violet/30 text-brand-violet text-sm font-semibold hover:bg-brand-violet/5 transition-colors"
            >
              Ver en inglés
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight mb-10">
          Lo que hacemos
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {valueProps.map((v) => (
            <li
              key={v.title}
              className="rounded-3xl border border-brand-violet/15 bg-white p-7 shadow-sm"
            >
              <h3 className="font-heading text-lg font-bold text-brand-text-primary mb-3">
                {v.title}
              </h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured Spanish articles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-brand-violet/10">
        <div className="flex items-baseline justify-between gap-4 mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight">
            Investigación destacada
          </h2>
          <Link
            href="/es/research"
            className="text-sm font-semibold text-brand-violet hover:underline"
          >
            Ver todo →
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredArticles.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="group block h-full rounded-3xl border border-brand-violet/15 bg-white p-7 shadow-sm hover:shadow-md hover:border-brand-violet/40 hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-heading text-lg font-bold text-brand-text-primary leading-tight tracking-tight group-hover:text-brand-violet transition-colors">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">
                  {a.excerpt}
                </p>
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
      </section>

      {/* Tools — link to English tools (not yet localized) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-brand-violet/10">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight mb-3">
          Herramientas interactivas
        </h2>
        <p className="text-sm text-brand-text-secondary mb-10 max-w-2xl">
          Estas calculadoras todavía están disponibles únicamente en
          inglés, pero los cálculos son numéricos y funcionan para
          cualquier paciente. Estamos trabajando en versiones en español.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {toolLinks.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group block h-full rounded-3xl border border-brand-violet/15 bg-white p-7 shadow-sm hover:shadow-md hover:border-brand-violet/40 transition-all"
              >
                <h3 className="font-heading text-lg font-bold text-brand-text-primary group-hover:text-brand-violet transition-colors">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">
                  {t.body}
                </p>
                <span className="mt-5 inline-flex items-center text-xs font-semibold text-brand-violet/80">
                  Abrir herramienta (en inglés) →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl border border-brand-violet/15 bg-brand-violet/[0.04] p-8 sm:p-10">
          <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-3">
            Aviso importante
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed max-w-3xl">
            La información de este sitio tiene fines únicamente educativos
            e informativos. No constituye consejo médico ni sustituye la
            consulta con un médico, enfermero, farmacéutico u otro
            profesional de la salud calificado. Las decisiones sobre el
            uso de cualquier medicamento deben tomarse siempre bajo
            supervisión médica. En caso de emergencia, llame al 911.
          </p>
        </div>
      </section>
    </div>
  );
}
