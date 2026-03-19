import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/server-data';
import { generateSEOMetadata } from '@/lib/seo-config';
import ArticleBreadcrumb from './_components/ArticleBreadcrumb';
import ArticleHeader from './_components/ArticleHeader';
import ArticleContent from './_components/ArticleContent';
import FeaturedArticles from '../_components/FeaturedArticles';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.category, slug);
  const filteredRelated = relatedPosts.filter(
    (a) => a.slug !== slug && a.title && a.imageUrl
  );

  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-[#E2DDD8]">
      {/* Breadcrumb */}
      <div className="bg-[#E2DDD8]">
        <div className="max-w-6xl mx-auto py-4">
          <ArticleBreadcrumb category={post.category} title={post.title} />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 py-8">
        <ArticleHeader post={post} />
        <ArticleContent
          content={post.content}
          imageUrl={post.imageUrl}
          imageAlt={post.title}
          title={post.title}
          slug={post.slug}
          articleUrl={articleUrl}
        />
      </article>

      {/* Related Articles */}
      {filteredRelated.length > 0 && (
        <FeaturedArticles
          articles={filteredRelated}
          title="Artículos Relacionados"
          backgroundColor="bg-white"
        />
      )}
    </div>
  );
}
