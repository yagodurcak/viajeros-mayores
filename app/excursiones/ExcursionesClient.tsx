'use client';

// ─── Analytics ────────────────────────────────────────────────────────────────
declare const gtag: (command: string, action: string, params: Record<string, unknown>) => void;

function trackExcursionClick(plataforma: string, url: string) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'excursion_click', {
    platform: plataforma,
    outbound_url: url,
    event_category: 'outbound_link',
    event_label: plataforma,
  });
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PLATAFORMAS = [
  {
    id: 'civitatis',
    nombre: 'Civitatis',
    icono: '🗺️',
    estrellas: 5,
    badge: 'La favorita',
    badgeColor: 'bg-orange-100 border-orange-200 text-orange-700',
    descripcion: 'La plataforma en español más completa para tours y excursiones. Guías en español en todo el mundo.',
    features: [
      'Toda la web en español',
      'Guías hispanohablantes',
      'Cancelación gratuita en la mayoría',
      'Excursiones accesibles para movilidad reducida',
    ],
    destacado: 'Todo en español — ideal si no dominás el inglés',
    url: 'https://www.civitatis.com',
    label: 'Ver excursiones en Civitatis',
  },
  {
    id: 'getyourguide',
    nombre: 'GetYourGuide',
    icono: '🎟️',
    estrellas: 5,
    badge: 'El más grande',
    badgeColor: 'bg-blue-50 border-blue-200 text-blue-700',
    descripcion: 'La plataforma de tours más grande del mundo. Millones de actividades en más de 170 países.',
    features: [
      'Mayor variedad de tours del mercado',
      'Reseñas verificadas de viajeros reales',
      'Cancelación gratuita hasta 24h antes',
      'App muy fácil de usar',
    ],
    destacado: 'La mayor selección — encontrás tours en cualquier ciudad',
    url: 'https://www.getyourguide.es',
    label: 'Ver excursiones en GetYourGuide',
  },
  {
    id: 'viator',
    nombre: 'Viator',
    icono: '🏛️',
    estrellas: 4,
    badge: 'De TripAdvisor',
    badgeColor: 'bg-green-50 border-green-200 text-green-700',
    descripcion: 'Propiedad de TripAdvisor. Miles de excursiones con reseñas detalladas y filtros de accesibilidad.',
    features: [
      'Reseñas de TripAdvisor integradas',
      'Filtros de accesibilidad',
      'Tours privados disponibles',
      'Garantía de precio más bajo',
    ],
    destacado: 'Ideal para verificar reseñas antes de reservar',
    url: 'https://www.viator.com/es-ES',
    label: 'Ver excursiones en Viator',
  },
];

