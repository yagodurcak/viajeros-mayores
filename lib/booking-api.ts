import { LocationSearchParams, LocationSearchResult } from '@/types/booking';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || '';

if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
  console.error('⚠️ Missing RapidAPI credentials in .env.local');
}

const BASE_URL = `https://${RAPIDAPI_HOST}/v1`;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function fetchFromBookingAPI<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': RAPIDAPI_HOST,
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Booking API Error: ${response.status} - ${
        errorData.message || response.statusText
      }`
    );
  }

  return response.json();
}

/**
 * Search for locations (cities, airports, landmarks, etc.)
 * @param params Search parameters
 * @returns Array of location results
 */
export async function searchLocations(
  params: LocationSearchParams
): Promise<LocationSearchResult[]> {
  return fetchFromBookingAPI<LocationSearchResult[]>('/hotels/locations', {
    params: {
      name: params.name,
      locale: params.locale || 'en-gb',
    },
  });
}

/**
 * Search for hotels
 * @param params Hotel search parameters
 * @returns Hotel search results
 */
export async function searchHotels(
  params: Record<string, string | number | boolean>
): Promise<Record<string, unknown>> {
  // Will be implemented when we get the response structure
  return fetchFromBookingAPI<Record<string, unknown>>('/hotels/search', {
    params,
  });
}
