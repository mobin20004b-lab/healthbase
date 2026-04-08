import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL || 'https://topmedica.com';

  const disallowPaths = routing.locales.flatMap((locale) => [
    `/${locale}/admin`,
    `/${locale}/dashboard`,
  ]);

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowPaths,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
