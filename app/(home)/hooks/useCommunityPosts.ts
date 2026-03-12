'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CommunityPostAuthor {
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

export interface CommunityPost {
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
  liked_by_me: boolean;
  profiles: CommunityPostAuthor | null;
}

export interface CommunityComment {
  id: string;
  created_at: string;
  comment_text: string;
  user_id: string;
  parent_comment_id: string | null;
  profiles: CommunityPostAuthor | null;
}

export function useCommunityPosts(category: string) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'todas') params.set('category', category);

    const res = await fetch(`/api/community/posts?${params}`);
    if (res.ok) {
      const data = await res.json() as { posts: CommunityPost[] };
      setPosts(data.posts);
    }
    setLoading(false);
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const prependPost = (post: CommunityPost) => {
    setPosts((prev) => [post, ...prev]);
  };

  const toggleLike = async (postId: string) => {
    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked_by_me: !p.liked_by_me,
              likes_count: p.liked_by_me ? p.likes_count - 1 : p.likes_count + 1,
            }
          : p
      )
    );

    const res = await fetch(`/api/community/posts/${postId}/like`, {
      method: 'POST',
    });

    if (res.ok) {
      const data = await res.json() as { liked: boolean; likesCount: number };
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, liked_by_me: data.liked, likes_count: data.likesCount }
            : p
        )
      );
    } else {
      // Revert on error
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                liked_by_me: !p.liked_by_me,
                likes_count: p.liked_by_me ? p.likes_count - 1 : p.likes_count + 1,
              }
            : p
        )
      );
    }
  };

  const incrementCommentCount = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
      )
    );
  };

  const deletePost = async (postId: string): Promise<boolean> => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    const res = await fetch(`/api/community/posts/${postId}`, { method: 'DELETE' });
    if (!res.ok) {
      fetchPosts(); // revert by refetching
      return false;
    }
    return true;
  };

  return { posts, loading, prependPost, toggleLike, incrementCommentCount, deletePost };
}

export function useCommunityComments(postId: string, open: boolean) {
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`/api/community/posts/${postId}/comments`)
      .then((r) => r.json() as Promise<{ comments: CommunityComment[] }>)
      .then((data) => setComments(data.comments))
      .finally(() => setLoading(false));
  }, [postId, open]);

  const addComment = async (text: string, parentId?: string): Promise<boolean> => {
    const res = await fetch(`/api/community/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_text: text, parent_comment_id: parentId ?? null }),
    });
    if (res.ok) {
      const data = await res.json() as { comment: CommunityComment };
      setComments((prev) => [...prev, data.comment]);
      return true;
    }
    return false;
  };

  return { comments, loading, addComment };
}
