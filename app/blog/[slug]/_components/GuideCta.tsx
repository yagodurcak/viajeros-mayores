'use client';

import { useState } from 'react';

export function GuideCta({ postSlug }: { postSlug?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/guide-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, postSlug }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error ?? 'No se pudo enviar la guía');
      return;
    }

    setSuccess(true);
  }

  return (
    <>
      {/* CTA block */}
      <div className="not-prose my-6 rounded-2xl border border-orange-100 bg-orange-50 p-5">
        <p className="text-sm text-gray-700">
          📘 <span className="font-semibold">Guía gratuita:</span> beneficios
          ocultos para adultos mayores al viajar
        </p>

        <div className="mt-4">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-[#E36E4A] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#D45A36]"
          >
            Recibir la guía por email
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-600">
          Te la enviamos por mail para que la tengas a mano antes de viajar.
        </p>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setOpen(false);
            setSuccess(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(ev) => ev.stopPropagation()}
          >
            {!success ? (
              <>
                <h3 className="text-xl font-bold text-gray-900">
                  Recibí la guía gratis
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Dejanos tu email y te la enviamos.
                </p>

                <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                  <input
                    className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#E36E4A]/30"
                    placeholder="Nombre (opcional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#E36E4A]/30"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  {error && <div className="text-sm text-red-600">{error}</div>}

                  <button
                    disabled={loading}
                    className="rounded-xl bg-[#E36E4A] px-5 py-3 font-semibold text-white transition hover:bg-[#D45A36] disabled:opacity-60"
                  >
                    {loading ? 'Enviando…' : 'Enviar guía'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-sm text-gray-600 underline"
                  >
                    Cancelar
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900">
                  📩 Revisá tu correo
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Te enviamos la guía a <strong>{email}</strong>.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Si no la ves, revisá spam o promociones.
                </p>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-xl bg-[#E36E4A] px-5 py-3 font-semibold text-white transition hover:bg-[#D45A36]"
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
