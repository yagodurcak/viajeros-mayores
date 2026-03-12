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

// GET /api/community/posts/[id]/comments
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await params;

  const cookieStore = await cookies();
  const supabase = makeSupabase(cookieStore);

  const { data: comments, error } = await supabase
    .from('community_post_comments')
    .select(`
      id, created_at, comment_text, parent_comment_id, user_id,
      profiles!community_post_comments_user_id_fkey (
        full_name, username, avatar_url
      )
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[community/comments GET]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comments: comments ?? [] });
}

// POST /api/community/posts/[id]/comments
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await params;

  const cookieStore = await cookies();
  const supabase = makeSupabase(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const body = await request.json() as {
    comment_text: string;
    parent_comment_id?: string;
  };

  if (!body.comment_text?.trim()) {
    return NextResponse.json({ error: 'El comentario no puede estar vacío' }, { status: 400 });
  }

  const { data: comment, error } = await supabase
    .from('community_post_comments')
    .insert({
      post_id: postId,
      user_id: user.id,
      comment_text: body.comment_text.trim(),
      parent_comment_id: body.parent_comment_id ?? null,
    })
    .select(`
      id, created_at, comment_text, parent_comment_id, user_id,
      profiles!community_post_comments_user_id_fkey (
        full_name, username, avatar_url
      )
    `)
    .single();

  if (error) {
    console.error('[community/comments POST]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment }, { status: 201 });
}
