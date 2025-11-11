import { createClient } from '@supabase/supabase-js';
import type { BlogArticle } from '@/types/blog';
import type { NewsArticle } from '@/types/news';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthorData {
  full_name: string;
}

export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogArticle | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        `
        id,
        title,
        slug,
        summary,
        content,
        category,
        created_at,
        read_time,
        image_url,
        featured,
        author:profiles(full_name)
      `
      )
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      return null;
    }

    const authorData = data.author as unknown as AuthorData;

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      category: data.category,
      author: {
        name: authorData?.full_name || 'Autor Desconocido',
      },
      createdAt: data.created_at,
      readTime: data.read_time,
      imageUrl: data.image_url,
      featured: data.featured,
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
        read_time,
        image_url,
        featured,
        author:profiles(full_name)
      `
      )
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      return null;
    }

    const authorData = data.author as unknown as AuthorData;

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      category: data.category,
      author: {
        name: authorData?.full_name || 'Autor Desconocido',
      },
      createdAt: data.created_at,
      readTime: data.read_time,
      imageUrl: data.image_url,
      featured: data.featured,
    };
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
};
