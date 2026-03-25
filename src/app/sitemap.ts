import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://topmedica.com';
  const locales = routing.locales;

  // The base paths to include in the sitemap
  const basePaths = ['', '/about', '/search', '/blog'];

  return basePaths.map((path) => {
    const alternates = locales.reduce(
      (acc, locale) => {
        // Construct the localized path
        // For the root path (''), we just append the locale (e.g., /en)
        // For other paths, we append locale + path (e.g., /en/about)
        acc[locale] = `${baseUrl}/${locale}${path}`;
        return acc;
      },
      {} as Record<string, string>
    );

    // Default URL is the fa (default locale) path or another locale path as the canonical one
    // Let's use the defaultLocale for the primary URL
    const canonicalUrl = `${baseUrl}/${routing.defaultLocale}${path}`;

    return {
      url: canonicalUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: alternates,
      },
    };
  });
}
