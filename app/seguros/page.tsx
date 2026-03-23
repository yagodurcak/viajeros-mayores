import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import SegurosClient from './SegurosClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Seguros de Viaje para Mayores — Los Que Recomendamos',
  description:
    'Los mejores seguros de viaje para mayores de 60 años. IATI, Chapka, Allianz y más — comparados y explicados en simple para viajeros seniors.',
  url: '/seguros',
  type: 'website',
  tags: ['seguro viaje mayores', 'seguro viaje tercera edad', 'seguro medico viaje seniors', 'IATI mayores'],
});

export default function SegurosPage() {
  return <SegurosClient />;
}
