import Link from "next/link";
import providersData from "@/data/providers.json";
import { US_STATES } from "@/lib/states";

/**
 * Pure-SVG US state coverage map.
 *
 * Uses a squarified grid layout (11 columns × 8 rows) instead of a true
 * geographic SVG so the bundle stays tiny and the component renders
 * cleanly on mobile. Each state is a clickable rounded rectangle filled
 * with brand-violet at one of 5 opacity steps based on provider count.
 *
 * Server component: provider counts are computed at module load time
 * from providers.json, so there is zero client JS.
 */

// ── Provider count per state, computed at module load ──
type ProviderRecord = { states_available?: string[] };
const providers = providersData as ProviderRecord[];

const STATE_COUNTS: Record<string, number> = {};
for (const state of US_STATES) {
  STATE_COUNTS[state.code] = 0;
}
for (const provider of providers) {
  const states = provider.states_available ?? [];
  for (const code of states) {
    if (code in STATE_COUNTS) {
      STATE_COUNTS[code] += 1;
    }
  }
}

// ── Opacity step bucketing ──
// All 50 states have providers in this dataset, but the spread between
// the lowest and highest covered state can be narrow. We min-max the
// observed range and split into 5 equal buckets so the darkest fill
// always represents the most-covered state(s).
const counts = Object.values(STATE_COUNTS);
const MIN_COUNT = Math.min(...counts);
const MAX_COUNT = Math.max(...counts);
const RANGE = Math.max(1, MAX_COUNT - MIN_COUNT);

// Opacity steps. Floor of 10% so even the lowest-coverage state is visible.
const OPACITY_STEPS = [0.1, 0.25, 0.5, 0.75, 1.0];

function opacityForCount(count: number): number {
  if (count <= 0) return 0.04;
  const norm = (count - MIN_COUNT) / RANGE; // 0..1
  const idx = Math.min(
    OPACITY_STEPS.length - 1,
    Math.floor(norm * OPACITY_STEPS.length),
  );
  return OPACITY_STEPS[idx];
}

// ── Squarified grid layout ──
// Standard 11 col × 8 row US state grid. (col, row) where (0,0) is top-left.
// This is the canonical "tilegram" layout used by NPR / Washington Post.
type Cell = { col: number; row: number };
const GRID: Record<string, Cell> = {
  AK: { col: 0, row: 0 },
  ME: { col: 10, row: 0 },
  VT: { col: 9, row: 1 },
  NH: { col: 10, row: 1 },
  WA: { col: 1, row: 1 },
  ID: { col: 2, row: 1 },
  MT: { col: 3, row: 1 },
  ND: { col: 4, row: 1 },
  MN: { col: 5, row: 1 },
  WI: { col: 6, row: 1 },
  MI: { col: 7, row: 1 },
  NY: { col: 8, row: 2 },
  MA: { col: 9, row: 2 },
  RI: { col: 10, row: 2 },
  OR: { col: 1, row: 2 },
  NV: { col: 2, row: 2 },
  WY: { col: 3, row: 2 },
  SD: { col: 4, row: 2 },
  IA: { col: 5, row: 2 },
  IL: { col: 6, row: 2 },
  IN: { col: 7, row: 2 },
  OH: { col: 7, row: 3 },
  PA: { col: 8, row: 3 },
  NJ: { col: 9, row: 3 },
  CT: { col: 10, row: 3 },
  CA: { col: 1, row: 3 },
  UT: { col: 2, row: 3 },
  CO: { col: 3, row: 3 },
  NE: { col: 4, row: 3 },
  MO: { col: 5, row: 3 },
  KY: { col: 6, row: 3 },
  WV: { col: 8, row: 4 },
  VA: { col: 9, row: 4 },
  MD: { col: 10, row: 4 },
  DE: { col: 10, row: 5 },
  AZ: { col: 2, row: 4 },
  NM: { col: 3, row: 4 },
  KS: { col: 4, row: 4 },
  AR: { col: 5, row: 4 },
  TN: { col: 6, row: 4 },
  NC: { col: 7, row: 5 },
  SC: { col: 8, row: 5 },
  OK: { col: 4, row: 5 },
  LA: { col: 5, row: 5 },
  MS: { col: 6, row: 5 },
  AL: { col: 7, row: 6 },
  GA: { col: 8, row: 6 },
  TX: { col: 4, row: 6 },
  FL: { col: 9, row: 6 },
  HI: { col: 0, row: 7 },
};

const COLS = 11;
const ROWS = 8;
const CELL = 56; // svg units per cell
const GAP = 6;
const RECT = CELL - GAP;
const RADIUS = 8;
const PAD = 8;
const VIEW_W = COLS * CELL + PAD * 2;
const VIEW_H = ROWS * CELL + PAD * 2;

export default function StateCoverageMap() {
  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-2">
            Coverage Map
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
            GLP-1 telehealth providers in every state
          </h2>
          <p className="text-sm text-brand-text-secondary mt-2 max-w-2xl">
            Click any state to see the providers that ship and prescribe
            there. Darker squares mean more provider options available.
          </p>
        </div>
        <Legend />
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full max-w-full h-auto"
        role="img"
        aria-label="US state coverage map for GLP-1 telehealth providers"
      >
        {US_STATES.map((state) => {
          const cell = GRID[state.code];
          if (!cell) return null;
          const count = STATE_COUNTS[state.code] ?? 0;
          const x = PAD + cell.col * CELL;
          const y = PAD + cell.row * CELL;
          const opacity = opacityForCount(count);
          // Pick a label color that stays legible against the violet fill.
          const textIsLight = opacity >= 0.5;
          return (
            <Link
              key={state.code}
              href={`/states/${state.slug}`}
              aria-label={`${state.name}: ${count} providers`}
            >
              <g className="group cursor-pointer">
                <rect
                  x={x}
                  y={y}
                  width={RECT}
                  height={RECT}
                  rx={RADIUS}
                  ry={RADIUS}
                  fill="#8b5cf6"
                  fillOpacity={opacity}
                  stroke="#8b5cf6"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                  className="transition-all duration-150 group-hover:stroke-[2] group-hover:[stroke-opacity:1]"
                />
                <text
                  x={x + RECT / 2}
                  y={y + RECT / 2 + 4}
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight={700}
                  fill={textIsLight ? "#ffffff" : "#1e1b4b"}
                  className="pointer-events-none select-none"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {state.code}
                </text>
                <title>{`${state.name}: ${count} providers`}</title>
              </g>
            </Link>
          );
        })}
      </svg>

      <p className="text-xs text-brand-text-secondary mt-4 text-center">
        Coverage data compiled from {providers.length} GLP-1 telehealth
        providers tracked by Weight Loss Rankings.
      </p>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-brand-text-secondary">Fewer</span>
      <div className="flex items-center gap-1">
        {OPACITY_STEPS.map((op) => (
          <span
            key={op}
            className="inline-block h-3 w-4 rounded-sm border border-brand-violet/30"
            style={{ backgroundColor: `rgba(139, 92, 246, ${op})` }}
            aria-hidden
          />
        ))}
      </div>
      <span className="text-xs text-brand-text-secondary">More</span>
    </div>
  );
}
