import { Storage } from './storage'
import type { CartProduct } from './storage.types'

interface ProductCart {
  id: string | number
  count: number
  price: number
}

interface StorageCart<T extends ProductCart> {
  getValue(): Array<T> | undefined
  setValue(cart: Array<T>): Array<T>
}

const createCart = <T extends ProductCart>(storage: StorageCart<T>) => {
  return {
    getCart() {
      return storage.getValue() || []
    },

    getTotal() {
      return this.getCart()?.reduce(
        (total, product) => (total += product.price * product.count),
        0
      )
    },

    getCountProducts() {
      return this.getCart()?.reduce(
        (total, product) => (total += product.count),
        0
      )
    },

    updateCart(props: T) {
      const currentCart = (storage.getValue() || []) as T[]
      const itemFound = currentCart?.find((item) => item.id === props.id)
      const cart = itemFound
        ? currentCart?.map((item) =>
            item.id === props.id ? { ...item, count: props.count } : item
          )
        : currentCart.concat(props)
      storage.setValue(cart)

      return cart
    },

    updateCount(props: { id: T['id']; count: number }) {
      const item = this.getItemBy(props.id)
      if (!item) {
        throw Error(`${props.id} not found`)
      }

      return this.updateCart({ ...item, count: props.count })
    },

    getItemBy(id: T['id']) {
      const cart = storage.getValue() as T[] | undefined

      return cart?.find((item) => item.id === id)
    },

    increaseCart(id: T['id']) {
      const cart = storage.getValue() as T[] | undefined
      const item = cart?.find((item) => item.id === id)
      if (!item) {
        throw Error(`${id} not found`)
      }

      return this.updateCart({ ...item, count: item.count + 1 })
    },

    decreaseCart(props: { id: number }) {
      const cart = storage.getValue() as T[] | undefined
      const item = cart?.find((item) => item.id === props.id)
      if (!item) {
        throw Error(`${props.id} not found`)
      }

      return this.updateCart({ ...item, count: item.count - 1 })
    },

    removeProduct(id: T['id']) {
      const currentCart = storage.getValue() as T[] | undefined
      const cart = currentCart?.filter((item) => item.id !== id)

      storage.setValue(cart || [])

      return cart
    },

    clearCart: () => {
      storage.setValue([])
    },
  }
}

export const UserCart = Object.freeze(
  createCart<CartProduct>({
    getValue() {
      return Storage.session.getValue('DECAJON_USER_CART')?.cart
    },
    setValue(cart) {
      return Storage.session.setValue('DECAJON_USER_CART', { cart })?.cart
    },
  })
)

export const ProviderCart = Object.freeze(
  createCart<CartProduct>({
    getValue() {
      return Storage.session.getValue('DECAJON_PROVIDER_CART')?.providerCart
    },
    setValue(providerCart) {
      return Storage.session.setValue('DECAJON_PROVIDER_CART', { providerCart })
        ?.providerCart
    },
  })
)
