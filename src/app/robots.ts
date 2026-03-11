import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const locales = routing.locales;

  // Disallow /admin and /dashboard along with all localized variants
  const disallowedPaths = ['/admin', '/dashboard'];
  const disallowedRoutes = disallowedPaths.reduce((acc, path) => {
    locales.forEach((locale) => {
      acc.push(`/${locale}${path}`);
      acc.push(`/${locale}${path}/*`);
    });
    return acc;
  }, [] as string[]);

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowedRoutes,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
