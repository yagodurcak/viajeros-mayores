import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type LatLng = {
  lat: number;
  lng: number;
};

type RouteSegment = {
  path: LatLng[];
  color: string;
  slope: number;
};

type RouteStats = {
  totalDistance: number;
  totalAscent: number;
  totalDescent: number;
};

type RouteResponse = {
  segments: RouteSegment[];
  stats: RouteStats;
};

type ElevationResult = {
  elevation: number;
  location: {
    lat: number;
    lng: number;
  };
  resolution: number;
};

const getColorForSlope = (slopePercent: number): string => {
  // Bajadas (pueden requerir cuidado pero son más fáciles que subidas)
  if (slopePercent < -15) return '#6f42c1'; // Morado - bajada pronunciada (más de -15%)
  if (slopePercent >= -15 && slopePercent < -7) return '#007bff'; // Azul - bajada moderada (-15% a -7%)
  if (slopePercent >= -7 && slopePercent < -3) return '#17a2b8'; // Celeste - bajada suave (-7% a -3%)

  // Plano
  if (slopePercent >= -3 && slopePercent <= 3) return '#4CAF50'; // Verde - plano (-3% a 3%)

  // Subidas (estas sí son difíciles)
  if (slopePercent > 3 && slopePercent <= 7) return '#FFEB3B'; // Amarillo - subida suave (3-7%)
  if (slopePercent <= 15) return '#FF9800'; // Naranja - subida moderada
  return '#F44336'; // Rojo - subida pronunciada (difícil)
};

export const GET = async (request: NextRequest) => {
  // eslint-disable-next-line no-console
  console.log('🚀 API /api/get-elevation called');

  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  // eslint-disable-next-line no-console
  console.log('📍 Origin:', origin);
  // eslint-disable-next-line no-console
  console.log('📍 Destination:', destination);

  if (!origin || !destination) {
    return NextResponse.json(
      { error: 'Faltan origen o destino' },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.error('❌ API Key no configurada');
    return NextResponse.json(
      { error: 'Google Maps API key no está configurada' },
      { status: 500 }
    );
  }

  try {
    // === PASO 1: Obtener la Polilínea de la Ruta (Directions API) ===
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=${apiKey}`;

    // eslint-disable-next-line no-console
    console.log('🗺️  Llamando a Directions API...');
    const directionsResponse = await fetch(directionsUrl);
    const directionsData = await directionsResponse.json();

    // eslint-disable-next-line no-console
    console.log('📊 Directions API Status:', directionsData.status);

    if (directionsData.status !== 'OK' || !directionsData.routes[0]) {
      // eslint-disable-next-line no-console
      console.error('❌ Error en Directions API:', directionsData);
      return NextResponse.json(
        { error: 'Ruta no encontrada', details: directionsData },
        { status: 404 }
      );
    }

    // Esta es la polilínea codificada de *toda* la ruta
    const polyline = directionsData.routes[0].overview_polyline.points;
    const routeDistance = directionsData.routes[0].legs[0].distance.value; // Distancia en metros

    // === PASO 2: Obtener Muestras de Elevación (Elevation API) ===

    // Decidimos cuántas muestras tomar.
    // Queremos una muestra cada ~15 metros para mejor precisión
    // Google Maps limita a 512 muestras por request
    const samplesPerMeter = 5;
    let samples = Math.max(Math.floor(routeDistance / samplesPerMeter), 50); // Mínimo 50 muestras
    samples = Math.min(samples, 512); // Máximo 512 (límite de Google)

    // Pedimos las elevaciones a lo largo de la polilínea
    const elevationUrl = `https://maps.googleapis.com/maps/api/elevation/json?path=enc:${encodeURIComponent(polyline)}&samples=${samples}&key=${apiKey}`;

    // eslint-disable-next-line no-console
    console.log(
      '⛰️  Llamando a Elevation API con',
      samples,
      'muestras para',
      routeDistance,
      'metros'
    );
    const elevationResponse = await fetch(elevationUrl);
    const elevationData = await elevationResponse.json();

    // eslint-disable-next-line no-console
    console.log('📊 Elevation API Status:', elevationData.status);

    if (elevationData.status !== 'OK') {
      // eslint-disable-next-line no-console
      console.error('❌ Error en Elevation API:', elevationData);
      return NextResponse.json(
        { error: 'Error al obtener elevación', details: elevationData },
        { status: 500 }
      );
    }

    const elevationResults: ElevationResult[] = elevationData.results;

    // eslint-disable-next-line no-console
    console.log('📍 Total de puntos de elevación:', elevationResults.length);

    // === PASO 3: Calcular Pendientes y Crear Segmentos ===
    const routeSegments: RouteSegment[] = [];
    let totalDistance = 0;
    let totalAscent = 0;
    let totalDescent = 0;

    // Función para calcular distancia entre dos puntos (fórmula de Haversine)
    const calculateDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ): number => {
      const R = 6371e3; // Radio de la Tierra en metros
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    };

    for (let i = 0; i < elevationResults.length - 1; i++) {
      const start = elevationResults[i];
      const end = elevationResults[i + 1];

      // Calcular ganancia de elevación
      const elevationChange = end.elevation - start.elevation;

      // Calcular distancia horizontal real entre los dos puntos
      const distance = calculateDistance(
        start.location.lat,
        start.location.lng,
        end.location.lat,
        end.location.lng
      );

      // Acumular distancia total
      totalDistance += distance;

      // Acumular subidas y bajadas
      if (elevationChange > 0) {
        totalAscent += elevationChange;
      } else {
        totalDescent += Math.abs(elevationChange);
      }

      // Calcular pendiente (Evitar división por cero)
      const slopePercent =
        distance > 0 ? (elevationChange / distance) * 100 : 0;

      // Asignar color
      const color = getColorForSlope(slopePercent);

      // Crear el segmento para dibujar
      routeSegments.push({
        path: [
          { lat: start.location.lat, lng: start.location.lng },
          { lat: end.location.lat, lng: end.location.lng },
        ],
        slope: parseFloat(slopePercent.toFixed(2)),
        color: color,
      });
    }

    // === PASO 4: Enviar resultado al Frontend ===
    const stats: RouteStats = {
      totalDistance: Math.round(totalDistance),
      totalAscent: Math.round(totalAscent),
      totalDescent: Math.round(totalDescent),
    };

    // eslint-disable-next-line no-console
    console.log('✅ Devolviendo', routeSegments.length, 'segmentos');
    // eslint-disable-next-line no-console
    console.log('📊 Estadísticas:', stats);

    const response: RouteResponse = {
      segments: routeSegments,
      stats: stats,
    };

    return NextResponse.json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error en el backend:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};
