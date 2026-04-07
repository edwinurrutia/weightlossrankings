import type { Metadata } from "next";
import SpanishNavbar from "@/components/layout/SpanishNavbar";
import SpanishFooter from "@/components/layout/SpanishFooter";
import SpanishHtmlLang from "@/components/layout/SpanishHtmlLang";

export const metadata: Metadata = {
  title: {
    default:
      "Weight Loss Rankings — Rankings de proveedores GLP-1 en español",
    template: "%s | Weight Loss Rankings",
  },
  description:
    "Rankings independientes de proveedores de telemedicina GLP-1 (Wegovy, Ozempic, Zepbound, Mounjaro). Guías en español sobre semaglutida, tirzepatida, dosis, costos y seguridad.",
  alternates: {
    canonical: "/es",
    languages: {
      "en-US": "/",
      "es-US": "/es",
    },
  },
  openGraph: {
    locale: "es_US",
    siteName: "Weight Loss Rankings",
  },
};

export default function SpanishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SpanishHtmlLang />
      <SpanishNavbar />
      <main className="min-h-screen">{children}</main>
      <SpanishFooter />
    </>
  );
}
