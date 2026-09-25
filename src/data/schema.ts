/**
 * Structured data (JSON-LD).
 *
 * Alles wat hier staat, staat ook zichtbaar op de pagina — en wordt uit
 * dezelfde data in site.ts opgebouwd, zodat een prijs of antwoord nooit
 * op de pagina verandert en in de structured data blijft hangen.
 * Google, Bing en AI-zoekmachines lezen dit om feiten over de studio
 * betrouwbaar over te nemen.
 */
import {
  EXTRA_PORTRAIT,
  ON_LOCATION,
  PACKAGES,
  SITE_URL,
  STUDIO,
  WALL_ART_PRODUCTS,
  type FaqGroup,
} from './site';

type Schema = Record<string, unknown>;

/** Vaste id van de studio, zodat pagina-schema's ernaar kunnen verwijzen. */
export const STUDIO_ID = `${SITE_URL}/#studio`;

/** '€249' of 'Vanaf €79' → 249 / 79. */
const euros = (price: string) => Number(price.replace(/[^\d]/g, ''));

/** Opsommingspunten als één regel lopende tekst: 'Max. 45 minuten; 1 achtergrond' → 'max. 45 minuten; 1 achtergrond'. */
const inline = (items: readonly string[]) =>
  items.map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join('; ');

const pageUrl = (path: string) => `${SITE_URL}${path}/`;

/** Het bedrijf zelf. Staat op elke pagina, via <Layout />. */
export const studioSchema = (image: string): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'PhotographyBusiness',
  '@id': STUDIO_ID,
  name: STUDIO.name,
  description:
    'Dierenfotostudio in Blokker bij Hoorn. Professionele studioportretten van honden, katten en andere huisdieren, afgewerkt als wanddecoratie.',
  url: SITE_URL,
  image,
  email: STUDIO.email,
  telephone: STUDIO.phone,
  priceRange: `${PACKAGES[0].price} - ${ON_LOCATION.price}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: STUDIO.street,
    postalCode: STUDIO.postcode,
    addressLocality: STUDIO.city,
    addressRegion: STUDIO.region,
    addressCountry: 'NL',
  },
  hasMap: STUDIO.mapsUrl,
  areaServed: ['Blokker', 'Hoorn', 'Noord-Holland'],
  sameAs: [STUDIO.instagramUrl],
  vatID: STUDIO.vat,
  identifier: { '@type': 'PropertyValue', name: 'KVK', value: STUDIO.kvk },
  publicAccess: false,
  availableLanguage: 'nl',
});

/**
 * De volledige FAQ. Alleen op Werkwijze: daar staat hij in zijn geheel,
 * en Google wil dezelfde vragen maar op één pagina gemarkeerd zien —
 * niet ook op de homepage en de tarievenpagina, die een selectie tonen.
 */
export const faqSchema = (groups: FaqGroup[]): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups
    .flatMap((group) => group.items)
    .map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
});

/** De drie studiopakketten, het locatieportret en het losse extra portret. */
export const packagesSchema = (): Schema => {
  const url = pageUrl('/fotoshoot-tarieven');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#fotoshoot`,
    name: 'Dierenfotoshoot',
    serviceType: 'Dierenfotografie',
    provider: { '@id': STUDIO_ID },
    areaServed: ['Blokker', 'Hoorn', 'Noord-Holland'],
    url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fotoshoot & tarieven',
      itemListElement: [
        ...PACKAGES.map((pkg) => ({
          '@type': 'Offer',
          name: `Studiopakket ${pkg.name}`,
          description: `${pkg.blurb} Inclusief: ${inline(pkg.highlights)}.`,
          price: euros(pkg.price),
          priceCurrency: 'EUR',
          url,
        })),
        {
          '@type': 'Offer',
          name: ON_LOCATION.name,
          description: `${ON_LOCATION.blurb} Inclusief: ${inline(ON_LOCATION.highlights)}. ${ON_LOCATION.priceNote}`,
          price: euros(ON_LOCATION.price),
          priceCurrency: 'EUR',
          url,
        },
        {
          '@type': 'Offer',
          name: EXTRA_PORTRAIT.label,
          description: EXTRA_PORTRAIT.body,
          price: euros(EXTRA_PORTRAIT.price),
          priceCurrency: 'EUR',
          url,
        },
      ],
    },
  };
};

/**
 * De drie materialen voor wanddecoratie. Het zijn vanafprijzen — het
 * formaat bepaalt de uiteindelijke prijs — dus als minPrice, niet als
 * vaste prijs.
 */
export const wallArtSchema = (): Schema => {
  const url = pageUrl('/wanddecoratie');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#wanddecoratie`,
    name: 'Dierenportret als wanddecoratie',
    serviceType: 'Wanddecoratie',
    provider: { '@id': STUDIO_ID },
    url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wanddecoratie',
      itemListElement: WALL_ART_PRODUCTS.map((product) => ({
        '@type': 'Offer',
        name: product.name,
        description: product.blurb,
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: euros(product.from),
          priceCurrency: 'EUR',
        },
        url,
      })),
    },
  };
};
