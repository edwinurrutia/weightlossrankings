"use client";

import { useState } from "react";

interface DataPoint {
  date: string;
  price: number;
}

interface TooltipState {
  x: number;
  y: number;
  date: string;
  price: number;
  visible: boolean;
}

interface PriceLineChartProps {
  data: DataPoint[];
  color?: string;
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export default function PriceLineChart({ data, color = "#8b5cf6" }: PriceLineChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    x: 0,
    y: 0,
    date: "",
    price: 0,
    visible: false,
  });

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-brand-text-secondary text-sm">
        No data available
      </div>
    );
  }

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const WIDTH = 400;
  const HEIGHT = 200;
  const PADDING_LEFT = 48;
  const PADDING_RIGHT = 20;
  const PADDING_TOP = 20;
  const PADDING_BOTTOM = 32;

  const chartWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const chartHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  const prices = sorted.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const paddedMin = minPrice - priceRange * 0.1;
  const paddedMax = maxPrice + priceRange * 0.1;
  const paddedRange = paddedMax - paddedMin;

  const toX = (index: number) =>
    PADDING_LEFT + (index / (sorted.length - 1)) * chartWidth;

  const toY = (price: number) =>
    PADDING_TOP + chartHeight - ((price - paddedMin) / paddedRange) * chartHeight;

  const points = sorted.map((d, i) => ({ x: toX(i), y: toY(d.price), ...d }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Y-axis grid lines at 4 increments
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const price = paddedMin + (paddedRange / 4) * i;
    const y = toY(price);
    return { y, price: Math.round(price) };
  });

  const gradientId = `line-gradient-${color.replace("#", "")}`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        aria-label="Price history chart"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={PADDING_LEFT}
              y1={line.y}
              x2={WIDTH - PADDING_RIGHT}
              y2={line.y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <text
              x={PADDING_LEFT - 4}
              y={line.y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#94a3b8"
            >
              ${line.price}
            </text>
          </g>
        ))}

        {/* Min/max price labels */}
        <text
          x={PADDING_LEFT - 4}
          y={toY(maxPrice) + 4}
          textAnchor="end"
          fontSize="10"
          fontWeight="600"
          fill="#8b5cf6"
        >
          ${maxPrice}
        </text>
        <text
          x={PADDING_LEFT - 4}
          y={toY(minPrice) + 4}
          textAnchor="end"
          fontSize="10"
          fontWeight="600"
          fill="#10b981"
        >
          ${minPrice}
        </text>

        {/* X-axis labels: first and last date */}
        <text
          x={toX(0)}
          y={HEIGHT - 6}
          textAnchor="start"
          fontSize="10"
          fill="#94a3b8"
        >
          {formatShortDate(sorted[0].date)}
        </text>
        <text
          x={toX(sorted.length - 1)}
          y={HEIGHT - 6}
          textAnchor="end"
          fontSize="10"
          fill="#94a3b8"
        >
          {formatShortDate(sorted[sorted.length - 1].date)}
        </text>

        {/* Line */}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data dots with hover zones */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill={`url(#${gradientId})`} />
            {/* Invisible larger hit area */}
            <circle
              cx={p.x}
              cy={p.y}
              r="10"
              fill="transparent"
              onMouseEnter={() =>
                setTooltip({
                  x: p.x,
                  y: p.y,
                  date: p.date,
                  price: p.price,
                  visible: true,
                })
              }
              onMouseLeave={() =>
                setTooltip((prev) => ({ ...prev, visible: false }))
              }
              style={{ cursor: "pointer" }}
            />
          </g>
        ))}

        {/* Tooltip */}
        {tooltip.visible && (
          <g>
            <rect
              x={Math.min(tooltip.x - 40, WIDTH - PADDING_RIGHT - 82)}
              y={tooltip.y - 40}
              width="82"
              height="32"
              rx="6"
              fill="#1e1b4b"
              opacity="0.92"
            />
            <text
              x={Math.min(tooltip.x - 40, WIDTH - PADDING_RIGHT - 82) + 41}
              y={tooltip.y - 26}
              textAnchor="middle"
              fontSize="10"
              fill="#c4b5fd"
            >
              {formatShortDate(tooltip.date)}
            </text>
            <text
              x={Math.min(tooltip.x - 40, WIDTH - PADDING_RIGHT - 82) + 41}
              y={tooltip.y - 13}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#ffffff"
            >
              ${tooltip.price}/mo
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
