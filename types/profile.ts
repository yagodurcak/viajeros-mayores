export interface PublicProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  title: string;
  content: string;
  rating: number;
  place_name: string;
  place_type: 'hotel' | 'restaurant' | 'experience';
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badges?: Badge;
}
