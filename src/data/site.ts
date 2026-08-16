/**
 * Single source of truth for navigation, CTAs, packages, backdrops and FAQ.
 *
 * Items marked TO BE SUPPLIED are open questions from the concept
 * (section 7) and are rendered as visible placeholders on purpose, so
 * nothing invented ships by accident.
 */

/**
 * Deploy-path helpers.
 *
 * GitHub Pages serves a project repo from a subfolder, so every internal
 * link carries that prefix. On a root deploy — a custom domain, or
 * `npm run dev` — BASE_URL is '/' and both helpers are no-ops.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes an internal path. External links and anchors pass through. */
export const withBase = (href: string) =>
  href.startsWith('/') ? `${BASE}${href}` || '/' : href;

/** Strips the prefix again, for comparing a link against Astro.url.pathname. */
export const stripBase = (path: string) =>
  (BASE && path.startsWith(BASE) ? path.slice(BASE.length) : path).replace(/\/$/, '') || '/';

export const STUDIO = {
  name: 'Het Dieren Atelier',
  tagline: 'Studio portraits of dogs, cats and other pets.',
  city: '[City]',
  country: 'the Netherlands',
  address: '[Street, postcode, city — TO BE SUPPLIED]',
  email: '[email — TO BE SUPPLIED]',
  phone: '[phone — TO BE SUPPLIED]',
  instagram: '[@handle — TO BE SUPPLIED]',
  instagramUrl: '#',
  parking: '[Parking and accessibility — TO BE SUPPLIED]',
} as const;

export const NAV = [
  { label: 'Portfolio', href: withBase('/portfolio') },
  { label: 'Sessions & Pricing', href: withBase('/sessions-pricing') },
  { label: 'How It Works', href: withBase('/how-it-works') },
  { label: 'Wall Art', href: withBase('/wall-art') },
  { label: 'About', href: withBase('/about') },
] as const;

/**
 * Fixed CTA vocabulary. One primary verb pair everywhere — repetition
 * builds certainty, synonyms build doubt. Never write these labels by hand.
 */
export const CTA = {
  book: { label: 'Book your session', href: withBase('/contact') },
  packages: { label: 'View packages', href: withBase('/sessions-pricing') },
  portfolio: { label: 'See the portfolio', href: withBase('/portfolio') },
  process: { label: 'See how it works', href: withBase('/how-it-works') },
  wallArt: { label: 'Explore wall art', href: withBase('/wall-art') },
} as const;

/* ------------------------------------------------------------------ */
/* Backdrops                                                           */
/* ------------------------------------------------------------------ */

export type BackdropKey = keyof typeof BACKDROPS;

/**
 * The studio's backdrop inventory. Brand-adjacent tones (sage, olive,
 * cream, terracotta, soft blue) are used on trust-critical sections;
 * the saturated set is staged once in "Choose your colour" and on the
 * Portfolio page. Exact inventory TO BE SUPPLIED.
 */
export const BACKDROPS = {
  sage: { name: 'Sage', hex: '#93a38c' },
  olive: { name: 'Olive', hex: '#767a41' },
  cream: { name: 'Cream', hex: '#e2d9c4' },
  terracotta: { name: 'Terracotta', hex: '#b96c4a' },
  softblue: { name: 'Soft blue', hex: '#8ca3b8' },
  ochre: { name: 'Ochre', hex: '#cb992c' },
  red: { name: 'Deep red', hex: '#8e2b24' },
  cobalt: { name: 'Cobalt', hex: '#2c4b8f' },
  plum: { name: 'Plum', hex: '#5b3a6e' },
  orange: { name: 'Orange', hex: '#cf6428' },
  forest: { name: 'Forest', hex: '#2f5741' },
} as const;

/** The swatch chart, in a deliberate quiet → loud order. */
export const COLOUR_STRIP: BackdropKey[] = [
  'sage',
  'olive',
  'terracotta',
  'ochre',
  'red',
  'cobalt',
  'plum',
];

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

export type Package = (typeof PACKAGES)[number];

