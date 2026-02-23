'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getOptimizedImageUrl } from '@/lib/utils';
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

export function useNewsArticles() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch news articles with author information
        const { data, error: fetchError } = await supabase
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
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform Supabase data to NewsArticle format
        const transformedArticles: NewsArticle[] = (data || []).map(
          (article: NewsRow) => {
            // Get author name prioritizing username
            const getAuthorName = () => {
              // Use username first
              if (article.profiles?.username) {
                return article.profiles.username;
              }
              // Fallback to full_name
              if (article.profiles?.full_name) {
                return article.profiles.full_name;
              }
              return 'Redacción';
            };

            return {
              id: article.id,
              title: article.title,
              slug: article.slug,
              summary: article.summary || '',
              content: article.content,
              category: article.category,
              author: {
                name: getAuthorName(),
              },
              createdAt: article.created_at,
              readTime: calculateReadTime(article.content),
              imageUrl: getOptimizedImageUrl(
                article.cover_image_url || '/images/placeholder-news.jpg'
              ),
              featured: article.is_featured || false,
            };
          }
        );

        // Extract unique categories from articles
        const uniqueCategories = Array.from(
          new Set(transformedArticles.map((article) => article.category))
        ).sort();

        setArticles(transformedArticles);
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching news articles:', err);
        setError(
          err instanceof Error ? err.message : 'Error loading news articles'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return { articles, categories, loading, error };
}