const TIPOS_EXCURSION = [
  {
    icono: '🚌',
    titulo: 'Tours en bus con paradas',
    descripcion: 'Perfectos para conocer una ciudad sin cansarse. Podés subir y bajar en cada parada.',
    nivel: 'Fácil',
    nivelColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    icono: '🚢',
    titulo: 'Excursiones desde crucero',
    descripcion: 'Organizadas especialmente para pasajeros de crucero. Sincronizadas con los horarios del barco.',
    nivel: 'Fácil',
    nivelColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    icono: '🏛️',
    titulo: 'Visitas guiadas a museos',
    descripcion: 'Con guía especializado que explica todo en detalle. Entrada incluida en la mayoría.',
    nivel: 'Fácil',
    nivelColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    icono: '🍷',
    titulo: 'Tours gastronómicos',
    descripcion: 'Recorridos por mercados, restaurantes y bodegas. Combinan cultura y gastronomía local.',
    nivel: 'Fácil',
    nivelColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    icono: '🚗',
    titulo: 'Excursiones en auto privado',
    descripcion: 'Con chofer y guía solo para vos o tu grupo. La opción más cómoda y flexible.',
    nivel: 'Muy fácil',
    nivelColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    icono: '🌿',
    titulo: 'Paseos en barco o gondola',
    descripcion: 'Navegaciones tranquilas por ríos, canales o bahías. Sin esfuerzo físico.',
    nivel: 'Muy fácil',
    nivelColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
];

const CONSEJOS = [
  {
    icono: '♿',
    titulo: 'Filtrá por accesibilidad',
    descripcion: 'Civitatis y Viator tienen filtros para excursiones aptas para movilidad reducida o silla de ruedas.',
  },
  {
    icono: '📅',
    titulo: 'Reservá con anticipación',
    descripcion: 'Los mejores tours se llenan rápido, especialmente en temporada alta. Reservá apenas sepas las fechas.',
  },
  {
    icono: '🗣️',
    titulo: 'Elegí tours en español',
    descripcion: 'En Civitatis encontrás casi todo en español. En GetYourGuide filtrá por idioma del guía.',
  },
  {
    icono: '👥',
    titulo: 'Grupos pequeños',
    descripcion: 'Buscá tours con grupos de máximo 15-20 personas. Más cómodos y mejor atención del guía.',
  },
  {
    icono: '⭐',
    titulo: 'Leé las reseñas',
    descripcion: 'Mirá qué dicen otros viajeros mayores. Muchos dejan comentarios específicos sobre comodidad y ritmo.',
  },
  {
    icono: '🔄',
    titulo: 'Elegí con cancelación gratis',
    descripcion: 'Ante cualquier imprevisto de salud, podés cancelar sin perder el dinero. Siempre verificalo.',
  },
];

const CONFIANZA = [
  'Civitatis, GetYourGuide y Viator son plataformas globales con millones de usuarios',
  'Nuestra comunidad las usa regularmente para planificar excursiones',
  'No nos pagan por recomendarlas — las elegimos porque funcionan bien',
  'Las reseñas en estas plataformas son de viajeros reales verificados',
];

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} estrellas de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-5 h-5 ${i <= count ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExcursionesClient() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-l-4 border-[#E36E4A] mx-4 sm:mx-6 lg:mx-auto max-w-5xl mt-8 mb-6 rounded-r-2xl px-6 py-8 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0 mt-1" aria-hidden="true">🗺️</span>
          <div>
            <h1 className="font-alata text-3xl font-bold text-gray-900">
              Excursiones y Tours para Mayores
            </h1>
            <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-2xl">
              No organizamos excursiones nosotros. Te recomendamos las <strong className="text-gray-900">mejores plataformas</strong> para encontrar tours cómodos, en español y pensados para viajeros mayores de 60.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 pb-12">

        {/* ── Dato clave ────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-[#E36E4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">Consejo de nuestra comunidad</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Para viajeros mayores, recomendamos siempre tours con grupos pequeños (máximo 15 personas), guía en español, y con opción de cancelación gratuita. Civitatis suele ser la primera opción por todo esto.
            </p>
          </div>
        </div>

        {/* ── Plataformas ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900 mb-6">
            Plataformas que recomendamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PLATAFORMAS.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
                {/* Badge */}
                <div className={`inline-flex items-center gap-1.5 border text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${p.badgeColor}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {p.badge}
                </div>

                <span className="text-5xl mb-3" aria-hidden="true">{p.icono}</span>
                <h3 className="font-alata text-xl font-bold text-gray-900">{p.nombre}</h3>
                <Stars count={p.estrellas} />
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{p.descripcion}</p>

                {/* Dato destacado */}
                <div className="mt-4 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2">
                  <p className="text-sm font-semibold text-[#E36E4A] leading-snug">{p.destacado}</p>
                </div>

                <ul className="mt-4 space-y-2 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExcursionClick(p.nombre, p.url)}
                  className="mt-5 flex items-center justify-center gap-2 min-h-[48px] bg-[#E36E4A] hover:bg-[#C4532F] text-white font-bold rounded-xl text-base transition-colors"
                >
                  {p.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tipos de excursión ────────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900">
            Tipos de excursiones ideales para mayores
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Cómodas, sin ajetreos y con el ritmo que necesitás
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TIPOS_EXCURSION.map((t) => (
              <div key={t.titulo} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-3xl" aria-hidden="true">{t.icono}</span>
                  <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full flex-shrink-0 ${t.nivelColor}`}>
                    {t.nivel}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-snug">{t.titulo}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{t.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Consejos ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900">
            Consejos para reservar excursiones siendo mayor
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Lo que aprendimos de nuestra comunidad de viajeros
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONSEJOS.map((c) => (
              <div key={c.titulo} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <span className="text-3xl" aria-hidden="true">{c.icono}</span>
                <h3 className="font-bold text-gray-900 text-base mt-3 leading-snug">{c.titulo}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{c.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Confianza ────────────────────────────────────────────────────── */}
        <section className="bg-[#FFF5F0] rounded-2xl border border-orange-100 p-6 sm:p-8">
          <h2 className="font-alata text-xl font-bold text-gray-900 mb-5">
            ¿Por qué confiar en nuestras recomendaciones?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONFIANZA.map((texto) => (
              <div key={texto} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-700 leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
