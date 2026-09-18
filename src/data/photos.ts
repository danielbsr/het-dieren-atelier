import type { ImageMetadata } from 'astro';

/**
 * Photograph lookup.
 *
 * Photos live in src/assets/portraits/ rather than public/, because only
 * files under src/ pass through Astro's image pipeline — that is what
 * turns one 2400px source into the handful of WebP sizes a layout slot
 * actually needs. Anything in public/ ships byte-for-byte as uploaded.
 *
 * A slot is filled by file name: dropping `nova.webp` into that folder
 * lights up the portrait named "Nova". No data file to edit.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portraits/*.{jpg,jpeg,png,webp,avif}',
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

/** The photograph for a slot, or undefined while the placeholder still stands. */
export const photo = (slot?: string): ImageMetadata | undefined =>
  slot ? bySlot.get(slot.toLowerCase()) : undefined;

/** Every slot name currently filled — handy when wiring new photography in. */
export const filledSlots = () => [...bySlot.keys()].sort();
