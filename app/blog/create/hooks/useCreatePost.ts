import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface CreatePostData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  cover_image_url: string;
  is_featured: boolean;
}

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const createPost = async (postData: CreatePostData) => {
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Debes iniciar sesión para crear un post');
      }

      // Insert post
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            ...postData,
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Redirect to the new post
      router.push(`/blog/${data.slug}`);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al crear el post';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPost,
    loading,
    error,
  };
};
