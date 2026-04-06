"use client";

// Provider edit/create form. Pure controlled inputs — no form library.
//
// Submits via fetch to:
//   POST /api/admin/providers           (create)
//   PUT  /api/admin/providers/[slug]    (update)
//   DELETE /api/admin/providers/[slug]  (delete)

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Provider, Pricing, Scores } from "@/lib/types";
import { computeOverallScore, SCORE_DIMENSIONS } from "@/lib/scoring";
import { US_STATES } from "@/lib/states";

const CATEGORY_OPTIONS = [
  "GLP-1 Provider",
  "Weight Loss Program",
  "Supplement",
  "Meal Delivery",
  "Fitness App",
];

const FORM_OPTIONS: Pricing["form"][] = ["compounded", "brand"];

const FEATURE_PRESETS = [
  "Compounded",
  "Brand-name",
  "Semaglutide",
  "Tirzepatide",
  "Liraglutide",
  "Free Shipping",
  "Free 2-Day Shipping",
  "24/7 Support",
  "LegitScript Verified",
  "Telehealth",
  "In-Person",
  "Insurance Accepted",
  "HSA/FSA Eligible",
  "Microdosing",
  "Oral Format",
  "Subscription",
  "No Subscription",
  "Money-Back Guarantee",
];

const REGION_PRESETS: Record<string, string[]> = {
  Northeast: ["CT", "ME", "MA", "NH", "NJ", "NY", "PA", "RI", "VT"],
  Midwest: ["IL", "IN", "IA", "KS", "MI", "MN", "MO", "NE", "ND", "OH", "SD", "WI"],
  South: ["AL", "AR", "DE", "FL", "GA", "KY", "LA", "MD", "MS", "NC", "OK", "SC", "TN", "TX", "VA", "WV"],
  West: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NV", "NM", "OR", "UT", "WA", "WY"],
};

export interface ProviderFormProps {
  initial: Provider;
  mode: "create" | "edit";
  currentUser: string | null;
}

