import type { APIRoute } from 'astro';
import {
  BOOKING_URL,
  EXTRA_PORTRAIT,
  FAQ_SHORT,
  ON_LOCATION,
  PACKAGE_NOTE,
  PACKAGES,
  SITE_URL,
  STUDIO,
  WALL_ART_PRODUCTS,
} from '../data/site';

/**
 * llms.txt — een korte, platte samenvatting van de site voor
 * AI-zoekmachines (llmstxt.org). Geen officiële standaard en niet
 * bewezen in gebruik bij de grote aanbieders, maar goedkoop en
 * onschuldig.
 *
 * Opgebouwd uit dezelfde data als de pagina's, dus een prijs die in
 * site.ts verandert, verandert hier mee. De URL's staan op het echte
 * domein, net als in de sitemap.
 */
/** Opsommingspunten als één regel lopende tekst: 'Max. 45 minuten; 1 achtergrond' → 'max. 45 minuten; 1 achtergrond'. */
const inline = (items: readonly string[]) =>
  items.map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join('; ');

const url = (path: string) => `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;

const PAGES = [
  ['Home', '/', 'Overzicht van de studio, pakketten, werkwijze en wanddecoratie.'],
  ['Portfolio', '/portfolio', 'Studioportretten van honden, katten, vogels, konijnen en cavia\'s.'],
  ['Fotoshoot & tarieven', '/fotoshoot-tarieven', 'De studiopakketten, het locatieportret en een vergelijking.'],
  ['Werkwijze', '/werkwijze', 'Zo verloopt een fotoshoot, stap voor stap, plus de volledige FAQ.'],
  ['Wanddecoratie', '/wanddecoratie', 'Fine Art, aluminium en plexiglas: materialen, vanafprijzen en advies.'],
  ['Over ons', '/over-ons', 'Wie er achter de studio zitten en hoe we met dieren werken.'],
  ['Contact', '/contact', 'Boeken, adres met kaart, WhatsApp, telefoon en e-mail.'],
] as const;

const LEGAL = [
  ['Algemene voorwaarden', '/algemene-voorwaarden'],
  ['Privacybeleid', '/privacybeleid'],
  ['Cookiebeleid', '/cookiebeleid'],
] as const;

export const GET: APIRoute = () => {
  const body = `# ${STUDIO.name}

> Dierenfotostudio in ${STUDIO.city} bij Hoorn (${STUDIO.region}). Professionele studioportretten van honden, katten en andere huisdieren, afgewerkt als wanddecoratie. ${STUDIO.byAppointment}.

**Studio**

- Adres: ${STUDIO.address}
- Telefoon en WhatsApp: ${STUDIO.phone}
- E-mail: ${STUDIO.email}
- Instagram: ${STUDIO.instagramUrl}
- Online boeken: ${BOOKING_URL}
- ${STUDIO.parking}
- KVK: ${STUDIO.kvk}

**Studiopakketten**

${PACKAGES.map((pkg) => `- ${pkg.name}, ${pkg.price}: ${inline(pkg.highlights)}.`).join('\n')}
- ${EXTRA_PORTRAIT.label}: ${EXTRA_PORTRAIT.price}.

${PACKAGE_NOTE}

**${ON_LOCATION.name}, ${ON_LOCATION.price}**

${ON_LOCATION.intro} Inclusief: ${inline(ON_LOCATION.highlights)}. ${ON_LOCATION.priceNote}

**Wanddecoratie**

${WALL_ART_PRODUCTS.map((p) => `- ${p.name}, ${p.from.toLowerCase()}: ${p.tagline}`).join('\n')}

Het formaat bepaalt de uiteindelijke prijs; daar adviseert de studio persoonlijk over.

**Veelgestelde vragen**

${FAQ_SHORT.map(({ q, a }) => `- ${q} ${a}`).join('\n')}

## Pagina's

${PAGES.map(([name, path, note]) => `- [${name}](${url(path)}): ${note}`).join('\n')}

## Optional

${LEGAL.map(([name, path]) => `- [${name}](${url(path)})`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
