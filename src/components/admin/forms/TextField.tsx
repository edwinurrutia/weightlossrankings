"use client";

interface TextFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "url" | "datetime-local" | "date";
  description?: string;
  id?: string;
}

export default function TextField({
  label,
  value,
  onChange,
  required,
  readOnly,
  placeholder,
  type = "text",
  description,
  id,
}: TextFieldProps) {
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
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
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
