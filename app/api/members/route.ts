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

// GET /api/members?filter=all|online&search=&page=1
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') ?? 'all';
  const search = searchParams.get('search') ?? '';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const pageSize = 24;

  const cookieStore = await cookies();
  const supabase = makeSupabase(cookieStore);

  let query = supabase
    .from('profiles')
    .select('id, full_name, username, avatar_url, bio, created_at, last_seen_at', { count: 'exact' })
    .order('last_seen_at', { ascending: false, nullsFirst: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (filter === 'online') {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    query = query.gte('last_seen_at', tenMinutesAgo);
  }

  if (search.trim()) {
    query = query.ilike('full_name', `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('[api/members]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ members: data ?? [], total: count ?? 0, page, pageSize });
}
