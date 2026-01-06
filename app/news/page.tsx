import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import NewsPageClient from './NewsPageClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Noticias de Viajes para Mayores de 60 | Turismo Senior',
  description:
    'Mantente informado sobre las últimas noticias de turismo para mayores de 60 años. Destinos accesibles, tendencias de viaje cultural y novedades para viajeros seniors activos.',
  url: '/news',
  type: 'website',
  tags: [
    'noticias viajes mayores',
    'turismo senior',
    'viajes para mayores de 60',
    'destinos accesibles',
    'turismo cultural senior',
  ],
});

const NewsPage = () => {
  return <NewsPageClient />;
};

export default NewsPage;
