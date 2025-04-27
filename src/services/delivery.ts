import { getToken } from 'adapters/jwt'

interface Checkout {
  name: string | FormDataEntryValue
  lastname: string | FormDataEntryValue
  address: string | FormDataEntryValue
  email: string | FormDataEntryValue
  phone: string | FormDataEntryValue
  district: string | FormDataEntryValue
  department: string | FormDataEntryValue
  order: string | FormDataEntryValue
  reference: string | FormDataEntryValue
  shippingCost: number | FormDataEntryValue
  items: { count: number; price: number; name: string }[]
}

export const createDelivery = async (checkout: Checkout) => {
  const url = `${import.meta.env.PUBLIC_DECAJON_API}/delivery.php`
  const token = getToken()

  const fetchDelivery = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      name: checkout.name,
      lastname: checkout.lastname,
      address: checkout.address,
      email: checkout.email,
      phone: checkout.phone,
      district: checkout.district,
      department: 'Lima',
      order: checkout.order,
      reference: checkout.reference,
      shippingCost: checkout.shippingCost,
      items: checkout.items,
    }),
  })
  const res = await fetchDelivery.json()

  if (!fetchDelivery.ok) {
    throw new Error('403', { cause: 'Unexpected error' })
  }

  return res
}
