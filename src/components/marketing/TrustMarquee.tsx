/**
 * Horizontally scrolling trust strip with icons.
 * Inspired by the Medvi homepage marquee.
 *
 * Pure CSS animation (no JS) — uses the `wlr-marquee` keyframe defined in
 * src/styles/globals.css. Two copies of the items are rendered back-to-back
 * to create the seamless infinite loop.
 *
 * The marquee respects `prefers-reduced-motion` — for users who opt out, the
 * items render as a static centered row.
 */

interface TrustItem {
  icon: React.ReactNode;
  label: string;
}

interface TrustMarqueeProps {
  /** Display label for the providers-tracked item, e.g. "85+". Pass the
   *  pre-formatted string from the caller so it stays in sync with the
   *  rest of the page. */
  providerCountLabel?: string;
}

export default function TrustMarquee({
  providerCountLabel = "80+",
}: TrustMarqueeProps = {}) {
  const ITEMS: TrustItem[] = [
    {
      icon: <IconClipboard />,
      label: "Independent Editorial",
    },
    {
      icon: <IconUsers />,
      label: `${providerCountLabel} Providers Tracked`,
    },
    {
      icon: <IconCalendar />,
      label: "Updated Daily",
    },
    {
      icon: <IconShield />,
      label: "Reader-Supported",
    },
    {
      icon: <IconBook />,
      label: "Evidence-Based",
    },
    {
      icon: <IconDollar />,
      label: "Transparent Pricing",
    },
    {
      icon: <IconCheck />,
      label: "Verified Reviews",
    },
  ];

  return (
    <div className="border-y border-brand-violet/10 bg-white overflow-hidden">
      <div className="relative py-5">
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"
        />

        <div className="wlr-marquee-track flex items-center gap-12 whitespace-nowrap motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-2">
          {/* Render the items twice for the seamless loop */}
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] text-brand-text-secondary font-semibold"
            >
              <span className="text-brand-violet flex-shrink-0">
                {item.icon}
              </span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Icons (inline SVG, 18×18, currentColor) ───

function IconClipboard() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
