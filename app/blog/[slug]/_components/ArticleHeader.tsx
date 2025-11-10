'use client';

import React from 'react';
import type { BlogArticle } from '@/types/blog';
import { getCategoryLabel, formatBlogDate } from '@/lib/blog-utils';
import Avatar from '@/components/Avatar/Avatar';

interface ArticleHeaderProps {
  post: BlogArticle;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ post }) => {
  return (
    <header className="mb-8">
      {/* Category Label */}
      <div className="mb-4">
        <span className="text-[#E36E4A] text-sm font-medium tracking-wide">
          {getCategoryLabel(post.category)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight font-alata">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        {/* Date */}
        <time dateTime={post.createdAt}>{formatBlogDate(post.createdAt)}</time>

        {/* Separator */}
        <span className="text-gray-400">•</span>

        {/* Read Time */}
        <span>{post.readTime} min de lectura</span>

        {/* Separator */}
        <span className="text-gray-400">•</span>

        {/* Author with Avatar */}
        <div className="flex items-center gap-2">
          <Avatar name={post.author.name} size="xs" />
          <span className="font-medium text-gray-900">{post.author.name}</span>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
