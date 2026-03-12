import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function makeSupabase(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* read-only in Server Components */ }
        },
      },
    }
  );
}

// ── GET /api/community/posts ──────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 20;
  const offset = (page - 1) * limit;

  const cookieStore = await cookies();
  const supabase = makeSupabase(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase
    .from('community_posts')
    .select(`
      id, created_at, user_id, title, content, category,
      location, travel_date, likes_count, comments_count,
      profiles!community_posts_user_id_fkey (
        full_name, username, avatar_url
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (category && category !== 'todas') {
    query = query.eq('category', category);
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error('[community/posts GET]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If logged in, find which posts the user has already liked
  let likedPostIds: string[] = [];
  if (user && posts && posts.length > 0) {
    const postIds = posts.map((p) => p.id);
    const { data: likes } = await supabase
      .from('community_post_likes')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);
    likedPostIds = (likes ?? []).map((l) => l.post_id);
  }

  const enriched = (posts ?? []).map((p) => ({
    ...p,
    liked_by_me: likedPostIds.includes(p.id),
  }));

  return NextResponse.json({ posts: enriched, page, limit });
}

// ── POST /api/community/posts ─────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = makeSupabase(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const body = await request.json() as {
    title?: string;
    content: string;
    category: string;
    location?: string;
    travel_date?: string;
  };

  if (!body.content?.trim()) {
    return NextResponse.json({ error: 'El contenido es requerido' }, { status: 400 });
  }
  if (!body.category) {
    return NextResponse.json({ error: 'La categoría es requerida' }, { status: 400 });
  }

  const { data: post, error } = await supabase
    .from('community_posts')
    .insert({
      user_id: user.id,
      title: body.title?.trim() || null,
      content: body.content.trim(),
      category: body.category,
      location: body.location?.trim() || null,
      travel_date: body.travel_date || null,
    })
    .select(`
      id, created_at, user_id, title, content, category,
      location, travel_date, likes_count, comments_count,
      profiles!community_posts_user_id_fkey (
        full_name, username, avatar_url
      )
    `)
    .single();

  if (error) {
    console.error('[community/posts POST]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: { ...post, liked_by_me: false } }, { status: 201 });
}
