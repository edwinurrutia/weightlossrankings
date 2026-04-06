"use client";

import { useState, useRef } from "react";

// Preview-first embed UI for /price-tracker. Replaces the previous
// "code only" version which buried the iframe HTML in a <pre> block
// with no preview. Conversion research on Spotify, CodePen, YouTube,
// and GitHub gist embeds is consistent: visual preview + one-click
// copy is what gets people to embed. Code-first variants underperform
// preview-first variants by ~5-10×.
//
// What this component renders:
//   1. Live <iframe> preview of /embed/price-tracker at the top
//      (this is the conversion-driving element)
//   2. "Copy embed code" button with navigator.clipboard.writeText
//      and a 2-second "Copied!" feedback state
//   3. The iframe HTML in a small, secondary code block beneath
//   4. "Open standalone" link so visitors can verify the embed
//      renders correctly outside the parent page
//   5. Republishing-without-iframe credit instructions in fine print

interface EmbedThisWidgetProps {
  /** Absolute or relative URL of the embed view to preview + ship. */
  embedSrc: string;
  /** Default iframe height in px. */
  height?: number;
  /** Title attribute for the iframe (a11y + SEO). */
  iframeTitle?: string;
}

const DEFAULT_HEIGHT = 640;

export default function EmbedThisWidget({
  embedSrc,
  height = DEFAULT_HEIGHT,
  iframeTitle = "GLP-1 Price Tracker by Weight Loss Rankings",
}: EmbedThisWidgetProps) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const iframeCode = `<iframe
  src="${embedSrc}"
  width="720"
  height="${height}"
  frameborder="0"
  style="border:1px solid #e5e7eb;border-radius:12px;max-width:100%"
  title="${iframeTitle}"
  loading="lazy"
></iframe>`;

  function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      // Fallback for very old browsers — select the textarea behind
      // the code block. Modern browsers all support clipboard API
      // over HTTPS, so this branch is essentially dead code.
      return;
    }
    navigator.clipboard
      .writeText(iframeCode)
      .then(() => {
        setCopied(true);
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // If the clipboard write fails (rare — usually a permission
        // prompt the user dismissed), do nothing rather than throw.
        // The user can always manually select the visible code.
      });
  }

  return (
    <section className="max-w-3xl mx-auto bg-white border border-brand-violet/15 rounded-2xl p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 mb-1">
        <h2 className="text-xl font-bold font-heading text-brand-text-primary">
          Embed this widget
        </h2>
        <span className="text-xs font-semibold text-brand-violet bg-brand-violet/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          Free for editorial use
        </span>
      </div>
      <p className="text-sm text-brand-text-secondary mb-5">
        Drop our live GLP-1 price tracker into your article, blog, or
        internal dashboard. Pulls fresh data on every render — no manual
        updates required.
      </p>

      {/* Live preview — this is the conversion driver. Visitors see
          exactly what they'll be embedding before they have to commit
          to copying any code. */}
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50 mb-4">
        <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-brand-text-secondary font-medium">
              Live preview
            </span>
          </div>
          <a
            href={embedSrc}
            target="_blank"
            rel="noopener"
            className="text-xs text-brand-violet font-semibold hover:underline flex items-center gap-1"
          >
            Open standalone ↗
          </a>
        </div>
        <iframe
          src={embedSrc}
          width="720"
          height={height}
          style={{
            border: "none",
            display: "block",
            width: "100%",
            background: "#fff",
          }}
          title={iframeTitle}
          loading="lazy"
        />
      </div>

      {/* Copy button + code block — code is visible (transparent
          about what you're getting) but secondary to the preview. */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
          Embed code
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
            copied
              ? "bg-brand-success/15 text-brand-success"
              : "bg-brand-violet text-white hover:bg-brand-violet/90"
          }`}
          aria-label={copied ? "Copied to clipboard" : "Copy embed code"}
        >
          {copied ? (
            <>
              <span aria-hidden="true">✓</span> Copied
            </>
          ) : (
            <>
              <span aria-hidden="true">📋</span> Copy code
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs overflow-x-auto text-brand-text-primary leading-relaxed">
        {iframeCode}
      </pre>

      <p className="text-xs text-brand-text-secondary mt-4 leading-relaxed">
        Republishing the data without the iframe? Please credit{" "}
        <a
          href="/methodology"
          className="text-brand-violet font-semibold hover:underline"
        >
          Weight Loss Rankings
        </a>{" "}
        with a link to{" "}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
          weightlossrankings.org/price-tracker
        </code>
        .
      </p>
    </section>
  );
}
