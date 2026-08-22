import type {MetadataRoute} from 'next';
import {articleDefinitions} from './lib/articles';

const siteUrl = 'https://wseemkharma.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const articleUrls = articleDefinitions.flatMap(({id}) => [
    {
      url: `${siteUrl}/en/articles/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/ar/articles/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/ar`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ar/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ar/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/articles`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ar/articles`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articleUrls,
  ];
}
