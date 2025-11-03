'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { NewsArticle } from '@/types/news';
import type { Database } from '@/types/database';

type NewsRow = Database['public']['Tables']['news_articles']['Row'] & {
  profiles?: {
    username: string | null;
    full_name: string | null;
  } | null;
};

/**
 * Calculate estimated reading time (words / 200 words per minute)
 */
function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export function useNewsArticle(slug: string) {
  const [article, setArticle] = useState<NewsArticle | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch the specific article by slug
        const { data: articleData, error: articleError } = await supabase
          .from('news_articles')
          .select(
            `
            *,
            profiles:author_id (
              username,
              full_name
            )
          `
          )
          .eq('slug', slug)
          .single();

        if (articleError) {
          throw articleError;
        }

        if (!articleData) {
          throw new Error('News article not found');
        }

        // Type the article data
        const typedArticleData = articleData as NewsRow;

        // Get author name prioritizing username
        const getAuthorName = () => {
          // Use username first
          if (typedArticleData.profiles?.username) {
            return typedArticleData.profiles.username;
          }
          // Fallback to full_name
          if (typedArticleData.profiles?.full_name) {
            return typedArticleData.profiles.full_name;
          }
          return 'Redacción';
        };

        // Transform to NewsArticle format
        const transformedArticle: NewsArticle = {
          id: typedArticleData.id,
          title: typedArticleData.title,
          slug: typedArticleData.slug,
          summary: typedArticleData.summary || '',
          content: typedArticleData.content,
          category: typedArticleData.category,
          author: {
            name: getAuthorName(),
          },
          createdAt: typedArticleData.created_at,
          readTime: calculateReadTime(typedArticleData.content),
          imageUrl:
            typedArticleData.cover_image_url || '/images/placeholder-news.jpg',
          featured: typedArticleData.is_featured || false,
        };

        setArticle(transformedArticle);
        setError(null);
      } catch (err) {
        console.error('Error fetching news article:', err);
        setError(
          err instanceof Error ? err.message : 'Error loading news article'
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error };
}
