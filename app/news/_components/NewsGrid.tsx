import React from 'react';
import type { NewsArticle } from '@/types/news';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron noticias
          </h3>
          <p className="text-gray-500">
            Intenta ajustar tus filtros o términos de búsqueda
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 font-alata">
          Todas las noticias
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
