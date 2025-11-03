import { useState, useEffect } from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Hotel, AccessibilityFilter, SearchFilters } from '@/types/hotel';

const ACCESSIBILITY_FEATURES = [
  {
    id: 'ramp',
    name: 'Access ramp',
    icon: 'fas fa-wheelchair-move',
    count: 1247,
  },
  {
    id: 'elevator',
    name: 'Accessible elevator',
    icon: 'fas fa-elevator',
    count: 892,
  },
  {
    id: 'raisedToilet',
    name: 'Raised toilet',
    icon: 'fas fa-toilet',
    count: 634,
  },
  {
    id: 'levelShower',
    name: 'Roll-in shower',
    icon: 'fas fa-shower',
    count: 456,
  },
  {
    id: 'signLanguage',
    name: 'Sign language staff',
    icon: 'fas fa-sign-language',
    count: 123,
  },
  {
    id: 'levelRooms',
    name: 'Step-free rooms',
    icon: 'fas fa-door-open',
    count: 789,
  },
];

export function useHotelSearch(searchParams: ReadonlyURLSearchParams) {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [totalCount, _setTotalCount] = useState(5284);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    60000, 800000,
  ]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>(
    'rating'
  );
  const [filters, setFilters] = useState<AccessibilityFilter[]>(
    ACCESSIBILITY_FEATURES.map((f) => ({ ...f, enabled: false }))
  );

  useEffect(() => {
    loadHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, filters, priceRange, sortBy]);

  const loadHotels = async () => {
    try {
      setLoading(true);

      // TODO: Aquí iría la llamada real a la API
      // Por ahora, datos mock
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockHotels: Hotel[] = [
        {
          id: '1',
          name: 'Dulcis In Vatican b&b',
          location: 'Trionfale, Roma',
          city: 'Roma',
          country: 'Italia',
          rating: 9.0,
          reviewCount: 409,
          pricePerNight: 287805,
          currency: '$',
          imageUrl: '/images/hotels/hotel1.jpg',
          distanceFromCenter: 3.3,
          accessibilityFeatures: ['ramp', 'elevator'],
          roomType: 'Doble Superior',
          beds: 1,
          availableRooms: 2,
        },
        {
          id: '2',
          name: 'Hotel Le Petit',
          location: 'Estación de Termini, Roma',
          city: 'Roma',
          country: 'Italia',
          rating: 8.6,
          reviewCount: 3773,
          pricePerNight: 226597,
          currency: '$',
          imageUrl: '/images/hotels/hotel2.jpg',
          distanceFromCenter: 1.2,
          accessibilityFeatures: ['levelShower', 'levelRooms'],
          roomType: 'Habitación Doble',
          beds: 1,
          availableRooms: 3,
        },
        {
          id: '3',
          name: 'Roma Accessible Suites',
          location: 'Centro Histórico, Roma',
          city: 'Roma',
          country: 'Italia',
          rating: 9.4,
          reviewCount: 1247,
          pricePerNight: 456320,
          currency: '$',
          imageUrl: '/images/hotels/hotel3.jpg',
          distanceFromCenter: 0.8,
          accessibilityFeatures: [
            'ramp',
            'elevator',
            'raisedToilet',
            'signLanguage',
          ],
          roomType: 'Suite Accesible Premium',
          beds: 1,
          availableRooms: 1,
        },
      ];

      setHotels(mockHotels);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAccessibilityFilters = (filterId: string) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === filterId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const updatePriceRange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const updateSortBy = (value: 'price' | 'rating' | 'distance') => {
    setSortBy(value);
  };

  const handleSearch = (_searchData: SearchFilters) => {
    // Aquí se actualizarían los parámetros de búsqueda
    loadHotels();
  };

  return {
    loading,
    hotels,
    totalCount,
    filters,
    priceRange,
    sortBy,
    updateAccessibilityFilters,
    updatePriceRange,
    updateSortBy,
    handleSearch,
  };
}
