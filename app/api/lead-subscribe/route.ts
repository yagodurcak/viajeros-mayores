// app/api/lead-subscribe/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const WELCOME_GUIDE_FILE = 'guia-de-beneficios-aereos.pdf';
const BUCKET = 'guides';
const SIGNED_URL_EXPIRY_SEC = 24 * 60 * 60; // 24 horas

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
    const { email, name } = await req.json();

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'El email es obligatorio' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = typeof name === 'string' ? name.trim() || null : null;

    await supabaseAdmin.from('leads').insert({
      email: trimmedEmail,
      name: trimmedName,
      source: 'modal_opt_in',
      post_slug: null,
    });

    const from = process.env.EMAIL_FROM;
    if (from && process.env.RESEND_API_KEY) {
      const { data: signed, error: signedError } = await supabaseAdmin.storage
        .from(BUCKET)
        .createSignedUrl(WELCOME_GUIDE_FILE, SIGNED_URL_EXPIRY_SEC);

      if (!signedError && signed?.signedUrl) {
        const safeName = trimmedName ? escapeHtml(trimmedName) : '';
        try {
          await resend.emails.send({
            from,
            to: trimmedEmail,
            subject:
              'Tu Guía de descuentos en vuelos 2026 (Viajeros Mayores) ✈️',
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>¡Bienvenido${safeName ? `, ${safeName}` : ''}!</h2>
                <p>Gracias por suscribirte. Te enviamos de regalo la <strong>Guía de descuentos en vuelos para viajeros mayores 2026</strong>.</p>
                <p>
                  <a href="${signed.signedUrl}" target="_blank" rel="noreferrer" style="display:inline-block; background:#E36E4A; color:#fff; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold;">
                    Descargar la guía (PDF)
                  </a>
                </p>
                <p style="font-size:12px;color:#666;">
                  Este enlace es válido por 24 horas. Si no ves el correo en tu bandeja principal, marcá a hola@viajerosmayores.com como remitente seguro.
                </p>
                <p>¡Nos vemos en el próximo newsletter!</p>
              </div>
            `,
          });
        } catch (e) {
          console.error('[lead-subscribe] resend error', e);
        }
      } else {
        console.error('[lead-subscribe] signed url error', signedError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Error inesperado';
    console.error('[lead-subscribe] error', e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
