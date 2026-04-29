import { MetadataRoute } from 'next';
import { routing } from '@/routing';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://topmedica.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const defaultLocale = routing.defaultLocale;
    const allLocales = routing.locales;

    // The routes to include in the sitemap
    const routes = [
        '/',
        '/about',
        '/search',
        '/blog/first-post', // Placeholder for blog system
    ];

    // Build the sitemap array
    const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => {
        // Strip leading slash for constructing URLs nicely
        const cleanRoute = route === '/' ? '' : route;

        // Construct alternates object for all locales
        const alternatesLanguages: Record<string, string> = {};
        allLocales.forEach((locale) => {
            alternatesLanguages[locale] = `${baseUrl}/${locale}${cleanRoute}`;
        });

        // The main URL for this entry is the default locale version
        return {
            url: `${baseUrl}/${defaultLocale}${cleanRoute}`,
            lastModified: new Date(),
            changeFrequency: route === '/' ? 'daily' : 'weekly',
            priority: route === '/' ? 1 : 0.8,
            alternates: {
                languages: alternatesLanguages,
            },
        };
    });

    return sitemapEntries;
}
