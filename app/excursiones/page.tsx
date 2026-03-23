import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import ExcursionesClient from './ExcursionesClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Excursiones para Mayores — Actividades y Tours Recomendados',
  description:
    'Las mejores plataformas para reservar excursiones y tours siendo mayor de 60. GetYourGuide, Civitatis y Viator — comparados para viajeros seniors.',
  url: '/excursiones',
  type: 'website',
  tags: ['excursiones mayores', 'tours tercera edad', 'actividades viaje seniors', 'GetYourGuide mayores'],
});

export default function ExcursionesPage() {
  return <ExcursionesClient />;
}
