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

/**
 * True once a placeholder has been replaced with the real thing.
 *
 * Contact details are rendered as live links only when they are real —
 * a `tel:` pointing at "[phone — TO BE SUPPLIED]" is worse than no
 * link at all, because it looks finished and does nothing.
 */
export const supplied = (value: string) => !value.includes('TO BE SUPPLIED');

export const STUDIO = {
  name: 'Het Dieren Atelier',
  tagline: 'Studio portraits of dogs, cats, birds, rabbits and other pets.',
  street: 'Gildenweg 3H',
  postcode: '1695 GD',
  city: 'Blokker',
  country: 'The Netherlands',
  /** One-line form, for inline use next to running text. */
  address: 'Gildenweg 3H, 1695 GD Blokker',
  /** Opens the studio in Google Maps. Search-by-query, so no place ID is needed. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Gildenweg+3H%2C+1695+GD+Blokker%2C+Netherlands',
  /** Keyless Google Maps embed for the iframe in <MapEmbed />. */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Gildenweg+3H,+1695+GD+Blokker,+Netherlands&hl=en&z=14&output=embed',
  email: '[email — TO BE SUPPLIED]',
  phone: '[phone — TO BE SUPPLIED]',
  /** International format, e.g. '+31 6 12 34 56 78' — wa.me strips it to digits. */
  whatsapp: '[WhatsApp number — TO BE SUPPLIED]',
  instagram: '[@handle — TO BE SUPPLIED]',
  instagramUrl: '#',
  parking: '[Parking and accessibility — TO BE SUPPLIED]',
} as const;

/**
 * The one booking destination. Every "Book your session" on the site
 * points here — see <BookButton />, which is the only thing that should
 * ever link to it.
 */
export const BOOKING_URL = 'https://calendly.com/hetoogatelier/huisdier-portretsessie';

export const NAV = [
  { label: 'Portfolio', href: withBase('/portfolio') },
  { label: 'Sessions & Pricing', href: withBase('/sessions-pricing') },
  { label: 'How It Works', href: withBase('/how-it-works') },
  { label: 'Wall Art', href: withBase('/wall-art') },
  { label: 'About', href: withBase('/about') },
  { label: 'Contact', href: withBase('/contact') },
] as const;

/**
 * Fixed CTA vocabulary. One primary verb pair everywhere — repetition
 * builds certainty, synonyms build doubt. Never write these labels by hand.
 */
export const CTA = {
  /** External: Calendly. Rendered through <BookButton />, never by hand. */
  book: { label: 'Book your session', href: BOOKING_URL },
  packages: { label: 'View packages', href: withBase('/sessions-pricing') },
  portfolio: { label: 'See the portfolio', href: withBase('/portfolio') },
  process: { label: 'See how it works', href: withBase('/how-it-works') },
  wallArt: { label: 'Explore wall art', href: withBase('/wall-art') },
  contact: { label: 'Contact the studio', href: withBase('/contact') },
} as const;

/* ------------------------------------------------------------------ */
/* Backdrops                                                           */
/* ------------------------------------------------------------------ */

export type BackdropKey = keyof typeof BACKDROPS;

/**
 * The studio's backdrop inventory.
 *
 * These are not invented brand colours — each hex was sampled from the
 * backdrop of an actual session photograph, so a caption reading
 * "Miep — pearl" describes the paper the cat was really sitting on, and
 * the swatch chart on Home shows stock that exists.
 *
 * Ordered quiet to deep, which is also the order the chart runs in.
 */
export const BACKDROPS = {
  pearl: { name: 'Pearl', hex: '#b0a59e' },
  caramel: { name: 'Caramel', hex: '#b9957d' },
  sage: { name: 'Sage', hex: '#808881' },
  softblue: { name: 'Soft blue', hex: '#99b1c0' },
  taupe: { name: 'Taupe', hex: '#6c5e5a' },
  forest: { name: 'Forest', hex: '#4e594c' },
  midnight: { name: 'Midnight', hex: '#232c42' },
  charcoal: { name: 'Charcoal', hex: '#2e2d35' },
} as const;

/**
 * The swatch chart: one backdrop, one photograph, same crop and scale
 * across all seven. The uniformity is what turns a colour range into a
 * curated set — and the subjects rotate through five species, so even
 * the colour section says the studio photographs more than dogs.
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
  'Every package: online gallery, high-resolution files and social crops. Dogs, cats, birds, rabbits — every animal is welcome.';

/**
 * The fourth option: the session travels instead of the animal.
 *
 * Deliberately not a fourth column in PACKAGES — it is priced and
 * structured differently, and the studio trio is a settled decision.
 * It renders as one wide card in the same visual language, directly
 * under the three.
 */
export const ON_LOCATION = {
  id: 'at-home',
  eyebrow: 'On location',
  name: 'At your home',
  price: 'Price on request',
  priceNote: '[On-location price, travel radius and travel costs — TO BE SUPPLIED]',
  blurb:
    'The same portrait session, in the place your animal already knows. We bring the studio to you.',
  highlights: [
    'Approx. 90 min at your home or in your garden',
    '10 edited photos',
    'Portable backdrop, or your own interior as the setting',
    'Online gallery, high resolution',
  ],
  guidance:
    'For animals that are calmest on their own ground — older dogs, indoor cats, and rabbits or birds that travel badly.',
} as const;

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
      'We work in short rounds with breaks. Toys, sounds and patience do the directing — no animal has to sit on command.',
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
    q: 'Do you photograph more than dogs and cats?',
    a: 'Yes. Rabbits, birds, guinea pigs, ferrets — if it has a face and a character, it has a portrait. Smaller animals get a smaller set and shorter rounds.',
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
    q: 'Can you come to our home instead?',
    a: 'Yes — an on-location session is the fourth option. We bring a portable backdrop, or use your own interior, and photograph where your animal already feels safe. [Price, travel radius and travel costs TO BE SUPPLIED.]',
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
 * Real client quotes only. While REVIEWS is empty the section still
 * renders — same three cards, same stars — with the brief for each quote
 * in place of the words, so the design is reviewable and nothing
 * invented ships by accident.
 *
 * To go live: fill REVIEWS with three real quotes. The briefs disappear
 * on their own.
 */
