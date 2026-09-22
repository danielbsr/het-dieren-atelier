# Het Dieren Atelier

De website van Het Dieren Atelier — een dierenfotostudio aan de Gildenweg 3H in
Blokker, naast Hoorn. Statische site op Astro 5 en Tailwind 4, volledig
Nederlandstalig.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # naar ./dist
npm run preview  # de build lokaal bekijken
```

## Waar wat staat

```
src/
├── data/
│   ├── site.ts      ← alle teksten, prijzen, pakketten, FAQ, reviews, navigatie
│   └── photos.ts    ← zoekt foto's op bestandsnaam
├── assets/
│   ├── portraits/   ← studioportretten van dieren
│   └── rooms/       ← interieurbeelden, materialen, behind the scenes
├── components/
├── layouts/Layout.astro   ← <head>, SEO, structured data
├── pages/           ← één .astro per route
└── styles/global.css
```

**`src/data/site.ts` is de enige plek waar inhoud hoort.** Prijzen, knoplabels,
FAQ-antwoorden en adresgegevens staan daar en nergens anders, zodat een wijziging
overal tegelijk doorwerkt. Componenten bevatten geen losse teksten.

Foto's staan in `src/assets/` en niet in `public/`, omdat alleen bestanden onder
`src/` door Astro's image pipeline gaan — die maakt van één bron de WebP-formaten
die elke plek in de layout nodig heeft. Een foto wordt gekoppeld op bestandsnaam:
`nova.webp` in `portraits/` vult de plek `'nova'`. Nieuwe fotografie inhangen:

```bash
npm run photos -- ~/pad/naar/map
```

## Routes

| Pad                      | Pagina                          |
| ------------------------ | ------------------------------- |
| `/`                      | Home                            |
| `/portfolio`             | Portfolio, met lightbox         |
| `/fotoshoot-tarieven`    | Pakketten en prijzen            |
| `/werkwijze`             | Vijf stappen + volledige FAQ    |
| `/wanddecoratie`         | Fine Art, aluminium, plexiglas  |
| `/over-ons`              | Over de studio                  |
| `/contact`               | Calendly-agenda en contact      |
| `/privacybeleid`         | Privacybeleid (tekst van de studio) |
| `/cookiebeleid`          | Cookiebeleid (tekst van de studio)  |
| `/algemene-voorwaarden`  | Algemene voorwaarden (concept)  |
| `/404`                   | Foutpagina                      |
| `/sitemap.xml`, `/robots.txt` | Gegenereerd uit `site.ts`  |

De teksten op `/privacybeleid` en `/cookiebeleid` zijn letterlijk aangeleverd door
de studio — alleen de opmaak is van ons. Niet herschrijven zonder overleg.
`/algemene-voorwaarden` is nog een concept en moet juridisch worden nagekeken.

## Voor de livegang

1. Zet `INDEXABLE` in `src/data/site.ts` op `true`. Dat haalt in één keer de
   `noindex`-meta weg en zet `robots.txt` open voor zoekmachines.
2. Controleer `SITE_URL` in hetzelfde bestand — die bepaalt de canonical-links,
   de social sharing-URL en de sitemap.
3. Haal in `astro.config.mjs` de `base` weg zodra de site op een eigen domein
   staat in plaats van in de submap van GitHub Pages.
4. Het cookiebeleid belooft een optie 'Cookie-instellingen'. Die bestaat nog
   niet: de site zet zelf geen cookies, maar laadt wel de agenda van Calendly en
   een kaart van Google Maps. Bouw een toestemmingsvenster of pas de tekst aan
   voordat de site live gaat.
