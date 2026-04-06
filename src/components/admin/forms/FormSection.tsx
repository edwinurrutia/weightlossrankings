import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5 space-y-4">
      <header>
        <h2 className="font-heading text-base font-bold text-brand-text-primary">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-brand-text-secondary mt-0.5">
            {description}
          </p>
        )}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
