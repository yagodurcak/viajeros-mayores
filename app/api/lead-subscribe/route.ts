// app/api/lead-subscribe/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'El email es obligatorio' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = typeof name === 'string' ? name.trim() || null : null;

    await supabaseAdmin.from('leads').insert({
      email: trimmedEmail,
      name: trimmedName,
      source: 'modal_opt_in',
      post_slug: null,
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Error inesperado';
    console.error('[lead-subscribe] error', e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
