import { Metadata } from "next";
import CTAButton from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: "Advertise on Weight Loss Rankings",
  description:
    "Reach thousands of high-intent weight loss buyers. Featured listings, sponsored placements, and newsletter sponsorships.",
  alternates: { canonical: "/advertise" },
};

const OFFERINGS = [
  {
    name: "Featured Listing",
    description:
      "Your provider appears at the top of our comparison tool and rankings pages with a highlighted card and enhanced visibility.",
    features: [
      "Priority placement in comparison tool",
      "Highlighted card with enhanced styling",
      "Featured on homepage Top Rated section",
      "Included in relevant state pages",
    ],
  },
  {
    name: "Sponsored Review",
    description:
      "A dedicated, in-depth review page for your product or service with full scoring breakdown, pricing table, and prominent CTAs.",
    features: [
      "Dedicated review page (/reviews/your-brand)",
      "Full 6-dimension score breakdown",
      "Pricing table with promo codes",
      "Alternatives section drives comparisons",
    ],
  },
  {
    name: "Newsletter Sponsorship",
    description:
      "Reach our engaged email subscribers directly with a dedicated placement in our weekly newsletter covering price alerts and new reviews.",
    features: [
      "Dedicated section in weekly newsletter",
      "Targeted to active weight loss buyers",
      "Custom messaging and CTA",
      "Performance tracking and reporting",
    ],
  },
];

export default function AdvertisePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
          Reach High-Intent{" "}
          <span className="text-gradient">Weight Loss Buyers</span>
        </h1>
        <p className="text-brand-text-secondary text-lg mt-4 max-w-2xl mx-auto">
          WeightLossRankings.org connects thousands of people actively
          researching GLP-1 providers, weight loss programs, and supplements
          with the best solutions. Put your brand in front of buyers ready to
          take action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {OFFERINGS.map((offering) => (
          <div
            key={offering.name}
            className="rounded-2xl bg-white border border-brand-violet/10 p-6 flex flex-col"
          >
            <h3 className="font-heading font-bold text-lg text-brand-text-primary">
              {offering.name}
            </h3>
            <p className="text-sm text-brand-text-secondary mt-2">
              {offering.description}
            </p>
            <ul className="mt-4 space-y-2 flex-1">
              {offering.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-brand-text-secondary"
                >
                  <span className="text-brand-success shrink-0 mt-0.5">
                    +
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-brand-gradient p-8 text-white text-center">
        <h2 className="font-heading text-2xl font-bold">
          Interested in advertising?
        </h2>
        <p className="text-white/80 mt-2 max-w-lg mx-auto">
          We work with GLP-1 telehealth providers, weight loss programs,
          supplement brands, and meal delivery services. Get in touch to
          discuss a custom package.
        </p>
        <div className="mt-6">
          <CTAButton
            href="mailto:hello@weightlossrankings.org"
            variant="white"
          >
            Contact Us
          </CTAButton>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-white border border-brand-violet/10 p-6">
        <h3 className="font-heading font-bold text-lg text-brand-text-primary">
          Why Advertise With Us?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <div>
            <p className="text-2xl font-bold text-gradient">100%</p>
            <p className="text-sm text-brand-text-secondary mt-1">
              High-intent audience actively researching weight loss solutions
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gradient">11+</p>
            <p className="text-sm text-brand-text-secondary mt-1">
              Providers ranked across GLP-1 and weight loss program categories
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gradient">50</p>
            <p className="text-sm text-brand-text-secondary mt-1">
              State-specific landing pages for targeted local reach
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
