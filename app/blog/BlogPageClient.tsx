'use client';

import React from 'react';
import BlogSection from './_components/BlogSection';
import { useBlogPosts } from './hooks/useBlogPosts';

const BlogPageClient = () => {
  const { posts, categories, loading, error } = useBlogPosts();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E36E4A]"></div>
            <p className="mt-4 text-gray-600">Cargando artículos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Error al cargar artículos
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogSection
        posts={posts}
        categories={categories}
        showHero={true}
        articlesPerPage={9}
        enableSearch={true}
      />
    </div>
  );
};

export default BlogPageClient;

