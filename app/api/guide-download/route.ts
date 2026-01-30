import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email, name, postSlug } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // 1) Guardar lead
    await supabaseAdmin.from('leads').upsert(
      {
        email,
        name: name ?? null,
        source: 'blog_post',
        post_slug: postSlug ?? null,
      },
      { onConflict: 'email' }
    );

    // 2) Crear signed URL (24 hs)
    const { data } = await supabaseAdmin.storage
      .from('guides')
      .createSignedUrl('descuentos-adultos-mayores-al-volar.pdf', 60 * 60 * 24);

    if (!data?.signedUrl) {
      return NextResponse.json(
        { error: 'No se pudo generar el link' },
        { status: 500 }
      );
    }

    // 3) Enviar email
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Tu guía: descuentos ocultos para adultos mayores',
      html: `
        <p>Hola${name ? ` ${name}` : ''},</p>

        <p>Tal como prometimos, acá tenés la guía gratuita con los beneficios
        que muchas personas mayores no saben que pueden pedir al viajar.</p>

        <p>
          👉 <a href="${data.signedUrl}" target="_blank">
            Descargar la guía
          </a>
        </p>

        <p>Guardala para revisarla antes de comprar pasajes.</p>con el codigo 

        <p>Buen viaje,<br/>
        Viajeros Mayores</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}
