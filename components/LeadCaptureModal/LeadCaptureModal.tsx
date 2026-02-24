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
                <strong>Guía de descuentos en vuelos 2026</strong>! 🎉
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
                Guía de descuentos en vuelos para viajeros mayores 2026
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
                ¡Excelente! Tu Guía de descuentos en vuelos 2026 está viajando a
                tu bandeja de entrada. ✈️
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
                Para asegurarte de recibirla (y que no se pierda en el{' '}
                <strong>correo no deseado</strong>):
              </p>
              <p>
                Buscá un correo de: <strong>Viajeros Mayores</strong> (
                <a
                  href="mailto:hola@viajerosmayores.com"
                  className="text-[#E36E4A] underline hover:no-underline"
                >
                  hola@viajerosmayores.com
                </a>
                ).
              </p>
              <p>
                Si no lo ves, revisá la carpeta de <strong>Spam</strong> o{' '}
                <strong>Promociones</strong>.
              </p>
              <p>
                <strong>IMPORTANTE:</strong> Arrastrá el correo a tu bandeja
                Principal; o marcálo como <strong>Remitente seguro</strong>.
                ¡Esto le avisa a tu correo que somos amigos y así no te pierdes
                futuras noticias!
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="mt-5 w-full rounded-xl bg-[#E36E4A] px-5 py-3 font-semibold text-white transition hover:bg-[#D45A36]"
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  );
};
