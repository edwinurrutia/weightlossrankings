import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
  getTopicBySlug,
} from "@/lib/learn";
import JsonLd from "@/components/shared/JsonLd";
import EmailCapture from "@/components/shared/EmailCapture";
import TrustBadge from "@/components/shared/TrustBadge";
import CTAButton from "@/components/shared/CTAButton";
import LearnArticleBody from "@/components/blog/LearnArticleBody";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import SourcesPanel from "@/components/research/SourcesPanel";

export async function generateStaticParams() {
  return await getAllArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}): Promise<Metadata> {
  const { topic, slug } = await params;
  const article = await getArticleBySlug(topic, slug);
  if (!article) return { title: "Article Not Found" };

  const url = `/learn/${topic}/${slug}`;
  return {
    title: `${article.title} | WeightLossRankings`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      siteName: "WeightLossRankings",
      publishedTime: article.published_date,
      modifiedTime: article.updated_date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function LearnArticlePage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const article = await getArticleBySlug(topic, slug);
  if (!article) notFound();

  const t = await getTopicBySlug(topic);
  if (!t) notFound();

  const related = await getRelatedArticles(article.related_articles);

  // Split body in half for mid-article email capture
  const blocks = article.body.split("\n\n");
  const mid = Math.floor(blocks.length / 2);
  const firstHalf = blocks.slice(0, mid).join("\n\n");
  const secondHalf = blocks.slice(mid).join("\n\n");

  const url = `https://weightlossrankings.org/learn/${topic}/${slug}`;

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
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: url,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": article.schema_type,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_date,
    dateModified: article.updated_date,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://weightlossrankings.org/about",
    },
    publisher: {
      "@type": "Organization",
      name: "WeightLossRankings",
      logo: {
        "@type": "ImageObject",
        url: "https://weightlossrankings.org/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: [article.target_keyword, ...article.secondary_keywords].join(
      ", "
    ),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 flex flex-col gap-8">
        <nav className="text-sm text-brand-text-secondary">
          <Link href="/" className="hover:text-brand-violet">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/learn" className="hover:text-brand-violet">
            Learn
          </Link>{" "}
          /{" "}
          <Link
            href={`/learn/${t.slug}`}
            className="hover:text-brand-violet"
          >
            {t.short_title}
          </Link>
        </nav>

        <div className="flex flex-wrap gap-2">
          <TrustBadge icon="📅" text={`Published ${formatDate(article.published_date)}`} />
          <TrustBadge icon="🔄" text={`Updated ${formatDate(article.updated_date)}`} />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-text-primary leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-brand-text-secondary">{article.excerpt}</p>

        <div className="flex flex-col gap-2 text-sm border-y border-brand-violet/15 py-4">
          <p className="text-brand-text-primary">
            By <span className="font-semibold">{article.author}</span>
          </p>
          <p className="text-brand-text-secondary text-xs">
            Medical reviewer: pending. We are contracting a board-certified MD
            reviewer for all YMYL content. See our{" "}
            <Link
              href="/methodology"
              className="text-brand-violet underline underline-offset-2"
            >
              methodology
            </Link>{" "}
            for how we research and update guides.
          </p>
        </div>

        {/* Above-the-fold money page CTA */}
        <div className="rounded-2xl border border-brand-violet/20 bg-brand-violet/5 p-5">
          <p className="text-sm text-brand-text-primary mb-3">
            <strong>Looking for a provider?</strong> Skip ahead to our
            comparison of the top GLP-1 telehealth providers in 2026.
          </p>
          <CTAButton
            href={article.primary_money_page.href}
            size="sm"
            variant="primary"
          >
            {article.primary_money_page.label} →
          </CTAButton>
        </div>

        <AffiliateDisclosure />

        {/* First half of article */}
        <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 md:p-8">
          <LearnArticleBody content={firstHalf} />
        </div>

        {/* Mid-article email capture */}
        <EmailCapture
          source={`learn_${article.slug}_mid`}
          heading="Get the Free GLP-1 Starter Guide"
          description="Plus weekly price alerts and new provider reviews. Unsubscribe anytime."
        />

        {/* Second half */}
        <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 md:p-8">
          <LearnArticleBody content={secondHalf} />
        </div>

        {/* Sources & methodology — prefer the registry-backed citation IDs.
            Falls back to the legacy free-form references block when an article
            has not yet been migrated. */}
        {article.registrySourceIds && article.registrySourceIds.length > 0 ? (
          <SourcesPanel
            sourceIds={article.registrySourceIds}
            dataAsOf={article.updated_date}
            defaultOpen
          />
        ) : article.sources.length > 0 && (
          <section
            id="references"
            className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold font-heading text-brand-text-primary mb-1">
              References
            </h2>
            <p className="text-xs text-brand-text-secondary mb-4">
              All clinical claims in this guide are sourced from peer-reviewed
              medical literature, FDA documents, and primary scientific data.
              Last reviewed {formatDate(article.updated_date)}.
            </p>
            <ol className="list-decimal pl-6 flex flex-col gap-3 text-sm">
              {article.sources.map((s, i) => (
                <li key={i} id={`ref-${i + 1}`} className="leading-relaxed">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-violet underline underline-offset-2 hover:text-brand-violet/80"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* End-of-article CTA */}
        <section className="rounded-2xl bg-brand-gradient p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold font-heading mb-2">
            Ready to compare GLP-1 providers?
          </h2>
          <p className="text-white/90 mb-5 text-sm">
            We rank every major telehealth provider on price, medications,
            availability, support, and trust. Updated quarterly. No filler.
          </p>
          <CTAButton
            href={article.primary_money_page.href}
            size="lg"
            variant="white"
          >
            {article.primary_money_page.label} →
          </CTAButton>
        </section>

        {/* Final email capture */}
        <EmailCapture source={`learn_${article.slug}_end`} />

        {/* Related articles */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold font-heading text-brand-text-primary mb-4">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/learn/${r.topic_slugs[0]}/${r.slug}`}
                  className="group rounded-2xl border border-brand-violet/15 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-brand-violet/40"
                >
                  <h3 className="text-base font-semibold font-heading text-brand-text-primary group-hover:text-brand-violet">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs text-brand-text-secondary">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-brand-text-secondary text-center">
          Read our{" "}
          <Link
            href="/methodology"
            className="text-brand-violet underline underline-offset-2"
          >
            methodology
          </Link>
          {" · "}
          <Link
            href="/disclosure"
            className="text-brand-violet underline underline-offset-2"
          >
            affiliate disclosure
          </Link>
          {" · "}
          <Link
            href="/about"
            className="text-brand-violet underline underline-offset-2"
          >
            about us
          </Link>
        </p>
      </article>
    </main>
  );
}
