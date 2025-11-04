import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface CreateNewsData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  cover_image_url: string;
  is_featured: boolean;
}

export const useCreateNews = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const createNews = async (newsData: CreateNewsData) => {
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Debes iniciar sesión para crear una noticia');
      }

      // Insert news article
      const { data, error: insertError } = await supabase
        .from('news_articles')
        .insert([
          {
            ...newsData,
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Redirect to the new news article
      router.push(`/news/${data.slug}`);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al crear la noticia';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createNews,
    loading,
    error,
  };
};
