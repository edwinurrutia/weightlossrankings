/**
 * SVG body diagram showing the three FDA-approved subcutaneous
 * injection sites for GLP-1 receptor agonists (semaglutide,
 * tirzepatide, liraglutide). Used in the /research/where-to-inject
 * patient guide.
 *
 * Sites shown:
 *   1. Abdomen — most-recommended site, anywhere except a 2-inch
 *      radius around the navel
 *   2. Front of thigh — middle, mid-front (avoiding the inner thigh)
 *   3. Back of upper arm — only with assistance, hard to self-inject
 *
 * Pure inline SVG, brand-violet palette, no external graphics or
 * dependencies. Stylized human silhouette (front view) with the
 * three sites colored at varying opacity and labeled with
 * connecting lines.
 */

export default function InjectionSitesDiagram() {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-10">
      <svg
        viewBox="0 0 600 520"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram of the three FDA-approved injection sites for GLP-1 medications: abdomen, front of thigh, and back of upper arm"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Body silhouette (stylized front view) ── */}
        <g
          fill="#f1f5f9"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeLinejoin="round"
        >
          {/* Head */}
          <ellipse cx="300" cy="60" rx="32" ry="38" />
          {/* Neck */}
          <rect x="288" y="92" width="24" height="18" rx="3" />
          {/* Torso */}
          <path
            d="M 230 110
               L 370 110
               L 380 200
               L 372 320
               L 228 320
               L 220 200
               Z"
          />
          {/* Left arm (viewer's left = subject's right) */}
          <path
            d="M 230 115
               L 195 130
               L 175 220
               L 168 310
               L 178 320
               L 195 235
               L 220 145
               Z"
          />
          {/* Right arm */}
          <path
            d="M 370 115
               L 405 130
               L 425 220
               L 432 310
               L 422 320
               L 405 235
               L 380 145
               Z"
          />
          {/* Left leg */}
          <path
            d="M 230 320
               L 245 480
               L 285 480
               L 290 320
               Z"
          />
          {/* Right leg */}
          <path
            d="M 310 320
               L 315 480
               L 355 480
               L 370 320
               Z"
          />
        </g>

        {/* ── Injection zone 1: Abdomen ── */}
        <ellipse
          cx="300"
          cy="245"
          rx="62"
          ry="42"
          fill="#8b5cf6"
          opacity={0.35}
        />
        {/* Forbidden zone around navel */}
        <circle
          cx="300"
          cy="245"
          r="14"
          fill="#ffffff"
          stroke="#dc2626"
          strokeWidth={2}
          strokeDasharray="3 2"
        />
        <text
          x="300"
          y="248"
          textAnchor="middle"
          fontSize="10"
          fill="#dc2626"
          fontWeight={700}
        >
          ⊘
        </text>

        {/* ── Injection zone 2: Front of thigh (left leg) ── */}
        <ellipse
          cx="262"
          cy="385"
          rx="20"
          ry="55"
          fill="#8b5cf6"
          opacity={0.35}
        />
        {/* Right leg too */}
        <ellipse
          cx="338"
          cy="385"
          rx="20"
          ry="55"
          fill="#8b5cf6"
          opacity={0.35}
        />

        {/* ── Injection zone 3: Back of upper arm (shown on the figure's right
            arm — viewer's right side — to indicate "back of arm" via the
            outer side) ── */}
        <ellipse
          cx="400"
          cy="195"
          rx="14"
          ry="38"
          fill="#8b5cf6"
          opacity={0.35}
        />
        <ellipse
          cx="200"
          cy="195"
          rx="14"
          ry="38"
          fill="#8b5cf6"
          opacity={0.35}
        />

        {/* ── Labels with connector lines ── */}
        {/* Abdomen label */}
        <line
          x1="365"
          y1="245"
          x2="465"
          y2="245"
          stroke="#8b5cf6"
          strokeWidth={1.5}
        />
        <circle cx="465" cy="245" r="3" fill="#8b5cf6" />
        <text
          x="475"
          y="240"
          fontSize="14"
          fontWeight={700}
          fill="#1e1b4b"
        >
          Abdomen
        </text>
        <text
          x="475"
          y="258"
          fontSize="11"
          fill="#475569"
        >
          most common · easiest
        </text>
        <text
          x="475"
          y="272"
          fontSize="11"
          fill="#475569"
        >
          to self-inject
        </text>

        {/* Thigh label (left) */}
        <line
          x1="240"
          y1="385"
          x2="115"
          y2="385"
          stroke="#8b5cf6"
          strokeWidth={1.5}
        />
        <circle cx="115" cy="385" r="3" fill="#8b5cf6" />
        <text
          x="20"
          y="380"
          fontSize="14"
          fontWeight={700}
          fill="#1e1b4b"
        >
          Front of thigh
        </text>
        <text
          x="20"
          y="398"
          fontSize="11"
          fill="#475569"
        >
          mid-front, avoid
        </text>
        <text
          x="20"
          y="412"
          fontSize="11"
          fill="#475569"
        >
          inner thigh
        </text>

        {/* Upper arm label (right) */}
        <line
          x1="414"
          y1="195"
          x2="500"
          y2="160"
          stroke="#8b5cf6"
          strokeWidth={1.5}
        />
        <circle cx="500" cy="160" r="3" fill="#8b5cf6" />
        <text
          x="510"
          y="155"
          fontSize="14"
          fontWeight={700}
          fill="#1e1b4b"
        >
          Upper arm
        </text>
        <text
          x="510"
          y="173"
          fontSize="11"
          fill="#475569"
        >
          (back of arm) ·
        </text>
        <text
          x="510"
          y="187"
          fontSize="11"
          fill="#475569"
        >
          needs assistance
        </text>

        {/* No-go label */}
        <line
          x1="300"
          y1="222"
          x2="300"
          y2="180"
          stroke="#dc2626"
          strokeWidth={1.5}
        />
        <text
          x="300"
          y="172"
          textAnchor="middle"
          fontSize="10"
          fontWeight={700}
          fill="#dc2626"
        >
          AVOID 2&quot; AROUND NAVEL
        </text>
      </svg>
      <figcaption className="mt-4 text-center text-sm text-brand-text-secondary">
        FDA-approved subcutaneous injection sites for GLP-1 medications
        (Wegovy, Ozempic, Zepbound, Mounjaro). Rotate sites to reduce
        lipohypertrophy and bruising — see the article body for the
        recommended rotation pattern.
      </figcaption>
    </figure>
  );
}
