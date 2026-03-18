'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Oferta {
  id: string;
  categoria: 'paquetes' | 'hoteles' | 'vuelos' | 'cruceros';
  imagen: string;
  titulo: string;
  ubicacion: string;
  descripcion: string;
  fechas: string;
  estrellas: number;
  numResenas: number;
  precioOriginal: number;
  precioOferta: number;
  descuento: number;
  badge: string;
  badgeColor: string;
  tipoDestino: string;
  comodidades: string[];
  noches: number;
}

interface Filters {
  precioMax: number;
  duracion: string | null;
  calificaciones: number[];
  tiposDestino: string[];
  comodidades: string[];
}

type CategoriaTab = 'paquetes' | 'hoteles' | 'vuelos' | 'cruceros';
type SortOption = 'destacados' | 'precio-asc' | 'precio-desc' | 'descuento' | 'calificacion';
type ViewMode = 'grid' | 'list';

// ─── Data ─────────────────────────────────────────────────────────────────────
const OFERTAS: Oferta[] = [
  {
    id: '1',
    categoria: 'paquetes',
    imagen: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop&auto=format',
    titulo: 'Hotel Playa Bavaro',
    ubicacion: 'República Dominicana · Punta Cana',
    descripcion: 'Todo incluido · 7 noches',
    fechas: 'Salidas desde Madrid',
    estrellas: 4.5,
    numResenas: 328,
    precioOriginal: 2450,
    precioOferta: 1349,
    descuento: 45,
    badge: 'TODO INCLUIDO',
    badgeColor: 'bg-[#E36E4A]',
    tipoDestino: 'playa',
    comodidades: ['todo-incluido', 'piscina', 'spa', 'wifi'],
    noches: 7,
  },
  {
    id: '2',
    categoria: 'paquetes',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
    titulo: 'Secrets Akumal Riviera Maya',
    ubicacion: 'México · Riviera Maya',
    descripcion: 'Solo adultos · Todo incluido · 5 noches',
    fechas: 'Vuelo + Hotel',
    estrellas: 5,
    numResenas: 456,
    precioOriginal: 1890,
    precioOferta: 1249,
    descuento: 34,
    badge: 'SOLO ADULTOS',
    badgeColor: 'bg-[#C4532F]',
    tipoDestino: 'playa',
    comodidades: ['todo-incluido', 'spa', 'piscina', 'accesibilidad'],
    noches: 5,
  },
  {
    id: '3',
    categoria: 'cruceros',
    imagen: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=500&fit=crop&auto=format',
    titulo: 'Crucero Mediterráneo',
    ubicacion: 'MSC Cruceros · Barcelona - Roma',
    descripcion: '8 días / 7 noches · Pensión completa',
    fechas: 'Salidas abril-mayo',
    estrellas: 4.5,
    numResenas: 289,
    precioOriginal: 2890,
    precioOferta: 1974,
    descuento: 32,
    badge: 'MEJOR PRECIO',
    badgeColor: 'bg-teal-600',
    tipoDestino: 'cultural',
    comodidades: ['todo-incluido', 'spa', 'piscina', 'wifi'],
    noches: 7,
  },
  {
    id: '4',
    categoria: 'paquetes',
    imagen: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop&auto=format',
    titulo: 'Bangkok y Phuket',
    ubicacion: 'Tailandia · Bangkok - Phuket',
    descripcion: 'Circuito + playa · 12 días',
    fechas: 'Salidas todo el año',
    estrellas: 5,
    numResenas: 512,
    precioOriginal: 3200,
    precioOferta: 2240,
    descuento: 30,
    badge: 'OFERTA LIMITADA',
    badgeColor: 'bg-red-600',
    tipoDestino: 'aventura',
    comodidades: ['piscina', 'spa', 'wifi', 'accesibilidad'],
    noches: 12,
  },
  {
    id: '5',
    categoria: 'hoteles',
    imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&auto=format',
    titulo: 'Grand Palladium Punta Cana',
    ubicacion: 'República Dominicana · Bávaro',
    descripcion: 'Todo incluido · 8 noches · Vuelo desde Madrid',
    fechas: 'Vuelo desde Madrid',
    estrellas: 4.5,
    numResenas: 642,
    precioOriginal: 2650,
    precioOferta: 1590,
    descuento: 40,
    badge: 'SUPER OFERTA',
    badgeColor: 'bg-[#E36E4A]',
    tipoDestino: 'playa',
    comodidades: ['todo-incluido', 'piscina', 'spa', 'estacionamiento', 'wifi'],
    noches: 8,
  },
  {
    id: '6',
    categoria: 'cruceros',
    imagen: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop&auto=format',
    titulo: 'Crucero Caribe Oriental',
    ubicacion: 'Royal Caribbean · Miami - Bahamas',
    descripcion: '7 noches · Todo incluido',
    fechas: 'Salidas junio-julio',
    estrellas: 5,
    numResenas: 387,
    precioOriginal: 2100,
    precioOferta: 1365,
    descuento: 35,
    badge: 'NUEVAS FECHAS',
    badgeColor: 'bg-blue-600',
    tipoDestino: 'playa',
    comodidades: ['todo-incluido', 'piscina', 'spa', 'wifi'],
    noches: 7,
  },
  {
    id: '7',
    categoria: 'hoteles',
    imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop&auto=format',
    titulo: 'Hotel Renaissance Aruba',
    ubicacion: 'Aruba · Oranjestad',
    descripcion: 'Todo incluido · 6 noches · Incluye vuelos',
    fechas: 'Incluye vuelos',
    estrellas: 4.5,
    numResenas: 294,
    precioOriginal: 2200,
    precioOferta: 1540,
    descuento: 30,
    badge: 'ÚLTIMA HORA',
    badgeColor: 'bg-orange-500',
    tipoDestino: 'playa',
    comodidades: ['todo-incluido', 'piscina', 'spa', 'accesibilidad', 'wifi'],
    noches: 6,
  },
  {
    id: '8',
    categoria: 'vuelos',
    imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format',
    titulo: 'Madrid - Nueva York',
    ubicacion: 'Estados Unidos · Nueva York',
    descripcion: 'Vuelo directo · 5 noches hotel',
    fechas: 'Todo el año',
    estrellas: 4.5,
    numResenas: 521,
    precioOriginal: 1850,
    precioOferta: 1295,
    descuento: 30,
    badge: 'VUELO DIRECTO',
    badgeColor: 'bg-sky-600',
    tipoDestino: 'ciudad',
    comodidades: ['wifi', 'accesibilidad'],
    noches: 5,
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const CATEGORY_TABS: { id: CategoriaTab; label: string }[] = [
  { id: 'paquetes', label: 'Paquetes' },
  { id: 'hoteles', label: 'Hoteles' },
  { id: 'vuelos', label: 'Vuelos' },
  { id: 'cruceros', label: 'Cruceros' },
];

const SECONDARY_TABS = [
  { id: 'destacadas', label: 'Ofertas destacadas', count: 248, icon: '🔥' },
  { id: 'populares', label: 'Destinos populares', count: 156, icon: '🌍' },
  { id: 'temporada', label: 'Mejor temporada', count: 89, icon: '📅' },
  { id: 'recomendados', label: 'Recomendados', count: 64, icon: '⭐' },
];

const DURACIONES = [
  { id: '3-5', label: '3-5 días', min: 3, max: 5 },
  { id: '6-9', label: '6-9 días', min: 6, max: 9 },
  { id: '10-14', label: '10-14 días', min: 10, max: 14 },
  { id: '15+', label: 'Más de 15 días', min: 15, max: 999 },
];

const TIPOS_DESTINO = [
  { id: 'playa', label: 'Playa' },
  { id: 'ciudad', label: 'Ciudad' },
  { id: 'montana', label: 'Montaña' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'aventura', label: 'Aventura' },
];

const COMODIDADES_OPTIONS = [
  { id: 'todo-incluido', label: 'Todo incluido' },
  { id: 'spa', label: 'Spa' },
  { id: 'piscina', label: 'Piscina' },
  { id: 'accesibilidad', label: 'Accesibilidad' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'estacionamiento', label: 'Estacionamiento' },
];

const DEFAULT_FILTERS: Filters = {
  precioMax: 5000,
  duracion: null,
  calificaciones: [],
  tiposDestino: [],
  comodidades: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString('es-ES');
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex" aria-label={`${rating} estrellas`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-sm ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}>
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Offer Card ───────────────────────────────────────────────────────────────
function OfertaCard({ oferta, viewMode }: { oferta: Oferta; viewMode: ViewMode }) {
  const [fav, setFav] = useState(false);
  const savings = oferta.precioOriginal - oferta.precioOferta;

  if (viewMode === 'list') {
    return (
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex group">
        <div className="relative w-44 flex-shrink-0 overflow-hidden">
          <Image src={oferta.imagen} alt={oferta.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="176px" />
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">-{oferta.descuento}%</div>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-base text-gray-900 uppercase leading-tight">{oferta.titulo}</h3>
                <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1 truncate">
                  <span aria-hidden="true">📍</span>{oferta.ubicacion}
                </p>
              </div>
              <button onClick={() => setFav(!fav)} aria-label={fav ? 'Quitar favorito' : 'Añadir favorito'} className="flex-shrink-0 text-xl p-1 text-gray-400 hover:text-red-500 transition-colors">
                {fav ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Stars rating={oferta.estrellas} />
              <span className="text-sm text-gray-500">({oferta.numResenas})</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{oferta.descripcion}</p>
          </div>
          <div className="flex items-end justify-between mt-3 flex-wrap gap-3">
            <div>
              <p className="text-xs text-gray-500">Precio final por persona</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-bold text-[#E36E4A]">{fmt(oferta.precioOferta)}€</span>
                <span className="text-sm text-gray-400 line-through">{fmt(oferta.precioOriginal)}€</span>
              </div>
              <p className="text-sm font-semibold text-green-700">Ahorro: {fmt(savings)}€</p>
            </div>
            <a href="#" aria-label={`Ver oferta de ${oferta.titulo}`} className="min-h-[44px] px-5 py-3 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-lg font-bold text-base transition-colors whitespace-nowrap">
              Ver oferta
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group flex flex-col">
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image src={oferta.imagen} alt={oferta.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold px-2.5 py-1 rounded">
          -{oferta.descuento}%
        </div>
        <button onClick={() => setFav(!fav)} aria-label={fav ? 'Quitar favorito' : 'Añadir favorito'} className="absolute top-2 right-2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-base shadow-sm transition-colors">
          {fav ? '❤️' : '🤍'}
        </button>
        <div className={`absolute bottom-2 left-2 ${oferta.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded`}>
          {oferta.badge}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base text-gray-900 uppercase leading-tight">{oferta.titulo}</h3>
        <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
          <span aria-hidden="true">📍</span>{oferta.ubicacion}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <Stars rating={oferta.estrellas} />
          <span className="text-sm text-gray-500">({oferta.numResenas})</span>
        </div>
        <p className="text-sm text-gray-600 mt-1.5">{oferta.descripcion}</p>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <span aria-hidden="true">📅</span>{oferta.fechas}
        </p>

        <div className="flex-1" />

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Precio final por persona</p>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-400 line-through">{fmt(oferta.precioOriginal)}€</span>
            <span className="text-xl font-bold text-[#E36E4A]">{fmt(oferta.precioOferta)}€</span>
          </div>
          <p className="text-sm font-semibold text-green-700 mt-0.5">Ahorro: {fmt(savings)}€</p>
          <a href="#" aria-label={`Ver oferta de ${oferta.titulo}`} className="block w-full mt-3 min-h-[44px] px-4 py-3 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-lg font-bold text-base text-center transition-colors">
            Ver oferta
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
function FilterSidebar({
  filters,
  setFilters,
  hasActive,
  onClear,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  hasActive: boolean;
  onClear: () => void;
}) {
  const toggle = (key: 'tiposDestino' | 'comodidades' | 'calificaciones', val: string | number) => {
    setFilters((prev) => {
      const arr = prev[key] as (string | number)[];
      return {
        ...prev,
        [key]: arr.includes(val as never) ? arr.filter((v) => v !== val) : [...arr, val],
      };
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base text-gray-900">Filtros</h2>
        {hasActive && (
          <button onClick={onClear} className="text-sm font-semibold text-[#E36E4A] hover:text-[#C4532F] transition-colors">
            Limpiar todo
          </button>
        )}
      </div>

      {/* Price */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">Precio por persona</h3>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>USD 0</span>
          <span>USD {fmt(filters.precioMax)}</span>
        </div>
        <input
          type="range" min={500} max={5000} step={100}
          value={filters.precioMax}
          onChange={(e) => setFilters((p) => ({ ...p, precioMax: Number(e.target.value) }))}
          className="w-full h-2 accent-[#E36E4A] cursor-pointer"
          aria-label="Precio máximo por persona"
        />
        <div className="flex flex-wrap gap-1 mt-2">
          {[500, 1000, 2000, 5000].map((p) => (
            <button
              key={p}
              onClick={() => setFilters((prev) => ({ ...prev, precioMax: p }))}
              className={`text-xs px-2 py-1 rounded border transition-colors ${filters.precioMax === p ? 'bg-[#E36E4A] border-[#E36E4A] text-white' : 'border-gray-300 text-gray-600 hover:border-[#E36E4A]'}`}
            >
              {p === 5000 ? 'Todos' : `≤${fmt(p)}€`}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Duración</h3>
        {DURACIONES.map((d) => (
          <label key={d.id} className="flex items-center gap-2.5 cursor-pointer py-1 min-h-[36px]">
            <input
              type="radio" name="duracion"
              className="w-4 h-4 accent-[#E36E4A] cursor-pointer"
              checked={filters.duracion === d.id}
              onChange={() => setFilters((p) => ({ ...p, duracion: p.duracion === d.id ? null : d.id }))}
            />
            <span className="text-sm text-gray-700">{d.label}</span>
          </label>
        ))}
      </div>

      {/* Star rating */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Calificación</h3>
        {[5, 4, 3].map((stars) => (
          <label key={stars} className="flex items-center gap-2.5 cursor-pointer py-1 min-h-[36px]">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#E36E4A] cursor-pointer rounded"
              checked={filters.calificaciones.includes(stars)}
              onChange={() => toggle('calificaciones', stars)}
            />
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-base ${i < stars ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
          </label>
        ))}
      </div>

      {/* Destination type */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Tipo de destino</h3>
        {TIPOS_DESTINO.map((t) => (
          <label key={t.id} className="flex items-center gap-2.5 cursor-pointer py-1 min-h-[36px]">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#E36E4A] cursor-pointer rounded"
              checked={filters.tiposDestino.includes(t.id)}
              onChange={() => toggle('tiposDestino', t.id)}
            />
            <span className="text-sm text-gray-700">{t.label}</span>
          </label>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Comodidades</h3>
        {COMODIDADES_OPTIONS.map((c) => (
          <label key={c.id} className="flex items-center gap-2.5 cursor-pointer py-1 min-h-[36px]">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#E36E4A] cursor-pointer rounded"
              checked={filters.comodidades.includes(c.id)}
              onChange={() => toggle('comodidades', c.id)}
            />
            <span className="text-sm text-gray-700">{c.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OfertasClient() {
  const [activeCategory, setActiveCategory] = useState<CategoriaTab>('paquetes');
  const [activeSecondary, setActiveSecondary] = useState('destacadas');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('destacados');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActive =
    filters.precioMax < 5000 ||
    filters.duracion !== null ||
    filters.calificaciones.length > 0 ||
    filters.tiposDestino.length > 0 ||
    filters.comodidades.length > 0;

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    let result = OFERTAS.filter((o) => {
      if (o.precioOferta > filters.precioMax) return false;
      if (filters.duracion) {
        const d = DURACIONES.find((x) => x.id === filters.duracion);
        if (d && (o.noches < d.min || o.noches > d.max)) return false;
      }
      if (filters.calificaciones.length > 0 && !filters.calificaciones.includes(Math.round(o.estrellas))) return false;
      if (filters.tiposDestino.length > 0 && !filters.tiposDestino.includes(o.tipoDestino)) return false;
      if (filters.comodidades.length > 0 && !filters.comodidades.every((c) => o.comodidades.includes(c))) return false;
      return true;
    });

    if (sortBy === 'precio-asc') result = [...result].sort((a, b) => a.precioOferta - b.precioOferta);
    else if (sortBy === 'precio-desc') result = [...result].sort((a, b) => b.precioOferta - a.precioOferta);
    else if (sortBy === 'descuento') result = [...result].sort((a, b) => b.descuento - a.descuento);
    else if (sortBy === 'calificacion') result = [...result].sort((a, b) => b.estrellas - a.estrellas);

    return result;
  }, [filters, sortBy]);

  return (
    <div style={{ fontFamily: 'var(--font-nunito-sans)', backgroundColor: '#F5F5F0' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[360px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=800&fit=crop&auto=format"
          alt="Playa caribeña al atardecer"
          fill className="object-cover" priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 px-6 sm:px-10 py-14 max-w-xl">
          <span className="inline-block bg-[#E36E4A] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            OFERTA EXCLUSIVA
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-alata leading-tight">
            Ofertas Únicas en el Caribe
          </h1>
          <p className="mt-3 text-base text-white/85 leading-relaxed">
            Descuentos de hasta 50% en hoteles todo incluido + vuelos gratis para mayores de 60 años
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            {[
              { value: '25%', label: 'Descuento adicional' },
              { value: '7-14', label: 'noches' },
              { value: '5★', label: 'Hoteles lujo' },
            ].map((s) => (
              <div key={s.label} className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-center">
                <p className="text-lg font-bold">{s.value}</p>
                <p className="text-xs text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 min-h-[48px] px-7 py-3 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-base transition-colors flex items-center gap-2">
            Ver ofertas <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* ── Search form ───────────────────────────────────────────────────── */}
      <section className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto">
          {/* Category tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-6 py-3.5 font-semibold text-base border-b-2 transition-colors min-h-[48px] ${
                  activeCategory === cat.id
                    ? 'border-[#E36E4A] text-[#E36E4A]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Destino</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📍</span>
                  <input type="text" placeholder="¿A dónde quieres ir?" className="w-full min-h-[44px] pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Fecha de salida</label>
                <input type="date" className="w-full min-h-[44px] px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Fecha de regreso</label>
                <input type="date" className="w-full min-h-[44px] px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Pasajeros</label>
                <select className="w-full min-h-[44px] px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent">
                  <option>1 adulto</option>
                  <option>2 adultos</option>
                  <option>3 adultos</option>
                  <option>4 adultos</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Tipo de viaje</label>
                <select className="w-full min-h-[44px] px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent">
                  <option>Ida y vuelta</option>
                  <option>Solo ida</option>
                  <option>Solo hotel</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button className="w-full min-h-[44px] px-5 py-2.5 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-lg font-bold text-base transition-colors">
                  Buscar
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-5 mt-3 pt-3 border-t border-gray-100">
              {[
                { id: 'mayores', label: 'Solo ofertas para mayores de 60', defaultChecked: true },
                { id: 'directo', label: 'Vuelo directo', defaultChecked: false },
                { id: 'asistencia', label: 'Incluir asistencia al viajero', defaultChecked: false },
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                  <input type="checkbox" className="w-4 h-4 accent-[#E36E4A] cursor-pointer" defaultChecked={opt.defaultChecked} />
                  <span className="text-sm text-gray-600">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Secondary tabs ────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex">
            {SECONDARY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSecondary(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors min-h-[48px] ${
                  activeSecondary === tab.id
                    ? 'border-[#E36E4A] text-[#E36E4A]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span aria-hidden="true">{tab.icon}</span>
                {tab.label}
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeSecondary === tab.id ? 'bg-[#E36E4A] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} hasActive={hasActive} onClear={clearFilters} />
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 min-h-[44px] px-4 py-2.5 border border-gray-300 rounded-lg text-base font-semibold text-gray-700 hover:border-[#E36E4A] hover:text-[#E36E4A] transition-colors mb-4"
            >
              <span aria-hidden="true">⚙️</span>
              Filtros
              {hasActive && (
                <span className="w-5 h-5 bg-[#E36E4A] rounded-full text-white text-xs flex items-center justify-center font-bold">!</span>
              )}
            </button>

            {/* Mobile filter panel */}
            {showMobileFilters && (
              <div className="lg:hidden mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-gray-900">Filtros</span>
                  <button onClick={() => setShowMobileFilters(false)} className="text-sm text-gray-500 underline">Cerrar</button>
                </div>
                <FilterSidebar filters={filters} setFilters={setFilters} hasActive={hasActive} onClear={clearFilters} />
              </div>
            )}

            {/* Results header */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <p className="text-base text-gray-700">
                <span className="font-bold text-gray-900">{filtered.length}</span> ofertas encontradas
              </p>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="min-h-[40px] border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#E36E4A] focus:outline-none"
                >
                  <option value="destacados">Destacados</option>
                  <option value="precio-asc">Menor precio</option>
                  <option value="precio-desc">Mayor precio</option>
                  <option value="descuento">Mayor descuento</option>
                  <option value="calificacion">Mejor calificación</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')} aria-label="Vista cuadrícula" aria-pressed={viewMode === 'grid'}
                    className={`min-h-[40px] px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-[#E36E4A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')} aria-label="Vista lista" aria-pressed={viewMode === 'list'}
                    className={`min-h-[40px] px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-[#E36E4A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
                <p className="text-lg font-semibold text-gray-700">No hay ofertas con estos filtros</p>
                <p className="text-base text-gray-500 mt-1">Prueba ajustando los filtros</p>
                <button onClick={clearFilters} className="mt-5 min-h-[44px] px-6 py-3 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-base transition-colors">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'flex flex-col gap-4'}>
                {filtered.map((o) => <OfertaCard key={o.id} oferta={o} viewMode={viewMode} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Alert signup ──────────────────────────────────────────────────── */}
      <AlertBanner />
    </div>
  );
}

// ─── Alert Banner ─────────────────────────────────────────────────────────────
function AlertBanner() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch('/api/lead-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'ofertas-alert' }),
      });
    } catch (_err) { /* best effort */ }
    setSent(true);
  };

  return (
    <section className="bg-white border-t border-gray-200 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-3xl mb-3" aria-hidden="true">🔔</p>
        <h2 className="text-2xl font-bold text-gray-900 font-alata">¿No encontraste lo que buscabas?</h2>
        <p className="text-base text-gray-600 mt-2 leading-relaxed">Déjanos tu correo y te avisamos cuando lleguen nuevas ofertas para tu destino favorito.</p>
        {sent ? (
          <div className="mt-6 flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-5">
            <span className="text-2xl" aria-hidden="true">✅</span>
            <div className="text-left">
              <p className="text-base font-bold text-green-800">¡Listo! Te avisaremos cuando haya nuevas ofertas.</p>
              <p className="text-sm text-green-700 mt-0.5">Revisa tu correo para confirmar la suscripción.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="alert-email" className="sr-only">Tu correo electrónico</label>
            <input id="alert-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required className="flex-1 min-h-[52px] rounded-xl border border-gray-300 px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E36E4A] focus:border-transparent" />
            <button type="submit" className="min-h-[52px] px-6 py-3 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-base transition-colors whitespace-nowrap">
              Quiero avisos
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
