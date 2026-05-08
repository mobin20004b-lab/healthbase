import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://topmedica.com';

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          fa: `${baseUrl}/fa`,
        },
      },
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/about`,
          fa: `${baseUrl}/fa/about`,
        },
      },
    },
    {
      url: `${baseUrl}/en/search`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/search`,
          fa: `${baseUrl}/fa/search`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog/first-post`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/first-post`,
          fa: `${baseUrl}/fa/blog/first-post`,
        },
      },
    },
  ];
}
