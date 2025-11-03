'use client';

import React from 'react';
import HotelDealCard from './HotelDealCard';
import { weekendDeals } from '@/lib/constants';

const WeekendDeals: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-2 font-alata">
          Ofertas accesibles de fin de semana
        </h3>
        <p className="text-lg text-gray-600 mb-8 font-light">
          Ahorra en estadías accesibles para estas fechas: 15 de diciembre - 17 de diciembre
        </p>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {weekendDeals.map((deal) => (
              <HotelDealCard key={deal.id} deal={deal} />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Ver más ofertas"
          >
            <i className="fas fa-chevron-right text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default WeekendDeals;
