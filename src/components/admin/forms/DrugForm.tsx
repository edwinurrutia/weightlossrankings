"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Drug } from "@/lib/types";
import TextField from "./TextField";
import TextareaField from "./TextareaField";
import ArrayField from "./ArrayField";
import RepeatingField from "./RepeatingField";
import FormSection from "./FormSection";
import FormActions from "./FormActions";

interface DrugFormProps {
  initial: Drug;
}

export default function DrugForm({ initial }: DrugFormProps) {
  const router = useRouter();
  const [drug, setDrug] = useState<Drug>({
    ...initial,
    brand_names: initial.brand_names ?? [],
    dosing_schedule: initial.dosing_schedule ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function update<K extends keyof Drug>(key: K, value: Drug[K]) {
    setDrug((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/admin/content/drugs/${encodeURIComponent(drug.slug)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(drug),
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Name"
            value={drug.name}
            onChange={(v) => update("name", v)}
            required
          />
          <TextField label="Slug" value={drug.slug} readOnly />
        </div>
        <TextField
          label="Generic Name"
          value={drug.generic_name}
          onChange={(v) => update("generic_name", v)}
        />
        <ArrayField
          label="Brand Names"
          value={drug.brand_names}
          onChange={(v) => update("brand_names", v)}
        />
      </FormSection>

      <FormSection title="Description">
        <TextareaField
          label="Description"
          value={drug.description}
          onChange={(v) => update("description", v)}
          rows={5}
        />
        <TextareaField
          label="How It Works"
          value={drug.how_it_works}
          onChange={(v) => update("how_it_works", v)}
          rows={5}
        />
        <TextareaField
          label="Side Effects"
          value={drug.side_effects}
          onChange={(v) => update("side_effects", v)}
          rows={5}
        />
      </FormSection>

      <FormSection title="FDA Status">
        <TextareaField
          label="FDA Status"
          value={drug.fda_status}
          onChange={(v) => update("fda_status", v)}
          rows={3}
        />
        <TextField
          label="Approval Date"
          type="date"
          value={drug.approval_date ?? ""}
          onChange={(v) => update("approval_date", v || undefined)}
        />
      </FormSection>

      <FormSection
        title="Dosing Schedule"
        description="Week range and dose for each titration step."
      >
        <RepeatingField
          label="Steps"
          value={drug.dosing_schedule as { week_range: string; dose: string }[]}
          onChange={(v) =>
            update("dosing_schedule", v as Drug["dosing_schedule"])
          }
          fields={[
            { key: "week_range", label: "Week Range", placeholder: "Weeks 1–4" },
            { key: "dose", label: "Dose", placeholder: "0.25mg/week" },
          ]}
          newRow={() => ({ week_range: "", dose: "" })}
          addLabel="Add titration step"
        />
      </FormSection>

      <FormSection title="Clinical Trial">
        <TextareaField
          label="Clinical Trial Summary"
          value={drug.clinical_trial_summary ?? ""}
          onChange={(v) => update("clinical_trial_summary", v || undefined)}
          rows={5}
        />
      </FormSection>

      <FormActions
        onSave={handleSave}
        onCancel={() => router.push("/admin/content/drugs")}
        saving={saving}
        error={error}
        message={message}
      />
    </div>
  );
}
