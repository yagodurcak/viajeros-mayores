// Supabase database types
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          slug: string;
          content: string;
          summary: string;
          cover_image_url: string;
          author_id: string;
          is_featured: boolean;
          category: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          slug: string;
          content: string;
          summary: string;
          cover_image_url: string;
          author_id: string;
          is_featured?: boolean;
          category: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          slug?: string;
          content?: string;
          summary?: string;
          cover_image_url?: string;
          author_id?: string;
          is_featured?: boolean;
          category?: string;
        };
      };
      post_comments: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          post_id: string;
          comment_text: string;
          parent_comment_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          post_id: string;
          comment_text: string;
          parent_comment_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          post_id?: string;
          comment_text?: string;
          parent_comment_id?: string | null;
        };
      };
      news_articles: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          slug: string;
          content: string;
          summary: string | null;
          cover_image_url: string | null;
          author_id: string;
          is_featured: boolean;
          category: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          slug: string;
          content: string;
          summary?: string | null;
          cover_image_url?: string | null;
          author_id: string;
          is_featured?: boolean;
          category: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          slug?: string;
          content?: string;
          summary?: string | null;
          cover_image_url?: string | null;
          author_id?: string;
          is_featured?: boolean;
          category?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          username: string | null;
          email: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          username?: string | null;
          email?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          username?: string | null;
          email?: string | null;
        };
      };
      community_posts: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          title: string | null;
          content: string;
          category: string;
          location: string | null;
          travel_date: string | null;
          likes_count: number;
          comments_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          title?: string | null;
          content: string;
          category: string;
          location?: string | null;
          travel_date?: string | null;
          likes_count?: number;
          comments_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          title?: string | null;
          content?: string;
          category?: string;
          location?: string | null;
          travel_date?: string | null;
          likes_count?: number;
          comments_count?: number;
        };
      };
      community_post_likes: {
        Row: {
          id: string;
          created_at: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          post_id?: string;
          user_id?: string;
        };
      };
      community_post_comments: {
        Row: {
          id: string;
          created_at: string;
          post_id: string;
          user_id: string;
          comment_text: string;
          parent_comment_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          post_id: string;
          user_id: string;
          comment_text: string;
          parent_comment_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          post_id?: string;
          user_id?: string;
          comment_text?: string;
          parent_comment_id?: string | null;
        };
      };
      news_articles_comments: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          news_id: string;
          comment_text: string;
          parent_comment_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          news_id: string;
          comment_text: string;
          parent_comment_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          news_id?: string;
          comment_text?: string;
          parent_comment_id?: string | null;
        };
      };
    };
  };
}
