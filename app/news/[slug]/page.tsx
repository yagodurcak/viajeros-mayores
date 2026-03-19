import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getNewsArticleBySlug } from '@/lib/server-data';
import { generateSEOMetadata } from '@/lib/seo-config';
import NewsBreadcrumb from './_components/NewsBreadcrumb';
import ArticleHeader from '@/app/blog/[slug]/_components/ArticleHeader';
import NewsContent from './_components/NewsContent';
import NewsComments from './_components/NewsComments';

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Noticia no encontrada | Viajeros Mayores',
      description: 'La noticia que buscas no existe.',
    };
  }

  return generateSEOMetadata({
    title: article.title,
    description: article.summary,
    image: article.imageUrl,
    url: `/news/${article.slug}`,
    type: 'article',
    publishedTime: article.createdAt,
    author: article.author.name,
    section: article.category,
    tags: [article.category, 'noticias', 'viajes', 'adultos mayores'],
  });
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const blogArticle = { ...article, featured: false };
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${article.slug}`;

  return (
    <div className="min-h-screen bg-[#E2DDD8]">
      {/* Breadcrumb */}
      <div className="bg-[#E2DDD8]">
        <div className="max-w-6xl mx-auto py-4 px-6">
          <NewsBreadcrumb category={article.category} title={article.title} />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 py-8">
        <ArticleHeader post={blogArticle} />
        <NewsContent
          content={article.content}
          imageUrl={article.imageUrl}
          imageAlt={article.title}
          title={article.title}
          slug={article.slug}
          articleUrl={articleUrl}
        />

        {/* Comments Section */}
        <NewsComments newsSlug={slug} />
      </article>
    </div>
  );
}
