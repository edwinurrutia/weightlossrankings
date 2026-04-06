import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllTopicSlugs,
  getArticlesByTopic,
  getTopicBySlug,
} from "@/lib/learn";
import JsonLd from "@/components/shared/JsonLd";
import EmailCapture from "@/components/shared/EmailCapture";

export async function generateStaticParams() {
  const slugs = await getAllTopicSlugs();
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = await getTopicBySlug(topic);
  if (!t) return { title: "Topic Not Found" };

  return {
    title: `${t.title} | WeightLossRankings`,
    description: t.description,
    alternates: { canonical: `/learn/${t.slug}` },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/learn/${t.slug}`,
      type: "website",
      siteName: "WeightLossRankings",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function TopicPillarPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = await getTopicBySlug(topic);
  if (!t) notFound();

  const articles = await getArticlesByTopic(topic);

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
      {
        "@type": "ListItem",
        position: 3,
        name: t.short_title,
        item: `https://weightlossrankings.org/learn/${t.slug}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    itemListElement: articles.map((a, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://weightlossrankings.org/learn/${t.slug}/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col gap-10">
        <nav className="text-sm text-brand-text-secondary">
          <Link href="/" className="hover:text-brand-violet">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/learn" className="hover:text-brand-violet">
            Learn
          </Link>{" "}
          / <span className="text-brand-text-primary">{t.short_title}</span>
        </nav>

        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-violet">
            Pillar Guide
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold font-heading text-brand-text-primary">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-brand-text-secondary">
            {t.description}
          </p>
        </header>

        {/* Money-page CTAs */}
        {t.related_money_pages.length > 0 && (
          <section className="rounded-2xl bg-white border border-brand-violet/15 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-brand-text-primary mb-3">
              Start here
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {t.related_money_pages.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="block rounded-lg border border-brand-violet/20 bg-brand-violet/5 px-4 py-3 text-sm font-medium text-brand-violet hover:bg-brand-violet/10"
                  >
                    {m.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Article cluster list */}
        <section>
          <h2 className="text-2xl font-semibold font-heading text-brand-text-primary mb-4">
            Guides in this pillar
          </h2>
          <div className="flex flex-col gap-4">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/learn/${t.slug}/${a.slug}`}
                className="group rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-violet/40"
              >
                <h3 className="text-lg font-semibold font-heading text-brand-text-primary group-hover:text-brand-violet">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-brand-text-secondary">
                  {a.excerpt}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wider text-brand-text-secondary">
                  Updated {new Date(a.updated_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <EmailCapture source={`learn_topic_${t.slug}`} />
      </div>
    </main>
  );
}
