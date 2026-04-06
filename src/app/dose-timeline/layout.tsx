import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLP-1 Dose Timeline | Titration Schedule & Total Cost Calculator",
  description:
    "See the full GLP-1 titration schedule (semaglutide or tirzepatide) week by week, with total 6-month and annual cost across the top providers.",
  alternates: {
    canonical: "/dose-timeline",
  },
};

export default function DoseTimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
