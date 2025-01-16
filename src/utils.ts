export const currency = (
  money: number,
  options = { locales: 'es-PE', style: 'currency', currency: 'PEN' } as const
) => {
  return Intl.NumberFormat(options.locales, {
    style: options.style,
    currency: options.currency,
  }).format(money)
}
