/**
 * Eén bron van waarheid voor navigatie, CTA's, pakketten, achtergronden,
 * reviews en FAQ.
 *
 * De site is volledig Nederlandstalig: alles wat een bezoeker leest staat
 * hier of in de pagina's, nooit half in het Engels. Componenten mogen
 * geen losse knoplabels of prijzen bevatten — die horen hier.
 */

/**
 * Deploy-pad-helpers.
 *
 * GitHub Pages serveert een project-repo vanuit een submap, dus elke
 * interne link draagt dat voorvoegsel. Op een root-deploy — eigen domein
 * of `npm run dev` — is BASE_URL '/' en doen beide helpers niets.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Zet het voorvoegsel voor een intern pad. Externe links en ankers gaan door. */
export const withBase = (href: string) =>
  href.startsWith('/') ? `${BASE}${href}` || '/' : href;

/** Haalt het voorvoegsel er weer af, om te vergelijken met Astro.url.pathname. */
export const stripBase = (path: string) =>
  (BASE && path.startsWith(BASE) ? path.slice(BASE.length) : path).replace(/\/$/, '') || '/';

/* ------------------------------------------------------------------ */
/* Studio                                                              */
/* ------------------------------------------------------------------ */

export const STUDIO = {
  name: 'Het Dieren Atelier',
  tagline: 'Dierenfotostudio voor honden, katten en andere huisdieren.',
  street: 'Gildenweg 3H',
  postcode: '1695 GD',
  city: 'Blokker',
  region: 'Noord-Holland',
  country: 'Nederland',
  /** Eén regel, voor gebruik in lopende tekst. */
  address: 'Gildenweg 3H, 1695 GD Blokker',
  /** Opent de studio in Google Maps. Zoek-op-adres, dus geen place ID nodig. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Gildenweg+3H%2C+1695+GD+Blokker%2C+Nederland',
  /** Sleutelloze Google Maps-embed voor de iframe in <MapEmbed />. */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Gildenweg+3H,+1695+GD+Blokker,+Nederland&hl=nl&z=14&output=embed',
  email: 'info@hetdierenatelier.com',
  /** Weergavevorm. `tel:` en `wa.me` strippen alles behalve de cijfers. */
  phone: '+31 6 23 99 97 51',
  whatsapp: '+31 6 23 99 97 51',
  instagram: '@het.dierenatelier',
  instagramUrl: 'https://www.instagram.com/het.dierenatelier/',
  kvk: '88276090',
  vat: 'NL004574195B88',
  parking: 'Gratis parkeren bij de studio',
  byAppointment: 'Uitsluitend op afspraak',
} as const;

/** Alleen de cijfers — voor `tel:` en `wa.me`. */
export const digitsOnly = (value: string) => value.replace(/\D/g, '');

/**
 * De WhatsApp-knop opent direct een gesprek met deze vraag er al in,
 * zodat iemand alleen nog op verzenden hoeft te drukken.
 */
export const WHATSAPP_MESSAGE =
  'Hi! Ik heb een vraag over een fotoshoot bij Het Dieren Atelier.';

