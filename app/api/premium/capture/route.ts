import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  captureOrder,
  getOrderDetails,
  decodePremiumCustomId,
} from '@/lib/paypal';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://viajerosmasayores.com';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/premium/success?error=missing`);
  }

  try {
    const captured = await captureOrder(token);
    if (!captured) {
      return NextResponse.redirect(`${baseUrl}/premium/success?error=capture`);
    }

    const orderDetails = await getOrderDetails(token);
    const payload = decodePremiumCustomId(orderDetails?.custom_id);

    if (!payload?.email) {
      return NextResponse.redirect(`${baseUrl}/premium/success?error=email`);
    }

    const redirectTo = `${baseUrl}/api/auth/callback?next=${encodeURIComponent(payload.intendedPath)}`;

    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      payload.email,
      { redirectTo }
    );

    if (error) {
      console.error('[premium/capture] inviteUserByEmail failed', payload.email, error);
    }

    return NextResponse.redirect(`${baseUrl}/premium/success`);
  } catch (err) {
    console.error('[premium/capture]', err);
    return NextResponse.redirect(`${baseUrl}/premium/success?error=server`);
  }
}
