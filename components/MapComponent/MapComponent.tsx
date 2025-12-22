'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Autocomplete,
  Marker,
} from '@react-google-maps/api';

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = [
  'places',
];

const defaultCenter = {
  lat: 40.416775,
  lng: -3.70379,
};

const mapOptions = {
  streetViewControl: false,
  fullscreenControl: false,
};

type RouteSegment = {
  path: Array<{ lat: number; lng: number }>;
  color: string;
  slope: number;
};

type RouteStats = {
  totalDistance: number;
  totalAscent: number;
  totalDescent: number;
};

const MapComponent: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);
  const [routeStats, setRouteStats] = useState<RouteStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [originMarker, setOriginMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectingMode, setSelectingMode] = useState<
    'origin' | 'destination' | null
  >(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const requestUserLocation = () => {
    // eslint-disable-next-line no-console
    console.log('🔍 Solicitando ubicación...');
    // eslint-disable-next-line no-console
    console.log('Navigator.geolocation disponible:', !!navigator.geolocation);

    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización');
      return;
    }

    setLocationError(null);
    // eslint-disable-next-line no-console
    console.log('📍 Llamando a getCurrentPosition...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // eslint-disable-next-line no-console
        console.log('✅ Ubicación obtenida:', userPos);
        setUserLocation(userPos);
        setMapCenter(userPos);
        setLocationError(null); // Limpiar cualquier error previo
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('❌ Error obteniendo ubicación:', error);
        // eslint-disable-next-line no-console
        console.error('Error code:', error.code);
        // eslint-disable-next-line no-console
        console.error('Error message:', error.message);

        setUserLocation(null); // Limpiar ubicación si hay error

        if (error.code === 1) {
          setLocationError(
            'Permiso de ubicación denegado. Haz clic en el candado 🔒 en la barra de direcciones para permitir la ubicación.'
          );
        } else if (error.code === 2) {
          setLocationError('Ubicación no disponible');
        } else if (error.code === 3) {
          setLocationError('Tiempo de espera agotado');
        } else {
          setLocationError('Error al obtener ubicación');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    requestUserLocation();
  }, []);

  // Limpiar ruta cuando cambie origen o destino
  useEffect(() => {
    if (routeSegments.length > 0) {
      setRouteSegments([]);
      setRouteStats(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  const originAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const destinationAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);

  const onOriginLoad = (autocomplete: google.maps.places.Autocomplete) => {
    originAutocompleteRef.current = autocomplete;
  };

  const onOriginPlaceChanged = () => {
    if (originAutocompleteRef.current) {
      const place = originAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setOrigin(place.formatted_address);
        setRouteSegments([]); // Limpiar ruta anterior

        // Marcar origen en el mapa
        if (place.geometry?.location) {
          const position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setOriginMarker(position);
          setMapCenter(position);
        }
      }
    }
  };

  const onDestinationLoad = (autocomplete: google.maps.places.Autocomplete) => {
    destinationAutocompleteRef.current = autocomplete;
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocompleteRef.current) {
      const place = destinationAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setDestination(place.formatted_address);
        setRouteSegments([]); // Limpiar ruta anterior

        // Marcar destino en el mapa
        if (place.geometry?.location) {
          const position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setDestinationMarker(position);
        }
      }
    }
  };

  const useMyLocationAsOrigin = () => {
    if (userLocation) {
      const locationString = `${userLocation.lat},${userLocation.lng}`;
      setOrigin(locationString);
      setOriginMarker(userLocation);
      setMapCenter(userLocation);
      setRouteSegments([]); // Limpiar ruta anterior
    } else {
      setError('Ubicación no disponible. Permite el acceso a tu ubicación.');
    }
  };

  const useMyLocationAsDestination = () => {
    if (userLocation) {
      const locationString = `${userLocation.lat},${userLocation.lng}`;
      setDestination(locationString);
      setDestinationMarker(userLocation);
      setRouteSegments([]); // Limpiar ruta anterior
    } else {
      setError('Ubicación no disponible. Permite el acceso a tu ubicación.');
    }
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const position = { lat, lng };
    const locationString = `${lat},${lng}`;

    if (selectingMode === 'origin') {
      setOrigin(locationString);
      setOriginMarker(position);
      setMapCenter(position);
      setSelectingMode(null);
      setError(null);
      setRouteSegments([]); // Limpiar ruta anterior
      setRouteStats(null);
    } else if (selectingMode === 'destination') {
      setDestination(locationString);
      setDestinationMarker(position);
      setSelectingMode(null);
      setError(null);
      setRouteSegments([]); // Limpiar ruta anterior
      setRouteStats(null);
    }
  };

  const startSelectingOrigin = () => {
    setSelectingMode('origin');
    setError('Haz clic en el mapa para marcar el origen (Desde)');
  };

  const startSelectingDestination = () => {
    setSelectingMode('destination');
    setError('Haz clic en el mapa para marcar el destino (Hasta)');
  };

  const cancelSelecting = () => {
    setSelectingMode(null);
    setError(null);
  };

  const clearOrigin = () => {
    setOrigin('');
    setOriginMarker(null);
    setRouteSegments([]);
    setRouteStats(null);
  };

  const clearDestination = () => {
    setDestination('');
    setDestinationMarker(null);
    setRouteSegments([]);
    setRouteStats(null);
  };

  const getRouteData = async () => {
    if (!origin.trim() || !destination.trim()) {
      setError('Por favor ingresa origen y destino');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/get-elevation?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        console.error('Error fetching route:', data.error);
        return;
      }

      // La API ahora devuelve { segments, stats }
      if (data.segments && data.stats) {
        setRouteSegments(data.segments);
        setRouteStats(data.stats);

        // Ajustar el mapa para mostrar toda la ruta
        if (data.segments.length > 0 && mapRef.current) {
          const bounds = new google.maps.LatLngBounds();
          data.segments.forEach((segment: RouteSegment) => {
            segment.path.forEach((point: { lat: number; lng: number }) => {
              bounds.extend(point);
            });
          });
          mapRef.current.fitBounds(bounds);
        }
      } else {
        // Por compatibilidad con respuestas antiguas
        setRouteSegments(data);

        // Ajustar el mapa para mostrar toda la ruta (formato antiguo)
        if (data.length > 0 && mapRef.current) {
          const bounds = new google.maps.LatLngBounds();
          data.forEach((segment: RouteSegment) => {
            segment.path.forEach((point: { lat: number; lng: number }) => {
              bounds.extend(point);
            });
          });
          mapRef.current.fitBounds(bounds);
        }
      }
    } catch (err) {
      const errorMessage = 'Error al cargar la ruta. Intenta de nuevo.';
      setError(errorMessage);
      console.error('Error in API call:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="max-w-md rounded-lg bg-red-50 p-6 text-center">
          <div className="mb-2 text-2xl">⚠️</div>
          <h3 className="mb-2 text-lg font-semibold text-red-800">
            API Key de Google Maps no configurada
          </h3>
          <p className="text-sm text-red-600">
            Por favor, agrega{' '}
            <code className="rounded bg-red-100 px-1 py-0.5 text-xs">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            </code>{' '}
            a tu archivo{' '}
            <code className="rounded bg-red-100 px-1 py-0.5 text-xs">
              .env.local
            </code>
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="max-w-md rounded-lg bg-red-50 p-6 text-center">
          <div className="mb-2 text-2xl">❌</div>
          <h3 className="mb-2 text-lg font-semibold text-red-800">
            Error al cargar Google Maps
          </h3>
          <p className="text-sm text-red-600">
            {loadError.message ||
              'Verifica que tu API key sea válida y tenga los permisos necesarios.'}
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="text-lg text-gray-600">Cargando mapa...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen w-full md:gap-4 md:p-4">
      {/* Panel - arriba en móvil, izquierda en desktop */}
      <div className="w-full md:w-96 bg-white p-4 shadow-md space-y-4 md:overflow-y-auto md:max-h-screen md:rounded-lg">
        {/* Alertas de ubicación */}
        {locationError && !userLocation && (
          <div className="rounded-lg bg-yellow-50 p-3">
            <p className="text-sm font-medium text-yellow-800">
              {locationError}
            </p>
            <button
              onClick={requestUserLocation}
              className="mt-2 w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
            >
              Obtener Ubicación
            </button>
          </div>
        )}

        {!userLocation && !locationError && (
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              📍 Solicitando tu ubicación...
            </p>
          </div>
        )}

        {userLocation && !locationError && (
          <div className="rounded-lg bg-green-50 p-3">
            <p className="text-sm font-medium text-green-800">
              ✓ Ubicación obtenida
            </p>
          </div>
        )}

        {/* Campo Desde */}
        <div>
          <label
            htmlFor="origin"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Desde
          </label>
          <div className="relative">
            <Autocomplete
              onLoad={onOriginLoad}
              onPlaceChanged={onOriginPlaceChanged}
            >
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Buscar lugar de origen..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-20 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Autocomplete>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {origin && (
                <button
                  onClick={clearOrigin}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  title="Limpiar"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              {userLocation && (
                <button
                  onClick={useMyLocationAsOrigin}
                  className="rounded-lg p-1 text-blue-600 transition-colors hover:bg-blue-50"
                  title="Usar mi ubicación"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {!origin && (
            <div className="mt-2 flex flex-col gap-2">
              {userLocation && (
                <button
                  onClick={useMyLocationAsOrigin}
                  className="flex items-center justify-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700 transition-colors hover:bg-blue-100"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Usar mi ubicación
                </button>
              )}
              <button
                onClick={startSelectingOrigin}
                className="flex items-center justify-center gap-2 rounded-md bg-green-50 px-3 py-2 text-xs text-green-700 transition-colors hover:bg-green-100"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Marcar en el mapa
              </button>
            </div>
          )}
        </div>

        {/* Campo Hasta */}
        <div>
          <label
            htmlFor="destination"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Hasta
          </label>
          <div className="relative">
            <Autocomplete
              onLoad={onDestinationLoad}
              onPlaceChanged={onDestinationPlaceChanged}
            >
              <input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Buscar lugar de destino..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-20 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Autocomplete>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {destination && (
                <button
                  onClick={clearDestination}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  title="Limpiar"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              {userLocation && (
                <button
                  onClick={useMyLocationAsDestination}
                  className="rounded-lg p-1 text-blue-600 transition-colors hover:bg-blue-50"
                  title="Usar mi ubicación"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {!destination && (
            <div className="mt-2 flex flex-col gap-2">
              {userLocation && (
                <button
                  onClick={useMyLocationAsDestination}
                  className="flex items-center justify-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700 transition-colors hover:bg-blue-100"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Usar mi ubicación
                </button>
              )}
              <button
                onClick={startSelectingDestination}
                className="flex items-center justify-center gap-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 transition-colors hover:bg-red-100"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Marcar en el mapa
              </button>
            </div>
          )}
        </div>

        {/* Botón Calcular */}
        <button
          onClick={getRouteData}
          disabled={isLoading || selectingMode !== null}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? 'Calculando...' : 'Calcular Pendiente'}
        </button>

        {selectingMode && (
          <button
            onClick={cancelSelecting}
            className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancelar Selección
          </button>
        )}

        {error && !selectingMode && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {selectingMode && (
          <div className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700">
            {selectingMode === 'origin'
              ? '📍 Haz clic en el mapa para marcar el ORIGEN'
              : '📍 Haz clic en el mapa para marcar el DESTINO'}
          </div>
        )}

        {/* Estadísticas - solo cuando hay ruta */}
        {routeSegments.length > 0 && routeStats && (
          <div className="rounded-lg bg-blue-50 p-3">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              📊 Estadísticas de la Ruta:
            </h3>
            <div className="space-y-2">
              <div className="rounded-md bg-white p-2">
                <p className="text-xs font-medium text-gray-600">
                  Distancia Total
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {routeStats.totalDistance >= 1000
                    ? `${(routeStats.totalDistance / 1000).toFixed(2)} km`
                    : `${routeStats.totalDistance} m`}
                </p>
              </div>
              <div className="rounded-md bg-white p-2">
                <p className="text-xs font-medium text-gray-600">
                  ⬆️ Subida Total
                </p>
                <p className="text-xl font-bold text-orange-600">
                  {routeStats.totalAscent.toFixed(0)} m
                </p>
              </div>
              <div className="rounded-md bg-white p-2">
                <p className="text-xs font-medium text-gray-600">
                  ⬇️ Bajada Total
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {routeStats.totalDescent.toFixed(0)} m
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leyenda - solo cuando hay ruta */}
        {routeSegments.length > 0 && (
          <div className="rounded-lg bg-gray-50 p-3">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              Leyenda de Pendientes:
            </h3>

            <div className="mb-2">
              <h4 className="mb-1 text-xs font-semibold text-gray-700">
                ⬆️ Subidas (más difíciles):
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-6 rounded"
                    style={{ backgroundColor: '#FFEB3B' }}
                  ></div>
                  <span className="text-xs text-gray-700">Suave (3-7%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-6 rounded"
                    style={{ backgroundColor: '#FF9800' }}
                  ></div>
                  <span className="text-xs text-gray-700">
                    Moderada (8-15%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-6 rounded"
                    style={{ backgroundColor: '#F44336' }}
                  ></div>
                  <span className="text-xs text-gray-700">
                    Pronunciada (&gt; 16%)
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <h4 className="mb-1 text-xs font-semibold text-gray-700">
                ↔️ Plano:
              </h4>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-6 rounded"
                  style={{ backgroundColor: '#4CAF50' }}
                ></div>
                <span className="text-xs text-gray-700">Plano (-3% a 3%)</span>
              </div>
            </div>

            <div>
              <h4 className="mb-1 text-xs font-semibold text-gray-700">
                ⬇️ Bajadas (más fáciles):
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-6 rounded"
                    style={{ backgroundColor: '#4DD0E1' }}
                  ></div>
                  <span className="text-xs text-gray-700">
                    Suave (-3% a -7%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-6 rounded"
                    style={{ backgroundColor: '#2196F3' }}
                  ></div>
                  <span className="text-xs text-gray-700">
                    Moderada (-7% a -15%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-6 rounded"
                    style={{ backgroundColor: '#9C27B0' }}
                  ></div>
                  <span className="text-xs text-gray-700">
                    Pronunciada (&lt; -15%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mapa - abajo en móvil, derecha en desktop */}
      <div className="w-full h-[600px] md:h-full md:flex-1">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={15}
          options={{
            ...mapOptions,
            clickableIcons: false,
            gestureHandling: 'greedy',
          }}
          onLoad={onMapLoad}
          onClick={onMapClick}
          clickableIcons={false}
        >
          {/* Marcador de ubicación actual del usuario */}
          {userLocation && !originMarker && !destinationMarker && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              }}
              title="Tu ubicación"
            />
          )}

          {/* Marcador de Origen - Pin Verde */}
          {originMarker && (
            <Marker
              position={originMarker}
              label={{
                text: 'A',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
              icon={{
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 8,
                fillColor: '#10B981',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
                rotation: 180,
              }}
              title="Origen"
            />
          )}

          {/* Marcador de Destino - Pin Rojo */}
          {destinationMarker && (
            <Marker
              position={destinationMarker}
              label={{
                text: 'B',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
              icon={{
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 8,
                fillColor: '#EF4444',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
                rotation: 180,
              }}
              title="Destino"
            />
          )}

          {/* Ruta con pendientes coloreadas */}
          {routeSegments.map((segment, index) => (
            <Polyline
              key={index}
              path={segment.path}
              options={{
                strokeColor: segment.color,
                strokeOpacity: 0.8,
                strokeWeight: 6,
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
