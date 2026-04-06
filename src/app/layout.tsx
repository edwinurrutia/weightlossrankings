import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "WeightLossRankings — Compare GLP-1 Providers & Weight Loss Programs",
    template: "%s | WeightLossRankings",
  },
  description:
    "Independent rankings and reviews of GLP-1 telehealth providers, weight loss programs, and supplements. Compare prices, read expert reviews, find the best option.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org"
  ),
  keywords: [
    "GLP-1 providers",
    "semaglutide",
    "tirzepatide",
    "weight loss",
    "compounded semaglutide",
    "wegovy alternatives",
    "telehealth weight loss",
  ],
  authors: [{ name: "WeightLossRankings" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weightlossrankings.org",
    siteName: "WeightLossRankings",
    title:
      "WeightLossRankings — Compare GLP-1 Providers & Weight Loss Programs",
    description:
      "Independent rankings and reviews of GLP-1 telehealth providers, weight loss programs, and supplements.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeightLossRankings",
    description: "Compare GLP-1 providers, prices, and reviews.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WeightLossRankings",
    "url": "https://weightlossrankings.org",
    "logo": "https://weightlossrankings.org/icon.svg",
    "description": "Independent rankings and reviews of GLP-1 providers, weight loss programs, and related services.",
    "sameAs": [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WeightLossRankings",
    "url": "https://weightlossrankings.org",
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
