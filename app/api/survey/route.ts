import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { option, other_text, page_url } = body as {
    option?: unknown;
    other_text?: unknown;
    page_url?: unknown;
  };

  if (!option || typeof option !== 'string' || option.trim() === '') {
    return NextResponse.json({ error: 'option is required' }, { status: 400 });
  }

  const validOptions = ['offers', 'tips', 'destinations', 'community', 'other'];
  if (!validOptions.includes(option.trim())) {
    return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();

  const { error } = await supabaseAdmin.from('survey_responses').insert({
    response_option: option.trim(),
    other_text:
      option === 'other' && typeof other_text === 'string' && other_text.trim()
        ? other_text.trim().slice(0, 500)
        : null,
    page_url: typeof page_url === 'string' ? page_url.slice(0, 500) : null,
  });

  if (error) {
    console.error('Survey insert error:', error);
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
