import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://viajerosmasayores.com';
const siteName = 'Viajeros Mayores';
const defaultImage = `${baseUrl}/images/logo.png`;
const defaultFaviconPath = '/images/iconfav.png';

export const generateSEOMetadata = (config: SEOConfig): Metadata => {
  const {
    title,
    description,
    image = defaultImage,
    url = baseUrl,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  // Asegurar URLs sin comillas y correctamente formateadas
  const fullUrl = url.startsWith('http')
    ? url.replace(/['"]/g, '')
    : `${baseUrl}${url}`.replace(/['"]/g, '');
  const fullImageUrl = image.startsWith('http')
    ? image.replace(/['"]/g, '')
    : `${baseUrl}${image}`.replace(/['"]/g, '');

  // Limitar description a 160 caracteres para SEO óptimo
  const optimizedDescription =
    description.length > 160
      ? `${description.substring(0, 157)}...`
      : description;

  return {
    title: fullTitle,
    description: optimizedDescription,
    icons: {
      icon: [{ url: defaultFaviconPath, type: 'image/png' }],
      shortcut: [{ url: defaultFaviconPath, type: 'image/png' }],
      apple: [{ url: defaultFaviconPath, type: 'image/png' }],
    },
    keywords: tags?.join(', ') || undefined,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: fullTitle,
      description: optimizedDescription,
      url: fullUrl,
      siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

// Metadata por defecto para el sitio - Optimizado con keywords prioritarias
// Meta description optimizada a menos de 160 caracteres
export const defaultMetadata: Metadata = generateSEOMetadata({
  title:
    'Viajeros Mayores: Viajes Culturales y Consejos para Mayores de 60 Años',
  description:
    'Guía completa para viajar después de los 60 años. Consejos prácticos, destinos culturales y turismo de naturaleza para adultos mayores activos.',
  image: defaultImage,
  url: baseUrl,
  type: 'website',
  tags: [
    'viajar después de los 60',
    'viajes para mayores de 60 años',
    'consejos para viajar en la tercera edad',
    'viajes culturales para mayores',
    'turismo senior',
    'destinos para personas mayores',
    'planificar viaje tercera edad',
  ],
});
