interface TrustBadgeProps {
  icon: string;
  text: string;
}

export default function TrustBadge({ icon, text }: TrustBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-brand-text-secondary border border-brand-violet/10">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  );
}
