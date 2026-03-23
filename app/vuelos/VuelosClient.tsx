'use client';

// ─── Analytics ────────────────────────────────────────────────────────────────
declare const gtag: (command: string, action: string, params: Record<string, unknown>) => void;

function trackFlightClick(buscador: string, url: string) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'flight_search_click', {
    search_engine: buscador,
    outbound_url: url,
    event_category: 'outbound_link',
    event_label: buscador,
  });
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const BUSCADORES = [
  {
    id: 'skyscanner',
    nombre: 'Skyscanner',
    icono: '✈️',
    estrellas: 5,
    descripcion: 'El más completo para comparar precios. Muestra aerolíneas de bajo costo y tradicionales.',
    features: ['Compara más de 1,200 aerolíneas', 'Alertas de precio gratuitas', 'Interfaz muy clara'],
    url: 'https://www.skyscanner.net',
    label: 'Buscar en Skyscanner',
  },
  {
    id: 'google-flights',
    nombre: 'Google Flights',
    icono: '🔍',
    estrellas: 5,
    descripcion: 'Rápido y preciso. Ideal para ver tendencias de precios y encontrar fechas flexibles.',
    features: ['Calendario de precios visual', 'Muy rápido', 'Predice cambios de precio'],
    url: 'https://www.google.com/flights',
    label: 'Buscar en Google Flights',
  },
  {
    id: 'kayak',
    nombre: 'Kayak',
    icono: '🛫',
    estrellas: 4,
    descripcion: 'Bueno para paquetes de vuelo + hotel. También compara alquiler de autos.',
    features: ['Filtros muy detallados', 'Paquetes combinados', 'Alertas de precio'],
    url: 'https://www.kayak.es',
    label: 'Buscar en Kayak',
  },
];

const CONSEJOS = [
  {
    icono: '🪑',
    titulo: 'Elegí asientos con más espacio',
    descripcion: 'Pagá extra por asientos en salida de emergencia o primera fila. Tu espalda te lo va a agradecer.',
  },
  {
    icono: '🧳',
    titulo: 'Viajá con equipaje despachado',
    descripcion: 'No vale la pena el estrés de cargar maletas pesadas. Despachá siempre que puedas.',
  },
  {
    icono: '🎯',
    titulo: 'Reservá vuelos directos',
    descripcion: 'Aunque cuesten un poco más, evitan el cansancio de conexiones y reducen riesgo de problemas.',
  },
  {
    icono: '⏰',
    titulo: 'Llegá con tiempo al aeropuerto',
    descripcion: 'Mínimo 3 horas para vuelos internacionales. Evitá el estrés de apurarte.',
  },
  {
    icono: '♿',
    titulo: 'Pedí asistencia si la necesitás',
    descripcion: 'La mayoría de aeropuertos ofrecen sillas de ruedas y asistencia gratuita. No dudes en pedirla.',
  },
  {
    icono: '🛡️',
    titulo: 'Comprá seguro de cancelación',
    descripcion: 'A nuestra edad, nunca sabemos. Un seguro flexible te da paz mental.',
  },
];

const CONFIANZA = [
  'Estos buscadores son usados por millones de personas y tienen años de trayectoria',
  'Nuestra comunidad los usa regularmente sin problemas',
'Si algo cambia o deja de funcionar bien, actualizamos esta página inmediatamente',
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
export default function VuelosClient() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-l-4 border-[#E36E4A] mx-4 sm:mx-6 lg:mx-auto max-w-5xl mt-8 mb-6 rounded-r-2xl px-6 py-8 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0 mt-1" aria-hidden="true">✈️</span>
          <div>
            <h1 className="font-alata text-3xl font-bold text-gray-900">
              Buscadores de Vuelos
            </h1>
            <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-2xl">
              No vendemos vuelos. Te recomendamos los <strong className="text-gray-900">mejores buscadores</strong> que usamos nosotros y nuestra comunidad de viajeros mayores. Son confiables, claros y sin sorpresas.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 pb-12">

        {/* ── Por qué no vendemos ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-[#E36E4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">¿Por qué no vendemos vuelos directamente?</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Porque somos una comunidad editorial, no una agencia. Los buscadores que recomendamos abajo tienen millones de usuarios, comparativas en tiempo real y precios actualizados. Nuestra misión es guiarte hacia las herramientas más confiables, no intermediar.
            </p>
          </div>
        </div>

        {/* ── Buscadores ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900 mb-6">
            Buscadores que recomendamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {BUSCADORES.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Recomendado
                </div>

                <span className="text-5xl mb-3" aria-hidden="true">{b.icono}</span>
                <h3 className="font-alata text-xl font-bold text-gray-900">{b.nombre}</h3>
                <Stars count={b.estrellas} />
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{b.descripcion}</p>

                <ul className="mt-4 space-y-2 flex-1">
                  {b.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackFlightClick(b.nombre, b.url)}
                  className="mt-5 flex items-center justify-center gap-2 min-h-[48px] bg-[#E36E4A] hover:bg-[#C4532F] text-white font-bold rounded-xl text-base transition-colors"
                >
                  {b.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Consejos ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900">
            Consejos para viajar en avión después de los 60
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Basados en la experiencia de nuestra comunidad de viajeros mayores
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
