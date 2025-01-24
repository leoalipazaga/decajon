// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import compressor from 'astro-compressor'

export const defaultLocale = 'es'

export const locales = ['es', 'en']

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales,
    defaultLocale,
  },
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
