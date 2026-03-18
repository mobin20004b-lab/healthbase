import { MetadataRoute } from 'next';
import { routing } from '@/routing';

const baseUrl = 'https://topmedica.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/blog', '/search'];
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  return routes.map((route) => {
    const alternates = locales.reduce(
      (acc, locale) => {
        acc[locale] = `${baseUrl}/${locale}${route}`;
        return acc;
      },
      {} as Record<string, string>
    );

    return {
      url: `${baseUrl}/${defaultLocale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: alternates,
      },
    };
  });
}
