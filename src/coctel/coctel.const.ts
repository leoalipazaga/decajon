import type { Coctel } from './coctel.domain'

export const cocteles: Coctel[] = [
  {
    id: 1,
    alias: 'bloody-mary',
    name: 'Bloody Mary',
    distillate: 'De Cajón Vodka',
    href: '/recipe/bloody-mary',
  },
  {
    id: 2,
    alias: 'moscow-mule',
    name: 'Moscow Mule',
    distillate: 'De Cajón Vodka',
    href: '/recipe/moscow-mule',
  },
  {
    id: 3,
    alias: 'screwdiver',
    name: 'Screwdiver',
    distillate: 'De Cajón Vodka',
    href: '/recipe/screwdiver',
  },
  {
    id: 4,
    alias: 'sex-on-the-beach',
    name: 'Sex On The Beach',
    distillate: 'Siembra Vodka',
    href: '/recipe/sex-on-the-beach',
  },
  {
    id: 5,
    alias: 'cosmopolitan',
    name: 'Cosmopolitan',
    distillate: 'De Cajón Vodka',
    href: '/recipe/cosmopolitan',
  },
  {
    id: 6,
    alias: 'expresso-martini',
    name: 'Expresso Martini',
    distillate: 'De Cajón Vodka',
    href: '/recipe/expresso-martini',
  },
  {
    id: 7,
    alias: 'apple-martini',
    name: 'Apple Martini',
    distillate: 'Siembra Vodka',
    href: '/recipe/apple-martini',
  },
  {
    id: 8,
    alias: 'smash-pineaple',
    name: 'Smash de Piña',
    distillate: 'De Cajón Vodka',
    href: '/recipe/smash-pina',
  },
  {
    id: 9,
    alias: 'pink-gin-tonic',
    name: 'Pink Gin Tonic',
    distillate: 'De Cajón Gin',
    href: '/recipe/pink-gin-tonic',
  },
] as const
