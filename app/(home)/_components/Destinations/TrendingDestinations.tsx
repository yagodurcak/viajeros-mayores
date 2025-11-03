'use client';

import React from 'react';
import { trendingDestinations } from '@/lib/constants';
import DestinationCard from './DestinationCard';

const TrendingDestinations: React.FC = () => {
  const [largeDestinations, mediumDestinations] = [
    trendingDestinations.slice(0, 2),
    trendingDestinations.slice(2),
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-2 font-alata">
          Destinos accesibles en tendencia
        </h3>
        <p className="text-gray-600 mb-8 font-light">
          Opciones más populares entre la comunidad de viajeros accesibles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {largeDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              size="large"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediumDestinations.map((destination) => (
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
export default TrendingDestinations;
