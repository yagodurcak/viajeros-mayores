'use client';

import React from 'react';
import Image from 'next/image';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  size?: 'large' | 'medium' | 'small';
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  size = 'medium',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return 'h-64';
      case 'medium':
        return 'h-48';
      case 'small':
        return 'h-32';
      default:
        return 'h-48';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'large':
        return 'text-2xl';
      case 'medium':
        return 'text-xl';
      case 'small':
        return 'text-lg';
      default:
        return 'text-xl';
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group ${getSizeClasses()}`}
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover object-bottom group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h4 className={`${getTextSize()} font-bold mb-1 flex items-center`}>
          {destination.name}
          <span className="ml-2 text-xl">{destination.flag}</span>
        </h4>
        <div className="flex items-center space-x-1">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              destination.accessibilityLevel === 'AAA'
                ? 'bg-green-500'
                : destination.accessibilityLevel === 'AA'
                  ? 'bg-blue-500'
                  : 'bg-orange-500'
            }`}
          >
            {destination.accessibilityLevel}
          </span>
          <span className="text-sm">{destination.description}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
