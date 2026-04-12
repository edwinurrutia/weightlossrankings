import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "GLP-1 Dose Timeline | Titration Schedule & Total Cost Calculator",
  description:
    "See the full GLP-1 titration schedule (semaglutide or tirzepatide) week by week, with total 6-month and annual cost across the top providers.",
  alternates: {
    canonical: "/dose-timeline",
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

// HowTo schema for the GLP-1 titration timeline. The page is
// literally a step-by-step ladder showing what dose to take in
// which week — the canonical "how to titrate" reference page on
// the site. HowTo schema lets Google render the steps as a numbered
// SERP rich result. Caught in the 2026-04-08 schema audit.
//
// Two HowTo entities so Google can show either depending on the
// query intent (semaglutide titration vs tirzepatide titration).
const semaglutideHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to titrate semaglutide (Wegovy / Ozempic)",
  description:
    "FDA-approved 4-week dose escalation ladder for semaglutide, from the 0.25mg starter dose to the 2.4mg maintenance dose.",
  totalTime: "PT16W",
  tool: {
    "@type": "HowToTool",
    name: "Wegovy or Ozempic prefilled pen",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Week 1-4: 0.25mg starter dose",
      text: "Begin with 0.25mg semaglutide injected subcutaneously once weekly. This dose has minimal weight-loss effect and is intended to acclimate the GI system before escalation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Week 5-8: 0.5mg first increase",
      text: "Step up to 0.5mg weekly. Continue for 4 weeks to allow GI tolerance to adjust.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Week 9-12: 1.0mg second increase",
      text: "Step up to 1.0mg weekly for 4 weeks.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Week 13-16: 1.7mg third increase",
      text: "Step up to 1.7mg weekly for 4 weeks. This is the second-to-last titration step on the Wegovy ladder.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Week 17+: 2.4mg maintenance dose",
      text: "Step up to the 2.4mg maintenance dose. This is the dose used in the STEP 1 trial that produced ~15% mean weight loss at 68 weeks.",
    },
  ],
  url: `${SITE_URL}/dose-timeline`,
};

const tirzepatideHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to titrate tirzepatide (Zepbound / Mounjaro)",
  description:
    "FDA-approved 4-week dose escalation ladder for tirzepatide, from the 2.5mg starter dose to the 15mg maintenance dose.",
  totalTime: "PT16W",
  tool: {
    "@type": "HowToTool",
    name: "Zepbound or Mounjaro prefilled pen",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Week 1-4: 2.5mg starter dose",
      text: "Begin with 2.5mg tirzepatide injected subcutaneously once weekly. This dose is intended to acclimate the GI system before escalation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Week 5-8: 5mg first increase",
      text: "Step up to 5mg weekly. Continue for 4 weeks to allow GI tolerance to adjust.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Week 9-12: 7.5mg second increase",
      text: "Step up to 7.5mg weekly for 4 weeks.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Week 13-16: 10mg third increase",
      text: "Step up to 10mg weekly for 4 weeks.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Week 17+: 15mg maintenance dose",
      text: "Step up to the 15mg maintenance dose. This is the highest dose studied in SURMOUNT-1 and produced ~21% mean weight loss at 72 weeks.",
    },
  ],
  url: `${SITE_URL}/dose-timeline`,
};

export default function DoseTimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={semaglutideHowTo} />
      <JsonLd data={tirzepatideHowTo} />
      {children}
    </>
  );
}
