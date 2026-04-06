import Link from "next/link";
import React from "react";

interface LearnArticleBodyProps {
  content: string;
}

// Lightweight markdown renderer scoped to the syntax our /learn articles use:
// - H2 (## ), H3 (### )
// - Paragraphs separated by blank lines
// - Unordered lists (- ) and numbered lists (1. )
// - GitHub-style tables (|...|)
// - Inline: **bold**, [link](href), `code`
// We deliberately avoid pulling in a full markdown library to keep the bundle lean.

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] };

function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    // Table: header line | --- separator line | rows
    if (line.startsWith("|") && i + 1 < lines.length && lines[i + 1].startsWith("|")) {
      const header = line
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      // skip the separator line
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i]
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, "").trim());
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i]) &&
      !lines[i].startsWith("|")
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: "p", text: paragraphLines.join(" ") });
    }
  }

  return blocks;
}

// Inline parser: **bold**, [text](href), `code`
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Combined regex for the three inline patterns
  const pattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let counter = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${counter++}`;
    if (match[1]) {
      // **bold**
      out.push(
        <strong key={key} className="font-semibold text-brand-text-primary">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // [text](href)
      const href = match[5];
      const linkText = match[4];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        out.push(
          <Link
            key={key}
            href={href}
            className="text-brand-violet underline underline-offset-2 hover:text-brand-violet/80"
          >
            {linkText}
          </Link>
        );
      } else {
        out.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-violet underline underline-offset-2 hover:text-brand-violet/80"
          >
            {linkText}
          </a>
        );
      }
    } else if (match[6]) {
      // `code`
      out.push(
        <code
          key={key}
          className="rounded bg-brand-violet/10 px-1.5 py-0.5 font-mono text-sm"
        >
          {match[7]}
        </code>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex));
  }
  return out;
}

export default function LearnArticleBody({ content }: LearnArticleBodyProps) {
  const blocks = parseBlocks(content);

  return (
    <div className="flex flex-col gap-5 text-brand-text-primary leading-relaxed">
      {blocks.map((block, i) => {
        const key = `b-${i}`;
        if (block.type === "h2") {
          return (
            <h2
              key={key}
              className="mt-6 text-2xl sm:text-3xl font-bold font-heading text-brand-text-primary"
            >
              {renderInline(block.text, key)}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={key}
              className="mt-4 text-xl sm:text-2xl font-semibold font-heading text-brand-text-primary"
            >
              {renderInline(block.text, key)}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p key={key} className="text-base sm:text-[17px] leading-7">
              {renderInline(block.text, key)}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={key} className="list-disc pl-6 flex flex-col gap-2">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`} className="text-base leading-7">
                  {renderInline(item, `${key}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={key} className="list-decimal pl-6 flex flex-col gap-2">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`} className="text-base leading-7">
                  {renderInline(item, `${key}-${j}`)}
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "table") {
          return (
            <div
              key={key}
              className="overflow-x-auto rounded-xl border border-brand-violet/15"
            >
              <table className="w-full text-sm">
                <thead className="bg-brand-violet/5">
                  <tr>
                    {block.header.map((h, j) => (
                      <th
                        key={`${key}-h-${j}`}
                        className="px-4 py-3 text-left font-semibold text-brand-text-primary"
                      >
                        {renderInline(h, `${key}-h-${j}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr
                      key={`${key}-r-${r}`}
                      className="border-t border-brand-violet/10"
                    >
                      {row.map((cell, c) => (
                        <td
                          key={`${key}-r-${r}-c-${c}`}
                          className="px-4 py-3 text-brand-text-primary align-top"
                        >
                          {renderInline(cell, `${key}-r-${r}-c-${c}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
