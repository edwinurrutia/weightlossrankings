import priceHistoryData from "@/data/price-history.json";

export interface PricePoint {
  date: string;
  price: number;
}

export interface PriceHistoryEntry {
  provider_slug: string;
  dose: string;
  form: string;
  history: PricePoint[];
}

export interface PriceChange {
  provider_slug: string;
  dose: string;
  old_price: number;
  new_price: number;
  change_pct: number;
  direction: "up" | "down";
}

export interface CurrentDeal {
  provider_slug: string;
  dose: string;
  current_price: number;
}

const priceHistory = priceHistoryData as PriceHistoryEntry[];

export function getPriceHistory(): PriceHistoryEntry[] {
  return priceHistory;
}

export function getPriceHistoryForProvider(slug: string): PriceHistoryEntry[] {
  return priceHistory.filter((entry) => entry.provider_slug === slug);
}

export function getRecentChanges(days: number = 90): PriceChange[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const changes: PriceChange[] = [];

  for (const entry of priceHistory) {
    const sorted = [...entry.history].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Find the price just before the cutoff window and the most recent price
    let oldPrice: number | null = null;
    let newPrice: number | null = null;

    for (const point of sorted) {
      const pointDate = new Date(point.date);
      if (pointDate < cutoff) {
        oldPrice = point.price;
      } else {
        if (newPrice === null) {
          newPrice = point.price;
        } else {
          newPrice = point.price;
        }
      }
    }

    // If we don't have an old price before cutoff, use the first available
    if (oldPrice === null && sorted.length >= 2) {
      oldPrice = sorted[0].price;
    }

    // Use the last point as newPrice if still null
    if (newPrice === null && sorted.length > 0) {
      newPrice = sorted[sorted.length - 1].price;
    }

    if (oldPrice !== null && newPrice !== null && oldPrice !== newPrice) {
      const change_pct = ((newPrice - oldPrice) / oldPrice) * 100;
      changes.push({
        provider_slug: entry.provider_slug,
        dose: entry.dose,
        old_price: oldPrice,
        new_price: newPrice,
        change_pct: Math.round(change_pct * 10) / 10,
        direction: newPrice < oldPrice ? "down" : "up",
      });
    }
  }

  return changes.sort((a, b) => Math.abs(b.change_pct) - Math.abs(a.change_pct));
}

export function getBestCurrentDeals(): CurrentDeal[] {
  const deals: CurrentDeal[] = [];

  for (const entry of priceHistory) {
    if (entry.dose !== "0.5mg") continue;

    const sorted = [...entry.history].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (sorted.length > 0) {
      deals.push({
        provider_slug: entry.provider_slug,
        dose: entry.dose,
        current_price: sorted[0].price,
      });
    }
  }

  return deals.sort((a, b) => a.current_price - b.current_price);
}
