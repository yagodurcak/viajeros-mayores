'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Member {
  id: string;
  full_name: string | null;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  last_seen_at: string | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
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

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

function isOnline(lastSeen: string | null): boolean {
  if (!lastSeen) return false;
  return Date.now() - new Date(lastSeen).getTime() < 10 * 60 * 1000;
}

function joinedLabel(createdAt: string): string {
  const d = new Date(createdAt);
  return d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

// ─── Member card ───────────────────────────────────────────────────────────────
function MemberCard({ member }: { member: Member }) {
  const online = isOnline(member.last_seen_at);
  const name = member.full_name ?? member.username ?? 'Viajero';
  const initials = getInitials(name);
  const color = avatarColor(member.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-5 flex flex-col items-center gap-3 text-center min-h-[200px]">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {member.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatar_url}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div
            className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl`}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        {/* Online indicator */}
        <span
          className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-white ${
            online ? 'bg-green-500' : 'bg-gray-300'
          }`}
          aria-label={online ? 'En línea' : 'Desconectado'}
        />
      </div>

      {/* Name */}
      <div>
        <p className="font-bold text-gray-900 text-base leading-tight">
          {name}
        </p>
      </div>

      {/* Bio */}
      {member.bio && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
          {member.bio}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto pt-2 border-t border-gray-100 w-full text-center">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${online ? 'text-green-600' : 'text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-gray-300'}`} />
          {online ? 'En línea' : `Se unió en ${joinedLabel(member.created_at)}`}
        </span>
      </div>
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function MemberCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-5 flex flex-col items-center gap-3 animate-pulse min-h-[200px]">
      <div className="w-16 h-16 rounded-full bg-gray-200" />
      <div className="space-y-2 w-full">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
      <div className="space-y-1.5 w-full flex-1">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mt-auto" />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function MembersClient({ initialOnlineCount }: { initialOnlineCount: number }) {
  const [filter, setFilter] = useState<'all' | 'online'>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [onlineCount, setOnlineCount] = useState(initialOnlineCount);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(search), 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]);

  // Reset page when filter/search changes
  useEffect(() => {
    setPage(1);
    setMembers([]);
  }, [filter, debouncedSearch]);

  const fetchMembers = useCallback(async (currentPage: number, append: boolean) => {
    if (currentPage === 1 && !append) setLoading(true);
    else setLoadingMore(true);

    const params = new URLSearchParams({
      filter,
      search: debouncedSearch,
      page: String(currentPage),
    });

    const res = await fetch(`/api/members?${params}`);
    const data = await res.json() as { members?: Member[]; total?: number; error?: string };

    if (!res.ok || data.error) {
      console.error('[members]', data.error);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    setMembers((prev) => append ? [...prev, ...(data.members ?? [])] : (data.members ?? []));
    setTotal(data.total ?? 0);
    setLoading(false);
    setLoadingMore(false);
  }, [filter, debouncedSearch]);

  useEffect(() => {
    fetchMembers(page, page > 1);
  }, [fetchMembers, page]);

  // Refresh online count every 30s
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/members?filter=online&page=1');
      const data = await res.json() as { total: number };
      setOnlineCount(data.total);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const pageSize = 24;
  const hasMore = members.length < total;

  return (
    <div className="min-h-screen bg-[#E2DDD8]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 font-alata">Miembros</h1>
          <p className="text-gray-600 text-base mt-1">
            Conocé a los viajeros de nuestra comunidad
          </p>
        </div>

        {/* Filters + Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Filter pills */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-3 rounded-xl font-bold text-base transition-all min-h-[48px] border-2 ${
                filter === 'all'
                  ? 'bg-[#E36E4A] text-white border-[#E36E4A] shadow-md'
                  : 'bg-white text-gray-800 border-gray-400 hover:border-[#E36E4A] hover:text-[#C4532F]'
              }`}
            >
              Todos
              <span className="ml-2 text-sm font-semibold opacity-75">
                ({total.toLocaleString('es-ES')})
              </span>
            </button>
            <button
              onClick={() => setFilter('online')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base transition-all min-h-[48px] border-2 ${
                filter === 'online'
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-800 border-gray-400 hover:border-green-500 hover:text-green-700'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${filter === 'online' ? 'bg-white' : 'bg-green-500'}`} />
              En línea
              <span className="text-sm font-semibold opacity-75">
                ({onlineCount})
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre…"
              className="w-full pl-12 pr-4 py-3 text-base bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent min-h-[48px]"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <MemberCardSkeleton key={i} />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-md p-12 text-center">
            <p className="text-4xl mb-3">👥</p>
            <p className="text-gray-700 text-lg font-semibold">
              {filter === 'online' ? 'Nadie en línea en este momento.' : 'No se encontraron miembros.'}
            </p>
            {debouncedSearch && (
              <p className="text-gray-500 text-base mt-1">
                Probá con otro nombre.
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {members.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingMore}
                  className="px-8 py-4 bg-white border-2 border-[#E36E4A] text-[#C4532F] hover:bg-orange-50 rounded-xl font-bold text-base transition-colors min-h-[52px] disabled:opacity-50"
                >
                  {loadingMore ? 'Cargando…' : `Ver más miembros (${total - members.length} restantes)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
