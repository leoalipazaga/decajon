<script lang="ts">
  import type { CartProduct } from 'adapters/storage.types'
  import { getLangFromUrl, useTranslations } from 'i18n/utils'
  import { currency } from 'utils'

  interface Props {
    cart: Array<CartProduct>
  }

  const { cart }: Props = $props()
  const lang = getLangFromUrl(new URL(location.pathname, location.origin))
  const t = useTranslations(lang)
  const getNameById = (id: number) => {
    if (id === 1) {
      return 'Vodka DeCajon'
    }
    if (id === 2) {
      return 'Gin DeCajon'
    }
    return 'Vodka Siembra'
  }
</script>

{#each cart as product (product.id)}
  <div class="px-[0.625rem] col-span-2 grid grid-cols-2 border-b py-4">
    <p class="text-base">{getNameById(product.id)}</p>
    <span class="col-start-1 row-start-2 text-base">{product.volumen}ml</span>
    <p class="justify-self-end text-base">
      {currency(product.price)}
    </p>
  </div>
  <div class="col-span-2 flex border-b px-[0.625rem] py-4">
    <p class="text-base">{t('checkout.count')}:</p>
    <p class="justify-self-end text-base">
      <span>{product.count}</span>
      {t('checkout.products')}
    </p>
  </div>
  <div class="col-span-2 grid grid-cols-2 border-b px-[0.625rem] py-4">
    <p class="text-base">{t('common.subtotal')}:</p>
    <p class="font-bold justify-self-end text-base">
      {currency(product.count * product.price)}
    </p>
  </div>
{/each}
