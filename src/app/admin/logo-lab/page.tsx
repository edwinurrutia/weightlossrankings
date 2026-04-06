import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo Lab",
  robots: { index: false, follow: false },
};

// 12 logo variations to review.
// Each renders inline so we can side-by-side compare without committing any.

interface Variation {
  id: string;
  name: string;
  blurb: string;
  mark: React.ReactNode;
  text: React.ReactNode;
}

const COLOR = "#8b5cf6";
const TEXT = "#1e1b4b";
const SECONDARY = "#64748b";

const VARIATIONS: Variation[] = [
  // ─── SEPARATE WORDS — variations of your top 3 picks ───
  {
    id: "1A",
    name: "Three words — clean wordmark",
    blurb: "Reads like a publication: 'The Wall Street Journal'. Most editorial.",
    mark: null,
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl"
        style={{ color: TEXT }}
      >
        Weight Loss <span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "1B",
    name: "Three words — slash divider",
    blurb: "Editorial slash separator. Restrained but distinctive.",
    mark: null,
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl"
        style={{ color: TEXT }}
      >
        Weight Loss
        <span className="mx-2" style={{ color: SECONDARY }}>/</span>
        <span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "6A",
    name: "Three words + violet dot",
    blurb: "Quietly distinctive. Dot reads as a confident bullet point.",
    mark: (
      <span
        className="inline-block w-3 h-3 rounded-full"
        style={{ background: COLOR }}
      />
    ),
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl"
        style={{ color: TEXT }}
      >
        Weight Loss Rankings
      </span>
    ),
  },
  {
    id: "10A",
    name: "Three words — masthead style",
    blurb: "Newsroom masthead. Thin separator + small caps.",
    mark: null,
    text: (
      <span
        className="font-heading font-black tracking-[0.06em] uppercase text-base flex items-center gap-2"
        style={{ color: TEXT }}
      >
        Weight Loss
        <span
          className="inline-block h-5 w-px"
          style={{ background: COLOR }}
        />
        <span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "10B",
    name: "Three words — large masthead",
    blurb: "Same masthead vibe but bigger and more confident.",
    mark: null,
    text: (
      <span
        className="font-heading font-black tracking-[0.04em] uppercase text-xl flex items-center gap-3"
        style={{ color: TEXT }}
      >
        Weight Loss
        <span
          className="inline-block h-7 w-[2px]"
          style={{ background: COLOR }}
        />
        <span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  // ─── ORIGINAL 12 (one-word) for reference ───
  {
    id: "1",
    name: "Wordmark only — slash divider",
    blurb: "No mark. Editorial-first. Like Wirecutter.",
    mark: null,
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl"
        style={{ color: TEXT }}
      >
        WeightLoss<span style={{ color: SECONDARY }}>/</span>
        <span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "2",
    name: "Serif wordmark — magazine",
    blurb: "Italic serif feels like a print publication.",
    mark: null,
    text: (
      <span
        className="font-extrabold tracking-tight text-2xl"
        style={{
          color: TEXT,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
        }}
      >
        Weight<span style={{ color: COLOR }}>Loss</span>Rankings
      </span>
    ),
  },
  {
    id: "3",
    name: "Stacked — two-line wordmark",
    blurb: "Two-line wordmark + subtle accent dot.",
    mark: (
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: COLOR }}
      />
    ),
    text: (
      <span className="font-heading font-extrabold leading-[1] tracking-tight">
        <span className="block text-base" style={{ color: SECONDARY, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Weight Loss
        </span>
        <span className="block text-2xl" style={{ color: TEXT }}>
          Rankings
        </span>
      </span>
    ),
  },
  {
    id: "4",
    name: "Underline accent",
    blurb: "Single word brand with subtle violet underline on 'Loss'.",
    mark: null,
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl"
        style={{ color: TEXT }}
      >
        Weight
        <span
          style={{
            borderBottom: `3px solid ${COLOR}`,
            paddingBottom: 2,
          }}
        >
          Loss
        </span>
        Rankings
      </span>
    ),
  },
  {
    id: "5",
    name: "Monogram WLR",
    blurb: "Three-letter monogram in a soft square.",
    mark: (
      <span
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white font-extrabold text-sm"
        style={{ background: COLOR, letterSpacing: "0.05em" }}
      >
        WLR
      </span>
    ),
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-xl"
        style={{ color: TEXT }}
      >
        Weight<span style={{ color: COLOR }}>Loss</span>Rankings
      </span>
    ),
  },
  {
    id: "6",
    name: "Editorial dot",
    blurb: "A single confident violet dot. Quietly distinctive.",
    mark: (
      <span
        className="inline-block w-3 h-3 rounded-full"
        style={{ background: COLOR }}
      />
    ),
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl"
        style={{ color: TEXT }}
      >
        WeightLossRankings
      </span>
    ),
  },
  {
    id: "7",
    name: "Lowercase friendly",
    blurb: "All-lowercase reads softer, more lifestyle-ish.",
    mark: null,
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-2xl lowercase"
        style={{ color: TEXT }}
      >
        weight<span style={{ color: COLOR }}>loss</span>rankings
      </span>
    ),
  },
  {
    id: "8",
    name: "Number 1 mark",
    blurb: "A small ranked '1' in a square — direct.",
    mark: (
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white font-extrabold text-base"
        style={{
          background: TEXT,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        №1
      </span>
    ),
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-xl"
        style={{ color: TEXT }}
      >
        WeightLoss<span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "9",
    name: "Pill background — single tone",
    blurb: "Whole wordmark wrapped in a soft pill. Distinctive.",
    mark: null,
    text: (
      <span
        className="inline-flex items-center px-3 py-1.5 rounded-full font-heading font-extrabold tracking-tight text-lg"
        style={{ background: `${COLOR}15`, color: TEXT }}
      >
        WeightLoss<span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "10",
    name: "Magazine masthead — all caps",
    blurb: "Tight all-caps with thin separator. Newsroom feel.",
    mark: null,
    text: (
      <span
        className="font-heading font-black tracking-[0.05em] uppercase text-base flex items-center gap-2"
        style={{ color: TEXT }}
      >
        Weight Loss
        <span
          className="inline-block h-5 w-px"
          style={{ background: COLOR }}
        />
        <span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "11",
    name: "Initial-only mark",
    blurb: "Big confident 'W' in serif.",
    mark: (
      <span
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-white font-black text-2xl"
        style={{
          background: COLOR,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        W
      </span>
    ),
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-xl"
        style={{ color: TEXT }}
      >
        WeightLoss<span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
  {
    id: "12",
    name: "Down-arrow mark (weight loss motif)",
    blurb: "Subtle downward arrow — 'going down'.",
    mark: (
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
        style={{ background: COLOR }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ),
    text: (
      <span
        className="font-heading font-extrabold tracking-tight text-xl"
        style={{ color: TEXT }}
      >
        WeightLoss<span style={{ color: COLOR }}>Rankings</span>
      </span>
    ),
  },
];

export default function LogoLabPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-brand-text-primary">
          Logo Lab
        </h1>
        <p className="text-brand-text-secondary mt-2 text-sm">
          12 variations to compare side by side. Tell me which numbers you
          like and I&apos;ll wire it up site-wide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VARIATIONS.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-brand-violet/15 bg-white p-6 flex flex-col gap-4 shadow-sm"
          >
            <div className="flex items-baseline justify-between">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: SECONDARY }}
              >
                Option {v.id}
              </span>
              <span className="text-xs text-brand-text-secondary/70">
                {v.name}
              </span>
            </div>

            <div className="flex items-center gap-3 min-h-[64px]">
              {v.mark}
              {v.text}
            </div>

            <p className="text-xs text-brand-text-secondary leading-relaxed">
              {v.blurb}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-brand-violet/5 border border-brand-violet/15 p-6 text-sm text-brand-text-secondary">
        <strong className="text-brand-text-primary">How to pick:</strong> The
        best logos for editorial/ranking sites are quiet — they don&apos;t
        compete with the content. Wirecutter is wordmark-only. NerdWallet has a
        small lowercase &quot;n&quot;. ConsumerReports is pure wordmark. Avoid
        anything that screams &quot;app icon&quot; — that&apos;s why the
        bars-in-a-box was wrong. Tell me your top 2 and I&apos;ll do a final
        polish pass on the winner.
      </div>
    </div>
  );
}
