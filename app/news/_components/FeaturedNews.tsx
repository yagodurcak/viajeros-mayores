'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { NewsArticle } from '@/types/news';
import {
  getCategoryColor,
  getCategoryLabel,
  formatBlogDate,
} from '@/lib/blog-utils';

interface FeaturedNewsProps {
  articles: NewsArticle[];
  title?: string;
  backgroundColor?: string;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({
  articles,
  title = 'Noticias Destacadas',
  backgroundColor = 'bg-gray-50',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset slide cuando cambie el tamaño de pantalla
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  if (articles.length === 0) return null;

  const itemsPerSlide = isMobile ? 1 : 3;
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
            <div
              className={`grid gap-6 ${
                isMobile
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {currentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
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
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2 group-hover:text-[#F4916F] transition-colors">
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

          {/* Navigation buttons */}
          {totalSlides > 1 && (
            <>
              {/* Previous button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#E36E4A] hover:bg-[#D45A36] text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-20"
                aria-label="Noticia anterior"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#E36E4A] hover:bg-[#D45A36] text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-20"
                aria-label="Siguiente noticia"
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
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${
                    index === currentSlide
                      ? 'w-8 h-2 bg-[#E36E4A]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  } rounded-full`}
                  aria-label={`Ir al grupo ${index + 1} de ${totalSlides}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