function emptyVerification() {
  return {
    last_verified: new Date().toISOString().slice(0, 10),
    verified_by: "manual" as const,
    source_urls: [] as string[],
    confidence: "medium" as const,
    notes: "",
  };
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function ProviderForm({
  initial,
  mode,
  currentUser,
}: ProviderFormProps) {
  const router = useRouter();
  const [provider, setProvider] = useState<Provider>(initial);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<{ path: string; message: string }[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customFeature, setCustomFeature] = useState("");
  const [sourceUrlsText, setSourceUrlsText] = useState(
    (initial.verification?.source_urls ?? []).join("\n")
  );
  const [prosText, setProsText] = useState(initial.pros.join("\n"));
  const [consText, setConsText] = useState(initial.cons.join("\n"));

  const overall = useMemo(
    () => computeOverallScore(provider.scores),
    [provider.scores]
  );

  function update<K extends keyof Provider>(key: K, value: Provider[K]) {
    setProvider((p) => ({ ...p, [key]: value }));
  }

  function updateScore(key: keyof Scores, value: number) {
    setProvider((p) => ({ ...p, scores: { ...p.scores, [key]: value } }));
  }

  function updatePricingRow(idx: number, patch: Partial<Pricing>) {
    setProvider((p) => {
      const next = [...p.pricing];
      next[idx] = { ...next[idx], ...patch };
      return { ...p, pricing: next };
    });
  }

  function addPricingRow() {
    setProvider((p) => ({
      ...p,
      pricing: [
        ...p.pricing,
        { dose: "", form: "compounded", monthly_cost: 0 },
      ],
    }));
  }

  function removePricingRow(idx: number) {
    setProvider((p) => ({
      ...p,
      pricing: p.pricing.filter((_, i) => i !== idx),
    }));
  }

  function toggleFeature(feature: string) {
    setProvider((p) => {
      const has = p.features.includes(feature);
      return {
        ...p,
        features: has
          ? p.features.filter((f) => f !== feature)
          : [...p.features, feature],
      };
    });
  }

  function addCustomFeature() {
    const f = customFeature.trim();
    if (!f) return;
    if (!provider.features.includes(f)) {
      update("features", [...provider.features, f]);
    }
    setCustomFeature("");
  }

  function toggleState(code: string) {
    setProvider((p) => {
      const has = p.states_available.includes(code);
      return {
        ...p,
        states_available: has
          ? p.states_available.filter((s) => s !== code)
          : [...p.states_available, code].sort(),
      };
    });
  }

  function setStates(codes: string[]) {
    update("states_available", [...new Set(codes)].sort());
  }

  function selectAllStates() {
    setStates(US_STATES.map((s) => s.code));
  }

  function clearAllStates() {
    setStates([]);
  }

  function applyRegion(region: keyof typeof REGION_PRESETS) {
    const merged = new Set([...provider.states_available, ...REGION_PRESETS[region]]);
    setStates(Array.from(merged));
  }

  function markVerifiedNow() {
    const note = `Verified by ${currentUser ?? "admin"} on ${todayISO()}`;
    const v = provider.verification ?? emptyVerification();
    const existingNotes = (v.notes ?? "").trim();
    const newNotes = existingNotes ? `${existingNotes}\n${note}` : note;
    update("verification", {
      last_verified: todayISO(),
      verified_by: "manual",
      source_urls: sourceUrlsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      confidence: "high",
      notes: newNotes,
    });
  }

  function buildPayload(): Provider {
    const sourceUrls = sourceUrlsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const pros = prosText.split("\n").map((s) => s.trim()).filter(Boolean);
    const cons = consText.split("\n").map((s) => s.trim()).filter(Boolean);

    const verification = provider.verification
      ? {
          ...provider.verification,
          source_urls: sourceUrls,
        }
      : sourceUrls.length || provider.verification
        ? {
            ...emptyVerification(),
            source_urls: sourceUrls,
          }
        : undefined;

    // Strip empty optional fields so Zod doesn't choke on empty strings
    // where it expects undefined.
    const cleaned: Provider = {
      ...provider,
      pros,
      cons,
      pricing: provider.pricing.map((row) => {
        const clean: Pricing = {
          dose: row.dose,
          form: row.form,
          monthly_cost: Number(row.monthly_cost) || 0,
        };
        if (row.promo_code && row.promo_code.trim()) {
          clean.promo_code = row.promo_code.trim();
        }
        if (row.promo_price && Number(row.promo_price) > 0) {
          clean.promo_price = Number(row.promo_price);
        }
        return clean;
      }),
      verification,
    };

    if (!cleaned.best_for) delete cleaned.best_for;
    if (!cleaned.logo) delete cleaned.logo;
    if (!cleaned.affiliate_network) delete cleaned.affiliate_network;
    if (cleaned.external_reviews) {
      const er = cleaned.external_reviews;
      const filtered: typeof er = {};
      if (er.trustpilot_score) filtered.trustpilot_score = Number(er.trustpilot_score);
      if (er.trustpilot_count) filtered.trustpilot_count = Number(er.trustpilot_count);
      if (er.google_score) filtered.google_score = Number(er.google_score);
      if (er.google_count) filtered.google_count = Number(er.google_count);
      cleaned.external_reviews = Object.keys(filtered).length ? filtered : undefined;
      if (!cleaned.external_reviews) delete cleaned.external_reviews;
    }

    if (!cleaned._id) cleaned._id = cleaned.slug;
    if (!cleaned.fda_warnings) cleaned.fda_warnings = [];

    return cleaned;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIssues([]);
    setSaving(true);

    const payload = buildPayload();
    const url =
      mode === "create"
        ? "/api/admin/providers"
        : `/api/admin/providers/${initial.slug}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        if (Array.isArray(data.issues)) setIssues(data.issues);
        setSaving(false);
        return;
      }
      router.push("/admin/providers");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/providers/${initial.slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Delete failed");
        setDeleting(false);
        setShowDeleteModal(false);
        return;
      }
      router.push("/admin/providers");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <p className="font-semibold">{error}</p>
          {issues.length > 0 && (
            <ul className="mt-2 list-disc ml-5 space-y-0.5 text-xs">
              {issues.map((i, idx) => (
                <li key={idx}>
                  <code>{i.path || "root"}</code>: {i.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Basic info */}
      <Section title="Basic Info">
        <Grid>
          <Field label="Name">
            <input
              type="text"
              value={provider.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label={mode === "create" ? "Slug" : "Slug (read-only)"}>
            <input
              type="text"
              value={provider.slug}
              onChange={(e) => mode === "create" && update("slug", e.target.value)}
              readOnly={mode === "edit"}
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              className={
                inputCls + (mode === "edit" ? " bg-gray-100 text-gray-500" : "")
              }
            />
          </Field>
          <Field label="Category">
            <select
              value={provider.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputCls}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Logo URL (optional)">
            <input
              type="text"
              value={provider.logo ?? ""}
              onChange={(e) => update("logo", e.target.value)}
              className={inputCls}
            />
          </Field>
        </Grid>
        <Field label="Description">
          <textarea
            value={provider.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* Pricing */}
      <Section title="Pricing">
        <div className="space-y-3">
          {provider.pricing.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end rounded-xl border border-brand-violet/10 bg-brand-violet/5 p-3"
            >
              <div className="md:col-span-3">
                <label className="text-[10px] uppercase font-bold text-brand-text-secondary">
                  Dose
                </label>
                <input
                  value={row.dose}
                  onChange={(e) => updatePricingRow(idx, { dose: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-brand-text-secondary">
                  Form
                </label>
                <select
                  value={row.form}
                  onChange={(e) =>
                    updatePricingRow(idx, { form: e.target.value as Pricing["form"] })
                  }
                  className={inputCls}
                >
                  {FORM_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-brand-text-secondary">
                  Monthly $
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={row.monthly_cost}
                  onChange={(e) =>
                    updatePricingRow(idx, {
                      monthly_cost: Number(e.target.value),
                    })
                  }
                  className={inputCls}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-brand-text-secondary">
                  Promo Code
                </label>
                <input
                  value={row.promo_code ?? ""}
                  onChange={(e) =>
                    updatePricingRow(idx, { promo_code: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-brand-text-secondary">
                  Promo Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={row.promo_price ?? ""}
                  onChange={(e) =>
                    updatePricingRow(idx, {
                      promo_price: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className={inputCls}
                />
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removePricingRow(idx)}
                  className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addPricingRow}
            className="rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
          >
            + Add Pricing Row
          </button>
        </div>
      </Section>

      {/* Scores */}
      <Section
        title={`Scores (Overall: ${overall.toFixed(1)} / 10)`}
      >
        <Grid>
          {SCORE_DIMENSIONS.map((dim) => (
            <Field key={dim.key} label={`${dim.label} (${dim.weight})`}>
              <input
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={provider.scores[dim.key]}
                onChange={(e) =>
                  updateScore(dim.key, Number(e.target.value))
                }
                className={inputCls}
              />
            </Field>
          ))}
        </Grid>
      </Section>

      {/* Features */}
      <Section title="Features">
        <div className="flex flex-wrap gap-2">
          {[...new Set([...FEATURE_PRESETS, ...provider.features])].map((feature) => {
            const active = provider.features.includes(feature);
            return (
              <button
                type="button"
                key={feature}
                onClick={() => toggleFeature(feature)}
                className={
                  "rounded-full px-3 py-1 text-xs font-semibold border " +
                  (active
                    ? "bg-brand-gradient text-white border-transparent"
                    : "bg-white text-brand-text-primary border-brand-violet/15 hover:bg-brand-violet/5")
                }
              >
                {feature}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            placeholder="Add custom feature…"
            className={inputCls + " max-w-xs"}
          />
          <button
            type="button"
            onClick={addCustomFeature}
            className="rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
          >
            Add
          </button>
        </div>
      </Section>

      {/* States */}
      <Section title={`States Available (${provider.states_available.length})`}>
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            onClick={selectAllStates}
            className="rounded-lg border border-brand-violet/15 bg-white px-3 py-1 text-xs font-semibold hover:bg-brand-violet/5"
          >
            All 50
          </button>
          <button
            type="button"
            onClick={clearAllStates}
            className="rounded-lg border border-brand-violet/15 bg-white px-3 py-1 text-xs font-semibold hover:bg-brand-violet/5"
          >
            Clear All
          </button>
          {Object.keys(REGION_PRESETS).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => applyRegion(r as keyof typeof REGION_PRESETS)}
              className="rounded-lg border border-brand-violet/15 bg-white px-3 py-1 text-xs font-semibold hover:bg-brand-violet/5"
            >
              + {r}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-1.5">
          {US_STATES.map((s) => {
            const active = provider.states_available.includes(s.code);
            return (
              <button
                key={s.code}
                type="button"
                onClick={() => toggleState(s.code)}
                title={s.name}
                className={
                  "rounded-md px-2 py-1 text-xs font-semibold border " +
                  (active
                    ? "bg-brand-gradient text-white border-transparent"
                    : "bg-white text-brand-text-primary border-brand-violet/15 hover:bg-brand-violet/5")
                }
              >
                {s.code}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Affiliate */}
      <Section title="Affiliate">
        <Grid>
          <Field label="Affiliate URL">
            <input
              type="url"
              value={provider.affiliate_url}
              onChange={(e) => update("affiliate_url", e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Affiliate Network">
            <input
              value={provider.affiliate_network ?? ""}
              onChange={(e) => update("affiliate_network", e.target.value)}
              className={inputCls}
            />
          </Field>
        </Grid>
      </Section>

      {/* Pros / Cons */}
      <Section title="Pros & Cons">
        <Grid>
          <Field label="Pros (one per line)">
            <textarea
              value={prosText}
              onChange={(e) => setProsText(e.target.value)}
              rows={6}
              className={inputCls}
            />
          </Field>
          <Field label="Cons (one per line)">
            <textarea
              value={consText}
              onChange={(e) => setConsText(e.target.value)}
              rows={6}
              className={inputCls}
            />
          </Field>
        </Grid>
      </Section>

      {/* Best for / Featured */}
      <Section title="Highlights">
        <Grid>
          <Field label="Best For">
            <input
              value={provider.best_for ?? ""}
              onChange={(e) => update("best_for", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Is Featured">
            <label className="inline-flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={provider.is_featured}
                onChange={(e) => update("is_featured", e.target.checked)}
              />
              <span className="text-sm">Show on homepage / featured grids</span>
            </label>
          </Field>
        </Grid>
      </Section>

      {/* External reviews */}
      <Section title="External Reviews">
        <Grid>
          <Field label="Trustpilot Score">
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={provider.external_reviews?.trustpilot_score ?? ""}
              onChange={(e) =>
                update("external_reviews", {
                  ...provider.external_reviews,
                  trustpilot_score: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Trustpilot Count">
            <input
              type="number"
              min="0"
              value={provider.external_reviews?.trustpilot_count ?? ""}
              onChange={(e) =>
                update("external_reviews", {
                  ...provider.external_reviews,
                  trustpilot_count: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Google Score">
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={provider.external_reviews?.google_score ?? ""}
              onChange={(e) =>
                update("external_reviews", {
                  ...provider.external_reviews,
                  google_score: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Google Count">
            <input
              type="number"
              min="0"
              value={provider.external_reviews?.google_count ?? ""}
              onChange={(e) =>
                update("external_reviews", {
                  ...provider.external_reviews,
                  google_count: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={inputCls}
            />
          </Field>
        </Grid>
      </Section>

      {/* Verification */}
      <Section title="Verification">
        <Grid>
          <Field label="Last Verified">
            <input
              type="date"
              value={provider.verification?.last_verified ?? ""}
              onChange={(e) =>
                update("verification", {
                  ...(provider.verification ?? emptyVerification()),
                  last_verified: e.target.value,
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Confidence">
            <select
              value={provider.verification?.confidence ?? "medium"}
              onChange={(e) =>
                update("verification", {
                  ...(provider.verification ?? emptyVerification()),
                  confidence: e.target.value as "high" | "medium" | "low",
                })
              }
              className={inputCls}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </Field>
        </Grid>
        <Field label="Source URLs (one per line)">
          <textarea
            value={sourceUrlsText}
            onChange={(e) => setSourceUrlsText(e.target.value)}
            rows={3}
            placeholder="https://example.com/pricing"
            className={inputCls}
          />
        </Field>
        <Field label="Notes">
          <textarea
            value={provider.verification?.notes ?? ""}
            onChange={(e) =>
              update("verification", {
                ...(provider.verification ?? emptyVerification()),
                notes: e.target.value,
              })
            }
            rows={3}
            className={inputCls}
          />
        </Field>
        <button
          type="button"
          onClick={markVerifiedNow}
          className="rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
        >
          Mark as Verified Now
        </button>
      </Section>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 sticky bottom-0 bg-white/95 backdrop-blur border-t border-brand-violet/10 -mx-6 px-6 py-4 rounded-b-2xl">
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-brand-gradient text-white font-semibold px-5 py-2 text-sm shadow-sm disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/providers")}
            className="rounded-lg border border-brand-violet/15 bg-white px-4 py-2 text-sm font-semibold text-brand-text-primary hover:bg-brand-violet/5"
          >
            Cancel
          </button>
        </div>
        {mode === "edit" && (
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Delete Provider
          </button>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="font-heading text-lg font-bold text-brand-text-primary">
              Delete {provider.name}?
            </h3>
            <p className="mt-2 text-sm text-brand-text-secondary">
              This commits a deletion to GitHub and removes the provider from
              the live site after the next deploy. This action cannot be undone
              from the admin UI.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-brand-violet/15 bg-white px-4 py-2 text-sm font-semibold text-brand-text-primary hover:bg-brand-violet/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

const inputCls =
  "mt-1 block w-full rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-violet focus:ring-1 focus:ring-brand-violet outline-none";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6">
      <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-brand-text-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}