export const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential',
    price: '€249',
    blurb: 'A focused session for one strong series.',
    highlights: [
      'Approx. 45 min session',
      '5 edited photos',
      '1 backdrop',
      'Online gallery, high resolution',
    ],
    guidance:
      'You want one strong series of your animal, on one backdrop. Focused and complete.',
    featured: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '€379',
    blurb: 'More time, more variety — our recommended session.',
    highlights: [
      'Approx. 60 min session',
      '10 edited photos',
      'Up to 2 backdrops',
      '€50 wall art credit',
    ],
    guidance:
      'The package most owners choose: enough time for two backdrops, ten photos, and a €50 start on your wall art.',
    featured: true,
  },
  {
    id: 'collection',
    name: 'Collection',
    price: '€549',
    blurb: 'The full session for a complete series.',
    highlights: [
      'Approx. 75–90 min session',
      '15 edited photos',
      'Up to 3 backdrops',
      '€100 wall art credit',
    ],
    guidance:
      'For a full series: three backdrops, solo and together, fifteen photos, €100 towards the piece on your wall.',
    featured: false,
  },
] as const;

export const PACKAGE_NOTE =
  'Every package: online gallery, high-resolution files, social crops — and you can join your pet in the photo.';

/** Rows of the full comparison table on Sessions & Pricing. */
export const COMPARISON: { label: string; values: [string, string, string] }[] = [
  { label: 'Price', values: ['€249', '€379', '€549'] },
  {
    label: 'Session length',
    values: ['approx. 45 min', 'approx. 60 min', 'approx. 75–90 min'],
  },
  { label: 'Edited photos', values: ['5', '10', '15'] },
  { label: 'Backdrops', values: ['1', 'max. 2', 'max. 3'] },
  { label: 'Online gallery', values: ['Yes', 'Yes', 'Yes'] },
  { label: 'High resolution', values: ['Yes', 'Yes', 'Yes'] },
  { label: 'Social crops', values: ['Yes', 'Yes', 'Yes'] },
  {
    label: 'Owner in the photo',
    values: ['Possible', 'Possible', 'Possible'],
  },
  { label: 'Wall art credit', values: ['—', '€50', '€100'] },
];

