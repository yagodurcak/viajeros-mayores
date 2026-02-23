'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getOptimizedImageUrl } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';
import type { Database } from '@/types/database';

type PostRow = Database['public']['Tables']['posts']['Row'];

/**
 * Calculate estimated reading time (words / 200 words per minute)
 */
function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch posts with author information
        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(
            `
            *,
            profiles:author_id (
              full_name
            )
          `
          )
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform Supabase data to BlogArticle format
        const transformedPosts: BlogArticle[] = (data || []).map(
          (
            post: PostRow & {
              profiles?: { full_name?: string };
            }
          ) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            summary: post.summary || '',
            content: post.content,
            category: post.category,
            author: {
              name: post.profiles?.full_name || 'Unknown Author',
            },
            createdAt: post.created_at,
            readTime: calculateReadTime(post.content),
            imageUrl: getOptimizedImageUrl(post.cover_image_url || ''),
            featured: post.is_featured,
          })
        );

        // Extract unique categories from posts
        const uniqueCategories = Array.from(
          new Set(transformedPosts.map((post) => post.category))
        ).sort();

        setPosts(transformedPosts);
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Error loading posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, categories, loading, error };
}
