import { MetadataRoute } from 'next';
import {
  getAllBlogSlugsForSitemap,
  getAllNewsSlugsForSitemap,
} from '@/lib/server-data';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://viajerosmasayores.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Páginas principales
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/maps`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Artículos de blog individuales
  const blogSlugs = await getAllBlogSlugsForSitemap();
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(({ slug, createdAt }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: createdAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Noticias individuales
  const newsSlugs = await getAllNewsSlugsForSitemap();
  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map(({ slug, createdAt }) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: createdAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...blogRoutes, ...newsRoutes];
}
