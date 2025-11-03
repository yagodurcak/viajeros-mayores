'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
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

/**
 * Generate a summary from content
 */
function generateSummary(content: string, maxLength = 150): string {
  const text = content.replace(/<[^>]*>/g, '').trim(); // Remove HTML tags if present
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Transform Supabase post to BlogArticle format
 */
function transformPost(
  post: PostRow & {
    profiles?: { full_name?: string };
  }
): BlogArticle {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: generateSummary(post.content),
    content: post.content,
    category: post.category,
    author: {
      name: post.profiles?.full_name || 'Unknown Author',
    },
    createdAt: post.created_at,
    readTime: calculateReadTime(post.content),
    imageUrl: post.cover_image_url,
    featured: post.is_featured,
  };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogArticle | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch the specific post by slug
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select(
            `
            *,
            profiles:author_id (
              full_name
            )
          `
          )
          .eq('slug', slug)
          .single();

        if (postError) {
          throw postError;
        }

        if (!postData) {
          throw new Error('Post not found');
        }

        const transformedPost = transformPost(postData);
        setPost(transformedPost);

        // Fetch related posts (same category, excluding current post, limit 6 for carousel)
        const { data: relatedData, error: relatedError } = await supabase
          .from('posts')
          .select(
            `
            *,
            profiles:author_id (
              full_name
            )
          `
          )
          .eq('category', postData.category)
          .neq('slug', slug)
          .order('created_at', { ascending: false })
          .limit(6);

        if (relatedError) {
          console.error('Error fetching related posts:', relatedError);
        } else {
          const transformedRelated = (relatedData || []).map(transformPost);
          setRelatedPosts(transformedRelated);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'Error loading post');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, relatedPosts, loading, error };
}
