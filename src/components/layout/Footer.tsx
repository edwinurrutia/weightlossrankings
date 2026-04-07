import Link from "next/link";
import Logo from "@/components/shared/Logo";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";

const footerColumns = [
  {
    heading: "Compare",
    links: [
      { label: "All Providers", href: "/compare" },
      { label: "Best Semaglutide", href: "/best/semaglutide-providers" },
      { label: "Best Tirzepatide", href: "/best/tirzepatide-providers" },
      { label: "Best Programs", href: "/best/weight-loss-programs" },
    ],
  },
  {
    heading: "Browse",
    links: [
      { label: "By State", href: "/states" },
      { label: "By City", href: "/cities" },
      { label: "By Drug", href: "/drugs" },
      { label: "By Insurance", href: "/insurance" },
      { label: "By Pharmacy", href: "/pharmacies" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Weight Loss Calculator", href: "/tools/glp1-weight-loss-calculator" },
      { label: "BMI Calculator", href: "/tools/glp1-bmi-calculator" },
      { label: "GLP-1 Unit Converter", href: "/tools/glp1-unit-converter" },
      { label: "Savings Calculator 2026", href: "/tools/glp1-savings-calculator-2026" },
      { label: "Drug Interaction Checker", href: "/tools/glp1-drug-interaction-checker" },
      { label: "Insurance Employer Checker", href: "/tools/insurance-employer-checker" },
      { label: "All Tools", href: "/tools" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Research", href: "/research" },
      { label: "Drug Guides", href: "/drugs" },
      { label: "FDA Warning Letters", href: "/fda-warning-letters" },
      { label: "Methodology", href: "/methodology" },
      { label: "Sources", href: "/sources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
];

const legalLinks = [
  { label: "Nature of Reviews", href: "/nature-of-reviews" },
  { label: "Disclosure", href: "/disclosure" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Trademarks", href: "/trademarks" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top: brand block on top, 5 link columns below on mobile;
            on lg, brand sits to the left and link columns flow to its right */}
        <div className="lg:flex lg:items-start lg:gap-12">
          {/* Brand column */}
          <div className="space-y-4 lg:w-72 lg:flex-shrink-0 mb-10 lg:mb-0">
            <Logo size="sm" />
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Independent, unbiased rankings of weight loss programs and GLP-1 providers.
            </p>
            <AffiliateDisclosure />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 flex-1">
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

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          {/* Legal link row */}
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

          {/* Disclaimers — single condensed paragraph */}
          <p className="text-xs text-brand-text-secondary/70 leading-relaxed max-w-4xl">
            The information on this website is for informational purposes only and is not a
            substitute for professional medical advice, diagnosis, or treatment. Wegovy®, Ozempic®,
            Mounjaro®, Zepbound®, and other product names are trademarks of their respective owners.
            WeightLossRankings.org is not affiliated with any pharmaceutical manufacturer.
          </p>

          <p className="mt-6 text-xs text-brand-text-secondary/60">
            &copy; {currentYear} WeightLossRankings.org. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
