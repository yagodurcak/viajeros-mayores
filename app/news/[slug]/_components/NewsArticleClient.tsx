'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNewsArticle } from '../../hooks/useNewsArticle';
import ArticleHeader from '@/app/blog/[slug]/_components/ArticleHeader';
import NewsContent from './NewsContent';
import NewsBreadcrumb from './NewsBreadcrumb';
import NewsComments from './NewsComments';

export const NewsArticleClient = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { article, loading, error } = useNewsArticle(slug);

  // Convert NewsArticle to BlogArticle for compatibility
  const blogArticle = article
    ? {
        ...article,
        featured: false,
      }
    : null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="h-4 w-48 bg-gray-300 rounded mb-8"></div>

            {/* Title skeleton */}
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-2/3 mb-8"></div>

            {/* Meta skeleton */}
            <div className="flex gap-4 mb-8">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Image skeleton */}
            <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">📰</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Noticia no encontrada
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'La noticia que buscas no existe.'}
          </p>
          <Link
            href="/news"
            className="inline-block bg-[#E36E4A] text-white px-6 py-3 rounded-lg hover:bg-[#E55A4F] transition-colors"
          >
            Volver a Noticias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto py-4 px-6">
          <NewsBreadcrumb category={article.category} title={article.title} />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 py-8">
        <ArticleHeader post={blogArticle!} />
        <NewsContent
          content={article.content}
          imageUrl={article.imageUrl}
          imageAlt={article.title}
          title={article.title}
          slug={article.slug}
        />

        {/* Comments Section */}
        <NewsComments newsSlug={slug} />
      </article>
    </div>
  );
};

