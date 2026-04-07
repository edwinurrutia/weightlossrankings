"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Renders the marketing site Navbar + Footer on every public page,
 * but hides them on:
 *   - /admin/* routes (admin shell has its own layout)
 *   - /embed/* routes (embeddable widgets that get iframed into
 *     other people's sites — they should render bare content with
 *     no WLR navigation chrome)
 *   - /es/* routes (Spanish subdirectory has its own localized
 *     header + footer rendered from src/app/es/layout.tsx)
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isEmbed = pathname?.startsWith("/embed");
  const isSpanish = pathname === "/es" || pathname?.startsWith("/es/");

  if (isAdmin || isEmbed) {
    return <main className="min-h-screen">{children}</main>;
  }

  if (isSpanish) {
    // Spanish routes provide their own SpanishNavbar / SpanishFooter
    // via src/app/es/layout.tsx. Render bare content here.
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
