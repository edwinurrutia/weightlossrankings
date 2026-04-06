"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StateContent } from "@/lib/states-content";
import TextField from "./TextField";
import TextareaField from "./TextareaField";
import NumberField from "./NumberField";
import CheckboxField from "./CheckboxField";
import ArrayField from "./ArrayField";
import FormSection from "./FormSection";
import FormActions from "./FormActions";

interface StateContentFormProps {
  code: string;
  initial: StateContent;
}

export default function StateContentForm({
  code,
  initial,
}: StateContentFormProps) {
  const router = useRouter();
  const [state, setState] = useState<StateContent>({
    ...initial,
    top_cities: initial.top_cities ?? [],
    key_facts: initial.key_facts ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function update<K extends keyof StateContent>(key: K, value: StateContent[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/admin/content/states/${encodeURIComponent(code)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Save failed (${res.status})`);
      setMessage("Saved.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <FormSection title="Identity">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextField label="Name" value={state.name} readOnly />
          <TextField label="Code" value={code} readOnly />
          <TextField label="Slug" value={state.slug} readOnly />
        </div>
      </FormSection>

      <FormSection title="Regulatory">
        <CheckboxField
          label="Telehealth Legal"
          value={state.telehealth_legal}
          onChange={(v) => update("telehealth_legal", v)}
          description="Whether telehealth GLP-1 prescriptions are legally allowed."
        />
        <TextField
          label="Medicaid GLP-1 Coverage"
          value={state.medicaid_glp1_coverage}
          onChange={(v) => update("medicaid_glp1_coverage", v)}
          description='e.g. "Diabetes only", "Limited", "Full"'
        />
        <TextareaField
          label="Regulatory Notes"
          value={state.regulatory_notes}
          onChange={(v) => update("regulatory_notes", v)}
          rows={5}
        />
      </FormSection>

      <FormSection title="Pricing & Demographics">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberField
            label="Avg Compounded Price ($/mo)"
            value={state.average_compounded_price_monthly}
            onChange={(v) =>
              update("average_compounded_price_monthly", v ?? 0)
            }
            min={0}
            step={1}
          />
          <NumberField
            label="Obesity Rate (%)"
            value={state.obesity_rate}
            onChange={(v) => update("obesity_rate", v ?? 0)}
            min={0}
            max={100}
            step={0.1}
          />
          <NumberField
            label="Obesity Rank"
            value={state.obesity_rank}
            onChange={(v) => update("obesity_rank", v ?? 0)}
            min={1}
            max={50}
            step={1}
          />
        </div>
      </FormSection>

      <FormSection title="Cities & Facts">
        <ArrayField
          label="Top Cities"
          value={state.top_cities}
          onChange={(v) => update("top_cities", v)}
        />
        <ArrayField
          label="Key Facts"
          value={state.key_facts}
          onChange={(v) => update("key_facts", v)}
          rows={6}
        />
      </FormSection>

      <FormActions
        onSave={handleSave}
        onCancel={() => router.push("/admin/content/states")}
        saving={saving}
        error={error}
        message={message}
      />
    </div>
  );
}
