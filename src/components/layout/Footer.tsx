import Link from "next/link";
import Logo from "@/components/shared/Logo";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";

const footerColumns = [
  {
    heading: "Compare",
    links: [
      { label: "Compare Providers", href: "/compare" },
      { label: "Savings Calculator", href: "/savings-calculator" },
      { label: "Best Semaglutide Providers", href: "/best/semaglutide-providers" },
      { label: "Best Weight Loss Programs", href: "/best/weight-loss-programs" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Methodology", href: "/methodology" },
      { label: "Texas", href: "/states/texas" },
      { label: "California", href: "/states/california" },
      { label: "Florida", href: "/states/florida" },
      { label: "New York", href: "/states/new-york" },
      { label: "Illinois", href: "/states/illinois" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Disclosure", href: "/disclosure" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <h3 className="text-xs font-semibold text-brand-text-primary uppercase tracking-wider mb-4">
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
          <p className="text-xs text-brand-text-secondary/60">
            &copy; {currentYear} WeightLossRankings.org. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
