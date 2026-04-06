import type { Provider } from "@/lib/types";

interface PricingTableProps {
  pricing: Provider["pricing"];
}

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
            <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
              Price/mo
            </th>
            <th className="text-left py-2 font-semibold text-brand-text-primary">
              Promo
            </th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((p, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 pr-4 text-brand-text-secondary">{p.dose}</td>
              <td className="py-2.5 pr-4 text-brand-text-secondary capitalize">
                {p.form}
              </td>
              <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                ${p.monthly_cost}
                {p.promo_price && (
                  <span className="ml-2 text-brand-success font-semibold">
                    ${p.promo_price}
                  </span>
                )}
              </td>
              <td className="py-2.5 text-brand-text-secondary">
                {p.promo_code ? (
                  <span className="text-xs font-medium text-brand-success bg-brand-success/10 rounded-full px-2 py-0.5">
                    {p.promo_code}
                  </span>
                ) : (
                  <span className="text-brand-text-secondary/40">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
