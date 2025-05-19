import { t } from 'i18next'
import { ui, defaultLang, showDefaultLang } from './ui'

export function useTranslatedPath(lang: 'es' | 'en') {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as 'es' | 'en'

  return defaultLang
}

export function useTranslations() {
  return t
}
