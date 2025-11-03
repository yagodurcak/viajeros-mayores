'use client';

import Link from 'next/link';
import Hero from './_components/Hero/Hero';
import MissionSection from './_components/MissionSection/MissionSection';
import TestimonialsSection from './_components/TestimonialsSection/TestimonialsSection';
import FeaturedArticles from '../blog/_components/FeaturedArticles';
import FeaturedNews from '../news/_components/FeaturedNews';
import { useBlogPosts } from '../blog/hooks/useBlogPosts';
import { useNewsArticles } from '../news/hooks/useNewsArticles';

const Home = () => {
  const { posts, loading } = useBlogPosts();
  const { articles: newsArticles, loading: newsLoading } = useNewsArticles();

  // Filter only featured articles
  const featuredPosts = posts.filter((post) => post.featured);
  const featuredNewsArticles = newsArticles.filter(
    (article) => article.featured
  );

  return (
    <div
      className={`min-h-screen`}
      style={{ fontFamily: 'var(--font-nunito-sans)' }}
    >
      <Hero />

      {/* Featured News */}
      {!newsLoading && featuredNewsArticles.length > 0 && (
        <div className="relative">
          <FeaturedNews
            articles={featuredNewsArticles}
            title="Featured News"
            backgroundColor="bg-gray-50"
          />

          {/* View All News Link */}
          <div className="flex justify-center pb-12 bg-gray-50">
            <Link
              href="/news"
              className="px-8 py-3 bg-[#FF6F61] hover:bg-[#FF5A4A] text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              View All News →
            </Link>
          </div>
        </div>
      )}

      {/* Featured Blog Articles */}
      {!loading && featuredPosts.length > 0 && (
        <div className="relative">
          <FeaturedArticles
            articles={featuredPosts}
            title="Featured Articles"
            backgroundColor="bg-gray-50"
          />

          {/* View All Blog Link */}
          <div className="flex justify-center pb-12 bg-gray-50">
            <Link
              href="/blog"
              className="px-8 py-3 bg-[#FF6F61] hover:bg-[#FF5A4A] text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              View All Blog Articles →
            </Link>
          </div>
        </div>
      )}

      <MissionSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
