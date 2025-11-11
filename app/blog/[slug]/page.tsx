import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/server-data';
import { generateSEOMetadata } from '@/lib/seo-config';
import { BlogPostClient } from './_components/BlogPostClient';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Viajeros Mayores',
      description: 'El artículo que buscas no existe.',
    };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.summary,
    image: post.imageUrl,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.createdAt,
    author: post.author.name,
    section: post.category,
    tags: [post.category, 'viajes', 'adultos mayores'],
  });
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
