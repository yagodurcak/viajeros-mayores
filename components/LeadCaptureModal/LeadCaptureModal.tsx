'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lead_modal_dismissed';

export const LeadCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setIsOpen(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/lead-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        name: name.trim() || undefined,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error ?? 'No se pudo guardar. Intentá de nuevo.');
      return;
    }

    setSuccess(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/50 p-4 font-nunito-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(ev) => ev.stopPropagation()}
      >
        {!success ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <h2
                id="lead-modal-title"
                className="text-xl font-bold text-gray-900"
              >
                Recibí de regalo la{' '}
                <strong>Guía Beneficios en equipaje para Viajeros Mayores 2026 </strong>! 🎉
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Cerrar"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Dejá tu email y suscribite a nuestro newsletter para recibir
              novedades y noticias. De regalo te enviamos la{' '}
              <strong>
                Guía Beneficios en equipaje para Viajeros Mayores 2026 
              </strong>
              .
            </p>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
              <input
                type="text"
                autoComplete="name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E36E4A] focus:ring-2 focus:ring-[#E36E4A]/20"
                placeholder="Tu nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                autoComplete="email"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#E36E4A] focus:ring-2 focus:ring-[#E36E4A]/20"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#E36E4A] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#D45A36] disabled:opacity-60"
              >
                {loading ? 'Guardando…' : 'Quiero la guía y suscribirme'}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="text-sm text-gray-500 underline transition hover:text-gray-700"
              >
                Ahora no, gracias
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <h2
                id="lead-modal-title"
                className="text-xl font-bold text-gray-900"
              >
                ¡Tu guía va en camino! ✈️
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Cerrar"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <p>
                Si querés{' '}
                <strong>ahorrar más dinero en tus viajes</strong>, investigué
                mucho y creé una guía de los{' '}
                <strong>
                  Beneficios que ofrecen las Aerolíneas más conocidas para
                  viajeros mayores 2026
                </strong>{' '}
                (Copa Airlines, LATAM, Avianca, Aeromexico, Aerolíneas
                Argentinas, Iberia).
              </p>
              <p>
                Es un <strong>PDF descargable</strong> donde desarrollo sobre:
              </p>
              <ul className="list-inside list-disc space-y-1 pl-2 text-gray-600">
                <li>Descuentos en pasajes</li>
                <li>Guía paso a paso de como pedirlos</li>
                <li>Datos de contacto de cada aerolínea</li>
                <li>Checklist completo para repasar antes de viajar</li>
                <li>Asistencia en aeropuerto</li>
              </ul>
              <p className="text-base font-semibold text-gray-900">
                Todo eso a solo{' '}
                <span className="text-[#E36E4A]">USD 9</span>.
              </p>
            </div>
            <a
              href="https://www.paypal.com/ncp/payment/XK86A59T5DCYC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-full rounded-xl bg-[#E36E4A] px-5 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-[#D45A36]"
            >
              Quiero la guía por USD 9 →
            </a>
            <button
              type="button"
              onClick={closeModal}
              className="mt-3 w-full text-sm text-gray-500 underline transition hover:text-gray-700"
            >
              Ahora no, gracias
            </button>
          </>
        )}
      </div>
    </div>
  );
};
