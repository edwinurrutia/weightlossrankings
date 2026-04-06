import topicsData from "@/data/learn-topics.json";
import articlesData from "@/data/learn-articles.json";

export interface LearnRelatedMoneyPage {
  label: string;
  href: string;
}

export interface LearnTopic {
  slug: string;
  title: string;
  short_title: string;
  description: string;
  target_keyword: string;
  related_money_pages: LearnRelatedMoneyPage[];
}

export interface LearnSource {
  label: string;
  url: string;
}

export interface LearnArticle {
  slug: string;
  topic_slugs: string[];
  title: string;
  excerpt: string;
  target_keyword: string;
  secondary_keywords: string[];
  schema_type: "Article" | "MedicalWebPage";
  published_date: string;
  updated_date: string;
  author: string;
  primary_money_page: LearnRelatedMoneyPage;
  related_articles: string[];
  sources: LearnSource[];
  body: string;
}

const topics = topicsData as LearnTopic[];
const articles = articlesData as LearnArticle[];

export async function getAllTopics(): Promise<LearnTopic[]> {
  return [...topics].sort((a, b) => a.title.localeCompare(b.title));
}

export async function getTopicBySlug(slug: string): Promise<LearnTopic | null> {
  return topics.find((t) => t.slug === slug) ?? null;
}

export async function getAllTopicSlugs(): Promise<{ topic: string }[]> {
  return topics.map((t) => ({ topic: t.slug }));
}

export async function getArticlesByTopic(
  topicSlug: string
): Promise<LearnArticle[]> {
  return articles
    .filter((a) => a.topic_slugs.includes(topicSlug))
    .sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    );
}

export async function getArticleBySlug(
  topicSlug: string,
  articleSlug: string
): Promise<LearnArticle | null> {
  return (
    articles.find(
      (a) => a.slug === articleSlug && a.topic_slugs.includes(topicSlug)
    ) ?? null
  );
}

export async function getAllArticleSlugs(): Promise<
  { topic: string; slug: string }[]
> {
  const out: { topic: string; slug: string }[] = [];
  for (const article of articles) {
    for (const topic of article.topic_slugs) {
      out.push({ topic, slug: article.slug });
    }
  }
  return out;
}

export async function getRelatedArticles(
  slugs: string[]
): Promise<LearnArticle[]> {
  return slugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is LearnArticle => Boolean(a));
}

export async function getCanonicalTopicForArticle(
  article: LearnArticle
): Promise<string> {
  return article.topic_slugs[0];
}

export async function getAllArticles(): Promise<LearnArticle[]> {
  return [...articles].sort(
    (a, b) =>
      new Date(b.published_date).getTime() -
      new Date(a.published_date).getTime()
  );
}
