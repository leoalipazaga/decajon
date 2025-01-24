import es from './es.json'

export const languages = {
  en: 'English',
  es: 'Spanish',
}

export const defaultLang = 'es'

export const ui = {
  es,
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.twitter': 'Twitter',
  },
} as const
