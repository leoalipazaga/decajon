export const Storage = {
  session: {
    name: 'session_storage',
    getValue: (key: string) => {
      try {
        return JSON.parse(sessionStorage.getItem(key) ?? '')
      } catch (error) {
        console.error(error)

        return sessionStorage.getItem(key)
      }
    },
    setValue: <T>(key: string, value: T) => {
      sessionStorage.setItem(key, JSON.stringify(value))

      return value
    },
  },
}
