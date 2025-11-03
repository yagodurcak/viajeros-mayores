'use client';

import React from 'react';
import Image from 'next/image';
import { HotelDeal } from '@/types';

interface HotelDealCardProps {
  deal: HotelDeal;
}

const HotelDealCard: React.FC<HotelDealCardProps> = ({ deal }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400 text-sm" />);
    }

    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="fas fa-star-half-alt text-yellow-400 text-sm"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="fas fa-star text-gray-300 text-sm" />
      );
    }

    return stars;
  };

  return (
    <div className="group relative">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
        <div className="relative h-56">
          <Image
            src={deal.image}
            alt={deal.name}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white"
              aria-label="Agregar a favoritos"
            >
              <i className="far fa-heart text-[#FF6F61] text-lg" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#FF6F61] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <i className="fas fa-universal-access mr-1" />
                {deal.type}
              </span>
              <div className="text-white text-right">
                <div className="text-xs opacity-75 line-through">
                  ${deal.originalPrice.toLocaleString()}
                </div>
                <div className="text-lg font-bold">
                  ${deal.discountedPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-1">
                {deal.name}
              </h4>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-map-marker-alt text-[#FF6F61] mr-1" />
                {deal.location}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <div className="flex">{renderStars(deal.rating)}</div>
              <span className="text-xs text-gray-500">
                ({deal.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {deal.features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-2 bg-green-50 rounded-lg"
              >
                <i
                  className={`${deal.accessibilityFeatures[index]} text-green-600 text-sm mb-1`}
                />
                <div className="text-xs text-green-700 font-medium">
                  {feature}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">2 noches • Fin de año</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {deal.discount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDealCard;
