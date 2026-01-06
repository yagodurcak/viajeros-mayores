import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Acerca de Viajeros Mayores | Comunidad de Viajeros Mayores de 60',
  description:
    'Conoce la historia de Viajeros Mayores, una comunidad dedicada a ayudar a viajeros mayores de 60 años a explorar el mundo. Consejos, destinos culturales y apoyo para viajar en la tercera edad.',
  url: '/about',
  type: 'website',
  tags: [
    'viajeros mayores',
    'comunidad viajeros 60',
    'viajar después de los 60',
    'turismo senior',
  ],
});

const AboutPage = () => {
  return <AboutPageClient />;
};

export default AboutPage;
