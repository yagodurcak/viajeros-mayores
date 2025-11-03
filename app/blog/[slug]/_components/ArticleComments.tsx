'use client';

import React, { useState } from 'react';
import Avatar from '@/components/Avatar/Avatar';
import { formatBlogDate } from '@/lib/blog-utils';
import {
  useArticleComments,
  type ArticleComment,
} from '../hooks/useArticleComments';
import { createClient } from '@/lib/supabase/client';

interface ArticleCommentsProps {
  articleSlug: string;
}

interface CommentItemProps {
  comment: ArticleComment;
  onReply: (commentId: string | null) => void;
  replyingTo: string | null;
  onSubmitReply: (commentId: string, text: string) => void;
  submitting: boolean;
  currentUserId: string | null;
  onEdit: (commentId: string, text: string) => void;
  onDelete: (commentId: string) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  replyingTo,
  onSubmitReply,
  submitting,
  currentUserId,
  onEdit,
  onDelete,
  editingId,
  setEditingId,
}) => {
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(comment.comment_text);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const authorName =
    comment.profiles?.full_name ||
    comment.profiles?.username ||
    'Anonymous User';

  const isAuthor = currentUserId === comment.user_id;
  const isEditing = editingId === comment.id;

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onSubmitReply(comment.id, replyText);
      setReplyText('');
    }
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim() && editText !== comment.comment_text) {
      onEdit(comment.id, editText);
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditText(comment.comment_text);
    setEditingId(null);
  };

  const handleDelete = () => {
    onDelete(comment.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar name={authorName} size="md" />
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        {/* Author and Date */}
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-base font-bold text-gray-900">{authorName}</h4>
          <span className="text-gray-500 text-xs">
            {formatBlogDate(comment.created_at)}
          </span>
        </div>

        {/* Comment Text or Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSubmitEdit} className="mb-3">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent resize-none text-sm"
              rows={3}
              required
            />
            <div className="flex items-center gap-2 mt-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-3 py-1.5 bg-[#FF6F61] hover:bg-[#E55A4F] text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              {comment.comment_text}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => onReply(comment.id)}
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF6F61] transition-colors text-xs font-medium"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>

              {/* Edit and Delete buttons - only show if user is author */}
              {isAuthor && (
                <>
                  <button
                    onClick={() => setEditingId(comment.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-xs font-medium"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>

                  {showDeleteConfirm ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-700">
                        Delete this comment?
                      </span>
                      <button
                        onClick={handleDelete}
                        disabled={submitting}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs font-medium transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors text-xs font-medium"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* Reply Form */}
        {replyingTo === comment.id && (
          <form
            onSubmit={handleSubmitReply}
            className="mb-4 bg-gray-50 rounded-lg p-3"
          >
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent resize-none text-sm"
            />
            <div className="flex items-center gap-2 mt-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-3 py-1.5 bg-[#FF6F61] hover:bg-[#E55A4F] text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Reply'}
              </button>
              <button
                type="button"
                onClick={() => onReply(null)}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                replyingTo={replyingTo}
                onSubmitReply={onSubmitReply}
                submitting={submitting}
                currentUserId={currentUserId}
                onEdit={onEdit}
                onDelete={onDelete}
                editingId={editingId}
                setEditingId={setEditingId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleSlug }) => {
  const {
    comments,
    loading,
    error,
    submitting,
    addComment,
    updateComment,
    deleteComment,
  } = useArticleComments(articleSlug);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check authentication status
  React.useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setCurrentUserId(user?.id || null);
    };
    checkAuth();
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const result = await addComment(newComment);
    if (result.success) {
      setNewComment('');
      setShowCommentForm(false);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.error || 'Error posting comment');
    }
  };

  const handleReply = (commentId: string | null) => {
    setReplyingTo(commentId);
    setShowCommentForm(false);
    setErrorMessage(null);
  };

  const handleSubmitReply = async (parentId: string, text: string) => {
    const result = await addComment(text, parentId);
    if (result.success) {
      setReplyingTo(null);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.error || 'Error posting reply');
    }
  };

  const handleShowCommentForm = () => {
    if (!isAuthenticated) {
      setErrorMessage('You must be logged in to comment');
      return;
    }
    setShowCommentForm(true);
    setReplyingTo(null);
    setErrorMessage(null);
  };

  const handleEdit = async (commentId: string, text: string) => {
    const result = await updateComment(commentId, text);
    if (result.success) {
      setEditingId(null);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.error || 'Error updating comment');
    }
  };

  const handleDelete = async (commentId: string) => {
    const result = await deleteComment(commentId);
    if (!result.success) {
      setErrorMessage(result.error || 'Error deleting comment');
    } else {
      setErrorMessage(null);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6F61]"></div>
            <p className="mt-2 text-gray-600 text-sm">Loading comments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-alata">
          Comments ({comments.length})
        </h2>
        {!showCommentForm && !replyingTo && (
          <button
            onClick={handleShowCommentForm}
            className="px-4 py-2 bg-[#FF6F61] hover:bg-[#E55A4F] text-white rounded-lg text-sm font-medium transition-colors"
          >
            Write comment
          </button>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Supabase Error */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-sm">{error}</p>
        </div>
      )}

      {/* Comment Form */}
      {showCommentForm && (
        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            New comment
          </h3>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent resize-none text-sm mb-3"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-[#FF6F61] hover:bg-[#E55A4F] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCommentForm(false);
                  setNewComment('');
                  setErrorMessage(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              replyingTo={replyingTo}
              onSubmitReply={handleSubmitReply}
              submitting={submitting}
              currentUserId={currentUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleComments;
