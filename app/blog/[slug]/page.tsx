'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useBlogPost } from '../hooks/useBlogPost';
import ArticleHeader from './_components/ArticleHeader';
import ArticleContent from './_components/ArticleContent';
import FeaturedArticles from '../_components/FeaturedArticles';
import ArticleBreadcrumb from './_components/ArticleBreadcrumb';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { post, relatedPosts, loading, error } = useBlogPost(slug);

  // Filter and prepare related articles similar to main blog page
  const filteredRelatedPosts = useMemo(() => {
    // Filter out the current post (in case it somehow gets included)
    // and ensure we only show published/valid articles
    return relatedPosts.filter(
      (article) => article.slug !== slug && article.title && article.imageUrl
    );
  }, [relatedPosts, slug]);

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
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Article not found
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'The article you are looking for does not exist.'}
          </p>
          <Link
            href="/blog"
            className="inline-block bg-[#FF6F61] text-white px-6 py-3 rounded-lg hover:bg-[#E55A4F] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto py-4 ">
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
        />
      </article>

      {/* Related Articles */}
      {filteredRelatedPosts.length > 0 && (
        <FeaturedArticles
          articles={filteredRelatedPosts}
          title="Related Articles"
          backgroundColor="bg-white"
        />
      )}
    </div>
  );
}
