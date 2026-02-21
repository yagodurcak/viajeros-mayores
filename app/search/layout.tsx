import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Destinos con IA - Búsqueda de destinos para mayores de 60',
  description:
    'Explora destinos del mundo con IA. Información sobre accesibilidad, transporte, atracciones y consejos para viajeros mayores de 60 años.',
  url: '/search',
  type: 'website',
  tags: [
    'destinos con IA',
    'buscar destinos mayores 60',
    'viajes inteligencia artificial',
    'turismo senior',
  ],
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
