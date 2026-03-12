'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

// Pages that don't require auth (auth flow pages)
const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password', '/reset-password'];

export const AuthGateModal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't block auth pages
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return null;
  // Still loading
  if (isAuthenticated === null) return null;
  // Authenticated — no gate
  if (isAuthenticated) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-gate-title"
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

      {/* Modal card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-[#E36E4A] via-[#D45A36] to-[#B8421E] px-8 py-8 text-center text-white">
          <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
            ✈️
          </div>
          <h2 id="auth-gate-title" className="text-2xl font-bold font-alata leading-tight">
            Viajeros Mayores
          </h2>
          <p className="text-white/90 text-base mt-1 font-medium">
            La comunidad de viaje para mayores de 60
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-7 text-center">
          <p className="text-gray-800 text-lg font-semibold mb-1">
            ¡Bienvenido/a!
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-7">
            Para acceder a la comunidad y disfrutar de todos nuestros contenidos,
            necesitás iniciar sesión o crear tu cuenta gratuita.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="block w-full py-4 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-base transition-colors shadow-md min-h-[52px]"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/signup"
              className="block w-full py-4 bg-white hover:bg-orange-50 text-[#C4532F] border-2 border-[#E36E4A] rounded-xl font-bold text-base transition-colors min-h-[52px]"
            >
              Crear Cuenta Gratis
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Es gratis y solo toma un minuto.
          </p>
        </div>
      </div>
    </div>
  );
};
