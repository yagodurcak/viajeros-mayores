'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface ArticleComment {
  id: string;
  comment_text: string;
  created_at: string;
  user_id: string;
  post_id: string;
  parent_comment_id: string | null;
  profiles?: {
    full_name: string | null;
    username: string | null;
  };
  replies?: ArticleComment[];
}

export function useArticleComments(postSlug: string) {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      // First get the post ID from the slug
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', postSlug)
        .single();

      if (postError) throw postError;
      if (!postData) throw new Error('Post not found');

      // Fetch all comments for this post
      const { data: commentsData, error: commentsError } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postData.id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Get unique user IDs from comments
      const userIds = Array.from(
        new Set(commentsData?.map((comment) => comment.user_id) || [])
      );

      // Fetch user profiles for all commenters
      const profilesMap = new Map<
        string,
        { full_name: string | null; username: string | null }
      >();

      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, username')
          .in('id', userIds);

        if (!profilesError && profilesData) {
          profilesData.forEach((profile) => {
            profilesMap.set(profile.id, {
              full_name: profile.full_name,
              username: profile.username,
            });
          });
        }
      }

      // Organize comments into a hierarchical structure
      const topLevelComments: ArticleComment[] = [];
      const commentMap = new Map<string, ArticleComment>();

      // First pass: create a map of all comments with profile data
      commentsData?.forEach((comment) => {
        const profile = profilesMap.get(comment.user_id);
        commentMap.set(comment.id, {
          ...comment,
          profiles: profile,
          replies: [],
        });
      });

      // Second pass: organize into hierarchy
      commentsData?.forEach((comment) => {
        const commentWithReplies = commentMap.get(comment.id)!;
        if (comment.parent_comment_id) {
          // This is a reply, add it to parent's replies
          const parent = commentMap.get(comment.parent_comment_id);
          if (parent) {
            parent.replies!.push(commentWithReplies);
          }
        } else {
          // This is a top-level comment
          topLevelComments.push(commentWithReplies);
        }
      });

      setComments(topLevelComments);
      setError(null);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err instanceof Error ? err.message : 'Error loading comments');
    } finally {
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    if (postSlug) {
      fetchComments();
    }
  }, [postSlug, fetchComments]);

  const addComment = async (
    commentText: string,
    parentCommentId: string | null = null
  ) => {
    try {
      setSubmitting(true);
      const supabase = createClient();

      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to comment');
      }

      // Get post ID from slug
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', postSlug)
        .single();

      if (postError) throw postError;
      if (!postData) throw new Error('Post not found');

      // Insert the comment
      const { error: insertError } = await supabase
        .from('post_comments')
        .insert({
          comment_text: commentText,
          post_id: postData.id,
          user_id: user.id,
          parent_comment_id: parentCommentId,
        });

      if (insertError) throw insertError;

      // Refresh comments
      await fetchComments();
      return { success: true };
    } catch (err) {
      console.error('Error adding comment:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Error adding comment',
      };
    } finally {
      setSubmitting(false);
    }
  };

  const updateComment = async (commentId: string, newText: string) => {
    try {
      setSubmitting(true);
      const supabase = createClient();

      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to edit comments');
      }

      // Update the comment
      const { error: updateError } = await supabase
        .from('post_comments')
        .update({ comment_text: newText })
        .eq('id', commentId)
        .eq('user_id', user.id); // Ensure user owns the comment

      if (updateError) throw updateError;

      // Refresh comments
      await fetchComments();
      return { success: true };
    } catch (err) {
      console.error('Error updating comment:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Error updating comment',
      };
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      setSubmitting(true);
      const supabase = createClient();

      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to delete comments');
      }

      // Delete the comment
      const { error: deleteError } = await supabase
        .from('post_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id); // Ensure user owns the comment

      if (deleteError) throw deleteError;

      // Refresh comments
      await fetchComments();
      return { success: true };
    } catch (err) {
      console.error('Error deleting comment:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Error deleting comment',
      };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    comments,
    loading,
    error,
    submitting,
    addComment,
    updateComment,
    deleteComment,
    refreshComments: fetchComments,
  };
}
