import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPostBySlug, getRelatedBlogPosts, getMostReadBlogPosts } from '@/lib/server-data';
import { generateSEOMetadata } from '@/lib/seo-config';
import ArticleBreadcrumb from './_components/ArticleBreadcrumb';
import ArticleHeader from './_components/ArticleHeader';
import ArticleContent from './_components/ArticleContent';
import ArticleSidebar from './_components/ArticleSidebar';
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

  const [relatedPosts, mostRead] = await Promise.all([
    getRelatedBlogPosts(post.category, slug),
    getMostReadBlogPosts(slug),
  ]);
  const filteredRelated = relatedPosts.filter(
    (a) => a.slug !== slug && a.title && a.imageUrl
  );

  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb — barra blanca con separador */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <ArticleBreadcrumb category={post.category} title={post.title} />
        </div>
      </div>

      {/* Page body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Article header — sobre el gris, sin caja */}
        <div className="mb-6">
          <ArticleHeader post={post} />
        </div>

        {/* Content + Sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Article card — blanco con sombra */}
          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 md:px-10 py-8">
            <ArticleContent
              content={post.content}
              imageUrl={post.imageUrl}
              imageAlt={post.title}
              title={post.title}
              slug={post.slug}
              articleUrl={articleUrl}
            />
          </article>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-24">
            <ArticleSidebar
              category={post.category}
              relatedArticles={mostRead}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
