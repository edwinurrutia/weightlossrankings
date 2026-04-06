"use client";

interface ArrayFieldProps {
  label: string;
  value: string[];
  onChange?: (value: string[]) => void;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
  description?: string;
  id?: string;
}

/**
 * Array editor backed by a one-per-line textarea. Empty lines are dropped
 * on serialize. Whitespace at line ends is trimmed.
 */
export default function ArrayField({
  label,
  value,
  onChange,
  required,
  readOnly,
  rows = 4,
  description,
  id,
}: ArrayFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const text = (value ?? []).join("\n");
  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-xs font-bold uppercase tracking-wide text-brand-text-secondary"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={inputId}
        value={text}
        onChange={(e) => {
          const lines = e.target.value
            .split("\n")
            .map((l) => l.replace(/\s+$/, ""));
          // keep blank trailing line while typing; on save callers should re-filter
          onChange?.(lines.filter((l) => l.length > 0));
        }}
        readOnly={readOnly}
        rows={rows}
        placeholder="One per line"
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-brand-text-primary font-mono",
          "border-brand-violet/15 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-brand-violet/30",
          readOnly ? "bg-gray-50 text-brand-text-secondary cursor-not-allowed" : "",
        ].join(" ")}
      />
      <p className="text-[11px] text-brand-text-secondary">
        {description ?? "One per line. Blank lines are removed."}
      </p>
    </div>
  );
}
