// @ts-check
import { defineConfig } from 'astro/config';

// Static site for Cloudflare Workers Assets.
// Canonical content is loaded from the repository at build time.
export default defineConfig({
  site: 'https://catholiccontext.org',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  vite: {
    server: {
      fs: {
        // Allow reading repository content outside website/
        allow: ['..'],
      },
    },
  },
});

