import type { cocteles } from './coctel.const'

export interface Coctel {
  id: number
  alias: string
  name: string
  distillate: 'De Cajón Vodka' | 'Siembra Vodka' | 'De Cajón Gin'
  href: string
}
export type CoctelAliases = (typeof cocteles)[number]['alias']
