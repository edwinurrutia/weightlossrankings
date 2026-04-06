"use client";

import { ReactNode } from "react";

interface FieldDef<T> {
  key: keyof T & string;
  label: string;
  placeholder?: string;
}

interface RepeatingFieldProps<T extends Record<string, string>> {
  label: string;
  value: T[];
  onChange?: (value: T[]) => void;
  fields: FieldDef<T>[];
  newRow: () => T;
  description?: string;
  addLabel?: string;
}

export default function RepeatingField<T extends Record<string, string>>({
  label,
  value,
  onChange,
  fields,
  newRow,
  description,
  addLabel = "Add row",
}: RepeatingFieldProps<T>): ReactNode {
  const rows = value ?? [];

  function update(idx: number, key: keyof T & string, v: string) {
    const next = rows.map((r, i) => (i === idx ? { ...r, [key]: v } : r));
    onChange?.(next);
  }

  function remove(idx: number) {
    onChange?.(rows.filter((_, i) => i !== idx));
  }

  function add() {
    onChange?.([...rows, newRow()]);
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wide text-brand-text-secondary">
        {label}
      </label>
      {description && (
        <p className="text-[11px] text-brand-text-secondary">{description}</p>
      )}
      <div className="space-y-2">
        {rows.length === 0 && (
          <p className="text-xs text-brand-text-secondary italic px-2 py-3 rounded-lg border border-dashed border-brand-violet/15 bg-white">
            No rows yet.
          </p>
        )}
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-end gap-2 rounded-lg border border-brand-violet/15 bg-white p-2"
          >
            {fields.map((f) => (
              <div key={f.key} className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wide text-brand-text-secondary mb-0.5">
                  {f.label}
                </label>
                <input
                  type="text"
                  value={row[f.key] ?? ""}
                  onChange={(e) => update(idx, f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-md border border-brand-violet/15 bg-white px-2 py-1.5 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => remove(idx)}
              className="shrink-0 inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
      >
        + {addLabel}
      </button>
    </div>
  );
}
