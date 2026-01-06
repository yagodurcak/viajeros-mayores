import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import HomeClient from './HomeClient';

export const metadata: Metadata = generateSEOMetadata({
  title:
    'Viajeros Mayores: Viajes Culturales y Consejos para Mayores de 60 Años',
  description:
    'Guía completa para viajar después de los 60 años. Consejos prácticos para viajar en la tercera edad, destinos culturales, turismo de naturaleza y senderismo para adultos mayores activos. Planifica tu viaje con confianza.',
  url: '/',
  type: 'website',
  tags: [
    'viajar después de los 60',
    'viajes para mayores de 60 años',
    'consejos para viajar en la tercera edad',
    'viajes culturales para mayores',
    'turismo senior',
    'destinos para personas mayores',
    'planificar viaje tercera edad',
    'senderismo para adultos mayores',
    'turismo de naturaleza para mayores',
  ],
});

const Home = () => {
  return <HomeClient />;
};

export default Home;