export const WHATSAPP_URL = `https://wa.me/${digitsOnly(STUDIO.whatsapp)}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const PHONE_URL = `tel:${digitsOnly(STUDIO.phone)}`;
export const EMAIL_URL = `mailto:${STUDIO.email}`;

/**
 * Canoniek domein, voor canonical-links en social sharing.
 * Wijzigt alleen mee met het echte domein — zie <Layout />.
 */
export const SITE_URL = 'https://www.hetdierenatelier.com';

/**
 * Zolang de site op de preview-URL van GitHub Pages staat, wil je niet
 * dat Google die versie indexeert. Zet dit op `true` op de dag dat de
 * site op het echte domein live gaat.
 */
export const INDEXABLE = false;

/**
 * De enige boekingsbestemming. Elke "Boek jouw fotoshoot" op de site
 * wijst hierheen — via <BookButton />, het enige component dat eraan mag
 * linken.
 */
export const BOOKING_URL = 'https://calendly.com/ymlproductions-info/het-dieren-atelier';

/* ------------------------------------------------------------------ */
/* Navigatie & CTA's                                                   */
/* ------------------------------------------------------------------ */

export const NAV = [
  { label: 'Portfolio', href: withBase('/portfolio') },
  { label: 'Fotoshoot & tarieven', href: withBase('/fotoshoot-tarieven') },
  { label: 'Werkwijze', href: withBase('/werkwijze') },
  { label: 'Wanddecoratie', href: withBase('/wanddecoratie') },
  { label: 'Over ons', href: withBase('/over-ons') },
  { label: 'Contact', href: withBase('/contact') },
] as const;

/** Juridische links onderaan de footer. */
export const LEGAL_NAV = [
  { label: 'Privacybeleid', href: withBase('/privacybeleid') },
  { label: 'Cookiebeleid', href: withBase('/cookiebeleid') },
  { label: 'Algemene voorwaarden', href: withBase('/algemene-voorwaarden') },
  { label: 'Contact', href: withBase('/contact') },
] as const;

/**
 * De datum die onder aan de juridische pagina's staat. Eén constante,
 * zodat privacy- en cookiebeleid niet uit elkaar kunnen lopen; de
 * aangeleverde teksten dragen allebei "september 2026".
 */
export const LEGAL_UPDATED = 'september 2026';

/**
 * Vaste CTA-woordenschat. Eén werkwoordpaar overal — herhaling bouwt
 * vertrouwen, synoniemen bouwen twijfel. Nooit met de hand overtypen.
 */
export const CTA = {
  /** Extern: Calendly. Altijd via <BookButton />, nooit handmatig. */
  book: { label: 'Boek jouw fotoshoot', href: BOOKING_URL },
  /** Korte variant, voor de sticky balk op mobiel. */
  bookShort: 'Boek fotoshoot',
  packages: { label: 'Bekijk fotoshoots & tarieven', href: withBase('/fotoshoot-tarieven') },
  portfolio: { label: 'Bekijk portfolio', href: withBase('/portfolio') },
  process: { label: 'Bekijk de werkwijze', href: withBase('/werkwijze') },
  wallArt: { label: 'Bekijk wanddecoratie', href: withBase('/wanddecoratie') },
  contact: { label: 'Neem contact op', href: withBase('/contact') },
} as const;

/* ------------------------------------------------------------------ */
/* Cookies                                                             */
/* ------------------------------------------------------------------ */

/**
 * De tekst van het toestemmingsvenster.
 *
 * De site plaatst zelf geen cookies: geen statistieken, geen tracking,
 * geen advertenties. Wat wél toestemming nodig heeft is ingesloten
 * inhoud van derden — op dit moment alleen de Google Maps-kaart, die
 * pas laadt nadat iemand daar ja op zegt.
 *
 * De boekingsagenda van Calendly staat bewust in de noodzakelijke
 * categorie: die ís de dienst waarvoor iemand de boekingspagina opent,
 * en hem achter een extra klik zetten breekt precies waar de site voor
 * bedoeld is.
 */
export const CONSENT = {
  /** Opgeslagen onder deze sleutel; verhoog de versie om opnieuw te vragen. */
  storageKey: 'hda-cookie-consent',
  version: 1,
  title: 'Cookies op deze website',
  body: 'Deze website plaatst zelf geen statistiek- of marketingcookies. We laden wel een kaart van Google Maps, en die kan cookies plaatsen. Daar vragen we je eerst toestemming voor.',
  accept: 'Alles accepteren',
  reject: 'Alleen noodzakelijk',
  settings: 'Cookie-instellingen',
  categories: [
    {
      id: 'noodzakelijk',
      name: 'Noodzakelijk',
      required: true,
      body: 'Nodig om de website te laten werken en om een afspraak te kunnen boeken. Hieronder valt de boekingsagenda, omdat die de dienst is waarvoor je de boekingspagina opent.',
    },
    {
      id: 'extern',
      name: 'Externe inhoud',
      required: false,
      body: 'Ingesloten inhoud van andere partijen. Op dit moment alleen de Google Maps-kaart met de route naar de studio.',
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* USP's                                                               */
/* ------------------------------------------------------------------ */

/**
 * Vier beloftes, direct onder de hero. Bewust kort: dit blok moet in
 * één oogopslag te lezen zijn, ook op een telefoon.
 */
export const USPS = [
  {
    icon: 'studio' as const,
    title: 'Rustige privé-studio',
    body: 'Geen inloop, geen andere klanten. Jouw dier heeft de studio helemaal voor zich.',
  },
  {
    icon: 'clock' as const,
    title: 'Maximaal 45 minuten',
    body: 'Kort genoeg om leuk te blijven, lang genoeg om rustig te wennen.',
  },
  {
    icon: 'portrait' as const,
    title: 'Professioneel bewerkte portretten',
    body: 'Geen map vol kiekjes, maar één tot drie afgewerkte portretten.',
  },
  {
    icon: 'frame' as const,
    title: 'Hoogwaardige wanddecoratie',
    body: 'Fine Art, aluminium of plexiglas — persoonlijk advies in de studio.',
  },
];

/* ------------------------------------------------------------------ */
/* Achtergronden                                                       */
/* ------------------------------------------------------------------ */

export type BackdropKey = keyof typeof BACKDROPS;

/**
 * De achtergrondvoorraad van de studio.
 *
 * Geen verzonnen merkkleuren: elke hex is geprikt uit de achtergrond van
 * een echte sessiefoto, zodat een bijschrift als "Miep — parel" het
 * papier beschrijft waar de kat werkelijk op zat.
 *
 * `name` is het bijschrift, `adjective` de verbogen vorm voor in een
 * zin: "op een antracietkleurige achtergrond" leest als Nederlands,
 * "op een antraciet achtergrond" niet. Alt-teksten gebruiken de tweede.
 *
 * Gesorteerd van rustig naar diep — de volgorde van de kleurenstrip.
 */
export const BACKDROPS = {
  pearl: { name: 'Parel', adjective: 'parelkleurige', hex: '#b0a59e' },
  caramel: { name: 'Karamel', adjective: 'karamelkleurige', hex: '#b9957d' },
  sage: { name: 'Salie', adjective: 'saliegroene', hex: '#808881' },
  softblue: { name: 'Zachtblauw', adjective: 'zachtblauwe', hex: '#99b1c0' },
  taupe: { name: 'Taupe', adjective: 'taupekleurige', hex: '#6c5e5a' },
  forest: { name: 'Bosgroen', adjective: 'bosgroene', hex: '#4e594c' },
  midnight: { name: 'Middernacht', adjective: 'middernachtblauwe', hex: '#232c42' },
  charcoal: { name: 'Antraciet', adjective: 'antracietkleurige', hex: '#2e2d35' },
} as const;

/**
 * De kleurenstrip: één achtergrond, één foto, dezelfde uitsnede en
 * schaal over alle zeven. Die gelijkmatigheid maakt van een kleurenreeks
 * een gecureerde set — en de onderwerpen rouleren langs vijf diersoorten,
 * zodat zelfs de kleursectie vertelt dat we meer dan honden fotograferen.
 */
export const COLOUR_STRIP: { tone: BackdropKey; photo: string }[] = [
  { tone: 'pearl', photo: 'fien' },
  { tone: 'caramel', photo: 'knabbel' },
  { tone: 'sage', photo: 'noor' },
  { tone: 'softblue', photo: 'pip' },
  { tone: 'forest', photo: 'pim' },
  { tone: 'midnight', photo: 'storm' },
  { tone: 'charcoal', photo: 'guus' },
];

/* ------------------------------------------------------------------ */
/* Pakketten                                                           */
/* ------------------------------------------------------------------ */

export type Package = (typeof PACKAGES)[number];

/**
 * Drie studiopakketten. Het verschil is niet tijd — elke studiofotoshoot
 * duurt maximaal 45 minuten — maar het aantal afgewerkte portretten en
 * het aantal achtergronden.
 */
export const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential',
    price: '€249',
    blurb: 'Eén afgewerkt portret van jouw dier, op één achtergrond.',
    highlights: [
      'Max. 45 minuten fotoshoot',
      '1 professioneel bewerkt portret',
      '1 achtergrond',
      'Digitaal bestand in hoge resolutie',
      'Online selectiegalerij',
    ],
    guidance:
      'Je wilt één sterk portret van jouw dier, mooi afgewerkt en klaar voor de muur.',
    featured: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '€379',
    blurb: 'Twee portretten en meer keuze in achtergronden.',
    highlights: [
      'Max. 45 minuten fotoshoot',
      '2 professioneel bewerkte portretten',
      'Keuze uit meerdere achtergronden',
      'Digitale bestanden in hoge resolutie',
      'Online selectiegalerij',
      '€50 tegoed voor wanddecoratie',
    ],
    guidance:
      'Het pakket dat de meeste baasjes kiezen: twee afgewerkte portretten, meerdere achtergronden en €50 tegoed voor aan de muur.',
    featured: true,
  },
  {
    id: 'collection',
    name: 'Collection',
    price: '€549',
    blurb: 'Het volledige pakket: drie portretten en het hoogste tegoed.',
    highlights: [
      'Max. 45 minuten fotoshoot',
      '3 professioneel bewerkte portretten',
      'Keuze uit meerdere achtergronden',
      'Digitale bestanden in hoge resolutie',
      'Online selectiegalerij',
      '€100 tegoed voor wanddecoratie',
    ],
    guidance:
      'Voor wie meerdere beelden wil laten afwerken — of meerdere dieren, samen én apart — met €100 tegoed voor wanddecoratie.',
    featured: false,
  },
] as const;

/** Het label op het meest gekozen pakket. */
export const FEATURED_LABEL = 'Meest gekozen';

export const PACKAGE_NOTE =
  'Elk studiopakket duurt maximaal 45 minuten en bevat professioneel bewerkte portretten in hoge resolutie. Honden, katten en andere huisdieren zijn allemaal welkom.';

/** Losse meerprijs, los van de pakketten. */
export const EXTRA_PORTRAIT = {
  label: 'Extra professioneel bewerkt portret',
  price: '€50',
  body: 'Zie je in de selectiegalerij nog een beeld dat je niet kunt laten liggen? Dat laat je los bijbestellen.',
};

/**
 * De vierde optie: de studio reist, in plaats van het dier.
 *
 * Bewust geen vierde kolom naast de studiopakketten — het is anders
 * geprijsd, duurt langer en staat als één brede kaart in dezelfde
 * vormtaal direct onder de drie.
 */
export const ON_LOCATION = {
  id: 'locatieportret',
  eyebrow: 'Op locatie',
  name: 'Locatieportret',
  price: '€695',
  blurb: 'De mobiele studio komt naar jou toe.',
  intro:
    'Voor dieren die zich thuis het prettigst voelen, bouwen we onze mobiele studio bij jou op locatie op.',
  highlights: [
    'Tot 1 uur fotografie op locatie',
    '2 professioneel bewerkte portretten',
    'Maximaal 2 huisdieren voor dezelfde prijs',
    'Samen met de fotograaf de mooiste beelden selecteren',
    'Digitale bestanden in hoge resolutie',
    'Extra professioneel bewerkt portret: €50',
  ],
  priceNote: 'Reiskosten zijn afhankelijk van de afstand en bespreken we vooraf met je.',
  guidance:
    'Voor dieren die het meest ontspannen zijn in hun eigen omgeving — oudere honden, binnenkatten en dieren die slecht reizen.',
  /** Bestandsnamen in src/assets/rooms. */
  photo: 'locatie-portret',
  alt: 'Witte labradoodle zit in het duin bij het water, met wolkenlucht erachter',
  photoWide: 'locatie-samen',
  wideAlt: 'Baasje staat gebogen bij zijn witte labradoodle in een duinlandschap aan het water',
} as const;

/** Rijen van de vergelijkingstabel op Fotoshoot & tarieven. */
export const COMPARISON: { label: string; values: [string, string, string] }[] = [
  { label: 'Prijs', values: ['€249', '€379', '€549'] },
  {
    label: 'Duur fotoshoot',
    values: ['max. 45 minuten', 'max. 45 minuten', 'max. 45 minuten'],
  },
  {
    label: 'Professioneel bewerkte portretten',
    values: ['1', '2', '3'],
  },
  { label: 'Achtergronden', values: ['1', 'meerdere', 'meerdere'] },
  { label: 'Online selectiegalerij', values: ['Ja', 'Ja', 'Ja'] },
  { label: 'Digitale bestanden in hoge resolutie', values: ['Ja', 'Ja', 'Ja'] },
  { label: 'Meerdere huisdieren mogelijk', values: ['Ja', 'Ja', 'Ja'] },
  { label: 'Baasje mee op de foto', values: ['Mogelijk', 'Mogelijk', 'Mogelijk'] },
  { label: 'Tegoed voor wanddecoratie', values: ['—', '€50', '€100'] },
  {
    label: 'Extra professioneel bewerkt portret',
    values: ['€50 per portret', '€50 per portret', '€50 per portret'],
  },
];

/* ------------------------------------------------------------------ */
/* Werkwijze                                                           */
/* ------------------------------------------------------------------ */

/**
 * Vijf stappen, van boeken tot het kunstwerk aan de muur.
 * `photo` verwijst naar een bestandsnaam in src/assets — zie photos.ts.
 */
export const STEPS = [
  {
    number: '01',
    title: 'Boek jouw fotoshoot',
    short: 'Kies online een datum en tijd die jou uitkomt.',
    long: 'Kies in de agenda een beschikbare datum en tijd. Je ontvangt een bevestiging en een korte voorbereiding: neem de favoriete snacks en eventueel een speeltje mee. Veel meer voorbereiding is er niet.',
    photo: undefined as string | undefined,
    alt: '',
    panelNote: 'Online, in een paar klikken',
  },
  {
    number: '02',
    title: 'Welkom in de studio',
    short: 'Jouw dier krijgt rustig de tijd om te wennen.',
    long: 'Kom zonder haast binnen. De studio is rustig, er loopt niemand anders rond en de eerste minuten zijn om te snuffelen en rond te kijken. We beginnen pas als jouw dier laat zien dat het zich op zijn gemak voelt.',
    photo: 'stap-welkom',
    alt: 'Fotograaf zit op de studiovloer tegenover een bruine spaniël voor een zandkleurige achtergrond',
  },
  {
    number: '03',
    title: 'De fotoshoot',
    short: 'We fotograferen jouw dier en maken verschillende portretten.',
    long: 'We werken in korte rondes met pauzes ertussen. Geluidjes, speeltjes en snacks sturen de aandacht — stilzitten op commando hoeft niet. In maximaal 45 minuten maken we verschillende composities en achtergronden.',
    photo: 'stap-fotoshoot',
    alt: 'Camerascherm met daarop een labradoodle, die op de achtergrond voor de studioachtergrond zit',
  },
  {
    number: '04',
    title: 'Kies jouw favorieten',
    short: 'Samen of via de online galerij kies je de mooiste beelden.',
    long: 'Na de fotoshoot krijg je een selectie van de beste beelden te zien in een online selectiegalerij. Daaruit kies je jouw favoriete portret of portretten. Alleen die beelden worden volledig professioneel nabewerkt.',
    photo: undefined as string | undefined,
    alt: '',
    panelNote: 'In jouw persoonlijke selectiegalerij',
  },
  {
    number: '05',
    title: 'Van foto naar kunstwerk',
    short: 'De gekozen portretten worden bewerkt en kunnen als wanddecoratie.',
    long: 'De gekozen portretten worden professioneel nabewerkt en digitaal in hoge resolutie geleverd. Wil je er een kunstwerk van maken? Dan kiezen we samen het materiaal en formaat: Fine Art, aluminium of plexiglas.',
    photo: 'stap-kunstwerk',
    alt: 'Fotograaf bewerkt een portret van een zwarte poedel op een groot scherm, met een ingelijst portret aan de muur',
  },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

/** De korte selectie op de homepage. */
export const FAQ_SHORT: FaqItem[] = [
  {
    q: 'Mijn hond kan niet stilzitten. Is dat een probleem?',
    a: 'Nee. Een hond hoeft niet lang stil te kunnen zitten voor een mooi portret. We werken rustig en gebruiken waar nodig snacks, speeltjes of geluidjes om op het juiste moment de aandacht te krijgen.',
  },
  {
    q: 'Mijn huisdier is onzeker of snel bang. Kan dat?',
    a: 'Ja. Ieder dier reageert anders op een nieuwe omgeving. We geven jouw huisdier rustig de tijd om te wennen aan de studio, fotograaf en apparatuur. We forceren niets en passen de fotoshoot zoveel mogelijk aan het tempo van jouw dier aan.',
  },
  {
    q: 'Hoe lang duurt een dierenfotoshoot?',
    a: 'Een fotoshoot in onze studio duurt maximaal 45 minuten. Zo hebben we voldoende tijd om jouw huisdier rustig te laten wennen en verschillende beelden te maken.',
  },
  {
    q: 'Krijg ik alle gemaakte foto’s?',
    a: 'Nee. Bij Het Dieren Atelier draait het om kwaliteit in plaats van grote aantallen. Afhankelijk van het gekozen pakket ontvang je 1, 2 of maximaal 3 professioneel bewerkte portretten.',
  },
];

/** De volledige FAQ, in de rubrieken van de studio. */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'Voor de fotoshoot',
    items: [
      {
        q: 'Welke dieren fotograferen jullie?',
        a: 'Bij Het Dieren Atelier fotograferen we honden, katten en andere huisdieren. Heb je een bijzonder huisdier en twijfel je of een fotoshoot mogelijk is? Neem dan vooraf even contact met ons op.',
      },
      {
        q: 'Mijn hond kan niet stilzitten. Is dat een probleem?',
        a: 'Nee. Een hond hoeft niet lang stil te kunnen zitten voor een mooi portret. We werken rustig en gebruiken waar nodig snacks, speeltjes of geluidjes om op het juiste moment de aandacht te krijgen.',
      },
      {
        q: 'Mijn huisdier is onzeker of snel bang. Kan dat?',
        a: 'Ja. Ieder dier reageert anders op een nieuwe omgeving. We geven jouw huisdier rustig de tijd om te wennen aan de studio, fotograaf en apparatuur. We forceren niets en passen de fotoshoot zoveel mogelijk aan het tempo van jouw dier aan.',
      },
      {
        q: 'Mijn hond kan niet los. Kan hij toch op de foto?',
        a: 'Ja. Veiligheid staat altijd voorop. Als jouw hond niet los kan, zoeken we tijdens de fotoshoot naar de beste oplossing. Waar mogelijk kan een lijn tijdens de nabewerking uit het uiteindelijke portret worden verwijderd.',
      },
      {
        q: 'Moet mijn hond goed getraind zijn?',
        a: 'Nee. Commando’s zoals ‘zit’ kunnen handig zijn, maar zijn zeker geen vereiste. We zijn gewend om te fotograferen met verschillende karakters en energieniveaus.',
      },
      {
        q: 'Fotograferen jullie ook katten?',
        a: 'Zeker. Ook katten zijn welkom in onze fotostudio in Blokker. We geven katten voldoende tijd om rustig aan de nieuwe omgeving te wennen voordat we beginnen.',
      },
      {
        q: 'Fotograferen jullie ook puppy’s en kittens?',
        a: 'Ja. Ook jonge dieren kunnen worden gefotografeerd. We houden rekening met hun kortere concentratieboog en nemen waar nodig extra rustmomenten.',
      },
      {
        q: 'Wat moet ik meenemen naar de fotoshoot?',
        a: 'Neem de favoriete snacks en eventueel een favoriet speeltje van jouw huisdier mee. Een halsband en lijn zijn ook handig. Heeft jouw dier speciale behoeften of is er iets waar we rekening mee moeten houden? Laat het vooraf even weten.',
      },
      {
        q: 'Moet ik mijn huisdier voorbereiden op de fotoshoot?',
        a: 'Een uitgebreide voorbereiding is niet nodig. Zorg er vooral voor dat de vacht er naar wens uitziet. Bij een energieke hond kan een korte wandeling vooraf prettig zijn om alvast wat energie kwijt te raken.',
      },
    ],
  },
  {
    title: 'Tijdens de fotoshoot',
    items: [
      {
        q: 'Hoe lang duurt een dierenfotoshoot?',
        a: 'Een fotoshoot in onze studio duurt maximaal 45 minuten. Zo hebben we voldoende tijd om jouw huisdier rustig te laten wennen en verschillende beelden te maken.',
      },
      {
        q: 'Kunnen meerdere huisdieren samen op de foto?',
        a: 'Ja. Meerdere huisdieren kunnen samen worden gefotografeerd. Wil je met meer dan twee huisdieren komen? Neem dan vooraf even contact met ons op, zodat we kunnen kijken wat het beste werkt.',
      },
      {
        q: 'Kunnen mijn huisdieren samen én apart worden gefotografeerd?',
        a: 'Ja. Als de tijd en het gedrag van de dieren dit toelaten, kunnen we zowel gezamenlijke als individuele portretten maken.',
      },
      {
        q: 'Kan ik zelf een achtergrondkleur kiezen?',
        a: 'Ja. In de studio hebben we verschillende achtergrondkleuren beschikbaar. Samen kijken we welke achtergrond het mooiste past bij de vacht, kleuren en uitstraling van jouw huisdier.',
      },
      {
        q: 'Hoeveel foto’s worden er tijdens de fotoshoot gemaakt?',
        a: 'Tijdens de shoot maken we meerdere foto’s en verschillende composities. Daarna worden de beste beelden geselecteerd, waaruit jij jouw favoriete portret of portretten kiest.',
      },
      {
        q: 'Krijg ik alle gemaakte foto’s?',
        a: 'Nee. Bij Het Dieren Atelier draait het om kwaliteit in plaats van grote aantallen foto’s. Afhankelijk van het gekozen pakket ontvang je 1, 2 of maximaal 3 professioneel bewerkte portretten. De overige onbewerkte bestanden worden niet geleverd.',
      },
      {
        q: 'Kan ik extra portretten bestellen?',
        a: 'Ja. Wil je na het zien van de selectie meer foto’s laten bewerken? Een extra professioneel bewerkt portret kost €50 per foto.',
      },
      {
        q: 'Wat gebeurt er als mijn huisdier niet meewerkt?',
        a: 'Geen probleem. We proberen verschillende manieren om jouw huisdier op zijn gemak te stellen en de aandacht te krijgen. We nemen waar nodig een korte pauze en forceren niets.',
      },
      {
        q: 'Wat gebeurt er als de fotoshoot echt niet lukt?',
        a: 'We doen er alles aan om geschikte beelden te maken, maar het welzijn van jouw huisdier staat altijd voorop. Mocht het ondanks onze inspanningen echt niet lukken om geschikte beelden te maken, dan blijft 50% van het gekozen pakket verschuldigd. De studio en tijd zijn namelijk speciaal voor jouw afspraak gereserveerd.',
      },
    ],
  },
  {
    title: 'Na de fotoshoot',
    items: [
      {
        q: 'Hoe kies ik mijn favoriete portretten?',
        a: 'Na de fotoshoot krijg je een selectie van de beste beelden te zien. Hieruit kies je jouw favoriete portret of portretten. Alleen de gekozen beelden worden vervolgens volledig professioneel nabewerkt.',
      },
      {
        q: 'Krijg ik de onbewerkte foto’s?',
        a: 'Nee. Onbewerkte bestanden worden niet geleverd. Je ontvangt alleen de door jou gekozen en professioneel afgewerkte portretten in hoge resolutie.',
      },
      {
        q: 'Wanneer ontvang ik mijn foto’s?',
        a: 'De gemiddelde levertijd voor digitaal bewerkte portretten is 5 tot 10 werkdagen nadat de definitieve selectie is gemaakt. Heb je jouw foto’s voor een bepaalde datum nodig? Neem dan contact met ons op. Bij spoed kijken we graag samen wat mogelijk is.',
      },
      {
        q: 'Hoe ontvang ik mijn foto’s?',
        a: 'De gekozen portretten worden professioneel nabewerkt en digitaal in hoge resolutie aangeleverd.',
      },
      {
        q: 'Kan ik later nog extra portretten bestellen?',
        a: 'Extra portretten kunnen worden besteld zolang de betreffende bestanden nog beschikbaar zijn. Wil je achteraf een extra beeld laten bewerken? Neem dan zo snel mogelijk contact met ons op.',
      },
    ],
  },
  {
    title: 'Wanddecoratie',
    items: [
      {
        q: 'Kan ik mijn dierenportret ook als wanddecoratie bestellen?',
        a: 'Ja. Jouw favoriete portret kan worden uitgevoerd als hoogwaardige wanddecoratie. Zo kun je van jouw dierenfoto een persoonlijk kunstwerk voor aan de muur maken.',
      },
      {
        q: 'Welke materialen zijn beschikbaar?',
        a: 'Je kunt kiezen uit Fine Art, aluminium en plexiglas. Fine Art heeft een zachte, matte en tijdloze uitstraling en is ook ingelijst verkrijgbaar. Aluminium geeft een strakke en moderne afwerking met een rustige uitstraling. Plexiglas is een luxe afwerking met veel diepte, heldere kleuren en scherpe details.',
      },
      {
        q: 'Welke formaten zijn mogelijk?',
        a: 'Vrijwel ieder gewenst formaat is mogelijk. Het ideale formaat is afhankelijk van het portret, het gekozen materiaal en de plek waar het kunstwerk komt te hangen. Daarom geven we hierover graag persoonlijk advies. In de studio kunnen we samen de verschillende mogelijkheden bekijken en het juiste formaat bepalen.',
      },
      {
        q: 'Kan ik de materialen eerst in het echt bekijken?',
        a: 'Ja. In onze studio kun je Fine Art, aluminium en plexiglas bekijken en vergelijken voordat je een keuze maakt.',
      },
      {
        q: 'Kunnen jullie helpen met het kiezen van het juiste materiaal?',
        a: 'Zeker. We helpen je graag bij het kiezen van een materiaal en formaat dat mooi aansluit bij het portret én jouw interieur.',
      },
      {
        q: 'Hoe lang duurt de levering van wanddecoratie?',
        a: 'De levertijd is afhankelijk van het gekozen materiaal en formaat. Bij het bestellen laten we weten wat de verwachte levertijd is. Heb je het kunstwerk met spoed nodig? Laat het ons weten, dan kijken we samen wat mogelijk is.',
      },
    ],
  },
  {
    title: 'Fotoshoot op locatie',
    items: [
      {
        q: 'Komen jullie ook bij mij thuis fotograferen?',
        a: 'Ja. Met ons Locatieportret komen we met een mobiele fotostudio naar jou toe. Dit kan prettig zijn voor dieren die zich in hun eigen omgeving het meest op hun gemak voelen.',
      },
      {
        q: 'Wat is inbegrepen bij een Locatieportret?',
        a: 'Bij het Locatieportret reserveren we maximaal 1 uur en zijn 2 professioneel bewerkte portretten inbegrepen. De prijs geldt voor maximaal 2 huisdieren.',
      },
      {
        q: 'Wat kost een dierenfotoshoot op locatie?',
        a: 'Een Locatieportret kost €695. Eventuele reiskosten zijn afhankelijk van de locatie en worden vooraf met je besproken.',
      },
      {
        q: 'Kan ik bij een Locatieportret extra foto’s bestellen?',
        a: 'Ja. Ook bij een fotoshoot op locatie kun je extra professioneel bewerkte portretten bestellen voor €50 per foto.',
      },
    ],
  },
  {
    title: 'Studio & bereikbaarheid',
    items: [
      {
        q: 'Waar is Het Dieren Atelier gevestigd?',
        a: 'Onze dierenfotostudio is gevestigd aan de Gildenweg 3H, 1695 GD Blokker. De studio ligt direct naast Hoorn in Noord-Holland.',
      },
      {
        q: 'Kan ik gratis parkeren?',
        a: 'Ja. Je kunt gratis parkeren bij de studio.',
      },
      {
        q: 'Werken jullie alleen op afspraak?',
        a: 'Ja. Het Dieren Atelier werkt uitsluitend op afspraak. Zo kunnen we voor iedere dierenfotoshoot voldoende tijd en aandacht reserveren.',
      },
    ],
  },
  {
    title: 'Boeken & betalen',
    items: [
      {
        q: 'Hoe kan ik een fotoshoot boeken?',
        a: 'Via de knop ‘Boek jouw fotoshoot’ op de website kun je direct een beschikbare datum en tijd kiezen.',
      },
      {
        q: 'Kan ik eerst een vraag stellen voordat ik boek?',
        a: 'Natuurlijk. Via de WhatsApp-knop op onze website kun je gemakkelijk contact opnemen als je vooraf iets wilt bespreken.',
      },
      {
        q: 'Wat kost een dierenfotoshoot?',
        a: 'Onze dierenfotoshoots in de studio beginnen vanaf €249. Afhankelijk van het gekozen pakket ontvang je 1, 2 of 3 professioneel bewerkte portretten. Een Locatieportret bij jou thuis kost €695.',
      },
      {
        q: 'Hoe kan ik betalen?',
        a: 'De fotoshoot wordt in onze studio betaald. Je kunt betalen per pin of contant.',
      },
      {
        q: 'Kan ik mijn afspraak annuleren of verplaatsen?',
        a: 'Ja. Laat het ons zo snel mogelijk weten als je afspraak niet door kan gaan. Bij annulering of verplaatsing binnen 24 uur voor de afspraak brengen we €75 annuleringskosten in rekening.',
      },
      {
        q: 'Wat gebeurt er als ik niet op mijn afspraak verschijn?',
        a: 'Neem altijd zo snel mogelijk contact met ons op als je onverwacht niet kunt komen. Bij het niet verschijnen op een afspraak behouden we ons het recht voor om kosten voor de gereserveerde tijd in rekening te brengen.',
      },
    ],
  },
  {
    title: 'Cadeaubonnen',
    items: [
      {
        q: 'Kan ik een dierenfotoshoot cadeau geven?',
        a: 'Ja! Bij Het Dieren Atelier zijn cadeaubonnen voor een dierenfotoshoot verkrijgbaar. Een persoonlijk cadeau voor iemand die gek is op zijn of haar hond, kat of ander huisdier.',
      },
      {
        q: 'Hoe bestel ik een cadeaubon?',
        a: 'Neem eenvoudig contact met ons op via WhatsApp of via de e-mail. We helpen je vervolgens met het kiezen van een passend bedrag of fotoshoot.',
      },
      {
        q: 'Kan de ontvanger zelf een datum kiezen?',
        a: 'Ja. De ontvanger kan zelf een beschikbare datum voor de fotoshoot kiezen.',
      },
    ],
  },
];

/** De rubrieken die op Fotoshoot & tarieven staan, direct onder de pakketten. */
export const FAQ_BOOKING: FaqItem[] =
  FAQ_GROUPS.find((group) => group.title === 'Boeken & betalen')?.items ?? [];

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

/** Echte klantreacties. */
export const REVIEWS: {
  quote: string;
  author: string;
  date: string;
  rating: number;
}[] = [
  {
    quote:
      'Super fijne ervaring! Moos is normaal best druk en ik vroeg me vooraf af of het zou lukken om hem goed op de foto te krijgen. Er werd echt rustig de tijd genomen en dat zie je terug in het resultaat. Uiteindelijk was kiezen nog het moeilijkste. Heel blij met de foto’s!',
    author: 'Sanne & Moos',
    date: '12 september 2026',
    rating: 5,
  },
  {
    quote:
      'Vanaf het moment dat we binnenkwamen voelde het heel ontspannen. Bobby moest eerst even wennen aan de studio, maar daar werd totaal geen druk op gelegd. De foto’s zijn echt prachtig geworden en vooral heel erg ‘Bobby’. Zeker een aanrader als je iets bijzonders van je huisdier wilt laten maken.',
    author: 'Lisa & Bobby',
    date: '6 september 2026',
    rating: 5,
  },
  {
    quote:
      'Ontzettend blij met het eindresultaat. Nala werkt normaal niet bepaald mee zodra er een camera tevoorschijn komt, maar tijdens de shoot ging het verrassend goed. De begeleiding was rustig en professioneel en de foto’s zijn echt super scherp en mooi afgewerkt. We hebben er uiteindelijk ook één groot voor aan de muur besteld.',
    author: 'Mark & Nala',
    date: '29 augustus 2026',
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/* Wanddecoratie                                                       */
/* ------------------------------------------------------------------ */

/**
 * Drie materialen, in de volgorde van toegankelijk naar luxe.
 * `photo`-waarden zijn bestandsnamen in src/assets/rooms.
 *
 * `from` is een vanafprijs: het formaat bepaalt de uiteindelijke prijs,
 * en daar adviseert de studio persoonlijk over. Een vanafprijs geeft de
 * orde van grootte zonder een bedrag te beloven dat van de maat afhangt.
 */
export const WALL_ART_PRODUCTS = [
  {
    id: 'fine-art',
    name: 'Fine Art',
    from: 'Vanaf €79',
    tagline: 'Zacht, mat en tijdloos.',
    blurb:
      'Een zachte, matte en tijdloze uitstraling op museumwaardig papier. Onze meest toegankelijke optie voor wanddecoratie, en ook ingelijst verkrijgbaar.',
    points: [
      'Zachte, matte afdruk met diepe zwarten',
      'Los of ingelijst met passe-partout',
      'Vrijwel ieder formaat mogelijk',
    ],
    recommended: false,
    photo: 'fineart',
    alt: 'Fine Art-print van een zwarte dog, leunend tegen een muur naast een keramieken vaas',
    detail: 'fineart-ingelijst',
    detailAlt:
      'Ingelijste Fine Art-print van een zwarte dog met passe-partout boven een eiken dressoir',
    detailLabel: 'Fine Art, ingelijst',
  },
  {
    id: 'aluminium',
    name: 'Aluminium',
    from: 'Vanaf €89',
    tagline: 'Modern, strak en mat.',
    blurb:
      'Een strakke en moderne afwerking met een rustige uitstraling. Zonder glas en zonder lijst: het portret lijkt los van de muur te zweven.',
    points: [
      'Geen glas, dus geen spiegeling',
      'Slank profiel dat vrij van de muur hangt',
      'Onderhoudsvriendelijk en zeer duurzaam',
    ],
    recommended: false,
    photo: 'aluminium',
    alt: 'Groot aluminium portret van een border collie op een blauwe achtergrond in een lichte woonkamer',
    detail: 'aluminium-portret',
    detailAlt:
      'Aluminium portret van een zwarte dog boven een houten bank in een woonkamer met hoge ramen',
    detailLabel: 'Aluminium in een woonkamer',
  },
  {
    id: 'plexiglas',
    name: 'Plexiglas',
    from: 'Vanaf €99',
    tagline: 'Diepe kleuren, scherpe details en een luxe afwerking.',
    blurb:
      'Het portret achter gepolijst acrylaat: maximale diepte, glans en kleurkracht. Het materiaal waar studioportretten het meest tot leven komen — en daarom onze aanrader.',
    points: [
      'Hoogglans afwerking die het beeld laat oplichten',
      'De afwerking die studioachtergronden laat stralen',
      'Ideaal voor dat ene grote statement aan de muur',
    ],
    recommended: true,
    photo: 'plexiglas',
    alt: 'Plexiglas portret van een ragdollkat boven een eiken dressoir in een lichte woonkamer',
    detail: 'plexiglas-2',
    detailAlt:
      'Plexiglas portret van een ragdollkat aan een woonkamermuur, met zonlicht erop',
    detailLabel: 'Plexiglas in een woonkamer',
  },
];

/** Het label op het aanbevolen materiaal. */
export const RECOMMENDED_LABEL = 'Meest aanbevolen';

/**
 * De drie materialen zoals ze op de homepage staan: een interieurbeeld
 * per materiaal, met de vanafprijs eronder. Bewust andere beelden dan
 * de wanddecoratiepagina, zodat wie doorklikt niet dezelfde drie foto's
 * nog een keer krijgt.
 */
export const HOME_MATERIALS = WALL_ART_PRODUCTS.map((product) => ({
  name: product.name,
  from: product.from,
  photo: product.id === 'fine-art' ? 'fineart-ingelijst' : product.photo,
  alt: product.id === 'fine-art'
    ? 'Ingelijste Fine Art-print van een zwarte dog boven een eiken dressoir'
    : product.alt,
}));

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export type PortfolioItem = {
  name: string;
  tone: BackdropKey;
  species: 'honden' | 'katten' | 'vogels' | 'konijnen' | 'overig';
  /** Voor de alt-tekst en de silhouet-placeholder. */
  animal: 'dog' | 'cat' | 'rabbit' | 'bird' | 'guineapig';
  /** Bestandsnaam in src/assets/portraits. Ontbreekt: de placeholder rendert. */
  photo?: string;
  /** Korte Nederlandse omschrijving van het dier, voor de alt-tekst. */
  subject?: string;
};

/** Nederlandse soortnaam, voor alt-teksten. */
export const ANIMAL_NOUN: Record<NonNullable<PortfolioItem['animal']>, string> = {
  dog: 'hond',
  cat: 'kat',
  rabbit: 'konijn',
  bird: 'vogel',
  guineapig: 'cavia',
};

/**
 * Home: de zes portretten die bepalen wat een bezoeker denkt dat de
 * studio fotografeert. Twee honden, twee katten, een vogel en een
 * konijn — nooit zes honden.
 */
export const HOME_SELECTION: PortfolioItem[] = [
  { name: 'Nova', photo: 'nova', tone: 'charcoal', species: 'honden', animal: 'dog', subject: 'Australische herder' },
  { name: 'Miep', photo: 'miep', tone: 'pearl', species: 'katten', animal: 'cat', subject: 'Brits korthaar' },
  { name: 'Pip', photo: 'pip', tone: 'softblue', species: 'vogels', animal: 'bird', subject: 'valkparkiet' },
  { name: 'Bono', photo: 'bono', tone: 'pearl', species: 'honden', animal: 'dog', subject: 'teckel' },
  { name: 'Pim', photo: 'pim', tone: 'forest', species: 'konijnen', animal: 'rabbit', subject: 'konijn' },
  { name: 'Wolke', photo: 'wolke', tone: 'midnight', species: 'katten', animal: 'cat', subject: 'rode kat' },
];

/**
 * Portfoliopagina: het volledige bereik, geordend op twee assen
 * tegelijk — geen twee portretten van dezelfde soort naast elkaar, en
 * geen twee op dezelfde achtergrond naast elkaar.
 *
 * Het aantal is bewust 24: deelbaar door 1, 2 en 3, dus het grid sluit
 * op elke breedte met een volle rij af. Bij 23 bleef er rechtsonder een
 * lege cel staan, wat als een ontbrekende foto las.
 */
export const PORTFOLIO: PortfolioItem[] = [
  { name: 'Nova', photo: 'nova', tone: 'charcoal', species: 'honden', animal: 'dog', subject: 'Australische herder' },
  { name: 'Miep', photo: 'miep', tone: 'pearl', species: 'katten', animal: 'cat', subject: 'Brits korthaar' },
  { name: 'Storm', photo: 'storm', tone: 'midnight', species: 'honden', animal: 'dog', subject: 'border collie' },
  { name: 'Pip', photo: 'pip', tone: 'softblue', species: 'vogels', animal: 'bird', subject: 'valkparkiet' },
  { name: 'Bono', photo: 'bono', tone: 'pearl', species: 'honden', animal: 'dog', subject: 'teckel' },
  { name: 'Juno', photo: 'juno', tone: 'charcoal', species: 'katten', animal: 'cat', subject: 'Maine Coon' },
  { name: 'Fien', photo: 'fien', tone: 'pearl', species: 'honden', animal: 'dog', subject: 'whippet' },
  { name: 'Pim', photo: 'pim', tone: 'forest', species: 'konijnen', animal: 'rabbit', subject: 'konijn' },
  { name: 'Guus', photo: 'guus', tone: 'charcoal', species: 'honden', animal: 'dog', subject: 'zwarte dog' },
  { name: 'Saar', photo: 'saar', tone: 'caramel', species: 'katten', animal: 'cat', subject: 'ragdoll' },
  { name: 'Roos', photo: 'roos', tone: 'midnight', species: 'honden', animal: 'dog', subject: 'poedel' },
  { name: 'Noor', photo: 'noor', tone: 'sage', species: 'katten', animal: 'cat', subject: 'bengaal' },
  { name: 'Bram', photo: 'bram', tone: 'pearl', species: 'honden', animal: 'dog', subject: 'Franse bulldog' },
  { name: 'Flip', photo: 'flip', tone: 'charcoal', species: 'vogels', animal: 'bird', subject: 'grijze roodstaart' },
  { name: 'Knabbel', photo: 'knabbel', tone: 'caramel', species: 'overig', animal: 'guineapig', subject: 'cavia' },
  { name: 'Koda', photo: 'koda', tone: 'charcoal', species: 'honden', animal: 'dog', subject: 'cockapoo-pup' },
  { name: 'Wolke', photo: 'wolke', tone: 'midnight', species: 'katten', animal: 'cat', subject: 'rode kat' },
  { name: 'Daan', photo: 'daan', tone: 'taupe', species: 'honden', animal: 'dog', subject: 'labrador' },
  { name: 'Sam', photo: 'sam', tone: 'sage', species: 'vogels', animal: 'bird', subject: 'agapornis' },
  { name: 'Joep', photo: 'joep', tone: 'charcoal', species: 'honden', animal: 'dog', subject: 'herdershond' },
  { name: 'Reza', photo: 'reza', tone: 'pearl', species: 'katten', animal: 'cat', subject: 'zwarte kat' },
  { name: 'Sep & Tijs', photo: 'duo-dogs', tone: 'charcoal', species: 'honden', animal: 'dog', subject: 'golden retriever en teckel samen' },
  { name: 'Bo & Nina', photo: 'duo-cats', tone: 'taupe', species: 'katten', animal: 'cat', subject: 'twee katten samen' },
  { name: 'Mila', photo: 'mila', tone: 'pearl', species: 'katten', animal: 'cat', subject: 'kitten' },
];

export const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'Alles' },
  { id: 'honden', label: 'Honden' },
  { id: 'katten', label: 'Katten' },
  { id: 'vogels', label: 'Vogels' },
  { id: 'konijnen', label: 'Konijnen' },
  { id: 'overig', label: 'Overige huisdieren' },
] as const;
