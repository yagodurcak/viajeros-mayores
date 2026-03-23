import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import HomeClient from '@/app/(home)/HomeClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Comunidad de Viajeros Mayores — Experiencias, Consejos y Destinos',
  description:
    'Únite a la comunidad de viajeros mayores. Compartí experiencias, descubrí destinos accesibles y conectá con otros viajeros hispanohablantes mayores de 60 años.',
  url: '/comunidad',
  type: 'website',
  tags: [
    'comunidad viajeros mayores',
    'viajes para adultos mayores',
    'turismo senior',
    'destinos accesibles',
    'experiencias de viaje',
    'consejos de viaje para mayores',
  ],
});

const ComunidadPage = () => {
  return <HomeClient />;
};

export default ComunidadPage;
