'use client';

import React from 'react';
import Image from 'next/image';
import ArticleShare from '@/app/blog/[slug]/_components/ArticleShare';
import ArticleComments from '@/app/blog/[slug]/_components/ArticleComments';

interface NewsContentProps {
  content: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  slug: string;
}

const NewsContent: React.FC<NewsContentProps> = ({
  content,
  imageUrl,
  imageAlt,
  title,
  slug,
}) => {
  const articleUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://yourdomain.com/news/${slug}`;

  // Parse content - assuming it might be HTML or plain text with paragraphs
  const renderContent = () => {
    // Split content by double newlines to create paragraphs
    const paragraphs = content.split(/\n\n+/);

    return paragraphs.map((paragraph, index) => {
      // Check if it's a heading (starts with #)
      if (paragraph.startsWith('# ')) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-gray-900 mt-10 mb-4 font-alata"
          >
            {paragraph.substring(2)}
          </h2>
        );
      } else if (paragraph.startsWith('## ')) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-gray-900 mt-8 mb-3 font-alata"
          >
            {paragraph.substring(3)}
          </h3>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-2">
            {paragraph.substring(4)}
          </h4>
        );
      }
      // Check if it's a list item (starts with - or *)
      else if (paragraph.match(/^[-*]\s/)) {
        const items = paragraph.split(/\n[-*]\s/);
        return (
          <ul
            key={index}
            className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4"
          >
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^[-*]\s/, '')}</li>
            ))}
          </ul>
        );
      }
      // Regular paragraph
      else {
        return (
          <p
            key={index}
            className="text-base text-gray-700 leading-relaxed mb-4"
          >
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="prose max-w-none my-8">
      {/* Cover Image */}
      <div className="mb-8 rounded-xl overflow-hidden relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="article-content">{renderContent()}</div>

      {/* Share Section */}
      <ArticleShare title={title} url={articleUrl} />
    </div>
  );
};

export default NewsContent;
