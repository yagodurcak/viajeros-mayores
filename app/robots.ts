import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://viajerosmasayores.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile/edit/', '/blog/create/', '/news/create/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

