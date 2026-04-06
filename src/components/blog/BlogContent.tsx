interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-brand-violet">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
