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
import { usePremiumModal } from '@/context/PremiumModalContext';
import { Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: BlogArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { openPremiumModal } = usePremiumModal();
  const articleUrl = `/blog/${article.slug}`;
  const isFeatured = article.featured;

  const cardContent = (
    <>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          />
          {isFeatured && (
            <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium</span>
            </div>
          )}
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
    </>
  );

  if (isFeatured) {
    return (
      <button
        type="button"
        onClick={() => openPremiumModal(articleUrl)}
        className="block h-full w-full text-left"
      >
        <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group h-full flex flex-col">
          {cardContent}
        </article>
      </button>
    );
  }

  return (
    <Link href={articleUrl} className="block h-full">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group h-full flex flex-col">
        {cardContent}
      </article>
    </Link>
  );
};

export default ArticleCard;
