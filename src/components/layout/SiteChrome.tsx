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
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isEmbed = pathname?.startsWith("/embed");

  if (isAdmin || isEmbed) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
