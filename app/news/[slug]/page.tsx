import type { Metadata } from 'next';
import { getNewsArticleBySlug } from '@/lib/server-data';
import { generateSEOMetadata } from '@/lib/seo-config';
import { NewsArticleClient } from './_components/NewsArticleClient';

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const article = await getNewsArticleBySlug(params.slug);

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

export default function NewsArticlePage() {
  return <NewsArticleClient />;
}
