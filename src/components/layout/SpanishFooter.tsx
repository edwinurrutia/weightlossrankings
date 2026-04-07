import Link from "next/link";
import Logo from "@/components/shared/Logo";

// Spanish-language footer. Mirrors the structure of Footer.tsx but with
// Spanish labels and links that point either into the /es/ subdirectory
// (for surfaces that are localized) or back to the English versions (for
// surfaces that are not yet translated). As more of the site is
// localized, swap the English hrefs for /es/ equivalents.
const footerColumns = [
  {
    heading: "Investigación",
    links: [
      { label: "Toda la investigación", href: "/es/research" },
      {
        label: "Semaglutida: para qué sirve",
        href: "/es/research/semaglutide-para-que-sirve",
      },
      {
        label: "Tirzepatida: para qué sirve",
        href: "/es/research/tirzepatide-para-que-sirve",
      },
      {
        label: "¿Cuánto tarda en hacer efecto?",
        href: "/es/research/cuanto-tarda-glp1-en-hacer-efecto",
      },
    ],
  },
  {
    heading: "Sitio en inglés",
    links: [
      { label: "Inicio (English)", href: "/" },
      { label: "Comparar proveedores", href: "/compare" },
      { label: "Calculadora de IMC", href: "/tools/glp1-bmi-calculator" },
      {
        label: "Calculadora de ahorros",
        href: "/tools/glp1-savings-calculator",
      },
      { label: "Todas las herramientas", href: "/tools" },
    ],
  },
  {
    heading: "Acerca de",
    links: [
      { label: "Quiénes somos", href: "/about" },
      { label: "Metodología", href: "/methodology" },
      { label: "Fuentes", href: "/sources" },
      { label: "Contacto", href: "/contact" },
    ],
  },
];

const legalLinks = [
  { label: "Divulgación", href: "/disclosure" },
  { label: "Privacidad", href: "/privacy" },
  { label: "Términos", href: "/terms" },
  { label: "Marcas registradas", href: "/trademarks" },
];

export default function SpanishFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="space-y-4 lg:w-72 lg:flex-shrink-0 mb-10 lg:mb-0">
            <Logo size="sm" />
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Rankings independientes e imparciales de proveedores de GLP-1
              y programas de pérdida de peso.
            </p>
            <p className="text-xs text-brand-text-secondary/80 leading-relaxed">
              Contenido educativo, no consejo médico. Consulte siempre a un
              profesional de la salud calificado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10 flex-1">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-text-primary mb-4">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-text-secondary hover:text-brand-violet transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-brand-text-secondary hover:text-brand-violet transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-xs text-brand-text-secondary/70 leading-relaxed max-w-4xl">
            La información de este sitio web tiene únicamente fines
            informativos y no sustituye el consejo, diagnóstico ni
            tratamiento médico profesional. Wegovy®, Ozempic®, Mounjaro®,
            Zepbound® y otros nombres de productos son marcas registradas
            de sus respectivos propietarios. WeightLossRankings.org no está
            afiliada con ningún fabricante farmacéutico.
          </p>

          <p className="mt-6 text-xs text-brand-text-secondary/60">
            &copy; {currentYear} WeightLossRankings.org. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
