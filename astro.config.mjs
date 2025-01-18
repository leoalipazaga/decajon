// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import compressor from 'astro-compressor'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    compressor({
      fileExtensions: ['.svg', '.css', '.js', '.cjs', '.mjs'],
    }),
  ],
  redirects: {
    '/recipes': '/recipes/bloody-mary',
  },
})

