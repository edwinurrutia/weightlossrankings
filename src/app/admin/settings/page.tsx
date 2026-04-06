import type { Metadata } from "next";
import {
  getCurrentAdminUser,
  listAdminUsernames,
} from "@/lib/admin-users";
import { getAdminConfig } from "@/lib/admin-config";

export const metadata: Metadata = {
  title: "Admin · Settings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        ok
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-amber-50 text-amber-800 border-amber-200",
      ].join(" ")}
    >
      <span
        className={[
          "w-1.5 h-1.5 rounded-full",
          ok ? "bg-emerald-500" : "bg-amber-500",
        ].join(" ")}
      />
      {label}
    </span>
  );
}

export default async function SettingsPage() {
  const username = await getCurrentAdminUser();
  const config = getAdminConfig();
  const users = listAdminUsernames();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Settings
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Read-only view of the current admin configuration.
        </p>
      </header>

      {/* Current user */}
      <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5">
        <h2 className="font-heading text-sm font-bold text-brand-text-secondary uppercase tracking-wide mb-2">
          Current User
        </h2>
        <p className="text-xl font-bold text-brand-text-primary">
          {username ?? "(unknown)"}
        </p>
      </section>

      {/* Integrations */}
      <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5">
        <h2 className="font-heading text-sm font-bold text-brand-text-secondary uppercase tracking-wide mb-3">
          Integrations
        </h2>
        <ul className="divide-y divide-gray-100 text-sm">
          <li className="flex items-center justify-between py-2.5">
            <div>
              <div className="font-semibold text-brand-text-primary">
                GitHub CMS
              </div>
              <div className="text-xs text-brand-text-secondary">
                Required: GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME
              </div>
            </div>
            <StatusPill
              ok={config.cms_enabled}
              label={config.cms_enabled ? "Configured" : "Not configured"}
            />
          </li>
          <li className="flex items-center justify-between py-2.5">
            <div>
              <div className="font-semibold text-brand-text-primary">
                Vercel KV
              </div>
              <div className="text-xs text-brand-text-secondary">
                Required: KV_REST_API_URL, KV_REST_API_TOKEN
              </div>
            </div>
            <StatusPill
              ok={config.kv_enabled}
              label={config.kv_enabled ? "Configured" : "Not configured"}
            />
          </li>
          <li className="flex items-center justify-between py-2.5">
            <div>
              <div className="font-semibold text-brand-text-primary">
                Multi-user Auth
              </div>
              <div className="text-xs text-brand-text-secondary">
                ADMIN_USERS env var (legacy ADMIN_PASSWORD still supported)
              </div>
            </div>
            <StatusPill
              ok={config.multi_user_enabled}
              label={
                config.multi_user_enabled
                  ? `${config.user_count} users`
                  : "Legacy mode"
              }
            />
          </li>
        </ul>
      </section>

      {/* Admin users */}
      <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5">
        <h2 className="font-heading text-sm font-bold text-brand-text-secondary uppercase tracking-wide mb-3">
          Admin Users ({users.length})
        </h2>
        {users.length === 0 ? (
          <p className="text-sm text-brand-text-secondary">
            No admin users configured. Set <code>ADMIN_USERS</code> or{" "}
            <code>ADMIN_PASSWORD</code> in your environment.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {users.map((u) => (
              <li
                key={u}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-violet/15 bg-brand-violet/5 px-3 py-1.5 text-xs font-semibold text-brand-text-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />
                {u}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Test connection + env link */}
      <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5">
        <h2 className="font-heading text-sm font-bold text-brand-text-secondary uppercase tracking-wide mb-3">
          Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/api/admin/test-github"
            className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
          >
            Test GitHub Connection →
          </a>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
          >
            Manage env vars in Vercel →
          </a>
        </div>
      </section>
    </div>
  );
}
