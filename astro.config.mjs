// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
// @ts-ignore
import astroI18next from 'astro-i18next'

export const defaultLocale = 'es'

export const locales = ['es', 'en']

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales,
    defaultLocale,
  },
  integrations: [
    astroI18next(),
    tailwind(),
    compressor({
      fileExtensions: ['.svg', '.css', '.js', '.cjs', '.mjs'],
    }),
  ],
  redirects: {
    '/recipes': '/recipes/bloody-mary',
  },
})
