let count = $state(0)

export const getCount = () => {
  return count
}
export const increment = () => {
  count += 1
}

export const decrement = () => {
  count -= 1
}

export const set = (value: number) => {
  count = value
}