export const REVIEWS: { quote: string; author: string; pet: string; rating: number }[] = [
  // { quote: '…', author: 'Anne de Vries', pet: 'with Loup', rating: 5 },
];

/** One theme each: the difficult animal, the session, the print. */
export const REVIEW_BRIEFS = [
  {
    brief:
      'A nervous, restless or impossible animal — and the owner who was sure it would never work.',
    author: 'Owner & pet — to be supplied',
  },
  {
    brief: 'The calm of the session itself: the time taken, the breaks, the patience.',
    author: 'Owner & pet — to be supplied',
  },
  {
    brief: 'The finished portrait on the wall, and what it still means months later.',
    author: 'Owner & pet — to be supplied',
  },
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
    tone: 'pearl' as BackdropKey,
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
    tone: 'caramel' as BackdropKey,
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
    tone: 'forest' as BackdropKey,
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
    tone: 'midnight' as BackdropKey,
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export type PortfolioItem = {
  name: string;
  tone: BackdropKey;
  species: 'dogs' | 'cats' | 'birds' | 'rabbits' | 'other';
  animal: 'dog' | 'cat' | 'rabbit' | 'bird' | 'guineapig';
  /** Slot name in src/assets/portraits. Absent: the placeholder renders. */
  photo?: string;
  /** Escape hatch for a file served straight out of public/. */
  src?: string;
};

/**
 * Home: the six portraits that decide what a visitor thinks the studio
 * photographs. Two dogs, two cats, a bird and a rabbit — never six dogs.
 */
export const HOME_SELECTION: PortfolioItem[] = [
  { name: 'Nova', photo: 'nova', tone: 'charcoal', species: 'dogs', animal: 'dog' },
  { name: 'Miep', photo: 'miep', tone: 'pearl', species: 'cats', animal: 'cat' },
  { name: 'Pip', photo: 'pip', tone: 'softblue', species: 'birds', animal: 'bird' },
  { name: 'Bono', photo: 'bono', tone: 'pearl', species: 'dogs', animal: 'dog' },
  { name: 'Pim', photo: 'pim', tone: 'forest', species: 'rabbits', animal: 'rabbit' },
  { name: 'Wolke', photo: 'wolke', tone: 'midnight', species: 'cats', animal: 'cat' },
];

/**
 * Portfolio page: the full range, ordered on two axes at once — no two
 * portraits of the same species adjacent, and no two on the same
 * backdrop adjacent. The grid has to read as a studio that photographs
 * animals, not as a dog photographer with a few exceptions.
 */
export const PORTFOLIO: PortfolioItem[] = [
  { name: 'Nova', photo: 'nova', tone: 'charcoal', species: 'dogs', animal: 'dog' },
  { name: 'Miep', photo: 'miep', tone: 'pearl', species: 'cats', animal: 'cat' },
  { name: 'Pip', photo: 'pip', tone: 'softblue', species: 'birds', animal: 'bird' },
  { name: 'Bono', photo: 'bono', tone: 'pearl', species: 'dogs', animal: 'dog' },
  { name: 'Juno', photo: 'juno', tone: 'charcoal', species: 'cats', animal: 'cat' },
  { name: 'Pim', photo: 'pim', tone: 'forest', species: 'rabbits', animal: 'rabbit' },
  { name: 'Storm', photo: 'storm', tone: 'midnight', species: 'dogs', animal: 'dog' },
  { name: 'Saar', photo: 'saar', tone: 'caramel', species: 'cats', animal: 'cat' },
  { name: 'Flip', photo: 'flip', tone: 'charcoal', species: 'birds', animal: 'bird' },
  { name: 'Fien', photo: 'fien', tone: 'pearl', species: 'dogs', animal: 'dog' },
  { name: 'Knabbel', photo: 'knabbel', tone: 'caramel', species: 'other', animal: 'guineapig' },
  { name: 'Noor', photo: 'noor', tone: 'sage', species: 'cats', animal: 'cat' },
  { name: 'Bram', photo: 'bram', tone: 'pearl', species: 'dogs', animal: 'dog' },
  { name: 'Wolke', photo: 'wolke', tone: 'midnight', species: 'cats', animal: 'cat' },
  { name: 'Sam', photo: 'sam', tone: 'sage', species: 'birds', animal: 'bird' },
  { name: 'Guus', photo: 'guus', tone: 'charcoal', species: 'dogs', animal: 'dog' },
  { name: 'Reza', photo: 'reza', tone: 'pearl', species: 'cats', animal: 'cat' },
  { name: 'Roos', photo: 'roos', tone: 'midnight', species: 'dogs', animal: 'dog' },
];

/**
 * Species, not occasions. "With owner" was a filter here once; owner
 * portraits are still possible in every package, but they are a variation
 * on a session, not a category of the work.
 */
export const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'dogs', label: 'Dogs' },
  { id: 'cats', label: 'Cats' },
  { id: 'birds', label: 'Birds' },
  { id: 'rabbits', label: 'Rabbits' },
  { id: 'other', label: 'Other pets' },
] as const;
