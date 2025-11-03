'use client';

import { useState } from 'react';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { LocationSearchResult } from '@/types/booking';

interface LocationSearchProps {
  onSelectLocation: (location: LocationSearchResult) => void;
  placeholder?: string;
  className?: string;
}

const LocationSearch = ({
  onSelectLocation,
  placeholder = '🔍 Search for a city, airport, or landmark...',
  className = '',
}: LocationSearchProps) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { locations, loading, error, search } = useLocationSearch({
    minChars: 2,
    debounceMs: 300,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true);
    search(value);
  };

  const handleSelectLocation = (location: LocationSearchResult) => {
    setQuery(location.label);
    setShowResults(false);
    onSelectLocation(location);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'ci':
        return '🏙️';
      case 'di':
        return '📍';
      case 'ai':
        return '✈️';
      case 'la':
        return '🗺️';
      default:
        return '📌';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] text-sm"
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Results Dropdown */}
      {showResults && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {error && <div className="p-4 text-red-600 text-sm">⚠️ {error}</div>}

          {!error && !loading && locations.length === 0 && (
            <div className="p-4 text-gray-500 text-sm text-center">
              No locations found
            </div>
          )}

          {!error && locations.length > 0 && (
            <ul className="py-2">
              {locations.map((location) => (
                <li key={`${location.dest_id}-${location.dest_type}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectLocation(location)}
                    className="w-full px-4 py-3 hover:bg-blue-50 transition-colors text-left flex items-start gap-3"
                  >
                    {/* Location Icon */}
                    <span className="text-2xl flex-shrink-0 mt-0.5">
                      {getLocationIcon(location.type)}
                    </span>

                    {/* Location Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {location.name}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {location.region && `${location.region}, `}
                        {location.country}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        🏨 {location.nr_hotels} hotels available
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
