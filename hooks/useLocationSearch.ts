'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { searchLocations } from '@/lib/booking-api';
import { LocationSearchResult } from '@/types/booking';

interface UseLocationSearchResult {
  locations: LocationSearchResult[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
}

interface UseLocationSearchOptions {
  minChars?: number; // Minimum characters before searching
  debounceMs?: number; // Debounce delay in milliseconds
  locale?: string;
}

/**
 * Hook to search for locations (cities, airports, landmarks, etc.)
 * Features:
 * - Debounced search
 * - Automatic cleanup
 * - Loading and error states
 * - Minimum character threshold
 */
export function useLocationSearch(
  options: UseLocationSearchOptions = {}
): UseLocationSearchResult {
  const { minChars = 2, debounceMs = 300, locale = 'en-gb' } = options;

  const [locations, setLocations] = useState<LocationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async (query: string) => {
      // Clear previous debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Reset state if query is too short
      if (query.length < minChars) {
        setLocations([]);
        setError(null);
        setLoading(false);
        return;
      }

      // Set loading state immediately for better UX
      setLoading(true);
      setError(null);

      // Debounce the actual search
      debounceTimerRef.current = setTimeout(async () => {
        try {
          abortControllerRef.current = new AbortController();

          const results = await searchLocations({
            name: query,
            locale,
          });

          setLocations(results);
          setError(null);
        } catch (err) {
          if (err instanceof Error && err.name === 'AbortError') {
            // Request was aborted, ignore
            return;
          }

          const errorMessage =
            err instanceof Error ? err.message : 'Failed to search locations';
          setError(errorMessage);
          setLocations([]);
          console.error('Location search error:', err);
        } finally {
          setLoading(false);
        }
      }, debounceMs);
    },
    [minChars, debounceMs, locale]
  );

  const clearResults = useCallback(() => {
    setLocations([]);
    setError(null);
    setLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    locations,
    loading,
    error,
    search,
    clearResults,
  };
}