export const ADD_ONS = [
  {
    title: 'Extra edited photo',
    price: '€39 each',
    body: 'Fell in love with more images in your gallery? Add them individually.',
  },
  {
    title: 'Extra pet',
    price: '+€49',
    body: 'Bring a second animal; we plan extra settling-in time.',
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const STEPS = [
  {
    number: '01',
    title: 'Book your date.',
    short:
      "Choose a package and pick a date in the calendar. You'll receive a short preparation guide — what to bring, and what not to worry about.",
    long: 'Choose your package and a date in the calendar. After booking you receive a confirmation and a short preparation guide: feed a little less beforehand, bring the favourite treat, and a toy that always works. That’s all the preparation there is.',
  },
  {
    number: '02',
    title: 'Arrive and settle in.',
    short:
      'The first minutes belong to your animal: sniffing, exploring, treats. We start photographing when your pet is ready — not before.',
    long: 'Plan to arrive without rush. The studio is quiet, there are no strangers walking through, and the first minutes are for exploring. Dogs sniff the room; cats get time and hiding spots. We begin when your animal’s body language says it’s fine.',
  },
  {
    number: '03',
    title: 'The session.',
    short:
      'We work in short rounds with breaks. Toys, sounds and patience do the directing. You can be in the photos too, if you like.',
    long: 'We photograph in short rounds — a few minutes of work, then a break, water, treats. Sounds and toys direct the attention; nobody has to "sit" on command. If you’d like to be in the photos, we plan those shots for the moment your pet is most settled.',
  },
  {
    number: '04',
    title: 'Choose and hang.',
    short:
      'Within days you view your gallery and select your favourites. Afterwards we help you choose the right print or frame — in person, without obligation.',
    long: 'Within a few days [exact delivery time TO BE SUPPLIED] your online gallery is ready. You select your favourites; we edit them in high resolution, with social crops included. Afterwards — in the studio, without obligation — we look at print options together, with real material samples in hand.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQ_SHORT = [
  {
    q: "My dog doesn't listen — will this work?",
    a: "Yes. We don't need obedience, we need moments. Short rounds, breaks and treats do more than commands ever could. Restless dogs are normal here.",
  },
  {
    q: 'My cat panics in new places.',
    a: 'Cats get extra time to explore the studio first. We keep the space quiet, work at their pace, and many cats settle faster than their owners expect.',
  },
  {
    q: 'Can I be in the photo?',
    a: 'Yes — in every package, at no extra cost. Many owners choose one or two shots together.',
  },
  {
    q: "What if it really doesn't work out?",
    a: "Then we pause, take a break, or in rare cases reschedule the remaining time. We don't deliver stressed photos of a stressed animal — that helps no one.",
  },
];

export const FAQ_FULL = [
  {
    q: "My dog doesn't listen / won't sit still.",
    a: 'We don’t work with commands, we work with attention: sounds, toys, treats, timing. Short rounds mean your dog never has to hold anything for long. Restless dogs make some of the most alive portraits.',
  },
  {
    q: 'My cat is anxious in unfamiliar places.',
    a: 'Cats always get an extended settling-in period, and the studio stays quiet — no other clients, no foot traffic. Many cats need fifteen minutes; a few need thirty. The session time is planned so this never feels rushed.',
  },
  {
    q: 'Can I bring more than one pet?',
    a: 'Yes — each extra pet is +€49, and we add settling-in time. Group shots and individual portraits are both possible; the Collection package suits multiple animals best.',
  },
  {
    q: 'Can I be in the photo with my pet?',
    a: 'Yes, in every package, included. Wear something plain and dark or neutral — the portrait stays about your animal, with you as the warm second layer.',
  },
  {
    q: 'How long does a session take?',
    a: 'Essential approx. 45 minutes, Signature approx. 60, Collection approx. 75–90. Settling-in time is inside these numbers — we’d rather use ten minutes for arrival than force a start.',
  },
  {
    q: 'How are the best images chosen?',
    a: 'You receive an online gallery with a generous pre-selection. You choose your favourites — 5, 10 or 15 depending on the package — and can add extra images at €39 each. We’re happy to advise, but the choice is yours.',
  },
  {
    q: "What if it just doesn't work out?",
    a: 'It almost always does — but if an animal is genuinely too stressed, we stop. We’d rather reschedule the remaining time than deliver photos of an unhappy animal. [Exact goodwill/reschedule policy TO BE SUPPLIED]',
  },
];

export const FAQ_BOOKING = [
  {
    q: 'How does payment work?',
    a: '[Payment and deposit policy TO BE SUPPLIED.] The booking flow currently assumes no online payment: you send a request and we confirm your date personally.',
  },
  {
    q: 'Can I reschedule?',
    a: '[Rescheduling window and conditions TO BE SUPPLIED.] In practice: let us know as early as you can and we find a new date together.',
  },
  {
    q: 'Can I bring several pets to one session?',
    a: 'Yes. Each extra pet is +€49 and adds settling-in time to the session. For two or more animals, the Collection package gives the most room.',
  },
];

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

/**
 * Deliberately false until three real client quotes exist. The concept
 * forbids launching with invented quotes: while this is false, Home
 * renders the fallback (one wide portrait) and pulls the FAQ up.
 *
 * To switch on: fill REVIEWS with real quotes and set this to true.
 */
export const HAS_REVIEWS = false;

export const REVIEWS: { quote: string; author: string; tone: BackdropKey }[] = [
  // Pick quotes that each carry one theme: a nervous or restless animal,
  // the calm of the session, and the final print on the wall.
];

/** e.g. { rating: '4.9', count: 37, url: 'https://…' } */
export const GOOGLE_REVIEWS: { rating: string; count: number; url: string } | null = null;

/* ------------------------------------------------------------------ */
/* Wall art                                                            */
/* ------------------------------------------------------------------ */

export const WALL_ART_TILES = [
  { label: 'Fine art print', from: 'from €99' },
  { label: 'Aluminium', from: 'from €199' },
  { label: 'Acrylic glass', from: 'from €249' },
];

export const WALL_ART_PRODUCTS = [
  {
    id: 'fine-art',
    name: 'Fine art print',
    price: 'from €99',
    blurb:
      'Museum-grade matte paper with deep blacks and soft, true colour. The classic choice for framing.',
    points: [
      'Archival paper, made to last decades',
      'Available formats: [TO BE SUPPLIED]',
      'Ideal for: framed walls, gallery arrangements',
    ],
    room: 'Living room',
    tone: 'sage' as BackdropKey,
  },
  {
    id: 'framed',
    name: 'Framed fine art',
    price: 'from €149',
    blurb:
      'The same print, finished in a wooden frame with glass — ready to hang the day you pick it up.',
    points: [
      'Frame finishes: [TO BE SUPPLIED]',
      'Delivered ready to hang',
      'Ideal for: living rooms, hallways, gifts',
    ],
    room: 'Hallway',
    tone: 'cream' as BackdropKey,
  },
  {
    id: 'aluminium',
    name: 'Aluminium',
    price: 'from €199',
    blurb:
      'The image bonded to brushed aluminium: frameless, matte, extremely durable.',
    points: [
      'No glass, no glare',
      'Slim, modern profile that floats off the wall',
      'Ideal for: modern interiors, kitchens, offices',
    ],
    room: 'Kitchen',
    tone: 'olive' as BackdropKey,
  },
  {
    id: 'acrylic',
    name: 'Acrylic glass',
    price: 'from €249',
    blurb:
      'The print behind polished acrylic: maximum depth, colour and detail. The premium finish.',
    points: [
      'Colours with real depth and shine',
      'The finish that makes studio backdrops glow',
      'Ideal for: the one big statement piece',
    ],
    room: 'Bedroom',
    tone: 'terracotta' as BackdropKey,
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export type PortfolioItem = {
  name: string;
  tone: BackdropKey;
  species: 'dogs' | 'cats' | 'other' | 'owner';
  animal: 'dog' | 'cat' | 'rabbit';
  /** Real photograph. When absent, the tinted placeholder renders. */
  src?: string;
};

/** Home: curated to brand-adjacent tones only. Two large, four smaller. */
export const HOME_SELECTION: PortfolioItem[] = [
  { name: 'Nova', tone: 'olive', species: 'dogs', animal: 'dog' },
  { name: 'Miep', tone: 'sage', species: 'cats', animal: 'cat' },
  { name: 'Bono', tone: 'cream', species: 'dogs', animal: 'dog' },
  { name: 'Saar', tone: 'terracotta', species: 'cats', animal: 'cat' },
  { name: 'Loup', tone: 'softblue', species: 'owner', animal: 'dog' },
  { name: 'Fien', tone: 'sage', species: 'dogs', animal: 'dog' },
];

/**
 * Portfolio page: the full colour range, including the loud backdrops.
 * Ordered so no two saturated tones sit adjacent — sage/cream/olive
 * portraits buffer the reds, purples and oranges.
 */
export const PORTFOLIO: PortfolioItem[] = [
  { name: 'Nova', tone: 'olive', species: 'dogs', animal: 'dog' },
  { name: 'Otis', tone: 'red', species: 'dogs', animal: 'dog' },
  { name: 'Miep', tone: 'sage', species: 'cats', animal: 'cat' },
  { name: 'Juno', tone: 'plum', species: 'cats', animal: 'cat' },
  { name: 'Bono', tone: 'cream', species: 'dogs', animal: 'dog' },
  { name: 'Storm', tone: 'cobalt', species: 'dogs', animal: 'dog' },
  { name: 'Saar', tone: 'terracotta', species: 'cats', animal: 'cat' },
  { name: 'Pim', tone: 'olive', species: 'other', animal: 'rabbit' },
  { name: 'Loup & Anne', tone: 'softblue', species: 'owner', animal: 'dog' },
  { name: 'Wolke', tone: 'orange', species: 'cats', animal: 'cat' },
  { name: 'Fien', tone: 'sage', species: 'dogs', animal: 'dog' },
  { name: 'Bram', tone: 'ochre', species: 'dogs', animal: 'dog' },
  { name: 'Tijn', tone: 'cream', species: 'other', animal: 'rabbit' },
  { name: 'Reza', tone: 'forest', species: 'cats', animal: 'cat' },
  { name: 'Mees & Sanne', tone: 'terracotta', species: 'owner', animal: 'dog' },
  { name: 'Guus', tone: 'red', species: 'dogs', animal: 'dog' },
  { name: 'Noor', tone: 'sage', species: 'cats', animal: 'cat' },
  { name: 'Roos', tone: 'cobalt', species: 'dogs', animal: 'dog' },
];

export const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'dogs', label: 'Dogs' },
  { id: 'cats', label: 'Cats' },
  { id: 'other', label: 'Other' },
  { id: 'owner', label: 'With owner' },
] as const;
