import { PortableText } from "@portabletext/react";

interface BlogContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-brand-violet">
      <PortableText value={content} />
    </div>
  );
}
