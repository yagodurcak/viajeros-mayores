'use client';

import React from 'react';
import NewsSection from './_components/NewsSection';
import { useNewsArticles } from './hooks/useNewsArticles';

const NewsPageClient = () => {
  const { articles, categories, loading, error } = useNewsArticles();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E36E4A]"></div>
            <p className="mt-4 text-gray-600">Cargando noticias...</p>
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
              Error al cargar noticias
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NewsSection
        articles={articles}
        categories={categories}
        showHero={true}
        articlesPerPage={9}
        enableSearch={true}
      />
    </div>
  );
};

export default NewsPageClient;

