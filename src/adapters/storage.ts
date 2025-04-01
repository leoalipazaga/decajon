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
