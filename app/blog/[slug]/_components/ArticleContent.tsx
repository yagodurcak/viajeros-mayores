'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticleShare from './ArticleShare';
import ArticleComments from './ArticleComments';
import { GuideCta } from './GuideCta';

/**
 * Parsea si el párrafo es un bloque de guía descargable y devuelve la clave.
 * Formatos aceptados (en el content del post en Supabase):
 * - "guía-descargable" → guía por defecto
 * - "guía-descargable:clave" → ej. "guía-descargable:consejos-aeropuerto"
 * - "guía-descargable (clave)" → ej. "guía-descargable (consejos-aeropuerto)"
 * Retorna null si no es un bloque de guía, 'default' o la clave.
 */
function parseGuideBlockKey(paragraphText: string): string | null {
  const t = paragraphText.trim();
  const normalized = t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '');

  if (normalized === 'guia-descargable') return 'default';
  if (normalized.startsWith('guia-descargable:')) {
    const key = normalized.slice('guia-descargable:'.length).trim();
    return key || 'default';
  }
  if (normalized.startsWith('guia-descargable(') && normalized.includes(')')) {
    const start = 'guia-descargable('.length;
    const end = normalized.indexOf(')');
    const key = normalized.slice(start, end).trim();
    return key || 'default';
  }
  return null;
}

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
    <div
      className="
        article-content prose prose-lg max-w-none my-8
        prose-headings:font-alata
        prose-headings:text-gray-900
        prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-5
        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-700
        prose-li:my-1
      "
    >
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

      {/* Markdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-5 font-alata">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4 font-alata">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => {
            const text = Array.isArray(children)
              ? children
                  .map((c) => (typeof c === 'string' ? c : ''))
                  .join('')
                  .trim()
              : typeof children === 'string'
                ? children.trim()
                : '';

            // Detecta bloque de guía descargable (viene del content de Supabase).
            // Formatos: "guía-descargable" | "guía-descargable:clave" | "guía-descargable (clave)"
            const guideKey = parseGuideBlockKey(text);
            if (guideKey !== null) {
              return (
                <GuideCta
                  postSlug={slug}
                  guideKey={guideKey === 'default' ? undefined : guideKey}
                />
              );
            }

            return (
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {children}
              </p>
            );
          },
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
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Share + Comments (fuera del markdown) */}
      <div className="not-prose mt-10">
        <ArticleShare title={title} url={articleUrl} />
        <ArticleComments articleSlug={slug} />
      </div>
    </div>
  );
};

export default ArticleContent;
