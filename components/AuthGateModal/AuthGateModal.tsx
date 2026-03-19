'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export const AuthGateModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('show-auth-modal', handler);
    return () => window.removeEventListener('show-auth-modal', handler);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-gate-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors shadow"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

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
            ¡Únete a la comunidad!
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-7">
            Para comentar, dar me gusta y publicar en el feed necesitás iniciar
            sesión o crear tu cuenta gratuita.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-base transition-colors shadow-md min-h-[52px]"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
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
