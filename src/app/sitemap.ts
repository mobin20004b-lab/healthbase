import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://topmedica.com';

  const baseRoutes = ['', '/about', '/search', '/blog'];

  // As the blog system isn't fully implemented yet (no posts table),
  // we add a placeholder for future dynamic posts.
  const dynamicRoutes = ['/blog/first-post'];

  const routes = [...baseRoutes, ...dynamicRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${baseUrl}/en${route}`,
        fa: `${baseUrl}/fa${route}`,
      },
    },
  }));
}
