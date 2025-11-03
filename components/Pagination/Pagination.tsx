'use client';

import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  maxVisiblePages?: number;
  showPageInfo?: boolean;
  loadMoreText?: string;
  ariaLabel?: string;
  className?: string;
  primaryColor?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  maxVisiblePages = 5,
  showPageInfo = true,
  loadMoreText = 'Cargar más',
  ariaLabel = 'Paginación',
  className = '',
  primaryColor = 'bg-[#FF6F61]',
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const hoverColor = primaryColor.replace('bg-', 'hover:bg-');
  const textColor = primaryColor.replace('bg-', 'text-');
  const borderColor = primaryColor.replace('bg-', 'border-');

  return (
    <div className={`py-12 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Pagination with numbers */}
        <nav
          className="flex items-center justify-center gap-2"
          aria-label={ariaLabel}
        >
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : `bg-white text-gray-700 ${hoverColor} hover:text-white shadow-sm`
            }`}
            aria-label="Página anterior"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? `${primaryColor} text-white shadow-md`
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                  aria-label={`Ir a la página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : `bg-white text-gray-700 ${hoverColor} hover:text-white shadow-sm`
            }`}
            aria-label="Página siguiente"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>

        {/* Load more option (optional) */}
        {onLoadMore && currentPage < totalPages && (
          <div className="mt-6 text-center">
            <button
              onClick={onLoadMore}
              className={`px-8 py-3 bg-white ${textColor} border-2 ${borderColor} rounded-lg font-semibold ${hoverColor} hover:text-white transition-colors shadow-sm`}
            >
              {loadMoreText}
            </button>
          </div>
        )}

        {/* Page information */}
        {showPageInfo && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
