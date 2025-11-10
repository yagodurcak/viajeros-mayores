'use client';

import React from 'react';
import Link from 'next/link';
import type { BlogArticle } from '@/types/blog';
import {
  getCategoryColor,
  getCategoryLabel,
  formatBlogDate,
} from '@/lib/blog-utils';
import Avatar from '@/components/Avatar/Avatar';

interface ArticleCardProps {
  article: BlogArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/blog/${article.slug}`} className="block h-full">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <div className="mb-3">
            <span
              className={`${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-semibold`}
            >
              {getCategoryLabel(article.category)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#E36E4A] transition-colors flex-1">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {article.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <Avatar name={article.author.name} size="xs" />
              <span className="font-medium text-gray-700">
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>{formatBlogDate(article.createdAt)}</span>
              <span>•</span>
              <span>{article.readTime} min</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
