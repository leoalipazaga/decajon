#!usr/bin/nodejs
import { spawn } from 'node:child_process'
// import { readFileSync } from 'node:fs'
// import es from './src/i18n/es.json'
// import { defaultLocale, locales } from './astro.config.mjs'

// const source = JSON.parse(readFileSync('./src/i18n/es.json'))
// const targets = ['src/i18n/en.json']

// spawn('rm', ['-fr', ...targets])

const paths = locales
  .filter((locale) => locale !== defaultLocale)
  .map((locale) => `src/pages/${locale}`)

spawn('rm', ['-fr', ...paths])
spawn('cp', ['-r', 'src/pages', ...paths])
