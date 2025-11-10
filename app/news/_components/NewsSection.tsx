'use client';

import React from 'react';
import BlogFilters from '@/app/blog/_components/BlogFilters';
import NewsGrid from './NewsGrid';
import FeaturedNews from './FeaturedNews';
import Pagination from '@/components/Pagination/Pagination';
import { useBlogArticles } from '@/app/blog/hooks/useBlogArticles';
import type { NewsArticle } from '@/types/news';
import type { BlogArticle } from '@/types/blog';

interface NewsSectionProps {
  articles: NewsArticle[];
  categories: string[];
  showHero?: boolean;
  articlesPerPage?: number;
  enableSearch?: boolean;
}

/**
 * Reusable news section component
 * Encapsulates all news display logic including search, filters, and pagination
 */
const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  categories,
  showHero = true,
  articlesPerPage = 9,
  enableSearch = true,
}) => {
  // Convert NewsArticle to BlogArticle for compatibility with existing components
  const posts: BlogArticle[] = articles.map((article) => ({
    ...article,
    featured: article.featured || false,
  }));

  // Use custom hook for all article filtering/search/pagination logic
  const {
    searchQuery,
    filters,
    currentPage,
    isSearching,
    featuredArticles,
    regularArticles,
    paginatedArticles,
    totalPages,
    hasActiveFilters,
    handleSearchChange,
    handleClearSearch,
    handleFilterChange,
    handlePageChange,
  } = useBlogArticles({
    posts,
    articlesPerPage,
    enableSearch,
  });

  // Convert back to NewsArticle for FeaturedNews component
  const featuredNews: NewsArticle[] = featuredArticles.map((article) => ({
    ...article,
    featured: article.featured || false,
  }));

  return (
    <>
      {/* News Hero with search */}
      {showHero && enableSearch && (
        <section className="relative bg-gradient-to-r from-[#E36E4A] to-[#F4916F] text-white py-20 px-6">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 font-alata">
              Viajeros Mayores News
            </h1>
            <p className="text-xl mb-8 font-light opacity-90">
              Noticias importantes para personas con movilidad reducida.
            </p>

            {/* Search bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar noticias por título, autor, contenido..."
                  className="w-full px-6 py-4 pr-28 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-lg transition-all"
                  aria-label="Buscar noticias"
                />

                {/* Clear button */}
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                {/* Search button / loading */}
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E36E4A] text-white p-3 rounded-full hover:bg-[#D45A36] transition-colors"
                  aria-label="Buscar"
                >
                  {isSearching ? (
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Results counter */}
              {searchQuery && !isSearching && (
                <div className="mt-4 text-sm opacity-90">
                  {regularArticles.length === 0 ? (
                    <p>
                      No se encontraron noticias para &ldquo;{searchQuery}
                      &rdquo;
                    </p>
                  ) : (
                    <p>
                      Se encontraron <strong>{regularArticles.length}</strong>{' '}
                      {regularArticles.length === 1 ? 'noticia' : 'noticias'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {/* Category filters */}
      <BlogFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableCategories={categories}
      />

      {/* Featured News - Only show if no active filters/search */}
      {!hasActiveFilters && !searchQuery && featuredNews.length > 0 && (
        <FeaturedNews articles={featuredNews} />
      )}

      {/* News grid */}
      <NewsGrid articles={paginatedArticles as NewsArticle[]} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          ariaLabel="Paginación de noticias"
        />
      )}
    </>
  );
};

export default NewsSection;
