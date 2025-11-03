// Booking.com API Types

export interface LocationSearchResult {
  region: string;
  name: string;
  city_name: string;
  timezone: string;
  hotels: number;
  nr_hotels: number;
  city_ufi: number | null;
  type: 'ci' | 'di' | 'ai' | 'la'; // city, district, airport, landmark
  dest_type: 'city' | 'district' | 'airport' | 'landmark';
  cc1: string; // country code
  latitude: number;
  dest_id: string;
  country: string;
  rtl: number;
  label: string;
  lc: string; // locale
  image_url: string;
  longitude: number;
  roundtrip: string;
  landmark_type?: number;
  b_max_los_data: {
    is_fullon: number;
    experiment: string;
    extended_los: number;
    has_extended_los: number;
    max_allowed_los: number;
    default_los: number;
  };
}

export interface LocationSearchParams {
  name: string;
  locale?: string; // default: 'en-gb'
}

export interface HotelSearchParams {
  dest_id: string;
  dest_type: string;
  checkin_date: string; // YYYY-MM-DD
  checkout_date: string; // YYYY-MM-DD
  adults_number: number;
  room_number: number;
  units?: string; // 'metric' or 'imperial'
  page_number?: number;
  filter_by_currency?: string; // e.g., 'AED', 'USD', 'EUR'
  locale?: string; // e.g., 'en-gb'
  order_by?: 'popularity' | 'price' | 'review_score' | 'distance';
  categories_filter_ids?: string; // comma-separated IDs
  include_adjacency?: boolean;
}

export interface HotelSearchResult {
  // Will be defined when we get the response structure
  [key: string]: any;
}
