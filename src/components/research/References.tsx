export interface Citation {
  /** Author list, e.g. "Wilding JPH, et al." */
  authors: string;
  /** Article title. */
  title: string;
  /** Journal/source, e.g. "N Engl J Med" or "FDA Compounding Quality Center". */
  source: string;
  /** Year of publication. */
  year: number;
  /** PubMed ID, when applicable. Used to build the canonical pubmed URL. */
  pmid?: string;
  /** DOI, when applicable. */
  doi?: string;
  /** Direct URL for non-PubMed sources (FDA, NIH guidance, etc.). */
  url?: string;
}

interface ReferencesProps {
  items: Citation[];
}

function citationUrl(c: Citation): string | null {
  if (c.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`;
  if (c.doi) return `https://doi.org/${c.doi}`;
  if (c.url) return c.url;
  return null;
}

/**
 * Numbered references block at the bottom of a research article.
 * Each citation gets an anchor (#ref-N) so inline footnote links can
 * jump to it. Renders nothing if the items list is empty.
 */
export default function References({ items }: ReferencesProps) {
  if (!items || items.length === 0) return null;
  return (
    <section
      aria-label="References"
      className="mt-16 pt-10 border-t border-brand-violet/15 not-prose"
    >
      <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-6">
        References
      </h2>
      <ol className="flex flex-col gap-3 list-none">
        {items.map((c, i) => {
          const n = i + 1;
          const url = citationUrl(c);
          return (
            <li
              key={`${c.title}-${n}`}
              id={`ref-${n}`}
              className="text-sm text-brand-text-secondary leading-relaxed"
            >
              <span className="font-mono font-bold text-brand-text-primary mr-2">
                {n}.
              </span>
              {c.authors} {c.title}{" "}
              <em className="not-italic text-brand-text-primary">
                {c.source}
              </em>
              . {c.year}.
              {c.pmid && (
                <>
                  {" "}
                  PMID:{" "}
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-violet hover:underline"
                  >
                    {c.pmid}
                  </a>
                  .
                </>
              )}
              {!c.pmid && url && (
                <>
                  {" "}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-violet hover:underline break-all"
                  >
                    {url}
                  </a>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/**
 * Inline footnote marker. Use as <Cite n={3} /> in article body.
 */
export function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5">
      <a
        href={`#ref-${n}`}
        className="text-brand-violet hover:underline font-semibold"
      >
        [{n}]
      </a>
    </sup>
  );
}
