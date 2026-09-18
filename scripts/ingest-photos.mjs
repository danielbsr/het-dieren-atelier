/**
 * Bring a folder of photographs into the site.
 *
 * Resizes to a sane long edge, converts to WebP, honours EXIF rotation
 * and drops the rest of the metadata (including GPS, which matters for
 * anything shot at a client's home).
 *
 * The output lands in src/assets/portraits/, where Astro can resize it
 * again per layout slot at build time — public/ would ship it untouched.
 *
 *   npm run photos -- ~/Downloads/dieren-atelier-fotos
 *   npm run photos -- ~/Downloads/fotos --max 3000 --quality 86
 */
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.avif', '.heic']);
const OUT_DIR = 'src/assets/portraits';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(args[i + 1]);
};

const source = args.find((a) => !a.startsWith('--') && !Number.isFinite(Number(a)));
const MAX = flag('max', 2400);
const QUALITY = flag('quality', 82);

if (!source) {
  console.error('Usage: npm run photos -- <source folder> [--max 2400] [--quality 82]');
  process.exit(1);
}

/** file-name.webp — lowercase, no spaces, no accents. */
const slug = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

const entries = (await readdir(source, { withFileTypes: true }))
  .filter((e) => e.isFile() && SOURCE_EXT.has(path.extname(e.name).toLowerCase()))
  .sort((a, b) => a.name.localeCompare(b.name));

if (entries.length === 0) {
  console.error(`No images found in ${source}`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

let before = 0;
let after = 0;
const written = [];

for (const entry of entries) {
  const from = path.join(source, entry.name);
  const base = slug(path.basename(entry.name, path.extname(entry.name)));
  const to = path.join(OUT_DIR, `${base}.webp`);

  const input = sharp(from).rotate(); // EXIF orientation, before metadata is dropped
  const meta = await input.metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

  const info = await input
    // `inside` caps the long edge whichever way the photo is turned.
    .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(to);

  const originalSize = (await stat(from)).size;
  before += originalSize;
  after += info.size;
  written.push(base);

  console.log(
    `${entry.name.padEnd(34)} ${String(longEdge).padStart(5)}px ${kb(originalSize).padStart(9)}` +
      `  ->  ${base}.webp  ${String(Math.max(info.width, info.height)).padStart(5)}px ${kb(info.size).padStart(9)}`
  );
}

console.log(
  `\n${written.length} photo(s): ${kb(before)} -> ${kb(after)} ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`
);
console.log(`Written to ${OUT_DIR}/`);
console.log('\nSlot names now available:\n  ' + written.join('\n  '));
