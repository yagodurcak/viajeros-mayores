'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticleShare from './ArticleShare';
import ArticleComments from './ArticleComments';
import { GuideCta } from './GuideCta';

const GUIDE_TOKEN = 'guía-descargable';

interface ArticleContentProps {
  content: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  slug: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  content,
  imageUrl,
  imageAlt,
  title,
  slug,
}) => {
  const articleUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

  return (
    <div className="prose max-w-none my-8">
      <div className="mb-8 rounded-xl overflow-hidden relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="article-content prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => {
              const text = Array.isArray(children)
                ? children
                    .map((c) => (typeof c === 'string' ? c : ''))
                    .join('')
                    .trim()
                : typeof children === 'string'
                  ? children.trim()
                  : '';

              if (text === GUIDE_TOKEN) {
                return <GuideCta postSlug={slug} />;
              }

              return (
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  {children}
                </p>
              );
            },
            // ...tu resto de overrides igual que ahora (h1, h2, etc.)
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <ArticleShare title={title} url={articleUrl} />
      <ArticleComments articleSlug={slug} />
    </div>
  );
};

export default ArticleContent;
