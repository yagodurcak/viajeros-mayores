'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Analytics ────────────────────────────────────────────────────────────────
declare const gtag: (command: string, action: string, params: Record<string, unknown>) => void;

function trackOfferClick(oferta: Oferta) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'offer_click', {
    offer_id: oferta.id,
    offer_type: oferta.tipo,
    offer_title: oferta.titulo,
    offer_badge: oferta.badge,
    offer_price: oferta.precio,
    offer_currency: oferta.moneda,
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────
type TipoOferta = 'crucero' | 'seguro' | 'hotel';

interface Oferta {
  id: string;
  tipo: TipoOferta;
  imagen: string;
  badge: string;
  badgeBg: string;
  descuento: number;
  titulo: string;
  ubicacion: string;
  duracion: string;
  descripcion: string;
  features: string[];
  precioOriginal: number;
  precio: number;
  moneda: string;
  url: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const OFERTAS: Oferta[] = [
  // Cruceros — Datos reales verificados · temporada dic 2026 · fuente: crucero.com.ar + taoticket.com
  {
    id: 'c1',
    tipo: 'crucero',
    imagen: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop&auto=format',
    badge: 'MEJOR PRECIO',
    badgeBg: 'bg-green-600',
    descuento: 40,
    titulo: 'Costa Diadema — Buenos Aires → Uruguay → Brasil',
    ubicacion: 'Buenos Aires · Montevideo · Itajaí · Santos',
    duracion: '7 noches · 22 Dic 2026',
    descripcion: 'El precio más accesible de la temporada. Regresás al mismo puerto de salida, sin complicaciones.',
    features: ['Gastronomía italiana a bordo', 'Itinerario circular desde Buenos Aires', 'Club de niños gratis (viaje familiar)'],
    precioOriginal: 1118,
    precio: 671,
    moneda: 'USD',
    url: 'https://www.crucero.com.ar/b-3295-costa-diadema/m-202612-diciembre',
  },
  {
    id: 'c2',
    tipo: 'crucero',
    imagen: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=500&fit=crop&auto=format',
    badge: 'DESDE MONTEVIDEO',
    badgeBg: 'bg-blue-600',
    descuento: 0,
    titulo: 'MSC Splendida — Montevideo → Río → Brasil',
    ubicacion: 'Montevideo · Río de Janeiro · Ilhabela · Camboriú · Punta del Este',
    duracion: '8 noches · 10 Dic 2026',
    descripcion: 'Salida desde Montevideo. Opción ideal si viajás desde Uruguay o querés evitar el aeropuerto de Buenos Aires.',
    features: ['Servicio completo en español', 'Tasas incluidas en el precio', 'Barco de clase Fantasia, 4.300 pasajeros'],
    precioOriginal: 1235,
    precio: 1235,
    moneda: 'USD',
    url: 'https://www.taoticket.com/en_US/co/msc-cruises/na/msc-splendida/december',
  },
  {
    id: 'c3',
    tipo: 'crucero',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
    badge: 'APERTURA TEMPORADA',
    badgeBg: 'bg-teal-600',
    descuento: 0,
    titulo: 'MSC Splendida — Buenos Aires → Brasil Circular',
    ubicacion: 'Buenos Aires · Río de Janeiro · Ilhabela · Camboriú · Punta del Este',
    duracion: '8 noches · 3 Dic 2026',
    descripcion: 'Primera salida de la temporada desde Buenos Aires. Ruta clásica Brasil con los mejores puertos del litoral carioca.',
    features: ['Servicio completo en español', 'Ruta más popular del Cono Sur', 'Tasas portuarias incluidas'],
    precioOriginal: 1681,
    precio: 1681,
    moneda: 'USD',
    url: 'https://www.msccruceros.com.ar/temporada-26-27',
  },
  {
    id: 'c4',
    tipo: 'crucero',
    imagen: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop&auto=format',
    badge: 'AÑO NUEVO EN BRASIL',
    badgeBg: 'bg-amber-600',
    descuento: 0,
    titulo: 'MSC Splendida — Año Nuevo en Río de Janeiro',
    ubicacion: 'Buenos Aires · Río de Janeiro · Ilhabela · Camboriú · Punta del Este',
    duracion: '8 noches · 27 Dic 2026',
    descripcion: 'Recibí el 2027 navegando frente a las costas de Brasil. Una experiencia única que tu familia va a recordar siempre.',
    features: ['Noche de Año Nuevo a bordo', 'Fuegos artificiales desde el barco', 'Servicio completo en español'],
    precioOriginal: 1849,
    precio: 1849,
    moneda: 'USD',
    url: 'https://www.crucero.com.ar/b-461-msc-splendida/d-113-sudamerica',
  },
  // Seguros — Datos verificados · mar 2026 · fuente: promociones-aereas.com.ar (Assist Card)
  {
    id: 's1',
    tipo: 'seguro',
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&auto=format',
    badge: '60% OFF',
    badgeBg: 'bg-red-500',
    descuento: 60,
    titulo: 'Hasta 60% OFF + Cuotas Sin Interés — Assist Card',
    ubicacion: 'Cualquier destino internacional',
    duracion: 'Assist Card · 3 cuotas sin interés',
    descripcion: 'El mayor descuento de la temporada. Cobertura completa para cualquier destino con pago financiado sin costo adicional.',
    features: [
      'Hasta 60% de descuento sobre tarifa base',
      '3 cuotas sin interés disponibles',
      'Atención médica 24/7 en español',
    ],
    precioOriginal: 100,
    precio: 40,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/03/asistencia-al-viajero-en-cuotas-sin-interes-av-p-4.html',
  },
  {
    id: 's2',
    tipo: 'seguro',
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&auto=format',
    badge: '50%+20% OFF',
    badgeBg: 'bg-red-500',
    descuento: 50,
    titulo: '50% OFF + 20% Extra con Cupón PROMOS20OFF',
    ubicacion: 'Cualquier destino internacional',
    duracion: 'Assist Card · 3 cuotas sin interés',
    descripcion: 'Doble descuento: primero el 50% y luego 20% adicional con el cupón. El precio más bajo posible en cuotas sin interés.',
    features: [
      'Cupón de descuento: PROMOS20OFF',
      '3 cuotas sin interés disponibles',
      'Cobertura médica y repatriación incluidas',
    ],
    precioOriginal: 100,
    precio: 40,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/03/asistencia-al-viajero-cuotas-sin-interes-2-av-p-4.html',
  },
  {
    id: 's3',
    tipo: 'seguro',
    imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=500&fit=crop&auto=format',
    badge: 'ANUAL',
    badgeBg: 'bg-amber-600',
    descuento: 40,
    titulo: 'Plan Anual — Ahorrá más de AR$ 40.000 en 3 Cuotas',
    ubicacion: 'Internacional · Viajes ilimitados',
    duracion: 'Assist Card · Anual multiviaje',
    descripcion: 'Viajás todo el año sin contratar cada vez. Pagás menos que un solo viaje largo y tenés cobertura 365 días.',
    features: [
      'Cobertura 365 días · viajes ilimitados',
      'Ahorrás más de AR$ 40.000 vs por viaje',
      '3 cuotas sin interés disponibles',
    ],
    precioOriginal: 250,
    precio: 150,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/03/ahorra-en-tu-asistencia-al-viajero-por-un-ano-y-pagala-en-cuotas-av-p.html',
  },
  // Hoteles — Datos verificados · mar 2026 · fuente: promociones-aereas.com.ar
  {
    id: 'h1',
    tipo: 'hotel',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
    badge: 'DESDE USD 160',
    badgeBg: 'bg-green-600',
    descuento: 0,
    titulo: 'Los 5 All Inclusive 5⭐ más baratos de Punta Cana',
    ubicacion: 'Punta Cana, Rep. Dominicana',
    duracion: 'All Inclusive · 5 estrellas',
    descripcion: 'Impressive, Catalonia, Bahia Principe, Riu Bambu e Iberostar. Tarifas desde USD 160 por persona.',
    features: ['Comidas y bebidas todo incluido', 'Playa privada con acceso directo', 'Actividades y entretenimiento incluidos'],
    precioOriginal: 160,
    precio: 160,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/03/los-hoteles-all-inclusive-mas-baratos-de-punta-cana-hay-tarifas-ho-p.html',
  },
  {
    id: 'h2',
    tipo: 'hotel',
    imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&auto=format',
    badge: '50% OFF',
    badgeBg: 'bg-red-500',
    descuento: 50,
    titulo: 'Riu Palace Aruba — All Inclusive 5⭐ hasta 50% OFF',
    ubicacion: 'Aruba, Caribe',
    duracion: 'All Inclusive · Hasta 3 cuotas',
    descripcion: 'El mejor resort de Aruba con descuento de hasta 50%. Playa Eagle Beach, una de las mejores del Caribe.',
    features: ['Hasta 50% de descuento', 'Hasta 3 cuotas antes del viaje', 'Playa privada Eagle Beach'],
    precioOriginal: 400,
    precio: 200,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/02/off-en-hoteles-all-inclusive-en-aruba-con-opciones-en-hasta-cuotas-ho-p-2.html',
  },
  {
    id: 'h3',
    tipo: 'hotel',
    imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop&auto=format',
    badge: 'TARIFA FLEX',
    badgeBg: 'bg-teal-600',
    descuento: 0,
    titulo: 'All Inclusive 5⭐ en Maragogi o Praia do Forte',
    ubicacion: 'Maragogi / Praia do Forte, Brasil',
    duracion: 'All Inclusive · Hasta 3 cuotas',
    descripcion: 'Las aguas más cristalinas de Brasil. Tarifa flexible con cancelación gratuita y pago en cuotas.',
    features: ['Tarifa flexible con cancelación gratuita', 'Hasta 3 cuotas antes del viaje', 'Piscinas naturales de Maragogi'],
    precioOriginal: 336,
    precio: 336,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/02/hoteles-all-inclusive-maragogi-o-praia-do-forte-en-cuotas-y-tarifa-flexible-ho-p.html',
  },
  {
    id: 'h4',
    tipo: 'hotel',
    imagen: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=500&fit=crop&auto=format',
    badge: 'PAQUETE',
    badgeBg: 'bg-blue-600',
    descuento: 0,
    titulo: 'Paquetes All Inclusive — Nordeste Brasil o Caribe',
    ubicacion: 'Maragogí · Porto de Galinhas · Caribe',
    duracion: 'All Inclusive · Vuelo + Hotel',
    descripcion: 'Paquetes completos con vuelo y hotel all inclusive. Maragogí desde USD 1.903 o Caribe desde USD 2.026.',
    features: ['Vuelo + Hotel all inclusive incluido', 'Desde USD 1.903 por persona', 'Salidas desde Buenos Aires'],
    precioOriginal: 1903,
    precio: 1903,
    moneda: 'USD',
    url: 'https://promociones-aereas.com.ar/2026/02/paquetes-all-inclusive-al-nordeste-de-brasil-o-al-caribe-las-mejores-opciones-para-los-proximos-meses-pa-p.html',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TIPO_LABEL: Record<TipoOferta, string> = {
  crucero: 'CRUCERO',
  seguro: 'SEGURO',
  hotel: 'HOTEL',
};

function fmt(n: number) {
  return n.toLocaleString('es-ES');
}

// ─── Offer Card ───────────────────────────────────────────────────────────────
function OfertaCard({ oferta }: { oferta: Oferta }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col w-72 flex-shrink-0 snap-start">
      {/* Imagen */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <Image
          src={oferta.imagen}
          alt={oferta.titulo}
          fill
          className="object-cover"
          sizes="288px"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badge categoría top-left */}
        <div className={`absolute top-3 left-3 ${oferta.badgeBg} text-white text-xs font-bold px-2.5 py-1 rounded-md`}>
          {oferta.badge}
        </div>

        {/* Descuento top-right */}
        {oferta.descuento > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{oferta.descuento}%
          </div>
        )}

        {/* Tipo bottom-left */}
        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {TIPO_LABEL[oferta.tipo]}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 min-h-[40px]">
          {oferta.titulo}
        </h3>

        <div className="flex-1" />

        {/* Precio */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          {oferta.precioOriginal > oferta.precio && (
            <p className="text-xs text-gray-400 line-through">{oferta.moneda}{fmt(oferta.precioOriginal)}</p>
          )}
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-xs text-gray-500">Desde</span>
          </div>
          <p className="text-2xl font-bold text-[#E36E4A]">
            {oferta.moneda}{fmt(oferta.precio)}
          </p>
          <p className="text-xs text-gray-400 mb-3">por persona</p>
          <a
            href={oferta.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOfferClick(oferta)}
            className="block w-full min-h-[44px] bg-[#E36E4A] hover:bg-[#C4532F] text-white text-sm font-bold rounded-xl text-center py-3 transition-colors"
          >
            Ver oferta
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Seguro Card (grid, ancho completo) ───────────────────────────────────────
function SeguroCard({ oferta }: { oferta: Oferta }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative h-36 flex-shrink-0 overflow-hidden">
        <Image src={oferta.imagen} alt={oferta.titulo} fill className="object-cover" sizes="(max-width:640px)100vw,33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className={`absolute top-3 left-3 ${oferta.badgeBg} text-white text-xs font-bold px-2.5 py-1 rounded-md`}>
          {oferta.badge}
        </div>
        {oferta.descuento > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{oferta.descuento}%
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          SEGURO
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-tight">{oferta.titulo}</h3>
        <div className="flex-1" />
        <div className="mt-4 pt-3 border-t border-gray-100">
          {oferta.precioOriginal > oferta.precio && (
            <p className="text-xs text-gray-400 line-through">{oferta.moneda}{fmt(oferta.precioOriginal)}</p>
          )}
          <p className="text-xs text-gray-500">Desde</p>
          <p className="text-2xl font-bold text-[#E36E4A]">{oferta.moneda}{fmt(oferta.precio)}</p>
          <p className="text-xs text-gray-400 mb-3">por persona</p>
          <a
            href={oferta.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOfferClick(oferta)}
            className="block w-full min-h-[44px] bg-[#E36E4A] hover:bg-[#C4532F] text-white text-sm font-bold rounded-xl text-center py-3 transition-colors"
          >
            Ver oferta
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function Carousel({ ofertas }: { ofertas: Oferta[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Arrow left */}
      <button
        onClick={() => scroll('left')}
        aria-label="Anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-100 hidden sm:flex"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 px-1"
      >
        {ofertas.map((o) => <OfertaCard key={o.id} oferta={o} />)}
      </div>

      {/* Arrow right */}
      <button
        onClick={() => scroll('right')}
        aria-label="Siguiente"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-100 hidden sm:flex"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h2 className="font-alata text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OfertasClient() {
  const cruceros = OFERTAS.filter(o => o.tipo === 'crucero');
  const seguros = OFERTAS.filter(o => o.tipo === 'seguro');
  const hoteles = OFERTAS.filter(o => o.tipo === 'hotel');

  const mes = new Date().toLocaleString('es-ES', { month: 'long', year: 'numeric' });
  const mesCap = mes.charAt(0).toUpperCase() + mes.slice(1);

  return (
    <div className="min-h-screen bg-[#F5F5F0]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#E36E4A] via-[#D45A36] to-[#B8421E] px-4 pt-10 pb-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-5">
          <span className="text-white text-sm" aria-hidden="true">✨</span>
          <span className="text-white text-sm font-semibold">Ofertas Especiales</span>
        </div>

        <h1 className="font-alata text-3xl sm:text-4xl font-bold text-white leading-tight">
          Ofertas de {mesCap}
        </h1>
        <p className="mt-3 text-base text-white/85 max-w-lg mx-auto leading-relaxed">
          Las mejores ofertas seleccionadas especialmente para vos. Cruceros, seguros, vuelos y paquetes verificados con descuentos reales de hasta 35%.
        </p>

        {/* Contadores */}
        <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
          {[
            { icon: '🚢', label: `${cruceros.length} cruceros` },
            { icon: '🛡️', label: `${seguros.length} seguros` },
            { icon: '🏨', label: `${hoteles.length} hoteles` },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <span aria-hidden="true">{icon}</span>
              <span className="text-white text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* ── Cruceros ──────────────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={
              <svg className="w-5 h-5 text-[#E36E4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            }
            title="Cruceros - Ofertas Especiales"
            subtitle="Navegá por los mejores destinos con todo incluido"
          />
          <Carousel ofertas={cruceros} />
        </section>

        {/* ── Seguros ───────────────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={
              <svg className="w-5 h-5 text-[#E36E4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Seguros de Viaje"
            subtitle="Viajá tranquilo con las mejores coberturas para mayores"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {seguros.map((o) => <SeguroCard key={o.id} oferta={o} />)}
          </div>
        </section>

        {/* ── Hoteles ────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={
              <svg className="w-5 h-5 text-[#E36E4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title="Hoteles Recomendados"
            subtitle="Hoteles verificados con accesibilidad y atención para viajeros mayores"
          />
          <Carousel ofertas={hoteles} />
        </section>

      </div>

      {/* ── Footer CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#FDF8F6] border-t border-gray-200 py-12 px-4 text-center">
        <h2 className="font-alata text-xl font-bold text-gray-900">¿No encontraste lo que buscabas?</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Explorá nuestras secciones de hoteles verificados, buscadores de vuelos recomendados, seguros especializados y excursiones curadas para viajeros mayores.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link
            href="/hoteles"
            className="min-h-[48px] px-7 py-3 bg-[#E36E4A] hover:bg-[#C4532F] text-white font-bold rounded-xl text-base transition-colors"
          >
            Ver Hoteles Verificados
          </Link>
          <Link
            href="/vuelos"
            className="min-h-[48px] px-7 py-3 border-2 border-[#E36E4A] text-[#E36E4A] hover:bg-[#E36E4A] hover:text-white font-bold rounded-xl text-base transition-colors"
          >
            Buscadores de Vuelos
          </Link>
        </div>
      </section>

    </div>
  );
}
