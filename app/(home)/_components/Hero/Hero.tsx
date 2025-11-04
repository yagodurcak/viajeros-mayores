import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative text-white py-40 px-6 h-[600px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Viajes accesibles para todos"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mt-24">
        <h2 className="text-5xl font-bold mb-4 opacity-70 font-alata">
          Explora Sin Límites
        </h2>
        <p className="text-xl mb-12 opacity-70 font-light">
          No dejes que las largas caminatas o las escaleras te tomen por
          sorpresa o te impidan viajar. Nuestra comunidad te ayuda con la mejor
          información para estar preparado en tu viaje y disfrutar de cualquier
          destino. Tu próxima aventura te espera.
        </p>
      </div>
    </section>
  );
};

export default Hero;
