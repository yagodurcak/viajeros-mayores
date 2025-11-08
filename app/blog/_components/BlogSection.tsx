'use client';

import BlogHero from './BlogHero';
import BlogFilters from './BlogFilters';
import FeaturedArticles from './FeaturedArticles';
import ArticleGrid from './ArticleGrid';
import Pagination from '@/components/Pagination/Pagination';
import { useBlogArticles } from '../hooks/useBlogArticles';
import type { BlogArticle } from '@/types/blog';

interface BlogSectionProps {
  posts: BlogArticle[];
  categories: string[];
  showHero?: boolean;
  articlesPerPage?: number;
  enableSearch?: boolean;
}

/**
 * Reusable blog section component
 * Encapsulates all blog display logic including search, filters, and pagination
 */
const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  categories,
  showHero = true,
  articlesPerPage = 9,
  enableSearch = true,
}) => {
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

  return (
    <>
      {/* Blog Hero with search */}
      {showHero && enableSearch && (
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          resultsCount={regularArticles.length}
          isSearching={isSearching}
        />
      )}

      {/* Category filters */}
      <BlogFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableCategories={categories}
      />

      {/* Articulos recomendados (only when no filters active) */}
      {!hasActiveFilters && <FeaturedArticles articles={featuredArticles} />}

      {/* Articles grid */}
      <ArticleGrid articles={paginatedArticles} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          ariaLabel="Blog pagination"
        />
      )}
    </>
  );
};

export default BlogSection;
