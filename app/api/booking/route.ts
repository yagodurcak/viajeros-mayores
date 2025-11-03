// Ruta: src/app/api/booking/route.ts
import { NextResponse } from 'next/server';

// ID de anunciante para Booking.com (verifica si es el correcto para tu región en Awin)
const BOOKING_ADVERTISERT_ID = '217965';
// TU ID DE PUBLICADOR OBTENIDO DE LA IMAGEN
const PUBLISHER_ID = '2617244';

export async function GET(request: Request) {
  const apiToken = process.env.AWIN_API_TOKEN;

  if (!apiToken) {
    return NextResponse.json(
      { error: 'API token no configurado en el servidor' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'hotel';

  // URL de la API de Awin con tu Publisher ID correcto
  const awinApiUrl = `https://api.awin.com/publishers/${PUBLISHER_ID}/promotions?advertiserIds=${BOOKING_ADVERTISERT_ID}&type=promotion&q=${query}`;

  try {
    const apiResponse = await fetch(awinApiUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { error: 'Error al contactar la API de Awin', details: errorData },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en la API route:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
