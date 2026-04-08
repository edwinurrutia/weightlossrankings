"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

/**
 * Mounts Vercel Analytics on every public page, skipping /admin/*
 * so internal traffic doesn't pollute marketing analytics — matches
 * the gating used in GoogleAnalytics.tsx.
 */
export default function VercelAnalyticsGate() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Analytics />;
}
