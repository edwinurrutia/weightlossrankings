"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/providers", label: "Providers", icon: "◉" },
  { href: "/admin/scraper", label: "Scraper", icon: "↻" },
  { href: "/admin/content", label: "Content", icon: "✎" },
  { href: "/admin/data-quality", label: "Data Quality", icon: "✓" },
  { href: "/admin/audit-log", label: "Audit Log", icon: "≡" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AdminSidebar() {
  const pathname = usePathname() ?? "/admin";
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile open button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-sm font-semibold text-brand-text-primary shadow-sm"
        aria-label="Open admin menu"
      >
        ☰ Menu
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="relative w-72 max-w-[80vw] h-full bg-white shadow-xl border-r border-brand-violet/10 p-5 overflow-y-auto">
            <SidebarInner pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-4">
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-4">
            <SidebarInner pathname={pathname} />
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarInner({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary/60">
        Admin CMS
      </p>
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
              active
                ? "bg-brand-gradient text-white shadow-sm"
                : "text-brand-text-primary hover:bg-brand-violet/5",
            ].join(" ")}
          >
            <span
              className={[
                "inline-flex w-5 h-5 items-center justify-center text-xs",
                active ? "text-white" : "text-brand-text-secondary",
              ].join(" ")}
              aria-hidden
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
