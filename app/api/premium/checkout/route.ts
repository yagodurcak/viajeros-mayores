import { NextResponse } from 'next/server';
import {
  createOrder,
  encodePremiumCustomId,
} from '@/lib/paypal';

const PREMIUM_AMOUNT = '0.10'; // Prueba; volver a 19.00 para producción
const PREMIUM_DESCRIPTION =
  'Acceso Premium Viajeros Mayores - una sola vez. Acceso limitado de por vida.';

export async function POST(req: Request) {
  try {
    const { email, intendedPath } = await req.json();

    const trimmedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      );
    }

    const origin =
      req.headers.get('origin') ||
      req.headers.get('x-forwarded-host') ||
      'http://localhost:3000';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;

    const customId = encodePremiumCustomId(
      trimmedEmail,
      typeof intendedPath === 'string' ? intendedPath : '/search'
    );

    const { approveUrl } = await createOrder({
      amountValue: PREMIUM_AMOUNT,
      currencyCode: 'USD',
      returnUrl: `${baseUrl}/api/premium/capture`,
      cancelUrl: baseUrl,
      customId,
      description: PREMIUM_DESCRIPTION,
    });

    return NextResponse.json({ url: approveUrl });
  } catch (err) {
    console.error('[premium/checkout]', err);
    const message =
      err instanceof Error ? err.message : 'Error al crear el pago';
    return NextResponse.json({ message }, { status: 500 });
  }
}
