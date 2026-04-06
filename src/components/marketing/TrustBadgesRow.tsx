import TrustBadge from "@/components/shared/TrustBadge";

interface TrustBadgesRowProps {
  badges: Array<{ icon: string; text: string }>;
  className?: string;
}

export default function TrustBadgesRow({
  badges,
  className = "flex flex-wrap gap-2",
}: TrustBadgesRowProps) {
  if (!badges || badges.length === 0) return null;
  return (
    <div className={className}>
      {badges.map((b, i) => (
        <TrustBadge key={`${b.text}-${i}`} icon={b.icon} text={b.text} />
      ))}
    </div>
  );
}
