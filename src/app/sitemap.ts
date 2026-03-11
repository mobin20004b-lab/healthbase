import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const publicPaths = ['/', '/about', '/search'];
  const locales = routing.locales;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  publicPaths.forEach((path) => {
    locales.forEach((locale) => {
      // For the root path, avoid double slashes, e.g., '/en/' -> '/en'
      const urlPath = path === '/' ? `/${locale}` : `/${locale}${path}`;

      const languages: Record<string, string> = {};
      locales.forEach((l) => {
        languages[l] = `${baseUrl}/${l}${path === '/' ? '' : path}`;
      });

      sitemapEntries.push({
        url: `${baseUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '/' ? 1 : 0.8,
        alternates: {
          languages,
        },
      });
    });
  });

  return sitemapEntries;
}
