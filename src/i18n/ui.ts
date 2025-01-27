import es from './es.json'
import en from './en.json'

export const showDefaultLang = false

export const languages = {
  en: 'English',
  es: 'Spanish',
}

export const defaultLang = 'es'

export const ui = {
  es,
  en,
} as const
