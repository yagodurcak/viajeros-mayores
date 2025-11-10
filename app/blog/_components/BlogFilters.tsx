'use client';

import React from 'react';
import type { BlogFilters } from '@/types/blog';
import { getCategoryLabel } from '@/lib/blog-utils';

interface BlogFiltersProps {
  filters: BlogFilters;
  onFilterChange: (filters: BlogFilters) => void;
  availableCategories: string[];
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  filters,
  onFilterChange,
  availableCategories,
}) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  return (
    <section className="py-8 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {/* "All" button */}
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              (filters.category || 'all') === 'all'
                ? 'bg-[#E36E4A] text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E36E4A] hover:text-[#E36E4A] shadow-sm'
            }`}
          >
            Todas las Categorías
          </button>

          {/* Dynamic categories from database */}
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                filters.category === cat
                  ? 'bg-[#E36E4A] text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E36E4A] hover:text-[#E36E4A] shadow-sm'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFilters;
