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
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
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
      locale: 'es_AR',
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
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};

// Metadata por defecto para el sitio
export const defaultMetadata: Metadata = generateSEOMetadata({
  title: 'Viajeros Mayores',
  description:
    'Encuentra los mejores hoteles accesibles, destinos y consejos de viaje para adultos mayores. Viaja sin límites con Viajeros Mayores.',
  image: defaultImage,
  url: baseUrl,
  type: 'website',
});
