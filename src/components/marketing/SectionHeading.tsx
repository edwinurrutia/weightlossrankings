interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`flex flex-col gap-2 ${alignClasses}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-wide text-brand-violet">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-heading text-xl sm:text-2xl font-bold text-brand-text-primary"
      >
        {title}
      </h2>
      {description && (
        <p className="text-brand-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
