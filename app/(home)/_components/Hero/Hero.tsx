import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative text-white py-40 px-6 h-[600px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Accessible travel for everyone"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mt-24">
        <h2 className="text-5xl font-bold mb-4 opacity-70 font-alata">
          Explore Without Limits
        </h2>
        <p className="text-xl mb-12 opacity-70 font-light">
          Don&apos;t let long walks or stairs catch you off guard or stop you
          from traveling. Our community helps you with the best information to
          be prepared for your trip and enjoy any destination. Your next
          adventure awaits.
        </p>
      </div>
    </section>
  );
};

export default Hero;
