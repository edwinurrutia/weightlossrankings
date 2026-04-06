import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare GLP-1 Providers, Programs & Prices | Weight Loss Rankings",
  description:
    "Compare 50+ GLP-1 telehealth providers, weight loss programs, and supplements side by side. Filter by price, features, insurance acceptance, and more.",
  alternates: {
    canonical: "/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
