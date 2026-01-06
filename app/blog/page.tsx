import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Consejos para Viajar en la Tercera Edad | Guías y Destinos',
  description:
    'Descubre consejos prácticos para viajar en la tercera edad. Guías completas sobre destinos culturales, planificación de viajes y turismo de naturaleza para mayores de 60 años.',
  url: '/blog',
  type: 'website',
  tags: [
    'consejos para viajar en la tercera edad',
    'viajar después de los 60',
    'guías de viaje para mayores',
    'destinos culturales para personas mayores',
    'planificar viaje tercera edad',
  ],
});

const BlogPage = () => {
  return <BlogPageClient />;
};

export default BlogPage;
