export const articleDefinitions = [
  { id: 'ai-human-dominance', image: '/articles/ai-new.webp' },
  { id: 'docker-lie', image: '/articles/docker.jpeg' },
  { id: 'redis-database-cache-part-3', image: '/articles/redis.jpeg' },
  { id: 'redis-database-cache-part-2', image: '/articles/redis.jpeg' },
  { id: 'redis-database-cache', image: '/articles/redis.jpeg' },
  { id: 'tailwind-css-business', image: '/articles/tail.jpeg' },
  { id: 'react-server-component', image: '/articles/rsc.jpeg' },
  { id: 'networking-part-4', image: '/articles/networking.webp' },
  { id: 'networking-part-3', image: '/articles/networking.webp' },
  { id: 'networking-part-2', image: '/articles/networking.webp' },
  { id: 'networking-part-1', image: '/articles/networking-1.jpeg' },
] as const;

export type ArticleId = (typeof articleDefinitions)[number]['id'];

export const articlesPerPage = 7;
