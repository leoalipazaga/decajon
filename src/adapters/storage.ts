import type { CartProduct } from './storage.types'

export const Storage = {
  session: {
    name: 'session_storage',
    getValue: (key: string) => {
      try {
        const value = sessionStorage.getItem(key)

        return value ? JSON.parse(value) : value
      } catch (_) {
        return sessionStorage.getItem(key)
      }
    },
    setValue: <T>(key: string, value: T) => {
      sessionStorage.setItem(key, JSON.stringify(value))

      return value
    },
  },
}

export const getTotal = () => {
  return getCart()?.reduce(
    (total, product) => (total += product.price * product.count),
    0
  )
}

export const getCountProducts = () => {
  return getCart()?.reduce((total, product) => (total += product.count), 0)
}

export const getCart = () => {
  return (Storage.session.getValue('DECAJON_STORAGE')?.cart ||
    []) as CartProduct[]
}

export const updateCart = (props: CartProduct) => {
  const currentCart = (Storage.session.getValue('DECAJON_STORAGE')?.cart ||
    []) as CartProduct[]
  const itemFound = currentCart?.find((item) => item.id === props.id)
  const cart = itemFound
    ? currentCart?.map((item) =>
        item.id === props.id ? { ...item, count: props.count } : item
      )
    : currentCart.concat(props)
  Storage.session.setValue('DECAJON_STORAGE', { cart })

  return cart
}

export const updateCount = (props: { id: number; count: number }) => {
  const item = getItemBy({ id: props.id })
  if (!item) {
    throw Error(`${props.id} not found`)
  }

  return updateCart({ ...item, count: props.count })
}

export const getItemBy = (props: { id: number }) => {
  const cart = Storage.session.getValue('DECAJON_STORAGE')?.cart as
    | CartProduct[]
    | undefined

  return cart?.find((item) => item.id === props.id)
}

export const increaseCart = (props: { id: number }) => {
  const cart = Storage.session.getValue('DECAJON_STORAGE')?.cart as
    | CartProduct[]
    | undefined
  const item = cart?.find((item) => item.id === props.id)
  if (!item) {
    throw Error(`${props.id} not found`)
  }

  return updateCart({ ...item, count: item.count + 1 })
}

export const decreaseCart = (props: { id: number }) => {
  const cart = Storage.session.getValue('DECAJON_STORAGE')?.cart as
    | CartProduct[]
    | undefined
  const item = cart?.find((item) => item.id === props.id)
  if (!item) {
    throw Error(`${props.id} not found`)
  }

  return updateCart({ ...item, count: item.count - 1 })
}

export const removeProduct = (props: { id: number }) => {
  const currentCart = Storage.session.getValue('DECAJON_STORAGE')?.cart as
    | CartProduct[]
    | undefined
  const cart = currentCart?.filter((item) => item.id !== props.id)

  Storage.session.setValue('DECAJON_STORAGE', { cart })

  return cart
}

export const clearCart = () => {
  Storage.session.setValue('DECAJON_STORAGE', { cart: [] })
}
