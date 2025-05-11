const DECAJON_JWT = 'decajon-jwt'

export const getToken = () => {
  return localStorage.getItem(DECAJON_JWT)
}

export const setToken = (token: string) => {
  localStorage.setItem(DECAJON_JWT, token)

  return token
}

export const removeToken = () => {
  setToken('')
}

export const hasExpiredToken = (token: string) => {
  const jwt = token.split('.')
  const res = JSON.parse(atob(jwt[1]))

  return res.exp * 1000 - Date.now() < 0
}

export const getPayload = (token: string) => {
  const jwt = token.split('.')

  if (!jwt || !token) {
    return null
  }
  const res = JSON.parse(atob(jwt[1]))

  return res
}
