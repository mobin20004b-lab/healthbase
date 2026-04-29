import { MetadataRoute } from 'next';
import { routing } from '@/routing';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://topmedica.com';

export default function robots(): MetadataRoute.Robots {
    const allLocales = routing.locales;

    // We want to disallow /admin and /dashboard for all supported locales
    const disallowedPaths = allLocales.flatMap((locale) => [
        `/${locale}/admin`,
        `/${locale}/dashboard`,
        `/${locale}/admin/*`,
        `/${locale}/dashboard/*`,
    ]);

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: disallowedPaths,
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
