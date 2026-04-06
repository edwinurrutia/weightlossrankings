import Link from "next/link";
import type { Metadata } from "next";
import { getAllTopics, getArticlesByTopic } from "@/lib/learn";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Learn — GLP-1 Guides, Research, and Patient Education",
  description:
    "In-depth, sourced guides on GLP-1 weight loss medications, costs, side effects, and how to choose a provider. Updated regularly. Written for patients.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn — GLP-1 Guides, Research, and Patient Education",
    description:
      "In-depth, sourced guides on GLP-1 weight loss medications, costs, side effects, and how to choose a provider.",
    url: "/learn",
    type: "website",
    siteName: "Weight Loss Rankings",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn — GLP-1 Guides, Research, and Patient Education",
    description:
      "In-depth, sourced guides on GLP-1 weight loss medications, costs, side effects, and how to choose a provider.",
  },
};

export default async function LearnIndexPage() {
  const topics = await getAllTopics();

  const topicWithCounts = await Promise.all(
    topics.map(async (topic) => {
      const articles = await getArticlesByTopic(topic.slug);
      return { topic, articles };
    })
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://weightlossrankings.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: "https://weightlossrankings.org/learn",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-violet">
            Patient Education
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold font-heading text-brand-text-primary">
            Learn About GLP-1 Weight Loss Medications
          </h1>
          <p className="mt-4 text-lg text-brand-text-secondary max-w-3xl">
            In-depth, sourced guides for patients researching semaglutide,
            tirzepatide, and the rest of the GLP-1 family. Every article cites
            the FDA, clinical trials, or peer-reviewed research. Reviewed by our
            editorial team.
          </p>
          <p className="mt-3 text-sm text-brand-text-secondary max-w-3xl">
            See our{" "}
            <Link href="/methodology" className="text-brand-violet underline">
              editorial methodology
            </Link>{" "}
            and the full{" "}
            <Link href="/sources" className="text-brand-violet underline">
              central citation registry
            </Link>{" "}
            that backs every clinical and regulatory claim on the site.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2">
          {topicWithCounts.map(({ topic, articles }) => (
            <Link
              key={topic.slug}
              href={`/learn/${topic.slug}`}
              className="group rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-violet/40"
            >
              <h2 className="text-xl font-semibold font-heading text-brand-text-primary group-hover:text-brand-violet">
                {topic.title}
              </h2>
              <p className="mt-2 text-sm text-brand-text-secondary">
                {topic.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-violet">
                {articles.length} article{articles.length === 1 ? "" : "s"} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
