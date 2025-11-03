export interface Destination {
  id: string;
  name: string;
  country: string;
  flag: string;
  accessibilityLevel: 'AAA' | 'AA' | 'A';
  image: string;
  description: string;
}

export interface HotelDeal {
  id: string;
  name: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  rating: number;
  reviewCount: number;
  image: string;
  features: string[];
  accessibilityFeatures: string[];
  type: string;
}

export type Language = 'ES' | 'EN';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface MissionValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Export Booking.com API types
export * from './booking';
