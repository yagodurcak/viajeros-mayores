'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Hotel {
  id: string;
  nombre: string;
  ciudad: string;
  pais: string;
  paisId: string;
  imagen: string;
  rating: number;
  opiniones: number;
  porQueLoRecomiendo: string;
  amenities: string[];
  notaAccesibilidad: string;
  precioPorNoche: number;
  bookingUrl: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PAISES = [
  { id: 'todos', label: 'Todos', flag: '🌍' },
  { id: 'espana', label: 'España', flag: '🇪🇸' },
  { id: 'italia', label: 'Italia', flag: '🇮🇹' },
  { id: 'francia', label: 'Francia', flag: '🇫🇷' },
  { id: 'portugal', label: 'Portugal', flag: '🇵🇹' },
  { id: 'grecia', label: 'Grecia', flag: '🇬🇷' },
  { id: 'eeuu', label: 'Estados...', flag: '🇺🇸' },
  { id: 'mexico', label: 'México', flag: '🇲🇽' },
  { id: 'tailandia', label: 'Tailandia', flag: '🇹🇭' },
  { id: 'japon', label: 'Japón', flag: '🇯🇵' },
  { id: 'reino-unido', label: 'Reino...', flag: '🇬🇧' },
];

const HOTELES: Hotel[] = [
  {
    id: '1',
    nombre: 'Hotel Ritz Madrid',
    ciudad: 'Madrid',
    pais: 'España',
    paisId: 'espana',
    imagen: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop&auto=format',
    rating: 4.8,
    opiniones: 1245,
    porQueLoRecomiendo: 'Ubicación perfecta en el centro de Madrid, cerca del Retiro. Personal atento que habla...',
    amenities: ['WiFi gratis', 'Desayuno incluido', 'Accesible'],
    notaAccesibilidad: 'Habitaciones en planta baja disponibles, rampas de acceso y ascensores amplios',
    precioPorNoche: 280,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '2',
    nombre: 'Hotel Arts Barcelona',
    ciudad: 'Barcelona',
    pais: 'España',
    paisId: 'espana',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
    rating: 4.9,
    opiniones: 892,
    porQueLoRecomiendo: 'Frente al mar con vistas espectaculares. Spa y piscina accesibles. Perfecto para descansar...',
    amenities: ['Spa', 'Piscina', 'Vista al mar'],
    notaAccesibilidad: 'Completamente adaptado para sillas de ruedas, baños con barras de apoyo',
    precioPorNoche: 320,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '3',
    nombre: 'Hotel Alfonso XIII Sevilla',
    ciudad: 'Sevilla',
    pais: 'España',
    paisId: 'espana',
    imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&auto=format',
    rating: 4.7,
    opiniones: 645,
    porQueLoRecomiendo: 'Hotel histórico con encanto andaluz. Jardines preciosos para pasear. Cerca de todos los...',
    amenities: ['Jardín', 'Restaurante', 'Parking'],
    notaAccesibilidad: 'Acceso adaptado en todas las áreas comunes',
    precioPorNoche: 245,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '4',
    nombre: 'Hotel De Russie Roma',
    ciudad: 'Roma',
    pais: 'Italia',
    paisId: 'italia',
    imagen: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop&auto=format',
    rating: 4.8,
    opiniones: 978,
    porQueLoRecomiendo: 'A pasos de Piazza del Popolo. El personal es excepcional y siempre dispuesto a ayudar...',
    amenities: ['Desayuno buffet', 'Conserje', 'WiFi'],
    notaAccesibilidad: 'Ascensores amplios, habitaciones con baño adaptado disponibles',
    precioPorNoche: 295,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '5',
    nombre: 'Hotel Brunelleschi Florencia',
    ciudad: 'Florencia',
    pais: 'Italia',
    paisId: 'italia',
    imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop&auto=format',
    rating: 4.7,
    opiniones: 756,
    porQueLoRecomiendo: 'Vista a la cúpula del Duomo desde algunas habitaciones. Ubicación céntrica para visitar...',
    amenities: ['Vista panorámica', 'Bar', 'Terraza'],
    notaAccesibilidad: 'Rampa de acceso, ascensor, baños adaptados',
    precioPorNoche: 270,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '6',
    nombre: 'Hotel Danieli Venecia',
    ciudad: 'Venecia',
    pais: 'Italia',
    paisId: 'italia',
    imagen: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop&auto=format',
    rating: 4.9,
    opiniones: 1034,
    porQueLoRecomiendo: 'Hotel de lujo frente a la laguna. Incluye servicio de góndola privada. Vale la pena po...',
    amenities: ['Servicio góndola', 'Restaurante', 'Vista laguna'],
    notaAccesibilidad: 'Acceso por agua adaptado, personal de asistencia disponible',
    precioPorNoche: 380,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '7',
    nombre: 'Le Bristol Paris',
    ciudad: 'París',
    pais: 'Francia',
    paisId: 'francia',
    imagen: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop&auto=format',
    rating: 4.9,
    opiniones: 1120,
    porQueLoRecomiendo: 'El hotel más elegante de París. A pasos de los Campos Elíseos. El desayuno es excepcional...',
    amenities: ['Piscina interior', 'Spa', 'Restaurante estrella Michelin'],
    notaAccesibilidad: 'Totalmente accesible, servicio de asistencia 24h',
    precioPorNoche: 450,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '8',
    nombre: 'Bairro Alto Hotel Lisboa',
    ciudad: 'Lisboa',
    pais: 'Portugal',
    paisId: 'portugal',
    imagen: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=500&fit=crop&auto=format',
    rating: 4.8,
    opiniones: 834,
    porQueLoRecomiendo: 'Vista panorámica sobre Lisboa desde la terraza. Personal increíblemente amable y servicial...',
    amenities: ['Terraza panorámica', 'Bar', 'WiFi'],
    notaAccesibilidad: 'Ascensor accesible, habitaciones adaptadas disponibles',
    precioPorNoche: 210,
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: '9',
    nombre: 'Hotel Grande Bretagne Atenas',
    ciudad: 'Atenas',
    pais: 'Grecia',
    paisId: 'grecia',
    imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format',
    rating: 4.8,
    opiniones: 967,
    porQueLoRecomiendo: 'Vistas a la Acrópolis desde algunas habitaciones. Desayuno griego tradicional incluido...',
    amenities: ['Vista Acrópolis', 'Piscina', 'Spa'],
    notaAccesibilidad: 'Rampa principal, baños adaptados, personal multilingüe',
    precioPorNoche: 195,
    bookingUrl: 'https://www.booking.com',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getCiudadesByPais(paisId: string): string[] {
  const seen = new Set<string>();
  return HOTELES
    .filter(h => h.paisId === paisId)
    .map(h => h.ciudad)
    .filter(c => seen.has(c) ? false : (seen.add(c), true));
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} estrellas`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-sm ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
      ))}
    </div>
  );
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────
function HotelCard({ hotel }: { hotel: Hotel }) {
  const [fav, setFav] = useState(false);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <Image
          src={hotel.imagen}
          alt={hotel.nombre}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badge verificado */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          <span className="text-[#E36E4A]" aria-hidden="true">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-xs font-semibold text-gray-800">Verificado</span>
        </div>
        {/* Favorito */}
        <button
          onClick={() => setFav(!fav)}
          aria-label={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className="absolute top-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-colors hover:bg-white"
        >
          {fav
            ? <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
            : <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          }
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-tight">{hotel.nombre}</h3>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-[#E36E4A] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {hotel.ciudad}, {hotel.pais}
        </p>

        <div className="flex items-center gap-2 mt-1.5">
          <Stars rating={hotel.rating} />
          <span className="text-sm font-semibold text-gray-700">{hotel.rating}</span>
          <span className="text-sm text-gray-400">({hotel.opiniones} opiniones)</span>
        </div>

        {/* Por qué lo recomiendo */}
        <div className="mt-3 bg-orange-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-[#E36E4A] mb-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
            Por qué lo recomendamos
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{hotel.porQueLoRecomiendo}</p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {hotel.amenities.map((a) => (
            <span key={a} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {a}
            </span>
          ))}
        </div>

        {/* Nota accesibilidad */}
        <div className="mt-3 flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2">
          <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-green-700 leading-relaxed">{hotel.notaAccesibilidad}</p>
        </div>

        <div className="flex-1" />

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-end gap-3">
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver detalles de ${hotel.nombre}`}
            className="min-h-[44px] px-5 py-2.5 bg-[#E36E4A] hover:bg-[#C4532F] text-white rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
          >
            Ver detalles
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HotelesClient() {
  const [paisActivo, setPaisActivo] = useState('todos');
  const [ciudadActiva, setCiudadActiva] = useState<string | null>(null);

  const handlePaisClick = (paisId: string) => {
    setPaisActivo(paisId);
    setCiudadActiva(null);
  };

  const ciudades = paisActivo !== 'todos' ? getCiudadesByPais(paisActivo) : [];
  const paisLabel = PAISES.find(p => p.id === paisActivo)?.label ?? '';

  const hotelesFiltrados = HOTELES.filter(h => {
    if (paisActivo === 'todos') return true;
    if (h.paisId !== paisActivo) return false;
    if (ciudadActiva && h.ciudad !== ciudadActiva) return false;
    return true;
  });

  const tituloSeccion = ciudadActiva
    ? `Hoteles en ${ciudadActiva}`
    : paisActivo === 'todos'
      ? 'Todos los hoteles recomendados'
      : `Hoteles en ${paisLabel}`;

  return (
    <div className="min-h-screen bg-[#F5F5F0]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>

      {/* ── Hero / Trust section ─────────────────────────────────────────── */}
      <section className="bg-white pt-10 pb-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-5">
            <span className="text-[#E36E4A]">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-sm font-medium text-gray-700">Hoteles seleccionados para viajeros mayores</span>
          </div>

          <h1 className="font-alata text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Hoteles Recomendados para Viajeros Mayores
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            De acuerdo a investigaciones realizadas para viajeros mayores, seleccionamos hoteles que destacan por comodidad, accesibilidad y atención personalizada.
          </p>
        </div>
      </section>

      {/* ── Filtro por país ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#E36E4A]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h2 className="font-bold text-gray-900 text-base">Seleccioná un destino</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Estos son los {PAISES.length - 1} países más visitados por nuestra comunidad de viajeros mayores
          </p>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-11 gap-2">
            {PAISES.map(({ id, label, flag }) => (
              <button
                key={id}
                onClick={() => handlePaisClick(id)}
                aria-pressed={paisActivo === id}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all min-h-[70px] ${
                  paisActivo === id
                    ? 'border-[#E36E4A] bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-2xl leading-none" role="img" aria-label={label}>{flag}</span>
                <span className="text-xs text-gray-700 font-medium text-center leading-tight truncate w-full text-center">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Filtro por ciudad */}
          {ciudades.length > 1 && (
            <div className="mt-5 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#E36E4A]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-gray-700">
                  Filtrá por ciudad en {paisLabel}
                </p>
              </div>
              <p className="text-xs text-gray-500 mb-3">Hacé clic en una ciudad para ver solo hoteles de ese destino</p>
              <div className="flex flex-wrap gap-2">
                {ciudades.map((ciudad) => (
                  <button
                    key={ciudad}
                    onClick={() => setCiudadActiva(ciudadActiva === ciudad ? null : ciudad)}
                    aria-pressed={ciudadActiva === ciudad}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all min-h-[36px] ${
                      ciudadActiva === ciudad
                        ? 'bg-[#E36E4A] text-white border-[#E36E4A]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#E36E4A] hover:text-[#E36E4A]'
                    }`}
                  >
                    {ciudadActiva === ciudad && (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {ciudad}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Grid de hoteles ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900 text-lg">{tituloSeccion}</h2>
          <span className="text-sm text-gray-500">{hotelesFiltrados.length} hoteles verificados</span>
        </div>

        {hotelesFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3" aria-hidden="true">🏨</p>
            <p className="text-lg font-semibold text-gray-700">No hay hoteles en este destino aún</p>
            <p className="text-base text-gray-400 mt-1">Pronto agregaremos más recomendaciones</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotelesFiltrados.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      {/* ── Sección Booking.com ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-[#F0F4FF] rounded-2xl p-6 sm:p-8 text-center border border-blue-100">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Búsqueda independiente</span>
          </div>

          <h2 className="font-alata text-2xl font-bold text-gray-900 mb-2">
            ¿Querés buscarlo vos mismo?
          </h2>
          <p className="text-base text-gray-500 mb-6 max-w-md mx-auto">
            Si preferís explorar por tu cuenta, podés usar la plataforma más elegida por viajeros mayores hispanohablantes
          </p>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 max-w-lg mx-auto text-left">
            <div className="flex items-center gap-4">
              <div className="w-28 h-10 bg-[#003580] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">Booking.com</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Plataforma recomendada</p>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                  De acuerdo a investigaciones realizadas para viajeros mayores, Booking.com es la plataforma más confiable, con cancelación flexible y precios transparentes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
              {[
                { icon: '○', label: 'Cancelación gratuita', sub: 'En la mayoría de hoteles' },
                { icon: '☆', label: 'Opiniones reales', sub: 'De huéspedes verificados' },
                { icon: '○', label: 'Mejor precio garantizado', sub: 'O te devuelven la diferencia' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{item.sub}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full min-h-[48px] bg-[#003580] hover:bg-[#002a6e] text-white rounded-xl font-bold text-base transition-colors"
            >
              Buscar en Booking.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            <strong>Consejo:</strong> Al buscar, usá los filtros &quot;Accesible&quot; y &quot;Transporte público cercano&quot; para encontrar hoteles más adecuados
          </p>
        </div>
      </section>

    </div>
  );
}
