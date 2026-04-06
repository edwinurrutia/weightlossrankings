import type { Provider } from "@/lib/types";

interface PricingTableProps {
  pricing: Provider["pricing"];
}

/**
 * Pricing breakdown table used on individual provider review pages.
 *
 * Promo codes are intentionally hidden site-wide. The promo_price still
 * drives the displayed price (when present) so the table reflects what
 * a new customer actually pays, but we no longer surface a "Promo" column
 * with the code itself.
 */
export default function PricingTable({ pricing }: PricingTableProps) {
  if (!pricing || pricing.length === 0) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
              Dose
            </th>
            <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
              Form
            </th>
            <th className="text-left py-2 font-semibold text-brand-text-primary">
              Price/mo
            </th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((p, i) => {
            const displayPrice = p.promo_price ?? p.monthly_cost;
            return (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 pr-4 text-brand-text-secondary">
                  {p.dose}
                </td>
                <td className="py-2.5 pr-4 text-brand-text-secondary capitalize">
                  {p.form}
                </td>
                <td className="py-2.5 font-medium text-brand-text-primary">
                  ${displayPrice}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
