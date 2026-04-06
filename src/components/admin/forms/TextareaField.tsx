"use client";

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCounter?: boolean;
  description?: string;
  id?: string;
}

export default function TextareaField({
  label,
  value,
  onChange,
  required,
  readOnly,
  placeholder,
  rows = 4,
  maxLength,
  showCounter,
  description,
  id,
}: TextareaFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const len = (value ?? "").length;
  const overLimit = maxLength != null && len > maxLength;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wide text-brand-text-secondary"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {showCounter && (
          <span
            className={[
              "text-[11px] font-semibold tabular-nums",
              overLimit ? "text-red-600" : "text-brand-text-secondary",
            ].join(" ")}
          >
            {len}
            {maxLength != null ? ` / ${maxLength}` : ""}
          </span>
        )}
      </div>
      <textarea
        id={inputId}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-brand-text-primary font-mono",
          "border-brand-violet/15 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-brand-violet/30",
          readOnly ? "bg-gray-50 text-brand-text-secondary cursor-not-allowed" : "",
          overLimit ? "border-red-400" : "",
        ].join(" ")}
      />
      {description && (
        <p className="text-[11px] text-brand-text-secondary">{description}</p>
      )}
    </div>
  );
}
