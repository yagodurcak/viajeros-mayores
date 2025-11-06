import { useState, useMemo } from 'react';
import type { BlogFilters as BlogFiltersType, BlogArticle } from '@/types/blog';
import { useDebounce } from '@/hooks/useDebounce';
import { searchInText } from '@/lib/blog-utils';

interface UseBlogArticlesOptions {
  posts: BlogArticle[];
  articlesPerPage?: number;
  enableSearch?: boolean;
}

interface UseBlogArticlesReturn {
  // State
  searchQuery: string;
  filters: BlogFiltersType;
  currentPage: number;
  isSearching: boolean;

  // Computed data
  filteredArticles: BlogArticle[];
  featuredArticles: BlogArticle[];
  regularArticles: BlogArticle[];
  paginatedArticles: BlogArticle[];
  totalPages: number;
  hasActiveFilters: boolean;

  // Handlers
  handleSearchChange: (value: string) => void;
  handleClearSearch: () => void;
  handleFilterChange: (newFilters: BlogFiltersType) => void;
  handlePageChange: (page: number) => void;
}

/**
 * Custom hook to manage blog articles filtering, search, and pagination
 * Encapsulates all the logic for blog article management
 */
export const useBlogArticles = ({
  posts,
  articlesPerPage = 9,
  enableSearch = true,
}: UseBlogArticlesOptions): UseBlogArticlesReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BlogFiltersType>({
    category: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return posts.filter((article) => {
      // Enhanced search filter (searches in multiple fields)
      const matchesSearch =
        !enableSearch ||
        !debouncedSearchQuery ||
        searchInText(article.title, debouncedSearchQuery) ||
        searchInText(article.summary, debouncedSearchQuery) ||
        searchInText(article.content, debouncedSearchQuery) ||
        searchInText(article.author.name, debouncedSearchQuery) ||
        searchInText(article.category, debouncedSearchQuery);

      // Category filter
      const matchesCategory =
        !filters.category ||
        filters.category === 'all' ||
        article.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchQuery, filters, posts, enableSearch]);

  // Articulos recomendados
  const featuredArticles = useMemo(() => {
    return posts.filter((article) => article.featured);
  }, [posts]);

  // Regular articles (non-featured first, then featured)
  const regularArticles = useMemo(() => {
    const nonFeatured = filteredArticles.filter((article) => !article.featured);
    const featured = filteredArticles.filter((article) => article.featured);
    return [...nonFeatured, ...featured];
  }, [filteredArticles]);

  // Pagination
  const totalPages = Math.ceil(regularArticles.length / articlesPerPage);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return regularArticles.slice(startIndex, endIndex);
  }, [regularArticles, currentPage, articlesPerPage]);

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: BlogFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to articles section
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  // Search in progress indicator
  const isSearching = enableSearch && searchQuery !== debouncedSearchQuery;

  // Check if any filters are active
  const hasActiveFilters =
    (enableSearch && !!searchQuery) ||
    (!!filters.category && filters.category !== 'all');

  return {
    // State
    searchQuery,
    filters,
    currentPage,
    isSearching,

    // Computed data
    filteredArticles,
    featuredArticles,
    regularArticles,
    paginatedArticles,
    totalPages,
    hasActiveFilters,

    // Handlers
    handleSearchChange,
    handleClearSearch,
    handleFilterChange,
    handlePageChange,
  };
};
