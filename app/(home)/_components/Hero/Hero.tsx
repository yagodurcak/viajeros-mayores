'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const features = [
    {
      icon: '🤖',
      title: 'Explorar Destinos con IA',
      description: 'Analiza las características de un destino',
      link: '/search',
    },
    {
      icon: '🗺️',
      title: 'Analizador de Pendientes',
      description: 'Observe las subidas y bajadas de un camino',
      link: '/maps',
    },
    {
      icon: '💡',
      title: 'Consejos',
      description: 'Guías especializadas para viajeros accesibles',
      link: '/blog',
    },
    {
      icon: '📰',
      title: 'Noticias',
      description: 'Últimas novedades en turismo accesible',
      link: '/news',
    },
  ];

  return (
    <section className="relative text-white py-16 md:py-20 px-6 h-[600px] md:h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mayores.png"
          alt="Viajes accesibles para todos"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-alata">
              Explora Sin Límites
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-xl">
              No dejes que las largas caminatas o las escaleras te tomen por
              sorpresa o te impidan viajar. Nuestra comunidad te ayuda con la
              mejor información para estar preparado en tu viaje y disfrutar de
              cualquier destino. Tu próxima aventura te espera.
            </p>

            {/* Search Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(
                    `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  );
                }
              }}
              className="w-full max-w-2xl flex flex-col gap-4 md:flex-row md:items-center"
            >
              <div
                className={`relative flex-1 rounded-xl border-2 bg-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 ${
                  isFocused
                    ? 'border-white/60 scale-[1.02] shadow-2xl'
                    : 'border-white/20 shadow-xl'
                }`}
              >
                <div className="px-4 py-3 md:px-6 md:py-4">
                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ej: París, Francia, Machu Picchu, Tokio..."
                    className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none md:text-lg"
                  />
                </div>
              </div>

              {/* Explore Button */}
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="flex-shrink-0 rounded-lg bg-gradient-to-r from-[#E36E4A] to-[#D45A36] px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-[#D45A36] hover:to-[#C04A26] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-[#E36E4A] disabled:hover:to-[#D45A36] md:px-8 md:py-4"
              >
                Explorar
              </button>
            </form>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="group backdrop-blur-none bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
