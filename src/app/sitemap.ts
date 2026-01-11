import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://topmedica.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/search'
  ];

  const locales = ['en', 'fa'];

  const entries: MetadataRoute.Sitemap = routes.flatMap((route) => {
    return locales.map((locale) => {
      // Since localePrefix is 'always', all routes are prefixed.
      // If route is empty string '', path is /en or /fa
      const path = `/${locale}${route}`;

      return {
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      };
    });
  });

  return entries;
}
