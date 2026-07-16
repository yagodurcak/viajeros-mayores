import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sitio en mantenimiento — Viajeros Mayores',
  description: 'Estamos trabajando para mejorar tu experiencia. Volvemos pronto.',
  robots: { index: false, follow: false },
};

export default function MantenimientoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg w-full flex flex-col items-center gap-8">
        <Image
          src="/images/logo.png"
          alt="Viajeros Mayores"
          width={180}
          height={60}
          priority
          className="object-contain"
        />

        <div className="text-6xl">✈️</div>

        <div className="flex flex-col gap-3">
          <h1 className="font-alata text-3xl md:text-4xl text-gray-800">
            Estamos mejorando tu experiencia
          </h1>
          <p className="font-nunito-sans text-lg text-gray-600 leading-relaxed">
            Nuestro sitio se encuentra temporalmente en mantenimiento.
            <br />
            Volveremos muy pronto con novedades para vos.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-5 py-2.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-nunito-sans text-sm font-semibold text-amber-800">
            Volvemos pronto
          </span>
        </div>

        <p className="font-nunito-sans text-sm text-gray-400">
          ¿Consultas?{' '}
          <a
            href="mailto:hola@viajerosmasayores.com"
            className="text-sky-600 hover:underline"
          >
            hola@viajerosmasayores.com
          </a>
        </p>
      </div>
    </main>
  );
}
