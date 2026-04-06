"use client";

interface CheckboxFieldProps {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
  description?: string;
  id?: string;
}

export default function CheckboxField({
  label,
  value,
  onChange,
  description,
  id,
}: CheckboxFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex items-start gap-3 rounded-lg border border-brand-violet/15 bg-white px-3 py-2.5">
      <input
        id={inputId}
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-brand-violet/30 text-brand-violet focus:ring-brand-violet/30"
      />
      <div className="flex-1 min-w-0">
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-brand-text-primary cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-brand-text-secondary mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
