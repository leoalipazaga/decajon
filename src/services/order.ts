import { getToken } from 'adapters/jwt'

interface Order {
  total: number
  items: { products_id: number; quantity: number }[]
  distributorsId: number
}

export const createOrder = async (order: Order) => {
  const url = `${import.meta.env.PUBLIC_DECAJON_API}/order.php`
  const token = getToken()
  const fetchDelivery = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      total: order.total,
      items: order.items,
      distributors_id: order.distributorsId,
    }),
  })
  const res = await fetchDelivery.json()

  if (!fetchDelivery.ok) {
    throw new Error('503', { cause: 'Unexpected error' })
  }

  return res
}
