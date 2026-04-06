import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import CookieConsent from "@/components/shared/CookieConsent";
import JsonLd from "@/components/shared/JsonLd";
import FeaturedModalWrapper from "@/components/marketing/FeaturedModalWrapper";

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
      "Weight Loss Rankings | Compare GLP-1 Providers, Prices & Reviews 2026",
    template: "%s | Weight Loss Rankings",
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
  authors: [{ name: "Weight Loss Rankings" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weightlossrankings.org",
    siteName: "Weight Loss Rankings",
    title:
      "Weight Loss Rankings | Compare GLP-1 Providers, Prices & Reviews 2026",
    description:
      "Independent rankings and reviews of GLP-1 telehealth providers, weight loss programs, and supplements.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Weight Loss Rankings — Compare GLP-1 Providers, Prices & Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weight Loss Rankings",
    description: "Compare GLP-1 providers, prices, and reviews.",
    images: ["/opengraph-image"],
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
  // Auto-discovery for RSS readers, Apple News, Feedly, and AI
  // crawlers (Perplexity / ChatGPT / Claude) that look for
  // <link rel="alternate" type="application/rss+xml"> in the head.
  // The feed itself lives at src/app/feed.xml/route.ts.
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        {
          url: "/feed.xml",
          title: "Weight Loss Rankings — Latest articles",
        },
      ],
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
    "name": "Weight Loss Rankings",
    "url": "https://weightlossrankings.org",
    "logo": "https://weightlossrankings.org/icon.svg",
    "description": "Independent rankings and reviews of GLP-1 providers, weight loss programs, and related services.",
    "sameAs": [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Weight Loss Rankings",
    "url": "https://weightlossrankings.org",
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <SiteChrome>{children}</SiteChrome>
        <FeaturedModalWrapper />
        <CookieConsent />
      </body>
    </html>
  );
}
