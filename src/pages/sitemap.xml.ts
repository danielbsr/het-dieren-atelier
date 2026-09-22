import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/site';

/**
 * Sitemap.
 *
 * Met de hand, omdat deze site zeven pagina's heeft en een plugin
 * daarvoor meer onderhoud is dan deze lijst. De paden staan hier zonder
 * base-prefix: een sitemap hoort de URL's van het echte domein te geven,
 * niet die van de preview in een submap.
 *
 * Prioriteiten lopen mee met de klantreis: werk zien → concept begrijpen
 * → pakket kiezen → boeken. De afsluitende slash hoort erbij: Astro
 * bouwt mappen, dus /contact/ is de canonieke URL en /contact niet.
 */
const PAGES: { path: string; priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/portfolio', priority: '0.9' },
  { path: '/fotoshoot-tarieven', priority: '0.9' },
  { path: '/werkwijze', priority: '0.8' },
  { path: '/wanddecoratie', priority: '0.8' },
  { path: '/over-ons', priority: '0.6' },
  { path: '/contact', priority: '0.9' },
  { path: '/privacybeleid', priority: '0.2' },
  { path: '/cookiebeleid', priority: '0.2' },
  { path: '/algemene-voorwaarden', priority: '0.2' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  ({ path, priority }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path + '/'}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
