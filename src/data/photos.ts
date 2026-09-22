import type { ImageMetadata } from 'astro';

/**
 * Fotozoeker.
 *
 * Foto's staan in src/assets/ en niet in public/, omdat alleen bestanden
 * onder src/ door Astro's image pipeline gaan — dat is wat van één bron
 * van 2400px de handvol WebP-formaten maakt die een layout echt nodig
 * heeft. Alles in public/ wordt byte-voor-byte geserveerd zoals het is.
 *
 * Twee mappen, één zoeker:
 *   portraits/ — studioportretten van dieren
 *   rooms/     — interieurbeelden, materialen en behind-the-scenes
 *
 * Een plek wordt gevuld op bestandsnaam: `nova.webp` in portraits/ vult
 * de plek "nova". Geen datamap om bij te werken.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/{portraits,rooms}/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const bySlot = new Map<string, ImageMetadata>(
  Object.entries(files).map(([filePath, module]) => [
    filePath
      .split('/')
      .pop()!
      .replace(/\.[^.]+$/, '')
      .toLowerCase(),
    module.default,
  ])
);

/** De foto voor een plek, of undefined zolang de placeholder er staat. */
export const photo = (slot?: string): ImageMetadata | undefined =>
  slot ? bySlot.get(slot.toLowerCase()) : undefined;

/** Elke gevulde plek — handig bij het inhangen van nieuwe fotografie. */
export const filledSlots = () => [...bySlot.keys()].sort();
