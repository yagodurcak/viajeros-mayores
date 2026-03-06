'use client';

import { useState } from 'react';

export function GuideBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-white shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3">
        <span className="text-lg">✈️</span>
        <p className="text-center text-sm font-medium sm:text-base">
          <span className="font-bold">Guía Maestra de ahorro y beneficios aéreos 2026</span>
          {' — '}Descuentos de hasta 50%, asistencia y más para viajeros mayores.{' '}
          <a
            href="https://www.paypal.com/ncp/payment/XK86A59T5DCYC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-white px-3 py-0.5 text-sm font-bold text-orange-500 transition hover:bg-orange-50"
          >
            Conseguila por solo USD 9 → 
          </a>
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Cerrar banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/80 transition hover:text-white"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
}
