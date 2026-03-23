import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import HotelesClient from './HotelesClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Hoteles Recomendados para Viajeros Mayores — Verificados Personalmente',
  description:
    'Hoteles verificados y recomendados especialmente para adultos mayores de 60. Accesibilidad, comodidad y atención en español garantizados.',
  url: '/hoteles',
  type: 'website',
  tags: [
    'hoteles para mayores',
    'hoteles accesibles',
    'hoteles recomendados seniors',
    'alojamiento adultos mayores',
    'hoteles verificados',
  ],
});

export default function HotelesPage() {
  return <HotelesClient />;
}
