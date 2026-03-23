import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import VuelosClient from './VuelosClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Buscadores de Vuelos para Mayores — Los Que Recomendamos',
  description:
    'Los mejores buscadores de vuelos recomendados para viajeros mayores de 60. Skyscanner, Google Flights y Kayak con consejos para volar cómodo.',
  url: '/vuelos',
  type: 'website',
  tags: ['buscador vuelos mayores', 'vuelos tercera edad', 'skyscanner seniors', 'google flights mayores'],
});

export default function VuelosPage() {
  return <VuelosClient />;
}
