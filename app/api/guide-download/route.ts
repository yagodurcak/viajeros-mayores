// app/api/guide-download/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const runtime = 'nodejs'; // importante para libs como Resend

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, postSlug } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Falta email' }, { status: 400 });
    }

    // 1) Guardar lead
    await supabaseAdmin.from('leads').insert({
      email,
      name: name ?? null,
      source: 'blog_post',
      post_slug: postSlug ?? null,
    });

    // 2) Crear signed URL (de tu PDF en storage)
    // Ajustá bucket y path:
    const bucket = 'guides';
    const filePath = 'descuentos-adultos-mayores-al-volar.pdf';

    const { data: signed, error: signedError } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60); // 1 hora

    if (signedError || !signed?.signedUrl) {
      console.error('[guide-download] signed url error', signedError);
      return NextResponse.json(
        { error: 'No se pudo generar el link de descarga' },
        { status: 500 }
      );
    }

    const signedUrl = signed.signedUrl;

    // 3) Enviar email (si falla, no cortamos el flujo)
    const from = process.env.EMAIL_FROM;
    if (!from) {
      console.error('[guide-download] EMAIL_FROM missing');
      // Devolvemos igual para no romper UX
      return NextResponse.json({ ok: true, signedUrl });
    }

    try {
      const sendResult = await resend.emails.send({
        from,
        to: email,
        subject: 'Tu guía gratuita (Viajeros Mayores) 📘',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>¡Listo${name ? `, ${name}` : ''}!</h2>
            <p>Acá tenés el link para descargar la guía gratuita:</p>
            <p>
              <a href="${signedUrl}" target="_blank" rel="noreferrer">
                Descargar guía
              </a>
            </p>
            <p style="font-size:12px;color:#666;">
              Este link expira en 1 hora. Si vence, volvé al artículo y pedila otra vez.
            </p>
          </div>
        `,
      });

      console.log('[guide-download] resend ok', sendResult);
    } catch (e) {
      console.error('[guide-download] resend error', e);
    }

    // 4) Respuesta
    return NextResponse.json({ ok: true, signedUrl });
  } catch (e: any) {
    console.error('[guide-download] fatal error', e);
    return NextResponse.json(
      { error: e?.message ?? 'Error inesperado' },
      { status: 500 }
    );
  }
}
