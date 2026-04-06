import Link from "next/link";

export default function AffiliateDisclosure() {
  return (
    <p className="text-xs text-brand-text-secondary/70">
      WeightLossRankings.org is reader-supported. When you buy through links on
      our site, we may earn an affiliate commission.{" "}
      <Link href="/disclosure" className="underline hover:text-brand-text-secondary transition-colors">
        Learn more
      </Link>
    </p>
  );
}
