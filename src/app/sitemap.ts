import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || 'https://topmedica.com';

  const routes = ['', '/about', '/search', '/blog'];

  return routes.map((route) => {
    // Generate alternate languages object for this specific route
    const languages = routing.locales.reduce((acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${route}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url: `${baseUrl}/${routing.defaultLocale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages,
      },
    };
  });
}
