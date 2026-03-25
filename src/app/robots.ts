import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://topmedica.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/en/admin',
        '/fa/admin',
        '/dashboard',
        '/en/dashboard',
        '/fa/dashboard',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
