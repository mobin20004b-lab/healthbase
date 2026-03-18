import { MetadataRoute } from 'next';
import { routing } from '@/routing';

const baseUrl = 'https://topmedica.com';

export default function robots(): MetadataRoute.Robots {
  const locales = routing.locales;

  const disallowedPaths = [
    '/admin',
    '/dashboard',
    ...locales.map((locale) => `/${locale}/admin`),
    ...locales.map((locale) => `/${locale}/dashboard`),
  ];

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowedPaths,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
