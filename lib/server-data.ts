import { createClient } from '@supabase/supabase-js';
import { getOptimizedImageUrl } from '@/lib/utils';
import type { BlogArticle } from '@/types/blog';
import type { NewsArticle } from '@/types/news';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogArticle | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        title,
        slug,
        summary,
        content,
        category,
        created_at,
        cover_image_url,
        is_featured
      `
      )
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      summary: data.summary || 'Artículo de viaje para adultos mayores',
      content: data.content,
      category: data.category || 'General',
      author: {
        name: 'Viajeros Mayores',
      },
      createdAt: data.created_at,
      readTime: 5,
      imageUrl: getOptimizedImageUrl(
        data.cover_image_url || '/images/logo.png'
      ),
      featured: data.is_featured || false,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getNewsArticleBySlug = async (
  slug: string
): Promise<NewsArticle | null> => {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select(
        `
        id,
        title,
        slug,
        summary,
        content,
        category,
        created_at,
        cover_image_url,
        is_featured
      `
      )
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      summary: data.summary || 'Noticia de viajes para adultos mayores',
      content: data.content,
      category: data.category || 'Noticias',
      author: {
        name: 'Viajeros Mayores',
      },
      createdAt: data.created_at,
      readTime: 5,
      imageUrl: getOptimizedImageUrl(
        data.cover_image_url || '/images/logo.png'
      ),
      featured: data.is_featured || false,
    };
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
};
