'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { BlogArticle } from '@/types/blog';
import {
  getCategoryColor,
  getCategoryLabel,
  formatBlogDate,
} from '@/lib/blog-utils';

interface FeaturedArticlesProps {
  articles: BlogArticle[];
  title?: string;
  backgroundColor?: string;
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  articles,
  title = 'Articulos recomendados',
  backgroundColor = 'bg-gray-50',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (articles.length === 0) return null;

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(articles.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentArticles = () => {
    const start = currentSlide * itemsPerSlide;
    const end = start + itemsPerSlide;
    return articles.slice(start, end);
  };

  const currentArticles = getCurrentArticles();

  return (
    <section className={`py-12 px-6 ${backgroundColor}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 font-alata">
          {title}
        </h2>

        {/* Carousel Container */}
        <div className="relative px-12">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer block"
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                      >
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2 group-hover:text-[#FF8A7A] transition-colors">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                      {article.summary}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <span>{formatBlogDate(article.createdAt)}</span>
                      <span>•</span>
                      <span>{article.readTime} min de lectura</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation buttons - Only if there are more than 3 articles */}
          {articles.length > itemsPerSlide && (
            <>
              {/* Previous button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#FF6F61] hover:bg-[#FF5A4A] text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-20"
                aria-label="Previous articles"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FF6F61] hover:bg-[#FF5A4A] text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-20"
                aria-label="Next articles"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {articles.length > itemsPerSlide && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${
                    index === currentSlide
                      ? 'w-8 h-2 bg-[#FF6F61]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  } rounded-full`}
                  aria-label={`Go to group ${index + 1} of ${totalSlides}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
