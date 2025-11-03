'use client';

import React from 'react';
import DestinationCard from './DestinationCard';
import { popularDestinations } from '@/lib/constants';

const PopularDestinations: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-12 font-alata">
          Destinos que priorizan la accesibilidad
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              size="medium"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
