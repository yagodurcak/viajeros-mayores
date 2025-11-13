import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  const features = [
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
    {
      icon: '👥',
      title: 'Comunidad',
      description: 'Informate de la opinión de otros viajeros',
      link: '/',
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
            <Link
              href="/maps"
              className="inline-block px-8 py-4 bg-[#E36E4A] hover:bg-[#D45A36] text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Comenzar mi viaje
            </Link>
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
