"use client";

interface NumberFieldProps {
  label: string;
  value: number | null | undefined;
  onChange?: (value: number | null) => void;
  required?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  id?: string;
}

export default function NumberField({
  label,
  value,
  onChange,
  required,
  readOnly,
  min,
  max,
  step,
  description,
  id,
}: NumberFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-xs font-bold uppercase tracking-wide text-brand-text-secondary"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={inputId}
        type="number"
        value={value ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "") onChange?.(null);
          else {
            const n = Number(v);
            if (!Number.isNaN(n)) onChange?.(n);
          }
        }}
        required={required}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-brand-text-primary",
          "border-brand-violet/15 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-brand-violet/30",
          readOnly ? "bg-gray-50 text-brand-text-secondary cursor-not-allowed" : "",
        ].join(" ")}
      />
      {description && (
        <p className="text-[11px] text-brand-text-secondary">{description}</p>
      )}
    </div>
  );
}
