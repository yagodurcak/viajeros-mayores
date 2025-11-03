export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  imageUrl: string;
  distanceFromCenter: number;
  accessibilityFeatures: string[];
  roomType: string;
  beds: number;
  availableRooms: number;
}

export interface AccessibilityFilter {
  id: string;
  name: string;
  icon: string;
  count: number;
  enabled: boolean;
}

export interface SearchFilters {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  priceRange: [number, number];
  accessibilityFeatures: string[];
  sortBy: 'price' | 'rating' | 'distance';
}

export interface StandardFilter {
  id: string;
  name: string;
  count: number;
  enabled: boolean;
}
