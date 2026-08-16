// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/*
  GitHub Pages serves a project repo from a subfolder, so the deployed
  build needs that prefix on every internal link — see withBase() in
  src/data/site.ts.

  Only the CI build gets it. Locally the site stays at the root, so
  `npm run dev` and the Ship Studio preview keep working at '/'.

  On a custom domain later: drop these two lines and everything falls
  back to root paths on its own.
*/
const base = process.env.GITHUB_ACTIONS ? '/het-dieren-atelier' : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://danielbsr.github.io',
  base,

  vite: {
    plugins: [tailwindcss()]
  }
});