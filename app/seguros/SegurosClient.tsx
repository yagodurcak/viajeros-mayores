'use client';

// ─── Analytics ────────────────────────────────────────────────────────────────
declare const gtag: (command: string, action: string, params: Record<string, unknown>) => void;

function trackInsuranceClick(nombre: string, url: string) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'insurance_click', {
    insurance_provider: nombre,
    outbound_url: url,
    event_category: 'outbound_link',
    event_label: nombre,
  });
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SEGUROS = [
  { id: 'assistcard', nombre: 'Assist Card', url: 'https://www.assistcard.com' },
  { id: 'universal', nombre: 'Universal Assistance', url: 'https://www.universal-assistance.com' },
  { id: 'assist365', nombre: 'Assist 365', url: 'https://assist-365.com/' },
  { id: 'iati', nombre: 'IATI Seguros', url: 'https://www.iatiseguros.com' },
];

const QUE_CUBRIR = [
  {
    icono: '🏥',
    titulo: 'Gastos médicos en el exterior',
    descripcion: 'Lo más importante. Una hospitalización en el extranjero puede costar decenas de miles de euros. El seguro lo cubre.',
    esencial: true,
  },
  {
    icono: '✈️',
    titulo: 'Cancelación del viaje',
    descripcion: 'Si no podés viajar por enfermedad, accidente u otro imprevisto, el seguro te devuelve lo que pagaste.',
    esencial: true,
  },
  {
    icono: '🚑',
    titulo: 'Repatriación médica',
    descripcion: 'Si necesitás ser trasladado de urgencia a tu país, el costo puede ser enorme. El seguro lo paga.',
    esencial: true,
  },
  {
    icono: '🧳',
    titulo: 'Pérdida de equipaje',
    descripcion: 'Si la aerolínea pierde o daña tu maleta, recibís una compensación económica.',
    esencial: false,
  },
  {
    icono: '🦯',
    titulo: 'Asistencia para mayores',
    descripcion: 'Algunos seguros incluyen asistencia especial para personas con movilidad reducida o necesidades especiales.',
    esencial: false,
  },
  {
    icono: '📋',
    titulo: 'Enfermedades preexistentes',
    descripcion: 'Muy importante para mayores. Verificá que el seguro cubra las condiciones médicas que ya tenés.',
    esencial: true,
  },
];



const CONFIANZA = [
  'Los seguros recomendados son legalmente autorizados en España y Argentina',
  'Nuestra comunidad los usa regularmente con buenas experiencias',
  'Si algo cambia o hay problemas, actualizamos esta página de inmediato',
];


// ─── Main Component ───────────────────────────────────────────────────────────
export default function SegurosClient() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 pt-8 pb-12">

        {/* ── Aviso importante ──────────────────────────────────────────────── */}
        <div className="bg-[#E36E4A] rounded-2xl p-6 flex items-start gap-5 shadow-md">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <p className="font-alata font-bold text-white text-xl">No viajes sin seguro médico</p>
            <p className="text-white/90 mt-1.5 leading-relaxed text-base">
              Una sola noche en un hospital de Estados Unidos puede costar más de $10,000. En Europa, si salís del país, el seguro social puede no cubrir todo. <strong className="text-white">Contratá siempre un seguro antes de viajar.</strong>
            </p>
          </div>
        </div>

        {/* ── Seguros recomendados ──────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900 mb-6">
            Seguros que recomendamos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SEGUROS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackInsuranceClick(s.nombre, s.url)}
                className="bg-white rounded-2xl border-2 border-[#E36E4A]/20 shadow p-6 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:bg-[#FFF5F0] hover:border-[#E36E4A] hover:shadow-lg transition-all group"
              >
                <span className="font-alata font-bold text-gray-800 text-lg text-center leading-snug group-hover:text-[#E36E4A] transition-colors">
                  {s.nombre}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E36E4A] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Ver sitio
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Qué debe cubrir ───────────────────────────────────────────────── */}
        <section>
          <h2 className="font-alata text-2xl font-bold text-gray-900">
            ¿Qué debe cubrir tu seguro de viaje?
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Lo esencial para viajeros mayores de 60 años
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {QUE_CUBRIR.map((c) => (
              <div key={c.titulo} className="bg-white rounded-2xl border-2 border-[#E36E4A]/20 shadow p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-3xl" aria-hidden="true">{c.icono}</span>
                  {c.esencial && (
                    <span className="text-xs font-semibold bg-red-50 border border-red-200 text-red-600 px-2 py-0.5 rounded-full flex-shrink-0">
                      Esencial
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-snug">{c.titulo}</h3>
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
