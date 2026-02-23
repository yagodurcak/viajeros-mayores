'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getOptimizedImageUrl } from '@/lib/utils';
import ArticleShare from '@/app/blog/[slug]/_components/ArticleShare';

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

  return (
    <div className="prose max-w-none my-8">
      {/* Cover Image */}
      <div className="mb-8 rounded-xl overflow-hidden relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={getOptimizedImageUrl(imageUrl)}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="article-content prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-8 font-alata">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-8 font-alata">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-bold text-gray-900 mt-5 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#E36E4A] pl-4 italic text-gray-600 my-4">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 text-[#E36E4A] px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-[#E36E4A] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src ? getOptimizedImageUrl(src) : ''}
                alt={alt || ''}
                className="rounded-lg shadow-md my-4 w-full"
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Share Section */}
      <ArticleShare title={title} url={articleUrl} />
    </div>
  );
};

export default NewsContent;
