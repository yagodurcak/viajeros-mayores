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
          } catch { /* read-only */ }
        },
      },
    }
  );
}

// POST /api/community/posts/[id]/like — toggle like
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await params;

  const cookieStore = await cookies();
  const supabase = makeSupabase(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from('community_post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    // Unlike
    await supabase
      .from('community_post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id);
  } else {
    // Like
    await supabase
      .from('community_post_likes')
      .insert({ post_id: postId, user_id: user.id });
  }

  // Count real likes and update the denormalized column
  const { count } = await supabase
    .from('community_post_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  const newCount = count ?? 0;

  await supabase
    .from('community_posts')
    .update({ likes_count: newCount })
    .eq('id', postId);

  return NextResponse.json({ liked: !existing, likesCount: newCount });
}
