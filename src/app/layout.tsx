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
  // Enriched Organization schema. The richer this entity is, the
  // better Google's knowledge graph treats us — and on every single
  // page we render. Gets cited by Google's "About this result"
  // info card, the People Also Ask carousel, and the brand SERP
  // sidebar.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Weight Loss Rankings",
    alternateName: ["WLR", "weightlossrankings.org"],
    url: "https://weightlossrankings.org",
    logo: {
      "@type": "ImageObject",
      url: "https://weightlossrankings.org/logo-600.png",
      width: 600,
      height: 600,
    },
    description:
      "Independent rankings, reviews, and data investigations on GLP-1 telehealth providers, compounded semaglutide and tirzepatide, and the weight loss telehealth market.",
    foundingDate: "2025",
    knowsAbout: [
      "GLP-1 receptor agonists",
      "Semaglutide",
      "Tirzepatide",
      "Compounded medications",
      "Telehealth weight loss",
      "Bariatric medicine",
      "FDA enforcement",
      "Pharmaceutical pricing",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: "hello@weightlossrankings.org",
      availableLanguage: "English",
    },
    publishingPrinciples: "https://weightlossrankings.org/methodology",
    actionableFeedbackPolicy: "https://weightlossrankings.org/contact",
    correctionsPolicy: "https://weightlossrankings.org/methodology",
    diversityPolicy: "https://weightlossrankings.org/about",
    ethicsPolicy: "https://weightlossrankings.org/disclosure",
    masthead: "https://weightlossrankings.org/about",
    sameAs: [],
  };

  // Enriched WebSite schema with SearchAction so Google's sitelinks
  // search box can fire queries directly into our compare page.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Weight Loss Rankings",
    alternateName: "WLR",
    url: "https://weightlossrankings.org",
    description:
      "Independent rankings and reviews of GLP-1 telehealth providers, compounded semaglutide and tirzepatide, and the weight loss telehealth market.",
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      logo: {
        "@type": "ImageObject",
        url: "https://weightlossrankings.org/logo-600.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://weightlossrankings.org/compare?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
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
