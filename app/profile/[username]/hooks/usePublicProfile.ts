import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface PublicProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  created_at: string;
}

export interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  place_name: string;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
}

interface BadgeData {
  name: string;
  description: string;
  icon: string;
}

interface UserBadgeResponse {
  id: string;
  earned_at: string;
  badges: BadgeData | null;
}

export function usePublicProfile(username: string) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (username) {
      loadProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar perfil del usuario
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, full_name, bio, created_at')
        .eq('username', username)
        .single();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      if (!profileData) {
        setError('Profile not found');
        return;
      }

      setProfile(profileData);

      // Cargar reseñas del usuario
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('id, title, content, rating, place_name, created_at')
        .eq('user_id', profileData.id)
        .order('created_at', { ascending: false })
        .limit(10);

      setReviews(reviewsData || []);

      // Cargar insignias del usuario
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select(
          `
          id,
          earned_at,
          badges (
            name,
            description,
            icon
          )
        `
        )
        .eq('user_id', profileData.id)
        .order('earned_at', { ascending: false });

      // Transformar datos de badges
      const transformedBadges: Badge[] =
        (badgesData as unknown as UserBadgeResponse[])?.map((item) => ({
          id: item.id,
          name: item.badges?.name || 'Badge',
          description: item.badges?.description || '',
          icon: item.badges?.icon || '🏆',
          earned_at: item.earned_at,
        })) || [];

      setBadges(transformedBadges);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    profile,
    reviews,
    badges,
  };
}
