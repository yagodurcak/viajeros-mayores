'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  useCommunityPosts,
  useCommunityComments,
  type CommunityPost,
  type CommunityComment,
} from './hooks/useCommunityPosts';
import { useHeartbeat } from './hooks/useHeartbeat';

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { icon: '🏠', label: 'Comunidad', href: '/', active: true },
  { icon: '👥', label: 'Miembros', href: '/members' },
  { icon: '✍️', label: 'Artículos', href: '/blog' },
  { icon: '📰', label: 'Noticias', href: '/news' },
  { icon: '🏷️', label: 'Ofertas', href: '/ofertas' },
  { icon: 'ℹ️', label: 'Nosotros', href: '/about' },
];

// ─── Category filters ─────────────────────────────────────────────────────────
const categoryFilters = [
  { id: 'todas', label: 'Todas', icon: '🌍' },
  { id: 'experiencias', label: 'Experiencias', icon: '📸' },
  { id: 'consejos', label: 'Consejos', icon: '💡' },
  { id: 'preguntas', label: 'Preguntas', icon: '❓' },
  { id: 'destinos', label: 'Destinos', icon: '🗺️' },
  { id: 'noticias', label: 'Noticias', icon: '📰' },
];

const categoryMeta: Record<string, { label: string; color: string }> = {
  experiencias: { label: '📸 Experiencias', color: 'bg-pink-100 text-pink-800' },
  consejos:     { label: '💡 Consejos',     color: 'bg-amber-100 text-amber-800' },
  preguntas:    { label: '❓ Preguntas',    color: 'bg-blue-100 text-blue-800' },
  destinos:     { label: '🗺️ Destinos',    color: 'bg-green-100 text-green-800' },
  noticias:     { label: '📰 Noticias',     color: 'bg-purple-100 text-purple-800' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}sem`;
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

// Deterministic color from string
const AVATAR_COLORS = [
  'bg-pink-600', 'bg-blue-600', 'bg-green-700', 'bg-amber-600',
  'bg-purple-600', 'bg-rose-600', 'bg-teal-600', 'bg-indigo-600',
  'bg-orange-600', 'bg-cyan-700',
];
function avatarColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = (hash * 31 + userId.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Comment section ──────────────────────────────────────────────────────────
function CommentSection({
  postId,
  onCommentAdded,
  onCountSync,
}: {
  postId: string;
  onCommentAdded: () => void;
  onCountSync: (count: number) => void;
}) {
  const { comments, loading, addComment } = useCommunityComments(postId, true);

  useEffect(() => {
    if (!loading) onCountSync(comments.length);
  }, [comments.length, loading, onCountSync]);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);

  const topLevel = comments.filter((c) => !c.parent_comment_id);
  const repliesMap = comments.reduce<Record<string, CommunityComment[]>>((acc, c) => {
    if (c.parent_comment_id) {
      acc[c.parent_comment_id] = [...(acc[c.parent_comment_id] ?? []), c];
    }
    return acc;
  }, {});

  const getUser = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setAuthError(false);
    const user = await getUser();
    if (!user) { setAuthError(true); setSubmitting(false); return; }
    const ok = await addComment(text.trim());
    if (ok) { setText(''); onCommentAdded(); }
    setSubmitting(false);
  };

  const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySubmitting(true);
    const user = await getUser();
    if (!user) { setAuthError(true); setReplySubmitting(false); return; }
    const ok = await addComment(replyText.trim(), parentId);
    if (ok) { setReplyText(''); setReplyingTo(null); }
    setReplySubmitting(false);
  };

  return (
    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-gray-200 space-y-3">
      {loading ? (
        <p className="text-sm text-gray-500 py-2">Cargando comentarios…</p>
      ) : topLevel.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">Sé el primero en comentar.</p>
      ) : (
        <div className="space-y-4">
          {topLevel.map((c: CommunityComment) => (
            <div key={c.id}>
              {/* Top-level comment */}
              <div className="flex gap-3">
                <div
                  className={`${avatarColor(c.user_id)} w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  aria-hidden="true"
                >
                  {getInitials(c.profiles?.full_name ?? null)}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl px-4 py-3">
                    <p className="text-sm font-bold text-gray-900">
                      {c.profiles?.full_name ?? 'Usuario'}
                      <span className="ml-2 text-xs font-normal text-gray-500">{timeAgo(c.created_at)}</span>
                    </p>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">{c.comment_text}</p>
                  </div>
                  <button
                    onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                    className="text-xs text-gray-500 hover:text-[#C4532F] font-semibold mt-1 ml-1 transition-colors min-h-[32px]"
                  >
                    {replyingTo === c.id ? 'Cancelar' : 'Responder'}
                  </button>
                </div>
              </div>

              {/* Replies */}
              {(repliesMap[c.id] ?? []).length > 0 && (
                <div className="ml-12 mt-2 space-y-2 border-l-2 border-gray-100 pl-3">
                  {(repliesMap[c.id] ?? []).map((r) => (
                    <div key={r.id} className="flex gap-2">
                      <div
                        className={`${avatarColor(r.user_id)} w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                        aria-hidden="true"
                      >
                        {getInitials(r.profiles?.full_name ?? null)}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2">
                        <p className="text-xs font-bold text-gray-900">
                          {r.profiles?.full_name ?? 'Usuario'}
                          <span className="ml-2 font-normal text-gray-500">{timeAgo(r.created_at)}</span>
                        </p>
                        <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{r.comment_text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input */}
              {replyingTo === c.id && (
                <form
                  onSubmit={(e) => handleReplySubmit(e, c.id)}
                  className="ml-12 mt-2 flex gap-2"
                >
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Responder a ${c.profiles?.full_name ?? 'Usuario'}…`}
                    maxLength={1000}
                    autoFocus
                    className="flex-1 text-sm bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={replySubmitting || !replyText.trim()}
                    className="px-3 py-2 bg-[#E36E4A] hover:bg-[#C4532F] disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors min-h-[44px]"
                  >
                    {replySubmitting ? '…' : 'Enviar'}
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

      {authError && (
        <p className="text-sm text-red-600 font-medium">
          Debes{' '}
          <Link href="/login" className="underline">iniciar sesión</Link>{' '}
          para comentar.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un comentario…"
          maxLength={1000}
          className="flex-1 text-sm bg-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={submitting || !text.trim()}
          className="px-4 py-2.5 bg-[#E36E4A] hover:bg-[#C4532F] disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors min-h-[44px]"
        >
          {submitting ? '…' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────
function CommunityPostCard({
  post,
  currentUserId,
  onLike,
  onCommentAdded,
  onDelete,
}: {
  post: CommunityPost;
  currentUserId: string | null;
  onLike: (id: string) => void;
  onCommentAdded: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [displayCommentCount, setDisplayCommentCount] = useState(post.comments_count);
  const isOwner = currentUserId === post.user_id;

  const cat = categoryMeta[post.category] ?? { label: post.category, color: 'bg-gray-100 text-gray-800' };
  const authorName = post.profiles?.full_name ?? 'Viajero';
  const initials = getInitials(authorName);
  const bgColor = avatarColor(post.user_id);

  const handleLike = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAuthError(true);
      return;
    }
    setAuthError(false);
    onLike(post.id);
  };

  const handleCommentToggle = async () => {
    if (!showComments) {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setAuthError(true);
        return;
      }
    }
    setAuthError(false);
    setShowComments((v) => !v);
  };

  return (
    <article className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5 sm:p-6">
        {/* Author row */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-bold text-gray-900 text-base">{authorName}</span>
              <span className="text-gray-500 text-sm" aria-hidden="true">·</span>
              <span className="text-gray-500 text-sm">{timeAgo(post.created_at)}</span>
              <span className="text-gray-500 text-sm" aria-hidden="true">·</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${cat.color}`}>
                {cat.label}
              </span>
            </div>
            {post.location && (
              <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {post.location}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mb-1">
          {post.title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{post.title}</h3>
          )}
          <p className="text-gray-700 text-base leading-relaxed line-clamp-4">{post.content}</p>
        </div>

        {/* Auth error */}
        {authError && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            <Link href="/login" className="underline">Iniciá sesión</Link> para interactuar.
          </p>
        )}

        {/* Action row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            {/* Like */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-base transition-all min-h-[44px] border ${
                post.liked_by_me
                  ? 'bg-orange-100 text-[#C4532F] border-orange-300'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#C4532F] border-transparent hover:border-gray-300'
              }`}
              aria-label={`${post.likes_count} me gusta`}
            >
              <svg className="w-5 h-5" fill={post.liked_by_me ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{post.likes_count}</span>
            </button>

            {/* Comment toggle */}
            <button
              onClick={handleCommentToggle}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-base transition-all min-h-[44px] border ${
                showComments
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#C4532F] border-transparent hover:border-gray-300'
              }`}
              aria-label={`${displayCommentCount} comentarios`}
              aria-expanded={showComments}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{displayCommentCount}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
            </span>
            {isOwner && (
              confirmDelete ? (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  <span className="text-sm font-semibold text-red-700">¿Eliminar esta publicación?</span>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg min-h-[44px] transition-colors"
                  >
                    Sí, eliminar
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-sm font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg min-h-[44px] transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 font-semibold text-sm transition-colors min-h-[44px]"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Eliminar</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Comments panel */}
      {showComments && (
        <CommentSection
          postId={post.id}
          onCommentAdded={() => { onCommentAdded(post.id); setDisplayCommentCount((n) => n + 1); }}
          onCountSync={setDisplayCommentCount}
        />
      )}
    </article>
  );
}

// ─── Invite button ────────────────────────────────────────────────────────────
function InviteButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const signupUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/signup`
    : 'https://viajerosmasayores.com/signup';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(signupUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappText = encodeURIComponent(
    `¡Te invito a unirte a Viajeros Mayores, la comunidad de viaje para mayores de 60! Entrá acá: ${signupUrl}`
  );

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="block w-full py-4 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-base text-center transition-colors min-h-[52px]"
      >
        Invitar Miembros
      </button>

      {open && (
        <div className="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-3">
          <p className="text-sm font-semibold text-gray-800">Compartí este link:</p>

          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
            <span className="flex-1 text-xs text-gray-600 truncate">{signupUrl}</span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 text-sm font-bold text-white bg-[#E36E4A] hover:bg-[#C4532F] px-3 py-1.5 rounded-lg min-h-[36px] transition-colors"
            >
              {copied ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>

          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-bold text-sm transition-colors min-h-[48px]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Post creation form ───────────────────────────────────────────────────────
function PostCreationBox({ onPost }: { onPost: (post: CommunityPost) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('experiencias');
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setError('');
    setAuthError(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAuthError(true);
      setSubmitting(false);
      return;
    }

    const res = await fetch('/api/community/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim() || undefined,
        content: content.trim(),
        category,
      }),
    });

    if (res.ok) {
      const data = await res.json() as { post: CommunityPost };
      onPost(data.post);
      setContent('');
      setTitle('');
      setCategory('experiencias');
      setExpanded(false);
    } else {
      const data = await res.json() as { error?: string };
      setError(data.error ?? 'Error al publicar. Intentá de nuevo.');
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-300 p-5"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 bg-[#E36E4A] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
          aria-hidden="true"
        >
          Tú
        </div>
        <div className="flex-1 space-y-3">
          {expanded && (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título (opcional)"
              maxLength={200}
              className="w-full text-base text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent"
            />
          )}
          <textarea
            ref={textareaRef}
            rows={expanded ? 4 : 2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué experiencia de viaje quieres compartir hoy?"
            maxLength={5000}
            onFocus={() => setExpanded(true)}
            className="w-full text-base text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent resize-none transition-all leading-relaxed"
            aria-label="¿Qué experiencia de viaje quieres compartir hoy?"
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] min-h-[44px]"
            aria-label="Categoría"
          >
            <option value="experiencias">📸 Experiencias</option>
            <option value="consejos">💡 Consejos</option>
            <option value="preguntas">❓ Preguntas</option>
            <option value="destinos">🗺️ Destinos</option>
            <option value="noticias">📰 Noticias</option>
          </select>
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#E36E4A] hover:bg-[#C4532F] disabled:opacity-50 text-white rounded-xl font-bold text-base transition-colors shadow-md min-h-[48px] flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>{submitting ? 'Publicando…' : 'Publicar'}</span>
          </button>
        </div>
      )}

      {/* Error messages */}
      {authError && (
        <p className="mt-3 text-sm text-red-600 font-medium">
          <Link href="/login" className="underline">Iniciá sesión</Link> para publicar.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>}

      {!expanded && (
        <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#E36E4A] hover:bg-[#C4532F] disabled:opacity-50 text-white rounded-xl font-bold text-base transition-colors shadow-md min-h-[48px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>{submitting ? 'Publicando…' : 'Publicar'}</span>
          </button>
        </div>
      )}
    </form>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const HomeClient = () => {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const { posts, loading, prependPost, toggleLike, incrementCommentCount, deletePost } =
    useCommunityPosts(activeCategory);
  useHeartbeat();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null);
    });
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count !== null) setMemberCount(count);
      });

    // Fetch online count (seen in last 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_seen_at', tenMinutesAgo)
      .then(({ count }) => {
        if (count !== null) setOnlineCount(count);
      });
  }, []);

  return (
    <div
      className="min-h-screen bg-[#E2DDD8]"
      style={{ fontFamily: 'var(--font-nunito-sans)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Mobile nav */}
        <nav aria-label="Secciones" className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all min-h-[44px] ${
                item.active
                  ? 'bg-[#E36E4A] text-white'
                  : 'bg-white text-gray-800 border border-gray-400 hover:border-[#E36E4A] hover:text-[#C4532F]'
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex gap-5 items-start">
          {/* ── Left sidebar ─────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-5">
            <div className="bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden">
              <div className="px-4 py-3 bg-orange-100 border-b border-orange-300">
                <p className="text-xs font-black text-[#C4532F] uppercase tracking-widest">
                  Secciones
                </p>
              </div>
              <nav className="p-2 space-y-0.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-base transition-all min-h-[48px] ${
                      item.active
                        ? 'bg-[#E36E4A] text-white'
                        : 'text-gray-800 hover:bg-orange-100 hover:text-[#C4532F]'
                    }`}
                  >
                    <span className="text-xl w-7 text-center" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Center feed ──────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-5">
            <PostCreationBox onPost={prependPost} />

            {/* Category filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar por categoría">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all border-2 min-h-[44px] ${
                    activeCategory === cat.id
                      ? 'bg-[#E36E4A] text-white border-[#E36E4A] shadow-md'
                      : 'bg-white text-gray-800 border-gray-400 hover:border-[#E36E4A] hover:text-[#C4532F]'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Feed */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 animate-pulse">
                    <div className="flex gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <CommunityPostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUserId}
                    onLike={toggleLike}
                    onCommentAdded={incrementCommentCount}
                    onDelete={deletePost}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border-2 border-gray-300 shadow-md">
                <p className="text-4xl mb-3">🌍</p>
                <p className="text-gray-700 text-lg font-medium">
                  Aún no hay publicaciones en esta categoría.
                </p>
                <p className="text-gray-500 text-base mt-1">
                  ¡Sé el primero en compartir!
                </p>
              </div>
            )}
          </main>

          {/* ── Right sidebar ─────────────────────────────────────────────── */}
          <aside
            className="hidden xl:flex flex-col w-68 flex-shrink-0 sticky top-5 gap-5"
            style={{ width: '272px' }}
            aria-label="Información de la comunidad"
          >
            {/* Community info card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden">
              <div className="bg-gradient-to-br from-[#E36E4A] to-[#B8421E] p-5 text-white text-center">
                <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                  ✈️
                </div>
                <h3 className="text-xl font-bold">Viajeros Mayores</h3>
                <p className="text-white text-sm mt-1 font-medium">
                  La comunidad de viaje para mayores de 60
                </p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 text-center mb-4">
                  <div>
                    <p className="text-xl font-black text-gray-900">
                      {memberCount !== null ? memberCount.toLocaleString('es-ES') : '…'}
                    </p>
                    <p className="text-gray-600 text-xs font-bold">MIEMBROS</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-gray-900">
                      {onlineCount !== null ? onlineCount : '…'}
                    </p>
                    <p className="text-gray-600 text-xs font-bold">ONLINE</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-gray-900">3</p>
                    <p className="text-gray-600 text-xs font-bold">ADMINS</p>
                  </div>
                </div>

                <Link
                  href="/members"
                  className="block w-full py-3 mb-3 bg-white hover:bg-orange-50 text-[#C4532F] border-2 border-[#E36E4A] rounded-xl font-bold text-base text-center transition-colors min-h-[48px] flex items-center justify-center gap-2"
                >
                  <span aria-hidden="true">👥</span>
                  Ver miembros
                </Link>

                <InviteButton />
              </div>
            </div>

          </aside>
        </div>
      </div>

    </div>
  );
};

export default HomeClient;
