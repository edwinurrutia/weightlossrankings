import type { Metadata } from "next";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In · Weight Loss Rankings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = searchParams?.next || "/admin";

  return (
    <div className="min-h-screen bg-brand-gradient-light flex items-center justify-center px-4 py-12">
      <meta name="robots" content="noindex, nofollow" />
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-xl border border-brand-violet/10 p-8">
          <div className="text-center mb-6">
            <div className="font-heading text-2xl font-extrabold bg-brand-gradient bg-clip-text text-transparent">
              Weight Loss Rankings
            </div>
            <h1 className="mt-3 font-heading text-xl font-bold text-brand-text-primary">
              Admin Sign In
            </h1>
            <p className="mt-1 text-sm text-brand-text-secondary">
              Enter your admin credentials to continue.
            </p>
          </div>
          <AdminLoginForm next={next} />
        </div>
        <p className="mt-4 text-center text-xs text-brand-text-secondary">
          Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
