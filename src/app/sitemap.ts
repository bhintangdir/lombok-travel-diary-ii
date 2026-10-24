import { MetadataRoute } from 'next';
import contentData from '@/data/content.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lomboktraveldiary.com';
  const lastModified = new Date();

  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tour-package`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destination`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic tour package detail pages
  const packagePages: MetadataRoute.Sitemap = contentData.tours.map((pkg) => ({
    url: `${baseUrl}/tour-package/${pkg.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic destination detail pages
  const destinationPages: MetadataRoute.Sitemap = (contentData.destinations?.items || []).map((dest: any) => ({
    url: `${baseUrl}/destination/${dest.slug || dest.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticPages, ...packagePages, ...destinationPages];
}
