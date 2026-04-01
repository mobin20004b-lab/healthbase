import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://topmedica.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['en', 'fa'];
    const routes = [
        '',
        '/about',
        '/search',
        '/blog',
        // Add more static routes here
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const route of routes) {
        const languages: Record<string, string> = {};
        for (const locale of locales) {
            languages[locale] = `${BASE_URL}/${locale}${route}`;
        }

        sitemapEntries.push({
            url: `${BASE_URL}/en${route}`, // Default URL (could be EN)
            lastModified: new Date(),
            alternates: {
                languages,
            },
        });

        // NextJS sitemap best practices suggest having individual URLs,
        // or using alternates if it's the exact same content in different language.
        // We will push one primary entry per route and use `alternates.languages`
        // as recommended by next-intl / Next.js docs.
    }

    return sitemapEntries;
}
