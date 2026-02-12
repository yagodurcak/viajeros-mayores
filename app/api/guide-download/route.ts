// app/api/guide-download/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getGuideConfig } from '@/lib/guide-config';

export const runtime = 'nodejs';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const BUCKET = 'guides';

/** Escapar HTML para evitar XSS en el cuerpo del mail */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    const { email, name, postSlug, guideKey } = await req.json();

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Falta email' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName =
      name != null && typeof name === 'string' ? name.trim() || null : null;
    const slug =
      typeof postSlug === 'string' && postSlug.trim()
        ? postSlug.trim().slice(0, 500)
        : null;

    const guide = getGuideConfig(guideKey ?? null);
    const filePath = guide.filePath;

    // 1) Guardar lead
    await supabaseAdmin.from('leads').insert({
      email: trimmedEmail,
      name: trimmedName,
      source: 'blog_post',
      post_slug: slug,
    });

    // 2) Signed URL del PDF en storage
    const { data: signed, error: signedError } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(filePath, 60 * 60); // 1 hora

    if (signedError || !signed?.signedUrl) {
      console.error('[guide-download] signed url error', signedError);
      return NextResponse.json(
        { error: 'No se pudo generar el link de descarga' },
        { status: 500 }
      );
    }

    const signedUrl = signed.signedUrl;

    // 3) Enviar email (nombre escapado para evitar XSS)
    const from = process.env.EMAIL_FROM;
    if (!from) {
      console.error('[guide-download] EMAIL_FROM missing');
      return NextResponse.json({ ok: true, signedUrl });
    }

    const safeNameForHtml = trimmedName ? escapeHtml(trimmedName) : '';

    try {
      await resend.emails.send({
        from,
        to: trimmedEmail,
        subject: guide.subject,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>¡Listo${safeNameForHtml ? `, ${safeNameForHtml}` : ''}!</h2>
            <p>Acá tenés el link para descargar la guía gratuita:</p>
            <p>
              <a href="${signedUrl}" target="_blank" rel="noreferrer">
                ${escapeHtml(guide.linkLabel)}
              </a>
            </p>
            <p style="font-size:12px;color:#666;">
              Este link expira en 1 hora. Si vence, volvé al artículo y pedila otra vez.
            </p>
          </div>
        `,
      });
    } catch (e) {
      console.error('[guide-download] resend error', e);
    }

    return NextResponse.json({ ok: true, signedUrl });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Error inesperado';
    console.error('[guide-download] fatal error', e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
