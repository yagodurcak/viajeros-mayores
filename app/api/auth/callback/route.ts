// app/api/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const cookieStore = await cookies();
    const response = NextResponse.redirect(`${requestUrl.origin}${next}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Verificar si es un reset de contraseña (tipo de evento recovery)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Si hay una sesión y viene de un recovery, redirigir a reset-password
      if (session) {
        // Verificar si hay un evento de tipo recovery
        const isPasswordRecovery =
          requestUrl.searchParams.get('type') === 'recovery';
        if (isPasswordRecovery) {
          const recoveryResponse = NextResponse.redirect(
            `${requestUrl.origin}/reset-password`
          );
          // Copy all cookies from the original response
          response.cookies.getAll().forEach((cookie) => {
            recoveryResponse.cookies.set(cookie);
          });
          return recoveryResponse;
        }
      }

      return response;
    }
  }

  // Si hay un error o no hay code, redirigir a la página de error o home
  return NextResponse.redirect(requestUrl.origin);
}
