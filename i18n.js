#!usr/bin/nodejs
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
// import es from './src/i18n/es.json'
// import { defaultLocale, locales } from './astro.config.mjs'

const source = JSON.parse(readFileSync('./src/i18n/es.json'))
const targets = ['src/i18n/en.json']

// targets.forEach((path) => {
//   unlink(path, (err) => {
//     if (err) throw err
//     console.log(`${path} was deleted`)
//   })
// })

spawn('rm', ['-fr', ...targets])

targets.forEach(async (path) => {
  const res = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: JSON.stringify(source),
      source: 'auto',
      target: 'en',
      format: 'text',
      alternatives: 1,
      api_key: import.meta.env.LIBRE_TRANSLATE_API_KEY,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  console.log(`translated::${path}`, await res.json())

  // writeFile(path)
})

// const paths = locales
//   .filter((locale) => locale !== defaultLocale)
//   .map((locale) => `src/pages/${locale}`)
//
// spawn('rm', ['-fr', ...paths])
// spawn('cp', ['-r', 'src/pages', ...paths])
