import type { APIRoute } from 'astro';
import { loadKnowledgeEntries } from '../lib/content';
import { SITE } from '../lib/site';

const staticRoutes = [
  '/',
  '/search',
  '/knowledge',
  '/sources',
  '/harness',
  '/evals',
  '/governance',
  '/developers',
  '/open',
  '/about',
];

export const GET: APIRoute = () => {
  const knowledgeRoutes = loadKnowledgeEntries().map((entry) => `/knowledge/${entry.slug}`);
  const urls = [...staticRoutes, ...knowledgeRoutes];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${SITE.url}${path === '/' ? '' : path}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
