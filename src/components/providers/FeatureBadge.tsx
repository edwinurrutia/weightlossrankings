type BadgeVariant = "default" | "highlight" | "warning";

interface FeatureBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-brand-violet/8 text-brand-violet",
  highlight: "bg-brand-gradient text-white",
  warning: "bg-brand-warning/10 text-brand-warning",
};

export default function FeatureBadge({
  label,
  variant = "default",
}: FeatureBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
