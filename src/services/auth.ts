import { getToken } from 'adapters/jwt'

interface Credentials {
  username: string
  newPassword: string
  currentPassword: string
}

export const updatePassword = async (credentials: Credentials) => {
  const url = `${import.meta.env.PUBLIC_DECAJON_API}/change-password.php`
  const token = getToken()

  const updateCredential = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      username: credentials.username,
      new_password: credentials.newPassword,
      current_password: credentials.currentPassword,
    }),
  })
  const res = await updateCredential.json()

  if (!updateCredential.ok) {
    throw new Error('403', { cause: 'Unexpected error' })
  }

  return res
}
