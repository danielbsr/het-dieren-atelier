import type { APIRoute } from 'astro';
import { INDEXABLE, SITE_URL } from '../data/site';

/**
 * robots.txt.
 *
 * Zolang INDEXABLE uitstaat draait de site op een preview-URL en zetten
 * we alles op slot — dezelfde schakelaar die de noindex-meta in
 * <Layout /> aanstuurt, zodat de twee nooit uit elkaar kunnen lopen.
 */
export const GET: APIRoute = () => {
  const body = INDEXABLE
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
