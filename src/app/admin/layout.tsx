import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentAdminUser } from "@/lib/admin-users";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · Weight Loss Rankings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = await getCurrentAdminUser();

  return (
    <div className="min-h-screen bg-brand-gradient-light">
      <meta name="robots" content="noindex, nofollow" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-brand-violet/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link
            href="/admin"
            className="font-heading text-lg font-extrabold bg-brand-gradient bg-clip-text text-transparent"
          >
            WLR Admin
          </Link>
          <div className="flex items-center gap-3 text-sm">
            {username && (
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-violet/5 border border-brand-violet/10 px-3 py-1 text-xs font-semibold text-brand-text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />
                {username}
              </span>
            )}
            <Link
              href="/"
              className="hidden sm:inline-flex text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary"
            >
              View Site →
            </Link>
            <Link
              href="/admin/sign-out"
              className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <AdminSidebar />
          <div className="flex-1 min-w-0 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
