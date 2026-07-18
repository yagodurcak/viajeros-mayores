import Link from 'next/link';
import Image from 'next/image';
import type { BlogArticle } from '@/types/blog';
import {
  getCategoryColor,
  getCategoryLabel,
  formatBlogDate,
} from '@/lib/blog-utils';
import { getOptimizedImageUrl } from '@/lib/utils';

interface ArticleRelatedCardsProps {
  articles: BlogArticle[];
  title?: string;
}

export default function ArticleRelatedCards({
  articles,
  title = 'También puede interesarte',
}: ArticleRelatedCardsProps) {
  const items = articles.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="py-10">
      <h2 className="font-alata text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="group flex flex-col rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-[#E36E4A]/30 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative w-full h-48 shrink-0 overflow-hidden">
              <Image
                src={getOptimizedImageUrl(article.imageUrl)}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Category badge over image */}
              <div className="absolute top-3 left-3">
                <span
                  className={`${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {getCategoryLabel(article.category)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-2">
              <h3 className="font-alata text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#E36E4A] transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                {article.summary}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                <span>{formatBlogDate(article.createdAt)}</span>
                <span>·</span>
                <span>{article.readTime} min de lectura</span>
              </div>

              {/* CTA */}
              <span className="text-sm font-semibold text-[#E36E4A] mt-1 group-hover:gap-2 transition-all">
                Leer artículo →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
