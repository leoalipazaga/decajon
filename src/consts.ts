import type { Product } from 'adapters/storage.types'

export const products = new Map([
  [
    1,
    {
      id: 1,
      price: 99,
      volumen: 750,
    } as Product,
  ],
  [
    2,
    {
      id: 2,
      price: 104,
      volumen: 750,
    } as Product,
  ],
  [
    3,
    {
      id: 3,
      price: 34,
      volumen: 750,
    } as Product,
  ],
])
