import Link from "next/link";
import Logo from "@/components/shared/Logo";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";

const footerColumns = [
  {
    heading: "Compare",
    links: [
      { label: "Compare Providers", href: "/compare" },
      { label: "Savings Calculator", href: "/savings-calculator" },
      { label: "Best Semaglutide", href: "/best/semaglutide-providers" },
      { label: "Best Tirzepatide", href: "/best/tirzepatide-providers" },
      { label: "Best Programs", href: "/best/weight-loss-programs" },
    ],
  },
  {
    heading: "Browse",
    links: [
      { label: "By Category", href: "/best" },
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
      { label: "Price Tracker", href: "/price-tracker" },
      { label: "Insurance Checker", href: "/insurance-checker" },
      { label: "Dose Timeline", href: "/dose-timeline" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Drug Guides", href: "/drugs" },
      { label: "Methodology", href: "/methodology" },
      { label: "FAQ", href: "/faq" },
      { label: "Nature of Reviews", href: "/nature-of-reviews" },
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
      { label: "Disclosure", href: "/disclosure" },
      { label: "Code of Conduct", href: "/code-of-conduct" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Trademarks", href: "/trademarks" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo column */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-xs text-brand-text-secondary leading-relaxed">
              Independent, unbiased rankings of weight loss programs and GLP-1 providers.
            </p>
            <AffiliateDisclosure />
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold text-brand-text-primary tracking-tight mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + bottom row */}
        <div className="mt-10 pt-8 border-t border-gray-100 space-y-4">
          <p className="text-xs text-brand-text-secondary/70 leading-relaxed">
            <strong className="text-brand-text-secondary">Medical Disclaimer:</strong> The information on this website is for
            informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician or other qualified health provider with any questions you may have
            regarding a medical condition or weight loss program.
          </p>
          <p className="text-xs text-brand-text-secondary/70 leading-relaxed">
            <strong className="text-brand-text-secondary">Trademarks:</strong> Wegovy®, Ozempic®, and Rybelsus® are trademarks
            of Novo Nordisk A/S. Mounjaro® and Zepbound® are trademarks of Eli Lilly and Company. All other product names and
            trademarks belong to their respective owners. WeightLossRankings.org is not affiliated with any pharmaceutical
            manufacturer.{" "}
            <Link href="/trademarks" className="underline hover:text-brand-violet">
              Read more
            </Link>
            .
          </p>
          <p className="text-xs text-brand-text-secondary/60">
            &copy; {currentYear} WeightLossRankings.org. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
